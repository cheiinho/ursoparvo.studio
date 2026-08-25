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

export type ContactDict = {
  title: string;
  intro: string;
  fields: {
    about: string;
    change: string;
    timing: string;
    name: string;
    email: string;
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
    essay: readonly string[];
    questions: readonly string[];
    closing: readonly string[];
    note: string;
    invite: {
      title: string;
      cta: string;
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
