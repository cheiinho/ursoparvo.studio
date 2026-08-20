import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { getStepSequence } from "./steps";
import { caseEventCampaign, caseSmallRefresh, caseUndefinedBrand } from "./fixtures";

describe("step sequence", () => {
  it("keeps identity redesign on the identity path", () => {
    const steps = getStepSequence(caseSmallRefresh);
    assert.ok(steps.includes("redesignDepth"));
    assert.ok(steps.includes("identityScope"));
    assert.ok(!steps.includes("campaignKind"));
    assert.ok(!steps.includes("specificKind"));
  });

  it("does not force event projects through the identity questionnaire", () => {
    const steps = getStepSequence(caseEventCampaign);
    assert.ok(steps.includes("campaignKind"));
    assert.ok(steps.includes("campaignPlacements"));
    assert.ok(!steps.includes("identityScope"));
    assert.ok(!steps.includes("redesignDepth"));
    assert.ok(!steps.includes("guidelines"));
  });

  it("keeps an undefined project short and diagnostic", () => {
    const steps = getStepSequence({ ...caseUndefinedBrand, projectType: "unsure" });
    assert.ok(steps.includes("strategyClarity"));
    assert.ok(!steps.includes("identityScope"));
    assert.ok(!steps.includes("campaignKind"));
  });

  it("only asks for a date when a specific date is chosen", () => {
    const without = getStepSequence({ ...caseSmallRefresh, timeline: "noDate" });
    const withDate = getStepSequence({ ...caseSmallRefresh, timeline: "specificDate" });
    assert.ok(!without.includes("targetDate"));
    assert.ok(withDate.includes("targetDate"));
  });
});
