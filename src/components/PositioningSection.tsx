import SectionReveal from "@/components/SectionReveal";
import { POSITIONING_BODY } from "@/content/site";

export default function PositioningSection() {
  return (
    <section
      aria-label="Posicionamento"
      className="bg-yellow py-[var(--space-lg)] md:py-[var(--space-2xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal className="col-narrow">
          <div className="text-body measure space-y-6 text-ink">
            {POSITIONING_BODY.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
