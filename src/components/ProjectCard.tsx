import Link from "next/link";

import type { Project } from "@/payload-types";

const categoryGradients: Record<Project["category"], string> = {
  Residential: "from-ink-700 to-ink-900",
  Commercial: "from-ink-600 to-ink-950",
  Infrastructure: "from-ink-800 to-ink-950",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects#${project.slug}`}
      className="group block overflow-hidden border border-ink-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div
        className={`bg-blueprint relative flex h-48 items-end bg-gradient-to-br p-4 ${categoryGradients[project.category]}`}
      >
        <span className="absolute right-0 top-4 bg-amber-brand px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-950">
          {project.status}
        </span>
        <span className="font-display text-sm uppercase tracking-widest text-amber-brand">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink-900 group-hover:text-amber-deep">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-ink-600">
          {project.location} · {project.year}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-700">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
