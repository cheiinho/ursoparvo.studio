import SectionReveal from "@/components/SectionReveal";
import { CONTACT } from "@/content/site";

export default function ContactCTA() {
  return (
    <section
      aria-label="Contacto"
      className="bg-white py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="grid-editorial items-end">
        <SectionReveal className="col-wide max-w-xl">
          <h2 className="display text-h1 text-ink">{CONTACT.title}</h2>
          <p className="measure mt-4 text-body leading-[1.65] text-ink-muted md:text-lg">
            {CONTACT.body}
          </p>
        </SectionReveal>
        <SectionReveal
          className="col-full mt-8 flex w-full justify-start md:col-span-5 md:col-start-8 md:mt-0 md:w-auto md:justify-end"
          delay={0.06}
        >
          <a
            href={CONTACT.mailto}
            className="press inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground sm:py-2.5 md:px-6 md:text-base"
          >
            {CONTACT.ctaLabel}
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
