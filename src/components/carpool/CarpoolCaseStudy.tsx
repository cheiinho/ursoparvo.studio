import RevealTitle from "@/components/RevealTitle";
import {
  ActualUsage,
  AvailabilityPlay,
  EvidenceLegend,
  ExplorationGrid,
  HistoryTabs,
  IntentSwitch,
  InvestmentFork,
  MethodsStrip,
  ReadinessPlay,
  RuleDemo,
  ServiceZoom,
  WaitTimeline,
} from "@/components/carpool/CarpoolInteractive";
import type { CarpoolContent } from "@/content/carpool/types";

type Props = { content: CarpoolContent };

function Section({
  id,
  kicker,
  children,
  tone = "default",
  weight = "default",
}: {
  id: string;
  kicker: string;
  children: React.ReactNode;
  tone?: "default" | "pivot" | "open";
  weight?: "default" | "lead";
}) {
  return (
    <section
      id={id}
      className={`carpool-section carpool-section--${tone} carpool-section--${weight} studio-section`}
      aria-labelledby={`${id}-title`}
    >
      <p className="studio-section__title" id={`${id}-title`}>
        {kicker}
      </p>
      <div className="studio-section__body carpool-section__body">{children}</div>
    </section>
  );
}

function Statement({ children }: { children: React.ReactNode }) {
  return <p className="carpool-statement type-display">{children}</p>;
}

export default function CarpoolCaseStudy({ content }: Props) {
  const c = content;
  const i = c.interact;

  return (
    <article className="carpool site-container site-container--wide">
      <header className="carpool-cover">
        <p className="type-meta text-secondary">{c.cover.eyebrow}</p>
        <RevealTitle id="carpool-h" text={c.cover.title} className="type-display" />
        <p className="type-lede measure">{c.cover.subtitle}</p>
        <p className="type-nota text-secondary">{c.cover.meta}</p>
        <p className="carpool-thesis type-heading measure">{c.cover.thesis}</p>
        <p className="carpool-disclosure type-nota type-italic text-secondary measure">
          {c.disclosure}
        </p>
        <EvidenceLegend labels={c.labels} />
      </header>

      <Section id="brief" kicker={c.brief.kicker}>
        <h2 className="type-heading">{c.brief.headline}</h2>
        <p className="type-corpo measure">{c.brief.line}</p>
      </Section>

      <Section id="assumption" kicker={c.assumption.kicker}>
        <Statement>{c.assumption.statement}</Statement>
        <p className="type-corpo measure">{c.assumption.body}</p>
        <ol className="carpool-assumption-chain">
          {c.assumption.nodes.map((step) => (
            <li key={step} className="type-corpo">
              {step}
            </li>
          ))}
        </ol>
        <p className="type-lede measure">{c.assumption.bridge}</p>
        <p className="type-nota type-italic text-secondary measure">
          {c.assumption.contextNote}
        </p>
      </Section>

      <Section id="investigation" kicker={c.investigation.kicker}>
        <h2 className="type-heading">{c.investigation.headline}</h2>
        <p className="type-corpo measure">{c.investigation.line}</p>
        <MethodsStrip
          methods={c.investigation.methods}
          caveat={c.investigation.caveat}
          labels={c.labels}
        />
        <div className="carpool-personas">
          <h3 className="type-meta">{c.personas.headline}</h3>
          <p className="type-nota text-secondary measure">{c.personas.line}</p>
          <ul className="carpool-personas__grid">
            {c.personas.items.map((persona) => (
              <li key={persona.name}>
                <p className="type-corpo">{persona.name}</p>
                <p className="type-meta text-secondary">{persona.role}</p>
                <p className="type-nota">{persona.need}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="availability" kicker={c.availability.kicker} weight="lead">
        <Statement>{c.availability.statement}</Statement>
        <AvailabilityPlay
          labels={c.labels}
          i={i}
          statement={c.availability.statement}
          after={c.availability.after}
        />
        <p className="type-corpo measure">{c.availability.line}</p>
      </Section>

      <Section id="wait" kicker={c.wait.kicker}>
        <Statement>{c.wait.statement}</Statement>
        <WaitTimeline labels={c.labels} i={i} />
        <p className="type-corpo measure">{c.wait.line}</p>
      </Section>

      <Section id="readiness" kicker={c.readiness.kicker} weight="lead">
        <Statement>{c.readiness.statement}</Statement>
        <ReadinessPlay labels={c.labels} i={i} />
        <p className="type-corpo measure">{c.readiness.line}</p>
      </Section>

      <Section id="intents" kicker={c.intents.kicker}>
        <Statement>{c.intents.statement}</Statement>
        <IntentSwitch labels={c.labels} i={i} />
        <p className="type-corpo measure">{c.intents.line}</p>
      </Section>

      <Section id="rules" kicker={c.rules.kicker}>
        <Statement>{c.rules.statement}</Statement>
        <RuleDemo labels={c.labels} i={i} />
        <p className="type-corpo measure">{c.rules.line}</p>
      </Section>

      <Section id="history" kicker={c.history.kicker}>
        <Statement>{c.history.statement}</Statement>
        <HistoryTabs labels={c.labels} i={i} />
        <p className="type-corpo measure">{c.history.line}</p>
      </Section>

      <Section id="usage" kicker={c.usage.kicker}>
        <Statement>{c.usage.statement}</Statement>
        <ActualUsage labels={c.labels} i={i} note={c.usage.note} />
        <p className="type-corpo measure">{c.usage.line}</p>
      </Section>

      <Section id="turning-point" kicker={c.turningPoint.kicker} tone="pivot">
        <p className="carpool-pivot type-display">{c.turningPoint.statement}</p>
        <p className="type-lede measure">{c.turningPoint.qualifier}</p>
        <p className="type-heading measure">{c.turningPoint.shift}</p>
      </Section>

      <Section id="service" kicker={c.service.kicker} tone="pivot" weight="lead">
        <Statement>{c.service.statement}</Statement>
        <ServiceZoom
          labels={c.labels}
          i={i}
          steps={c.service.steps}
          statement={c.service.statement}
          note={c.service.diagramNote}
        />
      </Section>

      <Section id="software" kicker={c.software.kicker}>
        <h2 className="type-heading">{c.software.headline}</h2>
        <div className="carpool-boundary">
          <div>
            <h3 className="type-meta">{c.software.could.title}</h3>
            <ul className="carpool-list">
              {c.software.could.items.map((item) => (
                <li key={item} className="type-corpo">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="type-meta">{c.software.couldNot.title}</h3>
            <ul className="carpool-list">
              {c.software.couldNot.items.map((item) => (
                <li key={item} className="type-corpo">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="type-lede measure">{c.software.closing}</p>
      </Section>

      <Section id="investment" kicker={c.investment.kicker}>
        <h2 className="type-heading">{c.investment.headline}</h2>
        <p className="type-corpo measure">{c.investment.line}</p>
        <InvestmentFork
          chainA={c.investment.chainA}
          chainB={c.investment.chainB}
          contextNote={c.investment.contextNote}
          labels={c.labels}
        />
        <p className="type-heading measure">{c.investment.close}</p>
      </Section>

      <Section id="explorations" kicker={c.explorations.kicker}>
        <h2 className="type-heading">{c.explorations.headline}</h2>
        <ExplorationGrid
          items={c.explorations.items}
          intro={c.explorations.intro}
          labels={c.labels}
        />
      </Section>

      <Section id="outcome" kicker={c.outcome.kicker} tone="open">
        <h2 className="type-heading">{c.outcome.headline}</h2>
        <p className="type-corpo measure">{c.outcome.line}</p>
        <div className="carpool-questions">
          <div>
            <p className="type-meta text-secondary">Before</p>
            <p className="type-lede">{c.outcome.before}</p>
          </div>
          <div>
            <p className="type-meta text-secondary">After</p>
            <p className="type-lede">{c.outcome.after}</p>
          </div>
        </div>
        <h3 className="type-meta">{c.reflection.headline}</h3>
        {c.reflection.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
        <p className="carpool-disclosure type-nota type-italic text-secondary measure">
          {c.disclosure}
        </p>
      </Section>
    </article>
  );
}
