"use client";

import {
  buildEstimateNarrative,
  formatRange,
  hasVisibleRange,
  specialistSentence,
} from "@/content/project-flow/narrative";
import type { ProjectFlowContent } from "@/content/project-flow/types";
import type { ClientEstimate, ProjectInput } from "@/lib/project-discovery/types";

type EstimateSummaryProps = {
  answers: ProjectInput;
  estimate: ClientEstimate;
  content: ProjectFlowContent;
  locale: string;
  lang: "pt" | "en";
};

export function EstimateSummary({
  answers,
  estimate,
  content,
  locale,
  lang,
}: EstimateSummaryProps) {
  const range = formatRange(estimate.clientRange.min, estimate.clientRange.max, locale);
  const specialists = specialistSentence(estimate, content, lang);
  const canShowRange = hasVisibleRange(estimate) && range !== null;
  const heading = canShowRange ? content.estimate.initial : content.estimate.lowTitle;

  return (
    <div className="estimate-summary" aria-live="polite">
      {canShowRange ? (
        <p className="type-corpo measure">
          {buildEstimateNarrative(answers, estimate, content, lang)}
        </p>
      ) : null}
      <div className="estimate-summary__figure">
        <h2 className="studio-section__title">{heading}</h2>
        {canShowRange ? (
          <p className="estimate-summary__range type-display">{range}</p>
        ) : (
          <p className="type-corpo measure">{content.estimate.lowBody}</p>
        )}
      </div>
      {canShowRange ? (
        <>
          <p className="type-nota text-secondary measure">{content.estimate.rangeNote}</p>
          <p className="type-nota text-secondary measure">{content.estimate.finalNote}</p>
        </>
      ) : null}
      {specialists ? <p className="type-corpo measure">{specialists}</p> : null}
    </div>
  );
}
