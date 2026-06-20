import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy · UrsoParvo Studio",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        UrsoParvo Studio respects your privacy. This page will be updated with
        our full privacy policy. For questions, contact{" "}
        <a
          href="mailto:hello@ursoparvo.studio"
          className="text-ink underline-offset-4 hover:underline"
        >
          hello@ursoparvo.studio
        </a>
        .
      </p>
    </LegalPage>
  );
}
