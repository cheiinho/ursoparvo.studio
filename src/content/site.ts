export const SITE = {
  name: "Urso Parvo Studio",
  nameShort: "Urso Parvo",
  email: "olilei@proton.me",
  url: "https://ursoparvo.studio",
} as const;

export const TAGLINE = "Identidade à prova de tendências." as const;

export const BIO_SHORT = "Identidade visual corporativa. Coimbra." as const;

export const BIO =
  "9 anos em produto e identidade visual. BMW, Mercedes-Benz, Talkdesk." as const;

export const HERO = {
  ctaWork: { label: "Ver trabalho", href: "/work" },
  ctaContact: {
    label: "Contactar",
    href: `mailto:${SITE.email}`,
  },
} as const;

export const WORK_EMPTY = {
  lead: "Trabalho a chegar. Para começar um projecto, contacte",
} as const;

export const NAV = {
  work: "Trabalho",
  about: "Sobre",
  contact: "Contacto",
} as const;
