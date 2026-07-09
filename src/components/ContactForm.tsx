"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ContactDict } from "@/content/dict/types";

type ContactFormProps = {
  dict: ContactDict;
  email: string;
};

export default function ContactForm({ dict, email }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `${dict.subjectPrefix}: ${get("tipo")} (${get("nome")})`;
    const body = [
      `${dict.fields.name}: ${get("nome")}`,
      `${dict.fields.type}: ${get("tipo")}`,
      `${dict.fields.budget}: ${get("orcamento")}`,
      `${dict.fields.deadline}: ${get("prazo") || dict.emptyDeadline}`,
      "",
      `${dict.fields.description}:`,
      get("descricao"),
    ].join("\r\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="orc-nome">{dict.fields.name}</label>
        <input
          id="orc-nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
        />
      </div>

      <div className="field">
        <label htmlFor="orc-tipo">{dict.fields.type}</label>
        <select id="orc-tipo" name="tipo" required defaultValue={dict.typeOptions[0]}>
          {dict.typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="orc-orcamento">{dict.fields.budget}</label>
        <select
          id="orc-orcamento"
          name="orcamento"
          required
          defaultValue={dict.budgetOptions[dict.budgetOptions.length - 1]}
        >
          {dict.budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="orc-prazo">
          {dict.fields.deadline}{" "}
          <span className="text-secondary">({dict.fields.deadlineHint})</span>
        </label>
        <input id="orc-prazo" name="prazo" type="text" />
      </div>

      <div className="field">
        <label htmlFor="orc-descricao">{dict.fields.description}</label>
        <textarea id="orc-descricao" name="descricao" required maxLength={800} />
      </div>

      <motion.button
        type="submit"
        className="form-submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {dict.submit}
      </motion.button>

      <p className="form-note type-nota text-secondary" aria-live="polite">
        {sent ? (
          <>
            {dict.sentNote}{" "}
            <a href={`mailto:${email}`} className="text-link">
              {email}
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}
