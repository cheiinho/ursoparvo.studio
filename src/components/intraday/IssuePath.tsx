"use client";

import { useRef } from "react";
import { dataset } from "@/content/intraday/dataset";
import { affectedPeriodLabel, isPresent } from "@/content/intraday/derive";
import DataTable from "./DataTable";
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
}: Props) {
  const forecastRef = useRef<HTMLHeadingElement>(null);
  const scheduleRef = useRef<HTMLHeadingElement>(null);
  const heading = affectedPeriodLabel(periodPrefix, dataset.affected.start, dataset.affected.end);
  const rows = dataset.quarters.filter(
    (quarter) => quarter.time >= dataset.affected.start && quarter.time < dataset.affected.end,
  );

  function show(target: HTMLHeadingElement | null) {
    target?.focus();
    target?.scrollIntoView({ block: "nearest" });
  }

  return (
    <div className="intraday-stack">
      <p className="type-lede">{issue}</p>
      <p className="type-nota">{severity}</p>
      <p className="type-label">{illustrative}</p>
      <div className="intraday-actions">
        <button type="button" onClick={() => show(forecastRef.current)}>
          {showForecast}
        </button>
        <button type="button" onClick={() => show(scheduleRef.current)}>
          {showSchedule}
        </button>
      </div>
      <h3 ref={forecastRef} id="issue-forecast-period" tabIndex={-1} className="type-label">
        {heading}
      </h3>
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
      <ScheduleList
        asHeading
        headingRef={scheduleRef}
        headingId="issue-schedule-period"
        heading={heading}
        note={scheduleNote}
        rows={dataset.people.map((person) => ({
          name: person.name,
          detail: isPresent(person, dataset.affected.start, dataset.affected.end) ? present : absent,
        }))}
      />
    </div>
  );
}
