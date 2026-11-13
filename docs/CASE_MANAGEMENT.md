# Case Management Domain Core

**Status:** Implemented as a pure, in-memory state-transition function and connected to the local synthetic dashboard demonstration. Not connected to an authenticated production API, identity provider, database or durable audit storage.

## Scope
The domain core provides a controlled case lifecycle and returns an audit-event record for each accepted transition. The local dashboard invokes it with a fixed demonstration actor. It does not authenticate actors, authorize database access, persist state or provide a production case-management application.

## State model
`new → triaged → in_progress`

From an active investigation:
- `in_progress → escalated`
- `in_progress → pending_information → in_progress`
- `in_progress → resolved → closed`
- `resolved/closed → in_progress` through supervisor-authorized reopening.

Escalated cases may return to investigation. A closed case cannot be reassigned. Exact institutional lifecycle and retention policy require receiving-organization approval.

## Roles and policy
- **Analyst:** triage, start, escalate, request information, resume and resolve.
- **Supervisor:** analyst actions plus assignment, closure and reopening.
- **Auditor:** read-only; all mutations are rejected.

The function checks the supplied actor role and tenant identifier. The caller must derive the actor from a verified server-side session. A caller-supplied role is not proof of identity or authorization. Production must enforce tenant scope and permissions at the API and database layers too.

## Concurrency and audit semantics
- Every command supplies the expected case version; stale versions are rejected.
- Accepted transitions increment the version.
- Each result contains a structured audit event with actor, tenant, case, action, prior/new state, assignee changes, reason code and UTC occurrence time.
- Reason codes are bounded enumerations; arbitrary free text is not accepted in this transition interface.

The returned audit event is not durable or tamper-evident until a trusted service persists it in an append-only store. The current function alone does not meet evidence-retention or non-repudiation requirements.

## Validation and tests
Source: `services/caseManagement.ts`  
Tests: `services/caseManagement.test.ts`

Tests cover valid/invalid transitions, role restrictions, tenant isolation, optimistic concurrency, timestamp and identifier validation, bounded reason codes, assignment rules and audit metadata.

## Production integration gates
1. Derive actor identity and institutional roles from an approved identity provider.
2. Enforce tenant and case scope on every API request and database query.
3. Persist case changes and audit records atomically in a transaction.
4. Prevent update/delete of audit records for application roles; test privileged bypass paths.
5. Add database constraints, RLS/authorization integration tests and migration rollback.
6. Define institution-approved case states, retention, export and legal hold.
7. Add analyst/supervisor UI, accessibility and end-to-end acceptance tests.
