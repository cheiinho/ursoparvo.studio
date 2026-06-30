export const SITE = {
  name: "Urso Parvo Studio",
  nameShort: "Urso Parvo",
  operator: "João Pedro Leite",
  location: "Coimbra, Portugal",
  domain: "ursoparvo.studio",
  email: "olilei@proton.me",
  url: "https://ursoparvo.studio",
} as const;

export const TAGLINE = "Design que não envelhece." as const;

export const TAGLINE_EXPANDED =
  "Identidade visual, grafismo e fotografia. Sem atalhos." as const;

export const BIO_SHORT =
  "Nove anos entre produto, identidade e comunicação visual. Passei por BMW, Mercedes-Benz e Talkdesk. Hoje tenho o estúdio em Coimbra. Faço design e fotografia para quem quer trabalho que dura." as const;

export const BIO_LONG = [
  "Comecei em comunicação visual e fui parar ao produto digital. Nove anos em ferramentas para o BMW Group, plataformas da Mercedes-Benz, sistemas na Talkdesk, serviços públicos na Segurança Social. Projectos grandes, gente real, pormenores que importam.",
  "Isso mudou como vejo qualquer trabalho visual. Começo pelo problema, não pelo look. O resultado funciona antes de ser bonito. E é bonito porque funciona.",
  "No Urso Parvo Studio junto identidade, grafismo e fotografia. Para empresas, instituições e pessoas que querem comunicação que não envelhece.",
] as const;

export const HERO = {
  tagline: TAGLINE,
  subtitle: [
    "Identidade visual, grafismo e fotografia.",
    `${SITE.name}, Coimbra.`,
  ],
  ctaPrimary: { label: "Ver trabalho", href: "/work" },
  ctaSecondary: {
    label: "Falar sobre um projecto",
    href: `mailto:${SITE.email}`,
  },
} as const;

export const SERVICES = [
  {
    title: "Identidade visual",
    description:
      "Logótipo, cor, tipografia, guidelines. Uma marca que aguenta modas e funciona em qualquer sítio.",
  },
  {
    title: "Grafismo",
    description:
      "Cartazes, publicações, eventos, redes. Peças que se percebem antes de serem lidas.",
  },
  {
    title: "Fotografia",
    description:
      "Eventos, retrato, produto. Imagens para ficar, não para o story de amanhã.",
  },
] as const;

export const ABOUT_HOME = {
  title: "O estúdio",
  paragraphs: [
    `O ${SITE.name} é o ${SITE.operator}. Coimbra. Nove anos em produto digital e comunicação visual. BMW, Mercedes-Benz, Talkdesk, Segurança Social.`,
    "Trabalhamos a partir do problema, não da tendência. Queremos trabalho que funciona hoje e não precisa de ser refeito daqui a três anos.",
  ],
} as const;

export const PROCESS = {
  title: "Como trabalhamos",
  intro:
    "Cada projecto começa com uma conversa. Percebemos o contexto, definimos o âmbito, acordamos um prazo. Só depois é que produzimos.",
  body: "Descoberta, proposta, produção, revisão, entrega. Sem surpresas. Tudo por escrito.",
  phases: [
    "descoberta",
    "proposta",
    "produção",
    "revisão",
    "entrega",
  ] as const,
} as const;

export const CONTACT = {
  title: "Tens um projecto?",
  body: "Diz-nos o que precisas, para quando, e que tipo de trabalho é. Respondemos em 48 horas.",
  ctaLabel: `${SITE.email} · ${SITE.domain}`,
  mailto: `mailto:${SITE.email}`,
} as const;

export const NAV = {
  work: "Trabalho",
  about: "Sobre",
  contact: "Contacto",
} as const;

export const POSITIONING_BODY =
  "Minimal, intemporal, à prova de tendências. Vim do produto digital, onde errar custa caro e o utilizador é real. Isso marca tudo o que fazemos. Não é estética por estética. É decisão visual com motivo." as const;
