"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ContactDict } from "@/content/dict/types";
import {
  estimateBudget,
  formatEuro,
  type EstimateRange,
  type ServiceId,
} from "@/lib/estimate";

type ContactFormProps = {
  dict: ContactDict;
  email: string;
};

export default function ContactForm({ dict, email }: ContactFormProps) {
  const [estimate, setEstimate] = useState<EstimateRange | null>(null);
  const [servicesError, setServicesError] = useState(false);

  const serviceIds = dict.serviceOptions.map((option) => option.id);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const services = data
      .getAll("servicos")
      .map(String)
      .filter((value): value is ServiceId =>
        serviceIds.includes(value as ServiceId),
      );

    if (services.length === 0) {
      setServicesError(true);
      return;
    }
    setServicesError(false);

    const serviceLabels = dict.serviceOptions
      .filter((option) => services.includes(option.id))
      .map((option) => option.label);

    const range = estimateBudget(services);
    const rangeText = `${formatEuro(range.min, dict.estimate.locale)} - ${formatEuro(
      range.max,
      dict.estimate.locale,
    )}`;

    const subject = `${dict.subjectPrefix}: ${serviceLabels.join(", ")} (${get(
      "nome",
    )})`;
    const body = [
      `${dict.fields.name}: ${get("nome")}`,
      `${dict.fields.contact}: ${get("contacto")}`,
      `${dict.fields.services}: ${serviceLabels.join(", ")}`,
      `${dict.fields.deadline}: ${get("prazo")}`,
      ...(get("origem") ? [`${dict.fields.referral}: ${get("origem")}`] : []),
      `${dict.estimate.mailtoLabel}: ${rangeText}`,
      ...(get("descricao")
        ? ["", `${dict.fields.description}:`, get("descricao")]
        : []),
    ].join("\r\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setEstimate(range);
  }

  const estimateText = estimate
    ? dict.estimate.intro
        .replace("{min}", formatEuro(estimate.min, dict.estimate.locale))
        .replace("{max}", formatEuro(estimate.max, dict.estimate.locale))
    : null;

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
        <label htmlFor="orc-contacto">{dict.fields.contact}</label>
        <input
          id="orc-contacto"
          name="contacto"
          type="text"
          required
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div className="field">
        <fieldset aria-describedby={servicesError ? "orc-servicos-erro" : undefined}>
          <legend>{dict.fields.services}</legend>
          <div className="choice-list">
            {dict.serviceOptions.map((option) => (
              <label key={option.id}>
                <input type="checkbox" name="servicos" value={option.id} />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <p
          id="orc-servicos-erro"
          className="form-error type-nota"
          aria-live="polite"
        >
          {servicesError ? dict.servicesError : null}
        </p>
      </div>

      <div className="field">
        <label htmlFor="orc-descricao">
          {dict.fields.description}{" "}
          <span className="text-secondary">({dict.fields.descriptionHint})</span>
        </label>
        <textarea id="orc-descricao" name="descricao" maxLength={800} />
      </div>

      <div className="field">
        <label htmlFor="orc-prazo">{dict.fields.deadline}</label>
        <select
          id="orc-prazo"
          name="prazo"
          required
          defaultValue={dict.deadlineOptions[0]}
        >
          {dict.deadlineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="orc-origem">
          {dict.fields.referral}{" "}
          <span className="text-secondary">({dict.fields.referralHint})</span>
        </label>
        <select id="orc-origem" name="origem" defaultValue="">
          <option value="" />
          {dict.referralOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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

      <div className="form-result" aria-live="polite">
        {estimateText ? (
          <>
            <p className="type-corpo measure">{estimateText}</p>
            <p className="form-note type-nota text-secondary">
              {dict.sentNote}{" "}
              <a href={`mailto:${email}`} className="text-link">
                {email}
              </a>
            </p>
          </>
        ) : null}
      </div>
    </form>
  );
}
