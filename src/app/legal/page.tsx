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
      <p>
        <strong>{SITE.name}</strong>
        <br />
        {UI.legal.noticeStudio}
        <br />
        {SITE.location}
        <br />
        Email:{" "}
        <a href={`mailto:${SITE.email}`} className="text-link">
          {SITE.email}
        </a>
      </p>
      <p>{UI.legal.noticeResponsibility}</p>
    </LegalPage>
  );
}
