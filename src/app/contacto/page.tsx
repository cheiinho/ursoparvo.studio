import type { Metadata } from "next";
import ContactoPageContent from "@/components/ContactoPageContent";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Contacto, ${SITE.name}`,
  description:
    "Fale sobre um projecto de identidade visual corporativa, grafismo ou fotografia. Urso Parvo Studio, Coimbra.",
};

export default function ContactoPage() {
  return <ContactoPageContent />;
}
