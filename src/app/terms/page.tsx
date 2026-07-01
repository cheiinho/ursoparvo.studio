import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/content/site";
import { UI } from "@/content/ui";

export const metadata: Metadata = {
  title: `${UI.legal.termsTitle}, ${SITE.name}`,
};

export default function TermsPage() {
  return (
    <LegalPage title={UI.legal.termsTitle}>
      <p>
        {UI.legal.termsLead}{" "}
        <a href={`mailto:${SITE.email}`} className="text-link">
          {SITE.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
