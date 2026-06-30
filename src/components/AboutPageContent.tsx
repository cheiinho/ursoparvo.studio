import ContactCTA from "@/components/ContactCTA";
import Nav from "@/components/Nav";
import NumberMoment from "@/components/NumberMoment";
import SectionReveal from "@/components/SectionReveal";
import { ABOUT_CLIENTS_LINE, BIO_LONG, SITE, TAGLINE } from "@/content/site";

export default function AboutPageContent() {
  return (
    <>
      <Nav />
      <main className="page-enter min-h-dvh bg-background">
        <article className="grid-editorial pb-[var(--space-xl)] pt-20 md:pb-[var(--space-2xl)] md:pt-32">
          <SectionReveal className="col-full mb-4">
            <p className="text-small text-ink/40">Sobre</p>
          </SectionReveal>
          <SectionReveal variant="mask" className="col-full">
            <h1 className="text-title text-ink">{SITE.operator}</h1>
          </SectionReveal>
          <SectionReveal className="col-right mt-6 md:mt-8" delay={0.08}>
            <p className="text-body measure text-ink-muted">{TAGLINE}</p>
          </SectionReveal>
          <SectionReveal className="col-right mt-10 md:mt-14" delay={0.12}>
            <div className="text-body measure space-y-6 text-ink">
              {BIO_LONG.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </SectionReveal>
          <SectionReveal className="col-right mt-10 md:mt-12" delay={0.16}>
            <p className="text-small text-ink/40">{ABOUT_CLIENTS_LINE}</p>
          </SectionReveal>
        </article>

        <NumberMoment />

        <ContactCTA />
      </main>
    </>
  );
}
