import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicShell from "@/components/PublicShell";
import StudioSections from "@/components/StudioSections";
import { getDict } from "@/content/dict";
import { STUDIO_PATH } from "@/lib/i18n";

type PageParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return {};
  const dict = getDict("en");

  return {
    title: dict.studio.metaTitle,
    description: dict.studio.metaDescription,
    alternates: {
      canonical: STUDIO_PATH.en,
      languages: {
        "pt-PT": STUDIO_PATH.pt,
        en: STUDIO_PATH.en,
        "x-default": STUDIO_PATH.pt,
      },
    },
  };
}

export default async function StudioPage({ params }: PageParams) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const dict = getDict("en");

  return (
    <PublicShell
      lang="en"
      header={dict.header}
      skipLink={dict.skipLink}
      theme={dict.theme}
      langHref={STUDIO_PATH.pt}
    >
      <StudioSections dict={dict} />
    </PublicShell>
  );
}
