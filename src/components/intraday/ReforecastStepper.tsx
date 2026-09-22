"use client";

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
import ForecastChart, { type ChartSeries } from "./ForecastChart";
import { useStory } from "./story";

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
  const { step, setStep } = useStory();
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

  const showNext = stepShowsNext(step);

  return (
    <div className="intraday-ui wfm intraday-watch">
        <div className="wfm-stepper">
          <fieldset className="wfm-states">
            <legend className="wfm-kicker">{groupLabel}</legend>
            <div className="wfm-segments wfm-segments--steps">
              {steps.map((item) => (
                <label key={item.id}>
                  <input
                    type="radio"
                    name="intraday-step"
                    checked={item.id === step}
                    onChange={() => goTo(item.id)}
                  />
                  <span>{item.clock}</span>
                  <span className="wfm-step__name">{item.stateName}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="wfm-actions">
            <button type="button" onClick={() => go(-1)} disabled={moveStep(step, -1) === null}>
              {back}
            </button>
            <button type="button" onClick={() => go(1)} disabled={moveStep(step, 1) === null}>
              {next}
            </button>
            <button type="button" onClick={() => goTo(1)} disabled={step === 1}>
              Reset
            </button>
          </div>
        </div>
        {statusText ? (
          <div className={`wfm-banner${status === "completed" ? " is-done" : ""}`}>
            <span className="wfm-banner__icon" aria-hidden="true">
              {status === "completed" ? "✓" : "!"}
            </span>
            <div className="wfm-banner__copy">
              <p>{statusText}</p>
              <p className="wfm-help">
                {dataset.queue}. {dataset.affected.start} to {dataset.affected.end}
              </p>
            </div>
          </div>
        ) : null}
        <div className="wfm-forecast">
          <p className="wfm-help">
            {current.sentence} {illustrative}.
          </p>
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
            tone="paper"
            yLabel={contacts}
            enter={showNext}
          />
          <details className="intraday-values">
            <summary>{summary}</summary>
            <DataTable
              caption={summary}
              columns={showNext ? [time, forecast, actual, newForecast] : [time, forecast, actual]}
              rows={rows.map((quarter) => {
                const cells = [
                  quarter.time,
                  textValue(quarter.previous, empty),
                  textValue(quarter.actual, empty),
                ];
                if (showNext) cells.push(textValue(quarter.next, empty));
                return cells;
              })}
            />
          </details>
        </div>
    </div>
  );
}
