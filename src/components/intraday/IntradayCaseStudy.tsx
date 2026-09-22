import type { ReactNode } from "react";
import EvidenceLabel from "@/components/intraday/EvidenceLabel";
import ForecastBoard from "@/components/intraday/ForecastBoard";
import ForecastCompare from "@/components/intraday/ForecastCompare";
import IssuePath from "@/components/intraday/IssuePath";
import ProductShell from "@/components/intraday/ProductShell";
import QueueSwitch from "@/components/intraday/QueueSwitch";
import ReforecastStepper from "@/components/intraday/ReforecastStepper";
import ScenarioSelector from "@/components/intraday/ScenarioSelector";
import { StoryProvider } from "@/components/intraday/story";
import type { IntradayContent } from "@/content/intraday/types";
import "./intraday.css";

type Props = { content: IntradayContent };

function More({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="intraday-more">
      <summary className="type-label">{label}</summary>
      <div className="intraday-stack">{children}</div>
    </details>
  );
}

function TargetBlock({
  evidence,
  label,
  body,
}: {
  evidence: string;
  label: string;
  body: string;
}) {
  return (
    <div className="intraday-target">
      <EvidenceLabel kind="requirement" text={evidence} />
      <p className="type-label">{label}</p>
      <p className="type-corpo">{body}</p>
    </div>
  );
}

export default function IntradayCaseStudy({ content }: Props) {
  return (
    <StoryProvider>
    <article className="intraday">
      <section id="cover" className="intraday-field intraday-field--system intraday-poster" aria-labelledby="intraday-title">
        <div className="intraday-stage intraday-stack">
          <p className="type-label">{content.cover.kicker}</p>
          <h1 id="intraday-title" className="intraday-poster__name">
            {content.cover.title}
          </h1>
          <p className="intraday-poster__meta">{content.cover.anonymity}</p>
          <More label="Contents">
            <EvidenceLabel kind="inference" text={content.labels.inference} />
            <p className="type-corpo">{content.cover.thesis}</p>
            <p className="type-corpo">{content.cover.domain}</p>
            <ul className="intraday-toc">
              {content.legend.map((kind) => (
                <li key={kind} className="type-label">
                  {content.labels[kind]}
                </li>
              ))}
            </ul>
            <nav>
              <ul className="intraday-toc">
                {content.sections.map((section) => (
                  <li key={section.id}>
                    <a className="type-label" href={`#${section.id}`}>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="type-corpo">{content.cover.transition}</p>
          </More>
        </div>
      </section>

      <section id="plan" className="intraday-chapter" aria-labelledby="plan-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="plan-title" className="intraday-beat__title">
            {content.plan.heading}
          </h2>
          <p className="intraday-statement">{content.plan.message}</p>
          <ForecastBoard
            product={content.frame.product}
            reconstruction={content.frame.reconstruction}
            illustrative={content.labels.illustrative}
            forecast={content.chart.forecast}
            contacts={content.chart.contacts}
            time={content.system.columns.time}
            summary={content.plan.caption}
            chartTitle={content.plan.chartTitle}
          />
          <More label="How the plan is used">
            <EvidenceLabel kind="requirement" text={content.labels.requirement} />
            {content.plan.body.map((paragraph) => (
              <p key={paragraph} className="type-corpo measure">
                {paragraph}
              </p>
            ))}
            <p className="type-nota">{content.chart.planSummary}</p>
            <p className="type-corpo">{content.plan.transition}</p>
          </More>
        </div>
      </section>

      <section id="diverges" className="intraday-chapter" aria-labelledby="diverges-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="diverges-title" className="intraday-beat__title">
            {content.diverges.heading}
          </h2>
          <p className="intraday-statement">{content.plan.transition}</p>
          <ScenarioSelector
            groupLabel={content.diverges.groupLabel}
            options={content.diverges.options}
            forecast={content.chart.forecast}
            actual={content.chart.actual}
            contacts={content.chart.contacts}
            empty={content.chart.empty}
            summary={content.chart.scenarioSummary}
            illustrative={content.labels.illustrative}
            time={content.system.columns.time}
          />
          <More label="What the brief asked of this">
            <p className="type-corpo">{content.diverges.message}</p>
            <p className="type-corpo">{content.diverges.transition}</p>
          </More>
        </div>
      </section>

      <section id="brief" className="intraday-quiet" aria-labelledby="brief-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="brief-title" className="intraday-beat__title">
            {content.brief.heading}
          </h2>
          <p className="type-italic intraday-beat__story">{content.brief.story}</p>
          <TargetBlock
            evidence={content.labels.requirement}
            label={content.target.label}
            body={content.target.body}
          />
          <More label="What was still open">
            <p className="type-corpo">{content.brief.message}</p>
            <ul className="intraday-cards">
              {content.brief.constraints.map((item) => (
                <li key={item.summary} className="type-corpo">
                  {item.body}
                </li>
              ))}
            </ul>
            <EvidenceLabel kind="requirement" text={content.labels.requirement} />
            <p className="type-corpo measure">{content.brief.note}</p>
            {content.brief.splits.map((item) => (
              <details key={item.summary}>
                <summary className="type-label">{item.summary}</summary>
                <p className="type-corpo">{item.body}</p>
              </details>
            ))}
            <p className="type-corpo">{content.brief.transition}</p>
          </More>
        </div>
      </section>

      <section id="system" className="intraday-field intraday-field--system intraday-chapter" aria-labelledby="system-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="system-title" className="intraday-beat__title">
            {content.system.heading}
          </h2>
          <ReforecastStepper
            groupLabel={content.system.groupLabel}
            back={content.system.back}
            next={content.system.next}
            steps={content.system.steps}
            start={content.decisionTwo.start}
            completed={content.decisionTwo.completed}
            time={content.system.columns.time}
            forecast={content.system.columns.forecast}
            actual={content.system.columns.actual}
            newForecast={content.chart.newForecast}
            contacts={content.chart.contacts}
            empty={content.chart.empty}
            summary={content.chart.stepSummary}
            illustrative={content.labels.illustrative}
          />
          <More label="What design did not decide">
            <p className="type-corpo">{content.system.message}</p>
            <EvidenceLabel kind="exploration" text={content.labels.exploration} />
            <EvidenceLabel kind="inference" text={content.labels.inference} />
            <p className="type-corpo">{content.system.algorithm}</p>
            <p className="type-corpo">{content.system.lowVolume}</p>
            <p className="type-corpo">{content.system.transition}</p>
          </More>
        </div>
      </section>

      <section id="tensions" className="intraday-field intraday-field--questions intraday-questions" aria-labelledby="tensions-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="tensions-title" className="type-label">
            {content.tensions.heading}
          </h2>
          {content.tensions.questions.map((question) => (
            <h3 key={question}>{question}</h3>
          ))}
          <More label="Why these three">
            <p className="type-corpo">{content.tensions.message}</p>
            <p className="type-corpo">{content.tensions.transition}</p>
          </More>
        </div>
      </section>

      <section id="decision-one" className="intraday-chapter" aria-labelledby="decision-one-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="decision-one-title" className="intraday-beat__title">
            Allow the change
          </h2>
          <p className="intraday-statement">{content.decisionOne.heading}</p>
          <QueueSwitch
            region={content.frame.region}
            product={content.frame.product}
            reconstruction={content.frame.reconstruction}
            sentence={content.frame.sentence}
            illustrative={content.labels.illustrative}
            accountLabel={content.frame.accountLabel}
            queueLabel={content.decisionOne.queueLabel}
            control={content.decisionOne.control}
            helper={content.decisionOne.helper}
            onLine={content.decisionOne.onLine}
            existingNote={content.decisionOne.existingNote}
            existingValue={content.decisionOne.existingValue}
            fields={content.decisionOne.fields}
            disclosure={content.decisionOne.disclosure}
          />
          <More label="The requirement beside the switch">
            <p className="type-corpo">{content.decisionOne.message}</p>
            <EvidenceLabel kind="designDecision" text={content.labels.designDecision} />
            <EvidenceLabel kind="requirement" text={content.labels.requirement} />
            <p className="type-corpo">{content.decisionOne.conflict}</p>
            <p className="type-corpo">{content.decisionOne.transition}</p>
          </More>
        </div>
      </section>

      <section id="decision-two" className="intraday-chapter" aria-labelledby="decision-two-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="decision-two-title" className="intraday-beat__title">
            {content.decisionTwo.heading}
          </h2>
          <p className="intraday-statement">{content.decisionTwo.causal}</p>
          <ProductShell
            region={content.frame.region}
            product={content.frame.product}
            reconstruction={content.frame.reconstruction}
            illustrative={content.labels.illustrative}
            stateGroup={content.decisionTwo.stateGroup}
            surfaceGroup={content.decisionTwo.surfaceGroup}
            states={content.decisionTwo.states}
            surfaces={content.decisionTwo.surfaces}
            start={content.decisionTwo.start}
            completed={content.decisionTwo.completed}
            nothingToReport={content.decisionTwo.nothingToReport}
            earlier={content.decisionTwo.earlier}
            applyFilter={content.decisionTwo.applyFilter}
            affected={content.decisionTwo.affected}
            ordersNote={content.decisionTwo.ordersNote}
            filterOff={content.decisionTwo.filterOff}
            preview={content.decisionTwo.preview}
            previewReason={content.decisionTwo.previewReason}
            checkInsights={content.decisionTwo.checkInsights}
            notifications={content.decisionTwo.notifications}
            panelHeading={content.decisionTwo.panelHeading}
            close={content.decisionTwo.close}
            insightsBody={content.decisionTwo.insightsBody}
            present={content.decisionTwo.present}
            absent={content.decisionTwo.absent}
            scheduleNote={content.decisionThree.scheduleNote}
            periodPrefix={content.decisionThree.periodPrefix}
            forecast={content.chart.forecast}
            newForecast={content.chart.newForecast}
            contacts={content.chart.contacts}
            empty={content.chart.empty}
            time={content.decisionThree.columns.time}
            summary={content.chart.planSummary}
            viewForecast={content.decisionThree.showForecast}
          />
          <More label="Where the change has to land">
            <EvidenceLabel kind="designDecision" text={content.labels.designDecision} />
            <p className="type-corpo measure">{content.decisionTwo.message}</p>
            <p className="type-corpo">{content.decisionTwo.assumption}</p>
            <p className="type-corpo">{content.decisionTwo.transition}</p>
          </More>
        </div>
      </section>

      <section id="decision-three" className="intraday-chapter" aria-labelledby="decision-three-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="decision-three-title" className="intraday-beat__title">
            {content.decisionThree.heading}
          </h2>
          <p className="intraday-statement">{content.decisionThree.causal}</p>
          <ForecastCompare
            product={content.frame.product}
            reconstruction={content.frame.reconstruction}
            showPrevious={content.decisionThree.showPrevious}
            previousHidden={content.decisionThree.previousHidden}
            delta={content.decisionThree.delta}
            illustrative={content.labels.illustrative}
            contacts={content.chart.contacts}
            empty={content.chart.empty}
            summary={content.chart.compareSummary}
            chartRegion={content.decisionThree.chartRegion}
            previous={content.chart.previous}
            current={content.chart.current}
            actual={content.chart.actual}
            columns={content.decisionThree.columns}
          />
          <IssuePath
            product={content.frame.product}
            reconstruction={content.frame.reconstruction}
            issue={content.decisionThree.issue}
            severity={content.decisionThree.severity}
            showForecast={content.decisionThree.showForecast}
            showSchedule={content.decisionThree.showSchedule}
            periodPrefix={content.decisionThree.periodPrefix}
            scheduleNote={content.decisionThree.scheduleNote}
            present={content.decisionTwo.present}
            absent={content.decisionTwo.absent}
            time={content.decisionThree.columns.time}
            previous={content.decisionThree.columns.previous}
            current={content.decisionThree.columns.current}
            actual={content.decisionThree.columns.actual}
            empty={content.chart.empty}
            illustrative={content.labels.illustrative}
            contacts={content.chart.contacts}
            queueLabel={content.decisionOne.queueLabel}
          />
          <More label="What the comparison is allowed to claim">
            <EvidenceLabel kind="inference" text={content.labels.inference} />
            <p className="type-corpo measure">{content.decisionThree.message}</p>
            <p className="type-corpo">{content.decisionThree.baseline}</p>
            <p className="type-corpo">{content.decisionThree.transition}</p>
          </More>
        </div>
      </section>

      <section id="validation" className="intraday-field intraday-field--ending intraday-close" aria-labelledby="validation-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="validation-title" className="intraday-beat__title">
            {content.validation.heading}
          </h2>
          <p className="type-corpo measure">{content.validation.paragraphs[0]}</p>
          <More label="What the sessions did not settle">
            <EvidenceLabel kind="context" text={content.labels.context} />
            <p className="type-corpo measure">{content.validation.paragraphs[1]}</p>
            <p className="type-corpo measure">{content.validation.paragraphs[2]}</p>
            <p className="type-corpo">{content.validation.transition}</p>
          </More>
        </div>
      </section>

      <section id="outcome" className="intraday-field intraday-field--ending intraday-close" aria-labelledby="outcome-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="outcome-title" className="intraday-beat__title">
            {content.outcome.heading}
          </h2>
          <ul className="intraday-decisions">
            <li>
              <a href="#decision-one">{content.decisionOne.heading}</a>
            </li>
            <li>
              <a href="#decision-two">{content.decisionTwo.heading}</a>
            </li>
            <li>
              <a href="#decision-three">{content.decisionThree.heading}</a>
            </li>
          </ul>
          <p className="intraday-beat__line">{content.outcome.design}</p>
          <TargetBlock
            evidence={content.labels.requirement}
            label={content.target.label}
            body={content.target.body}
          />
          <ul className="intraday-cards">
            {content.outcome.unknowns.map((line) => (
              <li key={line} className="type-corpo">
                {line}
              </li>
            ))}
          </ul>
          <More label="After the design">
            <p className="type-corpo">{content.outcome.transition}</p>
          </More>
        </div>
      </section>

      <section id="reflection" className="intraday-field intraday-field--ending intraday-close" aria-labelledby="reflection-title">
        <div className="intraday-stage intraday-stack">
          <h2 id="reflection-title" className="intraday-beat__title">
            {content.reflection.heading}
          </h2>
          <EvidenceLabel kind="inference" text={content.labels.inference} />
          <p className="type-corpo measure">{content.reflection.body}</p>
        </div>
      </section>
    </article>
    </StoryProvider>
  );
}
