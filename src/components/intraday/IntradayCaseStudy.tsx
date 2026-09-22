import type { ReactNode } from "react";
import EvidenceLabel from "@/components/intraday/EvidenceLabel";
import Scene from "@/components/intraday/Scene";
import { dataset } from "@/content/intraday/dataset";
import type { IntradayContent } from "@/content/intraday/types";
import "./intraday.css";

type Props = { content: IntradayContent };

const MARK_W = 1200;
const MARK_H = 260;

/** The hero line is the dataset, drawn as a brand mark. No labels, no values. */
function heroPaths() {
  const rows = dataset.quarters;
  const peak = Math.max(...rows.map((row) => Math.max(row.previous, row.next ?? 0)));
  const x = (index: number) => (index / (rows.length - 1)) * MARK_W;
  const y = (value: number) => MARK_H - (value / peak) * (MARK_H - 24) - 12;
  const previous = rows.map((row, index) => `${x(index).toFixed(1)},${y(row.previous).toFixed(1)}`);
  const next = rows
    .map((row, index) => (row.next === null ? null : `${x(index).toFixed(1)},${y(row.next).toFixed(1)}`))
    .filter((point): point is string => point !== null);
  const startIndex = rows.findIndex((row) => row.time === dataset.affected.start);
  const endIndex = rows.findIndex((row) => row.time === dataset.affected.end);
  return {
    previous: previous.join(" "),
    next: next.join(" "),
    bandX: x(startIndex),
    bandW: x(endIndex) - x(startIndex),
  };
}

function More({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="ix-more">
      <summary>{label}</summary>
      <div className="ix-more__body">{children}</div>
    </details>
  );
}

export default function IntradayCaseStudy({ content }: Props) {
  const mark = heroPaths();

  return (
    <article className="intraday">
      <header id="cover" className="intraday-field intraday-field--system ix-hero">
        <svg
          className="ix-hero__mark"
          viewBox={`0 0 ${MARK_W} ${MARK_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <rect x={mark.bandX} y="0" width={mark.bandW} height={MARK_H} fill="rgba(201,178,255,0.09)" />
          <polyline points={mark.previous} fill="none" stroke="rgba(244,238,227,0.28)" strokeWidth="2" />
          <polyline points={mark.next} fill="none" stroke="rgba(201,178,255,0.75)" strokeWidth="3" />
        </svg>
        <div className="ix-hero__inner">
          <p className="ix-hero__kicker">{content.cover.kicker}</p>
          <h1 className="ix-hero__title">{content.cover.title}</h1>
          <p className="ix-hero__thesis">{content.cover.thesis}</p>
          <dl className="ix-hero__meta">
            <div>
              <dt>Domain</dt>
              <dd>{content.cover.domain}</dd>
            </div>
            <div>
              <dt>Surfaces</dt>
              <dd>Forecast, Team schedule, Insights, Configurations</dd>
            </div>
            <div>
              <dt>Anonymity</dt>
              <dd>{content.cover.anonymity}</dd>
            </div>
          </dl>
          <nav className="ix-toc" aria-label={content.experience.label}>
            <p className="ix-toc__label">{content.experience.label}</p>
            <ol className="ix-toc__list">
              {content.experience.solutions.map((solution, index) => (
                <li key={solution.id}>
                  <a href={`#${solution.id}`}>
                    <span className="ix-toc__num" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {solution.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <section id="problem" className="ix-problem" aria-labelledby="problem-heading">
        <div className="ix-problem__inner">
          <div className="ix-problem__head">
            <h2 id="problem-heading" className="ix-notes__kicker">
              {content.problem.heading}
            </h2>
            <p className="ix-problem__lede">{content.problem.lede}</p>
          </div>
          <blockquote className="ix-story">
            <p>{content.problem.story}</p>
            <cite>
              <EvidenceLabel kind="requirement" text={content.labels.requirement} />
            </cite>
          </blockquote>
          <dl className="ix-facts">
            {content.problem.facts.map((fact) => (
              <div key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="ix-problem__note">{content.problem.undefinedNote}</p>
        </div>
      </section>

      <section id="product" className="ix-stage" aria-labelledby="solutions-heading">
        <div className="ix-stage__inner">
          <div className="ix-stage__head">
            <h2 id="solutions-heading" className="ix-stage__heading">
              {content.experience.heading}
            </h2>
            <p className="ix-stage__lede">{content.experience.lede}</p>
            <p className="ix-recon">
              <span className="ix-recon__tag">{content.labels.illustrative}</span>
              <span>{content.frame.sentence}</span>
            </p>
          </div>

          {content.experience.solutions.map((solution, index) => (
            <Scene key={solution.id} content={content} solution={solution} position={index + 1} />
          ))}
        </div>
      </section>

      <section id="decisions" className="ix-notes" aria-labelledby="decisions-heading">
        <div className="ix-notes__inner">
          <div className="ix-notes__head">
            <h2 id="decisions-heading" className="ix-notes__kicker">
              {content.outcome.heading}
            </h2>
            <p className="ix-notes__lede">{content.outcome.lede}</p>
          </div>
          <div className="ix-ledger">
            <div className="ix-ledger__row">
              <div className="ix-ledger__label">
                <h3>{content.target.label}</h3>
                <EvidenceLabel kind="requirement" text={content.labels.requirement} />
              </div>
              <div className="ix-ledger__body">
                <p>{content.target.body}</p>
              </div>
            </div>
            <div className="ix-ledger__row">
              <div className="ix-ledger__label">
                <h3>{content.validation.heading}</h3>
              </div>
              <div className="ix-ledger__body">
                <p>{content.validation.paragraphs[0]}</p>
                <More label="What the sessions did not settle">
                  <EvidenceLabel kind="context" text={content.labels.context} />
                  <p>{content.validation.paragraphs[1]}</p>
                  <p>{content.validation.paragraphs[2]}</p>
                </More>
              </div>
            </div>
            <div className="ix-ledger__row">
              <div className="ix-ledger__label">
                <h3>{content.reflection.heading}</h3>
              </div>
              <div className="ix-ledger__body">
                <p>{content.reflection.body}</p>
              </div>
            </div>
            <div className="ix-ledger__row">
              <div className="ix-ledger__label">
                <h3>Still open</h3>
              </div>
              <div className="ix-ledger__body">
                <ul className="ix-ledger__list">
                  {content.outcome.unknowns.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <More label="The brief, the rules and what design did not decide">
            <EvidenceLabel kind="designDecision" text={content.labels.designDecision} />
            <p>{content.outcome.design}</p>
            <EvidenceLabel kind="requirement" text={content.labels.requirement} />
            <p className="ix-more__story">{content.brief.story}</p>
            <ul className="ix-more__list">
              {content.brief.constraints.map((item) => (
                <li key={item.summary}>{item.body}</li>
              ))}
            </ul>
            <p>{content.brief.note}</p>
            <EvidenceLabel kind="inference" text={content.labels.inference} />
            <p>{content.system.message}</p>
            <p>{content.system.algorithm}</p>
            <p>{content.system.lowVolume}</p>
            <p>{content.decisionOne.conflict}</p>
            <p>{content.decisionTwo.message}</p>
            <p>{content.decisionThree.message}</p>
            <p>{content.plan.body[1]}</p>
          </More>
        </div>
      </section>
    </article>
  );
}
