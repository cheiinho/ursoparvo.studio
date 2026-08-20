"use client";

import { useEffect, useId, useRef } from "react";

type ProjectStepProps = {
  kicker: string;
  question: string;
  description?: string;
  helper?: string;
  stepStatus: string;
  children: React.ReactNode;
  navigation: React.ReactNode;
};

export function ProjectStep({
  kicker,
  question,
  description,
  helper,
  stepStatus,
  children,
  navigation,
}: ProjectStepProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionId = useId();
  const helperId = useId();

  useEffect(() => {
    headingRef.current?.focus();
  }, [question]);

  return (
    <section className="project-step" aria-labelledby="project-step-title">
      <p className="project-step__kicker type-nota">{kicker}</p>
      <h1
        id="project-step-title"
        ref={headingRef}
        tabIndex={-1}
        className="project-step__question type-corpo"
      >
        {question}
      </h1>
      <p className="sr-only" aria-live="polite">
        {stepStatus}. {question}
      </p>
      {description ? (
        <p id={descriptionId} className="type-corpo text-secondary measure">
          {description}
        </p>
      ) : null}
      {helper ? (
        <p id={helperId} className="type-nota text-secondary measure">
          {helper}
        </p>
      ) : null}
      <div
        className="project-step__body"
        aria-describedby={[description ? descriptionId : null, helper ? helperId : null]
          .filter(Boolean)
          .join(" ") || undefined}
      >
        {children}
      </div>
      {navigation}
    </section>
  );
}
