import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "My Account | Cemento" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

interface OrderItem { product_id: string; name: string; price: number; quantity: number }
interface OrderRow { id: string; status: string; subtotal: number; created_at: string; items: OrderItem[] }

function AccountPage() {
  const { user, signOut } = useAuth();

  const q = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id,status,subtotal,created_at,items")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as OrderRow[];
    },
  });

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">Account</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl">Your orders</h1>
          <p className="mt-2 text-sm text-muted-foreground">Signed in as {user?.email}</p>
        </div>
        <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
      </div>

      <div className="mt-10 space-y-4">
        {q.isLoading && <p className="text-muted-foreground">Loading orders…</p>}
        {q.data?.length === 0 && (
          <div className="surface-card rounded-sm p-10 text-center text-muted-foreground">
            You haven't placed any orders yet.
          </div>
        )}
        {q.data?.map((o) => (
          <article key={o.id} className="surface-card rounded-sm p-5">
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-sm">Order #{o.id.slice(0, 8)}</p>
                <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("en-AU")}</p>
              </div>
              <span
                className={
                  o.status === "paid" || o.status === "completed"
                    ? "rounded-full bg-whatsapp/10 px-3 py-1 text-xs font-medium text-whatsapp"
                    : o.status === "pending" || o.status === "draft"
                      ? "rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
                      : o.status === "cancelled"
                        ? "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                        : "rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                }
              >
                {o.status}
              </span>
            </header>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              {o.items.map((i, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{i.quantity} × {i.name}</span>
                  <span>{formatPrice(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total</span>
              <span className="font-display">{formatPrice(Number(o.subtotal))}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
