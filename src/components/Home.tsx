import Button from "@/components/Button";
import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import WorkIndex from "@/components/WorkIndex";
import { HERO, POSITIONING_BODY } from "@/content/site";
import { hasPublishedWork } from "@/data/projects";

export default function Home() {
  if (hasPublishedWork()) {
    return (
      <PublicShell>
        <WorkIndex />
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <Section>
        <div className="hero">
          <Reveal>
            <h1 className="type-display measure">
              <span className="hero__accent-word">Identidade</span> à prova de
              tendências.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="measure space-y-6">
              {POSITIONING_BODY.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="type-corpo text-primary">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="hero__actions">
              <Button href={HERO.ctaContact.href}>{HERO.ctaContact.label}</Button>
              <Button href={HERO.ctaWork.href} variant="secondary">
                {HERO.ctaWork.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="type-nota text-secondary">{HERO.signature}</p>
          </Reveal>
        </div>
      </Section>
    </PublicShell>
  );
}
