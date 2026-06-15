import Image from "next/image";
import Link from "next/link";

import { resolveImage } from "@/lib/image";
import type { Project } from "@/payload-types";

const categoryGradients: Record<Project["category"], string> = {
  Residential: "from-ink-700 to-ink-900",
  Commercial: "from-ink-600 to-ink-950",
  Infrastructure: "from-ink-800 to-ink-950",
};

export default function ProjectCard({ project }: { project: Project }) {
  const image = resolveImage(project.coverImage);

  return (
    <Link
      href={`/projects#${project.slug}`}
      className="group block h-full overflow-hidden border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={`bg-blueprint relative flex h-48 items-end overflow-hidden bg-gradient-to-br p-4 ${categoryGradients[project.category]}`}
      >
        {image && (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
          </>
        )}
        <span className="absolute right-0 top-4 z-10 bg-amber-brand px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-950">
          {project.status}
        </span>
        <span className="relative z-10 font-display text-sm uppercase tracking-widest text-amber-brand">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink-900 transition-colors group-hover:text-amber-deep">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-ink-600">
          {project.location} · {project.year}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-700">
          {project.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wide text-amber-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View Project
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
