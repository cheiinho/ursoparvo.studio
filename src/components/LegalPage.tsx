import Link from "next/link";
import type { ReactNode } from "react";
import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import { UI } from "@/content/ui";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <PublicShell>
      <div className="site-container legal-shell">
        <Reveal>
          <Link href="/" className="text-link type-nota text-secondary">
            {UI.actions.backToStart}
          </Link>
          <h1 className="type-display">{title}</h1>
          <div className="type-corpo text-secondary">{children}</div>
        </Reveal>
      </div>
    </PublicShell>
  );
}
