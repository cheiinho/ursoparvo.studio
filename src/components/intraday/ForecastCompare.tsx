"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { quarterByTime } from "@/content/intraday/derive";
import { announceOnChange } from "@/content/intraday/state";
import { useAnnounce } from "./Announcer";
import DataTable from "./DataTable";
import EvidenceLabel from "./EvidenceLabel";
import ForecastChart, { type ChartSeries } from "./ForecastChart";

type Props = {
  reconstruction: string;
  showPrevious: string;
  previousHidden: string;
  delta: string;
  illustrative: string;
  contacts: string;
  empty: string;
  summary: string;
  chartRegion: string;
  previous: string;
  current: string;
  actual: string;
  columns: { time: string; previous: string; current: string; actual: string };
};

function textValue(value: number | null, empty: string): string {
  return value === null ? empty : String(value);
}

function inAffected(time: string): boolean {
  return time >= dataset.affected.start && time < dataset.affected.end;
}

export default function ForecastCompare({
  reconstruction,
  showPrevious,
  previousHidden,
  delta,
  illustrative,
  contacts,
  empty,
  summary,
  chartRegion,
  previous,
  current,
  actual,
  columns,
}: Props) {
  const [on, setOn] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const announce = useAnnounce();
  const axis = dataset.quarters.map((quarter) => quarter.time);
  const bandEnd = axis.filter((time) => inAffected(time)).at(-1) ?? dataset.affected.start;
  const selectedRow = selected ? quarterByTime(selected) : undefined;
  const series: ChartSeries[] = [];
  if (on) {
    series.push({
      id: "previous",
      label: previous,
      style: "dotted",
      weight: "regular",
      points: dataset.quarters.map((quarter) => ({ time: quarter.time, value: quarter.previous })),
    });
  }
  series.push(
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
        value: inAffected(quarter.time) ? quarter.actual : null,
      })),
    },
    {
      id: "actual-marks",
      label: actual,
      style: "markers",
      points: dataset.quarters
        .filter((quarter) => inAffected(quarter.time))
        .map((quarter) => ({ time: quarter.time, value: quarter.actual })),
    },
  );

  function toggle(next: boolean) {
    const message = announceOnChange(on, next, next ? delta : previousHidden);
    setOn(next);
    if (message) announce(message);
  }

  return (
    <div className="intraday-stack">
      <label className="intraday-check">
        <input type="checkbox" checked={on} onChange={(event) => toggle(event.target.checked)} />
        {showPrevious}
      </label>
      {on ? <p className="type-lede">{delta}</p> : null}
      <EvidenceLabel kind="illustrative" text={illustrative} />
      <p className="type-nota">{summary}</p>
      <div className="intraday-ui intraday-chart-region" aria-label={chartRegion}>
        <p className="intraday-recon type-label">{reconstruction}</p>
        <div className="intraday-chart-scroll">
          <ForecastChart
            patternId="compare-band"
            axis={axis}
            series={series}
            band={{
              start: dataset.affected.start,
              end: bandEnd,
              label: `${dataset.affected.start} to ${dataset.affected.end}`,
            }}
            tone="paper"
            yLabel={contacts}
            enter={on}
            selectedTime={selected}
            onSelectTime={setSelected}
          />
        </div>
      </div>
      {selectedRow ? (
        <p className="type-nota">
          {selectedRow.time}. {columns.previous} {textValue(selectedRow.previous, empty)}. {columns.current}{" "}
          {textValue(selectedRow.next, empty)}. {columns.actual}{" "}
          {textValue(inAffected(selectedRow.time) ? selectedRow.actual : null, empty)}.
        </p>
      ) : null}
      <DataTable
        caption={summary}
        columns={[columns.time, columns.previous, columns.current, columns.actual]}
        rows={dataset.quarters.map((quarter) => [
          quarter.time,
          textValue(quarter.previous, empty),
          textValue(quarter.next, empty),
          textValue(inAffected(quarter.time) ? quarter.actual : null, empty),
        ])}
      />
    </div>
  );
}
