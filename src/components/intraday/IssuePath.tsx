"use client";

import { useRef, useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { affectedPeriodLabel, isPresent, periodSpan } from "@/content/intraday/derive";
import DataTable from "./DataTable";
import ForecastChart from "./ForecastChart";
import ScheduleList from "./ScheduleList";

type Props = {
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
      <div className="intraday-ui intraday-issue">
        <p className="intraday-kicker">{illustrative}</p>
        <table className="intraday-issue__table">
          <caption>{issue}</caption>
          <thead>
            <tr>
              <th scope="col">{queueLabel}</th>
              <th scope="col">{time}</th>
              <th scope="col">
                <span className="sr-only">{showForecast}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{dataset.queue}</th>
              <td>{span}</td>
              <td>
                <div className="intraday-actions">
                  <button type="button" onClick={() => show(forecastRef.current, "forecast")}>
                    {showForecast}
                  </button>
                  <button type="button" onClick={() => show(scheduleRef.current, "schedule")}>
                    {showSchedule}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="intraday-helper">{severity}</p>
      </div>
      <section className={`intraday-ui intraday-destination${active === "forecast" ? " is-active" : ""}`}>
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
      <section className={`intraday-ui intraday-destination${active === "schedule" ? " is-active" : ""}`}>
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
