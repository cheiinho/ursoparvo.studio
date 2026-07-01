import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import Section from "@/components/Section";
import { UI } from "@/content/ui";

export default function NotFound() {
  return (
    <PublicShell>
      <Section>
        <div className="section__content section__content--center">
          <p className="type-display">{UI.notFound.heading}</p>
          <Link href="/" className="text-link type-corpo">
            {UI.notFound.action}
          </Link>
        </div>
      </Section>
    </PublicShell>
  );
}
