import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Política de Privacidade, ${SITE.name}`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        O {SITE.name} respeita a sua privacidade. Esta página será actualizada
        com a política de privacidade completa. Para questões, contacte{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-ink underline-offset-4 hover:underline"
        >
          {SITE.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
