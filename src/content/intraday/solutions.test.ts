import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "vitest";
import { intradayEn } from "./en";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("the solutions are the spine of the page", () => {
  const solutions = intradayEn.experience.solutions;

  it("names five solutions, each with one thing to do and one thing to look at", () => {
    assert.equal(solutions.length, 5);
    for (const solution of solutions) {
      assert.ok(solution.label.length > 0, `${solution.id} has no name`);
      assert.ok(solution.statement.length > 0, `${solution.id} says nothing`);
      assert.ok(solution.line.length > 0, `${solution.id} gives no reason`);
      assert.ok(solution.look.length > 0, `${solution.id} points at nothing`);
    }
    const ids = solutions.map((solution) => solution.id);
    assert.equal(new Set(ids).size, ids.length);
    const labels = solutions.map((solution) => solution.label);
    assert.equal(new Set(labels).size, labels.length);
  });

  it("covers the four parts the source material presents as the solution", () => {
    const ids = solutions.map((solution) => solution.id);
    // configuration, notification, completion, history, and the path to a period
    assert.deepEqual(ids, ["allow", "announce", "replace", "compare", "locate"]);
    assert.equal(solutions[0].view.place, "configurations");
    assert.equal(solutions[1].view.phase, 4);
    assert.equal(solutions[2].view.phase, 5);
    assert.equal(solutions[3].view.showPrevious, true);
    assert.equal(solutions[4].view.place, "issues");
  });

  it("puts every solution in the contents list at its own anchor", () => {
    const page = read("../../components/intraday/IntradayCaseStudy.tsx");
    assert.match(page, /href=\{`#\$\{solution\.id\}`\}/);
    const scene = read("../../components/intraday/Scene.tsx");
    assert.match(scene, /id=\{solution\.id\}/);
  });
});

describe("the page reads without being operated", () => {
  it("has no transport to step through", () => {
    const page = read("../../components/intraday/IntradayCaseStudy.tsx");
    const scene = read("../../components/intraday/Scene.tsx");
    for (const source of [page, scene]) {
      assert.equal(/ix-console|ix-transport|ix-acts|Restart/.test(source), false);
    }
  });

  it("gives each scene its own product state instead of one global step", () => {
    const store = read("../../components/intraday/store.tsx");
    assert.equal(/ACT_ORDER|goTo|restart/.test(store), false);
    assert.match(store, /ExperienceProvider\(\{\s*view/);
  });

  it("pins nothing in the product, so scrolling is the only thing needed", () => {
    const css = read("../../components/intraday/intraday.css");
    const pinned = css.match(/^\.(pwin__bar|psystem|pnav ul|ix-console)[^{]*\{[^}]*position:\s*sticky/gm);
    assert.equal(pinned, null);
    assert.equal(css.includes("--ix-chrome"), false);
  });

  it("drops the navigation rail on a phone", () => {
    const css = read("../../components/intraday/intraday.css");
    const narrow = css.slice(css.indexOf("@media (max-width: 62rem)"));
    assert.match(narrow, /\.pnav\s*\{\s*display:\s*none/);
  });
});
