import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";
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
  const { caseStudy } = project;
  const next = getNextProject(project.id);

  return (
    <article>
      {/* 01 Cover */}
      <header className="grid-editorial pb-[var(--space-lg)] pt-[var(--space-md)] md:pb-[var(--space-xl)]">
        <SectionReveal className="col-full">
          <Link
            href="/work"
            className="tech inline-block text-ink/40 transition-colors hover:text-ink"
            data-cursor-hover
          >
            ← All work
          </Link>
        </SectionReveal>

        <SectionReveal className="col-full mt-8 overflow-hidden rounded-lg" delay={0.04}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={projectPoster(project.id, project.name, project.year)}
            alt=""
            width={2400}
            height={1350}
            className="aspect-[16/9] w-full object-cover"
            fetchPriority="high"
          />
        </SectionReveal>

        <SectionReveal className="col-full mt-10 md:mt-14" delay={0.06}>
          <h1 className="display text-hero text-ink">{project.name}</h1>
          <p className="tech mt-4 text-ink/45">
            {project.disciplines.join(" · ")} · {project.year}
          </p>
        </SectionReveal>
      </header>

      {/* 02 Brief */}
      <section
        aria-label="Brief"
        className="grid-editorial border-t border-border py-[var(--space-lg)] md:py-[var(--space-xl)]"
      >
        <SectionReveal className="col-wide">
          <p className="tech mb-8 text-ink/40">Brief</p>
          <dl className="measure space-y-8">
            <div>
              <dt className="tech mb-2 text-ink/45">The problem</dt>
              <dd className="text-body leading-[1.65] text-ink md:text-lg">
                {caseStudy.problem}
              </dd>
            </div>
            <div>
              <dt className="tech mb-2 text-ink/45">The client</dt>
              <dd className="text-body leading-[1.65] text-ink md:text-lg">
                {caseStudy.client}
              </dd>
            </div>
            <div>
              <dt className="tech mb-2 text-ink/45">Creative tension</dt>
              <dd className="text-body leading-[1.65] text-ink md:text-lg">
                {caseStudy.creativeTension}
              </dd>
            </div>
          </dl>
        </SectionReveal>
      </section>

      {/* 03 Reasoning */}
      <section
        aria-label="Reasoning"
        className="grid-editorial border-t border-border py-[var(--space-lg)] md:py-[var(--space-xl)]"
      >
        <SectionReveal className="col-full mb-10 md:mb-14">
          <p className="tech text-ink/40">Reasoning</p>
        </SectionReveal>

        {caseStudy.decisions.map((decision, i) => (
          <SectionReveal
            key={decision.title}
            className="col-narrow mb-16 last:mb-0 md:mb-20"
            delay={i * 0.05}
          >
            <h2 className="display mb-8 text-h2 text-ink">{decision.title}</h2>
            <div className="measure space-y-6">
              <div>
                <p className="tech mb-2 text-ink/45">Discarded</p>
                <p className="text-body leading-[1.65] text-ink-muted">
                  {decision.discarded}
                </p>
              </div>
              <div>
                <p className="tech mb-2 text-ink/45">Chosen</p>
                <p className="text-body leading-[1.65] text-ink">
                  {decision.chosen}
                </p>
              </div>
              {decision.body && (
                <p className="text-body leading-[1.65] text-ink-muted">
                  {decision.body}
                </p>
              )}
            </div>
          </SectionReveal>
        ))}
      </section>

      {/* What lasts */}
      <section
        aria-label="What lasts"
        className="grid-editorial border-t border-border py-[var(--space-lg)] md:py-[var(--space-xl)]"
      >
        <SectionReveal className="col-narrow">
          <p className="tech mb-6 text-ink/40">What lasts</p>
          <p className="measure text-body leading-[1.65] text-ink md:text-lg">
            {caseStudy.whatLasts}
          </p>
        </SectionReveal>
      </section>

      {/* 04 System */}
      <section
        aria-label="System"
        className="grid-editorial border-t border-border bg-ground py-[var(--space-lg)] md:py-[var(--space-xl)]"
      >
        <SectionReveal className="col-wide">
          <p className="tech mb-8 text-ink/40">System</p>
          <ul className="measure space-y-4">
            {caseStudy.systemNotes.map((note) => (
              <li
                key={note}
                className="flex gap-3 text-body leading-[1.65] text-ink"
              >
                <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-yellow" />
                {note}
              </li>
            ))}
          </ul>
        </SectionReveal>
      </section>

      {/* 05 Applications */}
      <section
        aria-label="Applications"
        className="grid-editorial py-[var(--space-lg)] md:py-[var(--space-xl)]"
      >
        <SectionReveal className="col-full mb-10 md:mb-14">
          <p className="tech text-ink/40">Applications</p>
        </SectionReveal>

        {caseStudy.applicationImages.map((src, i) => (
          <SectionReveal
            key={src}
            className={i === 0 ? "col-full" : "col-offset"}
            delay={i * 0.04}
          >
            <div className="project-image overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                width={1600}
                height={1000}
                className={`w-full object-cover ${
                  i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </SectionReveal>
        ))}
      </section>

      {/* 06 Outcome */}
      <section
        aria-label="Outcome"
        className="grid-editorial border-t border-border py-[var(--space-lg)] md:py-[var(--space-xl)]"
      >
        <SectionReveal className="col-narrow">
          <p className="tech mb-6 text-ink/40">Outcome</p>
          <p className="measure text-body leading-[1.65] text-ink md:text-xl">
            {caseStudy.outcome}
          </p>
        </SectionReveal>
      </section>

      {/* 07 Navigation */}
      <footer className="grid-editorial border-t border-border py-[var(--space-lg)] md:py-[var(--space-xl)]">
        <SectionReveal className="col-full flex flex-wrap items-center justify-between gap-6">
          <Link
            href="/work"
            className="link-underline tech text-ink/50 transition-colors hover:text-ink"
            data-cursor-hover
          >
            ← All work
          </Link>
          {next && (
            <Link
              href={projectHref(next.id)}
              className="link-underline display text-h2 text-ink"
              data-cursor-hover
            >
              Next: {next.name} →
            </Link>
          )}
        </SectionReveal>
      </footer>
    </article>
  );
}
