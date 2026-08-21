import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { getStepSequence, usesSkipLabel } from "./steps";
import { getReviewSections } from "./review";
import { caseEventCampaign, caseSmallRefresh, caseUndefinedBrand } from "./fixtures";
import { inferApplicationScale, inferGuidelines } from "./infer";
import { pt } from "@/content/project-flow/pt";

describe("step sequence", () => {
  it("keeps identity redesign on the identity path without repeating what can be inferred", () => {
    const steps = getStepSequence(caseSmallRefresh);
    assert.ok(steps.includes("redesignDepth"));
    assert.ok(steps.includes("identityScope"));
    assert.ok(steps.includes("systemDepth"));
    assert.ok(!steps.includes("existingBrand"));
    assert.ok(!steps.includes("guidelines"));
    assert.ok(!steps.includes("applicationScale"));
    assert.ok(!steps.includes("review"));
    assert.ok(!steps.includes("campaignKind"));
  });

  it("asks what already exists only when the identity is new", () => {
    const steps = getStepSequence({
      ...caseSmallRefresh,
      projectType: "visualIdentity",
    });
    assert.ok(steps.includes("existingBrand"));
    assert.ok(!steps.includes("redesignDepth"));
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
    assert.ok(!steps.includes("specialists"));
    assert.ok(!steps.includes("campaignKind"));
  });

  it("does not add a second screen for the date", () => {
    const withDate = getStepSequence({ ...caseSmallRefresh, timeline: "specificDate" });
    assert.ok(!withDate.includes("targetDate"));
    assert.ok(withDate.includes("timeline"));
  });
});

describe("inferred answers", () => {
  it("maps a small set of applications to a contained scale", () => {
    assert.equal(inferApplicationScale(["website", "social"]), "few");
    assert.equal(inferApplicationScale(["website", "social", "print", "events"]), "smallSet");
  });

  it("maps system depth to a documentation level", () => {
    assert.equal(inferGuidelines("foundations"), "essential");
    assert.equal(inferGuidelines("completeSystem"), "detailed");
  });
});

describe("skip label", () => {
  it("offers a skip label on unanswered optional questions", () => {
    assert.equal(usesSkipLabel("specialists", caseSmallRefresh), true);
    assert.equal(usesSkipLabel("projectType", caseSmallRefresh), false);
    assert.equal(usesSkipLabel("description", caseSmallRefresh), false);
  });
});

describe("review summary", () => {
  it("groups answers into a short commercial summary", () => {
    const sections = getReviewSections(caseSmallRefresh, pt);
    const titles = sections.map((section) => section.title);
    assert.deepEqual(titles, ["Tipo", "Âmbito", "Aplicações", "Calendário", "Orçamento"]);
    assert.ok(!sections.some((section) => section.step === "guidelines"));
    assert.ok(!sections.some((section) => section.step === "strategyClarity"));
    assert.ok(!sections.some((section) => section.step === "stakeholders"));
    assert.ok(!sections.some((section) => section.values.includes("Por definir")));
  });

  it("includes specialist extensions when they were selected", () => {
    const sections = getReviewSections(caseEventCampaign, pt);
    const extensions = sections.find((section) => section.title === "Extensões");
    assert.ok(extensions);
    assert.ok(extensions.values.includes("Motion"));
  });
});
