import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { siteImages } from "@/lib/projects";

const customImage = siteImages.customDesignsHero;
const bathroomImage = siteImages.cementoWork;

export const Route = createFileRoute("/custom-designs")({
  head: () => ({
    meta: [
      { title: "Moulds, Smooth Finishes & Custom Designs | Cemento Perth" },
      {
        name: "description",
        content:
          "Curved walls, arched niches, sculpted fireplaces, benchtops and bespoke micro cement mouldings designed and installed by Cemento in Perth.",
      },
      { property: "og:title", content: "Moulds, Smooth Finishes & Custom Designs | Cemento" },
      {
        property: "og:description",
        content:
          "Curved walls, arches, fireplaces and sculpted micro cement forms, designed and installed in Perth.",
      },
    ],
  }),
  component: CustomDesigns,
});

const works = [
  {
    title: "Arched niches & shelving",
    copy: "Formed on site, rendered and finished in the same micro cement as the surrounding wall so the shadow line is the only detail you see.",
  },
  {
    title: "Curved & rounded walls",
    copy: "Soft-radius corners, bullnose returns and full curved partitions — micro cement wraps geometry that tile simply can't follow.",
  },
  {
    title: "Fireplaces & hearths",
    copy: "Sculpted surrounds with heat-appropriate substrates and a sealed, wipeable finish.",
  },
  {
    title: "Benchtops & vanities",
    copy: "Seamless waterfall edges, integrated splashbacks and moulded basins in a food-safe two-pack seal.",
  },
  {
    title: "Outdoor kitchens & seating",
    copy: "UV-stable exterior systems for alfresco benches, BBQ surrounds and built-in bench seating.",
  },
  {
    title: "Bespoke mould work",
    copy: "Bring a sketch, a reference photo or a designer's drawing. We build the form, we finish the surface.",
  },
];

function CustomDesigns() {
  return (
    <>
      <PageHero
        eyebrow="Custom designs"
        title="Moulds, smooth finishes and custom designs"
        intro="Micro cement is applied by hand, which means it can follow any shape you can build. We form, render and finish bespoke elements so they read as one continuous piece with the rest of your space."
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/contact">Discuss your design</Link>
        </Button>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <img
            src={customImage}
            alt="Curved micro cement wall with arched niches and a sculpted fireplace"
            loading="lazy"
            width={1200}
            height={912}
            className="w-full rounded-sm object-cover shadow-[var(--shadow-soft)]"
          />
          <div>
            <p className="eyebrow">Design to install</p>
            <h2 className="mt-3 text-3xl md:text-4xl">One trade, one finish, no joins</h2>
            <p className="mt-5 text-muted-foreground">
              We work either from your own design or with our designers. Once the form is agreed we
              handle the substrate, the waterproofing where required, the render and the final
              seal — so responsibility for the finished look sits in one place.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every custom element is quoted with the same fixed-price approach as the rest of our
              works: planned on the day of consultation, priced before we start.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <article key={w.title} className="surface-card surface-card-hover rounded-sm p-6">
              <h3 className="text-lg">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/60">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
          <img
            src={bathroomImage}
            alt="Seamless micro cement bathroom with integrated shower niche"
            loading="lazy"
            width={1200}
            height={912}
            className="w-full rounded-sm object-cover shadow-[var(--shadow-soft)]"
          />
          <div>
            <h2 className="text-3xl md:text-4xl">Have a reference in mind?</h2>
            <p className="mt-4 text-muted-foreground">
              Send us the photo. We'll tell you what it takes to build it, what it will cost, and
              show you a render of it in your own room first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="clay" size="lg">
                <Link to="/contact">Send your brief</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/visualiser">Try the AI visualiser</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
