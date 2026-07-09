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
    metaTitle: "Estúdio · UrsoParvo Studio",
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
