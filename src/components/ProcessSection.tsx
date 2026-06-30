import SectionReveal from "@/components/SectionReveal";
import { PROCESS } from "@/content/site";

export default function ProcessSection() {
  return (
    <section
      aria-label={PROCESS.title}
      className="bg-background py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal variant="mask" className="col-wide">
          <h2 className="display text-h1 text-ink">{PROCESS.title}</h2>
        </SectionReveal>
        <SectionReveal className="col-narrow mt-8 md:mt-12" delay={0.06}>
          <div className="measure space-y-6 text-body leading-[1.65] text-ink md:text-lg">
            <p>{PROCESS.intro}</p>
            <p>{PROCESS.body}</p>
          </div>
        </SectionReveal>
        <SectionReveal className="col-full mt-10 md:mt-14" delay={0.12}>
          <ol className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5 md:gap-6">
            {PROCESS.phases.map((phase, index) => (
              <li key={phase}>
                <span className="tech text-ink/35" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="display mt-3 text-[clamp(1.25rem,2.5vw,1.75rem)] leading-tight text-ink">
                  {phase}
                </p>
              </li>
            ))}
          </ol>
        </SectionReveal>
      </div>
    </section>
  );
}
