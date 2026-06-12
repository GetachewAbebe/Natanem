import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getServices, getServicesPage } from "@/lib/content";

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
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid scroll-mt-24 gap-8 border border-ink-100 bg-white shadow-sm lg:grid-cols-5"
            >
              <div className="bg-blueprint flex items-center justify-center bg-gradient-to-br from-ink-700 to-ink-950 p-10 lg:col-span-2">
                <span className="font-display text-7xl font-bold text-amber-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-8 lg:col-span-3 lg:py-10">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ink-900">
                  {service.title}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-700">{service.summary}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {(service.details ?? []).map((detail) => (
                    <li
                      key={detail.id ?? detail.item}
                      className="flex items-start gap-3 text-sm text-ink-700"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-amber-brand" />
                      {detail.item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-blueprint bg-ink-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              {page.cta.title}
            </h2>
            <p className="mt-2 text-ink-100/80">{page.cta.text}</p>
          </div>
          <Link
            href="/contact"
            className="bg-amber-brand px-8 py-4 font-display font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-amber-deep"
          >
            {page.cta.buttonLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
