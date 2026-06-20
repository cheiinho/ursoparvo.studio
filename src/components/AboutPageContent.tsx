import ContactCTA from "@/components/ContactCTA";
import Nav from "@/components/Nav";
import SectionReveal from "@/components/SectionReveal";

export default function AboutPageContent() {
  return (
    <>
      <Nav visible />
      <main className="page-enter min-h-dvh bg-background">
        <article className="pb-[var(--space-xl)] pt-24 md:pb-[var(--space-2xl)] md:pt-32">
          <section aria-label="Manifesto" className="grid-editorial">
            <SectionReveal className="col-narrow">
              <p className="tech mb-8 text-ink/40">About</p>
              <h1 className="display text-h1 text-ink">
                Brands that do not need redoing.
              </h1>
              <div className="measure mt-10 space-y-6 text-body leading-[1.65] text-ink md:text-lg">
                <p>
                  When a brand follows the taste of the year it was made, it has
                  a shelf life. When it is built on proportion, contrast, and
                  reduction, it is hard to date. That is what I aim for.
                </p>
                <p>
                  I am not interested in mesh gradients, scroll tricks, or
                  whatever won an award last month. I am interested in work that
                  still makes sense when the trend passes.
                </p>
                <p>
                  UrsoParvo is my studio. Just me. I take a small number of
                  projects and stay in them.
                </p>
              </div>
            </SectionReveal>
          </section>
        </article>

        <ContactCTA />
      </main>
    </>
  );
}
