import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { createCheckout } from "@/lib/checkout.functions";
import { TRAINING_PRODUCT_ID, formatPrice } from "@/lib/products";
import { bookingSummary, clearBooking, readBooking } from "@/lib/booking";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Cemento Perth" },
      { name: "description", content: "Securely checkout with Stripe." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, hydrated } = useCart();
  const navigate = useNavigate();
  const checkout = useServerFn(createCheckout);

  const mutation = useMutation({
    mutationFn: async () => {
      const hasTraining = items.some((i) => i.product.id === TRAINING_PRODUCT_ID);
      const booking = hasTraining ? readBooking() : null;
      return checkout({
        data: {
          items: items.map((i) => ({ productId: i.product.id, quantity: i.qty })),
          notes: booking ? bookingSummary(booking) : undefined,
        },
      });
    },
    onSuccess: (r) => {
      clearBooking();
      window.location.href = r.url;
    },
  });

  useEffect(() => {
    if (hydrated && items.length === 0) navigate({ to: "/cart", replace: true });
  }, [hydrated, items.length, navigate]);

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Confirm your order</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        You'll be redirected to Stripe to complete payment securely. Prices include GST.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="surface-card divide-y divide-border rounded-sm">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-4 p-5">
              <img src={product.image} alt={product.name} width={72} height={72} className="h-16 w-16 rounded-sm bg-secondary object-contain p-1 mix-blend-multiply" />
              <div className="flex-1">
                <p className="text-sm">{product.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Qty {qty} · {formatPrice(product.price)} each</p>
              </div>
              <span className="font-display font-semibold">{formatPrice(product.price * qty)}</span>
            </div>
          ))}
        </div>

        <aside className="surface-card rounded-sm p-6">
          <h2 className="text-xl">Summary</h2>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total (inc. GST)</dt>
              <dd className="font-display">{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <Button variant="clay" size="lg" className="mt-6 w-full" disabled={mutation.isPending || items.length === 0} onClick={() => mutation.mutate()}>
            {mutation.isPending && <Loader2 className="animate-spin" />}
            Pay with Stripe
          </Button>
          {mutation.error && (
            <p className="mt-3 text-sm text-destructive">
              {mutation.error instanceof Error ? mutation.error.message : "Could not start checkout."}
            </p>
          )}
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Test mode. Use Stripe test card 4242 4242 4242 4242 with any future date and CVC.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-3 w-full">
            <Link to="/cart">Back to cart</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
