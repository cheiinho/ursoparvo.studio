import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/content/site";
import { UI } from "@/content/ui";

export const metadata: Metadata = {
  title: `${UI.legal.privacyTitle}, ${SITE.name}`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title={UI.legal.privacyTitle}>
      <p>
        {UI.legal.privacyLead}{" "}
        <a href={`mailto:${SITE.email}`} className="text-link">
          {SITE.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
