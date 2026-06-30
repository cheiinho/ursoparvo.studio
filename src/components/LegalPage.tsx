import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="min-h-dvh px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/"
          className="press text-small text-ink/60 transition-colors duration-200 hover:text-ink"
        >
          Voltar ao início
        </Link>
        <h1 className="text-title mt-8 text-ink">{title}</h1>
        <div className="text-body mt-8 max-w-2xl space-y-4 text-ink-muted">
          {children}
        </div>
      </div>
    </div>
  );
}
