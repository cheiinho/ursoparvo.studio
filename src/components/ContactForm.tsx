"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ContactDict } from "@/content/dict/types";

type ContactFormProps = {
  dict: ContactDict;
  email: string;
};

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

type Message = { subject: string; body: string };

export default function ContactForm({ dict, email }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<Message | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const nome = get("nome");
    const contacto = get("email");
    const about = get("about");
    const change = get("change");
    const timing = get("timing");

    setCopied(false);

    const subject = `${dict.subjectPrefix}: ${nome}`;
    const body = [
      `${dict.fields.name}: ${nome}`,
      `${dict.fields.email}: ${contacto}`,
      "",
      `${dict.fields.about}:`,
      about,
      ...(change ? ["", `${dict.fields.change}:`, change] : []),
      ...(timing ? ["", `${dict.fields.timing}:`, timing] : []),
    ].join("\r\n");

    setMessage({ subject, body });
    setStatus("sending");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email: contacto,
          about,
          change,
          timing,
          website: get("website"),
        }),
      });

      if (response.ok) {
        setStatus("sent");
        return;
      }

      if (response.status === 503) {
        window.location.href = mailtoHref(email, subject, body);
        setStatus("mailto");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  async function copyMessage() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(
        `${message.subject}\n\n${message.body.replaceAll("\r\n", "\n")}`,
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const emailLink = (
    <a href={`mailto:${email}`} className="text-link">
      {email}
    </a>
  );

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="orc-about">{dict.fields.about}</label>
        <textarea
          id="orc-about"
          name="about"
          required
          maxLength={2000}
          rows={5}
        />
      </div>

      <div className="field">
        <label htmlFor="orc-change">{dict.fields.change}</label>
        <textarea id="orc-change" name="change" maxLength={2000} rows={4} />
      </div>

      <div className="field">
        <label htmlFor="orc-timing">{dict.fields.timing}</label>
        <input id="orc-timing" name="timing" type="text" maxLength={200} />
      </div>

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
        <label htmlFor="orc-email">{dict.fields.email}</label>
        <input
          id="orc-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div className="hp-field" aria-hidden="true">
        <label htmlFor="orc-website">Website</label>
        <input
          id="orc-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <motion.button
        type="submit"
        className="form-submit"
        disabled={status === "sending"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {status === "sending" ? dict.sending : dict.submit}
      </motion.button>

      <div className="form-result" aria-live="polite">
        {status === "sent" ? (
          <p className="form-note type-nota type-italic text-secondary">
            {dict.sentConfirmation}
          </p>
        ) : null}

        {status === "mailto" ? (
          <p className="form-note type-nota text-secondary">
            {dict.sentNote} {emailLink}
            {" · "}
            <button
              type="button"
              className="form-inline-action"
              onClick={copyMessage}
            >
              {copied ? dict.copied : dict.copy}
            </button>
          </p>
        ) : null}

        {status === "error" && message ? (
          <p className="form-note type-nota text-secondary">
            {dict.sendError}{" "}
            <a
              href={mailtoHref(email, message.subject, message.body)}
              className="text-link"
            >
              {dict.openEmail}
            </a>
            {" · "}
            <button
              type="button"
              className="form-inline-action"
              onClick={copyMessage}
            >
              {copied ? dict.copied : dict.copy}
            </button>
            {" · "}
            {emailLink}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function mailtoHref(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
