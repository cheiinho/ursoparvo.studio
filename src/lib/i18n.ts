export const LANGS = ["pt", "en"] as const;

export type Lang = (typeof LANGS)[number];

export function hasLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export const HTML_LANG: Record<Lang, string> = {
  pt: "pt-PT",
  en: "en",
};

export const OTHER_LANG: Record<Lang, Lang> = {
  pt: "en",
  en: "pt",
};

export const HOME_PATH: Record<Lang, string> = {
  pt: "/pt",
  en: "/en",
};

export const STUDIO_PATH: Record<Lang, string> = {
  pt: "/pt/estudio",
  en: "/en/studio",
};

export const PROJECT_PATH: Record<Lang, string> = {
  pt: "/pt/projecto",
  en: "/en/project",
};
