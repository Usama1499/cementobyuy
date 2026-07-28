import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        "Hi Cemento, I'd like to ask about micro cement for my project in Perth.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[var(--shadow-lift)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-8 sm:right-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40" />
    </a>
  );
}
