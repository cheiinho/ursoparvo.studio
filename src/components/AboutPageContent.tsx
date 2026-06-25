import ContactCTA from "@/components/ContactCTA";
import Nav from "@/components/Nav";
import NumberMoment from "@/components/NumberMoment";
import SectionReveal from "@/components/SectionReveal";

export default function AboutPageContent() {
  return (
    <>
      <Nav visible />
      <main className="page-enter min-h-dvh bg-background">
        <article className="grid-editorial pb-[var(--space-xl)] pt-20 md:pb-[var(--space-2xl)] md:pt-32">
          <SectionReveal className="col-full mb-4">
            <p className="tech text-ink/40">About</p>
          </SectionReveal>
          <SectionReveal variant="mask" className="col-full">
            <h1 className="display text-hero leading-[0.9] text-ink">
              Brands that do not need redoing.
            </h1>
          </SectionReveal>
          <SectionReveal className="col-right mt-10 md:mt-14" delay={0.12}>
            <div className="measure space-y-6 text-body leading-[1.65] text-ink md:text-lg">
              <p>
                When a brand follows the taste of the year it was made, it has a
                shelf life. When it is built on proportion, contrast, and
                reduction, it is hard to date. That is what I aim for.
              </p>
              <p>
                I am not interested in mesh gradients, scroll tricks, or whatever
                won an award last month. I am interested in work that still makes
                sense when the trend passes.
              </p>
              <p>
                UrsoParvo is my studio. Just me. I take a small number of
                projects and stay in them.
              </p>
            </div>
          </SectionReveal>
        </article>

        <NumberMoment />

        <ContactCTA />
      </main>
    </>
  );
}
