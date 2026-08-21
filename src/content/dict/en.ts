import type { Dict } from "./types";

export const en: Dict = {
  site: {
    title: "UrsoParvo Studio",
    description: "A visual identity studio. Time-proof brands.",
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
    lede: "An independent visual identity studio. The difference between what looks right in a presentation and what holds up in actual use.",
    ctaLabel: "Let’s talk",
    studioLabel: "The studio",
    gridLabel: "Projects",
    metaTitle: "UrsoParvo Studio",
    metaDescription:
      "Independent visual identity studio in Coimbra. Identity designed to work in the real world, not just in a presentation.",
  },

  studio: {
    title: "The studio.",
    about: {
      title: "Why",
      paragraphs: [
        "UrsoParvo Studio is an independent visual identity studio. The work sits between what looks right in a presentation and what holds up in actual use — for companies and institutions that want a brand with presence, not one chasing the trend of the moment.",
        "That discipline was formed with João Pedro Leite designing digital products and systems in demanding settings. Internal tools at BMW Group, platforms at Mercedes-Benz, contact centre systems at Talkdesk, public services at Segurança Social. Real users, where detail mattered and mistakes had a cost.",
        "The visual identity for Politécnico de Coimbra sits at the centre of that territory: an institution with its own history, thousands of people moving through it every day, a brand that had to carry that weight. Identity has to survive reality. The studio works from Coimbra.",
      ],
    },
    method: {
      title: "Work",
      steps: [
        {
          title: "Understand",
          body: "The context, the constraints, what has to change.",
        },
        {
          title: "Decide",
          body: "The direction, and the choices that make it possible.",
        },
        {
          title: "Build",
          body: "The identity, the system, the applications where it will live.",
        },
        {
          title: "Deliver",
          body: "Guidance, files, and what is needed for the work to continue in use.",
        },
      ],
    },
    engagement: {
      title: "Working together",
      intro:
        "The work moves with clear rules, so both sides know what is happening, what it costs, and what comes next.",
      steps: [
        {
          title: "Proposal",
          body: "Scope, fees and dates. No small print.",
        },
        {
          title: "Contract and deposit",
          body: "Nothing moves without a signature. It protects both sides. A 50% deposit before work begins.",
        },
        {
          title: "Kick-off",
          body: "Access, how we communicate, the opening call. Every project gets its own slot in the schedule, with no overlap. Deadlines count from the start date, not from this first contact.",
        },
      ],
    },
    invite: {
      title: "Project",
      body: "Every project starts with a few simple questions. You do not need to know exactly what you need, or to prepare a brief. We want to understand the context, what you are trying to solve, and where we can be most useful.",
      note: "A few questions. No obligation.",
      after:
        "Once we have the request, we read the project and set out the next steps. If it is a fit, we move to a conversation and a proposal.",
      cta: "Tell us about the project",
      emailNote: "Or write directly to the email in the footer.",
    },
    metaTitle: "Studio · UrsoParvo Studio",
    metaDescription:
      "Independent visual identity studio in Coimbra. The discipline of designing real systems, applied to brand.",
  },

  contact: {
    title: "Project",
    intro: "Tell us what you are trying to solve. You do not need a brief.",
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
    flowCta: "Tell us about the project",
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
