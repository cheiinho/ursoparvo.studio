import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE, WORK_EMPTY } from "@/content/site";
import { UI } from "@/content/ui";
import { hasPublishedWork, projectHref, projects } from "@/data/projects";

export default function WorkList() {
  if (!hasPublishedWork()) {
    return (
      <Reveal>
        <p className="type-corpo text-secondary measure">
          {WORK_EMPTY.lead}{" "}
          <a href={`mailto:${SITE.email}`} className="text-link">
            {SITE.email}
          </a>
          .
        </p>
      </Reveal>
    );
  }

  return (
    <nav aria-label={UI.nav.ariaProjects}>
      <ul className="work-list">
        {projects.map((project, index) => (
          <li key={project.id} className="work-item">
            <Reveal delay={Math.min(index, 5) * 0.08}>
              <Link href={projectHref(project.id)} className="work-item__link">
                <h2 className="work-item__title type-display">{project.name}</h2>
                <p className="work-item__meta type-nota text-secondary">
                  {[project.disciplines.join(", "), project.year]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </nav>
  );
}
