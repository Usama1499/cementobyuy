import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <article className="surface-card surface-card-hover flex flex-col overflow-hidden rounded-sm">
      <div className="flex aspect-4/3 items-center justify-center bg-secondary p-6">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={300}
          height={225}
          className="h-full w-full object-contain mix-blend-multiply"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[0.6rem]">{product.category}</p>
        <h3 className="mt-2 text-base leading-snug text-foreground">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-display text-lg font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
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
    </article>
  );
}
