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
  "Designer com nove anos de experiência em produto, identidade e comunicação visual. Trabalhou para BMW, Mercedes-Benz e Talkdesk. Hoje dirige o Urso Parvo Studio, em Coimbra, focado em identidade visual corporativa que não segue tendências." as const;

export const BIO_LONG = [
  "João Pedro Leite passou nove anos a desenhar para produto digital. Ferramentas internas do BMW Group, plataformas da Mercedes-Benz, sistemas de contact centre na Talkdesk, serviços públicos da Segurança Social. Projectos com utilizadores reais, onde o detalhe importava e o erro tinha custo.",
  "Essa experiência mudou a forma como aborda qualquer decisão visual. Aprendeu a reconhecer a diferença entre o que parece bem numa apresentação e o que aguenta quando é usado de verdade.",
  "O Urso Parvo Studio nasce dessa maturidade aplicada a identidade visual corporativa. Para empresas e instituições que querem uma marca com presença, não uma marca a seguir a tendência do momento.",
] as const;

export const HERO = {
  tagline: TAGLINE,
  signature: "Identidade visual corporativa. Coimbra.",
  ctaWork: { label: "Ver trabalho", href: "/work" },
  ctaContact: {
    label: "Falar do projecto",
    href: `mailto:${SITE.email}`,
  },
} as const;

export const POSITIONING_BODY = [
  "João Pedro Leite passou nove anos a desenhar para produto digital, em projectos onde o erro tinha custo real e o utilizador era sempre alguém concreto.",
  "Essa experiência ensinou a distinguir entre o que parece bem numa apresentação e o que aguenta quando é usado de verdade.",
] as const;

export const SERVICE_PRIMARY = {
  title: "Identidade visual corporativa",
  description:
    "Logótipo, sistema cromático, tipografia, aplicações base. Uma identidade que aguenta o tempo porque a decisão por trás dela não dependeu de moda.",
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
  body: "Conte o contexto. Resposta em até 48 horas.",
  ctaLabel: SITE.email,
  mailto: `mailto:${SITE.email}`,
} as const;

export const WORK_EMPTY = {
  body: "Referências seleccionadas em preparação.",
  contact: "Para discutir um projecto ou pedir referências, escreva-nos.",
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
