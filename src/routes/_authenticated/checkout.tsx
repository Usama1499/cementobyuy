import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { paySquare, getSquareConfig } from "@/lib/checkout.functions";
import { TRAINING_PRODUCT_ID, formatPrice } from "@/lib/products";
import { bookingSummary, clearBooking, readBooking } from "@/lib/booking";
import { SquareCardForm, type SquareCardFormHandle } from "@/components/SquareCardForm";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Cemento Perth" },
      { name: "description", content: "Securely checkout with Square." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, hydrated, clear } = useCart();
  const navigate = useNavigate();
  const squarePay = useServerFn(paySquare);
  const squareConfig = useServerFn(getSquareConfig);

  const [cardHandle, setCardHandle] = useState<SquareCardFormHandle | null>(null);
  const [success, setSuccess] = useState<{ orderId: string; receiptUrl: string | null } | null>(
    null,
  );

  const config = useQuery({ queryKey: ["square-config"], queryFn: () => squareConfig() });

  // Pickup from the Malaga warehouse — no shipping charge. Prices include GST.
  const shipping = 0;
  const gst = subtotal / 11;
  const total = subtotal + shipping;

  const orderLines = items.map((i) => ({ productId: i.product.id, quantity: i.qty }));
  const notes = () => {
    const hasTraining = items.some((i) => i.product.id === TRAINING_PRODUCT_ID);
    const booking = hasTraining ? readBooking() : null;
    return booking ? bookingSummary(booking) : undefined;
  };

  const squareMutation = useMutation({
    mutationFn: async () => {
      if (!cardHandle) throw new Error("Enter your card details to continue");
      const sourceId = await cardHandle.tokenize();
      return squarePay({ data: { items: orderLines, notes: notes(), sourceId } });
    },
    onSuccess: (r) => {
      clearBooking();
      clear();
      setSuccess({ orderId: r.orderId, receiptUrl: r.receiptUrl });
    },
  });

  const pending = squareMutation.isPending;
  const error = squareMutation.error;

  const handleReady = useCallback((h: SquareCardFormHandle | null) => setCardHandle(h), []);

  useEffect(() => {
    if (!success && hydrated && items.length === 0) navigate({ to: "/cart", replace: true });
  }, [hydrated, items.length, navigate, success]);

  if (success) {
    return (
      <div className="container-page grid min-h-[60vh] place-items-center py-14">
        <div className="surface-card w-full max-w-lg rounded-sm p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" />
          <h1 className="mt-4 font-display text-2xl">Payment received</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thanks for your order. Reference: {success.orderId.slice(0, 8)}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {/* {success.receiptUrl && (
              <Button asChild variant="outline">
                <a href={success.receiptUrl} target="_blank" rel="noreferrer">
                  View receipt
                </a>
              </Button>
            )} */}
            <Button asChild variant="clay">
              <Link to="/store">Keep shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/account">View orders</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Confirm your order</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Pay securely by card — prices include GST.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <div className="surface-card divide-y divide-border rounded-sm">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-4 p-5">
                <img
                  src={product.image}
                  alt={product.name}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-sm bg-secondary object-contain p-1 mix-blend-multiply"
                />
                <div className="flex-1">
                  <p className="text-sm">{product.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Qty {qty} · {formatPrice(product.price)} each
                  </p>
                </div>
                <span className="font-display font-semibold">
                  {formatPrice(product.price * qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="surface-card rounded-sm p-6">
            <h2 className="text-xl">Payment method</h2>
            <div className="mt-5">
              {config.isLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Preparing card form…
                </div>
              ) : config.data?.configured && config.data.appId && config.data.locationId ? (
                <>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Enter your card details below. Your payment is processed securely by Square.
                  </p>
                  <SquareCardForm
                    appId={config.data.appId}
                    locationId={config.data.locationId}
                    environment={config.data.environment}
                    onReady={handleReady}
                  />
                </>
              ) : (
                <p className="text-sm text-destructive">
                  Card payments are currently unavailable. Please try again later.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="surface-card h-fit rounded-sm p-6">
          <h2 className="text-xl">Summary</h2>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping (Malaga pickup)</dt>
              <dd>Free</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">GST (included)</dt>
              <dd>{formatPrice(gst)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total (inc. GST)</dt>
              <dd className="font-display">{formatPrice(total)}</dd>
            </div>
          </dl>

          <Button
            variant="clay"
            size="lg"
            className="mt-6 w-full"
            disabled={
              pending ||
              items.length === 0 ||
              !cardHandle ||
              !config.data?.configured
            }
            onClick={() => squareMutation.mutate()}
          >
            {pending && <Loader2 className="animate-spin" />}
            Pay {formatPrice(total)}
          </Button>

          {error && (
            <p className="mt-3 text-sm text-destructive">
              {error instanceof Error ? error.message : "Payment could not be completed."}
            </p>
          )}

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Payments are processed securely by Square. Card details never touch our servers.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-3 w-full">
            <Link to="/cart">Back to cart</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}