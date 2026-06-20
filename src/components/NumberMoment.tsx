"use client";

import { useEffect, useRef, useState } from "react";
import SectionReveal from "@/components/SectionReveal";

type Stat = { value: number | string; suffix?: string; label: string };

const DEFAULT_STATS: Stat[] = [
  { value: 1, label: "person. The one you actually talk to." },
  { value: 0, label: "employees. No account managers, no hand-offs." },
  { value: "∞", label: "revisions until it is right. Then it stops." },
];

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || target === 0) {
      setN(target);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const dur = 1100;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{n}</span>;
}

type NumberMomentProps = {
  eyebrow?: string;
  stats?: Stat[];
};

export default function NumberMoment({
  eyebrow = "The studio, in three numbers",
  stats = DEFAULT_STATS,
}: NumberMomentProps) {
  return (
    <section
      aria-label="By the numbers"
      className="border-t border-border bg-background py-[var(--space-xl)] md:py-[var(--space-2xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal variant="mask" className="col-full mb-10 md:mb-16">
          <p className="tech text-ink/40">{eyebrow}</p>
        </SectionReveal>
        <ul className="col-full grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {stats.map((s, i) => (
            <SectionReveal as="li" key={i} delay={i * 0.08}>
              <p className="display leading-[0.82] text-ink text-[clamp(5rem,14vw,11rem)]">
                {typeof s.value === "number" ? (
                  <CountUp target={s.value} />
                ) : (
                  s.value
                )}
                {s.suffix}
              </p>
              <p className="measure mt-5 text-body leading-[1.5] text-ink-muted">
                {s.label}
              </p>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
