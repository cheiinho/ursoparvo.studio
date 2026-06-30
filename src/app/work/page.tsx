import type { Metadata } from "next";
import WorkPageContent from "@/components/WorkPageContent";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Trabalho · ${SITE.name}`,
  description:
    "Identidade visual, grafismo e fotografia. Projectos do Urso Parvo Studio.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
