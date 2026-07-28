import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import trainingImage from "@/assets/training.jpg";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "DIY Micro Cement Training in Perth | Cemento" },
      {
        name: "description",
        content:
          "Hands-on micro cement training in Malaga, Perth. Learn substrate prep, priming, trowelling, sanding and sealing, then take on your own project with support.",
      },
      { property: "og:title", content: "DIY Micro Cement Training in Perth | Cemento" },
      {
        property: "og:description",
        content:
          "Hands-on micro cement workshops in Malaga, Perth — prep, trowelling, sanding and sealing.",
      },
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

function Training() {
  return (
    <>
      <PageHero
        eyebrow="DIY training"
        title="Learn to apply micro cement properly"
        intro="A hands-on workshop at our Malaga warehouse for homeowners and trades. Small groups, practice panels, real products — and honest advice about what micro cement will and won't forgive."
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/contact">Register your interest</Link>
        </Button>
        <Button asChild variant="whatsapp" size="lg">
          <a
            href={whatsappLink("Hi Cemento, I'd like to know when the next DIY training runs.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="h-4 w-4" /> Ask about dates
          </a>
        </Button>
      </PageHero>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-start md:py-28">
        <img
          src={trainingImage}
          alt="Applying micro cement to a practice panel with a steel trowel during training"
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
          </div>
        </div>
      </section>
    </>
  );
}
