"use client";

import { useRef, useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { affectedPeriodLabel, isPresent, periodSpan } from "@/content/intraday/derive";
import DataTable from "./DataTable";
import ForecastChart from "./ForecastChart";
import ProductChrome from "./ProductChrome";
import ScheduleList from "./ScheduleList";

type Props = {
  product: string;
  reconstruction: string;
  issue: string;
  severity: string;
  showForecast: string;
  showSchedule: string;
  periodPrefix: string;
  scheduleNote: string;
  present: string;
  absent: string;
  time: string;
  previous: string;
  current: string;
  actual: string;
  empty: string;
  illustrative: string;
  contacts: string;
  queueLabel: string;
};

function textValue(value: number | null, empty: string): string {
  return value === null ? empty : String(value);
}

export default function IssuePath({
  product,
  reconstruction,
  issue,
  severity,
  showForecast,
  showSchedule,
  periodPrefix,
  scheduleNote,
  present,
  absent,
  time,
  previous,
  current,
  actual,
  empty,
  illustrative,
  contacts,
  queueLabel,
}: Props) {
  const forecastRef = useRef<HTMLHeadingElement>(null);
  const scheduleRef = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState<"forecast" | "schedule" | null>(null);
  const heading = affectedPeriodLabel(periodPrefix, dataset.affected.start, dataset.affected.end);
  const span = periodSpan(dataset.affected.start, dataset.affected.end);
  const rows = dataset.quarters.filter(
    (quarter) => quarter.time >= dataset.affected.start && quarter.time < dataset.affected.end,
  );

  function show(target: HTMLHeadingElement | null, which: "forecast" | "schedule") {
    setActive(which);
    target?.focus();
    target?.scrollIntoView({ block: "nearest" });
  }

  return (
    <div className="intraday-stack">
      <section className="intraday-ui intraday-issue wfm">
        <p className="intraday-recon">{reconstruction}</p>
        <ProductChrome product={product} section="Forecasting issues" context={dataset.queue}>
          <article className="wfm-issue">
            <header>
              <p className="wfm-kicker">{illustrative}</p>
              <p className="wfm-title">{dataset.queue}</p>
              <p className="wfm-meta">{span}</p>
            </header>
            <p className="wfm-issue__body">{issue}</p>
            <dl className="wfm-facts">
              <div>
                <dt>{queueLabel}</dt>
                <dd>{dataset.queue}</dd>
              </div>
              <div>
                <dt>{time}</dt>
                <dd>{span}</dd>
              </div>
              <div>
                <dt>Signal</dt>
                <dd>Contact volume</dd>
              </div>
            </dl>
            <div className="intraday-actions">
              <button type="button" onClick={() => show(forecastRef.current, "forecast")}>
                {showForecast}
              </button>
              <button type="button" onClick={() => show(scheduleRef.current, "schedule")}>
                {showSchedule}
              </button>
            </div>
            <p className="wfm-help">{severity}</p>
          </article>
        </ProductChrome>
      </section>
      <section className={`intraday-ui intraday-destination wfm${active === "forecast" ? " is-active" : ""}`}>
        <h3 ref={forecastRef} id="issue-forecast-period" tabIndex={-1} className="intraday-page-title">
          {heading}
        </h3>
        <div className="intraday-chart-scroll">
          <ForecastChart
            patternId="issue-band"
            axis={rows.map((quarter) => quarter.time)}
            series={[
              {
                id: "previous",
                label: previous,
                style: "solid",
                weight: "regular",
                points: rows.map((quarter) => ({ time: quarter.time, value: quarter.previous })),
              },
              {
                id: "actual-line",
                label: actual,
                style: "solid",
                points: rows.map((quarter) => ({ time: quarter.time, value: quarter.actual })),
              },
              {
                id: "actual-marks",
                label: actual,
                style: "markers",
                points: rows.map((quarter) => ({ time: quarter.time, value: quarter.actual })),
              },
            ]}
            band={{
              start: rows[0]?.time ?? dataset.affected.start,
              end: rows.at(-1)?.time ?? dataset.affected.start,
              label: span,
            }}
            tone="paper"
            yLabel={contacts}
          />
        </div>
        <DataTable
          caption={heading}
          columns={[time, previous, current, actual]}
          rows={rows.map((quarter) => [
            quarter.time,
            textValue(quarter.previous, empty),
            textValue(quarter.next, empty),
            textValue(quarter.actual, empty),
          ])}
        />
      </section>
      <section className={`intraday-ui intraday-destination wfm${active === "schedule" ? " is-active" : ""}`}>
        <ScheduleList
          asHeading
          headingRef={scheduleRef}
          headingId="issue-schedule-period"
          heading={heading}
          note={scheduleNote}
          affectedStart={dataset.affected.start}
          affectedEnd={dataset.affected.end}
          rows={dataset.people.map((person) => ({
            name: person.name,
            shiftStart: person.shiftStart,
            shiftEnd: person.shiftEnd,
            detail: isPresent(person, dataset.affected.start, dataset.affected.end) ? present : absent,
          }))}
        />
      </section>
    </div>
  );
}
