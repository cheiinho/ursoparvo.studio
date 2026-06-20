import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Legal Notice · UrsoParvo Studio",
};

export default function LegalNoticePage() {
  return (
    <LegalPage title="Legal Notice">
      <p>
        <strong>UrsoParvo Studio</strong>
        <br />
        Design studio
        <br />
        Email:{" "}
        <a
          href="mailto:hello@ursoparvo.studio"
          className="text-ink underline-offset-4 hover:underline"
        >
          hello@ursoparvo.studio
        </a>
      </p>
      <p>
        Responsible for content on this website according to applicable law.
        Imprint details will be completed here.
      </p>
    </LegalPage>
  );
}
