"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { announceOnChange, scenarioView } from "@/content/intraday/state";
import type { ScenarioId } from "@/content/intraday/types";
import { useAnnounce } from "./Announcer";
import DataTable from "./DataTable";
import EvidenceLabel from "./EvidenceLabel";
import ForecastChart, { type ChartSeries } from "./ForecastChart";

type Option = { id: ScenarioId; label: string; note: string };

type Props = {
  groupLabel: string;
  options: readonly Option[];
  forecast: string;
  actual: string;
  contacts: string;
  empty: string;
  summary: string;
  illustrative: string;
  time: string;
};

function textValue(value: number | null, empty: string): string {
  return value === null ? empty : String(value);
}

export default function ScenarioSelector({
  groupLabel,
  options,
  forecast,
  actual,
  contacts,
  empty,
  summary,
  illustrative,
  time,
}: Props) {
  const [selected, setSelected] = useState<ScenarioId>("volume");
  const announce = useAnnounce();
  const view = scenarioView(selected);
  const note = options.find((option) => option.id === selected)?.note ?? "";
  const affected = dataset.quarters.filter(
    (quarter) => quarter.time >= dataset.affected.start && quarter.time < dataset.affected.end,
  );
  const axis = dataset.quarters.map((quarter) => quarter.time);
  const forecastSeries: ChartSeries = {
    id: "forecast",
    label: forecast,
    style: "solid",
    weight: "regular",
    points: dataset.quarters.map((quarter) => ({ time: quarter.time, value: quarter.previous })),
  };
  const actualSeries: ChartSeries[] = view.showActuals
    ? [
        {
          id: "actual-line",
          label: actual,
          style: "solid",
          weight: "regular",
          points: dataset.quarters.map((quarter) => ({
            time: quarter.time,
            value: affected.some((row) => row.time === quarter.time) ? quarter.actual : null,
          })),
        },
        {
          id: "actual-marks",
          label: actual,
          style: "markers",
          points: affected.map((quarter) => ({ time: quarter.time, value: quarter.actual })),
        },
      ]
    : [];

  function choose(id: ScenarioId) {
    const nextNote = options.find((option) => option.id === id)?.note ?? "";
    const message = announceOnChange(selected, id, nextNote);
    setSelected(id);
    if (message) announce(message);
  }

  return (
    <div className="intraday-stack">
      <fieldset>
        <legend className="type-label">{groupLabel}</legend>
        <div className="intraday-choices">
          {options.map((option) => (
            <label key={option.id}>
              <input
                type="radio"
                name="intraday-scenario"
                checked={selected === option.id}
                onChange={() => choose(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="type-lede type-italic">{note}</p>
      <EvidenceLabel kind="illustrative" text={illustrative} />
      <p className="type-nota">{summary}</p>
      <div className="intraday-chart-region">
        <ForecastChart
          patternId="scenario-band"
          axis={axis}
          series={[forecastSeries, ...actualSeries]}
          tone="paper"
          yLabel={contacts}
          enter={view.showActuals}
        />
      </div>
      {view.showActuals ? (
        <DataTable
          caption={summary}
          columns={[time, forecast, actual]}
          rows={affected.map((quarter) => [
            quarter.time,
            textValue(quarter.previous, empty),
            textValue(quarter.actual, empty),
          ])}
        />
      ) : null}
    </div>
  );
}
