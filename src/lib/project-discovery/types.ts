export const PROJECT_TYPES = [
  "identityRedesign",
  "visualIdentity",
  "visualDirection",
  "specificAsset",
  "unsure",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const EXISTING_BRAND_STATES = [
  "nameAndBusiness",
  "logo",
  "visualIdentity",
  "fullVisualSystem",
  "identityNoLongerWorks",
  "disconnectedMaterials",
  "unsure",
] as const;
export type ExistingBrandState = (typeof EXISTING_BRAND_STATES)[number];

export const REDESIGN_DEPTHS = ["refine", "reimagine", "rebuild"] as const;
export type RedesignDepth = (typeof REDESIGN_DEPTHS)[number];

export const STRATEGY_CLARITIES = [
  "veryClear",
  "mostlyClear",
  "stillTakingShape",
  "unsure",
] as const;
export type StrategyClarity = (typeof STRATEGY_CLARITIES)[number];

export const IDENTITY_SCOPE_ITEMS = [
  "logo",
  "symbol",
  "typography",
  "colour",
  "graphicLanguage",
  "illustration",
  "iconography",
  "photographyDirection",
  "layoutSystem",
  "templates",
  "packaging",
  "signage",
  "merchandise",
  "other",
] as const;
export type IdentityScopeItem = (typeof IDENTITY_SCOPE_ITEMS)[number];

export const SYSTEM_DEPTHS = [
  "foundations",
  "system",
  "systemAndApplications",
  "completeSystem",
] as const;
export type SystemDepth = (typeof SYSTEM_DEPTHS)[number];

export const GUIDELINES_LEVELS = ["essential", "standard", "detailed"] as const;
export type GuidelinesLevel = (typeof GUIDELINES_LEVELS)[number];

export const APPLICATION_CONTEXTS = [
  "website",
  "social",
  "email",
  "digitalProducts",
  "presentations",
  "reports",
  "brochures",
  "publications",
  "print",
  "packaging",
  "signage",
  "environment",
  "merchandise",
  "objects",
  "advertising",
  "posters",
  "launches",
  "events",
] as const;
export type ApplicationContext = (typeof APPLICATION_CONTEXTS)[number];

export const APPLICATION_GROUPS = {
  digital: [
    "website",
    "social",
    "email",
    "digitalProducts",
    "presentations",
  ],
  editorial: ["reports", "brochures", "publications", "print"],
  physical: ["packaging", "signage", "environment", "merchandise", "objects"],
  campaigns: ["advertising", "posters", "launches", "events"],
} as const satisfies Record<string, readonly ApplicationContext[]>;

export const APPLICATION_SCALES = [
  "few",
  "smallSet",
  "broad",
  "many",
  "unsure",
] as const;
export type ApplicationScale = (typeof APPLICATION_SCALES)[number];

export const CAMPAIGN_KINDS = [
  "eventIdentity",
  "keyVisual",
  "campaignLanguage",
  "posterCampaign",
  "digitalCampaign",
  "fullCommunication",
  "other",
] as const;
export type CampaignKind = (typeof CAMPAIGN_KINDS)[number];

export const CAMPAIGN_PLACEMENTS = [
  "posters",
  "social",
  "website",
  "advertising",
  "signage",
  "stage",
  "merchandise",
  "editorial",
  "other",
] as const;
export type CampaignPlacement = (typeof CAMPAIGN_PLACEMENTS)[number];

export const SPECIFIC_KINDS = [
  "illustration",
  "poster",
  "editorial",
  "cover",
  "packaging",
  "eventArtwork",
  "printPiece",
  "other",
] as const;
export type SpecificKind = (typeof SPECIFIC_KINDS)[number];

export const IMAGE_COMPLEXITIES = [
  "simple",
  "developed",
  "highlyDetailed",
  "unsure",
] as const;
export type ImageComplexity = (typeof IMAGE_COMPLEXITIES)[number];

export const PIECE_COUNTS = ["1", "2-3", "4-6", "7+"] as const;
export type PieceCount = (typeof PIECE_COUNTS)[number];

export const SPECIALIST_SERVICES = [
  "motion",
  "film",
  "photography",
  "digitalDesign",
  "development",
  "advertising",
  "3d",
  "writing",
  "spatial",
] as const;
export type SpecialistService = (typeof SPECIALIST_SERVICES)[number];

export const TIMELINE_KINDS = [
  "noDate",
  "fewMonths",
  "specificDate",
  "quickly",
] as const;
export type TimelineKind = (typeof TIMELINE_KINDS)[number];

export const STAKEHOLDER_COMPLEXITIES = [
  "oneDecisionMaker",
  "smallTeam",
  "severalStakeholders",
  "leadership",
  "multipleOrgs",
  "agencyPartner",
] as const;
export type StakeholderComplexity = (typeof STAKEHOLDER_COMPLEXITIES)[number];

export const BUDGET_RANGES = [
  "notYet",
  "under3000",
  "3000-5000",
  "5000-10000",
  "10000-20000",
  "20000+",
] as const;
export type BudgetRange = (typeof BUDGET_RANGES)[number];

export const PROJECT_CLASSIFICATIONS = [
  "identityRefresh",
  "identityRedesign",
  "identitySystem",
  "visualIdentity",
  "campaignEvent",
  "keyVisual",
  "specificGraphic",
  "needsConversation",
] as const;
export type ProjectClassification = (typeof PROJECT_CLASSIFICATIONS)[number];

export const CONFIDENCE_LEVELS = ["low", "medium", "high"] as const;
export type Confidence = (typeof CONFIDENCE_LEVELS)[number];

export const CLIENT_ASSUMPTION_IDS = [
  "scopeDescribed",
  "estimateNotBinding",
  "strategyPartiallyDefined",
  "strategyUndefined",
  "specialistsIntegrated",
  "discoveryRecommended",
  "applicationsUncertain",
  "timelineFlexible",
] as const;
export type ClientAssumptionId = (typeof CLIENT_ASSUMPTION_IDS)[number];

export type ProjectInput = {
  projectType: ProjectType | null;
  existingBrandState?: ExistingBrandState[];
  redesignDepth?: RedesignDepth | null;
  strategyClarity?: StrategyClarity | null;
  identityScope?: IdentityScopeItem[];
  systemDepth?: SystemDepth | null;
  guidelines?: GuidelinesLevel | null;
  applications?: ApplicationContext[];
  applicationScale?: ApplicationScale | null;
  campaignKind?: CampaignKind | null;
  campaignPlacements?: CampaignPlacement[];
  specificKind?: SpecificKind | null;
  imageComplexity?: ImageComplexity | null;
  pieceCount?: PieceCount | null;
  specialistServices?: SpecialistService[];
  timeline?: TimelineKind | null;
  targetDate?: string | null;
  stakeholderComplexity?: StakeholderComplexity | null;
  budgetRange?: BudgetRange | null;
  description?: string;
};

export type ProjectContact = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  phone?: string;
};

export type EstimateResult = {
  classification: ProjectClassification;
  complexityScore: number;
  scopeScore: number;
  riskScore: number;
  internalEffort: number | null;
  internalCost: number | null;
  specialistCost: number | null;
  recommendedFee: number | null;
  clientRange: {
    min: number | null;
    max: number | null;
  };
  confidence: Confidence;
  requiresDiscovery: boolean;
  requiresSpecialists: SpecialistService[];
  assumptions: ClientAssumptionId[];
  internalNotes: string[];
  budgetMismatch: boolean;
};

export type ClientEstimate = {
  classification: ProjectClassification;
  confidence: Confidence;
  requiresDiscovery: boolean;
  requiresSpecialists: SpecialistService[];
  clientRange: {
    min: number | null;
    max: number | null;
  };
  assumptions: ClientAssumptionId[];
};

export type ProjectBriefPayload = {
  version: string;
  locale: "pt" | "en";
  projectType: ProjectType | null;
  projectScale: RedesignDepth | SystemDepth | CampaignKind | SpecificKind | null;
  systemDepth: SystemDepth | null;
  existingBrand: ExistingBrandState[];
  identityScope: IdentityScopeItem[];
  applications: ApplicationContext[];
  applicationScale: ApplicationScale | null;
  guidelines: GuidelinesLevel | null;
  campaignKind: CampaignKind | null;
  campaignPlacements: CampaignPlacement[];
  specificKind: SpecificKind | null;
  imageComplexity: ImageComplexity | null;
  pieceCount: PieceCount | null;
  specialists: SpecialistService[];
  timeline: TimelineKind | null;
  targetDate: string | null;
  stakeholderComplexity: StakeholderComplexity | null;
  budgetRange: BudgetRange | null;
  estimate: {
    min: number | null;
    max: number | null;
    confidence: Confidence;
  };
  classification: ProjectClassification;
  requiresDiscovery: boolean;
  description: string;
  contact: ProjectContact;
};

export const STEP_IDS = [
  "projectType",
  "existingBrand",
  "redesignDepth",
  "strategyClarity",
  "identityScope",
  "systemDepth",
  "guidelines",
  "applications",
  "applicationScale",
  "campaignKind",
  "campaignPlacements",
  "specificKind",
  "imageComplexity",
  "pieceCount",
  "specialists",
  "timeline",
  "targetDate",
  "stakeholders",
  "budget",
  "description",
  "review",
  "estimate",
  "contact",
  "complete",
] as const;
export type StepId = (typeof STEP_IDS)[number];

export type SubmissionState = "idle" | "sending" | "sent" | "mailto" | "error";

export type ProjectDiscoveryState = {
  currentStep: StepId;
  answers: ProjectInput;
  contact: ProjectContact;
  returnTo: "estimate" | null;
  estimate: ClientEstimate | null;
  validation: {
    contactEmail: string | null;
    contactName: string | null;
    submit: string | null;
  };
  submissionState: SubmissionState;
};
