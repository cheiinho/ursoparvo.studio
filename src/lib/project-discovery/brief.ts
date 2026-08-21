import type { Lang } from "../i18n";
import { formatEuro } from "../estimate";
import type {
  EstimateResult,
  ProjectBriefPayload,
  ProjectContact,
  ProjectInput,
} from "./types";
import { emptyAnswers } from "./steps";

type BriefLabels = {
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
  confidenceLabels: Record<EstimateResult["confidence"], string>;
};

function join(values: string[], fallback: string): string {
  return values.length > 0 ? values.join("\n") : fallback;
}

function mapLabels(ids: readonly string[] | undefined, labels: Record<string, string>): string[] {
  return (ids ?? []).map((id) => labels[id] ?? id);
}

function rangeText(
  min: number | null,
  max: number | null,
  locale: string,
  fallback: string,
): string {
  if (min === null || max === null) return fallback;
  return `${formatEuro(min, locale)}–${formatEuro(max, locale)}`;
}

export function buildProjectPayload(
  answers: ProjectInput,
  contact: ProjectContact,
  result: EstimateResult,
  locale: Lang,
): ProjectBriefPayload {
  const projectScale =
    answers.redesignDepth ??
    answers.systemDepth ??
    answers.campaignKind ??
    answers.specificKind ??
    null;

  return {
    version: "1.0",
    locale,
    projectType: answers.projectType,
    projectScale,
    systemDepth: answers.systemDepth ?? null,
    existingBrand: answers.existingBrandState ?? [],
    identityScope: answers.identityScope ?? [],
    applications: answers.applications ?? [],
    applicationScale: answers.applicationScale ?? null,
    guidelines: answers.guidelines ?? null,
    campaignKind: answers.campaignKind ?? null,
    campaignPlacements: answers.campaignPlacements ?? [],
    specificKind: answers.specificKind ?? null,
    imageComplexity: answers.imageComplexity ?? null,
    pieceCount: answers.pieceCount ?? null,
    specialists: answers.specialistServices ?? [],
    timeline: answers.timeline ?? null,
    targetDate: answers.targetDate ?? null,
    stakeholderComplexity: answers.stakeholderComplexity ?? null,
    budgetRange: answers.budgetRange ?? null,
    estimate: {
      min: result.clientRange.min,
      max: result.clientRange.max,
      confidence: result.confidence,
    },
    classification: result.classification,
    requiresDiscovery: result.requiresDiscovery,
    description: answers.description?.trim() ?? "",
    contact,
  };
}

export function buildStudioBrief(
  payload: ProjectBriefPayload,
  result: EstimateResult,
  labels: BriefLabels,
  options: { includeInternal?: boolean } = {},
): string {
  const locale = payload.locale === "en" ? "en-GB" : "pt-PT";
  const existingBrandLabels = {
    ...labels.labels,
    visualIdentity: labels.labels.visualIdentityExisting ?? labels.labels.visualIdentity,
    logo: labels.labels.logoMark ?? labels.labels.logo,
  };

  const overviewParts = [
    payload.projectType ? labels.labels[payload.projectType] : labels.notSpecified,
    payload.projectScale ? labels.labels[payload.projectScale] : null,
  ].filter((value): value is string => Boolean(value));

  const scope = [
    ...mapLabels(payload.identityScope, labels.labels),
    payload.guidelines ? labels.labels[payload.guidelines] : null,
    payload.systemDepth ? labels.labels[payload.systemDepth] : null,
    payload.specificKind ? labels.labels[payload.specificKind] : null,
    payload.imageComplexity ? labels.labels[payload.imageComplexity] : null,
    payload.pieceCount ? labels.labels[`pieces:${payload.pieceCount}`] : null,
  ].filter((value): value is string => Boolean(value));

  const applications = [
    ...mapLabels(payload.applications, labels.labels),
    payload.applicationScale ? labels.labels[payload.applicationScale] : null,
    ...mapLabels(payload.campaignPlacements, labels.labels),
  ].filter((value): value is string => Boolean(value));

  const timeline =
    payload.targetDate ||
    (payload.timeline ? labels.labels[payload.timeline] : labels.notSpecified);

  const budget = payload.budgetRange
    ? labels.labels[payload.budgetRange]
    : labels.notSpecified;

  const sections = [
    `${labels.project}\n${overviewParts.join(" · ")}`,
    `${labels.overview}\n${join(mapLabels(payload.existingBrand, existingBrandLabels), labels.notSpecified)}`,
    `${labels.scope}\n${join(scope, labels.notSpecified)}`,
    `${labels.applications}\n${join(applications, labels.none)}`,
    `${labels.extensions}\n${join(mapLabels(payload.specialists, labels.labels), labels.none)}`,
    `${labels.timeline}\n${timeline}`,
    `${labels.budget}\n${budget}`,
    `${labels.initialEstimate}\n${rangeText(payload.estimate.min, payload.estimate.max, locale, labels.toBeDiscussed)}`,
    options.includeInternal !== false
      ? `${labels.confidence}\n${labels.confidenceLabels[payload.estimate.confidence]}`
      : null,
    payload.description ? `${labels.notes}\n${payload.description}` : null,
    options.includeInternal !== false && result.internalNotes.length > 0
      ? `${labels.notes}\n${result.internalNotes.join("\n")}`
      : null,
    `${labels.contact}\n${payload.contact.name}\n${payload.contact.email}${payload.contact.company ? `\n${payload.contact.company}` : ""}${payload.contact.website ? `\n${payload.contact.website}` : ""}${payload.contact.phone ? `\n${payload.contact.phone}` : ""}`,
  ].filter((section): section is string => Boolean(section));

  return sections.join("\n\n");
}

export function answersFromUnknown(value: unknown): ProjectInput {
  const answers = emptyAnswers();
  if (!value || typeof value !== "object") return answers;
  return { ...answers, ...(value as ProjectInput) };
}
