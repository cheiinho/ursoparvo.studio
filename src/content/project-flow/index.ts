import type { Lang } from "@/lib/i18n";
import { en } from "./en";
import { pt } from "./pt";
import type { ProjectFlowContent } from "./types";

const CONTENT: Record<Lang, ProjectFlowContent> = { pt, en };

export function getProjectFlowContent(lang: Lang): ProjectFlowContent {
  return CONTENT[lang];
}

export type { ProjectFlowContent } from "./types";
