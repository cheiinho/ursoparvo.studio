import ContactCTA from "@/components/ContactCTA";
import Nav from "@/components/Nav";
import { ABOUT_CLIENTS_LINE, BIO_LONG, SITE, TAGLINE } from "@/content/site";

export default function AboutPageContent() {
  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-background">
        <article className="grid-editorial pb-[var(--space-xl)] pt-20 md:pb-[var(--space-2xl)] md:pt-32">
          <p className="col-full text-small text-ink/40">Sobre</p>
          <h1 className="col-full text-title text-ink">{SITE.operator}</h1>
          <p className="col-right text-body measure mt-6 text-ink-muted md:mt-8">
            {TAGLINE}
          </p>
          <div className="col-right text-body measure mt-10 space-y-6 text-ink md:mt-14">
            {BIO_LONG.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <p className="col-right text-small mt-10 text-ink/40 md:mt-12">
            {ABOUT_CLIENTS_LINE}
          </p>
        </article>

        <ContactCTA />
      </main>
    </>
  );
}
