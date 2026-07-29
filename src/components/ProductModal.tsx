import { Check, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="surface-card relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex aspect-square items-center justify-center bg-secondary p-8 md:aspect-auto md:w-1/2">
          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          <p className="eyebrow text-[0.6rem]">{product.category}</p>
          <h2 className="mt-2 font-display text-2xl leading-tight">{product.name}</h2>
          <p className="mt-1 font-display text-xl font-semibold text-clay">{formatPrice(product.price)}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex justify-between border-b border-border pb-2"><span>Category</span><span className="text-foreground">{product.category}</span></li>
            <li className="flex justify-between border-b border-border pb-2"><span>Availability</span><span className="text-foreground">In stock</span></li>
            <li className="flex justify-between border-b border-border pb-2"><span>Pickup</span><span className="text-foreground">Malaga, Perth</span></li>
          </ul>
          <Button
            variant={added ? "secondary" : "clay"}
            size="lg"
            className="mt-auto pt-4"
            onClick={() => {
              add(product.id);
              setAdded(true);
              toast.success(`${product.name} added to cart`);
              window.setTimeout(() => setAdded(false), 1600);
            }}
          >
            {added ? <Check /> : <Plus />}
            {added ? "Added to cart" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
