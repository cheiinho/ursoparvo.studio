import type { Metadata, Viewport } from "next";
import { ThemeScript } from "@/components/ThemeScript";
import { getDict } from "@/content/dict";
import { SITE } from "@/content/site";
import { nudica } from "@/lib/fonts";
import { hasLang, HTML_LANG, type Lang } from "@/lib/i18n";
import "../globals.css";

type LayoutParams = { params: Promise<{ lang: string }> };

function resolveLang(lang: string): Lang {
  return hasLang(lang) ? lang : "pt";
}

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(resolveLang(lang));

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url),
    title: dict.site.title,
    description: dict.site.description,
    openGraph: {
      title: dict.site.title,
      description: dict.site.description,
      type: "website",
      locale: resolveLang(lang) === "pt" ? "pt_PT" : "en",
    },
    twitter: {
      card: "summary",
      title: dict.site.title,
      description: dict.site.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#151311" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: LayoutParams & {
  children: React.ReactNode;
}) {
  const { lang } = await params;

  return (
    <html
      lang={HTML_LANG[resolveLang(lang)]}
      className={`h-full scroll-smooth ${nudica.variable}`}
      suppressHydrationWarning
    >
      <body className={`${nudica.className} relative min-h-full antialiased`}>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
