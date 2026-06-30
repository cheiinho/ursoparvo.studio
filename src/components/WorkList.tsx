import Link from "next/link";
import { hasPublishedWork, projectHref, projects } from "@/data/projects";
import { SITE } from "@/content/site";

export default function WorkList() {
  if (!hasPublishedWork()) {
    return (
      <div className="measure max-w-xl space-y-4">
        <p className="text-body leading-[1.65] text-ink md:text-lg">
          Ainda não há projectos publicados. Quando um trabalho estiver pronto
          para mostrar, aparece aqui.
        </p>
        <p className="text-body leading-[1.65] text-ink-muted">
          <a
            href={`mailto:${SITE.email}`}
            className="link-underline text-ink/70 transition-colors hover:text-ink"
          >
            Escreva-nos
          </a>{" "}
          se quiser falar sobre o seu.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            href={projectHref(project.id)}
            className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-7"
          >
            <span className="display text-project leading-none text-ink">
              {project.name}
            </span>
            <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1 md:justify-end">
              <span className="tech normal-case text-ink/40">
                {project.disciplines.join(" · ")}
              </span>
              <span className="tech tabular-nums text-ink/40">
                {project.year}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
