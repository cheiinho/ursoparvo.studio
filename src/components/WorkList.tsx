import Link from "next/link";
import { hasPublishedWork, projectHref, projects } from "@/data/projects";
import { SITE, WORK_EMPTY } from "@/content/site";

export default function WorkList() {
  if (!hasPublishedWork()) {
    return (
      <div className="measure max-w-xl space-y-4">
        <p className="text-body text-ink">{WORK_EMPTY.body}</p>
        <p className="text-body text-ink-muted">
          {WORK_EMPTY.contact}{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-ink/70 transition-colors hover:text-ink"
          >
            {SITE.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6 md:gap-7">
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            href={projectHref(project.id)}
            className="flex flex-col gap-2 py-2 md:flex-row md:items-baseline md:justify-between md:gap-8"
          >
            <span className="text-title text-ink">{project.name}</span>
            <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1 md:justify-end">
              <span className="text-small text-ink/40">
                {project.disciplines.join(", ")}
              </span>
              <span className="text-small text-ink/40">{project.year}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
