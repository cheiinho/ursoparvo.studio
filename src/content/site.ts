export const SITE = {
  name: "Urso Parvo Studio",
  nameShort: "Urso Parvo",
  operator: "João Pedro Leite",
  location: "Coimbra, Portugal",
  domain: "ursoparvo.studio",
  email: "olilei@proton.me",
  url: "https://ursoparvo.studio",
} as const;

export const TAGLINE = "A identidade. À prova de tendências." as const;

export const BIO_SHORT =
  "Designer com nove anos de experiência em produto, identidade e comunicação visual. Trabalhou para BMW, Mercedes-Benz e Talkdesk. Hoje dirige o Urso Parvo Studio, em Coimbra, focado em identidade visual corporativa que não segue tendências." as const;

export const BIO_LONG = [
  "João Pedro Leite passou nove anos a desenhar para produto digital. Ferramentas internas do BMW Group, plataformas da Mercedes-Benz, sistemas de contact centre na Talkdesk, serviços públicos da Segurança Social. Projectos com utilizadores reais, onde o detalhe importava e o erro tinha custo.",
  "Essa experiência mudou a forma como aborda qualquer decisão visual. Aprendeu a reconhecer a diferença entre o que parece bem numa apresentação e o que aguenta quando é usado de verdade.",
  "O Urso Parvo Studio nasce dessa maturidade aplicada a identidade visual corporativa. Para empresas e instituições que querem uma marca com presença, não uma marca a seguir a tendência do momento.",
] as const;

export const HERO = {
  tagline: TAGLINE,
  subtitle: "Identidade visual corporativa. Urso Parvo Studio, Coimbra.",
  ctaPrimary: { label: "Ver trabalho", href: "/work" },
  ctaSecondary: {
    label: "Falar sobre um projecto",
    href: `mailto:${SITE.email}`,
  },
} as const;

export const POSITIONING_BODY = [
  "João Pedro Leite passou nove anos a desenhar para produto digital, em projectos onde o erro tinha custo real e o utilizador era sempre alguém concreto.",
  "Essa experiência não lhe ensinou um processo, ensinou-lhe a distinguir entre o que parece bem numa apresentação e o que aguenta quando é usado de verdade.",
  "É essa maturidade que está em cada identidade desenhada pelo estúdio.",
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
    `O ${SITE.name} é dirigido por ${SITE.operator}, designer com nove anos de experiência em produto digital. BMW, Mercedes-Benz, Talkdesk, Segurança Social.`,
    "Essa experiência ensinou a distinguir entre o que parece bem e o que aguenta o tempo. É essa maturidade que está em cada identidade desenhada pelo estúdio.",
  ],
} as const;

export const PROCESS = {
  title: "Como trabalhamos",
  intro:
    "Cada projecto começa com uma conversa para perceber o contexto real. Define-se o âmbito, acorda-se um prazo. A produção segue depois, com revisões claras e comunicação por escrito em cada etapa.",
  body: "Sem surpresas a meio do caminho. O processo existe para proteger o resultado final, não para parecer profissional no papel.",
  phases: [
    "descoberta",
    "proposta",
    "produção",
    "revisão",
    "entrega",
  ] as const,
} as const;

export const CONTACT = {
  title: "Tem um projecto?",
  body: "Conte o contexto. O que precisa, para quando, que tipo de marca está a tentar construir. A resposta chega em até 48 horas.",
  ctaLabel: `${SITE.email}, ${SITE.domain}`,
  mailto: `mailto:${SITE.email}`,
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

export const NUMBER_MOMENT = {
  eyebrow: "O estúdio em três números",
  stats: [
    { value: 1, label: "pessoa. A que fala consigo." },
    { value: 0, label: "funcionários. Sem intermediários." },
    {
      value: "Ilimitadas",
      label: "revisões até ficar certo. Depois para.",
    },
  ],
} as const;
