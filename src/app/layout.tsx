import type { Metadata } from "next";
import { SiteBackground } from "@/components/ui/site-background";
import { BIO_SHORT, SITE } from "@/content/site";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url,
  ),
  title: `${SITE.name}, identidade visual`,
  description: BIO_SHORT,
  openGraph: {
    title: SITE.name,
    description: BIO_SHORT,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE.name,
    description: BIO_SHORT,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`h-full scroll-smooth ${inter.variable}`}>
      <body
        className={`${inter.className} relative min-h-full bg-background text-foreground antialiased`}
      >
        <SiteBackground />
        {children}
      </body>
    </html>
  );
}
