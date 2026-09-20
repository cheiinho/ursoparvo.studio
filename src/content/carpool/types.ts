export type EvidenceKind =
  | "research"
  | "context"
  | "inference"
  | "reconstruction"
  | "exploration";

export type CarpoolContent = {
  meta: {
    title: string;
    description: string;
  };
  disclosure: string;
  labels: Record<EvidenceKind, string>;
  cover: {
    eyebrow: string;
    title: string;
    subtitle: string;
    meta: string;
    thesis: string;
  };
  brief: {
    kicker: string;
    headline: string;
    body: readonly string[];
  };
  assumption: {
    kicker: string;
    headline: string;
    body: readonly string[];
    chain: readonly string[];
    bridge: string;
    contextNote: string;
  };
  investigation: {
    kicker: string;
    headline: string;
    body: readonly string[];
    methods: readonly { title: string; detail: string }[];
    caveat: string;
  };
  personas: {
    headline: string;
    body: string;
    items: readonly { name: string; role: string; need: string }[];
  };
  experience: {
    kicker: string;
    headline: string;
    body: readonly string[];
    signal: string;
  };
  service: {
    kicker: string;
    headline: string;
    body: readonly string[];
    steps: readonly string[];
    diagramNote: string;
  };
  turningPoint: {
    kicker: string;
    statement: string;
    qualifier: string;
    body: readonly string[];
    shift: string;
  };
  findings: {
    kicker: string;
    headline: string;
    intro: string;
    items: readonly {
      id: string;
      weight: "lead" | "support";
      title: string;
      body: readonly string[];
      level: string;
    }[];
  };
  software: {
    kicker: string;
    headline: string;
    could: { title: string; items: readonly string[] };
    couldNot: { title: string; items: readonly string[] };
    closing: string;
  };
  investment: {
    kicker: string;
    headline: string;
    body: readonly string[];
    contextNote: string;
    chainA: readonly string[];
    chainB: readonly string[];
    close: string;
  };
  explorations: {
    kicker: string;
    headline: string;
    intro: string;
    items: readonly { title: string; detail: string }[];
  };
  outcome: {
    kicker: string;
    headline: string;
    body: readonly string[];
    before: string;
    after: string;
  };
  reflection: {
    headline: string;
    body: readonly string[];
  };
  artefacts: {
    availabilityCaption: string;
    intentsCaption: string;
    readinessCaption: string;
    cancelCaption: string;
    cancelExploreCaption: string;
    ruleCaption: string;
    historyCaption: string;
    explorationStripNote: string;
    uiPoolTitle: string;
    uiReserve: string;
    uiLeisure: string;
    uiWork: string;
    uiNextAvailable: string;
    uiWhenNeed: string;
    uiCancelled: string;
    uiNoReason: string;
    uiReasonMaintenance: string;
    uiJoinWaitlist: string;
    uiActiveRule: string;
    uiTooLate: string;
    uiEligibility: string;
    uiHistoryEmpty: string;
    uiHistoryDefault: string;
    uiUpcoming: string;
    uiAvailableFrom: string;
    uiCharging: string;
    uiReadyAt: string;
    uiInspection: string;
    availableLabel: string;
    readyLabel: string;
  };
};
