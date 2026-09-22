import RevealTitle from "@/components/RevealTitle";
import { FindVehicleMock, HistoryMock, IntentMock } from "@/components/carpool/CarpoolMockups";
import { Chip, Kicker } from "@/components/carpool/CarpoolPrimitives";
import {
  AssumptionChain,
  HeroVisual,
  ReadinessScene,
  RevealLines,
  RuleTimingScene,
  ScheduledActualScene,
  ServiceModelScene,
  WaitScene,
} from "@/components/carpool/CarpoolScenes";
import type { CarpoolContent } from "@/content/carpool/types";

type Props = { content: CarpoolContent };

function Section({
  id,
  kicker,
  tone,
  children,
}: {
  id: string;
  kicker: string;
  tone?: "quiet" | "centre" | "wide";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`cp-section${tone ? ` cp-section--${tone}` : ""}`}
      aria-labelledby={`${id}-h`}
    >
      <Kicker>{kicker}</Kicker>
      <div className="cp-section__body">{children}</div>
    </section>
  );
}

export default function CarpoolCaseStudy({ content }: Props) {
  const c = content;
  const L = c.labels;

  return (
    <article className="cp site-container site-container--wide">
      {/* 01 Hero */}
      <header className="cp-hero" aria-labelledby="cp-title">
        <div className="cp-hero__copy">
          <Kicker>{c.hero.eyebrow}</Kicker>
          <RevealTitle id="cp-title" text={c.hero.title} className="type-display cp-hero__title" />
          <p className="type-lede cp-hero__lead">{c.hero.lead}</p>
        </div>
        <HeroVisual visual={c.hero.visual} ui={c.ui} />
        <p className="cp-hero__disclosure type-nota text-secondary">{c.disclosure}</p>
      </header>

      {/* 02 The apparent problem */}
      <Section id="assumption" kicker={c.assumption.kicker}>
        <h2 id="assumption-h" className="type-heading cp-h2">
          {c.assumption.statement}
        </h2>
        <div className="cp-split">
          <AssumptionChain content={c.assumption} />
          <div className="cp-split__aside">
            <p className="cp-verdict type-display">{c.assumption.verdict}</p>
            <p className="type-corpo text-secondary measure">{c.assumption.note}</p>
            <Chip kind="inference" labels={L} />
          </div>
        </div>
      </Section>

      {/* 03 Research snapshot */}
      <Section id="research" kicker={c.research.kicker} tone="wide">
        <h2 id="research-h" className="type-heading cp-h2">
          {c.research.headline}
        </h2>
        <ol className="cp-signals">
          {c.research.statements.map((statement, index) => (
            <li key={statement} className="cp-signal">
              <span className="cp-signal__index type-label" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="cp-signal__text type-display">{statement}</p>
              <Chip kind="research" labels={L} />
            </li>
          ))}
        </ol>
        <div className="cp-methods">
          <h3 className="type-label text-secondary">{c.research.methodsTitle}</h3>
          <ul className="cp-methods__list">
            {c.research.methods.map((method) => (
              <li key={method} className="type-heading">
                {method}
              </li>
            ))}
          </ul>
          <p className="cp-methods__caveat type-nota">
            <strong>{c.research.caveat}</strong> {c.research.sample}
          </p>
        </div>
      </Section>

      {/* 04 Finding a car */}
      <Section id="finding" kicker={c.finding.kicker}>
        <div className="cp-lead-pair">
          <h2 id="finding-h" className="type-heading cp-h2">
            {c.finding.headline}
          </h2>
          <p className="type-lede">{c.finding.lead}</p>
        </div>
        <FindVehicleMock content={c.finding.mock} labels={L} ui={c.ui} />
      </Section>

      {/* 05 The wait */}
      <Section id="wait" kicker={c.wait.kicker} tone="wide">
        <h2 id="wait-h" className="type-heading cp-h2">
          {c.wait.headline}
        </h2>
        <WaitScene content={c.wait} labels={L} ui={c.ui} />
      </Section>

      {/* 06 Available ≠ ready */}
      <Section id="readiness" kicker={c.readiness.kicker} tone="wide">
        <h2 id="readiness-h" className="type-display cp-giant">
          {c.readiness.statement}
        </h2>
        <ReadinessScene content={c.readiness} labels={L} ui={c.ui} />
        <p className="type-lede cp-after">{c.readiness.line}</p>
      </Section>

      {/* 07 Service model */}
      <Section id="service" kicker={c.service.kicker} tone="wide">
        <h2 id="service-h" className="type-heading cp-h2">
          {c.service.statement}
        </h2>
        <ServiceModelScene content={c.service} labels={L} ui={c.ui} />
      </Section>

      {/* 08 Work ≠ leisure */}
      <Section id="intents" kicker={c.intents.kicker}>
        <div className="cp-lead-pair">
          <h2 id="intents-h" className="type-heading cp-h2">
            {c.intents.headline}
          </h2>
          <ul className="cp-contrast" aria-label={c.intents.headline}>
            <li>
              <span className="type-label text-secondary">{c.intents.work.label}</span>
              <span className="type-corpo">{c.intents.work.traits.join(" · ")}</span>
            </li>
            <li>
              <span className="type-label text-secondary">{c.intents.leisure.label}</span>
              <span className="type-corpo">{c.intents.leisure.traits.join(" · ")}</span>
            </li>
          </ul>
        </div>
        <IntentMock content={c.intents} labels={L} />
      </Section>

      {/* 09 Rules too late */}
      <Section id="rules" kicker={c.rules.kicker}>
        <div className="cp-lead-pair">
          <h2 id="rules-h" className="type-heading cp-h2">
            {c.rules.headline}
          </h2>
          <p className="type-lede">{c.rules.point}</p>
        </div>
        <RuleTimingScene content={c.rules} labels={L} ui={c.ui} />
      </Section>

      {/* 10 Booking history */}
      <Section id="history" kicker={c.history.kicker}>
        <h2 id="history-h" className="type-heading cp-h2">
          {c.history.headline}
        </h2>
        <div className="cp-pair">
          <p className="type-corpo">
            <Chip kind="research" labels={L} /> {c.history.problem}
          </p>
          <p className="type-corpo">
            <Chip kind="exploration" labels={L} /> {c.history.exploration}
          </p>
        </div>
        <HistoryMock content={c.history} labels={L} ui={c.ui} />
      </Section>

      {/* 11 Scheduled ≠ actual */}
      <Section id="usage" kicker={c.usage.kicker}>
        <h2 id="usage-h" className="type-heading cp-h2">
          {c.usage.headline}
        </h2>
        <ScheduledActualScene content={c.usage} labels={L} />
      </Section>

      {/* 12 The pivot */}
      <Section id="pivot" kicker={c.pivot.kicker} tone="quiet">
        <h2 id="pivot-h" className="sr-only">
          {c.pivot.lines[3]}
        </h2>
        <RevealLines lines={c.pivot.lines} className="cp-pivot__line type-display" />
        <div className="cp-shift">
          <div>
            <span className="type-label text-secondary">{c.pivot.fromLabel}</span>
            <p className="type-heading cp-shift__from">{c.pivot.from}</p>
          </div>
          <div>
            <span className="type-label">{c.pivot.toLabel}</span>
            <p className="type-heading cp-shift__to">{c.pivot.to}</p>
          </div>
        </div>
      </Section>

      {/* 13 What software can / cannot do */}
      <Section id="software" kicker={c.software.kicker}>
        <h2 id="software-h" className="type-heading cp-h2">
          {c.software.headline}
        </h2>
        <div className="cp-columns">
          <div className="cp-column">
            <h3 className="type-label">{c.software.can.title}</h3>
            <ul className="cp-column__list">
              {c.software.can.items.map((item) => (
                <li key={item} className="type-lede">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="cp-column cp-column--cannot">
            <h3 className="type-label">{c.software.cannot.title}</h3>
            <ul className="cp-column__list">
              {c.software.cannot.items.map((item) => (
                <li key={item} className="type-lede">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Chip kind="inference" labels={L} />
      </Section>

      {/* 14 Investment */}
      <Section id="investment" kicker={c.investment.kicker}>
        <h2 id="investment-h" className="type-heading cp-h2">
          {c.investment.headline}
        </h2>
        <p className="cp-context type-nota">
          <Chip kind="context" labels={L} /> {c.investment.contextNote}
        </p>
        <div className="cp-compare" role="group" aria-label={c.investment.headline}>
          <div className="cp-compare__side">
            <h3 className="type-label text-secondary">{c.investment.a.title}</h3>
            <ol className="cp-compare__stack">
              {c.investment.a.items.map((item) => (
                <li key={item} className="type-heading">
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <span className="cp-compare__vs type-label" aria-hidden="true">
            vs
          </span>
          <div className="cp-compare__side cp-compare__side--constraint">
            <h3 className="type-label text-secondary">{c.investment.b.title}</h3>
            <ol className="cp-compare__stack">
              {c.investment.b.items.map((item) => (
                <li key={item} className="type-heading">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="cp-insight type-heading">{c.investment.insight}</p>
      </Section>

      {/* 15 Closing */}
      <Section id="closing" kicker={c.closing.kicker} tone="quiet">
        <h2 id="closing-h" className="sr-only">
          {c.closing.lines[0]}
        </h2>
        <RevealLines lines={c.closing.lines} className="cp-closing__line type-display" />
        <p className="cp-hero__disclosure type-nota text-secondary">{c.disclosure}</p>
      </Section>
    </article>
  );
}
