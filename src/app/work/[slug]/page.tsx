import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import Nav from "@/components/Nav";
import { SITE } from "@/content/site";
import { getProject } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { projects } = await import("@/data/projects");
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: `Projecto · ${SITE.name}` };

  return {
    title: `${project.name} · ${SITE.name}`,
    description: project.summary,
    openGraph: {
      title: `${project.name} · ${SITE.name}`,
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
      <CaseStudyTemplate project={project} />
    </>
  );
}
