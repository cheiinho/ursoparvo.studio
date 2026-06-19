import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";
import { projectHref, projects } from "@/data/projects";

function formatIndex(n: number) {
  return String(n).padStart(2, "0");
}

export default function WorkList() {
  return (
    <ul>
      {projects.map((project, i) => (
        <SectionReveal key={project.id} as="li" delay={i * 0.05}>
          <Link
            href={projectHref(project.id)}
            className="work-row group grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[3rem_1fr_auto_5rem] md:gap-x-8 md:py-8"
          >
            <span className="tech tabular-nums self-start pt-2 text-ink/35 md:self-baseline md:pt-0">
              {formatIndex(i + 1)}
            </span>

            <span className="work-row__name display text-[clamp(2rem,7vw,4rem)] leading-none">
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
      ))}
    </ul>
  );
}
