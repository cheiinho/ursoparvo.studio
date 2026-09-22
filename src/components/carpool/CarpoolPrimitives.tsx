import type { CarpoolContent, EvidenceKind } from "@/content/carpool/types";

export type Labels = CarpoolContent["labels"];

export function Chip({ kind, labels }: { kind: EvidenceKind; labels: Labels }) {
  return <span className={`cp-chip cp-chip--${kind}`}>{labels[kind]}</span>;
}

export function Kicker({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <p id={id} className="cp-kicker type-label">
      {children}
    </p>
  );
}

/**
 * Framed reconstructed UI or diagram. The evidence chip is part of the frame so
 * the reader never sees a mockup without knowing what kind of artefact it is.
 */
export function Frame({
  kind,
  labels,
  title,
  caption,
  children,
  className,
}: {
  kind: EvidenceKind;
  labels: Labels;
  title?: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`cp-frame${className ? ` ${className}` : ""}`}>
      <div className="cp-frame__bar">
        {title ? <span className="cp-frame__title type-meta">{title}</span> : <span />}
        <Chip kind={kind} labels={labels} />
      </div>
      <div className="cp-frame__body">{children}</div>
      {caption ? (
        <figcaption className="cp-frame__caption type-nota text-secondary">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export type State = "available" | "preparing" | "ready" | "cancelled" | "attention" | "muted";

/** Semantic state pill. Colour is never the only carrier: the text is always present. */
export function StatePill({ state, children }: { state: State; children: React.ReactNode }) {
  return (
    <span className={`cp-state cp-state--${state}`}>
      <span className="cp-state__dot" aria-hidden="true" />
      {children}
    </span>
  );
}

export function StepControls({
  label,
  steps,
  current,
  onSelect,
}: {
  label: string;
  steps: readonly string[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="cp-steps" role="group" aria-label={label}>
      {steps.map((text, index) => (
        <button
          key={text}
          type="button"
          className={index === current ? "cp-steps__btn is-active" : "cp-steps__btn"}
          aria-pressed={index === current}
          onClick={() => onSelect(index)}
        >
          <span className="cp-steps__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          {text}
        </button>
      ))}
    </div>
  );
}
