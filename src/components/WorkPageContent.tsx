"use client";

import Link from "next/link";
import { useState } from "react";
import Nav from "@/components/Nav";
import WorkList from "@/components/WorkList";
import { projects } from "@/data/projects";

export default function WorkPageContent() {
  const [previewId, setPreviewId] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <>
      <Nav visible />
      <main className="page-enter min-h-dvh bg-background">
        <section
          className="scroll-mt-20 border-t border-border px-6 py-24 md:px-10 md:py-32"
          aria-label="All work"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <Link
                  href="/"
                  className="tech mb-4 inline-block text-ink/40 transition-colors hover:text-ink"
                  data-cursor-hover
                >
                  ← Home
                </Link>
                <h1 className="display text-hero leading-[0.92] text-ink">
                  Selected work
                </h1>
              </div>
              <p className="tech tabular-nums text-ink/40">
                {String(projects.length).padStart(2, "0")} entries
              </p>
            </div>

            <WorkList
              previewProjectId={previewId}
              onPreviewChange={setPreviewId}
            />
          </div>
        </section>
      </main>
    </>
  );
}
