# Security Control Baseline

**ID:** SEC-001 | **Status:** Target controls; applicability and implementation review required.

| Control | Requirement | Evidence | Current state |
|---|---|---|---|
| SEC-001 | TLS for deployed traffic | Config and external scan | Not implemented/verified |
| SEC-002 | Server-side managed secrets | Config review and secret scan | Not implemented |
| SEC-003 | Strong institution-approved authentication | Integration and negative tests | Not implemented |
| SEC-004 | Server-side least-privilege authorization | Permission matrix and API tests | Not implemented |
| SEC-005 | Session expiry/revocation and CSRF protection as applicable | Security tests | Not implemented |
| SEC-006 | Validate and bound untrusted input | Schema/boundary tests | Partial: strict synthetic parser and pipeline; no production ingestion gateway |
| SEC-007 | XSS, injection, SSRF, path traversal and unsafe deserialization defenses | CodeQL, DAST and targeted tests | CodeQL workflow active; DAST/penetration testing not performed |
| SEC-008 | Rate limits for auth, ingest and expensive operations | Abuse/load tests | Not implemented |
| SEC-009 | Encrypt sensitive data at rest and manage keys | Storage/key review | Not implemented |
| SEC-010 | Tenant/resource isolation if multi-tenant | Isolation tests | Not implemented |
| SEC-011 | Attributable, tamper-evident audit | Integrity tests | Not implemented |
| SEC-012 | Evidence integrity and provenance | Hash/reference tests | Partial event IDs only |
| SEC-013 | Dependency and license review | npm audit, CycloneDX SBOM, Dependabot and license review | Partial: npm audit/SBOM/Dependabot automated; license review outstanding |
| SEC-014 | Immutable CI action pinning and least privilege | Workflow review | Implemented in CI workflows with full action SHAs and restricted token permissions; branch protection unverified |
| SEC-015 | Backup and tested restore | Exercise evidence | Not implemented |
| SEC-016 | Retention and secure deletion | Policy and verification | Not implemented |
| SEC-017 | Safe security monitoring/logging | Logging review | Not implemented |
| SEC-018 | Separate dev/test/staging/prod | Environment review | Not implemented |
| SEC-019 | Periodic privileged-access review | Access review records | Not implemented |
| SEC-020 | Independent security assessment | Signed report and remediation | Not performed |
| SEC-021 | Scan repository history for exposed secrets | Gitleaks full-history workflow | Implemented in CI; full-history scan passed on commit 79bb648718f6b2855bc1631622f10d66319d5a0c; findings must be triaged and any exposed credential rotated |

## Secure engineering rules
Never commit credentials, certificates, tokens, private keys or real incident data. Treat telemetry as hostile. Never render raw fields as trusted HTML or execute supplied shell/script content. Keep AI provider credentials server-side. AI must not alter detections, permissions, disposition or response actions. Apply least privilege to users, database roles, CI and service identities. Keep secrets and unnecessary personal data out of logs. Review dependencies for vulnerabilities, license, maintenance and necessity.

## Production security gate
Require reviewed threat model, secure configuration, no unresolved critical/high findings absent formal authorized acceptance, verified access-control tests, dependency/secret scanning, independent assessment, incident-response readiness, recovery evidence and approval by the institution's designated authority.
