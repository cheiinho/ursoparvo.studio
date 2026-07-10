import { pt } from "@/content/dict/pt";
import { SITE } from "@/content/site";
import { estimateBudget, formatEuro, type ServiceId } from "@/lib/estimate";

const SERVICE_IDS = pt.contact.serviceOptions.map((option) => option.id);

function asTrimmedString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { ok: false, reason: "unconfigured" },
      { status: 503 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success and drop the message.
  if (asTrimmedString(payload.website, 200) !== "") {
    return Response.json({ ok: true });
  }

  const nome = asTrimmedString(payload.nome, 200);
  const contacto = asTrimmedString(payload.contacto, 200);
  const descricao = asTrimmedString(payload.descricao, 800);
  const prazo = asTrimmedString(payload.prazo, 100);
  const origem = asTrimmedString(payload.origem, 100);
  const servicos = Array.isArray(payload.servicos)
    ? payload.servicos
        .map(String)
        .filter((value): value is ServiceId =>
          SERVICE_IDS.includes(value as ServiceId),
        )
    : [];

  if (!nome || !contacto || servicos.length === 0) {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const labels = pt.contact.serviceOptions
    .filter((option) => servicos.includes(option.id))
    .map((option) => option.label);
  const range = estimateBudget(servicos);
  const rangeText = `${formatEuro(range.min, "pt-PT")} - ${formatEuro(
    range.max,
    "pt-PT",
  )}`;

  const subject = `${pt.contact.subjectPrefix}: ${labels.join(", ")} (${nome})`;
  const text = [
    `${pt.contact.fields.name}: ${nome}`,
    `${pt.contact.fields.contact}: ${contacto}`,
    `${pt.contact.fields.services}: ${labels.join(", ")}`,
    ...(prazo ? [`${pt.contact.fields.deadline}: ${prazo}`] : []),
    ...(origem ? [`${pt.contact.fields.referral}: ${origem}`] : []),
    `${pt.contact.estimate.mailtoLabel}: ${rangeText}`,
    ...(descricao ? ["", `${pt.contact.fields.description}:`, descricao] : []),
  ].join("\n");

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
          ...(looksLikeEmail(contacto) ? { reply_to: contacto } : {}),
          subject,
          text,
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) {
      return Response.json(
        { ok: false, reason: "send_failed" },
        { status: 502 },
      );
    }
  } catch {
    return Response.json(
      { ok: false, reason: "send_failed" },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
