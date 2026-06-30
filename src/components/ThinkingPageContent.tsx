import ContactCTA from "@/components/ContactCTA";
import Nav from "@/components/Nav";
import SectionReveal from "@/components/SectionReveal";

const LAWS = [
  {
    n: "I",
    text: "A mark should work in any decade. You should not be able to guess when it was made.",
  },
  {
    n: "II",
    text: "Trend-led work has an expiry date. Timeless work does not.",
  },
  {
    n: "III",
    text: "Removing things is harder than adding them. That is where the real work is.",
  },
  {
    n: "IV",
    text: "Process beats a single clever moment. Good process gives you good work again.",
  },
  {
    n: "V",
    text: "Type is structure, not decoration.",
  },
  {
    n: "VI",
    text: "Consistency over years beats brilliance for one launch.",
  },
  {
    n: "VII",
    text: "The right client hires you for what you will not do.",
  },
] as const;

const POSITIONS = [
  {
    title: "On type",
    body: "Serifs and sans-serifs with history behind them. Not the font everyone used on Dribbble this quarter.",
  },
  {
    title: "On colour",
    body: "Black, white, one accent. Used the same way every time. Like Penguin's orange band. Not a mood board.",
  },
  {
    title: "On process",
    body: "Question before you draw. What is the idea? What can go? What has to survive?",
  },
  {
    title: "On a good brand",
    body: "You could have launched it in another decade and nobody would blink.",
  },
  {
    title: "On a bad brief",
    body: "Make it feel modern. No further detail. That usually means follow the trend and redo in three years.",
  },
] as const;

export default function ThinkingPageContent() {
  return (
    <>
      <Nav />
      <main className="page-enter min-h-dvh bg-background">
        <article className="pb-[var(--space-xl)] pt-24 md:pb-[var(--space-2xl)] md:pt-32">
          <section aria-label="On permanence" className="grid-editorial">
            <SectionReveal className="col-narrow">
              <p className="text-small mb-8 text-ink/40">Point of view</p>
              <h1 className="text-title text-ink">On permanence.</h1>
              <div className="text-body measure mt-10 space-y-6 text-ink">
                <p>
                  I design brands that do not need to be redesigned. Not because
                  I follow a checklist. Because I work with principles that were
                  already old when Helvetica was new.
                </p>
                <p>
                  Proportion. Contrast. Reduction. Clarity.
                </p>
                <p>
                  In a market that sells the look of the year, I sell work that
                  still reads after the look of the year is embarrassing. If that
                  is not what you want, you will find plenty of studios that will
                  give you the trend. That is fine. We are probably not a match.
                </p>
              </div>
            </SectionReveal>
          </section>

          <section
            aria-label="Motto"
            className="grid-editorial mt-[var(--space-xl)] md:mt-[var(--space-2xl)]"
          >
            <SectionReveal variant="mask" className="col-full">
              <p className="text-title text-ink">Um parvo é sempre um parvo.</p>
            </SectionReveal>
            <SectionReveal className="col-right mt-8" delay={0.12}>
              <p className="text-body measure text-ink-muted">
                A fool is always a fool. The name is the point. No pretending to
                be a fifty-person agency. No slick pitch before we have spoken. I
                say what I think. The work has to carry the rest.
              </p>
            </SectionReveal>
          </section>

          <section
            aria-label="Positions"
            className="grid-editorial mt-[var(--space-xl)] md:mt-[var(--space-2xl)]"
          >
            <div className="col-full space-y-12 md:space-y-16">
              {POSITIONS.map((item, i) => (
                <SectionReveal key={item.title} className="col-narrow" delay={i * 0.04}>
                  <h2 className="text-title mb-4 text-ink">
                    {item.title}
                  </h2>
                  <p className="text-body measure text-ink-muted">
                    {item.body}
                  </p>
                </SectionReveal>
              ))}
            </div>
          </section>

          <section
            aria-label="Seven laws"
            className="mt-[var(--space-xl)] bg-ground py-[var(--space-xl)] md:mt-[var(--space-2xl)] md:py-[var(--space-2xl)]"
          >
            <div className="grid-editorial">
              <SectionReveal variant="mask" className="col-full mb-10 md:mb-16">
                <h2 className="text-title text-ink">Seven laws</h2>
                <p className="text-body measure mt-6 text-ink-muted">
                  The filter for every decision on this site and in client work.
                </p>
              </SectionReveal>
            </div>
            <ol>
              {LAWS.map((law, i) => {
                const numLeft = i % 2 === 0;
                return (
                  <SectionReveal
                    key={law.n}
                    as="li"
                    variant="mask"
                    className="law-row grid-editorial"
                  >
                    <span
                      className={`law-row__num law-row__num--${numLeft ? "left" : "right"}`}
                      aria-hidden
                    >
                      {law.n}
                    </span>
                    <p
                      className={`law-row__text law-row__text--${numLeft ? "right" : "left"}`}
                    >
                      {law.text}
                    </p>
                  </SectionReveal>
                );
              })}
            </ol>
          </section>
        </article>

        <ContactCTA />
      </main>
    </>
  );
}
