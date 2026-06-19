"use client";

import Link from "next/link";
import { useState } from "react";
import Bear3DScene from "@/components/bear/Bear3DScene";

export default function Bear3DExperience() {
  const [waveTick, setWaveTick] = useState(0);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[radial-gradient(120%_120%_at_50%_35%,#f7f6f3_0%,#ededea_62%,#e2e1dd_100%)] text-ink">
      <div className="absolute inset-0">
        <Bear3DScene variant="full" waveTick={waveTick} />
      </div>

      <div
        className="pointer-events-none fixed inset-0 flex flex-col justify-between p-[clamp(18px,3.2vw,40px)]"
        aria-hidden
      >
        <div className="flex items-start justify-between gap-4">
          <Link
            href="/"
            className="pointer-events-auto press text-sm font-normal tracking-[0.34em] uppercase md:text-base"
            data-cursor-hover
          >
            Urso&nbsp;Parvo
          </Link>
          <p className="hidden text-right text-[11px] tracking-[0.18em] text-ink/50 uppercase sm:block">
            Estudo 3D
            <br />
            v.1 · web
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="flex items-center gap-2.5 text-[11px] tracking-[0.22em] text-ink/45 uppercase">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-yellow shadow-[0_0_0_1px_var(--ink)]" />
            Drag to rotate
          </p>
          <p className="text-[11px] tracking-[0.18em] text-ink/50 uppercase">
            #f5e642 · #1a1a1a
          </p>
        </div>
      </div>

      <div className="fixed right-[clamp(18px,3.2vw,40px)] bottom-[calc(clamp(18px,3.2vw,40px)+34px)]">
        <button
          type="button"
          onClick={() => setWaveTick((n) => n + 1)}
          className="press rounded-full border border-ink bg-transparent px-3.5 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 hover:bg-ink hover:text-white"
          data-cursor-hover
        >
          Wave
        </button>
      </div>
    </div>
  );
}
