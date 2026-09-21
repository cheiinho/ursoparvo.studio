"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import ProductChrome from "./ProductChrome";
import WfmSwitch from "./WfmSwitch";

type Props = {
  region: string;
  product: string;
  reconstruction: string;
  sentence: string;
  illustrative: string;
  accountLabel: string;
  queueLabel: string;
  control: string;
  helper: string;
  onLine: string;
  existingNote: string;
  existingValue: string;
  fields: readonly [string, string, string];
  disclosure: string;
};

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

export default function QueueSwitch({
  region,
  product,
  reconstruction,
  sentence,
  illustrative,
  accountLabel,
  queueLabel,
  control,
  helper,
  onLine,
  existingNote,
  existingValue,
  fields,
  disclosure,
}: Props) {
  const [on, setOn] = useState(false);
  const [serviceLevel, patience, shrinkage] = fields;

  return (
    <section className="intraday-ui intraday-settings wfm" aria-label={region}>
      <div className="intraday-frame-note">
        <p className="intraday-recon">{reconstruction}</p>
        <p>{sentence}</p>
        {on ? <p>{onLine}</p> : null}
      </div>
      <ProductChrome
        product={product}
        section={queueLabel}
        context={`${accountLabel}: ${dataset.account}`}
      >
        <form className="wfm-form" onSubmit={(event) => event.preventDefault()}>
          <header className="wfm-pagehead">
            <div>
              <p className="wfm-kicker">{queueLabel}</p>
              <p className="wfm-title">{dataset.queue}</p>
            </div>
            <p className="wfm-meta">
              {dataset.dateLabel}. {dataset.timeZone}. {illustrative}
            </p>
          </header>
          <div className={`wfm-setting wfm-setting--hero${on ? " is-on" : ""}`}>
            <div>
              <p className="wfm-kicker">Reforecast</p>
              <p id="reforecast-label" className="wfm-setting__label">
                {control}
              </p>
              <p id="reforecast-helper" className="wfm-help">
                {helper}
              </p>
            </div>
            <WfmSwitch
              checked={on}
              onChange={setOn}
              label={control}
              labelledBy="reforecast-label"
              describedBy="reforecast-helper"
            />
          </div>
          <div className="wfm-settings">
            <p className="wfm-section">{disclosure}</p>
            <p className="wfm-help">{existingNote}</p>
            <label className="wfm-setting">
              <span className="wfm-setting__label">
                {serviceLevel} <abbr title="required">*</abbr>
              </span>
              <input disabled readOnly value={existingValue} />
              <span className="wfm-help">
                Interactions answered within this percentage threshold will be considered as meeting service level.
              </span>
            </label>
            <label className="wfm-setting">
              <span className="wfm-setting__label">
                Service level goal <abbr title="required">*</abbr>
              </span>
              <input disabled readOnly value="20 minutes" />
              <span className="wfm-help">
                With this service level time the queue is treated as immediate, for example a phone channel.
                Interactions answered within this time threshold will be considered as meeting service level.
              </span>
            </label>
            <label className="wfm-setting">
              <span className="wfm-setting__label">
                {patience} <abbr title="required">*</abbr>
              </span>
              <input disabled readOnly value="35 seconds" />
              <span className="wfm-help">
                Interactions that wait longer than this time threshold will be assumed to be abandoned.
              </span>
            </label>
            <label className="wfm-setting">
              <span className="wfm-setting__label">
                {shrinkage} <abbr title="required">*</abbr>
              </span>
              <input disabled readOnly value="5%" />
              <span className="wfm-help">
                Percentage of scheduled staffing that will be lost to unplanned activities.
              </span>
            </label>
            <p className="wfm-section">Queue options</p>
            {QUEUE_OPTIONS.map((option) => (
              <div key={option.title} className="wfm-setting">
                <div>
                  <p className="wfm-setting__label">{option.title}</p>
                  <label className="wfm-check">
                    <input type="checkbox" disabled />
                    {option.control}
                  </label>
                  <p className="wfm-help">{option.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </form>
      </ProductChrome>
    </section>
  );
}
