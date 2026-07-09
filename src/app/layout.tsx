import type { Metadata, Viewport } from "next";
import { ThemeScript } from "@/components/ThemeScript";
import { BIO_SHORT, SITE } from "@/content/site";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url,
  ),
  title: SITE.name,
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#151311" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`h-full scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} relative min-h-full antialiased`}>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
