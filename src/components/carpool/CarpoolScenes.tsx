"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { CarpoolContent } from "@/content/carpool/types";
import { Frame, StatePill, StepControls, type Labels } from "./CarpoolPrimitives";
import { useInView, useScrollSteps } from "./useScene";

type Ui = CarpoolContent["ui"];

/* ------------------------------------------------------------------ */
/* Scroll-driven scene layout: sticky stage + step sentinels           */
/* ------------------------------------------------------------------ */

function ScrollScene({
  captions,
  controls,
  controlsLabel,
  stage,
  className,
}: {
  captions: readonly ReactNode[];
  controls: readonly string[];
  controlsLabel: string;
  stage: (step: number) => ReactNode;
  className?: string;
}) {
  const { step, goTo, register } = useScrollSteps(captions.length);

  return (
    <div className={`cp-scene${className ? ` ${className}` : ""}`} data-step={step}>
      <div className="cp-scene__stage">
        {stage(step)}
        <StepControls label={controlsLabel} steps={controls} current={step} onSelect={goTo} />
      </div>
      <ol className="cp-scene__steps">
        {captions.map((caption, index) => (
          <li
            key={index}
            ref={register(index)}
            className={index === step ? "cp-scene__step is-active" : "cp-scene__step"}
            aria-current={index === step ? "step" : undefined}
          >
            {caption}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 Hero: availability layer, then the states underneath             */
/* ------------------------------------------------------------------ */

export function HeroVisual({ visual, ui }: { visual: CarpoolContent["hero"]["visual"]; ui: Ui }) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref, "0px 0px -10% 0px");
  const week = ["S", "M", "T", "W", "T", "F", "S"];
  const freeIndex = 5;
  const tones = ["preparing", "preparing", "attention", "ready"] as const;

  return (
    <figure className="cp-hero-figure">
      <div
        ref={ref}
        className={`cp-hero-visual${live ? " is-live" : ""}`}
        role="img"
        aria-label={`${visual.vehicle}, ${visual.date}: ${visual.free}. ${visual.states.join(", ")}.`}
      >
        <div className="cp-hero-visual__head">
          <span>{visual.vehicle}</span>
          <span>{visual.date}</span>
        </div>
        <div className="cp-hero-visual__week">
          {week.map((day, index) => (
            <span
              key={`${day}-${index}`}
              className={index === freeIndex ? "cp-cell is-free" : "cp-cell"}
            >
              <span className="cp-cell__day">{day}</span>
              {index === freeIndex ? <span className="cp-cell__tag">{visual.free}</span> : null}
            </span>
          ))}
        </div>
        <ol className="cp-hero-visual__layers">
          {visual.states.map((state, index) => (
            <li key={state} style={{ "--i": index } as CSSProperties}>
              <StatePill state={tones[index]}>{state}</StatePill>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="type-nota text-secondary">
        {visual.caption} {ui.reconstructedUi}.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 02 Platform → Booking → Car, then Service around it                 */
/* ------------------------------------------------------------------ */

export function AssumptionChain({ content }: { content: CarpoolContent["assumption"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref);

  return (
    <div
      ref={ref}
      className={`cp-chain${live ? " is-live" : ""}`}
      role="img"
      aria-label={`${content.chain.join(", then ")}. ${content.reveal}.`}
    >
      <span className="cp-chain__service type-label">{content.reveal}</span>
      <ol className="cp-chain__nodes">
        {content.chain.map((node) => (
          <li key={node} className="cp-node">
            {node}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 The wait: Jan → Sep, then cancelled                              */
/* ------------------------------------------------------------------ */

export function WaitScene({
  content,
  labels,
  ui,
}: {
  content: CarpoolContent["wait"];
  labels: Labels;
  ui: Ui;
}) {
  const last = content.months.length - 1;

  return (
    <Frame kind="research" labels={labels} title={content.caseLabel} caption={content.note}>
      <ScrollScene
        className="cp-scene--wait"
        controlsLabel={ui.stepControls}
        controls={content.months.map((m) => m.month)}
        captions={content.months.map((m, index) => (
          <>
            <span className="cp-scene__month type-display">{m.month}</span>
            <span className="cp-scene__text type-lede">{m.text}</span>
            {index === last ? (
              <span className="cp-scene__after type-heading">
                {content.noExplanation}
                <br />
                {content.noAlternative}
              </span>
            ) : null}
          </>
        ))}
        stage={(step) => {
          const cancelled = step === last;
          const progress = step / last;
          return (
            <div className={`cp-wait${cancelled ? " is-cancelled" : ""}`}>
              <div className="cp-wait__timeline" aria-hidden="true">
                <span
                  className="cp-wait__progress"
                  style={{ "--p": progress } as CSSProperties}
                />
                {content.months.map((m, index) => (
                  <span
                    key={m.month}
                    className={index <= step ? "cp-wait__tick is-on" : "cp-wait__tick"}
                  >
                    {m.month}
                  </span>
                ))}
              </div>
              <div className="cp-wait__card">
                <div className="cp-wait__vehicle">
                  <span className="cp-wait__name type-heading">{content.stage.vehicle}</span>
                  <span className="type-nota text-secondary">{content.stage.forLabel}</span>
                </div>
                <StatePill state={cancelled ? "cancelled" : "available"}>
                  {cancelled ? content.cancelled : content.booked}
                </StatePill>
              </div>
              <div className="cp-wait__alt" aria-hidden={!cancelled}>
                <span className="type-nota">{content.alternativeEmpty}</span>
              </div>
            </div>
          );
        }}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 06 Available ≠ ready                                                */
/* ------------------------------------------------------------------ */

export function ReadinessScene({
  content,
  labels,
  ui,
}: {
  content: CarpoolContent["readiness"];
  labels: Labels;
  ui: Ui;
}) {
  const last = content.steps.length - 1;
  const week = ["S", "M", "T", "W", "T", "F", "S"];
  const target = 5;

  return (
    <Frame kind="inference" labels={labels} caption={content.note}>
      <ScrollScene
        className="cp-scene--ready"
        controlsLabel={ui.stepControls}
        controls={content.steps.map((s) => s.label)}
        captions={content.steps.map((s) => (
          <>
            <span className="cp-scene__label type-heading">{s.label}</span>
            <span className="cp-scene__text type-lede">{s.text}</span>
          </>
        ))}
        stage={(step) => {
          const ready = step === last;
          return (
            <div className={`cp-ready${ready ? " is-ready" : ""}`}>
              <div className="cp-ready__calendar">
                <span className="type-meta text-secondary">{content.calendarTitle}</span>
                <div className="cp-ready__week" aria-hidden="true">
                  {week.map((day, index) => (
                    <span
                      key={`${day}-${index}`}
                      className={
                        index === target
                          ? `cp-cell ${ready ? "is-ready" : "is-free"}`
                          : "cp-cell"
                      }
                    >
                      <span className="cp-cell__day">{day}</span>
                    </span>
                  ))}
                </div>
                <StatePill state={ready ? "ready" : "available"}>
                  {ready ? ui.stateReady : content.calendarFree}
                </StatePill>
              </div>
              <ol className="cp-ready__ops" aria-hidden="true">
                {content.steps.map((s, index) => (
                  <li
                    key={s.key}
                    className={
                      index === step
                        ? "cp-station is-current"
                        : index < step
                          ? "cp-station is-done"
                          : "cp-station"
                    }
                    data-key={s.key}
                  >
                    <span className="cp-station__label">{s.label}</span>
                  </li>
                ))}
                <span
                  className="cp-vehicle-token"
                  style={{ "--x": step, "--n": content.steps.length } as CSSProperties}
                />
              </ol>
              <p className="cp-ready__now type-nota" aria-live="polite">
                {content.steps[step].label}
              </p>
            </div>
          );
        }}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 07 Service model: booking is one node                               */
/* ------------------------------------------------------------------ */

export function ServiceModelScene({
  content,
  labels,
  ui,
}: {
  content: CarpoolContent["service"];
  labels: Labels;
  ui: Ui;
}) {
  return (
    <Frame kind="inference" labels={labels} caption={content.note}>
      <ScrollScene
        className="cp-scene--service"
        controlsLabel={ui.stepControls}
        controls={content.focus.map((index) => content.nodes[index])}
        captions={content.focusCaptions.map((text, index) => (
          <>
            <span className="cp-scene__label type-heading">{content.nodes[content.focus[index]]}</span>
            <span className="cp-scene__text type-lede">{text}</span>
          </>
        ))}
        stage={(step) => {
          const focus = content.focus[step];
          return (
            <ol className="cp-service" aria-label={content.statement}>
              {content.nodes.map((node, index) => (
                <li
                  key={node}
                  className={
                    index === focus
                      ? "cp-service__node is-focus"
                      : index === 1
                        ? "cp-service__node is-product"
                        : "cp-service__node"
                  }
                  aria-current={index === focus ? "true" : undefined}
                >
                  <span className="cp-service__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {node}
                </li>
              ))}
            </ol>
          );
        }}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 09 Rules too late: before / exploration                             */
/* ------------------------------------------------------------------ */

export function RuleTimingScene({
  content,
  labels,
  ui,
}: {
  content: CarpoolContent["rules"];
  labels: Labels;
  ui: Ui;
}) {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [clicked, setClicked] = useState(false);
  const flow = mode === "before" ? content.before : content.after;
  const reserveLabel = content.before.steps[0];

  return (
    <Frame
      kind={mode === "before" ? "reconstruction" : "exploration"}
      labels={labels}
      title={flow.label}
      caption={content.note}
    >
      <div className="cp-rule">
        <div className="cp-toggle" role="group" aria-label={ui.stepControls}>
          <button
            type="button"
            className={mode === "before" ? "is-active" : undefined}
            aria-pressed={mode === "before"}
            onClick={() => {
              setMode("before");
              setClicked(false);
            }}
          >
            {content.before.label}
          </button>
          <button
            type="button"
            className={mode === "after" ? "is-active" : undefined}
            aria-pressed={mode === "after"}
            onClick={() => setMode("after")}
          >
            {content.after.label}
          </button>
        </div>

        <ol className="cp-flow" key={mode}>
          {flow.steps.map((step, index) => (
            <li key={step} style={{ "--i": index } as CSSProperties}>
              {step}
            </li>
          ))}
        </ol>

        <div className={`cp-rule__mock is-${mode}`}>
          {mode === "after" ? (
            <p className="cp-notice cp-notice--attention type-nota" role="status">
              <StatePill state="attention">{content.after.steps[0]}</StatePill>
              {content.ruleEarly}
            </p>
          ) : null}
          <button
            type="button"
            className="cp-primary"
            disabled={mode === "after"}
            aria-describedby={mode === "after" ? "cp-rule-early" : undefined}
            onClick={() => setClicked(true)}
          >
            {reserveLabel}
          </button>
          {mode === "before" && clicked ? (
            <p className="cp-notice cp-notice--cancelled type-nota" role="alert">
              <StatePill state="cancelled">{content.before.steps[1]}</StatePill>
              {content.rule}
            </p>
          ) : null}
          {mode === "after" ? (
            <span id="cp-rule-early" className="sr-only">
              {content.ruleEarly}
            </span>
          ) : null}
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 11 Scheduled ≠ actual                                               */
/* ------------------------------------------------------------------ */

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function ScheduledActualScene({
  content,
  labels,
}: {
  content: CarpoolContent["usage"];
  labels: Labels;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref);
  const start = toMinutes("08:00");
  const span = toMinutes("18:00") - start;
  const bar = (from: string, to: string) =>
    ({
      "--from": (toMinutes(from) - start) / span,
      "--to": (toMinutes(to) - start) / span,
    }) as CSSProperties;

  return (
    <Frame kind="exploration" labels={labels} title={content.illustrative} caption={content.recommendation}>
      <div ref={ref} className={`cp-usage${live ? " is-live" : ""}`}>
        {[content.scheduled, content.actual].map((row, index) => (
          <div key={row.label} className="cp-usage__row" style={{ "--i": index } as CSSProperties}>
            <span className="cp-usage__label type-label">{row.label}</span>
            <div className="cp-usage__track" aria-hidden="true">
              <span className="cp-usage__bar" style={bar(row.pickup, row.ret)} />
            </div>
            <dl className="cp-usage__times type-nota">
              <div>
                <dt>{content.pickup}</dt>
                <dd>{row.pickup}</dd>
              </div>
              <div>
                <dt>{content.ret}</dt>
                <dd>{row.ret}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Staggered line reveal for the pivot and closing statements          */
/* ------------------------------------------------------------------ */

export function RevealLines({
  lines,
  className,
  as: Tag = "p",
}: {
  lines: readonly string[];
  className: string;
  as?: "p" | "h2";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref, "0px 0px -15% 0px");

  return (
    <div ref={ref} className={`cp-lines${live ? " is-live" : ""}`}>
      {lines.map((line, index) => (
        <Tag key={line} className={className} style={{ "--i": index } as CSSProperties}>
          {line}
        </Tag>
      ))}
    </div>
  );
}
