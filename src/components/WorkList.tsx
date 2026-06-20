"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import {
  PROJECT_CATEGORIES,
  projectHref,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { projectPoster } from "@/lib/projectPoster";

function formatIndex(n: number) {
  return String(n).padStart(2, "0");
}

type WorkListProps = {
  previewProjectId?: string | null;
  onPreviewChange?: (id: string | null) => void;
};

export default function WorkList({
  previewProjectId,
  onPreviewChange,
}: WorkListProps) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  useEffect(() => {
    if (filtered.length === 0) return;
    const current = previewProjectId
      ? filtered.find((p) => p.id === previewProjectId)
      : null;
    if (!current) onPreviewChange?.(filtered[0].id);
  }, [filter, filtered, previewProjectId, onPreviewChange]);

  const previewProject =
    projects.find((p) => p.id === previewProjectId) ?? filtered[0];

  return (
    <div className="work-list-layout">
      <div
        className="mb-10 flex flex-wrap gap-x-5 gap-y-2 md:mb-14"
        role="group"
        aria-label="Filter by category"
      >
        {(["All", ...PROJECT_CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`press tech normal-case transition-colors ${
              filter === cat ? "text-ink" : "text-ink/35 hover:text-ink/70"
            }`}
            aria-pressed={filter === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(280px,36%)] lg:gap-16">
        <ul>
          {filtered.map((project, i) => (
            <WorkRow
              key={project.id}
              project={project}
              index={projects.indexOf(project) + 1}
              displayIndex={i + 1}
              active={previewProject?.id === project.id}
              onHover={() => onPreviewChange?.(project.id)}
              onLeave={() => onPreviewChange?.(null)}
            />
          ))}
        </ul>

        {previewProject && (
          <aside
            className="work-preview hidden lg:block"
            aria-hidden="true"
          >
            <div className="sticky top-28 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={previewProject.id}
                src={projectPoster(
                  previewProject.id,
                  previewProject.name,
                  previewProject.year,
                )}
                alt=""
                width={800}
                height={500}
                className="work-preview__image aspect-[16/10] w-full object-cover"
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function WorkRow({
  project,
  index,
  displayIndex,
  active,
  onHover,
  onLeave,
}: {
  project: Project;
  index: number;
  displayIndex: number;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <SectionReveal as="li" delay={displayIndex * 0.04}>
      <Link
        href={projectHref(project.id)}
        className={`work-row group grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[3rem_1fr_auto_5rem] md:gap-x-8 md:py-8 ${
          active ? "work-row--active" : ""
        }`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        data-cursor-hover
      >
        <span className="tech tabular-nums self-start pt-2 text-ink/35 md:self-baseline md:pt-0">
          {formatIndex(index)}
        </span>

        <span className="work-row__name display text-project leading-none">
          {project.name}
        </span>

        <span className="col-start-2 flex flex-wrap gap-x-3 gap-y-1 md:col-start-3 md:justify-end">
          {project.disciplines.map((d) => (
            <span key={d} className="tech normal-case text-ink/35">
              {d}
            </span>
          ))}
        </span>

        <span className="tech tabular-nums col-start-2 text-ink/35 md:col-start-4 md:text-right">
          {project.year}
        </span>
      </Link>
    </SectionReveal>
  );
}
