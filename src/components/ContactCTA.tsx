import { ArrowUpRight } from "lucide-react";
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
            className="press nav-cta-split group inline-flex h-auto w-full max-w-full items-stretch gap-0.5 rounded-full border-0 bg-transparent p-0 text-sm font-normal shadow-none sm:w-auto md:text-base"
            data-cursor-hover
          >
            <span className="nav-cta-split__label rounded-full bg-primary px-5 py-3 text-primary-foreground sm:py-2.5 md:px-6 md:py-3">
              {CONTACT.ctaLabel}
            </span>
            <span className="nav-cta-split__arrow relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground">
              <ArrowUpRight
                className="nav-cta-split__icon nav-cta-split__icon--out size-4 md:size-[18px]"
                aria-hidden
              />
              <ArrowUpRight
                className="nav-cta-split__icon nav-cta-split__icon--in absolute size-4 md:size-[18px]"
                aria-hidden
              />
            </span>
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
