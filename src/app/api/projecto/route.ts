import { pt as projectFlowPt } from "@/content/project-flow/pt";
import { SITE } from "@/content/site";
import { buildProjectPayload, buildStudioBrief } from "@/lib/project-discovery/brief";
import { estimateProject } from "@/lib/project-discovery/engine";
import {
  looksLikeEmail,
  sanitizeAnswers,
  sanitizeContact,
} from "@/lib/project-discovery/sanitize";
import type { Lang } from "@/lib/i18n";

function asLocale(value: unknown): Lang {
  return value === "en" ? "en" : "pt";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const answers = sanitizeAnswers(payload.answers);
  const contact = sanitizeContact(payload.contact);
  const locale = asLocale(payload.locale);

  if (!answers.projectType || !contact.name || !looksLikeEmail(contact.email)) {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const result = estimateProject(answers);
  const briefPayload = buildProjectPayload(answers, contact, result, locale);
  const studioBrief = buildStudioBrief(briefPayload, result, projectFlowPt.brief, {
    includeInternal: true,
  });
  const mailtoBody = buildStudioBrief(briefPayload, result, projectFlowPt.brief, {
    includeInternal: false,
  });

  const subject = `Projecto: ${projectFlowPt.brief.labels[answers.projectType] ?? answers.projectType} (${contact.name})`;
  const text = [
    studioBrief,
    "",
    "INTERNO",
    `classificação: ${result.classification}`,
    `complexidade: ${result.complexityScore}`,
    `âmbito: ${result.scopeScore}`,
    `risco: ${result.riskScore}`,
    `custo interno: ${result.internalCost ?? "—"}`,
    `especialistas: ${result.specialistCost ?? "—"}`,
    `honorário recomendado: ${result.recommendedFee ?? "—"}`,
    `descoberta: ${result.requiresDiscovery ? "sim" : "não"}`,
    "",
    "---",
    JSON.stringify(briefPayload, null, 2),
  ].join("\n");

  if (!apiKey) {
    return Response.json(
      { ok: false, reason: "unconfigured", mailtoBody },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(
      process.env.RESEND_API_URL ?? "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL ??
            "UrsoParvo Studio <orcamentos@ursoparvo.studio>",
          to: [process.env.CONTACT_TO_EMAIL ?? SITE.email],
          reply_to: contact.email,
          subject,
          text,
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) {
      return Response.json(
        { ok: false, reason: "send_failed", mailtoBody },
        { status: 502 },
      );
    }
  } catch {
    return Response.json(
      { ok: false, reason: "send_failed", mailtoBody },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
