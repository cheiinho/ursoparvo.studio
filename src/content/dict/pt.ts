import type { Dict } from "./types";

export const pt: Dict = {
  site: {
    title: "Urso Parvo Studio",
    description: "Identidade visual corporativa. Coimbra.",
  },

  header: {
    logoAlt: "Urso Parvo",
    homeAria: "Urso Parvo, voltar ao início",
    studioLabel: "Estúdio",
    langLabel: "EN",
    langAria: "View this page in English",
    langHrefLang: "en",
  },

  skipLink: "Saltar para o conteúdo",

  home: {
    srTitle: "Urso Parvo. Identidade visual corporativa.",
    gridLabel: "Projectos",
    metaTitle: "Urso Parvo Studio",
    metaDescription: "Identidade visual corporativa. Coimbra.",
  },

  studio: {
    title: "Estúdio",
    tagline: "Identidade à prova de tendências.",
    intro:
      "Fazemos marcas em Coimbra. Não andamos atrás de modas. O que sai daqui é para durar.",
    metaTitle: "Estúdio · Urso Parvo Studio",
    metaDescription:
      "Como trabalhamos, o que enviar no primeiro contacto e como pedir um orçamento.",
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
    title: "O que enviar no primeiro contacto",
    intro: "Quanto mais completo, mais rápido o orçamento.",
    items: [
      "Materiais de marca existentes, do logótipo ao manual. O que houver.",
      "Objectivos. O que deve mudar com este projecto.",
      "Referências. Coisas de que gosta e coisas de que foge.",
      "Prazos com datas reais, não optimistas.",
      "Uma faixa de orçamento. Poupa duas semanas de emails a toda a gente.",
    ],
  },

  contact: {
    title: "Orçamento",
    intro: "Preencha e o seu cliente de email faz o resto.",
    fields: {
      name: "Nome",
      type: "Tipo de projecto",
      budget: "Orçamento estimado",
      deadline: "Prazo",
      deadlineHint: "por exemplo, até Setembro",
      description: "Descrição",
    },
    typeOptions: ["Identidade visual", "Rebranding", "Website", "Outro"],
    budgetOptions: [
      "Até 2.500 €",
      "De 2.500 € a 5.000 €",
      "De 5.000 € a 10.000 €",
      "Mais de 10.000 €",
      "Ainda não sei",
    ],
    submit: "Compor email",
    subjectPrefix: "Orçamento",
    emptyDeadline: "por definir",
    sentNote:
      "O seu cliente de email deve ter aberto. Se não abriu, escreva directamente:",
    directPrefix: "Prefere escrever à mão?",
  },

  theme: {
    toggleToLight: "Claro",
    toggleToDark: "Escuro",
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
