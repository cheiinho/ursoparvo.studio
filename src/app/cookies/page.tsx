import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Política de Cookies · ${SITE.name}`,
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies">
      <p>
        Este site utiliza apenas cookies essenciais e armazenamento local quando
        necessário para funcionalidade básica. Não utilizamos cookies de
        publicidade de terceiros. Os detalhes completos serão publicados aqui.
      </p>
    </LegalPage>
  );
}
