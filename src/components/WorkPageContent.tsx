"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import WorkList from "@/components/WorkList";
import { projects } from "@/data/projects";

export default function WorkPageContent() {
  return (
    <>
      <Nav visible />
      <main className="min-h-dvh bg-background">
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
                <h1 className="display text-[clamp(2rem,5vw,3.5rem)] leading-none">
                  Selected work
                </h1>
              </div>
              <p className="tech tabular-nums text-ink/40">
                {String(projects.length).padStart(2, "0")} entries
              </p>
            </div>

            <WorkList />
          </div>
        </section>
      </main>
    </>
  );
}
