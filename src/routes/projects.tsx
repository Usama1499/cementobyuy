import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { siteImages } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { projects, siteImages } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Projects | Cemento Micro Cement Perth" },
      {
        name: "description",
        content:
          "Browse Cemento micro cement projects across Perth — seamless bathrooms, curved feature walls, benchtops, pool surrounds and commercial fit-outs.",
      },
      { property: "og:title", content: "Our Projects | Cemento Micro Cement Perth" },
      {
        property: "og:description",
        content:
          "A gallery of completed micro cement work across Perth: wet areas, feature walls, floors, benchtops and commercial fit-outs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const reduce = useReducedMotion();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our projects"
        intro="Seamless micro cement across Perth homes, outdoor areas and commercial fit-outs — every job installed and finished by our own trades."
        image={siteImages.projectsPano}
        imageAlt="Curved micro cement atrium with a floating stair in a Perth home"
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/contact">Start your project</Link>
        </Button>
      </PageHero>

      <section className="container-page py-16 md:py-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {projects.map((p, i) => (
            <motion.figure
              key={p.id}
              className="surface-card group break-inside-avoid overflow-hidden rounded-sm"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} — micro cement project in ${p.location}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06] ${
                    p.tall ? "aspect-3/4" : "aspect-4/3"
                  }`}
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-foreground backdrop-blur">
                  {p.category}
                </span>
              </div>
              <figcaption className="p-5">
                <h2 className="text-base leading-snug">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-clay" /> {p.location}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-[image:var(--gradient-sand)]">
        <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="flex items-center gap-6">
            <img
              src={siteImages.workHall}
              alt="Curved micro cement hallway"
              loading="lazy"
              className="hidden h-24 w-24 rounded-sm object-cover md:block"
            />
            <div>
              <h2 className="text-3xl md:text-4xl">Want something like this?</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Book a consultation and we'll plan the works and fix the price on the day.
              </p>
            </div>
          </div>
          <Button asChild variant="clay" size="lg">
            <Link to="/contact">Request a quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
