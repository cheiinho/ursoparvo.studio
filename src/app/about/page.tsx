import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About · UrsoParvo Studio",
  description:
    "Designer in Coimbra. Identity, strategy, websites. Solo practice.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
