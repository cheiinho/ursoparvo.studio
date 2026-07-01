import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/content/site";
import { UI } from "@/content/ui";

export const metadata: Metadata = {
  title: `${UI.legal.noticeTitle}, ${SITE.name}`,
};

export default function LegalNoticePage() {
  return (
    <LegalPage title={UI.legal.noticeTitle}>
      <p>{UI.legal.noticeBody}</p>
    </LegalPage>
  );
}
