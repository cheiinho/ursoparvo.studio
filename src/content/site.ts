export const SITE = {
  name: "Urso Parvo Studio",
  nameShort: "Urso Parvo",
  email: "olilei@proton.me",
  url: "https://ursoparvo.studio",
} as const;

export const TAGLINE = "A identidade. À prova de tendências." as const;

export const BIO_SHORT =
  "Designer com longa experiência em produto, identidade e comunicação visual. Trabalhou para BMW, Mercedes-Benz e Talkdesk. Hoje dirige o Urso Parvo Studio, em Coimbra, focado em identidade visual corporativa que não segue tendências." as const;

export const BIO_PARAGRAPHS = [
  "João Pedro Leite construiu o seu percurso a desenhar para produto digital. Ferramentas internas do BMW Group, plataformas da Mercedes-Benz, sistemas de contact centre na Talkdesk, serviços públicos da Segurança Social. Projectos com utilizadores reais, onde o detalhe importava e o erro tinha custo.",
  "Essa experiência mudou a forma como aborda qualquer decisão visual. Aprendeu a reconhecer a diferença entre o que parece bem numa apresentação e o que aguenta quando é usado de verdade.",
  "O Urso Parvo Studio nasce dessa maturidade aplicada a identidade visual corporativa. Para empresas e instituições que querem uma marca com presença, não uma marca a seguir a tendência do momento.",
] as const;

export const HOME_HERO = {
  title: "A identidade. À prova de tendências.",
  subtitle: "Identidade visual corporativa. Urso Parvo Studio, Coimbra.",
  ctaPrimary: "Ver trabalho",
  ctaSecondary: "Falar sobre um projecto",
} as const;

export const HOME_ABOUT = {
  label: "O estúdio",
  body: [
    "O Urso Parvo Studio é dirigido por João Pedro Leite, designer com longa experiência em produto digital. BMW, Mercedes-Benz, Talkdesk, Segurança Social.",
    "Essa experiência ensinou a distinguir entre o que parece bem e o que aguenta o tempo. É essa maturidade que está em cada identidade desenhada pelo estúdio.",
  ],
  cta: "Sobre o estúdio",
} as const;

export const HOME_SERVICES = {
  label: "Serviços",
  items: [
    {
      key: "identity" as const,
      title: "Identidade Visual Corporativa",
      body: "Logótipo, sistema cromático, tipografia, aplicações base. Uma identidade que aguenta o tempo porque a decisão por trás dela não dependeu de moda.",
      primary: true,
    },
    {
      key: "grafismo" as const,
      title: "Grafismo",
      body: "Cartazes, publicações, materiais de evento, redes sociais. Peças que comunicam antes de serem lidas.",
      primary: false,
    },
    {
      key: "fotografia" as const,
      title: "Fotografia",
      body: "Cobertura de eventos, retrato, produto. Imagens feitas para durar, não para o story de amanhã.",
      primary: false,
    },
  ],
} as const;

export const HOME_PROCESS = {
  label: "Como trabalhamos",
  body: [
    "Cada projecto começa com uma conversa para perceber o contexto real. Definimos o âmbito, acordamos um prazo. A produção segue depois, com revisões claras e comunicação por escrito em cada etapa.",
    "Sem surpresas a meio do caminho. O processo existe para proteger o resultado final, não para parecer profissional no papel.",
  ],
} as const;

export const HOME_CONTACT = {
  label: "Tem um projecto?",
  body: "Conte o contexto. O que precisa, para quando, que tipo de marca está a tentar construir. A resposta chega em até 48 horas.",
  cta: "Falar sobre um projecto",
} as const;

export const CONTACTO = {
  deliveryNote:
    "O prazo mínimo de entrega é de duas semanas, a contar da data de início definida na primeira reunião. Isto garante que cada projecto recebe atenção total, sem sobreposição com outros trabalhos em curso.",
  estimatorIntro:
    "Com base no que descreveu, o investimento estimado para este projecto situa-se entre",
  estimatorOutro:
    ". Este valor é uma referência inicial e será afinado na primeira conversa.",
  services: [
    { key: "identity" as const, label: "Identidade visual corporativa", min: 1800, max: 3000 },
    { key: "grafismo" as const, label: "Grafismo", min: 400, max: 900 },
    { key: "fotografia" as const, label: "Fotografia", min: 300, max: 700 },
    { key: "multiple" as const, label: "Mais do que um serviço", min: 0, max: 0 },
  ],
  prazos: [
    { value: "sem-pressa", label: "Sem pressa" },
    { value: "um-tres-meses", label: "Um a três meses" },
    { value: "urgente", label: "Seria urgente" },
  ],
  como: [
    { value: "redes-sociais", label: "Redes sociais" },
    { value: "recomendacao", label: "Recomendação" },
    { value: "pesquisa", label: "Pesquisa online" },
    { value: "outro", label: "Outro" },
  ],
} as const;

export const WORK_EMPTY = {
  lead: "Novos projectos, brevemente.",
  cta: "Iniciar um projecto",
  supportPrefix: "Ou escreva para",
} as const;

export const NAV = {
  work: "Trabalho",
  about: "Sobre",
  contact: "Contacto",
} as const;
