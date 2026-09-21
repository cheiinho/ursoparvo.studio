# Intraday Reforecasting — Phase 1 audit

Strategic, narrative and experiential foundation for a portfolio case study.

Status: Phase 1 only. This document does not authorise implementation, final copy, components, or visual assets.

This pass replaces the earlier audit on this branch. `docs/intraday-reforecasting-case-study-spec.md` was written against that earlier audit. It is not an authority for the case study until it is revised against this document. Do not build from it as it stands.

---

## 1. Executive summary

Intraday Reforecasting was a product-design project, Q2 2023, for a workforce-management product used by resource planners in contact centres. The public case study keeps the company anonymous.

The job, in the requirements' own words, was: a resource planner wants to update the forecast when the day does not go as planned, so staffing decisions can be made on the current day. The same note says this is a mitigation strategy, not an everyday behaviour for every customer, and that someone still had to learn whether reforecasting should be automatic per queue or started on demand.

What the system does is narrower than "the forecast updates continuously." The requirements say the check runs at least every 30 minutes, on the same account-timezone day, and that a reforecast runs only when real values differ from the forecast by more than a threshold, over several periods, and not on low-volume queues. The presentation later describes that check as a comparison of the last four 15-minute intervals, with a reforecast allowed at most twice a day per queue and not again for at least an hour. Those caps are not in the requirements. The requirements do say a reforecast may run more than once in a day, and that it uses a different method from the ordinary forecast. A target in the requirements is to improve intraday accuracy by 10% over the original forecast. Nothing in the material shows that this target was measured or met.

The design work that is actually documented is not the algorithm. It is three decisions about a system that can change the forecast without the planner asking:

1. Put a single per-queue control, "Turn on reforecast," into the existing queue configuration, and leave the detection rules out of the form. This conflicts with the requirements' "no customer configuration at launch." Whether the control shipped is open.
2. When a reforecast starts or finishes, say so in the notification centre and with a banner on Forecast, Team schedule and Insights, because those are the places the new numbers appear and the planner may be in any of them.
3. After the numbers change, let the planner compare the previous forecast with the new one, read a log of forecasting issues, and jump to the affected period on the forecast and on the schedule.

The existing 20-page case study shows those decisions, then buries them under ChatGPT-generated canvases, generic benefit bullets, and screenshots of branded product chrome. The research section does not connect to a decision. The speech's "continuous 24/7 reforecasting" is the same speech that also states the caps. Treating the PDF as the structure of the new case study would repeat that failure.

The portfolio piece should make the system behaviour understandable, then show why those three decisions exist. Validation is honest and thin: high-fidelity prototypes were used because time was short; the designer has said the team worked directly with multiple customer companies for rapid feedback. No participant counts, quotes, task results or satisfaction scores exist in the material. The outcome that can be claimed is a design outcome: a planner can be told that the forecast changed, can see what it replaced, and can find the period that needs a staffing decision. It is not a claim that accuracy improved by 10%, that the feature shipped, or that planners were faster.

The Figma prototype was not opened in this environment. Statements about prototype behaviour come from the requirements, the speech, and screenshots inside the case-study PDF.

---

## 2. Project reconstruction

### What it was

A same-day mechanism that watches the gap between forecast and actuals and, when that gap is large enough for long enough, replaces the day's forecast with a new one. The new forecast is what Forecast, the schedule, Insights and reporting then show. The original forecast is kept as a baseline so accuracy can be compared later.

### Who it was for

The requirements name one role: the resource planner. The speech and the PDF scenarios speak in that role's voice (staffing for the rest of the day, service level, moving people between departments). No other role is documented as the primary user. Team leaders appear only inside a scenario, as people who pull agents into coaching. They are not established as users of this feature.

### The operational problem

A forecast made before the day is a plan for how many people are needed. During the day the plan and the floor diverge: volume rises, handle time rises, or the people who were scheduled are not there. The planner's staffing decisions are only as current as the forecast they are looking at. If the forecast stays on the morning numbers, the planner is deciding against a picture that is already wrong.

The requirements frame the feature as mitigation, not as a new way of forecasting every day. Not every customer wants the system to rewrite the plan automatically.

### What triggered the need

Unexpected change during the day, of the kinds named in the speech and on PDF page 4: coaching pulling people off the phones, a lunchtime volume peak, a large absence at the start of a shift, more agents than the plan assumed, a need to train or to move people without breaking service level. The speech groups the measurable factors as additional volume, reduced capacity, and higher average handle time.

### What changed during the day

Documented as things that happen to the operation, not as a measured dataset:

- Contact volume can run ahead of the forecast (the only signal the issues log in the PDF actually describes: "CVO is N% higher than forecasted").
- Average handle time can rise. Planners ask what that does to the rest of the day. It is not shown as the field the anomaly detector reads.
- Capacity can fall (absence, coaching) or rise (more hires than expected). Again, this is a planner problem in the material. It is not shown as an input to detection.

### How the layers relate

| Layer | What it is, from the material |
|---|---|
| Forecast | The plan for the rest of today. After a reforecast, the reforecast is the forecast (requirement 7). |
| Actual values | "Real" values compared with the forecast. In the issues UI, the concrete example is contact volume (CVO). |
| Deviation | The difference between real and forecast. It must persist over several periods before it counts (requirement 3.3; example given: four 15-minute periods). |
| Threshold | The size of difference that is large enough to run. Not defined in the requirements ("to be defined as part of the epic"). Later sources disagree on the method. See §8 and §32. |
| Anomaly | The word the interface uses once that condition is met ("Anomaly detected"). The requirements never use the word. Severity labels Critical / Major / Minor appear in the issues table. No formula is given. |
| Reforecast | A separate forecasting method, not the ordinary algorithm, run only when the conditions hold. It can run more than once in a day (requirement 10). |
| New forecast | The reforecast, shown on Forecast, schedule (scheduler work marked TBD), Insights, and sent to reporting. |
| Baseline | A database property so the system can still say which numbers came from the original forecast. Used to measure accuracy. This is why a comparison view is possible at all. |
| Staffing decision | What the planner is trying to make. The documented UI takes them as far as the affected queue and the affected period on the forecast and the schedule. It does not show the planner moving agents. Requirement 9 says a reforecast triggers a scheduling simulation. Performance of that simulation is out of scope. What the planner saw afterwards is not in the case study. |

### What the system had to monitor

On a cadence of at least every 30 minutes: real versus forecast, on the same account day, ignoring ultra-low and low-volume queues, and only treating a deviation as actionable when it holds over several periods and clears a minimum volume. The presentation adds: look at the last four quarter-hours.

### What the system had to decide

Whether the deviation is large enough to spend a reforecast. Then: produce a new forecast for the rest of the day by a different method, store the baseline, and trigger a scheduling simulation. The designer did not design that method. The speech describes the rest-of-day forecast being multiplied by a factor derived from the gap. The requirements only say "a different method" and a 10% accuracy target. The factor is not a fact of the requirements.

### What the user had to understand

That the numbers on screen may have changed without them asking; which queues are affected; whether the run is still in progress or finished; how different the new forecast is from the one it replaced; which period was anomalous; and that the next look is the schedule for that period.

### What the user had to configure

Open, and the sources disagree.

- Requirements: the customer has no configuration. A flag turns the feature on for selected customers. Later, customers would be able to turn it on themselves. The note asks for research on per-queue automation versus running it when someone chooses.
- Speech and PDF: the design adds one control to the existing queue screen, "Turn on reforecast," with the helper "If enabled, the system will reforecast this queue." The speech calls this a deliberate decision not to expose the reforecast settings.

Do not write that the switch was "the entire configuration of the shipped product." Write that the presented design reduced customer setup to one queue-level switch, against a requirement that deferred customer setup.

### What the user had to do after the forecast changed

Documented actions, in interface order:

- Read the notification or the banner.
- Preview affected queues (the control exists; what Preview shows is not specified).
- Apply a filter to affected queues.
- On Insights, "Check insights" is offered. What it loads beyond the Insights surface is open.
- After completion, open "N issues found."
- Show or hide the previous forecast.
- "Check forecast" from an issue.
- See the anomalous period marked on the forecast and on the team schedule.

The staffing action itself (move, hold, train, coach) stays with the planner. The case study must not invent a completed staffing workflow.

### Constraints

- Same calendar day, in the account time zone. Not a multi-day replan.
- Conditional execution, not "every 30 minutes, rewrite the forecast."
- Low-volume queues excluded. Mixed low and normal intervals called out as an unsolved rule in the requirements.
- Minimum call volume inside the threshold, also undefined.
- A different algorithm from the normal forecast.
- No customer configuration at launch, in the requirements. A flag for selected customers.
- Scheduling simulation is triggered and is out of scope for performance.
- Time pressure, from the speech and from the designer: feedback had to be fast, so the work went to high-fidelity prototypes early.
- Public portfolio: company, customers, logos, and proprietary chrome cannot be shown.

### What was technically difficult

From the requirements, not from guesswork: defining the threshold; deciding how many periods count; excluding low volume; handling a mix of quiet and busy intervals; using a different forecasting method; keeping a baseline; running a scheduling simulation when the forecast changes; allowing more than one run per day without thrashing. The presentation adds a nightly threshold from eight weeks of history, a two-run cap, and a one-hour gap. Those three are not confirmed by the requirements.

### What was difficult in the UX

The system can change a plan the planner is already using, while they are looking at a different page. The rules that justify the change are too many to put in a form. The planner still has to trust the new numbers enough to staff from them, which means seeing what changed and where, without being asked to operate the model.

### What was organisationally difficult

The requirements leave the threshold, the period count, the minimum calls, and the mixed-interval rule to the epic. They also leave the scheduler's behaviour TBD and name a later phase for customer self-serve. The speech says developers could start in parallel because the prototype was high fidelity, and that feedback had to happen before development. The designer has said the timeline was short and that feedback came from working directly with customer companies. How those companies were engaged is not documented.

### What design was actually responsible for

The documented design responsibility is the planner-facing behaviour around a model someone else owned:

- Whether, and how simply, a customer turns the behaviour on for a queue.
- How an in-progress and a completed reforecast are announced wherever the numbers live.
- How the planner inspects the replacement forecast and reaches the period that matters.

Design was not responsible, on this evidence, for the forecasting algorithm, the threshold mathematics, or the scheduling-simulation engine.

### Questions that stay open

Production status. Whether the switch or only the internal flag shipped. Whether accuracy was measured. Which of the presentation's parameters were final. Whether handle time or absence can trigger a run, or only contact volume. What Preview and Check insights do. What the schedule showed after the simulation. Whether a manual "run now" was ever designed. See §38.

---

## 3. Source hierarchy

### Levels used in this audit

| Level | What it covers | How it may be used |
|---|---|---|
| 1. Original project evidence | Requirements PDF (2 pages). Presentation speech (21 slides). Existing case-study PDF (20 image pages). Figma prototype (not opened). | Historical project facts. They are not equal to each other. See below. |
| 2. Designer-provided context | The designer has said the team worked directly with multiple customer companies to get feedback quickly, because the timeline was limited. A prior note from the designer specified three companies. No names, session counts, or quotes were given. The portfolio must stay anonymous. Purple, lilac and cream may remain as the case study's own palette. The reconstructed product UI must be neutral. | Context for validation and for visual constraints. Not formal research evidence. |
| 3. Portfolio code | Routing, content loading, type, colour, layout, motion, copy tests, the fact that no Intraday page exists. | Technical integration only. Not evidence about the project. Not a narrative or visual template. |
| 4. Inference | Relationships and narrative choices argued in this document. | Must stay labelled as inference. Never rewritten as something that happened. |

### Inside Level 1, authority is split

The brief groups requirements, speech, PDF and Figma as one level. They still disagree, so this audit ranks them by question type:

- For what the product was required to do: the requirements are the authority. The speech and the PDF do not override an acceptance criterion.
- For what the design presented to people: the speech and the PDF screenshots are the authority. They can show a decision that the requirements had deferred.
- For what was measured or shipped: none of the Level 1 sources say. Absence is not success.
- For pixel-level prototype behaviour: the Figma file would be the authority. It was not inspected. PDF screenshots are a record of a prototype, read through a slide, and they contradict each other on dates and on some banner lines.

The case-study PDF is evidence of a previous presentation. It is not the information architecture of the next one.

### Files

- Requirements: `Intraday_reforecasting_models_e451.pdf` (text extracted).
- Speech: `intraday_reforecasting_speech_fcc3.docx` (text extracted).
- Case study: `Intraday-Reforecasting-under-4MB-final_8080.pdf` (20 pages, image-only; read from rendered pages and crops).
- Figma: `https://www.figma.com/proto/V237VWTnQ1TRkcJZ69vB2k?node-id=0:1`. Not fetched. No claim in this audit depends on having opened it.

### How disagreements were handled

They are listed in §32. They are not averaged into a single "the product worked like this."

---

## 4. Evidence taxonomy

Every important statement in the eventual case study belongs to one of these. The words in parentheses are the public label when a label is useful. Not every sentence needs a chip. A section that would be misunderstood without one does.

| Category | Meaning | Public label |
|---|---|---|
| FACT | Stated in requirements, speech, or the case-study PDF as something that existed or was shown. | Leave unlabelled, or "Documented" only if a neighbour is weaker. |
| RESEARCH | Would require documented research. Almost nothing in this project qualifies. Do not use this label for the ChatGPT canvases or for the designer's account of customer conversations. | Research |
| REQUIREMENT | An acceptance criterion or an explicit product rule. | Requirement |
| DESIGN DECISION | A choice the design presentation argues: the switch, the banner placement, the comparison, the issue path. | Design decision |
| DESIGNER-PROVIDED CONTEXT | Stated by the designer, not written up as research. | Context |
| INFERENCE | A reading that follows from the evidence but is not stated as a finding. | Inference |
| RECONSTRUCTION | UI rebuilt because the original chrome and data cannot be shown. | Reconstruction |
| EXPLORATION | An interaction built for the portfolio to teach the system, not a feature of the product. | Exploration |
| FICTIONAL / ILLUSTRATIVE | Numbers, names, dates and queues invented so a demonstration is coherent. | Illustrative |

Rules that follow:

- A target is a REQUIREMENT. It is not an outcome.
- A screenshot in the PDF is evidence that a prototype showed that screen. A rebuilt screen is a RECONSTRUCTION.
- Scenario sentences on PDF page 4 are documented in the presentation. The speech says they came from interviews. The method, the people and the notes are not in the file. Classify the sentences as FACT of the presentation, and the interview claim as a claim to audit (§31), not as RESEARCH.
- The detection simulation, the scenario selector and the surface switcher are EXPLORATION. They teach documented behaviour. They are not evidence that a user performed those steps.
- Inference never becomes a quote, a metric, or a "we found."

---

## 5. Problem model

"Planners needed a better forecast" is true and useless. The difficulty is what happens after the system is allowed to change the forecast on its own.

Five facts force the design:

1. The forecast is not a chart. It is the input to staffing. Requirement 7 puts the new numbers on the forecast, the schedule and Insights because those are where decisions are made. Requirement 9 then kicks a scheduling simulation.
2. The day moves. The scenarios are all versions of "the next few hours are no longer the morning plan."
3. Rewriting the forecast on a timer would be noise. The requirements and the speech both say the system should run only when the gap is real. The speech adds a hard cap. The requirements' note says some customers do not want this every day.
4. The rules are too specific to be a settings page: period count, minimum volume, low-volume exclusion, mixed intervals, a nightly threshold, a different algorithm. The design that was presented refuses to turn those into controls.
5. Because the run is not requested by the person looking at the screen, that person can be anywhere the numbers appear. A change with no announcement looks like the tool is wrong.

The tension, stated as a design problem:

The system may replace the plan the planner is using. The planner did not ask for that replacement. They still have to staff the rest of the day from it. So the interface has to make the replacement visible in the place they already are, comparable with what it replaced, and specific about where on the day to look. It should not ask them to configure the model.

That is why the feature was hard to design. The model can be correct and the experience can still fail, if the planner either misses the change, cannot tell how large it is, or cannot find the hour that now needs people.

What should stay automatic, on the evidence: detection, the threshold, the method, the baseline, the simulation trigger.

What should stay human: whether this queue is allowed to do it at all (in the presented design), and every staffing move after the period is identified.

What must not be asked of the customer, in the presented design: the parameters of detection.

What the requirements still wanted researched, and what this case study must not pretend was settled: automatic per queue, versus the planner choosing when to run.

---

## 6. User and operational scenarios

### What is actually in the material

Speech slide 4 says the scenarios were documented with resource planners and calls them interviews. PDF page 4 shows the same five situations. No interview guide, no count, no recording, no quote attribution beyond the sentences themselves. Treat the sentences as documented scenario copy. Treat "interview" as an unsupported method label until notes exist (§31).

| # | Documented situation | Operational change | What a planner needs |
|---|---|---|---|
| 1 | Team leaders pull agents into coaching. | Capacity down for part of the day. | Effect on staffing for the rest of the day. |
| 2 | Agents asked not to leave during lunch. Volume is high at lunch and drops after about four hours. | Temporary capacity hold against a peak, then a drop. | Presence during the peak, not a flat all-day story. |
| 3 | About 100 hours lost to absence. First shift calls in sick. It is 9:00. | A known capacity hole from a known time. | The rest of the day with those hours gone, immediately. |
| 4 | More agents were hired than the plan assumed. | Capacity up. | Where training can run without missing service level. |
| 5 | Move agents to other departments. | Capacity moves between queues. | Whether service level still holds. |

Speech slide 5 then names three factors, each with a planner question:

- Additional volume. A 30% rise is the example used. What does staffing look like at 21:00, and what can be done.
- Capacity decrease. Fewer people, absence or similar.
- Average handle time. A 30% rise is the example. What that does later in the day.

The 30% figures are examples inside the speech, not measured deviations and not the product threshold.

### The chain, and where it breaks

```
SCENARIO
→ OPERATIONAL CHANGE
→ DATA SIGNAL THE SYSTEM IS DOCUMENTED TO READ
→ SYSTEM RESPONSE
→ FORECAST CONSEQUENCE
→ PLANNER CONSEQUENCE
→ USER ACTION THE UI ACTUALLY OFFERS
```

Applied honestly:

- Volume spike. Operational change is more contacts than forecast. The issues log shows this signal (CVO versus forecast, over consecutive periods). If the gap holds over the required periods and clears the threshold, a reforecast can run. The new forecast replaces the day's forecast. The planner looks at magnitude (previous versus new) and at the period, then decides staffing. The UI offers filter, comparison, issue, highlighted period. It does not offer the staffing move.
- Handle-time increase. Operational change is documented. The data signal is not. No issue row, requirement line, or speech sentence says the detector watches handle time. The forecast, once updated, would need to reflect longer handling, but that is an inference about the model, not a documented trigger. Mark the trigger OPEN. The planner consequence (more people, or longer waits) can be explained as inference.
- Capacity loss or gain (absence, coaching, extra hires, moves). Operational change is documented, including the most concrete scenario in the set (100 hours, 9:00, first shift). The detector, as written, compares real and forecast, and the only worked example is contact volume. Absence is something the planner already knows. It is not shown as an anomaly the system discovers. Do not build a scenario interaction that says "the system detected absenteeism." The honest version is: this is a change the planner must reason about; the documented detector is about volume versus forecast; whether capacity was an input is open.

### The common problem

The five scenarios are not five features. They are one situation: the plan for the rest of the day is no longer a safe staffing input, and the reason differs. Some reasons show up as contact volume the system can watch. Some are capacity facts the planner already has. The product, as documented, automates the first kind and leaves the planner responsible for the decision in both.

That split is the content of the scenario interaction. Collapsing them into "the system handles all of these" would invent a detector the sources do not describe.

### What to keep in the case study

Keep three, because they teach the split without a catalogue:

- Volume (documented signal).
- Handle time (documented planner question, trigger open).
- Capacity / absence (documented planner emergency, not a documented detection signal).

Coaching, extra hires, training and cross-department moves are the same capacity question in different clothes. Mention them as a single line under capacity. Do not give each a card.

---

## 7. System logic

### Corrected chain

The chain in the brief is right as a skeleton and wrong if read as "every real-world change becomes an anomaly." Corrected:

```
REAL-WORLD CHANGE
→ ACTUALS MOVE, OR THE PLANNER ALREADY KNOWS CAPACITY MOVED
→ ONLY SOME OF THAT IS A FORECAST-VERSUS-ACTUAL SERIES THE SYSTEM WATCHES
→ PERIODIC CHECK (not a reforecast)
→ DEVIATION OVER SEVERAL PERIODS, ABOVE A THRESHOLD, QUEUE NOT LOW-VOLUME
→ ANOMALY (the word the UI uses)
→ REFORECAST, SUBJECT TO CONSTRAINTS
→ NEW FORECAST REPLACES THE DAY'S FORECAST; BASELINE KEPT
→ ANNOUNCED WHERE THE NUMBERS ARE
→ PLANNER COMPARES, OPENS THE ISSUE, FINDS THE PERIOD
→ PLANNER MAKES THE STAFFING DECISION (outside the documented UI)
```

### System state versus what the planner sees

| System state | What the planner can see, if the presented design is in front of them |
|---|---|
| Feature off for this customer or this queue | Nothing. Requirements: flag, and no customer configuration. Presented design: the queue switch is off. |
| Watching, difference inside the rules | Nothing. Monitoring is silent. This must stay silent in the case study too. |
| Conditions met, run started | Notification and banner: anomaly detected, reforecast in progress, affected queues. Actions: Preview, Apply filter, and on Insights a Check insights action. |
| Run finished | Notification: reforecast completed, check the updated data to deal with possible issues. Banner moves to an updated state. Header can show a count of issues. |
| Baseline stored, new numbers live | Forecast, schedule, Insights and reporting show the new forecast. Previous forecast is available as a comparison, not as the working numbers. |
| Issues recorded | A log: when it started, when it ended, queue, severity, a description of the volume gap, and a way to the forecast. |
| Simulation triggered | Not shown. Requirement only. |

### What "the reforecast is the new forecast" commits the design to

Requirement 7 is the reason Decision 2 and Decision 3 exist. If the reforecast is what those three pages display, then a planner on any of them is looking at numbers that can change underneath them, and the previous numbers still matter because the baseline exists specifically so accuracy can be measured (requirement 8). The comparison control is the planner-facing consequence of keeping that baseline. That link is inference supported by the two requirements plus the control in the prototype. Label it as inference. Do not claim a designer said "we built the toggle because of the database property" unless a source says so.

---

## 8. Time and monitoring logic

This section is the one the speech gets wrong in its own opening, and the one the case study has to get right.

### What is specified

| Question | Requirements | Speech and PDF flow (page 9) | Status |
|---|---|---|---|
| How often does it look? | "At least runs every 30m." The verb is "runs," which is ambiguous. | Every 30 minutes it checks the last four 15-minute intervals (one hour) against actuals. | The presentation resolves "runs" as a check. Do not upgrade it to "the forecast is recalculated every 30 minutes." |
| Same day? | Yes. The day is the account time zone. | The flow is described as running through the day. The speech also says "24 hours a day" and "24/7." | Same-day rule is a requirement. "24/7" in the speech fights the same-day rule and the caps in the same speech. Do not use "24/7" or "continuous reforecasting." |
| What is compared? | Real versus forecast. | Forecast versus actuals, example "calls actually received." | Volume is the worked example. Other metrics: open. |
| How long must it last? | Several periods. Example: four 15-minute periods. Exact number left to the epic. | The check window is those four intervals. The issues table also shows events of six consecutive periods. | A six-period event can be longer than the four-period check. That is not a contradiction. The minimum count was never closed. |
| Threshold | To be defined in the epic. Must respect a minimum number of calls, also undefined. | Nightly. PDF: percentile differences over the past eight weeks. Speech: average error over the past eight weeks. | Method is OPEN. Eight weeks and "nightly" are presentation-only. Do not publish a formula. |
| Low volume | Ultra-low and low-volume queues do not reforecast. Mixed low and normal intervals are an open rule. | Not shown in the case study. | The case study should say the exclusion exists. It should not invent the cutoff. |
| When a reforecast starts | Only if the difference is over the threshold, with the period and volume conditions. | If the difference is over the calculated threshold. | Conditional trigger is solid. The calculation is not. |
| How the new numbers are made | A different method from the normal forecast. Target: 10% more accurate than the original on the intraday problem. | Multiplies the rest of the day by a factor taken from the gap. | The factor is speech/PDF, not a requirement. Do not state it as the algorithm. The 10% is a target. |
| How often it may run | More than once a day. | At most twice a day per queue, and at least one hour between runs. | Cap and gap are not requirements. Keep them out of any sentence that sounds like a specification, or show them only as parameters the presentation described and that are unconfirmed. |
| During the run | Not described. | UI: "in progress," banner stays up. | No duration, no locking behaviour, no statement that editing is blocked. Do not invent a progress percentage. The PDF's hourglass is a slide illustration. |
| After completion | New forecast is the forecast. Baseline kept. Simulation triggered. Latest run times are a "could," attributed to a later internal phase, not a must. | UI: completed notification, issue count, comparison, highlighted period. | "Could" items (show the last baseline run time and the last intraday run time) are not part of the core story unless the prototype clearly shows them. Page 16's forecast header does show an "updated" time. Treat displayed run time as something the prototype included, not as proof the "could" was accepted. |

### Sentence the case study is allowed to say

The system checks during the day, on the order of every 30 minutes, whether recent actuals have pulled away from the forecast. A reforecast is a separate event. It runs only when that gap is large enough, and it may run more than once. It does not run every time the system looks.

### Sentences it is not allowed to say

"The forecast recalculates every 30 minutes." "Reforecasting runs 24/7." "The threshold is the 8-week percentile" or "the 8-week average error." "The rest of the day is multiplied by a factor." "It runs at most twice" as if that were the requirement. Any of the last three may appear only inside a clearly marked "as described in the presentation, unconfirmed" note, and only if a reviewer decides the parameter is safe to publish. Default: omit them from the public page.

---

## 9. Research audit

### What the requirements asked for

The note says customer research is needed to choose between per-queue automation and on-demand runs. That sentence is a REQUIREMENT for research. It is not evidence the research happened.

### What the speech claims

- Resource planners were interviewed and the five scenarios came from that.
- High-fidelity prototypes were used from the start to get feedback quickly and to let development run in parallel.
- The closing slide says automated and manual workflows were both designed, for different customer needs.

No instrument, sample, date, consent, quote, or finding is attached to any of these sentences.

### What the designer has added

The team worked directly with multiple customer companies because the timeline was short. A prior note said three companies. Format, timing, and whether those conversations are the "interviews" in the speech are OPEN. This is DESIGNER-PROVIDED CONTEXT.

### What is not research

PDF pages 6, 7 and 8. Each canvas is labelled as generated with ChatGPT and carries a disclaimer. The empathy map's "say" quadrant is empty. They contain no participant evidence. They did not, on the page, change a decision that the rest of the deck can point to. See §10.

### Findings that can be stated

None as research findings.

What can be stated as project facts that shaped the design:

- The requirements already suspected that full automation would be wrong for some customers.
- The presented design chose a queue switch rather than a parameter form, and rather than a "run now" control. A manual workflow is asserted in the closing slide and is not in the screens.
- Feedback was sought through a high-fidelity prototype under time pressure. What changed after feedback is not recorded.

### Observed behaviours, pain points, needs

The scenario sentences are the only user-language in the file. They are needs: rest-of-day effect, a peak that is not the whole day, an immediate read after a large absence, room to train, room to move people. They are not findings from a written study.

### Design implications that are legitimate

- Do not present one generic "volume went up" story. The material distinguishes volume, handle time and capacity, and only volume is tied to the detector.
- Do not present a settings model of the threshold. Both the requirements (undefined, internal) and the speech (hidden on purpose) point away from that.
- Do not present a tested manual trigger. It is an open question the requirements named and the closing slide claims without a screen.

---

## 10. Research artefact audit

| Artefact | Why it is in the PDF | Question it answers | Evidence that produced it | Decision it influenced | What changed because of it | Verdict |
|---|---|---|---|---|---|---|
| Kano canvas, page 6 | Looks like a research step between the problem and the flow. | None that the page states. No feature is classified in a way the later UI depends on. | Caption: ChatGPT, with a disclaimer. | None visible. | None visible. | Remove. Process decoration. |
| Value proposition canvas, page 7 | Same. | None stated. | Caption: ChatGPT, with a disclaimer. | None visible. The pains on the canvas are not traced to a scenario or a screen. | None visible. | Remove. |
| Empathy map, page 8 | Same. | "What do they say?" is the question an empathy map is for. The quadrant is empty. | Caption: ChatGPT, with a disclaimer. Empty quadrant. | None visible. | None visible. | Remove. An empty "say" quadrant is the tell. |
| Five scenario cards, page 4 | To ground the problem in planner situations. | What kinds of day make a morning forecast unsafe? | Speech says interviews. The sentences exist. The method does not. | They justify caring about volume, time-of-day shape, and capacity. They do not, by themselves, justify the switch or the banner. | The factor list on the same spread. | Keep the content. Relabel. Do not call the cards a research study. |
| Flow diagram, page 9 | To explain the mechanism before the UI. | When does a check become a reforecast? | Presentation of the model. Not user research. | The decision to hide that mechanism from the queue form. | The simplicity of page 10. | Keep as system explanation. It is not a research artefact. |
| "Don't rush" configuration spread, page 10 | To argue for one control. | How much setup does the customer need? | A design argument in the speech. The requirements had asked for research and had forbidden customer configuration at launch. | The switch. | The queue form gains one checkbox. | Keep. It is a design decision, not research. |
| High-fidelity rationale, page 11 | To justify prototype fidelity. | How could feedback happen before build, under time pressure? | The designer's process claim. | Fidelity, not a screen behaviour. | Parallel work is claimed. No revision log. | Move into validation. Do not leave it as a caption under a screenshot. |

The chain the visitor should get is evidence, then insight, then design question, then decision, then what the product did. Pages 6 to 8 break that chain. They are a sequence of frameworks with no insight attached. The case study must not read as Kano, then canvas, then empathy map, then UI.

---

## 11. Design tensions

Only tensions the sources support. Each one ends in a decision that is documented, not in a slogan.

### 1. Automation versus control

Evidence. The requirements note: not every customer wants this every day; research should choose between automating per queue and letting someone choose when to run. Requirements 5 and 6: no customer configuration at launch; a flag for selected customers; self-serve later. Speech and PDF: one switch per queue, and a closing claim that manual and automatic workflows were both designed.

Why it mattered. A reforecast rewrites the plan. Some customers will want that only as an exception. A control that is missing forces the behaviour on them. A control that exposes the model forces them to become operators of a threshold they were never meant to set.

Design question. What, if anything, does the customer decide, and at what level?

Decision that was presented. On or off, per queue, in the existing queue configuration. No threshold, no schedule, no "run now" on the screen that was shown.

Product behaviour. "Turn on reforecast." Helper: if enabled, the system will reforecast this queue. Everything else stays in the system.

Trade-off to say out loud. The requirements did not ask for this control in the first release. The design may be the later self-serve, pulled forward. Shipping status is unknown. The manual workflow in the closing slide has no screen.

### 2. A silent monitor versus a plan that changes underneath someone

Evidence. Checks are periodic and conditional. Requirement 7 places the new forecast on three surfaces. Speech slides 11 to 14: the planner may be in the schedule or in Insights, not on the forecast; a notification alone can be missed; a banner explains why numbers moved.

Why it mattered. Monitoring should not nag. A completed replacement that is invisible looks like a bug.

Design question. How does a background decision become visible in the place the planner is already working, without turning every check into an alert?

Decision. No UI for the healthy check. A notification plus a banner only when a reforecast is in progress, and again when it has finished. The banner is on Forecast, Team schedule and Insights. It can filter to affected queues.

Product behaviour. Two moments, not a live ticker. "Anomaly detected. Reforecast in progress in the affected queues." Then "Reforecast completed. Check updated data to solve possible issues."

### 3. A new number versus an explanation of the change

Evidence. Requirement 7: the reforecast replaces the forecast. Requirement 8: the baseline is kept to measure accuracy. Speech slides 18 to 20 and PDF pages 17 to 19: previous forecast as a dotted series, an issues log, a mark on the period in the forecast and in the schedule.

Why it mattered. Replacement without a comparison hides the size of the change. A comparison without a location does not tell the planner where to act. A location without a queue does not tell them which plan.

Design question. If the system changes the forecast, what must the planner be able to see, and where does that looking end?

Decision. Three linked views: previous against new, a list of issues with severity and a volume description, and the same period highlighted on the forecast and the schedule.

Product behaviour. "Show previous forecast." "N issues found." Description pattern: contact volume is N% higher than forecast for N consecutive periods. "Check forecast." A marked period. The schedule shows that period, not a different one. (The PDF's own screens do not always use the same hours. The reconstruction must.)

### Tensions considered and not used as structure

- Configuration versus cognitive load is the same tension as automation versus control, seen from the form. Do not give it a second chapter.
- Global state versus local context is how tension 2 shows up in the information architecture (one run, three pages). Teach it inside Decision 2. Do not make it a fourth decision.
- "System intelligence versus trust" is the vague name for tension 3. Use the concrete version.

---

## 12. Design decision audit

| # | Decision as presented | Evidence | Class | Strength | Keep in the narrative? |
|---|---|---|---|---|---|
| D1 | One new control on the existing queue form: "Turn on reforecast." | PDF p.10, speech slide 10 | Design decision. Conflicts with requirement 5. | High. It is the configuration story. | Yes. Decision 1. |
| D2 | Do not expose threshold, caps, window, or method in that form. | Speech slide 10; the form itself. | Design decision. | High, but it is the other half of D1. | Fold into Decision 1. |
| D3 | Start with a notification the planner can open from anywhere. | PDF p.11, speech slides 11–12 | Design decision. Not in the requirements. | High. | Part of Decision 2. |
| D4 | Repeat the status as a banner on Forecast, Team schedule and Insights. | PDF pp.12–15, speech slides 13–14, requirement 7 for why those pages | Design decision plus requirement. | High. | Part of Decision 2. |
| D5 | Banner actions: Apply filter, Preview, and Check insights on the Insights banner. | PDF and speech. | Design decision. Preview's result is unspecified. | Medium. The actions matter; Preview is a hole. | Show the actions. Do not invent Preview's panel. |
| D6 | Separate copy for in progress and for completed. Completed copy asks the planner to check issues, not just to notice that the run ended. | Speech slides 15–17, PDF p.15 | Design decision. | High. | Part of Decision 2. |
| D7 | A count of issues in the forecast header. | PDF pp.14–18 | Design decision. | Medium. It is the hinge into the log. | Part of Decision 3. |
| D8 | "Show previous forecast" overlays a dotted previous series. | PDF pp.16–17, speech slides 18–19 | Design decision. Supported by the existence of a baseline (requirement 8) only as inference. | High. | Decision 3. |
| D9 | An issues log: trigger, end, queue, severity, description, Check forecast. | PDF p.18 | Design decision. Severity rule unknown. | High. | Decision 3. |
| D10 | Mark the anomalous period on the forecast and on the team schedule. | PDF p.19, speech slide 20 | Design decision. | High. This is the link to staffing. | Decision 3. |
| D11 | Use a high-fidelity prototype early. | PDF p.11, speech slides 2 and 21 | Process decision. | Medium for the portfolio. It explains the validation method. It is not a product behaviour. | Validation section only. |
| D12 | "Push notifications" as well as banners. | Speech slide 21 only. | Unsupported. The screens show an in-app notification centre. | Do not keep. | Exclude. |
| D13 | Both automated and manual workflows. | Speech slide 21. Requirements only pose the question. No manual control in the screens. | Unsupported as a designed workflow. | Do not keep as a decision. | Open question. |
| D14 | Historical view "lets users predict future anomalies" and "spot patterns such as Monday surges." | Speech slides 18–19, PDF p.17 bullets. | Inference presented as a benefit. No observation supports it. | Weak. | Cut the benefit bullets. Keep the comparison. |
| D15 | Severity as Critical, Major, Minor. | The table shows the labels. | The labels are factual UI. Any ranking rule would be an invention. | Use the labels inside illustrative data. Do not explain a formula. | Inside Decision 3, labelled. |

---

## 13. Three strongest design decisions

These three are strong because each changes what the planner can do, each is visible in the prototype, and each answers a different part of the problem model. The others fold into them or fail the evidence test.

### Decision 1. One switch, on the queue, and nothing else

The problem. The behaviour is dangerous if it is universal, and the rules are too technical to be a form.

The evidence. Requirements note, requirements 5 and 6, speech slide 10, PDF page 10.

The design question. What is the customer allowed to decide?

The decision. Whether this queue reforecasts. Not how.

The trade-off. Simpler setup, less control than the requirements' own research question suggested. A customer who wanted to run it once, today, for one bad morning, is not given that. A customer who wanted to tune the threshold is not given that either. Both refusals should be visible in the case study. The first is a gap, not a virtue, until someone confirms it was intentional.

The product behaviour. A checkbox at the bottom of queue configuration. The rest of the form is the queue's existing goals (service level, patience, shrinkage in the prototype). Those fields are context. They are not the design.

The user consequence. Turning it on means accepting that this queue's forecast can change during the day without a further request.

Validation. None recorded. The speech says the point was to avoid overwhelming people. That is the argument, not a test result.

Portfolio interaction. The queue form, reconstructed, with the switch as the only operable control. The other fields are visible and inert, so the visitor sees what was not added.

### Decision 2. The change has to arrive where the planner already is

The problem. The new forecast is written into three places. The planner is in one of them, or in none of them.

The evidence. Requirement 7. Speech slides 11 to 17. PDF pages 11 to 15.

The design question. How is a run announced without turning monitoring into noise?

The decision. Two announcements (started, finished), each in the notification centre and as a banner on the three surfaces. The banner can narrow the view to affected queues. Healthy checks produce no UI.

The trade-off. A planner who misses both the notification and the banner can still be surprised by new numbers. The design stacks two channels and still depends on someone looking at those pages. There is no documented email or push. The speech's "push" claim is dropped.

The product behaviour. In progress: anomaly detected, reforecast in progress in the affected queues, Preview, Apply filter. Finished: reforecast completed, check the updated data. The banner and the notification say the same thing so the channel is not a second story.

The user consequence. They can keep working in the schedule or in Insights and still know the plan is being replaced, then go and look.

Validation. None recorded. The speech's reason (planners are not always on the forecast; a silent number change would be confusing) is a design argument.

Portfolio interaction. A neutral shell. The visitor moves between Forecast, Team schedule and Insights, then advances the system from "in progress" to "updated" and watches the banner, not the chrome.

### Decision 3. The replacement has to be inspectable, and it has to point at a period

The problem. "Updated" does not say whether the afternoon needs two more people or twenty, or which hour broke.

The evidence. Requirements 7 and 8. Speech slides 18 to 20. PDF pages 16 to 19.

The design question. What does the planner look at between "the forecast changed" and "I change the roster"?

The decision. Comparison with the previous forecast, a log of issues, and a marked period that is the same period on the forecast and on the schedule.

The trade-off. The path stops at the period. It does not recommend the staffing move. That is the right boundary: the material never shows a recommended move, and inventing one would fake an outcome. It is also an unfinished edge: requirement 9's simulation is invisible, so the schedule highlight is a signpost, not proof the roster was recomputed in front of the planner.

The product behaviour. Toggle. Issue row with queue, severity, and a volume sentence. Check forecast. Highlight. The schedule opens on that highlight.

The user consequence. They can judge the size of the change and start from the right hour. They still decide what to do with the people.

Validation. None recorded. Claimed benefits about predicting future anomalies are not kept.

Portfolio interaction. One issue, one period, two surfaces. The visitor toggles the previous forecast, then follows the issue to the chart and then to the schedule. The highlighted hour does not change between them.

---

## 14. Design thesis

### Candidates

**A. The work was to make an unsolicited change in the forecast understandable and actionable.**
Fits Decisions 2 and 3. It ignores the configuration conflict, which is half the requirements note. Too narrow.

**B. Reality changes, so the forecast should change with it.**
This is the speech's opening. It collapses monitoring into reforecasting and has nothing to say about trust, place, or setup. Reject.

**C. The system could change the forecast without being asked. The design had to let the customer allow that per queue, make the change visible wherever the planner was working, and make the new forecast comparable and locatable. It did not ask the customer to operate the model.**
Matches the problem model, the three decisions, and the requirement that the method stay different and internal. It does not claim the switch was in the first release.

### Thesis to use

C, in this wording:

The system could decide, on its own, to replace the day's forecast. The design's job was to let that happen only where a customer had allowed it for a queue, to make the replacement reach the planner in the place they were already working, and to make the new forecast inspectable against the one it replaced, down to the period they would have to staff. The customer was not asked to configure the detection.

The public sentence can be shorter. It must not say "one simple switch was the whole product configuration" without the clause about the requirements. Suggested public form, still not final copy:

The forecast could change without the planner asking. The work was to make that change allowed, visible, and inspectable, without turning the model's rules into settings.

Both are INFERENCE as a thesis. The facts underneath them are classified in §13. The thesis is the portfolio's argument, not a sentence the project documented.

---

## 15. Existing case-study audit

The PDF is 20 image pages, title slide through a thank-you slide. It behaves like a talk track. The speech matches it slide for slide, including durations. That explains the structure: it was written to be spoken in about fifteen minutes, not to be read as a case study.

| Pages | What they do now | Verdict |
|---|---|---|
| 1 | Title and a credit. Abstract shapes. No thesis. | Rewrite as a cover that states the thesis and the anonymity. |
| 2 | Four columns: continuous updating, intricate configuration, anomaly detection, a seamless 24/7 flow, plus the real date and the employer name. | Remove. "Continuous" and "24/7" are the wrong model. The employer name cannot be public. Role and date move to the cover as plain meta. |
| 3 | The user story and the requirements note, faithfully. | Keep the content. Reframe as the brief, including the open research question. It is currently a pull-quote with no consequence. |
| 4 | Five scenarios and the factor cards, in type too small to read as a spread. | Keep three scenarios. Make the volume / handle-time / capacity split interactive. Drop the card grid. |
| 5 | Section opener and an illustration. | Remove. |
| 6–8 | Kano, value proposition canvas, empathy map. ChatGPT disclaimers. Empty "say" quadrant. | Remove. |
| 9 | The flow: 30-minute checks, four intervals, threshold, two-a-day, one-hour gap, factor, nightly eight-week threshold. | Keep the logic that the requirements support. Rebuild as an interactive check-versus-run. Quarantine the unconfirmed parameters. |
| 10 | The queue form and the switch. "Don't rush." | Keep the decision. Reconstruct the form. Cut the heading. The heading is tone, not information. |
| 11 | Notification, and the high-fidelity rationale stuffed into the caption. | Keep the notification. Move the rationale to validation. |
| 12–14 | The same banner on the way into Insights, then explained, then shown on three stacked screens. | Merge into one interaction: same state, three surfaces. Delete the repeated bullets. |
| 15 | Completed notification and "forecast updated." Bullets repeat the user story ("informed staffing decisions"). | Keep the state change. Delete the bullets. |
| 16–17 | Previous-forecast toggle. Headline "More data is never a downside." Bullets about predicting anomalies. Placeholder 20 / 20 / 20. Date in 2022. | Keep the toggle. Delete the headline and the bullets. Replace the data. |
| 18 | Issues log. Strong description pattern. Broken identifier, dates that cross midnight, severity with no rule, caption about predicting patterns. | Keep the log structure. Reconstruct the rows. Delete the caption. |
| 19 | Period highlighted on the schedule and on the forecast. Bullets about swift action and service level. The two screens do not obviously share one hour. One reading of this page has also produced a different banner verb ("surge") from the "anomaly" wording on earlier pages; a crop of the forecast side reads "Anomaly detected" and a tooltip "Anomaly detected in this period." | Keep the path. Force one period. Do not treat a second banner verb as a documented iteration. Wording stays "anomaly" unless a later look at the file proves otherwise. Delete the bullets. |
| 20 | Thank you, email, phone. | Remove from the public page. |

---

## 16. Narrative diagnosis

### How a visitor experiences the PDF now

They are told the project continuously reforecasts, all day, for a named employer. They are shown a user story they could have read in a ticket. They are shown five situations in miniature, then three canvases that announce themselves as machine-written. They are shown a dense diagram of a mechanism, then a checkbox, then a run of product screenshots with branded chrome. The screenshots repeat the same banner. The words around them say the design is transparent, fast, and good for patterns. The deck ends on a thank-you slide. At no point is the visitor made to feel the difference between a check and a reforecast, or to notice that the checkbox contradicts the requirements, or to follow one issue from a sentence to an hour on the schedule. The research does not change the design in front of them. The outcome is the existence of the screens.

### What is wrong, specifically

- Slide-deck pacing. Section openers and a closing thank-you are talk structure.
- Artefacts before decisions. Canvases occupy the middle, where the argument should be.
- UI before the rule that makes the UI necessary. The banner appears before the visitor has internalised that the numbers can move while you are not on that page.
- Research disconnected from decisions. There is no finding on pages 6 to 8.
- The system is explained once, densely, and then abandoned. The rest of the deck never uses the caps, the low-volume rule, or the baseline again.
- Operational context is a thumbnail grid.
- The causal chain is "and then we designed." The speech's own best reasons (chaos if you reforecast every hour; confusion if numbers change with no banner) are spoken, not used as the structure.
- Validation is a sentence about high fidelity and a sentence about interviews.
- The 10% target is missing, which is lucky only because nobody turned it into a result. The deck also has no honest outcome.
- Technical difficulty is a diagram caption, not a constraint on the design.
- The narrative tension (the system may overwrite the plan) is never stated.

### How they should experience it instead

They should meet a planner's morning plan, then a day that leaves it. They should see that only some of those departures are a signal the system watches. They should watch a check stay quiet and a later check become a reforecast. They should then see the one thing a customer is asked to set, the way the run finds the planner, and the way the planner gets from "it changed" to a period on the schedule. They should leave knowing what was tested (a prototype, with customers, quickly) and what was not (accuracy, the staffing result, the manual alternative).

---

## 17. Proposed narrative architecture

The twelve-part outline in the brief is close. Two changes, both from the evidence:

- There is no research chapter. A chapter would invent a study. What is real belongs in the brief (the research question), in the scenarios (the sentences), and in validation (the prototype and the designer context).
- "The day" and "when reality diverges" stay as two short sections. The first teaches the vocabulary (forecast, queue, planner, same day). The second teaches the split between a signal the system can see and a capacity fact the planner already knows. Merging them makes the detector look like it understands absenteeism.

### Sections

| # | Section | Job |
|---|---|---|
| 01 | Cover | Thesis, role, date, domain, anonymity, evidence legend. |
| 02 | The plan | What a forecast is for, in this product: a same-day staffing input. Three surfaces, named in neutral language. |
| 03 | The day diverges | Three scenarios. Volume is visible to the detector. Handle time is a planner question with an open trigger. Capacity is a planner fact, not a documented detection. |
| 04 | The brief | User story, mitigation, the open choice between automation and on-demand, the constraints that are actually requirements, the 10% as a target. |
| 05 | What the system had to understand | Check versus reforecast. What is withheld from the UI. Unconfirmed parameters stay off the main path. |
| 06 | Three tensions | The three questions Decision 1–3 will answer. Short. No new evidence. |
| 07 | Decision 1 | The switch, and the requirement it does not satisfy. |
| 08 | Decision 2 | Notification and banner as a state sequence on three surfaces. |
| 09 | Decision 3 | Previous forecast, issues, one period, two places. |
| 10 | Validation | What was done, what is context, what is unknown. |
| 11 | Outcome | Design outcome and the list of results that do not exist. |
| 12 | Reflection | What design refused to take on (the algorithm, the staffing move), and the open edge (the simulation, the manual run). |

No section exists to "show the UI." UI appears only inside 07, 08 and 09.

---

## 18. Interactive experience strategy

Interaction is allowed only where it teaches a documented behaviour or a documented limit. Five interactions. Each has a question, a control, a thing it must not imply, and a static fallback so motion is not the explanation.

### 1. Operational scenario

Question. Which real-world changes is this system even in a position to see?

Control. Three choices: volume, handle time, capacity. One short planner sentence each, from §6. A single illustrative day, with the relevant series emphasised.

Must show. Volume: actuals leave the forecast, and the case study says this is the kind of gap the issues log describes. Handle time: the planner's question, plus an explicit "not established as a trigger." Capacity: the 9:00 absence story, plus an explicit "the planner already knows; the documented detector is not shown reading absenteeism."

Must not imply. That the product detected coaching, absence, or handle time. That 30% is a product threshold.

Answers. What we learned from the scenario list, and which design question it does not answer (it does not answer the switch or the banner).

Class. EXPLORATION, using FICTIONAL numbers and FACT sentences.

### 2. Detection and reforecast

Question. Why is a check not a new forecast?

Control. The visitor steps forward. No autoplay.

States to show, in order. A check inside the band: no reforecast, no banner. A deviation that has not lasted long enough: still no reforecast. A deviation that meets the presented conditions: anomaly, then reforecast in progress, then forecast updated. The visitor must be able to stop on the quiet checks and see that the product UI would still be silent.

Must show. The separation in §8. Low-volume exclusion as a sentence, not a fake cutoff. If the two-a-day cap and the one-hour gap are shown at all, they are behind a clearly labelled "described in the presentation, not in the requirements" control that defaults to off.

Must not imply. A published threshold, a multiplication factor, or that the designer designed the model.

Answers. How the product behaves, and why the configuration in the next section is allowed to be small.

Class. EXPLORATION.

### 3. System state, in a neutral shell

Question. What does a planner see if they are not on the forecast when the run happens?

Control. Surface: Forecast, Team schedule, Insights. System: watching (no banner), in progress, updated. One action: apply the affected-queue filter. Preview and Check insights, if drawn, do nothing except a visible note that the behaviour was not documented. Do not design a fictional preview panel and present it as the product.

Must show. The banner and the notification carry the same sentence. The shell is not branded. Advancing state does not depend on which surface is open: the state is global, the explanation is on the surface you are looking at.

Must not imply. Push, email, a progress percentage, or that every 30-minute check produces a banner.

Answers. The decision, and the product behaviour.

Class. RECONSTRUCTION plus EXPLORATION of the sequence.

### 4. Previous forecast against the new one

Question. Why is "updated" not enough?

Control. Show or hide the previous series. Previous is a dotted line and is also named in text. Current is solid. The anomalous period is marked with a band that is not colour alone.

Must show. The new line is the forecast the planner would staff from. The previous line is what it replaced. A plain-language delta tied to the illustrative data ("higher through the late morning"), never a 10% callout.

Must not imply. That the gap is the accuracy result, or that the visitor is looking at a historical screenshot.

Answers. Why comparison exists.

Class. RECONSTRUCTION. Illustrative data.

### 5. Issue to location

Question. How does a detected event become a place to act?

Control. Start from one issue for today. Open the forecast on its period. Open the schedule on the same period. Other issues may sit in the log so the log looks like a log; their "go to forecast" actions are unavailable, with a note that only one day is illustrated. This avoids a second, contradictory dataset.

Must show. The description pattern (volume, percent, consecutive periods). The period identity is stable across chart and schedule.

Must not imply. A severity formula, a recommended headcount move, or that the scheduling simulation has been shown.

Answers. The decision, and where the design stops.

Class. RECONSTRUCTION.

### Interactions rejected

- A scrubber of "pattern recognition over Mondays." The benefit is unsupported.
- A settings playground for the threshold. It would teach the opposite of Decision 1.
- A manual "reforecast now" button. Not in the screens.
- Autoplaying the day on load. It hides the quiet checks, which are the point of interaction 2.
- Anything whose only job is to prove the page is interactive.

---

## 19. Product state model

Validated against §7 and §8. "Deviation" and "anomaly" are system judgements. They are not screens. "Inspection" and "staffing action" are planner activities, not system modes.

| State | System behaviour | What the planner sees | Actions that exist in the material | What causes the next state |
|---|---|---|---|---|
| Off | Queue or customer not in the behaviour. | No reforecast UI, or the switch off. | The switch, in the presented design. The requirements' flag is not a planner control. | Switch on, or flag on. Relationship between the two is OPEN. |
| Watching | Periodic comparison. No reforecast. | Nothing about reforecasting. | Ordinary product actions. | A check that fails the rules stays here. |
| Deviation, not yet actionable | Gap exists but periods, volume, low-volume rule, or (if they existed) cap and interval block a run. | Nothing. | None specific. | Rules met, or the gap subsides. |
| Anomaly, run started | Reforecast method runs. Baseline still the previous forecast until the run completes. Exact handoff timing is OPEN. | Notification and banner, in progress, affected queues. | Preview, Apply filter, Check insights. Preview's body is OPEN. | Run completes. Failure behaviour is not documented. Do not invent an error state. |
| Forecast updated | New forecast is the forecast. Baseline retained. Reporting receives the values. Simulation is triggered (not shown). | Completed notification. Banner of the updated state. Issue count. | Open issues. Show previous forecast. | Planner looks, or ignores it. The system does not require a click to "accept" the new forecast. Do not add an accept step. |
| Issues available | The event is in the log. | Rows with time, queue, severity, description. | Check forecast. | Planner follows a row. |
| Inspection | Not a system mode. | Previous series, marked period. | Toggle. Go to the schedule period. | Planner moves to staffing. |
| Staffing action | Not designed in the material. The simulation may have changed the schedule. That result is not shown. | The marked period on the schedule. | Whatever the schedule already allowed. Out of scope. | — |

One line for the case study, as inference: the designer did not design the algorithm. The designer designed which of these states are visible, and what the planner can do in them.

---

## 20. Neutral UI reconstruction strategy

The original screens cannot be published. The reconstruction keeps the relationships and drops the identity.

Keep:

- A queue configuration form whose only new, working control is the reforecast switch, with the documented helper sentence.
- A notification list with the two documented sentences.
- A banner with the same sentences and the documented actions (Apply filter, Preview, Check insights).
- Three surfaces named for their jobs: Forecast, Team schedule, Insights. Plus Configuration, because Decision 1 lives there.
- A forecast chart, a previous-forecast toggle, a table of the day's intervals only if the chart needs a textual equivalent.
- An issues table with the documented columns and the documented description pattern.
- A schedule with a marked period and the same mark on the chart.

Remove:

- Employer name, product name, logos, wordmark, purple product chrome, proprietary navigation, favicons, account identifiers, internal issue identifiers, real or prototype customer names, employee names, the designer's phone number.
- Prototype dates (2022, January, April, midnight crossings) and placeholder triples (20 contacts, 20 seconds, 20 hours).
- Any control that was not in the material. Do not add a manual run, a threshold field, email, or push.

Language on the frame, every time a product UI appears:

"Reconstruction. The interaction follows the prototype. The interface is not a screenshot, and the data is illustrative."

The visual of the shell is neutral: light surface, dark text, a quiet action colour that is not the case study's purple and not the portfolio's yellow. Purple belongs to the editorial pages. If purple enters the product frame, the reconstruction starts to look like the original brand. That is the failure mode.

Do not caption it "historical UI" or "the original screen."

---

## 21. Fictional-data strategy

One illustrative operation, used everywhere, so the five interactions cannot contradict each other.

Rules:

- Invent an account name that cannot be a real customer. Invent queue names that are functions (support, billing), not brands.
- One time zone, stated. One calendar day inside the project's season (2023), not the prototype's 2022 dates.
- The anomaly is a contact-volume gap on one queue, lasting at least the example window of four 15-minute periods, detected at the end of that window. The same clock times appear in the simulation, the chart, the issue, and the schedule.
- Percentages in the issue text match the series. If the copy says the volume was about 30% above forecast for four periods, the table shows that, and it is labelled illustrative. It is not the 10% accuracy target.
- A second and third issue may exist so the log is not a single row. They are other days or other queues, not playable, so the case study does not need a second coherent day.
- Severity labels may be attached to rows because the prototype had the labels. The case study does not define how they were calculated.
- Agent names, if a schedule needs them, are fictional and few. Do not reuse names read out of the prototype screenshots.
- Do not reuse the prototype's issue identifier. It is an internal-looking string and, in the PDF, it is not even cleanly readable.
- Capacity and handle-time views may change the illustrated series. They must not change the clock of the volume story. And they must not show a banner unless the case study has just said, in the same view, that this variant is not a documented trigger.
- Every frame that shows numbers carries the illustrative label in the frame, not only in a footnote.

Class on all of it: FICTIONAL / ILLUSTRATIVE inside a RECONSTRUCTION.

---

## 22. Visual direction

The case study needs a palette that can carry state, data and editorial hierarchy. It does not need to look like a generic software marketing page, and it must not look like the employer's product.

Use, as the case study's own colours:

- A purple for the few full-bleed editorial moments: cover, the system-logic section, the comparison section. Purple is the project's original accent, kept as a portfolio colour, not as a logo colour.
- A lilac for the short tension section and for secondary editorial bands.
- A cream for validation and outcome, so the ending is quieter than the system section.
- White and near-black for text and for the reconstructed product.

Do not use:

- The portfolio yellow as the case accent. It may remain only where the surrounding site already uses it (for example a focus ring the site already defines). It should not become the colour of anomalies or of the thesis.
- Purple inside the reconstructed product.
- Gradients, glass, stock photography, decorative dashboard cards, or a chart that does not encode a real series from §21.
- The PDF's blob illustrations. They do not explain the system.

Colour inside the data, as a system rather than a theme:

- Current forecast and previous forecast differ by line style first (solid, dotted), not by colour first.
- The anomalous period is a band plus a pattern or a border, plus a text label.
- In-progress and completed differ by the words in the banner, not by a red/green semaphore. The material does not define a severity colour code. Do not invent a traffic-light system and call it the product's.

The reconstructed product stays visually quieter than the editorial page, so the visitor can tell "this is the argument" from "this is the tool."

---

## 23. Typography direction

The portfolio has one family, Nudica, in regular, italic, medium and bold. The case study uses that family. It does not add the PDF's display face or a second grotesque.

Hierarchy is by role, not by a new font:

| Role | Treatment |
|---|---|
| Case narrative | Large sizes, italic for the thesis and for planner sentences. This is the voice of the case. |
| System explanation | Medium weight, shorter measure, diagrams and stepped states. Not the same scale as the thesis. |
| Product UI | Smaller, regular, the labels the prototype actually used ("Turn on reforecast", "Show previous forecast", "Check forecast"). UI type must look like UI: it sits inside the frame, not as a pull-quote. |
| Evidence | A small label, same family, tracked slightly open, never a second colour language per category beyond a quiet border or prefix. |
| Annotation | Italic or the small size, placed on the figure, used to say "illustrative" or "not a documented trigger." |

If everything is inside rounded panels at the same size, the case study becomes the product UI. The narrative sections should often be type alone.

No final display copy is written here. The thesis in §14 is the argument, not the locked headline.

---

## 24. Editorial rhythm

Aim for a short page, on the order of the twelve sections, with weight concentrated on 05, 08 and 09. The PDF's failure mode was the same weight on a canvas, a banner and a thank-you slide.

| Section | Weight | Dominant form |
|---|---|---|
| 01 Cover | One screen. | Thesis, then meta. |
| 02 The plan | Short. | Three-step diagram: forecast, staffing, the three surfaces. |
| 03 Diverges | One screen plus the selector. | Planner sentence, then the signal / not-a-signal note. |
| 04 Brief | Short, but denser. | The user story, the note, a constraint list the visitor can open. |
| 05 System | The long explanatory section. | The stepped simulation. Type beside it, not a caption underneath a screenshot. |
| 06 Tensions | Short, typographic. | Three questions, no cards. |
| 07 Switch | Medium. | One reconstructed form, large enough to read the helper. |
| 08 Reaches the planner | Long. | The shell. |
| 09 Inspectable | Long. | Comparison, then the path. |
| 10 Validation | Short. | Prose and labels. No chart of fake results. |
| 11 Outcome | Short. | What was designed. What was not measured. |
| 12 Reflection | A few sentences. | The boundary of the work. |

Avoid runs of heading, paragraph, picture, paragraph, picture. After 05, the next thing should be a question, not another diagram. After 09, the next thing should be prose. The visitor should feel the argument narrow, then open into the tool, then narrow again into what is known.

---

## 25. Accessibility strategy

The case study is part of the existing site, so it inherits the site's skip link, focus treatment, target size and reduced-motion switch. These are additional requirements for this piece.

- The page is a sequence of sections with headings. Reconstructed UI is inside regions labelled as reconstructions, not as the only content.
- Every interaction is operable with a keyboard. Scenario choice, simulation step, surface choice, system state, previous-forecast toggle, and the issue path are buttons or native controls, not click-only shapes.
- The simulation and the shell expose the current state in text, adjacent to the control, and in one polite live region for the whole page. Do not give each widget its own live region.
- Charts have a table or a sentence that contains the same comparison. The dotted line is never the only encoding.
- The anomaly band does not rely on purple versus lilac. Pattern, border and label travel with the colour.
- Focus remains visible on purple editorial fields and on the neutral UI. If the site's yellow focus ring fails on a light field, the case study uses the site's already-defined dark focus treatment on those fields.
- Touch targets meet the site's minimum. Banner actions do not rely on hover.
- Text in the reconstructed UI is real text, not an image of the PDF.
- Nothing is conveyed by a timed animation alone. The stepped control is the interface; motion only follows the step.
- The evidence label is text, not a colour dot alone.
- Language of the page follows the locale. Planner sentences that only exist in English are marked as translated when a Portuguese version is written. That translation is a later phase. This audit does not write it.

---

## 26. Motion strategy

Motion is for a change of state the visitor just asked for. It is not for entrance effects on paragraphs. The site already collapses animation when reduced motion is requested. This case study does the same, and the stepped controls mean nothing is lost.

| Moment | Trigger | What moves | Purpose | Reduced motion |
|---|---|---|---|---|
| Scenario change | Visitor picks volume, handle time, or capacity. | The emphasised series and the one-line consequence. | Show that the cause changed. | Swap immediately. Text is already there. |
| Simulation step | Visitor advances. | The interval marker, then the state label. | Show that several checks can pass before a run exists. | Instant. The state name is the explanation. |
| Shell: change surface | Visitor picks a surface. | The content inside the frame, not the banner's meaning. | Show the banner is tied to the state, not to one page. | Instant swap. |
| Shell: advance state | Visitor advances. | Banner and notification text. | Show start versus finish. | Instant text change. |
| Previous forecast | Visitor toggles. | The dotted series appears or leaves. | Show what the new forecast replaced. | Series appears at full opacity. The text label remains. |
| Issue path | Visitor follows the issue. | Focus moves to the chart band, then to the schedule band. | Show it is the same period. | Focus moves with no scroll animation beyond the browser's default, or with an instant jump. |

No autoplay. No looping hourglass. No count-up of the 10% target. Duration, if motion is on, stays short enough that the state change reads as a response, not as a sequence the visitor has to wait out. Exact durations are an implementation choice and are not specified here, beyond "short, and zero under reduced motion."

---

## 27. Responsive strategy

The story on a narrow screen is the same chain. The product chrome is not.

| Moment | Desktop | Narrow screen |
|---|---|---|
| Scenario | Sentence and a small chart side by side. | Sentence first. Chart second, or omit the chart if the sentence and the "signal / not a signal" line already carry it. The chart is not the evidence. |
| Simulation | Steps and a horizontal day. | The day becomes a vertical list of checks. The current check is expanded. Quiet checks stay visible so the point survives. |
| Shell | A reduced product frame with a top bar and the three surfaces. | Do not shrink the full frame until it is illegible. Stack: state control, banner text, then the content of one surface. Surface choice remains. |
| Comparison | Chart with toggle. | Chart in a scrollable region only if the axes remain labelled. The textual delta is above the chart, not only to its right. |
| Issue path | Table, then chart, then schedule. | The issue is a single card, not a crushed table. The path is three explicit steps with the period written in each. |
| Queue form | The form at a readable width. | The switch and its helper stay together. Inert fields can collapse behind a disclosure titled as existing queue settings, so the decision remains the switch. |

Tables of issues never become a requirement to pinch-zoom. If a column cannot fit, it moves into the card, it is not dropped silently.

---

## 28. Validation audit

| Question | What the material supports | Class |
|---|---|---|
| What was tested? | A high-fidelity prototype, shown in order to get feedback before or in parallel with development. | Process claim in the speech and on PDF page 11. |
| With whom? | The speech says resource planners were interviewed about scenarios. The designer says the team worked directly with multiple customer companies, previously specified as three, because time was short. | Interview: unsupported method label on top of documented sentences. Companies: designer-provided context. |
| What feedback was obtained? | Not recorded. No quotes, no counts, no task results, no preference. | OPEN. |
| What changed because of feedback? | Not recorded. The deck presents a single design, not a revision. | OPEN. Do not invent discarded iterations. |
| What was not tested, on the evidence? | Accuracy against the 10% target. The threshold method. Whether planners could explain why a run had started. Whether the banner was noticed. Whether the issue path was faster than hunting. The scheduling simulation. A manual trigger. Low-volume edge cases. | Say so. |
| What the case study may say | The team used a high-fidelity prototype because the timeline was short, and sought feedback from customer companies while designing. The outcome of that feedback is not documented here. | DESIGNER-PROVIDED CONTEXT plus the process claim. |

A strong case study can survive that paragraph if Decisions 1 to 3 are precise. It cannot survive a fabricated success rate.

---

## 29. Outcome and metric audit

| Item | Status | Public treatment |
|---|---|---|
| Improve intraday accuracy by 10% over the original forecast. | REQUIREMENT. Target. No measurement, no baseline result, no after result. | "The brief set a target of a 10% improvement in intraday accuracy over the original forecast." Never "accuracy improved by 10%." |
| Baseline stored so accuracy can be measured. | REQUIREMENT. | Evidence the team intended to measure. Not evidence they did. |
| Feature shipped, adopted, rolled out past a flag. | Unknown. | Do not say launched, shipped, or adopted. |
| Planners made faster or better staffing decisions. | The user story's purpose. Not an observed result. | Do not say time saved or better decisions as a result. |
| Customers preferred the switch, understood the banner, trusted the comparison. | Not in the material. | Do not say. |
| Qualitative result that is fair | The presented design defines a path from an unsolicited reforecast to a specific period on the schedule, with a single queue control and without exposing the model. | This is the design outcome. Label it as what the work specified, not as a measured effect. |
| Unknown | Everything in §38. | A short list at the end, not an apology paragraph in every section. |

---

## 30. Confidentiality audit

Must not appear in the public case study:

- The employer name, in the speech, on PDF page 2, and in the deck's metadata.
- Product or programme names that are internal (the requirements name later internal work and a codename). Do not carry those words into public copy.
- The named person in the requirements (an engineer mentioned on the simulation line).
- Logos, wordmarks, and the purple application chrome that identifies the product in the screenshots.
- Customer and account names from any screenshot. Prototype queue examples may be generic ("support"); still replace them with the illustrative set rather than assuming they are safe.
- Person names on schedule screenshots.
- Issue identifiers, URLs, account ids, and any string that looks like an internal id. The issues table has one.
- The designer's telephone number on the thank-you page. An email is a contact choice for the site's existing contact pattern, not something this case study needs to repeat from the PDF.
- Browser chrome, favicons, and full-bleed screenshots cropped out of the PDF. Reconstruction replaces them. Cropping a logo out of a screenshot is not enough, because layout, type and colour still identify the product.
- Filenames of the source PDFs in the public page.
- The Figma file id, in public copy.
- Real operational numbers, if any were hiding in the prototype. The visible numbers are placeholders or inconsistent demo data; treat all of them as non-public anyway, and replace them.
- "Talkdesk" is already rejected by the site's copy check for studio copy. The case study content must be held to that even if the current test does not scan case-study files.

Allowed:

- The role (product designer), the quarter (Q2 2023), the domain (workforce management for contact centres), and the mechanics in §§7–8, minus internal names.
- Purple, lilac and cream as the case study palette.
- The reconstruction, labelled.

---

## 31. Claims audit

| Claim, as it tends to be written | Verdict | Defensible wording |
|---|---|---|
| Accuracy improved by 10%. | Unsupported. The sentence is a target. | The brief set a target of a 10% improvement in intraday accuracy. Whether it was reached is not documented. |
| The forecast updates continuously / 24/7. | Unsupported. Contradicted by the conditions and by the caps in the same speech. | The system checks through the day. A reforecast runs only when the gap qualifies. |
| The forecast is recalculated every 30 minutes. | Unsupported. | The check is at least every 30 minutes. The reforecast is conditional. |
| We interviewed N resource planners. | The speech says interviews happened. No method or count. | Scenarios were documented in the voice of resource planners. How they were gathered is not recorded. |
| Three companies validated the design. | Designer-provided context about working together. Not a validation result. "Three" is from a prior designer note; this brief says multiple. | Under a short timeline, the team worked directly with customer companies. The feedback is not documented here. |
| Users understood the change. | Unsupported. | The interface states that a reforecast is in progress or finished, on the pages where the numbers appear. |
| The banner reduced confusion. | Design argument in the speech. Not a result. | The banner exists so a change in the numbers has an explanation in place. |
| Configuration was kept to one switch so we would not overwhelm users. | Design argument. The screen supports the "one switch" part. | The presented design adds one queue control and no detection settings. |
| The switch was all the customer could configure, and that matched the requirements. | Partially supported, and partly false. | The presented design shows one switch. The requirements said the customer would have no configuration at launch. |
| We designed manual and automatic workflows. | Unsupported by screens. | The requirements left that choice open. Only the queue switch is shown. |
| Push notifications were part of the design. | Unsupported. | An in-app notification and banners are shown. |
| Previous forecast helps predict future anomalies. | Unsupported. | Previous forecast shows what the new forecast replaced. |
| Severity tells the planner what to do first, by a defined rule. | Labels are shown. The rule is not. | The log shows a severity label. How it was calculated is not documented. |
| The project shipped and planners used it. | OPEN. | Do not say. |
| High-fidelity prototypes led to better feedback. | Process claim, unmeasured. | High-fidelity prototypes were used so feedback could happen early. |
| We simplified complexity. | Empty unless pointed at the switch. | Detection rules stay out of the queue form. |
| A seamless experience. | Empty. | Do not say. |

---

## 32. Source discrepancy audit

| # | Topic | Requirements | Speech | PDF | Reading |
|---|---|---|---|---|---|
| 1 | What happens every 30 minutes | "At least runs every 30m." | Checks the last four quarter-hours. | Same as the speech, page 9. | Treat as a check. Not a reforecast. |
| 2 | How often a reforecast may run | More than once a day. | At most twice per queue, and not again for an hour. | Same as the speech. | Cap and gap are unconfirmed. OPEN whether they were final. |
| 3 | Threshold | Undefined. Must include a minimum call count, also undefined. | Nightly, from average error over eight weeks. | Nightly, from percentile differences over eight weeks. | Speech and PDF disagree with each other and post-date an open requirement. OPEN. Do not publish either formula. |
| 4 | Method | Different from the normal forecast. 10% target. | Rest of day multiplied by a factor. | Same as the speech. | Factor is not a requirement. Do not state it as fact. |
| 5 | Low volume and mixed intervals | Excluded. Mixed intervals undefined. | Silent. | Silent. | The case study can mention the exclusion. It cannot show the cutoff. |
| 6 | Customer setup | None at launch. Flag. Self-serve later. Research the automation-versus-on-demand choice. | One switch per queue, presented as the decision. Closing slide: manual and automatic. | The switch is shown. No manual control. | The design does not implement requirement 5 as written. It may anticipate the later self-serve. OPEN for the release. The manual workflow is not shown. |
| 7 | Where the new forecast appears | Forecast, schedule (scheduler TBD), Insights, reporting. | Banners on Forecast, Team schedule, Insights. | Same screens. | Aligned. Scheduler behaviour after the run is still TBD in the requirements and absent from the PDF. |
| 8 | Latest run time on the forecast | A "could," not a must. | Not a point in the speech. | The forecast header in the prototype shows an updated time. | Do not promote it to a requirement. Optional in the reconstruction. |
| 9 | Banner verb | Not specified. | "Anomaly detected." | Pages 11–15 use anomaly. A full-page reading of page 19 has been inconsistent about a "surge" wording; the forecast crop reads as anomaly, with the tooltip "Anomaly detected in this period." | Use "anomaly." Do not present an alternate verb as an iteration. |
| 10 | Which metric trips the detector | "Real and forecast." | Calls received, in the explanation. Factors listed separately include handle time and capacity. | Issue text is CVO versus forecast. | Volume is the documented example. Handle time and capacity as triggers are OPEN. |
| 11 | Notifications | None specified. | In-app notification, banners, and, on the closing slide, push. | In-app notification and banners. | Push is unsupported. |
| 12 | Dates in the prototype | Project is Q2 2023. | Q2 2023. | May 2022 in the chrome; other dates in the issues table, including a range that crosses midnight. | Placeholder chaos. The reconstruction uses one 2023 day. |
| 13 | Research | Asked for, future tense, in the note. | Claims interviews. | Shows ChatGPT canvases and "scenarios documented with resource planners." | The canvases are not the research. The interviews are unverified. |
| 14 | Issue length versus check window | Example of four periods, number not final. | Check looks at four intervals. | An issue of six consecutive periods is shown. | Not a conflict. Duration can exceed the check window. |
| 15 | "3 issues found" while a banner still says in progress | Not specified. | The count is part of the completed story. | At least one spread shows a count beside an in-progress banner. | Likely because the count is historical issues, not "issues created by this run." OPEN. The reconstruction should not show "in progress" and a fresh issue count as if they were the same event, unless the count is labelled as already on the books. |

Figma, unread, might resolve 6, 9, 10 and 15. Until it is opened, they stay as they are in this table.

---

## 33. Evidence matrix

| Claim | Source | Type | Confidence | How it appears |
|---|---|---|---|---|
| User story: update the forecast after unexpected change, to staff. | Requirements | Requirement | High | Section 04, quoted. |
| Mitigation; not every customer, every day. | Requirements note | Requirement | High | Section 04. |
| Research needed: per-queue automation versus on demand. | Requirements note | Requirement | High | Section 04, as an open question. Section 10, as unanswered. |
| Same account-timezone day. | Requirements | Requirement | High | Section 05. |
| Check at least every 30 minutes. | Requirements, clarified by speech/PDF | Requirement plus presentation | High for "checks," medium for the exact reading of "runs" | Simulation. |
| Reforecast only above a threshold, over several periods, not on low-volume queues. | Requirements | Requirement | High for the rule, low for the numbers | Simulation, without fake cutoffs. |
| Different forecasting method. | Requirements | Requirement | High | One sentence in section 05. No formula. |
| 10% accuracy over the original forecast. | Requirements | Requirement, target | High that it is a target. None as a result. | Outcome section, as a target. |
| No customer configuration; flag; later self-serve. | Requirements | Requirement | High | Decision 1, as the conflict. |
| Reforecast becomes the forecast on three surfaces and in reporting. | Requirements | Requirement | High | Sections 02 and 08. |
| Baseline kept to measure accuracy. | Requirements | Requirement | High | Decision 3, as inference that comparison is possible because the baseline exists. |
| Re-forecast triggers a scheduling simulation; performance out of scope. | Requirements | Requirement | High | Reflection. Not shown as UI. |
| May run more than once a day. | Requirements | Requirement | High | Section 05. |
| Four-interval check, two-a-day cap, one-hour gap, eight-week nightly threshold, multiplication factor. | Speech, PDF page 9 | Fact of the presentation only | Low as product fact | Omitted, or behind an explicit unconfirmed label. |
| Percentile versus average error. | PDF versus speech | Discrepancy | — | §32. Not in the public page. |
| Five planner scenarios. | Speech, PDF page 4 | Fact of the presentation | High as copy. Low as research. | Three of them in the selector. |
| Interviews happened. | Speech | Unverified claim | Low | Not used as a method. |
| One switch, documented helper sentence. | PDF page 10, speech | Design decision | High | Reconstructed form. |
| Notification and banner copy for start and finish. | Speech, PDF | Design decision | High | Shell. |
| Apply filter, Preview, Check insights. | PDF, speech | Design decision | High that the controls exist. Low for Preview's content. | Filter works in the reconstruction. Preview does not grow a fictional body. |
| Show previous forecast, dotted. | PDF, speech | Design decision | High | Comparison interaction. |
| Issues log and CVO description pattern. | PDF page 18 | Design decision | High | Issue path. |
| Period marked on forecast and schedule. | PDF page 19, speech | Design decision | High | Issue path, with one shared period. |
| Severity labels. | PDF | Fact of the UI | High for the labels. None for the rule. | Illustrative rows. No formula. |
| High-fidelity prototype for speed. | Speech, PDF page 11 | Process claim | Medium | Validation. |
| Worked with multiple customer companies, short timeline. | Designer | Designer-provided context | High as context. Not a finding. | Validation. |
| ChatGPT canvases. | PDF pages 6–8 | Fact of the deck | High | Not shown. Mentioned only if a process note needs to say what was rejected. Default: omit. |
| Shipped, measured, adopted. | — | Unknown | — | Outcome list of non-claims. |

---

## 34. Evidence to experience matrix

| Evidence | Design decision | Section | Interaction | What the visitor understands |
|---|---|---|---|---|
| The forecast is a same-day staffing input, written into three places. | None yet. Setup. | 02 | None. | Why a chart change is an operational event. |
| Scenarios split into volume, handle time, and capacity. Only volume is in the issue text. | None. This is a limit, not a decision. | 03 | Scenario selector. | Automation has a narrow sensor. The planner's problem is wider. |
| Not every customer wants this every day. The rules are internal and partly undefined. | One queue switch. No parameter form. | 04 then 07 | Inert fields, one working switch. | Why setup is small, and why that smallness disagrees with "no configuration." |
| A check every 30 minutes is not a new forecast. | Hide monitoring. Announce only a run. | 05 then 08 | Simulation, including quiet steps. | Why the banner is rare. |
| The planner may be on the schedule or in Insights when numbers change. | Notification plus banner on all three, start and finish. | 08 | Shell and state advance. | Place and status are different problems. |
| The new forecast replaces the old, and the old is retained. | Previous versus new. | 09 | Toggle. | "Updated" has a size. |
| An issue names a queue and a run of periods. | The log, then the same period on the forecast and the schedule. | 09 | Issue path. | Detection ends in a place, not in a dashboard. |
| The simulation's effect on the roster is unshown. The 10% was not measured. Feedback was not written down. | None. Honesty. | 10–12 | None. | What the work was, and what it was not. |

---

## 35. Current implementation audit

Inspected so a later phase can enter the site. Not used as evidence about Intraday Reforecasting. Not used as a narrative, visual, or interaction template from any other project.

### What exists for this project

Nothing. No route, no content module, no component, no asset. Searching the application source finds the employer name only inside a copy test that forbids it.

### What the site is, technically

- Next.js App Router under `src/app/[lang]/…`, React 19, TypeScript, Tailwind v4, a motion library, vitest. The repository rule is to read `node_modules/next/dist/docs/` before implementation. This phase does not implement.
- Locales `pt` and `en`. Path maps live in `src/lib/i18n.ts` (`HOME_PATH`, `STUDIO_PATH`, `PROJECT_PATH`, and one published case-study path). A future Intraday path would be a new map plus the same locale pattern. Suggested shape, not a decision: English under `/en/work/…`, Portuguese under `/pt/trabalho/…`.
- Published work is a typed list in `src/data/projects.ts` with `kind` of `product` or `graphic` and an optional `href`. Adding the case later is one entry. It does not belong in that list during this phase.
- The public chrome is a shared shell: header, language, theme, footer. Reuse it. Do not redesign the site around this case.
- Type is Nudica only, exposed as `--font-brand`, with a scale of utility classes. A second family would contradict the site's own type decision. The PDF's faces are out.
- Colour tokens are an off-white surface, ink, a muted ink, and a yellow accent that the site itself treats carefully for focus. The purple / lilac / cream set is not in the token list. A later phase would add case-study tokens scoped to this page, not new global brand colours.
- Layout widths are a narrow measure and a wide measure. The shell interactions need the wide measure. Narrative sections can stay narrow.
- Reduced motion is already global.
- Copy tests scan studio dictionary and project-flow strings for em dashes, Brazilian spelling, a list of client names including this employer, first person, and a cliché list. They do not scan case-study content. A later phase should extend that scan. This phase does not.

### Classification

| | |
|---|---|
| Missing | The entire case study. |
| Reusable as infrastructure | Shell, locale paths, project list, type scale, reduced motion, focus and target-size conventions, the copy-test approach. |
| Not reusable as a model | Any other case study's story, section order, interactions, palette, or content schema. Those were built for different evidence. |
| Outdated relative to the live site | Older design notes under `docs/superpowers/` describe a previous incarnation of the site. Ignore them for this project. |
| Reconstruction required | Everything in §20. |

A previous specification on this branch modelled the page on another case study's components and chips. That approach is rejected by this audit. Shared infrastructure is allowed. Shared storytelling is not.

---

## 36. Content architecture

Conceptual only. No files are created by this phase. Names below are roles, not a commitment to a directory.

For each section: purpose, narrative role, evidence, what is seen, interaction, annotation, handoff.

**01 Cover.** Purpose: state the thesis and the frame. Role: contract with the visitor. Evidence: none historical; the thesis is inference. Seen: title, one paragraph, meta (product design, Q2 2023, workforce management), anonymity line, legend. Interaction: none. Annotation: none. Handoff: what a forecast is for, here.

**02 The plan.** Purpose: vocabulary. Role: so "the numbers changed" means something. Evidence: requirements 1 and 7. Seen: a plain diagram of forecast to staffing, and the three surfaces. Interaction: none. Annotation: none. Handoff: that plan is what the day breaks.

**03 The day diverges.** Purpose: the operational problem, and the sensor's limit. Role: evidence before system. Evidence: PDF page 4, speech slides 4 and 5, issue description pattern. Seen: three planner sentences. Interaction: scenario selector. Annotation: illustrative numbers; handle time and capacity marked as not documented triggers. Handoff: the brief's job was narrower than all of these stories.

**04 The brief.** Purpose: what was asked, including the open research question and the target. Role: constraints. Evidence: requirements, especially the note, items 1–10, the 10% line. Seen: the user story, the note, a short list (same day, conditional run, low volume, no launch configuration, three surfaces, target). Interaction: the list can expand. It must not become a second essay. Annotation: target labelled as a target. Handoff: meeting those rules required understanding the check.

**05 What the system had to understand.** Purpose: monitoring versus execution. Role: the explanatory centre. Evidence: §8. Seen: the simulation. Interaction: detection steps. Annotation: unconfirmed parameters off by default; "the designer did not design the algorithm." Handoff: three questions.

**06 Three tensions.** Purpose: name the questions. Role: pivot, not a new topic. Evidence: §11. Seen: three sentences. Interaction: none. Annotation: none. Handoff: the switch.

**07 Decision 1.** Purpose: the configuration decision and its conflict with the requirements. Role: first decision. Evidence: PDF page 10, speech slide 10, requirements 5 and 6. Seen: reconstructed form. Interaction: the switch, as a demonstration, not as a saved setting. Annotation: reconstruction; requirement conflict in one sentence beside it. Handoff: once it is on, the planner still has to hear about a run.

**08 Decision 2.** Purpose: place and status. Role: second decision. Evidence: requirement 7, speech 11–17, PDF 11–15. Seen: neutral shell. Interaction: surface and state. Annotation: reconstruction; Preview undocumented. Handoff: hearing about it is not the same as reading the change.

**09 Decision 3.** Purpose: comparison and location. Role: third decision. Evidence: requirements 7 and 8, PDF 16–19, speech 18–20. Seen: chart and schedule. Interaction: toggle, then issue path. Annotation: illustrative; one period. Handoff: what was learned by trying this.

**10 Validation.** Purpose: the thin record. Role: trust. Evidence: §28. Seen: prose. Interaction: none. Annotation: context versus requirement versus unknown. Handoff: what can be claimed.

**11 Outcome.** Purpose: design outcome, then non-claims. Role: close the causal chain without a fake result. Evidence: §29. Seen: a short list. Interaction: none. Annotation: target versus unknown. Handoff: the boundary.

**12 Reflection.** Purpose: what was left with the model and with the planner. Role: judgement. Evidence: the absence of an algorithm in the design material, requirement 9's missing screen, the manual-workflow gap. Seen: prose. Interaction: none. Annotation: inference, where the reflection judges. Handoff: end.

Content objects a later phase would need, described here so they are not invented ad hoc:

- Section records: id, kicker, statement, body, evidence labels.
- Scenario records: id, planner sentence, signal status (documented trigger / open / not a documented trigger), illustrative series.
- Simulation steps: id, clock, system state, whether a banner exists, sentence.
- Shell copy: the two announcement sentences and the action labels, in the product's documented wording.
- One dataset: day, zone, queues, intervals, previous and new forecast, one playable issue, the matching schedule period.
- Strings for "reconstruction," "illustrative," and the unconfirmed-parameter note.

English first. Portuguese, when written, follows the site's existing copy rules (European Portuguese, the site's orthography conventions, no em dash). That writing is not this phase.

---

## 37. Visitor journey

| Section | Knows before | Sees | Does | Learns | Question it creates | Answered by |
|---|---|---|---|---|---|---|
| 01 | Nothing. | Thesis, meta. | Reads. | This is about an unsolicited change to a forecast, not about a feature tour. | What is the forecast doing in this job? | 02 |
| 02 | The thesis. | Plan to staff to three surfaces. | Reads. | The number is a staffing input. | What breaks it during the day? | 03 |
| 03 | The plan's role. | Three situations. | Picks one. | Only one of the three is a signal the issues log shows. | What was the team actually asked to build? | 04 |
| 04 | The day is messy. | The ticket, including its doubt and its target. | Opens the constraint list. | The system must be conditional, same-day, and mostly not configured. | How can a check be that careful and the UI still be one switch? | 05 |
| 05 | The constraints. | Quiet checks, then one run. | Steps. | Looking is not rewriting. The rules never needed to be on screen. | What, then, is the design problem? | 06 |
| 06 | The mechanism. | Three questions. | Reads. | Allow it, announce it, explain it. | What did they allow the customer to set? | 07 |
| 07 | The questions. | The form. | Toggles the one control. | Setup is the queue, not the model, and the requirements had postponed even that. | If it is on, how does a planner who is not watching get told? | 08 |
| 08 | The switch. | The shell. | Changes page, then advances the run. | The announcement travels. The healthy system stays quiet. | Once told, how do they judge the new numbers and find the hour? | 09 |
| 09 | The announcement. | Dotted previous line, one issue, one band on two surfaces. | Toggles, then follows. | The path ends at the period, not at a recommended roster. | Was this watched with anyone, and what came of it? | 10 |
| 10 | The path. | A short account. | Reads. | Prototype and customer access are real as context. Results are not in the file. | What is it fair to say happened? | 11 |
| 11 | The gap. | Design outcome, target, unknowns. | Reads. | The work specified a behaviour. It did not prove a metric. | What did design refuse? | 12 |
| 12 | The outcome. | The boundary. | Reads. | The algorithm and the staffing move stayed outside the design, on purpose or by the edge of the material. | — | — |

---

## 38. Open questions

For the designer. Do not answer them inside the case study with a plausible guess.

1. Did the feature ship? To the flag only, or with the queue switch?
2. Was intraday accuracy measured against the baseline, and what happened relative to the 10% target?
3. Which threshold method was real, if either, and may it be described in public?
4. Were the two-a-day cap and the one-hour gap final?
5. Were the page-4 scenarios from the customer conversations? What was the format, and were there notes?
6. Is "three companies" the right public level of detail, or only "customer companies"?
7. Was a manual "run now" designed and cut, or never drawn?
8. Can handle time or absence trigger a run, or only contact volume?
9. What does Preview show? What does Check insights do beyond opening Insights?
10. What did the schedule show after the simulation?
11. Is the issue count historical, and can it appear during "in progress"?
12. How is severity calculated?
13. Was there an in-app-only notification, or also email or push?
14. What changed after prototype feedback? If nothing was recorded, say so and stop asking the page to imply iterations.
15. Should the public voice be impersonal (this audit's default) or first person? The site's studio copy avoids first person. A case study may differ. Unresolved.
16. Is Portuguese required at launch of the page, or English first?

---

## 39. Keep, rewrite, move, merge, remove, missing

### Keep

- The user story and the requirements note, including the doubt.
- Three scenarios, with the signal split.
- The check-versus-run distinction, stripped of unconfirmed formulas.
- The switch, the helper sentence, the two announcement sentences, the three surfaces, Apply filter, the previous-forecast control, the issue description pattern, the period mark.
- The high-fidelity rationale, relocated.
- The designer's context about time and customer companies, labelled.
- Anonymity. Purple, lilac, cream as editorial colour only.

### Rewrite

- Page 2's "continuous" and "24/7" language.
- Page 9, from a dense poster into a stepped explanation.
- Page 10, from a branded screenshot into a reconstruction that includes the requirements conflict.
- Pages 11–15, from a sequence of screenshots into one state model.
- Pages 16–19, from benefit bullets into comparison plus one path.
- Any caption that predicts future anomalies or promises better staffing as a result.

### Move

- High-fidelity process note from the notification slide to validation.
- The 10% line from nowhere (it is absent in the PDF) into the brief and the outcome, as a target.
- Low-volume exclusion from the requirements into the system section. The PDF omitted it.

### Merge

- Pages 12, 13 and 14 into Decision 2.
- Pages 16 and 17 into the comparison.
- Pages 18 and 19 into the issue path.
- Coaching, hiring, training and cross-department moves into the capacity scenario.

### Remove

- Kano, value proposition canvas, empathy map.
- Decorative section openers and the illustration pages.
- Thank-you slide with personal phone details.
- Employer identity, logos, chrome, internal ids, prototype dates, placeholder 20/20/20.
- "More data is never a downside" and the pattern-prediction bullets.
- Push notifications and the undocumented manual workflow, as claims.
- A second banner vocabulary ("surge") unless a future look at the source file proves it was a real, final string. It is not the wording to design around.

### Missing, and must be added because the sources support it

- The explicit statement that a quiet check has no UI.
- The conflict between "no configuration" and the switch.
- The baseline as the reason a previous forecast can exist (inference, labelled).
- The boundary: design stops at the period; the simulation's schedule result is unknown.
- The metric discipline around 10%.
- A single coherent illustrative day, labelled.
- Evidence labels on the few claims that would otherwise be misread.
- The list of what was not validated.

### Missing, and must stay missing

- Quotes, counts, success rates, time saved, adoption, a severity formula, a threshold formula, a recommended staffing action, iterations nobody wrote down.

---

## 40. Final three-decision model

### Decision 1

| | |
|---|---|
| Problem | Automatic replacement of the plan is not wanted by every customer, and the rules are not a form. |
| Evidence | Requirements note, requirements 5–6, speech slide 10, PDF page 10. |
| Design question | What may the customer decide? |
| Decision | On or off, per queue, in the existing queue settings. No detection settings. |
| Trade-off | Less than the research question implied (no on-demand run). More than the launch requirement allowed (a customer control). Status of the compromise is unknown. |
| Product behaviour | "Turn on reforecast." If enabled, the system will reforecast this queue. |
| User consequence | Allowing it means the day's forecast for that queue can change without a further request. |
| Validation | Not recorded. |
| Portfolio interaction | Reconstructed form, one working control. |
| Classification | Design decision, in tension with a requirement. |

### Decision 2

| | |
|---|---|
| Problem | The new numbers land on three surfaces. The planner is in one place. A silent rewrite looks like a fault. Monitoring itself should stay quiet. |
| Evidence | Requirement 7, speech slides 11–17, PDF pages 11–15. |
| Design question | When, and where, is a run announced? |
| Decision | Notify and banner at start and at finish, on Forecast, Team schedule and Insights. Offer to filter to affected queues. Do not announce a healthy check. |
| Trade-off | Two channels can still be missed. No documented out-of-product channel. |
| Product behaviour | The two documented sentences. Preview exists; its body is not specified. |
| User consequence | They can be in the schedule and still learn that the plan is being replaced. |
| Validation | Not recorded. The rationale is a design argument. |
| Portfolio interaction | Neutral shell, surface switch, state advance. |
| Classification | Design decision, required by where requirement 7 puts the data. |

### Decision 3

| | |
|---|---|
| Problem | A replaced forecast hides its own size and its location. |
| Evidence | Requirements 7–8, speech slides 18–20, PDF pages 16–19. |
| Design question | What can the planner inspect before they touch the roster? |
| Decision | Previous against new; an issues log with a volume description; the same period marked on the forecast and the schedule. |
| Trade-off | The path does not choose the staffing action. The simulation that might have updated the roster is not shown. |
| Product behaviour | Toggle, issue row, Check forecast, highlight, schedule. |
| User consequence | They can see what changed and start from the right hour. |
| Validation | Not recorded. Speculative benefits about prediction are excluded. |
| Portfolio interaction | Toggle and a single-issue path on one illustrative day. |
| Classification | Design decision. The link to the baseline is inference. |

---

## 41. One-paragraph narrative test

A resource planner staffs the day from a forecast. The day leaves that forecast: volume, handle time, or the people who were supposed to be there. The system watches the gap between forecast and actuals through the day and, only when the gap is large enough for long enough, replaces the rest of the day's forecast with a new one and keeps the original so the two can be compared. The planner did not ask for that replacement and may be looking at the schedule or at Insights when it happens, so the work was to make three things true: a customer can allow it per queue without being handed the model's rules; a run announces itself in the notification centre and on the pages where the numbers actually sit, and a mere check announces nothing; afterwards the planner can put the new forecast against the previous one, open the issue, and land on the same period in the forecast and in the schedule. That path was drawn in a high-fidelity prototype and taken to customer companies under a short timeline. What those conversations changed, whether the accuracy target of 10% was met, and whether the feature shipped, is not in the record. What the work specified is the path from an unsolicited change to a period a planner can act on.

The paragraph holds. It does not depend on a canvas, a logo, or a result that was never measured. It is fit to govern the next phase.

---

## 42. Final recommendations

1. Build the case study on §17 and §40. Do not build it on the PDF's slide order, and do not build it on another project's case study.
2. Make §8 the editorial standard for every sentence about time. If a sentence cannot survive "is this a check or a reforecast?", cut it.
3. Keep the 10% figure only in the wording of §29.
4. Treat volume as the only documented detection example. Label handle time and capacity inside the scenario interaction.
5. Show the requirements conflict on the switch. Hiding it would make the case study neater than the project.
6. Reconstruct the UI. Label it. Keep purple out of the frame.
7. Use one illustrative day. Label every number.
8. Say the validation as §28 says it. Do not commission fictional quotes to fill the hole.
9. Leave these out: ChatGPT canvases, 24/7, push, manual workflow, pattern prediction, employer identity, internal names, prototype dates, severity formulas, threshold formulas, the multiplication factor.
10. Do not implement from this document, and do not implement from the existing Phase 2 specification, until that specification has been rewritten against this audit and explicitly approved.

Next phase, when approved, is a content and interaction specification that inherits §§17–27 and §36. It is not a page build. It is not a licence to invent the open questions in §38.

---

## PHASE 1 STATUS

`READY FOR REVIEW`

No application code, routes, components, styles, or assets were changed by this document.
