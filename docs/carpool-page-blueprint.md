# Carpool — Page Implementation Blueprint

**Status:** Pre-implementation blueprint only. No website code in this document.  
**Sources:**  
- `/docs/carpool-ux-research.pdf` — primary research  
- `/docs/carpool-research-analysis.md` — evidence analysis  
- `/docs/carpool-case-study-final.md` — narrative architecture  
- `/docs/Carpool_Case_Study_Source_Pack.pdf` — editorial / source-pack guidance  

**Codebase inspected:** Urso Parvo (`src/app`, `src/components`, `src/app/globals.css`, `src/lib/i18n.ts`, Studio page pattern).

**Rule:** Research evidence outranks editorial punchlines. Do not invent metrics. Do not claim explorations were shipped. Do not imply the conclusion was known before the research.

---

## Locked central insight

**Use this (research-accurate):**

> The interface had real usability problems, but the dominant constraint was vehicle availability and operational readiness.

**Do not use as absolute headline without qualifier:**

> “The interface wasn’t the bottleneck.” / “When the problem isn’t the platform.”

Those Source Pack lines may appear only if immediately qualified by the sentence above. Prefer the accurate insight as the page’s intellectual centre.

**One-sentence summary (portfolio card):**  
A UX research project that uncovered the difference between a booking problem and a service-capacity / readiness problem.

---

# 1. FINAL NARRATIVE

**11 sections** (Source Pack 13 condensed with Final’s weighting). Five findings live inside one major section rather than five full page chapters, to keep scroll honest.

| # | Section ID | Purpose | Headline | Supporting copy (editorial) | Evidence source | Narrative role | Required visual |
|---|---|---|---|---|---|---|---|
| 01 | `cover` | Establish case + honesty frame | **Carpool** | Subtitle: *A UX research project that challenged the assumption that a new booking platform would solve the real problem.* Meta: UX research · Service design · Design explorations. Disclosure: client/product details anonymised; interfaces reconstructed. | Source Pack §01, §31; Final §01 | Open | V1 typographic statement |
| 02 | `brief` | Define the service without confidential branding | **An internal vehicle-pool benefit** | Employees could reserve company cars for leisure or work. On the surface it looked like a booking-product problem. The work asked what was actually failing — and what kind of design investment would matter. | Research PDF (service existence); Final §02 | Orient | Evidence-label key (chip legend) |
| 03 | `assumption` | State the starting hypothesis without claiming foresight | **The booking experience looked like the problem** | Build a better platform → improve booking → improve access. Reasonable. Incomplete. A booking UI is where frustration appears; it is not always where the constraint lives. | **PROJECT CONTEXT** (Source Pack §02–03) | Setup | Typographic sequence (assumption chain) |
| 04 | `investigation` | Show methods without theatre | **We investigated the service, not only the screens** | Contextual inquiry (ops pick-up/drop-off), leisure-user research, personas (leisure / work / ops), expert review of the live product. Strongest on leisure; work + deeper ops flagged as next steps. | **PRIMARY EVIDENCE** (PDF methods; Analysis §02) | Method | V2 methods diagram |
| 05 | `experience` | Accumulate user evidence before the twist | **Finding a car was harder than booking one** | Users hunted for open days, planned months ahead, hit unexplained cancellations, fought history filters, and sometimes stopped using the benefit. Interface failures were real too — both were true at once. | **PRIMARY EVIDENCE** (Users I–V; Finding 2) | Evidence | V3 availability reconstruction |
| 06 | `service` | Reveal the layer behind the UI | **The calendar could imply a slot. Operations decided whether it was real.** | Electric leisure cars need charge time. Inspection before next use. Maintenance can cancel plans. Short gaps fail more often. | **PRIMARY EVIDENCE** (Stronghold p.5; Finding 4) | Deepen | V5 readiness / service diagram |
| 07 | `turning-point` | Deliver the contradiction | **Unavailability was primary. Usability was secondary.** | Expert review could fill pages with UI defects. The research still ordered the constraint: vehicle unavailability first. That does not exonerate the product — it reorders the problem. Moving question: from “how do we improve booking?” to “what makes a booking true?” | **PRIMARY EVIDENCE** (User III p.8) + **INFERENCE** (arc) | Pivot | Full-width typographic statement (qualified) |
| 08 | `findings` | Organise evidence into five unequal patterns | **Five patterns. Not equal weight.** | Intro: availability + readiness centre the story; the others amplify. Then five sub-blocks (see §1.1). | **PRIMARY EVIDENCE** | Structure | V3–V7 as each finding needs |
| 09 | `software-boundary` | Separate Level 1 vs Level 2 | **What software could help — and what it could not solve alone** | Could: discovery, rules timing, status, history, readiness *if data exists*, intent split. Could not alone: fleet capacity, charge physics, inspection capacity, service reliability. | **INFERENCE** grounded in evidence (Final §09; Source Pack §16) | Clarify | Two-column list (editorial, not fake KPI) |
| 10 | `investment` | Pose the business question | **If a platform takes 6–12 months, what problem is that time for?** | PROJECT CONTEXT timeframe. Research challenges a UI-only rebuild thesis. Same fleet + same readiness constraint → better chrome may not change the felt benefit. | **PROJECT CONTEXT** + **INFERENCE** | Stakes | V8 investment diagram |
| 11 | `explorations-outcome` | Show constructive response + honest outcome | **With the problem reframed, design could explore service-aware booking** | Explorations (not shipped). Outcome: sharper decision frame — not a launch, not a fabricated cancellation. Reflection: research limits (leisure-heavy sample; work/ops incomplete). | **DESIGN EXPLORATION** + **INFERENCE** | Close | V9 exploration strip |

### 1.1 Findings sub-blocks (inside section 08)

| ID | Headline | Purpose | Visual |
|---|---|---|---|
| `f01` | Finding a slot was hard | Scarcity + discoverability | V3 |
| `f02` | Work ≠ leisure | Intent mismatch | V4 |
| `f03` | Available ≠ ready | Dominant operational insight | V5 (shared with service) |
| `f04` | A reservation could disappear | Trust / reliability | V6 |
| `f05` | The system hid its own rules | Late rules / mental model | V7 |

**Weighting:** `f01` and `f03` get largest visual + copy space. `f02`, `f04`, `f05` support.

---

# 2. EVIDENCE MAP

## Labels (page system)

| Label | Meaning |
|---|---|
| **PRIMARY EVIDENCE** | Directly supported by the research PDF |
| **PROJECT CONTEXT** | Designer-provided; not in the PDF |
| **INFERENCE** | Reasonable conclusion from connecting evidence |
| **DESIGN EXPLORATION** | Conceptual; not implemented |

## Claim → label

| Claim | Label | Action |
|---|---|---|
| Carpool = internal vehicle-pool / booking benefit | PRIMARY EVIDENCE | Keep (anonymise employer) |
| Leisure vs work categories; electric leisure / hybrid work | PRIMARY EVIDENCE | Keep |
| Contextual inquiry + user research + personas + expert review | PRIMARY EVIDENCE | Keep |
| Users struggled to find slots; long lead times; no waiting list | PRIMARY EVIDENCE | Keep; soft-word “~months / reported up to ~9 months in findings” |
| Unavailability primary; usability secondary | PRIMARY EVIDENCE | **Required** turning-point line |
| Interface “not a problem when cars available” (participant synthesis) | PRIMARY EVIDENCE | Keep paraphrased |
| Charging + inspection affect readiness | PRIMARY EVIDENCE | Keep |
| Late unexplained cancellation anecdote | PRIMARY EVIDENCE | Anonymise; fictional dates in visuals |
| History default filter hid future bookings; support ticket | PRIMARY EVIDENCE | Keep anonymised |
| Many UX writing / status / error issues | PRIMARY EVIDENCE | Theme, don’t list all |
| Work vs leisure need different intents | PRIMARY EVIDENCE (concept) | Note work interviews incomplete |
| 6–12 month platform timeframe | PROJECT CONTEXT | Label on page |
| Initial “build a new platform” assumption | PROJECT CONTEXT | Label; don’t pretend PDF diaries it |
| Discovery arc chronology (“we didn’t know yet”) | INFERENCE / PROJECT CONTEXT | Allowed if not sold as PDF transcript |
| “Research changed the investment question” | INFERENCE | Prefer over “we cancelled the build” |
| Rebuilding UI alone may not fix dominant constraint | INFERENCE | Keep |
| Availability-first, waitlist, readiness UI, lifecycle, etc. | DESIGN EXPLORATION | Always labelled |
| Exact ROI / savings / costs / success rates | — | **REMOVE / never invent** |
| “We decided not to build the platform” | — | **REMOVE** unless new docs appear |
| “The platform / interface was fine” | — | **REWRITE** — false |
| Absolute “interface wasn’t the bottleneck” without qualifier | — | **REWRITE** to locked insight |
| Personas as if deeply interviewed work/ops users | — | **REWRITE** — personas ≠ full interview set |
| Recommendations = shipped features | — | **REMOVE** |

---

# 3. VISUAL STORYBOARD

Approximately **8** major artefacts (cut to 5 if needed: keep V3, V5, V6, V7, V8).

| ID | Visual name | Research finding | Viewer understands in ~3s | Format | Type | Annotations | Confidentiality |
|---|---|---|---|---|---|---|---|
| V1 | Insight statement | Central insight | Availability/readiness dominate; UX still real | Large type | TYPOGRAPHY | Optional evidence chip | No client names |
| V2 | Research activities | Methods | Four activities, leisure-strong / gaps noted | Horizontal/vertical timeline | DIAGRAM · PRIMARY EVIDENCE | “Leisure-strong · work/ops next” | No raw artefacts |
| V3 | Availability hunt | Finding a slot was hard | Hard to see when a car is usable | Fictional calendar + search | RECONSTRUCTED UI | Trial-and-error; unclear days | Fictional cars/dates/cities |
| V4 | Two intents | Work ≠ leisure | Same UI, two jobs | Split panel | DIAGRAM (+ light UI) | Work: fixed window · Leisure: next available | No real user data |
| V5 | Available ≠ ready | Finding 4 / service | Bookable ≠ usable | Service timeline + vehicle state | DIAGRAM · conceptual states | Return → prep → charge → ready | State model = exploration if named statuses |
| V6 | Reservation disappeared | Cancellation trust | Promise failed late, no reason | Timeline + detail pair | RECONSTRUCTED UI + EXPLORATION | Before: no reason · After: reason (exploration) | Fictional Jan→Sep story |
| V7 | Hidden rule | One-reservation / weekend | Rule arrives after Reserve | Sequence | RECONSTRUCTED UI | “Too late” marker | Paraphrased rule copy |
| V8 | Investment fork | 6–12 months question | Better UI can leave same capacity constraint | Flow diagram | DIAGRAM · PROJECT CONTEXT | Label timeframe as project context | No € figures |
| V9 | Exploration strip | Post-turning-point | Constructive response, not launch | 3–4 mini frames | DESIGN EXPLORATION | Every frame labelled | Fictional |

**Caption grammar:** always pair research → implication; never “shipped to production.”

---

# 4. RECONSTRUCTED UI SPECIFICATIONS

All UIs are **fictional**. Product name on-screen: neutral (e.g. “Pool booking” / “Car pool”) — not internal production titles. Label every artefact `RECONSTRUCTED UI` or `DESIGN EXPLORATION`.

### R1 — Availability discovery (pairs with V3)

- **Structure:** Location · intent · date range · results list/calendar.  
- **Research state:** Many days blocked/ambiguous; cars listed without clear open dates; user paging months.  
- **Exploration state (optional adjacent):** “When do you need a car?” → next available + filters.  
- **Must fictionalise:** models, plates, cities, user.  
- **3s message:** Choosing a car was easy; finding a usable slot was not.

### R2 — Work vs leisure (V4)

- **Structure:** Two columns. Work: fixed date/time + reason field. Leisure: “Next available weekend.”  
- **Not:** two separate products.  
- **3s message:** One interface was doing two jobs.

### R3 — Available vs ready (V5)

- Prefer **diagram** over fake telemetry gauges.  
- If a card is shown: “Available from 16:00” + “Charging / inspection · ready 18:30” as **conceptual**.  
- **3s message:** A free cell is not a ready car.

### R4 — Cancellation (V6)

- **Research reconstruction:** Reservation detail · status Cancelled · no reason.  
- **Exploration:** Reason (e.g. maintenance) + next action (waitlist / alternatives) — labelled exploration.  
- **3s message:** The plan failed; the product didn’t explain why.

### R5 — Hidden restriction (V7)

- **Sequence:** Select car/date → Reserve → error “You already have an active reservation.”  
- **Exploration:** Eligibility banner before Reserve.  
- **3s message:** The system knew the rule before the click.

### R6 — Reservation history (supports f05 / Finding 1)

- **Research:** Date-range default hides upcoming; empty/wrong mental state.  
- **Exploration:** Upcoming / Past / Cancelled without forcing opaque date math.  
- **3s message:** Defaults hid the user’s future booking.

### R7 — Lifecycle (optional if space)

- Conceptual states: Requested → Confirmed → Preparing → Ready → In use → Returned → Inspection → Available (+ Charging / Maintenance / Cancelled).  
- **Label:** DESIGN EXPLORATION (not production status model).

### R8 — Planned vs actual (optional, Finding 5)

- Planned pickup/return vs actual logged times.  
- **Label:** DESIGN EXPLORATION from research recommendation.

---

# 5. SERVICE MODEL

### Final diagram to communicate

```
USER DEMAND
→ AVAILABILITY
→ BOOKING (platform layer)
→ VEHICLE PREPARATION
→ CHARGING / MAINTENANCE
→ READY
→ PICK-UP → USAGE → RETURN
→ INSPECTION
→ NEXT USER
```

**Intent:** Show the platform sits in the middle of a service loop. A new platform can improve interaction; it cannot invent fleet capacity, erase charge time, or remove maintenance.

**Label on diagram:**  
`CONCEPTUAL MODEL · derived from research (PRIMARY EVIDENCE: charging, inspection, maintenance constraints) · sequence simplified (INFERENCE)`

**Do not claim:** this is the documented Stronghold SOP order, staffing model, or SLA.

**Pair with V5** so “Available ≠ Ready” is felt, not only argued.

---

# 6. DESIGN EXPLORATIONS

Appear **only after** the turning point (section 11), and/or as clearly labelled “after” states beside reconstructions.

| Exploration | Addresses | Page treatment |
|---|---|---|
| Availability-first booking | f01 | Mini frame in V9 + optional R1 after |
| Waiting list / release notification | f01, f04 | Mention + one frame; ops feasibility unknown |
| Work / leisure intent | f02 | R2 exploration |
| Readiness / charging visibility | f03 | R3 conceptual states |
| Explicit cancellation reasons | f04 | R4 after |
| Reservation lifecycle clarity | f04, f05 | R7 |
| History defaults / status language | Finding 1, f05 | R6 |
| Actual pickup/return logging | Finding 5 | R8 optional |

**Section intro:**  
“These are design responses to the research — not a record of implementation.”

**Outcomes language (allowed):**  
challenged the case for a UI-first rebuild · changed the investment question · reframed what “fixing Carpool” must mean.

**Forbidden:** launched · shipped · increased conversion · saved €X · decided not to build (unless later documented).

---

# 7. CONFIDENTIALITY

## Publication checklist

- [ ] Research PDF not linked, embedded, or downloadable  
- [ ] Source Pack PDF not public  
- [ ] No original screenshots from research or production  
- [ ] No employee names, IDs, faces, licence numbers  
- [ ] No real plates, emails, internal URLs, Confluence/login chrome  
- [ ] Employer / internal team / tool names cleared or anonymised (CTW, Stronghold, Pulsar, production app title)  
- [ ] Quotes paraphrased or cleared; no participant re-identification  
- [ ] Every fake UI labelled RECONSTRUCTED UI or DESIGN EXPLORATION  
- [ ] 6–12 months labelled PROJECT CONTEXT  
- [ ] No invented metrics  
- [ ] Disclosure near cover or footer:  
  **“Client and product details have been anonymised. Interface imagery has been reconstructed for portfolio purposes.”**

**Git:** keep PDFs gitignored (research + source pack). Commit markdown blueprints only.

---

# 8. EXISTING URSO PARVO SYSTEM

Do **not** invent a new design system. Extend `globals.css` tokens and Studio editorial rhythm.

### Reuse

| Piece | Path / class | Use on Carpool |
|---|---|---|
| Shell | `PublicShell`, `SkipLink`, `PublicFooter`, `ThemeToggle` | Page chrome |
| Title reveal | `RevealTitle` + `.type-display` | Cover title |
| Editorial body | `.type-corpo`, `.measure`, `.type-lede`, `.type-nota`, `.text-secondary` | Copy |
| Section pattern | `.studio-section` (sticky label ≥900px) | Numbered narrative sections |
| Essay stack | `.studio-open`, `.studio-essay`, `.rise` | Cover / open |
| Motion | `framer-motion` via `ui-motion`, CSS `--dur-*`, `prefers-reduced-motion` | Subtle only |
| CTA | `.form-submit` / `MotionLink` | End CTA → project inquiry if appropriate |
| Content i18n | `src/content/dict/*`, `src/lib/i18n.ts` | PT + EN copy |

### Typography

- Font: **Nudica** (`--font-brand`) only  
- Display / heading / lede / corpo / nota / meta / label tokens already defined  
- Avoid new typefaces

### Colour

- `--surface` `#faf9f6` / dark `#151311`  
- `--text` / `--text-secondary`  
- `--accent` `#ffff50` (use sparingly; not purple SaaS chrome)  
- Reconstructed UIs: monochrome + one quiet status colour; no fake dashboard glow

### Spacing / layout

- Scale: `--space-1`…`--space-24`  
- Reading: `.site-container` (720) for prose-heavy beats; `.site-container--wide` (1080) for diagrams / split findings  
- Gutters: `--container-gutter`  
- Section gaps follow Studio: large vertical rhythm (`--space-12`–`--space-24`)

### Responsive breakpoints in use

640 · 768 · 900 (studio-section grid) · 1024 · 1440

### Animation conventions

- Prefer CSS reveal (`.rise`, reveal lines) gated by `prefers-reduced-motion`  
- Framer only for press/hover micro-interactions already patterned  
- No essential meaning only in motion  
- Diagrams: static-first; optional progressive draw only if reduced-motion safe

### Project-page gap

- **No case-study route exists yet.** Closest template: Studio essay.  
- Home `PROJECTS` tiles currently **do not link**.  
- `/work` and `/work/:slug` **permanent-redirect to `/pt`** in `next.config.ts` — do **not** use `/work/carpool` without changing redirects.

### Recommended routes (greenfield)

| Lang | Path |
|---|---|
| PT | `/pt/trabalho/carpool` |
| EN | `/en/work/carpool` |

Add `CARPOOL_PATH` (or generic work-case paths) in `src/lib/i18n.ts`. Pair `generateStaticParams` + `notFound()` per locale like Studio/Project. Add `generateMetadata` with `alternates.languages`.

---

# 9. PAGE ARCHITECTURE

### Hierarchy (eventual implementation)

```
[lang]/trabalho|work}/carpool/page.tsx
└─ PublicShell
   └─ CarpoolCaseStudy (server or client split carefully)
      ├─ CarpoolCover
      ├─ CarpoolEvidenceLegend
      ├─ CarpoolSection (× narrative sections)
      │    ├─ sticky label (studio-section pattern)
      │    ├─ headline + body
      │    └─ optional visual slot
      ├─ CarpoolFindings
      │    └─ CarpoolFindingBlock × 5
      ├─ CarpoolSoftwareBoundary
      ├─ CarpoolInvestment
      ├─ CarpoolExplorations
      ├─ CarpoolOutcome
      └─ CarpoolDisclosure
Visual primitives (new, minimal):
├─ CarpoolDiagram (service / methods / investment)
├─ CarpoolReconstructedUI (shell + label chip)
└─ CarpoolExplorationFrame
```

### Reuse vs new

| Need | Approach |
|---|---|
| Shell, footer, theme, skip link | Reuse |
| Display title | Reuse `RevealTitle` |
| Section chrome | Prefer `.studio-section` + thin new BEM under `.carpool-*` in `globals.css` |
| Reconstructed UI | **New** components — no existing card system to abuse |
| Diagrams | **New** semantic SVG/HTML lists — accessible |
| Dict copy | **New** `dict` keys under `carpool` for pt/en |

### Content strategy

- Store copy in `src/content/dict` (bilingual), sourced from Final + locked insight — not from confidential PDF text dumps.  
- Visual props stay fictional constants in a `carpool/fixtures.ts` (fake cars/dates only).

---

# 10. RESPONSIVE BEHAVIOUR

| Viewport | Behaviour |
|---|---|
| **Mobile (<640)** | Single column. Display title wraps. Diagrams stack vertically; service model as numbered list. Reconstructed UIs: full-bleed within gutter, horizontal scroll **avoided**; simplify calendar to list if needed. Findings stack. Sticky section labels become static kicker above body. |
| **Tablet (640–899)** | Same single column; slightly wider measure. Split intents (V4) can sit 2-col if readable. |
| **Desktop (≥900)** | Enable `.studio-section` 2-col (label \| body). Wide container for V3–V8. Findings: f01/f03 full width visuals; others may sit denser. |
| **Large (≥1440)** | Cap at `--wide` 1080; do not stretch prose. Extra margin, not wider text measure. |

**Touch:** targets ≥44px on any interactive exploration controls (even if non-functional demos — if interactive, must be keyboardable).

---

# 11. ACCESSIBILITY

Target: **WCAG 2.2 AA** (Source Pack §36).

### Page-level

- Semantic landmarks: `header` (shell), `main#conteudo-principal`, `footer`  
- One `h1` (Carpool); sections use `h2`; findings `h3`  
- Skip link already in shell  
- Focus visible (`--focus-ring`)  
- Contrast on surface/text; don’t place body text on accent yellow  
- `prefers-reduced-motion` respected  
- Lang attributes via existing `[lang]` layout (`pt-PT` / `en`)  
- Bilingual pages with proper `hreflang` alternates  

### Complex visuals

| Visual | A11y requirement |
|---|---|
| Service / investment diagrams | Not image-only: HTML/SVG with text alternatives; `aria-labelledby`; short summary in adjacent prose |
| Reconstructed UIs | Treat as figures: `<figure>` + `<figcaption>` including label (RECONSTRUCTED UI). If non-interactive, `role="img"` + concise `aria-label` describing the research point — not every control. If interactive demo, full keyboard + name/role/value |
| Calendar reconstructions | Don’t rely on colour alone for available vs blocked; add text/pattern |
| Exploration vs research | Visible text label, not colour coding alone |
| Status chips | Text + shape, not colour-only |

### Copy

- Don’t convey critical claims only in caption images  
- Avoid low-contrast meta chips  

---

# 12. SEO

### Metadata (no confidential client names)

| Field | EN proposal | PT proposal (draft) |
|---|---|---|
| `<title>` | Carpool — UX research case study · Urso Parvo | Carpool — caso de estudo de UX research · Urso Parvo |
| Meta description | UX research case study on vehicle availability, booking behaviour and operational readiness — and how research challenged a platform-first assumption. | Caso de estudo de UX research sobre disponibilidade de veículos, comportamento de reserva e readiness operacional — e como a pesquisa desafiou uma assunção platform-first. |
| OG title | Same as title | Same |
| OG description | Same as meta | Same |
| robots | `index, follow` (public portfolio) | same |

### Semantic structure

- `h1` Carpool  
- Section `h2`s matching narrative  
- Finding `h3`s  
- JSON-LD optional: `Article` / `CreativeWork` with anonymised about — skip Organisation confidential names  

### Canonical / alternates

- Canonical per locale path  
- `alternates.languages`: `pt` ↔ `en` via `CARPOOL_PATH`  

### Do not include in metadata

Employer legal name, internal product codenames, employee names, “CTW”, downloadable research.

---

# 13. IMPLEMENTATION ORDER

1. **Route / page shell** — PT/EN paths, `PublicShell`, dict stubs, metadata, disclosure  
2. **Typography / layout** — section rhythm via Studio patterns + `carpool-*` CSS tokens only as needed  
3. **Narrative sections 01–07, 09–11** — copy first, placeholders for visuals  
4. **Findings section** — five blocks with weighting  
5. **Reconstructed UI components** — R1–R6 (R7–R8 if time) with labels  
6. **Service + investment diagrams** — accessible HTML/SVG  
7. **Design exploration strip** — clearly labelled  
8. **Responsive behaviour** — mobile simplify diagrams; desktop sticky labels  
9. **Accessibility pass** — headings, figcaptions, contrast, keyboard, reduced motion  
10. **Motion** — only after content correct; keep minimal  
11. **SEO** — titles, descriptions, alternates  
12. **Home linkage (optional last)** — link from a project tile only when page is ready  
13. **QA** — checklist in §14  

**Explicit non-goals for v1:** CMS, MDX pipeline, authentic screenshot pipeline, analytics metrics blocks.

---

# 14. FINAL QUALITY CHECK

Before calling the page finished:

### Narrative / evidence

- [ ] Turning point uses **locked insight** (availability/readiness dominant; UX real but secondary)  
- [ ] Assumption presented as starting point, not foresight  
- [ ] 6–12 months labelled PROJECT CONTEXT  
- [ ] No “we cancelled the platform” / ROI / fake metrics  
- [ ] Explorations labelled; not presented as shipped  
- [ ] Work/ops research limits acknowledged once  

### Confidentiality

- [ ] All items in §7 checklist pass  
- [ ] No PDF assets in public routes  

### Design system

- [ ] Nudica + existing colour/spacing tokens only  
- [ ] Feels like Urso Parvo editorial, not a SaaS case-study template  
- [ ] No generic card grids / KPI strips / purple gradients  

### Engineering

- [ ] PT and EN routes work; language toggle targets sibling path  
- [ ] Lighthouse a11y sensible; keyboard path clean  
- [ ] `prefers-reduced-motion` OK  
- [ ] `next build` passes  

### Reader test

A stranger should leave understanding:  
**research reframed a platform investment around service capacity and readiness — without needing confidential source files.**

---

# APPENDIX A — Source reconciliation decisions (locked for build)

| Topic | Decision |
|---|---|
| Source Pack title “When the problem isn’t the platform” | Optional subtitle energy only; body uses locked insight |
| “Interface wasn’t the bottleneck” | Not standalone; always qualified |
| Section count | 11 top-level (findings grouped) |
| Route | `/pt/trabalho/carpool` + `/en/work/carpool` |
| Visual count | 8 major; priority keep V3, V5, V6, V7, V8 |
| Quotes | Prefer paraphrase; originals only if cleared |
| Stronghold / employer naming | Anonymise by default (“operations team”) |

---

# APPENDIX B — File touch list (when implementation starts)

**Allowed later (not now):**

- `src/app/[lang]/trabalho/carpool/page.tsx`  
- `src/app/[lang]/work/carpool/page.tsx`  
- `src/components/carpool/*`  
- `src/content/dict/*` (carpool keys)  
- `src/lib/i18n.ts` (paths)  
- `src/app/globals.css` (`.carpool-*` extensions)  
- optionally `src/data/projects.ts` + `ProjectGrid` link  

**Do not touch for Carpool v1 unless required:** inquiry flow, theme core, font loading.

---

*End of blueprint. Ready for implementation only after this document is accepted.*
