import type { ProjectInput, StepId } from "./types";

const IDENTITY_STEPS: StepId[] = [
  "existingBrand",
  "strategyClarity",
  "identityScope",
  "systemDepth",
  "guidelines",
  "applications",
];

export function getStepSequence(answers: ProjectInput): StepId[] {
  const steps: StepId[] = ["projectType"];

  switch (answers.projectType) {
    case "identityRedesign":
      steps.push("existingBrand", "redesignDepth", ...IDENTITY_STEPS.slice(1));
      if ((answers.applications?.length ?? 0) > 0) steps.push("applicationScale");
      break;
    case "visualIdentity":
      steps.push(...IDENTITY_STEPS);
      if ((answers.applications?.length ?? 0) > 0) steps.push("applicationScale");
      break;
    case "visualDirection":
      steps.push("campaignKind", "campaignPlacements");
      break;
    case "specificAsset":
      steps.push("specificKind", "imageComplexity", "pieceCount");
      break;
    case "unsure":
      steps.push("strategyClarity");
      break;
    default:
      break;
  }

  steps.push("specialists", "timeline");
  if (answers.timeline === "specificDate") steps.push("targetDate");
  steps.push("stakeholders", "budget", "description", "review", "estimate", "contact");

  return steps;
}

export function isQuestionStep(step: StepId): boolean {
  return step !== "review" && step !== "estimate" && step !== "contact" && step !== "complete";
}

export function emptyAnswers(): ProjectInput {
  return {
    projectType: null,
    existingBrandState: [],
    redesignDepth: null,
    strategyClarity: null,
    identityScope: [],
    systemDepth: null,
    guidelines: null,
    applications: [],
    applicationScale: null,
    campaignKind: null,
    campaignPlacements: [],
    specificKind: null,
    imageComplexity: null,
    pieceCount: null,
    specialistServices: [],
    timeline: null,
    targetDate: null,
    stakeholderComplexity: null,
    budgetRange: null,
    description: "",
  };
}

export function isStepComplete(step: StepId, answers: ProjectInput): boolean {
  switch (step) {
    case "projectType":
      return answers.projectType !== null;
    default:
      return true;
  }
}
