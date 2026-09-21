"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";
import ProductChrome from "./ProductChrome";

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
    <section className="intraday-ui intraday-settings td-app" aria-label={region}>
      <div className="intraday-frame-note">
        <p className="intraday-recon">{reconstruction}</p>
        <p>{sentence}</p>
      </div>
      <ProductChrome product={product} active="configurations">
        <form className="td-form" onSubmit={(event) => event.preventDefault()}>
          <header className="td-pagehead">
            <div>
              <p className="td-eyebrow">{queueLabel}</p>
              <p className="td-title">{dataset.queue}</p>
            </div>
            <p className="td-sub">
              {accountLabel}: {dataset.account}. {dataset.dateLabel}. {dataset.timeZone}
            </p>
            <p className="intraday-kicker">{illustrative}</p>
          </header>
          <div className={`td-change${on ? " is-on" : ""}`}>
            <p className="td-change__title">Reforecast</p>
            <label className="intraday-check td-switch">
              <input
                type="checkbox"
                checked={on}
                onChange={(event) => setOn(event.target.checked)}
                aria-describedby="reforecast-helper"
              />
              {control}
            </label>
            <p id="reforecast-helper" className="intraday-helper">
              {helper}
            </p>
            {on ? <p className="intraday-online">{onLine}</p> : null}
          </div>
          <div className="td-form__existing">
            <p className="td-section">{disclosure}</p>
            <p className="intraday-helper">{existingNote}</p>
            <label className="td-field">
              <span>
                {serviceLevel} <abbr title="required">*</abbr>
              </span>
              <input disabled readOnly value={existingValue} />
              <span className="intraday-helper">
                Interactions answered within this percentage threshold will be considered as meeting service level.
              </span>
            </label>
            <label className="td-field">
              <span>
                Service level goal <abbr title="required">*</abbr>
              </span>
              <input disabled readOnly value="20 minutes" />
              <span className="intraday-helper">
                With this service level time the queue is treated as immediate, for example a phone channel.
                Interactions answered within this time threshold will be considered as meeting service level.
              </span>
            </label>
            <label className="td-field">
              <span>
                {patience} <abbr title="required">*</abbr>
              </span>
              <input disabled readOnly value="35 seconds" />
              <span className="intraday-helper">
                Interactions that wait longer than this time threshold will be assumed to be abandoned.
              </span>
            </label>
            <label className="td-field">
              <span>
                {shrinkage} <abbr title="required">*</abbr>
              </span>
              <input disabled readOnly value="5%" />
              <span className="intraday-helper">
                Percentage of scheduled staffing that will be lost to unplanned activities.
              </span>
            </label>
            <p className="td-section">Queue options</p>
            {QUEUE_OPTIONS.map((option) => (
              <div key={option.title} className="td-option">
                <p className="td-option__title">{option.title}</p>
                <label className="intraday-check">
                  <input type="checkbox" disabled />
                  {option.control}
                </label>
                <p className="intraday-helper">{option.helper}</p>
              </div>
            ))}
          </div>
        </form>
      </ProductChrome>
    </section>
  );
}
