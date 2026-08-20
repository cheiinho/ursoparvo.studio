import { emptyAnswers } from "./steps";
import type { ProjectContact, ProjectDiscoveryState, ProjectInput, StepId } from "./types";

export const PROJECT_FLOW_STORAGE_KEY = "ursoparvo.project-discovery.v1";

export function emptyContact(): ProjectContact {
  return { name: "", email: "", company: "", website: "", phone: "" };
}

export function initialDiscoveryState(): ProjectDiscoveryState {
  return {
    currentStep: "projectType",
    answers: emptyAnswers(),
    contact: emptyContact(),
    returnTo: null,
    estimate: null,
    validation: { contactEmail: null, contactName: null, submit: null },
    submissionState: "idle",
  };
}

type PersistedState = {
  currentStep: StepId;
  answers: ProjectInput;
  contact: ProjectContact;
};

export function persistDiscoveryState(state: ProjectDiscoveryState): void {
  if (typeof window === "undefined") return;
  const payload: PersistedState = {
    currentStep: state.currentStep,
    answers: state.answers,
    contact: state.contact,
  };
  try {
    sessionStorage.setItem(PROJECT_FLOW_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Private browsing or quota — continue without persistence.
  }
}

export function readPersistedDiscoveryState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PROJECT_FLOW_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearPersistedDiscoveryState(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(PROJECT_FLOW_STORAGE_KEY);
  } catch {
    // ignore
  }
}
