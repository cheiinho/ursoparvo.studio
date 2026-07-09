import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectGrid from "@/components/ProjectGrid";
import PublicShell from "@/components/PublicShell";
import { getDict } from "@/content/dict";
import { hasLang, HOME_PATH, LANGS, OTHER_LANG } from "@/lib/i18n";

type PageParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLang(lang)) return {};
  const dict = getDict(lang);

  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    alternates: {
      canonical: HOME_PATH[lang],
      languages: {
        "pt-PT": HOME_PATH.pt,
        en: HOME_PATH.en,
        "x-default": HOME_PATH.pt,
      },
    },
  };
}

export default async function HomePage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLang(lang)) notFound();
  const dict = getDict(lang);

  return (
    <PublicShell
      lang={lang}
      header={dict.header}
      skipLink={dict.skipLink}
      theme={dict.theme}
      langHref={HOME_PATH[OTHER_LANG[lang]]}
    >
      <div className="masonry-bleed">
        <h1 className="sr-only">{dict.home.srTitle}</h1>
        <ProjectGrid lang={lang} gridLabel={dict.home.gridLabel} />
      </div>
    </PublicShell>
  );
}
