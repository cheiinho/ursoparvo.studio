import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import { hasPublishedWork, projectHref, projects } from "@/data/projects";
import { SITE, WORK_EMPTY } from "@/content/site";

export default function WorkList() {
  if (!hasPublishedWork()) {
    return (
      <p
        className="text-body"
        style={{ opacity: 0.4, textAlign: "center", paddingTop: 40 }}
      >
        {WORK_EMPTY.body}{" "}
        <a href={`mailto:${SITE.email}`} className="underline-offset-4 hover:underline">
          {SITE.email}
        </a>
      </p>
    );
  }

  return (
    <nav aria-label="Índice de projectos">
      <ul className="flex flex-col">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Link
              href={projectHref(project.id)}
              className="project-row project-row--breakout project-row--reveal"
              style={{ "--row-index": Math.min(index, 6) } as React.CSSProperties}
            >
              <span className="project-row__title min-w-0">{project.name}</span>
              <span className="project-row__meta ml-6 md:ml-8">
                {project.disciplines[0] && (
                  <span className="project-row__meta-item">
                    {project.disciplines.join(", ")}
                  </span>
                )}
                {project.year && (
                  <span className="project-row__meta-item">{project.year}</span>
                )}
              </span>
            </Link>
            <div className="project-row-separator" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
