import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import { BIO_SHORT, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Sobre · ${SITE.name}`,
  description: BIO_SHORT,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
