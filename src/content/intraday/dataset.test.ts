import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { dataset } from "./dataset";
import { intradayEn } from "./en";
import {
  affectedPeriodLabel,
  hourlyNext,
  hourlyPrevious,
  isPresent,
  periodSpan,
  presentNames,
  sumField,
} from "./derive";

const affected = ["10:00", "10:15", "10:30", "10:45"] as const;

describe("intraday dataset", () => {
  it("has the authored quarter count and ends", () => {
    assert.equal(dataset.quarters.length, 36);
    assert.equal(dataset.quarters[0].time, "08:00");
    assert.equal(dataset.quarters[0].previous, 48);
    assert.equal(dataset.quarters[0].actual, 46);
    assert.equal(dataset.quarters[0].next, null);
    assert.equal(dataset.quarters.at(-1)?.time, "16:45");
    assert.equal(dataset.quarters.at(-1)?.previous, 40);
    assert.equal(dataset.quarters.at(-1)?.next, 60);
  });

  it("matches the authored affected period", () => {
    const rows = affected.map((time) => dataset.quarters.find((quarter) => quarter.time === time));
    assert.deepEqual(
      rows.map((row) => [row?.previous, row?.actual, row?.next]),
      [
        [64, 83, null],
        [64, 83, null],
        [66, 86, null],
        [66, 86, null],
      ],
    );
    assert.equal(sumField(affected, "actual"), 338);
    assert.equal(sumField(affected, "previous"), 260);
  });

  it("keeps actuals empty after 10:45 and the new line empty before 11:00", () => {
    for (const quarter of dataset.quarters) {
      if (quarter.time > "10:45") assert.equal(quarter.actual, null);
      if (quarter.time < "11:00") assert.equal(quarter.next, null);
      if (quarter.time >= "11:00") assert.equal(typeof quarter.next, "number");
    }
  });

  it("matches the authored new line at the boundaries of the afternoon", () => {
    const at = (time: string) => dataset.quarters.find((quarter) => quarter.time === time);
    assert.equal(at("11:00")?.next, 88);
    assert.equal(at("11:00")?.previous, 68);
    assert.equal(at("12:00")?.next, 78);
    assert.equal(at("16:45")?.next, 60);
  });

  it("sums the hours the specification names", () => {
    const hourly = Object.fromEntries(hourlyPrevious().map((row) => [row.hour, row.total]));
    assert.equal(hourly["08:00"], 204);
    assert.equal(hourly["09:00"], 236);
    assert.equal(hourly["10:00"], 260);
    assert.equal(hourly["11:00"], 266);
    assert.equal(hourlyNext("11:00"), 346);
    assert.equal(hourlyNext("10:00"), null);
  });

  it("does not store a threshold, an accuracy figure, or a second queue series", () => {
    const raw = JSON.stringify(dataset);
    assert.equal(raw.includes("10%"), false);
    assert.equal(raw.includes("accuracy"), false);
    assert.equal(raw.includes("threshold"), false);
    assert.equal(dataset.contrastQueue, "Orders");
  });

  it("places five people in the affected period and not Filipe", () => {
    const names = presentNames(dataset.affected.start, dataset.affected.end);
    assert.deepEqual(names, [
      "Ana Varela",
      "Bruno Caldas",
      "Clara Nogueira",
      "Duarte Fialho",
      "Eva Ramalho",
    ]);
    assert.equal(
      isPresent(dataset.people[5], dataset.affected.start, dataset.affected.end),
      false,
    );
  });

  it("builds the affected-period label from the dataset clocks", () => {
    const span = periodSpan(dataset.affected.start, dataset.affected.end);
    assert.equal(span, "10:00 to 11:00");
    assert.equal(
      affectedPeriodLabel(intradayEn.decisionThree.periodPrefix, dataset.affected.start, dataset.affected.end),
      intradayEn.decisionThree.periodLabel,
    );
  });
});
