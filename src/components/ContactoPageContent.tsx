"use client";

import { useState } from "react";
import Button from "@/components/Button";
import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import { CONTACTO, SITE } from "@/content/site";
import { UI } from "@/content/ui";

type ServiceKey = "identity" | "grafismo" | "fotografia";

type FormState = {
  nome: string;
  contacto: string;
  servicos: ServiceKey[];
  multiplo: boolean;
  descricao: string;
  prazo: string;
  como: string;
};

const BILLABLE_KEYS: ServiceKey[] = ["identity", "grafismo", "fotografia"];

function computeEstimate(selected: ServiceKey[]): { min: number; max: number } | null {
  const billable = CONTACTO.services.filter(
    (s) => s.key !== "multiple" && selected.includes(s.key as ServiceKey),
  );
  if (billable.length === 0) return null;

  let min = billable.reduce((acc, s) => acc + s.min, 0);
  let max = billable.reduce((acc, s) => acc + s.max, 0);

  if (billable.length > 1) {
    min = Math.round((min * 0.85) / 100) * 100;
    max = Math.round((max * 0.85) / 100) * 100;
  }

  if (max - min < 500) max = min + 500;

  return { min, max };
}

function formatEur(n: number): string {
  return `€${n.toLocaleString("pt-PT")}`;
}

function buildMailto(form: FormState, estimate: { min: number; max: number } | null): string {
  const servicoLabels = [
    ...form.servicos.map((key) => {
      const found = CONTACTO.services.find((s) => s.key === key);
      return found ? found.label : key;
    }),
    ...(form.multiplo ? ["Mais do que um serviço"] : []),
  ];

  const prazoLabel =
    CONTACTO.prazos.find((p) => p.value === form.prazo)?.label ?? form.prazo;
  const comoLabel =
    CONTACTO.como.find((c) => c.value === form.como)?.label ?? form.como;

  const subject = encodeURIComponent(`${UI.contacto.subjectPrefix}: ${form.nome}`);
  const lines = [
    `Nome: ${form.nome}`,
    `Contacto: ${form.contacto}`,
    `Serviços: ${servicoLabels.join(", ") || "—"}`,
    `Prazo: ${prazoLabel || "—"}`,
    `Como conheceu: ${comoLabel || "—"}`,
    ``,
    `Descrição:`,
    form.descricao || "(sem descrição)",
    ``,
    estimate
      ? `Estimativa calculada: ${formatEur(estimate.min)}–${formatEur(estimate.max)}`
      : "Estimativa: N/A",
  ];
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

export default function ContactoPageContent() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    contacto: "",
    servicos: [],
    multiplo: false,
    descricao: "",
    prazo: "",
    como: "",
  });

  const estimate = computeEstimate(form.servicos);

  function toggleServico(key: ServiceKey) {
    setForm((prev) => ({
      ...prev,
      servicos: prev.servicos.includes(key)
        ? prev.servicos.filter((k) => k !== key)
        : [...prev.servicos, key],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = buildMailto(form, estimate);
  }

  return (
    <PublicShell>
      <div className="site-container contacto-shell">
        <Reveal>
          <h1 className="type-display contacto-heading">{UI.contacto.pageTitle}</h1>
        </Reveal>

        <form onSubmit={handleSubmit} className="contacto-form" noValidate>
          {/* Nome */}
          <div className="form-field">
            <label htmlFor="nome" className="form-label">
              Nome *
            </label>
            <input
              id="nome"
              type="text"
              required
              className="form-input"
              value={form.nome}
              onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
              autoComplete="name"
            />
          </div>

          {/* Email ou telefone */}
          <div className="form-field">
            <label htmlFor="contacto" className="form-label">
              {UI.contacto.emailLabel} *
            </label>
            <input
              id="contacto"
              type="text"
              required
              className="form-input"
              value={form.contacto}
              onChange={(e) => setForm((prev) => ({ ...prev, contacto: e.target.value }))}
              autoComplete="email"
            />
          </div>

          {/* Serviços */}
          <div className="form-field">
            <p className="form-label" id="servicos-label">
              {UI.contacto.servicesLabel}
            </p>
            <div className="form-checkbox-group" role="group" aria-labelledby="servicos-label">
              {CONTACTO.services.map((service) => {
                const isMultiple = service.key === "multiple";
                const checked = isMultiple
                  ? form.multiplo
                  : form.servicos.includes(service.key as ServiceKey);
                return (
                  <label key={service.key} className="form-checkbox-item">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (isMultiple) {
                          setForm((prev) => ({ ...prev, multiplo: !prev.multiplo }));
                        } else {
                          toggleServico(service.key as ServiceKey);
                        }
                      }}
                    />
                    <span className="type-corpo">{service.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Descrição */}
          <div className="form-field">
            <label htmlFor="descricao" className="form-label">
              {UI.contacto.descLabel}
            </label>
            <textarea
              id="descricao"
              className="form-textarea"
              placeholder={UI.contacto.descPlaceholder}
              value={form.descricao}
              onChange={(e) => setForm((prev) => ({ ...prev, descricao: e.target.value }))}
            />
          </div>

          {/* Prazo */}
          <div className="form-field">
            <label htmlFor="prazo" className="form-label">
              {UI.contacto.prazLabel}
            </label>
            <select
              id="prazo"
              className="form-select"
              value={form.prazo}
              onChange={(e) => setForm((prev) => ({ ...prev, prazo: e.target.value }))}
            >
              <option value="">—</option>
              {CONTACTO.prazos.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Como conheceu */}
          <div className="form-field">
            <label htmlFor="como" className="form-label">
              {UI.contacto.comoLabel}
            </label>
            <select
              id="como"
              className="form-select"
              value={form.como}
              onChange={(e) => setForm((prev) => ({ ...prev, como: e.target.value }))}
            >
              <option value="">{UI.contacto.comoPlaceholder}</option>
              {CONTACTO.como.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Prazo de entrega */}
          <p className="type-nota text-secondary">{CONTACTO.deliveryNote}</p>

          <div>
            <Button type="submit" variant="primary">
              {UI.contacto.submitLabel}
            </Button>
          </div>
        </form>

        {/* Estimador em tempo real */}
        {estimate && (
          <Reveal>
            <div className="estimator-card">
              <p className="type-nota text-secondary estimator-label">
                {UI.contacto.estimatorHeading}
              </p>
              <p className="estimator-range">
                {formatEur(estimate.min)}–{formatEur(estimate.max)}
              </p>
              <p className="type-corpo text-secondary estimator-note">
                {CONTACTO.estimatorIntro}{" "}
                <strong>
                  {formatEur(estimate.min)}–{formatEur(estimate.max)}
                </strong>
                {CONTACTO.estimatorOutro}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </PublicShell>
  );
}
