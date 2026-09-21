"use client";

import { useState } from "react";
import { dataset } from "@/content/intraday/dataset";

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

  return (
    <section className="intraday-ui intraday-settings" aria-label={region}>
      <div className="intraday-frame-note">
        <p className="intraday-recon">{reconstruction}</p>
        <p>{sentence}</p>
      </div>
      <div className="intraday-appbar">
        <p className="intraday-product">{product}</p>
        <p className="intraday-contextline">
          {accountLabel}: {dataset.account}
        </p>
      </div>
      <form className="intraday-workspace" onSubmit={(event) => event.preventDefault()}>
        <header className="intraday-pagehead">
          <p className="intraday-page-title">{dataset.queue}</p>
          <p className="intraday-contextline">
            {dataset.dateLabel}. {dataset.timeZone}
          </p>
          <p className="intraday-kicker">{illustrative}</p>
        </header>
        <div className="intraday-setting intraday-setting--hero">
          <div>
            <p className="intraday-kicker">{queueLabel}</p>
            <label className="intraday-check">
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
        </div>
        <details className="intraday-settings__existing">
          <summary>{disclosure}</summary>
          <p className="intraday-helper">{existingNote}</p>
          <div className="intraday-fields">
            {fields.map((field) => (
              <label key={field} className="intraday-setting">
                <span>{field}</span>
                <input disabled />
                <span className="intraday-muted">{existingValue}</span>
              </label>
            ))}
          </div>
        </details>
      </form>
    </section>
  );
}
