import type { Dict } from "./types";

export const pt: Dict = {
  site: {
    title: "UrsoParvo Studio",
    description: "Identidade visual para empresas.",
  },

  header: {
    logoAlt: "UrsoParvo Studio",
    homeAria: "UrsoParvo Studio, voltar ao início",
    studioLabel: "Estúdio",
    langLabel: "EN",
    langAria: "View this page in English",
    langHrefLang: "en",
  },

  skipLink: "Saltar para o conteúdo",

  home: {
    srTitle: "UrsoParvo Studio. Identidade visual para empresas.",
    gridLabel: "Projectos",
    metaTitle: "UrsoParvo Studio",
    metaDescription: "Identidade visual para empresas.",
  },

  studio: {
    title: "Como trabalhamos.",
    intro: "Fazemos identidade visual para empresas.",
    about: {
      title: "O estúdio",
      paragraphs: [
        "João Pedro Leite construiu o seu percurso a desenhar para produto digital. Ferramentas internas do BMW Group, plataformas da Mercedes-Benz, sistemas de contact centre na Talkdesk, serviços públicos da Segurança Social. Projectos com utilizadores reais, onde o detalhe importava e o erro tinha custo.",
        "Essa experiência mudou a forma como aborda qualquer decisão visual. Aprendeu a reconhecer a diferença entre o que parece bem numa apresentação e o que aguenta quando é usado de verdade.",
        "O UrsoParvo Studio nasce dessa maturidade aplicada a identidade visual corporativa. Para empresas e instituições que querem uma marca com presença, não uma marca a seguir a tendência do momento.",
      ],
    },
    metaTitle: "Estúdio · UrsoParvo Studio",
    metaDescription:
      "Designer com longa experiência em produto, identidade e comunicação visual. Trabalhou para BMW, Mercedes-Benz e Talkdesk. Hoje dirige o UrsoParvo Studio, em Coimbra, focado em identidade visual corporativa que não segue tendências.",
  },

  process: {
    title: "Processo",
    steps: [
      {
        title: "Conversa",
        body: "Primeiro contacto. Entender o problema antes de falar de soluções.",
      },
      {
        title: "Orçamento",
        body: "Proposta com âmbito, valores e prazos. Sem letras pequenas.",
      },
      {
        title: "Contrato",
        body: "Nada avança sem assinatura. Protege ambos os lados.",
      },
      {
        title: "Factura",
        body: "Sinal de 50% antes de começar.",
      },
      {
        title: "Acessos e welcome doc",
        body: "O que é preciso, como comunicamos, onde vive o quê.",
      },
      {
        title: "Kickoff",
        body: "Chamada de arranque e o trabalho começa.",
      },
    ],
  },

  checklist: {
    title: "Primeiro contacto",
    intro: "Quanto mais completo, mais rápido o orçamento.",
    items: [
      {
        title: "Materiais de marca",
        body: "Logótipo, manual, o que houver.",
      },
      {
        title: "Objectivos",
        body: "O que deve mudar com este projecto.",
      },
      {
        title: "Referências",
        body: "Coisas de que gosta e coisas de que foge.",
      },
      {
        title: "Prazos",
        body: "Datas reais, não optimistas.",
      },
      {
        title: "Faixa de orçamento",
        body: "Poupa duas semanas de emails a toda a gente.",
      },
    ],
  },

  contact: {
    title: "Orçamento",
    intro: "Conte o contexto. Respondemos em breve.",
    minDeliveryNote:
      "O prazo mínimo de entrega é de duas semanas, a contar da data de início definida na primeira reunião. Isto garante que cada projecto recebe atenção total, sem sobreposição com outros trabalhos em curso.",
    fields: {
      name: "Nome",
      contact: "Email ou telefone",
      services: "O que precisa",
      description: "Descrição breve do projecto ou empresa",
      descriptionHint: "opcional, mas ajuda",
      deadline: "Prazo desejado",
      referral: "Como conheceu o estúdio",
      referralHint: "opcional",
    },
    serviceOptions: [
      { id: "identidade", label: "Identidade visual corporativa" },
      { id: "grafismo", label: "Grafismo" },
      { id: "fotografia", label: "Fotografia" },
    ],
    deadlineOptions: ["Sem pressa", "Um a três meses", "Teria de ser urgente"],
    referralOptions: ["Redes sociais", "Recomendação", "Pesquisa online", "Outro"],
    servicesError: "Escolha pelo menos um serviço.",
    estimate: {
      locale: "pt-PT",
      intro:
        "Com base no que descreveu, o investimento estimado para este projecto situa-se entre {min} e {max}. Este valor é uma referência inicial e será afinado na primeira conversa.",
      mailtoLabel: "Estimativa apresentada",
    },
    submit: "Enviar pedido",
    sending: "A enviar…",
    subjectPrefix: "Orçamento",
    sentConfirmation:
      "Mensagem enviada. Respondemos em breve para o contacto que indicou.",
    sendError:
      "Não foi possível enviar a partir do site. Pode abrir a mensagem no seu email ou copiá-la.",
    openEmail: "Abrir no email",
    copy: "Copiar mensagem",
    copied: "Mensagem copiada.",
    sentNote:
      "O seu cliente de email deve ter aberto. Se não abriu, escreva directamente:",
  },

  theme: {
    toLight: "Mudar para o tema claro",
    toDark: "Mudar para o tema escuro",
  },

  states: { loading: "A carregar…" },

  errors: {
    heading: "Isto falhou.",
    body: "Tente de novo.",
    tryAgain: "Tentar de novo",
  },

  notFound: {
    heading: "Esta página não existe.",
    action: "Voltar ao início",
  },
};
