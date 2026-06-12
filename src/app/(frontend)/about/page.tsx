import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getAboutPage, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
      />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
              {page.story.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900">
              {page.story.title}
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-700">
              {(page.story.paragraphs ?? []).map((paragraph) => (
                <p key={paragraph.id ?? paragraph.text}>{paragraph.text}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 content-start gap-6">
            {(settings.stats ?? []).map((stat) => (
              <div key={stat.label} className="border border-ink-100 bg-ink-50 p-6 text-center">
                <p className="font-display text-4xl font-bold text-ink-900">{stat.value}</p>
                <p className="mt-1 text-sm uppercase tracking-wide text-ink-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="bg-ink-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="border-l-4 border-amber-brand bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ink-900">
              {page.mission.title}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-700">{page.mission.text}</p>
          </div>
          <div className="border-l-4 border-ink-950 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ink-900">
              {page.vision.title}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-700">{page.vision.text}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
          {page.valuesSection.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900">
          {page.valuesSection.title}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(page.valuesSection.items ?? []).map((value) => (
            <div key={value.title} className="border border-ink-100 p-6">
              <div className="h-1 w-12 bg-amber-brand" />
              <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-ink-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-ink-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
            {page.teamSection.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900">
            {page.teamSection.title}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(page.teamSection.members ?? []).map((member) => (
              <div key={member.name} className="bg-white p-6 shadow-sm">
                <div className="bg-blueprint flex h-32 items-center justify-center bg-gradient-to-br from-ink-700 to-ink-950">
                  <span className="font-display text-3xl font-bold text-amber-brand">
                    {member.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="mt-4 font-display font-semibold uppercase tracking-wide text-ink-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blueprint bg-ink-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
            {page.cta.title}
          </h2>
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
