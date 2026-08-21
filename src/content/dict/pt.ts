import type { Dict } from "./types";

export const pt: Dict = {
  site: {
    title: "UrsoParvo Studio",
    description: "Estúdio de desenho visual. Identidade, grafismo, direcção de arte e ilustração.",
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
    lede: "Identidade visual, grafismo, direcção de arte e ilustração.",
    ctaLabel: "Falar sobre um projecto",
    studioLabel: "Conhecer o estúdio",
    gridLabel: "Projectos",
    metaTitle: "UrsoParvo Studio",
    metaDescription:
      "Estúdio de desenho visual em Coimbra. Identidade, grafismo, direcção de arte e ilustração.",
  },

  studio: {
    title: "O estúdio.",
    about: {
      title: "O trabalho",
      paragraphs: [
        "O estúdio trabalha a partir de Coimbra. João Pedro Leite dirige-o.",
        "A identidade visual do Politécnico de Coimbra é um projecto da casa: uma instituição com história própria e muita gente a passar por ela todos os dias.",
        "Antes disto, desenhou produto digital na BMW Group, Mercedes-Benz, Talkdesk e Segurança Social.",
        "Alguns projectos pedem competências fora do desenho visual. Nesses casos trabalhamos com especialistas em áreas como motion, filme, fotografia, texto ou desenvolvimento.",
      ],
    },
    services: {
      title: "O que fazemos",
      items: [
        {
          title: "Identidade",
          body: "Identidades novas e redesigns, sistemas visuais e as regras para os usar.",
        },
        {
          title: "Grafismo",
          body: "Campanhas, publicações, cartazes, embalagem e material de comunicação.",
        },
        {
          title: "Direcção de arte",
          body: "Direcção visual para campanhas, eventos e projectos culturais.",
        },
        {
          title: "Ilustração",
          body: "Imagem para identidades, campanhas, editorial e eventos.",
        },
        {
          title: "Eventos e cultura",
          body: "Identidades, imagens principais e comunicação para festivais e eventos.",
        },
      ],
    },
    method: {
      title: "Como avançamos",
      steps: [
        {
          title: "Perceber",
          body: "Começamos pelo projecto, o que já existe e o que precisa de mudar.",
        },
        {
          title: "Desenhar",
          body: "Exploramos e desenvolvemos a direcção visual.",
        },
        {
          title: "Construir",
          body: "Passamos a direcção a um sistema que se possa usar com consistência.",
        },
        {
          title: "Entregar",
          body: "Preparamos as aplicações e a documentação necessárias para o uso.",
        },
      ],
    },
    engagement: {
      title: "Antes de começar",
      intro: "Âmbito, valores e prazos ficam definidos por escrito.",
      steps: [
        {
          title: "Proposta",
          body: "Âmbito, valores e prazos.",
        },
        {
          title: "Contrato e sinal",
          body: "Nada avança sem assinatura. Sinal de 50% antes de começar.",
        },
        {
          title: "Arranque",
          body: "Acessos, a forma de comunicar, a chamada inicial. Os prazos contam a partir da data de início, não deste contacto.",
        },
      ],
    },
    invite: {
      title: "Projecto",
      body: "",
      note: "",
      after: "Lemos o pedido e respondemos com os próximos passos.",
      cta: "Falar sobre um projecto",
      emailNote: "Ou escreva directamente para o email no rodapé.",
    },
    metaTitle: "Estúdio · UrsoParvo Studio",
    metaDescription:
      "Estúdio de desenho visual em Coimbra. Identidade, grafismo, direcção de arte e ilustração.",
  },

  contact: {
    title: "Projecto",
    intro: "Conte-nos sobre o projecto. Não precisa de um briefing.",
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
    flowCta: "Falar sobre um projecto",
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
