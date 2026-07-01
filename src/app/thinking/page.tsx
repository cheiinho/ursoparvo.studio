import type { Metadata } from "next";
import ThinkingPageContent from "@/components/ThinkingPageContent";
import { SITE } from "@/content/site";
import { UI } from "@/content/ui";

export const metadata: Metadata = {
  title: `${UI.thinking.metadataTitle}, ${SITE.name}`,
  description: UI.thinking.metadataDescription,
};

export default function ThinkingPage() {
  return <ThinkingPageContent />;
}
