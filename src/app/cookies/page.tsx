import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy · UrsoParvo Studio",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>
        This site uses essential cookies and local storage only where required
        for basic functionality. We do not use third-party advertising cookies.
        Full cookie details will be published here.
      </p>
    </LegalPage>
  );
}
