import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getRequestHeader } from "@tanstack/react-start/server";

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

    const ids = data.items.map((i) => i.productId);
    const { data: rows, error } = await supabase
      .from("products")
      .select("id,name,price,image")
      .in("id", ids)
      .eq("active", true);
    if (error) throw new Error(error.message);

    const byId = new Map(rows?.map((r) => [r.id, r] as const));
    const orderItems = data.items.map((i) => {
      const p = byId.get(i.productId);
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

    const { createCheckoutSession } = await import("./stripe.server");
    const email = (claims as { email?: string } | undefined)?.email;
    const origin = originFromRequest();

    const { data: order, error: insErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
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
    const newStatus = paid ? "paid" : session.status === "expired" ? "failed" : "pending";
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
