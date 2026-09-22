import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { intradayEn } from "./en";
import * as state from "./state";
import {
  MARKED_TIMES,
  STEP_TIMES,
  announceOnChange,
  bannerKey,
  closePanel,
  moveStep,
  openPanel,
  ordersVisible,
  sameBanner,
  scenarioView,
  shellShowsNext,
  stepShowsBand,
  stepShowsNext,
  stepStatus,
} from "./state";

describe("intraday interaction state", () => {
  it("shows actuals only for volume", () => {
    assert.equal(scenarioView("volume").showActuals, true);
    assert.equal(scenarioView("handle").showActuals, false);
    assert.equal(scenarioView("capacity").showActuals, false);
    assert.notEqual(scenarioView("handle").noteId, scenarioView("volume").noteId);
    assert.notEqual(scenarioView("capacity").noteId, scenarioView("volume").noteId);
  });

  it("keeps the first three steps silent", () => {
    assert.equal(stepStatus(1), "none");
    assert.equal(stepStatus(2), "none");
    assert.equal(stepStatus(3), "none");
    assert.equal(stepShowsNext(1), false);
    assert.equal(stepShowsNext(3), false);
    assert.equal(stepShowsBand(2), false);
    assert.equal(stepShowsBand(3), true);
    assert.deepEqual(MARKED_TIMES[2], ["10:00", "10:15"]);
  });

  it("announces a run only at steps 4 and 5", () => {
    assert.equal(stepStatus(4), "start");
    assert.equal(stepShowsNext(4), false);
    assert.equal(stepStatus(5), "completed");
    assert.equal(stepShowsNext(5), true);
    assert.equal(STEP_TIMES[1].includes("10:00"), false);
    assert.equal(STEP_TIMES[5][0], "10:00");
    assert.equal(STEP_TIMES[5].at(-1), "16:45");
  });

  it("does not move past the ends", () => {
    assert.equal(moveStep(1, -1), null);
    assert.equal(moveStep(5, 1), null);
    assert.equal(moveStep(2, 1), 3);
    assert.equal(moveStep(4, -1), 3);
  });

  it("gives a watching state no banner and keeps the previous line until update", () => {
    assert.equal(bannerKey("watching"), null);
    assert.equal(bannerKey("inProgress"), "start");
    assert.equal(bannerKey("updated"), "completed");
    assert.equal(shellShowsNext("watching"), false);
    assert.equal(shellShowsNext("inProgress"), false);
    assert.equal(shellShowsNext("updated"), true);
    assert.equal(intradayEn.decisionTwo.start, "Anomaly detected. Reforecast in progress in the affected queues.");
    assert.equal(
      intradayEn.decisionTwo.completed,
      "Reforecast completed. Check updated data to solve possible issues.",
    );
  });

  it("does not change the banner when the surface changes", () => {
    assert.equal(sameBanner("inProgress", "forecast"), sameBanner("inProgress", "teamSchedule"));
    assert.equal(sameBanner("watching", "insights"), null);
  });

  it("hides Orders only while the in-progress filter is on", () => {
    assert.equal(ordersVisible("watching", true), true);
    assert.equal(ordersVisible("inProgress", false), true);
    assert.equal(ordersVisible("inProgress", true), false);
    assert.equal(ordersVisible("updated", true), true);
  });

  it("does not announce when the value did not change", () => {
    assert.equal(announceOnChange("forecast", "forecast", "Forecast"), null);
    assert.equal(announceOnChange("forecast", "insights", "Insights"), "Insights");
  });

  it("does not export a switch that other islands could read", () => {
    assert.equal("enabled" in state, false);
    assert.equal("reforecast" in state, false);
  });

  it("returns focus to notifications when the panel closes", () => {
    assert.deepEqual(openPanel(), { open: true, focus: "panel" });
    assert.deepEqual(closePanel(), { open: false, focus: "notifications" });
  });
});
