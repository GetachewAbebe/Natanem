import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getServices, getServicesPage } from "@/lib/content";
import { resolveImage } from "@/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getServicesPage(), getServices()]);

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        backgroundImage={resolveImage(page.hero.backgroundImage)}
      />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {services.map((service, index) => {
            const image = resolveImage(service.image);
            const number = String(index + 1).padStart(2, "0");
            const reverse = index % 2 === 1;

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="group grid scroll-mt-24 overflow-hidden border border-ink-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl lg:grid-cols-2"
              >
                {/* Visual side — slides in from the outer edge */}
                <Reveal
                  direction={reverse ? "right" : "left"}
                  className={`bg-blueprint relative min-h-[260px] overflow-hidden bg-gradient-to-br from-ink-700 to-ink-950 lg:min-h-[360px] ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  {image && (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/40 to-ink-950/20 transition-opacity duration-500 group-hover:from-ink-950/70" />
                  <Reveal direction="up" delay={300} className="absolute bottom-5 left-7">
                    <span className="block font-display text-7xl font-bold leading-none text-amber-brand drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:text-8xl">
                      {number}
                    </span>
                  </Reveal>
                  <div className="bg-hazard absolute bottom-0 left-0 right-0 h-1.5" />
                </Reveal>

                {/* Text side — slides in from the inner edge */}
                <Reveal
                  direction={reverse ? "left" : "right"}
                  delay={120}
                  className="p-8 sm:p-10 lg:p-12"
                >
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ink-900 sm:text-3xl">
                    {service.title}
                  </h2>
                  <div className="mt-3 h-1 w-14 bg-amber-brand transition-all duration-300 group-hover:w-24" />
                  <p className="mt-5 leading-relaxed text-ink-700">
                    {service.summary}
                  </p>
                  <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {(service.details ?? []).map((detail, di) => (
                      <Reveal
                        as="li"
                        key={detail.id ?? detail.item}
                        direction="up"
                        delay={280 + di * 90}
                        className="flex items-start gap-3 text-sm text-ink-700"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-amber-brand transition-transform duration-300 group-hover:rotate-[135deg]" />
                        {detail.item}
                      </Reveal>
                    ))}
                  </ul>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-blueprint bg-ink-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              {page.cta.title}
            </h2>
            <p className="mt-2 text-ink-100/80">{page.cta.text}</p>
          </Reveal>
          <Link
            href="/contact"
            className="group bg-amber-brand px-8 py-4 font-display font-bold uppercase tracking-wide text-ink-950 transition-all hover:bg-amber-deep hover:shadow-xl hover:shadow-amber-brand/30"
          >
            {page.cta.buttonLabel}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
