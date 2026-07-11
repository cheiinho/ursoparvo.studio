import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectGrid from "@/components/ProjectGrid";
import PublicShell from "@/components/PublicShell";
import RevealTitle from "@/components/RevealTitle";
import { MotionLink } from "@/components/ui-motion";
import { getDict } from "@/content/dict";
import { hasLang, HOME_PATH, LANGS, OTHER_LANG, STUDIO_PATH } from "@/lib/i18n";

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
      <section className="site-container site-container--wide home-statement">
        <RevealTitle text={dict.home.statement} className="type-display" />
        <MotionLink
          href={`${STUDIO_PATH[lang]}#contacto-h`}
          className="home-cta"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {dict.home.ctaLabel}
        </MotionLink>
      </section>
      <div className="masonry-bleed">
        <ProjectGrid lang={lang} gridLabel={dict.home.gridLabel} />
      </div>
    </PublicShell>
  );
}
