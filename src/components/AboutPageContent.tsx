import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { BIO, SITE } from "@/content/site";
import { UI } from "@/content/ui";

export default function AboutPageContent() {
  return (
    <PublicShell>
      <Section>
        <h1 className="sr-only">{UI.about.pageTitle}</h1>

        <Reveal>
          <p className="type-corpo measure text-primary">{BIO}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-link type-corpo"
            style={{ display: "inline-block", marginTop: "var(--space-8)" }}
            aria-label={UI.about.emailAria(SITE.email)}
          >
            {SITE.email}
          </a>
        </Reveal>
      </Section>
    </PublicShell>
  );
}
