import Button from "@/components/Button";
import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import WorkIndex from "@/components/WorkIndex";
import { HERO, TAGLINE } from "@/content/site";
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
            <h1 className="type-display measure">{TAGLINE}</h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="hero__actions">
              <Button href={HERO.ctaContact.href}>{HERO.ctaContact.label}</Button>
              <Button href={HERO.ctaWork.href} variant="secondary">
                {HERO.ctaWork.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </PublicShell>
  );
}
