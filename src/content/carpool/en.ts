import type { CarpoolContent } from "./types";

export const carpoolEn: CarpoolContent = {
  meta: {
    title: "Carpool — UX research case study · UrsoParvo Studio",
    description:
      "UX research case study on vehicle availability, booking behaviour and operational readiness — and how research challenged a platform-first assumption.",
  },
  disclosure:
    "Client and product details have been anonymised. Interface imagery has been reconstructed for portfolio purposes.",
  labels: {
    research: "Research evidence",
    context: "Project context",
    inference: "Interpretation",
    reconstruction: "Reconstruction",
    exploration: "Design exploration",
  },
  cover: {
    eyebrow: "Case study · Internal product · Research-led",
    title: "Carpool",
    subtitle:
      "A UX research project that challenged the assumption that a new booking platform would solve the real problem.",
    meta: "UX research · Service design · Design explorations",
    thesis:
      "The interface had real usability problems — but the dominant constraint was vehicle availability and operational readiness.",
  },
  brief: {
    kicker: "Context",
    headline: "An internal vehicle-pool benefit",
    line: "Employees reserved company cars for leisure or work. On the surface, it looked like a booking-product problem.",
  },
  assumption: {
    kicker: "01 — Assumption",
    statement: "We thought the platform was the problem.",
    body: "If booking felt broken, rebuild the booking product. Reasonable — and incomplete.",
    nodes: ["Platform", "Booking", "Car"],
    bridge: "Before designing the solution, we investigated the service.",
    contextNote:
      "A platform rebuild was framed around roughly 6–12 months — project context, not a research metric.",
  },
  investigation: {
    kicker: "02 — Investigation",
    headline: "We looked past the screens",
    line: "Operational inquiry, leisure-user research, behavioural roles, and an expert review of the live product.",
    methods: [
      {
        title: "Operations",
        detail: "Charging, inspection, policies, condition, fines.",
      },
      {
        title: "Leisure users",
        detail: "Search, reserve, cancel, and whether the wait was worth it.",
      },
      {
        title: "Roles",
        detail: "Leisure flexibility, work precision, fleet operations.",
      },
      {
        title: "Expert review",
        detail: "Rules timing, history, confirmation, error clarity.",
      },
    ],
    caveat:
      "Strongest on leisure. Work bookings and deeper ops were flagged as next steps.",
  },
  personas: {
    headline: "Three relationships with the same service",
    line: "Behavioural roles — not demographic cards.",
    items: [
      {
        name: "Leisure",
        role: "Flexible demand",
        need: "Next usable opportunity — weekends matter.",
      },
      {
        name: "Work",
        role: "Fixed commitment",
        need: "A car on a specific date and timeframe.",
      },
      {
        name: "Operations",
        role: "Fleet & requests",
        need: "Demand versus readiness between bookings.",
      },
    ],
  },
  availability: {
    kicker: "03 — Finding a car",
    statement: "The problem wasn't finding the booking button.",
    after: "It was finding a car.",
    line: "People hunted for open days, planned months ahead, and met unavailable options that still looked selectable. There was no waiting list.",
  },
  wait: {
    kicker: "04 — The wait",
    statement: "Even a reservation could disappear.",
    line: "One documented case: booked in January for September, then told roughly twenty days before that the car would not be available — without a usable explanation or alternative. Other cancellations followed the same pattern of silence.",
  },
  readiness: {
    kicker: "05 — Available ≠ ready",
    statement: "Available didn't always mean ready.",
    line: "Electric leisure cars need charge time. Inspection sits between return and the next booking. A free calendar cell can still mean a car that cannot leave yet.",
  },
  intents: {
    kicker: "06 — Work ≠ leisure",
    statement: "Work and leisure needed different things.",
    line: "One interaction model served two jobs: fixed commitments and flexible opportunity. The research recommended letting people declare intent.",
  },
  rules: {
    kicker: "07 — Rules too late",
    statement: "The system knew the rule before the click.",
    line: "Limits such as one active leisure reservation appeared after Reserve — not before commitment.",
  },
  history: {
    kicker: "08 — History",
    statement: "Status was hard to see when it mattered.",
    line: "Defaults could hide future bookings. Important status sat late in the table. People opened tickets for reservations that already existed.",
  },
  usage: {
    kicker: "09 — Actual usage",
    statement: "Scheduled time is not proof of what happened.",
    line: "The research recommended logging actual pickup and return — for accountability when plans change.",
    note: "Times below are illustrative.",
  },
  turningPoint: {
    kicker: "10 — Turning point",
    statement:
      "Vehicle unavailability was the primary challenge. Usability was secondary.",
    qualifier:
      "The interface had real problems. That finding does not exonerate the product — it reorders the problem.",
    shift:
      "From “how do we improve booking?” to “what makes a booking true?”",
  },
  service: {
    kicker: "Service",
    statement: "The platform was only one layer of the problem.",
    steps: [
      "User",
      "Request",
      "Booking",
      "Vehicle",
      "Preparation",
      "Charging / maintenance",
      "Ready",
      "Pick-up",
      "Usage",
      "Return",
      "Inspection",
      "Next user",
    ],
    diagramNote:
      "Conceptual service model derived from the research — not an official SOP.",
  },
  software: {
    kicker: "Boundaries",
    headline: "What software could help — and what it could not solve alone",
    could: {
      title: "Software could improve",
      items: [
        "Availability discovery",
        "Earlier rule disclosure",
        "Status, confirmation, history",
        "Cancellation reasons",
        "Readiness signals — if data exists",
        "Work / leisure intent",
      ],
    },
    couldNot: {
      title: "Software could not alone",
      items: [
        "Create fleet capacity",
        "Erase charge-time physics",
        "Invent inspection capacity",
        "Prevent every maintenance cancel",
        "Make scarcity feel abundant",
      ],
    },
    closing:
      "Tell the operational truth earlier — and only rebuild if the rebuild aims at the dominant constraint.",
  },
  investment: {
    kicker: "Investment",
    headline: "If a platform takes 6–12 months, what problem is that time for?",
    line: "Project context — not a research metric. No invented ROI.",
    contextNote: "Project context",
    chainA: ["New platform", "Better booking UI", "Better access?"],
    chainB: [
      "New platform",
      "Better booking UI",
      "Same fleet",
      "Same availability constraint",
    ],
    close:
      "The research challenged whether rebuilding the platform would address the dominant constraint.",
  },
  explorations: {
    kicker: "Explorations",
    headline: "What the research enables design to do",
    intro: "Conceptual responses — not shipped product.",
    items: [
      {
        title: "Find availability",
        detail: "Ask when a car is needed before browsing models.",
      },
      {
        title: "Show readiness",
        detail: "Make charging and preparation visible.",
      },
      {
        title: "Work / leisure intent",
        detail: "Fixed window versus next available.",
      },
      {
        title: "Explain state",
        detail: "Status that answers what is happening now.",
      },
      {
        title: "Explain cancellation",
        detail: "Reason and next step — not silence.",
      },
      {
        title: "Record actual usage",
        detail: "Log pickup and return when they happen.",
      },
    ],
  },
  outcome: {
    kicker: "Outcome",
    headline: "The research changed the question",
    line: "A sharper decision frame — not a launch story, not invented savings.",
    before: "How do we build a better booking platform?",
    after: "What is actually preventing the service from working?",
  },
  reflection: {
    headline: "Reflection",
    body: [
      "Internal tools inherit the physics of the service they represent. When the service is scarce and operationally buffered, the product’s first job is to be truthful.",
      "Limits remain: leisure-heavy sampling, thinner work evidence, unfinished operational depth. Those limits belong in public.",
    ],
  },
  interact: {
    selectDate: "Select a day",
    vehicles: "Vehicles",
    noAvailability: "No usable cars on this day",
    fewerOptions: "Fewer options",
    tryAnotherDay: "Try another day",
    dayLabels: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
    vehicleOpen: "Available to reserve",
    vehicleClosed: "Listed · no usable slot",
    scrubHint: "Move through the reservation",
    booked: "Booked",
    monthsPass: "Months pass",
    stillBooked: "Reservation still exists",
    twentyDays: "~20 days before",
    cancelled: "Cancelled",
    noReason: "No reason shown",
    noAlternative: "No alternative offered",
    playReady: "Step through readiness",
    stepReturn: "Return",
    stepInspection: "Inspection",
    stepCharging: "Charging",
    stepReady: "Ready",
    availableTag: "Available",
    readyTag: "Ready",
    workMode: "Work",
    leisureMode: "Leisure",
    workNeed: "12 Sep · 09:00 → 14:00 · fixed window",
    leisureNeed: "Next available weekend",
    reserve: "Reserve",
    lateRule: "You already have an active leisure reservation.",
    earlyRule: "1 active leisure reservation — book again after it ends.",
    tryAgain: "Activate Reserve",
    showBefore: "Show the rule before commitment",
    tabUpcoming: "Upcoming",
    tabActive: "Active",
    tabCompleted: "Completed",
    tabCancelled: "Cancelled",
    statusOpen: "Open",
    statusCompleted: "Completed",
    statusCancelled: "Cancelled",
    scheduled: "Scheduled",
    actual: "Actual",
    pickup: "Pickup",
    returnLabel: "Return",
    illustrative: "Illustrative times",
    zoomHint: "Scroll or step to zoom out from the booking layer",
    platformNode: "Booking platform",
  },
};
