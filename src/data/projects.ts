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

export type CaseStudyDecision = {
  title: string;
  discarded: string;
  chosen: string;
  body?: string;
};

export type CaseStudy = {
  problem: string;
  client: string;
  creativeTension: string;
  decisions: CaseStudyDecision[];
  whatLasts: string;
  systemNotes: string[];
  applicationImages: string[];
  outcome: string;
};

export type Project = {
  id: string;
  name: string;
  disciplines: string[];
  categories: ProjectCategory[];
  year: string;
  color: string;
  previewColor: string;
  summary: string;
  body: string[];
  image: string;
  caseStudy: CaseStudy;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "nordhaven",
    name: "Nordhaven",
    disciplines: ["Brand identity", "Art direction"],
    categories: ["Identity"],
    year: "2025",
    color: "var(--color-terracotta)",
    previewColor: "#ede0d8",
    featured: true,
    summary:
      "A coastal hospitality brand built around restraint, warm neutrals, editorial typography, and a mark that reads at arm's length and on a room key.",
    body: [
      "Nordhaven needed to feel rooted without nostalgia. We shaped a visual language that treats photography like evidence and type like architecture.",
      "The identity system scales from signage to digital booking without losing the calm, northern light the name implies.",
    ],
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe836f?w=1400&q=80",
    caseStudy: {
      problem:
        "A coastal hospitality brand needed to feel rooted without leaning on nostalgia.",
      client: "Nordhaven, hospitality and guest experience.",
      creativeTension:
        "Warmth and restraint had to coexist: approachable for guests, credible for operators and press.",
      decisions: [
        {
          title: "Photography as evidence, not mood board",
          discarded:
            "Soft, desaturated lifestyle imagery that blurred into every boutique hotel feed.",
          chosen:
            "Documentary framing with neutral light. Photography as proof, not filler.",
          body: "We shaped a visual language that treats photography like evidence and type like architecture.",
        },
        {
          title: "A mark that survives scale",
          discarded:
            "Ornamental wordmarks that collapsed at keycard and favicon size.",
          chosen:
            "A restrained mark with clear silhouette rules for signage, digital, and print.",
          body: "The identity system scales from signage to digital booking without losing the calm, northern light the name implies.",
        },
      ],
      whatLasts:
        "The palette and serif come from print and signage, not a trend cycle. The mark is simple enough to survive a keycard, a sign, and a phone screen in ten years.",
      systemNotes: [
        "Display serif for headlines; sans for operational UI and wayfinding.",
        "Warm neutrals as structure; accent used only for navigation and key actions.",
        "Modular grid for print and environmental applications.",
      ],
      applicationImages: [
        "https://images.unsplash.com/photo-1499951360447-b19be8fe836f?w=1400&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80",
      ],
      outcome:
        "A cohesive identity that reads at arm's length on signage and stays calm in digital booking flows.",
    },
  },
  {
    id: "forma",
    name: "Forma",
    disciplines: ["Visual language", "Type"],
    categories: ["Identity"],
    year: "2024",
    color: "var(--color-sage)",
    previewColor: "#dce8dc",
    featured: true,
    summary:
      "Forma is a studio tools company, we gave them a typographic system that feels engineered but human, with yellow as a single accent of intent.",
    body: [
      "Custom spacing rules, a modular grid, and a wordmark that survives favicon size were the core deliverables.",
      "Every template in the kit shares the same rhythm so internal teams ship consistent work without a gatekeeper.",
    ],
    image:
      "https://images.unsplash.com/photo-1561070791-252571790854?w=1400&q=80",
    caseStudy: {
      problem:
        "A studio tools company needed a system internal teams could ship without a design gatekeeper.",
      client: "Forma, product and design tooling.",
      creativeTension:
        "Engineered precision without coldness, the brand had to feel human at desk scale.",
      decisions: [
        {
          title: "Typography as the primary interface",
          discarded:
            "Illustration-led identity that competed with product UI.",
          chosen:
            "A typographic system with modular spacing as the hero, yellow reserved for intent.",
          body: "Custom spacing rules, a modular grid, and a wordmark that survives favicon size were the core deliverables.",
        },
        {
          title: "Templates over one-offs",
          discarded:
            "Bespoke decks for every launch that didn't scale past the founding team.",
          chosen:
            "A shared rhythm across templates so teams ship consistent work independently.",
          body: "Every template in the kit shares the same rhythm so internal teams ship consistent work without a gatekeeper.",
        },
      ],
      whatLasts:
        "Modular spacing and a typographic core age better than illustration trends. Yellow stays an accent, not a look, so the system does not date with the next UI fad.",
      systemNotes: [
        "Modular grid with explicit spacing tokens for product and marketing.",
        "Single accent (yellow) for primary actions only.",
        "Wordmark optimized for 16px favicon through full-width lockups.",
      ],
      applicationImages: [
        "https://images.unsplash.com/photo-1561070791-252571790854?w=1400&q=80",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=80",
      ],
      outcome:
        "Internal teams ship on-brand work without waiting on a central design owner.",
    },
  },
  {
    id: "arcadia",
    name: "Arcadia",
    disciplines: ["Digital experience", "Web"],
    categories: ["Digital"],
    year: "2024",
    color: "var(--color-slate)",
    previewColor: "#dce0e8",
    featured: true,
    summary:
      "Arcadia's product story was strong; the site wasn't. We rebuilt the narrative flow so strategy, product, and proof land in one continuous scroll.",
    body: [
      "Information architecture came first, fewer pages, clearer hierarchy, and motion only where it explains rather than decorates.",
      "Launch performance improved while the brand felt more premium and less template-driven.",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
    caseStudy: {
      problem:
        "A strong product story was buried under template-driven pages and scattered proof.",
      client: "Arcadia, B2B product and platform.",
      creativeTension:
        "Premium positioning without performance cost, clarity without corporate stiffness.",
      decisions: [
        {
          title: "Architecture before aesthetics",
          discarded:
            "A multi-page sitemap that repeated the same story in different wrappers.",
          chosen:
            "Fewer pages, clearer hierarchy, one continuous narrative scroll.",
          body: "Information architecture came first, fewer pages, clearer hierarchy, and motion only where it explains rather than decorates.",
        },
        {
          title: "Motion as explanation",
          discarded:
            "Decorative animation on every section regardless of content.",
          chosen:
            "Motion reserved for transitions that clarify product structure.",
          body: "Launch performance improved while the brand felt more premium and less template-driven.",
        },
      ],
      whatLasts:
        "The layout follows a clear hierarchy, not scroll gimmicks. When horizontal scroll and mesh gradients feel old, this structure will still read.",
      systemNotes: [
        "Type scale mapped to narrative beats: strategy → product → proof.",
        "Performance budget treated as a brand constraint.",
        "Component library aligned with marketing and product surfaces.",
      ],
      applicationImages: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
      ],
      outcome:
        "A site that reads as premium and loads fast, product story and proof in one flow.",
    },
  },
  {
    id: "meridian",
    name: "Meridian",
    disciplines: ["Brand strategy", "Naming"],
    categories: ["Identity"],
    year: "2023",
    color: "var(--color-ochre)",
    previewColor: "#ebe4cc",
    summary:
      "Naming and positioning for a fintech entering a crowded market, one word, one promise, and a verbal identity that legal could actually approve.",
    body: [
      "Workshops with founders surfaced a through-line: clarity as a product feature, not a marketing line.",
      "Meridian became the anchor for every downstream design decision.",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
    caseStudy: {
      problem:
        "A fintech entering a crowded market needed a name and promise legal could approve.",
      client: "Meridian, financial services.",
      creativeTension:
        "Distinctive in a sea of blue fintech wordmarks without sounding invented for a pitch deck.",
      decisions: [
        {
          title: "Clarity as product, not tagline",
          discarded:
            "Aspirational slogans that couldn't survive compliance review.",
          chosen:
            "A verbal identity anchored in clarity as a product feature.",
          body: "Workshops with founders surfaced a through-line: clarity as a product feature, not a marketing line.",
        },
        {
          title: "One word, one promise",
          discarded:
            "Compound names and descriptor stacks that diluted recall.",
          chosen:
            "Meridian, a single anchor for every downstream design decision.",
          body: "Meridian became the anchor for every downstream design decision.",
        },
      ],
      whatLasts:
        "One word, one promise. Naming built for recall and legal clearance outlasts compound fintech jargon that sounds smart for eighteen months.",
      systemNotes: [
        "Naming criteria documented for trademark and legal review.",
        "Verbal tone: direct, precise, no financial jargon padding.",
        "Visual system deferred until verbal identity was locked.",
      ],
      applicationImages: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
      ],
      outcome:
        "A name and promise the team could defend in boardrooms and compliance reviews.",
    },
  },
  {
    id: "clayworks",
    name: "Clayworks",
    disciplines: ["Packaging", "Industrial"],
    categories: ["Packaging"],
    year: "2023",
    color: "var(--color-clay)",
    previewColor: "#e8ddd6",
    summary:
      "Packaging for a ceramics line where the object is the hero, labels that feel printed by hand, with structure tight enough for retail.",
    body: [
      "We referenced kiln marks and paper stock rather than glossy render aesthetics.",
      "The system covers six SKUs with two ink colors and one die line.",
    ],
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80",
    caseStudy: {
      problem:
        "A ceramics line needed packaging where the object stays hero, not the label.",
      client: "Clayworks, ceramics and homeware.",
      creativeTension:
        "Handmade warmth with retail-ready structure, six SKUs, tight production constraints.",
      decisions: [
        {
          title: "Material honesty over render gloss",
          discarded:
            "Glossy 3D renders that made every piece look identical on shelf.",
          chosen:
            "Kiln marks and paper stock references, labels that feel printed by hand.",
          body: "We referenced kiln marks and paper stock rather than glossy render aesthetics.",
        },
        {
          title: "Constraint as system",
          discarded:
            "Unique packaging per SKU that couldn't scale on a single production line.",
          chosen:
            "Six SKUs, two ink colors, one die line, variation through type and layout.",
          body: "The system covers six SKUs with two ink colors and one die line.",
        },
      ],
      whatLasts:
        "Two inks, one die. Production constraints force simplicity. That simplicity is what keeps the line readable on shelf long after craft aesthetics rotate.",
      systemNotes: [
        "Two-color print spec for all variants.",
        "Single die line with modular label architecture.",
        "Typography references hand-set letterpress without sacrificing legibility.",
      ],
      applicationImages: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80",
        "https://images.unsplash.com/photo-1610701596007-11505706a964?w=1400&q=80",
      ],
      outcome:
        "Shelf presence that reads artisanal while meeting retail production constraints.",
    },
  },
  {
    id: "mossline",
    name: "Mossline",
    disciplines: ["Editorial system", "Print"],
    categories: ["Editorial"],
    year: "2022",
    color: "var(--color-moss)",
    previewColor: "#d4e0d0",
    summary:
      "An editorial system for a quarterly journal, grid, masthead, and issue architecture that editors can populate without designers in the loop.",
    body: [
      "Mossline treats each issue as a variation on a spine, not a reinvention.",
      "Print specs and digital PDF exports share the same source templates.",
    ],
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270ef7?w=1400&q=80",
    caseStudy: {
      problem:
        "A quarterly journal needed an editorial system editors could populate without designers.",
      client: "Mossline, print and digital publishing.",
      creativeTension:
        "Each issue should feel distinct while sharing a spine, variation without reinvention.",
      decisions: [
        {
          title: "Spine, not reinvention",
          discarded:
            "Full redesign every issue that burned editorial budget and broke continuity.",
          chosen:
            "Each issue as a variation on a fixed spine, masthead, grid, and issue architecture.",
          body: "Mossline treats each issue as a variation on a spine, not a reinvention.",
        },
        {
          title: "One source, two outputs",
          discarded:
            "Separate print and digital workflows that drifted out of sync.",
          chosen:
            "Shared templates for print specs and digital PDF export.",
          body: "Print specs and digital PDF exports share the same source templates.",
        },
      ],
      whatLasts:
        "A fixed spine with room to vary inside it. Editors can change content without redesigning the issue. That is how journals stay coherent for decades.",
      systemNotes: [
        "12-column grid with explicit zones for features, columns, and inserts.",
        "Masthead system with issue-number logic baked into templates.",
        "Editor-facing documentation for populating without design support.",
      ],
      applicationImages: [
        "https://images.unsplash.com/photo-1507842217343-583bb7270ef7?w=1400&q=80",
        "https://images.unsplash.com/photo-1457369804613-52c61a93e2fc?w=1400&q=80",
      ],
      outcome:
        "Editors ship consistent issues on schedule, print and digital stay aligned.",
    },
  },
];

export const featuredProjectIds = ["nordhaven", "forma", "arcadia"] as const;

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
