export const SITE = {
  name: "Urso Parvo Studio",
  nameShort: "Urso Parvo",
  operator: "João Pedro Leite",
  location: "Coimbra, Portugal",
  domain: "ursoparvo.studio",
  email: "olilei@proton.me",
  url: "https://ursoparvo.studio",
} as const;

export const TAGLINE = "Identidade à prova de tendências." as const;

export const BIO_SHORT =
  "Designer com 9 anos em produto, identidade e comunicação visual. BMW, Mercedes-Benz, Talkdesk. Dirige o Urso Parvo Studio, em Coimbra: identidade visual corporativa." as const;

export const BIO_LONG = [
  "João Pedro Leite passou 9 anos a desenhar para produto digital: ferramentas internas do BMW Group, plataformas da Mercedes-Benz, sistemas de contact centre na Talkdesk, serviços públicos da Segurança Social. Projectos com utilizadores reais, onde o detalhe importava e o erro tinha custo.",
  "Isso mudou a forma como aborda qualquer decisão visual. Aprendeu a separar o que parece bem numa apresentação do que aguenta em uso real.",
  "O Urso Parvo Studio nasce dessa maturidade aplicada a identidade visual corporativa. Para empresas e instituições que querem uma marca com presença, não uma marca a seguir a tendência do momento.",
] as const;

export const HERO = {
  tagline: TAGLINE,
  signature: "Identidade visual corporativa. Coimbra.",
  ctaWork: { label: "Ver trabalho", href: "/work" },
  ctaContact: {
    label: "Contactar",
    href: `mailto:${SITE.email}`,
  },
} as const;

export const POSITIONING_BODY = [
  "João Pedro Leite passou 9 anos a desenhar para produto digital, em projectos onde o erro tinha custo real e o utilizador era sempre alguém concreto.",
  "Isso ensinou a separar o que parece bem numa apresentação do que aguenta em uso real.",
] as const;

export const SERVICE_PRIMARY = {
  title: "Identidade visual corporativa",
  description:
    "Logótipo, sistema cromático, tipografia, aplicações base. Uma identidade que aguenta porque a decisão por trás dela não dependeu de moda.",
} as const;

export const SERVICES_SECONDARY = [
  {
    title: "Grafismo",
    description:
      "Cartazes, publicações, materiais de evento, redes sociais.",
  },
  {
    title: "Fotografia",
    description: "Eventos, retrato, produto.",
  },
] as const;

export const CONTACT = {
  title: "Tem um projecto?",
  body: "Conte o contexto. Respondo em 2 dias úteis.",
  ctaLabel: SITE.email,
  mailto: `mailto:${SITE.email}`,
} as const;

export const WORK_EMPTY = {
  lead: "Trabalho a chegar. Para começar um projecto, contacte",
} as const;

export const NAV = {
  work: "Trabalho",
  about: "Sobre",
  contact: "Contacto",
} as const;

export const ABOUT_CLIENTS = [
  "BMW",
  "Mercedes-Benz",
  "Talkdesk",
  "Segurança Social",
] as const;

export const ABOUT_CLIENTS_LINE = ABOUT_CLIENTS.join(", ");
