"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { quarterByTime } from "@/content/intraday/derive";
import { announceOnChange } from "@/content/intraday/state";
import { useAnnounce } from "./Announcer";
import DataTable from "./DataTable";
import ForecastChart, { type ChartSeries } from "./ForecastChart";
import ProductChrome from "./ProductChrome";

type Props = {
  product: string;
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
  product,
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
    <section className="intraday-ui intraday-compare td-app" aria-label={chartRegion}>
      <p className="intraday-recon">{reconstruction}</p>
      <ProductChrome product={product} active="forecast">
        <header className="td-pagehead">
          <div>
            <p className="td-title">Forecast</p>
            <p className="td-sub">{dataset.queue}</p>
          </div>
          <div className="td-datebar" aria-hidden="true">
            <span className="td-date">{dataset.dateLabel}</span>
            <span className="td-chip">Today</span>
            <span className="td-chip is-on">Week</span>
          </div>
          <p className="intraday-kicker">
            {illustrative}. {dataset.timeZone}
          </p>
        </header>
        <div className="td-chartcard">
          <p className="td-chart-title">Contact volume offered</p>
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
          <div className={`td-change td-change--toggle${on ? " is-on" : ""}`}>
            <label className="intraday-check td-switch">
              <input type="checkbox" checked={on} onChange={(event) => toggle(event.target.checked)} />
              {showPrevious}
            </label>
            {on ? <p className="intraday-delta">{delta}</p> : <p className="intraday-helper">{previousHidden}</p>}
          </div>
        </div>
        <p className="intraday-summary">{summary}</p>
        {selectedRow ? (
          <p className="intraday-readout">
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
      </ProductChrome>
    </section>
  );
}
