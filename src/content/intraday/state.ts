import type { ScenarioId, ShellState, StepId, SurfaceId } from "./types";

export const STEP_TIMES: Record<StepId, readonly string[]> = {
  1: ["08:30", "08:45", "09:00", "09:15"],
  2: ["09:30", "09:45", "10:00", "10:15"],
  3: ["10:00", "10:15", "10:30", "10:45"],
  4: ["10:00", "10:15", "10:30", "10:45"],
  5: [
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
  ],
};

export const MARKED_TIMES: Record<StepId, readonly string[]> = {
  1: [],
  2: ["10:00", "10:15"],
  3: ["10:00", "10:15", "10:30", "10:45"],
  4: ["10:00", "10:15", "10:30", "10:45"],
  5: ["10:00", "10:15", "10:30", "10:45"],
};

export type StepStatus = "none" | "start" | "completed";

export function scenarioView(id: ScenarioId): { showActuals: boolean; noteId: ScenarioId } {
  return { showActuals: id === "volume", noteId: id };
}

export function stepStatus(step: StepId): StepStatus {
  if (step === 4) return "start";
  if (step === 5) return "completed";
  return "none";
}

export function stepShowsNext(step: StepId): boolean {
  return step === 5;
}

export function stepShowsBand(step: StepId): boolean {
  return step >= 3;
}

export function moveStep(current: StepId, direction: -1 | 1): StepId | null {
  const next = (current + direction) as StepId;
  if (next < 1 || next > 5) return null;
  return next;
}

export type BannerKey = "start" | "completed";

export function bannerKey(state: ShellState): BannerKey | null {
  if (state === "inProgress") return "start";
  if (state === "updated") return "completed";
  return null;
}

export function shellShowsNext(state: ShellState): boolean {
  return state === "updated";
}

export function ordersVisible(state: ShellState, filterOn: boolean): boolean {
  return !(filterOn && state === "inProgress");
}

export function announceOnChange<T>(current: T, next: T, message: string): string | null {
  return current === next ? null : message;
}

export function sameBanner(state: ShellState, surface: SurfaceId): BannerKey | null {
  void surface;
  return bannerKey(state);
}

export function openPanel(): { open: true; focus: "panel" } {
  return { open: true, focus: "panel" };
}

export function closePanel(): { open: false; focus: "notifications" } {
  return { open: false, focus: "notifications" };
}
