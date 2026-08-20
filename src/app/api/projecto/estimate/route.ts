import { estimateProject, toClientEstimate } from "@/lib/project-discovery/engine";
import { sanitizeAnswers } from "@/lib/project-discovery/sanitize";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const answers = sanitizeAnswers(payload.answers);
  if (!answers.projectType) {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const result = estimateProject(answers);
  return Response.json(toClientEstimate(result));
}
