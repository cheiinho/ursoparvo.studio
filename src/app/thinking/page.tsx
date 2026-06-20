import type { Metadata } from "next";
import ThinkingPageContent from "@/components/ThinkingPageContent";

export const metadata: Metadata = {
  title: "Point of view · UrsoParvo Studio",
  description:
    "On permanence, type, and why a fool is always a fool. The studio filter.",
};

export default function ThinkingPage() {
  return <ThinkingPageContent />;
}
