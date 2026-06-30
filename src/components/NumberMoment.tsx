"use client";

import { useEffect, useRef, useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import { NUMBER_MOMENT } from "@/content/site";

type Stat = { value: number | string; suffix?: string; label: string };

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
  eyebrow = NUMBER_MOMENT.eyebrow,
  stats = NUMBER_MOMENT.stats.map((stat) => ({ ...stat })),
}: NumberMomentProps) {
  return (
    <section
      aria-label={NUMBER_MOMENT.eyebrow}
      className="bg-background py-[var(--space-xl)] md:py-[var(--space-2xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal variant="mask" className="col-full mb-10 md:mb-16">
          <p className="text-small text-ink/40">{eyebrow}</p>
        </SectionReveal>
        <ul className="col-full grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
          {stats.map((s) => (
            <SectionReveal as="li" key={s.label} delay={0}>
              <p className="text-title text-ink">
                {typeof s.value === "number" ? (
                  <CountUp target={s.value} />
                ) : (
                  s.value
                )}
                {s.suffix}
              </p>
              <p className="text-body measure mt-5 text-ink-muted">{s.label}</p>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
