export { estimateProject, toClientEstimate } from "./engine";
export { pricingConfig, specialistConfig, legacyServiceEstimates } from "./pricing-config";
export {
  getStepSequence,
  emptyAnswers,
  isStepComplete,
  isQuestionStep,
  isOptionalStep,
  stepHasAnswer,
  usesSkipLabel,
} from "./steps";
export { withInferredAnswers } from "./infer";
export { getReviewSections } from "./review";
export { sanitizeAnswers, sanitizeContact, looksLikeEmail } from "./sanitize";
export { buildProjectPayload, buildStudioBrief } from "./brief";
export { trackProjectEvent } from "./analytics";
export type {
  ProjectInput,
  EstimateResult,
  ClientEstimate,
  ProjectDiscoveryState,
  SpecialistService,
  StepId,
} from "./types";
