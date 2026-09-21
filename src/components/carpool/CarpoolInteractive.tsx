"use client";

import { useReducedMotion } from "framer-motion";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { CarpoolContent, EvidenceKind } from "@/content/carpool/types";

type Labels = CarpoolContent["labels"];
type Interact = CarpoolContent["interact"];

function Chip({ kind, labels }: { kind: EvidenceKind; labels: Labels }) {
  return <span className={`carpool-chip carpool-chip--${kind}`}>{labels[kind]}</span>;
}

function Frame({
  kind,
  labels,
  caption,
  children,
}: {
  kind: EvidenceKind;
  labels: Labels;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="carpool-frame">
      <div className="carpool-frame__bar">
        <Chip kind={kind} labels={labels} />
      </div>
      <div className="carpool-frame__body">{children}</div>
      {caption ? (
        <figcaption className="carpool-frame__caption type-nota">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

const DAY_STATES = [
  { open: 2, closed: 1 },
  { open: 1, closed: 2 },
  { open: 0, closed: 3 },
  { open: 1, closed: 1 },
  { open: 0, closed: 2 },
  { open: 2, closed: 0 },
] as const;

export function AvailabilityPlay({
  labels,
  i,
  statement,
  after,
}: {
  labels: Labels;
  i: Interact;
  statement: string;
  after: string;
}) {
  const [day, setDay] = useState(0);
  const state = DAY_STATES[day];
  const titleId = useId();

  return (
    <Frame kind="reconstruction" labels={labels}>
      <div className="carpool-play" aria-labelledby={titleId}>
        <p id={titleId} className="type-meta">
          {i.selectDate}
        </p>
        <div className="carpool-play__days" role="group" aria-label={i.selectDate}>
          {i.dayLabels.map((label, index) => (
            <button
              key={label}
              type="button"
              className={
                index === day
                  ? "carpool-day is-active"
                  : DAY_STATES[index].open === 0
                    ? "carpool-day is-empty"
                    : "carpool-day"
              }
              aria-pressed={index === day}
              onClick={() => setDay(index)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="type-nota text-secondary" aria-live="polite">
          {state.open === 0
            ? i.noAvailability
            : state.open === 1
              ? i.fewerOptions
              : i.vehicles}
        </p>
        <ul className="carpool-play__cars">
          {Array.from({ length: state.open }, (_, n) => (
            <li key={`o-${n}`} className="is-open">
              <span>
                Compact EV 0{n + 1}
              </span>
              <span>{i.vehicleOpen}</span>
            </li>
          ))}
          {Array.from({ length: state.closed }, (_, n) => (
            <li key={`c-${n}`} className="is-closed">
              <span>
                Estate {n + 1}
              </span>
              <span>{i.vehicleClosed}</span>
            </li>
          ))}
        </ul>
        <div className="carpool-play__punch" aria-live="polite">
          {day >= 2 ? (
            <>
              <p className="type-lede">{statement}</p>
              <p className="type-heading">{after}</p>
            </>
          ) : (
            <p className="type-nota text-secondary">{i.tryAnotherDay}</p>
          )}
        </div>
      </div>
    </Frame>
  );
}

const WAIT_STEPS = [
  "booked",
  "monthsPass",
  "stillBooked",
  "twentyDays",
  "cancelled",
] as const;

export function WaitTimeline({
  labels,
  i,
}: {
  labels: Labels;
  i: Interact;
}) {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const labelsMap = useMemo(
    () => ({
      booked: i.booked,
      monthsPass: i.monthsPass,
      stillBooked: i.stillBooked,
      twentyDays: i.twentyDays,
      cancelled: i.cancelled,
    }),
    [i],
  );

  return (
    <Frame kind="reconstruction" labels={labels}>
      <div className="carpool-wait">
        <label className="type-meta" htmlFor="carpool-wait-range">
          {i.scrubHint}
        </label>
        <input
          id="carpool-wait-range"
          className="carpool-range"
          type="range"
          min={0}
          max={WAIT_STEPS.length - 1}
          value={step}
          onChange={(event) => setStep(Number(event.target.value))}
          aria-valuetext={labelsMap[WAIT_STEPS[step]]}
        />
        <ol className="carpool-wait__steps">
          {WAIT_STEPS.map((key, index) => (
            <li
              key={key}
              className={
                index === step
                  ? "is-current"
                  : index < step
                    ? "is-done"
                    : undefined
              }
              aria-current={index === step ? "step" : undefined}
            >
              <button type="button" onClick={() => setStep(index)}>
                {labelsMap[key]}
              </button>
            </li>
          ))}
        </ol>
        <div
          className={`carpool-wait__panel${step >= 4 ? " is-bad" : ""}${reduce ? "" : " is-animated"}`}
          aria-live="polite"
        >
          {step < 4 ? (
            <p className="type-corpo">Jan to Sep</p>
          ) : (
            <>
              <p className="type-heading">{i.cancelled}</p>
              <p className="type-nota">{i.noReason}</p>
              <p className="type-nota text-secondary">{i.noAlternative}</p>
            </>
          )}
        </div>
      </div>
    </Frame>
  );
}

const READY_STEPS = [
  "stepReturn",
  "stepInspection",
  "stepCharging",
  "stepReady",
] as const;

export function ReadinessPlay({
  labels,
  i,
}: {
  labels: Labels;
  i: Interact;
}) {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const ready = step === READY_STEPS.length - 1;

  return (
    <Frame kind="reconstruction" labels={labels}>
      <div className="carpool-ready">
        <div className="carpool-ready__card">
          <p className="type-meta">Car 07</p>
          <div className="carpool-ready__tags">
            <span className={ready ? undefined : "is-on is-available"}>
              {i.availableTag}
            </span>
            <span className={ready ? "is-on" : undefined}>{i.readyTag}</span>
          </div>
          <p className="type-corpo" aria-live="polite">
            {i[READY_STEPS[step]]}
          </p>
          <div
            className={`carpool-ready__meter${ready ? " is-ready" : ""}${reduce ? "" : " is-animated"}`}
            style={
              {
                "--ready-progress": `${((step + 1) / READY_STEPS.length) * 100}%`,
              } as CSSProperties
            }
            aria-hidden="true"
          />
        </div>
        <div className="carpool-ready__controls" role="group" aria-label={i.playReady}>
          {READY_STEPS.map((key, index) => (
            <button
              key={key}
              type="button"
              className={index === step ? "is-active" : undefined}
              aria-pressed={index === step}
              onClick={() => setStep(index)}
            >
              {i[key]}
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function IntentSwitch({
  labels,
  i,
}: {
  labels: Labels;
  i: Interact;
}) {
  const [mode, setMode] = useState<"work" | "leisure">("leisure");

  return (
    <Frame kind="exploration" labels={labels}>
      <div className="carpool-intent">
        <div className="carpool-intent__toggle" role="group">
          <button
            type="button"
            className={mode === "work" ? "is-active" : undefined}
            aria-pressed={mode === "work"}
            onClick={() => setMode("work")}
          >
            {i.workMode}
          </button>
          <button
            type="button"
            className={mode === "leisure" ? "is-active" : undefined}
            aria-pressed={mode === "leisure"}
            onClick={() => setMode("leisure")}
          >
            {i.leisureMode}
          </button>
        </div>
        <p className="type-heading" aria-live="polite">
          {mode === "work" ? i.workNeed : i.leisureNeed}
        </p>
      </div>
    </Frame>
  );
}

export function RuleDemo({
  labels,
  i,
}: {
  labels: Labels;
  i: Interact;
}) {
  const [phase, setPhase] = useState<"idle" | "late" | "early">("idle");

  return (
    <Frame kind="reconstruction" labels={labels}>
      <div className="carpool-ruleplay">
        {phase === "early" ? (
          <p className="carpool-banner type-nota" role="status">
            {i.earlyRule}
          </p>
        ) : null}
        <button
          type="button"
          className="carpool-reserve"
          onClick={() => setPhase(phase === "early" ? "early" : "late")}
        >
          {i.reserve}
        </button>
        {phase === "late" ? (
          <p className="carpool-error type-nota" role="alert">
            {i.lateRule}
          </p>
        ) : null}
        <div className="carpool-ruleplay__actions">
          <button type="button" className="carpool-text-btn" onClick={() => setPhase("idle")}>
            {i.tryAgain}
          </button>
          <button
            type="button"
            className="carpool-text-btn"
            onClick={() => setPhase("early")}
          >
            {i.showBefore}
          </button>
        </div>
      </div>
    </Frame>
  );
}

const HISTORY_TABS = [
  "tabUpcoming",
  "tabActive",
  "tabCompleted",
  "tabCancelled",
] as const;

export function HistoryTabs({
  labels,
  i,
}: {
  labels: Labels;
  i: Interact;
}) {
  const [tab, setTab] = useState(0);
  const rows = [
    { tab: 0, car: "Compact EV", status: i.statusOpen },
    { tab: 1, car: "Estate hybrid", status: i.statusOpen },
    { tab: 2, car: "City EV", status: i.statusCompleted },
    { tab: 3, car: "Compact EV", status: i.statusCancelled },
  ];

  return (
    <Frame kind="exploration" labels={labels}>
      <div className="carpool-history">
        <div className="carpool-history__tabs" role="tablist">
          {HISTORY_TABS.map((key, index) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === index}
              className={tab === index ? "is-active" : undefined}
              onClick={() => setTab(index)}
            >
              {i[key]}
            </button>
          ))}
        </div>
        <ul className="carpool-history__list" role="tabpanel">
          {rows
            .filter((row) => row.tab === tab)
            .map((row) => (
              <li
                key={`${row.car}-${row.status}`}
                data-status={tab === 3 ? "cancelled" : "open"}
              >
                <span>{row.car}</span>
                <strong>{row.status}</strong>
              </li>
            ))}
        </ul>
      </div>
    </Frame>
  );
}

export function ActualUsage({
  labels,
  i,
  note,
}: {
  labels: Labels;
  i: Interact;
  note: string;
}) {
  const [showActual, setShowActual] = useState(false);

  return (
    <Frame kind="exploration" labels={labels}>
      <div className="carpool-usage">
        <button
          type="button"
          className="carpool-text-btn"
          aria-pressed={showActual}
          onClick={() => setShowActual((value) => !value)}
        >
          {showActual ? i.actual : i.scheduled}
        </button>
        <dl className="carpool-usage__grid" aria-live="polite">
          <div>
            <dt>{i.pickup}</dt>
            <dd>{showActual ? "09:07" : "09:00"}</dd>
          </div>
          <div>
            <dt>{i.returnLabel}</dt>
            <dd>{showActual ? "16:42" : "17:00"}</dd>
          </div>
        </dl>
        <p className="type-nota text-secondary">{note}</p>
        <p className="type-nota text-secondary">{i.illustrative}</p>
      </div>
    </Frame>
  );
}

export function ServiceZoom({
  labels,
  i,
  steps,
  statement,
  note,
}: {
  labels: Labels;
  i: Interact;
  steps: readonly string[];
  statement: string;
  note: string;
}) {
  const [zoom, setZoom] = useState(0);
  const [manual, setManual] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const max = 2;
  const level = reduce ? max : zoom;

  useEffect(() => {
    if (manual || reduce) return;
    const root = rootRef.current;
    if (!root) return;

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.7;
      const end = viewport * 0.2;
      const progress = (start - rect.top) / (start - end);
      const next = Math.max(0, Math.min(max, Math.round(progress * max)));
      setZoom(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [manual, reduce]);

  return (
    <Frame kind="inference" labels={labels} caption={note}>
      <div className="carpool-zoom" ref={rootRef}>
        <p className="type-nota text-secondary">{i.zoomHint}</p>
        <input
          className="carpool-range"
          type="range"
          min={0}
          max={max}
          value={level}
          aria-label={i.zoomHint}
          onChange={(event) => {
            setManual(true);
            setZoom(Number(event.target.value));
          }}
        />
        <div
          className={`carpool-zoom__stage is-level-${level}${reduce ? " is-static" : ""}`}
        >
          {level === 0 ? (
            <div className="carpool-zoom__ui">
              <p className="type-meta">{i.platformNode}</p>
              <p className="type-corpo">{i.reserve}</p>
            </div>
          ) : null}
          {level >= 1 ? (
            <ol className="carpool-flow carpool-zoom__flow">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className={
                    step.toLowerCase().includes("booking") ||
                    step.toLowerCase().includes("reserva")
                      ? "is-platform"
                      : undefined
                  }
                  style={{
                    transitionDelay: reduce ? "0ms" : `${index * 18}ms`,
                  }}
                >
                  {step}
                </li>
              ))}
            </ol>
          ) : null}
        </div>
        {level === max ? (
          <p className="type-heading" aria-live="polite">
            {statement}
          </p>
        ) : null}
      </div>
    </Frame>
  );
}

export function EvidenceLegend({ labels }: { labels: Labels }) {
  const order: EvidenceKind[] = [
    "research",
    "context",
    "inference",
    "reconstruction",
    "exploration",
  ];
  return (
    <ul className="carpool-legend" aria-label="Evidence labels">
      {order.map((kind) => (
        <li key={kind}>
          <Chip kind={kind} labels={labels} />
        </li>
      ))}
    </ul>
  );
}

export function MethodsStrip({
  methods,
  caveat,
  labels,
}: {
  methods: CarpoolContent["investigation"]["methods"];
  caveat: string;
  labels: Labels;
}) {
  return (
    <Frame kind="research" labels={labels}>
      <ol className="carpool-methods">
        {methods.map((method) => (
          <li key={method.title} className="carpool-methods__item">
            <p className="carpool-methods__title type-meta">{method.title}</p>
            <p className="type-nota text-secondary">{method.detail}</p>
          </li>
        ))}
      </ol>
      <p className="carpool-methods__caveat type-nota type-italic text-secondary">
        {caveat}
      </p>
    </Frame>
  );
}

export function InvestmentFork({
  chainA,
  chainB,
  contextNote,
  labels,
}: {
  chainA: readonly string[];
  chainB: readonly string[];
  contextNote: string;
  labels: Labels;
}) {
  return (
    <Frame kind="context" labels={labels}>
      <div className="carpool-invest">
        <div>
          <ol className="carpool-flow">
            {chainA.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <ol className="carpool-flow is-warn">
            {chainB.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <p className="type-nota type-italic text-secondary">{contextNote}</p>
    </Frame>
  );
}

export function ExplorationGrid({
  items,
  intro,
  labels,
}: {
  items: CarpoolContent["explorations"]["items"];
  intro: string;
  labels: Labels;
}) {
  return (
    <Frame kind="exploration" labels={labels} caption={intro}>
      <ul className="carpool-explore-grid">
        {items.map((item) => (
          <li key={item.title}>
            <p className="type-meta">{item.title}</p>
            <p className="type-nota text-secondary">{item.detail}</p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
