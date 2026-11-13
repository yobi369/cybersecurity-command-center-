# Institutional Readiness Risk Register

**ID:** RISK-001 | **Status:** Initial qualitative register; owners and residual ratings require review.

Ratings are qualitative engineering assessments, not measured probabilities.

| ID | Risk | Likelihood | Impact | Treatment | State |
|---|---|---|---|---|---|
| RSK-001 | Prototype mistaken for live monitoring | High | Critical | Persistent simulation labels; truthful claims; readiness gate | Open |
| RSK-002 | No backend or authenticated authorization boundary | High | Critical | Implement API, identity, server-side authorization and negative tests | Open |
| RSK-003 | No persistent event/evidence/audit store | High | Critical | Durable stores, integrity, retention, backup/restore | Open |
| RSK-004 | Detection too narrow for operations | High | High | Authorized representative datasets, rule catalogue and metrics | Open |
| RSK-005 | False positives create alert fatigue | High | High | Measure precision/recall, tune and version rules | Open |
| RSK-006 | Telemetry/personal data mishandled | Medium | Critical | Inventory, privacy review, minimization and encryption | Open |
| RSK-007 | AI explanation invents or leaks data | Medium | High | Optional server-side AI, evidence validation, redaction, review | Open |
| RSK-008 | Supply-chain compromise | Medium | High | Lockfile, pinned actions, npm audit and CodeQL; add secret scanning, SBOM and license review | Partially mitigated |
| RSK-009 | Backup cannot be restored | Medium | Critical | Isolated backup and timed restore exercises | Open |
| RSK-010 | No institutional operating/support owner | High | High | Agree service owner, support and escalation | Open |
| RSK-011 | Performance/capacity unknown | High | High | Workload model, load and soak tests | Open |
| RSK-012 | No independent security assessment | High | Critical | Independent assessor and remediation closure | Open |
| RSK-013 | Research claims lack reproducible evidence | Medium | High | Dataset provenance, predefined metrics and baselines | Open |
| RSK-014 | Hosting/data residency conflicts with policy | Medium | Critical | Confirm location, transfer rules, contracts and design | Open |
| RSK-015 | License/IP/third-party rights unclear | Medium | High | Choose license, inventory dependencies, confirm ownership | Open |
| RSK-016 | Critical/moderate advisories in baseline Vitest dependency tree | High | High | Upgrade to patched Vitest release; verify full dependency audit and regression suite | Mitigated in CI run 43390419378; continue monitoring |

## Risk acceptance
Only an authority with delegated responsibility may accept a risk after recording impact, compensating controls, expiry/review date and residual risk. Developers must not self-approve institutional security risk. Critical risks affecting confidentiality, integrity, authorization or recovery block production absent explicit lawful institutional authorization.
