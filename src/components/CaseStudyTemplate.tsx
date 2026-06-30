import Link from "next/link";
import PublicShell from "@/components/PublicShell";
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
    <PublicShell>
      <div className="site-container project-detail-shell">
        <article className="project-editorial">
          <header className="project-editorial__headline">
            <h1 className="project-headline">{project.name}</h1>
          </header>

          <div className="project-editorial__info">
            <div className="project-editorial__facts">
              {project.disciplines.map((discipline, index) => (
                <span key={discipline}>
                  {index > 0 && (
                    <span className="project-editorial__bullet" aria-hidden>
                      ·
                    </span>
                  )}
                  <span className="project-editorial__fact">{discipline}</span>
                </span>
              ))}
              {project.year && (
                <>
                  <span className="project-editorial__bullet" aria-hidden>
                    ·
                  </span>
                  <span className="project-editorial__fact">{project.year}</span>
                </>
              )}
            </div>

            <p className="project-editorial__description">{project.summary}</p>
          </div>
        </article>

        <section className="project-gallery" aria-label="Galeria do projecto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={projectPoster(project.id, project.name, project.year)}
            alt=""
            width={2400}
            height={1350}
            className="w-full"
            style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
          />
        </section>

        {project.body.length > 0 && (
          <section className="mx-auto mt-16 max-w-[52rem] space-y-6">
            {project.body.map((paragraph) => (
              <p key={paragraph} className="text-body opacity-70">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-foreground/10 pt-8">
          <Link href="/work" className="text-nav opacity-50 hover:opacity-80">
            Voltar ao trabalho
          </Link>
          {next && (
            <Link
              href={projectHref(next.id)}
              className="project-row__title text-[clamp(24px,4vw,36px)] hover:opacity-70"
            >
              Seguinte: {next.name}
            </Link>
          )}
        </footer>
      </div>
    </PublicShell>
  );
}
