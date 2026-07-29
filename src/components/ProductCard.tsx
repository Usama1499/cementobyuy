import { Check, Info, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";
import { ProductModal } from "@/components/ProductModal";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article className="surface-card surface-card-hover flex flex-col overflow-hidden rounded-sm">
        <button type="button" onClick={() => setShowModal(true)} className="flex aspect-4/3 items-center justify-center bg-secondary p-6" aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" width={300} height={225} className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105" />
        </button>
        <div className="flex flex-1 flex-col p-5">
          <p className="eyebrow text-[0.6rem]">{product.category}</p>
          <button type="button" onClick={() => setShowModal(true)} className="mt-2 text-left text-base leading-snug text-foreground hover:text-clay">{product.name}</button>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="font-display text-lg font-semibold text-foreground">{formatPrice(product.price)}</span>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={() => setShowModal(true)} aria-label={`Details for ${product.name}`}>
                <Info />
              </Button>
              <Button
                size="sm"
                variant={added ? "secondary" : "clay"}
                onClick={() => {
                  add(product.id);
                  setAdded(true);
                  toast.success(`${product.name} added to cart`);
                  window.setTimeout(() => setAdded(false), 1600);
                }}
              >
                {added ? <Check /> : <Plus />}
                {added ? "Added" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      </article>
      {showModal && <ProductModal product={product} onClose={() => setShowModal(false)} />}
    </>
  );
}
