import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { estimateProject } from "./engine";
import {
  caseEventCampaign,
  caseFullIdentitySystem,
  caseIdentityWithSpecialists,
  caseSmallRefresh,
  caseUndefinedBrand,
} from "./fixtures";
import { pricingConfig, type PricingConfig } from "./pricing-config";
import { emptyAnswers } from "./steps";
import type { ProjectInput } from "./types";

const NOW = new Date(Date.UTC(2026, 7, 20));

function estimate(input: ProjectInput, config?: PricingConfig) {
  return estimateProject(input, { now: NOW, config });
}

function withConfig(patch: (config: PricingConfig) => void): PricingConfig {
  const config = structuredClone(pricingConfig);
  patch(config);
  return config;
}

describe("minimum project fee", () => {
  it("raises a calculated fee to the type minimum", () => {
    const config = withConfig((c) => {
      c.projectTypes.specificAsset.baseFee = 200;
      c.projectTypes.specificAsset.minimumFee = 900;
      c.global.minimumProjectFee = 500;
    });
    const result = estimate(
      {
        ...emptyAnswers(),
        projectType: "specificAsset",
        specificKind: "poster",
        imageComplexity: "simple",
        pieceCount: "1",
        strategyClarity: "veryClear",
        timeline: "noDate",
        stakeholderComplexity: "oneDecisionMaker",
      },
      config,
    );
    assert.equal(result.recommendedFee, 1000);
    assert.ok((result.recommendedFee ?? 0) >= 900);
  });

  it("raises a calculated fee to the global minimum", () => {
    const config = withConfig((c) => {
      c.projectTypes.specificAsset.baseFee = 200;
      c.projectTypes.specificAsset.minimumFee = 200;
      c.global.minimumProjectFee = 1500;
      c.global.roundingIncrement = 100;
    });
    const result = estimate(
      {
        ...emptyAnswers(),
        projectType: "specificAsset",
        specificKind: "illustration",
        imageComplexity: "simple",
        pieceCount: "1",
        timeline: "noDate",
        stakeholderComplexity: "oneDecisionMaker",
      },
      config,
    );
    assert.equal(result.recommendedFee, 1500);
  });
});

describe("project types", () => {
  it("classifies a small refresh", () => {
    const result = estimate(caseSmallRefresh);
    assert.equal(result.classification, "identityRefresh");
  });

  it("classifies a new visual identity", () => {
    const result = estimate({
      ...caseSmallRefresh,
      projectType: "visualIdentity",
      redesignDepth: null,
      systemDepth: "system",
    });
    assert.equal(result.classification, "visualIdentity");
  });

  it("classifies a specific graphic", () => {
    const result = estimate({
      ...emptyAnswers(),
      projectType: "specificAsset",
      specificKind: "illustration",
      imageComplexity: "developed",
      pieceCount: "1",
    });
    assert.equal(result.classification, "specificGraphic");
  });

  it("does not estimate an undefined project type", () => {
    const result = estimate({ ...emptyAnswers(), projectType: "unsure" });
    assert.equal(result.classification, "needsConversation");
    assert.equal(result.clientRange.min, null);
    assert.equal(result.recommendedFee, null);
  });
});

describe("complexity levels", () => {
  it("prices rebuild above refine", () => {
    const refine = estimate(caseSmallRefresh);
    const rebuild = estimate({ ...caseSmallRefresh, redesignDepth: "rebuild" });
    assert.ok((rebuild.recommendedFee ?? 0) > (refine.recommendedFee ?? 0));
    assert.ok(rebuild.complexityScore > refine.complexityScore);
  });

  it("prices a complete system above foundations", () => {
    const light = estimate(caseSmallRefresh);
    const heavy = estimate({ ...caseSmallRefresh, systemDepth: "completeSystem" });
    assert.ok((heavy.recommendedFee ?? 0) > (light.recommendedFee ?? 0));
  });
});

describe("application scaling", () => {
  it("increases the fee as applications widen", () => {
    const few = estimate(caseSmallRefresh);
    const many = estimate({ ...caseSmallRefresh, applicationScale: "many" });
    assert.ok((many.recommendedFee ?? 0) > (few.recommendedFee ?? 0));
    assert.ok(many.scopeScore > few.scopeScore);
  });
});

describe("guidelines", () => {
  it("prices detailed guidelines above essential", () => {
    const essential = estimate(caseSmallRefresh);
    const detailed = estimate({ ...caseSmallRefresh, guidelines: "detailed" });
    assert.ok((detailed.recommendedFee ?? 0) > (essential.recommendedFee ?? 0));
  });
});

describe("specialist services", () => {
  it("adds specialist cost without folding it into the studio core", () => {
    const core = estimate({ ...caseIdentityWithSpecialists, specialistServices: [] });
    const withSpecialists = estimate(caseIdentityWithSpecialists);
    assert.ok((withSpecialists.specialistCost ?? 0) > 0);
    assert.ok((withSpecialists.recommendedFee ?? 0) > (core.recommendedFee ?? 0));
    assert.deepEqual(withSpecialists.requiresSpecialists, ["motion", "digitalDesign"]);
    assert.equal(core.internalCost, withSpecialists.internalCost);
  });

  it("ignores disabled specialists", () => {
    const config = withConfig((c) => {
      c.specialists.motion.enabled = false;
    });
    const result = estimate(caseEventCampaign, config);
    assert.deepEqual(result.requiresSpecialists, []);
    assert.equal(result.specialistCost, 0);
  });
});

describe("timeline", () => {
  it("applies a compressed-timeline multiplier", () => {
    const calm = estimate(caseSmallRefresh);
    const quick = estimate({ ...caseSmallRefresh, timeline: "quickly" });
    assert.ok((quick.recommendedFee ?? 0) > (calm.recommendedFee ?? 0));
    assert.ok(quick.riskScore > calm.riskScore);
  });

  it("treats a near target date as compressed", () => {
    const far = estimate({
      ...caseSmallRefresh,
      timeline: "specificDate",
      targetDate: "2026-12-01",
    });
    const near = estimate({
      ...caseSmallRefresh,
      timeline: "specificDate",
      targetDate: "2026-08-28",
    });
    assert.ok((near.recommendedFee ?? 0) > (far.recommendedFee ?? 0));
  });
});

describe("stakeholder complexity", () => {
  it("raises fee and risk as decision-making widens", () => {
    const one = estimate(caseSmallRefresh);
    const board = estimate({
      ...caseSmallRefresh,
      stakeholderComplexity: "leadership",
    });
    assert.ok((board.recommendedFee ?? 0) > (one.recommendedFee ?? 0));
    assert.ok(board.riskScore > one.riskScore);
  });
});

describe("strategic ambiguity", () => {
  it("raises complexity and risk when direction is still taking shape", () => {
    const clear = estimate(caseSmallRefresh);
    const forming = estimate({
      ...caseSmallRefresh,
      strategyClarity: "stillTakingShape",
    });
    assert.ok((forming.recommendedFee ?? 0) > (clear.recommendedFee ?? 0));
    assert.ok(forming.riskScore > clear.riskScore);
  });
});

describe("budget mismatch", () => {
  it("flags a stated range well below the estimated scope", () => {
    const result = estimate({ ...caseFullIdentitySystem, budgetRange: "under3000" });
    assert.equal(result.budgetMismatch, true);
  });

  it("does not flag an aligned budget", () => {
    const result = estimate(caseSmallRefresh);
    assert.equal(result.budgetMismatch, false);
  });
});

describe("low-confidence projects", () => {
  it("asks for a conversation instead of a precise number", () => {
    const result = estimate(caseUndefinedBrand);
    assert.equal(result.requiresDiscovery, true);
    assert.equal(result.confidence, "low");
    assert.equal(result.clientRange.min, null);
    assert.equal(result.clientRange.max, null);
  });
});

describe("high-confidence projects", () => {
  it("returns a range for a well-defined refresh", () => {
    const result = estimate(caseSmallRefresh);
    assert.equal(result.confidence, "high");
    assert.equal(result.requiresDiscovery, false);
    assert.ok(result.clientRange.min && result.clientRange.max);
    assert.ok(result.clientRange.max > result.clientRange.min);
    assert.equal(result.clientRange.min % 500, 0);
  });
});

describe("invalid combinations", () => {
  it("ignores identity fields on a specific-graphic project", () => {
    const base = estimate({
      ...emptyAnswers(),
      projectType: "specificAsset",
      specificKind: "poster",
      imageComplexity: "developed",
      pieceCount: "1",
      timeline: "noDate",
      stakeholderComplexity: "oneDecisionMaker",
    });
    const noisy = estimate({
      ...emptyAnswers(),
      projectType: "specificAsset",
      specificKind: "poster",
      imageComplexity: "developed",
      pieceCount: "1",
      identityScope: ["logo", "typography", "colour", "packaging"],
      systemDepth: "completeSystem",
      guidelines: "detailed",
      redesignDepth: "rebuild",
      timeline: "noDate",
      stakeholderComplexity: "oneDecisionMaker",
    });
    assert.equal(base.recommendedFee, noisy.recommendedFee);
    assert.equal(noisy.classification, "specificGraphic");
  });
});

describe("missing optional data", () => {
  it("still estimates when budget, date and description are absent", () => {
    const result = estimate({
      ...caseSmallRefresh,
      budgetRange: "notYet",
      timeline: null,
      targetDate: null,
      description: "",
    });
    assert.equal(result.classification, "identityRefresh");
    assert.ok(result.clientRange.min);
  });
});

describe("mobile-independent calculation", () => {
  it("does not depend on viewport or runtime environment", () => {
    const first = estimate(caseFullIdentitySystem);
    const second = estimate(caseFullIdentitySystem);
    assert.deepEqual(first, second);
  });
});

describe("deterministic output", () => {
  it("returns the same estimate for the same answers", () => {
    const a = estimate(caseEventCampaign);
    const b = estimate(caseEventCampaign);
    assert.deepEqual(a, b);
  });
});

describe("example cases", () => {
  it("Case A — small refresh", () => {
    const result = estimate(caseSmallRefresh);
    assert.equal(result.classification, "identityRefresh");
    assert.equal(result.confidence, "high");
    assert.equal(result.requiresSpecialists.length, 0);
  });

  it("Case B — full identity system", () => {
    const result = estimate(caseFullIdentitySystem);
    assert.equal(result.classification, "identitySystem");
    assert.ok(result.confidence === "high" || result.confidence === "medium");
    assert.ok(result.clientRange.min && result.clientRange.max);
  });

  it("Case C — undefined brand", () => {
    const result = estimate(caseUndefinedBrand);
    assert.equal(result.requiresDiscovery, true);
    assert.equal(result.clientRange.min, null);
  });

  it("Case D — event campaign", () => {
    const result = estimate(caseEventCampaign);
    assert.ok(result.classification === "campaignEvent" || result.classification === "keyVisual");
    assert.deepEqual(result.requiresSpecialists, ["motion"]);
  });

  it("Case E — identity with website and motion", () => {
    const result = estimate(caseIdentityWithSpecialists);
    assert.ok(
      result.classification === "visualIdentity" || result.classification === "identitySystem",
    );
    assert.ok(result.requiresSpecialists.includes("motion"));
    assert.ok(result.requiresSpecialists.includes("digitalDesign"));
    assert.ok((result.specialistCost ?? 0) > 0);
    assert.ok((result.internalCost ?? 0) > 0);
  });
});

describe("null commercial values", () => {
  it("withholds a client range when the base fee is not configured", () => {
    const config = withConfig((c) => {
      c.projectTypes.identityRedesign.baseFee = null;
    });
    const result = estimate(caseSmallRefresh, config);
    assert.equal(result.internalCost, null);
    assert.equal(result.clientRange.min, null);
  });
});
