# Intraday Reforecasting: implementation blueprint

Phase 3. Blueprint only. No route, component, style, asset, dependency, or application code is authorised by this document.

This file translates `docs/intraday-reforecasting-case-study-spec.md` into an implementation plan for the current repository. It does not change the case study. Where a build would have to invent product behaviour, the plan stops and names the gap.

---

## 1. Phase 3 purpose

Phase 4 should be able to build the page without rediscovering the story, inventing a state, or choosing a second dataset.

The experience is already decided. Twelve sections. Five interactions that do not share state. One illustrative day. A check that does not announce itself. A queue switch that is not a shipping claim. A 10% line that is a target.

This blueprint says where that experience sits in this Next.js app, which modules own which facts, which sections stay static, and which tests fail if a claim or a number drifts.

---

## 2. Authoritative sources

| Order | Source | Governs |
|---|---|---|
| 1 | Phase 2 specification | Sections, copy, interactions, dataset, visual rules, accessibility, motion, open questions. |
| 2 | Phase 1 audit | Evidence, provenance, contradictions, what must stay unknown. |
| 3 | This repository, as inspected for this blueprint | How a page is allowed to be built. Not what the project was. |

If the specification and the audit disagree, do not pick a third reading. Follow the audit on historical facts. Follow the specification where it already labels a choice as reconstruction or exploration. Recorded conflicts are in the next subsection. None of them are resolved here.

The Figma prototype is still unread. Do not treat a future look at it as permission to change the blueprint during the build. A change in evidence is a specification change, not an implementation detail.

No other case study is a source for narrative, section order, palette, interaction design, or content shape. Shared site infrastructure is listed in the audits below and may be reused only as infrastructure.

### Conflicts recorded, not resolved

| Topic | Audit | Specification | What the build does |
|---|---|---|---|
| Extra issues in the log | A second and third row may exist so the log is not a single line. | One issue. No severity. No count while a run is in progress. | Follow the specification. It is an explicit reconstruction limit. Do not add rows to make the log look busier. |
| Cap and interval | May be omitted, or hidden behind a control that defaults to off. | Omitted. Not a control. | Follow the specification. Do not add the control. |
| Issue count "3" | Prototype chrome. Meaning open. | Not shown. | Do not render a count badge. |
| Colour values | Palette named, hex not locked. | Hex locked. | Follow the specification. |
| Surface label | "Team schedule" | "Team schedule" | Use that exact label. Do not retitle it. |
| Portuguese | Site is bilingual. Voice and translation are open. | English copy only. Structure may hold a second language later. | Do not write Portuguese in the build. See section 29. |

---

## 3. Repository architecture audit

Inspected: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `postcss.config.mjs`, `src/app`, `src/components`, `src/content`, `src/lib`, `src/data`.

| Concern | What exists |
|---|---|
| Framework | Next.js 16.2.9, React 19.2.4, TypeScript 5, strict. App Router under `src/app/[lang]/`. |
| Rendering | Server components by default. Client components are marked `"use client"`. Content getters that must not run on the client import `server-only`. |
| Routing | Locale segment `pt` or `en`. A page exports `generateStaticParams`, `generateMetadata`, and a server component. Unknown locales fall through `hasLang`. A catch-all `src/app/[lang]/[...rest]/page.tsx` exists. |
| CSS | Tailwind v4 via `@import "tailwindcss"` in `src/app/globals.css`. No `tailwind.config`. Tokens are CSS variables on `:root` and `.dark`. One global stylesheet. No CSS modules. |
| TypeScript | `@/*` maps to `src/*`. JSX `react-jsx`. |
| Motion library | `framer-motion` 12. Used by the shell, the home grid, and one existing case study. |
| Internationalisation | `src/lib/i18n.ts` path maps. Dictionaries in `src/content/dict`. `getDict` is server-only. |
| Theme | `src/lib/theme.ts`. Class `dark` on `html`. Storage key `up-theme`. Modes light, dark, system. |
| Tests | Vitest 4, environment `node`, include `src/**/*.test.ts` only. No jsdom, no Testing Library, no browser runner, no screenshot tool. |
| Content | Typed modules per locale, assembled by a server-only index. |
| Assets | Local fonts in `public/fonts`. Bear logo. No chart image pipeline for this project. |
| Build | `next build`. Turbopack root is `process.cwd()`. |
| Dependencies | No chart library. No UI kit. No state library. No analytics SDK in the case-study path. |

There is no Intraday route, content module, component, or stylesheet.

`docs/superpowers/` describes an older site. Ignore it.

Before Phase 4 writes any page, read `node_modules/next/dist/docs/` for the App Router patterns that will actually be used (server and client composition, metadata, static params). That reading is a build step, not part of this blueprint.

---

## 4. Existing design system audit

Tokens already defined and required:

| Token | Value | Use on this page |
|---|---|---|
| `--fs-display` through `--fs-meta` | Clamped or fixed sizes in `globals.css` | The only type scale. |
| `--fw-regular`, `--fw-medium`, `--fw-bold` | 400, 500, 700 | The only weights. Italic is the italic cut, not a new weight. |
| `--measure-lede`, `--measure-body` | 36rem, 66ch | Lede and body. |
| `--container-max` | 720px | Narrow measure. |
| `.site-container--wide` | 1080px | Sections 05, 07, 08, 09. |
| `--container-gutter` | `clamp(1.5rem, 5vw, 4rem)` | Page inset, via the shell container. |
| `--space-1` to `--space-24` | 4px to 96px | Spacing. Do not invent a parallel scale. |
| `--radius-ui` | 4px | Product frame and controls. |
| `--dur-micro`, `--ease-standard` | 160ms, cubic-bezier(0.4, 0, 0.2, 1) | The only motion timing. |
| `--dur-reveal` | 560ms | Do not use. It is an entrance animation. |
| `--surface`, `--text`, `--text-secondary`, `--field` | Theme-aware | Body sections that are not editorial fields. |
| `--accent` `#ffff50` | Site yellow | Not a case accent. Not a focus ring on a light surface. |
| `--focus-ring` | Ink in light, yellow in `.dark` | See focus. The product frame must override it. |

What does not exist, and must not be invented as a site-wide system:

- No Button, Switch, Table, or Disclosure component. Use native `button`, `input type="checkbox"` or `button role` avoided, native checkbox for the switch semantics (section 22), and `details` if the narrow queue form needs a disclosure.
- No breakpoint token. The stylesheet uses 640, 768, 900, 1024, and 1100 in places that are not this page. The specification's composition change is the 720px measure. Map it to `45rem` (720px at the default root). Do not reuse 768px for this page. A 768px query would change layout while the wide frame still fits the measure the specification chose.
- No editorial purple in the token set. Add case-scoped variables under `.intraday` only. Do not add them to `:root`.

`RevealTitle` animates display type on load. Do not use it. The cover thesis is static text.

`press` in `src/components/ui-motion.tsx` scales controls on hover and tap. Do not use it on case-study controls. Hover must not be required, and scale is not one of the allowed motions.

---

## 5. Existing accessibility audit

Reuse:

- Skip link to `#conteudo-principal`. The case study renders inside that `main`. Do not add a second `main`.
- `:focus-visible` outline 2px, offset 2px, colour `var(--focus-ring)`.
- Header and footer controls already use 44px minimums. Case-study controls must do the same.
- Global reduced motion (section 6) already collapses animation and smooth scroll.

Gaps for this page:

- No live-region helper.
- No chart pattern.
- No switch primitive. The existing case study uses `aria-pressed` and `tablist` for its own interactions. Those are not a shared primitive, and this page does not copy that interaction model.
- `copy-audit.test.ts` does not scan case-study content. A new test file must. Do not fold Intraday strings into the studio dictionary test. That test has fixtures this page must not disturb.

Prefer native elements. Add ARIA only where section 22 says so.

---

## 6. Existing motion audit

Two mechanisms exist:

1. CSS. `--dur-micro` is 160ms. `--dur-reveal` is 560ms and is tied to load-in keyframes (`rise`, `reveal-line`, `cta-in`). Under `prefers-reduced-motion: reduce`, a global rule sets `animation-duration` and `transition-duration` to `0.01ms` and `scroll-behavior` to `auto` on every element.
2. `framer-motion`, including `useReducedMotion`, springs, and `whileHover` scale.

For this page:

- Use CSS transitions of `var(--dur-micro) var(--ease-standard)` for the four opacity or text swaps the specification allows.
- Do not import `framer-motion` in any Intraday module.
- Do not use `--dur-reveal` or the reveal classes.
- Essential text is in the DOM at full opacity. Only a non-essential series (the dotted previous line, the actuals appearing) may transition opacity. The sentence that explains the state is never waiting on `transitionend`.
- The global reduced-motion rule already shortens transitions. Do not write a second system that reveals content only after motion ends. If motion never runs, the final state is already showing.

---

## 7. Existing internationalisation audit

- `Lang` is `"pt" | "en"`.
- `HTML_LANG` maps `pt` to `pt-PT`.
- Path helpers live in `src/lib/i18n.ts`. The published case study uses `CARPOOL_PATH` with `/en/work/...` and `/pt/trabalho/...`, plus redirects in `next.config.ts` for the swapped pairs.
- `getDict(lang)` supplies shell strings. Page content is a separate module, not the dictionary.
- Copy rules for studio strings: no em dash, European Portuguese, pre-1990 spelling on the live dictionary, no employer name, no first person in studio copy. Case-study files are outside that scan today.

The specification's copy is English and impersonal. The content type should be able to hold a `pt` value later. Phase 4 does not create that value.

---

## 8. Existing routing audit

A case-study URL is a server page:

- `src/app/[lang]/work/<slug>/page.tsx` for English.
- `src/app/[lang]/trabalho/<slug>/page.tsx` for Portuguese, only when that copy exists.
- The page wraps children in `PublicShell` with `lang`, dictionary header, skip link, theme labels, `langHref`, and `studioOpen`.

`PublicShell` always renders the site header (home, theme, studio or home toggle) and `PublicFooter`. The footer language control requires `langHref`. There is no prop to hide it.

`generateMetadata` on the existing case-study page sets `title`, `description`, `alternates.canonical`, `alternates.languages`, and `openGraph` of type `article`. The root layout sets `metadataBase` from `NEXT_PUBLIC_SITE_URL` or `SITE.url`.

`src/data/projects.ts` is the home list. An entry needs `kind: "product"` and `href`. Adding it before the route exists would publish a dead link. Phase 4 adds it in the same change as the route, not before.

This phase creates none of those files.

Future English path, matching the existing work prefix, not a new routing scheme:

`/en/work/intraday-reforecasting`

Portuguese path: not specified. Do not invent a slug in the build.

Mismatched prefixes (`/pt/work/intraday-reforecasting`, `/en/trabalho/...`) should 404 or hit the existing catch-all until a real pair exists. Do not add a redirect to a page that has no translation.

---

## 9. Implementation principles

1. The specification's copy and dataset are transcribed. They are not improved.
2. Historical uncertainty stays in the copy that already states it. Components do not "fix" it with extra UI.
3. One dataset module. Charts, tables, issues, and tests read it. They do not restate numbers.
4. Interaction state is local to the demonstration that uses it.
5. The only cross-cutting client behaviour is a single polite live region.
6. Editorial sections render on the server. Client components are the five interactions, the queue switch, and the announcer.
7. The product frame cannot be the place where narrative state lives.
8. A forbidden claim fails a test.
9. No new dependency, unless a later phase explicitly approves one. This blueprint does not approve one.

---

## 10. Implementation boundaries

The page is a deterministic explanation. It is not a forecasting product.

Do not add:

- API routes, server actions, authentication, a database, or environment variables for this page.
- A threshold function, a period-count constant presented as a rule, a multiplier, an eight-week window, a daily cap, or a minimum gap.
- Timers that delay step 4 or step 5. There is no waiting and no progress value.
- `Math.random`, `Date.now`, or `new Date()` inside Intraday modules. The footer year is existing shell code and is out of scope.
- Push, email, sound, a Preview panel, an insights chart, a severity score, an accept button, a staffing recommendation, or a second issue.
- Analytics events.

The 10% sentence is a string in editorial content. Nothing computes it from the dataset.

The 20-contact lift is stored as data, not produced by `previous * factor`. A test asserts each new value from 11:00 is `previous + 20`. The drawing rule is checked. It is not generalised into a forecasting function.

---

## 11. Three-layer architecture

**Layer 1, editorial.** Server-rendered sections. Headings, body, evidence labels, the target block, validation, outcome, reflection, the in-page section list. This layer imports copy. It does not import interaction state.

**Layer 2, demonstrations.** Client islands. Each receives copy as props and reads the dataset module. Each owns its state. Each may call `announce(message)` on the events in section 22. None of them reads another island's state.

**Layer 3, reconstruction.** Markup inside the queue-switch island and the product-shell island. It is a view of layer 2 plus the dataset. It does not contain section headings, the thesis, or the target block. It cannot set editorial labels except the Reconstruction and Illustrative labels the specification puts on the frame.

The shell in section 08 assumes the queue is allowed to reforecast via a sentence in layer 1, not via the switch.

---

## 12. Content architecture

Namespace: `src/content/intraday/`. Not a CMS. Not a shared portfolio schema.

| Module | Role | Runs on |
|---|---|---|
| `types.ts` | Content, dataset, step, surface, and label types. | Either |
| `dataset.ts` | The only numbers, names, and clocks. | Either. No `server-only`. |
| `derive.ts` | Hourly sums, series visibility, delta sentence inputs, percentage check for the four actuals. Pure. | Either |
| `state.ts` | Transition functions and announcement strings. Pure. No React. | Either |
| `en.ts` | Every English string, including empty-state and disabled reasons. | Imported by the server index |
| `index.ts` | `import "server-only"`. `getIntradayContent("en")`. | Server only |
| `claims.test.ts` | Forbidden strings and required labels. | Vitest |
| `dataset.test.ts` | Invariants. | Vitest |
| `state.test.ts` | Transitions, banners, series, announcements. | Vitest |

`en.ts` references dataset facts by id (`"volumeNote"`, `"delta"`) but does not embed a second copy of the quarter-hour table. The delta sentence is the specification's sentence, stored once in `en.ts`. The test in `dataset.test.ts` checks that the sentence's "20 contacts" matches `derive.restOfDayLift`, which is the constant `20` used only inside the assertion that data was authored as previous + 20. Do not export a `reforecast(previous)` function.

Evidence labels are a union:

`requirement | designDecision | context | inference | reconstruction | exploration | illustrative`

There is no `research` member. A label cannot be added in a component as a raw string. `EvidenceLabel` accepts the union only.

Copy objects are grouped by section id `s01` to `s12`, plus `interact.scenario`, `interact.steps`, `interact.shell`, `interact.compare`, `interact.issue`, `interact.switch`, `meta`, `sections` (the twelve link labels).

Components receive the slice they need. They do not import `en.ts` directly, so a future `pt.ts` can be passed the same way. They may import `dataset.ts` and `derive.ts` and `state.ts`.

Strings that must not be hardcoded in TSX: button names, banner sentences, state names, the Preview reason, the switch helper, the conflict line, the target paragraph, the reconstruction sentence, "Illustrative", "Not in this illustration", "Existing setting".

---

## 13. Illustrative data architecture

`dataset.ts` is the code transcription of the specification's Illustrative dataset. Phase 4 copies that table once. This blueprint does not repeat the table, so a third divergent copy is not created.

Author fields:

- `account`: Greyharbour Contact Centre
- `queue`: Support
- `contrastQueue`: Orders, `series: null`
- `dateLabel`: Tuesday 6 June 2023
- `timeZone`: Europe/Lisbon
- `quarters[]`: `time`, `previous`, `actual | null`, `next | null`
- `affected`: `{ start: "10:00", end: "11:00" }`
- `checks`: the three clocks 09:30, 10:30, 11:00, each pointing at quarter ids. They are illustration clocks, not a cron expression.
- `people[]`: the six names and shifts from the specification
- `issue`: queue id, period, no severity, no external id

Invariants enforced by `dataset.test.ts`:

- 36 quarters from 08:00 through 16:45.
- Actuals are non-null only from 08:00 through 10:45.
- `next` is non-null only from 11:00 through 16:45.
- Every `next` equals `previous + 20`. No other transform is applied.
- The four affected actuals are 83, 83, 86, 86 against 64, 64, 66, 66.
- Hourly previous sums for 08, 09, 10, and 11 are 204, 236, 260, and 266. Hour 11 on `next` is 346. `derive.hourly(series, hour)` is the only way to get these. Section 02 does not store them.
- Affected-period actual total 338, previous total 260. The "about 30%" wording stays in copy. The test checks the totals. It does not format a second percentage for display.
- Orders has no numbers. Any render of Orders that reads a series fails the type (`series: null`).
- People present from 10:00 to 11:00 are the five named in the specification. Filipe Gouveia is absent in that hour. Presence is a function of shift start and end, not a separate boolean that can drift.
- No field is named `threshold`, `accuracy`, `severity`, `cap`, or `multiplier`.

`derive.seriesForStep(step)` returns which of `previous`, `actual`, `next` are visible. Components use that. They do not reimplement the step table.

Empty table cells render the copy string "Not in this illustration". They do not render 0.

The 10% paragraph is absent from this module.

---

## 14. System state model

Three different kinds of state. They are not one enum and not one reducer.

### Product states inside the reconstructed shell

`watching | inProgress | updated`

| State | Banner | Notification list | Forecast series in the shell |
|---|---|---|---|
| `watching` | None. The banner node is not rendered. | One item: the "nothing to report" string. | `previous` only. |
| `inProgress` | Start sentence. | That sentence only. | `previous` only. |
| `updated` | Completed sentence. | Completed sentence, then the start sentence as the earlier notice. | `next` from 11:00. Previous hidden. The comparison toggle is not in this shell. |

Valid shell transitions: any of the three may be selected directly, because the control is a radiogroup, not a wizard. Selecting the current value again is a no-op and does not announce.

Invalid, and not representable in the type:

- A banner string when `watching`.
- `next` series when not `updated`.
- A progress number, an error value, an accept flag.
- `inProgress` together with an issue count.

`state.banner(shellState)` returns `string | null`. The component renders a banner only when the result is non-null.

### Stepper states

`check | deviation | qualifyingGap | reforecastInProgress | forecastUpdated`

Mapped one-to-one onto steps 1 to 5. Direct selection and Back/Next both call `state.stepTo(current, target)`.

Back on step 1 and Next on step 5 return the same step and `announce: null`.

Series:

| Step | previous | actuals | next | reforecast status sentence |
|---|---|---|---|---|
| 1 | yes | quarters in the check window only | no | no |
| 2 | yes | through 10:15, with 10:00 and 10:15 marked | no | no |
| 3 | yes | through 10:45, affected band on | no | no |
| 4 | yes | through 10:45, band on | no | start sentence |
| 5 | yes | through 10:45 | yes, from 11:00 | completed sentence |

The word "Anomaly detected" appears only inside the documented start sentence, at steps 4 and 5's predecessor notice, and in the shell. It is not the name of step 3. Step 3's visible name is "Qualifying gap".

### Visitor activities

Not stored as product state.

- Inspection: which destination was last requested in the issue path (`forecast` or `schedule`). Used only to place focus. It does not change series.
- Staffing action: no state, no control, no component.

### Queue switch

`boolean`, local. On shows the specification's outside line. Off removes it. No other module reads it.

### Invalid everywhere

`off` as a shell state. Deviation as a banner. Handle time or capacity as a series. Preview as an open panel. Check insights as chart data. A transition from any island into another island.

---

## 15. State ownership

| State | Owner | Persists beyond the section | Read by |
|---|---|---|---|
| Scenario id | `ScenarioSelector` | No | Its chart and note |
| Step id | `ReforecastStepper` | No | Its chart, table, status |
| Switch boolean | `QueueSwitch` | No | The line under that form |
| Surface | `ProductShell` | No | The body of the frame |
| Shell product state | `ProductShell` | No | Banner, notifications, forecast series |
| Notification panel open | `ProductShell` | No | The panel |
| Filter on | `ProductShell` | No | Orders row visibility, affected-queue line |
| Previous shown | `ForecastCompare` | No | Dotted series and delta line |
| Selected quarter | `ForecastCompare` | No | The readout. The table remains the full alternative. |
| Last issue destination | `IssuePath` | No | Focus target |
| Announcer message | `Announcer` | Until the next announcement | The one live region |

Do not create `CaseStudyState`, a context of product state, a URL query encoding the step, or `localStorage`. Refreshing the page returns each island to its specified initial state. That is correct.

Initial values:

- Scenario: `volume`
- Step: 1
- Switch: `false`
- Surface: `forecast`
- Shell state: `watching`
- Panel: closed
- Filter: off
- Previous: hidden
- Issue destination: none (focus stays on the issue)

---

## 16. Interaction architecture

Shared behaviour for every island:

- Controls are `button`, `input`, or a `fieldset` with radio inputs. Not `div` with `onClick`.
- No `onMouseEnter` behaviour.
- Disabled controls use the `disabled` attribute plus visible text. Preview uses `disabled` and `aria-describedby` pointing at the visible reason.
- Each island's announce calls are listed below. Anything not listed does not announce.

### Interaction 1, scenario

- Radiogroup, accessible name "What changed in the day". Native radio inputs, visually presented as the three choices. Arrow keys are built in.
- `state.scenario(id)` returns `{ showActuals: boolean, noteId }`. Only `volume` has `showActuals: true`. The branch is that boolean, not three chart modes.
- Handle time and capacity render the note and the forecast-only chart. They do not render a second empty "detector" slot.
- Live region: the note text when the selected id changes.
- Do not announce on first render.

### Interaction 2, stepper

- Radiogroup "Checks and the reforecast" with five radios, plus Back and Next buttons.
- `state.stepTo` returns the next step, the sentence id, series flags, and whether a reforecast status is shown.
- Back and Next are `disabled` at the ends, not hidden.
- No `setTimeout`. Changing step commits in the same event.
- Live region: the step sentence when the step id changes.
- Table for the step's quarters is in the same island, columns Time, Forecast, Actual.

### Interaction 3, shell

- Two radiogroups: "Forecast state" (`watching`, `inProgress`, `updated`) and "Surface" (`forecast`, `teamSchedule`, `insights`).
- `state.shell(state, surface, filter)` returns banner, notification items, series, whether Orders is visible, and the Insights body flag.
- Insights body is the one specification sentence. The component `InsightsBody` has no chart import. Enforce that by file boundary: `InsightsBody` lives in a module that does not import `ForecastChart`.
- Apply filter is a native checkbox with the visible name from the specification. It does not change surface or product state.
- Preview is a `button disabled`. The reason is a `<p id="preview-reason">` next to it.
- Check insights is rendered only when `surface === "insights"` and banner actions exist (`inProgress`). It sets surface to `insights`. If already there, `announce` is not called.
- Notifications button toggles the panel. Escape calls the same close function as the button.
- Live region: shell state sentence when product state changes; "Affected queue: Support" or the filter-off sentence when filter changes; surface name when surface changes. One user action changes only one of these.
- Watching renders no banner element, so a test can assert `banner(watching) === null`.

### Interaction 4, comparison

- Native checkbox, visible name "Show previous forecast". Checkbox rather than `role="switch"` because the site has no switch style, the name is a show/hide command, and a checkbox exposes checked state without extra ARIA. Style it as a checkable control with a 44px hit area, not as a graphic toggle that hides the input.
- `derive.comparison(on)` includes or omits the previous series. The delta sentence is copy, shown only when on.
- Quarter selection: pointer on the SVG calls `setQuarter`. Keyboard users use the table, which is not `aria-hidden`. The SVG is `aria-hidden="true"` because the summary and the table repeat it. Do not put 36 points in the tab order.
- Live region: the delta sentence when turned on, "Previous forecast hidden" when turned off.

### Interaction 5, issue path

- Two buttons: "Show this period on the forecast" and "Show this period on the schedule".
- Destinations are headings: "Affected period, 10:00 to 11:00". Same string both places, unique ids.
- On activate, `element.focus()` on the heading (`tabIndex={-1}`). Do not also announce. The heading name is the announcement.
- The hours are props from `dataset.affected`. The headings do not contain a literal that could diverge. They interpolate the dataset start and end.
- Schedule list is derived from `people` and the period. No recommended column.

### Queue switch

- Native checkbox, name "Turn on reforecast", `aria-describedby` the helper, which is always visible.
- Existing settings are `disabled` inputs with value attribute omitted and placeholder or adjacent text "Existing setting". Do not put 80%, 30 seconds, or any other target in the value.
- Narrow disclosure: `<details>` with summary "Existing queue settings". The switch stays outside the disclosure.
- No live region.

---

## 17. Component architecture

Files under `src/components/intraday/`. A component exists only if it has a boundary below. Do not create the others named in planning notes (`SectionTransition`, `ProductHeader`, `PeriodNavigator`, `IssueList`).

| Component | Exists because | Owns | Must not know | Client? |
|---|---|---|---|---|
| `IntradayCaseStudy` | Composes the twelve sections and the stylesheet import. | Nothing interactive. | Step, surface, switch. | No |
| `EvidenceLabel` | Labels are typed. | Nothing. | Whether the claim is true. | No |
| `Announcer` | One live region for all islands. | The current message string. | Why the message was produced. | Yes |
| `ForecastChart` | One SVG implementation for every series combination. | Nothing. Props: visible series, band, summary id. | Which section it is in, beyond a `variant` for axis density. | No, if it stays free of hooks. Pointer handlers are passed in optional props from a client parent. |
| `DataTable` | The accessible twin of the chart. | Nothing. | Styling of the product brand. | No |
| `ScenarioSelector` | Interaction 1. | Scenario id. | Steps, shell. | Yes |
| `ReforecastStepper` | Interaction 2. | Step id. | Switch, shell. | Yes |
| `QueueSwitch` | The reconstruction of Decision 1, isolated on purpose. | Boolean. | Shell state. | Yes |
| `ProductShell` | Surface and product state must stay in one place or they will drift. | Surface, product state, panel, filter. | The comparison toggle, the issue focus. | Yes |
| `ForecastCompare` | Interaction 4. | Toggle, selected quarter. | Shell state. | Yes |
| `IssuePath` | Interaction 5, including focus. | Destination. | Severity, simulation output. | Yes |
| `ScheduleList` | The same period list in the issue path and, if the shell's team-schedule body needs it, the shell. Props only. | Nothing. | How the visitor got there. | No |

`ProductShell` may contain unexported functions for the banner, the panel, and the three bodies in the same file. Split a body out only if it would import a chart the others must not use (`InsightsBody` is the one split).

`ForecastChart` must not format the 10% target and must not draw a threshold line. It has no prop for a threshold.

Do not prop-drill the announcer through section components. `Announcer` provides React context. Client islands call `useAnnounce()`. Server sections do not. The server page structure is:

```tsx
<Announcer>
  <IntradayCaseStudy content={content} />
</Announcer>
```

`IntradayCaseStudy` is a server component passed as `children`. Client islands rendered by it still sit under the provider in the tree, so context reaches them. The provider holds no product state. If a future change "lifts" scenario state into `Announcer` to make announcements easier, that change is a bug.

---

## 18. Routing integration

Do not add a route in Phase 3.

Phase 4, when the specification is still the one being built:

- Add `src/app/[lang]/work/intraday-reforecasting/page.tsx`.
- `generateStaticParams` returns `{ lang: "en" }` only.
- Any other `lang` calls `notFound()`.
- Wrap with `PublicShell` exactly as other public pages do: dictionary from `getDict("en")`, `studioOpen`, and the existing header and footer.
- `langHref` is `HOME_PATH.pt` until a Portuguese URL exists. The footer control then goes to the Portuguese home. That is the shell's real behaviour, not a translated case study. Do not create a stub page to catch the link.
- Do not add `INTRADAY_PATH.pt`.
- Do not add the home-grid entry until this route returns 200.
- Add the grid entry in the same change, with `href` only for `en` if the type requires both. If `href` is `Record<Lang, string>`, the type is a problem: it cannot point `pt` at a missing page. Inspect `Project` before coding. If `href` must include `pt`, do not publish the grid entry until the language question is decided. A dead or misleading Portuguese link is worse than a missing grid row. Record this as a Phase 4 gate, not a licence to write Portuguese.

Metadata on the English page:

- `title`: `Intraday Reforecasting`
- `description`: `A product design case study of a forecast that can change without the planner asking, and of making that change allowed, visible, and inspectable.`
- `alternates.canonical`: `/en/work/intraday-reforecasting`
- Do not emit `alternates.languages` for `pt-PT` until that URL exists. Do not copy the other case study's `x-default` locale.
- `openGraph.type`: `article`. `openGraph.locale`: `en`. Title and description match the document title and description. No image until a real one exists. Do not generate an image.

The description uses the thesis as a description of the page. It does not say the feature shipped or that accuracy changed.

---

## 19. Design system integration

Reuse the tokens in section 4. Add no `:root` colours.

Case-scoped variables on `.intraday`:

- `--intraday-purple: #3C2A63`
- `--intraday-on-purple: #F6F1E6`
- `--intraday-lilac: #E6DDF5`
- `--intraday-lilac-dark: #2C2836`
- `--intraday-cream: #F6F1E6`
- `--intraday-cream-dark: #231E1A`
- `--intraday-on-cream-dark: #F3EDE4`
- `--intraday-band: #6A4B12`

Product frame `.intraday-ui` sets its own background `#FFFFFF`, text `#1C1C1C`, muted `#5E584F`, bar `#EEEEEA`, banner `#F3EEE4`, action `#2F2E2C` on `#E4E2DC`, radius `var(--radius-ui)`, and `color-scheme: light`. These are literals on the frame so `.dark` cannot retint them. They are not new global tokens.

Editorial purple is a background on `.intraday-field--system` (cover and section 05) and nowhere inside `.intraday-ui`. A Phase 4 review can search the stylesheet for `--intraday-purple` used under `.intraday-ui`. The build does not need a new tool for that if the review is a test that reads the CSS file and fails on the combination. A simple test is appropriate and stays inside Vitest.

---

## 20. Typography integration

Nudica is loaded in `src/lib/fonts.ts` as `--font-brand` and applied on `body`. Do not add a font, a weight, or a `<link>`.

Map specification roles to existing classes only:

| Role | Class |
|---|---|
| Cover thesis | `type-display type-italic` |
| Section title | `type-heading` |
| Section message and planner sentences | `type-lede`, planner sentences also `type-italic` |
| Body | `type-corpo` |
| Product values and tables | `type-nota` |
| Labels, evidence, control names | `type-label` |
| Cover meta | `type-meta` |

Do not set `font-size` on a section class. If a size is missing, it is a specification problem, not a local override. None is missing.

The h1 is the project name (`type-heading`), not the thesis. The thesis is a `p`. That matches the specification's heading outline.

---

## 21. Responsive implementation

Composition queries for this page only, at `45rem`, matching `--container-max`:

| Region | At or above 45rem | Below 45rem |
|---|---|---|
| Plan | Text and chart side by side only if the chart keeps labels inside the wide container. Otherwise stacked. Default to stacked if there is any doubt. Readability wins. | Stacked. Chart min-height 180px. |
| Scenarios | Radios in a row if they fit at 44px. | Stacked, note, then chart. |
| Brief | List and target block side by side. | Target after the list, same component. |
| Stepper | Sentence beside the quarters. | Quarters as a vertical list. Steps that are not current stay one line. |
| Switch | Form beside the conflict. | Form, then conflict. Existing settings inside `details`. |
| Shell | Frame with a top bar. | No scaled frame. Order: state radios, surface radios, banner, body. |
| Comparison | Sentence, checkbox, chart, table. | Same. Chart may sit in `overflow-x: auto` with a visible name "Forecast chart". The table does not sit inside that scroller. |
| Issue and schedule | Stacked already on desktop. | Schedule is a list: period heading, then names. Not a grid. |
| Ending | `measure` class. | Same. |

Do not set `transform: scale` on `.intraday-ui`. Do not use a fixed height on the frame.

Touch targets: `min-height: 44px` and `min-width: 44px` on radios, checkboxes (the hit area, not the glyph alone), buttons, and the disclosure summary.

Typography uses the existing clamps. No mobile size table.

---

## 22. Accessibility implementation

Landmarks: the shell's `header`, `main`, and `footer`. The case study is an `article` inside `main`. Each section is a `section` with `aria-labelledby` pointing at its h2. The product frame is a `section` or `div` with `aria-label` from copy: "Reconstructed product". Prefer a visible heading inside the frame for the surface name, and use `aria-labelledby` that heading instead of a separate label, so the visible name and the accessible name match.

Heading order: one h1, twelve h2 elements, h3 only for the three tension questions and the two "Affected period" destinations. The tension questions are h3 inside section 06's h2.

Radiogroups are `fieldset` and `legend`, or `role="radiogroup"` with `aria-labelledby` only if fieldset cannot be styled. Prefer fieldset. Do not use `role="tablist"` for the surfaces. They are alternative views with independent state, and tabs would imply the state lives in the tab. Radios match the specification.

One live region in `Announcer`:

```html
<div aria-live="polite" aria-atomic="true" class="sr-only" />
```

`sr-only` already exists or must be a one-class equivalent in the case stylesheet if the site has none. Check before adding a duplicate. The header search during Phase 4 can confirm `.sr-only`. If it exists, use it.

Announce only:

- Scenario note, on change.
- Step sentence, on change.
- Shell status sentence, on product-state change.
- Filter sentence, on filter change.
- Surface name, on surface change.
- Comparison delta or "Previous forecast hidden", on toggle.

Do not announce on mount, on focus, on Back/Next when the step does not change, on Preview (it cannot activate), on the queue switch, or on the issue buttons.

The issue path moves focus to the destination heading. Those headings are in the tab order only via script (`tabIndex={-1}`), not as extra tab stops.

Charts: visible SVG `aria-hidden="true"`. A summary paragraph before the table. The table is a real `table` with `caption` and `th scope="col"`.

Disabled Preview: `disabled` so it is not a tab stop. The reason is visible and associated with `aria-describedby` for any user who reaches the surrounding text. Do not remove `disabled` in order to make it focusable. The visible reason is beside it for everyone.

Contrast pairs from the specification are the acceptance list. Small text on purple that fails 4.5:1 moves off the purple field onto the following surface. Do not solve contrast by lowering the type size.

Zoom: no `user-scalable=no`. The root viewport is the existing one. Layouts stack. The helper and the banner are normal wrapping text, not `white-space: nowrap` (the home CTA uses nowrap; do not copy that).

---

## 23. Focus management

| Event | Focus |
|---|---|
| Scenario, step, surface, shell state, filter, comparison, switch | Stays on the control that was used. |
| Open notification panel | Moves to the panel heading, `tabIndex={-1}`. |
| Close panel by button or Escape | Returns to the Notifications button. |
| Show on forecast / schedule | Moves to that destination heading. |
| Step Back/Next at the end, already disabled | Does not move. |
| Page load, scroll, theme toggle | Untouched by this page. |

Do not move focus when the banner text changes. The live region covers that. Moving focus would steal the visitor from the radio they just pressed.

The panel's close path stores the trigger id in a ref inside `ProductShell`, not in a global store.

`IssuePath` queries its own heading refs. It does not query headings in `ProductShell`. The two 10:00 bands are different instances.

---

## 24. Motion implementation

Allowed CSS transitions, 160ms, standard ease:

- Scenario actuals opacity.
- Step marker (a border or outline on the current quarter, not a travelling dot that carries the meaning).
- New line opacity at step 5.
- Banner text colour fade only if the text node swaps immediately. Do not cross-fade in a way that leaves both sentences invisible.
- Previous series opacity.

Surface swap: no transition.

Issue path: `element.scrollIntoView({ block: "nearest" })`. Reduced motion is already `scroll-behavior: auto` globally. Do not pass `behavior: "smooth"` unconditionally. Pass `"smooth"` only when `matchMedia("(prefers-reduced-motion: reduce)")` does not match, or omit smooth entirely. Omitting smooth is the safer implementation and still meets the specification. Prefer omit.

No motion on load. No animation of `.type-lede` or headings.

---

## 25. Chart implementation

Do not add a chart dependency. `package.json` has none, and the chart is one explanatory picture with at most three lines and a band.

`ForecastChart` renders an inline SVG:

- View box with padding for axis labels (real text elements, not a baked image).
- Y domain is the max of the visible values in that render, computed in `derive.domain(series)`. Not a hardcoded 100.
- X positions are index-based from `quarters`, so a missing row cannot be spaced by a hand-written coordinate.
- Solid stroke for previous and for current. Current uses a thicker stroke when both are visible, as the specification says for the exploration's step 5. The comparison view uses dotted previous (stroke-dasharray `2 4`) and solid current. Pass `previousStyle: "solid" | "dotted"`.
- Actuals: circle markers, not a second colour as the only difference.
- Band: a rect over 10:00 to 11:00 with a hatch `pattern` and a stroke `#6A4B12`, plus a `<text>` label. The hatch is part of the SVG, so it exists when colour is removed.
- No threshold line, no 10% annotation, no tooltip element.

The plan chart (section 02) can be this component on the server with hourly points produced by `derive.hourlySeries`. One component, two granularities, both from `dataset.ts`.

Pointer selection is optional props `onSelectQuarter`. The server plan chart does not pass it. The comparison island does. Hit targets on the wide chart can be transparent rects over each quarter. They are `aria-hidden` with the SVG.

If someone proposes a chart library during the build, reject it. Native SVG is enough and keeps the page free of a general-purpose visualisation kit.

---

## 26. Performance architecture

- No images for the story. SVG and text only.
- No `framer-motion` on this page.
- Dataset is a static module, imported, not fetched.
- Do not duplicate the quarter array inside content JSON.
- Editorial sections ship as server HTML.
- Client JavaScript is the islands plus the small announcer.
- Do not dynamically import the islands unless a measurement shows they block the cover. They are below the fold after section 02 and are not a reason to add a loading skeleton. A skeleton would imply a wait the page does not have.
- `ForecastChart` as a server-safe component means the plan chart adds no client weight.

---

## 27. Server and client boundaries

| UI | Rendering |
|---|---|
| Cover, plan chart, brief, tensions, validation, outcome, reflection, section list, evidence labels, reconstruction sentence | Server |
| Announcer | Client, wrapper only |
| Scenario, stepper, switch, shell, comparison, issue path | Client |

`getIntradayContent` runs on the server and passes serialisable copy props. Dates in the dataset are strings, so they cross the boundary if passed as props. Islands may import `dataset.ts` themselves. Prefer import, so a prop is not a second channel.

Do not put `"use client"` on `IntradayCaseStudy`. That would pull the whole narrative into the client bundle and throw away the point of the server sections.

`index.ts` stays `server-only` so client files cannot import copy and bypass the prop types. Client files import `dataset`, `derive`, and `state` only.

---

## 28. SEO and metadata

Follow section 18. No extra structured-data type. The site root does not define a case-study schema. Do not invent `Article` JSON-LD.

Title and description must pass the claims test. The description in section 18 is the one to use. Do not append "10%" to the title.

---

## 29. Internationalisation

`IntradayContent` is the type of `en.ts`. `getIntradayContent` accepts `Lang` but the record contains only `en` until a translation is approved. Calling it with `"pt"` is a type error, not a fallback to English. A fallback would hide the missing translation.

No component contains a user-facing literal except punctuation inside translated strings that live in `en.ts`.

Phase 4 does not create `pt.ts`. Portuguese, when it exists, is a translation of these strings under the site's copy rules (European Portuguese, the dictionary's orthography, no em dash), reviewed as copy, not generated in the build.

The shell's own strings stay in the dictionary. This page does not reimplement the language switch.

---

## 30. Dark theme behaviour

| Region | Light | `.dark` |
|---|---|---|
| Cover and section 05 | Purple field `#3C2A63`, text `#F6F1E6` | Same. Do not remap. |
| Section 06 | Lilac `#E6DDF5`, ink text | `#2C2836`, text `#F3EDE4` |
| Sections 10 to 12 | Cream `#F6F1E6`, ink | `#231E1A`, text `#F3EDE4` |
| Sections 02, 03, 04, 07, 08, 09 | `var(--surface)` and `var(--text)` | The site's dark surface and text |
| `.intraday-ui` | Light frame | Still the light frame. `color-scheme: light`. Local `--focus-ring: #1a1a1a`. |

Focus on the purple field: set `--focus-ring: #F6F1E6` on that field so the global dark-theme yellow ring is not used there.

Do not let `.dark .intraday-ui` exist as an override. A test can fail if that selector is added.

---

## 31. Content integrity safeguards

`claims.test.ts` walks every string in `en.ts`.

The build fails if any string contains, case-insensitive, a pattern on this list:

- accuracy improved
- recalculat
- continuous reforecast
- 24/7
- three companies validated
- we interviewed, planners interviewed, participant
- users preferred, customers understood, customers validated
- push notification
- email notification
- manual workflow
- predict
- was shipped, feature shipped, it shipped, we shipped, launched, adopted
- time saved, staffing errors, business performance
- threshold is, eight week, eight-week, percentile, multiplied by
- twice a day, one hour between
- detected handle time, detected absence, detected absenteeism
- Talkdesk, Cobalt, Avalon, apollo

Do not ban the bare word "shipped". The specification's line "Whether this control shipped is not known." must remain. A pattern that rejects that sentence would pressure the build to delete the caveat.

The allowed target sentence is the specification's paragraph beginning "Target, not a result." The test requires that paragraph to appear, and requires "10%" to appear in no other string. The volume note's "not a threshold" clause is also required by equality, so the about-30% figure cannot appear without it.

Also fail if:

- an em dash appears in `en.ts`
- `dataset.ts` contains `10%` or `accuracy`
- a series render path can show actuals when `scenario.showActuals` is false (unit test on `state.scenario`)
- `banner("watching")` is non-null
- `InsightsBody`'s module source imports `ForecastChart` (read the file as text in the test)

Reconstruction and Illustrative are copy keys. The composition must pass them to the first frame and to every numeric figure. A test can check the content object has non-empty `reconstruction.sentence` and `labels.illustrative`, and that `IntradayCaseStudy` source includes those keys. A source-text test is brittle but matches the current Vitest limits. Prefer asserting on the content object plus a single render-free check that the composition file references `labels.illustrative`.

Do not weaken a failing test by rewriting the claim. Change the copy back.

---

## 32. Testing strategy

Vitest, node environment, no new packages. All behavioural tests are pure functions in `state.ts` and `derive.ts`. React is not required to prove the design argument.

| Test | Assertion |
|---|---|
| Dataset invariants | Section 13. |
| `scenario("volume").showActuals` | true |
| `scenario("handle").showActuals` and capacity | false, and note ids differ from volume |
| Step 1, 2, 3 | `statusSentence` null |
| Step 4 | start sentence, `next` hidden |
| Step 5 | completed sentence, `next` visible, previous still visible |
| `banner("watching")` | null |
| `banner("inProgress")` | the documented start sentence |
| `banner("updated")` | the documented completed sentence |
| `series("inProgress")` | previous only |
| `series("updated")` | next visible, previous not in the shell series |
| Surface change helper | given a shell state, changing surface returns the same banner |
| Filter | Orders included when off, excluded when on, Support always present |
| Comparison off | previous series flag false |
| Comparison on | previous flag true, delta copy key set, no accuracy field |
| Issue destinations | both labels format to the same `10:00 to 11:00` from the dataset |
| Schedule presence | five present, Filipe absent, no "required" field |
| Switch | content has the helper and the not-shipped line; state module has no export that other islands import as `enabled` |
| Announcements | `state.announce` returns null when the next id equals the current id |
| Claims | Section 31 |
| Reduced motion content | no string tells the visitor to hover or to wait for an animation |

Not covered without a DOM, and not a reason to add one in Phase 4 unless a bug cannot be seen from the functions:

- Focus actually landed on the node.
- Escape closed the panel.

Those two are thin wrappers: `closePanel()` sets `open` false and returns `focus: "notifications"`. Test the return value. The JSX effect is a review item, not a new dependency.

Do not test "the button can be clicked" with a browser. The teaching claims are the table above.

---

## 33. Visual regression strategy

The repository has no screenshot harness. Do not add one for this page.

Phase 4 review is a written pass over these states, light and dark, and once below 45rem:

- Cover (thesis larger than the name, purple field)
- Plan (one line, no actuals)
- Volume scenario and handle-time scenario (no actuals on the second)
- Step 1 (no status sentence) and step 5 (new line, status sentence)
- Switch off and on (conflict visible in both)
- Shell watching (no banner) and in progress (banner, previous line)
- Shell updated
- Comparison off and on (dotted line and delta)
- Issue and schedule with the same period label
- Target block (the word Target, body-sized 10%, not a ring chart)
- Product frame still light in dark theme

Skip snapshotting every quarter-hour. The meaning is in the states above.

---

## 34. File and folder architecture

Future files. Not created in this phase.

```
src/app/[lang]/work/intraday-reforecasting/page.tsx
src/components/intraday/IntradayCaseStudy.tsx
src/components/intraday/intraday.css
src/components/intraday/EvidenceLabel.tsx
src/components/intraday/Announcer.tsx
src/components/intraday/ForecastChart.tsx
src/components/intraday/DataTable.tsx
src/components/intraday/ScheduleList.tsx
src/components/intraday/ScenarioSelector.tsx
src/components/intraday/ReforecastStepper.tsx
src/components/intraday/QueueSwitch.tsx
src/components/intraday/ProductShell.tsx
src/components/intraday/InsightsBody.tsx
src/components/intraday/ForecastCompare.tsx
src/components/intraday/IssuePath.tsx
src/content/intraday/types.ts
src/content/intraday/dataset.ts
src/content/intraday/derive.ts
src/content/intraday/state.ts
src/content/intraday/en.ts
src/content/intraday/index.ts
src/content/intraday/dataset.test.ts
src/content/intraday/state.test.ts
src/content/intraday/claims.test.ts
src/lib/i18n.ts                          path constant, when the route is added
src/data/projects.ts                     grid entry, same change as a working route
```

No `src/app/api` file. No `public/intraday` images. No `pt` page. No shared `src/components/ui` extraction.

`intraday.css` is imported from `IntradayCaseStudy.tsx`, not pasted into `globals.css`. The global file is already the site system plus one case study. A second case block there would make purple tokens easier to leak. A page-level import is the smallest split that respects the existing "no CSS modules" convention.

`i18n.ts` gains a path constant only in the route change. Do not add it in a drive-by edit before the page exists.

---

## 35. Implementation order

1. `types.ts`, `dataset.ts`, `derive.ts`, and `dataset.test.ts`. Stop if an invariant fails. Do not continue with a patched number.
2. `state.ts` and `state.test.ts`.
3. `en.ts`, `index.ts`, `claims.test.ts`. Transcribe copy. Do not edit it for tone.
4. `intraday.css` tokens and the server composition with all twelve sections in order, islands replaced by static placeholders that are the initial state's server HTML where possible (plan chart, brief, tensions, ending). Placeholders for islands must not be fake interactive controls. They can be empty until step 6, but the headings and copy are present.
5. `Announcer`, `EvidenceLabel`, `ForecastChart`, `DataTable`.
6. `ScenarioSelector`.
7. `ReforecastStepper`.
8. `QueueSwitch`.
9. `ProductShell` and `InsightsBody`.
10. `ForecastCompare`.
11. `IssuePath` and `ScheduleList`.
12. Focus return values wired to `focus()` and Escape.
13. The 45rem layouts.
14. The 160ms transitions, after the static states are correct.
15. Route, metadata, shell, grid entry, under the gates in section 18.
16. Claims test re-run on the final strings. Visual pass from section 33.

Do not start at the shell, the chart polish, or the route.

---

## 36. Risks and mitigations

| Risk | Impact | Prevention | Detection |
|---|---|---|---|
| Narrative rewritten during the build | The page stops matching the evidence. | Copy lives in `en.ts` and is transcribed. | Claims test. Diff `en.ts` against the specification in review. |
| Frame becomes a realistic product | Readers treat it as the original tool. | Neutral tokens, reconstruction sentence, no logo. | CSS test for purple inside `.intraday-ui`. Dark-theme pass. |
| Open questions filled in | False product behaviour. | No Preview panel, no insights chart, no severity, no cap. Types omit those fields. | Claims test and `InsightsBody` import test. |
| Two copies of the numbers | Chart and table diverge. | One `dataset.ts`. Tables map `quarters`. | Dataset tests. No numeric literals in components (review grep for `[0-9]{2}` in `src/components/intraday`). |
| One global reducer | Islands reset each other. | Ownership table. Announcer has no product state. | Code review. There is no `CaseStudyState` export. |
| 10% read as a result | The target becomes a success metric. | One sentence, equality-tested. Body class, not display. | Claims test. |
| 30% read as a threshold | The fiction becomes a rule. | The volume note includes the specification's "not a threshold" clause. No threshold prop. | Claims test. The note is a required string. |
| Switch read as shipped | Decision 1 overclaims. | The outside line is content, visible when on, and the conflict paragraph is in the section regardless of the switch. | Required strings in `en.ts`. |
| Handle time looks detected | The sensor is widened. | `showActuals` is false. No third chart mode. | State test. |
| Check shows a banner | The central distinction dies. | `banner` and step status are null for quiet states. | State tests. |
| Entire page marked client | Editorial HTML depends on JS. | `"use client"` only on the listed islands. | Review the composition file's first line. |
| Motion carries the meaning | Reduced motion removes the lesson. | Sentences are present immediately. | Copy does not say "watch". State is in the text. |
| Dark theme paints the frame | The reconstruction joins the site chrome. | Local colours and `color-scheme: light`. | Stylesheet must not contain `.dark .intraday-ui`. |
| Yellow focus on the light frame | Focus fails contrast. | Local `--focus-ring` on the frame and on the purple field. | Visual pass. |
| `framer-motion` press on the radios | Hover-only affordance and extra motion. | Do not import it. | Import grep. |
| Portuguese stub | Invented translation. | `getIntradayContent("pt")` does not exist. | Typecheck. |
| Grid link before the route | Dead project row. | Same change, after a 200. | Review. |
| Chart library added "for later" | Weight and a generic chart API. | Native SVG. This blueprint rejects the dependency. | `package.json` diff. |
| Focus jumps on banner change | The radios become unusable. | Focus rules in section 23. | `announce` does not return a focus target for banner changes. Test that. |

---

## 37. Phase 4 acceptance criteria

The build is acceptable when all of the following are true.

- The twelve sections appear in the specification's order, with the specification's headings and the transcribed copy.
- The three decisions are sections 07, 08, and 09, with the causal sentences from the specification.
- The five interactions and the queue switch behave as section 16, including initial states.
- No interaction reads another interaction's state.
- Every plotted number comes from `dataset.ts` or `derive.ts`.
- Quiet checks and `watching` render no banner node.
- Step 4 and `inProgress` show the start sentence and the previous series.
- `updated` shows the completed sentence and the new series.
- The switch section contains the requirements conflict and the not-shipped line.
- `.intraday-ui` has no purple background or purple action, and stays light under `.dark`.
- The reconstruction sentence is on the first frame. Later frames carry the Reconstruction label.
- Numeric figures carry Illustrative.
- The 10% sentence matches the specification and is not display type.
- Handle time and capacity do not show actuals.
- Preview is disabled. Insights has no chart. There is no second issue, no severity, no accept control, no push, no email.
- There is no forecasting function other than reading authored `next` values.
- Keyboard users can operate every control. Focus follows section 23.
- One polite live region announces only the events in section 22.
- With reduced motion, every state is still readable.
- Below 45rem, the five interactions are still present and the frame is not a scaled desktop.
- At 200% zoom, the switch helper and the banner wrap and remain reachable.
- No new dependency.
- `IntradayCaseStudy` is a server component.
- Vitest `dataset`, `state`, and `claims` tests pass.
- The open questions in the specification are still open in the UI.

---

## 38. Phase 3 completion assessment

**Ready for a build that follows this file.** An engineer can add the modules in section 34 in the order in section 35 without choosing product behaviour. A designer can review the build against the specification without new UX decisions. The states are pure functions. One dataset feeds every figure. The narrative stays on the server. The islands are local.

**Not ready, because these are still open and must stay open:** shipping, measured accuracy, threshold, caps, Preview's panel, Check insights beyond the surface, the schedule after the simulation, severity, detection of handle time and absence, Portuguese, and first-person voice.

**Gates before the route is public:**

- The specification is the one accepted for the build.
- `langHref` to the Portuguese home is accepted as the shell limit, or the page waits until a real Portuguese URL exists. Do not invent the third option of machine-translated copy.
- The `Project.href` type is checked before a grid row is added.

**Deliberately not decided here:** component micro-styling beyond the tokens, the exact SVG coordinates, and whether `scrollIntoView` is used at all (omitting smooth scroll is already allowed). Those are implementation mechanics. They are not permission to add a state, a series, or a claim.

### Readiness review

- The story does not have to be rediscovered. Section order, copy location, and dataset source are fixed.
- Undocumented UX choices are listed as forbidden states, not left to the component.
- Charts and tables share `quarters`.
- The page is static except for the islands and the announcer.
- Controls are native. Colour and motion are not the only encoding. The dotted line, the hatch, the labels, and the sentences remain.
- The live region list is finite.
- The frame is a separate object, forced light.
- The target sentence is equality-checked. The 30% clause is required copy. The switch's not-shipped line is required copy.
- Unsupported behaviour is hard to type (no threshold field, `series: null` for Orders, no `pt` fallback) and fails tests if it appears in strings.
- The design argument is what the Vitest tables assert: silence versus announcement, previous line versus new line, volume versus the other two situations, one period in two destinations.

No product question was closed in order to make those answers yes.
