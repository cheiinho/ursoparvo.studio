import type { CarpoolContent } from "./types";

export const carpoolEn: CarpoolContent = {
  meta: {
    title: "Carpool · UX research case study · UrsoParvo Studio",
    description:
      "UX research on vehicle availability, booking behaviour and operational readiness, and how that evidence challenged a platform-first assumption.",
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
    eyebrow: "Case study · Internal product · Research",
    title: "Carpool",
    subtitle:
      "Employees could reserve company cars. The brief looked like a booking-product problem. The research said otherwise.",
    meta: "UX research · Service design · Design explorations",
    thesis:
      "The interface had real usability problems. The dominant constraint was still vehicle availability and operational readiness.",
  },
  brief: {
    kicker: "Context",
    headline: "An internal vehicle-pool benefit",
    line: "People reserved company cars for leisure or work. If the booking flow felt broken, it was easy to assume the fix sat in the product.",
  },
  snapshot: {
    kicker: "Research snapshot",
    title: "What the research already made visible",
    intro:
      "An editorial map of documented evidence. Not analytics. Not invented rates.",
    note: "Every panel below is mapped to the source research before it appears here.",
    service: {
      title: "Service",
      body: "Carpool was an employee benefit: an internal system for reserving company pool vehicles for leisure or work.",
    },
    people: {
      title: "People",
      caveat:
        "Leisure interviews were the strongest sample. Work and operations still needed deeper research.",
      items: [
        {
          id: "aires",
          name: "Aires",
          role: "Leisure",
          need: "Next usable opportunity. Weekends matter.",
        },
        {
          id: "ricardo",
          name: "Ricardo",
          role: "Work",
          need: "A car on a fixed date, inside a precise window.",
        },
        {
          id: "rita",
          name: "Rita",
          role: "Operations",
          need: "Demand versus readiness between one booking and the next.",
        },
      ],
    },
    research: {
      title: "Research",
      methods: [
        "Contextual inquiry",
        "Leisure-user interviews",
        "Personas",
        "Expert review",
      ],
    },
    constraint: {
      title: "Primary constraint",
      statement: "Vehicle unavailability was the primary challenge.",
      support:
        "Usability concerns became secondary when vehicles were unavailable.",
      capacity:
        "This service had a capacity problem that showed up through the booking experience.",
    },
    ux: {
      title: "User experience signals",
      signals: [
        "Hard to find available slots",
        "Planning months in advance",
        "Unexpected cancellations",
        "Unclear confirmation",
        "Unclear reservation status",
        "Unclear availability",
        "Unclear rules",
        "Operational uncertainty",
      ],
    },
    ops: {
      title: "Operational signals",
      signals: [
        "Charging time",
        "Vehicle inspection",
        "Maintenance",
        "Vehicle condition",
        "Reservation limitations",
        "Pickup and return processes",
      ],
    },
    intents: {
      title: "Work vs leisure",
      caption:
        "Documented need contrast. Not a claim that the product already split these flows.",
      workLabel: "Work",
      leisureLabel: "Leisure",
      workNeed: "Specific dates and times",
      leisureNeed: "Greater flexibility / next available slot",
    },
    readiness: {
      title: "Available and ready",
      available: "Available",
      ready: "Ready",
      line: "Charging and inspection sit between return and the next usable booking.",
    },
    lifecycle: {
      title: "Service model",
      caption: "Conceptual service model derived from the research. Not an official SOP.",
      steps: [
        "User",
        "Request",
        "Booking",
        "Vehicle",
        "Preparation",
        "Charging / maintenance",
        "Ready",
        "Pickup",
        "Usage",
        "Return",
        "Inspection",
        "Next user",
      ],
      bookingHint:
        "Booking is one node. Operations and readiness sit around it.",
    },
    cancelPath: {
      title: "Reservation reliability",
      steps: ["Booked", "Waiting", "Cancelled"],
      note: "Documented late cancellations could arrive without a clear reason or alternative.",
    },
  },
  assumption: {
    kicker: "01 · Assumption",
    statement: "We thought the platform was the problem.",
    body: "If booking felt broken, rebuild the booking product. Reasonable. Incomplete.",
    nodes: ["Platform", "Booking", "Car"],
    bridge: "Before designing a solution, we investigated the service.",
    contextNote:
      "A platform rebuild was framed around roughly 6 to 12 months. That figure is project context, not a research metric.",
  },
  investigation: {
    kicker: "02 · Investigation",
    headline: "We looked past the screens",
    line: "Operations told us what happened between bookings. Leisure users told us what it felt like to wait. An expert review walked the live product line by line.",
    methods: [
      {
        title: "Contextual inquiry",
        detail:
          "Pick-up, drop-off, charging, inspection, policies, condition, fines.",
      },
      {
        title: "Leisure-user interviews",
        detail:
          "Search, reserve, cancel, and whether the wait was still worth it.",
      },
      {
        title: "Personas",
        detail: "Leisure flexibility, work precision, fleet operations.",
      },
      {
        title: "Expert review",
        detail: "Rules timing, history, confirmation, error clarity.",
      },
    ],
    caveat:
      "Strongest on leisure use. Work bookings and deeper operations were flagged as next steps.",
    voice:
      "One leisure user put it plainly: when cars were available, the interface stopped being the main complaint.",
  },
  personas: {
    headline: "Three relationships with the same service",
    line: "Behavioural roles from the research, not demographic posters.",
    items: [
      {
        name: "Aires",
        role: "Leisure",
        need: "The next usable opportunity. Weekends matter.",
        lens: "Flexible demand",
      },
      {
        name: "Ricardo",
        role: "Work",
        need: "A car on a fixed date, inside a precise window.",
        lens: "Fixed commitment",
      },
      {
        name: "Rita",
        role: "Operations",
        need: "Demand versus readiness between one booking and the next.",
        lens: "Fleet and requests",
      },
    ],
  },
  availability: {
    kicker: "03 · Finding a car",
    statement: "The problem wasn't finding the booking button.",
    after: "It was finding a car.",
    line: "People hunted for open days, planned months ahead, and still met unavailable options that looked selectable. There was no waiting list.",
  },
  wait: {
    kicker: "04 · The wait",
    statement: "Even a reservation could disappear.",
    line: "One documented case: booked in January for September, then told roughly twenty days before that the car would not be available. No usable explanation. No alternative.",
    attribution: "From leisure-user research. Not claimed as every reservation.",
  },
  readiness: {
    kicker: "05 · Available ≠ ready",
    statement: "Available didn't always mean ready.",
    line: "Electric leisure cars need charge time. Inspection sits between return and the next booking. A free calendar cell can still mean a car that cannot leave yet.",
  },
  intents: {
    kicker: "06 · Work ≠ leisure",
    statement: "Work and leisure needed different things.",
    line: "One interaction model served two jobs: fixed commitments and flexible opportunity. The research recommended letting people declare intent.",
  },
  rules: {
    kicker: "07 · Rules too late",
    statement: "The system knew the rule before the click.",
    line: "Limits such as one active leisure reservation appeared after Reserve, not before commitment.",
  },
  history: {
    kicker: "08 · History",
    statement: "Status was hard to see when it mattered.",
    line: "Defaults could hide future bookings. Important status sat late in the table. People opened tickets for reservations that already existed.",
  },
  usage: {
    kicker: "09 · Actual usage",
    statement: "Scheduled time is not proof of what happened.",
    line: "The research recommended logging actual pickup and return, for accountability when plans change.",
    note: "Times below are illustrative.",
  },
  turningPoint: {
    kicker: "10 · Turning point",
    statement:
      "Vehicle unavailability was the primary challenge. Usability was secondary.",
    qualifier:
      "The interface had real problems. That finding does not clear the product. It reorders the problem.",
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
      "Conceptual service model derived from the research. Not an official SOP.",
  },
  software: {
    kicker: "Boundaries",
    headline: "What software could help, and what it could not solve alone",
    could: {
      title: "Software could improve",
      items: [
        "Availability discovery",
        "Earlier rule disclosure",
        "Status, confirmation, history",
        "Cancellation reasons",
        "Readiness signals, if data exists",
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
      "Tell the operational truth earlier. Rebuild only if the rebuild aims at the dominant constraint.",
  },
  investment: {
    kicker: "Investment",
    headline: "If a platform takes 6 to 12 months, what problem is that time for?",
    line: "Project context, not a research metric. No invented ROI.",
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
    headline: "What the research opens for design",
    intro: "Conceptual responses. Not shipped product.",
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
        detail: "Reason and next step, not silence.",
      },
      {
        title: "Record actual usage",
        detail: "Log pickup and return when they happen.",
      },
    ],
  },
  outcome: {
    kicker: "Result",
    climax:
      "The most useful design decision was deciding what needed to be solved first.",
    headline: "The research changed the question",
    line: "A sharper decision frame. Not a launch story. Not invented savings.",
    beforeLabel: "Before",
    afterLabel: "After",
    before: "How do we build a better booking platform?",
    after: "What is actually preventing the service from working?",
    arc: [
      {
        label: "What we thought",
        text: "The booking platform was the place to intervene.",
      },
      {
        label: "What we found",
        text: "Real interface problems, under a deeper availability and readiness constraint.",
      },
      {
        label: "What changed",
        text: "The investment question moved from UI rebuild to service truth.",
      },
      {
        label: "Why it mattered",
        text: "Months of platform work only help if they aim at the constraint people actually feel.",
      },
    ],
  },
  reflection: {
    headline: "Limits",
    body: [
      "Internal tools inherit the physics of the service they represent. When that service is scarce and operationally buffered, the product’s first job is to be truthful.",
      "The sample was leisure-heavy. Work evidence was thinner. Operational depth was unfinished. Those limits belong in public.",
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
    workNeed: "12 Sep · 09:00 to 14:00 · fixed window",
    leisureNeed: "Next available weekend",
    reserve: "Reserve",
    lateRule: "You already have an active leisure reservation.",
    earlyRule: "1 active leisure reservation. Book again after it ends.",
    tryAgain: "Reset",
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
    zoomHint: "Step out from the booking layer",
    platformNode: "Booking platform",
  },
};
