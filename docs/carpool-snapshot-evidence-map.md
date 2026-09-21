# Carpool Research Snapshot — Evidence Map

Internal map for the interactive Research Snapshot.  
Every visible UI point must appear here. If it is not here, it must not appear in the UI.

Evidence types:
- **DOCUMENTED** = explicit in the research PDF / analysis as observed fact
- **INTERPRETATION** = grounded synthesis for presentation (not a measured metric)
- **RECONSTRUCTION** = illustrative interaction built for the portfolio
- **EXPLORATION** = design proposal (not used as fact in this snapshot)

---

## Service

| CONTENT | SOURCE | EVIDENCE TYPE | CONFIDENCE | UI TREATMENT |
|---|---|---|---|---|
| Employee benefit / internal vehicle reservation | Analysis §01; PDF benefit framing | DOCUMENTED | High | Service panel one-liner |
| Leisure and Work booking categories | Analysis §01; Stronghold; UI | DOCUMENTED | High | Service + Work/Leisure |
| Electric leisure / hybrid work cars | Stronghold context | DOCUMENTED | High | Optional detail under service (short) |

## People

| CONTENT | SOURCE | EVIDENCE TYPE | CONFIDENCE | UI TREATMENT |
|---|---|---|---|---|
| Aires = leisure role | Personas p.11–12 | DOCUMENTED (persona) | Medium | People switch |
| Ricardo = work role, fixed date/time | Persona 2 | DOCUMENTED (persona) | Medium | People switch; Work mode |
| Rita = operations / fleet & requests | Persona 3 | DOCUMENTED (persona) | Medium | People switch |
| Leisure interviews stronger than work/ops | Analysis §02 limitations; next steps | DOCUMENTED | High | Caveat under people/research |

## Research

| CONTENT | SOURCE | EVIDENCE TYPE | CONFIDENCE | UI TREATMENT |
|---|---|---|---|---|
| Contextual inquiry (ops / Stronghold concerns) | PDF Stronghold; Analysis §02.1 | DOCUMENTED | High | Research method chip |
| Leisure-user interviews (Users I–V) | Analysis §02.2 | DOCUMENTED | High | Research method chip |
| Personas | Analysis §02.3 | DOCUMENTED | High | Research method chip |
| Expert review of live product | Analysis §02.4 | DOCUMENTED | High | Research method chip |
| Work users flagged as next step | Next steps; p.28 annotation | DOCUMENTED | High | Caveat |

## Primary constraint

| CONTENT | SOURCE | EVIDENCE TYPE | CONFIDENCE | UI TREATMENT |
|---|---|---|---|---|
| Vehicle unavailability is the primary challenge | User III p.8 | DOCUMENTED | High | Dominant panel headline |
| Usability concerns secondary when cars unavailable | User III p.8 | DOCUMENTED | High | Dominant panel support |
| Interface not the problem as long as vehicles available | User III p.8 | DOCUMENTED | High | Optional support line (paraphrase) |
| Finding a slot / advance planning | Finding 2; Users; p.7 | DOCUMENTED | High | Signal under constraint |
| Lead time: months (not 4 vs 9) | Conflicting 4 / 9 in deck | DOCUMENTED (safe wording) | High | “Months in advance” only |

## User experience signals (qualitative)

| CONTENT | SOURCE | EVIDENCE TYPE | CONFIDENCE | UI TREATMENT |
|---|---|---|---|---|
| Difficult to find available slots | Finding 2; User III; expert calendar notes | DOCUMENTED | High | UX signal |
| Planning months in advance | Finding 2; p.7; User III | DOCUMENTED | High | UX signal |
| Unexpected / unexplained cancellations | User III anecdote; User IV maintenance; missing reasons | DOCUMENTED | High | UX signal |
| Unclear confirmation | Expert + User V email check | DOCUMENTED | High | UX signal |
| Unclear reservation status / history | Finding 1; expert status notes | DOCUMENTED | High | UX signal |
| Unclear availability in UI | Unavailable listed; unclear date/time states | DOCUMENTED | High | UX signal |
| Unclear rules (timing / visibility) | One-reservation; weekend start; expert | DOCUMENTED | High | UX signal |
| Operational uncertainty after booking | Cancellations; readiness; policy gaps | DOCUMENTED / INTERPRETATION | Medium | UX signal label “operational uncertainty” |

## Operational signals

| CONTENT | SOURCE | EVIDENCE TYPE | CONFIDENCE | UI TREATMENT |
|---|---|---|---|---|
| Charging time | Stronghold; Finding 4 | DOCUMENTED | High | Ops signal |
| Vehicle inspection | Stronghold; Finding 4 | DOCUMENTED | High | Ops signal |
| Maintenance (can cancel bookings) | User IV; Analysis §01 | DOCUMENTED | High | Ops signal |
| Vehicle condition | Stronghold scenarios; User V | DOCUMENTED | High | Ops signal |
| Reservation limitations (e.g. one active) | Stronghold; expert; policy | DOCUMENTED | High | Ops signal |
| Pickup and return processes | Stronghold context | DOCUMENTED | High | Ops signal |

## Work vs leisure

| CONTENT | SOURCE | EVIDENCE TYPE | CONFIDENCE | UI TREATMENT |
|---|---|---|---|---|
| Work needs specific dates/times | Ricardo persona; Finding 3; User III | DOCUMENTED | Medium–High | Intent switch |
| Leisure wants flexible / next available | User III; Finding 3; Aires | DOCUMENTED | High | Intent switch |
| Same interaction model poorly differentiated | Finding 3 | DOCUMENTED | High | Caption |
| Not claiming shipped feature | — | EXPLORATION if shown as UI | — | Label as reconstruction of needs, not product |

## Service model

| CONTENT | SOURCE | EVIDENCE TYPE | CONFIDENCE | UI TREATMENT |
|---|---|---|---|---|
| Conceptual chain User→…→Next user | Synthesis of Stronghold + booking + Finding 4 | INTERPRETATION | Medium | Flow; caption “conceptual service model” |
| Booking is one node, not the whole system | Inference from primary constraint + ops | INTERPRETATION | High | Highlight booking node |

## Explicitly excluded

| CONTENT | WHY EXCLUDED |
|---|---|
| Percentages, success rates, NPS, ROI | Not in source as valid portfolio metrics |
| Fleet size / utilisation rates | UNKNOWN |
| Aggregated cancel rates across service | Individual user counts exist; not service-wide aggregates |
| Exact 4 or 9 month lead time as single fact | Conflicting references in deck |
| Participant count as statistical sample size claim | Five leisure users documented; not a rate |
| “Available %” or inventing readiness SLAs | Not documented |

---

## Snapshot UI regions (implementation)

1. **Primary constraint** (largest)
2. **Service**
3. **People** (Aires / Ricardo / Rita interactive)
4. **Research methods**
5. **UX signals**
6. **Operational signals**
7. **Work ↔ Leisure**
8. **Service model** (interactive highlight)
9. **Ready ≠ Available** micro-toggle (documented readiness)
