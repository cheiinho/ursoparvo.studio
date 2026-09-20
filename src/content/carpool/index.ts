import "server-only";

import type { Lang } from "@/lib/i18n";
import { carpoolEn } from "./en";
import { carpoolPt } from "./pt";
import type { CarpoolContent } from "./types";

const CONTENT: Record<Lang, CarpoolContent> = {
  en: carpoolEn,
  pt: carpoolPt,
};

export function getCarpoolContent(lang: Lang): CarpoolContent {
  return CONTENT[lang];
}

export type { CarpoolContent, EvidenceKind } from "./types";
