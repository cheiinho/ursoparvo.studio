import type { ProjectFlowContent } from "@/content/project-flow/types";
import { getStepSequence } from "./steps";
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

function firstAskedStep(answers: ProjectInput, candidates: StepId[]): StepId {
  const sequence = getStepSequence(answers);
  return candidates.find((step) => sequence.includes(step)) ?? candidates[0];
}

export function getReviewSections(
  answers: ProjectInput,
  content: ProjectFlowContent,
): ReviewSection[] {
  const q = content.questions;
  const titles = content.review.sections;
  const sections: ReviewSection[] = [];

  const type = optionLabel(q.projectType.options, answers.projectType);
  if (type) {
    sections.push({ step: "projectType", title: titles.type, values: [type] });
  }

  const scope = compact([
    optionLabel(q.redesignDepth.options, answers.redesignDepth),
    ...optionLabels(q.existingBrand.options, answers.existingBrandState),
    ...optionLabels(q.identityScope.options, answers.identityScope),
    optionLabel(q.systemDepth.options, answers.systemDepth),
    optionLabel(q.campaignKind.options, answers.campaignKind),
    optionLabel(q.specificKind.options, answers.specificKind),
    answers.pieceCount ? content.labels[`pieces:${answers.pieceCount}`] : null,
  ]);
  if (scope.length > 0) {
    sections.push({
      step: firstAskedStep(answers, [
        "redesignDepth",
        "existingBrand",
        "identityScope",
        "systemDepth",
        "campaignKind",
        "specificKind",
      ]),
      title: titles.scope,
      values: scope,
    });
  }

  const applications = [
    ...optionLabels(
      q.applications.groups.flatMap((group) => group.options),
      answers.applications,
    ),
    ...optionLabels(q.campaignPlacements.options, answers.campaignPlacements),
  ];
  if (applications.length > 0) {
    sections.push({
      step: firstAskedStep(answers, ["applications", "campaignPlacements"]),
      title: titles.applications,
      values: applications,
    });
  }

  const extensions = optionLabels(q.specialists.options, answers.specialistServices);
  if (extensions.length > 0) {
    sections.push({
      step: "specialists",
      title: titles.extensions,
      values: extensions,
    });
  }

  const date = answers.targetDate?.trim();
  const timeline =
    answers.timeline === "specificDate" && date
      ? [date]
      : compact([optionLabel(q.timeline.options, answers.timeline)]);
  if (timeline.length > 0) {
    sections.push({
      step: "timeline",
      title: titles.timeline,
      values: timeline,
    });
  }

  const budget = optionLabel(q.budget.options, answers.budgetRange);
  if (budget) {
    sections.push({
      step: "budget",
      title: titles.budget,
      values: [budget],
    });
  }

  return sections;
}
