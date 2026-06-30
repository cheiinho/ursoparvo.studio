import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Termos de Serviço, ${SITE.name}`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Termos de Serviço">
      <p>
        Estes termos regem a utilização do site e serviços do {SITE.name}. Os
        termos completos serão publicados aqui. Para questões, contacte{" "}
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
