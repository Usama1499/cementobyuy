import { Link } from "@tanstack/react-router";
import { Clock, Facebook, MapPin, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-xl font-bold uppercase tracking-[0.32em]">
            Cemento
          </span>
          <p className="mt-4 max-w-sm text-sm text-ink-foreground/70">
            Perth's micro cement specialists. Seamless walls, floors, benchtops and custom
            mouldings — installed by our own trades, or supplied for you to install yourself.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink("Hi Cemento, I'd like to talk about a micro cement project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-whatsapp px-4 py-2 text-sm font-medium text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-sm border border-ink-foreground/25 px-4 py-2 text-sm transition-colors hover:bg-ink-foreground/10"
            >
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-foreground/60">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/75">
            {[
              { to: "/services", label: "Services" },
              { to: "/textures", label: "Textures" },
              { to: "/custom-designs", label: "Custom designs" },
              { to: "/training", label: "DIY training" },
              { to: "/store", label: "Shop materials" },
              { to: "/visualiser", label: "AI wall visualiser" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-ink-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-foreground/60">
            Warehouse
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-foreground/75">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {site.address}
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              By appointment
            </li>
          </ul>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-ink-foreground/75 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </a>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cemento Micro Cement. All rights reserved.</p>
          <p>Members of WASPA &amp; HBA · Servicing Perth &amp; Western Australia</p>
        </div>
      </div>
    </footer>
  );
}
