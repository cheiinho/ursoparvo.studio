import SectionReveal from "@/components/SectionReveal";
import { BEAR_SCRIBBLES } from "@/constants/bear";
import type { CSSProperties } from "react";

export default function PositioningSection() {
  return (
    <section
      aria-label="Studio positioning"
      className="border-t border-border bg-yellow py-[var(--space-xl)] md:py-[var(--space-2xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal variant="mask" className="col-wide">
          <h2 className="display text-hero leading-[0.92] text-ink">
            Built to last.
          </h2>
        </SectionReveal>
        <SectionReveal className="col-narrow mt-10 md:mt-14" delay={0.08}>
          <p className="measure text-body leading-[1.65] text-ink md:text-lg">
            Most brands look right for about five years. Then the gradient ages,
            the type feels off, and someone calls for a rebrand. I work the other
            way. Proportion, contrast, less noise. Stuff that held up in 1965
            and still does.
          </p>
          <div className="positioning-scribbles" aria-hidden>
            {BEAR_SCRIBBLES.map((bear) => (
              <span
                key={bear.src}
                className="positioning-scribble"
                style={
                  { "--scribble-rotate": `${bear.rotate}deg` } as CSSProperties
                }
                data-cursor-hover
              >
                <img src={bear.src} alt="" width={96} height={94} draggable={false} />
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
