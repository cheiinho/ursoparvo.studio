import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { en as dictEn } from "@/content/dict/en";
import { pt as dictPt } from "@/content/dict/pt";
import { en as flowEn } from "@/content/project-flow/en";
import { pt as flowPt } from "@/content/project-flow/pt";

const EM_DASH = "\u2014";

const BRAZILIAN = [
  /\bvocê\b/i,
  /\bvocês\b/i,
  /\bcontato\b/i,
  /\btela\b/i,
  /\busuário\b/i,
  /\baplicativo\b/i,
];

function stringsOf(value: unknown, path = ""): Array<{ path: string; text: string }> {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => stringsOf(item, `${path}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, nested]) =>
      stringsOf(nested, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

describe("user-facing copy", () => {
  const corpus = [
    ...stringsOf(dictPt, "dict.pt"),
    ...stringsOf(dictEn, "dict.en"),
    ...stringsOf(flowPt, "flow.pt"),
    ...stringsOf(flowEn, "flow.en"),
  ];

  it("does not use em dashes", () => {
    const hits = corpus.filter(({ text }) => text.includes(EM_DASH));
    assert.deepEqual(hits, []);
  });

  it("keeps Portuguese in European form", () => {
    const portuguese = corpus.filter(({ path }) => path.includes(".pt"));
    const hits = portuguese.filter(({ text }) => BRAZILIAN.some((pattern) => pattern.test(text)));
    assert.deepEqual(hits, []);
  });
});
