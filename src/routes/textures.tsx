import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import finoTexture from "@/assets/texture-fino.jpg";
import medioTexture from "@/assets/texture-medio.jpg";
import charcoalTexture from "@/assets/texture-charcoal.jpg";

export const Route = createFileRoute("/textures")({
  head: () => ({
    meta: [
      { title: "Micro Cement Textures & Finishes | Cemento Perth" },
      {
        name: "description",
        content:
          "Explore Cemento's micro cement textures — Fino, Medio and tinted finishes — with guidance on where each finish works best in a Perth home.",
      },
      { property: "og:title", content: "Micro Cement Textures & Finishes | Cemento Perth" },
      {
        property: "og:description",
        content:
          "Fino, Medio and custom tinted micro cement finishes, with guidance on where each works best.",
      },
    ],
  }),
  component: Textures,
});

const finishes = [
  {
    src: finoTexture,
    name: "Microestil Fino",
    grain: "Fine grain",
    copy: "The smoothest finish in the range. Very subtle trowel movement, almost suede to the touch. Best on walls, ceilings, vanities and anywhere you want the surface to read as calm and continuous.",
    best: "Walls · Ceilings · Joinery",
  },
  {
    src: medioTexture,
    name: "Microestil Medio",
    grain: "Medium grain",
    copy: "A tougher, more textural coat with visible movement and mottling. Its extra body makes it the right choice underfoot and in high-traffic commercial spaces.",
    best: "Floors · Stairs · Commercial",
  },
  {
    src: charcoalTexture,
    name: "Tinted & sealed",
    grain: "Any tone",
    copy: "Every finish is tinted on site using MCT pigments — Blanco, Negro, Calido, Sombra, Crema and Marron — then sealed matt, satin or gloss. Bring us a colour and we'll match it.",
    best: "Feature walls · Bespoke colour",
  },
];

const sheens = [
  { name: "Matt", copy: "Natural, chalky and forgiving. The most popular sheen for walls." },
  { name: "Satin", copy: "A soft low sheen that lifts colour depth without showing every mark." },
  { name: "Gloss", copy: "Reflective and easy to wipe down. Best for benchtops and splashbacks." },
];

function Textures() {
  return (
    <>
      <PageHero
        eyebrow="Textures"
        title="Choose the grain, the tone and the sheen"
        intro="Micro cement is a system, not a single product. The grain you choose changes how the surface feels, the pigment changes the tone, and the sealer decides how it lives day to day."
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/visualiser">Preview a finish on your room</Link>
        </Button>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          {finishes.map((f) => (
            <article key={f.name} className="surface-card overflow-hidden rounded-sm">
              <img
                src={f.src}
                alt={`${f.name} micro cement texture close-up`}
                loading="lazy"
                width={900}
                height={900}
                className="aspect-square w-full object-cover"
              />
              <div className="p-6">
                <p className="eyebrow text-[0.6rem]">{f.grain}</p>
                <h2 className="mt-2 text-xl">{f.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {f.best}
                </p>
              </div>
            </article>
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
          Send us a photo and we'll recommend a grain, tone and sheen — or bring the decision
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
