/**
 * Project estimation configuration for UrsoParvo Studio.
 *
 * IMPORTANT
 * ---------
 * Values marked PLACEHOLDER are development/testing figures only.
 * They are not a quotation, a rate card, or the studio’s commercial offer.
 * Replace them with the studio’s real numbers before treating estimates
 * as part of a live commercial process.
 *
 * Do not expose this file to the client bundle. The public site must never
 * show hourly rates, internal margins, partner costs, or the formula.
 *
 * Existing public service ranges from `src/lib/estimate.ts` are copied below
 * as `legacyServiceEstimates` and must not be overwritten.
 */

import type { ServiceId } from "../estimate";
import type {
  ApplicationContext,
  ApplicationScale,
  CampaignKind,
  GuidelinesLevel,
  IdentityScopeItem,
  ImageComplexity,
  PieceCount,
  ProjectType,
  RedesignDepth,
  SpecialistService,
  StakeholderComplexity,
  StrategyClarity,
  SystemDepth,
  TimelineKind,
} from "./types";

/** A numeric config field. `null` means “not yet set — skip this factor”. */
export type ConfigNumber = number | null;

export type CalculationMethod = "multiplicative" | "none";

export type ProjectTypeConfig = {
  /** Studio fee for a typical project of this type, before multipliers. PLACEHOLDER until replaced. */
  baseFee: ConfigNumber;
  /** Floor for this type after all multipliers, before specialists. */
  minimumFee: ConfigNumber;
  /** Optional ceiling for a recommended fee of this type. */
  maximumFee: ConfigNumber;
  /** How this type is priced. Swap the method without changing the UI. */
  method: CalculationMethod;
  /**
   * Rough internal effort index (not hours billed to the client).
   * Used only for studio-facing notes. Null until calibrated.
   */
  effortIndex: ConfigNumber;
};

export type SpecialistTypeConfig = {
  enabled: boolean;
  /** Internal production / partner cost. Never shown to the client. */
  internalCost: ConfigNumber;
  /** Studio margin applied on top of internal cost. 0.15 = 15%. */
  margin: ConfigNumber;
  /** Client-facing floor for this specialist line, after margin. */
  minimumFee: ConfigNumber;
  /** Extra complexity applied when the core project is already heavy. */
  complexityMultiplier: ConfigNumber;
  notes: string;
  /** Optional partner id from an internal directory — never a public name. */
  partnerId: string | null;
};

export type PricingConfig = {
  version: string;
  /**
   * When true, fee fields are development placeholders.
   * Flip to false only after real studio numbers are in place.
   */
  usesDevelopmentPlaceholders: boolean;
  global: {
    currency: "EUR";
    /** Absolute floor across every project type, after type minimums. */
    minimumProjectFee: ConfigNumber;
    /** Absolute ceiling for a recommended fee. Null = no cap. */
    maximumRecommendedFee: ConfigNumber;
    /** Range width around the recommended fee. 0.9 / 1.15 → ± roughly a tenth. */
    estimateRange: {
      lowMultiplier: ConfigNumber;
      highMultiplier: ConfigNumber;
    };
    /** Snap displayed (and internal recommended) amounts to this increment. */
    roundingIncrement: ConfigNumber;
    /** Days from today that count as a compressed timeline. */
    rushWindowDays: ConfigNumber;
    /** Internal effort is recommendedFee / this divisor. Not an hourly rate. */
    effortDivisor: ConfigNumber;
  };
  projectTypes: Record<ProjectType, ProjectTypeConfig>;
  complexity: {
    redesignDepth: Record<RedesignDepth, ConfigNumber>;
    systemDepth: Record<SystemDepth, ConfigNumber>;
    imageComplexity: Record<ImageComplexity, ConfigNumber>;
    pieceCount: Record<PieceCount, ConfigNumber>;
    campaignKind: Record<CampaignKind, ConfigNumber>;
    /**
     * Added to 1 according to how many identity elements are selected.
     * Capped by `identityScopeItemCap`.
     */
    identityScopeItemWeight: ConfigNumber;
    identityScopeItemCap: ConfigNumber;
    /** Extra scope weight for physically demanding identity elements. */
    identityScopeExtras: Partial<Record<IdentityScopeItem, ConfigNumber>>;
  };
  applications: {
    scale: Record<ApplicationScale, ConfigNumber>;
    /** Extra scope weight per application context. Unlisted contexts contribute 0. */
    contextWeight: Partial<Record<ApplicationContext, ConfigNumber>>;
    contextWeightCap: ConfigNumber;
    /** Campaign placements are counted with this weight each, capped. */
    campaignPlacementWeight: ConfigNumber;
    campaignPlacementCap: ConfigNumber;
  };
  guidelines: Record<GuidelinesLevel, ConfigNumber>;
  timeline: Record<TimelineKind, ConfigNumber>;
  /** Applied instead of (or on top of) timeline.quickly when the date is inside the rush window. */
  rushDateMultiplier: ConfigNumber;
  stakeholders: Record<StakeholderComplexity, ConfigNumber>;
  strategy: Record<StrategyClarity, ConfigNumber>;
  confidence: {
    /** Unanswered optional identity questions that still lower confidence. */
    missingAnswerWeight: ConfigNumber;
    uncertainAnswerWeight: ConfigNumber;
    /** Scores at or above this (after weights) stay medium rather than high. */
    mediumThreshold: ConfigNumber;
    /** Scores at or above this become low-confidence / discovery. */
    lowThreshold: ConfigNumber;
    /** If stated budget max is below fee * this, flag a mismatch. */
    budgetMismatchRatio: ConfigNumber;
  };
  specialists: Record<SpecialistService, SpecialistTypeConfig>;
};

/**
 * Preserved from `src/lib/estimate.ts`.
 * These are the existing public ranges for the legacy service checkboxes.
 * Do not overwrite them. The discovery engine does not use them.
 */
export const legacyServiceEstimates: Record<ServiceId, { min: number; max: number }> = {
  identidade: { min: 1800, max: 3000 },
  grafismo: { min: 400, max: 900 },
  fotografia: { min: 300, max: 700 },
};

/**
 * DEVELOPMENT PLACEHOLDERS
 * Not UrsoParvo prices. Used so the engine, tests and UI can run before
 * the studio fills in real commercial values.
 */
const PLACEHOLDER = {
  identityRedesign: { baseFee: 6200, minimumFee: 4200, maximumFee: 28000, effortIndex: 18 },
  visualIdentity: { baseFee: 6800, minimumFee: 4800, maximumFee: 32000, effortIndex: 22 },
  visualDirection: { baseFee: 4200, minimumFee: 2800, maximumFee: 18000, effortIndex: 12 },
  specificAsset: { baseFee: 1600, minimumFee: 900, maximumFee: 8000, effortIndex: 5 },
  globalMinimum: 1200,
  globalMaximum: 80000,
  rangeLow: 0.9,
  rangeHigh: 1.15,
  rounding: 500,
  rushDays: 21,
  effortDivisor: 350,
  rushDate: 1.22,
  specialists: {
    motion: 1800,
    film: 3800,
    photography: 1400,
    digitalDesign: 2600,
    development: 3600,
    advertising: 2200,
    "3d": 2200,
    writing: 900,
    spatial: 2000,
  } satisfies Record<SpecialistService, number>,
  specialistMargin: 0.15,
} as const;

export const pricingConfig: PricingConfig = {
  version: "1.0",
  usesDevelopmentPlaceholders: true,
  global: {
    currency: "EUR",
    minimumProjectFee: PLACEHOLDER.globalMinimum,
    maximumRecommendedFee: PLACEHOLDER.globalMaximum,
    estimateRange: {
      lowMultiplier: PLACEHOLDER.rangeLow,
      highMultiplier: PLACEHOLDER.rangeHigh,
    },
    roundingIncrement: PLACEHOLDER.rounding,
    rushWindowDays: PLACEHOLDER.rushDays,
    effortDivisor: PLACEHOLDER.effortDivisor,
  },
  projectTypes: {
    identityRedesign: {
      baseFee: PLACEHOLDER.identityRedesign.baseFee,
      minimumFee: PLACEHOLDER.identityRedesign.minimumFee,
      maximumFee: PLACEHOLDER.identityRedesign.maximumFee,
      method: "multiplicative",
      effortIndex: PLACEHOLDER.identityRedesign.effortIndex,
    },
    visualIdentity: {
      baseFee: PLACEHOLDER.visualIdentity.baseFee,
      minimumFee: PLACEHOLDER.visualIdentity.minimumFee,
      maximumFee: PLACEHOLDER.visualIdentity.maximumFee,
      method: "multiplicative",
      effortIndex: PLACEHOLDER.visualIdentity.effortIndex,
    },
    visualDirection: {
      baseFee: PLACEHOLDER.visualDirection.baseFee,
      minimumFee: PLACEHOLDER.visualDirection.minimumFee,
      maximumFee: PLACEHOLDER.visualDirection.maximumFee,
      method: "multiplicative",
      effortIndex: PLACEHOLDER.visualDirection.effortIndex,
    },
    specificAsset: {
      baseFee: PLACEHOLDER.specificAsset.baseFee,
      minimumFee: PLACEHOLDER.specificAsset.minimumFee,
      maximumFee: PLACEHOLDER.specificAsset.maximumFee,
      method: "multiplicative",
      effortIndex: PLACEHOLDER.specificAsset.effortIndex,
    },
    unsure: {
      baseFee: null,
      minimumFee: null,
      maximumFee: null,
      method: "none",
      effortIndex: null,
    },
  },
  complexity: {
    redesignDepth: {
      refine: 0.72,
      reimagine: 1,
      rebuild: 1.28,
    },
    systemDepth: {
      foundations: 0.85,
      system: 1,
      systemAndApplications: 1.18,
      completeSystem: 1.38,
    },
    imageComplexity: {
      simple: 0.75,
      developed: 1,
      highlyDetailed: 1.45,
      unsure: 1,
    },
    pieceCount: {
      "1": 1,
      "2-3": 1.55,
      "4-6": 2.3,
      "7+": 3.1,
    },
    campaignKind: {
      eventIdentity: 1.05,
      keyVisual: 0.78,
      campaignLanguage: 1.12,
      posterCampaign: 0.88,
      digitalCampaign: 0.9,
      fullCommunication: 1.36,
      other: 1,
    },
    identityScopeItemWeight: 0.04,
    identityScopeItemCap: 0.4,
    identityScopeExtras: {
      packaging: 0.06,
      signage: 0.05,
      merchandise: 0.04,
      photographyDirection: 0.03,
    },
  },
  applications: {
    scale: {
      few: 1,
      smallSet: 1.12,
      broad: 1.28,
      many: 1.48,
      unsure: 1.1,
    },
    contextWeight: {
      website: 0.03,
      digitalProducts: 0.04,
      publications: 0.03,
      packaging: 0.05,
      signage: 0.04,
      environment: 0.06,
      advertising: 0.04,
      events: 0.03,
    },
    contextWeightCap: 0.22,
    campaignPlacementWeight: 0.04,
    campaignPlacementCap: 0.28,
  },
  guidelines: {
    essential: 1,
    standard: 1.1,
    detailed: 1.24,
  },
  timeline: {
    noDate: 1,
    fewMonths: 1,
    specificDate: 1,
    quickly: 1.18,
  },
  rushDateMultiplier: PLACEHOLDER.rushDate,
  stakeholders: {
    oneDecisionMaker: 1,
    smallTeam: 1.05,
    severalStakeholders: 1.12,
    leadership: 1.18,
    multipleOrgs: 1.28,
    agencyPartner: 1.14,
  },
  strategy: {
    veryClear: 1,
    mostlyClear: 1.06,
    stillTakingShape: 1.18,
    unsure: 1.22,
  },
  confidence: {
    missingAnswerWeight: 1,
    uncertainAnswerWeight: 1,
    mediumThreshold: 2,
    lowThreshold: 4,
    budgetMismatchRatio: 0.7,
  },
  specialists: {
    motion: {
      enabled: true,
      internalCost: PLACEHOLDER.specialists.motion,
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 1200,
      complexityMultiplier: 1,
      notes: "Motion identity, animated assets, or simple animation extensions.",
      partnerId: null,
    },
    film: {
      enabled: true,
      internalCost: PLACEHOLDER.specialists.film,
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 2500,
      complexityMultiplier: 1,
      notes: "Filming, editing, or audiovisual campaigns.",
      partnerId: null,
    },
    photography: {
      enabled: true,
      internalCost: PLACEHOLDER.specialists.photography,
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 900,
      complexityMultiplier: 1,
      notes: "Photography production or photographic art direction.",
      partnerId: null,
    },
    digitalDesign: {
      enabled: true,
      internalCost: PLACEHOLDER.specialists.digitalDesign,
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 1800,
      complexityMultiplier: 1,
      notes: "Website design, landing pages, or digital experiences.",
      partnerId: null,
    },
    development: {
      enabled: true,
      internalCost: PLACEHOLDER.specialists.development,
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 2400,
      complexityMultiplier: 1,
      notes: "Web development or technical implementation.",
      partnerId: null,
    },
    advertising: {
      enabled: true,
      internalCost: PLACEHOLDER.specialists.advertising,
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 1500,
      complexityMultiplier: 1,
      notes: "Campaign development and advertising assets.",
      partnerId: null,
    },
    "3d": {
      enabled: true,
      internalCost: PLACEHOLDER.specialists["3d"],
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 1500,
      complexityMultiplier: 1,
      notes: "3D imagery, renders, or animation.",
      partnerId: null,
    },
    writing: {
      enabled: true,
      internalCost: PLACEHOLDER.specialists.writing,
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 600,
      complexityMultiplier: 1,
      notes: "Naming, copywriting, or verbal identity.",
      partnerId: null,
    },
    spatial: {
      enabled: true,
      internalCost: PLACEHOLDER.specialists.spatial,
      margin: PLACEHOLDER.specialistMargin,
      minimumFee: 1400,
      complexityMultiplier: 1,
      notes: "Environmental graphics, signage, or physical experiences.",
      partnerId: null,
    },
  },
};

export const specialistConfig = pricingConfig.specialists;
