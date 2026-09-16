# Carpool — Case Study Final Content Architecture

**Status:** Narrative and content blueprint for portfolio implementation.  
**Not for implementation yet:** no website, no React, no visual design production.  
**Confidentiality:** the original research PDF remains private. Portfolio visuals will be reconstructed.

---

## Sources used

| Source | Path / status | Role |
|---|---|---|
| Research PDF | Attached privately as Carpool 2024 UX Review (42 pages). Requested path `/docs/carpool-ux-research.pdf` was not present in-repo — PDF must **not** be committed. | Primary evidence |
| Research analysis | `/docs/carpool-research-analysis.md` | Evidence hierarchy and method critique |
| Editorial source pack | `/docs/carpool-case-study.md` **was not present in the workspace** | Intended narrative direction was taken from the task brief that would normally live in that pack |

**Source rule for this document:** where the editorial brief and the research disagree, the research wins. Editorial ambition is challenged, not rubber-stamped.

---

# 01 — ESTABLISH THE STORY

## Strongest evidence-supported narrative

Carpool was an employee vehicle-pool benefit with a booking interface. The investigation began close to that interface — how people searched, reserved, confirmed, and managed bookings — and also gathered operational context from the team responsible for pick-up, drop-off, charging, and readiness.

As leisure-user evidence accumulated, a sharper pattern emerged: people could describe many interface frictions, but the constraint that most shaped whether the benefit felt usable was **getting a vehicle at all**, and knowing whether a vehicle that looked bookable was actually ready.

The research did not prove that the interface was fine. It documented many real UX problems. It did establish — in the research’s own language — that **vehicle unavailability was the primary challenge and usability concerns were secondary**.

That distinction reframes the investment question. If a platform rebuild takes serious time, the research asks what problem that time would actually solve: surface friction in the booking product, or deeper constraints in availability, readiness, cancellation trust, and operational truthfulness.

### Narrative arc (discovery order)

```
INITIAL ASSUMPTION
→ INVESTIGATION
→ EVIDENCE
→ CONTRADICTION
→ REFRAMING
→ DESIGN OPPORTUNITIES
```

| Beat | What the portfolio should convey | Evidence basis |
|---|---|---|
| Assumption | The booking experience looked like the place to intervene | **PROJECT CONTEXT** / editorial framing — not a diary entry in the PDF |
| Investigation | Contextual inquiry, leisure-user research, personas, expert review of the live product | **RESEARCH EVIDENCE** |
| Evidence | Scarcity, long lead times, unclear availability, cancellations, hidden rules, readiness gaps, history failures | **RESEARCH EVIDENCE** |
| Contradiction | Interface issues are real — and still secondary to unavailability | **RESEARCH EVIDENCE** (User III synthesis; Finding 2; Finding 4) |
| Reframing | Booking success depends on service + operations, not only UI polish | **INFERENCE** grounded in research synthesis + next steps |
| Opportunities | Availability-first product moves, readiness visibility, clearer lifecycle, differentiated work/leisure — framed as explorations | **DESIGN EXPLORATION** |

**Critical honesty:** the PDF does not contain a first-person project diary that says “we assumed X, then discovered Y.” The discovery arc is the strongest reading of the research structure and findings. It must be labelled carefully on the page so readers do not confuse reconstructed narrative with a transcribed project log.

---

# 02 — CHALLENGE THE NARRATIVE

Comparison of the editorial brief against the research analysis and PDF.

## Strongly supported

| Editorial claim | Verdict | Why |
|---|---|---|
| Vehicle unavailability was primary; usability secondary | **Supported** | Explicit User III synthesis; reinforced by Finding 2 |
| Users booked far in advance / struggled to find slots | **Supported** | Multiple users + Finding 2 (lead times reported in deck) |
| Charging/inspection affect readiness | **Supported** | Stronghold context + Finding 4 |
| Leisure and work needs differ | **Supported as concept** | Finding 3 + User III; work interviews still thin |
| Cancellations damage trust | **Supported** | Late unexplained cancel anecdote; maintenance cancels; missing cancel reasons |
| Many genuine UX problems exist | **Supported** | Expert review + user findings across history, errors, status, rules |
| Research points beyond “fix the screens” | **Supported** | Next steps prioritise Stronghold, work users, reservation data |

## Partially supported

| Editorial claim | Verdict | Why |
|---|---|---|
| “The interface wasn’t the bottleneck.” | **Partially supported — must be precise** | Research says unavailability is primary, usability secondary — **not** that the interface was healthy |
| Discovery arc (assumption → contradiction) | **Partially supported** | Findings support the *logical* turning point; the chronological “we didn’t know yet” framing is **INFERENCE / PROJECT CONTEXT** |
| Five thematic findings as equal pillars | **Partially supported** | All five map to evidence, but they are **not equal**. Availability/readiness dominate; history/rules are important amplifiers |
| Waiting list as the answer | **Partially supported as opportunity** | Recommended in Finding 2; not validated operationally |
| Work vs leisure as a major researched finding | **Partially supported** | Strong as design implication; weak as interview evidence (leisure-only sample) |

## Designer-provided context (allowed if labelled)

| Claim | Label | Handling |
|---|---|---|
| 6–12 month platform build timeframe | **PROJECT CONTEXT** | Use as framing question only |
| Initial stakeholder assumption that improving/rebuilding the booking platform was the move | **PROJECT CONTEXT** | Needed for the discovery arc; do not pretend the PDF states the brief |
| Portfolio naming / anonymisation choices | **PROJECT CONTEXT** | Confirm what can be public |

## Inference (keep, but mark)

| Claim | Label | Handling |
|---|---|---|
| Research “changed the investment question” | **INFERENCE** | Reasonable; do not claim a recorded executive decision unless confirmed |
| Rebuilding the full platform would be the wrong first response | **INFERENCE** | Supported directionally by dominant constraint analysis; not a documented decision |
| Utilisation would keep falling without service changes | **INFERENCE** | Plausible from demotivation quotes; unmeasured |

## Claims that should be removed or rewritten

| Unsafe claim | Why remove / rewrite |
|---|---|
| “We decided not to build the platform.” | Not established by available sources |
| “The platform was fine / UX was not the problem.” | Contradicted by extensive UX evidence |
| Any ROI, cost, savings, or success-rate numbers | Not in research; forbidden fabrication |
| “Users needed to book 9 months ahead” as a hard universal fact | Appears in Finding 2 as impact language; related user research also cites up to four months for weekends — treat as **reported in research**, not audited telemetry |
| Work-user pain described as if interviewed | Work users were a next-step gap |
| “Recommendations were shipped” | PDF recommendations ≠ implementation |
| Verbatim confidential quotes / raw screenshots / internal tool URLs | Confidentiality |

### Explicit contradiction flags

1. **Editorial desire for a clean “interface wasn’t the bottleneck” line** vs **research documenting serious interface failures**.  
   → Resolve with the precise central insight below.

2. **Editorial desire for a decisive business outcome** vs **research that ends at findings + next steps**.  
   → Resolve with reframing language, not a fabricated decision.

3. **Editorial five-findings symmetry** vs **research hierarchy where scarcity/readiness dominate**.  
   → Keep five findings, but weight them unequally in copy and layout.

---

# 03 — DEFINE THE CENTRAL INSIGHT

## Rejected formulation

> “The interface wasn’t the bottleneck.”

Too absolute. It invites the false reading that the product experience was acceptable.

## Rejected opposite

> “The platform was completely fine.”

False. The research documents confirmation gaps, misleading history defaults, opaque errors, late rule disclosure, unclear statuses, and more.

## Final central insight

> **The interface had real usability problems — but the dominant constraint on the service was vehicle availability and operational readiness.**  
> A better booking screen cannot invent cars, charge them faster, or make an unexplained cancellation feel fair.  
> So the useful design question was not only “how do we improve the flow?” but “what must be true in the service before software investment changes the experience that users actually feel?”

### Supporting evidence for this insight

- User III: vehicle unavailability primary; usability secondary; interface “not a problem as long as vehicles are available.”
- Finding 2: benefit hard to use because slots are hard to find; waiting list / better search proposed.
- Finding 4: electric leisure cars can be “available” but not ready (charging + validation time).
- Expert review: many interface defects — establishing that “secondary” ≠ “absent.”

### One-line portfolio statement

**Carpool looked like a booking-product problem. The research showed a service-and-readiness problem that the booking product was poorly equipped to tell the truth about.**

---

# 04 — DISTINGUISH PROBLEM LEVELS

## LEVEL 1 — User experience

Documented interface and interaction failures.

| Example | Evidence strength |
|---|---|
| Unclear availability / trial-and-error date hunting | Strong |
| Confusing booking affordances (Reserve before eligibility; opaque conflicts) | Strong |
| Unclear reservation status / “approved” / Open vs Completed | Strong |
| Hidden or late-disclosed rules (one reservation, weekend starts) | Strong |
| Poor feedback / confirmation / empty states | Strong |
| Difficult reservation history (year-end default filter) | Strong |
| UX writing failures across errors, cancel copy, email | Supporting |

**What Level 1 can fix:** clarity, prevention, feedback, history defaults, rule timing, status language.  
**What Level 1 cannot fix alone:** fleet scarcity, charge time, inspection capacity, maintenance cancellations.

## LEVEL 2 — Service / operations

Constraints outside (or underneath) the screen.

| Example | Evidence strength |
|---|---|
| Vehicle availability / demand vs supply | Strong |
| Charging between leisure bookings | Strong |
| Inspection / validation before next booking | Strong |
| Maintenance-driven cancellations | Supporting–strong |
| Unexplained / late cancellations | Strong as user impact; ops cause mix partly unknown |
| Operational constraints (Stronghold workflow) | Medium — surfaced, not fully researched |
| No waiting list / informal Teams reallocation | Strong as gap |

## LEVEL 3 — Business / investment

Editorial framing built on Levels 1–2. Mostly **PROJECT CONTEXT** + **INFERENCE**.

| Question | Label |
|---|---|
| Would a new platform address the dominant problem? | **INFERENCE** from research: only if it models availability, readiness, cancellation truth, and ops constraints — not if it only restyles booking |
| Was a major platform investment justified as first move? | **PROJECT CONTEXT** question; research challenges a UI-only investment thesis |
| 6–12 months to build — what problem is that time buying? | **PROJECT CONTEXT** framing device |
| Exact cost / ROI / savings | **UNKNOWN** — do not invent |

### Relationship diagram (for page)

```
LEVEL 3  Investment question
            ↑ informed by
LEVEL 2  Service / operations constraints   ← dominant per research
            ↑ surfaces through / amplified by
LEVEL 1  User experience failures           ← real, secondary, still worth fixing
```

---

# 05 — BUILD THE CASE STUDY STRUCTURE

## Final page structure

The recommended sequence is kept, with one intentional modification: **section 10 (Investment question) stays**, but is explicitly labelled **PROJECT CONTEXT**, and **section 12 (Outcome)** is rewritten as **decision quality / reframing**, not a product launch or a documented “we cancelled the rebuild.”

| # | Section | Why it stays / how it changes |
|---|---|---|
| 01 | Cover | Brand + case title + one-line insight |
| 02 | The brief | What Carpool is; what was being examined |
| 03 | The initial assumption | Interface-first hypothesis — labelled project context |
| 04 | The investigation | Methods without fake methodology theatre |
| 05 | What users actually experienced | Leisure evidence, quotes paraphrased/anonymised |
| 06 | The service behind the screen | Stronghold / charging / inspection / maintenance |
| 07 | The turning point | Primary vs secondary constraint |
| 08 | The five findings | Unequal weight; availability & readiness lead |
| 09 | What software could / could not solve | Level 1 vs 2 honesty |
| 10 | The investment question | 6–12 months as framing, not finance fiction |
| 11 | Design explorations | Clearly not shipped work |
| 12 | Outcome | Reframing / decision quality — no fabricated kill decision |
| 13 | Reflection | Senior PD thinking; limits of the research |

### Why not a conventional UX case study template

A “Problem → Process → Wireframes → Results / +42%” template would force fake metrics and overclaim implementation. This structure preserves discovery and keeps the business value in **problem framing**, which is what the sources actually support.

### Optional micro-adjustment (accepted)

Insert a thin **Evidence labels key** near the cover or after the brief so reconstructed UI is never mistaken for production screenshots. This is structural hygiene, not a new narrative beat.

---

# 06 — WRITE THE ACTUAL COPY

Editorial copy for implementation. Keep labels in the content system even if the public page styles them quietly.

---

## 01 — COVER

**Eyebrow:** Case study · Internal product · Research-led

**Title:** Carpool

**Deck:**  
When an employee car benefit felt broken, the first instinct was to fix the booking interface. The research said the harder constraint was elsewhere.

**Meta line (small):**  
UX research · Service design lens · Design explorations  
No confidential artefacts · Reconstructed visuals

**Label near title if needed:** PROJECT CONTEXT for role/company naming as approved.

---

## 02 — THE BRIEF

Carpool was an internal vehicle-pool benefit: employees could reserve company cars for leisure or work.

On the surface, it looked like a product problem. There was a booking interface, a reservation history, statuses, policies, confirmations. People complained. Screens looked busy with friction.

The brief for this work was to understand what was actually failing — and what kind of design investment would matter.

**What Carpool was (RESEARCH EVIDENCE):**  
An internal tools product for reserving pool vehicles across locations, with leisure and work categories, reservation management, and operational handoff around pick-up and return.

**What this case study is not:**  
A launch story. A conversion-rate story. A claim that the recommendations were built.

---

## 03 — THE INITIAL ASSUMPTION

**Label:** PROJECT CONTEXT

If employees struggle to book cars, improve the booking product.  
Make availability clearer. Tighten the flow. Clean up the interface. Perhaps justify a larger platform rebuild.

That assumption is reasonable. It is also incomplete.

A booking interface is where frustration becomes visible. It is not always where the constraint lives.

This case starts there — because that is where the investigation had to start — and then follows the evidence past the screen.

---

## 04 — THE INVESTIGATION

**Label:** RESEARCH EVIDENCE

The work combined four documented activities:

1. **Contextual inquiry** into operational pick-up and drop-off concerns — including charging, inspection, policies, and failure scenarios.
2. **User research** with leisure bookers about real reservation behaviour.
3. **Personas** distinguishing leisure intent, work intent, and operational management.
4. **Expert review** of the live booking and reservation interface.

The research was strongest on leisure use. Work bookings and deeper operational workflow were explicitly flagged as needing more investigation.

That incompleteness matters. It keeps the conclusions bounded.

---

## 05 — WHAT USERS ACTUALLY EXPERIENCED

**Label:** RESEARCH EVIDENCE

Leisure users described a benefit that was attractive in theory and unreliable in practice.

They hunted for open days. They planned months ahead. They watched reservations collapse without a clear reason. They opened tickets because history filters hid future bookings. They checked email to confirm what the product had not made obvious. Some stopped using the benefit because the wait was not worth it.

They also hit genuine interface failures: unclear calendars, late rule messages, confusing statuses, weak empty states, awkward history filters.

Both things were true at once.

**Paraphrased user signal (anonymised):**  
People valued access to the cars — and abandoned the benefit when waiting and uncertainty dominated.

**Do not publish:** raw participant IDs, identifiable quotes without clearance, booking counts presented as statistically representative.

---

## 06 — THE SERVICE BEHIND THE SCREEN

**Label:** RESEARCH EVIDENCE

Behind every reservation was an operational reality.

Leisure cars were fully electric. They needed time to charge. Short gaps between bookings were more likely to fail. Vehicles also needed inspection before they were truly ready again. Maintenance could cancel plans after people had already organised their lives around a booking.

The calendar could imply a slot. Operations decided whether that slot was real.

This is the layer the interface was least honest about.

---

## 07 — THE TURNING POINT

**Label:** RESEARCH EVIDENCE + INFERENCE (arc)

As findings stacked up, a contradiction became impossible to ignore.

The expert review could fill pages with interface defects. Users could describe them too. And still, the research synthesis put vehicle unavailability first:

**Vehicle unavailability was the primary challenge. Usability concerns were secondary.**

That line does not exonerate the product. It reorders the problem.

If cars are scarce, hard to secure, or not ready when marked available, polishing the booking UI treats the symptom’s packaging. The service still fails at the moment that matters: a person needs a car and cannot reliably get one.

**Turning point in one sentence:**  
The investigation moved from “how do we improve booking?” to “what makes a booking true?”

---

## 08 — THE FIVE FINDINGS

*(Full finding copy lives in §09 below; this section intro for the page:)*

Five patterns organise the evidence. They are not equal.

Availability and readiness sit at the centre.  
Cancellation trust, hidden rules, and work/leisure mismatch explain how the product amplified the deeper constraint.

---

## 09 — WHAT SOFTWARE COULD / COULD NOT SOLVE

**Label:** INFERENCE grounded in RESEARCH EVIDENCE

### Software could meaningfully improve

- Availability discovery and “next open slot” paths  
- Earlier eligibility checks and rule disclosure  
- Status language, confirmation, and history defaults  
- Cancellation reasons and lifecycle clarity  
- Readiness signals *if* operational data exists  
- Differentiated leisure vs work booking intents  

### Software could not, by itself

- Create fleet capacity  
- Remove charge time physics  
- Invent inspection capacity  
- Prevent every maintenance cancellation  
- Make a scarce benefit feel abundant through UI alone  

### The design implication

Build software that tells the operational truth earlier — and only invest in a larger platform rebuild if that rebuild is aimed at the dominant constraint, not only at visual or interaction debt.

---

## 10 — THE INVESTMENT QUESTION

**Label:** PROJECT CONTEXT

A serious platform effort can consume something like **6–12 months**.

That number does not come from the research PDF. It is project context. It is useful because it forces a sharp question:

**If we spend 6–12 months building a new platform, what problem are we actually buying the right to solve?**

If the answer is “a cleaner booking UI,” the research says we may be under-aiming.  
If the answer is “a system that represents availability, readiness, cancellation truth, and different booking intents,” the research becomes a briefing document for the investment — not a vibe check on screenshots.

No cost figures. No ROI theatre. Just the quality of the question.

---

## 11 — DESIGN EXPLORATIONS

**Label:** DESIGN EXPLORATION

From the findings, several product directions follow. They are explorations — not shipped features, not proven outcomes.

- Availability-first booking  
- Waiting list / release notification  
- Work vs leisure intent split  
- Vehicle readiness and charging visibility  
- Explicit cancellation reasons  
- Clearer reservation lifecycle and history  
- Actual pickup/return logging  

Each exploration exists to show how design can respond once the problem is correctly framed.

---

## 12 — OUTCOME

**Label:** INFERENCE / PROJECT CONTEXT — do not overclaim

The research challenged the case for treating Carpool as primarily an interface rebuild.

It changed the investment question from “how do we redesign the booking platform?” to “what must the service make true before software can improve the experience users feel?”

That is the outcome this case can honestly claim: **a sharper decision frame**, grounded in evidence, with clear limits on what was and was not proven.

It does **not** claim a documented executive decision to cancel a platform programme, unless later project context confirms that.

---

## 13 — REFLECTION

Good product design is not only execution inside a given brief. It is the ability to test whether the brief is aimed at the right constraint.

Carpool was a reminder that internal tools inherit the physics of the service they represent. When the service is scarce, operationally buffered, and occasionally cancelled upstream, the product’s job is first to be truthful — then to be graceful.

The research also has limits: leisure-heavy sampling, incomplete work-user evidence, unfinished operational interviews, no measured usability study yet. Senior practice means stating those limits in public, not sanding them off for drama.

---

# 07 — HANDLE THE 6–12 MONTH CONTEXT

**Rule for implementation:**

- Appear only in the Investment Question section (and optionally once in Reflection).  
- Always adjacent to a **PROJECT CONTEXT** label or equivalent footnote.  
- Never attributed to the PDF.  
- Never paired with invented currency, headcount, or ROI.  
- Used as a question: *what problem is that time for?*

**Approved sentence:**  
“A platform rebuild in the 6–12 month range is a serious commitment. The research asks whether that commitment would target availability and operational truth — or only the booking chrome.”

---

# 08 — HANDLE THE OUTCOME CAREFULLY

## Approved outcome language

- “The research challenged the case for rebuilding the platform as a UI-first investment.”
- “The research changed the investment question.”
- “The investigation showed that the dominant constraint existed beyond the interface.”
- “The work reframed what ‘fixing Carpool’ would have to mean.”

## Disallowed outcome language

- “We decided not to build the platform.”
- “We saved €X / N months of engineering.”
- “Adoption increased by Y%.”
- “The redesign launched and solved availability.”

---

# 09 — FIVE CORE FINDINGS

Weighted order for the page: **01 and 03 carry the spine**; 02, 04, 05 explain amplification and product mismatch.

---

## 01 — FINDING A SLOT WAS HARD

**Editorial intro**  
Carpool was offered as a benefit. Using it often meant hunting for a rare opening far into the future.

**Evidence**  
Leisure users described long lead times, trial-and-error date searching, unavailable vehicles still listed, and demotivation when waiting was not worth it. Finding 2 synthesises scarce slots, informal cancellation handoffs, and the absence of a waiting list.  
**RESEARCH EVIDENCE**

**User impact**  
People invested planning effort up front — or gave up on the benefit.

**Problem level**  
**Mixed:** Level 2 scarcity is dominant; Level 1 discoverability makes scarcity feel worse.

**Design implication**  
Availability-first paths; next-open-slot; waiting list / release notification explorations.

**Visual**  
Calendar density / “hunt for a slot” reconstructed search — see Visual Plan V3.

---

## 02 — WORK ≠ LEISURE

**Editorial intro**  
One interface served two different jobs: flexible leisure access and time-critical work use.

**Evidence**  
Finding 3; User III (leisure wants next available; work needs specific dates); work booking requires reason and cost center; personas distinguish the intents. Work interviews remain a research gap.  
**RESEARCH EVIDENCE** (concept) + **PARTIAL** on work lived experience

**User impact**  
Leisure users need flexibility signals; work users need precision. A shared flow blurs both.

**Problem level**  
Primarily **Level 1 product model**, sitting on **Level 2 service difference** (electric leisure vs hybrid work).

**Design implication**  
Intent split before search; tailored fields and availability patterns per mode.

**Visual**  
Split flow diagram / dual booking intents — V4.

---

## 03 — AVAILABLE ≠ READY

**Editorial intro**  
A free calendar cell is not the same thing as a car that can leave the lot.

**Evidence**  
Stronghold: short reservations fail when charge/inspection time is insufficient. Finding 4: electric leisure cars need recharge; close bookings conflict; validation time may be missing.  
**RESEARCH EVIDENCE**

**User impact**  
Users can “succeed” in the UI and still fail in the world.

**Problem level**  
**Level 2 operations**, with Level 1 honesty gap.

**Design implication**  
Readiness and charging visibility; automatic buffers if data exists.

**Visual**  
Return → charge → inspect → ready timeline — V5. This is one of the most important visuals on the page.

---

## 04 — A RESERVATION COULD DISAPPEAR

**Editorial intro**  
Trust broke after the booking — when plans vanished without a usable explanation.

**Evidence**  
Long-horizon booking cancelled late without explanation/alternative; maintenance cancellations; reservation detail without cancel reason; missing cancellation event clarity in history.  
**RESEARCH EVIDENCE**

**User impact**  
Frustration, ticket load, demotivation, informal scrambling.

**Problem level**  
**Mixed:** Level 2 cancellation causes; Level 1 failure to communicate why.

**Design implication**  
Mandatory cancellation reasons; alternatives/waitlist hooks; status history that records the event.

**Visual**  
Reservation detail with missing reason → exploration with reason — V6.

---

## 05 — THE SYSTEM HID ITS OWN RULES

**Editorial intro**  
Policies existed. People met them as errors, greyed calendars, or dead ends after clicking Reserve.

**Evidence**  
One active leisure reservation disclosed late; weekend start restriction misread as total weekend unavailability; third-party driving restriction not visible; unclear accident/liability guidance; history default filter hiding future bookings.  
**RESEARCH EVIDENCE**

**User impact**  
Surprise failure, false conclusions about fleet availability, support tickets, anxiety about liability.

**Problem level**  
Primarily **Level 1** representation of **Level 2/policy** rules.

**Design implication**  
Eligibility before intent; calendar legends; inline policy; better history defaults.

**Visual**  
Late rule disclosure sequence + weekend calendar misread — V7.

---

# 10 — VISUAL PLAN

Approximately 6–8 major reconstructed artefacts. Purpose over decoration.

| ID | Section | Visual type | Purpose | Content | Label |
|---|---|---|---|---|---|
| V1 | Cover / Brief | Typographic statement | Set the insight early | “Available on the calendar ≠ ready in the world.” | TYPOGRAPHIC STATEMENT |
| V2 | Investigation | Diagram | Show method without fake process chrome | Four research activities → evidence types | DIAGRAM · RESEARCH EVIDENCE |
| V3 | Finding 01 | Reconstructed UI | Show availability hunt | Search/calendar with unclear open slots; long-range planning | RECONSTRUCTED UI |
| V4 | Finding 02 | Diagram + light UI | Show intent mismatch | Leisure “next available” vs work “fixed window” | DIAGRAM · DESIGN EXPLORATION (optional pair) |
| V5 | Finding 03 / Service | Diagram | Explain readiness gap | Return → charge → inspect → ready vs bookable slot | DIAGRAM · RESEARCH EVIDENCE |
| V6 | Finding 04 | Reconstructed UI pair | Show trust break | Cancelled reservation without reason → exploration with reason | RECONSTRUCTED UI + DESIGN EXPLORATION |
| V7 | Finding 05 | Reconstructed UI | Show hidden rules | Reserve → late “only one reservation” message; weekend grey-day legend failure | RECONSTRUCTED UI |
| V8 | Software could/couldn’t + Investment | Diagram | Connect levels to investment question | Level 1/2/3 stack; 6–12 month question as annotation | DIAGRAM · PROJECT CONTEXT on timeframe |
| V9 (optional) | Explorations | Design exploration strip | Show constructive response without claiming ship | Availability-first, readiness, lifecycle | DESIGN EXPLORATION |
| V10 (optional) | History / lifecycle | Reconstructed UI | Support findings 04–05 | Status-first history; planned vs actual times | RECONSTRUCTED UI · DESIGN EXPLORATION |

### Priority order if the page must cut visuals

Keep **V3, V5, V6, V7, V8**. Cut decorative statements first.

---

# 11 — RECONSTRUCTED UI BRIEFS

All reconstructions use fictional people, plates, and neutral product naming.  
Each visual requires an on-image or adjacent label: **RECONSTRUCTED UI** (or **DESIGN EXPLORATION**).

Never imply production screenshots.

---

## 1. Availability discovery

- **Reconstructing:** Pool search + calendar/date selection behaviour under scarcity.  
- **Evidence:** Finding a slot was hard; trial-and-error; unavailable items listed; unclear date/time states.  
- **Fictionalise:** Locations as generic city labels if needed; vehicle models anonymised or generic; no real employee data.  
- **3-second read:** “I can’t tell when a car is actually free.”  
- **Label:** RECONSTRUCTED UI

## 2. Work vs leisure

- **Reconstructing:** Shared controls vs split intent entry.  
- **Evidence:** Finding 3; different objectives; work fields (reason/cost center).  
- **Fictionalise:** Cost center values; user identity.  
- **3-second read:** “These are two different jobs wearing one interface.”  
- **Label:** RECONSTRUCTED UI or DIAGRAM

## 3. Available vs ready

- **Reconstructing:** Not a literal production screen — a service timeline tied to a booking slot.  
- **Evidence:** Finding 4; Stronghold charging/inspection.  
- **Fictionalise:** Exact charge durations unless sourced; keep qualitative.  
- **3-second read:** “Bookable on the calendar can still mean not ready.”  
- **Label:** DIAGRAM · RESEARCH EVIDENCE

## 4. Reservation cancellation

- **Reconstructing:** Reservation detail after cancellation with missing reason; optional exploration with reason + next step.  
- **Evidence:** Unexplained cancels; missing reason in detail view; maintenance cancels.  
- **Fictionalise:** Dates, cars, users; do not reproduce confidential cancel anecdotes verbatim if identifiable.  
- **3-second read:** “My plan is gone — and the product won’t say why.”  
- **Label:** RECONSTRUCTED UI (+ DESIGN EXPLORATION for the fix)

## 5. Hidden booking restriction

- **Reconstructing:** Sequence where user clicks Reserve, then learns one-active-reservation rule; or weekend calendar misread.  
- **Evidence:** Late rule disclosure; weekend start restriction confusion.  
- **Fictionalise:** Banner copy paraphrased, not copied from internal policy docs if sensitive.  
- **3-second read:** “The rule arrived after I committed intent.”  
- **Label:** RECONSTRUCTED UI

## 6. Reservation lifecycle

- **Reconstructing:** Status model: scheduled → open/valid → completed / cancelled, with what users do and don’t see.  
- **Evidence:** Status ambiguity; mixed past/ongoing; “approved” confusion.  
- **Fictionalise:** Status names can be clarified in exploration while noting research saw unclear labels.  
- **3-second read:** “Status exists, but it doesn’t explain the reservation’s life.”  
- **Label:** DIAGRAM or RECONSTRUCTED UI

## 7. Reservation history

- **Reconstructing:** Default date filter hiding future-year bookings; empty/wrong mental state.  
- **Evidence:** Finding 1; support ticket behaviour.  
- **Fictionalise:** Ticket narrative anonymised.  
- **3-second read:** “The system hid my future booking behind a default.”  
- **Label:** RECONSTRUCTED UI

## 8. Planned vs actual pickup/return

- **Reconstructing:** History row showing scheduled times only vs exploration with actual logged times.  
- **Evidence:** Finding 5.  
- **Fictionalise:** Timestamps.  
- **3-second read:** “Scheduled time is not proof of what happened.”  
- **Label:** RECONSTRUCTED UI · DESIGN EXPLORATION

---

# 12 — DESIGN EXPLORATIONS

Present as a dedicated section and/or paired “after” states next to reconstructions.

| Exploration | Addresses finding | Must say on page |
|---|---|---|
| Availability-first booking | 01 | Exploration, not shipped |
| Waiting list / release notification | 01, 04 | Operational feasibility unknown |
| Work / leisure intent | 02 | Needs work-user validation |
| Vehicle readiness / charging visibility | 03 | Depends on ops data |
| Reservation lifecycle clarity | 04, 05, history | Writing + event model |
| Explicit cancellation reasons | 04 | Requires ops taxonomy |
| Improved reservation history defaults | 05 / Finding 1 | High-confidence UX fix |
| Actual pickup/return logging | Finding 5 | Requires process/tech capability |

**Section intro copy:**  
These explorations show how the product could tell a more operationally honest story. They are design responses to the research — not a record of implementation.

---

# 13 — EVIDENCE LABELS

Use consistently across page, captions, and storyboard.

| Label | Meaning | Visual treatment suggestion |
|---|---|---|
| **RESEARCH EVIDENCE** | Documented in the research | Quiet caption / chip |
| **RECONSTRUCTED UI** | Fictionalised interface built from evidence | Required on every fake screenshot |
| **DESIGN EXPLORATION** | Conceptual response; not implemented | Distinct from reconstructed “as researched” UI |
| **PROJECT CONTEXT** | Designer-provided framing (e.g. 6–12 months) | Footnote or chip |
| **INFERENCE** | Reasonable conclusion beyond explicit PDF wording | Use sparingly in body; OK in captions |

**Reader rule (short line for the page):**  
Research shows what was learned. Reconstructions illustrate it. Explorations propose what could come next.

---

# 14 — CONFIDENTIALITY

## Final pre-publication checklist

- [ ] Original research PDF not embedded, linked, or downloadable  
- [ ] No raw screenshots from the research deck or production system  
- [ ] No internal URLs, hostnames, or Confluence/login chrome  
- [ ] No employee names, IDs, licence numbers, or identifiable faces  
- [ ] No real licence plates  
- [ ] No identifiable participant quotes without clearance (prefer paraphrase)  
- [ ] No internal tool deep-links or process runbooks pasted verbatim  
- [ ] No credentials, tokens, or environment details  
- [ ] Company/team names (employer, Stronghold, Pulsar, etc.) cleared or anonymised  
- [ ] All UI visuals marked RECONSTRUCTED UI or DESIGN EXPLORATION  
- [ ] 6–12 month timeframe labelled PROJECT CONTEXT  
- [ ] No fabricated metrics, ROI, or “we cancelled the build” claim  

**Portfolio substitute strategy:** reconstructed UI, diagrams, typographic statements, anonymised paraphrases.

---

# 15 — FINAL QUALITY CHECK

| # | Check | Result |
|---|---|---|
| 1 | Major factual claims supported by PDF or labelled project context? | **Pass** — timeframe and initial assumption labelled PROJECT CONTEXT |
| 2 | Inferences distinguishable from evidence? | **Pass** — labels defined; outcome uses inference language |
| 3 | Design explorations ≠ implemented work? | **Pass** — explicit section language |
| 4 | Avoid claiming undocumented business decision? | **Pass** — outcome reframes question; forbids kill-decision claim |
| 5 | Avoid presenting interface as only problem? | **Pass** — central insight keeps UX real and secondary |
| 6 | Research leads to turning point? | **Pass** — primary/secondary unavailability statement is the hinge |
| 7 | Explains why tech investment could be wrong first response? | **Pass** — Level 3 investment question |
| 8 | Senior product-design thinking, not only UI execution? | **Pass** — service/ops/investment framing |
| 9 | Honest about what research did/didn’t prove? | **Pass** — gaps called out (work users, Stronghold depth, no usability metrics) |
| 10 | Business value clear without confidential material? | **Pass** — value is better investment framing under scarcity/readiness constraints |

---

# APPENDIX A — PAGE WIRE (CONTENT ONLY)

Suggested scroll order for implementation later:

1. Cover (insight)  
2. Brief  
3. Initial assumption (project context)  
4. Investigation (methods diagram)  
5. User experience cluster (short)  
6. Service behind the screen (readiness diagram)  
7. Turning point (typographic + quote paraphrase)  
8. Five findings (01→05, unequal visual weight)  
9. Could / could not solve  
10. Investment question (6–12 months)  
11. Design explorations  
12. Outcome  
13. Reflection  
14. Label key / confidentiality note (footer)

---

# APPENDIX B — CLAIMS BANK (SAFE / UNSAFE)

## Safe to say on the public page

- Carpool was an internal vehicle booking benefit.  
- Research included contextual inquiry, leisure-user research, personas, and expert review.  
- Users struggled to find slots and sometimes abandoned the benefit.  
- Unavailability was identified as the primary challenge; usability as secondary.  
- Charging and inspection affect whether a car is ready.  
- Cancellations and missing reasons damaged trust.  
- Leisure and work intents differ.  
- Many interface issues were real and documented.  
- The work reframed the investment question.  
- Design explorations followed from the findings.

## Unsafe without new evidence

- Exact fleet metrics, ROI, costs, savings.  
- “We cancelled the platform rebuild.”  
- “The UI was fine.”  
- Work-user interview findings beyond persona/UI.  
- Measured usability success rates / task times.  
- That recommendations were implemented.  
- Anything requiring the confidential PDF as a public artefact.

---

# APPENDIX C — SOURCE GAP NOTE

`/docs/carpool-case-study.md` was not available in the workspace when this final architecture was written.  
Editorial direction was reconciled from:

1. the research PDF (private),  
2. `/docs/carpool-research-analysis.md`,  
3. the case-study narrative brief supplied in the task.

If an editorial source pack is added later, re-run §02 (Challenge the narrative) against that file before implementation.

---

*End of final content architecture. Ready for portfolio implementation planning; not an implementation ticket.*
