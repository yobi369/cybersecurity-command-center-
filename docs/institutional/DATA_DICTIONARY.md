# Data Dictionary and Domain Glossary

**Status:** Initial proposed dictionary; fields require review with the final canonical schema and institution.

| Term/field | Definition | Constraints / notes |
|---|---|---|
| Event | A source observation represented in normalized form | Not proof of malicious activity |
| eventId | Stable unique event identifier | 1–80 character constrained ID in fixture schema |
| observedAt | Time the source says the event occurred | ISO-8601 with explicit timezone; normalized UTC |
| receivedAt | Time trusted ingestion receives the record | Must be assigned by server in production |
| sourceId | Identifier for the originating source | Must be bound to authenticated source identity in production |
| sourceType | Source category | Current parser supports synthetic only |
| schemaVersion | Version of event contract | Current fixture schema 1.0.0 |
| eventType | Normalized event category | authentication.failure / authentication.success |
| simulation | Indicates fixture/simulated data | Current parser requires true |
| attributes | Bounded typed event-specific fields | Scalar strings, finite numbers, booleans; no nested objects |
| Finding | Output of a versioned detection rule | Must reference evidence and rule version |
| detectorId | Stable detector identifier | Version independently |
| ruleVersion | Version of the decision logic | Required for reproducibility |
| evidenceEventIds | IDs of events supporting a finding | References, not copied proof |
| Case | Analyst-managed investigation record | Lifecycle and permissions institution-approved |
| Disposition | Analyst/supervisor assessment | Must record actor, time and reason |
| Audit event | Record of an action or access decision | Must be protected from unauthorized alteration |
| RTO | Recovery Time Objective | Maximum agreed service restoration duration |
| RPO | Recovery Point Objective | Maximum agreed data-loss interval |
| SLO | Service Level Objective | Measurable service reliability target |

## Data semantics
- Severity is not confidence. Severity describes potential impact under a defined taxonomy; confidence describes strength of supporting evidence.
- A finding is not an incident verdict. It is a detection result requiring review.
- A source identifier is not source authentication.
- A hash is not proof that a source record is truthful.
- Simulation labels must remain visible through UI, exports and reports.
- All timestamps must include timezone context; storage and comparisons should use UTC.
