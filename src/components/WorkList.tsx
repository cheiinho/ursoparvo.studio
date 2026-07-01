import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkEmptyState from "@/components/WorkEmptyState";
import { UI } from "@/content/ui";
import { hasPublishedWork, projectHref, projects } from "@/data/projects";

export default function WorkList() {
  if (!hasPublishedWork()) {
    return (
      <div className="section__content section__content--center">
        <WorkEmptyState />
      </div>
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
