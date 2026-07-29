import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { confirmCheckout } from "@/lib/checkout.functions";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

const search = z.object({ session_id: z.string(), order_id: z.string().uuid() });

export const Route = createFileRoute("/_authenticated/checkout/success")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Order confirmation | Cemento" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { session_id, order_id } = useSearch({ from: "/_authenticated/checkout/success" });
  const { clear } = useCart();
  const confirm = useServerFn(confirmCheckout);

  const q = useQuery({
    queryKey: ["confirm", session_id, order_id],
    queryFn: () => confirm({ data: { sessionId: session_id, orderId: order_id } }),
    retry: 1,
  });

  useEffect(() => {
    if (q.data?.paid) clear();
  }, [q.data?.paid, clear]);

  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-14">
      <div className="surface-card w-full max-w-lg rounded-sm p-8 text-center">
        {q.isLoading && (
          <>
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-clay" />
            <p className="mt-4 text-sm text-muted-foreground">Confirming your payment…</p>
          </>
        )}
        {q.data?.paid && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" />
            <h1 className="mt-4 font-display text-2xl">Thanks for your order</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Payment received: <span className="font-semibold text-foreground">{formatPrice(q.data.subtotal)}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Order reference: {order_id.slice(0, 8)}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="clay"><Link to="/store">Keep shopping</Link></Button>
              <Button asChild variant="outline"><Link to="/account">View orders</Link></Button>
            </div>
          </>
        )}
        {q.data && !q.data.paid && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="mt-4 font-display text-2xl">Payment not completed</h1>
            <p className="mt-2 text-sm text-muted-foreground">Status: {q.data.status}. You can retry from your cart.</p>
            <div className="mt-6"><Button asChild variant="clay"><Link to="/cart">Back to cart</Link></Button></div>
          </>
        )}
        {q.error && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="mt-4 font-display text-2xl">Could not confirm order</h1>
            <p className="mt-2 text-sm text-muted-foreground">{q.error instanceof Error ? q.error.message : "Please try again."}</p>
          </>
        )}
      </div>
    </div>
  );
}
