import type {
  ApplicationContext,
  ApplicationScale,
  BudgetRange,
  CampaignKind,
  CampaignPlacement,
  ClientAssumptionId,
  Confidence,
  ExistingBrandState,
  GuidelinesLevel,
  IdentityScopeItem,
  ImageComplexity,
  PieceCount,
  ProjectClassification,
  ProjectType,
  RedesignDepth,
  SpecialistService,
  SpecificKind,
  StakeholderComplexity,
  StepId,
  StrategyClarity,
  SystemDepth,
  TimelineKind,
} from "@/lib/project-discovery/types";

export type OptionCopy<Id extends string = string> = {
  id: Id;
  label: string;
  description?: string;
};

export type QuestionCopy = {
  kicker: string;
  question: string;
  description?: string;
  helper?: string;
  continueLabel: string;
  backLabel: string;
};

export type ProjectFlowContent = {
  meta: {
    title: string;
    description: string;
  };
  intro: {
    kicker: string;
    title: string;
    body: string;
  };
  nav: {
    back: string;
    continue: string;
    skip: string;
    edit: string;
    talk: string;
    send: string;
    sending: string;
    startAgain: string;
    stepStatus: string;
  };
  questions: {
    projectType: QuestionCopy & { options: OptionCopy<ProjectType>[] };
    existingBrand: QuestionCopy & { options: OptionCopy<ExistingBrandState>[] };
    redesignDepth: QuestionCopy & { options: OptionCopy<RedesignDepth>[] };
    strategyClarity: QuestionCopy & { options: OptionCopy<StrategyClarity>[] };
    identityScope: QuestionCopy & { options: OptionCopy<IdentityScopeItem>[] };
    systemDepth: QuestionCopy & { options: OptionCopy<SystemDepth>[] };
    guidelines: QuestionCopy & { options: OptionCopy<GuidelinesLevel>[] };
    applications: QuestionCopy & {
      groups: { id: string; label: string; options: OptionCopy<ApplicationContext>[] }[];
    };
    applicationScale: QuestionCopy & { options: OptionCopy<ApplicationScale>[] };
    campaignKind: QuestionCopy & { options: OptionCopy<CampaignKind>[] };
    campaignPlacements: QuestionCopy & { options: OptionCopy<CampaignPlacement>[] };
    specificKind: QuestionCopy & { options: OptionCopy<SpecificKind>[] };
    imageComplexity: QuestionCopy & { options: OptionCopy<ImageComplexity>[] };
    pieceCount: QuestionCopy & { options: OptionCopy<PieceCount>[] };
    specialists: QuestionCopy & { options: OptionCopy<SpecialistService>[] };
    timeline: QuestionCopy & { options: OptionCopy<TimelineKind>[] };
    targetDate: QuestionCopy & { dateLabel: string };
    stakeholders: QuestionCopy & { options: OptionCopy<StakeholderComplexity>[] };
    budget: QuestionCopy & { options: OptionCopy<BudgetRange>[] };
    description: QuestionCopy & { placeholder: string };
  };
  review: {
    kicker: string;
    title: string;
    empty: string;
    continueLabel: string;
    sections: {
      type: string;
      scope: string;
      applications: string;
      extensions: string;
      timeline: string;
      budget: string;
    };
  };
  estimate: {
    kicker: string;
    seeing: string;
    initial: string;
    indicative: string;
    lowTitle: string;
    lowBody: string;
    rangeNote: string;
    finalNote: string;
    specialists: string;
    talk: string;
    edit: string;
    preparing: string;
    scale: {
      contained: string;
      medium: string;
      mediumLarge: string;
      large: string;
    };
  };
  contact: {
    kicker: string;
    question: string;
    name: string;
    email: string;
    company: string;
    website: string;
    phone: string;
    optional: string;
    nameError: string;
    emailError: string;
  };
  complete: {
    kicker: string;
    title: string;
    body: string;
    home: string;
  };
  errors: {
    submit: string;
    estimate: string;
    choose: string;
  };
  classifications: Record<ProjectClassification, string>;
  assumptions: Record<ClientAssumptionId, string>;
  confidence: Record<Confidence, string>;
  labels: Record<string, string>;
  brief: {
    project: string;
    overview: string;
    scope: string;
    applications: string;
    extensions: string;
    timeline: string;
    budget: string;
    initialEstimate: string;
    confidence: string;
    notes: string;
    contact: string;
    none: string;
    notSpecified: string;
    toBeDiscussed: string;
    labels: Record<string, string>;
    confidenceLabels: Record<Confidence, string>;
  };
  stepAria: Partial<Record<StepId, string>>;
};
