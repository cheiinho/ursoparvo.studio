import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectGrid from "@/components/ProjectGrid";
import PublicShell from "@/components/PublicShell";
import { MotionLink } from "@/components/ui-motion";
import { getDict } from "@/content/dict";
import { hasLang, HOME_PATH, LANGS, OTHER_LANG, PROJECT_PATH, STUDIO_PATH } from "@/lib/i18n";

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
      <header className="site-container home-lead">
        <p className="type-display">{dict.home.statement}</p>
        <p className="type-lede measure text-secondary">{dict.home.lede}</p>
      </header>
      <div className="site-container work-bleed">
        <ProjectGrid
          lang={lang}
          product={{
            title: dict.home.productLabel,
            empty: dict.home.productEmpty,
          }}
          graphic={{
            title: dict.home.graphicLabel,
            empty: dict.home.graphicEmpty,
          }}
          openLabel={dict.home.openCaseStudy}
        />
      </div>
      <section className="site-container home-close" aria-label={dict.home.ctaLabel}>
        <MotionLink
          href={PROJECT_PATH[lang]}
          className="home-cta"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {dict.home.ctaLabel}
        </MotionLink>
        <MotionLink href={STUDIO_PATH[lang]} className="home-close__studio type-corpo type-italic">
          {dict.home.studioLabel}
        </MotionLink>
      </section>
    </PublicShell>
  );
}
