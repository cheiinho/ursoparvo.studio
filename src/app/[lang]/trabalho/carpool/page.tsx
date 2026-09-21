import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CarpoolCaseStudy from "@/components/carpool/CarpoolCaseStudy";
import PublicShell from "@/components/PublicShell";
import { getCarpoolContent } from "@/content/carpool";
import { getDict } from "@/content/dict";
import { CARPOOL_PATH } from "@/lib/i18n";

type PageParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return [{ lang: "pt" }];
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "pt") return {};
  const content = getCarpoolContent("pt");

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: CARPOOL_PATH.pt,
      languages: {
        "pt-PT": CARPOOL_PATH.pt,
        en: CARPOOL_PATH.en,
        "x-default": CARPOOL_PATH.pt,
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      type: "article",
      locale: "pt_PT",
    },
  };
}

export default async function CarpoolTrabalhoPage({ params }: PageParams) {
  const { lang } = await params;
  if (lang !== "pt") notFound();
  const dict = getDict("pt");
  const content = getCarpoolContent("pt");

  return (
    <PublicShell
      lang="pt"
      header={dict.header}
      skipLink={dict.skipLink}
      theme={dict.theme}
      langHref={CARPOOL_PATH.en}
      studioOpen
    >
      <CarpoolCaseStudy content={content} />
    </PublicShell>
  );
}
