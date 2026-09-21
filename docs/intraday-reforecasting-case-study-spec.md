# Intraday Reforecasting: experience specification

Phase 2. Experience specification only. No page, route, component, style or asset is authorised by this document.

This specification replaces the earlier draft on this branch. It follows `docs/intraday-reforecasting-case-study-audit.md`. Where this file and that draft disagree, this file wins. Where this file and the audit disagree, the audit wins and the conflict should be raised, not smoothed over.

Status: ready for review. Not ready to build.

---

## Phase 2 purpose

The audit established what the project was, which decisions are real, and which claims are not. This document turns that into a page a visitor can move through.

The page has to do two things at once. It tells the story in order. It also lets the visitor operate the distinction the story depends on: a check is not a reforecast, a banner is not a model, a new number is not yet an explanation.

The visitor should finish knowing what the planner was trying to staff, why most checks stay silent, what a reforecast changes, why that change is a design problem, what the three decisions do about it, and what was never shown.

---

## Source hierarchy

Use the audit's hierarchy without promotion.

| Level | Use in this specification |
|---|---|
| Requirements | What the product was required to do. They win on behaviour. |
| Speech and the 20-page PDF | What the design presented. They can show a decision the requirements had deferred. They do not override an acceptance criterion. |
| Figma prototype | Not opened. Nothing here depends on having opened it. |
| Designer-provided context | Short timeline. Feedback sought by working directly with customer companies. A prior note said three companies. No names, counts, quotes or outcomes. Stays context. |
| Portfolio code | Nudica, the existing type scale, measure, focus rule, reduced motion, 44px targets, bilingual site. Integration facts only. Not a story to copy. |
| Inference | The thesis, the link from the stored baseline to the comparison control, and the judgement that design stopped at the period. Labelled as inference. |

Contradictions the audit left open stay open. They are listed again in Open questions. This specification does not pick a winner.

No other case study is a source for structure, tone, interaction, colour or content shape.

---

## Evidence rules

Public labels, used only where a reader could otherwise mistake the kind of statement:

| Category | Public label | Rule on this page |
|---|---|---|
| Fact | Unlabelled | Stated in the requirements, speech or PDF. |
| Research | Research | Not used. Nothing on the page qualifies. |
| Requirement | Requirement | Acceptance criteria, including the 10% line as a target. |
| Design decision | Design decision | The switch, the announcement, the comparison, the issue path. |
| Designer-provided context | Context | Time pressure and customer-company access. |
| Inference | Inference | Thesis, and the reading that comparison is possible because the baseline is kept. |
| Reconstruction | Reconstruction | The neutral product frame. |
| Exploration | Exploration | The scenario control and the check-versus-run steps. |
| Fictional / illustrative | Illustrative | Every number, name, date and queue on the page. |

The thesis is not a quote. Do not put it in quotation marks. Do not attribute it to a planner, a customer or a stakeholder.

Do not write research findings, participant counts, preference, shipping, adoption, time saved, or a measured accuracy change.

The frame sentence appears once, on the first reconstructed product surface (Decision 1), and is not repeated on every screen:

"Reconstruction. The interaction follows the prototype. The interface is not a historical screenshot, and the data is illustrative."

Later reconstructions are marked only by the small Reconstruction label.

---

## Core narrative

A resource planner staffs the day from a forecast.

The day can leave that forecast. Volume, handle time, or the people on the floor.

The system watches forecast against actuals. Most checks do not become a reforecast. A reforecast runs only when the conditions in the requirements are met, and several of those conditions were never given numbers.

When a reforecast runs, the forecast the planner is staffing from changes. The planner may not have asked, and may be on another page.

The design problem is not how to fire the model. It is how to let a customer allow the behaviour for a queue, how to make the change visible where the numbers already are, and how to make the new forecast comparable and locatable, without handing the customer the detection rules.

That sequence is the page order. It is an interpretation. It is not a sentence from the project.

---

## Design thesis

Working thesis, for the argument of the page, not for the cover in full:

The system could decide, on its own, to replace the day's forecast. The design's job was to let that happen only where a customer had allowed it for a queue, to make the replacement reach the planner in the place they were already working, and to make the new forecast inspectable against the one it replaced, down to the period they would have to staff. The customer was not asked to configure the detection.

Cover and section openings use the short form:

The forecast could change without the planner asking. The work was to make that change allowed, visible and inspectable, without turning the model's rules into settings.

Classification: Inference.

The long form is the test the three decisions have to pass. If a block does not serve "allowed", "visible" or "inspectable", it does not belong.

---

## Experience architecture

Twelve sections, one page, one order. Weight sits on 05, 08 and 09. Cover, tensions, validation, outcome and reflection stay short.

| # | Section | Length | Interaction | Weight |
|---|---|---|---|---|
| 01 | Cover | One screen | None | Low |
| 02 | The plan | Short | None | Low |
| 03 | The day diverges | One screen | Scenario selector | Medium |
| 04 | The brief | Short, denser | Constraint list opens in place | Low |
| 05 | What the system had to understand | Long | Check versus reforecast | High |
| 06 | Three design tensions | Short | None | Low |
| 07 | Allow the change without configuring the model | Medium | One switch | Medium |
| 08 | Make the change reach the planner | Long | Shell: surface and state | High |
| 09 | Make the change inspectable | Long | Comparison, then issue path | High |
| 10 | Validation | Short | None | Low |
| 11 | Outcome | Short | None | Low |
| 12 | Reflection | A few sentences | None | Low |

The page is one story. Sections are not cards. There is no grid of equal modules.

A text list of the twelve sections sits under the cover as plain links. It is not sticky. Reason: the order is the argument. A bar that stays on screen invites skipping from the cover to a screen. Anchors exist so someone can return.

Nothing advances because the visitor scrolled. Each demonstration starts in its own initial state. Turning the switch in section 07 does not arm section 08. Reason: the page is an explanation, not a product session to complete.

---

## Visitor journey

| After this section | The visitor should be able to say |
|---|---|
| 01 | The problem is an unsolicited change to a forecast, not a tour of a feature. |
| 02 | The forecast is what the planner staffs from, for the rest of today. |
| 03 | Volume, handle time and capacity all unset the plan. Only volume is a signal the issues log shows. |
| 04 | The brief is conditional, same-day, mostly not configured, and it includes an accuracy target that is not a result. |
| 05 | A check can pass without a new forecast. I have seen a quiet check. |
| 06 | The design had to answer three questions: allow it, announce it, explain it. |
| 07 | The customer was shown one queue switch. The requirements had said no customer configuration at launch. Shipping is unknown. |
| 08 | The same run is announced on Forecast, Team schedule and Insights. A check is not announced. |
| 09 | I can see what the new forecast replaced, and I can land on one period in the forecast and in the schedule. The page does not staff the queue for me. |
| 10 | A high-fidelity prototype was used, and customer companies were involved. Results were not written down. |
| 11 | What was specified is a path. What was measured is nothing we can state. |
| 12 | The model and the staffing move stayed outside the design. |

---

## Section specifications

Each section states purpose, the visitor's question, the message, the evidence, what is seen, what is done, what should be understood, and the transition. Copy below is the page copy. It is not a slogan deck.

### 01. Cover

Purpose. Open on the problem, and state the anonymous frame.

Visitor question. What is this about, before any screen?

Key message. The forecast could change without the planner asking. The work was to make that change allowed, visible and inspectable, without turning the model's rules into settings.

Evidence. None historical. The sentence is Inference. The meta is Fact of the project dates and role, with the employer removed.

What the visitor sees.

- Small line, label size: "Product design, Q2 2023"
- The short thesis, display size, italic, not in quotes.
- The name "Intraday Reforecasting", heading size, under the thesis.
- "Workforce management for contact centres."
- "The company is not named. Product screens on this page are reconstructions. Numbers are illustrative."
- A single row of the labels this page actually uses: Requirement, Design decision, Context, Inference, Reconstruction, Exploration, Illustrative.

Hierarchy, and why. The thesis is the largest text because the name alone does not tell the visitor what was difficult. The name is still immediate, one step down, so the page is findable. Meta is small because it is frame, not argument. Labels are present once, here, so later chips do not need a legend repeated in every section.

What the visitor does. Nothing, except follow a section link if they insist. The intended move is to read on.

Understood afterwards. This will be about an unsolicited change, and the screens will not be the original product.

Transition. "That change only matters if the forecast is what the day is staffed from."

### 02. The plan

Purpose. Give the forecast a job, before any anomaly.

Visitor question. What is the planner looking at in the morning?

Key message. The forecast is the staffing input for the rest of the day. It is not a record of what happened.

Evidence. Requirement: same day, account time zone. Requirement: the forecast is what later gets replaced on the forecast, the schedule and Insights. Inference, one sentence: if the morning line stays up after the day has moved, the planner is staffing from the wrong picture.

What the visitor sees.

A narrow column of prose, then a quiet day chart of the illustrative forecast only. No actuals, no second line, no banner, no product chrome.

Copy:

"A resource planner staffs today from a forecast. The day is the account's day, in the account's time zone. The line is the plan for how much work is coming, and for how many people that work needs."

"Three places in the product carry that plan: Forecast, Team schedule, and Insights. Reporting receives it too. Those are the places a later change would show up."

Chart title: "Planned contacts, Support, 6 June 2023." Caption: "Illustrative. Hourly totals are the sum of the quarter-hours in the dataset."

No control. A scrubber would imply the visitor is running the day. They are not. The day has not diverged yet.

Understood afterwards. The line is a plan. It will be the thing that gets replaced.

Transition. "The plan holds only while the day agrees with it."

### 03. The day diverges

Purpose. Show three documented situations, and the limit of what the system is shown to watch.

Visitor question. What leaves the plan, and which of those departures can the system see?

Key message. Volume, handle time and capacity all unset a morning forecast. The issues log describes contact volume against the forecast. Handle time and absence are planner situations. They are not documented as triggers.

Evidence. Speech and PDF page 4 for the situations. Speech slide 5 for the three factors. PDF issues table for the volume description pattern. Classification of the sentences: Fact of the presentation. Classification of "interviews": not used as a method.

What the visitor sees. Three options. The volume option draws the actuals for 10:00 to 11:00 on the same plan from section 02. The other two options do not draw a detection.

What the visitor does. Chooses one situation. See Interaction 1.

Understood afterwards. The operational problem is wider than the sensor.

Transition. "The brief did not ask the design to solve every one of these by detection. It asked for a conditional update to today's forecast."

### 04. The brief

Purpose. Turn the requirements into the constraints the design had to live with, including the conflict and the target.

Visitor question. What was actually required?

Key message. Same day. A check through the day. A reforecast only when the gap qualifies. The customer does not configure the detection. The presented design later shows a queue switch anyway. A 10% accuracy gain is a target.

Evidence. Requirements, including the note. Label: Requirement. The switch is not introduced as a fact here. It is named as a conflict that section 07 will show.

What the visitor sees.

The user story, set as a short statement, not as a ticket dump:

"As a resource planner, I want to update my forecast based on unexpected changes, so that I can make informed staffing decisions."

Then the note, compressed but not softened:

"The requirements treat this as mitigation. Not every customer wants it every day. They also say research was still needed on a choice the page does not pretend was settled: automate it per queue, or let someone decide when to run it."

Then a list, collapsed to six lines, each expandable to one sentence. Collapsed lines:

- Same day, in the account time zone.
- Check through the day, at least every 30 minutes. A check is not a new forecast.
- Run a reforecast only when real values diverge from the forecast, over several periods, and not on a low-volume queue. The threshold, the period count and the volume cutoff were left undefined.
- Use a different method from the ordinary forecast. Keep the original as a baseline.
- Put the new forecast on Forecast, the schedule and Insights, and send it to reporting. Trigger a scheduling simulation. The simulation's result is not in the design material.
- No customer configuration of the detection at launch. A flag for selected customers. Self-serve later.

The 10% line is not in that list. It sits apart, in the target treatment defined under Outcome and the 10 percent target:

"Target, not a result. The brief asked for a 10% improvement in intraday accuracy over the original forecast. Nothing in the material shows that this was measured."

Label on that block: Requirement.

What the visitor does. Opens a constraint if they want the sentence. The list must stay a list. It must not become a second essay.

Understood afterwards. The design was not free to draw a settings page for the model, and it was also not looking at a measured success.

Transition. "Those rules only work if a check can happen and nothing on screen changes."

Split the brief also names, in the expandable sentences, not as four headings:

- What the product had to do: the list above.
- What the planner had to understand: that the numbers can change without a request, which queue, whether a run is still going, how large the change is, and which period.
- What design could shape: the queue control that was presented, the announcement, the comparison, the path to a period.
- What was outside design: the forecasting method, the threshold mathematics, the scheduling engine.

### 05. What the system had to understand

Purpose. Make the visitor feel a silent check before they ever see a banner.

Visitor question. When does watching become a new forecast?

Key message. The system checks during the day, on the order of every 30 minutes, whether recent actuals have pulled away from the forecast. A reforecast is a separate event. It does not run because a check ran. It runs when the documented conditions are met. Several of those conditions have no published number.

Evidence. Requirements for the check cadence, the conditional run, several periods, low volume, the undefined threshold. Speech and PDF for the idea of a quiet mechanism. The clock times in the demonstration are Illustrative. The steps are Exploration.

What the visitor sees. A stepped day. The current step is a sentence, a state name, and the relevant quarter-hours. No product banner until the step that is a reforecast. See Interaction 2.

What the visitor does. Moves forward and back. Cannot autoplay.

Understood afterwards. Silence is a state, not a missing screen. The model stayed internal, which is why the next question is about design rather than about formulas.

One standing sentence beside the steps, labelled Inference:

"The designer did not design the algorithm. The designer designed which of these states a planner can see."

Do not show the eight-week calculation, a multiplier, a twice-a-day cap, or a one-hour gap. They are not requirements. They are omitted, not hidden behind a toggle.

Low volume is one line under the steps, not a control: "Low-volume queues are excluded. The cutoff was not defined."

Transition. "Once a check can change the plan without being asked, three questions follow."

### 06. Three design tensions

Purpose. Name the questions. Do not answer them yet.

Visitor question. What was hard, if the model is not the design?

Key message. Allow it without exposing the model. Stay quiet until the plan actually changes. When it changes, a new number is not an explanation.

Evidence. The three tensions in the audit. No new evidence. No research finding.

What the visitor sees. Three short blocks, type only, no cards, no icons.

Copy for the three questions, in order:

"If the system can replace the forecast, what is the customer allowed to decide?"

"A check should not interrupt anyone. A reforecast rewrites the plan. How does that rewrite reach a planner who is not watching the forecast?"

"The new number is now the forecast. How does the planner see what it replaced, and where on the day to look?"

What the visitor does. Reads.

Understood afterwards. The next three sections are those questions, one each.

Transition. "The presented answer to the first question is a single control, and it does not match the launch requirement."

### 07. Decision 1. Allow the change without configuring the model

Purpose. Show the one customer control, the things that were not added, and the requirements conflict.

Visitor question. What does the customer set?

Key message. The presented design adds "Turn on reforecast" to the queue, and no detection settings. The requirements said the customer would have no configuration at launch. This page does not say the switch shipped.

Evidence. PDF page 10 and speech slide 10 for the control and the helper. Requirements 5 and 6 for the conflict. Label on the decision: Design decision. Label on the conflict: Requirement.

What the visitor sees. The reconstructed queue form. See Interaction 3 in the decision sense, specified as Interaction "Switch" under Interaction specifications. The five numbered interactions are the ones in the next chapter. This section uses the switch demonstration.

What the visitor does. Turns the switch on and off. Nothing else on the form operates.

Understood afterwards. Setup is the queue, not the model. The compromise with the requirements is unresolved.

Transition. "If that switch is on, the planner can still be somewhere else when the forecast changes."

### 08. Decision 2. Make the change reach the planner

Purpose. Put the same run on three surfaces, and keep checks silent.

Visitor question. What appears, and where, when a reforecast starts and when it finishes?

Key message. The state is one. The explanation sits on Forecast, Team schedule and Insights, and in the notification centre. A periodic check adds nothing to those places.

Evidence. Requirement 7 for why those surfaces. Speech and PDF for the two sentences and the banner actions. Preview's body is not documented.

What the visitor sees. The neutral shell. See Interaction 3.

What the visitor does. Changes surface. Advances the run from watching, to in progress, to updated. Applies the affected-queue confirmation. Does not open a fictional Preview panel.

Understood afterwards. Announcing the change is not the same as explaining it.

Transition. "The banner says the forecast changed. It does not show what the previous line was, or which hour to staff."

### 09. Decision 3. Make the change inspectable

Purpose. Give the visitor the comparison and the path to one period.

Visitor question. How does someone judge the change and find the period?

Key message. Previous against current, then one issue, then the same 10:00 to 11:00 period on the forecast and on the schedule. Staffing stays with the planner. The scheduling simulation is not shown.

Evidence. Requirements 7 and 8. Speech slides 18 to 20. PDF pages 16 to 19. The link "comparison exists because the baseline is kept" is Inference, one sentence, not the headline.

What the visitor sees. The chart with the toggle, then the issue, then the schedule band. See Interactions 4 and 5.

What the visitor does. Shows the previous forecast. Follows the issue to the chart, then to the schedule.

Understood afterwards. The path ends at a period. It does not produce a roster recommendation.

Transition. "That path was drawn in a prototype. What happened when people saw it is a thinner record."

### 10. Validation

Purpose. Say what is known about feedback without building a research chapter.

Visitor question. Was this watched with anyone, and what changed?

Key message. High-fidelity prototypes were used because the timeline was short. The designer has said the team worked directly with customer companies. What was said, and what changed afterwards, is not documented.

Evidence. Speech and PDF page 11 for the prototype. Context for the companies. Do not say three companies validated anything. Do not say interviews as a method.

What the visitor sees. Prose only. Specified under Validation below.

What the visitor does. Reads.

Understood afterwards. Absence of a metric is part of the account, not a gap the page papers over.

Transition. "What can be said about the outcome is the path itself."

### 11. Outcome

Purpose. Separate the design outcome from everything that was not measured.

Visitor question. What is it fair to say this work did?

Key message. The work specifies how an unsolicited reforecast becomes a period on the schedule, with one queue control and without detection settings. It does not show a measured change in accuracy, a launch, or a staffing result.

Evidence. The decisions above. The 10% line as Requirement, repeated in the target treatment, not as a new claim.

What the visitor sees. The outcome block specified under Outcome.

What the visitor does. Reads.

Understood afterwards. Specified is not the same as proven in production.

Transition. "The boundary of the work is the period, not the roster, and not the model."

### 12. Reflection

Purpose. Mark what design did not take.

Visitor question. What was left outside?

Key message. The algorithm was not the design. The staffing move was not the design. The schedule after the simulation is unknown. A manual "run now" was claimed in the closing slide and is not on a screen.

Evidence. Absence of those screens, plus requirement 9. The judgement is Inference. Keep it short enough that it cannot swell into a second thesis.

Copy:

"The path stops where the material stops. The planner can see that the forecast was replaced, and can find the period. The model that produced the new line was never a screen. Neither was the decision to move a person. The requirements say a reforecast triggers a scheduling simulation. What that did to the roster is not in the prototype. A closing slide says manual and automatic workflows were both designed. No manual control is shown."

What the visitor does. Reads. The page ends.

---

## Interaction specifications

Five interactions. No others. Analytics are out of scope.

Shared rules:

- The visitor starts each interaction. Nothing autoplays. Scroll does not advance a step.
- One polite live region for the whole page. It announces the sentence of the new state after a control activates. It does not announce focus alone, and it does not announce every keypress.
- Controls are native buttons, a switch, or a radiogroup. Not divs with click handlers.
- Charts and steps have a text equivalent in the same view, not behind a hover.
- Reduced motion: state changes are instant. No translation, no fade longer than a frame. The text is already the explanation.
- Keyboard: every control is in tab order. Arrow keys move inside a radiogroup. Escape closes the notification panel if it is open, and returns focus to the control that opened it.
- Focus is a 2px outline, offset 2px. On light surfaces, the outline is ink. On a purple editorial field, the outline is cream. Do not use the site yellow as a focus ring on a light field. The site's dark theme may keep its existing yellow ring on the dark page chrome. The product frame stays light in both themes, so its focus ring stays ink.
- Touch targets are at least 44px. Hover reveals nothing that is required.
- Desktop is the wide measure, 1080px, for sections 05, 07, 08 and 09. Narrative sections stay on the 720px measure, body line length 66ch.
- Mobile keeps the same controls. Layout changes are under Responsive behaviour.

### Interaction 1. Operational scenario

Purpose. Show that three real situations do not imply three detectors.

User intent. "What happens in this kind of day, and does the system see it?"

Initial state. Volume selected. The plan line from section 02 is visible. Actuals for 10:00 to 11:00 are drawn. The other hours have no actuals.

Available actions. Choose Volume, Handle time, or Capacity. One at a time.

State changes.

| Choice | What changes on the figure | What does not change |
|---|---|---|
| Volume | Actuals appear for 10:00, 10:15, 10:30 and 10:45. | The forecast line. The clock. No banner. |
| Handle time | The chart returns to forecast only. A note replaces the actuals. | No second metric is plotted. No banner. |
| Capacity | The chart returns to forecast only. The absence note replaces the actuals. | No headcount hole is drawn as a detection. No banner. |

Copy.

Volume, beside the chart: "Between 10:00 and 11:00, illustrative actuals sit about 30% above the forecast. The issues log in the prototype described this kind of gap: contact volume higher than forecast for consecutive periods. The 30% is not a threshold. The threshold was never defined."

Handle time: "Planners asked what a rise in handle time would do to the rest of the day. That question is documented. A detector that watches handle time is not."

Capacity: "One documented situation: about 100 hours lost to absence, the first shift calling in sick, at 9:00, and a need to see the rest of the day. The planner already knows. Nothing in the material shows the detector reading absenteeism."

The 100 hours and 9:00 are from the speech. They are not events in the illustrative dataset. Do not plot them on 6 June.

Data. Volume uses the dataset. The other two use sentences only.

Hierarchy. The planner sentence first. The "signal" or "not a documented trigger" line second, in the same view, not in a footnote. The chart is third, and only for volume.

Animation. The actuals series appears or leaves. 160ms. Reduced motion: instant.

Keyboard. Radiogroup, name "What changed in the day". Arrow keys select. The live region reads the note, not the whole table.

Screen reader. The chart, when present, is summarised by the volume sentence. A table of the four actuals sits under the chart, not as the only access.

Touch. The three options are a full-width stack above the note.

Responsive. Below 720px the chart follows the note. If the note already carries the lesson, the chart remains, because the visitor was promised the gap is visible. It does not shrink into an unlabelled sparkline. Minimum chart height 180px.

Unavailable. None. All three choices are available. Handle time and capacity are not errors. They are the point.

Heuristic that mattered. Match between system and the real world: the control is the situation, and the feedback refuses to pretend the system noticed all three. Error prevention: the note stops a false belief. Recognition: the selected situation stays visible as a pressed option, not as a remembered choice.

### Interaction 2. Detection versus reforecast

Purpose. Separate a check, a deviation, a qualifying gap, a run, and a completed update.

User intent. "Did this check change the forecast?"

Initial state. Step "09:30 check". State name Watching. No banner.

Available actions. Back and Next. Back is unavailable on the first step. Next is unavailable on the last step. The step list is also directly selectable, so the visitor is not trapped in sequence. Selecting a step is the same as arriving there with Next.

Steps.

| Step | Clock in the illustration | Entry | What the visitor sees | What changes | What does not | Exit |
|---|---|---|---|---|---|---|
| 1 | 09:30 check | Start | Recent quarter-hours sit close to the forecast. Sentence: "A check. No reforecast." | Nothing on a product banner, because there is no banner yet. | The forecast line. | Next, or pick step 2. |
| 2 | 10:30 check | A check where the gap has begun | 10:00 and 10:15 are above the forecast. 09:30 and 09:45 are not. Sentence: "The gap has started. It has not held over several periods. Still no reforecast." State name: Deviation. | The elevated quarters are marked. | No banner. The forecast is not replaced. | Next or back. |
| 3 | 11:00 check | Several elevated quarters have accumulated | 10:00 through 10:45 are all above the forecast. Sentence: "Several periods are now above the forecast. The requirements also require a threshold and enough volume, and they exclude low-volume queues. Those figures were not defined. This illustration continues as if the gap qualifies." State name: Qualifying gap. | The four quarters marked as the affected period. | Still no banner. Still the original forecast as the working line. | Next or back. |
| 4 | Reforecast in progress | The qualifying check is followed by a run | The product sentences appear, outside a branded chrome, as a plain status: "Anomaly detected. Reforecast in progress in the affected queues." The working line is still the previous forecast. Sentence under it: "Until the run finishes, this demonstration keeps the previous line. The exact moment the numbers swap was not documented." | Status text. | The line. No progress percent. No hourglass. | Next or back. |
| 5 | Forecast updated | The run completes | Status: "Reforecast completed. Check updated data to solve possible issues." The new line is drawn from 11:00 onward. The previous line remains visible here, so the replacement can be seen once. Sentence: "The new line is the forecast from 11:00 on. It is raised by 20 contacts in each quarter-hour, about the extra volume in the affected period. That is a drawing choice. It is not the forecasting method." | The series from 11:00. | Actuals, which stop at 10:45. Past forecast values. | Back, or pick another step. |

Do not call step 3 an "anomaly" in the system-logic sense until step 4. The interface word "Anomaly detected" belongs to the announcement, which starts at step 4. Using it earlier teaches the wrong lesson.

The four quarters illustrate the requirements' example of several 15-minute periods. Copy must not say "the rule is four periods." The requirements left the count open and gave four as an example.

Animation. The current step's marker moves. 160ms. The series at step 5 draws in 160ms. Reduced motion: the new step is simply the current step, no movement.

Keyboard. Back and Next are buttons. The five steps are a radiogroup "Checks and the reforecast" so a screen reader user can jump. Focus stays on the control that was used.

Screen reader. Live region announces the step sentence. The quarter-hour table for the current step is in the page, with columns Time, Forecast, Actual.

Touch. Next and Back are persistent under the sentence, full width, 44px. The step radiogroup wraps.

Responsive. The horizontal strip of quarters becomes a vertical list under 720px. The current step is expanded. Earlier steps stay as one line each, so the quiet checks remain visible.

Error / unavailable. Back and Next disable at the ends, with aria-disabled and a visible end state, not a silent click.

Heuristic that mattered. Visibility of system status: the sentence names check or reforecast. User control: back, and direct step selection. Consistency: the same sentences return in section 08, where they sit in a product frame. Aesthetic and minimalist: no formula, no cap, no multiplier.

### Interaction 3. The same event on three surfaces

Purpose. Show that the run is announced where the numbers live, and that a check is not.

User intent. "If I am on the schedule, do I still hear about this?"

Initial state. Surface: Forecast. System state: Watching. Notification panel closed. Filter off. The queue switch is not consulted. A line above the frame says: "This demonstration assumes the queue is allowed to reforecast."

Available actions.

- Surface: Forecast, Team schedule, Insights.
- State: Watching, In progress, Updated.
- Notifications: open and close the panel.
- Apply filter: a toggle.
- Preview: present and disabled.
- Check insights: only on the Insights banner, and it selects the Insights surface. It does nothing else.

State changes.

| System state | Notification panel | Banner | Numbers on Forecast |
|---|---|---|---|
| Watching | "No reforecast to report." | None. | Previous forecast only. |
| In progress | "Anomaly detected. Reforecast in progress in the affected queues." | The same sentence. Actions: Apply filter, Preview. On Insights, also Check insights. | Still the previous forecast. |
| Updated | The completed sentence first, the in-progress sentence kept under it as the earlier notice. | "Reforecast completed. Check updated data to solve possible issues." | New forecast from 11:00, previous hidden. Comparison is section 09, not this one. |

Changing surface does not change the system state. Changing state does not change the surface. That split is the lesson. A one-line status above the frame always reads the state in words: "Watching. No announcement." or "Reforecast in progress." or "Forecast updated."

Apply filter, on. A line in the banner: "Affected queue: Support." If the nameless second row "Orders" is visible in the frame's queue list, it hides. Orders has no numbers. See the dataset rules.

Apply filter, off. Orders returns as a name with the text "No numbers. Not part of this day."

Preview. Disabled. Adjacent text, always visible, not a tooltip: "What Preview showed is not documented."

Check insights. Selects Insights. The live region says "Insights." It does not load a chart.

Affected queue. Support. Orders exists only as a filter contrast, with no series.

Hierarchy inside the frame. Banner first, under the surface name. Then the surface content. Notification is a panel, not a second banner.

Copy is the documented sentences. Do not rewrite them into friendlier marketing lines.

Animation. Surface swap is instant even with motion on, so the banner is seen to persist. State change replaces the banner text in 160ms. Reduced motion: instant text.

Keyboard. Two radiogroups: "Surface" and "Forecast state". Apply filter is a switch. Notifications is a button. Tab order: state, surface, banner actions, surface content, notifications. Escape closes the panel.

Screen reader. The frame is a region named "Reconstructed product". The live region announces the state sentence when state or filter changes, and the surface name when the surface changes. Do not announce both in full if both change. They cannot change in one action.

Touch. State and surface stack above the frame. Banner actions wrap, 44px.

Responsive. Under 720px there is no miniature app. Order: state control, surface control, banner, then the surface body. Forecast body is the chart at a readable height or its table. Team schedule body is the period text and the people present, not a crushed grid. Insights body is one sentence: "Insights carried the updated forecast with the rest of the account's figures. The charts on that page are not specified."

Desktop. A frame with a top bar: word "Workforce management", the three surfaces, a notifications button. No logo. The bar is neutral, not purple.

Unavailable. Preview. Watching has no banner actions.

Heuristic that mattered. Visibility of status, in words, on every surface. Consistency: one sentence, two channels. Recognition: the planner does not have to remember which page "owns" the event. User control: surface and state are chosen, not played.

### Interaction 4. Previous forecast against the new one

Purpose. Show the size of the replacement.

User intent. "What did this replace?"

Initial state. Current forecast shown. Previous hidden. Toggle off. Affected period 10:00 to 11:00 marked. Actuals visible only inside that period.

Available actions. Switch "Show previous forecast".

State changes. On: the previous series is drawn dotted from 08:00 through 16:45, and the current series stays solid from 11:00. A text line appears: "From 11:00, the illustrated forecast is 20 contacts higher in each quarter-hour than the previous line." Off: the dotted series leaves. The text line leaves. The current line and the period band stay.

What does not change. Actuals. The issue. The period.

Hierarchy. The toggle and the delta sentence sit above the chart. The chart is the picture of a sentence the visitor can already read.

Animation. Dotted series opacity 160ms. Reduced motion: present or absent, no fade.

Keyboard. The switch is a checkbox or switch with the visible name "Show previous forecast". Focus ring ink.

Screen reader. The switch state is announced by the control. The live region repeats the delta sentence when turned on, and "Previous forecast hidden" when turned off. The table under the chart has Time, Previous, Current, Actual. Actual cells after 10:45 are "Not in this illustration" not zero.

Touch. The switch is 44px. No hover-only tooltip on the lines. Selecting a quarter-hour, by click or tap, reveals that column's figures in a text readout under the chart. Keyboard equivalent: the table itself.

Responsive. The delta sentence is above the chart at every width. The chart may scroll horizontally inside a labelled region if the axis labels would otherwise collide. The table is the alternative and is not removed.

Heuristic that mattered. Recognition rather than recall: the previous plan is on the same picture, not in memory. Non-colour encoding is specified under Chart specification.

### Interaction 5. Issue to period to schedule

Purpose. Connect a described gap to one place on the forecast and the same place on the schedule.

User intent. "Where do I look?"

Initial state. One issue visible. Chart visible with the period band. Schedule not yet emphasised. Focus on the issue.

Available actions. "Show on forecast". "Show on schedule".

State changes.

- Show on forecast: the 10:00 to 11:00 band is labelled "Affected period, 10:00 to 11:00" if it was not already, and focus moves to that label. The schedule does not jump yet.
- Show on schedule: the same label and the same times appear on the schedule, and focus moves to the schedule label.

What does not change. The hours. They are 10:00 to 11:00 in the issue, the chart and the schedule. No second issue. No severity badge. No "accept". No recommended move. No before-and-after headcount.

Issue copy. "Support. 10:00 to 11:00. Contact volume is about 30% higher than forecast across these consecutive periods."

A line under the issue: "Illustrative. The prototype also showed a severity word. Critical, Major, Minor. How it was chosen is not documented, so it is not shown."

Schedule copy under the band: "The period on the schedule. Who was already on the shift is illustrative. What the scheduling simulation changed is not documented."

Animation. Focus moves. If motion is on, the page may scroll the target into view with the browser's smooth scroll only when the user activated the button. Reduced motion: instant jump, focus still moves.

Keyboard. Both controls are buttons. After activation, focus is on the destination label, which is a heading or an element with tabindex="-1" so focus is visible and announced.

Screen reader. Button names are "Show this period on the forecast" and "Show this period on the schedule". The destination label is the announcement.

Touch. Same buttons, stacked, 44px. The schedule on a narrow screen is a list: the period first, then the names present during it. Not a grid that requires pinch zoom.

Heuristic that mattered. Information scent: the issue says the period, the button says the destination. Context preservation: the times do not change on arrival. User control: two explicit steps, not an automatic tour. The staffing boundary is the refusal to add a recommendation. That is error prevention against a false product claim.

---

## System state model

System states and planner activities are different. Inspection and staffing are activities. They are not modes the system enters.

| State | Meaning | Trigger | System behaviour | What the planner sees | Notification | Controls | Next | Class |
|---|---|---|---|---|---|---|---|---|
| Off | This queue is not in the behaviour, in the presented design. | Switch off. The requirements' flag is not a planner control. | No reforecast. | The switch off. No banner. | None. | The switch. | On. | Design decision for the switch. Requirements still say no customer configuration at launch. |
| Watching | Checks run. Conditions not met. | Switch on, and the gap does not qualify. | Compare. Do not replace the forecast. | Nothing about a reforecast. | None. | Ordinary product controls, not specified. | Deviation, or stay. | Requirement. |
| Deviation | A gap exists and is not yet enough. | Actuals diverge, but the "several periods" condition, or an undefined threshold or volume rule, is not met. | Keep checking. | Nothing. The case study shows this only inside the exploration, not as product UI. | None. | None specific. | Qualifying gap, or back to watching if the gap fades. The fade is not shown, because no recovery UI is documented. | Requirement, illustrated. |
| Anomaly detected / reforecast started | A run begins. | The presentation's conditions, as far as they are defined, are treated as met. | A different forecasting method runs. Baseline retained. Swap timing of the visible numbers is not documented. The reconstruction holds the old line. | Banner and notification, in progress. | The anomaly sentence. | Apply filter. Preview, body unknown. Check insights, surface only. | In progress, which is this same run, then updated. | Design decision for the UI. Requirement for the run. |
| Reforecast in progress | The run has not finished. | Same as started. The material does not split "detected" from "in progress" into two different banners. | Still running. No documented progress value. | The same banner. | The same sentence. | The same. | Forecast updated. No error state is documented. Do not add one. | Design decision. |
| Forecast updated | The reforecast is the forecast. | Run completes. | New values on Forecast, schedule, Insights, reporting. Simulation triggered and not shown. | Completed sentence. Issue available. | The completed sentence. The earlier sentence can remain in the list. | Open the issue. Show previous forecast, in section 09. | Issues available. There is no accept step. | Requirement and design decision. |
| Issues available | The event can be read as a row. | Update, in this page's simplification of a log that in the prototype also held older rows. | The row exists. | One issue for this day. | None new. | Show on forecast. | Inspection. | Design decision. The prototype's "3 issues" count is not copied. See open questions. |
| Inspection | The planner is looking. Not a system mode. | They follow the issue or the toggle. | None beyond displaying comparison and the period. | Dotted previous line, band, schedule band. | None. | The toggle and the two path buttons. | Staffing action, which the page does not perform. | Design decision. |
| Staffing action | The planner's work. | Outside the documented UI. | Unknown. The simulation may have changed the schedule. | The marked period only. | None. | Not specified. | End. | Unknown. Do not design it. |

There is no loading spinner, no confirmation toast, no failure banner, and no "approve the new forecast" state.

---

## Three design decisions

The three are one chain. Decision 1 is what allows the system to act for a queue. Decision 2 exists because that action can happen while the planner is elsewhere, and a check must not pretend to be that action. Decision 3 exists because Decision 2 says something changed and does not show what, or where.

### Decision 1

| | |
|---|---|
| The problem | The system can replace the plan. Not every customer wants that every day. The rules are not a form. |
| The constraint | Requirements: no customer configuration at launch, a flag, self-serve later, and an open choice between per-queue automation and on-demand. The detection parameters were undefined even for the team. |
| The design question | What may the customer decide? |
| The decision | In the presented design, on or off for the queue. Nothing about the model. |
| Why | The queue is already where goals for that work live. Adding the model would ask the customer to operate a threshold the requirements had not even finished defining. |
| What it changes | The queue can be included or left out. |
| What it deliberately does not change | The threshold, the period count, the low-volume rule, the method. It also does not add a "run now". |
| Evidence | Speech slide 10. PDF page 10. Requirements 5 and 6. |
| Tradeoff | Less control than the research question implied. More UI than the launch requirement allowed. |
| Open question | Whether the switch, the flag, or neither is what shipped. |
| Product behaviour | Checkbox "Turn on reforecast". Helper: "If enabled, the system will reforecast this queue." |
| Interaction | The switch demonstration in section 07. |
| Validation status | Not recorded. The speech argues that a larger form would overwhelm. That is an argument, not a result. |

Heuristic. Minimalist design is the point of the empty form, not a garnish. Match to the real world: one queue, one choice. The conflict with the requirement is shown beside the form so consistency with the brief is not faked.

Form, beyond the table.

Initial: off. The helper is visible in both states.

On: the switch is on. A line outside the frame, not in the product voice: "On, in this reconstruction. Whether this control shipped is not known."

Off: that line leaves. No confirmation dialog. None is documented.

No loading, no error, no disabled reason. The existing queue fields (service level, patience, shrinkage, as categories the prototype already had) are visible, filled with the word "Existing setting", not with invented targets. They are disabled. A sentence: "These were already on the queue. They are not part of the decision."

### Decision 2

| | |
|---|---|
| The problem | The new forecast is written into three places. The planner is in one of them. A silent change looks like a fault. A check is not a change. |
| The constraint | Announcement was not in the requirements. The surfaces were. |
| The design question | When is a run announced, and on which page? |
| The decision | At start and at finish, in the notification centre and as a banner on Forecast, Team schedule and Insights. No announcement for a healthy check. |
| Why | Those are the pages whose numbers move. A single toast can be missed. A banner on one page misses the planner. |
| What it changes | The planner can meet the run without already standing on Forecast. |
| What it deliberately does not change | It does not explain the size of the change. It does not send email, push, or sound. |
| Evidence | Requirement 7. Speech slides 11 to 17. PDF pages 11 to 15. |
| Tradeoff | Two channels can still be missed. Preview is a control without a specified result. |
| Open question | Preview, the exact effect of Check insights beyond the surface, and whether the issue count can appear while a run is in progress. |
| Product behaviour | The two sentences. Apply filter. Preview present, unspecified. |
| Interaction | Interaction 3. |
| Validation status | Not recorded. |

Heuristic. Status has to be visible in words where the numbers are. The same words in the panel and the banner are the consistency rule. Adding a channel the PDF does not show would invent status the planner never had.

### Decision 3

| | |
|---|---|
| The problem | "Updated" has no size and no place. |
| The constraint | The reforecast replaces the forecast. The baseline is kept. The simulation's effect on the roster is unseen. |
| The design question | What can the planner inspect before touching the roster? |
| The decision | Previous against new. One issue that names the queue and the period. The same period on the forecast and the schedule. |
| Why | Replacement without comparison hides the size. Comparison without a period does not say where to act. |
| What it changes | The planner can see the old line and land on 10:00 to 11:00 in two places. |
| What it deliberately does not change | It does not choose the staffing move. It does not ask the planner to accept the new forecast. The new forecast is already the forecast. |
| Evidence | Requirements 7 and 8. Speech slides 18 to 20. PDF pages 16 to 19. |
| Tradeoff | The path ends early. That matches the material. It also leaves requirement 9 unshown. |
| Open question | What the schedule showed after the simulation. How severity was calculated. Whether "3 issues" meant history. |
| Product behaviour | "Show previous forecast". The issue sentence. "Check forecast" in the prototype, specified here as the two explicit steps so the destination is obvious. |
| Interaction | Interactions 4 and 5. |
| Validation status | Not recorded. Do not claim the comparison taught planners to predict later anomalies. |

Heuristic. Recognition: the old forecast is shown, not recalled. Scent: the issue names the period before the jump. The two-step path is user control. Colour is not the only encoding.

Causal line, used once at the start of section 08 and once at the start of section 09, in corpo size, not as a pull quote:

Section 08: "The switch lets the system act for this queue. The planner may be on another page when it does."

Section 09: "The banner says the forecast changed. It does not say what the previous forecast was, or which period to open."

---

## Neutral product reconstruction

The first reconstructed surface is the queue form in section 07. That is where the frame sentence appears.

The shell in section 08 and the chart in section 09 are the same visual object: a light frame on the editorial page.

Preserve.

- Queue form with one working control, the documented helper, and inert existing settings.
- Notification list with the two documented sentences.
- Banner with those sentences.
- Surfaces: Forecast, Team schedule, Insights. Configuration is the form in section 07, not a fourth tab in the shell. Reason: the switch is a decision, not a place the run is announced. Putting it in the shell would imply the planner goes there when numbers change.
- Forecast chart, previous toggle, text table.
- One issue.
- Schedule with the same period.

Do not reproduce.

- Employer name, logos, purple product chrome, proprietary navigation, internal ids, real names from screenshots, prototype dates, the thank-you phone number, Figma links, source filenames.
- A manual run, a threshold field, email, push, sound, an accept button, a severity formula, a progress percent.

Product frame.

- Name in the bar: "Workforce management". Not a brand.
- Bar background #EEEEEA, page of the frame #FFFFFF, text #1C1C1C, muted #5E584F.
- Actions: slate #2F2E2C text on a #E4E2DC button, not purple, not yellow.
- Banner: #F3EEE4 background, ink text, a 1px #D9D2C6 border. The words do the work. Not a red alert.
- Radius 4px, the site's UI radius. Not a large rounded card.
- The frame stays light in the site's dark theme so it reads as an object under study.

Purple, lilac and cream do not appear inside the frame. If they do, the reconstruction has started to imitate the original product.

Label. Small "Reconstruction" on the frame's top edge, plus the full sentence on first appearance only.

The frame should feel like a workforce tool: dense enough to be a working page, quiet enough that the banner and the switch are the loudest things in it. It should not feel like a marketing dashboard. No greeting, no avatar, no decorative chart on Insights.

---

## Illustrative dataset

One day. One queue with numbers. One anomaly. One issue. Every interaction that shows numbers uses this table and no other.

| Field | Value |
|---|---|
| Account | Greyharbour Contact Centre |
| Queue with numbers | Support |
| Name-only contrast | Orders, no series, used only so Apply filter has a second row to hide |
| Date | Tuesday 6 June 2023 |
| Time zone | Europe/Lisbon |
| Day window shown | 08:00 to 16:45 |
| Affected period | 10:00 to 11:00 |
| Check that qualifies, in the illustration | 11:00 |
| Actuals | Only through 10:45 |
| New forecast | From 11:00, each quarter-hour is the previous forecast plus 20 contacts |

The 20-contact lift is a drawing choice so the gap is readable. It matches the approximate extra volume in the affected period (19, 19, 20 and 20 contacts). It is not a multiplier, and it is not the method. The requirements say the method is different. They do not say how.

The about-30% description matches the affected period only:

| Time | Previous forecast | Actual | Above forecast |
|---|---|---|---|
| 10:00 | 64 | 83 | 19, about 30% |
| 10:15 | 64 | 83 | 19, about 30% |
| 10:30 | 66 | 86 | 20, about 30% |
| 10:45 | 66 | 86 | 20, about 30% |

Hour 10:00 totals: forecast 260, actual 338.

Do not call 30% the threshold. Do not place 30% next to the 10% target. They answer different questions and must not share a visual style.

Full quarter-hour series. Actuals blank after 10:45. New forecast blank before 11:00.

| Time | Previous | Actual | New |
|---|---|---|---|
| 08:00 | 48 | 46 | |
| 08:15 | 50 | 51 | |
| 08:30 | 52 | 50 | |
| 08:45 | 54 | 55 | |
| 09:00 | 56 | 58 | |
| 09:15 | 58 | 57 | |
| 09:30 | 60 | 62 | |
| 09:45 | 62 | 64 | |
| 10:00 | 64 | 83 | |
| 10:15 | 64 | 83 | |
| 10:30 | 66 | 86 | |
| 10:45 | 66 | 86 | |
| 11:00 | 68 | | 88 |
| 11:15 | 68 | | 88 |
| 11:30 | 66 | | 86 |
| 11:45 | 64 | | 84 |
| 12:00 | 58 | | 78 |
| 12:15 | 52 | | 72 |
| 12:30 | 48 | | 68 |
| 12:45 | 46 | | 66 |
| 13:00 | 50 | | 70 |
| 13:15 | 54 | | 74 |
| 13:30 | 56 | | 76 |
| 13:45 | 58 | | 78 |
| 14:00 | 60 | | 80 |
| 14:15 | 60 | | 80 |
| 14:30 | 58 | | 78 |
| 14:45 | 56 | | 76 |
| 15:00 | 54 | | 74 |
| 15:15 | 52 | | 72 |
| 15:30 | 50 | | 70 |
| 15:45 | 48 | | 68 |
| 16:00 | 46 | | 66 |
| 16:15 | 44 | | 64 |
| 16:30 | 42 | | 62 |
| 16:45 | 40 | | 60 |

Checks in the exploration, and why these clocks:

- 09:30 uses 08:30 through 09:15 as "close". Actuals 50, 55, 58, 57 against 52, 54, 56, 58. None of these is the sustained gap.
- 10:30 uses the new gap at 10:00 and 10:15 only. Two quarters. The copy says this has not held over several periods. It does not define "several".
- 11:00 uses 10:00 through 10:45.

Section 02 may show hourly sums of Previous. They must equal the four quarters. 08:00 hour is 204. 09:00 hour is 236. 10:00 hour is 260. 11:00 hour is 266 on the previous line and 346 on the new line.

Schedule, illustrative people present from 10:00 to 11:00. Presence is not a requirement calculation.

| Name | Shift | Present 10:00 to 11:00 |
|---|---|---|
| Ana Varela | 08:00 to 16:00 | Yes |
| Bruno Caldas | 08:00 to 16:00 | Yes |
| Clara Nogueira | 09:00 to 17:00 | Yes |
| Duarte Fialho | 09:00 to 17:00 | Yes |
| Eva Ramalho | 10:00 to 18:00 | Yes |
| Filipe Gouveia | 12:00 to 20:00 | No |

Filipe is on the list so the schedule is not "everyone is in the red hour." He is not a finding.

Issue. One row. Support. 10:00 to 11:00. The volume sentence. No id. No severity. No second day.

Every figure that shows a number carries the word Illustrative in the frame label. The account name is visible in the shell so the fiction is obvious.

Handle time and capacity do not add rows to this table.

---

## Chart specification

Three chart contexts. One dataset.

**Plan chart, section 02.** One solid line, Previous, labelled "Forecast". No actuals. Hourly ticks are enough if the quarter-hour table is underneath. Y axis: contacts. X axis: hour. Title as in section 02.

**Exploration chart, sections 03 and 05.** Quarter-hours. Solid forecast. Actuals as a second solid line only where actuals exist, labelled "Actual", distinguished by a square marker at each point, not by colour alone. The affected period, once it exists in the step, is a hatched band plus a 1.5px border #6A4B12 plus the text "10:00 to 11:00". At step 5 the new forecast is a third solid line from 11:00, labelled "New forecast", heavier stroke than the previous line. Previous remains solid but lighter, and is named. Do not introduce dotted style here. Dotted is reserved for the comparison toggle, so the encoding stays stable: dotted means "the line the toggle reveals."

**Comparison chart, section 09.** Solid current forecast, labelled "Current forecast", from 11:00. Dotted previous, 2px dots with 4px gaps, labelled "Previous" in the legend and at the end of the line. Actuals with square markers only inside 10:00 to 11:00. Hatched band on that period with the text label. The delta sentence is outside the chart.

Colour may help, inside the product frame, using ink, a mid grey, and the brown of the band. Colour is never the only difference between current, previous, actual and the period.

No hover-only readout. Tap or click a quarter-hour, or read the table. The table columns match the series present in that chart. Empty cells say "Not in this illustration", not 0.

The chart has a text title and a one-sentence summary that restates the point of that section. The table is the alternative for a screen reader and for a visitor who cannot read the picture. Both are in the page.

Animation is not required to read the chart. The final state of a step is meaningful if motion never ran.

Do not plot the 10% target on any chart.

---

## Information hierarchy

Three levels.

**Page.** One h1, the project name on the cover. The thesis is a paragraph, even though it is display-sized, so the heading outline is the section list. Each section is an h2. Inside a section, h3 is only for the three tensions, the three decision labels, and the destination labels in the issue path ("Affected period, 10:00 to 11:00" on the chart, and the same on the schedule).

**Section.** Order is fixed: the h2, one sentence that is the message, the evidence label if the message needs it, the thing to look at or use, then the short explanation. Secondary constraints open inside the brief. They do not lead.

**Inside a demonstration.** Status sentence, then control, then the picture, then the table or the note. The disclaimer is not the loudest line. The Illustrative label is small and present.

The visitor's seven questions are answered by position, not by seven icons:

- Where am I: the h2.
- What changed: the status sentence of the current step or state.
- Why it matters: the one sentence under the h2.
- What the system is doing: the state name in sections 05 and 08.
- What I can inspect: the controls, named as actions.
- What the designer decided: the h2 of sections 07 to 09.
- What supports it, and what is unknown: the label, and the open sentence beside the switch, Preview, severity, and the simulation.

Do not give every sentence a label. Label the thesis (Inference), the target (Requirement), the switch conflict (Requirement next to Design decision), the customer-company sentence (Context), the baseline remark (Inference), each demonstration (Exploration or Reconstruction), and the numbers (Illustrative).

Footnotes. Avoid. If a limit matters, it sits in the view, as Preview's disabled reason does.

---

## Visual direction

Editorial palette, scoped to this page. Not the product frame. Not the site's yellow.

| Role | Light | Dark theme of the site |
|---|---|---|
| Cover and section 05 field | #3C2A63, text #F6F1E6 | Same field. It is already dark. |
| Section 06 and the short tension questions | #E6DDF5, text #1A1A1A | #2C2836, text #F3EDE4 |
| Sections 10 to 12 | #F6F1E6, text #1A1A1A | #231E1A, text #F3EDE4 |
| Body sections 02, 03, 04, 07, 08, 09 | Site surface and site text | Site surface and site text |

Purple carries the system explanation and the cover, because those are the editorial argument. Cream carries the ending, because the ending is a limit, not a climax. Lilac is only the three questions, so that block reads as a hinge rather than another purple chapter.

Body text on cream and lilac is ink, not purple. Purple as text is allowed for the display thesis on the purple field, in cream, and nowhere as small body.

Do not use gradients, glass, blobs, stock images, 3D, or a card around every paragraph. The PDF's abstract shapes are not reused.

The product frame is specified above and stays quieter than the purple field. When a purple section contains the exploration (section 05), the step list sits on the purple, and any miniature status is cream text. It is not the product frame. The product frame appears in 07, 08 and 09, on the ordinary page surface, so the tool and the argument are easy to tell apart.

Site yellow is not an accent in this case study.

---

## Typography

Nudica only. Weights that exist: 400, 400 italic, 500, 700. No other family, including the faces in the PDF.

Use the site's scale. Do not invent a second ramp.

| Role | Site token | Use |
|---|---|---|
| Thesis on the cover | `--fs-display`, italic, 400, line-height 0.94, tracking -0.042em | Once. |
| Section h2 | `--fs-heading`, 700, line-height 1.02 | The twelve sections. |
| Section message | `--fs-lede`, 400, max 36rem | The first sentence under the h2. |
| Body | `--fs-corpo`, 400, line-height 1.55, max 66ch | Explanation. |
| Planner sentences in section 03 | `--fs-lede`, italic | So they read as speech from the material, not as UI. |
| Product UI inside the frame | `--fs-nota` 0.875rem for values, `--fs-label` 0.8125rem medium, tracking 0.05em for control names | Compact. Not display type. |
| Evidence labels | `--fs-label`, 500, uppercase not required. Tracking 0.05em. | Small, readable, hairline border. |
| Tables and axis titles | `--fs-nota`, tabular figures | So columns align. |

Alignment is left. The thesis may use the site's balance wrapping. Do not centre the page.

Responsive. The clamps already scale the display and the heading. Do not set a separate mobile font. The 66ch measure remains. Tables scroll or become the stacked cards specified for the schedule and the issue, without dropping columns of meaning.

---

## Editorial rhythm

The page should not settle into heading, paragraph, picture.

| Section | Pattern |
|---|---|
| 01 | Display thesis, then the name, then two quiet lines. |
| 02 | Two sentences, then a single line chart. No caption essay. |
| 03 | A control, a planner sentence, a limit sentence. Chart only for volume. |
| 04 | A statement, a compressed note, a list that opens, a target set apart. |
| 05 | A purple field. The step is the page. The algorithm sentence sits beside it, not under a screenshot. |
| 06 | Three questions, lilac, no pictures. |
| 07 | One form, large enough to read the helper, with the conflict in a column beside it on wide screens and under it on narrow ones. |
| 08 | The frame, with the state controls outside it so the product does not appear to contain the case study's knobs. |
| 09 | Delta and toggle, chart, issue, then the schedule. A vertical sequence, like an investigation, not three equal cards. |
| 10 to 12 | Prose on cream. No diagrams. |

Variation follows the job. The system section is a field because the visitor is inside a sequence. The ending is paper because the claim is getting smaller, not bigger.

---

## Motion

Motion confirms a change the visitor just made. It does not introduce the change.

| Interaction | With motion | Reduced motion |
|---|---|---|
| Scenario | Actuals appear or leave, 160ms. | Instant. The note is the content. |
| Steps | Current marker, 160ms. New line at the last step, 160ms. | The selected step is shown in its final state. |
| Shell surface | Instant on purpose. | Instant. |
| Shell state | Banner text, 160ms. | Instant text. |
| Previous forecast | Dotted series, 160ms opacity. | Present or absent. |
| Issue path | Focus moves. Scroll may be smooth. | Instant scroll, focus still moves. |

No autoplay, no looping indicator, no count-up, no entrance animation on paragraphs. The site's reduced-motion setting turns the 160ms transitions to none.

Easing, if motion runs: the site's standard ease. Duration is 160ms because that is already the site's micro duration. There is no second timing system.

---

## Accessibility

- Semantic order: banner landmark skip link of the site, then h1, then sections with h2, demonstrations as regions with names.
- The reconstructed frame is a region named "Reconstructed product". It is not presented as the original interface.
- Tab order follows the visual order within each section: message, controls, figure, table.
- Focus is always visible, as specified under the shared interaction rules.
- One live region, polite, for the page. Empty when nothing has changed.
- Charts are not the only form of the data. Tables are in the page.
- The period band has a hatch, a border and a text label.
- Previous versus current differs by stroke style and by name.
- Contrast: cream #F6F1E6 on purple #3C2A63 is the cover pair and must be checked at implementation against 4.5:1 for the small meta lines. If the small lines fail, those lines switch to a lighter cream #FFFBF5 or move off the purple onto the following surface. Body text on cream and white uses #1A1A1A. Muted UI text #5E584F on white must meet 4.5:1. The band border #6A4B12 on white is for a graphical object with a text label, not for small type.
- Targets 44px. Banner actions included.
- Zoom to 200% does not clip the switch helper or the banner sentence. The frame grows vertically rather than scaling type down.
- Form control: the switch has a visible label and the helper is associated with it as description.
- Disabled Preview: the reason is visible text, associated with the control.
- No information arrives only inside a transition.
- The case study controls and the reconstructed controls are both in the same tab order. They are distinguishable by region, so a screen reader user hears when they have entered the reconstruction.
- Language is English in this specification. If Portuguese is added later, it is a translation of this copy, not a second design. Planner sentences that come from an English source are marked as translated.

---

## Responsive behaviour

Desktop, tablet and mobile tell the same story. Tablet follows desktop until the wide frame no longer fits, then it follows the mobile order. Breakpoint: 720px, the site's narrow measure. No separate tablet invention.

| Piece | Wide | Narrow |
|---|---|---|
| Cover | Thesis, then name. | Same stack. Display size clamps down. |
| Plan | Text and chart side by side if both fit in 1080px with the chart still labelled. Otherwise stacked. | Text, then chart, minimum height 180px. |
| Scenarios | Options in a row. | Options stacked. Chart after the note. |
| Brief | List and target side by side. | Target after the list, still visually separate. |
| Steps | Sentence beside the quarter-hours. | Quarter-hours as a vertical list. Quiet steps remain one line each. |
| Switch | Form and the conflict column. | Form, then the conflict. Helper stays with the switch. Existing settings can sit in a disclosure titled "Existing queue settings" so the switch leads. |
| Shell | Frame with a top bar. | No shrunken frame. State, surface, banner, body. |
| Comparison | Sentence, toggle, chart, table. | Same order. Chart may scroll sideways inside a region labelled "Forecast chart". |
| Issue path | Issue, then chart, then schedule. | The issue is a block, not a table with hidden columns. The two buttons stack. The schedule lists the period, then the names. |
| Ending | Narrow measure prose. | Same. |

Do not remove Back, Next, the three scenarios, the three surfaces, the three states, the toggle, or the two path buttons on a small screen.

---

## Navigation

- In-page links under the cover, the twelve section names, in reading order. Reason: return, not overview-as-product.
- No sticky bar. Reason: it would compete with the banner inside the reconstruction and would make skipping easier than reading.
- No progress meter. The h2 is the location.
- Sections 05, 08 and 09 open with the h2 and the one-line causal sentence. That is the orientation. They do not get a private submenu.
- The site's own header and language switch remain. This page does not add a second language control.
- Back to the top is unnecessary. The page is not a catalogue.

---

## Content style

English. Impersonal. "The design", "the planner", "the requirements". Not "I" and not "we". The site's studio voice avoids first person. This page follows that until the open question on voice is decided.

Short sentences. Concrete nouns: forecast, check, queue, banner, period. Verbs: staff, check, replace, announce, compare.

The planner sentences in section 03 may stay close to the speech because they are the documented situations. They are introduced as documented situations, not as fresh quotations from a named person.

Do not write: journey, seamless, holistic, leverage, empower, user-centric, game-changing, robust, intuitive, delightful, "now let's", "next we explored", "through research".

Do not use em dashes.

The 10% sentence is only the target sentence. It appears in section 04 and section 11. It does not appear in a chart, a hero number, or a step.

"About 30%" appears only next to the illustrative actuals, with the clause that it is not a threshold.

---

## Validation

Page copy:

"The prototype was high fidelity from early on. The reason given is time. Feedback had to be possible before the build, and a rough sketch was a poor way to talk about a forecast changing under someone."

"The designer has said the team worked directly with customer companies to get that feedback quickly. A later note put the number at three. The conversations themselves are not in the material. No count of sessions, no quotes, no list of what changed."

"What was put in front of people was the flow in this page: a queue control, an announcement, a comparison, an issue, a period. What was not established: whether planners could say why a run had started, whether the banner was noticed, whether the path was faster than hunting, what the schedule did after the simulation, and whether accuracy moved toward the target."

Labels. First paragraph: the process claim, unlabelled fact of the speech, with no metric. Second paragraph: Context. Third: the boundary, unlabelled, because it is the absence.

No before-and-after of the design. None is documented.

---

## Outcome

Design outcome, which the page may say:

The presented design specifies a path. A customer allows a queue, or does not. A check stays silent. A reforecast announces itself on the pages where the forecast sits, at the start and at the finish. The planner can put the new forecast against the previous one and open the affected period on the forecast and on the schedule. Detection settings are not on the form.

Product outcome: unknown. Do not say the feature shipped or that planners used it.

Business outcome: unknown. Do not say cost, service level, or time.

Measured outcome: none in the material.

The target block, repeated from section 04, same component, same words:

"Target, not a result. The brief asked for a 10% improvement in intraday accuracy over the original forecast. Nothing in the material shows that this was measured."

Visual treatment. A bordered block. The word "Target" in label type at the top. The 10% is body type, not display type. No circular progress, no arrow, no green. The border is ink, not purple, so it is not celebrated as a result. The same component is the only place "10%" appears.

Unknowns sit as four lines under the outcome, not as a second essay:

- Shipping, unknown.
- Measured accuracy, unknown.
- What the simulation did to the roster, unknown.
- What customer feedback changed, unknown.

---

## Claims audit

| Claim | Class | Source | Confidence | Public wording | Risk if overstated |
|---|---|---|---|---|---|
| The forecast could change without the planner asking. | Inference | Requirements 7 plus the lack of a planner request in the flow | High as a reading | The short thesis, labelled Inference on the cover | Could be read as a quote. Do not quote it. |
| Checks are at least every 30 minutes. A reforecast is conditional. | Requirement | Requirements | High | Section 04 and step copy | Easy to collapse into "recalculates every 30 minutes". The step list is the guard. |
| 10% accuracy improvement. | Requirement, target | Requirements | High as a target, none as a result | The target block only | A big numeral would be read as a result. Body type, "Target" label. |
| One switch, no model settings. | Design decision | Speech, PDF | High for the prototype | Section 07 | "Shipped" would be false. The outside line forbids it. |
| No customer configuration at launch. | Requirement | Requirements | High | Beside the switch | Hiding it would tidy the story. |
| Banner and notification sentences. | Design decision | Speech, PDF | High | Used verbatim | Rewriting them would fake the artefact. |
| Preview's behaviour. | Open | Control exists | Low | Disabled, reason visible | A fake panel would become false product design. |
| Handle time and absence are detected. | Not a claim | Scenarios versus issue text | None | Forbidden by the scenario notes | The volume chart must not appear on those options. |
| Previous forecast shows the replaced line. | Design decision | PDF, speech | High | Section 09 | "Predicts future anomalies" is forbidden. |
| Baseline is why comparison exists. | Inference | Requirements 8 plus the control | Medium | One sentence, labelled | Do not say a designer stated this motive. |
| Customer companies, short timeline. | Context | Designer | High as context | Validation paragraph | "Three companies validated" is forbidden. |
| High fidelity for speed. | Process claim | Speech, PDF | Medium | Validation paragraph | Do not add a quality metric. |
| Feature shipped, adopted, saved time, cut staffing errors, improved the business. | Unknown or unsupported | None | None | Do not say | Reads as a result. |
| Continuous or all-day reforecasting, push, manual workflow, multiplier, eight-week formula, twice a day as a rule, one-hour gap as a rule. | Unsupported as requirements, or contradicted | Speech in places | None | Do not say | Reads as a specification. |
| About 30% in the affected period. | Illustrative | This dataset, echoing a speech example of additional volume, not a threshold | High as arithmetic of the fiction | Only next to the actuals, with the not-a-threshold clause | Could be read as the 10% target or as the product's trigger. Keep the sentences apart. |
| Plus 20 contacts. | Illustrative drawing choice | This specification | High as a drawing rule | Step 5 and the delta sentence | Could be read as the algorithm. The sentence says it is not. |

---

## Confidentiality

The public page may say: product design, Q2 2023, workforce management for contact centres, resource planner, forecast, queue, the mechanics in this specification, the reconstruction, the illustrative data, the editorial palette.

The public page may not say: the employer, Cobalt, internal programme or product names, the engineer named in the requirements, logos, customer names, real account data, internal ids, source filenames, the Figma address, prototype dates, phone numbers, names copied from screenshots.

Greyharbour, Support, Orders, and the six shift names are fiction. They stay labelled illustrative.

The reconstruction uses none of the original chrome.

---

## Open questions

Each one: why it matters, what it touches, what the page does now, what stays abstract.

| Question | Why it matters | Touches | Shown now | Stays abstract |
|---|---|---|---|---|
| Did it ship, and was the switch or only the flag released? | Changes Decision 1 from direction to product. | Section 07, outcome. | "Whether this control shipped is not known." | Any release claim. |
| Was accuracy measured against the 10% target? | The only quantitative success line. | Sections 04 and 11. | Target block. | Any result. |
| What was the threshold method? | Could change the simulation from illustration to specification. | Section 05. | "Not defined." | Formula, eight weeks, percentile, average. |
| Were the twice-a-day cap and the one-hour gap final? | Would add states after a second run. | Section 05. | Omitted. | Caps. |
| Did the scenarios come from customer conversations? | Would upgrade section 03 from documented copy to research. | Section 03. | "Documented situations." | Method, counts, quotes. |
| May the page say three companies? | A number without an outcome still sounds like a sample. | Validation. | "Customer companies," and that a note said three, without a result. | "Validated by three." |
| Was there a manual run in the final design? | Would add a control next to the switch. | Reflection, Decision 1. | Said as absent from the screens. | A button. |
| Do handle time or absence trigger a run? | Would rewrite Interaction 1. | Section 03. | Explicitly not documented. | Banners on those options. |
| What does Preview show? | A visible control. | Section 08. | Disabled, reason shown. | A panel. |
| What does Check insights do beyond opening Insights? | Same. | Section 08. | Switches surface only. | Charts. |
| What did the schedule show after the simulation? | The end of the path. | Section 09, reflection. | Period and illustrative shifts. "Not documented." | A new roster, a gap closed. |
| Does the issue count include history, and can it show during "in progress"? | The prototype's "3 issues" beside an in-progress banner. | Sections 08 and 09. | One issue, only after update. No count during in progress. | A "3" badge. |
| How is severity calculated? | The prototype showed three words. | Section 09. | Omitted, with the reason. | A badge. |
| Were there channels beyond the in-app notification and the banner? | Speech closing slide says push. | Section 08. | Two in-app channels only. | Push, email, sound. |
| What changed after feedback? | Would create a before and after. | Validation. | "Not documented." | Iterations. |
| First person or impersonal? | Voice of the whole page. | All copy. | Impersonal, matching the studio site. | A rewrite in first person. |
| Portuguese on the public page? | Doubles the copy. | All copy. | English only in this specification. | A translation pass. |

---

## Content model

Conceptual. Not a schema to share with any other project. Not code.

**Page.** Language. Twelve sections in order. One illustrative dataset. One live-region string, overwritten on each announcement.

**Section.** Id. Heading. Message. Optional evidence label. Body. Optional demonstration id. Transition sentence, which is the last line of the section, not a button.

**Evidence label.** Category. Short public word. Used sparingly as listed under Information hierarchy.

**Decision.** The twelve fields in the decision tables. Rendered as the section, not as a repeated twelve-row template on the page. The table is for this specification. The page uses prose, the form, the shell and the chart.

**Scenario.** Id: volume, handle, capacity. Note. Whether the actuals series is shown. Evidence label.

**Simulation step.** Id 1 to 5. Clock label. State name. Sentence. Which series are visible. Whether the status sentence of a reforecast is visible. Quarter-hours in scope.

**Shell.** Surface. System state: watching, in progress, updated. Banner text or none. Notification items. Filter on or off. Preview unavailable. Insights body: the one sentence, not a chart collection.

**Dataset.** The tables in Illustrative dataset. They are the only numbers. Hourly totals are derived, not authored separately.

**Chart context.** Plan, exploration, comparison. Which series. Which encodings. Summary sentence. Table columns.

**Issue.** One. Queue, period, sentence. Actions: show on forecast, show on schedule.

**Schedule.** The six shifts. The period label. The unknown-simulation sentence.

**Validation and outcome.** The paragraphs and the target block as fixed copy, not as a metric object with a value and a delta.

**Open question.** The table above. Not all of them appear on the page. The page carries only the ones attached to a visible control or claim.

**Claim.** The claims table. A later implementation check can search the built copy for the forbidden sentences. That test is a Phase 3 concern. The forbidden sentences are listed in the critical review.

---

## Implementation handoff

No framework details. Behaviour to preserve.

**Scenario control.** Input: one of three ids. State: selected id. Output: note text, actuals visible or not. Data: dataset actuals for volume only. Content: the three notes. Visual: pressed state, chart rules. Accessibility: radiogroup, live region. Responsive: stack. Motion: 160ms or none. Unknowns: none that block this control.

**Step control.** Input: step id. State: current step. Output: sentence, visible series, status line. Data: the quarter-hours named in the step table. Content: five sentences. Visual: marker, band from step 3, new line at step 5. Accessibility: radiogroup plus Back and Next, table, live region. Responsive: vertical list. Motion: 160ms or none. Unknowns: real threshold, real period count. Already handled by the copy. Do not fill them in code.

**Shell.** Input: surface, state, filter, panel open. State: those four. Output: banner, notification list, surface body. Data: forecast series for Forecast; shifts for Team schedule; no insights series. Content: the two sentences, the Insights sentence, the Preview reason. Visual: light frame, banner style. Accessibility: region name, radiogroups, disabled Preview with description, escape closes panel. Responsive: stacked, no miniature app. Motion: surface instant, banner 160ms or none. Unknowns: Preview body, Check insights beyond the surface, issue count during a run. Do not invent them as data.

**Comparison.** Input: toggle. State: previous shown or hidden. Output: dotted series and delta sentence. Data: previous and new columns. Content: the delta sentence. Visual: solid, dotted, hatch, labels. Accessibility: switch, table, tap readout that is also the table. Responsive: sentence first, chart may scroll. Motion: 160ms opacity or none. Unknowns: none for this control.

**Issue path.** Input: which destination. State: which destination was last requested. Output: focus on that label. Data: the period 10:00 to 11:00, the shifts. Content: issue sentence, schedule caveat. Visual: band in both places. Accessibility: focus move to a labelled target. Responsive: schedule as a list. Motion: scroll respects reduced motion. Unknowns: simulation result, severity. Omitted on purpose.

**Switch.** Input: on or off. State: boolean, local to section 07. Output: the outside line when on. Data: none. Content: helper, conflict, "Existing setting". Visual: one working control. Accessibility: label, description, disabled inert fields. Responsive: disclosure for existing settings on narrow screens. Motion: none required. Unknowns: shipping. The outside line is the handling.

**Target block.** Input: none. Output: the fixed sentence. It is content, not a calculated metric.

A later build should check, as copy rather than as UX invention: no em dash; the forbidden claims list; Illustrative on every numeric figure; Reconstruction on every product frame; purple values absent inside the frame.

---

## Acceptance criteria

| Criterion | How this specification meets it |
|---|---|
| Clear narrative, from this project | Sections 01 to 12 follow the spine. |
| No other case study as a model | Structure, interactions, palette and content objects are defined here from the audit. |
| Three decisions connected | The causal lines at 08 and 09. |
| Check and reforecast differ | Five steps. Banners start at step 4. |
| The visitor can operate that difference | Back, Next, and direct steps. No autoplay. |
| Five interactions specified | Scenarios, steps, shell, comparison, issue path. |
| Reconstruction separated from the editorial layer | Light frame, purple kept outside it. |
| No company branding | Confidentiality list. |
| Personality without decoration | Purple, lilac and cream assigned to jobs. |
| Nudica only | Typography uses the site scale. |
| Not a generic template | No card grid, no sticky nav, no dashboard Insights. |
| Claims classified | Labels and the claims table. |
| Unknowns stay unknown | Open questions, and the controls that refuse to guess. |
| Research not invented | No research chapter. Context stays context. |
| 10% is a target | One component, two placements, body type. |
| 30-minute cadence is not a reforecast cadence | Steps 1 to 3 have no banner. |
| Unsupported signals not detected | Handle time and capacity notes. |
| Switch not presented as shipped | The line outside the form. |
| Dataset consistent | One table. Hourly sums defined as derivations. Period shared. |
| Charts have alternatives | Tables, sentences. |
| No hover dependency | Tables and tap readouts. |
| Works without motion | Reduced-motion column. |
| Mobile keeps the interactions | Responsive table. |
| Reasoning before screens | Sections 02 to 06 precede the shell. |
| Honest about reconstruction | Frame sentence and labels. |
| Human, specific, short | Content style, and the critical review. |

---

## Final critical review

Reviewed against the audit and the sources as read for the audit. The Figma file was not opened. No contradiction was closed by preference.

**Evidence.** The switch, the two sentences, the three surfaces, the comparison, and the issue path stay inside the speech and the PDF. The quiet check is a requirement, shown as an exploration because the product UI correctly has no screen for it. The plus-20 line is declared a drawing choice. The about-30% line is arithmetic of that fiction and is banned from the target block.

**Narrative.** Section 06 is only questions, so the decisions are not answered twice. The research canvases do not return.

**Hierarchy.** Thesis larger than the name, with a reason. Demonstrations lead with a sentence, not with a frame. The target cannot outrank the outcome.

**Interaction.** Five, each with a question. No scrubber on the plan. No threshold playground. No autoplay. Preview does not grow a fictional body.

**Heuristics.** Applied where they changed a decision: status in words, one sentence in two channels, previous forecast visible rather than remembered, disabled Preview explained, colour not sole encoding. Not scored as a checklist.

**Accessibility and responsive.** One live region. Tables. Focus moves on the path. Narrow layouts keep every control. The schedule becomes a list rather than a tiny grid.

**Load.** Section 05 is the longest explanation and it is carried by steps, not by a paragraph of parameters. Caps and formulas were removed so the visitor is not asked to learn unconfirmed machinery.

**Confidentiality.** Employer, internal names, and prototype identity stay out.

**Pacing.** Purple for the mechanism, cream for the ending, no picture in the last three sections.

**States.** No error, accept, or progress percent. Off is local to the switch.

**Data.** One period, one issue, Orders without numbers, actuals stopped at 10:45, new line from 11:00. Severity omitted rather than invented. "3 issues" not copied.

**Terminology.** Check, deviation, qualifying gap, reforecast in progress, forecast updated. "Anomaly detected" is reserved for the announcement copy.

**Provenance.** Thesis labelled. Context labelled. Inference about the baseline limited to one sentence.

**Claims.** The forbidden list is excluded: improved by 10%, recalculates every 30 minutes, continuous, 24/7, three companies validated, interview counts, users preferred, customers understood, push, manual workflow as a screen, predicted anomalies, shipped, adopted, time saved, staffing errors reduced, business performance improved.

**Design versus product.** Sections 07 to 09 show behaviour in order to explain a decision. Sections 02 to 06 happen first.

**Reconstruction.** Named, neutral, first disclaimer once.

**Screens versus decisions.** The shell is section 08, not the page.

**10% and 30 minutes and signals and the switch.** Guarded in copy location, in the steps, in the scenario notes, and in the line outside the form.

Rewrites made in this review, already included above:

- The new forecast is not a uniform multiplier.
- No fictional runtime such as a four-minute calculation.
- Insights has no invented charts.
- The issue count does not appear during "in progress."
- A second queue has a name and no data.
- Portuguese is not drafted while the language question is open.

Nothing in the page exists only to look interactive.

---

## Phase 2 completion assessment

**Fully specified.** The twelve-section story, the transitions, the five interactions with states and copy, the system states, the three decisions and the chain between them, the neutral frame, one coherent day, chart encodings, hierarchy, palette, type, rhythm, motion, accessibility, narrow-screen behaviour, navigation, validation wording, the outcome and the target treatment, the claims list, confidentiality, the content objects, and the behaviour an implementer must not invent.

**Still open.** Every row in Open questions. They are open because the sources do not close them. The important ones for a reader are shipping, measurement, Preview, the schedule after the simulation, and the true detection signals.

**Decide before implementation.** That this specification is accepted. Whether the public voice stays impersonal. Whether the page launches in English only. Whether "a note said three" stays in the validation paragraph or is reduced to "customer companies." Those are editorial approvals, not new research.

**Do not decide during implementation.** The threshold, the period count, the cap, the gap, the multiplier, Preview's panel, severity, push, a manual run, a staffing recommendation, a measured 10%, or a shipping statement. If a build needs one of those to proceed, it should stop and ask. It should not pick a plausible version.

Phase 3 is a build against this specification. It is not a chance to rediscover the story.
