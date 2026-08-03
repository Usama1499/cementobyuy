export type ProductCategory =
  | "Micro cement"
  | "Primers & sealers"
  | "Pigments"
  | "Accessories"
  | "Training";

/** Bookable DIY training place — sold through the same cart & Stripe checkout. */
export const TRAINING_PRODUCT_ID = "training-diy-workshop";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  description: string;
}

const j = (file: string) => `https://www.jotform.com/uploads/5Y_studio/form_files/${file}`;

export const products: Product[] = [
  {
    id: "m520",
    name: "Microestil Plus Base 25kg",
    price: 308,
    category: "Micro cement",
    image: j("m520_microestil_plus_base_25kg_954b830b2aa43c9da28f4d9cc6aff1b1.png"),
    description: "Two-coat base layer for walls and floors. Covers roughly 25–30m² per bag.",
  },
  {
    id: "m522",
    name: "Microestil Plus Fino 20kg",
    price: 364,
    category: "Micro cement",
    image: j("microcement_fino_20kg_m522_2_1_300x225_bfd7838ae22af2f906736810f4c61313.png"),
    description: "Fine-grain finishing coat for silky smooth, low-texture surfaces.",
  },
  {
    id: "m521",
    name: "Microestil Plus Medio 20kg",
    price: 291,
    category: "Micro cement",
    image: j("microcement_medio_20kg_m521_300x225_ec34dddf21abe86f6b62c2fdabaf9967.png"),
    description: "Medium-grain coat for floors and hard-wearing textured finishes.",
  },
  {
    id: "mct050",
    name: "MCT-050 Blanco 250ml",
    price: 83,
    category: "Pigments",
    image: j("mct_050_4_1_300x225_9f6caf90ace1e6f2ce9ae0955bf88174.png"),
    description: "Concentrated white tint for Microestil base and finishing coats.",
  },
  {
    id: "mct100",
    name: "MCT-100 Negro 250ml",
    price: 74,
    category: "Pigments",
    image: j("mct_100_4_300x225_264abce33f8aef35bbf5e97e5488568a.png"),
    description: "Deep black tint for charcoal and graphite colour matching.",
  },
  {
    id: "mct120",
    name: "MCT-120 Calido 250ml",
    price: 74,
    category: "Pigments",
    image: j("mct_120_4_300x225_9960c2bd8ad71372b1dc95cdbf67ded3.png"),
    description: "Warm neutral tint for sand and limestone tones.",
  },
  {
    id: "mct140",
    name: "MCT-140 Sombra 250ml",
    price: 74,
    category: "Pigments",
    image: j("mct_140_4_300x225_8750ba2dee415d0b93ee34e8de4956af.png"),
    description: "Shadow grey tint for cool contemporary greys.",
  },
  {
    id: "mct200",
    name: "MCT-200 Crema 250ml",
    price: 74,
    category: "Pigments",
    image: j("mct_200_4_300x225_fcfb9273e3faa8b91fb25cdc79a56011.png"),
    description: "Soft cream tint for bright, airy interiors.",
  },
  {
    id: "mct240",
    name: "MCT-240 Marron 250ml",
    price: 74,
    category: "Pigments",
    image: j("mct_240_4_300x225_ca5fb6e81c1d00e2f1050b36458731e6.png"),
    description: "Rich brown tint for earthy, terracotta-leaning finishes.",
  },
  {
    id: "m564-1",
    name: "Porous Surface Primer 1 Litre",
    price: 13.77,
    category: "Primers & sealers",
    image: j("m564_porous_surface_primer_1l_square_300x225_7a46139cdeca7eafdd8c993d47545787.png"),
    description: "Bonding primer for plasterboard, render and other absorbent substrates.",
  },
  {
    id: "m564-4",
    name: "Porous Surface Primer 4 Litre",
    price: 46.73,
    category: "Primers & sealers",
    image: j("m5644_porous_surface_primer_4l_square_300x225_f812c89ec6ddcb2d404e0ef69ebf3a44.png"),
    description: "Bulk bonding primer for absorbent substrates on larger jobs.",
  },
  {
    id: "m562",
    name: "Smooth Surface Primer 1 Litre",
    price: 33,
    category: "Primers & sealers",
    image: j("m562_microestil_smooth_1l_square_300x225_ca9c613d08472b46fcfc197c687fa8d5.png"),
    description: "Grip primer for tile, glass and other non-absorbent surfaces.",
  },
  {
    id: "m563",
    name: "Smooth Surface Primer 4 Litre",
    price: 100,
    category: "Primers & sealers",
    image: j("m563_microestil_smooth_4l_square_300x225_244f59a42d3102696b683151319b52eb.png"),
    description: "Bulk grip primer for tile and non-absorbent substrates.",
  },
  {
    id: "m560",
    name: "Microestil Microshield 1 Litre",
    price: 35.5,
    category: "Primers & sealers",
    image: j("m560_microestil_microshield_1l_square_300x225_95431b4a01521f0b9127ddc918e4899a.png"),
    description: "Protective sealer coat that locks in colour and repels staining.",
  },
  {
    id: "m561",
    name: "Microestil Microshield 4 Litre",
    price: 109.09,
    category: "Primers & sealers",
    image: j("m561_microestil_microshield_4l_square_300x225_e1c785d8870672e946a696ddcc31eeb5.png"),
    description: "Bulk protective sealer for full-home applications.",
  },
  {
    id: "m570",
    name: "Superiorseal Primer 1kg",
    price: 33,
    category: "Primers & sealers",
    image: j("m570_superiorseal_primer_1kg_square_300x225_7f4bcfd92669873f1bd50ab6938aa029.png"),
    description: "High-performance primer coat for the Superiorseal system.",
  },
  {
    id: "m571",
    name: "Superiorseal Primer 5kg",
    price: 115,
    category: "Primers & sealers",
    image: j("m571_superiorseal_primer_5kg_square_1_300x225_548dabd50771605ca4278740af23634f.png"),
    description: "Bulk primer coat for the Superiorseal two-pack system.",
  },
  {
    id: "m573",
    name: "Superiorseal Gloss Part A 800g",
    price: 38,
    category: "Primers & sealers",
    image: j("m573_gloss_part_a_800g_square_300x225_057d1b4840c9ef3d3e822a9ed08dccdc.png"),
    description: "Gloss two-pack topcoat, part A. Pair with Part B hardener.",
  },
  {
    id: "m574",
    name: "Superiorseal Gloss Part A 4kg",
    price: 118,
    category: "Primers & sealers",
    image: j("m574_gloss_kit_part_a_4kg_square_300x225_658bf476cf8c0ce18d8f98bb15755dc3.png"),
    description: "Bulk gloss two-pack topcoat, part A.",
  },
  {
    id: "m576",
    name: "Superiorseal Matt Part A 800g",
    price: 42,
    category: "Primers & sealers",
    image: j("m576_matte_part_a_800g_square_1_300x225_114d962efcdd1b474401b44024ccac59.png"),
    description: "Matt two-pack topcoat, part A. Pair with Part B hardener.",
  },
  {
    id: "m577",
    name: "Superiorseal Matt Part A 4kg",
    price: 128,
    category: "Primers & sealers",
    image: j("m577_matte_part_a_4kg_square_300x225_30676273c7282ee4c4dff98eb274c6b5.png"),
    description: "Bulk matt two-pack topcoat, part A.",
  },
  {
    id: "m578",
    name: "Superiorseal 2K Part B 200g",
    price: 21,
    category: "Primers & sealers",
    image: j("m578_superiorseal_hardener_part_b_200g_square_300x225_b1b6acb86e0264e4505f46dc1f82a81f.png"),
    description: "Hardener for 800g Superiorseal gloss or matt topcoats.",
  },
  {
    id: "m579",
    name: "Superiorseal 2K Part B 1kg",
    price: 68,
    category: "Primers & sealers",
    image: j("m579_superiorseal_hardener_part_b_1kg_front_square_1_300x225_00edf0e121383452cb9c195e6b717a7b.png"),
    description: "Hardener for 4kg Superiorseal gloss or matt topcoats.",
  },
  {
    id: "wb2k-8",
    name: "WB2K Part 1 & 2 — 8 Litre Kit",
    price: 190,
    category: "Primers & sealers",
    image: j("m565_wb2k_epoxy_sealer_part_1_2_4l_square_300x225_b23933723fefd69d524aab15656f042b.png"),
    description: "Water-based two-pack epoxy sealer kit for floors and wet areas.",
  },
  {
    id: "wb2k-20",
    name: "WB2K Part 1 & 2 — 20 Litre Kit",
    price: 330,
    category: "Primers & sealers",
    image: j("m565_wb2k_epoxy_sealer_part_1_2_10l_square_v2_300x225_3c05489b59a68c06ef108495769c9202.png"),
    description: "Large water-based two-pack epoxy sealer kit for commercial jobs.",
  },
  {
    id: "syringe-20",
    name: "20ml Luer Lock Syringe",
    price: 1.82,
    category: "Accessories",
    image: j("download_43f31079b8ef5f20c6faec1ba1ea2156.jpg"),
    description: "For accurate pigment dosing when colour matching.",
  },
  {
    id: "syringe-60",
    name: "60ml Luer Lock Syringe",
    price: 3.64,
    category: "Accessories",
    image: j("00025162_da525eda8c75483db41f48593bf6cb02.jpg"),
    description: "Larger syringe for dosing pigment into full batches.",
  },
  {
    id: TRAINING_PRODUCT_ID,
    name: "DIY Micro Cement Training — 22 August 2026",
    price: 770,
    category: "Training",
    image: j("m520_microestil_plus_base_25kg_954b830b2aa43c9da28f4d9cc6aff1b1.png"),
    description:
      "Full-day hands-on workshop at our Malaga warehouse. All materials, tools and lunch included.",
  },
];

/** Everything that appears in the materials shop grid (training is booked on its own page). */
export const shopProducts = products.filter((p) => p.category !== "Training");

export const categories: ProductCategory[] = [
  "Micro cement",
  "Primers & sealers",
  "Pigments",
  "Accessories",
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(value);
