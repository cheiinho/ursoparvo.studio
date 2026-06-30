import ContactCTA from "@/components/ContactCTA";
import Nav from "@/components/Nav";
import NumberMoment from "@/components/NumberMoment";
import SectionReveal from "@/components/SectionReveal";
import { ABOUT_CLIENTS, BIO_LONG, SITE, TAGLINE } from "@/content/site";

export default function AboutPageContent() {
  return (
    <>
      <Nav visible />
      <main className="page-enter min-h-dvh bg-background">
        <article className="grid-editorial pb-[var(--space-xl)] pt-20 md:pb-[var(--space-2xl)] md:pt-32">
          <SectionReveal className="col-full mb-4">
            <p className="tech text-ink/40">Sobre</p>
          </SectionReveal>
          <SectionReveal variant="mask" className="col-full">
            <h1 className="display text-hero leading-[0.9] text-ink">
              {SITE.operator}
            </h1>
          </SectionReveal>
          <SectionReveal className="col-right mt-6 md:mt-8" delay={0.08}>
            <p className="measure text-body leading-[1.65] text-ink-muted md:text-lg">
              {TAGLINE}
            </p>
          </SectionReveal>
          <SectionReveal className="col-right mt-10 md:mt-14" delay={0.12}>
            <div className="measure space-y-6 text-body leading-[1.65] text-ink md:text-lg">
              {BIO_LONG.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </SectionReveal>
          <SectionReveal className="col-right mt-10 md:mt-12" delay={0.16}>
            <p className="tech normal-case text-ink/40">
              {ABOUT_CLIENTS.join(" · ")}
            </p>
          </SectionReveal>
        </article>

        <NumberMoment />

        <ContactCTA />
      </main>
    </>
  );
}
