"use client";

import type { ProjectFlowContent } from "@/content/project-flow/types";
import type { ProjectInput, StepId } from "@/lib/project-discovery/types";

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

export function getReviewSections(
  answers: ProjectInput,
  content: ProjectFlowContent,
): ReviewSection[] {
  const sections: ReviewSection[] = [];

  function add(step: StepId, title: string, values: Array<string | null | undefined>) {
    const cleaned = values.filter((value): value is string => Boolean(value && value.trim()));
    sections.push({
      step,
      title,
      values: cleaned.length > 0 ? cleaned : [content.review.empty],
    });
  }

  add("projectType", content.questions.projectType.question, [
    optionLabel(content.questions.projectType.options, answers.projectType),
  ]);

  if (answers.projectType === "identityRedesign" || answers.projectType === "visualIdentity") {
    add(
      "existingBrand",
      content.questions.existingBrand.question,
      optionLabels(content.questions.existingBrand.options, answers.existingBrandState),
    );
    if (answers.projectType === "identityRedesign") {
      add("redesignDepth", content.questions.redesignDepth.question, [
        optionLabel(content.questions.redesignDepth.options, answers.redesignDepth),
      ]);
    }
    add("strategyClarity", content.questions.strategyClarity.question, [
      optionLabel(content.questions.strategyClarity.options, answers.strategyClarity),
    ]);
    add(
      "identityScope",
      content.questions.identityScope.question,
      optionLabels(content.questions.identityScope.options, answers.identityScope),
    );
    add("systemDepth", content.questions.systemDepth.question, [
      optionLabel(content.questions.systemDepth.options, answers.systemDepth),
    ]);
    add("guidelines", content.questions.guidelines.question, [
      optionLabel(content.questions.guidelines.options, answers.guidelines),
    ]);
    add(
      "applications",
      content.questions.applications.question,
      optionLabels(
        content.questions.applications.groups.flatMap((group) => group.options),
        answers.applications,
      ),
    );
    if ((answers.applications?.length ?? 0) > 0) {
      add("applicationScale", content.questions.applicationScale.question, [
        optionLabel(content.questions.applicationScale.options, answers.applicationScale),
      ]);
    }
  }

  if (answers.projectType === "visualDirection") {
    add("campaignKind", content.questions.campaignKind.question, [
      optionLabel(content.questions.campaignKind.options, answers.campaignKind),
    ]);
    add(
      "campaignPlacements",
      content.questions.campaignPlacements.question,
      optionLabels(content.questions.campaignPlacements.options, answers.campaignPlacements),
    );
  }

  if (answers.projectType === "specificAsset") {
    add("specificKind", content.questions.specificKind.question, [
      optionLabel(content.questions.specificKind.options, answers.specificKind),
    ]);
    add("imageComplexity", content.questions.imageComplexity.question, [
      optionLabel(content.questions.imageComplexity.options, answers.imageComplexity),
    ]);
    add("pieceCount", content.questions.pieceCount.question, [
      answers.pieceCount ? content.labels[`pieces:${answers.pieceCount}`] : null,
    ]);
  }

  if (answers.projectType === "unsure") {
    add("strategyClarity", content.questions.strategyClarity.question, [
      optionLabel(content.questions.strategyClarity.options, answers.strategyClarity),
    ]);
  }

  add(
    "specialists",
    content.questions.specialists.question,
    optionLabels(content.questions.specialists.options, answers.specialistServices),
  );
  add("timeline", content.questions.timeline.question, [
    answers.targetDate || optionLabel(content.questions.timeline.options, answers.timeline),
  ]);
  add("stakeholders", content.questions.stakeholders.question, [
    optionLabel(content.questions.stakeholders.options, answers.stakeholderComplexity),
  ]);
  add("budget", content.questions.budget.question, [
    optionLabel(content.questions.budget.options, answers.budgetRange),
  ]);
  if (answers.description?.trim()) {
    add("description", content.questions.description.question, [answers.description.trim()]);
  }

  return sections;
}

type ReviewSummaryProps = {
  sections: ReviewSection[];
  editLabel: string;
  onEdit: (step: StepId) => void;
};

export function ReviewSummary({ sections, editLabel, onEdit }: ReviewSummaryProps) {
  return (
    <ul className="review-summary">
      {sections.map((section) => (
        <li key={section.step} className="review-summary__item">
          <div className="review-summary__text">
            <h2 className="review-summary__title type-nota">{section.title}</h2>
            <p className="type-corpo">{section.values.join(" · ")}</p>
          </div>
          <button
            type="button"
            className="form-inline-action type-nota"
            onClick={() => onEdit(section.step)}
          >
            {editLabel}
          </button>
        </li>
      ))}
    </ul>
  );
}
