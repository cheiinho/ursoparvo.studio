import SectionReveal from "@/components/SectionReveal";
import { ABOUT_HOME } from "@/content/site";

export default function AboutSection() {
  return (
    <section
      aria-label={ABOUT_HOME.title}
      className="border-t border-border bg-background py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal variant="mask" className="col-wide">
          <h2 className="display text-h1 text-ink">{ABOUT_HOME.title}</h2>
        </SectionReveal>
        <SectionReveal className="col-narrow mt-8 md:mt-12" delay={0.08}>
          <div className="measure space-y-6 text-body leading-[1.65] text-ink md:text-lg">
            {ABOUT_HOME.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
