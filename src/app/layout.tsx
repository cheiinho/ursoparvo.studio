import type { Metadata } from "next";
import { SiteBackground } from "@/components/ui/site-background";
import { inter, instrumentSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ursoparvo.studio",
  ),
  title: "UrsoParvo Studio — Design & Branding",
  description:
    "Independent design studio shaping identity, strategy, and experience for ambitious brands.",
  openGraph: {
    title: "UrsoParvo Studio",
    description: "We design meaning for brands that matter.",
    type: "website",
    images: [{ url: "/assets/bear-yellow.png", width: 147, height: 150, alt: "UrsoParvo Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UrsoParvo Studio",
    description: "We design meaning for brands that matter.",
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
      lang="en"
      className={`h-full scroll-smooth ${inter.variable} ${instrumentSerif.variable}`}
    >
      <body
        className={`${inter.className} relative min-h-full text-foreground antialiased`}
      >
        <SiteBackground />
        {children}
      </body>
    </html>
  );
}
