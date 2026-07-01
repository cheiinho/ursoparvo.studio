import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import WorkIndex from "@/components/WorkIndex";
import { TAGLINE } from "@/content/site";
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
        </div>
      </Section>
    </PublicShell>
  );
}
