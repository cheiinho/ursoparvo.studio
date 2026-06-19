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
          className="press text-sm text-ink/60 transition-colors duration-200 hover:text-ink"
        >
          ← Back home
        </Link>
        <h1 className="display mt-8 text-[clamp(2rem,5vw,3rem)]">{title}</h1>
        <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-ink-muted md:text-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
