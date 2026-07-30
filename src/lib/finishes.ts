import ramePatina from "@/assets/finishes/rame-patina.jpg.asset.json";
import azzurroLinea from "@/assets/finishes/azzurro-linea.jpg.asset.json";
import terraToscana from "@/assets/finishes/terra-toscana.jpg.asset.json";
import sabbiaFine from "@/assets/finishes/sabbia-fine.jpg.asset.json";
import coccodrillo from "@/assets/finishes/coccodrillo.jpg.asset.json";
import oroSpazzolato from "@/assets/finishes/oro-spazzolato.jpg.asset.json";
import marmoRosa from "@/assets/finishes/marmo-rosa.jpg.asset.json";
import cementoNaturale from "@/assets/finishes/cemento-naturale.jpg.asset.json";
import oroAntico from "@/assets/finishes/oro-antico.jpg.asset.json";
import coralloVeneziano from "@/assets/finishes/corallo-veneziano.jpg.asset.json";
import champagneVelvet from "@/assets/finishes/champagne-velvet.jpg.asset.json";
import argentoSeta from "@/assets/finishes/argento-seta.jpg.asset.json";

export interface Finish {
  /** Matches `textures.id` in the database. */
  id: string;
  no: number;
  name: string;
  description: string;
  /** Where the finish performs best. */
  best: string;
  swatch: string;
  image: string;
}

/**
 * The CEMENTO premium finish range. Kept in sync with the `textures` table —
 * this static copy powers public, pre-rendered marketing pages.
 */
export const finishes: Finish[] = [
  {
    id: "rame-patina",
    no: 1,
    name: "Rame Patina",
    description: "A warm copper finish with an oxidised patina effect.",
    best: "Feature walls · Fireplaces",
    swatch: "#a8563a",
    image: ramePatina.url,
  },
  {
    id: "azzurro-linea",
    no: 2,
    name: "Azzurro Linea",
    description: "Deep ocean blue with fine vertical brush lines.",
    best: "Feature walls · Bar fronts",
    swatch: "#1f5f8b",
    image: azzurroLinea.url,
  },
  {
    id: "terra-toscana",
    no: 3,
    name: "Terra Toscana",
    description: "Rustic terracotta with layered movement.",
    best: "Living areas · Alfresco",
    swatch: "#b5623f",
    image: terraToscana.url,
  },
  {
    id: "sabbia-fine",
    no: 4,
    name: "Sabbia Fine",
    description: "Fine sand-textured finish in a soft beige.",
    best: "Walls · Ceilings · Joinery",
    swatch: "#d9c7a7",
    image: sabbiaFine.url,
  },
  {
    id: "coccodrillo",
    no: 5,
    name: "Coccodrillo",
    description: "Crocodile skin-inspired textured finish.",
    best: "Feature panels · Reception",
    swatch: "#b48b4a",
    image: coccodrillo.url,
  },
  {
    id: "oro-spazzolato",
    no: 6,
    name: "Oro Spazzolato",
    description: "Brushed gold metallic with subtle shimmer.",
    best: "Niches · Splashbacks",
    swatch: "#c9a45c",
    image: oroSpazzolato.url,
  },
  {
    id: "marmo-rosa",
    no: 7,
    name: "Marmo Rosa",
    description: "Grey marble with blush-pink veining.",
    best: "Bathrooms · Vanities",
    swatch: "#c9a3a0",
    image: marmoRosa.url,
  },
  {
    id: "cemento-naturale",
    no: 8,
    name: "Cemento Naturale",
    description: "Soft natural concrete effect.",
    best: "Floors · Walls · Whole homes",
    swatch: "#b9b5ae",
    image: cementoNaturale.url,
  },
  {
    id: "oro-antico",
    no: 9,
    name: "Oro Antico",
    description: "Antique brushed gold finish.",
    best: "Feature walls · Hospitality",
    swatch: "#c1934f",
    image: oroAntico.url,
  },
  {
    id: "corallo-veneziano",
    no: 10,
    name: "Corallo Veneziano",
    description: "Venetian plaster with warm coral tones.",
    best: "Entries · Bedrooms",
    swatch: "#c86a55",
    image: coralloVeneziano.url,
  },
  {
    id: "champagne-velvet",
    no: 11,
    name: "Champagne Velvet",
    description: "Soft champagne metallic finish.",
    best: "Feature walls · Joinery",
    swatch: "#dcc49a",
    image: champagneVelvet.url,
  },
  {
    id: "argento-seta",
    no: 12,
    name: "Argento Seta",
    description: "Silver silk with elegant horizontal movement.",
    best: "Feature walls · Commercial",
    swatch: "#c3c6c8",
    image: argentoSeta.url,
  },
];
