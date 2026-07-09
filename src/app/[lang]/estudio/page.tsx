import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicShell from "@/components/PublicShell";
import StudioSections from "@/components/StudioSections";
import { getDict } from "@/content/dict";
import { STUDIO_PATH } from "@/lib/i18n";

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
    title: dict.studio.metaTitle,
    description: dict.studio.metaDescription,
    alternates: {
      canonical: STUDIO_PATH.pt,
      languages: {
        "pt-PT": STUDIO_PATH.pt,
        en: STUDIO_PATH.en,
        "x-default": STUDIO_PATH.pt,
      },
    },
  };
}

export default async function EstudioPage({ params }: PageParams) {
  const { lang } = await params;
  if (lang !== "pt") notFound();
  const dict = getDict("pt");

  return (
    <PublicShell
      lang="pt"
      header={dict.header}
      skipLink={dict.skipLink}
      theme={dict.theme}
      langHref={STUDIO_PATH.en}
    >
      <StudioSections dict={dict} />
    </PublicShell>
  );
}
