import "server-only";

import type { Lang } from "@/lib/i18n";
import { en } from "./en";
import { pt } from "./pt";
import type { Dict } from "./types";

const DICTS: Record<Lang, Dict> = { pt, en };

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}
