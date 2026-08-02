import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  /** Optional banner image — renders a dark, premium overlay hero. */
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={image}
          alt={imageAlt ?? ""}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-ink/60" />
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-veil)] opacity-80" />
        <div className="container-page py-24 md:py-32">
          <p className="eyebrow text-ink-foreground/75">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-ink-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-foreground/85 md:text-lg">
            {intro}
          </p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-[image:var(--gradient-sand)]">
      <div className="container-page py-16 md:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
