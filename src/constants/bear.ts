/** Header bear icon — keep cursor and nav in sync */
export const BEAR_ICON_PX = 36;
export const BEAR_ICON_PX_MD = 44;

/** Hand-drawn bear marks for positioning section */
export const BEAR_SCRIBBLES = [
  { src: "/assets/bears/bear-curious.svg", rotate: 5 },
  { src: "/assets/bears/bear-rough.svg", rotate: -7 },
  { src: "/assets/bears/bear-frazzled.svg", rotate: 8 },
  { src: "/assets/bears/bear-dizzy.svg", rotate: -5 },
] as const;

/** Moods for the site-wide companion bear (2D scribbles). */
export const BEAR_MOODS = {
  calm: "/assets/bears/bear-calm.svg",
  curious: "/assets/bears/bear-curious.svg",
  frazzled: "/assets/bears/bear-frazzled.svg",
  dizzy: "/assets/bears/bear-dizzy.svg",
} as const;

export type BearMood = keyof typeof BEAR_MOODS;

/** Self-aware "parvo" asides the companion mutters. Short and dry. */
export const BEAR_LINES = [
  "menos é mais.",
  "hmm.",
  "ainda a ler? boa.",
  "ei, devagar.",
  "isto aguenta 1965.",
  "sem gradientes.",
  "um parvo, mas teimoso.",
  "scroll com calma.",
] as const;
