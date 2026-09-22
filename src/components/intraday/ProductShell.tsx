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
import { AppBar, NavIcon } from "./ProductChrome";
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

  const marked = affectedTimes;

  return (
    <div className="intraday-stack">
      <fieldset className="wfm-states">
        <legend className="type-label">{props.stateGroup}</legend>
        <div className="wfm-segments">
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
      <section className="intraday-ui intraday-frame wfm" aria-labelledby="intraday-surface-name">
        <p className="intraday-recon">{props.reconstruction}</p>
        <div className="wfm-app">
          <AppBar product={props.product} section={surfaceCopy.label} context={dataset.account}>
            <button
              ref={notificationsRef}
              type="button"
              className="wfm-bell"
              aria-expanded={panelOpen}
              onClick={togglePanel}
            >
              <NavIcon id="bell" />
              {props.notifications}
              {shell !== "watching" ? <span className="wfm-dot" aria-hidden="true" /> : null}
            </button>
          </AppBar>
          <div className="wfm-body">
            <fieldset className="intraday-nav wfm-rail">
              <legend className="sr-only">{props.surfaceGroup}</legend>
              <div className="wfm-rail__list">
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
              </div>
            </fieldset>
            <div className="wfm-stage">
              {banner ? (
                <div className={`wfm-banner${banner === "completed" ? " is-done" : ""}`}>
                  <span className="wfm-banner__icon" aria-hidden="true">
                    {banner === "completed" ? "✓" : "!"}
                  </span>
                  <div className="wfm-banner__copy">
                    <p>{banner === "start" ? props.start : props.completed}</p>
                    {shell === "inProgress" && filterOn ? <p className="wfm-help">{props.affected}</p> : null}
                  </div>
                  {shell === "inProgress" ? (
                    <div className="wfm-banner__actions">
                      <label className="wfm-check">
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
                      <p id="preview-reason" className="wfm-help">
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
              <header className="wfm-pagehead">
                <div>
                  <p id="intraday-surface-name" className="wfm-title">
                    {surfaceCopy.label}
                  </p>
                  <p className="wfm-meta">
                    {props.illustrative}. {dataset.timeZone}
                  </p>
                </div>
                <div className="wfm-scope" aria-hidden="true">
                  <span className="wfm-scope__date">{dataset.dateLabel}</span>
                  <span className="is-on">Today</span>
                  <span>Week</span>
                </div>
                <div className="wfm-queues">
                  <span className="is-on">{dataset.queue}</span>
                  {showOrders ? <span>{dataset.contrastQueue}</span> : null}
                </div>
                {surface === "forecast" ? (
                  <div className="wfm-series" aria-hidden="true">
                    <span className="is-on">Contact volume offered</span>
                    <span>Handle time</span>
                    <span>Staff</span>
                  </div>
                ) : null}
                {showOrders ? <p className="wfm-help">{props.ordersNote}</p> : null}
              </header>
              {surface === "forecast" ? (
                <div className="wfm-forecast">
                  <div className="wfm-metric" aria-hidden="true">
                    <p>Contact volume offered</p>
                    <p>{showNext ? props.newForecast : props.forecast}</p>
                    <p>
                      <strong>{visibleTotal.toLocaleString("en-GB")}</strong>
                      <span>{props.contacts}</span>
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
                mark={marked}
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
          </div>
          {panelOpen ? (
            <div className="intraday-panel wfm-sheet">
              <p ref={panelRef} tabIndex={-1} className="wfm-sheet__title">
                {props.panelHeading}
              </p>
              <ul className="wfm-notices">
                {notices.map((notice, index) => (
                  <li key={`${index}-${notice}`}>
                    {shell === "updated" && index === 1 ? <p className="wfm-kicker">{props.earlier}</p> : null}
                    <p>{notice}</p>
                    {shell !== "watching" ? (
                      <p className="wfm-help">
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
      </section>
    </div>
  );
}
