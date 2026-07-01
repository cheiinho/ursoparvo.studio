import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { UI } from "@/content/ui";
import { hasPublishedWork, projectHref, projects } from "@/data/projects";

export default function WorkIndex() {
  if (!hasPublishedWork()) return null;

  return (
    <Section>
      <h1 className="sr-only">{UI.work.pageTitle}</h1>
      <nav aria-label={UI.nav.ariaFeatured}>
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
    </Section>
  );
}
