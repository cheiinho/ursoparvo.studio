import DataTable from "@/components/intraday/DataTable";
import EvidenceLabel from "@/components/intraday/EvidenceLabel";
import ForecastChart from "@/components/intraday/ForecastChart";
import ForecastCompare from "@/components/intraday/ForecastCompare";
import IssuePath from "@/components/intraday/IssuePath";
import ProductShell from "@/components/intraday/ProductShell";
import QueueSwitch from "@/components/intraday/QueueSwitch";
import ReforecastStepper from "@/components/intraday/ReforecastStepper";
import ScenarioSelector from "@/components/intraday/ScenarioSelector";
import { hourlyPrevious } from "@/content/intraday/derive";
import type { IntradayContent } from "@/content/intraday/types";
import "./intraday.css";

type Props = { content: IntradayContent };

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
  const hourly = hourlyPrevious();

  return (
    <article className="intraday">
      <section id="cover" className="intraday-field intraday-field--system" aria-labelledby="intraday-title">
        <div className="site-container intraday-stack">
          <p className="type-label">{content.cover.kicker}</p>
          <EvidenceLabel kind="inference" text={content.labels.inference} />
          <p className="type-display type-italic">{content.cover.thesis}</p>
          <h1 id="intraday-title" className="type-heading">
            {content.cover.title}
          </h1>
          <p className="type-meta">{content.cover.domain}</p>
          <p className="type-meta">{content.cover.anonymity}</p>
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
          <p className="intraday-transition type-corpo">{content.cover.transition}</p>
        </div>
      </section>

      <section id="plan" aria-labelledby="plan-title">
        <div className="site-container intraday-section intraday-stack">
          <h2 id="plan-title" className="type-heading">
            {content.plan.heading}
          </h2>
          <EvidenceLabel kind="requirement" text={content.labels.requirement} />
          <p className="type-lede">{content.plan.message}</p>
          {content.plan.body.map((paragraph) => (
            <p key={paragraph} className="type-corpo measure">
              {paragraph}
            </p>
          ))}
          <p className="type-label">{content.plan.chartTitle}</p>
          <EvidenceLabel kind="illustrative" text={content.labels.illustrative} />
          <p className="type-nota">{content.chart.planSummary}</p>
          <ForecastChart
            patternId="plan-band"
            axis={hourly.map((row) => row.hour)}
            series={[
              {
                id: "forecast",
                label: content.chart.forecast,
                style: "solid",
                weight: "strong",
                points: hourly.map((row) => ({ time: row.hour, value: row.total })),
              },
            ]}
            tone="paper"
            yLabel={content.chart.contacts}
          />
          <DataTable
            caption={content.plan.caption}
            columns={[content.system.columns.time, content.chart.forecast]}
            rows={hourly.map((row) => [row.hour, String(row.total)])}
          />
          <p className="intraday-transition type-corpo">{content.plan.transition}</p>
        </div>
      </section>

      <section id="diverges" aria-labelledby="diverges-title">
        <div className="site-container intraday-section intraday-stack">
          <h2 id="diverges-title" className="type-heading">
            {content.diverges.heading}
          </h2>
          <p className="type-lede">{content.diverges.message}</p>
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
          <p className="intraday-transition type-corpo">{content.diverges.transition}</p>
        </div>
      </section>

      <section id="brief" aria-labelledby="brief-title">
        <div className="site-container intraday-section intraday-stack">
          <h2 id="brief-title" className="type-heading">
            {content.brief.heading}
          </h2>
          <EvidenceLabel kind="requirement" text={content.labels.requirement} />
          <p className="type-lede">{content.brief.message}</p>
          <p className="type-italic type-lede">{content.brief.story}</p>
          <p className="type-corpo measure">{content.brief.note}</p>
          <div className="intraday-split intraday-split--brief">
            <div className="intraday-stack">
              <ul>
                {content.brief.constraints.map((item) => (
                  <li key={item.summary} className="type-corpo">
                    {item.body}
                  </li>
                ))}
              </ul>
              {content.brief.splits.map((item) => (
                <details key={item.summary}>
                  <summary className="type-label">{item.summary}</summary>
                  <p className="type-corpo">{item.body}</p>
                </details>
              ))}
            </div>
            <TargetBlock
              evidence={content.labels.requirement}
              label={content.target.label}
              body={content.target.body}
            />
          </div>
          <p className="intraday-transition type-corpo">{content.brief.transition}</p>
        </div>
      </section>

      <section id="system" className="intraday-field intraday-field--system" aria-labelledby="system-title">
        <div className="site-container site-container--wide intraday-section intraday-stack">
          <h2 id="system-title" className="type-heading">
            {content.system.heading}
          </h2>
          <EvidenceLabel kind="exploration" text={content.labels.exploration} />
          <p className="type-lede">{content.system.message}</p>
          <div className="intraday-step-layout">
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
            <div className="intraday-stack">
              <EvidenceLabel kind="inference" text={content.labels.inference} />
              <p className="type-corpo">{content.system.algorithm}</p>
            </div>
          </div>
          <p className="type-corpo">{content.system.lowVolume}</p>
          <p className="intraday-transition type-corpo">{content.system.transition}</p>
        </div>
      </section>

      <section id="tensions" className="intraday-field intraday-field--questions" aria-labelledby="tensions-title">
        <div className="site-container intraday-section intraday-stack">
          <h2 id="tensions-title" className="type-heading">
            {content.tensions.heading}
          </h2>
          <p className="type-lede">{content.tensions.message}</p>
          {content.tensions.questions.map((question) => (
            <h3 key={question} className="type-lede">
              {question}
            </h3>
          ))}
          <p className="intraday-transition type-corpo">{content.tensions.transition}</p>
        </div>
      </section>

      <section id="decision-one" className="intraday-peak" aria-labelledby="decision-one-title">
        <div className="site-container site-container--wide intraday-section intraday-stack">
          <h2 id="decision-one-title" className="type-heading">
            {content.decisionOne.heading}
          </h2>
          <EvidenceLabel kind="designDecision" text={content.labels.designDecision} />
          <p className="type-lede">{content.decisionOne.message}</p>
          <div className="intraday-split intraday-split--switch">
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
            <div className="intraday-stack">
              <EvidenceLabel kind="requirement" text={content.labels.requirement} />
              <p className="type-corpo">{content.decisionOne.conflict}</p>
            </div>
          </div>
          <p className="intraday-transition type-corpo">{content.decisionOne.transition}</p>
        </div>
      </section>

      <section id="decision-two" className="intraday-peak" aria-labelledby="decision-two-title">
        <div className="site-container site-container--wide intraday-section intraday-stack">
          <h2 id="decision-two-title" className="type-heading">
            {content.decisionTwo.heading}
          </h2>
          <p className="type-lede">{content.decisionTwo.causal}</p>
          <EvidenceLabel kind="designDecision" text={content.labels.designDecision} />
          <p className="type-corpo measure">{content.decisionTwo.message}</p>
          <p className="type-corpo">{content.decisionTwo.assumption}</p>
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
          />
          <p className="intraday-transition type-corpo">{content.decisionTwo.transition}</p>
        </div>
      </section>

      <section id="decision-three" className="intraday-peak" aria-labelledby="decision-three-title">
        <div className="site-container site-container--wide intraday-section intraday-stack">
          <h2 id="decision-three-title" className="type-heading">
            {content.decisionThree.heading}
          </h2>
          <p className="type-lede">{content.decisionThree.causal}</p>
          <p className="type-corpo measure">{content.decisionThree.message}</p>
          <EvidenceLabel kind="inference" text={content.labels.inference} />
          <p className="type-corpo">{content.decisionThree.baseline}</p>
          <ForecastCompare
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
          <p className="intraday-transition type-corpo">{content.decisionThree.transition}</p>
        </div>
      </section>

      <section id="validation" className="intraday-field intraday-field--ending" aria-labelledby="validation-title">
        <div className="site-container intraday-section intraday-stack">
          <h2 id="validation-title" className="type-heading">
            {content.validation.heading}
          </h2>
          <p className="type-corpo measure">{content.validation.paragraphs[0]}</p>
          <EvidenceLabel kind="context" text={content.labels.context} />
          <p className="type-corpo measure">{content.validation.paragraphs[1]}</p>
          <p className="type-corpo measure">{content.validation.paragraphs[2]}</p>
          <p className="intraday-transition type-corpo">{content.validation.transition}</p>
        </div>
      </section>

      <section id="outcome" className="intraday-field intraday-field--ending" aria-labelledby="outcome-title">
        <div className="site-container intraday-section intraday-stack">
          <h2 id="outcome-title" className="type-heading">
            {content.outcome.heading}
          </h2>
          <p className="type-lede measure">{content.outcome.design}</p>
          <TargetBlock
            evidence={content.labels.requirement}
            label={content.target.label}
            body={content.target.body}
          />
          <ul>
            {content.outcome.unknowns.map((line) => (
              <li key={line} className="type-corpo">
                {line}
              </li>
            ))}
          </ul>
          <p className="intraday-transition type-corpo">{content.outcome.transition}</p>
        </div>
      </section>

      <section id="reflection" className="intraday-field intraday-field--ending" aria-labelledby="reflection-title">
        <div className="site-container intraday-section intraday-stack">
          <h2 id="reflection-title" className="type-heading">
            {content.reflection.heading}
          </h2>
          <EvidenceLabel kind="inference" text={content.labels.inference} />
          <p className="type-corpo measure">{content.reflection.body}</p>
        </div>
      </section>
    </article>
  );
}
