"use client";

import { useState } from "react";
import { CONTACT } from "@/content/home";
import { SITE } from "@/content/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `${CONTACT.subjectPrefix} — ${get("tipo")} — ${get("nome")}`;
    const body = [
      `${CONTACT.fields.name}: ${get("nome")}`,
      `${CONTACT.fields.type}: ${get("tipo")}`,
      `${CONTACT.fields.budget}: ${get("orcamento")}`,
      `${CONTACT.fields.deadline}: ${get("prazo") || "—"}`,
      "",
      `${CONTACT.fields.description}:`,
      get("descricao"),
    ].join("\r\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="orc-nome">{CONTACT.fields.name}</label>
        <input
          id="orc-nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
        />
      </div>

      <div className="field">
        <label htmlFor="orc-tipo">{CONTACT.fields.type}</label>
        <select id="orc-tipo" name="tipo" required defaultValue={CONTACT.typeOptions[0]}>
          {CONTACT.typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="orc-orcamento">{CONTACT.fields.budget}</label>
        <select
          id="orc-orcamento"
          name="orcamento"
          required
          defaultValue={CONTACT.budgetOptions[CONTACT.budgetOptions.length - 1]}
        >
          {CONTACT.budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="orc-prazo">
          {CONTACT.fields.deadline}{" "}
          <span className="text-secondary">({CONTACT.fields.deadlineHint})</span>
        </label>
        <input id="orc-prazo" name="prazo" type="text" />
      </div>

      <div className="field">
        <label htmlFor="orc-descricao">{CONTACT.fields.description}</label>
        <textarea id="orc-descricao" name="descricao" required maxLength={800} />
      </div>

      <button type="submit" className="form-submit">
        {CONTACT.submit}
      </button>

      <p className="form-note type-nota text-secondary" aria-live="polite">
        {sent ? (
          <>
            {CONTACT.sentNote}{" "}
            <a href={`mailto:${SITE.email}`} className="text-link">
              {SITE.email}
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}
