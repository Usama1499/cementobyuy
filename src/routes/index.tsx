import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  Calculator,
  Hammer,
  CheckCircle2,
  Layers,
  MapPin,
  PencilRuler,
  ShoppingBag,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";
import { finishes } from "@/lib/finishes";
import { projects, siteImages } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cemento | Perth's Micro Cement Specialists" },
      {
        name: "description",
        content:
          "Seamless micro cement walls, floors and benchtops across Perth. Twelve premium finishes, fixed pricing, custom mouldings, DIY training and materials from our Malaga warehouse.",
      },
      { property: "og:title", content: "Cemento | Perth's Micro Cement Specialists" },
      {
        property: "og:description",
        content:
          "Seamless micro cement walls, floors and benchtops across Perth. Fixed pricing, WASPA and HBA members.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          name: "Cemento",
          description: "Micro cement walls, floors and benchtops in Perth, Western Australia.",
          telephone: "+61410040994",
          address: {
            "@type": "PostalAddress",
            streetAddress: "17 Irvine Street",
            addressLocality: "Malaga",
            addressRegion: "WA",
            postalCode: "6090",
            addressCountry: "AU",
          },
          areaServed: "Perth, Western Australia",
          openingHours: "Mo-Fr 07:00-16:00",
        }),
      },
    ],
  }),
  component: Home,
});

/** Scroll-triggered fade-and-rise wrapper, respectful of reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    to: "/textures",
    label: "Textures & finishes",
    icon: Layers,
    image: siteImages.workLounge,
    copy: "Twelve premium finishes — copper patinas, brushed golds, marbles and natural concrete.",
  },
  {
    to: "/custom-designs",
    label: "Moulds & custom designs",
    icon: PencilRuler,
    image: siteImages.customDesigns,
    copy: "Curved walls, arched niches, fireplaces, benchtops and sculpted joinery.",
  },
  {
    to: "/store",
    label: "Materials to purchase",
    icon: ShoppingBag,
    image: siteImages.materials,
    copy: "Microestil base, finishing coats, primers, sealers and pigments — trade-grade stock.",
  },
  {
    to: "/training",
    label: "DIY training",
    icon: GraduationCap,
    image: siteImages.stephin,
    copy: "Hands-on workshops so you can apply micro cement yourself, properly.",
  },
] as const;

const slides = [
  {
    image: siteImages.slide1,
    alt: "Cemento tradesman finishing a micro cement benchtop in a modern Perth kitchen",
  },
  {
    image: siteImages.slide2,
    alt: "Curved micro cement staircase and indoor pool in a minimalist Perth home",
  },
  {
    image: siteImages.slide3,
    alt: "Cemento branded feature wall in a micro cement finished interior",
  },
  {
    image: siteImages.slide4,
    alt: "The Cemento team beside a micro cement benchtop in the Malaga showroom",
  },
] as const;

/** Auto-advancing hero slider — 5s per slide, paused for reduced-motion users. */
function HeroSlider() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={slides[index].image}
            alt={slides[index].alt}
            className="absolute inset-0 h-full w-full object-cover brightness-125 contrast-105 saturate-105"
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 6.5, ease: "linear" } }}
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 -z-10 bg-ink/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

      <div className="container-page flex min-h-[78vh] flex-col justify-end py-20 md:min-h-[86vh] md:py-28">
        <motion.p
          className="eyebrow text-ink-foreground/75"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Perth · Western Australia
        </motion.p>
        <motion.h1
          className="mt-4 max-w-4xl text-4xl leading-[1.03] text-ink-foreground drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          Perth's best micro cement
        </motion.h1>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
        >
          Seamless, joint-free surfaces for walls, floors, benchtops and wet areas — designed,
          installed and guaranteed by our own trades, at a price fixed on the day.
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
        >
          <Button asChild variant="clay" size="lg">
            <Link to="/contact">Get a free quote</Link>
          </Button>
          <Button asChild variant="hero" size="lg">
            <Link to="/projects">View our projects</Link>
          </Button>
        </motion.div>

        <div className="mt-12 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-12 bg-ink-foreground" : "w-6 bg-ink-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

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
    icon: ClipboardList,
    title: "Your request",
    copy: "Leave a request, and our consultant will arrange to visit you and create the works plan.",
  },
  {
    n: "02",
    icon: Calculator,
    title: "Cost calculation",
    copy: "We'll generate a bill and a job pack and send it to you for approval.",
  },
  {
    n: "03",
    icon: Hammer,
    title: "Works",
    copy: "The next day, we are ready to order and deliver all necessary materials and begin the works.",
  },
  {
    n: "04",
    icon: CheckCircle2,
    title: "Work approval",
    copy: "We walk the finished job with you, hand over care instructions and sign off together.",
  },
] as const;

const applications = [
  "Bathrooms & wet areas",
  "Kitchen splashbacks",
  "Benchtops & vanities",
  "Living room feature walls",
  "Stairs & hallways",
  "Fireplaces",
  "Alfresco & outdoor",
  "Retail & hospitality fit-outs",
];

const testimonials = [
  {
    quote:
      "The bathroom came back completely seamless — no grout, no joins, and the colour is exactly what we picked from the sample board.",
    name: "Rachel M.",
    where: "Mount Lawley",
  },
  {
    quote:
      "Quoted on the day, started when they said and finished when they said. The Terra Toscana feature wall is the first thing every guest mentions.",
    name: "Daniel P.",
    where: "Scarborough",
  },
  {
    quote:
      "We did the two-day training and then micro-cemented our own laundry. The support afterwards was the part that really mattered.",
    name: "Anh & Tom",
    where: "Canning Vale",
  },
];

const faqs = [
  {
    q: "How thick is micro cement, and will it raise my floor height?",
    a: "Around 2mm in total. It bonds over existing tiles, concrete, render and plasterboard, so in most cases there is no demolition, no skip bin and no lost floor height or door adjustments.",
  },
  {
    q: "Is micro cement waterproof enough for showers?",
    a: "Yes. The system is sealed and suitable for showers, splashbacks and wet areas when installed over a compliant waterproof membrane — which we install as part of the works and certify on completion.",
  },
  {
    q: "How much does micro cement cost, and how long does it take?",
    a: "Pricing depends on area, substrate and finish, but every quote is a fixed price locked in on the day of consultation. A typical bathroom takes three to four days on site; a whole-floor pour, four to six.",
  },
  {
    q: "Which areas of Perth do you service?",
    a: "The full Perth metro area from our Malaga warehouse — north to Yanchep, south to Mandurah and east to the Hills. Regional WA projects are considered case by case.",
  },
];


function Home() {
  const reduce = useReducedMotion();
  const marquee = [...finishes, ...finishes];
  const featured = projects.slice(0, 3);

  return (
    <>
      <HeroSlider />

      {/* FINISH MARQUEE */}
      <section className="overflow-hidden border-b border-border bg-secondary/40 py-8">
        <div className="container-page mb-5 flex flex-wrap items-end justify-between gap-3">
          <p className="eyebrow">The range</p>
          <Link
            to="/textures"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-clay"
          >
            All 12 finishes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <motion.div
            className="flex w-max gap-4"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 48, ease: "linear", repeat: Infinity }}
          >
            {marquee.map((f, i) => (
              <figure key={`${f.id}-${i}`} className="w-40 shrink-0 md:w-52">
                <img
                  src={f.image}
                  alt={`${f.name} micro cement finish`}
                  loading="lazy"
                  decoding="async"
                  width={520}
                  height={520}
                  className="aspect-square w-full rounded-sm object-cover"
                />
                <figcaption className="mt-2 text-xs font-medium text-muted-foreground">
                  {f.name}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl">
            How we help with your micro cement needs
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.to} delay={i * 0.08} className="h-full">
              <Link
                to={s.to}
                className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden rounded-sm"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.label}
                    loading="lazy"
                    decoding="async"
                    className="aspect-4/3 w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.07]"
                  />
                  <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur">
                    <s.icon className="h-5 w-5 text-clay" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg leading-snug">{s.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.copy}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-clay">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="relative border-y border-border bg-secondary/60">
        <div className="container-page py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Why Cemento</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Why choose Cemento?</h2>
            <p className="mt-5 text-muted-foreground">
              We've built our reputation on finishing what we quote — on time, on budget and to a
              standard that holds up years later.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-clay" /> WASPA &amp; HBA members
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08} className="h-full">
                <article className="surface-card surface-card-hover group relative flex h-full flex-col overflow-hidden rounded-sm p-7">
                  <span className="font-display text-4xl font-bold text-clay/25 transition-colors duration-500 group-hover:text-clay/50">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{r.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {r.copy}
                  </p>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-clay transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-sand)] py-20 md:py-28">
        <div className="container-page">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Process</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Phases of our works</h2>
            <p className="mt-5 text-muted-foreground">
              Four clear stages from first phone call to final walkthrough — you always know what
              happens next.
            </p>
          </Reveal>

          <ol className="mt-16 grid gap-8 md:grid-cols-4 md:gap-4">
            {phases.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.12} className="h-full">
                <li className="relative h-full">
                  {i < phases.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-full z-0 flex h-8 -translate-x-1/2 items-center justify-center text-clay/50 md:left-full md:top-1/2 md:h-auto md:w-4 md:-translate-x-1/2 md:-translate-y-1/2"
                    >
                      <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
                    </span>
                  )}
                  <article className="relative z-10 flex h-full flex-col rounded-sm border border-border bg-background p-7 shadow-[var(--shadow-soft)] transition-transform duration-500 hover:-translate-y-1.5">
                    <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-clay text-clay-foreground shadow-[var(--shadow-soft)]">
                      <p.icon className="h-6 w-6" />
                    </span>
                    <span className="mt-6 font-display text-xs font-bold uppercase tracking-[0.24em] text-clay">
                      Step {p.n}
                    </span>
                    <h3 className="mt-2 text-lg">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                  </article>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* VISUALISER */}
      <section className="border-y border-border bg-ink py-20 text-ink-foreground md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">AI visualiser</p>
            <h2 className="mt-3 text-3xl text-ink-foreground md:text-4xl">
              See how your wall will look — in real time
            </h2>
            <p className="mt-5 max-w-lg text-ink-foreground/75">
              Upload a photo of your room, choose one of our twelve finishes, and our AI re-renders
              your actual space with that finish applied. No mock-ups, no guessing — your room, your
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
          </Reveal>
          <div className="grid grid-cols-3 gap-3">
            {finishes.slice(0, 6).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <figure className="overflow-hidden rounded-sm">
                  <img
                    src={t.image}
                    alt={`${t.name} micro cement finish`}
                    loading="lazy"
                    decoding="async"
                    width={520}
                    height={520}
                    className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <figcaption className="mt-2 text-xs text-ink-foreground/60">
                    <span className="block font-medium text-ink-foreground/90">{t.name}</span>
                    {t.description}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="container-page py-20 md:py-24">
        <Reveal>
          <p className="eyebrow">Where it works</p>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl">
            One system, applied almost anywhere
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {applications.map((a, i) => (
            <Reveal key={a} delay={i * 0.04}>
              <span className="inline-block rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-clay/50 hover:text-foreground">
                {a}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="container-page pb-20 md:pb-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Recent work</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Built for real Perth homes</h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-clay"
            >
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <figure className="surface-card group flex h-full flex-col overflow-hidden rounded-sm">
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} — micro cement project in ${p.location}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-4/3 w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-foreground backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <figcaption className="flex flex-1 flex-col p-5">
                  <h3 className="text-base leading-snug">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-clay" /> {p.location}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="clay" size="lg">
            <Link to="/projects">
              View more projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-border bg-secondary/60">
        <div className="container-page py-20 md:py-24">
          <Reveal>
            <p className="eyebrow">What clients say</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Trusted across Perth</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className="h-full">
                <blockquote className="surface-card flex h-full flex-col rounded-sm p-6">
                  <Quote className="h-6 w-6 text-clay" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    “{t.quote}”
                  </p>
                  <footer className="mt-5 text-sm">
                    <span className="font-display font-semibold">{t.name}</span>
                    <span className="text-muted-foreground"> · {t.where}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 text-3xl md:text-4xl">The questions we get most</h2>
            <p className="mt-5 text-muted-foreground">
              Still unsure? Call{" "}
              <a
                href={site.phoneHref}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {site.phoneDisplay}
              </a>{" "}
              and speak to the person who'll be on site.
            </p>
            <Button asChild variant="clay" size="lg" className="mt-8">
              <Link to="/contact">Ask us anything</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="surface-card mb-3 rounded-sm border border-border px-5 transition-colors last:border-b hover:border-clay/40"
                >
                  <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-[image:var(--gradient-sand)]">
        <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <h2 className="text-3xl md:text-4xl">Ready to start?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Book a consultation and we'll plan the works and fix the price on the day. Or call{" "}
              <a
                href={site.phoneHref}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
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
