import type {
  ApplicationContext,
  ApplicationScale,
  GuidelinesLevel,
  ProjectInput,
  SystemDepth,
} from "./types";

/** Translate selected contexts into a scope band. Never shown to the client. */
export function inferApplicationScale(
  applications: readonly ApplicationContext[] | undefined,
): ApplicationScale | null {
  const count = applications?.length ?? 0;
  if (count === 0) return null;
  if (count <= 2) return "few";
  if (count <= 5) return "smallSet";
  if (count <= 9) return "broad";
  return "many";
}

/** Documentation depth follows how far the visual system itself goes. */
export function inferGuidelines(
  systemDepth: SystemDepth | null | undefined,
): GuidelinesLevel | null {
  switch (systemDepth) {
    case "foundations":
      return "essential";
    case "system":
    case "systemAndApplications":
      return "standard";
    case "completeSystem":
      return "detailed";
    default:
      return null;
  }
}

export function withInferredAnswers(input: ProjectInput): ProjectInput {
  return {
    ...input,
    applicationScale: input.applicationScale ?? inferApplicationScale(input.applications),
    guidelines: input.guidelines ?? inferGuidelines(input.systemDepth),
  };
}
