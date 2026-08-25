import localFont from "next/font/local";

/**
 * Nudica — sole brand typeface for Urso Parvo Studio.
 *
 * Available cuts (local files only; do not substitute):
 * - Regular 400
 * - Regular Italic 400
 * - Medium 500
 * - Bold 700
 *
 * Personality comes from weight, scale, width, italic, spacing, and rhythm —
 * not from a second family.
 */
export const nudica = localFont({
  src: [
    {
      path: "../../public/fonts/nudica/nudica-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/nudica/nudica-regularitalic-webfont.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/nudica/nudica-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/nudica/nudica-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-brand",
  display: "swap",
});

/** Semantic weights matching loaded files. */
export const typeWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;
