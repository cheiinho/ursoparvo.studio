import type { Dict } from "./types";

export const en: Dict = {
  site: {
    title: "UrsoParvo Studio",
    description: "A visual design studio. Identity, graphic design, art direction and illustration.",
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
    lede: "Visual identity, graphic design, art direction and illustration.",
    ctaLabel: "Talk about a project",
    studioLabel: "The studio",
    gridLabel: "Projects",
    metaTitle: "UrsoParvo Studio",
    metaDescription:
      "Visual design studio in Coimbra. Identity, graphic design, art direction and illustration.",
  },

  studio: {
    title: "The studio.",
    about: {
      title: "The work",
      paragraphs: [
        "The studio works from Coimbra. João Pedro Leite runs it.",
        "The visual identity for Politécnico de Coimbra is a studio project: an institution with its own history and a lot of people moving through it every day.",
        "Before this, he designed digital products at BMW Group, Mercedes-Benz, Talkdesk and Segurança Social.",
        "Some projects need skills beyond visual design. When that happens, we work with specialists in areas such as motion, film, photography, writing or development.",
      ],
    },
    services: {
      title: "What we make",
      items: [
        {
          title: "Identity",
          body: "New identities and redesigns, visual systems, and the rules for using them.",
        },
        {
          title: "Graphic design",
          body: "Campaigns, publications, posters, packaging and communication materials.",
        },
        {
          title: "Art direction",
          body: "Visual direction for campaigns, events and cultural projects.",
        },
        {
          title: "Illustration",
          body: "Image-making for identities, campaigns, editorial and events.",
        },
        {
          title: "Events and culture",
          body: "Identities, key visuals and communication for festivals and events.",
        },
      ],
    },
    method: {
      title: "How we work",
      steps: [
        {
          title: "Understand",
          body: "We start with the project, what already exists and what needs to change.",
        },
        {
          title: "Design",
          body: "We explore and develop the visual direction.",
        },
        {
          title: "Build",
          body: "We turn the direction into a system that can be used consistently.",
        },
        {
          title: "Deliver",
          body: "We prepare the applications and documentation needed to use it.",
        },
      ],
    },
    engagement: {
      title: "Before work starts",
      intro: "Scope, fees and dates are set down in writing.",
      steps: [
        {
          title: "Proposal",
          body: "Scope, fees and dates.",
        },
        {
          title: "Contract and deposit",
          body: "Nothing moves without a signature. A 50% deposit before work begins.",
        },
        {
          title: "Kick-off",
          body: "Access, how we communicate, the opening call. Deadlines count from the start date, not from this first contact.",
        },
      ],
    },
    invite: {
      title: "Project",
      body: "",
      note: "",
      after: "We read the request and reply with the next steps.",
      cta: "Talk about a project",
      emailNote: "Or write directly to the email in the footer.",
    },
    metaTitle: "Studio · UrsoParvo Studio",
    metaDescription:
      "Visual design studio in Coimbra. Identity, graphic design, art direction and illustration.",
  },

  contact: {
    title: "Project",
    intro: "Tell us about the project. You do not need a brief.",
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
    flowCta: "Talk about a project",
    flowNote: "Or write directly to the email in the footer.",
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
