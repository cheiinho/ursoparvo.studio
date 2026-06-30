import type { Metadata } from "next";
import { ThemeScript } from "@/components/ThemeScript";
import { BIO_SHORT, SITE } from "@/content/site";
import { pangaia, sohne } from "@/lib/fonts";
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
    <html
      lang="pt"
      className={`h-full scroll-smooth ${sohne.variable} ${pangaia.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${sohne.className} relative min-h-full bg-background text-foreground antialiased`}
      >
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
