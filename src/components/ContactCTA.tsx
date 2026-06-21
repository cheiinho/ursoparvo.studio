import { ArrowUpRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

export default function ContactCTA() {
  return (
    <section
      aria-label="Contact"
      className="border-t border-border bg-white py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="grid-editorial items-end">
        <SectionReveal className="col-wide max-w-xl">
          <h2 className="display text-h1 text-ink">Got something in mind?</h2>
          <p className="measure mt-4 text-body leading-[1.65] text-ink-muted md:text-lg">
            Email me. I usually reply within a couple of days. You&apos;ll talk
            to me, not a team.
          </p>
        </SectionReveal>
        <SectionReveal
          className="col-full mt-8 flex justify-start md:col-span-5 md:col-start-8 md:mt-0 md:justify-end"
          delay={0.06}
        >
          <a
            href="mailto:hello@ursoparvo.studio"
            className="press nav-cta-split group inline-flex h-auto items-stretch gap-0.5 rounded-full border-0 bg-transparent p-0 text-sm font-normal shadow-none md:text-base"
            data-cursor-hover
          >
            <span className="nav-cta-split__label rounded-full bg-primary px-5 py-2.5 text-primary-foreground md:px-6 md:py-3">
              hello@ursoparvo.studio
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
