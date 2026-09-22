"use client";

import { dataset } from "@/content/intraday/dataset";
import { affectedPeriodLabel } from "@/content/intraday/derive";
import type { IntradayContent } from "@/content/intraday/types";
import DataTable from "./DataTable";
import ForecastChart, { type ChartSeries } from "./ForecastChart";
import { Glyph } from "./icons";
import { useAnnounce } from "./Announcer";
import { useExperience } from "./store";

const SWITCH_TIME = "11:00";

function currentOf(quarter: (typeof dataset.quarters)[number]): number {
  return quarter.time < SWITCH_TIME ? quarter.previous : (quarter.next ?? quarter.previous);
}

function textValue(value: number | null, empty: string): string {
  return value === null ? empty : String(value);
}

export default function ForecastSurface({ content }: { content: IntradayContent }) {
  const { phase, showPrevious, setShowPrevious, destination, setPlace, signal, filterOn } =
    useExperience();
  const announce = useAnnounce();
  const chart = content.chart;
  const updated = phase >= 5;
  const showActuals = phase >= 2 && signal === "volume";
  const showBand = phase >= 3;
  const axis = dataset.quarters.map((quarter) => quarter.time);
  const affected = dataset.quarters.filter(
    (quarter) => quarter.time >= dataset.affected.start && quarter.time < dataset.affected.end,
  );
  const periodLabel = `${dataset.affected.start} to ${dataset.affected.end}`;
  const showOrders = !(filterOn && phase === 4);
  const summary = updated
    ? chart.compareSummary
    : showActuals
      ? chart.scenarioSummary
      : chart.planSummary;

  const series: ChartSeries[] = [];
  if (updated && showPrevious) {
    series.push({
      id: "previous",
      label: content.decisionThree.columns.previous,
      style: "dashed",
      points: dataset.quarters.map((quarter) => ({ time: quarter.time, value: quarter.previous })),
    });
  }
  series.push({
    id: "current",
    label: updated ? chart.newForecast : chart.forecast,
    style: "solid",
    weight: "strong",
    area: true,
    points: dataset.quarters.map((quarter) => ({
      time: quarter.time,
      value: updated ? currentOf(quarter) : quarter.previous,
    })),
  });
  if (showActuals) {
    series.push({
      id: "actual-line",
      label: chart.actual,
      style: "solid",
      points: dataset.quarters.map((quarter) => ({ time: quarter.time, value: quarter.actual })),
    });
    series.push({
      id: "actual-marks",
      label: chart.actual,
      style: "markers",
      points: affected.map((quarter) => ({ time: quarter.time, value: quarter.actual })),
    });
  }

  const total = dataset.quarters.reduce(
    (sum, quarter) => sum + (updated ? currentOf(quarter) : quarter.previous),
    0,
  );
  const columns = updated
    ? [content.decisionThree.columns.time, content.decisionThree.columns.previous, content.decisionThree.columns.current, content.decisionThree.columns.actual]
    : [content.decisionThree.columns.time, chart.forecast, content.decisionThree.columns.actual];
  const rows = dataset.quarters.map((quarter) =>
    updated
      ? [
          quarter.time,
          String(quarter.previous),
          String(currentOf(quarter)),
          textValue(quarter.actual, chart.empty),
        ]
      : [quarter.time, String(quarter.previous), textValue(showActuals ? quarter.actual : null, chart.empty)],
  );

  function toggle(next: boolean) {
    setShowPrevious(next);
    announce(next ? content.decisionThree.delta : content.decisionThree.previousHidden);
  }

  return (
    <div className="psurface">
      <header className="psurface__head">
        <div className="psurface__title">
          <p className="peyebrow">
            {dataset.queue}. {dataset.dateLabel}. {dataset.timeZone}
          </p>
          <h4>{content.decisionTwo.surfaces[0].label}</h4>
        </div>
        <div className="psurface__scope">
          <div className="pseg" aria-hidden="true">
            <span className="is-on">Today</span>
            <span>Week</span>
          </div>
          <div className="pseg" aria-hidden="true">
            <span className="is-on">{dataset.queue}</span>
            {showOrders ? <span>{dataset.contrastQueue}</span> : null}
          </div>
        </div>
        {showOrders && phase === 4 ? (
          <p className="phelp psurface__aside">
            {dataset.contrastQueue}. {content.decisionTwo.ordersNote}
          </p>
        ) : null}
      </header>

      {destination === "forecast" ? (
        <div className="pfocus">
          <div>
            <p className="peyebrow">{dataset.queue}</p>
            <h4 id="issue-forecast-period" tabIndex={-1} className="pfocus__title">
              {affectedPeriodLabel(content.decisionThree.periodPrefix, dataset.affected.start, dataset.affected.end)}
            </h4>
          </div>
          <button type="button" className="pbtn pbtn--quiet" onClick={() => setPlace("issues")}>
            <Glyph name="back" />
            Forecasting issues
          </button>
        </div>
      ) : null}

      <div className="pbar">
        <div className="pseg" aria-hidden="true">
          <span className="is-on">Contact volume offered</span>
          <span>Handle time</span>
          <span>Staff</span>
        </div>
        {updated ? (
          <label className={`ptoggle${showPrevious ? " is-on" : ""}`}>
            <input
              type="checkbox"
              checked={showPrevious}
              onChange={(event) => toggle(event.target.checked)}
            />
            <span className="ptoggle__track" aria-hidden="true">
              <span className="ptoggle__thumb" />
            </span>
            {content.decisionThree.showPrevious}
          </label>
        ) : null}
      </div>

      <div className="pmetric">
        <p className="peyebrow">{updated ? chart.newForecast : chart.forecast}</p>
        <p className="pmetric__value">
          <strong>{total.toLocaleString("en-GB")}</strong>
          <span>{chart.contacts}</span>
        </p>
        {updated && showPrevious ? <p className="pmetric__delta">{content.decisionThree.delta}</p> : null}
      </div>

      <ForecastChart
        axis={axis}
        series={series}
        band={
          showBand
            ? { start: dataset.affected.start, end: dataset.affected.end, label: periodLabel }
            : null
        }
        yLabel={chart.contacts}
        region={content.decisionThree.chartRegion}
      />

      <details className="pvalues">
        <summary>{summary}</summary>
        <DataTable
          caption={summary}
          columns={columns}
          mark={showBand ? affected.map((quarter) => quarter.time) : undefined}
          rows={rows}
        />
      </details>
    </div>
  );
}
