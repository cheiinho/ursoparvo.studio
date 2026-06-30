import SectionReveal from "@/components/SectionReveal";
import { BEAR_SCRIBBLES } from "@/constants/bear";
import { TAGLINE_EXPANDED } from "@/content/site";
import type { CSSProperties } from "react";

export default function PositioningSection() {
  return (
    <section
      aria-label="Posicionamento"
      className="border-t border-border bg-yellow py-[var(--space-lg)] md:py-[var(--space-2xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal variant="mask" className="col-wide">
          <h2 className="display text-hero leading-[0.92] text-ink">
            {TAGLINE_EXPANDED}
          </h2>
        </SectionReveal>
        <SectionReveal className="col-narrow mt-8 md:mt-14" delay={0.08}>
          <p className="measure text-body leading-[1.65] text-ink md:text-lg">
            Minimal, intemporal, à prova de tendências. A experiência em produto
            — onde o erro custa caro e o utilizador é real — molda a forma como
            abordamos qualquer peça visual. Não é estética pela estética. É
            decisão visual com fundamento.
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
