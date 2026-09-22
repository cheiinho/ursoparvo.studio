import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { intradayEn } from "./en";

const EM_DASH = "\u2014";

const FORBIDDEN = [
  /accuracy improved/i,
  /recalculat/i,
  /continuous reforecast/i,
  /24\/7/i,
  /three companies validated/i,
  /we interviewed/i,
  /planners interviewed/i,
  /participant/i,
  /users preferred/i,
  /customers understood/i,
  /customers validated/i,
  /push notification/i,
  /email notification/i,
  /manual workflow/i,
  /predict/i,
  /was shipped/i,
  /feature shipped/i,
  /it shipped/i,
  /we shipped/i,
  /launched/i,
  /adopted/i,
  /time saved/i,
  /staffing errors/i,
  /business performance/i,
  /threshold is/i,
  /eight week/i,
  /eight-week/i,
  /percentile/i,
  /multiplied by/i,
  /twice a day/i,
  /one hour between/i,
  /detected handle time/i,
  /detected absence/i,
  /detected absenteeism/i,
  /talkdesk/i,
  /cobalt/i,
  /avalon/i,
  /apollo/i,
];

function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (value && typeof value === "object") return Object.values(value).flatMap(stringsOf);
  return [];
}

describe("intraday claims", () => {
  const strings = stringsOf(intradayEn);

  it("does not use an em dash", () => {
    const hits = strings.filter((text) => text.includes(EM_DASH));
    assert.deepEqual(hits, []);
  });

  it("keeps the target sentence and no other 10% string", () => {
    const hits = strings.filter((text) => text.includes("10%"));
    assert.deepEqual(hits, [intradayEn.target.body]);
    assert.equal(
      intradayEn.target.body,
      "Target, not a result. The brief asked for a 10% improvement in intraday accuracy over the original forecast. Nothing in the material shows that this was measured.",
    );
  });

  it("keeps the volume note from being read as a threshold", () => {
    const volume = intradayEn.diverges.options.find((option) => option.id === "volume");
    assert.equal(volume?.note.includes("The 30% is not a threshold."), true);
    assert.equal(volume?.note.includes("The threshold was never defined."), true);
  });

  it("rejects forbidden claims", () => {
    const hits = strings.filter((text) => FORBIDDEN.some((pattern) => pattern.test(text)));
    assert.deepEqual(hits, []);
  });

  it("keeps the not-shipped line and the reconstruction sentence", () => {
    assert.match(intradayEn.decisionOne.onLine, /Whether this control shipped is not known/);
    assert.match(intradayEn.frame.sentence, /^Reconstruction\. The interaction follows the prototype/);
    assert.equal(intradayEn.labels.illustrative, "Illustrative");
  });
});
