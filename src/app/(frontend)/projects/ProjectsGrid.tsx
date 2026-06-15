"use client";

import Image from "next/image";
import { useState } from "react";

import Reveal from "@/components/Reveal";
import { resolveImage } from "@/lib/image";
import type { Project } from "@/payload-types";

const categories = ["All", "Residential", "Commercial", "Infrastructure"] as const;

const categoryGradients: Record<Project["category"], string> = {
  Residential: "from-ink-700 to-ink-900",
  Commercial: "from-ink-600 to-ink-950",
  Infrastructure: "from-ink-800 to-ink-950",
};

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
              filter === category
                ? "bg-ink-950 text-amber-brand"
                : "border border-ink-100 text-ink-700 hover:border-ink-950"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {visible.map((project, idx) => {
          const image = resolveImage(project.coverImage);
          return (
          <Reveal key={project.slug} delay={(idx % 2) * 120}>
          <article
            id={project.slug}
            className="group h-full scroll-mt-24 overflow-hidden border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={`bg-blueprint relative flex h-52 items-end overflow-hidden bg-gradient-to-br p-5 ${categoryGradients[project.category]}`}
            >
              {image && (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />
                </>
              )}
              <span
                className={`absolute right-0 top-5 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  project.status === "Ongoing"
                    ? "bg-amber-brand text-ink-950"
                    : "bg-white text-ink-950"
                }`}
              >
                {project.status}
              </span>
              <div className="relative z-10">
                <span className="font-display text-sm uppercase tracking-widest text-amber-brand">
                  {project.category}
                </span>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                  {project.title}
                </h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-ink-600">
                {project.location} · {project.year}
              </p>
              <p className="mt-3 leading-relaxed text-ink-700">{project.description}</p>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-ink-100 pt-5">
                {(project.stats ?? []).map((stat) => (
                  <div key={stat.id ?? stat.label}>
                    <dt className="text-xs uppercase tracking-wide text-ink-600">
                      {stat.label}
                    </dt>
                    <dd className="font-display text-xl font-bold text-ink-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
          </Reveal>
          );
        })}
      </div>
    </div>
  );
}
