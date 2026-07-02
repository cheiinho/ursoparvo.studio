import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import { BIO_PARAGRAPHS, SITE } from "@/content/site";
import { UI } from "@/content/ui";

export default function AboutPageContent() {
  return (
    <PublicShell>
      <div className="site-container page-shell">
        <Reveal>
          <h1 className="type-display page-heading">{UI.about.pageTitle}</h1>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="type-corpo text-primary measure stack stack--lg">
            {BIO_PARAGRAPHS.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <a
            href={`mailto:${SITE.email}`}
            className="text-link type-corpo"
            aria-label={UI.about.emailAria(SITE.email)}
          >
            {SITE.email}
          </a>
        </Reveal>
      </div>
    </PublicShell>
  );
}
