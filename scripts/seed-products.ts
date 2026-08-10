import { createClient } from "@supabase/supabase-js";
import { products } from "../src/lib/products";

const supabase = createClient(
  "https://ugovzrtyuxxztohhnlxj.supabase.co",
  "sb_secret_iiclI5lUhipfcR0TdoN7cA_QRl9Rrsl"
);

async function seed() {
  const { error } = await supabase
    .from("products")
    .upsert(
      products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        image: p.image,
        description: p.description,
        active: true
      }))
    );

  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log("Products inserted successfully");
}

seed();