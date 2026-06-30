import { CONTACT } from "@/content/site";

export default function ContactCTA() {
  return (
    <section
      aria-label="Contacto"
      className="bg-background py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="grid-editorial">
        <div className="col-narrow max-w-xl">
          <h2 className="text-title text-ink">{CONTACT.title}</h2>
          <p className="text-body measure mt-4 text-ink-muted">{CONTACT.body}</p>
          <a href={CONTACT.mailto} className="press btn mt-8">
            {CONTACT.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
