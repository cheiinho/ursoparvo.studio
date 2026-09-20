import type { CarpoolContent, EvidenceKind } from "@/content/carpool/types";

type Artefacts = CarpoolContent["artefacts"];
type Labels = CarpoolContent["labels"];

function Chip({
  kind,
  labels,
}: {
  kind: EvidenceKind;
  labels: Labels;
}) {
  return <span className={`carpool-chip carpool-chip--${kind}`}>{labels[kind]}</span>;
}

function Frame({
  kind,
  labels,
  caption,
  children,
  className = "",
}: {
  kind: EvidenceKind;
  labels: Labels;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`carpool-frame ${className}`.trim()}>
      <div className="carpool-frame__bar">
        <Chip kind={kind} labels={labels} />
      </div>
      <div className="carpool-frame__body">{children}</div>
      {caption ? <figcaption className="carpool-frame__caption type-nota">{caption}</figcaption> : null}
    </figure>
  );
}

export function CarpoolMethodsDiagram({
  methods,
  caveat,
  labels,
}: {
  methods: CarpoolContent["investigation"]["methods"];
  caveat: string;
  labels: Labels;
}) {
  return (
    <Frame kind="research" labels={labels}>
      <ol className="carpool-methods">
        {methods.map((method) => (
          <li key={method.title} className="carpool-methods__item">
            <p className="carpool-methods__title type-meta">{method.title}</p>
            <p className="type-nota text-secondary">{method.detail}</p>
          </li>
        ))}
      </ol>
      <p className="carpool-methods__caveat type-nota type-italic text-secondary">{caveat}</p>
    </Frame>
  );
}

export function CarpoolAvailabilityUi({
  a,
  labels,
}: {
  a: Artefacts;
  labels: Labels;
}) {
  const days = [
    { d: "3", state: "blocked" },
    { d: "4", state: "blocked" },
    { d: "5", state: "ambiguous" },
    { d: "6", state: "open" },
    { d: "7", state: "blocked" },
    { d: "8", state: "ambiguous" },
    { d: "9", state: "blocked" },
    { d: "10", state: "blocked" },
    { d: "11", state: "ambiguous" },
    { d: "12", state: "blocked" },
    { d: "13", state: "open" },
    { d: "14", state: "blocked" },
  ] as const;

  return (
    <Frame kind="reconstruction" labels={labels} caption={a.availabilityCaption}>
      <div className="carpool-ui" role="img" aria-label={a.availabilityCaption}>
        <div className="carpool-ui__chrome">
          <span className="carpool-ui__product">{a.uiPoolTitle}</span>
          <div className="carpool-ui__tabs" aria-hidden="true">
            <span className="is-active">{a.uiLeisure}</span>
            <span>{a.uiWork}</span>
          </div>
        </div>
        <div className="carpool-ui__filters" aria-hidden="true">
          <span>Lisbon</span>
          <span className="is-active">Oporto</span>
          <span>Braga</span>
        </div>
        <div className="carpool-calendar" aria-hidden="true">
          {days.map((day) => (
            <span key={day.d} className={`carpool-calendar__day is-${day.state}`}>
              {day.d}
            </span>
          ))}
        </div>
        <ul className="carpool-ui__cars" aria-hidden="true">
          <li>
            <span>Compact EV · 4 seats</span>
            <button type="button" tabIndex={-1} disabled>
              {a.uiReserve}
            </button>
          </li>
          <li className="is-muted">
            <span>Estate hybrid · no open dates</span>
            <button type="button" tabIndex={-1} disabled>
              {a.uiReserve}
            </button>
          </li>
        </ul>
      </div>
    </Frame>
  );
}

export function CarpoolIntentsUi({
  a,
  labels,
}: {
  a: Artefacts;
  labels: Labels;
}) {
  return (
    <Frame kind="exploration" labels={labels} caption={a.intentsCaption}>
      <div className="carpool-intents" role="img" aria-label={a.intentsCaption}>
        <div className="carpool-intents__col">
          <p className="type-meta">{a.uiWork}</p>
          <p className="type-corpo">12 Sep · 09:00 → 14:00</p>
          <p className="type-nota text-secondary">Fixed window</p>
        </div>
        <div className="carpool-intents__col">
          <p className="type-meta">{a.uiLeisure}</p>
          <p className="type-corpo">{a.uiNextAvailable}</p>
          <p className="type-nota text-secondary">{a.uiWhenNeed}</p>
        </div>
      </div>
    </Frame>
  );
}

export function CarpoolReadinessDiagram({
  a,
  labels,
  steps,
  note,
}: {
  a: Artefacts;
  labels: Labels;
  steps: readonly string[];
  note: string;
}) {
  return (
    <Frame kind="inference" labels={labels} caption={a.readinessCaption}>
      <div className="carpool-readiness" role="img" aria-label={a.readinessCaption}>
        <div className="carpool-readiness__card" aria-hidden="true">
          <p className="type-meta">Car 07</p>
          <p className="type-corpo">{a.uiAvailableFrom}</p>
          <p className="carpool-readiness__warn type-nota">{a.uiCharging}</p>
          <p className="type-nota">{a.uiReadyAt}</p>
          <div className="carpool-readiness__tags">
            <span>{a.availableLabel}</span>
            <span className="is-ready">{a.readyLabel}</span>
          </div>
        </div>
        <ol className="carpool-flow" aria-label={note}>
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="type-nota type-italic text-secondary">{note}</p>
      </div>
    </Frame>
  );
}

export function CarpoolCancelPair({
  a,
  labels,
}: {
  a: Artefacts;
  labels: Labels;
}) {
  return (
    <div className="carpool-pair">
      <Frame kind="reconstruction" labels={labels} caption={a.cancelCaption}>
        <div className="carpool-ui carpool-ui--compact" role="img" aria-label={a.cancelCaption}>
          <p className="type-meta">Compact EV · AZ-00-XX</p>
          <p className="carpool-status is-bad">{a.uiCancelled}</p>
          <p className="type-nota text-secondary">{a.uiNoReason}</p>
          <p className="type-nota">Jan booked → Sep trip → cancelled ~20 days prior</p>
        </div>
      </Frame>
      <Frame kind="exploration" labels={labels} caption={a.cancelExploreCaption}>
        <div className="carpool-ui carpool-ui--compact" role="img" aria-label={a.cancelExploreCaption}>
          <p className="type-meta">Compact EV · AZ-00-XX</p>
          <p className="carpool-status is-bad">{a.uiCancelled}</p>
          <p className="type-nota">{a.uiReasonMaintenance}</p>
          <p className="carpool-link type-nota">{a.uiJoinWaitlist}</p>
        </div>
      </Frame>
    </div>
  );
}

export function CarpoolHiddenRule({
  a,
  labels,
}: {
  a: Artefacts;
  labels: Labels;
}) {
  return (
    <Frame kind="reconstruction" labels={labels} caption={a.ruleCaption}>
      <div className="carpool-rule" role="img" aria-label={a.ruleCaption}>
        <ol className="carpool-rule__steps" aria-hidden="true">
          <li>Car · date · time</li>
          <li className="is-action">{a.uiReserve}</li>
          <li className="is-error">
            {a.uiActiveRule}
            <span className="carpool-rule__late">{a.uiTooLate}</span>
          </li>
        </ol>
        <p className="carpool-rule__alt type-nota">{a.uiEligibility}</p>
      </div>
    </Frame>
  );
}

export function CarpoolHistoryUi({
  a,
  labels,
}: {
  a: Artefacts;
  labels: Labels;
}) {
  return (
    <Frame kind="reconstruction" labels={labels} caption={a.historyCaption}>
      <div className="carpool-ui carpool-ui--compact" role="img" aria-label={a.historyCaption}>
        <p className="type-nota text-secondary">{a.uiHistoryDefault}</p>
        <p className="type-corpo">{a.uiHistoryEmpty}</p>
        <p className="type-nota">{a.uiUpcoming}: 04 Jan — hidden by default</p>
      </div>
    </Frame>
  );
}

export function CarpoolInvestmentDiagram({
  chainA,
  chainB,
  contextNote,
  labels,
}: {
  chainA: readonly string[];
  chainB: readonly string[];
  contextNote: string;
  labels: Labels;
}) {
  return (
    <Frame kind="context" labels={labels}>
      <div className="carpool-invest" role="img" aria-label={contextNote}>
        <div>
          <p className="type-meta text-secondary">Assumed path</p>
          <ol className="carpool-flow">
            {chainA.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <p className="type-meta text-secondary">Risk the research surfaced</p>
          <ol className="carpool-flow is-warn">
            {chainB.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <p className="type-nota type-italic text-secondary">{contextNote}</p>
    </Frame>
  );
}

export function CarpoolExplorationStrip({
  items,
  note,
  labels,
}: {
  items: CarpoolContent["explorations"]["items"];
  note: string;
  labels: Labels;
}) {
  return (
    <Frame kind="exploration" labels={labels} caption={note}>
      <ul className="carpool-explore-grid">
        {items.map((item) => (
          <li key={item.title}>
            <p className="type-meta">{item.title}</p>
            <p className="type-nota text-secondary">{item.detail}</p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function CarpoolEvidenceLegend({ labels }: { labels: Labels }) {
  const order: EvidenceKind[] = [
    "research",
    "context",
    "inference",
    "reconstruction",
    "exploration",
  ];
  return (
    <ul className="carpool-legend" aria-label="Evidence labels">
      {order.map((kind) => (
        <li key={kind}>
          <Chip kind={kind} labels={labels} />
        </li>
      ))}
    </ul>
  );
}
