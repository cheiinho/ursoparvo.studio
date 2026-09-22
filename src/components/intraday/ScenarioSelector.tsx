"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { announceOnChange, scenarioView } from "@/content/intraday/state";
import type { ScenarioId } from "@/content/intraday/types";
import { useAnnounce } from "./Announcer";
import DataTable from "./DataTable";
import ForecastChart, { type ChartSeries } from "./ForecastChart";
import ProductChrome, { PRODUCT_PLACES } from "./ProductChrome";

type Option = { id: ScenarioId; label: string; note: string };

type Props = {
  product: string;
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
  product,
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

  const bandEnd = affected.at(-1)?.time;

  return (
    <div className="intraday-ui wfm">
      <ProductChrome
        product={product}
        section="Forecast"
        context={dataset.account}
        rail={PRODUCT_PLACES.map((item) => ({ ...item, current: item.id === "forecast" }))}
      >
        <header className="wfm-pagehead">
          <div>
            <p className="wfm-title">Forecast</p>
            <p className="wfm-meta">
              {summary} {illustrative}. {dataset.timeZone}
            </p>
          </div>
          <fieldset className="wfm-states">
            <legend className="wfm-kicker">{groupLabel}</legend>
            <div className="wfm-segments">
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
          <div className="wfm-queues">
            <span className="is-on">{dataset.queue}</span>
            <span>{dataset.contrastQueue}</span>
          </div>
        </header>
        <div className="wfm-forecast">
          <ForecastChart
            patternId="scenario-band"
            axis={axis}
            series={[forecastSeries, ...actualSeries]}
            band={
              view.showActuals && bandEnd
                ? {
                    start: dataset.affected.start,
                    end: bandEnd,
                    label: `${dataset.affected.start} to ${dataset.affected.end}`,
                  }
                : null
            }
            tone="paper"
            yLabel={contacts}
            enter={view.showActuals}
          />
          <p className="wfm-help">{note}</p>
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
      </ProductChrome>
    </div>
  );
}
