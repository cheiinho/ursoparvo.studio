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
  "Identidade visual, grafismo e fotografia — sem atalhos." as const;

export const BIO_SHORT =
  "Designer com nove anos de experiência em produto, identidade e comunicação visual. Trabalhei para BMW, Mercedes-Benz e Talkdesk. Hoje dirijo o Urso Parvo Studio, em Coimbra — design e fotografia para quem quer trabalho com duração." as const;

export const BIO_LONG = [
  "Comecei em design de comunicação e passei os últimos nove anos a trabalhar em produto digital — ferramentas internas do BMW Group, plataformas da Mercedes-Benz, sistemas de contact centre na Talkdesk, serviços públicos da Segurança Social. Projectos grandes, com utilizadores reais, onde o detalhe importa.",
  "Esse percurso mudou a forma como abordo qualquer trabalho visual: começo pelo problema, não pela estética. O resultado é trabalho que funciona antes de ser bonito — e que é bonito porque funciona.",
  "O Urso Parvo Studio é onde junto tudo: identidade visual, grafismo, fotografia. Para empresas, instituições e pessoas que querem comunicação que não envelhece.",
] as const;

export const HERO = {
  tagline: TAGLINE,
  subtitle: [
    "Identidade visual, grafismo e fotografia.",
    `${SITE.name} — Coimbra.`,
  ],
  ctaPrimary: { label: "Ver trabalho", href: "/work" },
  ctaSecondary: {
    label: "Falar sobre um projecto",
    href: `mailto:${SITE.email}`,
  },
} as const;

export const SERVICES = [
  {
    title: "Identidade Visual",
    description:
      "Logótipo, sistema cromático, tipografia, guidelines. Uma marca que sobrevive a modas e funciona em qualquer suporte.",
  },
  {
    title: "Grafismo e Comunicação",
    description:
      "Cartazes, publicações, materiais de evento, redes sociais. Peças que comunicam antes de serem lidas.",
  },
  {
    title: "Fotografia",
    description:
      "Cobertura de eventos, retrato, produto. Imagens feitas para durar, não para o story de amanhã.",
  },
] as const;

export const ABOUT_HOME = {
  title: "O estúdio",
  paragraphs: [
    `O ${SITE.name} é dirigido por ${SITE.operator} — designer com nove anos de experiência em produto digital e comunicação visual. BMW, Mercedes-Benz, Talkdesk, Segurança Social.`,
    "Esse percurso deixou uma marca: trabalhamos a partir do problema, não da tendência. O resultado é trabalho que funciona hoje e não precisa de ser refeito daqui a três anos.",
  ],
} as const;

export const PROCESS = {
  title: "Como trabalhamos",
  intro:
    "Cada projecto começa com uma conversa. Percebemos o contexto, definimos o âmbito, acordamos um prazo. Só depois começamos a produzir.",
  body: "O processo é simples: descoberta, proposta, produção, revisão, entrega. Sem surpresas, sem ruído. Tudo documentado por escrito.",
  phases: [
    "Descoberta",
    "Proposta",
    "Produção",
    "Revisão",
    "Entrega",
  ] as const,
} as const;

export const CONTACT = {
  title: "Tem um projecto?",
  body: "Conte-nos o contexto — o que precisa, para quando, e que tipo de trabalho é. Respondemos em 48 horas.",
  ctaLabel: `${SITE.email} · ${SITE.domain}`,
  mailto: `mailto:${SITE.email}`,
} as const;

export const NAV = {
  work: "Trabalho",
  about: "Sobre",
  contact: "Contacto",
} as const;
