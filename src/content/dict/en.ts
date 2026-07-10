import type { Dict } from "./types";

export const en: Dict = {
  site: {
    title: "UrsoParvo Studio",
    description: "Visual identity for companies.",
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
    srTitle: "UrsoParvo Studio. Visual identity for companies.",
    gridLabel: "Projects",
    metaTitle: "UrsoParvo Studio",
    metaDescription: "Visual identity for companies.",
  },

  studio: {
    title: "How we work.",
    intro: "We design visual identities for companies.",
    about: {
      title: "The studio",
      paragraphs: [
        "João Pedro Leite built his career designing for digital product. Internal tools for the BMW Group, platforms for Mercedes-Benz, contact centre systems at Talkdesk, public services for Portugal's Social Security. Projects with real users, where detail mattered and mistakes had a cost.",
        "That experience changed how he approaches any visual decision. He learned to tell the difference between what looks good in a presentation and what holds up when actually used.",
        "UrsoParvo Studio grew out of that maturity, applied to corporate visual identity. For companies and institutions who want a brand with presence, not a brand chasing the trend of the moment.",
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
        title: "Access and welcome doc",
        body: "What we need, how we talk, where everything lives.",
      },
      {
        title: "Kickoff",
        body: "A kickoff call, and the work begins.",
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
        body: "Things you like and things you avoid.",
      },
      {
        title: "Deadlines",
        body: "Real dates, not hopeful ones.",
      },
      {
        title: "A budget range",
        body: "It saves everyone two weeks of email.",
      },
    ],
  },

  contact: {
    title: "Quote",
    intro: "Tell us the context. We reply soon.",
    minDeliveryNote:
      "The minimum delivery time is two weeks, counted from the start date set in the first meeting. This means every project gets full attention, with no overlap with other work in progress.",
    fields: {
      name: "Name",
      contact: "Email or phone",
      services: "What you need",
      description: "Brief description of the project or company",
      descriptionHint: "optional, but it helps",
      deadline: "Desired timeline",
      referral: "How you found the studio",
      referralHint: "optional",
    },
    serviceOptions: [
      { id: "identidade", label: "Corporate visual identity" },
      { id: "grafismo", label: "Graphic design" },
      { id: "fotografia", label: "Photography" },
    ],
    deadlineOptions: ["No rush", "One to three months", "It would need to be urgent"],
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
