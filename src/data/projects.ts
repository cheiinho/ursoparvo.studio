export type ProjectCategory =
  | "Identity"
  | "Digital"
  | "Editorial"
  | "Packaging";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Identity",
  "Digital",
  "Editorial",
  "Packaging",
];

export type Project = {
  id: string;
  name: string;
  disciplines: string[];
  categories: ProjectCategory[];
  year: string;
  summary: string;
  body: string[];
  featured?: boolean;
};

/** Add real projects here when they are ready to publish. */
export const projects: Project[] = [];

export const featuredProjectIds = [] as const;

export function projectHref(id: string) {
  return `/work/${id}`;
}

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects() {
  return featuredProjectIds
    .map((id) => getProject(id))
    .filter((p): p is Project => p != null);
}

export function getNextProject(id: string) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}

export function hasPublishedWork() {
  return projects.length > 0;
}
