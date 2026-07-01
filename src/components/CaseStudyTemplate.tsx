import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { UI } from "@/content/ui";
import {
  getNextProject,
  projectHref,
  type Project,
} from "@/data/projects";

type CaseStudyTemplateProps = {
  project: Project;
};

export default function CaseStudyTemplate({ project }: CaseStudyTemplateProps) {
  const next = getNextProject(project.id);

  return (
    <PublicShell>
      <Section>
        <article>
          <Reveal>
            <header>
              <h1 className="type-display measure">{project.name}</h1>
              <p className="type-nota text-secondary" style={{ marginTop: "var(--space-4)" }}>
                {[project.disciplines.join(", "), project.year]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </header>
          </Reveal>

          <Reveal delay={0.08}>
            <p
              className="type-corpo measure text-secondary"
              style={{ marginTop: "var(--space-8)" }}
            >
              {project.summary}
            </p>
          </Reveal>

          {project.body.length > 0 && (
            <Reveal delay={0.16}>
              <div className="measure space-y-6" style={{ marginTop: "var(--space-16)" }}>
                {project.body.map((paragraph) => (
                  <p key={paragraph} className="type-corpo text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          )}

          <footer
            className="flex flex-wrap items-center justify-between gap-6"
            style={{
              marginTop: "var(--space-24)",
              paddingTop: "var(--space-8)",
              borderTop: "1px solid var(--line)",
            }}
          >
            <Link href="/work" className="text-link type-corpo">
              {UI.actions.backToWork}
            </Link>
            {next && (
              <Link href={projectHref(next.id)} className="text-link type-corpo">
                {UI.actions.nextProject(next.name)}
              </Link>
            )}
          </footer>
        </article>
      </Section>
    </PublicShell>
  );
}
