import type { ProjectFlowContent } from "@/content/project-flow/types";
import { getStepSequence, isQuestionStep } from "./steps";
import type { ProjectInput, StepId } from "./types";

export type ReviewSection = {
  step: StepId;
  title: string;
  values: string[];
};

function optionLabel(
  options: { id: string; label: string }[],
  id: string | null | undefined,
  fallback?: string | null,
): string | null {
  if (!id) return null;
  return options.find((option) => option.id === id)?.label ?? fallback ?? null;
}

function optionLabels(
  options: { id: string; label: string }[],
  ids: readonly string[] | undefined,
): string[] {
  return (ids ?? [])
    .map((id) => optionLabel(options, id, id))
    .filter((value): value is string => Boolean(value));
}

function compact(values: Array<string | null | undefined>): string[] {
  return values.filter((value): value is string => Boolean(value && value.trim()));
}

function questionTitle(content: ProjectFlowContent, step: StepId): string {
  if (step in content.questions) {
    return content.questions[step as keyof typeof content.questions].question;
  }
  return "";
}

function valuesForStep(
  step: StepId,
  answers: ProjectInput,
  content: ProjectFlowContent,
): string[] {
  const q = content.questions;

  switch (step) {
    case "projectType":
      return compact([optionLabel(q.projectType.options, answers.projectType)]);
    case "existingBrand":
      return optionLabels(q.existingBrand.options, answers.existingBrandState);
    case "redesignDepth":
      return compact([optionLabel(q.redesignDepth.options, answers.redesignDepth)]);
    case "strategyClarity":
      return compact([optionLabel(q.strategyClarity.options, answers.strategyClarity)]);
    case "identityScope":
      return optionLabels(q.identityScope.options, answers.identityScope);
    case "systemDepth":
      return compact([optionLabel(q.systemDepth.options, answers.systemDepth)]);
    case "applications":
      return optionLabels(
        q.applications.groups.flatMap((group) => group.options),
        answers.applications,
      );
    case "campaignKind":
      return compact([optionLabel(q.campaignKind.options, answers.campaignKind)]);
    case "campaignPlacements":
      return optionLabels(q.campaignPlacements.options, answers.campaignPlacements);
    case "specificKind":
      return compact([optionLabel(q.specificKind.options, answers.specificKind)]);
    case "pieceCount":
      return compact([
        answers.pieceCount ? content.labels[`pieces:${answers.pieceCount}`] : null,
      ]);
    case "specialists":
      return optionLabels(q.specialists.options, answers.specialistServices);
    case "timeline": {
      const date = answers.targetDate?.trim();
      if (answers.timeline === "specificDate" && date) return [date];
      return compact([optionLabel(q.timeline.options, answers.timeline)]);
    }
    case "stakeholders":
      return compact([
        optionLabel(q.stakeholders.options, answers.stakeholderComplexity),
      ]);
    case "budget":
      return compact([optionLabel(q.budget.options, answers.budgetRange)]);
    case "description":
      return compact([answers.description?.trim()]);
    default:
      return [];
  }
}

export function getReviewSections(
  answers: ProjectInput,
  content: ProjectFlowContent,
): ReviewSection[] {
  return getStepSequence(answers)
    .filter((step) => isQuestionStep(step))
    .map((step) => ({
      step,
      title: questionTitle(content, step),
      values: valuesForStep(step, answers, content),
    }))
    .filter((section) => section.title.length > 0 && section.values.length > 0);
}
