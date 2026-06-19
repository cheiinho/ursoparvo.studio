import { ArrowUpRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

export default function ContactCTA() {
  return (
    <section
      aria-label="Contact"
      className="border-t border-border bg-white py-16 md:py-20"
    >
      <SectionReveal>
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6 px-6 md:px-10">
          <h2 className="display max-w-xl text-[clamp(1.75rem,4vw,2.75rem)] text-ink">
            Ready to start something worth making?
          </h2>
          <a
            href="mailto:hello@ursoparvo.studio"
            className="press nav-cta-split group inline-flex h-auto items-stretch gap-0.5 rounded-full border-0 bg-transparent p-0 text-sm font-normal shadow-none md:text-base"
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
        </div>
      </SectionReveal>
    </section>
  );
}
