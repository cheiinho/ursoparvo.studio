export type EvidenceKind =
  | "research"
  | "context"
  | "inference"
  | "reconstruction"
  | "exploration";

export type VehicleState = "usable" | "listed" | "preparing";

export type CarpoolContent = {
  meta: { title: string; description: string };
  disclosure: string;
  labels: Record<EvidenceKind, string>;
  /** Shared micro-copy for reconstructed UI and scene controls. */
  ui: {
    stepControls: string;
    reconstructedUi: string;
    stateAvailable: string;
    statePreparing: string;
    stateReady: string;
    stateCancelled: string;
    stateAttention: string;
    vehicleNames: readonly [string, string, string];
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    visual: {
      vehicle: string;
      date: string;
      free: string;
      states: readonly [string, string, string, string];
      caption: string;
    };
  };
  assumption: {
    kicker: string;
    statement: string;
    chain: readonly [string, string, string];
    reveal: string;
    verdict: string;
    note: string;
  };
  research: {
    kicker: string;
    headline: string;
    statements: readonly string[];
    methodsTitle: string;
    methods: readonly string[];
    caveat: string;
    sample: string;
  };
  finding: {
    kicker: string;
    headline: string;
    lead: string;
    mock: {
      title: string;
      selectDay: string;
      days: readonly string[];
      states: readonly { free: number; listed: number; preparing: number }[];
      usable: string;
      listed: string;
      preparing: string;
      empty: string;
      tryAnotherDay: string;
      punch: string;
    };
  };
  wait: {
    kicker: string;
    headline: string;
    caseLabel: string;
    months: readonly { month: string; text: string }[];
    booked: string;
    cancelled: string;
    noExplanation: string;
    noAlternative: string;
    alternativeEmpty: string;
    note: string;
    stage: { vehicle: string; forLabel: string };
  };
  readiness: {
    kicker: string;
    statement: string;
    calendarTitle: string;
    calendarFree: string;
    steps: readonly { key: string; label: string; text: string }[];
    line: string;
    note: string;
  };
  service: {
    kicker: string;
    statement: string;
    nodes: readonly string[];
    focus: readonly number[];
    focusCaptions: readonly string[];
    note: string;
  };
  intents: {
    kicker: string;
    headline: string;
    work: { label: string; traits: readonly string[]; query: string; result: string };
    leisure: {
      label: string;
      traits: readonly string[];
      query: string;
      result: string;
    };
    recommendation: string;
    caveat: string;
  };
  rules: {
    kicker: string;
    headline: string;
    before: { label: string; steps: readonly string[] };
    after: { label: string; steps: readonly string[] };
    rule: string;
    ruleEarly: string;
    point: string;
    note: string;
  };
  history: {
    kicker: string;
    headline: string;
    problem: string;
    exploration: string;
    views: { original: string; exploration: string };
    hiddenHint: string;
    nextLabel: string;
    tabs: readonly [string, string, string, string];
    booking: {
      vehicle: string;
      when: string;
      pastWhen: string;
      statuses: readonly [string, string, string, string];
    };
    empty: string;
    note: string;
  };
  usage: {
    kicker: string;
    headline: string;
    scheduled: { label: string; pickup: string; ret: string };
    actual: { label: string; pickup: string; ret: string };
    pickup: string;
    ret: string;
    illustrative: string;
    recommendation: string;
  };
  pivot: {
    kicker: string;
    lines: readonly [string, string, string, string];
    fromLabel: string;
    from: string;
    toLabel: string;
    to: string;
  };
  software: {
    kicker: string;
    headline: string;
    can: { title: string; items: readonly string[] };
    cannot: { title: string; items: readonly string[] };
  };
  investment: {
    kicker: string;
    headline: string;
    contextNote: string;
    a: { title: string; items: readonly string[] };
    b: { title: string; items: readonly string[] };
    insight: string;
  };
  closing: {
    kicker: string;
    lines: readonly [string, string, string];
  };
};
