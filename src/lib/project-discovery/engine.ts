import { withInferredAnswers } from "./infer";
import { pricingConfig, type PricingConfig } from "./pricing-config";
import type {
  ApplicationContext,
  BudgetRange,
  ClientAssumptionId,
  ClientEstimate,
  EstimateResult,
  ProjectClassification,
  ProjectInput,
  ProjectType,
  SpecialistService,
} from "./types";

export type EstimateOptions = {
  now?: Date;
  config?: PricingConfig;
};

const IDENTITY_TYPES: ProjectType[] = ["identityRedesign", "visualIdentity"];

function factor(value: number | null | undefined, fallback = 1): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function roundTo(value: number, increment: number): number {
  if (increment <= 0) return Math.round(value);
  return Math.round(value / increment) * increment;
}

function unique<T>(items: readonly T[]): T[] {
  return [...new Set(items)];
}

function daysUntil(dateValue: string, now: Date): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue);
  if (!match) return null;
  const target = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((target.getTime() - today) / 86_400_000);
}

function budgetCeiling(range: BudgetRange | null | undefined): number | null {
  switch (range) {
    case "under3000":
      return 3000;
    case "3000-5000":
      return 5000;
    case "5000-10000":
      return 10000;
    case "10000-20000":
      return 20000;
    case "20000+":
      return null;
    default:
      return null;
  }
}

function identityScopeMultiplier(input: ProjectInput, config: PricingConfig): number {
  const items = input.identityScope ?? [];
  const perItem = factor(config.complexity.identityScopeItemWeight, 0);
  const cap = factor(config.complexity.identityScopeItemCap, 0);
  const extras = items.reduce((sum, item) => {
    return sum + factor(config.complexity.identityScopeExtras[item], 0);
  }, 0);
  return 1 + Math.min(items.length * perItem, cap) + extras;
}

function applicationMultiplier(input: ProjectInput, config: PricingConfig): number {
  const scale = input.applicationScale
    ? factor(config.applications.scale[input.applicationScale])
    : 1;
  const contexts = input.applications ?? [];
  const extra = Math.min(
    contexts.reduce((sum, context: ApplicationContext) => {
      return sum + factor(config.applications.contextWeight[context], 0);
    }, 0),
    factor(config.applications.contextWeightCap, 0),
  );
  return scale + extra;
}

function campaignScopeMultiplier(input: ProjectInput, config: PricingConfig): number {
  const placements = input.campaignPlacements ?? [];
  const extra = Math.min(
    placements.length * factor(config.applications.campaignPlacementWeight, 0),
    factor(config.applications.campaignPlacementCap, 0),
  );
  return 1 + extra;
}

function timelineMultiplier(
  input: ProjectInput,
  config: PricingConfig,
  now: Date,
): { multiplier: number; rushed: boolean } {
  const kind = input.timeline;
  let multiplier = kind ? factor(config.timeline[kind]) : 1;
  let rushed = kind === "quickly";

  if (kind === "specificDate" && input.targetDate) {
    const days = daysUntil(input.targetDate, now);
    const windowDays = factor(config.global.rushWindowDays, 0);
    if (days !== null && days >= 0 && days <= windowDays) {
      multiplier = Math.max(multiplier, factor(config.rushDateMultiplier));
      rushed = true;
    }
  }

  return { multiplier, rushed };
}

function specialistLineCost(
  service: SpecialistService,
  input: ProjectInput,
  config: PricingConfig,
): number | null {
  const spec = config.specialists[service];
  if (!spec?.enabled) return null;
  if (spec.internalCost === null) return null;

  const heavyCore =
    input.systemDepth === "completeSystem" ||
    input.redesignDepth === "rebuild" ||
    input.campaignKind === "fullCommunication" ||
    input.imageComplexity === "highlyDetailed";

  const complexity = heavyCore ? factor(spec.complexityMultiplier, 1) : 1;
  const withMargin = spec.internalCost * complexity * (1 + factor(spec.margin, 0));
  const minimum = spec.minimumFee === null ? withMargin : Math.max(withMargin, spec.minimumFee);
  return minimum;
}

function specialistTotal(
  input: ProjectInput,
  config: PricingConfig,
): { cost: number | null; services: SpecialistService[] } {
  const selected = unique(
    (input.specialistServices ?? []).filter((service) => config.specialists[service]?.enabled),
  );
  if (selected.length === 0) return { cost: 0, services: [] };

  let total = 0;
  let anyKnown = false;
  let anyUnknown = false;

  for (const service of selected) {
    const line = specialistLineCost(service, input, config);
    if (line === null) {
      anyUnknown = true;
      continue;
    }
    anyKnown = true;
    total += line;
  }

  if (!anyKnown && anyUnknown) return { cost: null, services: selected };
  return { cost: total, services: selected };
}

function classify(input: ProjectInput): ProjectClassification {
  if (!input.projectType || input.projectType === "unsure") {
    return "needsConversation";
  }

  if (input.projectType === "specificAsset") {
    return "specificGraphic";
  }

  if (input.projectType === "visualDirection") {
    if (input.campaignKind === "keyVisual") return "keyVisual";
    return "campaignEvent";
  }

  if (input.projectType === "visualIdentity") {
    if (
      input.systemDepth === "completeSystem" ||
      input.systemDepth === "systemAndApplications" ||
      input.applicationScale === "broad" ||
      input.applicationScale === "many"
    ) {
      return "identitySystem";
    }
    return "visualIdentity";
  }

  if (input.redesignDepth === "refine" && input.systemDepth !== "completeSystem") {
    return "identityRefresh";
  }

  if (
    input.redesignDepth === "rebuild" ||
    input.systemDepth === "completeSystem" ||
    input.applicationScale === "many"
  ) {
    return "identitySystem";
  }

  return "identityRedesign";
}

function scoreComplexity(input: ProjectInput): number {
  let score = 20;

  if (input.redesignDepth === "refine") score += 8;
  if (input.redesignDepth === "reimagine") score += 28;
  if (input.redesignDepth === "rebuild") score += 48;

  if (input.systemDepth === "foundations") score += 8;
  if (input.systemDepth === "system") score += 18;
  if (input.systemDepth === "systemAndApplications") score += 28;
  if (input.systemDepth === "completeSystem") score += 40;

  if (input.imageComplexity === "simple") score += 8;
  if (input.imageComplexity === "developed") score += 22;
  if (input.imageComplexity === "highlyDetailed") score += 40;

  if (input.campaignKind === "fullCommunication") score += 24;
  if (input.campaignKind === "eventIdentity") score += 16;
  if (input.campaignKind === "keyVisual") score += 10;

  return Math.min(100, score);
}

function scoreScope(input: ProjectInput): number {
  const identityCount = input.identityScope?.length ?? 0;
  const appCount = input.applications?.length ?? 0;
  const placementCount = input.campaignPlacements?.length ?? 0;
  const pieceBoost =
    input.pieceCount === "1"
      ? 6
      : input.pieceCount === "2-3"
        ? 14
        : input.pieceCount === "4-6"
          ? 24
          : input.pieceCount === "7+"
            ? 36
            : 0;

  const scaleBoost =
    input.applicationScale === "few"
      ? 6
      : input.applicationScale === "smallSet"
        ? 14
        : input.applicationScale === "broad"
          ? 26
          : input.applicationScale === "many"
            ? 38
            : 0;

  const guidelinesBoost =
    input.guidelines === "essential" ? 6 : input.guidelines === "standard" ? 14 : input.guidelines === "detailed" ? 24 : 0;

  return Math.min(
    100,
    10 + identityCount * 4 + appCount * 3 + placementCount * 4 + pieceBoost + scaleBoost + guidelinesBoost,
  );
}

function scoreRisk(input: ProjectInput, rushed: boolean, budgetMismatch: boolean): number {
  let score = 8;

  if (input.strategyClarity === "mostlyClear") score += 8;
  if (input.strategyClarity === "stillTakingShape") score += 22;
  if (input.strategyClarity === "unsure") score += 28;

  if (input.stakeholderComplexity === "smallTeam") score += 6;
  if (input.stakeholderComplexity === "severalStakeholders") score += 14;
  if (input.stakeholderComplexity === "leadership") score += 18;
  if (input.stakeholderComplexity === "multipleOrgs") score += 28;
  if (input.stakeholderComplexity === "agencyPartner") score += 16;

  if (rushed) score += 16;
  if (budgetMismatch) score += 12;
  if (input.applicationScale === "unsure") score += 8;
  if (input.imageComplexity === "unsure") score += 8;
  if ((input.existingBrandState ?? []).includes("unsure")) score += 6;

  return Math.min(100, score);
}

function assessConfidence(input: ProjectInput, config: PricingConfig): {
  confidence: EstimateResult["confidence"];
  requiresDiscovery: boolean;
  uncertainty: number;
} {
  if (!input.projectType || input.projectType === "unsure") {
    return { confidence: "low", requiresDiscovery: true, uncertainty: 8 };
  }

  let uncertainty = 0;
  const missingWeight = factor(config.confidence.missingAnswerWeight);
  const uncertainWeight = factor(config.confidence.uncertainAnswerWeight);

  if (IDENTITY_TYPES.includes(input.projectType)) {
    if (input.projectType === "identityRedesign" && !input.redesignDepth) {
      uncertainty += missingWeight;
    }
    if (!input.identityScope?.length) uncertainty += missingWeight;
    if (!input.systemDepth) uncertainty += missingWeight;
    if (!input.guidelines) uncertainty += missingWeight * 0.5;
    if ((input.applications?.length ?? 0) > 0 && !input.applicationScale) {
      uncertainty += missingWeight * 0.5;
    }
  }

  if (input.projectType === "visualDirection") {
    if (!input.campaignKind) uncertainty += missingWeight;
    if (!input.campaignPlacements?.length) uncertainty += missingWeight * 0.5;
  }

  if (input.projectType === "specificAsset") {
    if (!input.specificKind) uncertainty += missingWeight;
    if (!input.imageComplexity) uncertainty += missingWeight;
    if (!input.pieceCount) uncertainty += missingWeight * 0.5;
  }

  if (input.strategyClarity === "stillTakingShape") uncertainty += uncertainWeight * 1.5;
  if (input.strategyClarity === "unsure") uncertainty += uncertainWeight * 2;
  if (input.applicationScale === "unsure") uncertainty += uncertainWeight;
  if (input.imageComplexity === "unsure") uncertainty += uncertainWeight;
  if ((input.existingBrandState ?? []).includes("unsure")) uncertainty += uncertainWeight * 0.5;
  if (input.timeline === "specificDate" && !input.targetDate) uncertainty += uncertainWeight;

  const discoveryBecauseStrategy =
    IDENTITY_TYPES.includes(input.projectType) &&
    (input.strategyClarity === "unsure" || input.strategyClarity === "stillTakingShape") &&
    (input.redesignDepth === "rebuild" ||
      input.systemDepth === "completeSystem" ||
      input.applicationScale === "broad" ||
      input.applicationScale === "many" ||
      (input.identityScope?.length ?? 0) >= 8);

  const requiresDiscovery =
    discoveryBecauseStrategy || uncertainty >= factor(config.confidence.lowThreshold);

  if (requiresDiscovery) {
    return { confidence: "low", requiresDiscovery: true, uncertainty };
  }

  if (uncertainty >= factor(config.confidence.mediumThreshold)) {
    return { confidence: "medium", requiresDiscovery: false, uncertainty };
  }

  return { confidence: "high", requiresDiscovery: false, uncertainty };
}

function computeCoreFee(
  input: ProjectInput,
  config: PricingConfig,
  now: Date,
): { fee: number | null; rushed: boolean } {
  const type = input.projectType;
  if (!type) return { fee: null, rushed: false };

  const typeConfig = config.projectTypes[type];
  const { multiplier: timeFactor, rushed } = timelineMultiplier(input, config, now);

  if (typeConfig.method === "none" || typeConfig.baseFee === null) {
    return { fee: null, rushed };
  }

  let fee = typeConfig.baseFee;

  if (type === "identityRedesign" || type === "visualIdentity") {
    if (input.redesignDepth) {
      fee *= factor(config.complexity.redesignDepth[input.redesignDepth]);
    }
    if (input.systemDepth) {
      fee *= factor(config.complexity.systemDepth[input.systemDepth]);
    }
    fee *= identityScopeMultiplier(input, config);
    if (input.guidelines) {
      fee *= factor(config.guidelines[input.guidelines]);
    }
    fee *= applicationMultiplier(input, config);
    if (input.strategyClarity) {
      fee *= factor(config.strategy[input.strategyClarity]);
    }
  }

  if (type === "visualDirection") {
    if (input.campaignKind) {
      fee *= factor(config.complexity.campaignKind[input.campaignKind]);
    }
    fee *= campaignScopeMultiplier(input, config);
    if (input.strategyClarity) {
      fee *= factor(config.strategy[input.strategyClarity]);
    }
  }

  if (type === "specificAsset") {
    if (input.imageComplexity) {
      fee *= factor(config.complexity.imageComplexity[input.imageComplexity]);
    }
    if (input.pieceCount) {
      fee *= factor(config.complexity.pieceCount[input.pieceCount]);
    }
  }

  if (input.stakeholderComplexity) {
    fee *= factor(config.stakeholders[input.stakeholderComplexity]);
  }

  fee *= timeFactor;

  if (typeConfig.minimumFee !== null) {
    fee = Math.max(fee, typeConfig.minimumFee);
  }
  if (config.global.minimumProjectFee !== null) {
    fee = Math.max(fee, config.global.minimumProjectFee);
  }
  if (typeConfig.maximumFee !== null) {
    fee = Math.min(fee, typeConfig.maximumFee);
  }
  if (config.global.maximumRecommendedFee !== null) {
    fee = Math.min(fee, config.global.maximumRecommendedFee);
  }

  return { fee, rushed };
}

function clientRange(
  recommendedFee: number | null,
  confidence: EstimateResult["confidence"],
  requiresDiscovery: boolean,
  config: PricingConfig,
): EstimateResult["clientRange"] {
  if (recommendedFee === null || requiresDiscovery || confidence === "low") {
    return { min: null, max: null };
  }

  const increment = factor(config.global.roundingIncrement, 500);
  const low = roundTo(recommendedFee * factor(config.global.estimateRange.lowMultiplier), increment);
  let high = roundTo(
    recommendedFee * factor(config.global.estimateRange.highMultiplier),
    increment,
  );
  if (high <= low) high = low + increment;
  return { min: low, max: high };
}

function assumptionsFor(
  input: ProjectInput,
  requiresDiscovery: boolean,
  specialists: SpecialistService[],
): ClientAssumptionId[] {
  const assumptions: ClientAssumptionId[] = ["scopeDescribed", "estimateNotBinding"];

  if (input.strategyClarity === "mostlyClear") assumptions.push("strategyPartiallyDefined");
  if (input.strategyClarity === "stillTakingShape" || input.strategyClarity === "unsure") {
    assumptions.push("strategyUndefined");
  }
  if (specialists.length > 0) assumptions.push("specialistsIntegrated");
  if (requiresDiscovery) assumptions.push("discoveryRecommended");
  if (input.applicationScale === "unsure") assumptions.push("applicationsUncertain");
  if (input.timeline === "noDate" || !input.timeline) assumptions.push("timelineFlexible");

  return unique(assumptions);
}

export function estimateProject(
  input: ProjectInput,
  options: EstimateOptions = {},
): EstimateResult {
  const config = options.config ?? pricingConfig;
  const now = options.now ?? new Date();
  input = withInferredAnswers(input);
  const classification = classify(input);
  const { fee: coreFee, rushed } = computeCoreFee(input, config, now);
  const specialists = specialistTotal(input, config);
  const { confidence, requiresDiscovery } = assessConfidence(input, config);

  const recommendedFee =
    coreFee === null && specialists.cost === null
      ? null
      : (coreFee ?? 0) + (specialists.cost ?? 0) || null;

  const increment = factor(config.global.roundingIncrement, 500);
  const roundedFee =
    recommendedFee === null ? null : Math.max(increment, roundTo(recommendedFee, increment));

  const ceiling = budgetCeiling(input.budgetRange);
  const mismatchRatio = factor(config.confidence.budgetMismatchRatio, 0.7);
  const budgetMismatch =
    roundedFee !== null && ceiling !== null && ceiling < roundedFee * mismatchRatio;

  const range = clientRange(roundedFee, confidence, requiresDiscovery, config);

  const internalNotes: string[] = [];
  if (config.usesDevelopmentPlaceholders) {
    internalNotes.push("Estimate uses development placeholder fees, not studio quotations.");
  }
  if (requiresDiscovery) {
    internalNotes.push("Strategic direction appears insufficiently defined for a responsible estimate.");
  }
  if (rushed) {
    internalNotes.push("Timeline is compressed; discuss sequencing before confirming a start.");
  }
  if (budgetMismatch) {
    internalNotes.push("Stated investment range sits below the current estimate of scope.");
  }
  if (specialists.services.length > 0) {
    internalNotes.push(
      `Specialist extensions: ${specialists.services.join(", ")}. Studio remains responsible for visual direction.`,
    );
  }
  if (input.strategyClarity === "mostlyClear" || input.strategyClarity === "stillTakingShape") {
    internalNotes.push("Further discussion recommended before a final quotation.");
  }

  const effortDivisor = factor(config.global.effortDivisor, 0);
  const internalEffort =
    roundedFee === null || effortDivisor <= 0 ? null : Math.round((roundedFee / effortDivisor) * 10) / 10;

  return {
    classification,
    complexityScore: scoreComplexity(input),
    scopeScore: scoreScope(input),
    riskScore: scoreRisk(input, rushed, budgetMismatch),
    internalEffort,
    internalCost: coreFee === null ? null : roundTo(coreFee, increment),
    specialistCost: specialists.cost === null ? null : roundTo(specialists.cost, increment),
    recommendedFee: roundedFee,
    clientRange: range,
    confidence,
    requiresDiscovery,
    requiresSpecialists: specialists.services,
    assumptions: assumptionsFor(input, requiresDiscovery, specialists.services),
    internalNotes,
    budgetMismatch,
  };
}

export function toClientEstimate(result: EstimateResult): ClientEstimate {
  return {
    classification: result.classification,
    confidence: result.confidence,
    requiresDiscovery: result.requiresDiscovery,
    requiresSpecialists: result.requiresSpecialists,
    clientRange: result.clientRange,
    assumptions: result.assumptions,
  };
}
