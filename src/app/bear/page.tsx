import type { Metadata } from "next";
import Bear3DExperience from "@/components/bear/Bear3DExperience";

export const metadata: Metadata = {
  title: "Urso Parvo · 3D — UrsoParvo Studio",
  description: "Urso Parvo em 3D interactivo. Arrasta para girar.",
};

export default function BearPage() {
  return <Bear3DExperience />;
}
