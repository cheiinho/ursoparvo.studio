"use client";

import { useId, useState } from "react";
import type { CarpoolContent, EvidenceKind } from "@/content/carpool/types";

type Snapshot = CarpoolContent["snapshot"];
type Labels = CarpoolContent["labels"];

function Chip({ kind, labels }: { kind: EvidenceKind; labels: Labels }) {
  return <span className={`carpool-chip carpool-chip--${kind}`}>{labels[kind]}</span>;
}

export function ResearchSnapshot({
  snapshot,
  labels,
}: {
  snapshot: Snapshot;
  labels: Labels;
}) {
  const [person, setPerson] = useState(0);
  const [intent, setIntent] = useState<"work" | "leisure">("leisure");
  const [ready, setReady] = useState(false);
  const [flowStep, setFlowStep] = useState(2);
  const [cancelStep, setCancelStep] = useState(0);
  const titleId = useId();
  const activePerson = snapshot.people.items[person];

  return (
    <section
      id="snapshot"
      className="carpool-snap"
      aria-labelledby={titleId}
      data-evidence-map="docs/carpool-snapshot-evidence-map.md"
    >
      <div className="carpool-snap__head">
        <p className="type-meta text-secondary">{snapshot.kicker}</p>
        <h2 id={titleId} className="type-heading">
          {snapshot.title}
        </h2>
        <p className="type-corpo measure">{snapshot.intro}</p>
        <p className="type-nota type-italic text-secondary measure">{snapshot.note}</p>
      </div>

      <div className="carpool-snap__grid">
        <article className="carpool-snap__panel carpool-snap__panel--lead">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.constraint.title}</p>
          </div>
          <p className="carpool-snap__constraint type-heading">{snapshot.constraint.statement}</p>
          <p className="type-corpo">{snapshot.constraint.support}</p>
          <p className="carpool-snap__capacity type-lede">{snapshot.constraint.capacity}</p>
        </article>

        <article className="carpool-snap__panel">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.service.title}</p>
          </div>
          <p className="type-corpo">{snapshot.service.body}</p>
        </article>

        <article className="carpool-snap__panel">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.people.title}</p>
          </div>
          <div className="carpool-snap__people" role="tablist" aria-label={snapshot.people.title}>
            {snapshot.people.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={person === index}
                className={person === index ? "is-active" : undefined}
                onClick={() => setPerson(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="carpool-snap__person" role="tabpanel" aria-live="polite">
            <p className="type-meta text-secondary">{activePerson.role}</p>
            <p className="type-corpo">{activePerson.need}</p>
          </div>
          <p className="type-nota type-italic text-secondary">{snapshot.people.caveat}</p>
        </article>

        <article className="carpool-snap__panel">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.research.title}</p>
          </div>
          <ul className="carpool-snap__methods">
            {snapshot.research.methods.map((method) => (
              <li key={method} className="type-corpo">
                {method}
              </li>
            ))}
          </ul>
        </article>

        <article className="carpool-snap__panel">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.ux.title}</p>
          </div>
          <ul className="carpool-snap__signals">
            {snapshot.ux.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </article>

        <article className="carpool-snap__panel">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.ops.title}</p>
          </div>
          <ul className="carpool-snap__signals carpool-snap__signals--ops">
            {snapshot.ops.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </article>

        <article className="carpool-snap__panel">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.intents.title}</p>
          </div>
          <div className="carpool-snap__toggle" role="group" aria-label={snapshot.intents.title}>
            <button
              type="button"
              className={intent === "work" ? "is-active" : undefined}
              aria-pressed={intent === "work"}
              onClick={() => setIntent("work")}
            >
              {snapshot.intents.workLabel}
            </button>
            <button
              type="button"
              className={intent === "leisure" ? "is-active" : undefined}
              aria-pressed={intent === "leisure"}
              onClick={() => setIntent("leisure")}
            >
              {snapshot.intents.leisureLabel}
            </button>
          </div>
          <p className="type-heading" aria-live="polite">
            {intent === "work"
              ? snapshot.intents.workNeed
              : snapshot.intents.leisureNeed}
          </p>
          <p className="type-nota text-secondary">{snapshot.intents.caption}</p>
        </article>

        <article className="carpool-snap__panel">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.readiness.title}</p>
          </div>
          <div className="carpool-snap__toggle" role="group" aria-label={snapshot.readiness.title}>
            <button
              type="button"
              className={!ready ? "is-active is-warn" : undefined}
              aria-pressed={!ready}
              onClick={() => setReady(false)}
            >
              {snapshot.readiness.available}
            </button>
            <button
              type="button"
              className={ready ? "is-active is-ok" : undefined}
              aria-pressed={ready}
              onClick={() => setReady(true)}
            >
              {snapshot.readiness.ready}
            </button>
          </div>
          <p className="type-corpo" aria-live="polite">
            {snapshot.readiness.line}
          </p>
        </article>

        <article className="carpool-snap__panel carpool-snap__panel--wide">
          <div className="carpool-snap__bar">
            <Chip kind="inference" labels={labels} />
            <p className="type-meta">{snapshot.lifecycle.title}</p>
          </div>
          <p className="type-nota text-secondary">{snapshot.lifecycle.caption}</p>
          <ol className="carpool-snap__flow">
            {snapshot.lifecycle.steps.map((step, index) => (
              <li key={step}>
                <button
                  type="button"
                  className={
                    index === flowStep
                      ? "is-current"
                      : step.toLowerCase().includes("booking") ||
                          step.toLowerCase().includes("reserva")
                        ? "is-platform"
                        : undefined
                  }
                  aria-pressed={index === flowStep}
                  onClick={() => setFlowStep(index)}
                >
                  {step}
                </button>
              </li>
            ))}
          </ol>
          <p className="type-nota text-secondary" aria-live="polite">
            {snapshot.lifecycle.bookingHint}
          </p>
        </article>

        <article className="carpool-snap__panel carpool-snap__panel--wide">
          <div className="carpool-snap__bar">
            <Chip kind="research" labels={labels} />
            <p className="type-meta">{snapshot.cancelPath.title}</p>
          </div>
          <ol className="carpool-snap__flow carpool-snap__flow--cancel">
            {snapshot.cancelPath.steps.map((step, index) => (
              <li key={step}>
                <button
                  type="button"
                  className={
                    index === cancelStep
                      ? index === snapshot.cancelPath.steps.length - 1
                        ? "is-current is-bad"
                        : "is-current"
                      : index < cancelStep
                        ? "is-done"
                        : undefined
                  }
                  aria-pressed={index === cancelStep}
                  onClick={() => setCancelStep(index)}
                >
                  {step}
                </button>
              </li>
            ))}
          </ol>
          <p className="type-nota text-secondary">{snapshot.cancelPath.note}</p>
        </article>
      </div>
    </section>
  );
}
