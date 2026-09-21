# Intraday Reforecasting — Deep Project Analysis, Evidence Audit & Case Study Architecture

**Status:** Audit only. Phase 1 deliverable. No implementation, no redesign, no final copy.
**Date:** 2026-09-21
**Standard:** Every important statement is classified. Nothing below is promoted above its source. Where the evidence stops, the document says so.

---

## 00. Source access note (this environment)

| Source | Level | File / location | Status |
|---|---|---|---|
| A — Requirements | 1 | `Intraday_reforecasting_models.pdf` (2 pages, Google Docs export) | Read in full (text) |
| B — Presentation speech | 5 | `intraday_reforecasting_speech.docx` (21 slides of speaker notes) | Read in full (text) |
| C — Current case study | 4 | `Intraday-Reforecasting-under-4MB-final.pdf` (20 pages, image-only) | Every page rendered and inspected, including high-resolution crops of the research artefacts, flow diagram, product screens and issue table |
| D — Figma prototype | 3 | `figma.com/proto/V237VWTnQ1TRkcJZ69vB2k` | **Not accessible from this environment** (request timed out; requires an authenticated browser). Treated as *not independently inspected*. Every statement about the prototype below derives from the screenshots embedded in Source C. |
| E — Repository | — | `/workspace` (`main` fast-forwarded to `48eebfb`, which merges the Carpool case study) | Inspected: routes, components, content model, CSS system, fonts, tests, docs |
| F — Designer-provided context | 6 | The brief for this audit | One statement: the team worked directly and closely with three companies to obtain feedback quickly because the timeline was limited |

Citation convention used throughout: **REQ** = Source A (with the acceptance-criteria number), **SPEECH** = Source B (with slide number), **PDF p.N** = Source C page, **REPO** = Source E, **JOÃO** = Source F.

Reading order note: the speech is the *lowest-ranked project source* (Level 5) even though it is the richest narrative. Several of the most quotable statements in this project exist only in the speech. They are marked as such.

---

## 01. Executive summary

**What the project is.** A workforce-management (WFM) feature for contact-centre resource planners: when actual intraday values diverge from the forecast beyond a threshold, the system reforecasts the rest of the day, and the new forecast propagates to the Forecast, Schedule and Insights surfaces. The designer's work covers how the feature is switched on, how the planner learns that the system changed the forecast, and how the planner inspects and acts on that change.

**What the evidence actually supports (high confidence).**
- The user story, the "mitigation strategy" note and the acceptance criteria (same day, 30-minute cadence, threshold, several periods, low-volume exclusion, different algorithm, 10% accuracy *target*, no customer configuration for the first release, feature flag, propagation to three pages plus reporting, baseline-forecast property, scheduling simulation trigger, more than once a day). — REQ
- The designed states: queue-level "Turn on reforecast" checkbox; "Anomaly detected — Reforecast in progress in the affected queues" notification; banners on Forecast, Team schedule and Insights with "Apply filter", "Preview" and "Check insights"; "Reforecast completed — Check updated data to solve possible issues"; "N issues found" in the Forecast header; "Show previous forecast" overlay; a "Forecasting issues" log with trigger time, end time, queue, severity and description; anomaly-period highlighting on the forecast chart and the schedule timeline. — PDF p.10–19
- The strategic use of high-fidelity prototypes under time pressure to get feedback quickly and help development start. — PDF p.11, SPEECH 2 & 21

**What the evidence does *not* support (must not be claimed).**
- That accuracy improved by 10% (REQ states it as a requirement to meet; no measurement exists in any source).
- That the system "continuously reforecasts". It monitors every 30 minutes; it reforecasts only when conditions are met and, per the speech and the PDF diagram, at most twice a day per queue with at least one hour between runs. The caps are not in REQ.
- Any participant count, session count, usability score, adoption, production status or business impact.
- That the Kano model, Value Proposition Canvas and Empathy Map are research evidence. All three are explicitly labelled in the PDF as generated with ChatGPT, carry a disclaimer that their content "may not be comprehensive or applicable" and that research is still needed, and the Empathy Map's "What do they SAY?" quadrant is empty. They are hypothesis-mapping artefacts, not findings.

**The most important audit finding.** The current case study inverts its own evidence weight: its weakest material (three AI-generated canvases) occupies three full pages under "Understanding processes and dependencies", while its strongest material (the requirements constraints, the automation-versus-control note, the system logic, and the state model of the design) is either compressed into one page or absent. The reconstruction should reverse that.

**Recommended thesis (one sentence).** The system could decide on its own to change the forecast; the design's job was to make that change reach the planner where they were working, make it inspectable against what it replaced, and make the next step obvious — while asking the customer to configure exactly one thing.

**Recommended backbone: three decisions.** (1) One switch per queue as the entire configuration surface. (2) The change reaches the planner in context: notification centre plus banners across the three affected surfaces, with state progression and filters. (3) The change is inspectable and actionable: previous-versus-new overlay, an issues log with severity, and anomaly-period highlighting that connects forecast to schedule.

**Recommended interactive spine (five interactions).** Scenario selector; detection-and-reforecast simulation (monitoring vs execution, threshold, caps); state change in a neutral product environment; previous-versus-new toggle; issue-to-location follow-through.

---

## 02. Source hierarchy

### 02.1 Hierarchy as applied

| Level | Source | Present? | Notes |
|---|---|---|---|
| 1 | Original requirements | Yes (REQ) | Two pages. Acceptance criteria are explicit and several items are marked "to be defined as part of the epic". Two internal codenames and one named engineer appear. |
| 2 | Documented research / interviews / scenarios / customer info | Partial | PDF p.4 contains five scenario cards and five "things that may affect the forecast" cards. No method, participants, dates or attribution beyond "User's scenarios". SPEECH 4 claims the scenarios came from interviews with resource planners. REQ says customer research "is needed" (future tense). |
| 3 | Original Figma / product design work | Not directly | Only via screenshots in PDF p.10–19. |
| 4 | Current portfolio case study | Yes (PDF) | 20 pages. Image-only. |
| 5 | Presentation speech | Yes (SPEECH) | Retrospective explanation. Introduces system parameters not in REQ (2×/day cap, 1-hour interval, 8-week history, nightly run, multiplication factor). |
| 6 | Explicit information from João | Yes (JOÃO) | Three-company collaboration. |
| 7 | This audit's interpretation | — | Always marked. |

### 02.2 How disagreements were handled

Each disagreement is listed in §14 with both positions. Where a lower-level source adds detail that a higher-level source leaves open (for example REQ says "to be defined", SPEECH gives a number), the detail is treated as **DESIGNER-PROVIDED CONTEXT / PROJECT CONTEXT at Level 5 confidence**, not as a documented requirement. It may be used in the case study only if João confirms it or if it is presented as "the logic the design was built around".

---

## 03. Project reconstruction

### 03.1 Context (classified)

| Statement | Class | Source |
|---|---|---|
| Talkdesk, Q2 2023, João as Product Designer | PROJECT CONTEXT | PDF p.2, SPEECH 1 |
| The product is a Workforce Management module with Forecast, Scenarios, Insights, Team schedule, Your schedule, Configurations | DOCUMENTED FACT (as visible in screens) | PDF p.10, 12, 14, 16 |
| Users are resource planners / WFM analysts | DOCUMENTED FACT | REQ user story; PDF p.6–8 label "WFM Analyst" |
| The feature is a mitigation strategy; not every customer wants it every day | DOCUMENTED FACT | REQ note; PDF p.3 |
| Customer research was needed to decide between queue-level automation and on-demand runs | DOCUMENTED FACT (as an open question at requirement time) | REQ note |
| Time was constrained; feedback had to be obtained quickly before development | PROJECT CONTEXT | PDF p.11, SPEECH 2 |
| Access to the internal design system was limited; hi-fi prototypes were chosen to closely resemble the final product | PROJECT CONTEXT | PDF p.11 |
| The team worked closely with three companies for fast feedback | DESIGNER-PROVIDED CONTEXT | JOÃO |
| Resource planners were interviewed and their scenarios documented | PROJECT CONTEXT (Level 5 only) | SPEECH 4 |
| Threshold definition, algorithm and simulation performance were engineering-owned | DOCUMENTED FACT | REQ Must 3.1, 3.4, 4, 9.1 |

### 03.2 The layers and how they connect

REAL-WORLD OPERATIONAL CHANGE → SYSTEM DETECTION → FORECASTING LOGIC → USER AWARENESS → INTERPRETATION → STAFFING DECISIONS

| Layer | What the sources establish | Who owns it |
|---|---|---|
| Operational change | Volume increases, capacity decreases, AHT increases, absenteeism, coaching, surplus agents, redistribution (PDF p.4; SPEECH 4–5) | The operation |
| Detection | Every 30 minutes, compare actuals with forecast over several 15-minute periods; trigger only above a threshold; exclude low-volume queues (REQ 2–3; PDF p.9; SPEECH 6–9) | Engineering / data |
| Forecasting logic | Different method from the baseline forecast; reforecast becomes the new forecast; baseline stored for accuracy measurement; simulation triggered (REQ 4, 7, 8, 9) | Engineering / data |
| Awareness | Notification centre + banners on three surfaces (PDF p.11–15) | **Design** |
| Interpretation | Previous vs new forecast; issues log with severity; anomaly location (PDF p.16–19) | **Design** |
| Decision | "Make informed staffing decisions" (REQ); "jump to affected time periods in the schedule" (SPEECH 20); Check forecast / Check insights links (PDF p.18, p.14) | Planner, supported by design |

Interpretation (Level 7): the designer's territory begins where the system's certainty ends. The system knows *that* it changed the forecast; only the design can make that change *legible*.

### 03.3 What the designer actually designed (documented)

1. A queue-level activation control inside the existing queue configuration form. — PDF p.10
2. Two notification-centre messages with state-specific language and a "Preview" action. — PDF p.11, p.15
3. A banner component with at least three wording states and up to three actions, placed on Forecast, Team schedule and Insights. — PDF p.12–15, p.19
4. A Forecast header state: "Updated today at 12:00 PM, 3 issues found" with the count linking to an issues page. — PDF p.14, p.16, p.18
5. A "Show previous forecast" overlay (dotted series for CVO, AHT and Staff). — PDF p.16–17
6. A "Forecasting issues" page: list of events with trigger time, end time, queue, severity chip, description and "Check forecast" link. — PDF p.18
7. Anomaly-period highlighting on the forecast chart and on the schedule timeline (with tooltip "Anomaly detected in this period"). — PDF p.19

---

## 04. Problem model

### 04.1 Reconstructing the problem at five levels

| Level | Statement | Class | Evidence |
|---|---|---|---|
| Operational problem | During the day, demand and capacity move away from what was planned; the plan for the rest of the day may no longer hold. | DOCUMENTED FACT | PDF p.4 scenarios; SPEECH 3–5 |
| User problem | The planner has to answer "how does the rest of the day look now, and what should I do?" under time pressure, without reforecasting constantly. | DOCUMENTED FACT + RESEARCH INTERPRETATION | REQ user story; PDF p.4 ("how does the rest of the day look…", "where can we find opportunities…"); SPEECH 3 ("can't just reforecast every hour") |
| System problem | Decide when a deviation is meaningful (threshold, several periods, minimum volume, same day), recompute with a different method, propagate the result, and keep the baseline for measurement. | DOCUMENTED FACT | REQ Must 1–4, 7–10 |
| Design problem | Given a system that can change the forecast on its own, decide (a) how much the customer configures, (b) how the planner learns that the forecast changed while working elsewhere, (c) how the planner understands the size and location of the change and what to do next. | DESIGN RATIONALE (inferred from the relationship between REQ note, REQ 5–7 and the designed states) | REQ note; PDF p.10–19; SPEECH 10–20 |
| Portfolio-worthy challenge | Translating an automated, threshold-driven system into an experience with one configuration decision, unambiguous state communication across surfaces, and inspectable consequences. | INTERPRETATION | This audit |

### 04.2 Testing the hypothesis in the brief

Hypothesis: *"How can the system determine when a deviation is meaningful enough to justify a new forecast, and how can the product make that automated change understandable and actionable for the person responsible for staffing decisions?"*

- The **first half** (how the system determines meaningfulness) is a real problem in the sources, but REQ assigns it to the epic and to the algorithm (Must 3.1, 3.2, 3.4, 3.5, 4). SPEECH 6 confirms the designer needed to *understand* it ("Before designing the interface, I needed to deeply understand the technical process"). It is **design material**, not a design decision the designer made.
- The **second half** is exactly the territory of PDF p.10–19. It is validated as the design problem.

Verdict: partially validated. The case study should present the first half as *what had to be understood* and the second half as *what was designed*. Collapsing them would over-claim the designer's role in the detection logic.

### 04.3 Four-layer model with source per step

```
LAYER 1 — REALITY        Volume rises / AHT lengthens / agents are absent or pulled          PDF p.4; SPEECH 4–5
        ↓
LAYER 2 — FORECAST       Baseline forecast for the day (stored as such)                       REQ 8
        ↓
LAYER 3 — DEVIATION      Actuals diverge from forecast                                        REQ 3; PDF p.9
                         System evaluates every 30 min over several 15-min periods            REQ 2, 3.3; PDF p.9; SPEECH 6
                         Threshold + minimum volume + not low-volume queue + same day          REQ 1, 3.1, 3.2, 3.4
                         → Anomaly → reforecast (different method) → new forecast              REQ 4, 7; PDF p.11
                         → Propagated to Forecast / Schedule / Insights / Reporting            REQ 7
                         → Scheduling simulation triggered                                     REQ 9
        ↓
LAYER 4 — DECISION       Planner learns of the change (notification, banner)                  PDF p.11–15
                         Planner inspects (previous vs new, issues, location)                  PDF p.16–19
                         Planner acts (staffing decision; Check forecast / Check insights)     REQ user story; PDF p.14, p.18
```

Every step is supported. The model may be used. Two caveats: the 2×/day cap and 1-hour interval (SPEECH 6, PDF p.9) are not in REQ (REQ 10 says only "more than one time a day"); and whether AHT deviations trigger detection is not established (see §07.4).

---

## 05. User scenario analysis

### 05.1 Inventory (verbatim content from PDF p.4; attribution class: USER / CUSTOMER EVIDENCE with **unknown provenance**)

| # | Scenario card (PDF p.4) | What changes | Effect on capacity / demand | Effect on the forecast | Planner's decision |
|---|---|---|---|---|---|
| S1 | Team Leaders contact agents for coaching sessions. | Agents pulled off the floor | Capacity ↓ (planned, short-notice) | Volume forecast unchanged; staffing requirement now unmet | Allow / reschedule coaching; check service level for the rest of the day |
| S2 | Agents refrain from leaving earlier during lunch. High volumes during this period, decreasing significantly after 4 hours. | Peak demand vs shift boundaries | Demand ↑ in a window; capacity must hold | Intraday volume profile matters more than the daily total | Hold presence during peak; release later |
| S3 | We lose 100 hours due to absenteeism; all agents call in sick for their first shift. It's 9:00; how does the rest of the day look with these 100 hours taken out? Crucial to recalibrate and forecast effectively. | Large capacity loss at day start | Capacity ↓↓ | Volume forecast unchanged; the *staffing* picture must be recomputed | Redistribute, extend shifts, accept lower service level |
| S4 | We've welcomed a greater number of agents than anticipated. Where can we find opportunities to conduct training sessions? | Capacity surplus | Capacity ↑ | Forecast unchanged; slack appears | Schedule training in the slack |
| S5 | In which other departments can we allocate agents without affecting the service level in those departments? | Cross-queue reallocation | Capacity moves between queues | Each queue's forecast vs staffing | Move agents where the margin allows |

"Things that may affect the forecast" cards (PDF p.4): additional volume; capacity decrease; your average time has increased; fewer hours for absenteeism or other occurrences; "If there's a 30% increase in handling time, how will this impact us at 9 PM, and what actions can we take to address it?"

SPEECH 5 adds the example "30% increase in call volume → impact on staffing at 9 PM".

### 05.2 Common structure

Every scenario has the same skeleton: **an unplanned change → a mismatch between required staffing and available staffing for the rest of the day → a question of the form "how does the rest of the day look, and what can I do?"**

Two families emerge:

- **Demand-side changes** (volume ↑, AHT ↑): these move the *forecast itself*. They are the deviations the documented detection logic observes — REQ 3 compares "real and forecast", SPEECH 6 compares against "calls actually received", and every issue description in PDF p.18 is expressed as "CVO is N% higher than forecasted for N consecutive periods".
- **Capacity-side changes** (absenteeism, coaching, surplus, redistribution): these do not change the forecast; they change what is available against it. REQ 9 ("Reforecast will trigger a simulation (scheduling)") is the only documented bridge between the reforecast and staffing.

**Analytical consequence (RESEARCH INTERPRETATION, high importance):** the current case study lists all scenarios as if the feature answers all of them. The documented feature answers the demand-side family directly. The capacity-side scenarios explain *why planners care about rest-of-day accuracy*, but the sources do not say that anomaly detection observes absenteeism. The reconstruction must keep this distinction, or it will claim behaviour that is not evidenced.

### 05.3 Which scenarios to keep

| Scenario | Explanatory value | Recommendation |
|---|---|---|
| Additional volume (30%) | Highest: it is the documented trigger type, and it maps to the issue descriptions | **Keep; lead scenario** |
| AHT +30% at 9 PM | High: demand-side; shows the "later in the day" consequence | **Keep** (mark AHT-as-trigger as unconfirmed) |
| 100 hours of absenteeism at 9:00 | High as a *planner-pressure* illustration; shows why rest-of-day matters | **Keep, reframed** as the capacity-side motivation |
| Coaching | Redundant with absenteeism (smaller capacity loss) | Condense into one line |
| Lunch peak | Illustrates intraday shape; partially redundant with volume | Condense |
| Surplus agents / training | Redundant with redistribution (both are "where is the slack?") | Condense into one line |
| Redistribution across departments | Adds the multi-queue dimension, which matters for "affected queues" and "Apply filter" | Keep as one sentence tied to queue-level design |

### 05.4 Interactive scenario selector

Recommended with three inputs, not four: **Volume**, **Handle time**, **Capacity** (absenteeism is a sub-case of capacity and should be the example text, not a separate control). The selector's job is to show that different causes converge on the same planner question, and to show honestly which causes the system observes directly (demand) and which it does not (capacity). Values must be labelled illustrative.

---

## 06. Research analysis

### 06.1 Artefact-by-artefact

#### Resource planner scenarios (PDF p.4)

| Question | Answer | Class |
|---|---|---|
| Why created? | To ground the abstract user story in operational situations | DESIGN RATIONALE (inferred) |
| Question it tries to answer | "What actually goes wrong during a day and what does a planner need to know?" | Interpretation |
| Evidence it contains | Five scenario statements in first-person planner voice; five factor cards | USER / CUSTOMER EVIDENCE, provenance unknown |
| Safe insight | Planners frame the problem as rest-of-day consequences ("how does the rest of the day look", "at 9 PM") and as decisions ("where can we…", "can we move…"). | RESEARCH INTERPRETATION, well supported by the card wording |
| Decision influenced | Rest-of-day emphasis (reforecast applies to the remainder of the day, REQ 1); severity by magnitude and duration (PDF p.18) is consistent with the "how bad, for how long" framing | DESIGN RATIONALE; influence not documented explicitly |
| Influence documented? | Only via SPEECH 4 ("these scenarios helped us understand… real operational decisions under pressure") | Level 5 |
| Worth showing? | **Yes**, as the case study's strongest human material | |
| Stronger as interaction? | Yes — as the scenario selector (§05.4) with the original wording quoted as scenario text | |

#### Kano Model (PDF p.6)

| Question | Answer |
|---|---|
| Provenance | Header carries a "CHAT GPT" badge. Note in the artefact: "The features listed from CHAT GPT may not be comprehensive or applicable to all contact center web applications. It's important to conduct research and gather feedback from users to determine which features are important and valuable to them." |
| Class | **DESIGN EXPLORATION (AI-assisted hypothesis mapping)**. Not research evidence. |
| Content | Feature ideas placed in Attractive / Performance / Indifferent / Must-be / Reverse: e.g. "Alerts for staffing shortages or overages" and "Real-time data updates" under Must-be; "Customizable alerts and notifications" and "Predictive analytics" under Attractive; "Complex and difficult-to-use interface" and "Inaccurate forecasting" under Reverse. |
| Safe insight | None can be attributed to users. At most: the designer anticipated that alerting and real-time updates would be baseline expectations, and complexity would be penalised. |
| Decision influenced | Possibly the simplicity of configuration and the emphasis on alerts — **not documented**. |
| Worth showing? | **No, not as an artefact.** Showing an AI-generated Kano model as "research" in a senior portfolio is a credibility risk. |
| Alternative | One honest sentence in the "what we had to understand" section: before contact with customers, the designer mapped assumptions about which capabilities would be expected versus valued, using generative tooling as a starting point, and then tested those assumptions against real scenarios. Only if João wants the AI provenance mentioned; otherwise omit entirely. |

#### Value Proposition Canvas (PDF p.7)

| Question | Answer |
|---|---|
| Provenance | "CHAT GPT" badge; same disclaimer. |
| Class | DESIGN EXPLORATION (AI-assisted). |
| Content | Customer jobs (accurately forecast staffing in real time; optimise schedules; monitor adherence), pains (inaccurate forecasting; inefficient scheduling; lack of visibility; tedious manual processes), gains (automated reforecasting; real-time visibility), products & services (intraday reforecasting tool; real-time monitoring dashboard; historical data analysis; alerts), pain relievers, gain creators. |
| Safe insight | None attributable to users. |
| Worth showing? | **No.** Remove. |

#### Empathy Map (PDF p.8)

| Question | Answer |
|---|---|
| Provenance | "Designed by: CHAT GPT"; same disclaimer. Template © 2017 Dave Gray / gamestorming. |
| Class | DESIGN EXPLORATION (AI-assisted). |
| Notable | The **"What do they SAY?"** quadrant is **empty**. Think/Feel, See, Hear and Do are populated with generic WFM-analyst statements. |
| Safe insight | None attributable to users. The empty SAY quadrant is itself evidence that no user quotes were captured in this artefact. |
| Worth showing? | **No.** Remove. |

#### Process / dependency exploration and system logic (PDF p.9)

| Question | Answer |
|---|---|
| Why created? | To make the reforecasting mechanics legible to the designer and to stakeholders | SPEECH 6 |
| Evidence | 30-minute checks over the past 4 quarter-intervals; trigger above a calculated threshold; at least 1 hour before restart; maximum 2 per day per queue; runs across 24 hours; thresholds from the nightly run using "percentile differences" between predicted and actual values over the past 8 weeks; reforecast multiplies the rest-of-day forecast by a factor derived from the difference |
| Class | PROJECT CONTEXT at Level 4/5 (the PDF and speech agree with each other; REQ leaves most parameters "to be defined") |
| Safe insight | Monitoring is periodic; reforecasting is conditional and capped. The system is designed to *not* over-react. |
| Decision influenced | Directly: the "in progress" / "completed" two-state communication; the issue descriptions in "N% for N consecutive periods"; the decision to expose no thresholds to the customer |
| Worth showing? | **Yes, and it is currently under-used.** The p.9 diagram is dense and small; it should become the detection simulation. |

#### Customer / user context

The only customer context in the sources is REQ's note ("not all customers will want this to happen every day") and JOÃO's three-company statement. There is no customer segmentation, no queue examples beyond "support / sales / campaigns" in the prototype, no quotes.

### 06.2 Research → insight → design implication (what can legitimately be drawn)

| Research input | Insight (class) | Design implication (documented?) |
|---|---|---|
| Scenario cards | Planners think in rest-of-day consequences and in decisions (RESEARCH INTERPRETATION) | Reforecast scope = rest of the day (REQ 1, documented); issues describe magnitude and duration (PDF p.18, documented); "Check forecast" links (PDF p.18) |
| REQ note (mitigation; not every day; automation vs on-demand) | Control over *whether* the system acts matters more than control over *how* it acts (DESIGN RATIONALE) | Queue-level on/off (PDF p.10) — documented as the decision; rationale documented only in SPEECH 10 |
| REQ 7 (new forecast shown on Forecast, Schedule, Insights) | The change is visible in three places, so awareness must be in three places (DESIGN RATIONALE) | Banners on exactly those three surfaces (PDF p.13) |
| REQ 8 (baseline forecast stored) | The previous forecast exists as data, so a comparison is possible (DESIGN RATIONALE) | "Show previous forecast" (PDF p.16–17) |
| System logic (30 min, threshold, caps) | The system has distinct states (monitoring, anomaly, reforecasting, completed) that the user cannot see (DESIGN RATIONALE) | Two-message notification design; "in progress" vs "updated" banner wording (PDF p.11, p.15) |

This table replaces the current "artefact → artefact → artefact" sequence.

---

## 07. System logic reconstruction

### 07.1 Model

```
BASELINE FORECAST (stored with a 'baseline' property)                              REQ 8
   ↓
ACTUAL VALUES (e.g. calls actually received)                                        REQ 3; SPEECH 6
   ↓
DEVIATION observed over several 15-min periods (e.g. 4 = 1 hour)                    REQ 3.3 ("eg: 4 15m periods"); PDF p.9; SPEECH 6
   ↓
THRESHOLD — calculated, not user-set; must consider a minimum call value             REQ 3.1, 3.4; PDF p.9 ("percentile differences… past 8 weeks"); SPEECH 6 ("average error… past 8 weeks… nightly run")
   ↓
CONDITIONS — same day (account timezone); not (ultra-)low-volume queue;              REQ 1, 3.2; SPEECH 6 / PDF p.9 (caps)
             ≥ 1 hour since last run; ≤ 2 runs per day per queue
   ↓
ANOMALY → REFORECAST (different method from baseline;                                REQ 4; SPEECH 6 (multiplication factor)
             described as rest-of-day × factor)
   ↓
NEW FORECAST replaces the displayed forecast                                        REQ 7
   ↓
FORECAST page · SCHEDULE page (scheduler part TBD) · INSIGHTS page · REPORTING       REQ 7.1–7.4
   + SCHEDULING SIMULATION triggered                                                 REQ 9
   ↓
USER ACTION (staffing decision)                                                     REQ user story
```

### 07.2 Parameter table

| Parameter | REQ (Level 1) | PDF p.9 (Level 4) | SPEECH (Level 5) | Status |
|---|---|---|---|---|
| Monitoring interval | "At least runs every 30m" (ambiguous: the check, or the reforecast) | Every 30 minutes the system checks | Every 30 minutes | Reconcilable as *monitoring every 30 min*. Publishable with that wording. |
| Periods compared | "Over several periods… e.g. 4 15m periods" (example) | Past 4 quarter intervals (1 hour) | Past 4 quarter intervals | Consistent; REQ marks it as an example. Publish as "about an hour of 15-minute periods". |
| Threshold logic | To be defined in the epic; must account for minimum calls; mixed low/normal periods to be figured out | Nightly run; percentile differences; past 8 weeks | Nightly run; average error; past 8 weeks | Not in Level 1. "Percentile" vs "average" differ. Publish only as "a calculated threshold derived from recent history" unless João confirms. |
| Historical reference | — | 8 weeks | 8 weeks | Level 4/5 only. Needs confirmation. |
| Minimum data / volume | Minimum call value; no (ultra-)low-volume queues | — | — | Documented in REQ only; **absent from the current case study**. Should be added (it is a design-relevant constraint: the feature is silent on some queues). |
| Maximum frequency | "Can be executed more than one time a day" | Maximum 2 per day per queue | Maximum 2 | Cap is Level 4/5. Needs confirmation. |
| Minimum interval | — | ≥ 1 hour before restart | ≥ 1 hour | Level 4/5. Needs confirmation. |
| Same-day constraint | Yes; day defined by account timezone | Timeline 00:00–23:59 | — | Documented. **Prototype data contradicts it** (issue "Sun Apr 4 11:54 PM → Mon Apr 5 Running", PDF p.18). |
| Account timezone | Yes | Team schedule shows "New York" selector | — | Documented. The timezone selector is existing product UI. |
| Baseline forecast property | Yes; used to measure accuracy | — | — | Documented; enables the comparison feature. |
| Intraday method | Different algorithms from normal forecast; +10% accuracy target | "Multiplies the forecasts for the day by a factor" | Same | Level 4/5 describes a scaling method; REQ only demands difference. Publish as "a different, lighter method". |
| Reporting | Values sent to reporting | — | — | Backend; mention once. |
| Scheduling simulation | Reforecast triggers a simulation; performance out of scope | — | — | Documented; **not represented in the case study**. |
| Queue-level configuration | Customer has *no* configuration; feature flag for selected customers; later self-serve | "Turn on reforecast" per queue | Per-queue toggle | **Discrepancy** (see §14). |
| Latest run time | "Could": show latest baseline / intraday run time | "Updated today at 12:00 PM" header | — | Plausibly the "Could" item; interpretation. |

### 07.3 Monitoring versus execution (must be explicit)

- **Monitoring** is periodic and continuous across the day: every 30 minutes (REQ 2; PDF p.9; SPEECH 6).
- **Reforecast execution** is conditional (threshold, several periods, minimum volume, not low-volume, same day) and, per Level 4/5, capped (≤ 2/day/queue; ≥ 1 hour apart).
- Therefore the phrases "continuously updates forecasts" (PDF p.2), "consistently updates" (PDF p.2), "continuous reforecasting flow running 24/7" (SPEECH 2) and "this process takes place continuously throughout the 24 hours" (PDF p.9) are **imprecise**. The *check* is continuous; the *reforecast* is exceptional by design. SPEECH 3 itself makes this point ("they can't just reforecast every hour… They needed a system that knows when a reforecast is actually necessary").

Recommended wording: "The system checks every 30 minutes. It reforecasts only when the deviation is large enough, for long enough, on a queue with enough volume — and not more than a couple of times a day."

### 07.4 Unresolved logic questions

- Which signals trigger detection: contact volume only (all documented issue texts are CVO) or also AHT? The forecast and insights charts show AHT; REQ says "real and forecast" generically.
- Does the triggered scheduling simulation produce visible output to the planner (REQ 9)? The schedule highlight in PDF p.19 marks the anomaly period; it does not show a re-simulated schedule.
- Severity tiers: Critical / Major / Minor map in the prototype to 40%/6 periods, 20%/4 periods, 10%/2 periods (PDF p.18). No source defines the rule. Classify as DESIGN EXPLORATION unless confirmed.
- "Preview" (notification and banner chip): behaviour not shown anywhere. SPEECH 11 says "users can preview which queues are affected". Classify as DESIGN DECISION with undocumented behaviour.

---

## 08. Core design tensions

| Tension | Evidence for | Evidence against / limits | Primary? |
|---|---|---|---|
| **A. Automation vs control** | REQ note (mitigation; not every day; automation vs on-demand); REQ 5–6 (no customer configuration; feature flag); PDF p.10 toggle; SPEECH 3, 10, 21 | The "manual workflow" SPEECH 21 claims was designed is not visible anywhere. The prototype resolves the tension by *per-queue opt-in to automation*, not by a manual trigger. | **Yes** — it is the origin of Decision 1 |
| **B. System complexity vs user simplicity** | REQ 3 (threshold, periods, minimum volume, low-volume rules); PDF p.9; PDF p.10 single checkbox; SPEECH 10, 21 ("hide complexity… more backend logic but simpler UX") | The simplicity was partly *required* (REQ 5: customer has no configuration). The designer's contribution was to give the customer exactly one control rather than zero — or many. | **Yes**, folded into Decision 1 |
| **C. System change vs user awareness** | REQ 7 (three surfaces); PDF p.11–15; SPEECH 11–14 ("might be working in different parts of the system"; "suddenly the numbers change… the banner explains") | — | **Yes** — Decision 2 |
| **D. Detection vs understanding** | "Anomaly detected" tells the planner nothing about consequence; PDF p.16–19 supply the understanding (comparison, severity, location) | — | **Yes** — Decision 3 |
| **E. Understanding vs action** | Notification copy "Check updated data to solve possible issues"; "Check forecast" / "Check insights" links; SPEECH 20 (jump to affected periods) | The *action itself* (adjust schedule) is outside the designed screens; the design ends at pointing to the place. | Secondary — fold into Decision 3 as its last beat |
| **F. Current vs previous forecast** | PDF p.16–17; REQ 8 makes it possible; SPEECH 18 (magnitude, trust) | SPEECH 18's "pattern recognition" and "predict future anomalies" are speculative benefits, not evidence | Secondary — it is the *mechanism* of D, not a separate tension |

Recommendation: structure the case study on **three tensions** — A+B (how much does the customer control?), C (how does the planner find out?), D+E+F (how does the planner understand and act?). Six tensions in the visitor's path would dilute the story.

---

## 09. Design decision audit

Legend for CONFIDENCE: High = decision visible in the prototype and consistent across sources; Medium = visible but rationale only in SPEECH; Low = visible in one place with inconsistencies.

| # | Decision | Problem | Evidence | Design question | Rationale (class) | Trade-off | Expected value | Validation | Conf. | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| D1 | Queue-level activation | Not every customer wants automatic reforecasting; not every queue needs it | REQ note; REQ 3.2 (low-volume queues excluded anyway) | At what granularity does the customer decide? | Queue is the unit of forecasting and of the anomaly ("affected queues") — SUPPORTED DESIGN INTERPRETATION; SPEECH 10 states it | Granular control vs more places to configure | Automation only where wanted | None documented beyond prototype feedback (unquantified) | High | PDF p.10; SPEECH 10 |
| D2 | "Turn on reforecast" as the *only* control, inside the existing queue configuration form | Thresholds, periods, history and caps are complex; REQ says the customer has no configuration | REQ 3, 5, 6; PDF p.9 | What is the minimum the customer must decide? | Complexity stays in the system; the customer decides *whether*, not *how* — SUPPORTED DESIGN INTERPRETATION; SPEECH 10, 21 | No tuning by expert customers | Low setup cost; fewer misconfigurations | Not documented | High | PDF p.10 |
| D3 | Anomaly detection surfaced as an explicit event ("Anomaly detected") rather than a silent update | A forecast that changes silently confuses the planner | SPEECH 13 ("suddenly the numbers change… you'd be confused") | Should the system announce that it is about to change something? | Announce start and end — DESIGN DECISION | More notifications | Trust; no silent data change | Not documented | High | PDF p.11, 15 |
| D4 | Notification centre message with "Preview" | Planner may be anywhere in the product | SPEECH 11 | Where does the planner first learn of the change? | The centre is reachable from everywhere — DESIGN DECISION | Notifications can be missed (SPEECH 13 admits it) | Reach | Not documented | High (message) / Low (Preview behaviour) | PDF p.11 |
| D5 | Cross-surface banners (Forecast, Team schedule, Insights) | REQ 7 propagates the new forecast to exactly those surfaces | REQ 7; PDF p.13 | Where must the explanation live? | Where the numbers change — SUPPORTED DESIGN INTERPRETATION; SPEECH 13 | Screen real estate; repeated messaging | In-context explanation | Not documented | High | PDF p.12–14 |
| D6 | "Apply filter" → affected queues | Multi-queue accounts; anomaly is per queue | PDF p.12–14; SPEECH 11, 13 | How does the planner narrow to what changed? | Filter the current view rather than navigate away — DESIGN DECISION | — | Speed | Not documented | High | PDF p.13 |
| D7 | "Reforecast in progress" as a distinct state | The reforecast takes time; the displayed forecast is about to change | PDF p.9 (hourglass icon); PDF p.11–14 | Should the planner see an intermediate state? | Yes: the system is mid-change — DESIGN DECISION | — | Prevents acting on stale numbers | Not documented | High | PDF p.11–14 |
| D8 | "Reforecast completed — Check updated data to solve possible issues" | Completion alone does not prompt action | SPEECH 15 ("we're prompting action") | What should the completion message ask for? | Language that directs — DESIGN DECISION | — | Faster resolution | Not documented | High | PDF p.15 |
| D9 | "N issues found" in the Forecast header, linking to the issues page | Planner needs a summary and a way in | PDF p.14, 16, 18 | Where does the count of problems live? | Header, next to "Updated today at…" — DESIGN DECISION | — | Urgency + entry point | Not documented | High | PDF p.16, 18 |
| D10 | "Show previous forecast" overlay | The new forecast replaces the old (REQ 7); the planner cannot judge magnitude without the old one | REQ 8 (baseline stored); PDF p.16–17; SPEECH 18 | How does the planner judge the size of the change? | Overlay dotted previous series on the same chart — DESIGN DECISION | Visual density | Magnitude and trust | Not documented | High | PDF p.17 |
| D11 | Forecasting issues log (trigger time, end time, queue, severity, description, "Check forecast") | Multiple events across queues and days | PDF p.18; SPEECH 18 | How does the planner review what happened? | A record per event with cause expressed as "% higher for N periods" — DESIGN DECISION | A page to maintain | Transparency; history | Not documented | High | PDF p.18 |
| D12 | Severity tiers (Critical / Major / Minor) | Not all deviations are equal | PDF p.18 | How does the planner prioritise? | By magnitude and duration — DESIGN EXPLORATION (rule undefined) | Possible false precision | Prioritisation | Not documented | Medium | PDF p.18 |
| D13 | Anomaly location highlighted on the forecast chart and schedule timeline | Knowing that something changed is not knowing *where* | PDF p.19; SPEECH 20 | Where in the day did it happen? | Highlight the affected periods — DESIGN DECISION | — | Direct path to the affected slots | Not documented | High | PDF p.19 |
| D14 | Schedule connection ("jump to affected time periods") | The staffing decision happens in the schedule | SPEECH 20; PDF p.19 (highlighted columns + tooltip) | How does the planner get from forecast to schedule? | Same highlight vocabulary across both surfaces — SUPPORTED DESIGN INTERPRETATION | — | Continuity | Not documented | Medium | PDF p.19 |
| D15 | High-fidelity prototypes from the start | Limited time; need for fast, credible feedback; developers waiting | PDF p.11; SPEECH 2, 21 | How to validate quickly? | Fidelity close to the final product yields more actionable feedback and lets development start — PROJECT CONTEXT | Less divergent exploration; "speed over pixel-perfect" (SPEECH 21) | Faster validation | Self-reported | High as a strategy; unknown as an outcome | PDF p.11 |

Decisions the prompt asked about that **cannot be audited**: a manual "run reforecast now" action (claimed in SPEECH 21, absent from all screens); "push notifications" (SPEECH 21; only the in-app notification centre is shown).

---

## 10. Three strongest design decisions

Chosen on evidence, consequence, system thinking and clarity of reasoning — not visual impact.

### Decision 1 — One switch per queue is the whole configuration

- **Design question:** How much of a threshold-driven, history-dependent, capped reforecasting system should a customer configure?
- **Evidence:** REQ note (mitigation; not every customer every day; automation vs on-demand undecided); REQ 3 (threshold, periods, minimum volume, low-volume exclusion all system-defined); REQ 5–6 (no customer configuration at launch; later self-serve); PDF p.10 (single checkbox at the end of the existing queue form, with helper text "If enabled, WFM will reforecast this queue"); SPEECH 10, 21.
- **Decision:** Per-queue opt-in. Nothing else exposed.
- **Product behaviour:** The queue configuration form gains one section, "Reforecast", with one checkbox. Everything in PDF p.9 remains internal.
- **Why strongest:** It resolves tensions A and B in one move; it is traceable to Level 1; it demonstrates that the designer understood the system well enough to decide what *not* to show. It also anticipates REQ 6.1 ("later… a way for customers to turn the feature on").
- **Caveat to keep visible:** REQ says the customer has *no* configuration in the first release. Whether the toggle shipped, or shipped later, is unknown.

### Decision 2 — The change reaches the planner where they are, as a sequence of states

- **Design question:** When the system changes the forecast on its own, how does a planner working in Team schedule or Insights find out, and how do they avoid being confused by numbers that change under them?
- **Evidence:** REQ 7 (new forecast shown on Forecast, Schedule, Insights); PDF p.11–15 (notification centre messages; banners on the three surfaces; wording progression "Anomaly detected — Reforecast in progress" → "Anomaly detected — Forecast updated" → "Reforecast completed — Check updated data…"); SPEECH 11–15.
- **Decision:** Two channels (notification centre + in-page banner), three surfaces, explicit start and end states, in-place actions (Apply filter, Preview, Check insights).
- **Product behaviour:** The banner appears on whichever of the three surfaces the planner is using, persists through the reforecast, changes wording on completion, and can filter the current view to affected queues.
- **Why strongest:** It is the most complete answer in the sources to a genuinely hard problem (system-initiated change), it is grounded in Level 1 (REQ 7 defines the surfaces), and it is a *system* of states, not a single screen.

### Decision 3 — The change is inspectable and points to the next step

- **Design question:** Once the forecast has changed, how does the planner see how much it changed, where in the day, why, and what to do?
- **Evidence:** REQ 8 (baseline kept → comparison possible); PDF p.16–17 ("Show previous forecast" overlay); PDF p.18 (issues log: trigger/end time, queue, severity, "CVO is 40% higher than forecasted for 6 consecutive periods", "Check forecast"); PDF p.19 (highlighted anomaly periods on chart and schedule; tooltip "Anomaly detected in this period"); SPEECH 18–20.
- **Decision:** Comparison overlay + event log with severity + location highlighting that uses the same vocabulary on forecast and schedule.
- **Product behaviour:** From "3 issues found" → issue → "Check forecast" → highlighted period → schedule with the same period highlighted.
- **Why strongest:** It closes the loop from detection to action and turns the system's internal reasoning ("N% for N periods") into user-facing language. Severity rules are the one under-defined element and must be labelled.

**Rejected as backbone candidates:** "Prompting action through notification language" (real, but a component of Decision 2/3); "High-fidelity prototyping" (a process decision, belongs in Validation).

---

## 11. Validation analysis

| Claim | Supported by | Class | Can be stated? |
|---|---|---|---|
| Time was limited; feedback had to come quickly before development | PDF p.11; SPEECH 2 | PROJECT CONTEXT | Yes |
| High-fidelity prototypes were used deliberately to obtain prompt feedback and help developers start | PDF p.11; SPEECH 21 | DESIGN DECISION (process) | Yes |
| Resource planners were interviewed and their scenarios documented | SPEECH 4 only; PDF p.4 shows the scenarios without method | PROJECT CONTEXT (Level 5) | Only as "scenarios documented with resource planners"; do not state "interviews" as a method unless João confirms |
| The team worked closely with three companies for fast feedback | JOÃO | DESIGNER-PROVIDED CONTEXT | Yes, labelled as project context; no names, numbers, sessions |
| Feedback led to adjustments | PDF p.11 ("for validation or adjustments") — intent, not record | UNKNOWN as an outcome | No; say the prototypes were built *to allow* adjustment |
| Validation happened before development | SPEECH 2 | PROJECT CONTEXT | Yes, as intent |
| Users, sessions, usability scores, task success, time saved, adoption, production | — | UNKNOWN | **No** |

### Coherence of the two validation elements

JOÃO's three-company collaboration and the documented hi-fi prototype strategy form a coherent story *if* the prototypes were what those companies reacted to. That link is not documented. The case study may present them side by side ("hi-fi prototypes, reviewed closely with three customer companies") only with the context label, and must not describe what any company said.

---

## 12. Confidentiality audit

| Item | Where | Classification | Action |
|---|---|---|---|
| "Talkdesk" name | PDF p.2, p.3 (implicit), SPEECH throughout; screenshot label "Collect live metrics from Talkdesk Contact Center" (PDF p.10) | **REQUIRES REVIEW** — PDF p.2 states the content "is confidential and should not be disclosed without authorisation"; the repository's copy policy (`src/content/copy-audit.test.ts`) forbids "Talkdesk" in live copy; the Carpool case anonymised the employer | Default to anonymisation ("a cloud contact-centre platform's workforce-management product"). João to decide. |
| "Cobalt Design System" | PDF p.11 | SHOULD NOT BE SHOWN (proprietary name; adds nothing) | Rephrase as "the internal design system" |
| Talkdesk logo / purple product chrome | All screenshots | SHOULD NOT BE SHOWN | Reconstruct neutrally |
| "Avalon", "apollo" (team/epic codenames), "@Gennadiy Stepanov" | REQ | SHOULD NOT BE SHOWN | Never appear |
| Requirements document verbatim | REQ | REQUIRES REVIEW | Paraphrase acceptance criteria; do not reproduce the document |
| System parameters (30 min, 4 periods, 2×/day, 1 h, 8 weeks, nightly run) | PDF p.9; SPEECH | REQUIRES REVIEW — already public in the current PDF, but they describe proprietary logic | João to confirm which may be stated; fall back to qualitative wording |
| 10% accuracy target | REQ | REQUIRES REVIEW (internal KPI) | If shown, only as a target |
| Queue names "support", "sales", "campaigns" | PDF p.10, p.18 | SAFE (generic) | Replace anyway with neutral names in the reconstruction |
| Agent name "Aubrey Luna" | PDF p.14 | SAFE WITH RECONSTRUCTION (appears fictional) | Replace with obviously fictional names |
| Dates (May 3, 2022; Sun Jan 4; Apr 2–5) | PDF p.12–19 | SAFE (prototype placeholders) — but misleading (see §14) | Use one coherent fictional day |
| Issue ID "4774983753974hfh4747…" | PDF p.18 | SAFE (garbage placeholder) | Remove |
| Personal phone number and email | PDF p.20 | SHOULD NOT BE SHOWN on the website | Remove |
| Existing product UI (event types, adherence %, shrinkage, patience, SL goal) | PDF p.10–14 | SAFE WITH RECONSTRUCTION (generic WFM concepts) | Keep as neutral context |
| Kano / VPC / Empathy canvases | PDF p.6–8 | SAFE (no confidential data) but **low value and reputationally risky** (AI-generated) | Remove |
| Illustrations (telescope figure, car, mast) | PDF p.2, 3, 5 | UNKNOWN (licence not established) | Do not reuse without licence confirmation |
| Flow diagram | PDF p.9 | SAFE WITH RECONSTRUCTION | Rebuild as interaction |
| Scenario statements | PDF p.4 | SAFE (no company or person identified) | Keep; attribute generically |

---

## 13. Claims audit

| Claim | Source | Evidence type | Confidence | Safe to publish? | Recommended wording |
|---|---|---|---|---|---|
| The system continuously reforecasts / updates forecasts 24/7 | PDF p.2, p.9; SPEECH 2 | Imprecise paraphrase | Low as worded | **No** | "The system checks every 30 minutes and reforecasts only when the deviation is meaningful." |
| 30-minute monitoring | REQ 2; PDF p.9; SPEECH 6 | DOCUMENTED FACT (REQ) | High | Yes (subject to §12 review) | "Every 30 minutes" |
| Compares the past four 15-minute periods | REQ 3.3 (example); PDF p.9; SPEECH 6 | DOCUMENTED as example | Medium-High | Yes, hedged | "About an hour of recent 15-minute periods" |
| Threshold calculated from ~8 weeks of history in a nightly run | PDF p.9; SPEECH 6 | PROJECT CONTEXT (Level 4/5) | Medium | Only if confirmed | "A threshold calculated from recent history, not set by the customer" |
| Reforecast at most twice a day, at least one hour apart | PDF p.9; SPEECH 6 | PROJECT CONTEXT (Level 4/5); REQ says only "more than once" | Medium | Only if confirmed | "Capped so it cannot run repeatedly" |
| Low-volume queues are excluded; minimum call volume | REQ 3.2, 3.4 | DOCUMENTED FACT | High | Yes | "It stays silent on queues with too little volume to judge" |
| Anomaly detection triggers the reforecast | REQ 3; PDF p.9, 11 | DOCUMENTED FACT | High | Yes | — |
| Reforecast is automatic (when enabled) | PDF p.10; SPEECH 10 | DESIGN DECISION | High | Yes | "Once a queue is switched on, the system acts on its own" |
| 10% accuracy improvement | REQ 4.2 | REQUIREMENT / TARGET | High as target; **none** as result | Only as target | "The brief set a target of 10% better intraday accuracy than the original forecast. Whether it was met is not something I can report." |
| Improved staffing decisions | REQ user story; PDF p.15; SPEECH 15 | DESIGN INTENT | — | Only as intent | "Designed to support the staffing decision" |
| Customer feedback shaped the design | PDF p.11 (intent); JOÃO | PROJECT CONTEXT | Medium | As process, not outcome | "Prototypes were reviewed with customers to catch problems before development" |
| Three-company collaboration | JOÃO | DESIGNER-PROVIDED CONTEXT | — | Yes, labelled | "Reviewed closely with three customer companies" — no names, no counts |
| Resource planners were interviewed | SPEECH 4 | PROJECT CONTEXT (Level 5) | Medium | Hedged | "Scenarios documented with resource planners" |
| High-fidelity prototyping as strategy | PDF p.11; SPEECH 21 | DESIGN DECISION | High | Yes | — |
| Development readiness | PDF p.11; SPEECH 2, 21 | PROJECT CONTEXT (intent) | Medium | As intent | "so development could start from something concrete" |
| Product impact / shipped / adopted | — | UNKNOWN | — | **No** | — |
| Business impact | — | UNKNOWN | — | **No** | — |
| Pattern recognition / predicting future anomalies from history | PDF p.17–18; SPEECH 18 | Speculative benefit | Low | Only as *possibility*, not claim | "The log also leaves a record that planners could read for recurring patterns" |
| "We designed both automated and manual workflows" | SPEECH 21 | Unsupported by screens | Low | **No** unless a manual trigger is shown | — |
| "Push notifications" | SPEECH 21 | Unsupported | Low | **No** | "In-app notification" |
| Kano/VPC/Empathy as research | PDF p.6–8 | AI-generated exploration | — | **No** | Remove or one labelled sentence |

---

## 14. Source discrepancies and open questions

| # | Topic | Source A (higher) | Source B (lower) | What differs | Reconcilable? | Needs confirmation |
|---|---|---|---|---|---|---|
| 1 | Monitoring frequency | REQ 2: "at least runs every 30m" | PDF p.9 / SPEECH: checks every 30 min | REQ's "runs" is ambiguous (check or reforecast) | Yes — read as monitoring cadence | — |
| 2 | Reforecast frequency | REQ 10: "more than one time a day" | PDF p.9 / SPEECH: max 2/day/queue | Cap not in REQ | Yes, if the cap was set in the epic | Was the 2×/day cap final? |
| 3 | Minimum interval | REQ: silent | PDF p.9 / SPEECH: ≥ 1 hour | Not in REQ | Same as above | Was the 1-hour gap final? |
| 4 | Threshold methodology | REQ 3.1: to be defined; must consider minimum calls | PDF p.9: "percentile differences… past 8 weeks"; SPEECH: "average error… past 8 weeks" | Percentile vs average; both post-REQ | Partially — both agree on 8 weeks and nightly | Which description is correct, and may it be published? |
| 5 | Low-volume behaviour | REQ 3.2, 3.4, 3.5 | PDF/SPEECH: silent | Constraint omitted from the case study | Yes — add it | — |
| 6 | Customer configuration | REQ 5–6: none at launch; feature flag; later self-serve | PDF p.10 / SPEECH: per-queue toggle | The design includes what REQ defers | Yes, if the design targets REQ 6.1 or the requirement changed | Did the toggle ship in the first release? |
| 7 | Manual control | REQ note: research needed on automation vs on-demand | SPEECH 21: "designed both automated and manual workflows"; PDF: no manual trigger | Claim without artefact | No | Was a manual "reforecast now" designed? |
| 8 | Accuracy target | REQ 4.2: improve by 10% | PDF/SPEECH: not mentioned | Silence | Yes — treat as target | Was accuracy measured? |
| 9 | Production status | — | — | Unknown everywhere | — | Did it ship? When? |
| 10 | Validation method | REQ note: research needed (future) | SPEECH 4: "we interviewed resource planners"; JOÃO: three companies | REQ predates; SPEECH asserts; JOÃO adds | Yes, as a sequence, if confirmed | Who took part, how, when? |
| 11 | Dates in prototype | Project: Q2 2023 | Screens: May 3, 2022 header; Sun Jan 4 table; Apr 2–5 issues | Inconsistent placeholder dates | Yes — placeholders | None; use a coherent fictional day |
| 12 | Same-day constraint vs prototype data | REQ 1: same day only | PDF p.18: "Sun Apr 4 11:54 PM → Mon Apr 5 Running" | Event crosses midnight | No (prototype inconsistency) | Fix in reconstruction |
| 13 | Banner wording | PDF p.12–14: "Anomaly detected" | PDF p.19: "Surge detected… on support queue" | Two vocabularies | Possibly an iteration | Which was final? |
| 14 | Detection signal | REQ 3: "real and forecast" | PDF p.18: all issues are CVO | AHT as trigger unknown | — | Does AHT deviation trigger? |
| 15 | Notification layers | PDF: notification centre + banners | SPEECH 21: "push notifications, banners, in-context alerts" | "Push" unsupported | No | Was there push/email? |
| 16 | Scheduling simulation | REQ 9: reforecast triggers simulation | PDF/SPEECH: not shown | Behaviour absent from case | — | What did the planner see in the schedule after a reforecast? |
| 17 | "Issues found" during "in progress" | PDF p.14: banner in progress *and* "3 issues found" | PDF p.18: issues are historical events | Not contradictory if issues = history | Yes | Confirm the count is historical events |
| 18 | Issue period count vs check window | SPEECH 6: 4 periods checked | PDF p.18: "6 consecutive periods" | Detection window vs event duration | Yes (duration can exceed window) | — |
| 19 | Prototype data | — | PDF p.16: "20 contacts / 20 s / 20 h" | Placeholder values | — | None; replace |
| 20 | Interviews vs canvases | SPEECH 4: interviews | PDF p.6–8: ChatGPT-generated canvases with empty SAY quadrant | The only "research artefacts" shown contain no user data | — | Were there notes or recordings from real sessions? |

---

## 15. Current PDF audit (20 pages)

| Page | Current purpose | Content | Claims | Evidence | Narrative role | Works | Does not | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | Cover | Title, "A case by João Leite — Digital Product Designer", abstract shapes | — | — | Open | Typographic confidence | Decorative blobs; no thesis | **REWRITE** as cover with thesis + disclosure |
| 2 | About | Four columns: "consistently updates forecasts based on real values"; "intricate configurations, anomaly detection, seamless continuous reforecasting flow"; "threshold calculation, reforecasting process, factors"; Q2 2023 at Talkdesk; confidentiality notice | Continuous updating | Generic | Orient | Dates the project | "Continuous" is imprecise; four columns of abstract nouns; illustration | **REMOVE**; fold role/time/confidentiality into cover meta |
| 3 | Problem | User story verbatim + REQ note verbatim | — | REQ (Level 1) | Setup | Faithful to Level 1; the note is the seed of Decision 1 | Presented as a slogan; the note's significance is not drawn out | **KEEP content, REWRITE framing** as "the brief and its open question" |
| 4 | Scenarios + factors | Five yellow scenario cards; five red factor cards | Implicit: these are user statements | USER EVIDENCE, provenance unknown | Evidence | Real planner language | Tiny cards; no structure; demand vs capacity not distinguished | **KEEP + MAKE INTERACTIVE** (scenario selector) |
| 5 | Divider | "Understanding processes and dependencies" + illustration | — | — | Pace | — | Empty page | **REMOVE** |
| 6 | Kano | ChatGPT-generated canvas with disclaimer | Implicit: research | None (AI hypothesis) | Process theatre | — | Unreadable; AI provenance; no insight | **REMOVE** |
| 7 | VPC | ChatGPT-generated canvas with disclaimer | Implicit: research | None | Process theatre | — | Same | **REMOVE** |
| 8 | Empathy map | ChatGPT-generated; SAY quadrant empty | Implicit: research | None | Process theatre | — | Same; empty quadrant undermines it | **REMOVE** |
| 9 | Reforecasting flow | Timeline diagram (30-min checks, triggers, hourglass, 2/day), "how is the reforecast calculated", "when are thresholds calculated", 8-week bars | 30 min; 4 periods; ≥ 1 h; ≤ 2/day; 24 h; factor; nightly; 8 weeks; percentiles | Level 4/5 | System | The strongest explanatory page | Too small; too dense; no distinction between monitoring and execution; caps unconfirmed | **KEEP + MAKE INTERACTIVE** (detection simulation) |
| 10 | Configuration | Queue form ("support"), highlighted "Reforecast — Turn on reforecast" section; "Don't rush. Here's the first step" | Per-queue activation | PDF (Level 4) | Decision 1 | The one-checkbox moment is clear | Talkdesk chrome; copy explains the toggle but not *why* it is the only control | **KEEP + REWRITE copy + RECONSTRUCT UI** |
| 11 | Part I — notification | Hi-fi rationale; notification "Anomaly detected — Reforecast in progress in the affected queues — Preview"; panel over Configurations | Hi-fi strategy; "everything starts with a simple notification" | PDF p.11 | Decision 2 (a) | Hi-fi rationale is honest | Rationale is buried under "So, how we solved it?"; the notification's background page is arbitrary | **KEEP notification; MOVE hi-fi rationale to Validation; RECONSTRUCT** |
| 12 | Notification → Insights | Panel → Insights with banner "Anomaly detected — Reforecast in progress — Apply filter — Preview" | Banner in context | PDF | Decision 2 (b) | Shows the path | Repeats 11; date May 3, 2022 | **COMBINE** with 13–14 into one interactive |
| 13 | Banner messages | Four bullets; two banner variants (with/without "Check insights") | Real-time status; affected queues; three surfaces | PDF; REQ 7 | Decision 2 (c) | Lists the surfaces | Text-heavy; the strongest reason (REQ 7) is absent | **REWRITE** as one line + interaction |
| 14 | Three stacked screens | Insights, Team schedule (New York; 10 agents; adherence), Forecast ("3 issues found") — all with banner | Consistency across surfaces | PDF | Decision 2 (d) | Demonstrates consistency | Stacked screenshots are unreadable; repeats | **MAKE INTERACTIVE** (surface switcher) |
| 15 | Part II — completed | Bullets; notification "Reforecast completed — Check updated data to solve possible issues"; background banner "Forecast updated" | Completion prompts action | PDF | Decision 2→3 | State language is a real decision | Bullets are generic ("enabling resource planners to make informed…") | **KEEP notification; REWRITE bullets to one sentence** |
| 16 | Notification → Forecast | Forecast page; "Show previous forecast" off; table with 20/20/20 placeholders | — | PDF | Decision 3 (a) | Entry state for comparison | Placeholder data; repeats 12's pattern | **COMBINE** with 17 |
| 17 | Part III — previous forecast | "More data is never a downside."; four bullets (foresee anomalies; spot patterns; identify early; comparative analysis); toggle off→on; dotted previous series | Pattern recognition; predicting anomalies | PDF + SPEECH 18 | Decision 3 (b) | The overlay is a genuine before/after **of state** | Headline over-claims; bullets are speculative benefits | **KEEP toggle + MAKE INTERACTIVE; REMOVE headline and bullets** |
| 18 | Forecasting issues | "3 issues found" → issues page; 3 events (Critical/Major/Minor; % / periods; queues; Check forecast); caption "Ability to access records of past forecasts, enabling users to predict patterns" | Transparency; pattern prediction | PDF | Decision 3 (c) | The issue description format is excellent design evidence | Garbage ID; midnight-crossing event; "predict patterns" over-claim; severity rule undefined | **KEEP + RECONSTRUCT + MAKE INTERACTIVE** (issue → location) |
| 19 | Part IV — clear path | Schedule with highlighted 9–11 PM columns and tooltip; Forecast with "Surge detected… on support queue" and highlighted 03–04 band; four bullets | Swift, informed action; service level goals | PDF + SPEECH 20 | Decision 3 (d) | Location highlighting is a strong decision | Bullets are generic; "Surge" vs "Anomaly" inconsistency; highlighted times differ between screens | **KEEP highlighting + MAKE INTERACTIVE; REMOVE bullets** |
| 20 | Thank you | Title; email; phone | — | — | Close | — | Not a web ending; personal phone | **REMOVE**; replace with outcome + reflection |

**Net effect:** 20 pages → roughly 10 web sections, of which 5 are interactive.

---

## 16. Current implementation audit (Source E)

### 16.1 State of the repository for this case study

- **Route:** none. There is no Intraday Reforecasting page, content, component or asset in `main`. Search for "intraday", "reforecast", "Woodland", "Schibsted" returns nothing except a policy test forbidding "Talkdesk" in live copy.
- **Consequence:** this is a *reconstruction from zero inside an existing system*, not a redesign of an existing page. Everything below describes the system the case study would enter.

### 16.2 Architecture (as found)

| Aspect | Finding | Relevance |
|---|---|---|
| Framework | Next.js 16.2.9 (App Router, `src/app/[lang]/…`), React 19.2, TypeScript, Tailwind v4 via PostCSS, framer-motion 12, vitest | Read `node_modules/next/dist/docs/` before implementation (repo rule) |
| Localisation | `pt` / `en` segments; `HOME_PATH`, `STUDIO_PATH`, `PROJECT_PATH`, `CARPOOL_PATH` in `src/lib/i18n.ts`; `next.config.ts` redirects mismatched language/slug pairs | A new `INTRADAY_PATH` (e.g. `/en/work/intraday-reforecasting`, `/pt/trabalho/…`) would follow the same pattern |
| Case-study precedent | Carpool: `src/app/[lang]/work/carpool/page.tsx` + `trabalho/carpool/page.tsx`; `src/components/carpool/{CarpoolCaseStudy,CarpoolInteractive,CarpoolSnapshot}.tsx`; `src/content/carpool/{types,en,pt,index}.ts`; `docs/carpool-*.md` | **Direct template.** The Carpool page already implements: evidence labels (`research / context / inference / reconstruction / exploration`), a disclosure line, section kicker + statement pattern, reduced-motion handling, `aria-pressed` / `role="tablist"` / `aria-live` patterns, range-input scrubbers with `aria-valuetext`, and a "Research snapshot" evidence map |
| Home | `src/data/projects.ts` lists published work by `kind: "product" | "graphic"`; `ProjectGrid.tsx` renders rows with an "open" action | Adding the case = one entry with `href` |
| Shell | `PublicShell` (fixed transparent header, bear logo, theme toggle, plus/cross nav, footer with language switch) | Reuse as-is |
| Typography | **Nudica only** (`src/lib/fonts.ts`: 400 / 400 italic / 500 / 700). Type scale in `globals.css` (`.type-display`, `.type-heading`, `.type-lede`, `.type-corpo`, `.type-project`, `.type-nota`, `.type-label`, `.type-meta`, `.type-italic`) with explicit comment: "Personality comes from weight, scale, width, italic, spacing, and rhythm — not from a second family." | **The PDF's PP Woodland + Schibsted Grotesk pairing does not exist in the site and contradicts a deliberate site decision.** See the visual-direction note in §21 |
| Colour | Off-white surface `#faf9f6`, ink `#1a1a1a`, secondary `#63605a`, accent yellow `#ffff50` (explicitly not usable as focus ring), four tile tones; dark mode variants | The PDF's purple / lilac / cream palette is not in the system |
| Layout | `.site-container` 720 px; `.site-container--wide` 1080 px; gutters `clamp(1.5rem, 5vw, 4rem)` | Reconstructed product UI will need the wide container and mobile stacking |
| Motion | CSS `rise` / `reveal-line` reveals; `prefers-reduced-motion: reduce` collapses all animation; framer-motion springs in grid and links | Motion budget is already restrained; the case must stay inside it |
| Accessibility | Skip link; `:focus-visible` outline; 44 px targets; `sr-only`; ARIA patterns in Carpool interactives | Good baseline |
| Content policy | `copy-audit.test.ts`: no em dashes, European Portuguese, pre-1990 spelling in live copy, **no client names as credentials (BMW, Mercedes, Talkdesk, …)**, no first person in studio copy, no agency clichés | The test only scans `dict` and `project-flow`; Carpool content is not scanned. The next phase should extend it to case content |
| CSS organisation | Single `globals.css` (2,366 lines) with `carpool-*` prefixed blocks (~35 rules) | A second case will double this; a `case-*` shared layer would be a reasonable refactor suggestion (not for this phase) |
| Docs | `docs/carpool-*.md` (research analysis, final architecture, blueprint, snapshot evidence map, evidence audit) | This document follows that lineage |

### 16.3 Classification

| Category | Items |
|---|---|
| MISSING | Everything specific to Intraday Reforecasting: route, content model, components, reconstructed UI, charts, diagrams |
| OUTDATED | `docs/superpowers/*` (April 2026 spec for a previous site incarnation with Instrument Serif/Inter, 3D bear, circular gallery) — historical, not current |
| INCORRECT | None for this case (nothing exists) |
| REDUNDANT | None |
| REUSABLE | `PublicShell`, `RevealTitle`, type classes, `Section`/`Statement` pattern, evidence `Chip`/`EvidenceLegend`, `Frame`, reduced-motion hooks, ARIA patterns, i18n path pattern, `projects.ts` entry, redirects pattern |
| RECONSTRUCTION REQUIRED | Neutral WFM UI: queue configuration form, notification centre, banner component, forecast chart with overlay and highlight, schedule timeline with highlight, issues table; a detection simulation; a scenario selector |

---

## 17. Evidence matrix

| Problem | Evidence | Insight | Design question | Design decision | Product behaviour | Validation | Presentation |
|---|---|---|---|---|---|---|---|
| Not all customers want automatic reforecasting; the system's logic is complex | REQ note; REQ 3, 5, 6; PDF p.9 | Control over *whether* matters; *how* can stay internal | How much does the customer configure, and at what level? | **D1+D2**: one per-queue checkbox | "Reforecast — Turn on reforecast" in the queue form | Prototype feedback (unquantified) — **gap** | Reconstructed config screen; the checkbox as the whole configuration |
| The forecast can change while the planner is elsewhere | REQ 7; SPEECH 13 | Awareness must exist on every surface where the numbers change | How does the planner find out, and avoid confusion? | **D3–D7**: notification + banners on three surfaces with start/end states and filters | Notification "Anomaly detected…"; banner persists; "Apply filter"; "Preview"; "Check insights" | Unquantified — **gap** | Neutral environment where state changes; surface switcher |
| Completion alone does not prompt action | SPEECH 15 | Language should direct | What does the completion message ask for? | **D8+D9**: "Check updated data to solve possible issues"; "N issues found" | Header count links to issues | — gap | Reconstructed states |
| The new forecast replaces the old; magnitude is invisible | REQ 7, 8; SPEECH 18 | Because the baseline is kept, comparison is possible | How does the planner judge the size of the change? | **D10**: "Show previous forecast" | Dotted previous series | — gap | Toggle interaction (genuine documented before/after of state) |
| Multiple events across queues need review and priority | PDF p.18 | Events can be described as magnitude × duration | How does the planner review and prioritise? | **D11+D12**: issues log with severity | List with "Check forecast" | — gap; severity rule undefined | Reconstructed table; issue selection |
| Knowing *that* is not knowing *where* | PDF p.19; SPEECH 20 | Location on the day is the bridge to the schedule | Where did it happen and how do I get to the schedule? | **D13+D14**: highlighted periods on chart and schedule | Same highlight on both surfaces | — gap | Follow-through interaction |
| Limited time; developers waiting | PDF p.11; SPEECH 2 | Fidelity buys faster, more actionable feedback | How to validate quickly? | **D15**: hi-fi from the start; close customer review (JOÃO) | — | Self-reported process | Validation section with labels |

Gaps are real: **no decision has documented validation beyond the prototype-review intent.** The case study must say so.

---

## 18. Evidence-to-experience matrix

| Section | Visitor question | Evidence | Content | Interaction | Reconstructed UI | Decision | Validation | Learning |
|---|---|---|---|---|---|---|---|---|
| 00 Cover | What is this and why should I care? | — | Title, thesis, meta, disclosure, legend | None | None | — | — | The frame of the story |
| 01 Context | What does a resource planner do; what is a forecast for? | REQ user story; screens | Forecast → staffing → schedule in three sentences; the product (anonymised) | None | Small neutral diagram | — | — | Vocabulary |
| 02 The day diverges | What goes wrong during a day? | PDF p.4; SPEECH 4–5 | Scenario text in planner voice | **Scenario selector** (volume / handle time / capacity) | Illustrative day chart | — | — | Different causes, same question; which the system sees |
| 03 The brief | What was asked, and what was left open? | REQ | User story; the note; the constraints (same day, threshold, low volume, no configuration, three surfaces, 10% target) | Progressive disclosure of constraints | None | — | — | The seed of the tensions |
| 04 What had to be understood | How does the system decide? | REQ 2–4; PDF p.9; SPEECH 6 | Monitoring vs execution; caps; what stays internal | **Detection simulation** (scrub the day; sub-threshold vs trigger; caps) | Schematic, not product UI | — | — | Complex system ≠ complex UX |
| 05 Tensions → questions | What made this hard to design? | §08 | Three tensions → three questions | None (typographic) | None | — | — | The structure of what follows |
| 06 Decision 1 | How much does a customer configure? | REQ note, 5–6; PDF p.10 | One checkbox | Toggle on → caption | **Queue configuration** | D1, D2 | Labelled gap | Deciding what not to show |
| 07 Decision 2 | How does the planner find out? | REQ 7; PDF p.11–15 | States and surfaces | **State change in context** (advance state; switch surface; apply filter) | **Notification centre; banner; Forecast / Team schedule / Insights shells** | D3–D8 | Labelled gap | Awareness as a system of states |
| 08 Decision 3 | How does the planner understand and act? | REQ 8; PDF p.16–19 | Comparison, issues, location | **Previous vs new toggle**; **issue → location** | **Forecast chart with overlay and highlight; Issues table; Schedule timeline with highlight** | D9–D14 | Labelled gap; severity labelled exploration | Inspectability closes the loop |
| 09 Validation | How was this checked? | PDF p.11; SPEECH 2, 21; JOÃO | Hi-fi prototypes; time pressure; three companies (context label); what is not claimed | None | None | D15 | This *is* the section | Honest validation |
| 10 Outcome & reflection | What came of it; what remains unknown? | §26 | Design outcome; target vs result; unknowns | None | None | — | — | The designer's contribution, bounded |

---

## 19. Narrative hypotheses (three theses)

### Thesis A — "The challenge wasn't recalculating the forecast. It was making meaningful change understandable and actionable."

- Explains: Decisions 2 and 3 completely; the designer/engineering boundary (REQ 3.1, 4, 9.1).
- Evidence: REQ assigns recalculation to the epic; PDF p.11–19 are entirely about communication and inspection.
- Leaves out: Decision 1 (configuration) and the automation-vs-control note.
- Assumes: that "understandable and actionable" is the designer's territory — supported.

### Thesis B — "Reality changes. The forecast needs to change with it."

- Explains: the product proposition and the scenarios.
- Evidence: PDF p.4; REQ user story.
- Leaves out: everything the designer did. This is the *feature's* thesis, not the *design's*.
- Assumes nothing — which is the problem; it is a slogan.

### Thesis C — "The system could detect change automatically, but the experience needed to make that change understandable."

- Explains: the detection/understanding split (tension D).
- Evidence: same as A.
- Leaves out: action, and configuration.
- Assumes: the same as A.

### Recommended thesis (A, extended to include Decision 1)

> The system could decide on its own to change the forecast. The design's job was to make that change reach the planner where they were working, make it inspectable against what it replaced, and make the next step obvious — while asking the customer to configure exactly one thing.

It covers all three decisions, keeps the engineering boundary honest, and contains no claim that needs evidence the sources lack.

---

## 20. Recommended narrative

Context → the day diverges → the brief and its open question → what had to be understood (system) → three tensions, three questions → one switch → the change reaches the planner → the change can be inspected and acted on → how it was checked → what came of it, and what is not known.

Each section ends by making the next one necessary:

- Context ends with "the forecast is a plan for a day that has not happened yet" → the day diverges.
- Scenarios end with "the planner's question is always about the rest of the day" → the brief asks for a rest-of-day reforecast.
- The brief ends with the note ("not all customers want this every day") and the constraint "no customer configuration" → how does the system decide, then?
- The system section ends with "none of this is visible to the planner" → what should be?
- Tensions end with three questions → three decisions.
- Decision 1 ends with "once switched on, the system acts alone" → how does the planner find out?
- Decision 2 ends with "Check updated data to solve possible issues" → what does the planner see?
- Decision 3 ends with the schedule highlight → was this right? → validation.
- Validation ends with what could and could not be verified → outcome bounded by evidence.

---

## 21. Recommended case-study architecture

For every section: name · purpose · question · content · evidence · interaction · visual form · why it exists.

| # | Section | Purpose | Question answered | Content | Evidence | Interaction | Visual form | Why it exists |
|---|---|---|---|---|---|---|---|---|
| 00 | Cover | Frame | What is this? | Title; thesis (one sentence); meta "Product design · Workforce management · 2023"; disclosure (anonymised, reconstructed); evidence legend | — | None | Typographic; generous space | Sets the honesty contract |
| 01 | A plan for a day that has not happened | Orient | What is an intraday forecast for? | Forecast → required staff → schedule; the WFM product in one paragraph; who the planner is | REQ; screens | None | Small three-node diagram | Visitors do not know WFM |
| 02 | The day diverges | Evidence | What actually goes wrong? | Scenario text in planner voice; demand vs capacity | PDF p.4; SPEECH 4–5 | Scenario selector | Illustrative day chart + quoted scenario | The human reason the feature exists |
| 03 | The brief, and the question it left open | Setup | What was asked? | User story; the mitigation note; constraints list | REQ | Progressive disclosure (constraints reveal one by one) | Typographic list with evidence chips | Level 1 grounding; seeds Decision 1 |
| 04 | What the system does before anyone sees anything | System | How does it decide? | Monitoring vs execution; threshold; several periods; minimum volume; caps; rest-of-day method; what stays internal | REQ 2–4; PDF p.9; SPEECH 6 | Detection simulation | Schematic timeline; annotation layer | The designer had to understand this to decide what to hide |
| 05 | Three tensions, three questions | Pivot | What made this hard? | A+B, C, D+E+F → three questions | §08 | None | Large typographic statements | Structure for the decisions |
| 06 | One switch | Decision 1 | How much does a customer configure? | The queue form; the last section; the helper text; why nothing else | REQ note, 5–6; PDF p.10 | Toggle → caption "That is the whole configuration." | Reconstructed configuration screen (neutral) | Deciding what not to show |
| 07 | The change reaches the planner | Decision 2 | How do they find out? | Notification; banners; three surfaces; states; Apply filter | REQ 7; PDF p.11–15 | State change in a neutral environment; surface switcher; filter | Reconstructed shells with banner and notification centre | Awareness as a system |
| 08 | The change can be inspected, and it points somewhere | Decision 3 | How do they understand and act? | "N issues found"; previous vs new; issues log; severity (labelled exploration); location on chart and schedule | REQ 8; PDF p.16–19 | Previous/new toggle; issue → location follow-through | Reconstructed Forecast, Issues, Schedule | Closes the loop |
| 09 | How it was checked | Validation | Was this right? | Hi-fi prototypes; time pressure; reviewed closely with three customer companies (context label); what is *not* claimed | PDF p.11; SPEECH 2, 21; JOÃO | None | Plain text with labels | Honesty about validation |
| 10 | What came of it | Outcome | What did the designer deliver; what is unknown? | Design outcome statement; 10% as a target; unknowns; reflection | §26–27 | None | Typographic close | Bounded claim of contribution |

### Editorial rhythm (§33 of the brief)

READ (00–01) → INTERACT (02) → READ (03) → INTERACT (04) → READ/REFLECT (05) → LOOK+small interaction (06) → INTERACT (07) → INTERACT (08) → READ (09) → REFLECT (10). Five interactive moments in ten sections; never two heavy interactions back to back without a reading beat between 07 and 08 (the section 08 opener should be static text before the toggle).

### Visitor journey (§32 of the brief)

| Stage | Knows | Does not know | Next question | Answered by |
|---|---|---|---|---|
| After 00 | The claim | The domain | What is a forecast for? | 01 |
| After 01 | Forecast → staff → schedule | What breaks | What goes wrong? | 02 |
| After 02 | Days diverge; planners ask about the rest of the day | What was built | What was asked? | 03 |
| After 03 | The brief and its open question | How the system could decide | How does it decide? | 04 |
| After 04 | The logic, and that it is invisible | What the designer did | What was hard? | 05 |
| After 05 | Three questions | The answers | — | 06–08 |
| After 08 | The behaviour | Whether it worked | Was it checked? | 09 |
| After 09 | The validation, honestly bounded | The outcome | What came of it? | 10 |

### Visual direction (§34–35 of the brief)

- **Survives:** editorial scale; large typographic statements as pivots; generous negative space; diagrams as first-class content; the state language of the product; the reforecasting flow *idea*.
- **Does not survive:** PP Woodland / Schibsted Grotesk (the site is Nudica-only by explicit decision; the case must use the site's type scale); the purple/lilac/cream palette and blob shapes (not in the system; also visually adjacent to the former employer's brand colour); the illustrations (licence unknown; decorative); tiny canvases; stacked screenshots.
- **Hierarchy problems to fix:** research artefacts and the flow diagram are illegible at presentation scale; captions are secondary in weight but primary in meaning ("3 issues found" is a decision, not a caption); UI labels in screenshots are unreadable on mobile.
- **Strong compositions to retain in spirit:** p.10's "one highlighted section at the bottom of a long form"; p.17's toggle-off / toggle-on pairing; p.18's header count → log link.
- **Open decision for João:** whether the case may carry a restrained per-case accent within the site system (the site currently has one accent, yellow). Not for this phase.

### Accessibility requirements (§36)

- Semantic structure: `article` → `section[aria-labelledby]` → `h2`; one `h1`.
- Every interactive explanation has a textual equivalent that states the same conclusion (e.g. a `<p aria-live="polite">` summarising the current simulation state; a static list version of the scenario table).
- Charts: SVG with `role="img"` and `aria-label` describing the shape, plus a data-free textual summary; no information carried by colour alone (dotted vs solid for previous vs new; hatch or label for highlighted periods).
- Controls: real `button` / `input[type=range]` with `aria-pressed`, `aria-valuetext`, visible focus using `--focus-ring`; 44 px targets; keyboard reachable in reading order.
- Status messages: banner and notification changes announced via `role="status"` once, not on every animation frame.
- Reduced motion: state changes render instantly; no auto-advancing simulation.
- Contrast: reconstructed UI must meet AA on the site's surfaces in both themes; the site's yellow accent cannot be used for text or focus.

### Responsive requirements (§37)

| Interaction | Desktop | Tablet | Mobile |
|---|---|---|---|
| Scenario selector | Side-by-side controls + chart | Controls above chart | Segmented control; chart simplified to one series; scenario text primary |
| Detection simulation | Scrubber + annotated timeline | Same, stacked | Step buttons instead of scrubber; timeline as vertical list of checks |
| State change in context | Product shell at ~1080 px | Shell scaled; banner emphasised | Show only the banner + notification, not the full shell; surface switcher as tabs |
| Previous vs new | Full chart | Full chart | Chart with two series only (CVO), staff bars dropped; toggle large |
| Issue → location | Table + chart + schedule | Table above chart | Issue cards; chart highlight; schedule shown as a period list with the highlighted range |

---

## 22. Interactive experience architecture

For each proposed interaction: purpose · visitor action · system response · learning · evidence · decision · why interactive · what is lost if static · verdict.

| # | Interaction | Purpose | Visitor action | System response | Learns | Evidence | Decision | Why interactive | Lost if static | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Operational scenarios | Show causes converging on one question, and which the system observes | Select volume / handle time / capacity | Illustrative day chart shifts; scenario text in planner voice; note whether detection sees it | Different causes, same "rest of the day" question | PDF p.4; SPEECH 4–5 | — (context) | Cause → effect is grasped by changing the cause | The demand/capacity distinction becomes a footnote | **Essential** |
| 2 | Forecast vs actual | Foundation for 3–4 | — | — | — | REQ 3 | — | — | — | **Fold into 4** |
| 3 | Threshold | Show non-triggering vs triggering deviation | — | — | — | REQ 3; PDF p.9 | — | — | — | **Fold into 4** |
| 4 | Detection → reforecast simulation | Make monitoring vs execution, threshold, several periods and caps legible | Scrub or step through a fictional day of 30-minute checks | Each check shows deviation vs threshold; a brief spike does not trigger; a sustained one does; rest-of-day series scales; cap indicator | The system is designed not to over-react; complexity stays internal | REQ 2–4; PDF p.9; SPEECH 6 | Design material for D1/D2 | The *sequence* is the insight | The p.9 diagram's density problem returns | **Essential** (values illustrative; parameters labelled by confidence) |
| 5 | Notification in a neutral environment | Show system-initiated change reaching the planner | Press "advance" (never auto) while viewing Team schedule / Insights / Forecast; switch surface | Notification badge + banner appear; wording progresses; count appears on Forecast | Awareness across surfaces as states | PDF p.11–15; REQ 7 | D3–D8 | Being *in* the environment when it changes is the point | Stacked screenshots (current p.14) | **Essential** |
| 6 | Affected queues | Show the filter | Press "Apply filter" | View narrows to affected queue(s) | Multi-queue relevance | PDF p.12–14 | D6 | Small | Small | **Fold into 5** |
| 7 | Previous vs new forecast | Show magnitude | Toggle | Dotted previous series overlays | Comparison enables judgement | PDF p.16–17; REQ 8 | D10 | It *is* a toggle in the product | The p.17 pairing works statically too, but the toggle is cheap and faithful | **Essential** |
| 8 | Forecasting issues → location | Show the path from event to place | Select an issue; press "Check forecast" | Chart highlights the period; schedule shows the same highlight | Inspectability closes the loop | PDF p.18–19 | D9, D11–D14 | The follow-through is a path, not a picture | Three unrelated screenshots (current p.18–19) | **Essential** |
| 9 | System logic progressive reveal | — | — | — | — | — | — | — | — | **Fold into 4** (annotation layer) |
| 10 | Validation before/after | Show a real iteration | — | — | — | **No genuine iteration evidence exists** | — | — | — | **Do not build.** See §24 |

Five essential interactions. Each has a static fallback defined in §21.

---

## 23. Neutral product UI requirements

Minimum set: **six** reconstructed surfaces/components. Not needed: "Your schedule", "Scenarios", the Configurations → Event types page behind the notification in PDF p.11.

| Surface / component | Purpose | States | Information (preserve) | Interaction | Source | Abstract | Preserve |
|---|---|---|---|---|---|---|---|
| Queue configuration | Decision 1 | Toggle off / on | Existing sections (service level goal, patience, shrinkage, queue options) as *context*; final section "Reforecast" with one checkbox and helper text | Toggle | PDF p.10 | Chrome, logo, product names, field values, the "collect live metrics from [vendor]" option | Position at the end of a long form; single control; helper text meaning ("if enabled, the system will reforecast this queue") |
| Notification centre | Decision 2 | Anomaly detected (in progress) / Reforecast completed | Title; body; relative time; "Preview" affordance; unread dot | Open/close; Preview (behaviour unknown — do not invent beyond "opens the affected view") | PDF p.11, p.15 | Panel styling; the page behind it | Two-message language |
| Banner | Decision 2 | In progress / Forecast updated / (queue-specific variant labelled as wording variant) | Status word; state phrase; Apply filter; Preview; Check insights (Forecast and Schedule only, per p.14) | Apply filter; Check insights | PDF p.12–15, p.19 | Colours, icon style | Placement at top of content; persistence; wording progression |
| Forecast | Decision 2 & 3 | Normal / banner in progress / updated with "N issues found" / previous overlay on / anomaly period highlighted | Header with "Updated at … , N issues found"; day/week; chart of contact volume, handle time, staff; legend; "Show previous forecast" toggle | Toggle; header count link | PDF p.14, 16, 17, 19 | Real values (use one coherent fictional day); navigation; filters | Chart composition; overlay as dotted series; highlight band |
| Team schedule | Decision 2 & 3 | Banner / anomaly periods highlighted with tooltip | Time header; per-period staffing indicators; agent rows with shifts and breaks; highlighted period columns; tooltip text | Hover/focus tooltip | PDF p.14, p.19 | Agent names, adherence numbers, timezone selector | Highlight vocabulary identical to the chart |
| Forecasting issues | Decision 3 | List | Count; columns: trigger time, end time, queue, severity, description ("N% higher than forecasted for N consecutive periods"), "Check forecast" | Select; Check forecast | PDF p.18 | ID; real dates; queue names | Description grammar; severity as a chip (labelled exploration) |
| Insights (optional) | Decision 2 | Banner | Banner over a generic chart | Surface switch | PDF p.12, p.14 | Everything except the banner | Presence of the banner on a third surface |

Rule for all: every reconstructed screen carries the "Reconstruction" evidence label on first appearance. Use one fictional day (consistent date, times, queue names), one fictional account, and fictional agent names.

---

## 24. Before/after opportunities

- **Genuine design iterations:** none are documented in REQ, SPEECH, PDF or REPO. The Figma file could not be inspected. Two wording variants exist ("Anomaly detected" vs "Surge detected… on support queue", PDF p.12–14 vs p.19), which *may* be an iteration but cannot be presented as one without confirmation.
- **Genuine documented before/after of *state*:** "Show previous forecast" off → on (PDF p.16–17). This is a before/after inside the product, not an iteration of the design. It is safe and should be the case's before/after moment, labelled as product behaviour.
- **Recommendation:** do not fabricate iterations. If João can supply earlier Figma frames, they can be added as DESIGN EXPLORATION in a later phase. Otherwise the case study demonstrates the principle through the state comparison and the detection simulation.

---

## 25. What should be removed

| Category | Items |
|---|---|
| REPETITIVE | PDF p.12, p.14, p.16 (three "notification → page" screenshots making one point); p.13's four bullets restating p.12 |
| GENERIC | p.2's four columns; p.15's and p.19's bullets ("enabling resource planners to make informed staffing decisions and adjust workforce management strategies accordingly", "ensuring efficient workforce management and operational planning") |
| UNSUPPORTED | "Continuously / consistently updates"; "pattern recognition… predict future anomalies… take preemptive action"; "designed both automated and manual workflows"; "push notifications" |
| LOW-VALUE | Divider p.5; thank-you p.20; cover blobs |
| PROCESS THEATRE | Kano, VPC, Empathy Map (p.6–8) — AI-generated, disclaimed, no user data |
| TOO TECHNICAL | Nothing in the current PDF is too technical; the risk runs the other way (p.9 is too compressed) |
| TOO DECORATIVE | Illustrations p.2, 3, 5; purple hero and closing typography |
| BETTER REPRESENTED INTERACTIVELY | p.4 scenarios; p.9 flow; p.12–14 banners; p.17 toggle; p.18–19 issue → location |
| BETTER AS A SINGLE SENTENCE | p.13 banner rationale → "Wherever the numbers change, the explanation is there"; p.15 completion → "Completion asks for action"; p.17 headline → none (remove) |
| BETTER AS EVIDENCE | p.3's note (currently decoration; it is the origin of Decision 1); "3 issues found" (currently a caption; it is a decision) |

---

## 26. What should be added (already supported)

| Addition | Support |
|---|---|
| Explicit distinction between monitoring (every 30 min) and reforecasting (conditional, capped) | REQ 2–3; PDF p.9; SPEECH 3, 6 |
| The low-volume exclusion and minimum-volume rule as design-relevant constraints ("the feature stays silent where it cannot judge") | REQ 3.2, 3.4 |
| The requirement that the customer has no configuration, and the feature flag → the toggle as the designer's answer to REQ 6.1 | REQ 5–6 |
| REQ 7 as the *reason* the banners live on exactly three surfaces | REQ 7 |
| REQ 8 as the *reason* a previous-forecast comparison is possible | REQ 8 |
| The scheduling simulation as a documented downstream effect (one sentence; behaviour unknown) | REQ 9 |
| A state model of the design: idle → monitoring → anomaly → reforecasting → updated → issues | PDF p.9–19 |
| Design tensions and the three questions | §08 |
| A validation statement with labels (hi-fi; time; three companies as context) | PDF p.11; SPEECH 2, 21; JOÃO |
| The 10% target stated *as a target* | REQ 4.2 |
| An explicit design outcome and an explicit unknowns list | §27 |
| Evidence labels and a disclosure, as the Carpool page already does | REPO |

---

## 27. What remains unknown

- Who the resource planners were, how many, how they were engaged, and when.
- Which three companies took part, in what format, and what they said.
- Whether any feedback changed the design, and what changed.
- Whether the feature shipped, in what form, and when; whether the toggle shipped or the feature flag alone.
- Whether the 10% accuracy target was measured or met.
- The final threshold method (percentile vs average error), the final history window, and the final caps.
- Whether a manual "reforecast now" was ever designed.
- Whether handle-time deviation triggers detection, or only contact volume.
- The severity rule behind Critical / Major / Minor.
- What "Preview" opens; what "Check insights" shows.
- What the planner sees in the schedule after the triggered simulation.
- Whether "Anomaly detected" or "Surge detected" was the final wording.
- The contents of the Figma prototype beyond the embedded screenshots.
- The licence of the illustrations.
- Whether the former employer may be named.

---

## 28. Open questions for João

1. May the case study name the company, or should it be anonymised like Carpool? (The site's copy policy currently forbids the name in live copy.)
2. Did the feature ship? If so, did the per-queue toggle ship, or only the internal feature flag?
3. Was intraday accuracy measured against the 10% target? If yes, may the result be published?
4. Which system parameters may be published: 30 minutes, four periods, eight weeks, nightly run, twice a day, one hour?
5. Threshold: "percentile differences" (PDF) or "average error" (speech)?
6. Were the 2×/day cap and 1-hour interval final decisions?
7. The three companies: format (workshops, prototype walkthroughs, calls), rounds, roles of participants — without names or counts if those must stay private. Did the scenarios on p.4 come from these sessions?
8. Were resource planners interviewed before the prototype, after, or both?
9. Did any specific piece of feedback change a screen? If earlier Figma frames exist, may they be shown as explorations?
10. Was a manual "run reforecast now" action designed at any point?
11. Does the detection observe handle time, or contact volume only?
12. How were severity tiers defined, if at all?
13. What does "Preview" open in the notification and banner? What does "Check insights" show?
14. What did the planner see in the Team schedule after a reforecast (REQ 9 simulation)?
15. Which was the final banner wording: "Anomaly detected" or "Surge detected"?
16. Are the Kano / VPC / Empathy canvases to be mentioned at all? If yes, is the AI provenance to be stated?
17. May the case study use a restrained per-case accent colour within the site system, or must it stay on the site's single accent?
18. Are the illustrations licensed for web use? (Recommendation is to drop them regardless.)
19. Can the Figma file be exported or screenshots supplied for the next phase?
20. Is Portuguese content required at launch for this case, as with Carpool?

---

## 29. Final quality assessment

### Final narrative test (§45 of the brief), against the recommended architecture

| Question | Answer | If NO / partial, why |
|---|---|---|
| Understand the project without knowing the company? | Yes | Anonymised; section 01 supplies the domain |
| Understand the operational problem? | Yes | Section 02 with planner-voice scenarios |
| Understand what changes during the day? | Yes | Scenario selector |
| Understand why a forecast may need to change? | Yes | Sections 02–03 |
| Understand how the system determines when to reforecast? | Yes, at the level the evidence allows | Parameters beyond REQ are labelled by confidence |
| Understand what the designer actually designed? | Yes | Sections 06–08; system logic explicitly marked as understood, not designed |
| See why the interface is structured this way? | Yes | Each decision traced to REQ or to a stated tension |
| Interact with the product behaviour? | Yes | Five interactions |
| Understand how the design was validated? | **Partial** | The sources support strategy, not results; section 09 says so |
| Distinguish historical evidence from reconstructed UI? | Yes | Evidence labels on every reconstruction |
| Understand what is known and unknown? | Yes | Section 10 |
| Leave with a clear understanding of the designer's contribution? | Yes | Three decisions + bounded outcome |

### Quality-bar check (§46)

No fake research (canvases removed); no invented impact (10% as target); no invented quotes (scenario cards used verbatim, attributed generically); no invented iterations (state comparison used instead); no screenshot dump (six reconstructed surfaces, each tied to a decision); no PDF-to-web conversion (20 pages → 10 sections, 5 interactive); no research without consequence (research → insight → implication table); no decision without rationale (§09); no rationale without evidence (every rationale labelled); no interaction without purpose (§22 verdicts); no claim without source (§13).

---

## 30. Recommended next phase

**Phase 2 — Content and interaction specification (still no code).** Produce, for review:

1. Final section copy (EN, then PT) with an evidence label on every claim, following the Carpool content-model pattern (`types.ts` → `en.ts` / `pt.ts`).
2. Interaction specifications for the five essential interactions: states, controls, fictional dataset (one coherent day), textual equivalents, reduced-motion behaviour, mobile variant.
3. Neutral UI specification for the six reconstructed surfaces: information hierarchy, states, labels, the fictional account and queue names.
4. Confidentiality resolution based on João's answers to §28 (company name, parameters, target).
5. A decision on visual direction within the Nudica-only system, including the accent question.
6. A test-policy note: extend `copy-audit.test.ts` (or add a sibling) to scan case content for forbidden names.

Only after Phase 2 is approved should Phase 3 (implementation under `/[lang]/work/intraday-reforecasting`) begin.

---

# FINAL RECOMMENDATION

## THE PROJECT IS REALLY ABOUT

A workforce-management system that can change a day's forecast on its own once real values drift far enough, for long enough, from the plan — and the design work needed so that a resource planner switches it on with one decision, learns that the change happened wherever they are working, can see how much changed and where, and knows what to check next. The detection and recalculation were engineering-owned; the designer's contribution is the configuration boundary, the state communication and the inspectability. (REQ; PDF p.10–19; SPEECH 6–20.)

## THE CENTRAL DESIGN CHALLENGE

Translating an automated, threshold-driven, capped reforecasting mechanism into an experience that asks the customer for exactly one decision, never changes numbers silently, and turns the system's internal reasoning ("N% higher for N periods") into something a planner can judge and act on across the Forecast, Schedule and Insights surfaces.

## THE THREE STRONGEST DESIGN DECISIONS

**1. One switch per queue is the whole configuration.** Thresholds, periods, history and caps stay inside the system; the customer decides *whether*, per queue, not *how*. Traceable to the requirements' open question about automation versus control and to the "no customer configuration" constraint.

**2. The change reaches the planner where they are, as a sequence of states.** A notification-centre message plus a persistent banner on the three surfaces the new forecast touches, with explicit "in progress" and "updated / completed" wording and in-place actions (Apply filter, Preview, Check insights). Grounded in the requirement that the reforecast appears on exactly those surfaces.

**3. The change is inspectable and points to the next step.** "N issues found" in the header; a previous-versus-new overlay (possible because the baseline is stored); an issues log with trigger, end, queue, severity and a plain-language description; the same anomaly-period highlight on the forecast chart and the schedule timeline.

## THE CORE DESIGN THESIS

The system could decide on its own to change the forecast. The design's job was to make that change reach the planner where they were working, make it inspectable against what it replaced, and make the next step obvious — while asking the customer to configure exactly one thing.

## THE CASE STUDY STORY

A forecast is a plan for a day that has not happened yet. During the day, volume rises, handle time lengthens, agents disappear; planners keep asking how the rest of the day looks and what they can do. The brief asked for a same-day reforecast triggered only when the deviation is meaningful, warned that not every customer wants it every day, and gave the customer no configuration. The designer had to understand how the system would decide — every 30 minutes, over several periods, above a calculated threshold, not on quiet queues, not too often — in order to decide what the planner should never have to see. Three questions followed: how much does a customer configure; how does the planner find out; how do they understand and act. The answers: one switch per queue; a notification and a banner that follow the planner across the product and change wording as the system moves from detecting to updating; a comparison with the previous forecast, an issues log and a highlighted period that leads into the schedule. Built as high-fidelity prototypes under time pressure and reviewed closely with customers so development could start from something concrete. What is known ends there: the brief's accuracy target, the production outcome and the measured effect are not part of the record.

## THE INTERACTIVE EXPERIENCE

1. Scenario selector (volume / handle time / capacity) showing convergence on the rest-of-day question and which causes the system observes.
2. Detection-and-reforecast simulation: stepping through 30-minute checks; sub-threshold versus sustained deviation; rest-of-day rescaling; caps — parameters labelled by confidence, values illustrative.
3. State change in a neutral product environment: visitor-controlled advance; notification and banner appear; wording progresses; surface switcher; Apply filter.
4. Previous-versus-new forecast toggle.
5. Issue → location follow-through: select an issue, check the forecast, see the same period highlighted in the schedule.

## THE NEUTRAL UI

- Queue configuration form with the single "Turn on reforecast" control (off / on).
- Notification centre with two messages (anomaly detected — in progress; reforecast completed).
- Banner component (in progress / forecast updated; queue-specific wording labelled as a variant) with Apply filter, Preview, Check insights.
- Forecast page (normal; in progress; updated with "N issues found"; previous overlay; anomaly period highlighted).
- Team schedule (banner; highlighted anomaly periods with tooltip).
- Forecasting issues list (trigger, end, queue, severity, description, Check forecast).
- Insights shell, optional, banner only.

## THE VALIDATION STORY

High-fidelity prototypes were used from the start, under a limited timeline, to obtain prompt feedback and allow development to begin from a concrete reference (documented). The prototypes were reviewed closely with three customer companies (designer-provided context; no names, numbers or findings). Resource planners' scenarios were documented (documented); the interview method is asserted only in the presentation speech. No quantitative validation exists in the sources.

## THE DESIGN OUTCOME

A complex, automated forecasting mechanism was translated into an experience with one configuration decision, explicit and consistent communication of system-initiated change across the affected surfaces, and inspectable consequences that connect the changed forecast to the schedule. Stated as a design outcome; not as a product or business outcome.

## WHAT WE MUST NOT CLAIM

- That accuracy improved by 10% (or by any amount).
- That the system reforecasts continuously or 24/7.
- Participant numbers, session counts, usability scores, task success, time saved.
- Adoption, production status, business impact.
- That the Kano model, Value Proposition Canvas or Empathy Map are research findings.
- That a manual reforecast trigger or push notifications were designed.
- That the "Anomaly / Surge" wording pair is a documented iteration.
- Any user quote beyond the scenario cards as written.
- The 2×/day cap, 1-hour interval, 8-week window or nightly percentile method as *requirements* (they are Level 4/5 until confirmed).

## WHAT WE STILL NEED TO KNOW

Company naming permission; production status; whether the toggle shipped; accuracy measurement; publishable system parameters and final threshold method; three-company format and whether the scenarios came from it; any real iteration evidence (Figma); manual trigger existence; detection signal (volume vs handle time); severity rule; Preview and Check insights behaviour; post-reforecast schedule behaviour; final banner wording; illustration licence; accent-colour latitude; Portuguese scope.

## NEXT PHASE

Phase 2 should turn this audit into a reviewable specification: final labelled copy for the ten sections (EN, then PT), interaction specs for the five essential interactions with one coherent fictional dataset and accessible equivalents, neutral-UI specs for the six reconstructed surfaces, resolution of the confidentiality questions, and a visual-direction decision inside the site's Nudica-only system. No code, components, CSS or assets until that specification is approved.
