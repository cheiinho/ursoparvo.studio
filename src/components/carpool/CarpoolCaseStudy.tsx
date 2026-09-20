import RevealTitle from "@/components/RevealTitle";
import {
  CarpoolAvailabilityUi,
  CarpoolCancelPair,
  CarpoolEvidenceLegend,
  CarpoolExplorationStrip,
  CarpoolHiddenRule,
  CarpoolHistoryUi,
  CarpoolIntentsUi,
  CarpoolInvestmentDiagram,
  CarpoolMethodsDiagram,
  CarpoolReadinessDiagram,
} from "@/components/carpool/CarpoolArtefacts";
import type { CarpoolContent } from "@/content/carpool/types";

type Props = { content: CarpoolContent };

function Section({
  id,
  kicker,
  children,
  tone = "default",
}: {
  id: string;
  kicker: string;
  children: React.ReactNode;
  tone?: "default" | "pivot" | "open";
}) {
  return (
    <section
      id={id}
      className={`carpool-section carpool-section--${tone} studio-section`}
      aria-labelledby={`${id}-title`}
    >
      <p className="studio-section__title" id={`${id}-title`}>
        {kicker}
      </p>
      <div className="studio-section__body carpool-section__body">{children}</div>
    </section>
  );
}

export default function CarpoolCaseStudy({ content }: Props) {
  const c = content;
  const a = c.artefacts;

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
        <CarpoolEvidenceLegend labels={c.labels} />
      </header>

      <Section id="brief" kicker={c.brief.kicker}>
        <h2 className="type-heading">{c.brief.headline}</h2>
        {c.brief.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
      </Section>

      <Section id="assumption" kicker={c.assumption.kicker}>
        <h2 className="type-heading">{c.assumption.headline}</h2>
        {c.assumption.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
        <ol className="carpool-assumption-chain">
          {c.assumption.chain.map((step) => (
            <li key={step} className="type-corpo">
              {step}
            </li>
          ))}
        </ol>
        <p className="type-lede measure">{c.assumption.bridge}</p>
        <p className="type-nota type-italic text-secondary measure">{c.assumption.contextNote}</p>
      </Section>

      <Section id="investigation" kicker={c.investigation.kicker}>
        <h2 className="type-heading">{c.investigation.headline}</h2>
        {c.investigation.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
        <CarpoolMethodsDiagram
          methods={c.investigation.methods}
          caveat={c.investigation.caveat}
          labels={c.labels}
        />
        <div className="carpool-personas">
          <h3 className="type-meta">{c.personas.headline}</h3>
          <p className="type-nota text-secondary measure">{c.personas.body}</p>
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

      <Section id="experience" kicker={c.experience.kicker}>
        <h2 className="type-heading">{c.experience.headline}</h2>
        {c.experience.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
        <blockquote className="carpool-signal type-lede measure">{c.experience.signal}</blockquote>
        <CarpoolAvailabilityUi a={a} labels={c.labels} />
      </Section>

      <Section id="service" kicker={c.service.kicker}>
        <h2 className="type-heading">{c.service.headline}</h2>
        {c.service.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
        <CarpoolReadinessDiagram
          a={a}
          labels={c.labels}
          steps={c.service.steps}
          note={c.service.diagramNote}
        />
      </Section>

      <Section id="turning-point" kicker={c.turningPoint.kicker} tone="pivot">
        <p className="carpool-pivot type-display">{c.turningPoint.statement}</p>
        <p className="type-lede measure">{c.turningPoint.qualifier}</p>
        {c.turningPoint.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
        <p className="type-heading measure">{c.turningPoint.shift}</p>
      </Section>

      <Section id="findings" kicker={c.findings.kicker}>
        <h2 className="type-heading">{c.findings.headline}</h2>
        <p className="type-corpo measure">{c.findings.intro}</p>
        <div className="carpool-findings">
          {c.findings.items.map((finding) => (
            <article
              key={finding.id}
              id={finding.id}
              className={`carpool-finding carpool-finding--${finding.weight}`}
            >
              <h3 className="type-heading">{finding.title}</h3>
              {finding.body.map((p) => (
                <p key={p} className="type-corpo measure">
                  {p}
                </p>
              ))}
              <p className="type-nota text-secondary">{finding.level}</p>
              {finding.id === "f02" ? <CarpoolIntentsUi a={a} labels={c.labels} /> : null}
              {finding.id === "f04" ? <CarpoolCancelPair a={a} labels={c.labels} /> : null}
              {finding.id === "f05" ? (
                <>
                  <CarpoolHiddenRule a={a} labels={c.labels} />
                  <CarpoolHistoryUi a={a} labels={c.labels} />
                </>
              ) : null}
            </article>
          ))}
        </div>
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
        {c.investment.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
        <CarpoolInvestmentDiagram
          chainA={c.investment.chainA}
          chainB={c.investment.chainB}
          contextNote={c.investment.contextNote}
          labels={c.labels}
        />
        <p className="type-heading measure">{c.investment.close}</p>
      </Section>

      <Section id="explorations" kicker={c.explorations.kicker}>
        <h2 className="type-heading">{c.explorations.headline}</h2>
        <p className="type-corpo measure">{c.explorations.intro}</p>
        <CarpoolExplorationStrip
          items={c.explorations.items}
          note={a.explorationStripNote}
          labels={c.labels}
        />
      </Section>

      <Section id="outcome" kicker={c.outcome.kicker} tone="open">
        <h2 className="type-heading">{c.outcome.headline}</h2>
        {c.outcome.body.map((p) => (
          <p key={p} className="type-corpo measure">
            {p}
          </p>
        ))}
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
