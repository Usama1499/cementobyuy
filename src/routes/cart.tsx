import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Cemento Micro Cement Perth" },
      { name: "description", content: "Review your Microestil micro cement materials and check out securely." },
      { property: "og:title", content: "Your Cart | Cemento Micro Cement Perth" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, count, setQty, remove, clear, hydrated } = useCart();
  const { user } = useAuth();
  const checkoutLink = user ? "/checkout" : "/auth";
  const checkoutSearch = user ? undefined : { redirect: "/checkout" };

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">Cart</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Your materials</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Prices include GST. Pay securely with card at checkout, or collect from {site.address}.
      </p>

      {!hydrated ? (
        <p className="py-20 text-muted-foreground">Loading your cart…</p>
      ) : items.length === 0 ? (
        <div className="surface-card mt-12 flex flex-col items-center rounded-sm px-6 py-20 text-center">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          <h2 className="mt-5 text-xl">Your cart is empty</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Browse the Microestil range — base coats, finishing coats, primers, sealers and pigments.
          </p>
          <Button asChild variant="clay" size="lg" className="mt-7">
            <Link to="/store">Go to the shop</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="surface-card divide-y divide-border rounded-sm">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-4 p-5">
                <img src={product.image} alt={product.name} loading="lazy" width={96} height={96} className="h-24 w-24 shrink-0 rounded-sm bg-secondary object-contain p-2 mix-blend-multiply" />
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow text-[0.6rem]">{product.category}</p>
                      <h2 className="mt-1 text-base leading-snug">{product.name}</h2>
                    </div>
                    <span className="font-display font-semibold">{formatPrice(product.price * qty)}</span>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    <div className="flex items-center rounded-sm border border-border">
                      <button type="button" aria-label={`Decrease ${product.name}`} onClick={() => setQty(product.id, qty - 1)} className="px-2.5 py-2 text-muted-foreground hover:text-foreground"><Minus className="h-4 w-4" /></button>
                      <span className="min-w-8 text-center text-sm font-medium">{qty}</span>
                      <button type="button" aria-label={`Increase ${product.name}`} onClick={() => setQty(product.id, qty + 1)} className="px-2.5 py-2 text-muted-foreground hover:text-foreground"><Plus className="h-4 w-4" /></button>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatPrice(product.price)} each</span>
                    <button type="button" onClick={() => remove(product.id)} className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between p-5">
              <button type="button" onClick={clear} className="text-xs text-muted-foreground underline-offset-4 hover:underline">Clear cart</button>
              <Link to="/store" className="text-xs font-medium text-clay underline-offset-4 hover:underline">Continue shopping</Link>
            </div>
          </div>

          <aside className="surface-card rounded-sm p-6">
            <h2 className="text-xl">Order summary</h2>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Items</dt><dd>{count}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total (inc. GST)</dt><dd className="font-display">{formatPrice(subtotal)}</dd></div>
            </dl>
            <Button asChild variant="clay" size="lg" className="mt-6 w-full">
              <Link to={checkoutLink} search={checkoutSearch as never}>
                {user ? "Proceed to checkout" : "Sign in to checkout"}
              </Link>
            </Button>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Secure payment via Stripe. Test mode — use card 4242 4242 4242 4242.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
