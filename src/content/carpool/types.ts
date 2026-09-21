export type EvidenceKind =
  | "research"
  | "context"
  | "inference"
  | "reconstruction"
  | "exploration";

export type CarpoolContent = {
  meta: { title: string; description: string };
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
    line: string;
  };
  snapshot: {
    kicker: string;
    title: string;
    intro: string;
    note: string;
    service: { title: string; body: string };
    people: {
      title: string;
      caveat: string;
      items: readonly {
        id: string;
        name: string;
        role: string;
        need: string;
      }[];
    };
    research: {
      title: string;
      methods: readonly string[];
    };
    constraint: {
      title: string;
      statement: string;
      support: string;
      capacity: string;
    };
    ux: {
      title: string;
      signals: readonly string[];
    };
    ops: {
      title: string;
      signals: readonly string[];
    };
    intents: {
      title: string;
      caption: string;
      workLabel: string;
      leisureLabel: string;
      workNeed: string;
      leisureNeed: string;
    };
    readiness: {
      title: string;
      available: string;
      ready: string;
      line: string;
    };
    lifecycle: {
      title: string;
      caption: string;
      steps: readonly string[];
      bookingHint: string;
    };
    cancelPath: {
      title: string;
      steps: readonly string[];
      note: string;
    };
  };
  assumption: {
    kicker: string;
    statement: string;
    body: string;
    nodes: readonly string[];
    bridge: string;
    contextNote: string;
  };
  investigation: {
    kicker: string;
    headline: string;
    line: string;
    methods: readonly { title: string; detail: string }[];
    caveat: string;
    voice: string;
  };
  personas: {
    headline: string;
    line: string;
    items: readonly {
      name: string;
      role: string;
      need: string;
      lens: string;
    }[];
  };
  availability: {
    kicker: string;
    statement: string;
    after: string;
    line: string;
  };
  wait: {
    kicker: string;
    statement: string;
    line: string;
    attribution: string;
  };
  readiness: {
    kicker: string;
    statement: string;
    line: string;
  };
  intents: {
    kicker: string;
    statement: string;
    line: string;
  };
  rules: {
    kicker: string;
    statement: string;
    line: string;
  };
  history: {
    kicker: string;
    statement: string;
    line: string;
  };
  usage: {
    kicker: string;
    statement: string;
    line: string;
    note: string;
  };
  turningPoint: {
    kicker: string;
    statement: string;
    qualifier: string;
    shift: string;
  };
  service: {
    kicker: string;
    statement: string;
    steps: readonly string[];
    diagramNote: string;
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
    line: string;
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
    climax: string;
    headline: string;
    line: string;
    beforeLabel: string;
    afterLabel: string;
    before: string;
    after: string;
    arc: readonly { label: string; text: string }[];
  };
  reflection: {
    headline: string;
    body: readonly string[];
  };
  interact: {
    selectDate: string;
    vehicles: string;
    noAvailability: string;
    fewerOptions: string;
    tryAnotherDay: string;
    dayLabels: readonly string[];
    vehicleOpen: string;
    vehicleClosed: string;
    scrubHint: string;
    booked: string;
    monthsPass: string;
    stillBooked: string;
    twentyDays: string;
    cancelled: string;
    noReason: string;
    noAlternative: string;
    playReady: string;
    stepReturn: string;
    stepInspection: string;
    stepCharging: string;
    stepReady: string;
    availableTag: string;
    readyTag: string;
    workMode: string;
    leisureMode: string;
    workNeed: string;
    leisureNeed: string;
    reserve: string;
    lateRule: string;
    earlyRule: string;
    tryAgain: string;
    showBefore: string;
    tabUpcoming: string;
    tabActive: string;
    tabCompleted: string;
    tabCancelled: string;
    statusOpen: string;
    statusCompleted: string;
    statusCancelled: string;
    scheduled: string;
    actual: string;
    pickup: string;
    returnLabel: string;
    illustrative: string;
    zoomHint: string;
    platformNode: string;
  };
};
