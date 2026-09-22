"use client";

import { useEffect, useRef } from "react";
import { dataset } from "@/content/intraday/dataset";
import { affectedPeriodLabel, isPresent, periodSpan } from "@/content/intraday/derive";
import type { IntradayContent, PlaceId } from "@/content/intraday/types";
import { useAnnounce } from "./Announcer";
import ConfigSurface from "./ConfigSurface";
import ForecastSurface from "./ForecastSurface";
import { Glyph } from "./icons";
import InsightsBody from "./InsightsBody";
import IssuesSurface from "./IssuesSurface";
import ScheduleList from "./ScheduleList";
import { useExperience } from "./store";

const PLACES: ReadonlyArray<{ id: PlaceId; label: string }> = [
  { id: "forecast", label: "Forecast" },
  { id: "issues", label: "Forecasting issues" },
  { id: "teamSchedule", label: "Team schedule" },
  { id: "insights", label: "Insights" },
  { id: "configurations", label: "Configurations" },
];

export default function WfmApp({ content }: { content: IntradayContent }) {
  const {
    phase,
    place,
    shell,
    unread,
    panelOpen,
    setPanel,
    setPlace,
    destination,
    filterOn,
    setFilter,
  } = useExperience();
  const announce = useAnnounce();
  const bellRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLParagraphElement>(null);
  const two = content.decisionTwo;
  const three = content.decisionThree;
  const span = periodSpan(dataset.affected.start, dataset.affected.end);
  const stateName = content.system.steps[phase - 1]?.stateName ?? "";
  const clock = content.system.steps[phase - 1]?.clock ?? "";
  const running = phase === 4;
  const banner = phase === 4 ? "start" : phase >= 5 ? "completed" : null;

  useEffect(() => {
    if (!panelOpen) return;
    panelRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setPanel(false);
      bellRef.current?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panelOpen, setPanel]);

  useEffect(() => {
    if (!destination) return;
    const id = destination === "forecast" ? "issue-forecast-period" : "issue-schedule-period";
    const node = document.getElementById(id);
    if (!node) return;
    node.focus();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [destination]);

  function go(next: PlaceId) {
    if (next === place) return;
    setPlace(next);
    announce(PLACES.find((item) => item.id === next)?.label ?? "");
  }

  function toggleFilter(next: boolean) {
    setFilter(next);
    announce(next ? two.affected : two.filterOff);
  }

  const notices =
    phase < 4 ? [two.nothingToReport] : phase === 4 ? [two.start] : [two.completed, two.start];

  return (
    <div className="intraday-ui pwin" aria-label={content.frame.region}>
      <header className="pwin__bar">
        <p className="pwin__brand">
          <span className="pwin__mark" aria-hidden="true" />
          {content.frame.product}
        </p>
        <p className="pwin__ws">
          <span className="pwin__ws-dot" aria-hidden="true" />
          {dataset.account}
        </p>
        <div className="pwin__tools">
          <button
            ref={bellRef}
            type="button"
            className={`pbell${unread ? " is-unread" : ""}`}
            aria-expanded={panelOpen}
            onClick={() => setPanel(!panelOpen)}
          >
            <Glyph name="bell" />
            <span className="pbell__text">{two.notifications}</span>
            {unread ? <span className="pbell__dot" aria-hidden="true" /> : null}
          </button>
          <span className="pwin__avatar" aria-hidden="true">
            RP
          </span>
        </div>
        {panelOpen ? (
          <div className="ppanel" role="dialog" aria-label={two.panelHeading}>
            <p ref={panelRef} tabIndex={-1} className="ppanel__title">
              {two.panelHeading}
            </p>
            <ul className="ppanel__list">
              {notices.map((notice, index) => (
                <li key={notice} className={phase >= 5 && index === 1 ? "is-earlier" : undefined}>
                  {phase >= 5 && index === 1 ? <p className="peyebrow">{two.earlier}</p> : null}
                  <p className="ppanel__text">{notice}</p>
                  {phase >= 4 ? (
                    <p className="phelp">
                      {dataset.queue}. {span}
                    </p>
                  ) : null}
                  {phase >= 5 && index === 0 ? (
                    <button
                      type="button"
                      className="pbtn pbtn--quiet ppanel__cta"
                      onClick={() => {
                        setPanel(false);
                        go("forecast");
                      }}
                    >
                      View forecast
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
            <button type="button" className="pbtn pbtn--quiet" onClick={() => setPanel(false)}>
              {two.close}
            </button>
          </div>
        ) : null}
      </header>

      <div className="pwin__body">
        <nav className="pnav" aria-label={content.frame.product}>
          <ul>
            {PLACES.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={place === item.id ? "is-current" : undefined}
                  aria-current={place === item.id ? "page" : undefined}
                  onClick={() => go(item.id)}
                >
                  <Glyph name={item.id} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pmain">
          <div className={`psystem psystem--${shell}${running ? " is-running" : ""}`}>
            <span className="psystem__dot" aria-hidden="true" />
            <strong>{stateName}</strong>
            <span className="psystem__meta">
              {phase >= 4 ? `${dataset.queue}. ${span}` : clock}
            </span>
            {running ? <span className="psystem__bar" aria-hidden="true" /> : null}
          </div>

          {banner ? (
            <div className={`pbanner${banner === "completed" ? " is-done" : ""}`}>
              <span className="pbanner__icon" aria-hidden="true">
                <Glyph name={banner === "completed" ? "check" : "alert"} />
              </span>
              <div className="pbanner__copy">
                <p className="pbanner__text">{banner === "start" ? two.start : two.completed}</p>
                <p className="phelp">
                  {two.affected} {span}
                </p>
              </div>
              <div className="pbanner__actions">
                {banner === "start" ? (
                  <>
                    <label className="pcheck">
                      <input
                        type="checkbox"
                        checked={filterOn}
                        onChange={(event) => toggleFilter(event.target.checked)}
                      />
                      {two.applyFilter}
                    </label>
                    <button type="button" className="pbtn" disabled aria-describedby="preview-reason">
                      {two.preview}
                    </button>
                    <p id="preview-reason" className="phelp">
                      {two.previewReason}
                    </p>
                    {place === "insights" ? (
                      <button type="button" className="pbtn" onClick={() => go("insights")}>
                        {two.checkInsights}
                      </button>
                    ) : null}
                  </>
                ) : place === "issues" ? null : (
                  <button type="button" className="pbtn pbtn--primary" onClick={() => go("issues")}>
                    Forecasting issues
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {place === "forecast" ? <ForecastSurface content={content} /> : null}
          {place === "issues" ? <IssuesSurface content={content} /> : null}
          {place === "configurations" ? <ConfigSurface content={content} /> : null}

          {place === "teamSchedule" ? (
            <div className="psurface">
              <header className="psurface__head">
                <div className="psurface__title">
                  <p className="peyebrow">
                    {dataset.queue}. {dataset.dateLabel}. {dataset.timeZone}
                  </p>
                  <h3>{two.surfaces[1].label}</h3>
                </div>
              </header>
              {destination === "schedule" ? (
                <div className="pfocus">
                  <div>
                    <p className="peyebrow">{dataset.queue}</p>
                    <h3 id="issue-schedule-period" tabIndex={-1} className="pfocus__title">
                      {affectedPeriodLabel(
                        three.periodPrefix,
                        dataset.affected.start,
                        dataset.affected.end,
                      )}
                    </h3>
                  </div>
                  <button type="button" className="pbtn pbtn--quiet" onClick={() => go("issues")}>
                    <Glyph name="back" />
                    Forecasting issues
                  </button>
                </div>
              ) : null}
              <ScheduleList
                showHeading={destination !== "schedule"}
                headingId="schedule-period"
                heading={affectedPeriodLabel(
                  three.periodPrefix,
                  dataset.affected.start,
                  dataset.affected.end,
                )}
                note={three.scheduleNote}
                affectedStart={dataset.affected.start}
                affectedEnd={dataset.affected.end}
                rows={dataset.people.map((person) => ({
                  name: person.name,
                  shiftStart: person.shiftStart,
                  shiftEnd: person.shiftEnd,
                  detail: isPresent(person, dataset.affected.start, dataset.affected.end)
                    ? two.present
                    : two.absent,
                }))}
              />
            </div>
          ) : null}

          {place === "insights" ? (
            <div className="psurface">
              <header className="psurface__head">
                <div className="psurface__title">
                  <p className="peyebrow">
                    {dataset.account}. {dataset.dateLabel}
                  </p>
                  <h3>{two.surfaces[2].label}</h3>
                </div>
              </header>
              <InsightsBody
                text={two.insightsBody}
                illustrative={content.labels.illustrative}
                account={dataset.account}
                queue={dataset.queue}
                dateLabel={dataset.dateLabel}
                timeZone={dataset.timeZone}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
