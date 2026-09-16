# Carpool UX Research — Structured Analysis

**Source:** Carpool 2024 UX Review PDF (42 pages)  
**Document title on cover:** CarPool — UX REVIEW — INTERNAL TOOLS  
**Classification badge on slides:** “Classification level: Public”  
**Analysis purpose:** Establish a rigorous source of truth before any portfolio case study, UI, or narrative writing.  
**Status of this file:** Internal analysis only. The source PDF is treated as **private/confidential portfolio source material** even though slides carry a Public classification badge — see §15.

**Evidence labels used throughout:**

| Label | Meaning |
|---|---|
| **DOCUMENTED EVIDENCE** | Explicitly present in the PDF |
| **PROJECT CONTEXT** | Useful framing that may be supplied later, but is not established by the PDF |
| **INFERENCE** | Reasonable conclusion from connecting documented points; not stated as fact |
| **DESIGN OPPORTUNITY** | Potential design implication; not an implemented solution |
| **UNKNOWN** | Not established; must not be assumed |

---

## 01 — PROJECT CONTEXT

### What the PDF actually says about Carpool

**DOCUMENTED EVIDENCE**

- The product is referred to as **CarPool / Carpool**, presented as an **Internal Tools** UX review.
- The live interface shown in expert review is titled **“TEST & POOL CAR MANAGEMENT”**.
- Navigation tabs documented: **Pool**, **Test**, **My Reservations**.
- Carpool is described by participants as a **benefit offered by CTW**.
- Booking categories documented: **Leisure** and **Work**.
- Locations documented in the interface: **Lisbon**, **Oporto**, **Braga**.
- Vehicles shown include BMW and MINI models (electric leisure cars; hybrid work cars).
- Leisure hours remaining are displayed in the UI (e.g. “Leisure Hours Available”).
- Reservation statuses observed in UI screenshots include: **Open**, **Canceled / Canceled**, **Completed**, **RESERVED**, **UNAVAILABLE**.
- Automated email confirmations are sent from **Internal Tools** when a reservation is made.
- Operational pick-up / drop-off concerns are associated with a team called **Stronghold**.

### The service

**DOCUMENTED EVIDENCE**

- Employees can reserve company pool vehicles for **leisure** or **work**.
- **Work cars:** hybrid vehicles (Stronghold context inquiry).
- **Leisure cars:** fully electric vehicles (Stronghold context inquiry).
- Only **one active reservation per user / per type** is referenced as a restriction (wording varies: “one active reservation”, “one leisure reservation at a time”, “one active reservation per type”).
- Policy references appear in UI copy (“Check the Pool Vehicles Policy”).
- Users must register a driving licence to reserve Pool vehicles.
- Work reservations require a **reason** and a **cost center**.
- Leisure usage appears limited by available leisure hours.
- Pickup and drop-off are scheduled by date and time in the booking UI.
- App check-out is described as **unnecessary**, but users were unsure of this.
- Third-party drivers appear restricted, but this information is not visible in the interface (user research).
- Fines for infractions are routed to CTW; Finance identifies the responsible user and charges them.
- SCUTS toll handling is described as unclear.
- Maintenance / repair can cause reservation cancellations.
- Charging and inspection between reservations affect readiness for the next booking.

### Users

**DOCUMENTED EVIDENCE**

- Primary research participants documented as **USER I–V**, all booked for **leisure purposes**.
- Personas include leisure employee, work employee, and operational/management role.
- Expert review screenshots show identifiable employee names/IDs in the product UI (see §15).
- Future research explicitly calls for interviewing people with **work reservations**.

### Vehicles

**DOCUMENTED EVIDENCE**

- Fleet includes electric leisure cars and hybrid work cars.
- Newer cars are harder to book (user research).
- “Test” vehicles exist as a separate path/app; the Test option is visible even when users do not need it.
- Vehicle cards show seats, transmission, class, powertrain, and range.
- Availability can be blocked for ranges with messages such as company priority / unavailability windows.

### Booking

**DOCUMENTED EVIDENCE**

- Booking flow: filter by location / category / pickup–dropoff → view vehicles → Reserve → confirm (licence, terms, etc.).
- My Reservations uses a date-range filter with a problematic default (end of current year / limited window).
- Confirmations also arrive by email.
- Cancellation is supported; cancellation reasons are not always shown.
- Informal transfer / coordination of bookings happens outside the app (e.g. Teams), partly due to lack of waiting list and limited availability.

### Operational context

**DOCUMENTED EVIDENCE**

- **Stronghold** is involved in pick-up/drop-off process, concerns, and scenarios (section title and finding content).
- Operational concerns documented: charging time, inspection before next availability, late returns/penalties, accidents/liability, condition documentation, fines, SCUTS.
- Short reservations are more likely to fail due to insufficient charging time and insufficient inspection time.
- Maintenance can force cancellations after bookings are made.

### Research objectives

**DOCUMENTED EVIDENCE**

- The deck is structured as: Initial Context Inquiry → Research → Personas → User Expert Review → Main Findings → Next Steps.
- Contextual inquiry is framed as understanding how people work in their natural environment, including stakeholders/management roles.
- Expert review critiques the existing booking/reservation interface.
- Main findings synthesise problems and recommendations.
- Next steps propose further interviews, data analysis, mockups, and usability tests.

### Separation: facts vs assumptions

| Topic | Status |
|---|---|
| Carpool is an internal CTW vehicle pool / benefit | **DOCUMENTED EVIDENCE** (benefit framing + Internal Tools) |
| Exact fleet size, utilisation rates, cities beyond UI filters | **UNKNOWN** |
| Formal project brief / stakeholder ask that started the work | **UNKNOWN** / may be **PROJECT CONTEXT** later |
| Whether recommendations were implemented | **UNKNOWN** — PDF recommendations ≠ implementation evidence |
| Whether Stronghold interviews happened after this deck | **UNKNOWN** |
| Business KPIs, ROI, cost, adoption metrics | **UNKNOWN** — not in PDF |

---

## 02 — RESEARCH METHODS

Only methods documented in the PDF are listed. No methodologies were added.

### 1) Initial contextual inquiry (methodology explanation + Stronghold context)

**Pages:** 3–5

**What was done (DOCUMENTED EVIDENCE):**
- The deck defines contextual inquiry as observing users in context, asking questions, and including stakeholders/management roles.
- A **Stronghold Context Inquiry** page documents pick-up and drop-off process concerns and scenarios: charging time, reservation policies/limitations, car types/usage, and user scenarios (late returns, accidents, condition documentation, fines, SCUTS).

**Why it was done (DOCUMENTED EVIDENCE / light INFERENCE):**
- Explicitly: to understand how people work in natural context and how the service is used across roles.
- **INFERENCE:** Stronghold was treated as an operational stakeholder whose constraints affect booking success.

**Evidence produced:**
- Operational constraints and policy ambiguities (charging, inspection, one-reservation rule, penalties, liability, fines, tolls).
- Distinction between work (hybrid) and leisure (electric) cars.

**Limitations:**
- The PDF does not document interview count, observation protocol, session length, or verbatim Stronghold transcripts.
- It is unclear whether Stronghold inquiry was observation, interview, workshop notes, or secondary summary.
- Scenario list may mix observed issues and known process concerns — **UNKNOWN** which scenarios were directly observed vs reported.

### 2) User research (Users I–V)

**Pages:** 6–10

**What was done (DOCUMENTED EVIDENCE):**
- Feedback from five labelled users (I–V), all leisure bookers.
- Each user page lists booking/cancellation/fine counts and thematic findings.
- Includes Portuguese user quotes (Users III/IV areas include quoted feedback).

**Why it was done:**
- Not stated as a formal research question. **INFERENCE:** to capture lived booking experience of leisure users.

**Evidence produced:**
- Qualitative pain points: availability, cancellations, calendar/filter confusion, confirmation uncertainty, rules opacity, communication gaps, vehicle condition, accidents.
- Explicit priority statement from User III synthesis: vehicle unavailability is primary; usability secondary.

**Limitations:**
- All documented participants are leisure users; work users are missing.
- Sample is small and not claimed to be representative.
- Recruitment method, interview guide, and analysis method are **UNKNOWN**.
- Some counts are imprecise (“Booked many times”).
- Quotes are selective, not a full transcript corpus.

### 3) Personas

**Pages:** 11–12

**What was done (DOCUMENTED EVIDENCE):**
- Three personas: **Aires** (leisure), **Ricardo** (work), **Rita** (operations/management).

**Why it was done:**
- Not explicitly justified beyond section placement after research. **INFERENCE:** to synthesise role differences for design.

**Evidence produced:**
- Role-level goals and booking contexts (weekend leisure try-out; fixed work commitment; managing cars/requests/surveys).

**Limitations:**
- Persona construction method not documented (how tied to Users I–V vs assumed roles).
- Ricardo (work) and Rita (ops) are not backed by the same interview evidence as leisure users in this deck.
- Stock/portrait imagery and names should not be treated as real people.

### 4) User expert review

**Pages:** 13–33

**What was done (DOCUMENTED EVIDENCE):**
- Annotated walkthrough of the existing TEST & POOL CAR MANAGEMENT UI.
- Covers Pool search, vehicle cards, error toasts, reservation modal, licence registration, calendar/time availability, My Reservations list/filters/details, cancellation confirmation, Test→Confluence login path, and reservation email.

**Why it was done:**
- Not explicitly stated. **INFERENCE:** heuristic/expert inspection of interface frictions complementary to user interviews.

**Evidence produced:**
- Interface-level issues: unclear filters, poor error messages, premature Reserve affordance, unclear status language, missing empty states, privacy concerns (showing who reserved), UX writing problems, slow loading, confirmation gaps, Test tab dead-end.

**Limitations:**
- Expert review findings are reviewer observations, not validated usability test metrics.
- Screenshots may reflect specific test accounts/states, not all user states.
- No task success rates, times, or severity scores are provided.

### 5) Main findings

**Pages:** 34–39

**What was done (DOCUMENTED EVIDENCE):**
- Five synthesised findings, each with problem, impact, UX principles, and recommendations.

**Why it was done:**
- To consolidate research into priority problem statements and design recommendations.

**Evidence produced:**
- Structured claims about defaults, availability discovery, leisure/work distinction, charging readiness, and actual pickup/return logging.

**Limitations:**
- Recommendations are proposals, not evidence of implementation or validated solutions.
- Some quantitative-sounding language (e.g. “up to 9 months”) appears in Finding 2; related user research also says weekend booking can take “up to four months”. Treat these as **reported in the deck**, not independently verified metrics.
- Principles cited are interpretive framing by the researchers.

### 6) Proposed next steps

**Pages:** 40–41

**What was done (DOCUMENTED EVIDENCE):**
- Roadmap of further work: interview Stronghold; interview work reservation users; analyse extra reservation data; design mockups and usability tests (define flows, plan tests with success rate / task time / feedback, iterate with 3–5 users).

**Why it was done:**
- Explicitly framed as “WHAT’s NEXT” — acknowledging unfinished research.

**Evidence produced:**
- Research gaps and intended validation approach.

**Limitations:**
- Next steps are plans, not completed activities.
- Planned usability metrics do not exist yet as results.

### Methods NOT documented

Do not claim the PDF includes: diary studies, surveys with response rates, A/B tests, analytics dashboards, journey maps as research method, competitive analysis, or completed usability tests with measured outcomes.

---

## 03 — USERS AND ROLES

### A. Leisure users (interviewed participants)

#### USER I — Leisure

- **Role:** Employee booking for leisure.
- **Goal:** Use Carpool for leisure trips.
- **Booking context:** 4 bookings, 1 cancellation.
- **Constraints / issues (evidence):** cancellation event log gaps; availability/scheduling friction; interface usability; unclear rules; drop-off confusion; high demand; no in-app contact with other users.
- **Evidence:** Page 7 findings attributed to Users I & II collectively in the layout; User I badge on page 7.
- **Problem type:** Mixed (service + interface + communication).

#### USER II — Leisure

- **Role:** Employee booking for leisure.
- **Goal:** Use Carpool for leisure; appears heavy cancel activity.
- **Booking context:** 5 bookings, 8 cancellations, 1 fine.
- **Constraints / issues:** Same thematic cluster on page 7 (shared findings board with User I).
- **Evidence:** Page 7.
- **Note:** High cancellation count is **DOCUMENTED** as activity, but reasons for those 8 cancellations are **UNKNOWN** at individual level.

#### USER III — Leisure

- **Role:** Employee booking for leisure.
- **Goal:** Use Carpool as a CTW benefit.
- **Booking context:** 1 booking, 1 cancellation.
- **Constraints:** Long waits / limited availability demotivate use; advance planning required; late cancellation of long-horizon booking; unclear availability on main page; wants next available slot for leisure vs specific dates for work.
- **Key documented statement:** Vehicle unavailability is the primary challenge; usability concerns are secondary.
- **Quote (DOCUMENTED):** “I stopped using this benefit because it’s not worth the waiting time.”
- **Evidence:** Page 8.
- **Problem type:** Primarily service/availability; interface secondary by user’s own framing.

#### USER IV — Leisure

- **Role:** Employee booking for leisure.
- **Goal:** Enjoy using cars / availability of cars.
- **Booking context:** 3 bookings.
- **Constraints:** My Reservations year-end default filter; weekend calendar confusion; booking errors (e.g. Mini); maintenance cancellations; unclear accident procedure / liability.
- **Quotes (DOCUMENTED, Portuguese):**
  - “Eu adoro carros, e adoro o facto de haver disponibilidade para usar os carros.”
  - “Eu tive de abrir um ticket, estupidamente.”
  - Accident/liability uncertainty quote regarding scratches and who pays.
- **Evidence:** Page 9.
- **Problem type:** Mixed (interface defaults + service cancellations + policy communication).

#### USER V — Leisure

- **Role:** Employee booking for leisure.
- **Goal:** Ongoing leisure use.
- **Booking context:** Booked “many times”, 1 cancellation.
- **Constraints:** Vehicle condition (worn tires) + ticket to restore hours; Test option visible unnecessarily; My Reservations filter/history issues; confirmation uncertainty (email check); no empty state when cars disappear.
- **Evidence:** Page 10.
- **Problem type:** Mixed (operations/condition + interface feedback + account/hours accountability).

### B. Work users

**DOCUMENTED EVIDENCE (persona only):**
- **Ricardo (Persona 2):** Needs a car on a fixed date and specific timeframe because of a work commitment.

**DOCUMENTED EVIDENCE (interface):**
- Work category exists; work booking modal asks for reason and cost center; work cars shown as hybrid in Stronghold notes.

**UNKNOWN / research gap:**
- No interviewed work users are documented in Users I–V.
- Page 28 annotation: “For the future: it is important to talk with users that make reservation for work.”
- Next steps explicitly include interviewing people with work reservations.

### C. Operational / management users

**DOCUMENTED EVIDENCE:**
- **Rita (Persona 3):** Manages cars and requests; analyses surveys and needs.
- **Stronghold:** Operational context for charging, inspection, validations, pick-up/drop-off scenarios.
- Finance team handles fine attribution (scenario description).

**UNKNOWN:**
- Whether Rita maps to a real role title, Stronghold member, or composite.
- Exact Stronghold workflow steps, SLAs, staffing, tools.

### Leisure vs work vs ops — contrast

| Dimension | Leisure | Work | Ops / Stronghold |
|---|---|---|---|
| Timing need | Flexibility; next available slot | Fixed date/time | Turnaround readiness between bookings |
| Primary friction in deck | Availability / long lead times | Under-researched; needs precision | Charging, inspection, validation |
| Interface implication | Availability-first discovery | Date-specific search + reason/cost center | Status/readiness visibility, logging |
| Evidence strength | Strong (Users I–V) | Weak in this PDF (persona + UI only) | Medium (context inquiry + Finding 4) |

---

## 04 — RAW FINDINGS

Comprehensive inventory. Themes are analytical groupings; each item cites source pages.

For each: **Finding / Evidence / Source / User impact / Problem type**

### Availability

1. **Finding:** High demand makes vehicle usage difficult; newer cars harder to book; weekend booking can take up to four months.  
   **Evidence:** User research synthesis.  
   **Source:** p.7  
   **Impact:** Users struggle to obtain cars; long planning horizon.  
   **Type:** Service / operations (demand vs fleet), surfaced in interface.

2. **Finding:** Main page does not clearly display available days → trial-and-error.  
   **Evidence:** User III.  
   **Source:** p.8  
   **Impact:** Frustration; inefficient search.  
   **Type:** Interface (discoverability), driven by scarce availability.

3. **Finding:** Vehicles with no available dates still appear in options.  
   **Evidence:** Users I/II board.  
   **Source:** p.7  
   **Impact:** Frustration; wasted attempts.  
   **Type:** Interface.

4. **Finding:** Unavailable times not clearly indicated.  
   **Evidence:** Users I/II; expert calendar/time annotations.  
   **Source:** p.7, p.23  
   **Impact:** Booking errors / confusion.  
   **Type:** Interface.

5. **Finding:** When cars become unavailable they disappear with no empty-state explanation.  
   **Evidence:** User V.  
   **Source:** p.10  
   **Impact:** Users lack explanation of why list changed.  
   **Type:** Interface.

6. **Finding:** Difficulty finding available slots is a core synthesised finding; users book months ahead; informal cancel/transfer due to no waiting list; Finding 2 mentions planning up to 9 months.  
   **Evidence:** Main Finding 2.  
   **Source:** p.36  
   **Impact:** Benefit underused; cancellation churn; time-consuming calendar navigation.  
   **Type:** Mixed (service scarcity + missing product features).

### Booking

7. **Finding:** Selected time is misunderstood as a window rather than a starting point / pickup moment.  
   **Evidence:** Users I/II.  
   **Source:** p.7  
   **Impact:** Wrong assumptions about when car can be collected.  
   **Type:** Interface / UX writing / mental model.

8. **Finding:** Booking lacks clear closure/confirmation in-app; users check email.  
   **Evidence:** Users I/II; User V; expert success-screen notes.  
   **Source:** p.7, p.10, p.26  
   **Impact:** Uncertainty whether booking succeeded.  
   **Type:** Interface.

9. **Finding:** Reserve is clickable before availability is established; should be disabled by default (expert note).  
   **Evidence:** Expert review annotation.  
   **Source:** p.14  
   **Impact:** Premature commitment path.  
   **Type:** Interface.

10. **Finding:** System can allow selecting past dates then error: “Reservations in the past aren't allowed.”  
    **Evidence:** Expert review.  
    **Source:** p.15  
    **Impact:** Error after action rather than prevention.  
    **Type:** Interface.

11. **Finding:** Conflict message “There are conflict reservations” without clear cause.  
    **Evidence:** Expert review.  
    **Source:** p.16  
    **Impact:** User cannot diagnose failure.  
    **Type:** Interface.

12. **Finding:** Unclear unavailable message (“Company priority needs reason”).  
    **Evidence:** Expert review.  
    **Source:** p.17  
    **Impact:** Confusion about why car blocked.  
    **Type:** Interface / policy communication.

13. **Finding:** One-leisure-reservation rule shown after clicking Reserve, not before.  
    **Evidence:** Expert review.  
    **Source:** p.18, p.22  
    **Impact:** Dead-end after intent.  
    **Type:** Interface (rule timing).

14. **Finding:** Booking errors for specific cars (e.g. Mini) with persistent errors.  
    **Evidence:** User IV.  
    **Source:** p.9  
    **Impact:** Cannot complete booking for desired vehicle.  
    **Type:** Mixed / UNKNOWN root cause (bug vs policy vs availability).

15. **Finding:** Cost center unclear; placeholder poor; Pulsar lookup required instead of automatic.  
    **Evidence:** Users I/II; expert work modal.  
    **Source:** p.7, p.19  
    **Impact:** Extra effort; confusion for work booking.  
    **Type:** Interface + process integration.

### Work vs Leisure

16. **Finding:** Work bookings need specific dates; leisure should be more flexible / show next available slot.  
    **Evidence:** User III.  
    **Source:** p.8  
    **Impact:** One UI pattern poorly serves both goals.  
    **Type:** Interface design mismatch.

17. **Finding:** Same interface for leisure and work causes confusion (Finding 3).  
    **Evidence:** Main findings.  
    **Source:** p.37  
    **Impact:** Misaligned bookings, especially urgent work timing.  
    **Type:** Interface.

18. **Finding:** Work cars hybrid; leisure cars fully electric.  
    **Evidence:** Stronghold context.  
    **Source:** p.5  
    **Impact:** Different operational constraints (especially charging for leisure).  
    **Type:** Service / fleet design.

### Charging

19. **Finding:** Users unclear about charging time per car; short reservations more likely to fail due to charging + inspection time.  
    **Evidence:** Stronghold context.  
    **Source:** p.5  
    **Impact:** Scheduling failures; readiness gaps.  
    **Type:** Operations + service design; visibility is interface opportunity.

20. **Finding:** Electric leisure cars need recharge time; close reservations create conflicts; Stronghold may lack time to validate condition (Finding 4).  
    **Evidence:** Main findings.  
    **Source:** p.38  
    **Impact:** Car “available” but not usable/ready.  
    **Type:** Operations + interface status gap.

### Vehicle readiness

21. **Finding:** Inspection time needed before car is available again.  
    **Evidence:** Stronghold context; Finding 4 impact.  
    **Source:** p.5, p.38  
    **Impact:** Hidden buffer between bookings.  
    **Type:** Operations.

22. **Finding:** Unavailability windows exist (maintenance/priority), sometimes poorly explained.  
    **Evidence:** Expert review messages; User IV maintenance cancellations.  
    **Source:** p.9, p.17  
    **Impact:** Frustration; broken plans.  
    **Type:** Mixed.

### Maintenance

23. **Finding:** Bookings cancelled because cars need repairs.  
    **Evidence:** User IV.  
    **Source:** p.9  
    **Impact:** Significant frustration after planning.  
    **Type:** Service / operations; communication of reason is interface gap.

### Cancellation

24. **Finding:** No cancellation event record in My Reservations.  
    **Evidence:** Users I/II.  
    **Source:** p.7  
    **Impact:** Ambiguity about what happened.  
    **Type:** Interface / history.

25. **Finding:** Cancellation not restricted to reservation owner → ambiguities.  
    **Evidence:** Users I/II.  
    **Source:** p.7  
    **Impact:** Ownership/accountability confusion.  
    **Type:** Service rules + interface.

26. **Finding:** Long-horizon booking cancelled late (booked Jan for Sep; notified ~20 days prior) without explanation/alternative; multiple users affected.  
    **Evidence:** User III.  
    **Source:** p.8  
    **Impact:** Broken plans; loss of trust; demotivation.  
    **Type:** Service/ops + communication.

27. **Finding:** Cancelled reservation details do not indicate why.  
    **Evidence:** Expert review annotation.  
    **Source:** p.25  
    **Impact:** No actionable understanding.  
    **Type:** Interface.

28. **Finding:** Cancel confirmation copy needs UX writing review (incl. “loose” typo noted in review).  
    **Evidence:** Expert review.  
    **Source:** p.30–31  
    **Impact:** Low clarity/trust in destructive action.  
    **Type:** Interface / UX writing.

### Reservation history

29. **Finding:** Default My Reservations filter limited to current year / limited window → future-year bookings hidden; ticket opened.  
    **Evidence:** User IV, User V, Finding 1.  
    **Source:** p.9, p.10, p.35  
    **Impact:** Users think they have no reservations; support load; loss of confidence.  
    **Type:** Interface.

30. **Finding:** Date-picker filter unintuitive (need start and end); mandatory for bookings outside current month.  
    **Evidence:** Users I/II, User V.  
    **Source:** p.7, p.10  
    **Impact:** History hard to retrieve.  
    **Type:** Interface.

31. **Finding:** Not ensured that all bookings appear in history.  
    **Evidence:** User V.  
    **Source:** p.10  
    **Impact:** Incomplete personal record.  
    **Type:** Interface / system reliability (**UNKNOWN** root cause).

32. **Finding:** Past and ongoing reservations mixed; status placement/writing unclear (“Open”, “Completed”).  
    **Evidence:** Expert review.  
    **Source:** p.28–29  
    **Impact:** Hard to scan what matters now.  
    **Type:** Interface.

33. **Finding:** My Reservations loading is slow.  
    **Evidence:** Users I/II; expert review.  
    **Source:** p.7, p.27  
    **Impact:** Degraded experience; abandonment risk.  
    **Type:** Interface / performance.

### Reservation status

34. **Finding:** Status is most important info but listed last.  
    **Evidence:** Expert review.  
    **Source:** p.28  
    **Impact:** Poor scanability.  
    **Type:** Interface.

35. **Finding:** “Approved” on success screen is unclear; success screen omits when/what was reserved.  
    **Evidence:** Expert review.  
    **Source:** p.26  
    **Impact:** Incomplete confirmation.  
    **Type:** Interface / UX writing.

36. **Finding:** Reserved cars show who holds them — privacy concern raised.  
    **Evidence:** Expert review.  
    **Source:** p.18  
    **Impact:** Potential privacy issue; may also enable informal coordination (**INFERENCE**).  
    **Type:** Interface / policy.

### Rules and restrictions

37. **Finding:** One active reservation limit not clearly communicated.  
    **Evidence:** Users I/II; Stronghold; expert banners.  
    **Source:** p.5, p.7, p.18, p.22  
    **Impact:** Surprise blocks.  
    **Type:** Mixed (policy + interface timing).

38. **Finding:** Third-party driver restriction not visible.  
    **Evidence:** Users I/II.  
    **Source:** p.7  
    **Impact:** Rule discovery failure.  
    **Type:** Interface / policy communication.

39. **Finding:** Weekend start restriction misunderstood as weekend unavailability.  
    **Evidence:** User IV.  
    **Source:** p.9  
    **Impact:** Users believe weekends impossible; may abandon valid Fri–Mon patterns.  
    **Type:** Interface representation of rules.

40. **Finding:** Late return penalties mentioned but details unclear.  
    **Evidence:** Stronghold.  
    **Source:** p.5  
    **Impact:** Uncertainty about consequences.  
    **Type:** Policy communication / operations.

41. **Finding:** Accident / damage procedure and liability unclear.  
    **Evidence:** Stronghold scenario; User IV quote.  
    **Source:** p.5, p.9  
    **Impact:** Anxiety; unclear financial responsibility.  
    **Type:** Policy communication / service design.

42. **Finding:** Expired driving licence behaviour unclear (expert question).  
    **Evidence:** Expert review sticky note.  
    **Source:** p.21  
    **Impact:** UNKNOWN system behaviour; booking may be blocked.  
    **Type:** Interface / policy; largely **UNKNOWN**.

### Communication

43. **Finding:** No in-app way to contact other reservation holders; users use Teams.  
    **Evidence:** Users I/II.  
    **Source:** p.7  
    **Impact:** Informal workarounds; no guarantee of getting released car.  
    **Type:** Product/service gap.

44. **Finding:** No waiting list; cancellations/transfers handled informally.  
    **Evidence:** Finding 2.  
    **Source:** p.36  
    **Impact:** Inefficient reallocation; frustration.  
    **Type:** Service / product feature gap.

45. **Finding:** Reservation email exists but look/feel and UX writing need review.  
    **Evidence:** Expert review.  
    **Source:** p.33  
    **Impact:** Confirmation quality uneven.  
    **Type:** Interface / communications design.

### UX writing

46. **Finding:** Multiple expert notes call for UX writing review (errors, Reset Fields, statuses, cancel copy, email, “approved”).  
    **Evidence:** Expert review across pages.  
    **Source:** p.15–17, p.26, p.28, p.30–31, p.33  
    **Impact:** Ambiguity and reduced trust.  
    **Type:** Interface.

47. **Finding:** Leisure hours shown as raw hours (e.g. 153.05h) rather than natural language.  
    **Evidence:** Expert review.  
    **Source:** p.14  
    **Impact:** Harder comprehension of remaining benefit.  
    **Type:** Interface.

### Operational workflow

48. **Finding:** Stronghold manages charging, inspection, validations; constraints should inform design (next steps).  
    **Evidence:** Stronghold inquiry; next steps.  
    **Source:** p.5, p.41  
    **Impact:** Booking success depends on ops readiness, not only calendar slots.  
    **Type:** Operations.

49. **Finding:** Fines → CTW → Finance charges responsible user.  
    **Evidence:** Stronghold scenario 4.  
    **Source:** p.5  
    **Impact:** Accountability path exists for fines; process opacity to end users **UNKNOWN**.  
    **Type:** Operations / policy.

50. **Finding:** SCUTS process unclear.  
    **Evidence:** Stronghold scenario 5.  
    **Source:** p.5  
    **Impact:** User uncertainty about tolls.  
    **Type:** Operations / policy communication.

### Vehicle condition

51. **Finding:** Users document condition with photos/videos when damage contested.  
    **Evidence:** Stronghold scenario 3.  
    **Source:** p.5  
    **Impact:** Self-protection behaviour; suggests trust gaps.  
    **Type:** Operations / accountability.

52. **Finding:** Worn tires incident; user opened ticket to restore hours; had not checked condition at start.  
    **Evidence:** User V.  
    **Source:** p.10  
    **Impact:** Lost hours / support burden; condition risk.  
    **Type:** Mixed (ops condition + user behaviour + hours policy).

### Accountability

53. **Finding:** System records scheduled times but not actual pickup/return; early return not evidenced (Finding 5).  
    **Evidence:** Main findings.  
    **Source:** p.39  
    **Impact:** Accountability disputes if issues arise after early return.  
    **Type:** Service/system logging + interface history.

54. **Finding:** Hours restoration via ticket after condition issue.  
    **Evidence:** User V.  
    **Source:** p.10  
    **Impact:** Manual remediation; fragile trust in hours ledger.  
    **Type:** Operations / policy.

### Additional expert-review specifics

55. **Finding:** Location filter ambiguity (user location vs car location).  
    **Evidence:** Expert note.  
    **Source:** p.14  
    **Impact:** Possible mis-filtering.  
    **Type:** Interface.

56. **Finding:** Pickup/dropoff controls apply to all cars but that is not clear.  
    **Evidence:** Expert note.  
    **Source:** p.14  
    **Impact:** Misunderstanding of search model.  
    **Type:** Interface.

57. **Finding:** Test tab visible but leads to separate Confluence login / different app; users don’t need Test cars.  
    **Evidence:** Expert review + User V.  
    **Source:** p.10, p.14, p.20, p.32  
    **Impact:** Distraction / dead end.  
    **Type:** Interface / IA.

58. **Finding:** Profile-like licence/user data shown in reservation modal; reviewer suggests profile section instead.  
    **Evidence:** Expert note.  
    **Source:** p.20  
    **Impact:** Clutter / misplaced info.  
    **Type:** Interface.

59. **Finding:** Hours message contradiction (“use 0:00 hours” while hours remain).  
    **Evidence:** Expert note.  
    **Source:** p.20  
    **Impact:** Distrust of hours calculation.  
    **Type:** Interface / logic.

---

## 05 — EVIDENCE HIERARCHY

### A. Strong evidence

Repeated across users and/or elevated to Main Findings / explicit priority statements:

1. **Vehicle unavailability / scarce slots is the primary barrier** (User III key issue; Finding 2; demand notes on p.7; demotivation quotes).
2. **Users must book far in advance** (p.7 four months; Finding 2 up to 9 months; User III advance planning).
3. **Availability is hard to discover in the UI** (trial-and-error; unavailable items listed; unclear date/time states; Finding 2 search recommendation).
4. **My Reservations default filter hides future-year / out-of-window bookings** (Users IV & V + Finding 1 + support ticket).
5. **Leisure vs work needs differ, but flows are insufficiently differentiated** (User III + Finding 3 + work modal specifics).
6. **Cancellations (esp. late / unexplained / maintenance) damage trust** (User III anecdote; User IV maintenance; missing cancel reasons in UI).
7. **Charging + inspection create readiness constraints for electric leisure cars** (Stronghold + Finding 4).
8. **Rules exist but are poorly timed or poorly explained** (one reservation; weekend start; third-party; penalties; accidents).
9. **Confirmation / status / UX writing repeatedly fail to explain system state** (expert review cluster + user confirmation uncertainty).

### B. Supporting evidence

Individual observations that reinforce broader patterns:

- Newer cars harder to book.
- Informal coordination via Teams / no waiting list.
- Empty-state absence when vehicles vanish.
- Slow My Reservations loading.
- Cost center / Pulsar friction for work.
- Email confirmation exists but needs writing/visual review.
- Test tab irrelevant/confusing.
- Hours displayed in unnatural format; occasional contradictory hours messaging.
- Privacy concern showing reservation holders’ names.
- Vehicle condition documentation behaviour (photos/videos).

### C. Isolated observations

Interesting but insufficient alone to claim a broad pattern:

- Specific Mini persistent booking errors (User IV).
- Worn-tires incident + hours restoration ticket (User V) — serious, but single documented case.
- SCUTS toll ambiguity (Stronghold scenario) — stated as unclear, not user-validated in interviews.
- Exact Jan→Sep booking cancelled 20 days prior (powerful story, one documented anecdote, though text says multiple users affected by unexplained cancellations).
- Expired licence edge case (expert question, unanswered).
- Inconsistent vehicle images in history table.
- “0 reservations vs NO reservations” empty-state wording nuance.
- Specific spelling error “loose” in cancel modal.

Do not inflate C into A.

---

## 06 — THE MOST IMPORTANT FINDINGS

Based only on the PDF, the major patterns that appear to matter most are interrelated rather than ranked by score.

### Pattern cluster: Scarcity first, interface second

**DOCUMENTED EVIDENCE (central statement):**  
User III synthesis (p.8): **“Vehicle unavailability is the primary challenge, making usability concerns secondary.”**  
Also: “The interface is not a problem as long as vehicles are available.”

**Supporting evidence for that statement:**
- Users stop using the benefit because waiting is not worth it (quote).
- Lead times of months for weekends / far-ahead planning.
- Finding 2 frames the app as a benefit users cannot fully use due to slot scarcity and lack of waiting list.
- Demand and newer-car scarcity notes on p.7.
- Late operational cancellations after long-horizon booking amplify scarcity pain.

**Relationship:** Interface friction is real and documented, but the research itself positions it as secondary when cars cannot be obtained. Improving booking UX without addressing availability discovery, readiness, and reallocation would likely under-deliver against the core user complaint.

### Pattern cluster: “Available” ≠ “Ready”

Stronghold + Finding 4 connect charging and inspection to failed or conflicted short reservations. Calendar availability can overstate readiness.

### Pattern cluster: Hidden rules and silent system behaviour

One-reservation limits, weekend start rules, third-party driving, cancellation ownership, and status meanings are learned painfully. Defaults (year filter) actively mislead.

### Pattern cluster: Trust breaks after the booking

Unexplained cancellations, missing cancel reasons, incomplete confirmation, and lack of actual pickup/return evidence undermine accountability after users invest planning effort.

### Pattern cluster: Leisure researched; work and ops incomplete

The deck knows leisure pain in detail, but next steps admit Stronghold and work users still need deeper research. Finding 3/4 already point beyond leisure UI tweaks into service differentiation and ops constraints.

---

## 07 — SERVICE VS INTERFACE

| Major finding | Underlying constraint location | Notes |
|---|---|---|
| Limited vehicle availability / long lead times | **Service / demand–supply** | Primary per User III; UI can only mediate, not create cars |
| Difficulty finding open slots / trial-and-error calendar | **Interface**, conditioned by scarcity | Search/waitlist can reduce wasted effort |
| Informal transfers / Teams coordination | **Service gap + product gap** | No waiting list / handoff mechanism |
| Charging conflicts / short reservation failures | **Operations + fleet (electric leisure)** | Interface opportunity: readiness visibility / buffers |
| Inspection before next booking | **Operations** | Often invisible in booking UI |
| Maintenance cancellations | **Operations / service** | Interface should communicate reason/alternatives |
| One active reservation rule | **Policy/service rule** | Interface fails on timing/visibility |
| Weekend start restriction misunderstanding | **Policy**, poorly represented in **interface** | Calendar affordance misleads |
| Leisure vs work same interaction model | **Interface / product model** | Needs differ by service purpose |
| My Reservations default filter | **Interface** | Strong, repeated evidence |
| Unclear statuses / confirmation / UX writing | **Interface** | Secondary but pervasive |
| Showing reservation holder identity | **Interface / privacy policy** | Ambiguous value vs risk |
| Actual vs scheduled pickup/return | **System/ops logging** (+ interface history) | Accountability gap |
| Accident/fines/SCUTS uncertainty | **Policy/ops communication** | Mostly outside booking UI |
| Test tab / Confluence dead-end | **Interface IA / product boundary** | Clear interface issue |
| Cost center via Pulsar | **Process integration** | Work booking ops/tooling |

**Overall reading (INFERENCE grounded in evidence):**  
The research points to a **combination problem**, with **service scarcity and operational readiness as the dominant constraint**, and **interface failures amplifying discoverability, rule clarity, confirmation, and trust**. It does **not** support a claim that the problem is “just a bad booking UI.”

---

## 08 — THE RESEARCH TURNING POINT

Do not assume the team began knowing scarcity would dominate.

### Reconstructed chronology from the deck structure

1. **Initial investigation**  
   Contextual inquiry framed as understanding work-in-context, including stakeholders (p.3–4). Stronghold inquiry surfaces operational constraints early: charging, inspection, policies, car types (p.5).

2. **Evidence collected from leisure users**  
   Users I–V document many interface complaints *and* availability/cancellation stories (p.7–10).

3. **Patterns emerge**  
   Across users: hard to find days, long lead times, cancellations, unclear rules, history filter issues, confirmation uncertainty.

4. **Contradiction**  
   Expert review invests heavily in UI annotation (p.14–33), which could suggest “fix the booking interface.” But User III states explicitly that **unavailability is primary and usability secondary**, and that the interface is not the problem when cars are available (p.8). Finding 2 then elevates scarcity / waiting-list / advance planning to a main finding (p.36). Finding 4 pulls charging/ops readiness into the core story (p.38).

5. **Reframing**  
   Next steps shift toward Stronghold workflow/constraints, work-reservation users, and reservation data analysis — not only UI polish — before mockups and usability tests (p.41). The research opens the problem from “improve booking UI” toward “booking success depends on availability, readiness, and ops.”

**Turning point (derived, not dramatised):**  
The point where leisure-user testimony and synthesised Finding 2/4 challenge any UI-only diagnosis — especially User III’s primary/secondary statement — forcing the problem frame to include service scarcity and operational readiness.

**Caution:** The deck does not explicitly narrate “we thought it was the UI, then we discovered…”. That narrative arc is an **INFERENCE** from structure + the primary/secondary statement. Do not present it as a documented project diary unless confirmed later as **PROJECT CONTEXT**.

---

## 09 — CAUSAL CHAIN

### Supported chains

**Chain A — Scarcity → planning burden → demotivation**  
**DOCUMENTED EVIDENCE links:**  
High demand / limited availability → users book far ahead → waiting not worth it / stop using benefit; Finding 2: hard to take advantage of benefit due to slot difficulty.  
**INFERENCE extension:** reduced benefit utilisation over time (plausible, not measured).

**Chain B — Long-horizon booking → late operational cancellation → frustration / abandonment**  
**DOCUMENTED EVIDENCE:** Jan booking for September cancelled ~20 days prior without explanation/alternative; maintenance cancellations frustrate users; missing cancel reasons in UI.  
**INFERENCE:** repeated events reduce trust and willingness to plan far ahead (reasonable, not quantified).

**Chain C — Return → charging/inspection → not ready → booking conflict / failed short reservations**  
**DOCUMENTED EVIDENCE:** Stronghold: short reservations fail due to insufficient charge/inspect time; Finding 4: close reservations conflict because electric cars need recharge; Stronghold may lack validation time.  
This chain is among the strongest ops-to-booking links in the PDF.

**Chain D — Poor availability representation → trial-and-error → time cost / give-up**  
**DOCUMENTED EVIDENCE:** unclear available days; unavailable cars listed; calendar/time states unclear; Finding 2: manual calendar navigation time-consuming; User III: process slow/inefficient, users give up.

**Chain E — Misleading history defaults → users believe no reservation → support ticket**  
**DOCUMENTED EVIDENCE:** Finding 1 + User IV ticket quote.

**Chain F — Same UI for leisure/work → mismatched booking behaviour**  
**DOCUMENTED EVIDENCE:** User III objectives differ; Finding 3 impact statement.  
**INFERENCE strength:** medium — work side under-validated by interviews.

### Plausible but not firmly established (label INFERENCE)

- High demand → users search further ahead → more cancellations later → more churn on scarce slots (feedback loop). Parts documented; loop dynamics not proven.
- Showing who reserved a car → enables Teams coordination → partial substitute for waiting list (privacy note exists; coordination motive is inference).
- Fixing UX writing alone → meaningful adoption lift (contradicted by primary/secondary statement).

### Not supported (do not claim)

- Financial ROI of redesign.
- Measured reduction in cancellations from any recommendation.
- That readiness buffers are the majority cause of unavailability (could also be fleet size, priority holds, maintenance — **UNKNOWN** share).

---

## 10 — WHAT THE RESEARCH COULD / COULD NOT ANSWER

### The research supports

We can confidently say:

- Leisure users experience Carpool as a valuable benefit that is often hard to use because cars are scarce / hard to secure in time.
- At least one documented synthesis states unavailability is primary and usability secondary.
- Booking discovery and calendar/time communication are weak.
- My Reservations filtering defaults cause real confusion and at least one support ticket.
- Cancellations (late, unexplained, maintenance-related) are a major trust issue.
- Leisure and work booking needs differ conceptually.
- Electric leisure cars introduce charging/readiness constraints that interact with booking density.
- Policy/rules are incompletely communicated (one reservation, weekends, third parties, accidents, penalties).
- Confirmation, status language, and error messages frequently fail to explain system state.
- Work users and Stronghold workflows are acknowledged as insufficiently understood and listed as next research.
- Recommendations in the deck are proposals, not proven outcomes.

### The research does not establish

- Participant sample representativeness or total Carpool user population.
- Exact fleet size, utilisation, occupancy rates, or city-level supply.
- Measured usability metrics (success rate, time-on-task) — only planned for later.
- Relative quantitative weight of causes of “unavailable” (demand vs charging vs maintenance vs priority holds).
- Work-user pain points from first-hand interviews.
- Full Stronghold SOP, tooling, and constraint tolerances.
- Whether waiting list / readiness display / split flows would work operationally.
- Implementation status of any recommendation.
- Business metrics, ROI, development cost, stakeholder decisions.
- Legal/policy final answers on liability, SCUTS, penalties.
- Whether privacy of showing reservation holders is accepted organisationally.
- Actual pickup/return logging feasibility with existing hardware/process.

---

## 11 — DESIGN OPPORTUNITIES

These are **potential opportunities** derived from research recommendations and evidence. **Not implemented features.**

### 1. Availability-first booking

- **Evidence:** Finding 2; User III trial-and-error; unavailable items listed; unclear date/time states.
- **Problem:** Users hunt for slots instead of seeing availability.
- **Conceptual opportunity:** Surfaces that answer “when can I get a car?” before model browsing; filter to open slots; clearer unavailable states.
- **Unknown:** Data accuracy of availability given charging/inspection buffers; ops rules for holds.

### 2. Waiting list / release notification

- **Evidence:** Finding 2; no guarantee when car released; Teams workarounds.
- **Problem:** Cancellations do not systematically help the next user.
- **Conceptual opportunity:** Notify interested users when slots free; reduce informal transfers.
- **Unknown:** Fairness rules vs work priority; Stronghold capacity; gaming/hoarding.

### 3. Work vs leisure differentiated flows

- **Evidence:** Finding 3; User III; work modal reason/cost center; persona Ricardo.
- **Problem:** One interaction model serves different goals.
- **Conceptual opportunity:** Leisure path optimised for next available / flexible windows; work path for fixed datetime + cost center/reason with fewer leisure-oriented cues.
- **Unknown:** Real work-user behaviour (not yet interviewed).

### 4. Charging / readiness visibility

- **Evidence:** Stronghold charging; Finding 4.
- **Problem:** Calendar availability ignores readiness.
- **Conceptual opportunity:** Show charge/ready state and/or enforce buffers automatically.
- **Unknown:** Telemetry availability; charge time variability; who owns readiness decisions.

### 5. Clearer reservation status & history

- **Evidence:** Findings 1 & statuses in expert review; cancel reason missing; Open/Completed ambiguity.
- **Problem:** Users cannot understand past/current state.
- **Conceptual opportunity:** Status-first history; reason codes; separate active vs past; better defaults without hiding future bookings.
- **Unknown:** Backend event completeness.

### 6. Actual pickup/return logging

- **Evidence:** Finding 5.
- **Problem:** Scheduled ≠ actual; accountability gaps.
- **Conceptual opportunity:** Log and display actual times.
- **Unknown:** How pickup/return is physically effected today (keys, app, Stronghold).

### 7. Rules and feedback made visible at decision time

- **Evidence:** one-reservation late warning; weekend confusion; third-party invisible; accident uncertainty.
- **Problem:** Rules discovered after failure.
- **Conceptual opportunity:** Inline policy affordances, legends for calendar states, pre-reserve eligibility checks.
- **Unknown:** Authoritative policy source of truth.

### 8. Confirmation & communication redesign

- **Evidence:** success screen gaps; email review notes; confirmation-by-email behaviour.
- **Problem:** Users unsure what was booked.
- **Conceptual opportunity:** Immediate in-app summary of vehicle/when/where/status; clearer email.
- **Unknown:** Template ownership / brand constraints.

### 9. Condition / incident guidance

- **Evidence:** photo documentation behaviour; worn tires case; accident quotes.
- **Problem:** Users lack clear procedure and proof.
- **Conceptual opportunity:** Guided pre-trip condition check; incident playbooks.
- **Unknown:** Legal/process ownership.

---

## 12 — RESEARCH GAPS

From “WHAT’s NEXT” (p.41) and in-deck annotations:

### Interview Stronghold

- **Why it matters:** Charging, validation, and reservation management constraints may make some UI solutions impossible or unsafe. Proposed leisure limits must be checked against ops needs.
- **DOCUMENTED focus points:** manage reservations/validations/recharging; pain points; tools/changes; alignment of proposed solutions; design constraints.

### Understand reservation validation

- **Why:** If “available” depends on human validation, booking logic and status labels must reflect that — otherwise interface lies.

### Understand charging

- **Why:** Finding 4’s recommendations (status + automatic buffers) require real charge-time behaviour and data sources.

### Understand operational constraints

- **Why:** Without constraints, design may optimise user desire against impossible turnaround.

### Interview users with work reservations

- **Why:** Finding 3 and work UI exist, but leisure-only interviews cannot validate work urgency, cost center pain, or priority conflicts. Page 28 explicitly flags this.

### Usability testing (planned, not done)

- **Why:** Expert review ≠ measured task performance. Deck proposes book/modify/cancel tasks; metrics: success rate, task time, feedback; iterate with 3–5 users.
- **Important:** These metrics are **aspirational**, not results.

### Analyse additional reservation data

- **Why:** Qualitative stories (4 months / 9 months / cancellation clusters) need operational pattern checks: lead times, cancel rates, leisure vs work mix, vehicle-level scarcity.

### Other gaps implied but not fully listed

- Policy owners for liability, SCUTS, penalties.
- Privacy decision on showing reservation holders.
- Integration with Pulsar for cost centers.
- Whether Test should remain in Pool IA.

---

## 13 — POTENTIAL CASE STUDY NARRATIVE

Not polished portfolio copy — a possible structure only.

### Narrative premise

An internal employee benefit for booking company cars looked like a booking-UI problem. Research with leisure users and ops context suggested the harder problem was getting a usable car at all — and knowing when a car was truly ready.

### Key tension

**Benefit promised vs access delivered:** Carpool is valued, but scarcity, readiness, and opaque cancellations make the benefit feel unreliable. Interface issues are real but secondary when supply fails.

### Turning point

Leisure-user evidence stating unavailability is primary (and interface secondary), reinforced by Finding 2 (slots/waiting list) and Finding 4 (charging/readiness), shifting attention from control polish to availability and operations.

### Central insight

**Booking success is a service + operations outcome that the interface must make truthful** — not only a form-flow problem. “Available” must account for charge, inspection, policy, and priority — and help users act when plans break.

### Strongest supporting evidence

- User III primary/secondary statement + “stopped using this benefit…” quote.
- Lead-time and demand findings (p.7, Finding 2).
- Stronghold charging/inspection constraints + Finding 4.
- Late unexplained cancellation anecdote (p.8).
- Finding 1 ticket caused by history default (clear interface win, but not the whole story).
- Next steps prioritising Stronghold + work users + data before usability metrics.

### Possible visual moments (later)

- Availability hunt / empty meaning of “available”.
- Leisure vs work intent split.
- Readiness gap (booked vs charged/inspected).
- Cancellation without reason.
- Hidden rule (weekend / one reservation).
- Scheduled vs actual return.
- History filter that hides the future.

### Narrative risk / contradiction check

If the portfolio story claims “we fixed the booking UI and unlocked the benefit,” that would **overclaim** relative to this PDF. The PDF stops at recommendations and further research. A truthful story ends at reframing + opportunity definition unless later **PROJECT CONTEXT** proves delivery outcomes.

---

## 14 — VISUAL EVIDENCE

Do not design yet. Candidates only.

| Research finding | What visual should communicate | What could be reconstructed | Type |
|---|---|---|---|
| Scarce availability / long lead times | How far ahead users must plan; empty meaningful choice | Abstract calendar density diagram; anonymised lead-time illustration | RESEARCH EVIDENCE (concept diagram) / possibly DESIGN EXPLORATION for “next available” |
| Trial-and-error availability | Users guessing dates | Reconstructed search UI with unclear states | RECONSTRUCTED UI |
| Leisure vs work | Different goals, same controls | Split flow diagram or before/after IA | DESIGN EXPLORATION |
| Charging / readiness | Available ≠ ready | Timeline: return → charge → inspect → ready | RESEARCH EVIDENCE diagram |
| Cancellation without reason | Trust break after planning | Anonymised reservation detail with missing reason | RECONSTRUCTED UI |
| Hidden weekend rule | Grey days misread as fully blocked | Calendar legend problem | RECONSTRUCTED UI |
| One reservation rule late | Rule after click | Modal sequence | RECONSTRUCTED UI |
| Reservation lifecycle | Open / canceled / completed ambiguity | Status model diagram | RESEARCH EVIDENCE |
| History default filter | Future bookings invisible | Filter interaction reconstruction | RECONSTRUCTED UI |
| Planned vs actual pickup/return | Accountability gap | Dual timestamp diagram | DESIGN EXPLORATION |
| Waiting list absence | Informal Teams workaround | Service blueprint swimlane | RESEARCH EVIDENCE / DESIGN EXPLORATION |

**Avoid publishing:** raw internal screenshots with employee names, plates, emails, Confluence internals, or unredacted UI chrome from the confidential source.

---

## 15 — CONFIDENTIALITY CHECK

**User instruction overrides slide badges:** treat the PDF as private/confidential source material for portfolio work. Do **not** publish, embed, link, or copy the PDF verbatim onto the public site.

### Do not publish directly

- The PDF file itself and page screenshots from it.
- Internal product screenshots showing real UI of TEST & POOL CAR MANAGEMENT.
- Employee names visible in screenshots/emails (e.g. reservation holders, profile names in review captures).
- Employee IDs, driving licence numbers, cost center placeholders tied to real formats if sensitive.
- Licence plate numbers.
- Internal email contents addressed to named employees.
- Internal URLs / Confluence host details / infra strings visible on Test login screenshot.
- Pulsar navigation instructions if considered internal process documentation.
- Raw research artefacts: unedited user boards, exact internal sticky-note decks, identifiable quotes if they risk re-identification.
- Proprietary fleet/policy wording that employer considers confidential (even if slide badge says Public — confirm with stakeholder).
- Any implication of current production system state beyond what is approved for portfolio.

### Prefer anonymised or reconstructed alternatives

- Rebuild UI moments with fictional names, plates, and neutral product naming (“internal car pool”).
- Paraphrase quotes; avoid unique Portuguese quotes if they could identify participants — or get permission.
- Use diagrams for ops/readiness instead of real Stronghold artefacts.
- Replace company-specific tool names if required by NDA (**PROJECT CONTEXT** to confirm: CTW, Stronghold, Pulsar, CarPool naming rights).

### Note on classification badge

Every page shows “Classification level: Public.” That is **DOCUMENTED** in the PDF. Portfolio confidentiality should still follow the stricter brief for this engagement unless legal/comms explicitly clears public use of original artefacts.

---

## 16 — SOURCE INDEX

Actual PDF page numbers (1–42).

| Page | Topic | Evidence | Importance | Potential portfolio use |
|---|---|---|---|---|
| 1 | Cover | CarPool UX Review; Internal Tools | Context | Brand framing only if naming cleared |
| 2 | Index | Method sections listed | Structure | Process overview |
| 3 | Section: Context Inquiry | Divider | Structure | — |
| 4 | What is contextual inquiry | Method definition + stakeholder inclusion | Method | Explain research approach (paraphrased) |
| 5 | Stronghold context inquiry | Charging; one reservation; work hybrid / leisure electric; late returns; accidents; condition photos; fines; SCUTS | High | Ops/readiness diagrams; do not show raw slide |
| 6 | Section: User Research | Divider | Structure | — |
| 7 | Users I & II findings | Availability, rules, drop-off, demand, Teams, confirmation gaps | High | Thematic evidence clusters |
| 8 | User III findings | Benefit demotivation quote; late cancel anecdote; primary=unavailability | **Critical** | Turning-point evidence (paraphrase/anonymise) |
| 9 | User IV findings | History filter ticket; weekend rule; Mini errors; maintenance cancels; accident quote | High | Rules + trust |
| 10 | User V findings | Condition/hours; Test tab; history; confirmation; empty state | High | Feedback/empty states |
| 11 | Section: Personas | Divider | Structure | — |
| 12 | Personas Aires / Ricardo / Rita | Leisure, work, ops roles | Medium | Role contrast (reconstruct; avoid stock-face identity issues) |
| 13 | Section: User Expert Review | Divider | Structure | — |
| 14 | Pool UI annotated | Reserve-before-availability; hours format; location ambiguity; Test tab | High | Reconstructed UI only |
| 15 | Past date error | Error after invalid past reservation | Medium | Error prevention moment |
| 16 | Conflict reservations | Opaque conflict error | Medium | Error clarity |
| 17 | Unavailable + Reset Fields | Unclear unavailability copy; technical writing | Medium | UX writing |
| 18 | One reservation + privacy | Rule banner; shows who reserved | High | Rule timing + privacy |
| 19 | Work reserve modal | Cost center + Pulsar tooltip | Medium | Work flow friction (anonymise) |
| 20 | Leisure modal notes | Duplicate inputs; hours contradiction; profile info placement | Medium | Confirmation/hours honesty |
| 21 | Licence registration | Expired licence question unanswered | Low–Med | Edge case / UNKNOWN |
| 22 | One reservation after Reserve | Late rule disclosure | High | Eligibility before intent |
| 23 | Calendar/time availability | Unclear date/hour states | High | Availability legend |
| 24 | My Reservations empty | Default filter empty-state ambiguity | Medium | History defaults |
| 25 | Cancelled detail | No cancel reason | High | Trust/cancellation |
| 26 | Success confirmation | “Approved?”; missing what/when | High | Confirmation redesign |
| 27 | Loading reservations | Slow load; default filter notes | Medium | Performance/history |
| 28 | History table | Status position; writing; **need work users** | High | Status IA + research gap |
| 29 | Mixed past/ongoing | “Open” = valid reservation | Medium | Status model |
| 30 | Cancel toast + work list | UX writing review | Low–Med | Writing |
| 31 | Cancel modal | Confirmation copy issues | Medium | Destructive action clarity |
| 32 | Test → Confluence login | Test path dead-end | Medium | IA boundary (no internal URL) |
| 33 | Reservation email | Email exists; needs writing/visual review | Medium | Reconstruct anonymised email |
| 34 | Section: Main Findings | Divider | Structure | — |
| 35 | Finding 1 | Default year filter; ticket impact; recommendations | High | Clear interface win |
| 36 | Finding 2 | Slot scarcity; waiting list; advance planning | **Critical** | Core service insight |
| 37 | Finding 3 | Leisure vs work interface sameness | High | Flow differentiation |
| 38 | Finding 4 | Charging/time constraints; Stronghold validation | **Critical** | Readiness ≠ availability |
| 39 | Finding 5 | Actual vs scheduled pickup/return | High | Accountability logging |
| 40 | What’s next | Divider | Structure | — |
| 41 | Next steps | Stronghold interviews; work users; data analysis; mockups + usability tests (3–5 users, metrics planned) | High | Honest scope boundary |
| 42 | Thank you | Closing | Low | — |

---

## Appendix A — Participant activity snapshot (DOCUMENTED ONLY)

| User | Purpose | Bookings | Cancellations | Other |
|---|---|---|---|---|
| I | Leisure | 4 | 1 | — |
| II | Leisure | 5 | 8 | 1 fine |
| III | Leisure | 1 | 1 | — |
| IV | Leisure | 3 | — (not listed) | — |
| V | Leisure | “many times” | 1 | — |

No other participant counts are documented.

## Appendix B — Main findings vs implementation

| Finding | Recommendation in PDF | Implementation status |
|---|---|---|
| 1 Default filter | Broaden default / reduce reliance on date filters | **UNKNOWN** (not evidenced) |
| 2 Available slots | Waiting list + better search | **UNKNOWN** |
| 3 Leisure vs work | Tailored booking options | **UNKNOWN** |
| 4 Charging constraints | Show charging status/ETA; auto account for recharge time | **UNKNOWN** |
| 5 Actual pickup/return | Auto log + display actual times | **UNKNOWN** |

## Appendix C — Open questions for later PROJECT CONTEXT

- Employer naming permissions (CTW, CarPool, Stronghold, Pulsar).
- What was delivered after this review.
- Any post-research outcomes, metrics, or decisions.
- Whether work-user and Stronghold interviews occurred.
- Preferred anonymisation rules for quotes and UI reconstruction.

---

*End of analysis. This document should remain the factual baseline for subsequent case-study work. Prefer under-claiming over narrative optimisation.*
