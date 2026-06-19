import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SectionReveal from "@/components/SectionReveal";
import { getProject, projectHref, projects } from "@/data/projects";
import { projectPoster } from "@/lib/projectPoster";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project — UrsoParvo Studio" };

  return {
    title: `${project.name} — UrsoParvo Studio`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — UrsoParvo Studio`,
      description: project.summary,
      images: [{ url: "/hero-poster.jpg", alt: project.name }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav visible />
      <main className="min-h-dvh bg-background">
        <article className="scroll-mt-20 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <Link
              href="/work"
              className="tech inline-block text-ink/40 transition-colors hover:text-ink"
            >
              ← All work
            </Link>

            <SectionReveal className="mt-8">
              <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
                <h1 className="display text-[clamp(2.5rem,8vw,5rem)] leading-none">
                  {project.name}
                </h1>
                <p className="tech tabular-nums text-ink/40">{project.year}</p>
              </div>
              <ul className="mt-4 flex flex-wrap gap-3">
                {project.disciplines.map((d) => (
                  <li key={d} className="tech normal-case text-ink/40">
                    {d}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal delay={0.06} className="mt-10 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={projectPoster(project.id, project.name, project.year)}
                alt=""
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full object-cover"
              />
            </SectionReveal>

            <SectionReveal delay={0.1} className="mt-10 max-w-2xl">
              <p className="text-xl leading-relaxed text-ink md:text-2xl">
                {project.summary}
              </p>
            </SectionReveal>

            <div className="mt-10 max-w-2xl space-y-6">
              {project.body.map((paragraph, i) => (
                <SectionReveal key={paragraph.slice(0, 24)} delay={0.12 + i * 0.04}>
                  <p className="text-lg leading-relaxed text-ink-muted md:text-xl">
                    {paragraph}
                  </p>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal delay={0.2} className="mt-14">
              <Link
                href="mailto:hello@ursoparvo.studio"
                className="press inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 md:text-base"
              >
                Start a project →
              </Link>
            </SectionReveal>
          </div>
        </article>
      </main>
    </>
  );
}
