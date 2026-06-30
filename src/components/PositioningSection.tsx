import SectionReveal from "@/components/SectionReveal";
import { BEAR_SCRIBBLES } from "@/constants/bear";
import { POSITIONING_BODY } from "@/content/site";
import type { CSSProperties } from "react";

export default function PositioningSection() {
  return (
    <section
      aria-label="Posicionamento"
      className="border-t border-border bg-yellow py-[var(--space-lg)] md:py-[var(--space-2xl)]"
    >
      <div className="studio-ruler" aria-hidden />
      <div className="grid-editorial pt-[var(--space-lg)] md:pt-[var(--space-xl)]">
        <SectionReveal className="col-narrow">
          <div className="measure space-y-6 text-body leading-[1.65] text-ink md:text-lg">
            {POSITIONING_BODY.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
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
