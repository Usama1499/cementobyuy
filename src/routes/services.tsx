import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { siteImages } from "@/lib/projects";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Micro Cement, Rendering & Repair Services in Perth | Cemento" },
      {
        name: "description",
        content:
          "Micro cement walls, floors and benchtops, plus rendering, ceiling and wall repairs, patch repairs, renovations, texture coatings and decorative finishes across Perth.",
      },
      { property: "og:title", content: "Micro Cement, Rendering & Repair Services | Cemento" },
      {
        property: "og:description",
        content:
          "Fixed-price micro cement, rendering, repairs, renovations and decorative finishes across Perth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const offerings = [
  {
    title: "Walls & feature walls",
    image: siteImages.workLounge,
    copy: "Seamless micro cement over plasterboard, brick, render or existing tile. No joins, no grout lines, applied in two base coats and two finishing coats before sealing.",
    points: ["Interior and exterior", "Over existing tile without demolition", "Any tint, any texture"],
  },
  {
    title: "Floors & stairs",
    image: siteImages.projectsPano,
    copy: "A 2–3mm hard-wearing floor system that goes straight over existing tile or concrete, sealed with a two-pack topcoat rated for domestic and commercial traffic.",
    points: ["No demolition, no lost head height", "Underfloor heating compatible", "Slip-rated sealer options"],
  },
  {
    title: "Bathrooms & wet areas",
    image: siteImages.bathroom,
    copy: "Fully waterproofed shower walls, floors, niches and vanities finished in one continuous surface — easier to clean and far easier to live with than tile.",
    points: ["AS 3740 waterproofing", "Grout-free showers", "Integrated niches and hobs"],
  },
  {
    title: "Benchtops & joinery",
    image: siteImages.banner,
    copy: "Kitchen islands, vanities, bars and shelving wrapped in micro cement with a food-safe, stain-resistant two-pack seal.",
    points: ["Seamless waterfall edges", "Matt or gloss sealed", "Repairable in place"],
  },
  {
    title: "Rendering",
    image: siteImages.saunders,
    copy: "Cement and acrylic rendering to brick, block and blueboard — inside and out — levelled and floated ready for paint, texture or micro cement.",
    points: ["New builds and re-renders", "Internal and external", "Solid substrate preparation"],
  },
  {
    title: "Texture coatings",
    image: siteImages.forbes,
    copy: "Roll-on, sponge and trowel-applied texture coatings that hide substrate imperfections and give exterior walls a durable, UV-stable finish.",
    points: ["Sand, roll and knockdown textures", "UV and weather resistant", "Full colour range"],
  },
  {
    title: "Ceiling repairs",
    image: siteImages.workHall,
    copy: "Sagging, water-damaged and cracked ceilings re-fixed, re-set and re-finished so the repair disappears into the surrounding surface.",
    points: ["Water damage rectification", "Cornice repair and replacement", "Set and sanded ready to paint"],
  },
  {
    title: "Wall repairs",
    image: siteImages.cementoWork,
    copy: "Cracked render, damaged plasterboard, blown sections and impact damage cut out, rebuilt and blended back into the existing wall.",
    points: ["Crack stitching", "Plasterboard replacement", "Seamless blending"],
  },
  {
    title: "Patch repairs",
    image: siteImages.materials,
    copy: "Small-scale make-good work — old fixings, service penetrations, door stops and dents — patched and finished to match the surrounding texture.",
    points: ["Fast turnaround", "Texture matched", "Ideal for end-of-lease"],
  },
  {
    title: "Renovations",
    image: siteImages.customDesignsHero,
    copy: "Full room and whole-home resurfacing programs managed end to end, from strip-out and substrate works through to the final sealed finish.",
    points: ["Bathrooms and kitchens", "Whole-home resurfacing", "One trade, one point of contact"],
  },
  {
    title: "Decorative finishes",
    image: siteImages.workPool,
    copy: "Venetian plasters, metallics, marbles and patinas from the twelve-finish CEMENTO range, hand-applied and tinted on site.",
    points: ["12 signature finishes", "Custom colour matching", "Sample panels before you commit"],
  },
  {
    title: "Residential services",
    image: siteImages.training,
    copy: "Homeowner projects of every size — a single feature wall, an ensuite, an alfresco, or a complete continuous-floor pour through the whole house.",
    points: ["Fixed price on the day", "Our own trades, no subbies", "Workmanship guarantee"],
  },
  {
    title: "Commercial services",
    image: siteImages.trades,
    copy: "Retail, hospitality and multi-residential fit-outs delivered to program, with after-hours staging where the site demands it.",
    points: ["Fit-outs and shopfronts", "Apartment developments", "After-hours works available"],
  },
  {
    title: "Materials supply",
    image: siteImages.materials,
    copy: "The full Microestil system — base, Fino, Medio, primers, sealers and pigments — available for pick-up from our Malaga warehouse.",
    points: ["Trade and DIY welcome", "Colour matching on request", "Pick up at 17 Irvine Street"],
  },
  {
    title: "DIY training",
    image: siteImages.diyTraining,
    copy: "A hands-on workshop covering substrate prep, priming, trowelling, sanding and sealing so you can take on your own project with confidence.",
    points: ["Small groups", "Practice panels included", "Ongoing product support"],
  },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything micro cement, under one roof"
        intro="From a single feature wall to a whole-home resurface — plus rendering, repairs, renovations and decorative coatings. We plan the works, fix the price and install with our own trades."
        image={siteImages.slide1}
        imageAlt="Cemento tradesman finishing a micro cement surface on a Perth job site"
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/contact">Book a consultation</Link>
        </Button>
        <Button asChild variant="hero" size="lg">
          <Link to="/visualiser">Preview it on your wall</Link>
        </Button>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => (
            <article
              key={o.title}
              className="surface-card surface-card-hover group flex flex-col overflow-hidden rounded-sm"
            >
              <div className="overflow-hidden">
                <img
                  src={o.image}
                  alt={o.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-16/9 w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl">{o.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{o.copy}</p>
                <ul className="mt-5 space-y-2">
                  {o.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
