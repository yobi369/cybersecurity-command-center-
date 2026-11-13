# End-to-End Workflow Catalogue

**ID:** WF-001 | **Status:** Target workflows; most are not implemented.

| ID | Workflow | Actor | Status |
|---|---|---|---|
| WF-001 | User provisioning and role assignment | Administrator | Not implemented |
| WF-002 | Source registration and authorization | Security administrator | Not implemented |
| WF-003 | Event ingestion and validation | Ingestion service | Not implemented |
| WF-004 | Normalization and provenance | Processing service | Not implemented |
| WF-005 | Detection and finding creation | Detection service | Synthetic-only library |
| WF-006 | Alert triage and case creation | Analyst | Case lifecycle domain core implemented; UI/API/auth/persistence outstanding |
| WF-007 | Investigation and evidence handling | Investigator | Not implemented |
| WF-008 | Escalation and closure | Supervisor | Domain transition policy implemented; authenticated workflow outstanding |
| WF-009 | AI-assisted explanation | Analyst | Not implemented |
| WF-010 | Rule change, test, approval, deployment | Detection engineer | Not implemented |
| WF-011 | Audit review/export | Auditor | Not implemented |
| WF-012 | Backup/restore exercise | Operations | Not implemented |
| WF-013 | Response to compromise of CCC itself | Security/operations | Procedure specified |
| WF-014 | Release and rollback | Release manager | Not implemented |

## WF-003 Event ingestion
Preconditions: source approved, identified, authenticated, and mapped to supported schema.
1. Authenticate source using approved credentials/certificates.
2. Enforce TLS, payload limits, rate limits and source authorization.
3. Record receipt time and source metadata.
4. Validate schema, required fields, types, timestamps, size and version.
5. Reject/quarantine invalid records with safe reason codes.
6. Assign stable identity and provenance.
7. Apply documented deduplication policy.
8. Normalize and persist durably.
9. Emit correlation ID and processing outcome.
10. Apply documented retry/dead-letter behavior; never silently discard evidence.
Postcondition: every accepted/rejected record is traceable to a source and outcome.

## WF-005 Detection
Read normalized event/window; select approved rule version; evaluate deterministically; persist finding with rationale, rule version and evidence references; apply idempotency; record outcome/latency; publish to authorized queue. No automated response action is permitted in the initial product scope.

## WF-006 Triage

The pure domain state machine in `services/caseManagement.ts` now defines triage, start, escalation, request-information, resume, resolve, close, reopen and assignment transitions. It enforces role gates, tenant match and optimistic version checks on the supplied context, and returns a structured audit event. This does not authenticate the actor or persist the case/audit event. See [CASE_MANAGEMENT.md](../CASE_MANAGEMENT.md).

Target production workflow: analyst authenticates; server checks role and resource scope; analyst reviews finding and source evidence separately from AI explanation; creates/links case; records actor, time, old/new state and reason; supervisor escalation follows policy.

## WF-007 Investigation
Investigator accesses assigned case; evidence access/export is logged; notes retain author/time; original evidence is immutable; redactions/derived artifacts are separately versioned; state transitions require permission.

## WF-009 AI explanation
Analyst explicitly requests if policy allows; service minimizes and redacts context; treats event text as untrusted; calls provider server-side with timeout/quota; validates schema and evidence IDs; rejects unsupported claims; records unavailable state on failure. AI cannot alter detections, close cases or trigger response.

## WF-010 Rule change
Create change request; version rule; peer review; run unit, boundary, regression, replay, performance and adversarial tests; document fixture diffs; approve PR; replay in staging; obtain activation approval; record rollback version.

A workflow is complete only when UI, API, authorization, persistence, audit, failure states, automated tests, manuals and acceptance evidence exist.
