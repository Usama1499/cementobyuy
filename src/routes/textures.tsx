import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { finishes } from "@/lib/finishes";

export const Route = createFileRoute("/textures")({
  head: () => ({
    meta: [
      { title: "12 Premium Micro Cement Finishes | Cemento Perth" },
      {
        name: "description",
        content:
          "Explore the CEMENTO range — Rame Patina, Azzurro Linea, Terra Toscana, Coccodrillo, Marmo Rosa and more. Twelve Italian-inspired micro cement finishes for Perth homes.",
      },
      { property: "og:title", content: "12 Premium Micro Cement Finishes | Cemento Perth" },
      {
        property: "og:description",
        content:
          "Twelve Italian-inspired micro cement finishes — copper patinas, brushed golds, marbles and natural concrete.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Textures,
});

const sheens = [
  { name: "Matt", copy: "Natural, chalky and forgiving. The most popular sheen for walls." },
  { name: "Satin", copy: "A soft low sheen that lifts colour depth without showing every mark." },
  { name: "Gloss", copy: "Reflective and easy to wipe down. Best for benchtops and splashbacks." },
];

function Textures() {
  return (
    <>
      <PageHero
        eyebrow="The CEMENTO range"
        title="Twelve finishes. One seamless surface."
        intro="Every finish below is hand-applied and tinted on site. The grain decides how the surface feels, the pigment decides the tone, and the sealer decides how it lives day to day."
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/visualiser">Preview a finish on your room</Link>
        </Button>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {finishes.map((f, i) => (
            <motion.article
              key={f.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="surface-card surface-card-hover group overflow-hidden rounded-sm"
            >
              <div className="relative overflow-hidden">
                <img
                  src={f.image}
                  alt={`${f.name} — ${f.description}`}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 font-display text-xs font-semibold">
                  No. {String(f.no).padStart(2, "0")}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border border-border"
                    style={{ backgroundColor: f.swatch }}
                  />
                  <h2 className="text-xl">{f.name}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {f.best}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60">
        <div className="container-page grid gap-10 py-16 md:grid-cols-3 md:py-20">
          {sheens.map((s) => (
            <div key={s.name}>
              <h3 className="font-display text-lg font-semibold">{s.name} seal</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 text-center md:py-24">
        <h2 className="text-3xl md:text-4xl">Not sure which finish suits your space?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Send us a photo and we'll recommend a finish, tone and sheen — or bring the decision
          forward and render it yourself with the AI visualiser.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="clay" size="lg">
            <Link to="/visualiser">Open the visualiser</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Talk to us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
