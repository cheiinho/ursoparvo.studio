"use client";

import { useEffect, useRef, useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import { affectedPeriodLabel, isPresent } from "@/content/intraday/derive";
import {
  announceOnChange,
  bannerKey,
  closePanel,
  openPanel,
  ordersVisible,
  shellShowsNext,
} from "@/content/intraday/state";
import type { ShellState, SurfaceId } from "@/content/intraday/types";
import { useAnnounce } from "./Announcer";
import DataTable from "./DataTable";
import ForecastChart from "./ForecastChart";
import InsightsBody from "./InsightsBody";
import { NavIcon } from "./ProductChrome";
import ScheduleList from "./ScheduleList";

type Named = { id: ShellState; label: string; status: string };
type Surface = { id: SurfaceId; label: string };

type Props = {
  region: string;
  product: string;
  reconstruction: string;
  illustrative: string;
  stateGroup: string;
  surfaceGroup: string;
  states: readonly Named[];
  surfaces: readonly Surface[];
  start: string;
  completed: string;
  nothingToReport: string;
  earlier: string;
  applyFilter: string;
  affected: string;
  ordersNote: string;
  filterOff: string;
  preview: string;
  previewReason: string;
  checkInsights: string;
  notifications: string;
  panelHeading: string;
  close: string;
  insightsBody: string;
  present: string;
  absent: string;
  scheduleNote: string;
  periodPrefix: string;
  forecast: string;
  newForecast: string;
  contacts: string;
  empty: string;
  time: string;
  summary: string;
};

function textValue(value: number | null, empty: string): string {
  return value === null ? empty : String(value);
}

export default function ProductShell(props: Props) {
  const [shell, setShell] = useState<ShellState>("watching");
  const [surface, setSurface] = useState<SurfaceId>("forecast");
  const [filterOn, setFilterOn] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const announce = useAnnounce();
  const panelRef = useRef<HTMLParagraphElement>(null);
  const notificationsRef = useRef<HTMLButtonElement>(null);
  const banner = bannerKey(shell);
  const showNext = shellShowsNext(shell);
  const showOrders = ordersVisible(shell, filterOn);
  const surfaceCopy = props.surfaces.find((item) => item.id === surface) ?? props.surfaces[0];
  const axis = dataset.quarters.map((quarter) => quarter.time);
  const working = dataset.quarters.map((quarter) => ({
    time: quarter.time,
    value: showNext ? quarter.next : quarter.previous,
  }));

  useEffect(() => {
    if (!panelOpen) return;
    panelRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setPanelOpen(closePanel().open);
      notificationsRef.current?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  function chooseState(next: ShellState) {
    const status = props.states.find((item) => item.id === next)?.status ?? "";
    const message = announceOnChange(shell, next, status);
    setShell(next);
    if (message) announce(message);
  }

  function chooseSurface(next: SurfaceId) {
    const label = props.surfaces.find((item) => item.id === next)?.label ?? "";
    const message = announceOnChange(surface, next, label);
    setSurface(next);
    if (message) announce(message);
  }

  function toggleFilter(next: boolean) {
    const message = announceOnChange(filterOn, next, next ? props.affected : props.filterOff);
    setFilterOn(next);
    if (message) announce(message);
  }

  function togglePanel() {
    if (panelOpen) {
      setPanelOpen(closePanel().open);
      notificationsRef.current?.focus();
      return;
    }
    setPanelOpen(openPanel().open);
  }

  const notices =
    shell === "watching"
      ? [props.nothingToReport]
      : shell === "inProgress"
        ? [props.start]
        : [props.completed, props.start];
  const visibleTotal = dataset.quarters.reduce((sum, quarter) => {
    const value = showNext ? quarter.next : quarter.previous;
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
  const affectedTimes = dataset.quarters
    .filter((quarter) => quarter.time >= dataset.affected.start && quarter.time < dataset.affected.end)
    .map((quarter) => quarter.time);
  const bandEnd = affectedTimes.at(-1) ?? dataset.affected.start;

  return (
    <div className="intraday-stack">
      <fieldset className="td-statebar">
        <legend className="type-label">{props.stateGroup}</legend>
        <div className="intraday-radios">
          {props.states.map((item) => (
            <label key={item.id}>
              <input
                type="radio"
                name="intraday-shell-state"
                checked={shell === item.id}
                onChange={() => chooseState(item.id)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="type-lede">{props.states.find((item) => item.id === shell)?.status}</p>
      <section className="intraday-ui intraday-frame td-app" aria-labelledby="intraday-surface-name">
        <p className="intraday-recon">{props.reconstruction}</p>
        <div className="td-body">
        <fieldset className="intraday-nav td-nav">
          <legend className="sr-only">{props.surfaceGroup}</legend>
          <p className="td-brand" aria-hidden="true">
            <span className="td-mark" />
            <span>{props.product}</span>
          </p>
          <div className="intraday-nav__list td-nav__list">
            {props.surfaces.map((item) => (
              <label key={item.id}>
                <input
                  type="radio"
                  name="intraday-surface"
                  checked={surface === item.id}
                  onChange={() => chooseSurface(item.id)}
                />
                <NavIcon id={item.id} />
                {item.label}
              </label>
            ))}
            <span className="td-nav__static" aria-hidden="true">
              <NavIcon id="yourSchedule" />
              Your schedule
            </span>
            <span className="td-nav__static" aria-hidden="true">
              <NavIcon id="configurations" />
              Configurations
            </span>
          </div>
        </fieldset>
        <div className="td-main">
        {banner ? (
          <div className={`intraday-banner${banner === "completed" ? " is-done" : ""}`}>
            <span className="intraday-banner__mark" aria-hidden="true">
              {banner === "completed" ? "✓" : "!"}
            </span>
            <div className="intraday-banner__copy">
              <p>{banner === "start" ? props.start : props.completed}</p>
              {shell === "inProgress" && filterOn ? <p className="intraday-banner__meta">{props.affected}</p> : null}
            </div>
            {shell === "inProgress" ? (
              <div className="intraday-banner__actions">
                <label className="intraday-check">
                  <input
                    type="checkbox"
                    checked={filterOn}
                    onChange={(event) => toggleFilter(event.target.checked)}
                  />
                  {props.applyFilter}
                </label>
                <button type="button" disabled aria-describedby="preview-reason">
                  {props.preview}
                </button>
                <p id="preview-reason" className="intraday-banner__meta">
                  {props.previewReason}
                </p>
                {surface === "insights" ? (
                  <button type="button" onClick={() => chooseSurface("insights")}>
                    {props.checkInsights}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="intraday-workspace">
          <header className="td-pagehead">
            <div>
              <p id="intraday-surface-name" className="td-title">
                {surfaceCopy.label}
              </p>
              <p className="td-sub">{dataset.account}</p>
            </div>
            <div className="td-datebar" aria-hidden="true">
              <span className="td-date">{dataset.dateLabel}</span>
              <span className="td-chip">Today</span>
              <span className="td-chip is-on">Week</span>
            </div>
            <div className="td-queues">
              <span className="td-queue is-on">{dataset.queue}</span>
              {showOrders ? <span className="td-queue">{dataset.contrastQueue}</span> : null}
            </div>
            {showOrders ? <p className="intraday-helper">{props.ordersNote}</p> : null}
            <p className="intraday-kicker">
              {props.illustrative}. {dataset.timeZone}
            </p>
          </header>
          {surface === "forecast" ? (
            <div className="intraday-forecast">
              <p className="td-chart-title">Contact volume offered</p>
              <div className="td-kpis" aria-hidden="true">
                <p>
                  <span>{showNext ? props.newForecast : props.forecast}</span>
                  <strong>{visibleTotal}</strong>
                  <em>{props.contacts}</em>
                </p>
              </div>
              <ForecastChart
                patternId="shell-band"
                axis={axis}
                series={[
                  {
                    id: showNext ? "next" : "previous",
                    label: showNext ? props.newForecast : props.forecast,
                    style: "solid",
                    weight: "strong",
                    points: working,
                  },
                ]}
                band={
                  shell === "watching"
                    ? null
                    : {
                        start: dataset.affected.start,
                        end: bandEnd,
                        label: `${dataset.affected.start} to ${dataset.affected.end}`,
                      }
                }
                tone="paper"
                yLabel={props.contacts}
                enter={showNext}
              />
              <DataTable
                caption={props.summary}
                columns={[props.time, showNext ? props.newForecast : props.forecast]}
                rows={dataset.quarters.map((quarter) => [
                  quarter.time,
                  textValue(showNext ? quarter.next : quarter.previous, props.empty),
                ])}
              />
            </div>
          ) : null}
          {surface === "teamSchedule" ? (
            <ScheduleList
              headingId="shell-period"
              heading={affectedPeriodLabel(props.periodPrefix, dataset.affected.start, dataset.affected.end)}
              note={props.scheduleNote}
              affectedStart={dataset.affected.start}
              affectedEnd={dataset.affected.end}
              rows={dataset.people.map((person) => ({
                name: person.name,
                shiftStart: person.shiftStart,
                shiftEnd: person.shiftEnd,
                detail: isPresent(person, dataset.affected.start, dataset.affected.end)
                  ? props.present
                  : props.absent,
              }))}
            />
          ) : null}
          {surface === "insights" ? (
            <InsightsBody
              text={props.insightsBody}
              illustrative={props.illustrative}
              account={dataset.account}
              queue={dataset.queue}
              dateLabel={dataset.dateLabel}
              timeZone={dataset.timeZone}
            />
          ) : null}
        </div>
        <button
          ref={notificationsRef}
          type="button"
          className="intraday-notifications"
          aria-expanded={panelOpen}
          onClick={togglePanel}
        >
          <svg className="td-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 2.2a3.2 3.2 0 0 0-3.2 3.2v2.1L3.4 9.6v.8h9.2v-.8L11.2 7.5V5.4A3.2 3.2 0 0 0 8 2.2zM6.6 11.2a1.4 1.4 0 0 0 2.8 0" />
          </svg>
          {props.notifications}
          {shell !== "watching" ? <span className="td-dot" aria-hidden="true" /> : null}
        </button>
        {panelOpen ? (
          <div className="intraday-panel">
            <p ref={panelRef} tabIndex={-1} className="intraday-panel__title">
              {props.panelHeading}
            </p>
            <ul className="intraday-notices">
              {notices.map((notice, index) => (
                <li key={`${index}-${notice}`}>
                  {shell === "updated" && index === 1 ? (
                    <p className="intraday-kicker">{props.earlier}</p>
                  ) : null}
                  {shell !== "watching" ? <p className="td-notice-time">2 min</p> : null}
                  <p>{notice}</p>
                  {shell !== "watching" ? (
                    <p className="intraday-muted">
                      {dataset.queue}. {dataset.affected.start} to {dataset.affected.end}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <button type="button" onClick={togglePanel}>
              {props.close}
            </button>
          </div>
        ) : null}
        </div>
        </div>
      </section>
    </div>
  );
}
