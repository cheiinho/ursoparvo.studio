"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { quarterByTime } from "@/content/intraday/derive";
import { announceOnChange } from "@/content/intraday/state";
import { useAnnounce } from "./Announcer";
import DataTable from "./DataTable";
import ForecastChart, { type ChartSeries } from "./ForecastChart";
import ProductChrome from "./ProductChrome";
import WfmSwitch from "./WfmSwitch";

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
    <section className="intraday-ui intraday-compare wfm" aria-label={chartRegion}>
      <p className="intraday-recon">{reconstruction}</p>
      <ProductChrome product={product} section="Forecast" context={dataset.queue}>
        <header className="wfm-pagehead">
          <div>
            <p className="wfm-title">Forecast</p>
            <p className="wfm-meta">
              {illustrative}. {dataset.timeZone}
            </p>
          </div>
          <div className="wfm-scope" aria-hidden="true">
            <span className="wfm-scope__date">{dataset.dateLabel}</span>
            <span className="is-on">Today</span>
            <span>Week</span>
          </div>
          <div className="wfm-queues">
            <span className="is-on">{dataset.queue}</span>
          </div>
        </header>
        <div className="wfm-forecast">
          <p className="wfm-kicker">Contact volume offered</p>
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
          <div className={`wfm-comparebar${on ? " is-on" : ""}`}>
            <WfmSwitch checked={on} onChange={toggle} label={showPrevious} />
            {on ? <p className="intraday-delta">{delta}</p> : <p className="wfm-help">{previousHidden}</p>}
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
          mark={dataset.quarters.filter((quarter) => inAffected(quarter.time)).map((quarter) => quarter.time)}
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
