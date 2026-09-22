"use client";

import { useState } from "react";
import type { CarpoolContent } from "@/content/carpool/types";
import { Frame, StatePill, type Labels, type State } from "./CarpoolPrimitives";

type Ui = CarpoolContent["ui"];

/* ------------------------------------------------------------------ */
/* 04 Finding a car                                                    */
/* ------------------------------------------------------------------ */

type Row = { name: string; state: "usable" | "preparing" | "listed" };

function rowsFor(
  day: CarpoolContent["finding"]["mock"]["states"][number],
  names: Ui["vehicleNames"],
): Row[] {
  const states: Row["state"][] = [
    ...Array<Row["state"]>(day.free).fill("usable"),
    ...Array<Row["state"]>(day.preparing).fill("preparing"),
    ...Array<Row["state"]>(day.listed).fill("listed"),
  ];
  return names.map((name, index) => ({ name, state: states[index] ?? "listed" }));
}

const ROW_TONE: Record<Row["state"], State> = {
  usable: "available",
  preparing: "preparing",
  listed: "muted",
};

export function FindVehicleMock({
  content,
  labels,
  ui,
}: {
  content: CarpoolContent["finding"]["mock"];
  labels: Labels;
  ui: Ui;
}) {
  const [day, setDay] = useState(0);
  const [sawEmpty, setSawEmpty] = useState(false);
  const state = content.states[day];
  const rows = rowsFor(state, ui.vehicleNames);
  const rowLabel: Record<Row["state"], string> = {
    usable: content.usable,
    preparing: content.preparing,
    listed: content.listed,
  };

  const select = (index: number) => {
    setDay(index);
    if (content.states[index].free === 0) setSawEmpty(true);
  };

  return (
    <Frame kind="reconstruction" labels={labels} title={content.title}>
      <div className="cp-find">
        <div className="cp-find__days" role="group" aria-label={content.selectDay}>
          {content.days.map((label, index) => (
            <button
              key={label}
              type="button"
              className={index === day ? "cp-day is-active" : "cp-day"}
              data-usable={content.states[index].free > 0 ? "yes" : "no"}
              aria-pressed={index === day}
              onClick={() => select(index)}
            >
              <span>{label}</span>
              <span className="cp-day__mark" aria-hidden="true" />
            </button>
          ))}
        </div>

        <ul className="cp-find__list" aria-live="polite">
          {rows.map((row) => (
            <li key={row.name} className={`cp-row is-${row.state}`}>
              <span className="cp-row__name">{row.name}</span>
              <StatePill state={ROW_TONE[row.state]}>{rowLabel[row.state]}</StatePill>
            </li>
          ))}
        </ul>

        <div className="cp-find__foot">
          <p className="type-nota" role="status">
            {state.free === 0 ? content.empty : `${state.free} ${content.usable.toLowerCase()}`}
          </p>
          <button
            type="button"
            className="cp-text-btn"
            onClick={() => select((day + 1) % content.days.length)}
          >
            {content.tryAnotherDay} →
          </button>
        </div>

        <p className={`cp-find__punch type-heading${sawEmpty ? " is-live" : ""}`} aria-hidden={!sawEmpty}>
          {content.punch}
        </p>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 08 Work ≠ leisure                                                   */
/* ------------------------------------------------------------------ */

export function IntentMock({
  content,
  labels,
}: {
  content: CarpoolContent["intents"];
  labels: Labels;
}) {
  const [mode, setMode] = useState<"work" | "leisure">("work");
  const active = mode === "work" ? content.work : content.leisure;

  return (
    <Frame kind="exploration" labels={labels} caption={content.caveat}>
      <div className={`cp-intent is-${mode}`}>
        <div className="cp-toggle" role="group" aria-label={content.headline}>
          {(["work", "leisure"] as const).map((key) => (
            <button
              key={key}
              type="button"
              className={mode === key ? "is-active" : undefined}
              aria-pressed={mode === key}
              onClick={() => setMode(key)}
            >
              {content[key].label}
            </button>
          ))}
        </div>
        <div className="cp-intent__search" key={mode}>
          <span className="cp-intent__query type-heading">{active.query}</span>
          <span className="cp-intent__result type-nota text-secondary">{active.result}</span>
        </div>
        <ul className="cp-intent__traits" aria-live="polite">
          {active.traits.map((trait) => (
            <li key={trait} className="type-label">
              {trait}
            </li>
          ))}
        </ul>
        <p className="cp-intent__rec type-nota">{content.recommendation}</p>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 10 Booking history                                                  */
/* ------------------------------------------------------------------ */

const TAB_TONE: readonly State[] = ["available", "ready", "muted", "cancelled"];

export function HistoryMock({
  content,
  labels,
  ui,
}: {
  content: CarpoolContent["history"];
  labels: Labels;
  ui: Ui;
}) {
  const [view, setView] = useState<"original" | "exploration">("original");
  const [tab, setTab] = useState(2);
  const isOriginal = view === "original";

  const switchView = (next: typeof view) => {
    setView(next);
    setTab(next === "original" ? 2 : 0);
  };

  return (
    <Frame
      kind={isOriginal ? "reconstruction" : "exploration"}
      labels={labels}
      title={isOriginal ? content.views.original : content.views.exploration}
      caption={content.note}
    >
      <div className={`cp-history is-${view}`}>
        <div className="cp-toggle" role="group" aria-label={content.headline}>
          <button
            type="button"
            className={isOriginal ? "is-active" : undefined}
            aria-pressed={isOriginal}
            onClick={() => switchView("original")}
          >
            {content.views.original}
          </button>
          <button
            type="button"
            className={!isOriginal ? "is-active" : undefined}
            aria-pressed={!isOriginal}
            onClick={() => switchView("exploration")}
          >
            {content.views.exploration}
          </button>
        </div>

        {!isOriginal ? (
          <div className="cp-history__next">
            <span className="type-label text-secondary">{content.nextLabel}</span>
            <span className="type-heading">{content.booking.vehicle}</span>
            <span className="type-nota">{content.booking.when}</span>
            <StatePill state="available">{content.booking.statuses[0]}</StatePill>
          </div>
        ) : null}

        <div className="cp-tabs" role="tablist" aria-label={content.headline}>
          {content.tabs.map((label, index) => (
            <button
              key={label}
              type="button"
              role="tab"
              id={`cp-tab-${index}`}
              aria-selected={tab === index}
              aria-controls="cp-tabpanel"
              tabIndex={tab === index ? 0 : -1}
              className={tab === index ? "is-active" : undefined}
              onClick={() => setTab(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") setTab((tab + 1) % content.tabs.length);
                if (event.key === "ArrowLeft")
                  setTab((tab - 1 + content.tabs.length) % content.tabs.length);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div id="cp-tabpanel" role="tabpanel" aria-labelledby={`cp-tab-${tab}`} className="cp-history__panel">
          {tab === 0 ? (
            <div className="cp-row cp-row--history">
              <span className="cp-row__name">{content.booking.vehicle}</span>
              <span className="cp-row__when type-nota text-secondary">{content.booking.when}</span>
              <StatePill state={TAB_TONE[0]}>{content.booking.statuses[0]}</StatePill>
            </div>
          ) : tab === 2 ? (
            <div className="cp-row cp-row--history is-listed">
              <span className="cp-row__name">{ui.vehicleNames[2]}</span>
              <span className="cp-row__when type-nota text-secondary">{content.booking.pastWhen}</span>
              <StatePill state={TAB_TONE[2]}>{content.booking.statuses[2]}</StatePill>
            </div>
          ) : (
            <p className="cp-history__empty type-nota text-secondary">{content.empty}</p>
          )}
          {isOriginal && tab !== 0 ? (
            <p className="cp-history__hidden type-nota">{content.hiddenHint}</p>
          ) : null}
        </div>
      </div>
    </Frame>
  );
}
