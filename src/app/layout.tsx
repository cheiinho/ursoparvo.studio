import type { Metadata } from "next";
import BearCompanion from "@/components/BearCompanion";
import CursorDot from "@/components/CursorDot";
import Intro from "@/components/Intro";
import { SiteBackground } from "@/components/ui/site-background";
import { BIO_SHORT, SITE } from "@/content/site";
import { instrumentSerif, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url,
  ),
  title: `${SITE.name} · identidade visual`,
  description: BIO_SHORT,
  openGraph: {
    title: SITE.name,
    description: BIO_SHORT,
    type: "website",
    images: [
      {
        url: "/assets/bear-yellow.png",
        width: 147,
        height: 150,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: BIO_SHORT,
    images: ["/assets/bear-yellow.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`h-full scroll-smooth ${inter.variable} ${instrumentSerif.variable}`}
    >
      <body
        className={`${inter.className} relative min-h-full text-foreground antialiased`}
      >
        <SiteBackground />
        <CursorDot />
        <BearCompanion />
        {children}
        <Intro />
      </body>
    </html>
  );
}
