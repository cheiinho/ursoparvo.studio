import { SITE } from "@/content/site";

/** Interface copy. One term per concept. Sentence case. No graded outcomes. */
export const UI = {
  skipLink: "Saltar para o conteúdo",

  nav: {
    ariaMain: "Principal",
    ariaMobile: "Menu móvel",
    ariaLegal: "Legal",
    ariaProjects: "Índice de projectos",
    ariaFeatured: "Projectos em destaque",
    home: "Início",
    menuOpen: "Menu",
    menuClose: "Fechar",
  },

  theme: {
    group: "Tema",
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
    toLight: "Mudar para tema claro",
    toDark: "Mudar para tema escuro",
    toSystem: "Usar tema do sistema",
  },

  actions: {
    viewWork: "Ver trabalho",
    contact: "Contactar",
    sendMessage: "Enviar mensagem",
    tryAgain: "Tentar de novo",
    backToStart: "Voltar ao início",
    backToWork: "Voltar ao trabalho",
    nextProject: (name: string) => `Seguinte: ${name}`,
    copyEmail: "Copiar email",
    copied: "Copiado",
    about: "Sobre",
  },

  states: {
    sending: "A enviar…",
    loading: "A carregar…",
  },

  errors: {
    genericHeading: "Isto falhou.",
    genericBody: "Tente de novo.",
    sendFailed: `Não enviou. Tente de novo, ou escreva para ${SITE.email}.`,
    invalidEmail: "Esse endereço de email está incompleto.",
    emptyMessage: "Escreva uma mensagem antes de enviar.",
  },

  confirmations: {
    messageSent: "Mensagem enviada. Respondo em 2 dias úteis.",
  },

  notFound: {
    heading: "Esta página não existe.",
    action: "Voltar ao início",
  },

  work: {
    emptyLead: "Trabalho a chegar. Para começar um projecto, contacte",
    pageTitle: "Trabalho",
  },

  about: {
    pageTitle: "Sobre",
    servicesLabel: "Serviços",
    servicePrimaryLabel: "Principal",
    emailAria: (email: string) => `Enviar email para ${email}`,
  },

  legal: {
    privacyTitle: "Política de privacidade",
    termsTitle: "Termos de serviço",
    noticeTitle: "Aviso legal",
    cookiesTitle: "Política de cookies",
    privacyLead: "Política em preparação. Questões:",
    termsLead: "Termos em preparação. Questões:",
    cookiesBody:
      "Este site usa cookies essenciais e armazenamento local quando necessário. Sem cookies de publicidade de terceiros.",
    noticeStudio: "Estúdio de design",
    noticeResponsibility:
      "Responsável pelo conteúdo deste site nos termos da lei aplicável.",
  },

  thinking: {
    label: "Ponto de vista",
    title: "Sobre permanência.",
    metadataTitle: "Ponto de vista",
    metadataDescription:
      "Sobre permanência, tipografia e cor. O filtro do estúdio.",
  },
} as const;
