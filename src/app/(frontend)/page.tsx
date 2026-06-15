import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getHomePage, getProjects, getServices, getSiteSettings } from "@/lib/content";
import { resolveImage } from "@/lib/image";

export default async function Home() {
  const [page, settings, projects, services] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getProjects(),
    getServices(),
  ]);

  const featuredProjects = projects.slice(0, 3);
  const featuredServices = services.slice(0, 6);
  const heroImage = resolveImage(page.hero.backgroundImage);

  return (
    <>
      {/* Hero */}
      <section className="bg-blueprint relative flex min-h-[88vh] items-center overflow-hidden bg-ink-950 text-white">
        {heroImage && (
          <>
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="animate-kenburns object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/65 to-ink-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
          </>
        )}
        <Reveal className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-brand">
            {page.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold uppercase leading-[1.05] tracking-wide sm:text-6xl md:text-7xl">
            {page.hero.title}{" "}
            <span className="text-amber-brand">{page.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-100/90 sm:text-xl">
            {page.hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group bg-amber-brand px-8 py-4 font-display font-bold uppercase tracking-wide text-ink-950 shadow-lg shadow-amber-brand/20 transition-all hover:bg-amber-deep hover:shadow-xl hover:shadow-amber-brand/30"
            >
              {page.hero.primaryCtaLabel}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/projects"
              className="border-2 border-white/70 px-8 py-4 font-display font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-amber-brand hover:bg-white/5 hover:text-amber-brand"
            >
              {page.hero.secondaryCtaLabel}
            </Link>
          </div>
        </Reveal>
        <div className="bg-hazard absolute bottom-0 left-0 right-0 z-10 h-2" />
      </section>

      {/* Stats */}
      <section className="border-b border-ink-100 bg-ink-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
          {(settings.stats ?? []).map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100} className="text-center">
              <p className="font-display text-5xl font-bold text-ink-900">
                <CountUp value={stat.value} />
              </p>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-amber-brand" />
              <p className="mt-3 text-sm uppercase tracking-wide text-ink-600">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
            {page.servicesSection.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900 sm:text-4xl">
            {page.servicesSection.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 100}>
              <Link
                href={`/services#${service.slug}`}
                className="group block h-full border border-ink-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-brand/40 hover:shadow-xl"
              >
                <div className="h-1 w-12 bg-amber-brand transition-all duration-300 group-hover:w-20" />
                <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-ink-900 transition-colors group-hover:text-amber-deep">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {service.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-ink-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
                {page.projectsSection.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900 sm:text-4xl">
                {page.projectsSection.title}
              </h2>
            </div>
            <Link
              href="/projects"
              className="group font-display text-sm font-bold uppercase tracking-wide text-amber-deep hover:text-ink-900"
            >
              {page.projectsSection.allProjectsLabel}
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 120}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
              {page.whySection.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900 sm:text-4xl">
              {page.whySection.title}
            </h2>
            <p className="mt-6 leading-relaxed text-ink-700">
              {page.whySection.body}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block bg-ink-950 px-8 py-4 font-display font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink-800"
            >
              {page.whySection.ctaLabel}
            </Link>
          </Reveal>
          <ul className="space-y-6">
            {(page.whySection.points ?? []).map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100} className="flex gap-4">
                <span className="mt-1 h-10 w-1.5 shrink-0 bg-amber-brand" />
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-700">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blueprint bg-ink-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
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
