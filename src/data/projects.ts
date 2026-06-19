export type Project = {
  id: string;
  name: string;
  disciplines: string[];
  year: string;
  color: string;
  previewColor: string;
  summary: string;
  body: string[];
  image: string;
};

export const projects: Project[] = [
  {
    id: "nordhaven",
    name: "Nordhaven",
    disciplines: ["Brand identity", "Art direction"],
    year: "2025",
    color: "var(--color-terracotta)",
    previewColor: "#ede0d8",
    summary:
      "A coastal hospitality brand built around restraint — warm neutrals, editorial typography, and a mark that reads at arm's length and on a room key.",
    body: [
      "Nordhaven needed to feel rooted without nostalgia. We shaped a visual language that treats photography like evidence and type like architecture.",
      "The identity system scales from signage to digital booking without losing the calm, northern light the name implies.",
    ],
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe836f?w=1400&q=80",
  },
  {
    id: "forma",
    name: "Forma",
    disciplines: ["Visual language", "Type"],
    year: "2024",
    color: "var(--color-sage)",
    previewColor: "#dce8dc",
    summary:
      "Forma is a studio tools company — we gave them a typographic system that feels engineered but human, with yellow as a single accent of intent.",
    body: [
      "Custom spacing rules, a modular grid, and a wordmark that survives favicon size were the core deliverables.",
      "Every template in the kit shares the same rhythm so internal teams ship consistent work without a gatekeeper.",
    ],
    image:
      "https://images.unsplash.com/photo-1561070791-252571790854?w=1400&q=80",
  },
  {
    id: "arcadia",
    name: "Arcadia",
    disciplines: ["Digital experience", "Web"],
    year: "2024",
    color: "var(--color-slate)",
    previewColor: "#dce0e8",
    summary:
      "Arcadia's product story was strong; the site wasn't. We rebuilt the narrative flow so strategy, product, and proof land in one continuous scroll.",
    body: [
      "Information architecture came first — fewer pages, clearer hierarchy, and motion only where it explains rather than decorates.",
      "Launch performance improved while the brand felt more premium and less template-driven.",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
  },
  {
    id: "meridian",
    name: "Meridian",
    disciplines: ["Brand strategy", "Naming"],
    year: "2023",
    color: "var(--color-ochre)",
    previewColor: "#ebe4cc",
    summary:
      "Naming and positioning for a fintech entering a crowded market — one word, one promise, and a verbal identity that legal could actually approve.",
    body: [
      "Workshops with founders surfaced a through-line: clarity as a product feature, not a marketing line.",
      "Meridian became the anchor for every downstream design decision.",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
  },
  {
    id: "clayworks",
    name: "Clayworks",
    disciplines: ["Packaging", "Industrial"],
    year: "2023",
    color: "var(--color-clay)",
    previewColor: "#e8ddd6",
    summary:
      "Packaging for a ceramics line where the object is the hero — labels that feel printed by hand, with structure tight enough for retail.",
    body: [
      "We referenced kiln marks and paper stock rather than glossy render aesthetics.",
      "The system covers six SKUs with two ink colors and one die line.",
    ],
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80",
  },
  {
    id: "mossline",
    name: "Mossline",
    disciplines: ["Editorial system", "Print"],
    year: "2022",
    color: "var(--color-moss)",
    previewColor: "#d4e0d0",
    summary:
      "An editorial system for a quarterly journal — grid, masthead, and issue architecture that editors can populate without designers in the loop.",
    body: [
      "Mossline treats each issue as a variation on a spine, not a reinvention.",
      "Print specs and digital PDF exports share the same source templates.",
    ],
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270ef7?w=1400&q=80",
  },
];

export function projectHref(id: string) {
  return `/work/${id}`;
}

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

