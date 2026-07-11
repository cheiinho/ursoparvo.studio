import type { Dict } from "./types";

export const en: Dict = {
  site: {
    title: "UrsoParvo Studio",
    description: "Time-proof brands.",
  },

  header: {
    logoAlt: "UrsoParvo Studio",
    homeAria: "UrsoParvo Studio, back to the start",
    studioLabel: "Studio",
    langLabel: "PT",
    langAria: "Ver esta página em português",
    langHrefLang: "pt-PT",
  },

  skipLink: "Skip to content",

  home: {
    statement: "Time-proof brands.",
    ctaLabel: "Let's talk",
    gridLabel: "Projects",
    metaTitle: "UrsoParvo Studio",
    metaDescription:
      "Designer with deep experience across product, identity and visual communication. Past clients include BMW, Mercedes-Benz and Talkdesk. Now running UrsoParvo Studio in Coimbra, focused on corporate visual identity built to last.",
  },

  studio: {
    title: "How we work.",
    about: {
      title: "The studio",
      paragraphs: [
        "João Pedro Leite designs for digital products in enterprise and institutional settings. Internal tools at BMW Group, platforms at Mercedes-Benz, contact centre systems at Talkdesk, public services at Segurança Social. And, marking the path, the visual identity for Politécnico de Coimbra: an institution with its own history, thousands of people moving through it every day, a brand that had to carry that weight.",
        "Real users, where detail mattered and mistakes had a cost. That discipline shapes every decision he makes. The difference between what looks good in a deck and what holds up in actual use.",
        "UrsoParvo Studio applies that maturity to corporate visual identity. For companies and institutions that want a brand with presence, not one chasing the trend of the moment.",
      ],
    },
    metaTitle: "Studio · UrsoParvo Studio",
    metaDescription:
      "Designer with deep experience across product, identity and visual communication. Past clients include BMW, Mercedes-Benz and Talkdesk. Now running UrsoParvo Studio in Coimbra, focused on corporate visual identity built to last.",
  },

  process: {
    title: "Process",
    steps: [
      {
        title: "Conversation",
        body: "First contact. Understand the problem before talking about solutions.",
      },
      {
        title: "Quote",
        body: "A proposal with scope, numbers and dates. No small print.",
      },
      {
        title: "Contract",
        body: "Nothing moves without a signature. It protects both sides.",
      },
      {
        title: "Invoice",
        body: "A 50% deposit before work begins.",
      },
      {
        title: "Access",
        body: "What we need from you, how we communicate, where the files are kept.",
      },
      {
        title: "Kickoff",
        body: "An opening call and the work begins.",
      },
    ],
  },

  checklist: {
    title: "First contact",
    intro: "The more complete it is, the faster the quote.",
    items: [
      {
        title: "Brand materials",
        body: "Logo, guidelines, whatever exists.",
      },
      {
        title: "Goals",
        body: "What should change with this project.",
      },
      {
        title: "References",
        body: "What you like and what you want to avoid.",
      },
      {
        title: "Deadlines",
        body: "Concrete dates.",
      },
    ],
  },

  contact: {
    title: "Quote",
    intro: "Tell us the context.",
    minDeliveryNote:
      "Every project gets its own slot in the schedule, with no overlap with other work. Deadlines count from the start date set in the first meeting, not from this contact.",
    fields: {
      name: "Name",
      contact: "Email or phone",
      services: "What you need",
      description: "Brief description of the project or company",
      descriptionHint: "optional",
      deadline: "Desired timeline",
      referral: "How you found the studio",
      referralHint: "optional",
    },
    serviceOptions: [
      { id: "identidade", label: "Corporate visual identity" },
      { id: "grafismo", label: "Graphic design" },
      { id: "fotografia", label: "Photography" },
    ],
    deadlineOptions: ["No rush", "One to three months", "Urgent"],
    referralOptions: ["Social media", "A recommendation", "Online search", "Other"],
    servicesError: "Choose at least one service.",
    estimate: {
      locale: "en-GB",
      intro:
        "Based on what you described, the estimated investment for this project sits between {min} and {max}. This figure is an initial reference and will be refined in the first conversation.",
      mailtoLabel: "Estimate shown",
    },
    submit: "Send request",
    sending: "Sending…",
    subjectPrefix: "Quote",
    sentConfirmation:
      "Message sent. We will reply soon to the contact you provided.",
    sendError:
      "The message could not be sent from the site. You can open it in your email or copy it.",
    openEmail: "Open in email",
    copy: "Copy message",
    copied: "Message copied.",
    sentNote:
      "Your email client should have opened. If it did not, write directly:",
  },

  theme: {
    toLight: "Switch to the light theme",
    toDark: "Switch to the dark theme",
  },

  states: { loading: "Loading…" },

  errors: {
    heading: "Something broke.",
    body: "Please try again.",
    tryAgain: "Try again",
  },

  notFound: {
    heading: "This page does not exist.",
    action: "Back to the start",
  },
};
