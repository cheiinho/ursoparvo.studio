import { formatEuro } from "@/lib/estimate";
import type { ClientEstimate, ProjectInput } from "@/lib/project-discovery/types";
import { APPLICATION_GROUPS } from "@/lib/project-discovery/types";
import type { ProjectFlowContent } from "./types";

function listJoin(items: string[], lang: "pt" | "en"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  const head = items.slice(0, -1).join(", ");
  return lang === "pt" ? `${head} e ${items.at(-1)}` : `${head} and ${items.at(-1)}`;
}

function scaleLabel(input: ProjectInput, content: ProjectFlowContent): string {
  if (input.applicationScale === "few" || input.pieceCount === "1") {
    return content.estimate.scale.contained;
  }
  if (input.applicationScale === "many" || input.systemDepth === "completeSystem") {
    return content.estimate.scale.large;
  }
  if (
    input.applicationScale === "broad" ||
    input.systemDepth === "systemAndApplications" ||
    input.redesignDepth === "rebuild"
  ) {
    return content.estimate.scale.mediumLarge;
  }
  return content.estimate.scale.medium;
}

function applicationGroupNames(input: ProjectInput, content: ProjectFlowContent): string[] {
  const selected = new Set(input.applications ?? []);
  const names: string[] = [];
  for (const [groupId, ids] of Object.entries(APPLICATION_GROUPS)) {
    if (ids.some((id) => selected.has(id))) {
      const group = content.questions.applications.groups.find((item) => item.id === groupId);
      if (group) names.push(group.label.toLowerCase());
    }
  }
  if ((input.campaignPlacements?.length ?? 0) > 0 && !names.includes("campanha") && !names.includes("campaigns")) {
    const campaigns = content.questions.applications.groups.find((item) => item.id === "campaigns");
    if (campaigns) names.push(campaigns.label.toLowerCase());
  }
  return names;
}

export function buildEstimateNarrative(
  input: ProjectInput,
  estimate: ClientEstimate,
  content: ProjectFlowContent,
  lang: "pt" | "en",
): string {
  const kind = content.classifications[estimate.classification];
  const scale = scaleLabel(input, content);
  const contexts = applicationGroupNames(input, content);
  const contextPhrase =
    contexts.length > 0
      ? lang === "pt"
        ? `, a funcionar em contextos ${listJoin(contexts, lang)}`
        : `, extending across ${listJoin(contexts, lang)}`
      : "";

  if (lang === "pt") {
    return `O projecto parece ${kind}, de ${scale}${contextPhrase}.`;
  }
  return `Your project looks like ${kind} with ${scale}${contextPhrase}.`;
}

export function specialistSentence(
  estimate: ClientEstimate,
  content: ProjectFlowContent,
): string | null {
  if (estimate.requiresSpecialists.length === 0) return null;
  const names = estimate.requiresSpecialists.map(
    (id) => content.labels[id] ?? id,
  );
  const lang = names.includes("Motion") && content.labels.motion === "Motion" ? "en" : "pt";
  const list = listJoin(
    names.map((name) => name.toLowerCase()),
    content.labels.motion === "Motion" ? "en" : "pt",
  );
  void lang;
  return content.estimate.specialists.replace("{list}", list);
}

export function formatRange(
  min: number | null,
  max: number | null,
  locale: string,
): string | null {
  if (min === null || max === null) return null;
  return `${formatEuro(min, locale)}–${formatEuro(max, locale)}`;
}
