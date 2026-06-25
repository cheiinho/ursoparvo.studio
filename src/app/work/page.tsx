import type { Metadata } from "next";
import WorkPageContent from "@/components/WorkPageContent";

export const metadata: Metadata = {
  title: "Work · UrsoParvo Studio",
  description: "Solo design studio in Coimbra. Brand identity, art direction, digital.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
