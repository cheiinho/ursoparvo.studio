import "server-only";

import { intradayEn } from "./en";
import type { IntradayContent } from "./types";

export function getIntradayContent(lang: "en"): IntradayContent {
  if (lang !== "en") {
    throw new Error("Portuguese copy is not written.");
  }
  return intradayEn;
}

export type { IntradayContent } from "./types";
