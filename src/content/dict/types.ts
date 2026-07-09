export type HeaderDict = {
  logoAlt: string;
  homeAria: string;
  studioLabel: string;
  langLabel: string;
  langAria: string;
  langHrefLang: string;
};

export type ThemeDict = {
  toggleToLight: string;
  toggleToDark: string;
  toLight: string;
  toDark: string;
};

export type FooterDict = {
  theme: ThemeDict;
};

export type ContactDict = {
  title: string;
  intro: string;
  fields: {
    name: string;
    type: string;
    budget: string;
    deadline: string;
    deadlineHint: string;
    description: string;
  };
  typeOptions: readonly string[];
  budgetOptions: readonly string[];
  submit: string;
  subjectPrefix: string;
  emptyDeadline: string;
  sentNote: string;
};

export type Dict = {
  site: { title: string; description: string };
  header: HeaderDict;
  skipLink: string;
  home: {
    srTitle: string;
    gridLabel: string;
    metaTitle: string;
    metaDescription: string;
  };
  studio: {
    title: string;
    intro: string;
    metaTitle: string;
    metaDescription: string;
  };
  process: {
    title: string;
    steps: readonly { title: string; body: string }[];
  };
  checklist: {
    title: string;
    intro: string;
    items: readonly { title: string; body: string }[];
  };
  contact: ContactDict;
  theme: ThemeDict;
  states: { loading: string };
  errors: { heading: string; body: string; tryAgain: string };
  notFound: { heading: string; action: string };
};
