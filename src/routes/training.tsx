import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Check, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { siteImages } from "@/lib/projects";
import { BookingDialog } from "@/components/BookingDialog";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "DIY Micro Cement Training in Perth | Cemento" },
      {
        name: "description",
        content:
          "Hands-on micro cement training in Malaga, Perth. Next course 22 August 2026 — special offer $770. Learn prep, priming, trowelling, sanding and sealing from Maurizio and Rob.",
      },
      { property: "og:title", content: "DIY Micro Cement Training in Perth | Cemento" },
      {
        property: "og:description",
        content:
          "Next micro cement workshop 22 August 2026 in Malaga, Perth — special offer $770. Book now.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Training,
});

const curriculum = [
  "Reading and preparing substrates: plasterboard, render, tile, concrete",
  "Choosing and applying the right primer",
  "Mixing Microestil base, Fino and Medio consistently",
  "Trowel technique for smooth, textured and mottled finishes",
  "Tinting with MCT pigments and repeatable colour matching",
  "Sanding between coats without burning through",
  "Sealing: Microshield, Superiorseal two-pack and WB2K epoxy",
  "Repairs, maintenance and what to tell your own clients",
];

const trainers = [
  {
    name: "Maurizio Cremasco",
    role: "Founder of Cemento",
    image: siteImages.maurizio,
    bio: "As the founder of Cemento, Maurizio brings decades of hands-on experience in traditional plastering and decorative finishes.",
  },
  {
    name: "Rob Whitehurst",
    role: "Trade trainer & site supervisor",
    image: siteImages.trades,
    bio: "With over 45 years in plastering and decorative finishes, Rob is a Master Plasterer whose expertise spans residential renovations to large-scale commercial projects.",
  },
];

function Training() {
  const bookMessage = "Hi Cemento, I'd like to book the DIY training on 22 August 2026.";

  return (
    <>
      <PageHero
        eyebrow="DIY training"
        title="Learn to apply micro cement properly"
        intro="A hands-on workshop at our Malaga warehouse for homeowners and trades. Small groups, practice panels, real products — and honest advice about what micro cement will and won't forgive."
        image={siteImages.trades}
        imageAlt="The Cemento trade team at the Malaga training warehouse in Perth"
      >
        <BookingDialog />
        <Button asChild variant="hero" size="lg">
          <a href={whatsappLink(bookMessage)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-4 w-4" /> Ask about dates
          </a>
        </Button>
      </PageHero>

      {/* UPCOMING TRAINING */}
      <section className="border-b border-border bg-[image:var(--gradient-sand)]">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow">Upcoming training</p>
          <div className="surface-card mt-6 grid gap-8 rounded-sm p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
            <div>
              <h2 className="text-3xl md:text-4xl">Next course: 22 August 2026</h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Date</dt>
                    <dd className="text-sm font-medium">Sat 22 Aug 2026</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Location</dt>
                    <dd className="text-sm font-medium">{site.address}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Tag className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Special offer</dt>
                    <dd className="text-sm font-medium">$770 per person</dd>
                  </div>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Places are limited so everyone gets trowel time on their own practice panel. All
                materials, tools and lunch are included, and you leave with a product list for your
                first job.
              </p>
            </div>
            <div className="rounded-sm border border-clay/30 bg-clay/5 p-6 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Special offer</p>
              <p className="mt-2 font-display text-5xl font-bold text-clay">$770</p>
              <p className="mt-1 text-sm text-muted-foreground">per person, all materials included</p>
              <BookingDialog>
                <Button variant="clay" size="lg" className="mt-6 w-full">
                  Book now &amp; pay online
                </Button>
              </BookingDialog>
              <Button asChild variant="outline" size="lg" className="mt-3 w-full">
                <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-start md:py-28">
        <img
          src={siteImages.diyTraining}
          alt="Sanding a micro cement wall during a Cemento DIY training session"
          loading="lazy"
          width={1200}
          height={912}
          className="w-full rounded-sm object-cover shadow-[var(--shadow-soft)]"
        />
        <div>
          <p className="eyebrow">What you'll cover</p>
          <h2 className="mt-3 text-3xl md:text-4xl">A full day, start to sealed</h2>
          <ul className="mt-8 space-y-3">
            {curriculum.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm leading-relaxed">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                {c}
              </li>
            ))}
          </ul>
          <div className="surface-card mt-10 rounded-sm p-6">
            <h3 className="text-lg">Where and when</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {site.address} — {site.hours}. Sessions run in small groups; contact us for the next
              available date and current pricing.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Everyone who trains with us can buy the full Microestil range from our{" "}
              <Link to="/store" className="font-medium text-clay underline-offset-4 hover:underline">
                materials shop
              </Link>{" "}
              and call us for support on their first job.
            </p>
            <BookingDialog>
              <Button variant="clay" size="lg" className="mt-6">
                Book now
              </Button>
            </BookingDialog>
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="border-y border-border bg-secondary/60">
        <div className="container-page py-20 md:py-24">
          <p className="eyebrow">Your trainers</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Taught by the people on the tools</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {trainers.map((t) => (
              <article key={t.name} className="surface-card overflow-hidden rounded-sm">
                <img
                  src={t.image}
                  alt={`${t.name}, ${t.role} at Cemento`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/3 w-full object-cover object-top"
                />
                <div className="p-7">
                  <h3 className="text-xl">{t.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-clay">{t.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <BookingDialog />
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappLink(bookMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" /> Message us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
