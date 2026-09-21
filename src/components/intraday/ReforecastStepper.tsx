"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { quarterByTime } from "@/content/intraday/derive";
import {
  MARKED_TIMES,
  STEP_TIMES,
  announceOnChange,
  moveStep,
  stepShowsBand,
  stepShowsNext,
  stepStatus,
} from "@/content/intraday/state";
import type { StepId } from "@/content/intraday/types";
import { useAnnounce } from "./Announcer";
import DataTable from "./DataTable";
import EvidenceLabel from "./EvidenceLabel";
import ForecastChart, { type ChartSeries } from "./ForecastChart";

type StepCopy = {
  id: StepId;
  clock: string;
  stateName: string;
  sentence: string;
};

type Props = {
  groupLabel: string;
  back: string;
  next: string;
  steps: readonly StepCopy[];
  start: string;
  completed: string;
  time: string;
  forecast: string;
  actual: string;
  newForecast: string;
  contacts: string;
  empty: string;
  summary: string;
  illustrative: string;
};

function textValue(value: number | null, empty: string): string {
  return value === null ? empty : String(value);
}

export default function ReforecastStepper({
  groupLabel,
  back,
  next,
  steps,
  start,
  completed,
  time,
  forecast,
  actual,
  newForecast,
  contacts,
  empty,
  summary,
  illustrative,
}: Props) {
  const [step, setStep] = useState<StepId>(1);
  const announce = useAnnounce();
  const current = steps.find((item) => item.id === step) ?? steps[0];
  const status = stepStatus(step);
  const times = STEP_TIMES[step];
  const statusText = status === "start" ? start : status === "completed" ? completed : null;
  const rows = times.map((clock) => quarterByTime(clock)).filter((quarter) => quarter !== undefined);
  const bandEnd = times.filter((clock) => clock >= dataset.affected.start && clock < dataset.affected.end).at(-1);
  const series: ChartSeries[] = [
    {
      id: "forecast",
      label: forecast,
      style: "solid",
      weight: "regular",
      points: rows.map((quarter) => ({ time: quarter.time, value: quarter.previous })),
    },
    {
      id: "actual-line",
      label: actual,
      style: "solid",
      weight: "regular",
      points: rows.map((quarter) => ({ time: quarter.time, value: quarter.actual })),
    },
    {
      id: "actual-marks",
      label: actual,
      style: "markers",
      points: rows.map((quarter) => ({ time: quarter.time, value: quarter.actual })),
    },
  ];
  if (stepShowsNext(step)) {
    series.push({
      id: "next",
      label: newForecast,
      style: "solid",
      weight: "strong",
      points: rows.map((quarter) => ({ time: quarter.time, value: quarter.next })),
    });
  }

  function goTo(target: StepId) {
    const sentence = steps.find((item) => item.id === target)?.sentence ?? "";
    const message = announceOnChange(step, target, sentence);
    setStep(target);
    if (message) announce(message);
  }

  function go(direction: -1 | 1) {
    const target = moveStep(step, direction);
    if (target === null) return;
    goTo(target);
  }

  return (
    <div className="intraday-stack intraday-step">
      <fieldset>
        <legend className="type-label">{groupLabel}</legend>
        <div className="intraday-steps">
          {steps.map((item) => (
            <label key={item.id} className={item.id === step ? "is-current" : undefined}>
              <input
                type="radio"
                name="intraday-step"
                checked={item.id === step}
                onChange={() => goTo(item.id)}
              />
              <span>{item.clock}</span>
              <span className="intraday-muted">{item.stateName}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {statusText ? <p className="intraday-status type-lede">{statusText}</p> : null}
      <p className="type-lede">{current.sentence}</p>
      <div className="intraday-actions">
        <button type="button" onClick={() => go(-1)} disabled={moveStep(step, -1) === null}>
          {back}
        </button>
        <button type="button" onClick={() => go(1)} disabled={moveStep(step, 1) === null}>
          {next}
        </button>
      </div>
      <EvidenceLabel kind="illustrative" text={illustrative} />
      <p className="type-nota">{summary}</p>
      <div className="intraday-chart-region">
        <ForecastChart
          patternId="step-band"
          axis={times}
          series={series}
          markedTimes={MARKED_TIMES[step]}
          band={
            stepShowsBand(step) && bandEnd
              ? {
                  start: dataset.affected.start,
                  end: bandEnd,
                  label: `${dataset.affected.start} to ${dataset.affected.end}`,
                }
              : null
          }
          tone="field"
          yLabel={contacts}
          enter={stepShowsNext(step)}
        />
      </div>
      <DataTable
        caption={summary}
        columns={[time, forecast, actual]}
        rows={rows.map((quarter) => [
          quarter.time,
          textValue(quarter.previous, empty),
          textValue(quarter.actual, empty),
        ])}
      />
    </div>
  );
}
