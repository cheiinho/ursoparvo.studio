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
          <div className="section__content section__content--center">
            <p className="type-corpo measure text-primary">{BIO}</p>
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
