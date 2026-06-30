import SectionReveal from "@/components/SectionReveal";
import { ABOUT_HOME } from "@/content/site";

export default function AboutSection() {
  return (
    <section
      aria-label={ABOUT_HOME.title}
      className="bg-background py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal variant="mask" className="col-wide">
          <h2 className="text-title text-ink">{ABOUT_HOME.title}</h2>
        </SectionReveal>
        <SectionReveal className="col-narrow mt-8 md:mt-12" delay={0.08}>
          <div className="text-body measure space-y-6 text-ink">
            {ABOUT_HOME.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
