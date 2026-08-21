import type { ProjectInput } from "./types";

/** Case A — Small refresh of an existing identity. */
export const caseSmallRefresh: ProjectInput = {
  projectType: "identityRedesign",
  existingBrandState: ["visualIdentity"],
  redesignDepth: "refine",
  strategyClarity: "veryClear",
  identityScope: ["logo", "typography"],
  systemDepth: "foundations",
  guidelines: "essential",
  applications: ["website", "social"],
  applicationScale: "few",
  specialistServices: [],
  timeline: "noDate",
  stakeholderComplexity: "oneDecisionMaker",
  budgetRange: "5000-10000",
  description: "Afinar a identidade existente e usá-la com mais consistência.",
};

/** Case B — Substantial identity system with broad applications. */
export const caseFullIdentitySystem: ProjectInput = {
  projectType: "identityRedesign",
  existingBrandState: ["visualIdentity", "disconnectedMaterials"],
  redesignDepth: "rebuild",
  strategyClarity: "mostlyClear",
  identityScope: [
    "logo",
    "symbol",
    "typography",
    "colour",
    "graphicLanguage",
    "layoutSystem",
    "templates",
  ],
  systemDepth: "completeSystem",
  guidelines: "detailed",
  applications: [
    "website",
    "social",
    "presentations",
    "reports",
    "print",
    "signage",
    "events",
  ],
  applicationScale: "broad",
  specialistServices: [],
  timeline: "fewMonths",
  stakeholderComplexity: "smallTeam",
  budgetRange: "10000-20000",
  description: "A identidade já não reflecte a organização e precisa de um sistema robusto.",
};

/** Case C — New brand still taking shape. */
export const caseUndefinedBrand: ProjectInput = {
  projectType: "visualIdentity",
  existingBrandState: ["nameAndBusiness"],
  strategyClarity: "stillTakingShape",
  identityScope: [
    "logo",
    "symbol",
    "typography",
    "colour",
    "graphicLanguage",
    "illustration",
    "iconography",
    "photographyDirection",
    "layoutSystem",
    "templates",
  ],
  systemDepth: "completeSystem",
  guidelines: "detailed",
  applications: ["website", "social", "packaging", "signage", "advertising", "events"],
  applicationScale: "many",
  specialistServices: [],
  timeline: "noDate",
  stakeholderComplexity: "severalStakeholders",
  budgetRange: "notYet",
};

/** Case D — Festival / event with a key visual and motion. */
export const caseEventCampaign: ProjectInput = {
  projectType: "visualDirection",
  campaignKind: "keyVisual",
  campaignPlacements: ["posters", "social", "signage"],
  specialistServices: ["motion"],
  timeline: "fewMonths",
  stakeholderComplexity: "smallTeam",
  budgetRange: "5000-10000",
  description: "Festival de verão. Precisamos de um key visual e da sua aplicação.",
};

/** Case E — Identity system with website and motion extensions. */
export const caseIdentityWithSpecialists: ProjectInput = {
  projectType: "visualIdentity",
  existingBrandState: ["nameAndBusiness", "logo"],
  strategyClarity: "mostlyClear",
  identityScope: ["logo", "typography", "colour", "graphicLanguage"],
  systemDepth: "system",
  guidelines: "standard",
  applications: ["website", "social", "presentations"],
  applicationScale: "smallSet",
  specialistServices: ["motion", "digitalDesign"],
  timeline: "fewMonths",
  stakeholderComplexity: "smallTeam",
  budgetRange: "10000-20000",
};
