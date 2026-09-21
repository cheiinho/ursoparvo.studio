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

  return (
    <div className="intraday-stack">
      <fieldset>
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
      <section className="intraday-ui intraday-frame" aria-labelledby="intraday-surface-name">
        <p className="intraday-recon">{props.reconstruction}</p>
        <div className="intraday-appbar">
          <p className="intraday-product">{props.product}</p>
          <p className="intraday-contextline">{dataset.account}</p>
        </div>
        <fieldset className="intraday-nav">
          <legend className="sr-only">{props.surfaceGroup}</legend>
          <div className="intraday-nav__list">
            {props.surfaces.map((item) => (
              <label key={item.id}>
                <input
                  type="radio"
                  name="intraday-surface"
                  checked={surface === item.id}
                  onChange={() => chooseSurface(item.id)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>
        {banner ? (
          <div className="intraday-banner">
            <span className="intraday-banner__mark" aria-hidden="true" />
            <div className="intraday-banner__copy">
              <p>{banner === "start" ? props.start : props.completed}</p>
              {shell === "inProgress" && filterOn ? <p className="intraday-banner__meta">{props.affected}</p> : null}
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
          </div>
        ) : null}
        <div className="intraday-workspace">
          <header className="intraday-pagehead">
            <p id="intraday-surface-name" className="intraday-page-title">
              {surfaceCopy.label}
            </p>
            <p className="intraday-contextline">
              {dataset.dateLabel}. {dataset.timeZone}
            </p>
            <p className="intraday-kicker">{props.illustrative}</p>
          </header>
          {surface === "forecast" ? (
            <div className="intraday-forecast">
              <div className="intraday-chart-scroll">
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
                  tone="paper"
                  yLabel={props.contacts}
                  enter={showNext}
                />
              </div>
              <aside className="intraday-rail">
                <p className="intraday-kicker">{dataset.queue}</p>
                <ul className="intraday-queues">
                  <li>
                    <span>{dataset.queue}</span>
                  </li>
                  {showOrders ? (
                    <li>
                      <span>{dataset.contrastQueue}</span>
                      <span className="intraday-muted">{props.ordersNote}</span>
                    </li>
                  ) : null}
                </ul>
              </aside>
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
          {props.notifications}
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
      </section>
    </div>
  );
}
