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
    <section className="intraday-ui" aria-label={region}>
      <p className="intraday-recon type-label">{reconstruction}</p>
      <p className="type-nota intraday-body">{sentence}</p>
      <div className="intraday-bar">
        <p className="type-label">{product}</p>
        <p className="type-nota">
          {accountLabel}: {dataset.account}
        </p>
      </div>
      <form className="intraday-body intraday-stack" onSubmit={(event) => event.preventDefault()}>
        <p className="type-label">{illustrative}</p>
        <p className="type-nota">
          {dataset.queue}. {dataset.dateLabel}. {dataset.timeZone}.
        </p>
        <div className="intraday-fields">
          <p>
            <span className="type-label">{queueLabel}. </span>
            {dataset.queue}
          </p>
          <label className="intraday-check">
            <input
              type="checkbox"
              checked={on}
              onChange={(event) => setOn(event.target.checked)}
              aria-describedby="reforecast-helper"
            />
            {control}
          </label>
          <p id="reforecast-helper" className="intraday-helper type-nota">
            {helper}
          </p>
          {on ? <p className="type-nota">{onLine}</p> : null}
        </div>
        <details>
          <summary className="type-label">{disclosure}</summary>
          <div className="intraday-fields">
            <p className="type-nota">{existingNote}</p>
            {fields.map((field) => (
              <label key={field}>
                <span className="type-label">{field}</span>
                <input disabled />
                <span className="type-nota intraday-muted">{existingValue}</span>
              </label>
            ))}
          </div>
        </details>
      </form>
    </section>
  );
}
