export type EvidenceKind =
  | "requirement"
  | "designDecision"
  | "context"
  | "inference"
  | "reconstruction"
  | "exploration"
  | "illustrative";

export type ScenarioId = "volume" | "handle" | "capacity";

export type StepId = 1 | 2 | 3 | 4 | 5;

export type ShellState = "watching" | "inProgress" | "updated";

export type SurfaceId = "forecast" | "teamSchedule" | "insights";

export type SolutionId = "allow" | "announce" | "replace" | "compare" | "locate";

export type PlaceId = SurfaceId | "issues" | "configurations";

/** The product state a solution is shown in. Each scene fixes its own. */
export type SceneView = {
  phase: StepId;
  place: PlaceId;
  showPrevious?: boolean;
  panelOpen?: boolean;
  reforecastOn?: boolean;
  /** Renders the navigation rail, for the solutions that are about moving. */
  nav?: boolean;
};

export type Solution = {
  id: SolutionId;
  label: string;
  /** What the design does, in one line. */
  statement: string;
  /** Why it is that way, in one line. */
  line: string;
  /** The single thing to look at in the screen below. */
  look: string;
  view: SceneView;
};

export type Quarter = {
  time: string;
  previous: number;
  actual: number | null;
  next: number | null;
};

export type Person = {
  name: string;
  shiftStart: string;
  shiftEnd: string;
};

export type Constraint = {
  summary: string;
  body: string;
};

export type IntradayContent = {
  meta: { title: string; description: string };
  labels: Record<EvidenceKind, string>;
  legend: EvidenceKind[];
  sections: Array<{ id: string; label: string }>;
  experience: {
    label: string;
    hint: string;
    heading: string;
    lede: string;
    solutions: Solution[];
  };
  problem: {
    heading: string;
    lede: string;
    story: string;
    facts: Array<{ term: string; detail: string }>;
    undefinedNote: string;
  };
  cover: {
    kicker: string;
    thesis: string;
    title: string;
    domain: string;
    anonymity: string;
    transition: string;
  };
  plan: {
    heading: string;
    message: string;
    body: [string, string];
    chartTitle: string;
    caption: string;
    transition: string;
  };
  diverges: {
    heading: string;
    message: string;
    groupLabel: string;
    options: Array<{ id: ScenarioId; label: string; note: string }>;
    transition: string;
  };
  brief: {
    heading: string;
    message: string;
    story: string;
    note: string;
    constraints: Constraint[];
    splits: Constraint[];
    transition: string;
  };
  target: { label: string; body: string };
  system: {
    heading: string;
    message: string;
    groupLabel: string;
    back: string;
    next: string;
    algorithm: string;
    lowVolume: string;
    transition: string;
    steps: Array<{
      id: StepId;
      clock: string;
      stateName: string;
      sentence: string;
    }>;
    columns: { time: string; forecast: string; actual: string };
  };
  tensions: {
    heading: string;
    message: string;
    questions: [string, string, string];
    transition: string;
  };
  decisionOne: {
    heading: string;
    message: string;
    conflict: string;
    control: string;
    helper: string;
    onLine: string;
    existingNote: string;
    existingValue: string;
    fields: [string, string, string];
    queueLabel: string;
    disclosure: string;
    transition: string;
  };
  decisionTwo: {
    heading: string;
    causal: string;
    message: string;
    assumption: string;
    stateGroup: string;
    surfaceGroup: string;
    states: Array<{ id: ShellState; label: string; status: string }>;
    surfaces: Array<{ id: SurfaceId; label: string }>;
    start: string;
    completed: string;
    nothingToReport: string;
    earlier: string;
    applyFilter: string;
    affected: string;
    ordersNote: string;
    filterOff: string;
    preview: string;
    previewReason: string;
    checkInsights: string;
    notifications: string;
    panelHeading: string;
    close: string;
    insightsBody: string;
    present: string;
    absent: string;
    transition: string;
  };
  decisionThree: {
    heading: string;
    causal: string;
    message: string;
    baseline: string;
    showPrevious: string;
    previousHidden: string;
    delta: string;
    issue: string;
    severity: string;
    showForecast: string;
    showSchedule: string;
    periodPrefix: string;
    periodLabel: string;
    scheduleNote: string;
    chartRegion: string;
    columns: { time: string; previous: string; current: string; actual: string };
    transition: string;
  };
  validation: {
    heading: string;
    paragraphs: [string, string, string];
    transition: string;
  };
  outcome: {
    heading: string;
    lede: string;
    design: string;
    unknowns: [string, string, string, string];
    transition: string;
  };
  reflection: {
    heading: string;
    body: string;
  };
  chart: {
    forecast: string;
    actual: string;
    previous: string;
    current: string;
    newForecast: string;
    contacts: string;
    empty: string;
    planSummary: string;
    stepSummary: string;
    compareSummary: string;
    scenarioSummary: string;
  };
  frame: {
    region: string;
    product: string;
    reconstruction: string;
    sentence: string;
    accountLabel: string;
  };
};
