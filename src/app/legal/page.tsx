import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Aviso Legal · ${SITE.name}`,
};

export default function LegalNoticePage() {
  return (
    <LegalPage title="Aviso Legal">
      <p>
        <strong>{SITE.name}</strong>
        <br />
        Estúdio de design
        <br />
        {SITE.location}
        <br />
        Email:{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-ink underline-offset-4 hover:underline"
        >
          {SITE.email}
        </a>
      </p>
      <p>
        Responsável pelo conteúdo deste site nos termos da lei aplicável. Os
        dados legais completos serão publicados aqui.
      </p>
    </LegalPage>
  );
}
