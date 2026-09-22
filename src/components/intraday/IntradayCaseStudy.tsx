import type { ReactNode } from "react";
import EvidenceLabel from "@/components/intraday/EvidenceLabel";
import Experience from "@/components/intraday/Experience";
import type { IntradayContent } from "@/content/intraday/types";
import "./intraday.css";

type Props = { content: IntradayContent };

function More({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="ix-more">
      <summary>{label}</summary>
      <div className="ix-more__body">{children}</div>
    </details>
  );
}

export default function IntradayCaseStudy({ content }: Props) {
  const decisions = [content.decisionOne, content.decisionTwo, content.decisionThree];

  return (
    <article className="intraday">
      <header id="cover" className="intraday-field intraday-field--system ix-hero">
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
          <a className="ix-hero__cue" href="#product">
            {content.experience.label}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <Experience
        content={content}
        note={content.frame.sentence}
        illustrative={content.labels.illustrative}
      />

      <section id="tensions" className="ix-notes intraday-field intraday-field--questions">
        <div className="ix-notes__inner">
          <div className="ix-notes__head">
            <p className="ix-notes__kicker">{content.tensions.heading}</p>
            <p className="ix-notes__lede">{content.tensions.message}</p>
          </div>
          <ol className="ix-questions">
            {content.tensions.questions.map((question, index) => (
              <li key={question}>
                <span className="ix-questions__num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{question}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="decisions" className="ix-notes">
        <div className="ix-notes__inner">
          <div className="ix-notes__head">
            <p className="ix-notes__kicker">{content.outcome.heading}</p>
            <p className="ix-notes__lede">{content.outcome.lede}</p>
          </div>
          <ol className="ix-decisions">
            {decisions.map((decision, index) => (
              <li key={decision.heading}>
                <span className="ix-decisions__num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{decision.heading}</h3>
                <p className="ix-decisions__body">{decision.message}</p>
              </li>
            ))}
          </ol>
          <div className="ix-grid">
            <div className="ix-card ix-card--target">
              <EvidenceLabel kind="requirement" text={content.labels.requirement} />
              <h3>{content.target.label}</h3>
              <p>{content.target.body}</p>
            </div>
            <div className="ix-card">
              <h3>{content.validation.heading}</h3>
              <p>{content.validation.paragraphs[0]}</p>
              <More label="What the sessions did not settle">
                <EvidenceLabel kind="context" text={content.labels.context} />
                <p>{content.validation.paragraphs[1]}</p>
                <p>{content.validation.paragraphs[2]}</p>
              </More>
            </div>
            <div className="ix-card">
              <h3>{content.reflection.heading}</h3>
              <p>{content.reflection.body}</p>
            </div>
            <div className="ix-card ix-card--unknowns">
              <h3>Still open</h3>
              <ul>
                {content.outcome.unknowns.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
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
