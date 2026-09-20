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
    reconstruction: "Reconstructed UI",
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
    kicker: "02 — The brief",
    headline: "An internal vehicle-pool benefit",
    body: [
      "Employees could reserve company cars for leisure or work. On the surface it looked like a product problem: a booking interface, a reservation history, statuses, policies, confirmations. People complained. The screens looked busy with friction.",
      "The brief for this work was to understand what was actually failing — and what kind of design investment would matter.",
      "This is not a launch story. It is not a conversion story. It does not claim the recommendations were built.",
    ],
  },
  assumption: {
    kicker: "03 — The assumption",
    headline: "The booking experience looked like the problem",
    body: [
      "If employees struggle to book cars, improve the booking product. Make availability clearer. Tighten the flow. Clean up the interface. Perhaps justify a larger platform rebuild.",
      "That assumption is reasonable. It is also incomplete. A booking interface is where frustration becomes visible. It is not always where the constraint lives.",
    ],
    chain: [
      "The booking experience is the problem",
      "Build a new platform",
      "Invest roughly 6–12 months",
      "Improve access to the cars",
    ],
    bridge: "Before designing the solution, we investigated the service.",
    contextNote:
      "The 6–12 month timeframe is project context supplied by the designer — not a figure from the research report.",
  },
  investigation: {
    kicker: "04 — The investigation",
    headline: "We investigated the service, not only the screens",
    body: [
      "The work combined complementary research activities documented in the review: operational contextual inquiry, leisure-user research, personas that separated leisure, work and operations, and an expert review of the live booking product.",
    ],
    methods: [
      {
        title: "Operational context",
        detail:
          "Pick-up and drop-off concerns: charging, inspection, policies, accidents, condition, fines and related constraints.",
      },
      {
        title: "Leisure-user research",
        detail:
          "How people actually searched, reserved, cancelled and decided whether the benefit was worth the wait.",
      },
      {
        title: "Personas",
        detail:
          "Leisure flexibility, work precision, and an operational role managing cars and requests.",
      },
      {
        title: "Expert review",
        detail:
          "Annotated walkthrough of search, reservation, confirmation, history, errors and rule timing.",
      },
    ],
    caveat:
      "The research was strongest on leisure use. Work bookings and deeper operational workflow were explicitly flagged as needing further investigation.",
  },
  personas: {
    headline: "Three relationships with the same service",
    body: "These are behavioural personas from the research — not demographic portraits. They show that “the user” is not one actor.",
    items: [
      {
        name: "Leisure",
        role: "Flexible demand",
        need: "Often wants the next usable opportunity — weekends matter.",
      },
      {
        name: "Work",
        role: "Fixed commitment",
        need: "Needs a car on a specific date and timeframe.",
      },
      {
        name: "Operations",
        role: "Fleet and requests",
        need: "Manages cars, requests and the gap between demand and readiness.",
      },
    ],
  },
  experience: {
    kicker: "05 — What users experienced",
    headline: "Finding a car was harder than booking one",
    body: [
      "Leisure users described a benefit that was attractive in theory and unreliable in practice. They hunted for open days. They planned months ahead. They watched reservations collapse without a clear reason. They opened tickets because history filters hid future bookings. They checked email to confirm what the product had not made obvious.",
      "Some stopped using the benefit because the wait was not worth it.",
      "They also hit genuine interface failures: unclear calendars, late rule messages, confusing statuses, weak empty states, awkward history filters. Both things were true at once.",
    ],
    signal:
      "People valued access to the cars — and abandoned the benefit when waiting and uncertainty dominated.",
  },
  service: {
    kicker: "06 — Behind the screen",
    headline: "The calendar could imply a slot. Operations decided whether it was real.",
    body: [
      "Leisure cars were fully electric. They needed time to charge. Short gaps between bookings were more likely to fail. Vehicles also needed inspection before they were truly ready again. Maintenance could cancel plans after people had already organised around a booking.",
    ],
    steps: [
      "Demand",
      "Availability",
      "Booking",
      "Preparation",
      "Charging / maintenance",
      "Ready",
      "Pick-up",
      "Return",
      "Inspection",
      "Next user",
    ],
    diagramNote:
      "Conceptual service model derived from the research. Sequence simplified — not a claimed operational SOP.",
  },
  turningPoint: {
    kicker: "07 — The turning point",
    statement: "Vehicle unavailability was the primary challenge. Usability was secondary.",
    qualifier:
      "The interface had real problems. That finding does not exonerate the product — it reorders the problem.",
    body: [
      "The expert review could fill pages with interface defects. Users could describe them too. And still, the research synthesis put vehicle unavailability first.",
      "If cars are scarce, hard to secure, or not ready when marked available, polishing the booking UI treats the packaging of the symptom. The service still fails at the moment that matters: a person needs a car and cannot reliably get one.",
    ],
    shift:
      "The investigation moved from “how do we improve booking?” to “what makes a booking true?”",
  },
  findings: {
    kicker: "08 — Five patterns",
    headline: "Not equal weight",
    intro:
      "Availability and readiness sit at the centre. The other patterns explain how the product amplified the deeper constraint.",
    items: [
      {
        id: "f01",
        weight: "lead",
        title: "Finding a slot was hard",
        body: [
          "Users struggled to identify open days. Unavailable times were unclear. Vehicles with no usable dates could still appear. The main page did not expose availability clearly, so people used trial and error — sometimes planning months ahead. There was no waiting list.",
          "The service was technically bookable and practically hard to access when demand exceeded vehicles.",
        ],
        level: "Mixed — service scarcity made worse by weak discoverability",
      },
      {
        id: "f02",
        weight: "support",
        title: "Work ≠ leisure",
        body: [
          "Leisure users often need flexibility and the next available opportunity. Work users need a fixed date and timeframe. The product used one interaction model for both intents.",
          "Work lived experience was thinner in the sample — the distinction is strongly conceptual, partially validated.",
        ],
        level: "Product model sitting on different service purposes",
      },
      {
        id: "f03",
        weight: "lead",
        title: "Available ≠ ready",
        body: [
          "Electric leisure cars need recharge time. Inspection is needed before the next booking. A free calendar cell can still mean a car that cannot leave yet.",
          "This is one of the strongest links between operations and booking failure in the research.",
        ],
        level: "Operations — with an honesty gap in the interface",
      },
      {
        id: "f04",
        weight: "support",
        title: "A reservation could disappear",
        body: [
          "Long-horizon bookings could be cancelled late without explanation or alternative. Maintenance cancellations frustrated people who had already planned. Detail views often omitted why a reservation ended.",
          "Trust broke after the booking — when the future promise failed.",
        ],
        level: "Service reliability + communication failure",
      },
      {
        id: "f05",
        weight: "support",
        title: "The system hid its own rules",
        body: [
          "One-active-reservation limits appeared after clicking Reserve. Weekend start restrictions were misread as total weekend unavailability. Third-party driving rules were hard to find. History defaults could hide future bookings and trigger support tickets.",
          "Policies existed. People met them as errors.",
        ],
        level: "Interface representation of policy",
      },
    ],
  },
  software: {
    kicker: "09 — Boundaries",
    headline: "What software could help — and what it could not solve alone",
    could: {
      title: "Software could meaningfully improve",
      items: [
        "Availability discovery and next-open-slot paths",
        "Earlier eligibility checks and rule disclosure",
        "Status language, confirmation and history defaults",
        "Cancellation reasons and lifecycle clarity",
        "Readiness signals — if operational data exists",
        "Differentiated leisure vs work intents",
      ],
    },
    couldNot: {
      title: "Software could not, by itself",
      items: [
        "Create fleet capacity",
        "Remove charge-time physics",
        "Invent inspection capacity",
        "Prevent every maintenance cancellation",
        "Make a scarce benefit feel abundant through UI alone",
      ],
    },
    closing:
      "Build software that tells the operational truth earlier — and only invest in a larger rebuild if that rebuild aims at the dominant constraint, not only at interaction debt.",
  },
  investment: {
    kicker: "10 — The investment question",
    headline: "If a platform takes 6–12 months, what problem is that time for?",
    body: [
      "A serious platform effort can consume something like six to twelve months. That number does not come from the research PDF. It is project context — useful because it forces a sharp question.",
      "If the answer is “a cleaner booking UI,” the research says we may be under-aiming. If the answer is “a system that represents availability, readiness, cancellation truth and different booking intents,” the research becomes a briefing for the investment.",
    ],
    contextNote: "Project context — not a research metric. No cost or ROI figures.",
    chainA: [
      "New platform",
      "Better booking experience",
      "Better access to cars?",
    ],
    chainB: [
      "New platform",
      "Better booking experience",
      "Same fleet capacity",
      "Same availability constraint",
    ],
    close:
      "The research challenged whether rebuilding the platform would address the dominant constraint.",
  },
  explorations: {
    kicker: "11 — Design explorations",
    headline: "With the problem reframed, design could explore service-aware booking",
    intro:
      "These are design responses to the research — not a record of implementation.",
    items: [
      {
        title: "Availability-first booking",
        detail: "Ask when a car is needed before asking which car to browse.",
      },
      {
        title: "Waiting list / release notification",
        detail: "Turn cancellations into structured opportunity instead of informal chat workarounds.",
      },
      {
        title: "Work / leisure intent",
        detail: "Same product, two entry paths: fixed window vs next available.",
      },
      {
        title: "Readiness visibility",
        detail: "Show charging and preparation so “available” means usable.",
      },
      {
        title: "Cancellation reasons",
        detail: "Explain why a reservation ended — and what can happen next.",
      },
      {
        title: "History that answers the real question",
        detail: "Upcoming, past and cancelled — without hiding the future behind a default filter.",
      },
    ],
  },
  outcome: {
    kicker: "Outcome",
    headline: "The most valuable design decision was deciding what needed to be solved first",
    body: [
      "The research challenged the case for treating Carpool as primarily an interface rebuild. It changed the investment question from how to redesign the booking platform to what the service must make true before software can improve the experience people feel.",
      "That is the outcome this case can honestly claim: a sharper decision frame, grounded in evidence, with clear limits on what was and was not proven.",
    ],
    before: "How do we build a better booking platform?",
    after: "Is the platform actually the dominant constraint?",
  },
  reflection: {
    headline: "Reflection",
    body: [
      "Good product design is not only execution inside a given brief. It is the ability to test whether the brief aims at the right constraint.",
      "Internal tools inherit the physics of the service they represent. When the service is scarce, operationally buffered and occasionally cancelled upstream, the product’s first job is to be truthful — then to be graceful.",
      "The research has limits: leisure-heavy sampling, incomplete work-user evidence, unfinished operational depth, no measured usability study yet. Those limits belong in public, not sanded off for drama.",
    ],
  },
  artefacts: {
    availabilityCaption:
      "The problem wasn’t choosing a car. It was discovering when a car could actually be used.",
    intentsCaption: "The same booking interface was serving two very different jobs.",
    readinessCaption: "A free calendar slot did not necessarily mean a ready-to-use car.",
    cancelCaption: "A reservation could exist for months and still fail shortly before use — without a usable reason.",
    cancelExploreCaption: "Exploration: make the reason and the next step visible.",
    ruleCaption: "The system knew the rule before the user clicked Reserve.",
    historyCaption: "Defaults could hide a future booking and make the list look empty.",
    explorationStripNote: "Conceptual directions enabled by the research — not shipped product.",
    uiPoolTitle: "Pool booking",
    uiReserve: "Reserve",
    uiLeisure: "Leisure",
    uiWork: "Work",
    uiNextAvailable: "Next available weekend",
    uiWhenNeed: "When do you need a car?",
    uiCancelled: "Cancelled",
    uiNoReason: "No reason provided",
    uiReasonMaintenance: "Reason: vehicle maintenance",
    uiJoinWaitlist: "Notify me if a slot opens",
    uiActiveRule: "You already have an active leisure reservation.",
    uiTooLate: "Disclosed after Reserve",
    uiEligibility: "You already have an active reservation. You can book again after it ends.",
    uiHistoryEmpty: "No results found",
    uiHistoryDefault: "Default filter: current year only",
    uiUpcoming: "Upcoming",
    uiAvailableFrom: "Available from 16:00",
    uiCharging: "Charging · inspection required",
    uiReadyAt: "Ready 18:30",
    uiInspection: "Inspection",
    availableLabel: "Available",
    readyLabel: "Ready",
  },
};
