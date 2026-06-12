import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getProjects, getProjectsPage } from "@/lib/content";
import ProjectsGrid from "./ProjectsGrid";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProjectsPage();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function ProjectsPage() {
  const [page, projects] = await Promise.all([getProjectsPage(), getProjects()]);

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ProjectsGrid projects={projects} />
      </section>

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
