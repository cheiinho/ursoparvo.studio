/**
 * Generative editorial posters for each project.
 *
 * The studio's real work isn't published here, so instead of relying on
 * fragile external image URLs we render distinct, on-brand poster
 * compositions as inline SVG data URIs. They always load, look intentional,
 * and stay cohesive with the brand palette (yellow #f5e642, blue #5757ff, ink).
 *
 * Each composition is keyed to the project so the gallery reads like a
 * portfolio rather than a row of placeholders.
 */

const W = 1600;
const H = 1000;

const INK = "#1a1a1a";
const YELLOW = "#f5e642";
const BLUE = "#5757ff";

type PosterTheme = {
  base: string;
  ink: string;
  accent: string;
};

const THEMES: Record<string, PosterTheme> = {
  nordhaven: { base: "#ede0d8", ink: INK, accent: "#c8623d" },
  forma: { base: "#dce8dc", ink: INK, accent: BLUE },
  arcadia: { base: "#dce0e8", ink: INK, accent: BLUE },
  meridian: { base: "#ebe4cc", ink: INK, accent: "#1a1a1a" },
  clayworks: { base: "#e8ddd6", ink: INK, accent: "#b5572f" },
  mossline: { base: "#d6e2d2", ink: INK, accent: "#4a6b4a" },
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Inter, system-ui, sans-serif";

/** Editorial label: name bottom-left, year top-right, hairline frame. */
function chrome(name: string, year: string, t: PosterTheme) {
  return `
    <g font-family="${SANS}" fill="${t.ink}">
      <text x="80" y="120" font-size="26" letter-spacing="6" opacity="0.55">URSOPARVO STUDIO</text>
      <text x="${W - 80}" y="120" font-size="26" letter-spacing="6" text-anchor="end" opacity="0.55">${year}</text>
    </g>
    <text x="80" y="${H - 80}" font-family="${SERIF}" font-size="120" fill="${t.ink}">${name}</text>
  `;
}

function nordhaven(t: PosterTheme, name: string, year: string) {
  return `
    <rect width="${W}" height="${H}" fill="${t.base}"/>
    <rect y="${H * 0.62}" width="${W}" height="${H * 0.38}" fill="${t.accent}" opacity="0.85"/>
    <circle cx="${W * 0.7}" cy="${H * 0.6}" r="120" fill="${YELLOW}"/>
    <line x1="0" y1="${H * 0.62}" x2="${W}" y2="${H * 0.62}" stroke="${t.ink}" stroke-width="3"/>
    ${chrome(name, year, t)}
  `;
}

function forma(t: PosterTheme, name: string, year: string) {
  return `
    <rect width="${W}" height="${H}" fill="${t.base}"/>
    <g stroke="${t.ink}" stroke-width="2" opacity="0.18">
      <line x1="0" y1="${H * 0.34}" x2="${W}" y2="${H * 0.34}"/>
      <line x1="0" y1="${H * 0.62}" x2="${W}" y2="${H * 0.62}"/>
      <line x1="${W * 0.5}" y1="0" x2="${W * 0.5}" y2="${H}"/>
    </g>
    <text x="${W * 0.5}" y="${H * 0.66}" font-family="${SERIF}" font-size="560" fill="${t.ink}" text-anchor="middle">F</text>
    <rect x="${W * 0.5 - 30}" y="${H * 0.34 - 30}" width="60" height="60" fill="${t.accent}"/>
    <circle cx="${W * 0.78}" cy="${H * 0.3}" r="42" fill="${YELLOW}"/>
    ${chrome(name, year, t)}
  `;
}

function arcadia(t: PosterTheme, name: string, year: string) {
  return `
    <rect width="${W}" height="${H}" fill="${t.base}"/>
    <g>
      <rect x="${W * 0.5}" y="${H * 0.18}" width="${W * 0.36}" height="${H * 0.5}" rx="24" fill="#ffffff" opacity="0.7"/>
      <rect x="${W * 0.5 + 36}" y="${H * 0.18 + 40}" width="${W * 0.22}" height="22" rx="11" fill="${t.ink}" opacity="0.25"/>
      <rect x="${W * 0.5 + 36}" y="${H * 0.18 + 90}" width="${W * 0.28}" height="22" rx="11" fill="${t.ink}" opacity="0.15"/>
      <rect x="${W * 0.5 + 36}" y="${H * 0.5 + 10}" width="160" height="56" rx="28" fill="${t.accent}"/>
      <rect x="${W * 0.16}" y="${H * 0.32}" width="${W * 0.26}" height="${H * 0.42}" rx="20" fill="${YELLOW}"/>
    </g>
    ${chrome(name, year, t)}
  `;
}

function meridian(t: PosterTheme, name: string, year: string) {
  return `
    <rect width="${W}" height="${H}" fill="${t.base}"/>
    <circle cx="${W * 0.5}" cy="${H * 0.44}" r="220" fill="none" stroke="${t.ink}" stroke-width="3"/>
    <line x1="${W * 0.5}" y1="${H * 0.1}" x2="${W * 0.5}" y2="${H * 0.78}" stroke="${t.ink}" stroke-width="3"/>
    <ellipse cx="${W * 0.5}" cy="${H * 0.44}" rx="90" ry="220" fill="none" stroke="${t.ink}" stroke-width="2" opacity="0.5"/>
    <circle cx="${W * 0.5}" cy="${H * 0.44}" r="26" fill="${YELLOW}"/>
    ${chrome(name, year, t)}
  `;
}

function clayworks(t: PosterTheme, name: string, year: string) {
  return `
    <rect width="${W}" height="${H}" fill="${t.base}"/>
    <path d="M ${W * 0.5 - 150} ${H * 0.26}
             q 150 -70 300 0
             q 70 60 40 220
             q -30 160 -190 160
             q -160 0 -190 -160
             q -30 -160 40 -220 z"
          fill="${t.accent}" opacity="0.9"/>
    <rect x="${W * 0.5 - 150}" y="${H * 0.26}" width="300" height="6" fill="${t.ink}"/>
    <g fill="${YELLOW}">
      <circle cx="${W * 0.5}" cy="${H * 0.5}" r="14"/>
      <circle cx="${W * 0.5 - 50}" cy="${H * 0.58}" r="9"/>
      <circle cx="${W * 0.5 + 50}" cy="${H * 0.58}" r="9"/>
    </g>
    ${chrome(name, year, t)}
  `;
}

function mossline(t: PosterTheme, name: string, year: string) {
  return `
    <rect width="${W}" height="${H}" fill="${t.base}"/>
    <line x1="80" y1="${H * 0.2}" x2="${W - 80}" y2="${H * 0.2}" stroke="${t.ink}" stroke-width="4"/>
    <g stroke="${t.ink}" stroke-width="1.5" opacity="0.22">
      <line x1="${W * 0.34}" y1="${H * 0.2}" x2="${W * 0.34}" y2="${H * 0.78}"/>
      <line x1="${W * 0.5}" y1="${H * 0.2}" x2="${W * 0.5}" y2="${H * 0.78}"/>
      <line x1="${W * 0.66}" y1="${H * 0.2}" x2="${W * 0.66}" y2="${H * 0.78}"/>
    </g>
    <text x="80" y="${H * 0.52}" font-family="${SERIF}" font-size="300" fill="${t.accent}">04</text>
    <rect x="${W * 0.66}" y="${H * 0.28}" width="${W * 0.18}" height="${H * 0.18}" fill="${YELLOW}"/>
    ${chrome(name, year, t)}
  `;
}

const COMPOSERS: Record<
  string,
  (t: PosterTheme, name: string, year: string) => string
> = {
  nordhaven,
  forma,
  arcadia,
  meridian,
  clayworks,
  mossline,
};

/** Returns an inline SVG data URI poster for a project. */
export function projectPoster(
  id: string,
  name: string,
  year: string,
  fallbackColor = "#e8e4dc",
): string {
  const theme = THEMES[id] ?? { base: fallbackColor, ink: INK, accent: BLUE };
  const compose = COMPOSERS[id];
  const inner = compose
    ? compose(theme, name, year)
    : `<rect width="${W}" height="${H}" fill="${theme.base}"/>${chrome(name, year, theme)}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ---- Application-image placeholders (varied per index) ----
   Used in case studies until real project photography is supplied. Distinct
   from the cover poster so the "Applications" grid doesn't repeat the cover. */

function appSpread(t: PosterTheme) {
  return `
    <rect width="${W}" height="${H}" fill="${t.base}"/>
    <rect x="${W * 0.08}" y="${H * 0.12}" width="${W * 0.84}" height="${H * 0.76}" fill="#fbfaf7"/>
    <rect x="${W * 0.08}" y="${H * 0.12}" width="${W * 0.4}" height="${H * 0.76}" fill="${t.accent}" opacity="0.9"/>
    <circle cx="${W * 0.28}" cy="${H * 0.5}" r="96" fill="${YELLOW}"/>
    <g fill="${t.ink}" opacity="0.18">
      <rect x="${W * 0.54}" y="${H * 0.3}" width="${W * 0.3}" height="14"/>
      <rect x="${W * 0.54}" y="${H * 0.38}" width="${W * 0.34}" height="14"/>
      <rect x="${W * 0.54}" y="${H * 0.46}" width="${W * 0.22}" height="14"/>
    </g>`;
}

function appLockup(t: PosterTheme) {
  return `
    <rect width="${W}" height="${H}" fill="${t.accent}"/>
    <circle cx="${W * 0.5}" cy="${H * 0.46}" r="190" fill="none" stroke="${t.base}" stroke-width="4"/>
    <circle cx="${W * 0.5}" cy="${H * 0.46}" r="30" fill="${YELLOW}"/>
    <rect x="${W * 0.5 - 130}" y="${H * 0.78}" width="260" height="12" fill="${t.base}" opacity="0.7"/>`;
}

function appSwatches(t: PosterTheme) {
  const chips = [t.accent, YELLOW, t.ink, "#ffffff"];
  const cw = (W * 0.8) / chips.length;
  const cells = chips
    .map(
      (c, i) =>
        `<rect x="${W * 0.1 + i * cw}" y="${H * 0.2}" width="${cw - 24}" height="${H * 0.6}" fill="${c}" stroke="${t.ink}" stroke-opacity="0.08"/>`,
    )
    .join("");
  return `<rect width="${W}" height="${H}" fill="${t.base}"/>${cells}`;
}

function appSignage(t: PosterTheme, name: string) {
  return `
    <rect width="${W}" height="${H}" fill="${t.base}"/>
    <rect x="${W * 0.12}" y="${H * 0.14}" width="${W * 0.76}" height="${H * 0.72}" fill="${t.ink}"/>
    <text x="${W * 0.5}" y="${H * 0.66}" font-family="${SERIF}" font-size="420" fill="${t.base}" text-anchor="middle">${name.charAt(0)}</text>
    <circle cx="${W * 0.8}" cy="${H * 0.28}" r="40" fill="${YELLOW}"/>`;
}

const APP_COMPOSERS = [appSpread, appLockup, appSwatches, appSignage];

/** A varied, on-brand placeholder for a case-study application image. */
export function projectApplicationImage(
  id: string,
  name: string,
  index: number,
): string {
  const theme = THEMES[id] ?? { base: "#e8e4dc", ink: INK, accent: BLUE };
  const compose = APP_COMPOSERS[index % APP_COMPOSERS.length];
  const inner = compose(theme, name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** True when a stored image path points at a real local asset (not a placeholder URL). */
export function isRealImage(src: string): boolean {
  return !!src && !/^https?:\/\//i.test(src) && !src.startsWith("data:");
}
