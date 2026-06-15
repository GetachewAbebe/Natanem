import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getAboutPage, getSiteSettings } from "@/lib/content";
import { resolveImage } from "@/lib/image";

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
        backgroundImage={resolveImage(page.hero.backgroundImage)}
      />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
              {page.story.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900 sm:text-4xl">
              {page.story.title}
            </h2>
            <div className="mt-3 h-1 w-14 bg-amber-brand" />
            <div className="mt-6 space-y-4 leading-relaxed text-ink-700">
              {(page.story.paragraphs ?? []).map((paragraph) => (
                <p key={paragraph.id ?? paragraph.text}>{paragraph.text}</p>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-2 content-start gap-6">
            {(settings.stats ?? []).map((stat, i) => (
              <Reveal
                key={stat.label}
                direction="right"
                delay={i * 100}
                className="group/stat border border-ink-100 bg-ink-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-brand/50 hover:shadow-lg"
              >
                <p className="font-display text-4xl font-bold text-ink-900">
                  <CountUp value={stat.value} />
                </p>
                <div className="mx-auto mt-3 h-0.5 w-8 bg-amber-brand transition-all duration-300 group-hover/stat:w-14" />
                <p className="mt-3 text-sm uppercase tracking-wide text-ink-600">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="bg-ink-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <Reveal
            direction="left"
            className="border-l-4 border-amber-brand bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-10"
          >
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ink-900">
              {page.mission.title}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-700">{page.mission.text}</p>
          </Reveal>
          <Reveal
            direction="right"
            delay={120}
            className="border-l-4 border-ink-950 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-10"
          >
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ink-900">
              {page.vision.title}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-700">{page.vision.text}</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
            {page.valuesSection.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900 sm:text-4xl">
            {page.valuesSection.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(page.valuesSection.items ?? []).map((value, i) => (
            <Reveal
              key={value.title}
              delay={(i % 4) * 100}
              className="group/val h-full border border-ink-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-brand/40 hover:shadow-xl"
            >
              <p className="font-display text-3xl font-bold text-ink-100 transition-colors duration-300 group-hover/val:text-amber-brand">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="mt-4 h-1 w-12 bg-amber-brand transition-all duration-300 group-hover/val:w-20" />
              <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-ink-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{value.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-ink-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
              {page.teamSection.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900 sm:text-4xl">
              {page.teamSection.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(page.teamSection.members ?? []).map((member, i) => (
              <Reveal
                key={member.name}
                delay={(i % 4) * 100}
                className="group/team overflow-hidden border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="bg-blueprint relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-ink-700 to-ink-950">
                  <span className="font-display text-4xl font-bold tracking-wider text-amber-brand transition-transform duration-300 group-hover/team:scale-110">
                    {member.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div className="bg-hazard absolute bottom-0 left-0 right-0 h-1.5" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold uppercase tracking-wide text-ink-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink-600">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blueprint bg-ink-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
              {page.cta.title}
            </h2>
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
