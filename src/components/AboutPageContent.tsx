import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { BIO_PARAGRAPHS, SITE } from "@/content/site";
import { UI } from "@/content/ui";

export default function AboutPageContent() {
  return (
    <PublicShell>
      <Section>
        <h1 className="sr-only">{UI.about.pageTitle}</h1>

        <Reveal>
          <div className="section__content section__content--center">
            <div
              className="type-corpo measure text-primary"
              style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}
            >
              {BIO_PARAGRAPHS.map((paragraph, i) => (
                <p key={i} style={{ margin: 0 }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="text-link type-corpo"
              aria-label={UI.about.emailAria(SITE.email)}
            >
              {SITE.email}
            </a>
          </div>
        </Reveal>
      </Section>
    </PublicShell>
  );
}
