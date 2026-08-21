export const PROJECT_FLOW_EVENTS = [
  "project_flow_started",
  "project_type_selected",
  "project_flow_completed",
  "estimate_viewed",
  "project_submitted",
  "project_flow_abandoned",
  "specialist_selected",
] as const;

export type ProjectFlowEvent = (typeof PROJECT_FLOW_EVENTS)[number];

/**
 * Reserved for the existing analytics system, if one is added later.
 * No provider is introduced here; events are ignored until wired.
 */
export function trackProjectEvent(
  event: ProjectFlowEvent,
  detail?: { projectType?: string; specialist?: string },
): void {
  if (typeof window === "undefined") return;
  void event;
  void detail;
}
