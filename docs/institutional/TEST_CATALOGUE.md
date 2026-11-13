# Initial Test Catalogue

**ID:** TEST-002 | **Status:** Initial catalogue; expand with each requirement.

## Existing automated coverage
| Area | Source | Count | Scope |
|---|---|---:|---|
| Simulator | services/simulationService.test.ts | 7 | Local deterministic simulator |
| Detection | services/eventEngine.test.ts | 11 | Synthetic-only auth burst rule |
| Canonical event schema | services/eventSchema.test.ts | 10 | Strict synthetic schema parser |
| Processing pipeline | services/eventPipeline.test.ts | 6 | Parser-to-detector integration |
| Case management | services/caseManagement.test.ts | 12 | Pure lifecycle and role-aware transition policy |
| Benchmark harness | services/benchmark.test.ts | 9 | Versioned synthetic scenarios, scoring and metric bounds |
| Strict timestamp validation | services/time.test.ts | 7 | Calendar-aware ISO-8601 and timezone validation |
| Total | Current repository | 62 | Automated unit tests only |

## Required cases
| ID | Scenario | Expected result | Status |
|---|---|---|---|
| TC-001 | Valid synthetic event | Accepted by fixture detector | Implemented |
| TC-002 | Five failures within ten minutes, same source | One finding with evidence IDs | Implemented |
| TC-003 | Below threshold | No finding | Implemented |
| TC-004 | Failures split across sources | No combined finding | Implemented |
| TC-005 | Outside rolling window | No finding | Implemented |
| TC-006 | Successful authentication | Counted as ignored | Implemented |
| TC-007 | Duplicate event ID | Rejected | Implemented |
| TC-008 | Malformed timestamp | Rejected | Implemented |
| TC-009 | Non-synthetic fixture input | Rejected | Implemented |
| TC-010 | Extended burst | One consolidated finding | Implemented |
| TC-035 | Valid canonical batch | Normalized events reach detector | Implemented |
| TC-036 | Invalid event in batch | Entire batch rejected; no partial result | Implemented |
| TC-037 | Duplicate ID in pipeline | Batch rejected | Implemented |
| TC-038 | Mixed source IDs | No cross-source correlation | Implemented |
| TC-039 | Pipeline batch over limit | Rejected before parsing | Implemented |
| TC-040 | Case state transition | Only allowed transitions accepted | Implemented |
| TC-041 | Analyst attempts supervisor action | Denied | Implemented |
| TC-042 | Auditor attempts mutation | Denied | Implemented |
| TC-043 | Cross-tenant case reference | Denied by domain policy | Implemented |
| TC-044 | Stale case version | Rejected | Implemented |
| TC-045 | Case transition audit event | Actor, state, reason and time returned | Implemented |
| TC-046 | Malformed actor, role, assignee or reason code | Rejected | Implemented |
| TC-047 | Dashboard synthetic-mode notice | Visible before interaction | Manual verification pending |
| TC-048 | Finding evidence references | Match deterministic fixture events | Manual verification pending |
| TC-049 | Demo case creation and lifecycle | Local transitions and audit record displayed | Manual verification pending |
| TC-050 | Demo case reset | Local case state cleared | Manual verification pending |
| TC-051 | Mobile/tablet/desktop dashboard layout | Usable at supported widths | Manual verification pending |
| TC-052 | Keyboard and focus behavior | All actions operable with visible focus | Manual verification pending |
| TC-053 | OpenAPI contract lint | No structural/specification errors | CI automated gate |
| TC-054 | Benchmark confusion matrix | TP/FP/TN/FN match labelled scenarios | Implemented |
| TC-055 | Precision, recall, F1 and accuracy | Correct bounded ratios; undefined ratios null | Implemented |
| TC-056 | Duplicate benchmark scenario ID | Rejected | Implemented |
| TC-057 | Aggregate benchmark event limit | More than 100,000 events rejected | Implemented |
| TC-058 | Invalid benchmark fixture | Entire benchmark fails visibly | Implemented |
| TC-059 | Versioned benchmark v1 fixture set | Seven labelled scenarios replay reproducibly | Implemented |
| TC-060 | Impossible calendar date | Reject invalid day/month and leap-year combinations | Implemented |
| TC-061 | Invalid clock/offset | Reject out-of-range hour, minute, second and timezone offset | Implemented |
| TC-062 | Timestamp normalization integration | Shared strict parser rejects impossible date in events and cases | Implemented |
| TC-011 | Unauthenticated API request | 401; no data disclosed | Not implemented |
| TC-012 | Insufficient permission | 403; no state change | Not implemented |
| TC-013 | Cross-tenant object reference | Denied without disclosure | Not implemented |
| TC-014 | Oversized event | Rejected; bounded resource use | Not implemented |
| TC-015 | Unsupported schema version | Rejected/quarantined with reason | Not implemented |
| TC-016 | Duplicate ingestion retry | Idempotent; no duplicate evidence | Not implemented |
| TC-017 | Same rule/version/input replay | Reproducible result | Not implemented |
| TC-018 | AI cites unknown evidence ID | Rejected/flagged unsupported | Not implemented |
| TC-019 | Prompt injection in event data | Treated as untrusted data | Not implemented |
| TC-020 | Audit record alteration | Integrity verification detects change | Not implemented |
| TC-021 | Backup restore | Approved RTO/RPO met | Not implemented |
| TC-022 | Database outage during ingest | Durable retry/dead-letter; no silent loss | Not implemented |
| TC-023 | Unauthorized evidence export | Denied and audited | Not implemented |
| TC-024 | Production secret scan | No secret in browser artifact | Not implemented |
| TC-025 | Keyboard-only core workflow | Operable with visible focus | Not implemented |

## Execution record template
Test run ID; commit SHA; environment; command/suite; tester/reviewer; UTC start/end; pass/fail/blocked/skipped; artifact/log reference; defect IDs; retest; deviations and approval. Preserve failed evidence; do not weaken a test to accommodate a defect without an approved requirement change.
