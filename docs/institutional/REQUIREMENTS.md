# System Requirements Catalogue

**ID:** REQ-001 | **Status:** Initial baseline; institution must validate scope.

MUST = mandatory for the target product. No item is accepted merely because it is documented.

## Functional requirements
| ID | Requirement | Current status |
|---|---|---|
| FR-001 | Ingest only from explicitly configured and authorized sources | Specified / not implemented |
| FR-002 | Validate source identity, schema, size, timestamps and provenance | Partial: strict synthetic schema and batch validation; no source authentication or production payload gateway |
| FR-003 | Preserve provenance and source-evidence references | Partial: source IDs and evidence event IDs in synthetic findings; no durable evidence provenance |
| FR-004 | Normalize supported records to a versioned canonical schema | Partial: synthetic fixture schema v1.0.0 and in-memory parser-to-detector pipeline |
| FR-005 | Execute deterministic, versioned, reproducible detection rules | Partial synthetic-only rule library |
| FR-006 | Findings identify rule versions and supporting evidence | Partial isolated library |
| FR-007 | Analysts review, assign, investigate, escalate and close cases | Partial: pure case lifecycle domain policy and local demo; no authenticated/persistent analyst workflow |
| FR-008 | Privileged actions and case changes create attributable audit records | Partial: transition returns structured audit event; no append-only durable audit service |
| FR-009 | Search/filter with server-side access checks | Not implemented |
| FR-010 | Export authorized case/evidence records | Not implemented |
| FR-011 | Optional AI explanations cite supplied evidence IDs and remain separate from findings | Not implemented |
| FR-012 | AI failure never blocks deterministic detection or review | Not implemented |
| FR-013 | Administer approved users, roles, sources and rules under controlled permissions | Not implemented |
| FR-014 | Expose sanitized health and operational metrics | Not implemented |
| FR-015 | Support backup, restore, retention and authorized deletion | Not implemented |

## Non-functional requirements
| ID | Requirement | Acceptance evidence |
|---|---|---|
| NFR-001 | Least privilege, secure defaults, server-side authorization | Threat model, control tests, independent review |
| NFR-002 | Availability target agreed with institution | SLO and operational history |
| NFR-003 | Throughput and latency targets based on real workload | Load-test report |
| NFR-004 | Document capacity, retention and concurrency limits | Capacity model |
| NFR-005 | Identical versioned inputs produce reproducible rule outputs | Replay tests |
| NFR-006 | Audit is attributable and tamper-evident | Integrity tests |
| NFR-007 | Minimize data and enforce privacy/retention controls | Privacy assessment and deletion tests |
| NFR-008 | Meet institution-selected accessibility standard | Accessibility audit |
| NFR-009 | Maintainable code, interfaces, dependencies and runbooks | Documentation review |
| NFR-010 | Portable deployment and export/migration paths | Deployment rehearsal |
| NFR-011 | Meet approved RTO/RPO | Timed recovery exercise |
| NFR-012 | Versioned interoperability contracts | Contract tests |

## Institutional decisions required
Monitored environments and legal authority; sources; data classification; hosting/data residency; identity provider; tenant model; event volume/retention; availability, RTO and RPO; escalation; AI-provider policy; accessibility standard; procurement; support and maintenance.

A requirement is accepted only with an owner, implementation reference, test case, passing evidence, documentation and authorized reviewer.
