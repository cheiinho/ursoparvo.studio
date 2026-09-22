import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Announcer } from "@/components/intraday/Announcer";
import IntradayCaseStudy from "@/components/intraday/IntradayCaseStudy";
import PublicShell from "@/components/PublicShell";
import { getIntradayContent } from "@/content/intraday";
import { getDict } from "@/content/dict";
import { HOME_PATH, INTRADAY_PATH } from "@/lib/i18n";

type PageParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return {};
  const content = getIntradayContent("en");

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: INTRADAY_PATH.en,
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      type: "article",
      locale: "en",
    },
  };
}

export default async function IntradayWorkPage({ params }: PageParams) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const dict = getDict("en");
  const content = getIntradayContent("en");

  return (
    <PublicShell
      lang="en"
      header={dict.header}
      skipLink={dict.skipLink}
      theme={dict.theme}
      langHref={HOME_PATH.pt}
      studioOpen
    >
      <Announcer>
        <IntradayCaseStudy content={content} />
      </Announcer>
    </PublicShell>
  );
}
