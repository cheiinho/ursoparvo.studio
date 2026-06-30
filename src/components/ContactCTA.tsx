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
          <h2 className="text-title text-ink">{CONTACT.title}</h2>
          <p className="text-body measure mt-4 text-ink-muted">{CONTACT.body}</p>
        </SectionReveal>
        <SectionReveal
          className="col-full mt-8 flex w-full justify-start md:col-span-5 md:col-start-8 md:mt-0 md:w-auto md:justify-end"
          delay={0.06}
        >
          <a
            href={CONTACT.mailto}
            className="press text-body inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 py-3 text-primary-foreground md:px-6"
          >
            {CONTACT.ctaLabel}
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
