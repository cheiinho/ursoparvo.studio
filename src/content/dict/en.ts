import type { Dict } from "./types";

export const en: Dict = {
  site: {
    title: "Urso Parvo Studio",
    description: "Visual identity for companies.",
  },

  header: {
    logoAlt: "Urso Parvo",
    homeAria: "Urso Parvo, back to the start",
    studioLabel: "Studio",
    langLabel: "PT",
    langAria: "Ver esta página em português",
    langHrefLang: "pt-PT",
  },

  skipLink: "Skip to content",

  home: {
    srTitle: "Urso Parvo. Visual identity for companies.",
    gridLabel: "Projects",
    metaTitle: "Urso Parvo Studio",
    metaDescription: "Visual identity for companies.",
  },

  studio: {
    title: "How we work.",
    intro:
      "We design visual identities for companies. The whole process is laid out below.",
    metaTitle: "Studio · Urso Parvo Studio",
    metaDescription:
      "How we work, what to send at first contact and how to ask for a quote.",
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
    intro: "Send what you have. The more complete it is, the faster the quote.",
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
    intro: "Fill this in and your email client does the rest.",
    fields: {
      name: "Name",
      type: "Project type",
      budget: "Estimated budget",
      deadline: "Deadline",
      deadlineHint: "for example, by September",
      description: "Description",
    },
    typeOptions: ["Visual identity", "Rebranding", "Website", "Other"],
    budgetOptions: [
      "Up to €2,500",
      "€2,500 to €5,000",
      "€5,000 to €10,000",
      "More than €10,000",
      "Not sure yet",
    ],
    submit: "Compose email",
    subjectPrefix: "Quote",
    emptyDeadline: "to be defined",
    sentNote:
      "Your email client should have opened. If it did not, write directly:",
    directPrefix: "Prefer to write it yourself?",
  },

  theme: {
    toggleToLight: "Light",
    toggleToDark: "Dark",
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
