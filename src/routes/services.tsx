import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import bathroomImage from "@/assets/bathroom.jpg";
import customImage from "@/assets/custom-designs.jpg";
import trainingImage from "@/assets/training.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Micro Cement Services in Perth | Cemento" },
      {
        name: "description",
        content:
          "Micro cement walls, floors, benchtops and wet areas across Perth. Fixed-price installation, custom mouldings, materials supply and DIY training.",
      },
      { property: "og:title", content: "Micro Cement Services in Perth | Cemento" },
      {
        property: "og:description",
        content:
          "Fixed-price micro cement installation for walls, floors, benchtops and wet areas across Perth.",
      },
    ],
  }),
  component: Services,
});

const offerings = [
  {
    title: "Walls & feature walls",
    image: customImage,
    copy: "Seamless micro cement over plasterboard, brick, render or existing tile. No joins, no grout lines, applied in two base coats and two finishing coats before sealing.",
    points: ["Interior and exterior", "Over existing tile without demolition", "Any tint, any texture"],
  },
  {
    title: "Floors & stairs",
    image: bathroomImage,
    copy: "A 2–3mm hard-wearing floor system that goes straight over existing tile or concrete, sealed with a two-pack topcoat rated for domestic and commercial traffic.",
    points: ["No demolition, no lost head height", "Underfloor heating compatible", "Slip-rated sealer options"],
  },
  {
    title: "Bathrooms & wet areas",
    image: bathroomImage,
    copy: "Fully waterproofed shower walls, floors, niches and vanities finished in one continuous surface — easier to clean and far easier to live with than tile.",
    points: ["AS 3740 waterproofing", "Grout-free showers", "Integrated niches and hobs"],
  },
  {
    title: "Benchtops & joinery",
    image: customImage,
    copy: "Kitchen islands, vanities, bars and shelving wrapped in micro cement with a food-safe, stain-resistant two-pack seal.",
    points: ["Seamless waterfall edges", "Matt or gloss sealed", "Repairable in place"],
  },
  {
    title: "Materials supply",
    image: trainingImage,
    copy: "The full Microestil system — base, Fino, Medio, primers, sealers and pigments — available for pick-up from our Malaga warehouse.",
    points: ["Trade and DIY welcome", "Colour matching on request", "Pick up at 17 Irvine Street"],
  },
  {
    title: "DIY training",
    image: trainingImage,
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
        intro="From a single feature wall to a whole-home resurface, we plan the works, fix the price and install with our own trades. We also supply materials and train people who'd rather do it themselves."
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/contact">Book a consultation</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/visualiser">Preview it on your wall</Link>
        </Button>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2">
          {offerings.map((o) => (
            <article key={o.title} className="surface-card overflow-hidden rounded-sm">
              <img
                src={o.image}
                alt={o.title}
                loading="lazy"
                width={1200}
                height={912}
                className="aspect-16/9 w-full object-cover"
              />
              <div className="p-6 md:p-8">
                <h2 className="text-2xl">{o.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.copy}</p>
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
