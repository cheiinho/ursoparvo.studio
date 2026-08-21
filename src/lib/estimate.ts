/**
 * Legacy public service ranges used by the original contact form.
 * Preserved as-is. The project discovery engine does not overwrite these values;
 * see `src/lib/project-discovery/pricing-config.ts`.
 */
export type ServiceId = "identidade" | "grafismo" | "fotografia";

export type EstimateRange = { min: number; max: number };

const BASE: Record<ServiceId, EstimateRange> = {
  identidade: { min: 1800, max: 3000 },
  grafismo: { min: 400, max: 900 },
  fotografia: { min: 300, max: 700 },
};

const COHERENCE_DISCOUNT = 0.85;
const MIN_SPREAD = 500;

export function estimateBudget(services: readonly ServiceId[]): EstimateRange {
  const sum = services.reduce(
    (acc, id) => ({ min: acc.min + BASE[id].min, max: acc.max + BASE[id].max }),
    { min: 0, max: 0 },
  );

  const factor = services.length > 1 ? COHERENCE_DISCOUNT : 1;
  const min = Math.floor((sum.min * factor) / 100) * 100;
  let max = Math.ceil((sum.max * factor) / 100) * 100;
  if (max - min < MIN_SPREAD) {
    max = min + MIN_SPREAD;
  }

  return { min, max };
}

export function formatEuro(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
