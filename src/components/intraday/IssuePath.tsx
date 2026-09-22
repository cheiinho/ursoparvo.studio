"use client";

import { useEffect, useRef } from "react";
import { dataset } from "@/content/intraday/dataset";
import { affectedPeriodLabel, isPresent, periodSpan } from "@/content/intraday/derive";
import DataTable from "./DataTable";
import ForecastChart from "./ForecastChart";
import ProductChrome, { PRODUCT_PLACES } from "./ProductChrome";
import ScheduleList from "./ScheduleList";
import { useStory } from "./story";

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
  const { destination, setDestination } = useStory();
  const heading = affectedPeriodLabel(periodPrefix, dataset.affected.start, dataset.affected.end);
  const span = periodSpan(dataset.affected.start, dataset.affected.end);
  const rows = dataset.quarters.filter(
    (quarter) => quarter.time >= dataset.affected.start && quarter.time < dataset.affected.end,
  );

  const opened = useRef(false);
  useEffect(() => {
    if (!opened.current) {
      opened.current = true;
      return;
    }
    const target = destination === "forecast" ? forecastRef.current : destination === "schedule" ? scheduleRef.current : null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.focus();
    target?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [destination]);

  function show(which: "forecast" | "schedule") {
    setDestination(which);
  }

  return (
    <div className="intraday-stack">
      {destination === "issue" ? (
      <section className="intraday-ui intraday-issue wfm">
        <p className="sr-only">{reconstruction}</p>
          <article className="wfm-issue">
            <p className="wfm-title">{dataset.queue}</p>
            <p className="wfm-period">{span}</p>
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
              <button type="button" onClick={() => show("forecast")}>
                {showForecast}
              </button>
              <button type="button" onClick={() => show("schedule")}>
                {showSchedule}
              </button>
            </div>
            <p className="wfm-help">{severity} {illustrative}</p>
          </article>
      </section>
      ) : null}
      {destination === "forecast" ? (
      <section className="intraday-ui intraday-destination wfm is-active">
        <ProductChrome
          product={product}
          section="Forecast"
          context={dataset.account}
          rail={PRODUCT_PLACES.map((item) => ({ ...item, current: item.id === "forecast" }))}
        >
          <header className="wfm-pagehead">
            <div>
              <h3 ref={forecastRef} id="issue-forecast-period" tabIndex={-1} className="wfm-title">
                {heading}
              </h3>
              <p className="wfm-meta">
                {dataset.queue}. {illustrative}
              </p>
            </div>
            <p className="wfm-period">{span}</p>
            <button type="button" onClick={() => setDestination("issue")}>
              Forecasting issues
            </button>
          </header>
          <div className="wfm-forecast">
            <ForecastChart
              patternId="issue-band"
              axis={dataset.quarters.map((quarter) => quarter.time)}
              series={[
                {
                  id: "previous",
                  label: previous,
                  style: "dotted",
                  points: dataset.quarters.map((quarter) => ({ time: quarter.time, value: quarter.previous })),
                },
                {
                  id: "current",
                  label: current,
                  style: "solid",
                  weight: "strong",
                  points: dataset.quarters.map((quarter) => ({ time: quarter.time, value: quarter.next })),
                },
                {
                  id: "actual-line",
                  label: actual,
                  style: "solid",
                  points: dataset.quarters.map((quarter) => ({
                    time: quarter.time,
                    value: quarter.time >= dataset.affected.start && quarter.time < dataset.affected.end ? quarter.actual : null,
                  })),
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
              enter={destination === "forecast"}
            />
            <DataTable
              caption={heading}
              columns={[time, previous, current, actual]}
              mark={rows.map((quarter) => quarter.time)}
              rows={rows.map((quarter) => [
                quarter.time,
                textValue(quarter.previous, empty),
                textValue(quarter.next, empty),
                textValue(quarter.actual, empty),
              ])}
            />
          </div>
        </ProductChrome>
      </section>
      ) : null}
      {destination === "schedule" ? (
      <section className="intraday-ui intraday-destination wfm is-active">
        <ProductChrome
          product={product}
          section="Team schedule"
          context={dataset.account}
          rail={PRODUCT_PLACES.map((item) => ({ ...item, current: item.id === "teamSchedule" }))}
        >
        <div className="wfm-pagehead">
          <p className="wfm-period">{span}</p>
          <button type="button" onClick={() => setDestination("issue")}>
            Forecasting issues
          </button>
        </div>
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
        </ProductChrome>
      </section>
      ) : null}
    </div>
  );
}
