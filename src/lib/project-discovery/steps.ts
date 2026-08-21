import type { ProjectInput, StepId } from "./types";

const CLOSING_STEPS: StepId[] = ["estimate", "contact"];

export function getStepSequence(answers: ProjectInput): StepId[] {
  const steps: StepId[] = ["projectType"];

  switch (answers.projectType) {
    case "identityRedesign":
      steps.push("redesignDepth", "strategyClarity", "identityScope", "systemDepth", "applications");
      break;
    case "visualIdentity":
      steps.push("existingBrand", "strategyClarity", "identityScope", "systemDepth", "applications");
      break;
    case "visualDirection":
      steps.push("campaignKind", "campaignPlacements");
      break;
    case "specificAsset":
      steps.push("specificKind", "pieceCount");
      break;
    case "unsure":
      steps.push("strategyClarity");
      break;
    default:
      break;
  }

  if (answers.projectType && answers.projectType !== "unsure") {
    steps.push("specialists");
  }

  steps.push("timeline", "stakeholders", "budget", "description");
  steps.push(...CLOSING_STEPS);

  return steps;
}

export function isQuestionStep(step: StepId): boolean {
  return step !== "estimate" && step !== "contact" && step !== "complete" && step !== "review";
}

export function isOptionalStep(step: StepId): boolean {
  return step !== "projectType";
}

export function stepHasAnswer(step: StepId, answers: ProjectInput): boolean {
  switch (step) {
    case "projectType":
      return answers.projectType !== null;
    case "existingBrand":
      return (answers.existingBrandState?.length ?? 0) > 0;
    case "redesignDepth":
      return answers.redesignDepth != null;
    case "strategyClarity":
      return answers.strategyClarity != null;
    case "identityScope":
      return (answers.identityScope?.length ?? 0) > 0;
    case "systemDepth":
      return answers.systemDepth != null;
    case "guidelines":
      return answers.guidelines != null;
    case "applications":
      return (answers.applications?.length ?? 0) > 0;
    case "applicationScale":
      return answers.applicationScale != null;
    case "campaignKind":
      return answers.campaignKind != null;
    case "campaignPlacements":
      return (answers.campaignPlacements?.length ?? 0) > 0;
    case "specificKind":
      return answers.specificKind != null;
    case "imageComplexity":
      return answers.imageComplexity != null;
    case "pieceCount":
      return answers.pieceCount != null;
    case "specialists":
      return (answers.specialistServices?.length ?? 0) > 0;
    case "timeline":
      return answers.timeline != null;
    case "targetDate":
      return Boolean(answers.targetDate);
    case "stakeholders":
      return answers.stakeholderComplexity != null;
    case "budget":
      return answers.budgetRange != null;
    case "description":
      return Boolean(answers.description?.trim());
    default:
      return true;
  }
}

/** Optional choice questions with nothing selected get a skip-labelled continue. */
export function usesSkipLabel(step: StepId, answers: ProjectInput): boolean {
  if (step === "projectType" || step === "description") return false;
  if (step === "timeline" && answers.timeline === "specificDate") return false;
  return isOptionalStep(step) && !stepHasAnswer(step, answers);
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
