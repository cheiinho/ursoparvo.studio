import Link from "next/link";
import {
  getNextProject,
  projectHref,
  type Project,
} from "@/data/projects";
import { projectPoster } from "@/lib/projectPoster";

type CaseStudyTemplateProps = {
  project: Project;
};

export default function CaseStudyTemplate({ project }: CaseStudyTemplateProps) {
  const next = getNextProject(project.id);

  return (
    <article>
      <header className="grid-editorial pb-[var(--space-lg)] pt-[var(--space-md)] md:pb-[var(--space-xl)]">
        <div className="col-full">
          <Link
            href="/work"
            className="text-small inline-block text-ink/40 transition-colors hover:text-ink"
          >
            Voltar ao trabalho
          </Link>
        </div>

        <div className="col-full mt-8 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={projectPoster(project.id, project.name, project.year)}
            alt=""
            width={2400}
            height={1350}
            className="aspect-[16/9] w-full object-cover"
            fetchPriority="high"
          />
        </div>

        <div className="col-full mt-10 md:mt-14">
          <h1 className="text-title text-ink">{project.name}</h1>
          <p className="text-small mt-4 text-ink/45">
            {project.disciplines.join(", ")}. {project.year}
          </p>
        </div>
      </header>

      <section
        aria-label="Resumo do projecto"
        className="grid-editorial py-[var(--space-lg)] md:py-[var(--space-xl)]"
      >
        <div className="col-narrow measure space-y-6">
          <p className="text-body text-ink">{project.summary}</p>
          {project.body.map((paragraph) => (
            <p key={paragraph} className="text-body text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <footer className="grid-editorial py-[var(--space-lg)] md:py-[var(--space-xl)]">
        <div className="col-full flex flex-wrap items-center justify-between gap-6">
          <Link
            href="/work"
            className="text-small text-ink/50 transition-colors hover:text-ink"
          >
            Voltar ao trabalho
          </Link>
          {next && (
            <Link
              href={projectHref(next.id)}
              className="text-title text-ink transition-opacity hover:opacity-70"
            >
              Seguinte: {next.name}
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}
