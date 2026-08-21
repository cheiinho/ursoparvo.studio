"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { ProjectFlowContent } from "@/content/project-flow/types";
import { trackProjectEvent } from "@/lib/project-discovery/analytics";
import { looksLikeEmail } from "@/lib/project-discovery/sanitize";
import {
  clearPersistedDiscoveryState,
  emptyContact,
  initialDiscoveryState,
  persistDiscoveryState,
  readPersistedDiscoveryState,
} from "@/lib/project-discovery/persistence";
import {
  getStepSequence,
  isQuestionStep,
  isStepComplete,
  usesSkipLabel,
} from "@/lib/project-discovery/steps";
import type {
  ApplicationContext,
  BudgetRange,
  CampaignKind,
  CampaignPlacement,
  ClientEstimate,
  ExistingBrandState,
  IdentityScopeItem,
  PieceCount,
  ProjectContact,
  ProjectDiscoveryState,
  ProjectInput,
  ProjectType,
  RedesignDepth,
  SpecialistService,
  SpecificKind,
  StakeholderComplexity,
  StepId,
  StrategyClarity,
  SystemDepth,
  TimelineKind,
} from "@/lib/project-discovery/types";
import { HOME_PATH, type Lang } from "@/lib/i18n";
import { DateInput, TextareaField, TextInput, todayIsoDate } from "./fields";
import { EstimateSummary } from "./EstimateSummary";
import { getReviewSections, ReviewSummary } from "./ReviewSummary";
import {
  BudgetSelector,
  GroupedMultiSelect,
  MultiSelect,
  SingleSelect,
  SpecialistSelector,
} from "./options";
import { ProjectStep } from "./ProjectStep";
import { StepNavigation } from "./StepNavigation";

type ProjectFlowProps = {
  lang: Lang;
  content: ProjectFlowContent;
  email: string;
  locale: string;
};

function mailtoHref(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function emptySubscribe() {
  return () => {};
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function restoreDiscoveryState(): ProjectDiscoveryState {
  const persisted = readPersistedDiscoveryState();
  const initial = initialDiscoveryState();
  if (!persisted) return initial;
  const currentStep =
    persisted.currentStep === "review" ? "estimate" : persisted.currentStep;
  return {
    ...initial,
    currentStep,
    answers: { ...initial.answers, ...persisted.answers },
    contact: { ...initial.contact, ...persisted.contact },
  };
}

export default function ProjectFlow(props: ProjectFlowProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  if (!mounted) return <div className="project-flow" />;
  return <ProjectFlowReady {...props} />;
}

function ProjectFlowReady({ lang, content, email, locale }: ProjectFlowProps) {
  const [state, setState] = useState<ProjectDiscoveryState>(restoreDiscoveryState);
  const started = useRef(false);
  const viewedEstimate = useRef(false);
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      trackProjectEvent("project_flow_started");
    }
  }, []);

  useEffect(() => {
    persistDiscoveryState(state);
  }, [state]);

  useEffect(() => {
    function onLeave() {
      if (state.submissionState !== "sent") {
        trackProjectEvent("project_flow_abandoned");
      }
    }
    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [state.submissionState]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current != null) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  const sequence = useMemo(() => getStepSequence(state.answers), [state.answers]);
  const stepIndex = Math.max(0, sequence.indexOf(state.currentStep));
  const currentStep = sequence.includes(state.currentStep)
    ? state.currentStep
    : sequence[0];
  const questionSteps = sequence.filter((step) => isQuestionStep(step));
  const questionIndex = questionSteps.indexOf(currentStep);
  const stepStatus =
    questionIndex >= 0
      ? content.nav.stepStatus
          .replace("{current}", String(questionIndex + 1))
          .replace("{total}", String(questionSteps.length))
      : undefined;

  const goTo = useCallback((step: StepId, returnTo?: ProjectDiscoveryState["returnTo"]) => {
    setState((current) => ({
      ...current,
      currentStep: step,
      returnTo: returnTo === undefined ? current.returnTo : returnTo,
      validation: { contactEmail: null, contactName: null, submit: null },
    }));
  }, []);

  const patchAnswers = useCallback((patch: Partial<ProjectInput>) => {
    setState((current) => ({
      ...current,
      answers: { ...current.answers, ...patch },
      estimate: null,
    }));
  }, []);

  const patchContact = useCallback((patch: Partial<ProjectContact>) => {
    setState((current) => ({
      ...current,
      contact: { ...current.contact, ...patch },
    }));
  }, []);

  function clearAdvanceTimer() {
    if (advanceTimer.current != null) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }

  function advanceFrom(step: StepId) {
    clearAdvanceTimer();
    if (state.returnTo) {
      goTo(state.returnTo, null);
      return;
    }
    const index = sequence.indexOf(step);
    const next = sequence[index + 1] ?? "estimate";
    goTo(next);
  }

  function scheduleAdvanceFrom(step: StepId) {
    clearAdvanceTimer();
    const delay = prefersReducedMotion() ? 0 : 160;
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      setState((current) => {
        if (current.returnTo) {
          return {
            ...current,
            currentStep: current.returnTo,
            returnTo: null,
            validation: { contactEmail: null, contactName: null, submit: null },
          };
        }
        const nextSequence = getStepSequence(current.answers);
        const index = nextSequence.indexOf(step);
        const next = nextSequence[index + 1] ?? "estimate";
        return {
          ...current,
          currentStep: next,
          validation: { contactEmail: null, contactName: null, submit: null },
        };
      });
    }, delay);
  }

  function goBack() {
    clearAdvanceTimer();
    if (state.returnTo) {
      goTo(state.returnTo, null);
      return;
    }
    const index = sequence.indexOf(currentStep);
    if (index > 0) goTo(sequence[index - 1]);
  }

  function continueFromCurrent() {
    if (currentStep === "projectType" && !isStepComplete("projectType", state.answers)) {
      setState((current) => ({
        ...current,
        validation: { ...current.validation, submit: content.errors.choose },
      }));
      return;
    }
    advanceFrom(currentStep);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep !== "estimate" || state.estimate) return;
    const answers = state.answers;
    let cancelled = false;

    fetch("/api/projecto/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then(async (response) => {
        if (cancelled) return;
        if (!response.ok) {
          setState((current) => ({
            ...current,
            validation: { ...current.validation, submit: content.errors.estimate },
          }));
          return;
        }
        const estimate = (await response.json()) as ClientEstimate;
        if (cancelled) return;
        setState((current) => ({ ...current, estimate }));
        if (!viewedEstimate.current) {
          viewedEstimate.current = true;
          trackProjectEvent("estimate_viewed");
        }
      })
      .catch(() => {
        if (cancelled) return;
        setState((current) => ({
          ...current,
          validation: { ...current.validation, submit: content.errors.estimate },
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [currentStep, state.answers, state.estimate, content.errors.estimate]);

  async function submitProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.submissionState === "sending") return;

    const nameError = state.contact.name.trim() ? null : content.contact.nameError;
    const emailError = looksLikeEmail(state.contact.email)
      ? null
      : content.contact.emailError;

    if (nameError || emailError) {
      setState((current) => ({
        ...current,
        validation: { contactName: nameError, contactEmail: emailError, submit: null },
      }));
      return;
    }

    const honey = String(new FormData(event.currentTarget).get("website") ?? "");
    setState((current) => ({ ...current, submissionState: "sending" }));

    try {
      const response = await fetch("/api/projecto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: state.answers,
          contact: state.contact,
          locale: lang,
          website: honey,
        }),
      });

      if (response.ok) {
        trackProjectEvent("project_submitted");
        trackProjectEvent("project_flow_completed");
        clearPersistedDiscoveryState();
        setState((current) => ({
          ...current,
          currentStep: "complete",
          submissionState: "sent",
        }));
        return;
      }

      if (response.status === 503) {
        const brief = await response.json().catch(() => null);
        const subject = lang === "pt" ? `Projecto: ${state.contact.name}` : `Project: ${state.contact.name}`;
        const body =
          typeof brief?.mailtoBody === "string"
            ? brief.mailtoBody
            : `${state.contact.name}\n${state.contact.email}\n\n${state.answers.description ?? ""}`;
        window.location.href = mailtoHref(email, subject, body);
        setState((current) => ({ ...current, submissionState: "mailto" }));
        return;
      }

      setState((current) => ({
        ...current,
        submissionState: "error",
        validation: { ...current.validation, submit: content.errors.submit },
      }));
    } catch {
      setState((current) => ({
        ...current,
        submissionState: "error",
        validation: { ...current.validation, submit: content.errors.submit },
      }));
    }
  }

  function resetFlow() {
    clearPersistedDiscoveryState();
    setState({ ...initialDiscoveryState(), contact: emptyContact() });
    viewedEstimate.current = false;
  }

  const question =
    currentStep in content.questions
      ? content.questions[currentStep as keyof typeof content.questions]
      : undefined;
  const continueLabel = usesSkipLabel(currentStep, state.answers)
    ? content.nav.skip
    : content.nav.continue;

  const navigation = question ? (
    <StepNavigation
      backLabel={content.nav.back}
      continueLabel={continueLabel}
      onBack={stepIndex > 0 || state.returnTo ? goBack : undefined}
      onContinue={continueFromCurrent}
    />
  ) : null;

  return (
    <div className="project-flow">
      {currentStep === "estimate" ? (
        <ProjectStep
          kicker={content.estimate.kicker}
          question={content.estimate.seeing}
          navigation={
            <StepNavigation
              backLabel={content.nav.back}
              continueLabel={
                state.estimate ? content.estimate.talk : content.estimate.preparing
              }
              onBack={goBack}
              onContinue={() => goTo("contact")}
              continueDisabled={!state.estimate}
              continueBusy={!state.estimate}
            />
          }
        >
          {state.estimate ? (
            <>
              <EstimateSummary
                answers={state.answers}
                estimate={state.estimate}
                content={content}
                locale={locale}
                lang={lang}
              />
              <div className="estimate-review">
                <h2 className="studio-section__title">{content.review.title}</h2>
                <ReviewSummary
                  sections={getReviewSections(state.answers, content)}
                  editLabel={content.nav.edit}
                  onEdit={(step) => goTo(step, "estimate")}
                />
              </div>
            </>
          ) : (
            <p className="type-nota text-secondary" aria-live="polite">
              {content.estimate.preparing}
            </p>
          )}
          {state.validation.submit && !state.estimate ? (
            <p className="form-error type-nota" role="alert">
              {state.validation.submit}
            </p>
          ) : null}
        </ProjectStep>
      ) : null}

      {currentStep === "contact" ? (
        <form onSubmit={submitProject} noValidate>
          <ProjectStep
            kicker={content.contact.kicker}
            question={content.contact.question}
            navigation={
              <StepNavigation
                backLabel={content.nav.back}
                continueLabel={
                  state.submissionState === "sending" ? content.nav.sending : content.nav.send
                }
                onBack={goBack}
                continueType="submit"
                continueDisabled={state.submissionState === "sending"}
                continueBusy={state.submissionState === "sending"}
              />
            }
          >
            <TextInput
              id="project-name"
              label={content.contact.name}
              value={state.contact.name}
              autoComplete="name"
              required
              error={state.validation.contactName}
              onChange={(value) => patchContact({ name: value })}
            />
            <TextInput
              id="project-email"
              label={content.contact.email}
              value={state.contact.email}
              type="email"
              autoComplete="email"
              required
              error={state.validation.contactEmail}
              onChange={(value) => patchContact({ email: value })}
            />
            <TextInput
              id="project-company"
              label={content.contact.company}
              value={state.contact.company ?? ""}
              autoComplete="organization"
              optionalLabel={content.contact.optional}
              onChange={(value) => patchContact({ company: value })}
            />
            <TextInput
              id="project-site"
              label={content.contact.website}
              value={state.contact.website ?? ""}
              type="url"
              autoComplete="url"
              optionalLabel={content.contact.optional}
              onChange={(value) => patchContact({ website: value })}
            />
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="project-website">Website</label>
              <input id="project-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            {state.validation.submit ? (
              <p className="form-error type-nota" role="alert">
                {state.validation.submit}{" "}
                <a href={`mailto:${email}`} className="text-link">
                  {email}
                </a>
              </p>
            ) : null}
            {state.submissionState === "mailto" ? (
              <p className="type-nota text-secondary">
                {content.errors.submit}{" "}
                <a href={`mailto:${email}`} className="text-link">
                  {email}
                </a>
              </p>
            ) : null}
          </ProjectStep>
        </form>
      ) : null}

      {currentStep === "complete" ? (
        <section className="project-step">
          <p className="project-step__kicker type-nota">{content.complete.kicker}</p>
          <h1 className="project-step__question type-corpo">{content.complete.title}</h1>
          <p className="type-corpo measure">{content.complete.body}</p>
          <div className="step-nav">
            <button type="button" className="step-nav__back type-corpo" onClick={resetFlow}>
              {content.nav.startAgain}
            </button>
            <Link href={HOME_PATH[lang]} className="form-submit">
              {content.complete.home}
            </Link>
          </div>
        </section>
      ) : null}

      {question && isQuestionStep(currentStep) ? (
        <ProjectStep
          kicker={question.kicker}
          question={question.question}
          description={"description" in question ? question.description : undefined}
          helper={"helper" in question ? question.helper : undefined}
          stepStatus={stepStatus}
          navigation={navigation}
        >
          <QuestionFields
            step={currentStep}
            answers={state.answers}
            content={content}
            onPatch={patchAnswers}
            onConfirmSingle={scheduleAdvanceFrom}
            onTypeSelected={(projectType) => {
              trackProjectEvent("project_type_selected", { projectType });
            }}
            onSpecialistSelected={(specialist) => {
              trackProjectEvent("specialist_selected", { specialist });
            }}
          />
          {state.validation.submit && currentStep === "projectType" ? (
            <p className="form-error type-nota" role="alert">
              {state.validation.submit}
            </p>
          ) : null}
        </ProjectStep>
      ) : null}
    </div>
  );
}

type QuestionFieldsProps = {
  step: StepId;
  answers: ProjectInput;
  content: ProjectFlowContent;
  onPatch: (patch: Partial<ProjectInput>) => void;
  onConfirmSingle: (step: StepId) => void;
  onTypeSelected: (projectType: string) => void;
  onSpecialistSelected: (specialist: string) => void;
};

function QuestionFields({
  step,
  answers,
  content,
  onPatch,
  onConfirmSingle,
  onTypeSelected,
  onSpecialistSelected,
}: QuestionFieldsProps) {
  const q = content.questions;

  switch (step) {
    case "projectType":
      return (
        <SingleSelect
          name="projectType"
          legend={q.projectType.question}
          options={q.projectType.options}
          value={answers.projectType}
          onChange={(id) => {
            onTypeSelected(id);
            onPatch({ projectType: id as ProjectType });
          }}
          onConfirm={() => onConfirmSingle("projectType")}
        />
      );
    case "existingBrand":
      return (
        <MultiSelect
          name="existingBrand"
          legend={q.existingBrand.question}
          options={q.existingBrand.options}
          value={answers.existingBrandState ?? []}
          onChange={(next) => onPatch({ existingBrandState: next as ExistingBrandState[] })}
        />
      );
    case "redesignDepth":
      return (
        <SingleSelect
          name="redesignDepth"
          legend={q.redesignDepth.question}
          options={q.redesignDepth.options}
          value={answers.redesignDepth}
          onChange={(id) => onPatch({ redesignDepth: id as RedesignDepth })}
          onConfirm={() => onConfirmSingle("redesignDepth")}
        />
      );
    case "strategyClarity":
      return (
        <SingleSelect
          name="strategyClarity"
          legend={q.strategyClarity.question}
          options={q.strategyClarity.options}
          value={answers.strategyClarity}
          onChange={(id) => onPatch({ strategyClarity: id as StrategyClarity })}
          onConfirm={() => onConfirmSingle("strategyClarity")}
        />
      );
    case "identityScope":
      return (
        <MultiSelect
          name="identityScope"
          legend={q.identityScope.question}
          options={q.identityScope.options}
          value={answers.identityScope ?? []}
          onChange={(next) => onPatch({ identityScope: next as IdentityScopeItem[] })}
        />
      );
    case "systemDepth":
      return (
        <SingleSelect
          name="systemDepth"
          legend={q.systemDepth.question}
          options={q.systemDepth.options}
          value={answers.systemDepth}
          onChange={(id) => onPatch({ systemDepth: id as SystemDepth })}
          onConfirm={() => onConfirmSingle("systemDepth")}
        />
      );
    case "applications":
      return (
        <GroupedMultiSelect
          name="applications"
          legend={q.applications.question}
          groups={q.applications.groups}
          value={answers.applications ?? []}
          onChange={(next) => onPatch({ applications: next as ApplicationContext[] })}
        />
      );
    case "campaignKind":
      return (
        <SingleSelect
          name="campaignKind"
          legend={q.campaignKind.question}
          options={q.campaignKind.options}
          value={answers.campaignKind}
          onChange={(id) => onPatch({ campaignKind: id as CampaignKind })}
          onConfirm={() => onConfirmSingle("campaignKind")}
        />
      );
    case "campaignPlacements":
      return (
        <MultiSelect
          name="campaignPlacements"
          legend={q.campaignPlacements.question}
          options={q.campaignPlacements.options}
          value={answers.campaignPlacements ?? []}
          onChange={(next) => onPatch({ campaignPlacements: next as CampaignPlacement[] })}
        />
      );
    case "specificKind":
      return (
        <SingleSelect
          name="specificKind"
          legend={q.specificKind.question}
          options={q.specificKind.options}
          value={answers.specificKind}
          onChange={(id) => onPatch({ specificKind: id as SpecificKind })}
          onConfirm={() => onConfirmSingle("specificKind")}
        />
      );
    case "pieceCount":
      return (
        <SingleSelect
          name="pieceCount"
          legend={q.pieceCount.question}
          options={q.pieceCount.options}
          value={answers.pieceCount}
          onChange={(id) => onPatch({ pieceCount: id as PieceCount })}
          onConfirm={() => onConfirmSingle("pieceCount")}
        />
      );
    case "specialists":
      return (
        <SpecialistSelector
          name="specialists"
          legend={q.specialists.question}
          options={q.specialists.options}
          value={answers.specialistServices ?? []}
          onChange={(next) => {
            const added = next.find(
              (id) => !(answers.specialistServices ?? []).includes(id as SpecialistService),
            );
            if (added) onSpecialistSelected(added);
            onPatch({ specialistServices: next as SpecialistService[] });
          }}
        />
      );
    case "timeline":
      return (
        <>
          <SingleSelect
            name="timeline"
            legend={q.timeline.question}
            options={q.timeline.options}
            value={answers.timeline}
            onChange={(id) =>
              onPatch({
                timeline: id as TimelineKind,
                targetDate: id === "specificDate" ? answers.targetDate : null,
              })
            }
            onConfirm={(id) => {
              if (id === "specificDate") return;
              onConfirmSingle("timeline");
            }}
          />
          {answers.timeline === "specificDate" ? (
            <DateInput
              id="project-date"
              label={q.targetDate.dateLabel}
              value={answers.targetDate ?? ""}
              min={todayIsoDate()}
              autoFocus
              onChange={(value) => onPatch({ targetDate: value })}
            />
          ) : null}
        </>
      );
    case "stakeholders":
      return (
        <SingleSelect
          name="stakeholders"
          legend={q.stakeholders.question}
          options={q.stakeholders.options}
          value={answers.stakeholderComplexity}
          onChange={(id) => onPatch({ stakeholderComplexity: id as StakeholderComplexity })}
          onConfirm={() => onConfirmSingle("stakeholders")}
        />
      );
    case "budget":
      return (
        <BudgetSelector
          name="budget"
          legend={q.budget.question}
          options={q.budget.options}
          value={answers.budgetRange}
          onChange={(id) => onPatch({ budgetRange: id as BudgetRange })}
          onConfirm={() => onConfirmSingle("budget")}
        />
      );
    case "description":
      return (
        <TextareaField
          id="project-description"
          label={q.description.question}
          placeholder={q.description.placeholder}
          value={answers.description ?? ""}
          labelledBy="project-step-title"
          onChange={(value) => onPatch({ description: value })}
        />
      );
    default:
      return null;
  }
}
