import { CARPOOL_PATH, type Lang } from "@/lib/i18n";

export type ProjectKind = "product" | "graphic";

export type Project = {
  slug: string;
  kind: ProjectKind;
  title: { pt: string; en: string };
  meta: { pt: string; en: string };
  /** Locale-aware path when the case study is published. */
  href?: Record<Lang, string>;
};

/**
 * Published portfolio work only.
 * Placeholders and invented briefs do not belong here.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "carpool",
    kind: "product",
    title: { pt: "Carpool", en: "Carpool" },
    meta: {
      pt: "UX research · Disponibilidade, readiness e a pergunta certa de investimento",
      en: "UX research · Availability, readiness and the right investment question",
    },
    href: CARPOOL_PATH,
  },
];

export function projectsByKind(kind: ProjectKind): readonly Project[] {
  return PROJECTS.filter((project) => project.kind === kind);
}
