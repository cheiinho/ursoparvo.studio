import { SITE } from "@/content/site";

export const UI = {
  skipLink: "Saltar para o conteúdo",

  nav: {
    ariaMain: "Principal",
    ariaMobile: "Menu móvel",
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
    toggleToLight: "Light",
    toggleToDark: "Dark",
    toLight: "Mudar para tema claro",
    toDark: "Mudar para tema escuro",
  },

  actions: {
    tryAgain: "Tentar de novo",
    backToStart: "Voltar ao início",
    backToWork: "Voltar ao trabalho",
    nextProject: (name: string) => `Seguinte: ${name}`,
  },

  states: {
    sending: "A enviar…",
    loading: "A carregar…",
  },

  errors: {
    genericHeading: "Isto falhou.",
    genericBody: "Tente de novo.",
  },

  notFound: {
    heading: "Esta página não existe.",
    action: "Voltar ao início",
  },

  work: {
    pageTitle: "Trabalho",
  },

  about: {
    pageTitle: "Sobre",
    emailAria: (email: string) => `Enviar email para ${email}`,
  },

  legal: {
    privacyTitle: "Privacidade",
    termsTitle: "Termos",
    noticeTitle: "Aviso legal",
    cookiesTitle: "Cookies",
    privacyBody: `Questões: ${SITE.email}.`,
    termsBody: `Questões: ${SITE.email}.`,
    cookiesBody: "Cookies essenciais e armazenamento local apenas.",
    noticeBody: `${SITE.name}. Coimbra. ${SITE.email}.`,
  },
} as const;
