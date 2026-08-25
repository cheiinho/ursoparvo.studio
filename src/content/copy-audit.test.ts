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

const POST_AO = [
  /\bprojeto/i,
  /\bdireção/i,
  /\bação\b/i,
  /\bobjeto/i,
  /\batual/i,
  /\bótimo/i,
  /\bseção/i,
];

const CREDENTIALS = [
  /BMW/i,
  /Mercedes/i,
  /Talkdesk/i,
  /Segurança Social/i,
  /Politécnico/i,
];

const FIRST_PERSON = [/\beu\b/i, /\bnós\b/i];

const CLICHES = [
  /we believe/i,
  /our mission/i,
  /our passion/i,
  /our unique approach/i,
  /meaningful experiences/i,
  /brands that inspire/i,
  /design that transforms/i,
  /unlock potential/i,
  /bring brands to life/i,
  /quanto mais completo o briefing/i,
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
  const live = [...stringsOf(dictPt, "dict.pt"), ...stringsOf(dictEn, "dict.en")];
  const corpus = [
    ...live,
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

  it("keeps live Portuguese on pre-1990 spelling", () => {
    const portuguese = live.filter(({ path }) => path.startsWith("dict.pt"));
    const hits = portuguese.filter(({ text }) => POST_AO.some((pattern) => pattern.test(text)));
    assert.deepEqual(hits, []);
  });

  it("does not use client names as credentials", () => {
    const hits = live.filter(({ text }) => CREDENTIALS.some((pattern) => pattern.test(text)));
    assert.deepEqual(hits, []);
  });

  it("does not use first person in studio copy", () => {
    const studio = live.filter(({ path }) => path.includes(".studio"));
    const hits = studio.filter(({ text }) => FIRST_PERSON.some((pattern) => pattern.test(text)));
    assert.deepEqual(hits, []);
  });

  it("does not use agency clichés", () => {
    const hits = live.filter(({ text }) => CLICHES.some((pattern) => pattern.test(text)));
    assert.deepEqual(hits, []);
  });

  it("keeps the approved studio essay", () => {
    assert.equal(dictPt.studio.essay[0], "Uma identidade não é uma tendência.");
    assert.equal(dictPt.studio.closing.at(-1), "O resto pode crescer.");
    assert.equal(dictEn.studio.essay[0], "An identity is not a trend.");
    assert.equal(dictEn.studio.closing.at(-1), "Everything else can grow.");
  });

  it("keeps the project form to the first conversation", () => {
    assert.deepEqual(Object.keys(dictPt.contact.fields), [
      "about",
      "change",
      "timing",
      "name",
      "email",
    ]);
    assert.equal(dictPt.contact.submit, "Enviar projecto");
    assert.equal(dictEn.contact.submit, "Send a project");
  });
});
