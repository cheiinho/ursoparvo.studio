import type { ServiceId } from "@/lib/estimate";

export type HeaderDict = {
  logoAlt: string;
  homeAria: string;
  studioLabel: string;
  langLabel: string;
  langAria: string;
  langHrefLang: string;
};

export type ThemeDict = {
  toLight: string;
  toDark: string;
};

export type FooterDict = {
  theme: ThemeDict;
};

export type ContactDict = {
  title: string;
  intro: string;
  minDeliveryNote: string;
  fields: {
    name: string;
    contact: string;
    services: string;
    description: string;
    descriptionHint: string;
    deadline: string;
    referral: string;
    referralHint: string;
  };
  serviceOptions: readonly { id: ServiceId; label: string }[];
  deadlineOptions: readonly string[];
  referralOptions: readonly string[];
  servicesError: string;
  estimate: {
    locale: string;
    intro: string;
    mailtoLabel: string;
  };
  submit: string;
  sending: string;
  subjectPrefix: string;
  sentConfirmation: string;
  sendError: string;
  openEmail: string;
  copy: string;
  copied: string;
  sentNote: string;
  flowCta: string;
  flowNote: string;
};

export type Dict = {
  site: { title: string; description: string };
  header: HeaderDict;
  skipLink: string;
  home: {
    statement: string;
    lede: string;
    ctaLabel: string;
    studioLabel: string;
    gridLabel: string;
    metaTitle: string;
    metaDescription: string;
  };
  studio: {
    title: string;
    about: {
      title: string;
      paragraphs: readonly string[];
    };
    method: {
      title: string;
      steps: readonly { title: string; body: string }[];
    };
    services: {
      title: string;
      items: readonly { title: string; body: string }[];
    };
    engagement: {
      title: string;
      intro: string;
      steps: readonly { title: string; body: string }[];
    };
    invite: {
      title: string;
      body: string;
      note: string;
      after: string;
      cta: string;
      emailNote: string;
    };
    metaTitle: string;
    metaDescription: string;
  };
  contact: ContactDict;
  theme: ThemeDict;
  states: { loading: string };
  errors: { heading: string; body: string; tryAgain: string };
  notFound: { heading: string; action: string };
};
