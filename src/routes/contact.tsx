import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/PageHero";
import { siteImages } from "@/lib/projects";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Cemento | Micro Cement Quotes in Perth" },
      {
        name: "description",
        content:
          "Book a micro cement consultation in Perth. Call 0410 040 994, message us on WhatsApp, or visit our warehouse at 17 Irvine Street, Malaga WA 6090.",
      },
      { property: "og:title", content: "Contact Cemento | Micro Cement Quotes in Perth" },
      {
        property: "og:description",
        content: "Book a fixed-price micro cement consultation with Cemento in Perth.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [project, setProject] = useState("");

  const message = [
    "Hi Cemento, I'd like a quote.",
    name ? `Name: ${name}` : "",
    suburb ? `Suburb: ${suburb}` : "",
    project ? `Project: ${project}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan your project"
        intro="Tell us what you're resurfacing and where you are. We'll arrange a consultation, plan the works and fix the price on the day."
        image={siteImages.saunders}
        imageAlt="Luxury Perth residence finished in Cemento micro cement"
      />

      <section className="container-page grid gap-12 py-14 lg:grid-cols-2 md:py-20">
        <div className="surface-card rounded-sm p-6 md:p-8">
          <h2 className="text-2xl">Request a quote</h2>
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="c-name">Your name</Label>
              <Input
                id="c-name"
                value={name}
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="c-suburb">Suburb</Label>
              <Input
                id="c-suburb"
                value={suburb}
                maxLength={80}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="Scarborough"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="c-project">About the project</Label>
              <Textarea
                id="c-project"
                value={project}
                rows={5}
                maxLength={800}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Ensuite walls and floor, roughly 18m², currently tiled…"
                className="mt-1.5"
              />
            </div>
          </div>
          <Button asChild variant="whatsapp" size="lg" className="mt-6 w-full">
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp
            </a>
          </Button>
          <Button asChild variant="clay" size="lg" className="mt-3 w-full">
            <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
          </Button>
        </div>

        <div>
          <dl className="space-y-8">
            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-clay" />
              <div>
                <dt className="font-display font-semibold">Phone</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  <a href={site.phoneHref} className="underline-offset-4 hover:underline">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-clay" />
              <div>
                <dt className="font-display font-semibold">Warehouse</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{site.address}</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-clay" />
              <div>
                <dt className="font-display font-semibold">Hours</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{site.hours}</dd>
              </div>
            </div>
          </dl>
          <div className="mt-10 overflow-hidden rounded-sm border border-border">
            <iframe
              title="Cemento warehouse location in Malaga, Western Australia"
              src="https://www.google.com/maps?q=17+Irvine+Street+Malaga+WA+6090&output=embed"
              loading="lazy"
              className="h-80 w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
