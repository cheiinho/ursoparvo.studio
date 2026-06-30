import Link from "next/link";
import type { ReactNode } from "react";
import PublicShell from "@/components/PublicShell";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <PublicShell>
      <div className="site-container project-detail-shell">
        <Link href="/" className="text-nav opacity-50 hover:opacity-80">
          Voltar ao início
        </Link>
        <h1 className="project-headline mt-10 not-italic">{title}</h1>
        <div className="text-body mt-8 max-w-2xl space-y-4 opacity-70">
          {children}
        </div>
      </div>
    </PublicShell>
  );
}
