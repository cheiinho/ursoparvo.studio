import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import Section from "@/components/Section";
import { UI } from "@/content/ui";

export default function NotFound() {
  return (
    <PublicShell>
      <Section>
        <div
          className="flex flex-col items-start gap-6"
          style={{ minHeight: "50svh", justifyContent: "center" }}
        >
          <p className="type-display">{UI.notFound.heading}</p>
          <Link href="/" className="text-link type-corpo">
            {UI.notFound.action}
          </Link>
        </div>
      </Section>
    </PublicShell>
  );
}
