# Verification and Test Strategy

**ID:** TEST-001 | **Status:** Proposed verification baseline.

## Objectives
Verify functional correctness, security, privacy, reliability, performance, recoverability, accessibility and reproducibility. Every test run is tied to a commit and environment.

## Test levels
| Level | Purpose | Gate |
|---|---|---|
| Static analysis | Strict typecheck, CodeQL SAST and Gitleaks full-history secret scan; source lint/format gates remain pending | Required |
| Unit | Isolated validators, rules, permissions | Required |
| Property/fuzz | Malformed and adversarial parsers/rules | Required |
| Component | UI state and accessibility | Required |
| API contract | OpenAPI lint automated; live schema/compatibility tests not implemented | Required |
| Integration | Ingestion-store-detection workflow | Required |
| Database | Constraints, migrations, tenant isolation | Required |
| End-to-end | Complete operator workflows | Required |
| Security | Authz, injection, SSRF, CSRF, XSS, secrets | Required |
| Performance | Load, stress and soak | Required |
| Resilience | Dependency failures, failover and restore | Required |
| Accessibility | Keyboard, screen reader, contrast | Required |
| UAT | Institution-approved acceptance scripts | Required |

## Evidence record
Record test run ID, UTC timestamp, commit SHA, release candidate, OS/runtime/browser/database, dependency lock hash, exact commands/configuration, case IDs, pass/fail/blocked/skipped counts, logs/artifacts, defect IDs, tester/reviewer and deviations.

A green CI job does not prove a category it does not execute.

## Automated CI gates
The Quality Gates workflow executes frozen npm ci, dependency-tree verification, high-severity npm audit, OpenAPI lint, CycloneDX SBOM generation, Vitest V8 coverage thresholds, strict TypeScript validation and production build. Coverage and SBOM artifacts are retained. Separate workflows run CodeQL SAST and Gitleaks full-history secret scanning.

## Additional institutional release gates
Source lint/format enforcement, license review, live API/database contract tests, integration and end-to-end tests, DAST/penetration testing, performance/soak, recovery, accessibility, UAT, artifact signing/checksums and protected-branch approval remain required before production handover.

Coverage is diagnostic, not proof. Critical authorization, tenant isolation, evidence integrity, audit, parser and rule logic require explicit positive and negative tests.

## Defect severity
Critical: unauthorized access, tenant leakage, remote compromise, evidence tampering, secret exposure or loss of critical records. High: major security-control failure, broad outage or material integrity/privacy defect. Medium: constrained failure with workaround. Low: cosmetic/low impact. Critical/high defects block production unless an authorized institutional risk decision explicitly permits a restricted exception.

## Current evidence
There are 62 automated unit tests across simulator, event-engine, canonical-schema, pipeline, case-management, benchmark and timestamp suites. CI now generates a V8 coverage summary; GitHub Actions Quality Gates run 43396720137 passed on commit db2f74c30db04d8d5b1873f1955068ed5c83b96f with frozen `npm ci`, dependency-tree verification, high-severity npm audit, OpenAPI lint, CycloneDX SBOM generation, 62 unit tests, strict TypeScript validation, production build and retained coverage/SBOM artifact. Coverage: 91.85% statements, 89.00% branches, 96.00% functions and 99.11% lines; regression thresholds (85/80/90/95) passed. Gitleaks full-history scan run 43396720227 passed on the same commit. CodeQL analysis run 43396720311 was still in progress at the time of this record update. These automated checks do not establish integration, security, accessibility, performance, recovery or production readiness. This does not establish integration, security, accessibility, performance, recovery or production readiness.
