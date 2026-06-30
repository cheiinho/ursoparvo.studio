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
  "João Pedro Leite dirige o Urso Parvo Studio em Coimbra. Nove anos em produto e comunicação visual. BMW, Mercedes-Benz, Talkdesk, Segurança Social. Design e fotografia feitos para durar." as const;

export const BIO_LONG = [
  "João Pedro Leite dirige o Urso Parvo Studio a partir de Coimbra. É designer de produto há nove anos. O percurso passou por ferramentas enterprise, serviços públicos e produto digital com utilizadores reais, formulários complexos e prazos apertados.",
  "Formou-se em design de comunicação no ISMT e completou o programa de UX/UI na EDIT, no Porto. Antes das grandes contas, passou cinco anos na Spotside, uma agência onde conduziu projectos de websites, aplicações móveis e realidade aumentada do brief à entrega, na maioria das vezes sozinho.",
  "Na Talkdesk desenhou funcionalidades entre as mais pedidas pelos clientes de contact centers. No BMW Group, através da Critical Techworks, conduziu research, design e testes de usabilidade para aplicações internas: reserva de postos de trabalho, cacifos e viaturas de empresa. Na Mercedes-Benz.io construiu componentes reutilizáveis para plataformas de conteúdo. Na Segurança Social reestruturou o serviço online do Fundo de Garantia Salarial, cortando passos que faziam desistir quem precisava do apoio.",
  "É fundador da Elo, plataforma de marcações para pequenos negócios em Portugal. Conduziu research, decisões de produto, design system e front-end até produção. O produto está no ar.",
  "No Urso Parvo Studio aplica o mesmo rigor à identidade visual, ao grafismo e à fotografia. Começa sempre pelo problema, não pela estética. O resultado é trabalho que funciona antes de ser bonito, e que é bonito porque funciona.",
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
    `${SITE.operator} dirige o ${SITE.name} em Coimbra. Nove anos em produto digital e comunicação visual. BMW, Mercedes-Benz, Talkdesk, Segurança Social.`,
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

export const ABOUT_CLIENTS = [
  "BMW Group",
  "Mercedes-Benz",
  "Talkdesk",
  "Segurança Social",
] as const;
