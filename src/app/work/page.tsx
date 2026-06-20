import type { Metadata } from "next";
import WorkPageContent from "@/components/WorkPageContent";

export const metadata: Metadata = {
  title: "Work · UrsoParvo Studio",
  description: "Selected projects. Identity, print, digital, packaging.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
