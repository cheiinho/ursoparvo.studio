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
import EvidenceLabel from "./EvidenceLabel";
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
        <p className="intraday-recon type-label">{props.reconstruction}</p>
        <div className="intraday-bar">
          <p className="type-label">{props.product}</p>
          <p id="intraday-surface-name" className="type-label">
            {surfaceCopy.label}
          </p>
        </div>
        <fieldset className="intraday-surfaces intraday-body">
          <legend className="type-label">{props.surfaceGroup}</legend>
          <div className="intraday-radios">
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
            <p className="type-lede">{banner === "start" ? props.start : props.completed}</p>
            {shell === "inProgress" ? (
              <div className="intraday-actions">
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
                <p id="preview-reason" className="type-nota">
                  {props.previewReason}
                </p>
                {surface === "insights" ? (
                  <button type="button" onClick={() => chooseSurface("insights")}>
                    {props.checkInsights}
                  </button>
                ) : null}
              </div>
            ) : null}
            {shell === "inProgress" && filterOn ? <p className="type-nota">{props.affected}</p> : null}
          </div>
        ) : null}
        <div className="intraday-body">
          {surface === "forecast" ? (
            <>
              <EvidenceLabel kind="illustrative" text={props.illustrative} />
              <p className="type-nota">
                {dataset.account}. {dataset.dateLabel}. {dataset.timeZone}.
              </p>
              <p className="type-nota">{props.summary}</p>
              <ForecastChart
                patternId="shell-band"
                axis={axis}
                series={[
                  {
                    id: showNext ? "next" : "previous",
                    label: showNext ? props.newForecast : props.forecast,
                    style: "solid",
                    weight: showNext ? "strong" : "regular",
                    points: working,
                  },
                ]}
                tone="paper"
                yLabel={props.contacts}
                enter={showNext}
              />
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
              <DataTable
                caption={props.summary}
                columns={[props.time, showNext ? props.newForecast : props.forecast]}
                rows={dataset.quarters.map((quarter) => [
                  quarter.time,
                  textValue(showNext ? quarter.next : quarter.previous, props.empty),
                ])}
              />
            </>
          ) : null}
          {surface === "teamSchedule" ? (
            <ScheduleList
              headingId="shell-period"
              heading={affectedPeriodLabel(props.periodPrefix, dataset.affected.start, dataset.affected.end)}
              note={props.scheduleNote}
              rows={dataset.people.map((person) => ({
                name: person.name,
                detail: isPresent(person, dataset.affected.start, dataset.affected.end)
                  ? props.present
                  : props.absent,
              }))}
            />
          ) : null}
          {surface === "insights" ? <InsightsBody text={props.insightsBody} /> : null}
        </div>
        <button
          ref={notificationsRef}
          type="button"
          className="intraday-notifications"
          onClick={togglePanel}
        >
          {props.notifications}
        </button>
        {panelOpen ? (
          <div className="intraday-panel">
            <p ref={panelRef} tabIndex={-1} className="type-label">
              {props.panelHeading}
            </p>
            <ul>
              {notices.map((notice, index) => (
                <li key={notice}>
                  {shell === "updated" && index === 1 ? (
                    <span className="type-label">{props.earlier}. </span>
                  ) : null}
                  {notice}
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
