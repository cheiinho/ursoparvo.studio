import type { Metadata } from "next";
import WorkPageContent from "@/components/WorkPageContent";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Trabalho · ${SITE.name}`,
  description:
    "Identidade visual corporativa. Projectos do Urso Parvo Studio, Coimbra.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
