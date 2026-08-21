import type { Dict } from "./types";

export const pt: Dict = {
  site: {
    title: "UrsoParvo Studio",
    description: "Estúdio de identidade visual. À prova de tendências.",
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
    statement: "À prova de tendências.",
    lede: "Estúdio independente de identidade visual. A diferença entre o que parece bem numa apresentação e o que aguenta no uso real.",
    ctaLabel: "Falar sobre um projecto",
    studioLabel: "Conhecer o estúdio",
    gridLabel: "Projectos",
    metaTitle: "UrsoParvo Studio",
    metaDescription:
      "Estúdio independente de identidade visual em Coimbra. Identidade pensada para o uso real, não para a apresentação.",
  },

  studio: {
    title: "O estúdio.",
    about: {
      title: "Porquê",
      paragraphs: [
        "O UrsoParvo Studio é um estúdio independente de identidade visual. Trabalha a diferença entre o que parece bem numa apresentação e o que aguenta no uso real — para empresas e instituições que querem uma marca com presença, não uma marca a seguir tendências.",
        "Essa forma de decidir formou-se com João Pedro Leite a desenhar produtos digitais e sistemas em contextos exigentes. Ferramentas internas na BMW Group, plataformas na Mercedes-Benz, sistemas de contact centre na Talkdesk, serviços públicos na Segurança Social. Utilizadores reais, onde o detalhe importava e o erro tinha custo.",
        "A identidade visual do Politécnico de Coimbra está no centro desse território: uma instituição com história própria, muita gente a passar por ela todos os dias, uma marca que tinha de aguentar esse peso. A identidade tem de sobreviver à realidade. O estúdio trabalha a partir de Coimbra.",
      ],
    },
    method: {
      title: "Trabalho",
      steps: [
        {
          title: "Perceber",
          body: "O contexto, as restrições, o que tem de mudar.",
        },
        {
          title: "Decidir",
          body: "A direcção e as escolhas que a tornam possível.",
        },
        {
          title: "Construir",
          body: "A identidade, o sistema, as aplicações onde vai viver.",
        },
        {
          title: "Entregar",
          body: "Orientações, ficheiros, e o que é preciso para o uso continuar.",
        },
      ],
    },
    engagement: {
      title: "Colaboração",
      intro:
        "O trabalho avança com regras claras, para ambos os lados saberem o que se passa, o que custa e o que vem a seguir.",
      steps: [
        {
          title: "Proposta",
          body: "Âmbito, valores e prazos. Sem letras pequenas.",
        },
        {
          title: "Contrato e sinal",
          body: "Nada avança sem assinatura. Protege ambos os lados. Sinal de 50% antes de começar.",
        },
        {
          title: "Arranque",
          body: "Acessos, a forma de comunicar, a chamada inicial. Cada projecto tem uma janela própria na agenda, sem sobreposição. Os prazos contam a partir da data de início, não deste primeiro contacto.",
        },
      ],
    },
    invite: {
      title: "Projecto",
      body: "Cada projecto começa com algumas perguntas simples. Não precisa de saber exactamente o que precisa, nem de preparar um briefing. Queremos perceber o contexto, o que está a tentar resolver, e onde podemos ser mais úteis.",
      note: "Algumas perguntas. Sem compromisso.",
      after:
        "Depois de recebermos o pedido, lemos o projecto e definimos os próximos passos. Se houver enquadramento, avançamos para uma conversa e uma proposta.",
      cta: "Conte-nos sobre o projecto",
      emailNote: "Ou escreva directamente para o email no rodapé.",
    },
    metaTitle: "Estúdio · UrsoParvo Studio",
    metaDescription:
      "Estúdio independente de identidade visual em Coimbra. A disciplina de desenhar sistemas reais, aplicada à marca.",
  },

  contact: {
    title: "Projecto",
    intro: "Conte o que está a tentar resolver. Não precisa de um briefing.",
    minDeliveryNote:
      "Cada projecto tem uma janela própria na agenda, sem sobreposição com outros trabalhos. Os prazos contam a partir da data de início definida na primeira reunião, não a partir deste contacto.",
    fields: {
      name: "Nome",
      contact: "Email ou telefone",
      services: "O que precisa",
      description: "Descrição breve do projecto ou empresa",
      descriptionHint: "opcional",
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
    flowCta: "Conte-nos sobre o projecto",
    flowNote: "Ou escreva directamente para o email no rodapé.",
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
