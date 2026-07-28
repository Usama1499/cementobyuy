import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layers, PencilRuler, ShoppingBag, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";
import heroImage from "@/assets/hero-microcement.jpg";
import bathroomImage from "@/assets/bathroom.jpg";
import customImage from "@/assets/custom-designs.jpg";
import trainingImage from "@/assets/training.jpg";
import finoTexture from "@/assets/texture-fino.jpg";
import medioTexture from "@/assets/texture-medio.jpg";
import charcoalTexture from "@/assets/texture-charcoal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cemento | Perth's Micro Cement Specialists" },
      {
        name: "description",
        content:
          "Seamless micro cement walls, floors and benchtops across Perth. Fixed pricing, custom mouldings, DIY training and materials from our Malaga warehouse.",
      },
      { property: "og:title", content: "Cemento | Perth's Micro Cement Specialists" },
      {
        property: "og:description",
        content:
          "Seamless micro cement walls, floors and benchtops across Perth. Fixed pricing, WASPA and HBA members.",
      },
    ],
  }),
  component: Home,
});

const services = [
  {
    to: "/textures",
    label: "Textures",
    icon: Layers,
    copy: "Fino, Medio and bespoke tinted finishes for walls, floors and wet areas.",
  },
  {
    to: "/custom-designs",
    label: "Moulds & custom designs",
    icon: PencilRuler,
    copy: "Curved walls, arched niches, fireplaces, benchtops and sculpted joinery.",
  },
  {
    to: "/store",
    label: "Materials to purchase",
    icon: ShoppingBag,
    copy: "Microestil base, finishing coats, primers, sealers and pigments.",
  },
  {
    to: "/training",
    label: "DIY training",
    icon: GraduationCap,
    copy: "Hands-on workshops so you can apply micro cement yourself, properly.",
  },
] as const;

const reasons = [
  {
    title: "Price is fixed",
    copy: "Works price is fixed. We plan out the works and the costs the day of the consultation.",
  },
  {
    title: "Project design",
    copy: "We can realise your own design project, or use the services of our designers.",
  },
  {
    title: "Quality of materials",
    copy: "We carry out the purchasing and delivery. We work with the best suppliers.",
  },
  {
    title: "Best professionals",
    copy: "Members of WASPA and HBA — our trades have won apprentice of the year on multiple occasions.",
  },
];

const phases = [
  {
    n: "01",
    title: "Your request",
    copy: "Leave a request, and our consultant will arrange to visit you and create the works plan.",
  },
  {
    n: "02",
    title: "Cost calculation",
    copy: "We'll generate a bill and a job pack and send it to you for approval.",
  },
  {
    n: "03",
    title: "Works",
    copy: "The next day, we are ready to order and deliver all necessary materials and begin the works.",
  },
  {
    n: "04",
    title: "Work approval",
    copy: "We walk the finished job with you, hand over care instructions and sign off together.",
  },
];

const textures = [
  { src: finoTexture, name: "Fino", note: "Ultra-smooth, low texture" },
  { src: medioTexture, name: "Medio", note: "Medium grain, hard wearing" },
  { src: charcoalTexture, name: "Charcoal", note: "Deep tone, satin sealed" },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Living room with seamless micro cement walls and floor in Perth"
          width={1600}
          height={1104}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-veil)]" />
        <div className="container-page flex min-h-[78vh] flex-col justify-end py-20 md:min-h-[86vh] md:py-28">
          <p className="eyebrow text-clay-foreground/70">Perth · Western Australia</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-[1.03] text-ink-foreground md:text-7xl">
            Perth's best micro cement
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/80 md:text-lg">
            Seamless, joint-free surfaces for walls, floors, benchtops and wet areas — designed,
            installed and guaranteed by our own trades.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="clay" size="lg">
              <Link to="/contact">Get a quote</Link>
            </Button>
            <Button asChild variant="hero" size="lg">
              <Link to="/visualiser">
                <Sparkles /> See it on your wall
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <p className="eyebrow">Services</p>
        <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl">
          How we help with your micro cement needs
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="surface-card surface-card-hover group flex flex-col rounded-sm p-6"
            >
              <s.icon className="h-6 w-6 text-clay" />
              <h3 className="mt-5 text-lg leading-snug">{s.label}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-clay">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">Why Cemento</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Why choose Cemento?</h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              We've built our reputation on finishing what we quote — on time, on budget and to a
              standard that holds up years later.
            </p>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title}>
                <dt className="font-display text-base font-semibold">{r.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <p className="eyebrow">Process</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Phases of our works</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {phases.map((p) => (
            <li key={p.n} className="border-t-2 border-clay pt-5">
              <span className="font-display text-3xl font-bold text-clay">{p.n}</span>
              <h3 className="mt-3 text-lg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-ink py-20 text-ink-foreground md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">AI visualiser</p>
            <h2 className="mt-3 text-3xl text-ink-foreground md:text-4xl">
              See how your wall will look — in real time
            </h2>
            <p className="mt-5 max-w-lg text-ink-foreground/75">
              Upload a photo of your room, choose a micro cement finish, and our AI re-renders your
              actual space with that finish applied. No mock-ups, no guessing — your room, your
              light, your furniture.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="clay" size="lg">
                <Link to="/visualiser">
                  <Sparkles /> Try the visualiser
                </Link>
              </Button>
              <Button asChild variant="hero" size="lg">
                <a
                  href={whatsappLink("Hi Cemento, I'd like to send through a photo of my room.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Send us a photo
                </a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {textures.map((t) => (
              <figure key={t.name} className="overflow-hidden rounded-sm">
                <img
                  src={t.src}
                  alt={`${t.name} micro cement finish`}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="mt-2 text-xs text-ink-foreground/60">
                  <span className="block font-medium text-ink-foreground/90">{t.name}</span>
                  {t.note}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <p className="eyebrow">Recent work</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Built for real Perth homes</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { src: bathroomImage, title: "Seamless wet areas", copy: "Waterproofed, sealed, grout-free." },
            { src: customImage, title: "Sculpted forms", copy: "Arches, niches and curved joinery." },
            { src: trainingImage, title: "Trade-grade materials", copy: "The same products we install with." },
          ].map((c) => (
            <figure key={c.title} className="surface-card overflow-hidden rounded-sm">
              <img
                src={c.src}
                alt={c.title}
                loading="lazy"
                width={1200}
                height={912}
                className="aspect-4/3 w-full object-cover"
              />
              <figcaption className="p-5">
                <h3 className="text-base">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-[image:var(--gradient-sand)]">
        <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <h2 className="text-3xl md:text-4xl">Ready to start?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Book a consultation and we'll plan the works and fix the price on the day. Or call{" "}
              <a href={site.phoneHref} className="font-medium text-foreground underline-offset-4 hover:underline">
                {site.phoneDisplay}
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="clay" size="lg">
              <Link to="/contact">Request a quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/store">Shop materials</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
