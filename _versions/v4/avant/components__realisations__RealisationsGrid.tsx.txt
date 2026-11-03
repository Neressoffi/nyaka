"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  projectFilters,
  projects,
  type ProjectCard,
  type ProjectPole,
} from "@/lib/realisations-data";

function ProjectCardItem({ project }: { project: ProjectCard }) {
  const content = (
    <>
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={project.image}
          alt={`Projet ${project.name}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-xs">
          {project.sector}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold text-white sm:text-xl">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-[15px]">
          {project.situation}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-[15px]">
          <span className="font-medium text-white">Interventions :</span>{" "}
          {project.interventions}
        </p>

        {project.href ? (
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white sm:text-[15px]">
            {project.ctaLabel ?? "Voir le projet"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        ) : null}
      </div>
    </>
  );

  const className =
    "group flex flex-col overflow-hidden rounded-2lg border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.06]";

  if (project.href) {
    return (
      <Link href={project.href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

export function RealisationsGrid() {
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectPole>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.poles.includes(activeFilter));

  return (
    <section
      id="projets"
      className="scroll-mt-28 bg-surface-0 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
              Autres réalisations
            </p>
            <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
              Sélection de projets
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">
              Des cartes courtes pour montrer la diversité des situations et
              des expertises, sans répéter le contenu de la page Solutions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {projectFilters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-lg px-4 py-2 text-sm transition-colors sm:text-[15px] ${
                    isActive
                      ? "bg-white text-black"
                      : "border border-white/15 text-foreground-2 hover:border-white/30 hover:text-foreground-0"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCardItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
