import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — UrsoParvo Studio",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms govern use of the UrsoParvo Studio website and services.
        Full terms will be published here. For enquiries, contact{" "}
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
