# Requirements Traceability Matrix

**ID:** TRACE-001 | **Status:** Initial; evidence links to be completed.

Every requirement must trace to design, code/configuration, tests, documentation and release evidence. Every production code path must trace to a requirement or approved architecture decision.

| Requirement | Design | Current implementation | Verification | Status |
|---|---|---|---|---|
| FR-002 | Event schema, API contract | services/eventSchema.ts, services/eventPipeline.ts | eventSchema.test.ts, eventPipeline.test.ts | Partial; synthetic-only, no source auth/ingest API |
| FR-003 | Event schema and detection engine | sourceId and evidenceEventIds in services/eventEngine.ts | eventEngine.test.ts | Partial; no immutable evidence store |
| FR-004 | EVENT_SCHEMA.md | services/eventSchema.ts, services/eventPipeline.ts | eventSchema.test.ts, eventPipeline.test.ts | Partial; synthetic schema only |
| FR-005 | Detection engine | services/eventEngine.ts | eventEngine.test.ts | Partial; synthetic only |
| FR-006 | Detection engine | evidenceEventIds and rule version in services/eventEngine.ts | eventEngine.test.ts | Partial; no evidence store |
| FR-007 | CASE_MANAGEMENT.md | services/caseManagement.ts, components/OperationsDashboard.tsx | caseManagement.test.ts; DEMO_DASHBOARD.md manual tests | Partial; no auth/API/persistence |
| FR-008 | CASE_MANAGEMENT.md | structured CaseAuditEvent returned by transitionCase | caseManagement.test.ts | Partial; no append-only storage |
| FR-001 | Workflows, API contract | None | Not defined | Not implemented |
| FR-007 | Workflows, identity/access | None | Not defined | Not implemented |
| FR-008 | Security controls | None | Not defined | Not implemented |
| FR-011 | System architecture | None | Not defined | Not implemented |
| NFR-001 | Threat model, security controls | Strict validators, role-aware domain policy, pinned CI actions, CodeQL and npm audit | Unit tests, CodeQL workflow, dependency audit | Partial; no production identity/authorization |
| NFR-006 | Security controls, data governance | In-memory audit event output only | caseManagement.test.ts | Not production verified; no durable tamper-evident audit |
| NFR-011 | Backup/recovery | None | No restore evidence | Not implemented |
| NFR-012 | API_CONTRACT.md and openapi/openapi.yaml | Draft OpenAPI 3.1 contract with CI lint | Redocly lint in Quality Gates | Specified only; live contract tests not implemented |

## Evidence ID convention
Requirements FR-### / NFR-###; tests TC-###; risks RSK-###; workflows WF-###; controls SEC-###; decisions ADR-###; releases REL-YYYY.N; test runs TESTRUN-YYYYMMDD-### (UTC).

Each test record includes commit SHA, environment, dependency lock hash, exact command, case IDs, outcome, timestamp, logs/artifacts, reviewer and deviations.

A release candidate is blocked if a mandatory requirement has no test, a failure is unexplained, a security finding is untriaged, or documentation contradicts the deployed implementation.
