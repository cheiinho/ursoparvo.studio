import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicShell from "@/components/PublicShell";
import ProjectFlow from "@/components/project-flow/ProjectFlow";
import { getProjectFlowContent } from "@/content/project-flow";
import { getDict } from "@/content/dict";
import { SITE } from "@/content/site";
import { PROJECT_PATH } from "@/lib/i18n";

type PageParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return {};
  const content = getProjectFlowContent("en");

  return {
    title: content.meta.title,
    description: content.meta.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: PROJECT_PATH.en,
      languages: {
        "pt-PT": PROJECT_PATH.pt,
        en: PROJECT_PATH.en,
      },
    },
  };
}

export default async function ProjectPage({ params }: PageParams) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const dict = getDict("en");
  const content = getProjectFlowContent("en");

  return (
    <PublicShell
      lang="en"
      header={dict.header}
      skipLink={dict.skipLink}
      theme={dict.theme}
      langHref={PROJECT_PATH.pt}
    >
      <section className="site-container project-flow-page">
        <ProjectFlow lang="en" content={content} email={SITE.email} locale="en-GB" />
      </section>
    </PublicShell>
  );
}
