import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "vitest";
import { intradayEn } from "./en";

describe("intraday frame stylesheet", () => {
  const css = readFileSync(new URL("../../components/intraday/intraday.css", import.meta.url), "utf8");

  it("does not let the dark theme retint the product frame", () => {
    assert.equal(/\.dark\s+\.intraday-ui/.test(css), false);
    assert.match(css, /\.intraday-ui\s*\{[^}]*background:\s*#ffffff/i);
    assert.match(css, /\.intraday-ui\s*\{[^}]*color-scheme:\s*light/);
  });

  it("does not paint the product frame with the editorial purple", () => {
    const block = css.split(".intraday-ui {")[1]?.split(".intraday-field")[0] ?? "";
    assert.equal(block.includes("#3C2A63"), false);
    assert.equal(block.includes("#3c2a63"), false);
  });

  it("keeps Insights free of the forecast chart", () => {
    const source = readFileSync(new URL("../../components/intraday/InsightsBody.tsx", import.meta.url), "utf8");
    assert.equal(source.includes("ForecastChart"), false);
  });

  it("labels the composition with the reconstruction and illustrative copy", () => {
    const source = readFileSync(
      new URL("../../components/intraday/IntradayCaseStudy.tsx", import.meta.url),
      "utf8",
    );
    assert.equal(source.startsWith('"use client"'), false);
    assert.equal(source.includes("labels.illustrative"), true);
    assert.equal(source.includes("frame.sentence"), true);
    assert.equal(intradayEn.frame.sentence.length > 0, true);
    assert.equal(intradayEn.labels.illustrative.length > 0, true);
  });
});
