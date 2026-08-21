import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { formatRange, hasVisibleRange } from "./narrative";
import type { ClientEstimate } from "@/lib/project-discovery/types";

function estimate(range: { min: number | null; max: number | null }, discovery = false): ClientEstimate {
  return {
    classification: "identityRefresh",
    requiresDiscovery: discovery,
    requiresSpecialists: [],
    clientRange: range,
    assumptions: [],
  };
}

describe("estimate range display", () => {
  it("formats Portuguese ranges with a single euro sign", () => {
    assert.equal(formatRange(7500, 10000, "pt-PT"), "7 500–10 000 €");
  });

  it("formats English ranges without false precision", () => {
    const displayed = formatRange(8000, 10000, "en-GB");
    assert.ok(displayed);
    assert.match(displayed, /€8,000–€10,000/);
    assert.doesNotMatch(displayed, /\.\d/);
  });

  it("withholds a number when discovery is still required", () => {
    assert.equal(hasVisibleRange(estimate({ min: 7500, max: 10000 }, true)), false);
    assert.equal(hasVisibleRange(estimate({ min: null, max: null })), false);
    assert.equal(hasVisibleRange(estimate({ min: 7500, max: 10000 })), true);
  });
});
