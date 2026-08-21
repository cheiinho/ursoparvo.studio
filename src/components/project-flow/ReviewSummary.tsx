"use client";

import type { StepId } from "@/lib/project-discovery/types";
import type { ReviewSection } from "@/lib/project-discovery/review";

export type { ReviewSection };
export { getReviewSections } from "@/lib/project-discovery/review";

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
