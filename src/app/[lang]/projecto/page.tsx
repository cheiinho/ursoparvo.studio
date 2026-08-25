import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectInquiry from "@/components/ProjectInquiry";
import PublicShell from "@/components/PublicShell";
import { getDict } from "@/content/dict";
import { SITE } from "@/content/site";
import { PROJECT_PATH } from "@/lib/i18n";

type PageParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return [{ lang: "pt" }];
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "pt") return {};
  const dict = getDict("pt");

  return {
    title: `${dict.contact.title} · ${dict.site.title}`,
    description: dict.contact.intro,
    robots: { index: false, follow: false },
    alternates: {
      canonical: PROJECT_PATH.pt,
      languages: {
        "pt-PT": PROJECT_PATH.pt,
        en: PROJECT_PATH.en,
      },
    },
  };
}

export default async function ProjectoPage({ params }: PageParams) {
  const { lang } = await params;
  if (lang !== "pt") notFound();
  const dict = getDict("pt");

  return (
    <PublicShell
      lang="pt"
      header={dict.header}
      skipLink={dict.skipLink}
      theme={dict.theme}
      langHref={PROJECT_PATH.en}
    >
      <ProjectInquiry dict={dict} email={SITE.email} />
    </PublicShell>
  );
}
