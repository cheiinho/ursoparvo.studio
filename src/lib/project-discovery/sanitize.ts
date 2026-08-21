import {
  APPLICATION_CONTEXTS,
  APPLICATION_SCALES,
  BUDGET_RANGES,
  CAMPAIGN_KINDS,
  CAMPAIGN_PLACEMENTS,
  EXISTING_BRAND_STATES,
  GUIDELINES_LEVELS,
  IDENTITY_SCOPE_ITEMS,
  IMAGE_COMPLEXITIES,
  PIECE_COUNTS,
  PROJECT_TYPES,
  REDESIGN_DEPTHS,
  SPECIALIST_SERVICES,
  SPECIFIC_KINDS,
  STAKEHOLDER_COMPLEXITIES,
  STRATEGY_CLARITIES,
  SYSTEM_DEPTHS,
  TIMELINE_KINDS,
  type ProjectContact,
  type ProjectInput,
  type ProjectType,
} from "./types";
import { emptyAnswers } from "./steps";

function asString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function pick<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : null;
}

function pickMany<T extends string>(value: unknown, allowed: readonly T[]): T[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => pick(item, allowed))
    .filter((item): item is T => item !== null);
}

export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function sanitizeAnswers(value: unknown): ProjectInput {
  const raw = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const projectType = pick(raw.projectType, PROJECT_TYPES);

  return {
    ...emptyAnswers(),
    projectType,
    existingBrandState: pickMany(raw.existingBrandState, EXISTING_BRAND_STATES),
    redesignDepth: pick(raw.redesignDepth, REDESIGN_DEPTHS),
    strategyClarity: pick(raw.strategyClarity, STRATEGY_CLARITIES),
    identityScope: pickMany(raw.identityScope, IDENTITY_SCOPE_ITEMS),
    systemDepth: pick(raw.systemDepth, SYSTEM_DEPTHS),
    guidelines: pick(raw.guidelines, GUIDELINES_LEVELS),
    applications: pickMany(raw.applications, APPLICATION_CONTEXTS),
    applicationScale: pick(raw.applicationScale, APPLICATION_SCALES),
    campaignKind: pick(raw.campaignKind, CAMPAIGN_KINDS),
    campaignPlacements: pickMany(raw.campaignPlacements, CAMPAIGN_PLACEMENTS),
    specificKind: pick(raw.specificKind, SPECIFIC_KINDS),
    imageComplexity: pick(raw.imageComplexity, IMAGE_COMPLEXITIES),
    pieceCount: pick(raw.pieceCount, PIECE_COUNTS),
    specialistServices: pickMany(raw.specialistServices, SPECIALIST_SERVICES),
    timeline: pick(raw.timeline, TIMELINE_KINDS),
    targetDate: asString(raw.targetDate, 10) || null,
    stakeholderComplexity: pick(raw.stakeholderComplexity, STAKEHOLDER_COMPLEXITIES),
    budgetRange: pick(raw.budgetRange, BUDGET_RANGES),
    description: asString(raw.description, 2000),
  };
}

export function sanitizeContact(value: unknown): ProjectContact {
  const raw = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    name: asString(raw.name, 200),
    email: asString(raw.email, 200),
    company: asString(raw.company, 200) || undefined,
    website: asString(raw.website, 300) || undefined,
    phone: asString(raw.phone, 40) || undefined,
  };
}

export function isValidProjectType(value: ProjectType | null): value is ProjectType {
  return value !== null;
}
