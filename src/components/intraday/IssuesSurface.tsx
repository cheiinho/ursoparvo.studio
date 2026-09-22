"use client";

import { dataset } from "@/content/intraday/dataset";
import { periodSpan } from "@/content/intraday/derive";
import type { IntradayContent } from "@/content/intraday/types";
import { Glyph } from "./icons";
import { useAnnounce } from "./Announcer";
import { useExperience } from "./store";

export default function IssuesSurface({ content }: { content: IntradayContent }) {
  const { openPeriod } = useExperience();
  const announce = useAnnounce();
  const span = periodSpan(dataset.affected.start, dataset.affected.end);
  const three = content.decisionThree;

  function open(destination: "forecast" | "schedule") {
    openPeriod(destination);
    announce(destination === "forecast" ? three.showForecast : three.showSchedule);
  }

  return (
    <div className="psurface">
      <header className="psurface__head">
        <div className="psurface__title">
          <p className="peyebrow">
            {dataset.dateLabel}. {dataset.timeZone}
          </p>
          <h4>Forecasting issues</h4>
        </div>
        <div className="psurface__scope">
          <div className="pseg" aria-hidden="true">
            <span className="is-on">Open</span>
            <span>All</span>
          </div>
        </div>
      </header>

      <article className="pissue">
        <div className="pissue__head">
          <p className="pissue__queue">{dataset.queue}</p>
          <p className="pchip pchip--period">{span}</p>
          <p className="pchip">Contact volume</p>
        </div>
        <p className="pissue__body">{three.issue}</p>
        <dl className="pfacts">
          <div>
            <dt>{content.decisionOne.queueLabel}</dt>
            <dd>{dataset.queue}</dd>
          </div>
          <div>
            <dt>{three.columns.time}</dt>
            <dd>{span}</dd>
          </div>
          <div>
            <dt>Signal</dt>
            <dd>Contact volume</dd>
          </div>
        </dl>
        <div className="pactions">
          <button type="button" className="pbtn pbtn--primary" onClick={() => open("forecast")}>
            {three.showForecast}
            <Glyph name="forecast" />
          </button>
          <button type="button" className="pbtn" onClick={() => open("schedule")}>
            {three.showSchedule}
            <Glyph name="teamSchedule" />
          </button>
        </div>
      </article>

      <p className="pnote">{three.severity}</p>
    </div>
  );
}
