# Intraday Reforecasting — Phase 2 Specification
## Content, Narrative & Interaction Specification (no code)

**Status:** Phase 2 specification. No implementation.
**Date:** 2026-09-21
**Primary source:** `docs/intraday-reforecasting-case-study-audit.md` (Phase 1). Citations below reuse its convention: **REQ** (requirements, Level 1), **SPEECH** (presentation notes, Level 5), **PDF p.N** (current case-study PDF, Level 4), **JOÃO** (designer-provided context, Level 6), **AUDIT §N** (Phase 1 section).
**Hierarchy:** accuracy > evidence > narrative > experience > interaction > visual polish > implementation.

---

## 01. Experience objective

A visitor who knows nothing about contact centres should leave able to say: an intraday forecast is a plan for a day that has not happened yet; during the day volume, handle time and available staff drift away from that plan; this product monitored the drift every half hour and, when the deviation was large enough for long enough on a queue with enough volume, rewrote the rest of the day's forecast on its own; the detection and the recalculation were engineering-owned; the design decided that a customer should switch this on per queue and configure nothing else, that a system-initiated change must never appear silently, and that the change must be inspectable against the forecast it replaced and lead the planner to the affected period in the schedule; the design was validated under time pressure with high-fidelity prototypes reviewed closely with customers, without measured outcomes in the record; and the brief's 10% accuracy target, the production status and the impact remain unknown. The page is a design argument demonstrated through five controlled interactions on one illustrative dataset. It is not a feature page, not a process diary, not a screenshot gallery.

---

## 02. Locked evidence rules

These rules bind every sentence of copy and every reconstructed pixel.

1. **Company anonymous.** Never: Talkdesk, Cobalt, Avalon, apollo, any employee name, logo, branded chrome, branded purple UI, proprietary IDs. Use: "a workforce-management product for contact-centre operations". (Locked by João.)
2. **Level discipline.** REQ statements may be presented as constraints of the brief. SPEECH/PDF-only parameters (twice a day, one hour apart, eight weeks, nightly run, percentile or average error, multiplication factor) are **project-context parameters, unconfirmed**; they appear only where marked as such, never as requirements, and the default explanation works without them.
3. **Threshold wording.** Always "a calculated threshold derived from recent history". Never "percentile", never "average error".
4. **Target, not result.** The 10% figure appears once, only as "The brief set a target of 10% improvement in intraday forecast accuracy over the original forecast." Never styled as a KPI, never near a chart.
5. **No production language.** Never "shipped", "launched", "released", "adopted", "in production", "live".
6. **No invented validation.** No participant counts, session counts, quotes, scores, rates, time saved, impact.
7. **No invented iteration.** The "Anomaly detected" / "Surge detected" pair is not presented as an iteration. The only before/after is the documented product state "Show previous forecast" off/on.
8. **Scenario text is the only user-voice material.** Used as written on PDF p.4; attributed as "documented with resource planners"; method not stated.
9. **AI-generated canvases are removed.** Kano, Value Proposition Canvas, Empathy Map do not appear and are not described as research.
10. **Detection signal.** Say "contact volume" as the documented comparison (REQ 3; PDF p.18). Handle time as a trigger is OPEN and must be marked as such wherever it could be inferred.
11. **Capacity-side scenarios** (absenteeism, coaching, surplus, redistribution) explain planner pressure; the copy never says the system detects them.
12. **Every reconstructed surface** carries the RECONSTRUCTION label on first appearance in each section, and the dataset is labelled "Illustrative data".
13. **Voice.** Impersonal editorial voice ("the design", "the designer's job"), consistent with the Carpool page. The role appears in cover meta. First person is not used. (Adjustable by João; see §27.)
14. **No em dashes in copy** (site copy rule). Pre-1990 European Portuguese orthography in PT (site copy rule; see §25).

---

## 03. Audience and visitor knowledge

| Audience | Arrives knowing | Needs from the page |
|---|---|---|
| Design lead / hiring manager | Portfolio conventions; suspicious of process theatre | The decisions, their evidence, what was not the designer's |
| Product manager | Roadmaps, requirements, trade-offs | The system boundary, the configuration decision, honest validation |
| Engineer | Systems, states, thresholds | That monitoring ≠ execution is understood; that the algorithm is not claimed |
| Fellow designer | Interaction patterns | The state model, banner system, inspectability path |
| Generalist visitor | Nothing about WFM | Section 01 vocabulary; scenario interaction |

Assumed knowledge at entry: none of the domain. Introduced in order: forecast → staffing requirement → schedule (01); deviation (02); the brief's constraints (03); monitoring vs execution (04); then decisions. No term is used before it is introduced.

---

## 04. Core thesis

Working thesis (unchanged from Phase 1; no materially better formulation emerged):

> The system could decide on its own to change the forecast. The design's job was to make that change reach the planner where they were working, make it inspectable against what it replaced, and make the next step obvious, while asking the customer to configure exactly one thing.

Why it holds: REQ assigns detection, threshold and algorithm to the epic (REQ 3.1, 3.4, 4, 9.1); PDF p.10 to p.19 contain only configuration, communication and inspection; REQ 5 to 6 frame the configuration boundary. Every clause is traceable. It contains no result claim.

PT-PT rendering (locked for cover):

> O sistema podia decidir sozinho alterar a previsão. O trabalho do design foi fazer essa alteração chegar ao planeador onde ele estava a trabalhar, torná-la inspeccionável face à previsão que substituiu e tornar óbvio o passo seguinte, pedindo ao cliente que configurasse exactamente uma coisa.

---

## 05. Narrative architecture

Causal chain, in order, with the beat that makes the next section necessary:

| # | Section id | Working title (EN) | Chain role | Closing beat that pulls forward |
|---|---|---|---|---|
| 00 | `cover` | Intraday Reforecasting | Frame | Thesis stated; visitor asks "what is a forecast for?" |
| 01 | `context` | A plan for a day that has not happened | CONTEXT | "The plan is made before the day begins. The day does not always agree." |
| 02 | `diverges` | The day diverges | REALITY | "Different causes. The same question: how does the rest of the day look, and what can we do?" |
| 03 | `brief` | The brief, and the question it left open | THE BRIEF | "The system would be complicated. The customer would configure none of it. So how would it decide?" |
| 04 | `system` | What the system does before anyone sees anything | SYSTEM | "None of this is visible to the planner. Something had to be." |
| 05 | `tensions` | Three tensions, three questions | TENSION → QUESTION | Three questions stated; each names its decision |
| 06 | `decisionOne` | One switch | DECISION 1 | "Once switched on, the system acts alone. How does the planner find out?" |
| 07 | `decisionTwo` | The change reaches the planner | DECISION 2 | "Check updated data to solve possible issues. What does the planner see?" |
| 08 | `decisionThree` | The change becomes inspectable | DECISION 3 | "From the forecast to the schedule, the same hour. Was any of this right?" |
| 09 | `validation` | How it was checked | VALIDATION | "The record ends here." |
| 10 | `outcome` | What came of it | BOUNDED OUTCOME | Design outcome; target; unknowns |

Not used: Problem → Research → Ideation → Solution. The research that exists (scenario cards) lives inside REALITY; the system section replaces "ideation"; decisions replace "solution".

---

## 06. Section-by-section specification

Conventions: **Kicker** = `type-meta`; **Statement** = `type-display` or `type-heading` as noted; **Body** = `type-corpo`; **Caption** = `type-nota`; **Chip** = evidence label. Copy is final-draft; Phase 3 moves it into the content model without rewriting. PT follows EN in each block. Tone band per section refers to §20.

### 00 · Cover (`cover`)

- Purpose: frame the project; state the thesis; establish the honesty contract.
- Visual: cream field, one purple typographic moment (title), no illustration. Tone: cream → purple.
- Elements: eyebrow, h1 title, descriptor (lede), meta line, thesis (heading), disclosure (nota italic), evidence legend.

**EN**
- Eyebrow: `Case study · Product design · Workforce management · 2023`
- Title: `Intraday Reforecasting`
- Descriptor: `A workforce-management product for contact-centre operations could rewrite a day's forecast on its own when reality drifted from the plan. This is the design work around that automation.`
- Meta: `Role: product designer on the feature · Scope: configuration, system-state communication, inspectability · Company anonymised`
- Thesis: `The system could decide on its own to change the forecast. The design's job was to make that change reach the planner where they were working, make it inspectable against what it replaced, and make the next step obvious, while asking the customer to configure exactly one thing.`
- Disclosure: `The company and product are anonymised. Every product interface on this page is a neutral reconstruction of documented behaviour, populated with illustrative data. Labels mark what is documented, what is context, what is interpretation, what is reconstruction and what is exploration.`
- Legend chips: Research · Context · Interpretation · Reconstruction · Exploration

**PT**
- Eyebrow: `Caso de estudo · Design de produto · Gestão de recursos · 2023`
- Title: `Reprevisão Intradiária`
- Descriptor: `Um produto de gestão de recursos para operações de centros de contacto podia reescrever sozinho a previsão de um dia quando a realidade se afastava do plano. Este é o trabalho de design à volta dessa automação.`
- Meta: `Papel: designer de produto na funcionalidade · Âmbito: configuração, comunicação do estado do sistema, inspecção · Empresa anonimizada`
- Thesis: (§04 PT)
- Disclosure: `A empresa e o produto foram anonimizados. Todas as interfaces de produto nesta página são reconstruções neutras de comportamento documentado, com dados ilustrativos. As etiquetas distinguem o que está documentado, o que é contexto, o que é interpretação, o que é reconstrução e o que é exploração.`
- Legend: Pesquisa · Contexto · Interpretação · Reconstrução · Exploração

### 01 · A plan for a day that has not happened (`context`)

- Purpose: give the visitor three words (forecast, requirement, schedule) and one tension (the plan is made before the day).
- Visual: cream. Small three-node diagram, horizontal on desktop, vertical on mobile: `Forecast (contacts, handle time) → Staffing requirement (agents per interval) → Schedule (who works when)`. Diagram is SVG with a text list equivalent directly beneath.
- Evidence: Context (domain description supported by REQ user story and product surfaces visible in PDF p.10–16).

**EN**
- Kicker: `Context`
- Heading: `A plan for a day that has not happened`
- Body 1: `In a contact centre, the forecast is a plan. Before the day starts, a workforce-management product predicts how many contacts will arrive in each interval and how long each will take to handle. From that it derives how many agents are needed, interval by interval. The schedule is built to meet that requirement.`
- Body 2: `The person who owns this plan is the resource planner. Their job is not to admire the forecast. It is to keep service levels intact when the day does not follow it.`
- Diagram caption: `Three linked objects. Change the first and the other two are no longer true.`
- Closing (lede): `The plan is made before the day begins. The day does not always agree.`
- Chip: Context

**PT**
- Kicker: `Contexto`
- Heading: `Um plano para um dia que ainda não aconteceu`
- Body 1: `Num centro de contacto, a previsão é um plano. Antes de o dia começar, um produto de gestão de recursos prevê quantos contactos vão chegar em cada intervalo e quanto tempo cada um vai demorar a tratar. Daí deriva quantos agentes são necessários, intervalo a intervalo. A escala é construída para cumprir esse requisito.`
- Body 2: `A pessoa que é dona deste plano é o planeador de recursos. O seu trabalho não é admirar a previsão. É manter os níveis de serviço intactos quando o dia não a segue.`
- Diagram caption: `Três objectos ligados. Altere-se o primeiro e os outros dois deixam de ser verdadeiros.`
- Closing: `O plano é feito antes de o dia começar. O dia nem sempre concorda.`

### 02 · The day diverges (`diverges`)

- Purpose: show, with the project's own planner material, what goes wrong; make the demand/capacity distinction explicit; host Interaction 01.
- Visual: cream with lilac interaction frame. Tone: cream (human).
- Evidence: Research (scenario statements as documented, PDF p.4), with method caveat; Interpretation (demand/capacity split, AUDIT §05.2); Context (detection compares contact volume, REQ 3, PDF p.18).

**EN**
- Kicker: `The day diverges`
- Statement (display): `Different causes. The same question.`
- Body 1: `The project documented the situations planners actually face. Volume rises. Handle time lengthens. Agents call in sick, or get pulled into coaching, or turn out to be more numerous than planned. Every one of them ends in the same place: how does the rest of the day look now, and what can we do about it?`
- Scenario voice (quoted as documented, with caveat below): see Interaction 01 texts (§10).
- Body 2 (after interaction): `Two families hide inside these stories. Demand-side changes, volume and handle time, move the forecast itself. Capacity-side changes, absence and reallocation, leave the forecast alone and change what is available against it. The feature in this case study watches the first family. The second explains why planners care so much about the rest of the day.`
- Caveat (nota, italic): `Scenario statements as documented in the project with resource planners. The method and participants are not recorded in the sources available for this case study.`
- Closing (lede): `Whatever moved, the planner's question was about the hours still to come.`
- Chips: Research (scenarios) · Interpretation (families) · Context (what detection compares)

**PT**
- Kicker: `O dia diverge`
- Statement: `Causas diferentes. A mesma pergunta.`
- Body 1: `O projecto documentou as situações que os planeadores enfrentam de facto. O volume sobe. O tempo de atendimento alonga-se. Agentes ficam doentes, ou são chamados para coaching, ou afinal são mais do que o planeado. Todas acabam no mesmo sítio: como fica o resto do dia agora, e o que podemos fazer?`
- Body 2: `Dentro destas histórias escondem-se duas famílias. As alterações do lado da procura, volume e tempo de atendimento, movem a própria previsão. As alterações do lado da capacidade, ausências e realocações, deixam a previsão intacta e mudam o que existe para lhe responder. A funcionalidade deste caso observa a primeira família. A segunda explica porque é que os planeadores se preocupam tanto com o resto do dia.`
- Caveat: `Cenários tal como documentados no projecto com planeadores de recursos. O método e os participantes não constam das fontes disponíveis para este caso.`
- Closing: `Fosse o que fosse que se moveu, a pergunta do planeador era sobre as horas que ainda faltavam.`

### 03 · The brief, and the question it left open (`brief`)

- Purpose: present the user story as evidence; reveal the constraints progressively; land on the paradox (complex system, no customer configuration).
- Visual: lilac field (transition into system). Constraint list with progressive disclosure: a numbered list where each item is a `details`/expand control on desktop and mobile alike, all items expanded by default when reduced motion or no JS; expanding is purely to pace reading, not to hide content.
- Evidence: Context for every constraint (REQ). One Context item marked "target".

**EN**
- Kicker: `The brief`
- Heading: `The brief, and the question it left open`
- User story (presented as a labelled evidence block, `type-lede`, not a display quote): `As a resource planner, I want to update my forecast based on unexpected changes, so that I can make informed staffing decisions.` Chip: Context · Requirement.
- The note (evidence block, `type-corpo`): `The requirement added a note. This is typically a mitigation strategy. Not every customer will want it to happen every day. Customer research was needed to decide whether it should be configured per queue for automation, or run when the planner chooses.` Chip: Context · Requirement.
- Constraints intro: `Behind the one-sentence story sat a set of constraints. Each one shaped what the design could and could not put in front of a customer.`
- Constraints (each: title, one line, chip):
  1. `Same day only` · `The reforecast applies to the current day, defined by the account's time zone.` · Context
  2. `Checked at least every 30 minutes` · `The system evaluates the day at a fixed cadence.` · Context
  3. `Only above a threshold` · `A reforecast runs only when the gap between real and forecast values exceeds a calculated threshold derived from recent history.` · Context
  4. `Over several periods` · `A single odd interval is not enough. The deviation must hold across several consecutive periods.` · Context
  5. `Not on quiet queues` · `Low-volume and ultra-low-volume queues are excluded, and the threshold must respect a minimum number of contacts.` · Context
  6. `A different method` · `The intraday reforecast uses a different method from the original forecast.` · Context
  7. `A target, not a result` · `The brief set a target of 10% improvement in intraday forecast accuracy over the original forecast. Whether it was met is not part of this record.` · Context · Target
  8. `The reforecast becomes the forecast` · `It replaces the displayed forecast on the Forecast, Schedule and Insights surfaces, and is sent to reporting.` · Context
  9. `The original is kept` · `A baseline property records whether a value came from the original forecast or from a reforecast, so accuracy can be measured.` · Context
  10. `It triggers a scheduling simulation` · `A reforecast starts a simulation of the schedule. What the planner saw from it is not documented here.` · Context · Open
  11. `No customer configuration` · `In the first release the customer configures nothing. The feature is enabled per customer by an internal flag, with a customer-facing switch planned later.` · Context
- Closing (display, short): `The system would be complicated. The customer would configure none of it.`
- Bridge (lede): `So how would it decide?`

**PT**
- Kicker: `O brief`
- Heading: `O brief, e a pergunta que deixou em aberto`
- User story: `Como planeador de recursos, quero actualizar a minha previsão com base em alterações inesperadas, para poder tomar decisões de staffing informadas.`
- The note: `O requisito acrescentava uma nota. Isto é tipicamente uma estratégia de mitigação. Nem todos os clientes vão querer que aconteça todos os dias. Era preciso pesquisa com clientes para decidir se devia ser configurado por fila para automação, ou corrido quando o planeador escolhesse.`
- Constraints intro: `Por trás da história de uma frase havia um conjunto de restrições. Cada uma moldou o que o design podia e não podia pôr à frente de um cliente.`
- Constraints:
  1. `Só no próprio dia` · `A reprevisão aplica-se ao dia corrente, definido pelo fuso horário da conta.`
  2. `Verificado pelo menos a cada 30 minutos` · `O sistema avalia o dia a uma cadência fixa.`
  3. `Só acima de um limiar` · `Uma reprevisão só corre quando a diferença entre valores reais e previstos ultrapassa um limiar calculado a partir do histórico recente.`
  4. `Ao longo de vários períodos` · `Um único intervalo estranho não chega. O desvio tem de se manter ao longo de vários períodos consecutivos.`
  5. `Não em filas com pouco movimento` · `Filas de baixo e muito baixo volume ficam excluídas, e o limiar tem de respeitar um número mínimo de contactos.`
  6. `Um método diferente` · `A reprevisão intradiária usa um método diferente do da previsão original.`
  7. `Uma meta, não um resultado` · `O brief fixou uma meta de 10% de melhoria na precisão da previsão intradiária face à previsão original. Se foi atingida não faz parte deste registo.`
  8. `A reprevisão passa a ser a previsão` · `Substitui a previsão apresentada nas superfícies de Previsão, Escala e Insights, e é enviada para reporting.`
  9. `A original é guardada` · `Uma propriedade de base regista se um valor veio da previsão original ou de uma reprevisão, para que a precisão possa ser medida.`
  10. `Dispara uma simulação de escala` · `Uma reprevisão inicia uma simulação da escala. O que o planeador via a partir dela não está documentado aqui.`
  11. `Sem configuração pelo cliente` · `Na primeira versão o cliente não configura nada. A funcionalidade é activada por cliente através de um interruptor interno, com um controlo para o cliente planeado para mais tarde.`
- Closing: `O sistema ia ser complicado. O cliente não ia configurar nada dele.`
- Bridge: `Então como decidiria?`

### 04 · What the system does before anyone sees anything (`system`)

- Purpose: make monitoring vs execution legible; host Interaction 02; end on invisibility.
- Visual: purple field (system). Simulation in a neutral schematic frame (not product UI). Tone: purple.
- Evidence: Context (REQ 2–4); Context · unconfirmed for cadence parameters beyond REQ; Interpretation for the "designed not to over-react" reading.

**EN**
- Kicker: `The system`
- Heading: `What the system does before anyone sees anything`
- Body 1: `To decide what a planner should see, the designer first had to understand what the system would do without them. Every 30 minutes it compares the recent past with the forecast for the same intervals. Most of the time the two are close enough and nothing happens. Only when the gap is large enough, for long enough, on a queue with enough volume, does it rewrite the forecast for the rest of the day.`
- Body 2: `Two things are easy to confuse here. Monitoring is continuous. Reforecasting is exceptional. The system is designed not to react to every fluctuation.`
- Simulation: Interaction 02 (§11).
- Parameters note (nota): `Parameters beyond the requirements, such as a cap on runs per day and a minimum interval between runs, appear in the project's later materials but are not confirmed as requirements. They are shown here as project context and can be hidden.`
- Closing (display): `None of this is visible to the planner.`
- Bridge (lede): `Something had to be.`
- Chips: Context · Context (unconfirmed parameters) · Interpretation

**PT**
- Kicker: `O sistema`
- Heading: `O que o sistema faz antes de alguém ver seja o que for`
- Body 1: `Para decidir o que um planeador devia ver, o designer teve primeiro de perceber o que o sistema faria sem ele. A cada 30 minutos compara o passado recente com a previsão para os mesmos intervalos. Na maior parte do tempo estão suficientemente próximos e nada acontece. Só quando a diferença é grande o suficiente, durante tempo suficiente, numa fila com volume suficiente, é que reescreve a previsão para o resto do dia.`
- Body 2: `Há duas coisas fáceis de confundir aqui. A monitorização é contínua. A reprevisão é excepcional. O sistema está desenhado para não reagir a todas as flutuações.`
- Parameters note: `Parâmetros para além dos requisitos, como um máximo de execuções por dia e um intervalo mínimo entre execuções, aparecem em materiais posteriores do projecto mas não estão confirmados como requisitos. Aparecem aqui como contexto de projecto e podem ser ocultados.`
- Closing: `Nada disto é visível para o planeador.`
- Bridge: `Alguma coisa tinha de ser.`

### 05 · Three tensions, three questions (`tensions`)

- Purpose: pivot; convert system understanding into design questions.
- Visual: purple → lilac transition; three typographic blocks; no interaction. Each block: tension pair (meta), question (heading), decision pointer (nota link to section).
- Evidence: Interpretation (AUDIT §08), grounded in Context.

**EN**
- Kicker: `Three tensions`
- Statement (display): `What made this hard to design`
- Tension 1: meta `Automation versus control · complexity versus simplicity` · question `What should the customer actually have to decide?` · pointer `Decision 1 · One switch`
- Tension 2: meta `System change versus awareness` · question `How does the planner know the system changed something while they are working somewhere else?` · pointer `Decision 2 · The change reaches the planner`
- Tension 3: meta `Detection versus understanding versus action` · question `Once the forecast changes, how does the planner understand what changed, by how much, and where to act?` · pointer `Decision 3 · The change becomes inspectable`
- Chip: Interpretation

**PT**
- Kicker: `Três tensões`
- Statement: `O que tornou isto difícil de desenhar`
- Tension 1: `Automação versus controlo · complexidade versus simplicidade` · `O que é que o cliente devia mesmo ter de decidir?` · `Decisão 1 · Um interruptor`
- Tension 2: `Mudança do sistema versus consciência` · `Como é que o planeador sabe que o sistema alterou algo enquanto trabalha noutro lado?` · `Decisão 2 · A alteração chega ao planeador`
- Tension 3: `Detecção versus compreensão versus acção` · `Quando a previsão muda, como é que o planeador percebe o que mudou, quanto, e onde agir?` · `Decisão 3 · A alteração torna-se inspeccionável`

### 06 · One switch (`decisionOne`)

- Purpose: Decision 1; the argument is about what is absent.
- Visual: lilac field; reconstructed queue configuration in a neutral frame; small interaction (toggle). Tone: lilac → purple accent on the single control.
- Evidence: Context (REQ note, 5–6); Reconstruction (screen); Interpretation (rationale, which SPEECH 10 states but REQ does not).

**EN**
- Kicker: `Decision 1`
- Statement (display): `One switch per queue is the whole configuration.`
- Body 1: `The requirement had left a question open: automate per queue, or let the planner choose when to run it. The design answered with the smallest possible control. In the existing queue configuration, after service level, patience, shrinkage and the queue options, a final section appears. It contains one checkbox.`
- Body 2: `Nothing else is exposed. No threshold. No sensitivity. No frequency. No choice of method. Everything in the previous section stays inside the system. The customer decides whether, per queue, and never how.`
- Interaction caption (after toggle on): `That is the whole configuration.`
- Rationale (nota, italic): `The rationale for keeping the control to a single switch is recorded in the project's presentation, not in the requirements. It is presented here as interpretation consistent with both.`
- Open note (nota): `The requirements state that the first release had no customer configuration and used an internal flag. Whether this switch was part of a first or later release is not documented.`
- Closing (lede): `Once switched on, the system acts alone. How does the planner find out?`
- Chips: Context · Reconstruction · Interpretation · Open

**PT**
- Kicker: `Decisão 1`
- Statement: `Um interruptor por fila é toda a configuração.`
- Body 1: `O requisito tinha deixado uma pergunta em aberto: automatizar por fila, ou deixar o planeador escolher quando correr. O design respondeu com o controlo mais pequeno possível. Na configuração de fila já existente, depois do nível de serviço, da paciência, do shrinkage e das opções da fila, aparece uma última secção. Contém uma caixa de verificação.`
- Body 2: `Nada mais é exposto. Nenhum limiar. Nenhuma sensibilidade. Nenhuma frequência. Nenhuma escolha de método. Tudo o que estava na secção anterior fica dentro do sistema. O cliente decide se, por fila, e nunca como.`
- Interaction caption: `É toda a configuração.`
- Rationale: `A justificação para manter o controlo num único interruptor está registada na apresentação do projecto, não nos requisitos. É apresentada aqui como interpretação consistente com ambos.`
- Open note: `Os requisitos indicam que a primeira versão não tinha configuração pelo cliente e usava um interruptor interno. Se este controlo fez parte de uma primeira ou de uma versão posterior não está documentado.`
- Closing: `Uma vez ligado, o sistema age sozinho. Como é que o planeador descobre?`

### 07 · The change reaches the planner (`decisionTwo`)

- Purpose: Decision 2; two layers, three surfaces, states; host Interaction 03.
- Visual: purple field with cream interaction frame (the neutral product shell). Tone: purple.
- Evidence: Context (REQ 7 defines the three surfaces); Reconstruction (shell, banner, notification); Interpretation (the "never silently" principle; SPEECH 13).

**EN**
- Kicker: `Decision 2`
- Statement (display): `The forecast should not change silently.`
- Body 1: `The requirement said where the new forecast would appear: the Forecast, the Team schedule and Insights. That settled where the explanation had to live. A planner reading the schedule at eleven should not discover at noon that the numbers under their decisions had changed.`
- Body 2: `Two layers do the work. A notification centre, reachable from anywhere, announces that an anomaly was detected and a reforecast is in progress in the affected queues. A banner on each of the three surfaces says the same thing where the planner is looking, and offers to filter the view to what is affected. When the reforecast finishes, both layers change their wording. The banner does not say done. It says what to do next.`
- Interaction: Interaction 03 (§12).
- Principle (heading, short): `The state is global. The explanation is local.`
- Open note (nota): `The Preview action is documented as an affordance; what it opened is not recorded. Notifications outside the product, such as email or push, are not documented and are not shown.`
- Closing (lede): `Check updated data to solve possible issues. What does the planner see?`
- Chips: Context · Reconstruction · Interpretation · Open

**PT**
- Kicker: `Decisão 2`
- Statement: `A previsão não devia mudar em silêncio.`
- Body 1: `O requisito dizia onde a nova previsão ia aparecer: na Previsão, na Escala da equipa e nos Insights. Isso resolveu onde a explicação tinha de viver. Um planeador a ler a escala às onze não devia descobrir ao meio-dia que os números por baixo das suas decisões tinham mudado.`
- Body 2: `Duas camadas fazem o trabalho. Um centro de notificações, acessível de qualquer lado, anuncia que foi detectada uma anomalia e que está em curso uma reprevisão nas filas afectadas. Uma faixa em cada uma das três superfícies diz o mesmo onde o planeador está a olhar, e oferece filtrar a vista para o que está afectado. Quando a reprevisão termina, as duas camadas mudam de texto. A faixa não diz concluído. Diz o que fazer a seguir.`
- Principle: `O estado é global. A explicação é local.`
- Open note: `A acção Pré-visualizar está documentada como affordance; o que abria não está registado. Notificações fora do produto, como email ou push, não estão documentadas e não são mostradas.`
- Closing: `Verifique os dados actualizados para resolver possíveis problemas. O que é que o planeador vê?`

### 08 · The change becomes inspectable (`decisionThree`)

- Purpose: Decision 3; three mechanisms; host Interactions 04 and 05, separated by a reading beat.
- Visual: purple → cream. Two interaction frames with body copy between them. Tone: purple accent on statements; cream frames for reconstructions.
- Evidence: Context (REQ 8 makes comparison possible); Reconstruction (Forecast, Issues, Schedule); Exploration (severity tiers); Interpretation (the loop-closing reading).

**EN**
- Kicker: `Decision 3`
- Statement (display): `The change should not only be announced. It should be inspectable.`
- Body 1: `Three mechanisms turn an announcement into something a planner can judge. The Forecast header counts the issues found and links to them. A switch overlays the previous forecast on the current one, so the size of the change is visible rather than remembered. And each issue names its queue, its trigger, its end and its cause in plain language, then leads to the exact period on the forecast and the same period on the schedule.`
- Mechanism 1 heading: `How much did it change?`
- Body 2: `Because the original forecast is kept, the comparison is possible. The current forecast is a solid line. The previous one is dotted. Both are labelled. The planner can see what the system replaced.`
- Interaction 04 (§13).
- Mechanism 2 heading (reading beat): `Where, and why?`
- Body 3: `An issues log records every event: when it was triggered, when it ended, which queue, how severe, and a description in the planner's own units: contact volume was thirty percent higher than forecast for four consecutive periods. A link opens the forecast at that period. The schedule marks the same hour.`
- Interaction 05 (§14).
- Exploration note (nota, dashed chip): `Severity tiers, Critical, Major and Minor, appear in the project's designs. The rule that assigns them is not documented. They are shown here as a design exploration, not as system logic.`
- Closing (lede): `From the forecast to the schedule, the same hour. Was any of this right?`
- Chips: Context · Reconstruction · Exploration · Interpretation

**PT**
- Kicker: `Decisão 3`
- Statement: `A alteração não devia ser só anunciada. Devia ser inspeccionável.`
- Body 1: `Três mecanismos transformam um anúncio em algo que um planeador pode avaliar. O cabeçalho da Previsão conta os problemas encontrados e liga a eles. Um interruptor sobrepõe a previsão anterior à actual, para que o tamanho da alteração seja visível em vez de lembrado. E cada problema nomeia a sua fila, o seu início, o seu fim e a sua causa em linguagem simples, e depois conduz ao período exacto na previsão e ao mesmo período na escala.`
- Mechanism 1: `Quanto é que mudou?`
- Body 2: `Porque a previsão original é guardada, a comparação é possível. A previsão actual é uma linha contínua. A anterior é ponteada. Ambas estão identificadas. O planeador consegue ver o que o sistema substituiu.`
- Mechanism 2: `Onde, e porquê?`
- Body 3: `Um registo de problemas guarda cada evento: quando foi disparado, quando terminou, em que fila, com que gravidade, e uma descrição nas unidades do próprio planeador: o volume de contactos esteve trinta por cento acima da previsão durante quatro períodos consecutivos. Uma ligação abre a previsão nesse período. A escala marca a mesma hora.`
- Exploration note: `Os níveis de gravidade, Crítico, Maior e Menor, aparecem nos desenhos do projecto. A regra que os atribui não está documentada. Aparecem aqui como exploração de design, não como lógica do sistema.`
- Closing: `Da previsão à escala, a mesma hora. Alguma coisa disto estava certa?`

### 09 · How it was checked (`validation`)

- Purpose: the most honest section; strategy, not results.
- Visual: cream; plain text; labels prominent. No interaction.
- Evidence: Context (PDF p.11; SPEECH 2, 21); Context · designer-provided (JOÃO); Open.

**EN**
- Kicker: `Validation`
- Heading: `How it was checked`
- Body 1: `The timeline was short. Feedback had to arrive before development started, and development needed something concrete to start from. So the design was built as high-fidelity prototypes from the beginning, close enough to the real product that customers could react to behaviour rather than to sketches.`
- Body 2: `The prototypes were reviewed closely with three customer companies. The scenarios earlier on this page were documented with resource planners.`
- Body 3 (what is not claimed): `What this record does not contain: how many people took part, how the sessions ran, what was said, what changed as a result, and whether the brief's accuracy target was ever measured. None of that is claimed here.`
- Label lines under each body: Body 1 → Context; Body 2 → Context · designer-provided; Body 3 → Open.
- Closing (lede): `The record ends here.`

**PT**
- Kicker: `Validação`
- Heading: `Como foi verificado`
- Body 1: `O prazo era curto. O feedback tinha de chegar antes de o desenvolvimento começar, e o desenvolvimento precisava de algo concreto para arrancar. Por isso o design foi construído desde o início como protótipos de alta fidelidade, suficientemente próximos do produto real para que os clientes reagissem ao comportamento e não a esboços.`
- Body 2: `Os protótipos foram revistos de perto com três empresas clientes. Os cenários mais acima nesta página foram documentados com planeadores de recursos.`
- Body 3: `O que este registo não contém: quantas pessoas participaram, como decorreram as sessões, o que foi dito, o que mudou em consequência, e se a meta de precisão do brief chegou a ser medida. Nada disso é aqui afirmado.`
- Closing: `O registo termina aqui.`

### 10 · What came of it (`outcome`)

- Purpose: bounded outcome; separate design outcome from product outcome; unknowns; reflection.
- Visual: cream with a final purple typographic statement; disclosure repeated. No interaction.
- Evidence: Interpretation (design outcome); Context (target); Open (product outcome).

**EN**
- Kicker: `Outcome`
- Statement (display): `A complex automation became one decision, a clear signal and an inspectable change.`
- Design outcome heading: `Design outcome`
- Body 1: `The project translated an automated, threshold-driven reforecasting mechanism into an experience with one configuration decision per queue, explicit communication of system-initiated change across the three surfaces it touched, a comparison with the forecast it replaced, and a path from each anomaly to the affected period in the schedule.`
- Product outcome heading: `Product outcome`
- Body 2: `Not documented. Whether the feature reached customers, in what form, and with what effect is outside the sources available for this case. The brief set a target of 10% improvement in intraday forecast accuracy over the original forecast. Whether it was met is not recorded here.`
- Reflection heading: `Reflection`
- Body 3: `The most consequential design work in this project was subtraction: deciding that a planner would never see a threshold, and that a customer would decide one thing. The second most consequential was language: in progress, updated, check the data. The interfaces are the smaller part.`
- Unknowns heading: `What remains open`
- Unknowns list (nota): `Production status · Whether the switch shipped or the internal flag alone · Accuracy against the target · Final threshold method and cadence limits · Whether handle time also triggers detection · The severity rule · What Preview and Check insights opened · What the schedule showed after the simulation · The participants and format of the customer reviews`
- Disclosure (repeat of cover).

**PT**
- Kicker: `Resultado`
- Statement: `Uma automação complexa tornou-se uma decisão, um sinal claro e uma alteração inspeccionável.`
- Design outcome: `Resultado de design` · `O projecto traduziu um mecanismo de reprevisão automático, accionado por limiar, numa experiência com uma decisão de configuração por fila, comunicação explícita da alteração iniciada pelo sistema nas três superfícies que ela tocava, uma comparação com a previsão que substituiu, e um caminho de cada anomalia até ao período afectado na escala.`
- Product outcome: `Resultado de produto` · `Não documentado. Se a funcionalidade chegou aos clientes, em que forma e com que efeito está fora das fontes disponíveis para este caso. O brief fixou uma meta de 10% de melhoria na precisão da previsão intradiária face à previsão original. Se foi atingida não está aqui registado.`
- Reflection: `Reflexão` · `O trabalho de design com mais consequência neste projecto foi subtracção: decidir que um planeador nunca veria um limiar, e que um cliente decidiria uma coisa. O segundo foi linguagem: em curso, actualizada, verifique os dados. As interfaces são a parte mais pequena.`
- Unknowns: `O que continua em aberto` · `Estado de produção · Se o interruptor foi lançado ou só o sinalizador interno · Precisão face à meta · Método final do limiar e limites de cadência · Se o tempo de atendimento também dispara a detecção · A regra de gravidade · O que Pré-visualizar e Ver insights abriam · O que a escala mostrava depois da simulação · Os participantes e o formato das revisões com clientes`

---

## 07. Content model

Follow the Carpool pattern: `src/content/intraday/{types.ts, en.ts, pt.ts, index.ts}` plus a language-neutral `dataset.ts`. Conceptual model (not code):

```
IntradayContent
  meta: { title, description }
  disclosure: string
  labels: Record<EvidenceKind, string>          // research | context | inference | reconstruction | exploration
  openLabel: string                             // "Open" chip text
  cover: { eyebrow, title, descriptor, meta, thesis }
  context: { kicker, heading, body: string[], diagram: { nodes: string[3], caption }, closing }
  diverges: { kicker, statement, body: string[2], caveat, closing,
              scenarios: Scenario[3] }          // see §10
  brief: { kicker, heading, userStory, note, constraintsIntro,
           constraints: Constraint[11], closing, bridge }
  system: { kicker, heading, body: string[2], parametersNote, closing, bridge,
            simulation: SimulationCopy }         // see §11
  tensions: { kicker, statement, items: Tension[3] }
  decisionOne: { kicker, statement, body: string[2], toggleCaption, rationale, openNote, closing,
                 config: QueueConfigCopy }       // see §15
  decisionTwo: { kicker, statement, body: string[2], principle, openNote, closing,
                 shell: ShellCopy, banner: BannerCopy, notifications: NotificationCopy }
  decisionThree: { kicker, statement, body: string[3], mechanismOne, mechanismTwo,
                   explorationNote, closing,
                   compare: CompareCopy, issues: IssuesCopy, schedule: ScheduleCopy }
  validation: { kicker, heading, body: string[3], bodyLabels: EvidenceKind|'open'[3], closing }
  outcome: { kicker, statement, designHeading, designBody, productHeading, productBody,
             reflectionHeading, reflectionBody, unknownsHeading, unknowns: string[] }
  interact: InteractStrings                     // all control labels, live-region templates, step names
```

Typed sub-structures:

```
Scenario { id: 'volume'|'handleTime'|'capacity'; label; quote; quoteSource; whatChanged; affects; side: 'demand'|'capacity'; detected: 'yes'|'open'|'no'; detectedNote; plannerQuestion }
Constraint { id; title; line; chips: ('context'|'target'|'open')[] }
Tension { id; pair; question; pointerLabel; pointerTarget: 'decisionOne'|'decisionTwo'|'decisionThree' }
SimulationCopy { stepNames: string[6]; stepBodies: string[6]; legend: { forecast, actual, threshold, window }; liveTemplate; parametersToggleLabel }
QueueConfigCopy { pageTitle; fields: { label, value, hint }[]; optionsHeading; options: { label, hint }[]; reforecastHeading; reforecastLabel; reforecastHint; saveLabel; cancelLabel }
ShellCopy { productName; nav: string[]; surfaces: { forecast, schedule, insights }; header: { updatedTemplate, issuesTemplate } }
BannerCopy { states: { inProgress: { status, phrase }, updated: { status, phrase } }; actions: { applyFilter, preview, checkInsights } }
NotificationCopy { title; markAllRead; today; items: { anomaly: { title, body, action }, completed: { title, body, action } }; timeTemplate }
CompareCopy { toggleLabel; currentLabel; previousLabel; axisLabels; summaryTemplate }
IssuesCopy { pageTitle; countTemplate; columns: { trigger, end, queue, severity, description, action }; severities: { critical, major, minor }; checkForecast; descriptionTemplate }
ScheduleCopy { pageTitle; tooltip; requiredLabel; scheduledLabel; gapLabel; agentsCountTemplate }
InteractStrings { advance, back, reset, stepOf, selectScenario, illustrative, reconstruction, surfaceSwitcher, applyFilter, filterApplied, showPrevious, hidePrevious, selectIssue, goToSchedule, goToForecast, textAlternativeHeading, ... }
```

`dataset.ts` (language-neutral): account, queues, date (ISO), timezone, intervals, forecast[], actual[], updatedForecast[], thresholdIllustrative, checks[], anomalyWindow, issues[], agents[], shifts[], requiredBaseline[], requiredUpdated[], scheduled[]. Localised display of dates and numbers happens in components using `Intl` with `en-GB` and `pt-PT`.

Rule: no copy longer than a label lives in a component.

---

## 08. Evidence labels

Reuse the Carpool five-kind system, plus a small "Open" marker.

| Kind | EN label | PT label | Used in this case for | Visual (site convention, Carpool) |
|---|---|---|---|---|
| research | Research evidence | Evidência de pesquisa | Scenario statements (PDF p.4) only, with method caveat | Solid border, research hue |
| context | Project context | Contexto de projecto | Requirements; timeline; hi-fi strategy; three-company review; unconfirmed parameters (with "unconfirmed" suffix in copy) | Solid border, muted |
| inference | Interpretation | Interpretação | Demand/capacity split; rationale for single switch; "state global, explanation local"; design outcome | Dashed border, ink |
| reconstruction | Reconstruction | Reconstrução | Every product surface; the dataset; the simulation | Dotted border |
| exploration | Design exploration | Exploração de design | Severity tiers | Dashed border, warn hue |
| open (marker) | Open | Em aberto | Preview behaviour; simulation output; release of the switch; handle-time trigger | Small text marker, not a chip colour |

Placement: legend on cover; one chip row at the top of each section body listing the kinds present; the RECONSTRUCTION chip inside every product frame's bar (Carpool `Frame` pattern); "Illustrative data" as a persistent caption on every chart and table.

---

## 09. Interaction system

Shared rules for all five interactions:

- **Control before motion.** Nothing advances without a visitor action. No autoplay, no scroll-triggered state change, no loops.
- **Conclusion without interaction.** Each interaction is preceded by copy that states the conclusion and followed by a textual equivalent (a collapsible "Read this as text" region, expanded by default under `prefers-reduced-motion: reduce` and when JS is unavailable).
- **State announced once.** One `aria-live="polite"` region per interaction receives a single sentence on each state change (templates in `interact`).
- **Semantics.** Real `button` elements with `aria-pressed` for toggles; `role="group"` with `aria-label` for control clusters; `role="tablist"` for surface switching; `input[type=range]` with `aria-valuetext` for the scrubber; `table` semantics for the issues log; SVG charts with `role="img"` and `aria-label` plus a visually hidden data summary.
- **Focus.** Visible `:focus-visible` ring on all controls; on purple fields, a double ring (2 px cream outline + 2 px ink offset) so it remains visible.
- **Targets.** 44 × 44 px minimum; range thumb 28 px with a 44 px hit area.
- **Frame.** Every interaction sits in a `Frame` with a bar (title + chips + "Illustrative data") and a caption slot.
- **Continuity.** The same fictional day, the same queue (Support), the same anomaly hour (10:00–11:00) across 02, 04, 07 and 08.
- **Reduced motion.** State changes render instantly; charts redraw without transition.
- **Static fallback.** Each interaction defines a still composition (first meaningful state) for print or no-JS.

---

## 10. Interaction 01: scenarios

**Question it answers:** why do such different events lead to one planner question, and which of them does the documented system observe?

**Inputs (segmented control, `role="group"`, buttons with `aria-pressed`):** Volume · Handle time · Capacity.

**Illustrative day representation:** a single simplified bar-and-line panel for the Support queue, 08:00–20:00, hourly. Two series: "Agents required" (bars) and "Agents scheduled" (line). Baseline from §16. On selection:

| Scenario | What changed (EN / PT) | Affects | Side | Detected by documented detection | Panel change |
|---|---|---|---|---|---|
| Volume | `Contact volume runs 30% above forecast from 10:00.` / `O volume de contactos corre 30% acima da previsão a partir das 10:00.` | Required agents rise for the rest of the day | Demand | **Yes** (contact volume is the documented comparison) | Required bars from 11:00 rise to `requiredUpdated`; scheduled line unchanged; gap markers appear 11:00 onwards |
| Handle time | `Average handle time runs 30% above forecast from 10:00.` / `O tempo médio de atendimento corre 30% acima da previsão a partir das 10:00.` | Required agents rise for the rest of the day | Demand | **Open** (not established in the sources) | Same shape as Volume; note reads "Open" |
| Capacity | `At 09:00, the whole first shift calls in sick. About 100 agent-hours are gone.` / `Às 09:00, todo o primeiro turno liga a dizer que está doente. Desaparecem cerca de 100 horas de agente.` | Scheduled agents fall; requirement unchanged | Capacity | **No** (the documented detection compares contact volume; capacity changes reach the plan through scheduling, not through detection) | Scheduled line drops from 09:00 (illustrative: shifts 1–5 removed until 13:00); required bars unchanged; gap markers 09:00–13:00 |

**Scenario quotes (as documented, PDF p.4; shown under the selected scenario with the caveat):**
- Volume: factor card `Additional volume` and the question `If there's a 30% increase in handling time, how will this impact us at 9 PM, and what actions can we take to address it?` is a *handle-time* question and belongs to Handle time. For Volume use the speech-aligned card text `Additional volume.` only; do not fabricate a longer quote.
- Handle time: `If there's a 30% increase in handling time, how will this impact us at 9 PM, and what actions can we take to address it?`
- Capacity: `We lose 100 hours due to absenteeism, and all agents call in sick for their first shift. It's 9:00 in the morning; how does the rest of the day look with these 100 hours taken out of the mix? This is crucial for us to recalibrate and forecast effectively.`
- PT: quotes are translated with a marker `(tradução)` after the caveat, since the documented wording is English. EN shows original.

**Always-visible planner question (heading under panel):** EN `How does the rest of the day look, and what can we do?` · PT `Como fica o resto do dia, e o que podemos fazer?`

**Detection line (nota, with chip):** EN templates: `Observed by the documented detection: yes. It compares contact volume with the forecast.` / `Observed by the documented detection: open. The sources do not say whether handle time also triggers it.` / `Not observed by the documented detection. Capacity changes reach the plan through the schedule, not through detection.` PT: `Observado pela detecção documentada: sim. Compara o volume de contactos com a previsão.` / `Observado pela detecção documentada: em aberto. As fontes não dizem se o tempo de atendimento também a dispara.` / `Não observado pela detecção documentada. As alterações de capacidade chegam ao plano através da escala, não da detecção.`

**Live region template:** `{scenario} selected. {whatChanged} {affects}. {side} side. {detectedSentence}`

**Textual equivalent:** a three-row definition list with the same five fields per scenario, always in DOM, visually collapsed behind "Read as text" except under reduced motion / no JS.

**Responsive:** Desktop: controls left (stacked), panel right, quote and detection line below panel. Tablet: controls above panel. Mobile: segmented control full width; panel reduced to the hourly bars only (no scheduled line), height ≤ 160 px; quote and detection line become the primary content; the panel may be hidden behind "Show illustration".

**Static fallback:** Volume state.

**Labels:** Frame bar: `Scenarios · Illustrative data` + chips Research (quotes) · Interpretation (sides) · Context (detection).

---

## 11. Interaction 02: detection and reforecast

**Question it answers:** how does the system decide, and why does it not react to every fluctuation?

**Representation:** schematic (not product UI). A horizontal timeline 08:00–13:00 in 15-minute cells for the Support queue. Two series: forecast (solid muted line with small squares) and actual (solid ink line with round markers). A shaded "check window" bracket covering the four cells evaluated at each check. A dashed threshold envelope around the forecast (illustrative ±15%, labelled "illustrative threshold"). Below the timeline, a check ledger: one row per 30-minute check with time, window, deviation, periods above threshold, and result.

**Control:** stepper (`Back` / `Advance`, plus a numbered step list `role="list"` with buttons) on all breakpoints; on desktop an additional `input[type=range]` scrubber synchronised with the stepper (`aria-valuetext` = step name). Six steps.

| Step | Time | State name (EN / PT) | What the visitor sees | Ledger row | Body (EN / PT) |
|---|---|---|---|---|---|
| 1 | 09:30 check | `Normal deviation` / `Desvio normal` | Window 08:30–09:29; actual close to forecast; one cell (09:15) pokes above envelope | `08:30–09:29 · +6% · 1 of 4 periods above · No action` | `One busy quarter-hour is not a trend. The check sees the hour as a whole. Nothing happens.` / `Um quarto de hora agitado não é uma tendência. A verificação vê a hora como um todo. Nada acontece.` |
| 2 | 10:30 check | `Deviation continues` / `O desvio continua` | Window 09:30–10:29; last two cells above envelope | `09:30–10:29 · +12% · 2 of 4 periods above · No action` | `The gap is growing, but it has not held for long enough. Still nothing.` / `A diferença está a crescer, mas ainda não se manteve tempo suficiente. Continua a não acontecer nada.` |
| 3 | 11:00 check | `Threshold crossed` / `Limiar ultrapassado` | Window 10:00–10:59; all four cells above envelope; envelope edge highlighted | `10:00–10:59 · +30% · 4 of 4 periods above · Conditions met` | `Large enough, for long enough, on a queue with enough volume. The conditions are met.` / `Grande o suficiente, durante tempo suficiente, numa fila com volume suficiente. As condições estão reunidas.` |
| 4 | 11:00 | `Anomaly detected` / `Anomalia detectada` | Marker at 11:00; the anomaly band 10:00–11:00 appears (hatched + label) | `11:00 · Anomaly detected · Support` | `The system records an anomaly for the Support queue. This is the first moment anything could be shown to a planner.` / `O sistema regista uma anomalia para a fila Suporte. É o primeiro momento em que algo podia ser mostrado a um planeador.` |
| 5 | 11:00–11:04 | `Reforecast in progress` / `Reprevisão em curso` | Rest-of-day forecast line becomes dimmed; progress marker | `11:00–11:04 · Reforecast running` | `The rest of the day is being recomputed with a different, lighter method than the original forecast.` / `O resto do dia está a ser recalculado com um método diferente e mais leve do que a previsão original.` |
| 6 | 11:04 | `Forecast updated` / `Previsão actualizada` | New forecast line from 11:15 onwards (solid, current); previous shown dotted; timeline extends to 20:00 in a compressed tail | `11:04 · Forecast updated · Support · rest of day` | `The forecast for the rest of the day is replaced. The original is kept so the two can be compared, and so accuracy can be measured later.` / `A previsão para o resto do dia é substituída. A original é guardada para que as duas possam ser comparadas, e para que a precisão possa ser medida mais tarde.` |

**Key learning line (persistent under the ledger, `type-heading`):** EN `Monitoring is continuous. Reforecasting is exceptional.` · PT `A monitorização é contínua. A reprevisão é excepcional.`

**Parameters layer (off by default; toggle "Show project-context parameters"):** when on, two small annotations appear, each with chip Context · unconfirmed: `Later project materials describe a cap of two runs per day per queue.` and `…and at least one hour between runs.` PT: `Materiais posteriores do projecto descrevem um máximo de duas execuções por dia por fila.` / `…e pelo menos uma hora entre execuções.` Neither annotation is required for the six steps to make sense.

**Method wording:** never "multiplies by a factor" in copy; the illustrative updated values are simply "the updated forecast". A nota under step 6: `The exact recalculation method is engineering-owned and not detailed here.` / `O método exacto de recálculo pertence à engenharia e não é detalhado aqui.`

**Live region template:** `Step {n} of 6: {stateName}. {ledgerRow}.`

**Textual equivalent:** ordered list of the six steps with time, window, deviation, periods above, result, and body. Always in DOM.

**Responsive:** Desktop: timeline (full width) + scrubber + stepper + ledger below. Tablet: same, ledger becomes two-column. Mobile: stepper only (Back / Advance, step 3 of 6); the timeline collapses to the current check window only (four cells, large) plus a mini day strip indicating position; ledger shows the current row only; the vertical step list replaces the scrubber.

**Static fallback:** step 3 (threshold crossed) with the full ledger visible.

**Labels:** Frame bar: `Detection and reforecast · Schematic · Illustrative data` + chips Context · Reconstruction · Interpretation.

---

## 12. Interaction 03: system state change

**Question it answers:** how does a planner working elsewhere learn that the system changed the forecast, and why does the explanation appear where they are?

**Representation:** the neutral product shell (§15) containing one of three surfaces, a notification bell with badge, a notification panel, and the banner slot. Controls: `Advance state` / `Back` stepper; surface switcher `role="tablist"` (Forecast · Team schedule · Insights); `Apply filter` inside the banner; bell button toggles the notification panel.

| State | System event (dataset) | Notification centre | Banner (all three surfaces) | Forecast header | Body (EN / PT) |
|---|---|---|---|---|---|
| A · No anomaly | 10:45; monitoring | Empty ("No notifications today") | None | `Updated today at 06:00` (baseline run; Context: the requirement's "could" item to show the latest run time) | `A normal morning. The planner is reading the team schedule.` / `Uma manhã normal. O planeador está a ler a escala da equipa.` |
| B · Anomaly detected | 11:00 | Badge 1; item: `Anomaly detected · 11:00 · Reforecast in progress in the affected queues · Preview` | `Anomaly detected · Reforecast in progress · Apply filter · Preview` (+ `Check insights` on Forecast and Team schedule) | unchanged | `The system announces the change before it makes it.` / `O sistema anuncia a alteração antes de a fazer.` |
| C · Reforecast in progress | 11:00–11:04 | unchanged | unchanged; banner shows a subtle in-progress indicator (text `in progress`, no spinner animation under reduced motion) | unchanged | `Whichever surface the planner is on, the banner is there. Apply filter narrows the view to the affected queue.` / `Esteja o planeador na superfície que estiver, a faixa está lá. Aplicar filtro reduz a vista à fila afectada.` |
| D · Forecast updated | 11:04 | Badge 2; new item: `Reforecast completed · 11:04 · Check updated data to solve possible issues · Preview` | `Anomaly detected · Forecast updated · Apply filter · Preview` (+ `Check insights` on Forecast and Team schedule) | `Updated today at 11:04` | `The wording changes. Not done. Check the data.` / `O texto muda. Não concluído. Verifique os dados.` |
| E · Issues available | 11:04 | unchanged | unchanged | `Updated today at 11:04 · 1 issue found` (link) | `The header now counts what needs attention and links to it. The next section follows that link.` / `O cabeçalho passa a contar o que precisa de atenção e liga a isso. A secção seguinte segue essa ligação.` |

**Default surface at state A:** Team schedule (so the visitor is "elsewhere"). The switcher is available in every state.

**Apply filter:** when pressed in states B–E, the current surface filters to `Support`; a chip `Filter: Support` appears with a clear control; announced once.

**Preview:** rendered as an affordance; pressing it shows a tooltip-style note `Behaviour not documented (open)` / `Comportamento não documentado (em aberto)`. It must not open an invented view.

**Check insights:** pressing switches the surface to Insights (supported by PDF p.14 as an action on Forecast and Team schedule banners; what Insights showed beyond the chart is not documented, so Insights carries only the banner and the generic chart).

**Persistent principle (heading under the frame):** EN `The state is global. The explanation is local.` · PT `O estado é global. A explicação é local.`

**Live region template:** `State {letter}: {stateName}. {notificationSummary}. Banner: {bannerText}.`

**Textual equivalent:** a table of the five states with notification, banner and header text per surface.

**Responsive:** Desktop: full shell at container width 1080 px (sidebar nav 200 px, content). Tablet: sidebar collapses to icon rail; content keeps banner + header + simplified body. Mobile: no shell; a stacked composition of three cards, top to bottom: surface tabs, notification panel (as a sheet toggled by the bell), banner, header line. The surface body is omitted below 640 px except for a one-line description (`Team schedule · 10 agents`).

**Static fallback:** state D on Forecast.

**Labels:** Frame bar: `System state · Reconstruction · Illustrative data` + chips Context · Reconstruction · Open (Preview).

---

## 13. Interaction 04: previous vs new forecast

**Question it answers:** how much did the forecast actually change?

**Representation:** reconstructed Forecast surface, chart only (header + chart + legend + toggle; no table). X axis 08:00–20:00 hourly; left Y axis contacts per hour. Series: current forecast (solid ink line, label `Current forecast`), actuals up to 11:00 (ink round markers, label `Actual`), previous forecast (dotted muted line, label `Previous forecast`, visible only when toggled). Anomaly band 10:00–11:00 (hatched, text marker `Anomaly detected in this period`). Optional lower strip: required staff bars baseline vs updated (desktop only).

**Control:** `Show previous forecast` switch (`button` with `aria-pressed`, styled as a switch, label always visible). Default off; state persists while in section.

**Toggle-on result:** dotted previous line appears from 11:15 to 20:00 (before 11:15 the two coincide; render the previous as coincident dotted under the solid so the divergence point is legible). A delta summary appears in the caption: EN `From 11:15, the updated forecast is about 30% above the previous one for the rest of the day. Illustrative values.` · PT `A partir das 11:15, a previsão actualizada está cerca de 30% acima da anterior para o resto do dia. Valores ilustrativos.`

**Colour independence:** solid vs dotted stroke; markers vs none; direct labels at line ends; legend with stroke samples.

**Explicit negative rule:** no annotation, badge or number on this chart may reference 10%, accuracy, or improvement.

**Live region template:** on toggle on `Previous forecast shown. {summary}`; on toggle off `Previous forecast hidden.`

**Textual equivalent:** hourly table 11:00–19:00 with columns Previous · Current · Difference (%), from §16.

**Responsive:** Desktop: full chart with staff strip. Tablet: chart without staff strip. Mobile: chart height ≤ 200 px, two series only (current, previous) plus band; actuals omitted; hourly ticks every 2 h; toggle full-width above chart; table equivalent prominently linked.

**Static fallback:** toggle on.

**Labels:** Frame bar: `Forecast · Show previous forecast · Reconstruction · Illustrative data` + chips Context (baseline kept) · Reconstruction.

---

## 14. Interaction 05: issue to location

**Question it answers:** from "1 issue found" to the exact hour on the schedule, is the path continuous?

**Representation:** three linked panels: (a) the Forecasting issues table; (b) the Forecast chart with the anomaly band; (c) the Team schedule grid with the same period highlighted. On desktop all three are visible (table above; chart and schedule side by side). Path controls: the `1 issue found` header link (entry), row selection, `Check forecast` link in the row, `Go to schedule` link on the chart band.

**Steps (visitor-controlled):**
1. Entry: Forecast header `Updated today at 11:04 · 1 issue found`. Pressing focuses the issues table (state "Issues").
2. Issues table (§16 issues, newest first). Selecting the Support row highlights it (`aria-selected`) and previews its description.
3. `Check forecast` on that row: the chart scrolls/focuses, the band 10:00–11:00 is highlighted with the text marker `Anomaly detected in this period` and the row's description; live region announces.
4. `Go to schedule` on the band: the schedule grid focuses; the 10:00–11:00 column group is highlighted with the identical band style and tooltip text; the rest-of-day gaps (required vs scheduled) are marked with the neutral gap marker `−n`.
5. Terminal caption: EN `Same hour. Same words. Same mark. The planner is now where the staffing decision happens.` · PT `A mesma hora. As mesmas palavras. A mesma marca. O planeador está agora onde a decisão de staffing acontece.`

Selecting a secondary issue (Billing, Orders) shows its description and disables `Check forecast` with a note `Only today's Support event is illustrated on this page` / `Só o evento de hoje na fila Suporte é ilustrado nesta página`, to avoid inventing additional charts.

**Highlight vocabulary (identical on chart and schedule):** hatched band + top text label + 1.5 px ink border; tooltip/label text identical; never colour alone.

**Live region templates:** `Issue selected: {queue}, {trigger}. {description}` · `Forecast shows the anomaly period 10:00 to 11:00.` · `Team schedule shows the same period, 10:00 to 11:00. Gaps from 11:00: {gapSummary}.`

**Textual equivalent:** the issue as a definition list; the period in words; the schedule gaps as a list.

**Responsive:** Desktop: three panels. Tablet: table, then chart, then schedule stacked; sticky mini-header showing the selected issue. Mobile: one panel at a time as steps (Issue card → Forecast band → Schedule period) with Back/Next; schedule rendered as a period list (10:00–11:00 highlighted; 11:00–20:00 with required/scheduled/gap), not a grid.

**Static fallback:** step 4.

**Labels:** Frame bar: `Issues · Forecast · Team schedule · Reconstruction · Illustrative data` + chips Reconstruction · Exploration (severity) · Context.

---

## 15. Neutral product UI system

Purpose: communicate "reconstruction of documented behaviour", never "screenshot".

**Shell**
- Product name in shell header: `Workforce management` (EN) / `Gestão de recursos` (PT). No logo; a neutral square glyph placeholder is acceptable, monochrome.
- Left navigation (desktop): Forecast · Team schedule · Insights · Configuration. (PT: Previsão · Escala da equipa · Insights · Configuração.) "Your schedule" and "Scenarios" omitted.
- Header right: bell with badge (`aria-label="Notifications, {n} unread"`), neutral avatar circle with initials `RP`.
- Chrome colours: `--ui-surface` white, `--ui-bar` cool grey; **no purple in chrome** (§20). Radius 4 px (site `--radius-ui`). Border 1 px `--ui-border`.
- Type: Nudica, 13–14 px UI text, `tnum` on numbers.

**Queue configuration (Decision 1)**
- Page title: `Support` · subtitle `Queue configuration` (PT `Configuração de fila`). Buttons: `Cancel` · `Save` (neutral, disabled-looking in the reconstruction; pressing does nothing; `aria-disabled`).
- Fields (fictional values): Service level goal `80 % within 30 seconds` (hint: `Interactions answered within this time count towards the service level.`); Patience `45 seconds` (hint: `Interactions waiting longer are assumed abandoned.`); Shrinkage `12 %` (hint: `Share of scheduled time lost to unplanned activities.`).
- Queue options heading; options as checkboxes, unchecked, non-functional: `Minimum staffing` (hint `Schedule agents even when no volume is forecast.`); `Concurrent interactions` (hint `Allow agents to handle more than one interaction at a time.`); `Business hours` (hint `Forecast volume only inside business hours.`).
- Final section, visually separated by the lilac band: heading `Reforecast`; checkbox `Turn on reforecast`; hint `If enabled, the system will reforecast this queue.` This is the only functional control.
- PT: `Nível de serviço`, `80 % em 30 segundos`; `Paciência`, `45 segundos`; `Shrinkage`, `12 %`; `Opções da fila`: `Staffing mínimo`, `Interacções simultâneas`, `Horário de funcionamento`; `Reprevisão`; `Activar reprevisão`; `Se activado, o sistema fará a reprevisão desta fila.`

**Notification centre**
- Panel title `Notifications` · `Mark all as read` · group `Today`. Items: icon (neutral triangle), title, time, body, `Preview` affordance, unread dot with `sr-only` "unread".
- PT: `Notificações` · `Marcar todas como lidas` · `Hoje` · `Pré-visualizar`.

**Banner**
- Anatomy: status word (bold) · phrase · actions (text links) · optional `Check insights` button (Forecast, Team schedule). Neutral warm surface (`--ui-banner`), 1 px border, no icon animation.
- States and copy: see §17. PT: `Anomalia detectada` · `Reprevisão em curso` · `Previsão actualizada` · `Aplicar filtro` · `Pré-visualizar` · `Ver insights`.

**Forecast**
- Header: title `Forecast`; subtitle template `Updated today at {time}` and `· {n} issue(s) found` link. Toolbar: date `Tue 10 Oct 2023`, `Day`/`Week` segmented (Day active, non-functional), queue filter `Support`.
- Chart per §13. Legend below. `Show previous forecast` switch right-aligned under the chart.
- PT: `Previsão` · `Actualizada hoje às {time}` · `{n} problema(s) encontrado(s)` · `Dia`/`Semana` · `Mostrar previsão anterior`.

**Team schedule**
- Header: `Team schedule` · `Lisbon` timezone label · `Updated today at {time}`. Toolbar: date, `Day`, agent search (non-functional), `Filters`.
- Grid: hour columns 08–20; per-hour row `Required / Scheduled` with gap marker; 10 agent rows with shift bars and lunch gaps (neutral grey bars, lighter gap). Anomaly band over 10:00–11:00 with label.
- PT: `Escala da equipa` · `Lisboa` · `Necessários / Escalados` · `Filtros`.

**Insights**
- Header `Insights`; banner; one generic line chart `Contact volume vs average handle time` with illustrative series; nothing else.
- PT: `Volume de contactos vs tempo médio de atendimento`.

**Forecasting issues**
- Header `Forecasting issues`; count `3 events in the last 7 days`; table per §22-equivalent below; pagination omitted.
- PT: `Problemas de previsão` · `3 eventos nos últimos 7 dias`.

**Issues table columns:** Trigger time · End time · Queue · Severity · Description · Action. (PT: Início · Fim · Fila · Gravidade · Descrição · Acção.) Severity chip carries a `title`/`sr-only` suffix `design exploration`.

**Explicit exclusions:** no vendor-named settings (e.g. live-metrics collection from a named platform), no "Scenarios" nav, no "Import history" button, no event-types page, no adherence percentages, no agent avatars with photos.

---

## 16. Fictional dataset

Label everywhere: **Illustrative data** / **Dados ilustrativos**. Never described as historical or customer data.

- **Account:** Northstar Contact Centre
- **Queues:** Support (primary), Billing, Orders
- **Date:** Tuesday 10 October 2023 (`2023-10-10`); display `Tue 10 Oct 2023` / `ter. 10 out. 2023`. The date is arbitrary and carries no relation to any real event.
- **Timezone:** Europe/Lisbon (label `Lisbon` / `Lisboa`)
- **Business hours (Support):** 08:00–20:00; 15-minute periods; monitoring checks at :00 and :30 evaluating the previous four periods.
- **Baseline forecast run:** 06:00.
- **Illustrative threshold envelope:** ±15% (display only; the real threshold is calculated by the system and is not user-visible; copy never states 15% as the product's value).

**Support, contact volume per 15-minute period, 08:00–10:59 (forecast / actual):**

| Period | Forecast | Actual | Δ |
|---|---|---|---|
| 08:00 | 40 | 41 | +3% |
| 08:15 | 44 | 43 | −2% |
| 08:30 | 48 | 50 | +4% |
| 08:45 | 52 | 51 | −2% |
| 09:00 | 56 | 55 | −2% |
| 09:15 | 60 | 72 | +20% |
| 09:30 | 62 | 61 | −2% |
| 09:45 | 64 | 63 | −2% |
| 10:00 | 66 | 79 | +20% |
| 10:15 | 68 | 88 | +29% |
| 10:30 | 70 | 93 | +33% |
| 10:45 | 70 | 96 | +37% |

**Checks (window · forecast sum · actual sum · Δ · periods above envelope · result):**
- 09:00 · 08:00–08:59 · 184 · 185 · +1% · 0/4 · none
- 09:30 · 08:30–09:29 · 216 · 228 · +6% · 1/4 · none (Step 1)
- 10:00 · 09:00–09:59 · 242 · 251 · +4% · 1/4 · none
- 10:30 · 09:30–10:29 · 260 · 291 · +12% · 2/4 · none (Step 2)
- 11:00 · 10:00–10:59 · 274 · 356 · +30% · 4/4 · anomaly (Step 3/4)
- Reforecast 11:00–11:04 (Step 5); updated 11:04 (Step 6).

**Support, hourly contact volume, previous (baseline) vs updated forecast (11:15 onwards; 11:00 hour shown pro rata):**

| Hour | Previous | Updated | Δ |
|---|---|---|---|
| 08 | 184 | 184 (actual 185) | — |
| 09 | 242 | 242 (actual 251) | — |
| 10 | 274 | 274 (actual 356) | — |
| 11 | 268 | 340 | +27% |
| 12 | 232 | 302 | +30% |
| 13 | 240 | 312 | +30% |
| 14 | 256 | 333 | +30% |
| 15 | 248 | 322 | +30% |
| 16 | 232 | 302 | +30% |
| 17 | 208 | 270 | +30% |
| 18 | 176 | 229 | +30% |
| 19 | 136 | 177 | +30% |

**Support, agents per hour (required baseline / required updated / scheduled):**

| Hour | Req. baseline | Req. updated | Scheduled | Gap after update |
|---|---|---|---|---|
| 08 | 5 | 5 | 5 | 0 |
| 09 | 6 | 6 | 6 | 0 |
| 10 | 7 | 7 | 7 | 0 |
| 11 | 7 | 9 | 8 | −1 |
| 12 | 6 | 8 | 8 | 0 |
| 13 | 6 | 8 | 8 | 0 |
| 14 | 7 | 9 | 8 | −1 |
| 15 | 7 | 9 | 9 | 0 |
| 16 | 6 | 8 | 6 | −2 |
| 17 | 6 | 7 | 5 | −2 |
| 18 | 5 | 6 | 4 | −2 |
| 19 | 4 | 5 | 3 | −2 |

**Agents (10, fictional) and shifts (lunch in parentheses):**
1. Marta Sequeira · 08:00–16:00 (12:00–13:00)
2. Tomás Andrade · 08:00–16:00 (12:00–13:00)
3. Inês Barroso · 08:00–17:00 (13:00–14:00)
4. Rui Castelo · 08:00–17:00 (13:00–14:00)
5. Sofia Lameiro · 08:00–16:00 (14:00–15:00)
6. Diogo Pimenta · 09:00–18:00 (14:00–15:00)
7. Carla Veiga · 10:00–19:00 (15:00–16:00)
8. Nuno Tavares · 11:00–20:00 (16:00–17:00)
9. Helena Sardinha · 12:00–20:00 (16:00–17:00)
10. Pedro Vilar · 12:00–20:00 (17:00–18:00)

(Scheduled counts above are derived from these shifts at hourly granularity, subtracting lunches. Phase 3 should derive them in `dataset.ts` rather than hard-code, and a test should assert equality.)

**Capacity scenario variant (Interaction 01):** agents 1–5 absent from 09:00 to 13:00 (illustrative reading of "first shift"); scheduled becomes 09:1, 10:2, 11:3, 12:5; from 13:00 as baseline.

**Anomaly window:** 10:00–11:00 (the four periods evaluated at the 11:00 check). Detected 11:00. Reforecast 11:00–11:04. Updated 11:04.

**Issues (newest first):**

| Trigger | End | Queue | Severity (exploration) | Description | Action |
|---|---|---|---|---|---|
| Tue 10 Oct · 11:00 | Tue 10 Oct · 11:04 | Support | Major | Contact volume was 30% higher than forecast for 4 consecutive periods. | Check forecast |
| Mon 9 Oct · 14:30 | Mon 9 Oct · 14:33 | Billing | Minor | Contact volume was 18% higher than forecast for 4 consecutive periods. | Check forecast (disabled on page) |
| Fri 6 Oct · 16:00 | Fri 6 Oct · 16:05 | Orders | Critical | Contact volume was 45% higher than forecast for 6 consecutive periods. | Check forecast (disabled on page) |

PT descriptions: `O volume de contactos esteve 30% acima da previsão durante 4 períodos consecutivos.` etc. Severity PT: `Maior` · `Menor` · `Crítico`.

**Header count semantics (reconstruction decision, OPEN in sources):** the Forecast header counts issues for the displayed day: `1 issue found`. The issues page shows the last 7 days: `3 events`.

**Notifications:** 11:00 `Anomaly detected` · `Reforecast in progress in the affected queues`; 11:04 `Reforecast completed` · `Check updated data to solve possible issues`. Relative times displayed as clock times to avoid "2 min" drift.

**Insights generic series:** contact volume (hourly, actual to 11:00 then forecast) and AHT flat at 240 s with a bump to 300 s at 10:00–11:00 (illustrative, unrelated to detection).

---

## 17. State model

One state machine, two views.

| # | System state | Trigger | User-facing state (what the design shows) | Surfaces affected | Designer-owned? |
|---|---|---|---|---|---|
| 0 | IDLE | Queue has reforecast off | Nothing; the queue configuration shows the switch off | Configuration | Yes (the switch) |
| 1 | MONITORING | Switch on; every 30 min | Nothing visible. Optionally `Updated today at 06:00` (baseline run time; Context "could" item) | Forecast header | Partly (header time) |
| 2 | DEVIATION | Actual ≠ forecast within window | Nothing visible | — | No |
| 3 | ANOMALY DETECTED | Conditions met at a check | Notification `Anomaly detected · Reforecast in progress in the affected queues`; banner `Anomaly detected · Reforecast in progress` with Apply filter, Preview, (Check insights) | Notification centre; Forecast, Team schedule, Insights | Yes |
| 4 | REFORECAST IN PROGRESS | Recalculation running | Same as 3; in-progress wording persists | Same | Yes |
| 5 | FORECAST UPDATED | New forecast written; baseline kept | Notification `Reforecast completed · Check updated data to solve possible issues`; banner `Anomaly detected · Forecast updated`; header `Updated today at 11:04`; previous forecast available | Same + Forecast chart | Yes |
| 6 | ISSUES AVAILABLE | Event logged | Header `· 1 issue found`; issues table row | Forecast header; Forecasting issues | Yes |
| 7 | INSPECTION | Planner acts on the UI | Show previous forecast; select issue; Check forecast; band on chart; same band on schedule | Forecast; Issues; Team schedule | Yes |
| 8 | STAFFING ACTION | Planner adjusts schedule | Outside the documented screens; the design ends at the highlighted period | Team schedule | Boundary |

Explicit statement to appear in the page (section 04 or 05, `type-nota`): EN `The designer did not design the algorithm. The designer designed how its states become understandable.` · PT `O designer não desenhou o algoritmo. O designer desenhou como os seus estados se tornam compreensíveis.`

Transitions the reconstruction must not show: 3 → 0 (cancellation), manual trigger, more than one event per day on Support, events crossing midnight.

---

## 18. Visual direction

- **Feel:** a serious editorial study with personality. Large Nudica, strong scale contrast, generous whitespace, colour fields that change with the argument, diagrams and reconstructions as first-class content in restrained frames.
- **Not:** SaaS landing page; UX template; dashboard gallery; corporate deck; a copy of the PDF (no blobs, no illustrations, no stacked screenshots, no serif).
- **Colour as narrative (applied where it helps, not mechanically):** cream for human and operational sections (00, 01, 02, 09, 10); lilac for transition and constraint (03, 05 second half, 06); purple for system and decisive moments (04, 05 first half, 07, statements in 08). Reconstructed product frames are always neutral (white/grey) regardless of the field they sit in, so the field colour reads as "the case study speaking" and the frame as "the product being shown".
- **Separation from former-employer branding:** the original product chrome was purple. Therefore purple is **forbidden inside reconstructed UI** (chrome, buttons, links, badges, chart series). Purple belongs to the editorial layer only: section fields, statements, kickers, chips. The reconstructed UI uses slate/grey for interactive elements and a warm neutral for banners; anomaly marks use amber hatch, not purple.
- **Composition motifs to carry from the PDF in spirit:** a single highlighted final section at the bottom of a long form (06); a toggle-off / toggle-on pairing (08); a header count that links to a log (08).
- **Section transitions:** field colour changes at section boundaries with a 1 px rule; no gradients, no diagonal cuts, no parallax.
- **Dark mode:** supported by the site; case tokens define dark variants (§20). Colour fields invert to deep purple-black and warm charcoal; frames remain neutral with light borders.

---

## 19. Typography

Nudica only (400, 400 italic, 500, 700). No second family. Reuse the site scale.

| Use | Class | Notes |
|---|---|---|
| Cover title (h1) | `type-display` | `RevealTitle` line reveal (existing), reduced-motion safe |
| Pivot statements (02, 04 closing, 05, 06–08 statements, 10) | `type-display` | Max measure 16–20 ch; balance |
| Section titles (h2) | `type-heading` | Sentence case |
| Section leads / closings / bridges | `type-lede` | Measure 36 rem |
| Body | `type-corpo` | Measure 66 ch |
| Captions, caveats, open notes, rationale | `type-nota` (+ `type-italic` for caveats) | |
| Evidence chips, "Illustrative data" | `type-label` | Uppercase, tracking 0.05em (existing chip style) |
| Kickers, UI annotations, ledger rows, tension pair lines | `type-meta` | `tnum` |
| Reconstructed product UI text | Nudica 13–14 px, `tnum`; headings in product frames 16–18 px medium | Never below 13 px; minimum 4.5:1 |
| Chart axis and labels | 12–13 px, `tnum`; direct labels at line ends | SVG `text` inherits font |

Distinctiveness comes from: scale jumps between display statements and body; medium weight for UI, bold for statements; italic for caveats only; letter-spaced labels; asymmetric measure (statements narrow, bodies wide).

---

## 20. Colour

Case tokens (scoped to the case root, e.g. `.intraday`), light / dark. Derived from the original case-study language (purple, lilac, cream) approved by João; never from product chrome.

| Token | Role | Light | Dark | Notes |
|---|---|---|---|---|
| `--case-accent` | Primary case accent (purple): statements, kickers, key chips, field for system sections | `#6B3FD4` | `#B79CFF` | 5.9:1 on cream; use as text only on cream/white; as field with cream text |
| `--case-accent-ink` | Text on purple fields | `#FBF6EC` | `#1B1730` | ≥ 7:1 |
| `--case-lilac` | Secondary case surface (transition, constraints, Decision 1 field) | `#E9E1FA` | `#2B2440` | Ink text on light lilac ≥ 12:1 |
| `--case-cream` | Neutral case surface (human, reflective) | `#FBF6EC` | `#1F1B1A` | |
| `--case-ink` | Case text | `#1F1B2E` | `#F1ECF7` | |
| `--case-muted` | Muted text, previous-forecast stroke | `#5F5A70` | `#B6AFC6` | 6.1:1 on cream |
| `--ui-surface` | Product UI background | `#FFFFFF` | `#1A1A1F` | Neutral; never lilac |
| `--ui-bar` | Product chrome bar / nav | `#F2F1F5` | `#24242B` | Grey, not purple |
| `--ui-border` | Product borders | `#D9D6E0` | `#3A3945` | |
| `--ui-text` | Product text | `#26232F` | `#ECEAF2` | |
| `--ui-action` | Product interactive (buttons, links) | `#3E3A4F` | `#C9C4DA` | Slate; deliberately not the case accent |
| `--ui-banner` | Banner surface | `#FBF3E4` | `#2E271B` | Warm neutral, 1 px `--ui-anomaly` border |
| `--ui-anomaly` | Anomaly ink (banner border, band border, marker text) | `#7A4A00` | `#E3B26B` | Paired with hatch pattern |
| `--ui-anomaly-band` | Anomaly band fill | `rgba(122,74,0,0.10)` + 45° hatch | `rgba(227,178,107,0.14)` + hatch | Never fill alone |
| `--chart-current` | Current forecast stroke | `--ui-text` | `--ui-text` | Solid 2 px + label |
| `--chart-previous` | Previous forecast stroke | `--case-muted` | `--case-muted` | Dotted 2 px + label |
| `--chart-actual` | Actual markers | `--ui-text` | `--ui-text` | Round markers 4 px, solid 1.5 px |
| `--chart-envelope` | Illustrative threshold envelope | `--case-muted` at 60% | same | Dashed 1 px + label |
| `--focus-ring` | Focus | site `#1a1a1a` / `#ffff50` | | On purple fields: double ring `2px --case-accent-ink` + `2px --case-ink` offset |

Rules: colour is never the only channel (stroke style, markers, hatch, labels, text markers carry meaning). Severity chips are outlined text (`Critical`, `Major`, `Minor`) with a dashed border (exploration), no fill colour differences. The site's yellow accent is not used in the case except as the dark-mode focus ring inherited from the site.

---

## 21. Editorial rhythm

| Section | Mode | Approximate viewport weight |
|---|---|---|
| 00 Cover | READ | 1 screen |
| 01 Context | READ + small diagram | 0.75 |
| 02 Diverges | INTERACT (01) | 1.25 |
| 03 Brief | READ (progressive list) | 1.25 |
| 04 System | INTERACT (02) | 1.5 |
| 05 Tensions | REFLECT | 0.75 |
| 06 Decision 1 | LOOK + small interaction | 1 |
| 07 Decision 2 | INTERACT (03) | 1.5 |
| 08 Decision 3 | READ → INTERACT (04) → READ → INTERACT (05) | 2 |
| 09 Validation | READ | 0.75 |
| 10 Outcome | REFLECT | 1 |

No two heavy interactions are adjacent without a reading beat: 02 → 03 (read) → 04; 07 → 08 opens with body copy before Interaction 04; Interactions 04 and 05 are separated by Body 3. Section 08 is the longest by design; if it feels heavy in Phase 3 review, Interaction 04 may be reduced to the toggle and caption only.

---

## 22. Motion

- Purpose only: state change (banner text swap, notification item appearing), continuity (highlight band persisting from chart to schedule), transformation (forecast line replaced), cause → effect (check → ledger row).
- Durations: UI state swaps 160 ms (`--dur-micro`); chart series transitions 240–320 ms with `--ease-standard`; no spring physics in reconstructions; section reveals reuse the site's `rise` at most once per section.
- Forbidden: autoplay, loops, spinners that animate under reduced motion, parallax, scroll-jacking, hover-only reveals, animated screenshots.
- Reduced motion: all transitions 0 ms; the same final state renders; "in progress" is text, not animation.
- Focus management: when a step control changes state, focus stays on the control; the live region announces. When a path control moves the visitor to another panel (Check forecast, Go to schedule), focus moves to the target panel's heading (`tabindex="-1"`).

---

## 23. Accessibility

Target WCAG 2.2 AA. Requirements per interaction are in §10–§14; global requirements:

- Landmarks: one `main` (shell), `article` for the case, `section[aria-labelledby]` per section, `h1` once, `h2` per section, `h3` inside sections.
- Chips have visible text (no icon-only); "Open" markers are text.
- All controls are native `button`/`input`; `aria-pressed`, `aria-selected`, `aria-current="step"`, `aria-valuetext` as specified; group labels via `role="group"` + `aria-label`.
- Live regions: exactly one `aria-live="polite"` per interaction; messages are single sentences; no announcements on hover.
- Charts: `role="img"` with `aria-label` (one sentence describing what is shown), a visually hidden data table or list (`sr-only` or the textual equivalent region), legend with stroke samples and text, direct labels.
- Colour independence per §20.
- Contrast: all text ≥ 4.5:1; UI components and chart strokes ≥ 3:1 against their background in both themes; verify purple-field text (`--case-accent-ink` on `--case-accent`).
- Targets ≥ 44 × 44 px; range thumb hit area 44 px.
- Keyboard: tab order follows visual order; stepper supports Arrow keys when the step list has focus; tablist supports Arrow keys; Escape closes the notification panel and returns focus to the bell.
- Reduced motion: honoured via `useReducedMotion` and CSS; textual equivalents expanded by default.
- No time limits; no content dependent on hover; tooltips are also rendered as visible labels on focus and as text in the equivalent.
- Language: `lang` attribute per page; scenario quotes in EN inside the PT page carry `lang="en"` if shown untranslated (spec chooses translation with marker instead).
- Status messages: `role="status"` for banner state text inside the shell; `role="alert"` never used (nothing is an error).

---

## 24. Responsive behaviour

Breakpoints follow the site: 640, 768, 900, 1024 px. Case container: `site-container--wide` (1080 px) for frames; text at `measure`.

| Element | Desktop ≥ 1024 | Tablet 768–1023 | Mobile < 768 |
|---|---|---|---|
| Cover | Title up to 5.5 rem; thesis 28 ch | Title scales via clamp | Title two lines; legend wraps |
| Context diagram | Horizontal three nodes | Horizontal | Vertical list with arrows as text |
| Interaction 01 | Controls + panel side by side | Stacked | Segmented control; panel optional (bars only); text primary |
| Brief constraints | Two-column list (title / line) | Two-column | Single column; all expanded |
| Interaction 02 | Timeline + scrubber + stepper + ledger | Timeline + stepper + 2-col ledger | Stepper; current window only; current ledger row; vertical step list |
| Tensions | Three columns | Three rows | Three rows |
| Queue configuration | Frame 720 px wide, scrolled to the final section with the top fields visible above | Same, narrower | Fields stacked; final section pinned in view; top fields collapsed under "Show existing settings" |
| Interaction 03 | Full shell 1080 px | Icon rail + content | Cards: tabs, bell/sheet, banner, header line |
| Interaction 04 | Chart + staff strip | Chart | Simplified chart ≤ 200 px; table link |
| Interaction 05 | Table + chart and schedule side by side | Stacked with sticky selected-issue header | Stepped cards; schedule as period list |
| Validation / Outcome | Measure text | Same | Same |

Rule: never render the full WFM grid below 768 px.

---

## 25. EN/PT content strategy

- EN is the source language and is written first (above). PT-PT is written as native product language, not translated mechanically; terminology is fixed here so Phase 3 does not improvise:

| EN | PT-PT |
|---|---|
| Intraday reforecasting | Reprevisão intradiária |
| Forecast | Previsão |
| Reforecast (noun / verb) | Reprevisão / fazer a reprevisão |
| Resource planner | Planeador de recursos |
| Workforce management | Gestão de recursos (product name in shell); "workforce management" may appear once in parentheses on the PT cover descriptor |
| Contact centre | Centro de contacto |
| Staffing requirement | Requisito de staffing (staffing kept as sector term) |
| Schedule / Team schedule | Escala / Escala da equipa |
| Queue | Fila |
| Handle time / AHT | Tempo de atendimento / tempo médio de atendimento |
| Contact volume | Volume de contactos |
| Threshold | Limiar |
| Anomaly detected | Anomalia detectada |
| Reforecast in progress | Reprevisão em curso |
| Forecast updated | Previsão actualizada |
| Reforecast completed | Reprevisão concluída |
| Check updated data to solve possible issues | Verifique os dados actualizados para resolver possíveis problemas |
| Apply filter / Preview / Check insights | Aplicar filtro / Pré-visualizar / Ver insights |
| Issues found | Problemas encontrados |
| Forecasting issues | Problemas de previsão |
| Severity: Critical / Major / Minor | Gravidade: Crítico / Maior / Menor |
| Show previous forecast | Mostrar previsão anterior |
| Illustrative data | Dados ilustrativos |
| Reconstruction | Reconstrução |
| Open (unresolved) | Em aberto |
| Absenteeism | Absentismo |
| Shrinkage | Shrinkage (sector term) |
| Service level | Nível de serviço |
| Agents | Agentes |

- Forbidden PT-BR: usuário(s), equipe, planejamento, gerenciamento, time (for team), tela, contato (PT-PT: contacto), aplicativo, você.
- Orthography: the site's copy test enforces pre-1990 European spelling in live copy (`projecto`, `acção`, `actual`, `secção`, `direcção`, `óptimo`). This case follows the same convention: `actualizada`, `afectadas`, `detectada`, `detecção`, `acção`, `secção`, `exactamente`, `excepcional`, `objectivo`, `inspeccionável`.
- No em dashes in either language (site rule). Use full stops, colons and commas.
- Numbers: `Intl.NumberFormat('pt-PT')`; times 24 h in both languages; dates `Intl.DateTimeFormat` with `en-GB` / `pt-PT`.
- Scenario quotes: EN original in EN; PT translation marked `(tradução)` in PT, with the caveat that the documented wording is English.
- Routes: EN `/en/work/intraday-reforecasting`; PT `/pt/trabalho/reprevisao-intradiaria`; cross-language redirects as Carpool.
- Metadata: EN title `Intraday Reforecasting · Product design case study · UrsoParvo Studio`; description `How the experience around an automated intraday reforecast was designed: one switch per queue, explicit system-state communication, and inspectable change, without naming the company.` PT title `Reprevisão Intradiária · Caso de estudo de design de produto · UrsoParvo Studio`; description `Como foi desenhada a experiência à volta de uma reprevisão intradiária automática: um interruptor por fila, comunicação explícita do estado do sistema e alteração inspeccionável, sem nomear a empresa.`

---

## 26. Confidentiality

| Item | Rule in this case |
|---|---|
| Company, design system, teams, codenames, people | Never appear in copy, alt text, metadata, dataset, code comments, commit messages or file names |
| Product chrome | Neutral shell; grey bar; no logo; no purple in UI |
| Vendor-specific settings | Omitted from the configuration reconstruction |
| Queue names | Support, Billing, Orders (fictional) |
| Account | Northstar Contact Centre (fictional) |
| Agents | Fictional Portuguese names (§16) |
| Dates, IDs | One fictional day; no IDs |
| Requirements | Paraphrased as constraints; never reproduced verbatim as a document |
| System parameters beyond REQ | Hidden by default; shown only as unconfirmed project context |
| Personal contact details | None on the page |
| Illustrations from the PDF | Not used |
| Test coverage | Phase 3 extends the forbidden-names check to case content (see §29) and adds `Cobalt`, `Avalon`, `apollo` to the list |

---

## 27. Unknowns and fallbacks

All Phase 1 questions except anonymity and colour remain **OPEN**. Fallback used in this specification:

| Open question | Fallback in spec |
|---|---|
| Production status; whether the switch shipped | No production language; Decision 1 carries an Open note |
| 10% target measured? | Stated once as target (03 and 10) |
| Publishable parameters (30 min, 4 periods, 8 weeks, nightly, 2×/day, 1 h) | REQ items (30 min, several periods) stated; the rest hidden behind "Show project-context parameters", labelled unconfirmed |
| Threshold method | "calculated threshold derived from recent history" |
| Three-company format; scenario provenance | One sentence, Context · designer-provided; caveat on scenarios |
| Interviews before/after | Not stated; "documented with resource planners" |
| Feedback changed a screen? Earlier Figma frames? | No iteration shown |
| Manual "run now" | Not shown |
| Handle time as trigger | Marked Open in Interaction 01 and outcome |
| Severity rule | Exploration chip; no formula |
| Preview / Check insights behaviour | Preview: affordance with Open note; Check insights: switches to Insights (documented as an action), Insights shows banner + generic chart only |
| Schedule after simulation | Constraint 10 marked Open; schedule shows gaps, not a re-simulated schedule |
| Final banner wording | "Anomaly detected" used; "Surge detected" not shown |
| Kano / VPC / Empathy | Removed; not mentioned |
| Per-case accent | Locked: purple/lilac/cream editorial layer; neutral UI |
| Illustration licence | Not used |
| Figma export | Not needed for this spec |
| PT at launch | Specified; Phase 3 may ship EN first if João prefers (route pattern supports it) |
| Voice (impersonal vs first person) | Impersonal; adjustable |
| Header count semantics | Reconstruction decision: today's issues in header, 7 days in log |

---

## 28. Claims audit for the new case

| Claim as it will appear | Where | Label | Source | Status |
|---|---|---|---|---|
| The product could rewrite a day's forecast on its own when reality drifted | 00 | Context | REQ 3, 7 | OK |
| The designer worked on configuration, communication, inspectability | 00 meta | Context | PDF p.10–19 | OK |
| Forecast → requirement → schedule | 01 | Context | Domain; REQ user story | OK |
| Scenario statements | 02 | Research (caveated) | PDF p.4 | OK with caveat |
| Demand vs capacity families; detection watches the first | 02 | Interpretation + Context | AUDIT §05.2; REQ 3; PDF p.18 | OK |
| User story and note | 03 | Context | REQ | OK (paraphrased note) |
| Eleven constraints | 03 | Context | REQ 1–10 | OK; #7 target; #10 open |
| Every 30 minutes; several periods; threshold from recent history; low-volume exclusion; different method; baseline kept; three surfaces; simulation; no customer configuration | 04 | Context | REQ | OK |
| Cap and interval | 04 (hidden) | Context · unconfirmed | PDF p.9; SPEECH 6 | Marked |
| "Designed not to react to every fluctuation" | 04 | Interpretation | SPEECH 3 + REQ 3 | OK |
| One switch as whole configuration | 06 | Context + Reconstruction | PDF p.10 | OK; release Open |
| Rationale for single switch | 06 | Interpretation | SPEECH 10 | Marked as interpretation |
| Three surfaces from requirement | 07 | Context | REQ 7 | OK |
| Notification and banner wording | 07 | Reconstruction of documented copy | PDF p.11–15 | OK |
| "Never silently" principle | 07 | Interpretation | SPEECH 13 | OK |
| Preview behaviour | 07 | Open | — | Marked |
| Comparison possible because baseline kept | 08 | Context + Interpretation | REQ 8; PDF p.17 | OK |
| Issue description grammar | 08 | Reconstruction | PDF p.18 | OK |
| Severity tiers | 08 | Exploration | PDF p.18 | Marked |
| Same band on chart and schedule | 08 | Reconstruction | PDF p.19 | OK |
| Hi-fi prototypes; short timeline; development reference | 09 | Context | PDF p.11; SPEECH 2, 21 | OK |
| Three customer companies | 09 | Context · designer-provided | JOÃO | OK, labelled |
| Design outcome sentence | 10 | Interpretation | Synthesis | OK |
| Product outcome not documented | 10 | Open | — | OK |
| 10% as target | 03, 10 | Context · target | REQ 4.2 | OK |
| "Illustrative data" on every chart | all | Reconstruction | — | Required |

Excluded claims (never appear): accuracy improved; continuous reforecasting; interviews as method; participant/session numbers; quotes beyond p.4; manual workflow; push/email; iterations; shipped/launched/adopted; business impact; Kano/VPC/Empathy; percentile/average; multiplication factor as fact.

---

## 29. Implementation handoff

Nothing below is built in Phase 2. It is the exact build list for Phase 3.

**Routes**
- `src/app/[lang]/work/intraday-reforecasting/page.tsx` (EN only, `notFound` otherwise) and `src/app/[lang]/trabalho/reprevisao-intradiaria/page.tsx` (PT only), mirroring Carpool: `generateStaticParams`, `generateMetadata` with canonical + alternates, `PublicShell` with `studioOpen`.
- `src/lib/i18n.ts`: add `INTRADAY_PATH`.
- `next.config.ts`: two cross-language redirects, as Carpool.
- `src/data/projects.ts`: add `{ slug: 'intraday-reforecasting', kind: 'product', title, meta, href: INTRADAY_PATH }`. Meta EN `Product design · One switch, explicit system state, inspectable change`; PT `Design de produto · Um interruptor, estado do sistema explícito, alteração inspeccionável`.

**Content files**
- `src/content/intraday/types.ts` (model in §07), `en.ts`, `pt.ts`, `index.ts` (`server-only`, `getIntradayContent(lang)`).
- `src/content/intraday/dataset.ts`: language-neutral numbers from §16, with derived `scheduled[]` computed from shifts.

**Components (`src/components/intraday/`)**

| Component | Purpose | Inputs | States | Content dependency | Accessibility | Responsive |
|---|---|---|---|---|---|---|
| `IntradayCaseStudy` (server) | Page composition; sections in §05 order | `content` | — | all | Landmarks, headings | Section layout |
| `CaseSection` (or reuse Carpool `Section` pattern) | Kicker + body + tone field | `id, kicker, tone, weight` | tone: cream/lilac/purple | — | `aria-labelledby` | Padding scale |
| `EvidenceChip` / `EvidenceLegend` | Labels | `kind, labels`; `open` marker | — | `labels` | Visible text | Wrap |
| `Frame` | Interaction container with bar, chips, "Illustrative data", caption | `title, chips, caption, children` | — | `interact` | Group label | Full width |
| `ContextDiagram` | Three-node diagram | `nodes, caption` | — | `context.diagram` | `role="img"` + list | Vertical on mobile |
| `ConstraintList` | Progressive constraint list | `constraints` | expanded per item; all expanded under RM/no-JS | `brief.constraints` | `details/summary` or buttons with `aria-expanded` | 1–2 columns |
| `ScenarioSelector` (client) | Interaction 01 | `scenarios, dataset, interact` | selected: volume/handleTime/capacity | `diverges.scenarios` | group, `aria-pressed`, live region, text equivalent | §10 |
| `DetectionSimulation` (client) | Interaction 02 | `dataset, simulation copy, interact` | step 1–6; parameters on/off | `system.simulation` | stepper, range with `aria-valuetext`, live region, text equivalent | §11 |
| `StateChangePlay` (client) | Interaction 03 | `dataset, shell/banner/notification copy, interact` | state A–E; surface; filter; panel open | `decisionTwo.*` | tablist, buttons, `role="status"`, Escape handling | §12 |
| `ForecastCompare` (client) | Interaction 04 | `dataset, compare copy` | previous on/off | `decisionThree.compare` | switch button, `role="img"` chart, table equivalent | §13 |
| `IssuePath` (client) | Interaction 05 | `dataset, issues/schedule copy` | step: issues/forecast/schedule; selected issue | `decisionThree.issues/schedule` | table semantics, `aria-selected`, focus moves, live region | §14 |
| `QueueConfigPanel` (client, tiny) | Decision 1 toggle | `config copy` | toggle off/on | `decisionOne.config` | checkbox with label; caption on change | §24 |
| Neutral UI primitives (`intraday/ui/`): `Shell`, `Banner`, `NotificationPanel`, `ForecastChart`, `ScheduleGrid`, `IssuesTable`, `InsightsChart` | Reconstruction building blocks | dataset slices + copy | per §17 | shell/banner/notification/compare/issues/schedule copy | per §23 | per §24 |

**Data files:** `dataset.ts` only; no JSON assets; no images.

**CSS / system additions (in `globals.css`, scoped `.intraday`):** case tokens (§20) light/dark; tone fields; frame; chips (or extract Carpool chip into a shared `case-chip`, optional and non-breaking); shell, banner, notification, chart, schedule grid, issues table styles; hatch pattern via SVG `pattern` or CSS repeating gradient; focus double ring on purple fields; reduced-motion overrides.

**Tests (vitest)**
- Content audit for `src/content/intraday/*`: no em dashes; PT-BR word list; pre-1990 orthography for PT; forbidden names (`Talkdesk`, `Cobalt`, `Avalon`, `apollo`); forbidden result words in both languages (`shipped`, `launched`, `released`, `adopted`, `in production`, `improved accuracy`, `lançad`, `em produção`); the 10% sentence appears only with "target"/"meta".
- Dataset consistency: `checks[]` sums equal period sums; the 11:00 check has 4/4 periods above envelope; `anomalyWindow` equals the primary issue's window; `scheduled[]` derived from shifts equals the table; updated forecast starts at 11:15; no issue crosses midnight; header count equals number of issues dated on the dataset date.
- Component smoke tests: each interaction renders its textual equivalent without JS interaction; live region exists once; controls have accessible names.

**Accessibility requirements:** §23, verified with an automated pass (axe) plus manual keyboard and screen-reader script per interaction.

**Responsive states:** §24; snapshot at 360, 768, 1024, 1440 px.

**Explicitly not built:** a manual trigger; Preview view; email/push; severity logic; schedule re-simulation; any second day of data; any image asset from the PDF.

---

## 30. Phase 3 acceptance criteria

**Evidence**
- Every substantive claim on the page carries a chip or sits under a labelled block (checked against §28).
- No unsupported result; no research theatre; no invented validation or iteration; no company information; no production status.
- The 10% sentence appears exactly twice, both times as a target, never near a chart.

**Narrative**
- Sections render in §05 order; each closing beat present.
- The statement "The designer did not design the algorithm…" is present.
- Three decisions have `display` statements; system section has none of the decision language.
- Removing all interactions leaves a coherent readable argument (verified by rendering with JS disabled).

**Interaction**
- Five interactions present, each with: control-before-motion, one live region, textual equivalent, static fallback, Frame with "Illustrative data".
- Dataset tests pass; the same hour (10:00–11:00) is highlighted in 02 (volume variant), 04, 07 and 08.

**Visual**
- Nudica is the only `font-family` in computed styles.
- Purple (`--case-accent`) never appears inside `.intraday-ui` frames.
- Cover, 04 and 07 use the purple field; 09 and 10 cream; 03 and 06 lilac (or a documented deviation approved in review).
- No image assets from the original PDF.

**Accessibility**
- axe: zero critical/serious issues both themes.
- Keyboard script passes: every control reachable and operable; Escape closes the notification panel; focus moves on path controls.
- Reduced-motion: no transitions > 0 ms; textual equivalents expanded.
- Contrast checks for all §20 pairs recorded.

**Content**
- EN and PT-PT complete for every key in `types.ts`; content tests pass; PT reviewed by João for native tone.

---

## FINAL SELF-CRITIQUE

1. **Where are we still assuming?** The header count semantics (today vs history) and the "Updated today at 06:00" baseline-run time are reconstruction choices, not documented behaviour. *Correction:* both are labelled Reconstruction and listed in §27; the 06:00 header line may be dropped if it reads as invented behaviour.
2. **Engineering mistaken for design?** Section 04 is the risk: a vivid simulation can read as "I designed the detection". *Correction:* the section opens with "the designer first had to understand", ends with "none of this is visible", and carries the explicit "did not design the algorithm" sentence; the simulation is schematic, not product UI.
3. **Reconstruction mistaken for evidence?** The issues table with dates and percentages looks like data. *Correction:* "Illustrative data" in every frame bar, fictional account name visible in the shell, and the disclosure repeated at the end; the secondary issues have disabled actions so they cannot be explored as if real.
4. **Resembling the former employer?** Purple UI. *Correction:* hard rule that purple never enters reconstructed frames; grey chrome; slate actions; amber anomaly. Phase 3 review must include a side-by-side with the PDF screenshots to confirm distance.
5. **Weakest interaction?** Interaction 01. Its panel adds little beyond the text, and the Volume scenario has no rich documented quote. *Correction:* keep it lightweight; on mobile the panel is optional; if review finds it thin, reduce to a three-way text switch with the quote and the detection line, no chart.
6. **Unnecessary section?** 05 Tensions could be folded into the decision openers. *Correction:* keep as a short pivot (0.75 screen) because it is the only place the three questions appear together; cut to three lines if the page runs long.
7. **Still too strong?** "The most consequential design work was subtraction" (10 reflection) is an opinion. *Correction:* it is under a Reflection heading; keep, but do not chip it as Interpretation of evidence; it is authorial.
8. **Principal Product Designer challenge:** "Where is the trade-off you got wrong?" The page has no failure or regret. *Correction:* add to Reflection one honest limitation supported by the record: the design ends at the highlighted period; the staffing action itself, and what the schedule showed after the simulation, were not resolved in the documented work.
9. **Senior UX Researcher challenge:** labelling scenario cards as Research when method is unknown. *Correction:* the caveat is mandatory and adjacent; if João cannot confirm provenance, downgrade the chip to Context and change "documented with resource planners" to "documented in the project".
10. **Design Director challenge:** ten sections and five interactions may be long for a portfolio visit. *Correction:* §21 weights cap the page at roughly 12 screens; a sticky section index (not in scope here) could be considered in Phase 3; Interaction 04 has a defined reduction.
11. **Accessibility specialist challenge:** hatch patterns at small sizes and dotted 2 px lines can fail 3:1 on cream. *Correction:* band gets a 1.5 px border in `--ui-anomaly`; previous-forecast dots are 2 px with 4 px gaps and a direct text label; contrast pairs recorded in acceptance.
12. **Portfolio reviewer challenge:** "No outcome, so what did you achieve?" *Correction:* the design outcome is stated concretely (four things) and the product outcome is honestly absent; reviewers reward the honesty only if the decisions are sharp, hence the display statements per decision and the explicit "what was not exposed" argument.

---

## PHASE 2 STATUS

`READY FOR REVIEW`

**Locked decisions**
- Company anonymised; neutral product shell; no branded chrome or purple inside reconstructed UI.
- Purple / lilac / cream as the case's editorial palette; Nudica only.
- Thesis as in §04; narrative order as in §05; ten sections.
- Impersonal voice; EN first, PT-PT with pre-1990 orthography; no em dashes.
- One fictional dataset (Northstar Contact Centre, Support queue, Tue 10 Oct 2023, Europe/Lisbon, anomaly 10:00–11:00, detected 11:00, updated 11:04).
- Kano / VPC / Empathy removed.

**Open questions (unchanged from Phase 1 unless listed as locked)**
- Production status; switch vs flag release; accuracy measurement; publishable parameters; threshold method; cap and interval finality; three-company format and scenario provenance; interview timing; iteration evidence; manual trigger; handle-time trigger; severity rule; Preview and Check insights behaviour; post-simulation schedule; final banner wording; PT at launch; voice preference.

**Claims deliberately excluded**
- Accuracy improved by 10%; continuous/24/7 reforecasting; interviews as a stated method; participant or session counts; quotes beyond PDF p.4; manual workflows; push or email notifications; documented iterations; shipped/launched/adopted; business impact; percentile or average-error threshold; multiplication factor as fact; AI-generated canvases as research.

**Five interactions**
1. Scenario selector (volume / handle time / capacity).
2. Detection → reforecast simulation (six visitor-controlled steps).
3. System state change in a neutral shell (five states, three surfaces, filter).
4. Previous vs new forecast toggle.
5. Issue → forecast period → schedule period.

**Three design decisions**
1. One switch per queue is the whole configuration.
2. The change reaches the planner where they are, as a sequence of states.
3. The change is inspectable and points to the next step.

**Phase 3 prerequisites**
- João's review of this specification, PT copy tone, and the voice decision.
- Confirmation (or continued OPEN status) of the parameters to keep hidden.
- Approval of the fictional dataset and the header-count semantics.
- Agreement on the shared-chip extraction (optional) versus case-local chips.
- Then: routes, content files, dataset, components, CSS tokens, tests, as listed in §29.
