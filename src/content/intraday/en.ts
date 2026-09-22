import type { IntradayContent } from "./types";

export const intradayEn: IntradayContent = {
  meta: {
    title: "Intraday Reforecasting",
    description:
      "A product design case study of a forecast that can change without the planner asking, and of making that change allowed, visible, and inspectable.",
  },
  labels: {
    requirement: "Requirement",
    designDecision: "Design decision",
    context: "Context",
    inference: "Inference",
    reconstruction: "Reconstruction",
    exploration: "Exploration",
    illustrative: "Illustrative",
  },
  legend: [
    "requirement",
    "designDecision",
    "context",
    "inference",
    "reconstruction",
    "exploration",
    "illustrative",
  ],
  sections: [
    { id: "cover", label: "Cover" },
    { id: "plan", label: "The plan" },
    { id: "diverges", label: "The day diverges" },
    { id: "brief", label: "The brief" },
    { id: "system", label: "What the system had to understand" },
    { id: "tensions", label: "Three design tensions" },
    { id: "decision-one", label: "Allow the change without configuring the model" },
    { id: "decision-two", label: "Make the change reach the planner" },
    { id: "decision-three", label: "Make the change inspectable" },
    { id: "validation", label: "Validation" },
    { id: "outcome", label: "Outcome" },
    { id: "reflection", label: "Reflection" },
  ],
  experience: {
    label: "Walkthrough",
    hint: "You set the pace. Nothing runs on its own.",
    restart: "Restart",
    acts: [
      {
        id: "plan",
        label: "The plan",
        statement: "The day is staffed from this line.",
        line: "One queue, in the account's day and time zone.",
      },
      {
        id: "divergence",
        label: "Divergence",
        statement: "The day diverges.",
        line: "Actuals pull away from the plan after 10:00.",
      },
      {
        id: "detection",
        label: "Detection",
        statement: "The gap qualifies.",
        line: "Consecutive periods above forecast. The figures behind that call were never defined.",
      },
      {
        id: "permission",
        label: "Permission",
        statement: "The customer allows the queue.",
        line: "One switch. No detection settings on the form.",
      },
      {
        id: "reforecast",
        label: "Reforecast",
        statement: "The forecast changes without being asked.",
        line: "A run starts, and the previous line stays until it finishes.",
      },
      {
        id: "inspection",
        label: "Inspection",
        statement: "Show me what changed, and where.",
        line: "Previous against current, then the period on the forecast and on the schedule.",
      },
    ],
  },
  cover: {
    kicker: "Product design, Q2 2023",
    thesis:
      "The forecast could change without the planner asking. The work was to make that change allowed, visible and inspectable, without turning the model's rules into settings.",
    title: "Intraday Reforecasting",
    domain: "Workforce management for contact centres.",
    anonymity:
      "The company is not named. Product screens on this page are reconstructions. Numbers are illustrative.",
    transition: "That change only matters if the forecast is what the day is staffed from.",
  },
  plan: {
    heading: "The plan",
    message:
      "The forecast is the staffing input for the rest of the day. It is not a record of what happened.",
    body: [
      "A resource planner staffs today from a forecast. The day is the account's day, in the account's time zone. The line is the plan for how much work is coming, and for how many people that work needs.",
      "Three places in the product carry that plan: Forecast, Team schedule, and Insights. Reporting receives it too. Those are the places a later change would show up.",
    ],
    chartTitle: "Planned contacts, Support, 6 June 2023.",
    caption: "Illustrative. Hourly totals are the sum of the quarter-hours in the dataset.",
    transition: "The plan holds only while the day agrees with it.",
  },
  diverges: {
    heading: "The day diverges",
    message:
      "Volume, handle time and capacity all unset a morning forecast. The issues log describes contact volume against the forecast. Handle time and absence are planner situations. They are not documented as triggers.",
    groupLabel: "What changed in the day",
    options: [
      {
        id: "volume",
        label: "Volume",
        note: "Between 10:00 and 11:00, illustrative actuals sit about 30% above the forecast. The issues log in the prototype described this kind of gap: contact volume higher than forecast for consecutive periods. The 30% is not a threshold. The threshold was never defined.",
      },
      {
        id: "handle",
        label: "Handle time",
        note: "Planners asked what a rise in handle time would do to the rest of the day. That question is documented. A detector that watches handle time is not.",
      },
      {
        id: "capacity",
        label: "Capacity",
        note: "One documented situation: about 100 hours lost to absence, the first shift calling in sick, at 9:00, and a need to see the rest of the day. The planner already knows. Nothing in the material shows the detector reading absenteeism.",
      },
    ],
    transition:
      "The brief did not ask the design to solve every one of these by detection. It asked for a conditional update to today's forecast.",
  },
  brief: {
    heading: "The brief",
    message:
      "Same day. A check through the day. A reforecast only when the gap qualifies. The customer does not configure the detection. The presented design later shows a queue switch anyway.",
    story:
      "As a resource planner, I want to update my forecast based on unexpected changes, so that I can make informed staffing decisions.",
    note: "The requirements treat this as mitigation. Not every customer wants it every day. They also say research was still needed on a choice the page does not pretend was settled: automate it per queue, or let someone decide when to run it.",
    constraints: [
      {
        summary: "Same day, in the account time zone.",
        body: "Same day, in the account time zone.",
      },
      {
        summary: "Check through the day, at least every 30 minutes. A check is not a new forecast.",
        body: "Check through the day, at least every 30 minutes. A check is not a new forecast.",
      },
      {
        summary:
          "Run a reforecast only when real values diverge from the forecast, over several periods, and not on a low-volume queue. The threshold, the period count and the volume cutoff were left undefined.",
        body: "Run a reforecast only when real values diverge from the forecast, over several periods, and not on a low-volume queue. The threshold, the period count and the volume cutoff were left undefined.",
      },
      {
        summary: "Use a different method from the ordinary forecast. Keep the original as a baseline.",
        body: "Use a different method from the ordinary forecast. Keep the original as a baseline.",
      },
      {
        summary:
          "Put the new forecast on Forecast, the schedule and Insights, and send it to reporting. Trigger a scheduling simulation. The simulation's result is not in the design material.",
        body: "Put the new forecast on Forecast, the schedule and Insights, and send it to reporting. Trigger a scheduling simulation. The simulation's result is not in the design material.",
      },
      {
        summary:
          "No customer configuration of the detection at launch. A flag for selected customers. Self-serve later.",
        body: "No customer configuration of the detection at launch. A flag for selected customers. Self-serve later.",
      },
    ],
    splits: [
      {
        summary: "What the planner had to understand",
        body: "That the numbers can change without a request, which queue, whether a run is still going, how large the change is, and which period.",
      },
      {
        summary: "What design could shape",
        body: "The queue control that was presented, the announcement, the comparison, the path to a period.",
      },
      {
        summary: "What was outside design",
        body: "The forecasting method, the threshold mathematics, the scheduling engine.",
      },
    ],
    transition: "Those rules only work if a check can happen and nothing on screen changes.",
  },
  target: {
    label: "Target",
    body: "Target, not a result. The brief asked for a 10% improvement in intraday accuracy over the original forecast. Nothing in the material shows that this was measured.",
  },
  system: {
    heading: "What the system had to understand",
    message:
      "The system checks during the day, on the order of every 30 minutes, whether recent actuals have pulled away from the forecast. A reforecast is a separate event. It does not run because a check ran. It runs when the documented conditions are met. Several of those conditions have no published number.",
    groupLabel: "Checks and the reforecast",
    back: "Back",
    next: "Next",
    algorithm:
      "The designer did not design the algorithm. The designer designed which of these states a planner can see.",
    lowVolume: "Low-volume queues are excluded. The cutoff was not defined.",
    transition: "Once a check can change the plan without being asked, three questions follow.",
    steps: [
      {
        id: 1,
        clock: "09:30 check",
        stateName: "Watching",
        sentence: "A check. No reforecast.",
      },
      {
        id: 2,
        clock: "10:30 check",
        stateName: "Deviation",
        sentence: "The gap has started. It has not held over several periods. Still no reforecast.",
      },
      {
        id: 3,
        clock: "11:00 check",
        stateName: "Qualifying gap",
        sentence:
          "Several periods are now above the forecast. The requirements also require a threshold and enough volume, and they exclude low-volume queues. Those figures were not defined. This illustration continues as if the gap qualifies.",
      },
      {
        id: 4,
        clock: "Reforecast in progress",
        stateName: "Reforecast in progress",
        sentence:
          "Until the run finishes, this demonstration keeps the previous line. The exact moment the numbers swap was not documented.",
      },
      {
        id: 5,
        clock: "Forecast updated",
        stateName: "Forecast updated",
        sentence:
          "The new line is the forecast from 11:00 on. It is raised by 20 contacts in each quarter-hour, about the extra volume in the affected period. That is a drawing choice. It is not the forecasting method.",
      },
    ],
    columns: { time: "Time", forecast: "Forecast", actual: "Actual" },
  },
  tensions: {
    heading: "Three design tensions",
    message: "Allow it without exposing the model. Stay quiet until the plan actually changes. When it changes, a new number is not an explanation.",
    questions: [
      "If the system can replace the forecast, what is the customer allowed to decide?",
      "A check should not interrupt anyone. A reforecast rewrites the plan. How does that rewrite reach a planner who is not watching the forecast?",
      "The new number is now the forecast. How does the planner see what it replaced, and where on the day to look?",
    ],
    transition:
      "The presented answer to the first question is a single control, and it does not match the launch requirement.",
  },
  decisionOne: {
    heading: "Allow the change without configuring the model",
    message:
      "The presented design adds \"Turn on reforecast\" to the queue, and no detection settings. The requirements said the customer would have no configuration at launch. This page does not say the switch shipped.",
    conflict:
      "The requirements said the customer would have no configuration at launch. A flag would turn the feature on for selected customers. Self-serve would come later. The presented design shows one queue switch anyway.",
    control: "Turn on reforecast",
    helper: "If enabled, the system will reforecast this queue.",
    onLine: "On, in this reconstruction. Whether this control shipped is not known.",
    existingNote: "These were already on the queue. They are not part of the decision.",
    existingValue: "Existing setting",
    fields: ["Service level", "Patience", "Shrinkage"],
    queueLabel: "Queue",
    disclosure: "Existing queue settings",
    transition: "If that switch is on, the planner can still be somewhere else when the forecast changes.",
  },
  decisionTwo: {
    heading: "Make the change reach the planner",
    causal: "The switch lets the system act for this queue. The planner may be on another page when it does.",
    message:
      "The state is one. The explanation sits on Forecast, Team schedule and Insights, and in the notification centre. A periodic check adds nothing to those places.",
    assumption: "This demonstration assumes the queue is allowed to reforecast.",
    stateGroup: "Forecast state",
    surfaceGroup: "Surface",
    states: [
      { id: "watching", label: "Watching", status: "Watching. No announcement." },
      { id: "inProgress", label: "In progress", status: "Reforecast in progress." },
      { id: "updated", label: "Updated", status: "Forecast updated." },
    ],
    surfaces: [
      { id: "forecast", label: "Forecast" },
      { id: "teamSchedule", label: "Team schedule" },
      { id: "insights", label: "Insights" },
    ],
    start: "Anomaly detected. Reforecast in progress in the affected queues.",
    completed: "Reforecast completed. Check updated data to solve possible issues.",
    nothingToReport: "No reforecast to report.",
    earlier: "Earlier notice",
    applyFilter: "Apply filter",
    affected: "Affected queue: Support.",
    ordersNote: "No numbers. Not part of this day.",
    filterOff: "Filter off. Orders is visible again, still without numbers.",
    preview: "Preview",
    previewReason: "What Preview showed is not documented.",
    checkInsights: "Check insights",
    notifications: "Notifications",
    panelHeading: "Notifications",
    close: "Close notifications",
    insightsBody:
      "Insights carried the updated forecast with the rest of the account's figures. The charts on that page are not specified.",
    present: "In the 10:00 to 11:00 period",
    absent: "Not in the 10:00 to 11:00 period",
    transition: "The banner says the forecast changed. It does not show what the previous line was, or which hour to staff.",
  },
  decisionThree: {
    heading: "Make the change inspectable",
    causal:
      "The banner says the forecast changed. It does not say what the previous forecast was, or which period to open.",
    message:
      "Previous against current, then one issue, then the same 10:00 to 11:00 period on the forecast and on the schedule. Staffing stays with the planner. The scheduling simulation is not shown.",
    baseline: "The comparison exists because the baseline is kept.",
    showPrevious: "Show previous forecast",
    previousHidden: "Previous forecast hidden",
    delta: "From 11:00, the illustrated forecast is 20 contacts higher in each quarter-hour than the previous line.",
    issue: "Support. 10:00 to 11:00. Contact volume is about 30% higher than forecast across these consecutive periods.",
    severity:
      "Illustrative. The prototype also showed a severity word. Critical, Major, Minor. How it was chosen is not documented, so it is not shown.",
    showForecast: "Show this period on the forecast",
    showSchedule: "Show this period on the schedule",
    periodPrefix: "Affected period",
    periodLabel: "Affected period, 10:00 to 11:00",
    scheduleNote:
      "The period on the schedule. Who was already on the shift is illustrative. What the scheduling simulation changed is not documented.",
    chartRegion: "Forecast chart",
    columns: { time: "Time", previous: "Previous", current: "Current", actual: "Actual" },
    transition: "That path was drawn in a prototype. What happened when people saw it is a thinner record.",
  },
  validation: {
    heading: "Validation",
    paragraphs: [
      "The prototype was high fidelity from early on. The reason given is time. Feedback had to be possible before the build, and a rough sketch was a poor way to talk about a forecast changing under someone.",
      "The designer has said the team worked directly with customer companies to get that feedback quickly. A later note put the number at three. The conversations themselves are not in the material. No count of sessions, no quotes, no list of what changed.",
      "What was put in front of people was the flow in this page: a queue control, an announcement, a comparison, an issue, a period. What was not established: whether planners could say why a run had started, whether the banner was noticed, whether the path was faster than hunting, what the schedule did after the simulation, and whether accuracy moved toward the target.",
    ],
    transition: "What can be said about the outcome is the path itself.",
  },
  outcome: {
    heading: "Outcome",
    lede: "Three decisions hold the path together: allow the queue, announce the change, and make the change inspectable.",
    design:
      "The presented design specifies a path. A customer allows a queue, or does not. A check stays silent. A reforecast announces itself on the pages where the forecast sits, at the start and at the finish. The planner can put the new forecast against the previous one and open the affected period on the forecast and on the schedule. Detection settings are not on the form.",
    unknowns: [
      "Shipping, unknown.",
      "Measured accuracy, unknown.",
      "What the simulation did to the roster, unknown.",
      "What customer feedback changed, unknown.",
    ],
    transition: "The boundary of the work is the period, not the roster, and not the model.",
  },
  reflection: {
    heading: "Reflection",
    body: "The path stops where the material stops. The planner can see that the forecast was replaced, and can find the period. The model that produced the new line was never a screen. Neither was the decision to move a person. The requirements say a reforecast triggers a scheduling simulation. What that did to the roster is not in the prototype. A closing slide says manual and automatic workflows were both designed. No manual control is shown.",
  },
  chart: {
    forecast: "Forecast",
    actual: "Actual",
    previous: "Previous",
    current: "Current forecast",
    newForecast: "New forecast",
    contacts: "Contacts",
    empty: "Not in this illustration",
    planSummary: "Hourly planned contacts for Support on 6 June 2023. No actuals are shown.",
    stepSummary: "The quarters in this step. A quiet check does not replace the forecast.",
    compareSummary:
      "From 11:00 the current forecast is the working line. Actuals are shown only for 10:00 to 11:00.",
    scenarioSummary: "Planned contacts, with actuals only when volume is selected.",
  },
  frame: {
    region: "Reconstructed product",
    product: "Workforce management",
    reconstruction: "Reconstruction",
    sentence:
      "Reconstruction. The interaction follows the prototype. The interface is not a historical screenshot, and the data is illustrative.",
    accountLabel: "Account",
  },
};
