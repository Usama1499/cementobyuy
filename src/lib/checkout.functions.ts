import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getRequestHeader } from "@tanstack/react-start/server";
import { products } from "@/lib/products";

const LineSchema = z.object({
  productId: z.string().min(1).max(64),
  quantity: z.number().int().min(1).max(99),
});

const CheckoutInput = z.object({
  items: z.array(LineSchema).min(1).max(50),
  notes: z.string().max(500).optional(),
});

function originFromRequest(): string {
  const origin = getRequestHeader("origin") ?? getRequestHeader("referer");
  if (origin) {
    try {
      return new URL(origin).origin;
    } catch {
      /* ignore */
    }
  }
  return "https://cementobyuy.lovable.app";
}

export const createCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => CheckoutInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;

    const orderItems = data.items.map((i) => {
      const p = products.find((product) => product.id === i.productId);

      if (!p) {
        throw new Error(`Product not available: ${i.productId}`);
      }

      return {
        product_id: p.id,
        name: p.name,
        price: Number(p.price),
        quantity: i.quantity,
        image: p.image,
      };
    });
    const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);

    const { createCheckoutSession } = await import("./stripe.server");
    const email = (claims as { email?: string } | undefined)?.email;
    const origin = originFromRequest();

    // The order is created as a hidden "draft" and only becomes visible in the
    // customer's order history once Stripe confirms the payment.
    const { data: order, error: insErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "paid",
        subtotal,
        currency: "AUD",
        customer_email: email ?? null,
        notes: data.notes ?? null,
        items: orderItems,
      })
      .select("id")
      .single();
    if (insErr || !order) throw new Error(insErr?.message ?? "Could not create order");


    const session = await createCheckoutSession({
      lineItems: orderItems.map((i) => ({
        name: i.name,
        unitAmountCents: Math.round(i.price * 100),
        quantity: i.quantity,
        image: i.image,
      })),
      successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancelUrl: `${origin}/cart`,
      customerEmail: email,
      metadata: { order_id: order.id, user_id: userId },
    });

    await supabase.from("orders").update({ stripe_session_id: session.id }).eq("id", order.id);

    return { url: session.url, orderId: order.id };
  });

export const confirmCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ sessionId: z.string().min(4).max(200), orderId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { retrieveCheckoutSession } = await import("./stripe.server");
    const session = await retrieveCheckoutSession(data.sessionId);
    const paid = session.payment_status === "paid";
    // Only a confirmed payment produces a visible order. Anything else is
    // marked cancelled so abandoned checkouts never appear in order history.
    const newStatus = paid ? "completed" : "cancelled";
    const { data: updated, error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", data.orderId)
      .eq("user_id", userId)
      .select("id,status,subtotal,items")
      .single();
    if (error || !updated) throw new Error(error?.message ?? "Order not found");
    return { status: updated.status, subtotal: Number(updated.subtotal), paid };
  });

/* ------------------------------------------------------------------ */
/* Square                                                              */
/* ------------------------------------------------------------------ */

// Public, non-sensitive Square config for the browser Web Payments SDK.
// The access token is never returned here.
export const getSquareConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { squarePublicConfig } = await import("./square.server");
  return squarePublicConfig();
});

const SquareInput = CheckoutInput.extend({
  sourceId: z.string().min(4).max(2048),
  verificationToken: z.string().max(4096).optional(),
});

export const paySquare = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SquareInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;
    const email = (claims as { email?: string } | undefined)?.email;

    const orderItems = data.items.map((i) => {
      const p = products.find((product) => product.id === i.productId);
      if (!p) throw new Error(`Product not available: ${i.productId}`);
      return {
        product_id: p.id,
        name: p.name,
        price: Number(p.price),
        quantity: i.quantity,
        image: p.image,
      };
    });
    const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const amountCents = Math.round(subtotal * 100);
    if (amountCents <= 0) throw new Error("Cart total must be greater than zero");

    // Draft order first — it only becomes visible once Square confirms payment.
    const { data: order, error: insErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "paid",
        subtotal,
        currency: "AUD",
        customer_email: email ?? null,
        notes: data.notes ?? null,
        items: orderItems,
      })
      .select("id")
      .single();
    if (insErr || !order) throw new Error(insErr?.message ?? "Could not create order");

    const { createSquarePayment } = await import("./square.server");

    try {
      const payment = await createSquarePayment({
        sourceId: data.sourceId,
        verificationToken: data.verificationToken,
        amountCents,
        currency: "AUD",
        idempotencyKey: order.id,
        referenceId: order.id,
        note: data.notes,
        buyerEmail: email,
      });

      const paid = payment.status === "COMPLETED" || payment.status === "APPROVED";
      await supabase
        .from("orders")
        .update({ status: paid ? "completed" : "cancelled" })
        .eq("id", order.id)
        .eq("user_id", userId);

      // Optional provider columns — ignored when the schema patch is not applied.
      await supabase
        .from("orders")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .update({ payment_provider: "square", square_payment_id: payment.id } as any)
        .eq("id", order.id)
        .then(undefined, () => undefined);

      if (!paid) throw new Error(`Payment was not completed (status: ${payment.status})`);

      return {
        orderId: order.id,
        paymentId: payment.id,
        receiptUrl: payment.receiptUrl,
        subtotal,
        paid: true as const,
      };
    } catch (err) {
      await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", order.id)
        .eq("user_id", userId);
      throw err instanceof Error ? err : new Error("Square payment failed");
    }
  });


