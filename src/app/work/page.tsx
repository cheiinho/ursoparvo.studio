import type { Metadata } from "next";
import WorkPageContent from "@/components/WorkPageContent";

export const metadata: Metadata = {
  title: "Work — UrsoParvo Studio",
  description:
    "Selected projects in brand identity, art direction, digital experience, and more.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
