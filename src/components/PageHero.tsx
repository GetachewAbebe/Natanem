import Image from "next/image";

import Reveal from "@/components/Reveal";
import type { ResolvedImage } from "@/lib/image";

export default function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  backgroundImage?: ResolvedImage | null;
}) {
  return (
    <section className="bg-blueprint relative flex min-h-[52vh] items-center overflow-hidden bg-ink-950 text-white">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/65 to-ink-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
        </>
      )}
      <Reveal className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-brand">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[1.08] tracking-wide sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-100/90">
            {description}
          </p>
        )}
      </Reveal>
      <div className="bg-hazard absolute bottom-0 left-0 right-0 z-10 h-2" />
    </section>
  );
}
