import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/content/site";
import { UI } from "@/content/ui";

export const metadata: Metadata = {
  title: `${UI.legal.cookiesTitle}, ${SITE.name}`,
};

export default function CookiesPage() {
  return (
    <LegalPage title={UI.legal.cookiesTitle}>
      <p>{UI.legal.cookiesBody}</p>
    </LegalPage>
  );
}
