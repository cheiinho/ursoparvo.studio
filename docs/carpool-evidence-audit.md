# Carpool Case Study — Full Evidence + Information Architecture Audit

**Status:** Audit only. No page implementation changes in this document.  
**Date:** 2026-09-21  
**Standard:** Every important claim must be traceable. Do not make the case study more impressive than the evidence.

---

## 0. Source access note (this environment)

| Source | Expected path | Status in this audit environment |
|---|---|---|
| 42-page research PDF | `/docs/carpool-ux-research.pdf` | **Absent** (gitignored; not present on disk) |
| Source Pack PDF | `/docs/Carpool_Case_Study_Source_Pack.pdf` | **Absent** (gitignored; not present on disk) |
| Structured analysis | `/docs/carpool-research-analysis.md` | Present (primary working inventory of the PDF) |
| Case study final | `/docs/carpool-case-study-final.md` | Present |
| Page blueprint | `/docs/carpool-page-blueprint.md` | Present |
| Snapshot evidence map | `/docs/carpool-snapshot-evidence-map.md` | Present |
| Implementation | `src/content/carpool/*`, `src/components/carpool/*` | Present |

**Consequence:** Page-number citations below are taken from the structured analysis, which was previously produced from the 42-page PDF (including OCR where needed). They are treated as **high-confidence secondary inventory**, not as a fresh PDF re-read in this session.

**UNCERTAIN until PDF is reattached:** any page citation that cannot be re-opened in the binary PDF in this environment. If the project owner reattaches the PDF, this audit should be re-verified against the file byte-for-byte.

---

## 01. Source hierarchy (as used)

1. **Primary research evidence:** Carpool 2024 UX Review (42 pages), via `carpool-research-analysis.md`
2. **Interpretation layer:** `carpool-research-analysis.md` (evidence labels, hierarchy, gaps)
3. **Narrative architecture:** `carpool-case-study-final.md`
4. **Editorial / source-pack guidance:** Source Pack (not readable here; guidance already absorbed into Final + Blueprint)
5. **Planned IA:** `carpool-page-blueprint.md` — treated as proposal, not truth
6. **Audited object:** current Carpool page implementation (`en.ts` / `pt.ts`, `CarpoolCaseStudy.tsx`, `CarpoolInteractive.tsx`, `CarpoolSnapshot.tsx`)

**Conflict rule:** Where sources disagree, conflicts are listed explicitly. No silent winner.

---

## 02. Evidence type definitions (used throughout)

| Code | Meaning |
|---|---|
| **A DOCUMENTED** | Explicit in the research deck |
| **B FEEDBACK** | Attributed to a user / stakeholder / Stronghold scenario |
| **C INTERPRETATION** | Synthesis across evidence; not a direct quote from the deck |
| **D EXPLORATION** | Design proposal / conceptual UI |
| **E PROJECT CONTEXT** | Owner-supplied framing not in the PDF |
| **F UNKNOWN** | Not established |

---

## 03. Evidence map — major claims

For each claim: **CLAIM · SOURCE · PAGE · TYPE · CONFIDENCE · CURRENT LOCATION · UI TREATMENT · LIMITATION**

### Cover / framing

| CLAIM | SOURCE | PAGE | TYPE | CONF | CURRENT | UI | LIMITATION |
|---|---|---|---|---|---|---|---|
| Carpool is an internal employee vehicle-pool benefit | Analysis §01 | 1–5, UI | A | High | cover, brief, snapshot.service | Static context | Anonymise employer (CTW) |
| Brief looked like a booking-product problem | Narrative / owner | — | E / C | Med | cover.subtitle, assumption | Static | Do not sell as PDF diary |
| Interface had real usability problems; dominant constraint = availability + readiness | User III + Finding 2/4 + expert review | 8, 36, 38, 13–33 | A + C | High | cover.thesis, turning-point | Hero insight | Keep both halves; never “UI was fine” |
| Client/product anonymised; UI reconstructed | Portfolio policy | — | E | High | disclosure | Static note | Required |

### Assumption / investment

| CLAIM | SOURCE | PAGE | TYPE | CONF | CURRENT | UI | LIMITATION |
|---|---|---|---|---|---|---|---|
| “We thought the platform was the problem” | Narrative reconstruction | — | E / C | Med | assumption.statement | Large statement | Label as project framing, not PDF quote |
| Platform rebuild framed ~6–12 months | Owner / Source Pack via Final | — | E | High (if owner confirms) | assumption.contextNote, investment | Context chip | Never as research metric |
| Research challenged whether rebuild addresses dominant constraint | Final §08 approved language | — | C | High | investment.close, outcome | Result section | Not “we cancelled the platform” |
| ROI / savings / cost avoided | — | — | F | — | correctly absent | Never invent | Missing evidence list |

### Methods / people

| CLAIM | SOURCE | PAGE | TYPE | CONF | CURRENT | UI | LIMITATION |
|---|---|---|---|---|---|---|---|
| Contextual inquiry + Stronghold context | Analysis §02.1 | 3–5 | A | High | investigation, snapshot.research | Methods | Protocol depth UNKNOWN |
| Leisure-user interviews Users I–V | Analysis §02.2 | 6–10 | A | High | investigation, snapshot | Methods | Not representative sample claim |
| Personas Aires / Ricardo / Rita | Analysis §02.3 | 11–12 | A (persona) | Med | personas, snapshot.people | Roles | Work/ops not interview-equal |
| Expert review of live product | Analysis §02.4 | 13–33 | A | High | investigation | Methods | Not usability-test metrics |
| Work bookings / deeper ops flagged as next steps | Next steps; p.28 | 28, 40–41 | A | High | investigation.caveat, reflection | Caveat | Do not claim completed |
| “When cars were available, interface stopped being main complaint” | User III paraphrase | 8 | B → paraphrased | High | investigation.voice | Quote-style | Paraphrase, not invent English quote |

### Availability / wait / readiness

| CLAIM | SOURCE | PAGE | TYPE | CONF | CURRENT | UI | LIMITATION |
|---|---|---|---|---|---|---|---|
| Hard to find available slots; trial-and-error | Users; Finding 2 | 7–8, 36 | A | High | availability, snapshot.ux | Interactive reconstruction | No fake % available |
| Unavailable vehicles listed | Users I/II | 7 | A | High | AvailabilityPlay | Reconstruction | Illustrative states only |
| Planning months in advance | p.7 (4 mo) vs Finding 2 (9 mo) | 7, 36 | A (conflict) | High on “months” | availability.line | Soft wording | **Do not pick 4 or 9** |
| No waiting list; informal Teams handoffs | Finding 2; Users | 7, 36 | A | High | availability.line | Caption | Feature gap, not UI polish only |
| Jan→Sep booking cancelled ~20 days prior; no reason/alternative | User III | 8 | A / B | High as anecdote | wait + WaitTimeline | Interactive timeline | One documented case (+ note multiple unexplained cancels) |
| Available ≠ ready (charge + inspection) | Stronghold; Finding 4 | 5, 38 | A | High | readiness, snapshot | Interactive states | No invented SLAs |
| Short reservations fail without charge/inspect time | Stronghold; Finding 4 | 5, 38 | A | High | readiness.line | Supporting copy | |

### Work / leisure / rules / history / usage

| CLAIM | SOURCE | PAGE | TYPE | CONF | CURRENT | UI | LIMITATION |
|---|---|---|---|---|---|---|---|
| Work needs fixed date/time; leisure wants flexibility / next available | User III; Finding 3; personas | 8, 11–12, 37 | A | High leisure; Med work | intents, snapshot | Interactive switch | Work lived experience thin |
| Research recommended declaring intent | Finding 3 | 37 | A (recommendation) | High | intents.line | Caption | Recommendation ≠ shipped |
| One active leisure reservation revealed after Reserve | Expert | 18, 22 | A | High | rules + RuleDemo | Reconstruction + exploration | |
| History default hides future bookings; tickets opened | Users IV/V; Finding 1 | 9–10, 35 | A | High | history | Reconstruction / exploration tabs | Tabs = exploration of status model |
| Status important but poorly placed / worded | Expert | 28–29 | A | High | history | Exploration | |
| Actual pickup/return not reliably recorded; log recommended | Finding 5 | 39 | A | High | usage | Exploration (illustrative times) | Times must stay labelled illustrative |

### Turning point / service / outcome

| CLAIM | SOURCE | PAGE | TYPE | CONF | CURRENT | UI | LIMITATION |
|---|---|---|---|---|---|---|---|
| Vehicle unavailability primary; usability secondary | User III | 8 | A | High | turning-point, snapshot.constraint | Dominant visual | Keep usability as real but secondary |
| Platform only one layer of the problem | Narrative synthesis | — | C | High | service.statement | Zoom interaction | Label conceptual model |
| Service chain User→…→Next user | Synthesis of Stronghold + booking + Finding 4 | 5, 38 | C | Med | service + snapshot.lifecycle | Interactive flow | Not official SOP |
| Capacity problem manifests through booking UX | Snapshot capacity line | — | C | Med–High | snapshot.constraint.capacity | Dominant support | Fair synthesis; not a PDF sentence |
| Outcome = sharper decision frame | Final approved language | — | C | High | outcome | Climax | No launch / savings |
| “Most useful decision was deciding what to solve first” | Editorial climax | — | C | Med | outcome.climax | Large type | Acceptable if not sold as research quote |
| Usability tests / success rates completed | Next steps plan | 41 | F as results | — | correctly absent as claims | Never claim from PDF alone | Owner may have later evidence |

---

## 04. Research inventory by page range

### Page 1 — Title / context

- **Observed:** CarPool UX Review · Internal Tools; classification badge “Public” on slides.
- **Said:** —
- **Interpreted (analysis):** Treat as confidential portfolio source despite badge.
- **Recommended:** —
- **Not known:** Formal stakeholder brief that started the work.

### Pages 3–5 — Contextual inquiry / Stronghold

**What was observed / documented as concerns:**
charging time; reservation policies/limitations; car types (work hybrid / leisure electric); late returns/penalties; accidents/liability; condition documentation; fines; SCUTS; inspection before next availability; validation concerns.

**Users said:** Not verbatim Stronghold transcripts in analysis.

**Researcher interpreted:** Ops constraints affect booking success.

**Recommended:** Later next steps deepen Stronghold interviews.

**Not known:** Whether Stronghold material was observation, interview, workshop, or secondary notes; SLAs; staffing; tools; which scenarios were directly observed vs known process risks.

### Pages 6–10 — User research (Users I–V)

| User | Documented activity | Key issues | Quotes |
|---|---|---|---|
| I | 4 bookings, 1 cancel | cancel log gaps; availability; rules; drop-off; demand; no in-app contact | shared board w/ II |
| II | 5 bookings, 8 cancels, 1 fine | same cluster | reasons for 8 cancels **UNKNOWN** |
| III | 1 booking, 1 cancel | scarcity primary; late Jan→Sep cancel; next-available leisure vs fixed work | “stopped using… waiting time”; primary/secondary statement |
| IV | 3 bookings | history default; weekend confusion; Mini errors; maintenance cancels; accident liability | PT quotes incl. ticket |
| V | “many times”, 1 cancel | tires/hours ticket; Test tab; history; confirmation via email; empty state | — |

**Do not aggregate** I/II cancel counts into a service-wide cancellation rate.

### Pages 11–12 — Personas

- Aires (leisure), Ricardo (work), Rita (ops/management).
- **Not known:** construction method; interview backing for Ricardo/Rita equal to leisure users.
- **Representation recommendation:** Prefer **roles** (Leisure / Work / Operations) with persona names as labels, plus explicit caveat that leisure interviews are strongest. “Personas” alone overstates ethnographic depth for work/ops.

### Pages 13–33 — Expert review (taxonomy)

| Category | Examples (documented) |
|---|---|
| NAVIGATION / IA | Test tab visible/dead-end; Pool vs Test vs My Reservations |
| VISIBILITY | Status last; small info; hours as raw decimals |
| AFFORDANCE | Reserve before availability validated |
| ERROR PREVENTION | Past dates selectable then error |
| SYSTEM FEEDBACK | Vague conflict / company-priority messages |
| UX WRITING | Approved; Open; Reset fields; cancel “loose”; email copy |
| STATUS | Open/Completed/Canceled/RESERVED/UNAVAILABLE; Approved unclear |
| DATE/TIME | Calendar meaning; start-time mental model |
| AVAILABILITY | Unclear unavailable states |
| RESERVATION RULES | One active reservation after Reserve; weekend start confusion |
| HISTORY | Defaults; past/current mixing; slow load |
| CONFIRMATION | Success screen incomplete; email dependence |
| OPERATIONAL INFO | Privacy of who reserved; cost center / Pulsar |
| ACCESSIBILITY | Not systematically scored in deck |

**Portfolio treatment:** Do not show every sticky note. Show clusters that explain system behaviour: late rules, weak status, weak confirmation, availability representation.

### Pages 34–39 — Main findings

| Finding | Problem | Evidence | Impact | Principle (deck) | Recommendation | Validation |
|---|---|---|---|---|---|---|
| 1 | Default reservation filter | Users IV/V + support ticket | Hidden future bookings | (deck) | Better defaults / history | Proposal only |
| 2 | Hard to find slots | Users + synthesis | Benefit underused; churn | (deck) | Availability-first; waitlist | Proposal only |
| 3 | Work vs leisure | User III + UI | Mismatch | (deck) | Intent / tailored flows | Work side under-validated |
| 4 | Charging / time | Stronghold | Conflicts; short bookings fail | (deck) | Readiness / buffers | Needs ops data |
| 5 | Pickup/return accuracy | Deck finding | Accountability gap | (deck) | Log actual times | Feasibility UNKNOWN |

### Pages 40–42 — Next steps / closure

**Documented as plans, not completions:**
interview Stronghold; interview work users; analyse reservation data; design mockups; usability tests (success rate, task time, feedback); iterate 3–5 users; retest edge cases.

**Critical:** PDF alone does **not** establish that these were completed.

---

## 05. Contextual inquiry audit (ops → bucket)

| Item | Bucket |
|---|---|
| Charging time | Research evidence → service model + readiness interaction |
| Inspection time | Research evidence → service model + readiness |
| Active reservation limitations | Research evidence → rules interaction |
| Late returns / penalties | Research evidence → policy/ops communication (secondary on page) |
| Accidents / liability | Research evidence → policy (static, careful) |
| Vehicle condition | Research evidence → ops signals |
| Fines | Research evidence → ops/policy (static) |
| SCUT / SCUTS | Research evidence → ops ambiguity (low visual weight) |
| Work cars hybrid / leisure electric | Research evidence → service context |
| Reservation timing / short bookings | Research evidence → readiness |

Not every item becomes a UI feature. Fines/SCUTS/accidents belong mostly to the service story, not interactive chrome.

---

## 06. User research audit — symptom vs layer

| Issue | Symptom / interface / service / ops / communication / policy |
|---|---|
| Hard to find days | Symptom of scarcity + interface discoverability |
| Unavailable cars listed | Interface |
| Unclear times | Interface |
| High demand / newer cars | Service |
| Advance booking months | Service (scarce supply) |
| Teams coordination / no waitlist | Service + product gap |
| Late unexplained cancel | Ops/service + communication |
| Maintenance cancel | Ops + communication |
| Cancel ownership / missing reason | Policy + interface |
| Confirmation unclear | Interface |
| History filter | Interface |
| Cost Center / Pulsar | Process integration |
| One-reservation late | Policy + interface timing |
| Third-party restriction invisible | Policy communication |
| Checkout confusion | Interface / process |
| Reservation details weak | Interface |

---

## 07. Human evidence (Users I–V) — display rules

**Allowed:** individual activity as research artefacts (e.g. “User I: 4 bookings, 1 cancellation”) if anonymised and labelled research evidence.

**Forbidden:** “25% cancellation rate”, service-wide cancel %, satisfaction scores, fleet utilisation from these rows.

**User II note:** 8 cancellations documented as activity; reasons **UNKNOWN** — do not invent.

---

## 08. Central statement audit

**Documented (User III, p.8):**
> Vehicle unavailability is the primary challenge, making usability concerns secondary.

Also documented companion idea: interface is not a problem as long as vehicles are available.

**Correct nuance for the page:**
- Interface problems are real (expert review + users).
- Research orders the constraint: unavailability primary.
- **Invalid rewrite:** “The interface was not the problem.”

**Current page:** mostly correct in thesis + turning-point + qualifier. Snapshot capacity line is **INTERPRETATION** (acceptable if labelled / not presented as a quote).

---

## 09. Availability audit + 4 vs 9 months

| Source | Wording |
|---|---|
| User research (~p.7) | weekend booking can take **up to four months** |
| Finding 2 (~p.36) | planning **up to nine months** |

**Conflict:** unresolved in sources.  
**Safe public wording:** “months in advance” / “planning could extend months into the future.”  
**Current page:** correctly avoids picking one number.  
**Do not** expose the inconsistency as a public puzzle unless needed for honesty footnotes.

Other availability evidence (strong): trial-and-error; unavailable listed; no waitlist; demotivation quote; Finding 2.

---

## 10. Cancellation audit

| Evidence | Type | Portfolio form |
|---|---|---|
| Jan→Sep; ~20 days prior; no explanation/alternative | Documented anecdote | Interactive timeline (current WaitTimeline) — keep |
| Multiple users affected by unexplained cancels | Documented (User III area) | Supporting line, not universal claim |
| Maintenance cancels | Documented (User IV) | Ops signal / static support |
| Missing cancel reason in UI | Expert | Reconstruction detail |
| Cancel ownership ambiguity | Users I/II | Secondary / optional |
| Cancel copy issues | Expert | Low visual weight |

---

## 11. Work vs leisure + personas vs roles

**Most faithful presentation:**
1. Primary: **roles** — Leisure / Work / Operations  
2. Secondary: names Aires / Ricardo / Rita as persona labels from the deck  
3. Mandatory caveat: leisure interviews strongest; work/ops thinner  

**Reason:** personas exist in the PDF, but Ricardo/Rita are not backed like Users I–V. Calling them “roles” reduces false ethnographic weight without erasing the deck’s own names.

**Current page:** uses names + roles + caveat — **acceptable**, slightly overweights “persona” language in places.

---

## 12. Operational / service model states

| State | Classification |
|---|---|
| User / Request / Booking | DOCUMENTED (booking exists) |
| Vehicle | DOCUMENTED |
| Preparation | INFERRED (from inspection/charge/validation language) |
| Charging / maintenance | DOCUMENTED |
| Ready | INFERRED as named state (constraint documented; status name conceptual) |
| Pickup / Usage / Return | DOCUMENTED as service acts |
| Inspection | DOCUMENTED |
| Next user | INFERRED loop |
| Full ordered SOP | PROPOSED / INTERPRETATION |

**Available vs Ready:** DOCUMENTED relationship (charge/inspect can block readiness while calendar may imply availability). Naming “Ready” as a product status is design language unless the live system uses it.

---

## 13. Reservation lifecycle

**Documented system-ish words:** Open, Canceled/Cancelled, Completed, RESERVED, UNAVAILABLE, Approved (success screen), email confirmation.

**Proposed / exploration states (do not claim production):** Upcoming / Active / Completed / Cancelled tabs; Preparing; Ready; In use; Scheduled vs Actual.

**Finding 5:** recommendation to record actual pickup/return — **DOCUMENTED recommendation**, not proof logging exists.

---

## 14. Expert review — what deserves portfolio visual weight

**High teaching value:** late one-reservation rule; status hierarchy; confirmation gaps; availability representation; history defaults.

**Low portfolio weight (keep in audit, not equal UI):** individual typos; image inconsistency; niche empty-state wording; expired-licence sticky (UNKNOWN behaviour).

---

## 15. Main findings matrix (validation status)

All five findings: **research synthesis + recommendations**.  
**Validation status for all:** **not validated by measured usability tests in this PDF.**

---

## 16. Next steps vs completed work

| Next-step item | In PDF as | Safe claim? |
|---|---|---|
| Interview Stronghold (deeper) | Plan | No as completed |
| Interview work users | Plan | No as completed |
| Mockups | Plan | No as shipped |
| Usability tests + success rate / task time | Plan | No as results |
| Iterate / retest | Plan | No |

**Owner statement (from task brief):** interviews and tests with people happened.  
**Classification:** **PROJECT CONTEXT / LATER EVIDENCE** until artefacts are added.  
**Missing evidence list:** see §33.

---

## 17. Business / strategic context

| Claim | Type |
|---|---|
| Considering new car-rental / booking platform | E PROJECT CONTEXT |
| ~6–12 month timeframe | E PROJECT CONTEXT |
| Research challenged investment question | C INTERPRETATION (approved in Final) |
| Precise savings / ROI / prevented spend € | F UNKNOWN — forbidden |
| “Ultimately created business value by preventing unnecessary investment” | E / C — allowed only as soft strategic narrative with owner confirmation; never as PDF finding |

---

## 18. Current case study section-by-section audit

Current sequence in code:

`cover → brief → snapshot → assumption → investigation(+personas) → availability → wait → readiness → intents → rules → history → usage → turning-point → service → software → investment → explorations → outcome`

| Section | Purpose | Evidence | Adds? | Issues | Static / Interactive | Keep / Change / Remove |
|---|---|---|---|---|---|---|
| cover | Orient | Strong thesis | Yes | Subtitle slightly dramatises “research said otherwise” | Static | Keep; soften if needed |
| brief | Service definition | A | Yes | Thin | Static | Keep |
| snapshot | 10s map | Mostly A + some C | Yes | Dense; some duplication with later sections; “capacity problem” = C | Interactive | Keep; slim; reduce duplicate later |
| assumption | Framing | E/C | Yes | First-person “We thought” is framing | Static | Keep with context label |
| investigation | Methods | A | Yes | Personas repeat snapshot people | Static + voice | Keep; merge people once |
| availability | Primary UX story | A | Yes | Punchlines strong; interaction illustrative | Interactive | Keep (lead weight) |
| wait | Trust | A anecdote | Yes | Good honesty attribution | Interactive | Keep |
| readiness | Ops insight | A | Yes | Critical | Interactive | Keep (lead weight) |
| intents | Work/leisure | A/partial | Yes | OK | Interactive | Keep |
| rules | Expert | A | Yes | Clear teaching | Interactive | Keep |
| history | Finding 1 + status | A + D tabs | Yes | Tabs imply status model = exploration — OK if labelled | Interactive | Keep |
| usage | Finding 5 | A recommendation + D | Yes | Correctly illustrative | Interactive | Keep |
| turning-point | Central ordering | A | Yes | Strong | Static | Keep / enlarge |
| service | Zoom | C model | Yes | Duplicates snapshot lifecycle | Interactive | Keep one strong instance |
| software | Boundaries | C | Yes | Useful | Static | Keep |
| investment | Stakes | E+C | Yes | Good labelling | Static diagram | Keep |
| explorations | Response | D | Yes | List-like; slightly generic | Static or light interactive | Keep; after turning point only |
| outcome | Result | C | Yes | Strong climax; “what we thought” arc = framing | Static | Keep as visual climax |

**Duplication hotspots:** snapshot ↔ investigation people/methods; snapshot lifecycle ↔ service zoom; multiple work/leisure switches (snapshot + intents).

**Density:** snapshot + full narrative can feel like reading the research twice. Snapshot should preview; body should deepen selectively.

---

## 19. Information architecture recommendation

Desired conceptual progression from the brief vs evidence:

**Recommended final sequence:**

1. **Cover** — what it is + locked thesis  
2. **Brief** — service definition  
3. **Research Snapshot** — 10-second evidence map (primary constraint dominant)  
4. **Assumption** — project framing (labelled)  
5. **Investigation** — methods + human evidence (Users I–V roles, not only personas)  
6. **What users experienced** — availability (lead) + wait  
7. **Operational system** — readiness + service model (one place)  
8. **Work vs leisure** — roles  
9. **UX findings that amplify** — rules, history, confirmation/status (compressed expert clusters)  
10. **Design response** — explorations (clearly labelled)  
11. **Boundaries + investment question**  
12. **Result / strategic implication**  
13. **Limits / missing evidence honesty**

**Why this differs from the brief’s 01–13 list:**  
- Snapshot should follow brief, not bury after assumption, so visitors get evidence before narrative theatre.  
- “Validation” cannot be a full section unless later test evidence is supplied — otherwise it becomes fiction.  
- Expert review should not equal the visual weight of availability/readiness.

**Blueprint vs current:** Blueprint’s 11 sections are closer to research weighting than the current long interactive checklist; current page over-indexes equal interactive beats.

---

## 20. Research Snapshot / dashboard evaluation

**Verdict:** Concept is valid as an **editorial Research Snapshot**, not analytics.

**Allowed content:** matches §03 map and existing snapshot map.  
**Reject:** fake %, fleet size, participant rates, cancel rates, ROI, conversion.

**Current snapshot strengths:** primary constraint dominance; evidence chips; people caveat; no fake metrics.  
**Current risks:** density; interpretive capacity sentence; duplicate later sections; cancel path is simplified (OK if not claimed as full system).

---

## 21. Evidence → interaction mapping

| Evidence | Interaction | Verdict |
|---|---|---|
| Hard to find availability | Date / availability play | Keep — teaches |
| Unexpected cancel anecdote | Reservation timeline scrub | Keep — teaches |
| Available ≠ ready | Readiness state steps | Keep — teaches |
| Work vs leisure needs | Intent switch | Keep — one instance |
| Late reservation rule | Reserve → error → show earlier | Keep — teaches |
| Unclear history/status | History tabs | Keep as exploration |
| Actual vs scheduled | Toggle times | Keep as exploration |
| Booking is one layer | Service zoom / flow | Keep — one instance |
| Decorative parallax / constant fade-ins | — | Reject |
| Analytics charts | — | Reject |

---

## 22. Research vs reconstruction vs exploration

Current labels exist and are mostly used correctly.  
**Tighten:** History tabs and usage times must never read as screenshots of the live product.  
**Tighten:** Assumption / outcome first-person framing = project context / interpretation, not “Research evidence”.

---

## 23. Visual hierarchy audit (current)

- **Too equal:** many interactive sections of similar visual weight after the snapshot.  
- **Should dominate:** primary constraint; availability; readiness; turning point; outcome.  
- **Should quiet down:** rules/history/usage after the spine is clear; software list; exploration grid.  
- **Density risk:** snapshot + full body = double teaching.  
- **Typography:** large statements work; measure still long in places.

---

## 24. Divider audit

Earlier pass removed many `studio-section` borders. Remaining risks: card/panel borders that act like dividers; repeated frame chrome. Prefer spacing/background over rules between narrative beats.

---

## 25. Card audit

- Snapshot panels: acceptable as evidence objects if not a SaaS dashboard look.  
- Exploration grid items: lean toward list, not card farm.  
- Persona tiles: acceptable as role objects; avoid demographic-card cliché.  
- Avoid stacking identical rounded cards for every finding.

---

## 26. Colour audit

Semantic colour for available / unavailable / ready / cancelled is directionally correct.  
Continue: small palette; never colour-only meaning; AA contrast on status text.

---

## 27. Affordance / interaction audit

- Controls generally look interactive (buttons, ranges).  
- Hover must never be sole disclosure (currently mostly OK).  
- Keyboard: ranges + buttons present; ensure tab order and `aria-pressed` remain consistent.  
- Some computer-use environments under-click React controls; not an evidence issue, but keep hit targets ≥44px.

---

## 28. Motion audit

| Motion | Teaches? | Keep? |
|---|---|---|
| Availability list change | Yes | Yes |
| Wait panel state | Yes | Yes |
| Readiness meter | Yes | Yes |
| Service zoom / flow reveal | Yes | Yes |
| Constant section fade-ins | No | Avoid |
| Scroll hijack | No | Avoid |

Reduced motion: preserve final informational state.

---

## 29. Accessibility audit (checklist status)

| Area | Status |
|---|---|
| Semantic sections / headings | Mostly OK; verify single h1 |
| Keyboard | Present; re-test after next redesign |
| Focus visible | CSS present |
| Contrast | Monitor semantic colours on field backgrounds |
| Target size | Mostly 44px |
| Reduced motion | Partially handled |
| Live regions | Present on several plays |
| Hover-only | Largely avoided |

Full WCAG 2.2 AA pass still required after next visual phase.

---

## 30. Responsive audit

- Snapshot grid reflows; watch 320px people toggles (3-up).  
- Long service flow chips wrap — OK.  
- Mobile must keep primary constraint above the fold of the snapshot, not buried.

---

## 31. Confidentiality audit

**Do not publish:** raw PDF screenshots; employee names/IDs from UI; internal tool titles if sensitive; CTW branding; Stronghold as confidential org detail if owner requires anonymisation (currently named in research docs — **confirm public naming**).  
Current reconstructions are fictional — keep that.

---

## 32. Risky claims list

| Claim | Classification |
|---|---|
| Unavailability primary; usability secondary | SUPPORTED |
| Interface problems real | SUPPORTED |
| Months in advance | SUPPORTED WITH QUALIFICATION (4 vs 9) |
| Jan→Sep / ~20 days | SUPPORTED (anecdote) |
| Charging/inspection readiness | SUPPORTED |
| Work vs leisure different needs | SUPPORTED WITH QUALIFICATION (work interviews thin) |
| 6–12 months platform | PROJECT CONTEXT |
| “We thought the platform was the problem” | PROJECT CONTEXT / INFERENCE |
| Research changed the investment question | INFERENCE (approved) |
| Capacity problem wording | INFERENCE |
| Service SOP chain | INFERENCE / conceptual |
| Usability testing completed | UNKNOWN / UNSUPPORTED by PDF |
| ROI / savings | UNSUPPORTED |
| Explorations shipped | UNSUPPORTED (correctly avoided) |
| Aggregate cancel rate from Users I–II | UNSUPPORTED if claimed |

---

## 33. Missing / requested project evidence

Checklist for the project owner:

1. Interview methodology (guide, recruitment, dates)  
2. Confirmed participant count beyond Users I–V labelling  
3. Work-user interview artefacts (if any later)  
4. Stronghold follow-up interview artefacts (if any later)  
5. Usability test plans, tasks, session notes, findings  
6. Success rate / task time results (only if real)  
7. Prototype / iteration history (versions, dates)  
8. Before/after design artefacts  
9. Business decision documentation (platform investment choice)  
10. Whether “Stronghold” and employer naming may appear publicly  
11. Resolution guidance on 4 vs 9 months (or confirm soft wording)  
12. Confirmation that no confidential screenshots are in the site build  

---

## 34. Final evidence architecture (recommended)

| SECTION | PURPOSE | KEY EVIDENCE | PRIMARY MESSAGE | VISUAL | INTERACTION | TYPE | MOBILE |
|---|---|---|---|---|---|---|---|
| Cover | Orient in 5s | Thesis | Availability/readiness dominate; UX still real | Large type | None | A+C | Stack |
| Brief | Define service | Benefit + leisure/work | Booking surface ≠ whole problem | Short text | None | A | Stack |
| Snapshot | 10s map | Constraint + methods + signals | Capacity problem shows up in booking | Editorial map | Light switches | A+C | Constraint first |
| Assumption | Framing | 6–12 months | Starting question was platform-first | Chain | None | E | Stack |
| Investigation | Human proof | Users I–V + methods | Real people informed this | Methods + role panels | People switch once | A/B | Stack |
| Experience | Lived pain | Availability + cancel anecdote | Finding a car was the struggle | Reconstructions | Availability + timeline | A | Full-width plays |
| Operations | System truth | Charge/inspect | Available ≠ ready | State machine | Readiness | A | Full-width |
| Service model | Zoom-out | Ops + booking | Platform is one layer | Flow | Zoom/step | C | Chips wrap |
| Amplifiers | Expert clusters | Rules/history/confirm | Interface still matters | Small plays | Rules/history | A/D | Compact |
| Explorations | Response | Findings 1–5 recs | Constructive, not shipped | Strip | Optional | D | List |
| Investment | Stakes | Context timeframe | What is 6–12 months for? | Fork diagram | None | E+C | Stack |
| Result | Climax | Approved outcome language | Research changed the question | Band + before/after | None | C | Dominant |
| Limits | Honesty | Gaps | Leisure-strong; work/ops incomplete | Short text | None | A | Stack |

---

## 35. Final recommendation

### A. KEEP
- Locked thesis nuance (UX real; availability primary)  
- Months wording (not 4/9)  
- Wait timeline anecdote with attribution  
- Readiness interaction  
- Evidence labels  
- Outcome as decision-frame (no ROI)  
- Research Snapshot concept  
- Disclosure / reconstruction honesty  

### B. CHANGE
- Reduce duplication between snapshot and body  
- Reweight sections so availability/readiness/turning-point/outcome dominate  
- Present Aires/Ricardo/Rita as **roles** with persona names  
- Compress expert-review amplifiers  
- One work/leisure control and one service-model control  

### C. REMOVE / AVOID
- Any future fake metrics  
- Equal-card treatment of minor UX writing issues  
- Claiming usability-test results from next-steps pages  
- Absolute “interface wasn’t the problem”  
- Decorative motion and divider stacks  

### D. ADD (only with evidence)
- Optional anonymised User I–V evidence strips (activity as individual rows, not rates)  
- Later validation section **if** owner supplies test artefacts  
- Stronger “missing evidence” honesty if owner confirms later interviews/tests  

### E. INTERACTIVE
Availability; wait; readiness; late rule; (one) work/leisure; (one) service model; history/status exploration; scheduled vs actual exploration  

### F. STATIC
Cover thesis; brief; assumption framing; turning-point statement; software boundaries; investment question; outcome climax; limits  

### G. NEEDS PROJECT OWNER CONFIRMATION
1. 6–12 month platform framing may be public  
2. Naming Stronghold / employer  
3. Whether later interviews/usability tests exist and can be cited  
4. Whether business decision after research can be described beyond “changed the question”  
5. Preferred public wording on lead times  

### H. Final narrative (12 steps)
1. Employee vehicle-pool benefit with a booking interface.  
2. Starting assumption: improve/rebuild the platform.  
3. Research looked at operations, leisure users, roles, and the live UI.  
4. People struggled to find usable cars and planned months ahead.  
5. Even booked cars could disappear late without explanation.  
6. Interface problems were real: rules late, status weak, confirmation unclear, history defaults wrong.  
7. Operations added another truth: charging and inspection mean available ≠ ready.  
8. Work and leisure needed different booking behaviours.  
9. Research ordered the constraint: unavailability primary; usability secondary.  
10. The platform is only one layer of a larger service.  
11. Design explorations respond to evidence without claiming shipment.  
12. The valuable outcome is a sharper investment question, not invented ROI.  

### I. Final dashboard content (exact)
- Service one-liner (employee pool; leisure/work)  
- People: Aires/Ricardo/Rita as roles + leisure-strong caveat  
- Research: contextual inquiry; leisure interviews; personas; expert review  
- Primary constraint: unavailability primary; usability secondary  
- UX signals (qualitative list only)  
- Ops signals (charge, inspect, maintenance, condition, limits, pickup/return)  
- Work ↔ leisure needs  
- Available ↔ ready  
- Conceptual service model (labelled interpretation)  
- Reservation reliability path (booked → waiting → cancelled) with anecdote honesty  

### J. Final implementation order (next phase — not now)
1. Owner confirmation on missing evidence (§33 / §G)  
2. Re-verify page citations against reattached PDF  
3. Freeze claim list (supported only)  
4. Restructure IA per §19  
5. Slim snapshot; deepen spine sections  
6. Interaction pass only for teaching moments  
7. Visual hierarchy / colour / a11y pass  
8. Mobile pass  
9. Confidentiality / gitignore / no raw PDF assets  
10. Final design-director review against evidence map  

---

## 36. Explicit non-actions

This audit did **not**:
- modify the Carpool page  
- modify components or styles  
- implement dashboard or animations  
- invent missing validation evidence  

Only this document was created: `/docs/carpool-evidence-audit.md`.

---

## 37. Self-review checklist

| Question | Answer |
|---|---|
| Missed important user feedback? | Inventory covers Users I–V themes from analysis; PDF binary not re-opened this session |
| Missed operational constraint? | Stronghold list captured; SCUTS/fines kept low weight |
| Missed persona/role? | Aires/Ricardo/Rita + leisure/work/ops contrast |
| Expert issues that change story? | Late rules, status, confirmation, history defaults — yes; typos — no |
| Observation vs interpretation? | Separated throughout |
| Recommendation vs implemented? | Separated; explorations labelled |
| Research vs project context? | Separated; 6–12 months flagged |
| Completed vs planned next steps? | Separated; tests not claimed |
| Individual stats → service stats? | Explicitly forbidden |
| 4 vs 9 months flagged? | Yes |
| Unsupported claims identified? | §32 |
| Nuance on usability preserved? | Yes |
| Dashboard strongest evidence? | Primary constraint + signals |
| Interactions that teach? | §21 |
| Missing evidence listed? | §33 |
| Uncertain items marked? | PDF absence; Stronghold method; later tests; public naming |

---

## Audit summary (for the project owner)

**Audited:** research analysis (proxy for 42-page PDF), final narrative, blueprint, snapshot map, and current Carpool implementation.

**Confirmed strong:** unavailability primary / usability secondary; months-ahead planning (soft wording); readiness constraints; cancel anecdote; history defaults; late rules; leisure-strong sampling limits.

**Inconsistent:** 4 months vs 9 months lead time — do not pick one.

**Missing:** PDF binaries in this environment; later interview/test artefacts; business decision docs; public-naming decisions.

**Unsupported if claimed:** ROI, savings, completed usability metrics from next-steps pages, shipped explorations, aggregate cancel rates.

**Recommended narrative:** §35 H.

**Recommended dashboard:** §35 I.

**Needs confirmation:** §35 G.

**Next implementation phase:** §35 J — only after claim freeze and owner confirmations.

---

## 38. Editorial redesign audit (15-section page)

Audit of the recomposed page (`src/components/carpool/*`, `src/content/carpool/{en,pt}.ts`) against the source hierarchy in §01. Every statement below is either traced to the source or explicitly typed as interpretation, reconstruction, exploration or project context.

| Section | Statement on page | Type | Support |
| --- | --- | --- | --- |
| Hero | Internal shared-fleet service; interface had real usability problems; vehicles could appear bookable without being available or ready | Research evidence | Central statement §08; readiness §12 |
| Hero visual | Free slot → Charging / Inspection / Maintenance / Ready | Reconstruction | Operational signals §12 |
| 01 Apparent problem | “We thought the platform was the problem.” / Platform → Booking → Car → Service / “Reasonable. Incomplete.” | Project context + interpretation | §17; final narrative |
| 02 Research | Vehicles difficult to find; planned months ahead; booking could disappear; availability ≠ readiness | Research evidence | §09, §10, §12 |
| 02 Research | Methods: contextual inquiry, leisure interviews, personas, expert review; “Not analytics. No invented rates.”; leisure-strong sample | Research evidence (qualitative) | §04, §11, §16 |
| 03 Finding a car | Hunting for free days, planning months ahead, options selectable but not usable; “Try another day” mock | Research evidence + reconstruction | §09; vehicle names fictional |
| 04 The wait | Jan booking for Sep, still booked Mar/Jun, ~20 days before, cancelled; no useful explanation, no alternative | Research evidence (single documented case) | §10; labelled “documented leisure research case”, not a rate |
| 05 Available ≠ ready | Return → Inspection → Charging → Ready; free cell can still mean a vehicle that cannot leave | Interpretation | §12; note: no durations or SLAs implied |
| 06 Service model | Request → … → Next user; focus Booking → Vehicle → Preparation → Ready | Interpretation | §13; “Not an official SOP” kept visible |
| 07 Work ≠ leisure | Fixed commitment / specific date / precise interval vs next usable opportunity / flexible / weekends; “The research recommended declaring intent.” | Research evidence + design exploration | §11; caveat: not a claim the product already split flows |
| 08 Rules too late | One active leisure reservation rule appeared after Reserve; earlier placement | Research evidence (expert review) + design exploration | §14; illustrative date in exploration only |
| 09 Booking history | Defaults could hide future bookings; state appeared late; people opened tickets for existing reservations | Research evidence + design exploration | §14; note: no ticket-reduction claim |
| 10 Scheduled ≠ actual | 09:00/17:00 vs 09:18/16:42 | Design exploration, “Illustrative times” | §16 recommendation to capture actual pickup/return |
| 11 Pivot | Interface had real problems; usability secondary; dominant constraint availability; from “improve the booking” to “what makes a booking real” | Research evidence + interpretation | §08 |
| 12 Software can / cannot | Lists as given in the brief | Interpretation | §35 H |
| 13 Investment | 6–12 months platform rebuild; same fleet + same constraint | Project context | §17; no ROI, no savings |
| 14 Closing | Platform only one layer; tell the truth about availability earlier; only rebuild when it addresses the dominant constraint | Interpretation | Final narrative |

Removed from the public page in this pass: persona names, the illustrative user quote, the exploration grid, the “Result / Limits” prose block and the research snapshot dashboard. They remain documented in `docs/` but are no longer rendered.

Still absent by design: metrics, participant counts, rates, ROI, adoption, deployment status, or any claim that an exploration shipped.
