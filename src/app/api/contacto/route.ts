import { pt } from "@/content/dict/pt";
import { SITE } from "@/content/site";

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
  const email = asTrimmedString(payload.email, 200);
  const about = asTrimmedString(payload.about, 2000);
  const change = asTrimmedString(payload.change, 2000);
  const timing = asTrimmedString(payload.timing, 200);

  if (!nome || !looksLikeEmail(email) || !about) {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const subject = `${pt.contact.subjectPrefix}: ${nome}`;
  const text = [
    `${pt.contact.fields.name}: ${nome}`,
    `${pt.contact.fields.email}: ${email}`,
    "",
    `${pt.contact.fields.about}:`,
    about,
    ...(change ? ["", `${pt.contact.fields.change}:`, change] : []),
    ...(timing ? ["", `${pt.contact.fields.timing}:`, timing] : []),
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
          reply_to: email,
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
