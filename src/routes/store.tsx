import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { categories, products, type ProductCategory } from "@/lib/products";
import { site } from "@/lib/site";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Micro Cement Materials Shop | Cemento Perth" },
      {
        name: "description",
        content:
          "Buy Microestil micro cement base, Fino and Medio coats, primers, sealers, pigments and tools. Pick up from our Malaga warehouse in Perth.",
      },
      { property: "og:title", content: "Micro Cement Materials Shop | Cemento Perth" },
      {
        property: "og:description",
        content:
          "Microestil base, Fino, Medio, primers, sealers, pigments and tools — pick up in Malaga, Perth.",
      },
    ],
  }),
  component: Store,
});

type Filter = ProductCategory | "All";

function Store() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const { count } = useCart();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (filter === "All" || p.category === filter) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Materials to purchase"
        intro={`The full Microestil system, the primers and sealers we specify, and the pigments we tint with. Order online and collect from ${site.address}.`}
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/cart">
            <ShoppingBag /> View cart{count > 0 ? ` (${count})` : ""}
          </Link>
        </Button>
      </PageHero>

      <section className="container-page py-14 md:py-20">
        <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...categories] as Filter[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={
                  filter === c
                    ? "rounded-full border border-clay bg-clay px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-clay-foreground"
                    : "rounded-full border border-border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-clay hover:text-foreground"
                }
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              maxLength={80}
              className="pl-9"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Showing {visible.length} of {products.length} products. Prices include GST.
        </p>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No products match that search. Try another term or clear the filter.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-secondary/60">
        <div className="container-page grid gap-8 py-14 md:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-semibold">Collection & delivery</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Collect from {site.address}, {site.hours}. Perth metro delivery quoted on request.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Not sure what you need?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us the square metres and substrate and we'll spec the full kit for your job.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">First time applying?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our{" "}
              <Link to="/training" className="font-medium text-clay underline-offset-4 hover:underline">
                DIY training
              </Link>{" "}
              covers prep, trowelling and sealing before you open a bag.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
