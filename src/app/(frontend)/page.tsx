import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getHomePage, getProjects, getServices, getSiteSettings } from "@/lib/content";

export default async function Home() {
  const [page, settings, projects, services] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getProjects(),
    getServices(),
  ]);

  const featuredProjects = projects.slice(0, 3);
  const featuredServices = services.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-blueprint bg-ink-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36 lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-brand">
            {page.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-wide sm:text-5xl md:text-6xl">
            {page.hero.title}{" "}
            <span className="text-amber-brand">{page.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-100/90">
            {page.hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-amber-brand px-8 py-4 font-display font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-amber-deep"
            >
              {page.hero.primaryCtaLabel}
            </Link>
            <Link
              href="/projects"
              className="border-2 border-white/70 px-8 py-4 font-display font-bold uppercase tracking-wide text-white transition-colors hover:border-amber-brand hover:text-amber-brand"
            >
              {page.hero.secondaryCtaLabel}
            </Link>
          </div>
        </div>
        <div className="bg-hazard h-2" />
      </section>

      {/* Stats */}
      <section className="border-b border-ink-100 bg-ink-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {(settings.stats ?? []).map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold text-ink-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm uppercase tracking-wide text-ink-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-deep">
          {page.servicesSection.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-ink-900 sm:text-4xl">
          {page.servicesSection.title}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="group border border-ink-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="h-1 w-12 bg-amber-brand transition-all group-hover:w-20" />
              <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-wide text-ink-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                {service.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-ink-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
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
              className="font-display text-sm font-bold uppercase tracking-wide text-amber-deep hover:text-ink-900"
            >
              {page.projectsSection.allProjectsLabel}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
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
          </div>
          <ul className="space-y-6">
            {(page.whySection.points ?? []).map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="mt-1 h-10 w-1.5 shrink-0 bg-amber-brand" />
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-700">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blueprint bg-ink-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
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
