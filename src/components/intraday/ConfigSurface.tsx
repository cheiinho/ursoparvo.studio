"use client";

import { dataset } from "@/content/intraday/dataset";
import type { IntradayContent } from "@/content/intraday/types";
import WfmSwitch from "./WfmSwitch";
import { useExperience } from "./store";

const QUEUE_OPTIONS = [
  {
    title: "Minimum staffing",
    control: "Schedule agents to work when there is no interaction volume",
    helper: "If enabled, agents will be scheduled to work when there is no interaction volume on the queue.",
  },
  {
    title: "Concurrent interaction handling",
    control: "Enable simultaneous interactions",
    helper:
      "If enabled, agents can be set on the agent properties page to handle multiple interactions on this queue simultaneously.",
  },
  {
    title: "Collect live metrics from the contact centre",
    control: "Enable collection of live metrics",
    helper:
      "If enabled, live metrics are collected every 15 min. For external queues, this setting should be disabled.",
  },
  {
    title: "Business hours",
    control: "Enable business hours",
    helper:
      "If enabled, interaction volume offered is 0 outside business hours for an immediate queue. For a deferred queue, staffing requirements are not placed outside business hours. If disabled, the queue is available 24/7.",
  },
] as const;

export default function ConfigSurface({ content }: { content: IntradayContent }) {
  const { reforecastOn, setReforecast } = useExperience();
  const one = content.decisionOne;
  const [serviceLevel, patience, shrinkage] = one.fields;

  return (
    <div className="psurface">
      <header className="psurface__head">
        <div className="psurface__title">
          <p className="peyebrow">Configurations. {one.queueLabel}</p>
          <h4>{dataset.queue}</h4>
        </div>
        <p className="pchip">{reforecastOn ? "Reforecast on" : "Reforecast off"}</p>
      </header>

      <form className="pform" onSubmit={(event) => event.preventDefault()}>
        <div className={`phero${reforecastOn ? " is-on" : ""}`}>
          <div>
            <p className="peyebrow">Reforecast</p>
            <p id="reforecast-label" className="phero__label">
              {one.control}
            </p>
            <p id="reforecast-helper" className="phelp">
              {one.helper}
            </p>
          </div>
          <WfmSwitch
            checked={reforecastOn}
            onChange={setReforecast}
            label={one.control}
            labelledBy="reforecast-label"
            describedBy="reforecast-helper"
          />
        </div>

        <details className="psecondary">
          <summary>{one.disclosure}</summary>
          <div className="psettings">
            <p className="phelp">{one.existingNote}</p>
            {[serviceLevel, patience, shrinkage].map((field) => (
              <label key={field} className="psetting">
                <span className="psetting__label">{field}</span>
                <input disabled readOnly value={one.existingValue} />
              </label>
            ))}
            {QUEUE_OPTIONS.map((option) => (
              <div key={option.title} className="psetting">
                <span className="psetting__label">{option.title}</span>
                <p className="phelp">{option.helper}</p>
                <WfmSwitch checked={false} onChange={() => {}} label={option.control} disabled />
              </div>
            ))}
          </div>
        </details>
      </form>
    </div>
  );
}
