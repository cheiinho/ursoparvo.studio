export type ProjectTone =
  | "accent"
  | "field"
  | "clay"
  | "moss"
  | "slate"
  | "sand";

export type Project = {
  slug: string;
  title: { pt: string; en: string };
  meta: { pt: string; en: string };
  tone: ProjectTone;
  /** CSS aspect-ratio value, e.g. "4 / 5" */
  ratio: string;
};

/** Editorial placeholders until real work is published. */
export const PROJECTS: readonly Project[] = [
  {
    slug: "cavea",
    title: { pt: "Cávea", en: "Cávea" },
    meta: {
      pt: "Identidade para uma sala de concertos.",
      en: "Identity for a concert hall.",
    },
    tone: "accent",
    ratio: "4 / 5",
  },
  {
    slug: "norte-fundido",
    title: { pt: "Norte Fundido", en: "Norte Fundido" },
    meta: {
      pt: "Rebranding de uma fundição familiar do Porto.",
      en: "Rebranding for a family foundry in Porto.",
    },
    tone: "clay",
    ratio: "1 / 1",
  },
  {
    slug: "atlantica",
    title: { pt: "Atlântica", en: "Atlântica" },
    meta: {
      pt: "Sistema de identidade para uma seguradora com um século de história.",
      en: "Identity system for an insurer with a century of history.",
    },
    tone: "slate",
    ratio: "3 / 4",
  },
  {
    slug: "miradouro",
    title: { pt: "Miradouro", en: "Miradouro" },
    meta: {
      pt: "Marca e rótulos para um produtor de vinho do Dão.",
      en: "Brand and labels for a Dão wine producer.",
    },
    tone: "moss",
    ratio: "16 / 10",
  },
  {
    slug: "lume",
    title: { pt: "Lume", en: "Lume" },
    meta: {
      pt: "Identidade e sinalética para uma livraria independente.",
      en: "Identity and wayfinding for an independent bookshop.",
    },
    tone: "sand",
    ratio: "1 / 1",
  },
  {
    slug: "ponte",
    title: { pt: "Ponte", en: "Ponte" },
    meta: {
      pt: "Identidade para um gabinete de engenharia civil.",
      en: "Identity for a civil engineering practice.",
    },
    tone: "field",
    ratio: "4 / 5",
  },
  {
    slug: "sal",
    title: { pt: "Sal", en: "Sal" },
    meta: {
      pt: "Marca para uma cooperativa de sal de Aveiro.",
      en: "Brand for a salt cooperative in Aveiro.",
    },
    tone: "slate",
    ratio: "16 / 10",
  },
];
