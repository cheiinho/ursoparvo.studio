import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CarpoolCaseStudy from "@/components/carpool/CarpoolCaseStudy";
import PublicShell from "@/components/PublicShell";
import { getCarpoolContent } from "@/content/carpool";
import { getDict } from "@/content/dict";
import { CARPOOL_PATH } from "@/lib/i18n";

type PageParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return {};
  const content = getCarpoolContent("en");

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: CARPOOL_PATH.en,
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
      locale: "en",
    },
  };
}

export default async function CarpoolWorkPage({ params }: PageParams) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const dict = getDict("en");
  const content = getCarpoolContent("en");

  return (
    <PublicShell
      lang="en"
      header={dict.header}
      skipLink={dict.skipLink}
      theme={dict.theme}
      langHref={CARPOOL_PATH.pt}
      studioOpen
    >
      <CarpoolCaseStudy content={content} />
    </PublicShell>
  );
}
