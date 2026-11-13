# Institutional Engineering & Handover Pack

**Status:** Controlled baseline draft; not an approval or certification.

This directory defines the engineering, assurance, operational and handover evidence expected before Cybersecurity Command Center (CCC) can be represented as suitable for institutional evaluation. The current repository is an early-stage React/TypeScript research prototype with a local simulator and an isolated synthetic-only authentication-failure detector. It does not provide production telemetry ingestion, backend, persistent storage, authentication, RBAC, case management, audit service, multi-tenancy, operational monitoring or production support.

## Status vocabulary
- **Implemented / verified:** exists and has supporting evidence.
- **Implemented / not verified:** code/config exists; acceptance evidence incomplete.
- **Specified / not implemented:** design only.
- **Blocked:** depends on an external decision or authorization.
- **Not applicable:** rationale and approval recorded.

Documentation never upgrades implementation status.

## Document register
- GOV-001 [Governance and document control](GOVERNANCE.md)
- REQ-001 [Requirements catalogue](REQUIREMENTS.md)
- TRACE-001 [Requirements traceability](TRACEABILITY.md)
- WF-001 [End-to-end workflows](WORKFLOWS.md)
- TEST-001 [Verification strategy](TEST_STRATEGY.md)
- TEST-002 [Test catalogue](TEST_CATALOGUE.md)
- SEC-001 [Security control baseline](SECURITY_CONTROLS.md)
- IAM-001 [Identity and access model](IDENTITY_ACCESS.md)
- DATA-001 [Data governance](DATA_GOVERNANCE.md)
- API-001 [API contract baseline](API_CONTRACT.md)
- OPS-001 [Deployment and operations](DEPLOYMENT_OPERATIONS.md)
- BCP-001 [Backup and disaster recovery](BACKUP_RECOVERY.md)
- IR-001 [Platform incident response](INCIDENT_RESPONSE.md)
- RISK-001 [Risk register](RISK_REGISTER.md)
- ACC-001 [Institutional acceptance and handover](ACCEPTANCE_HANDOVER.md)
- ENG-001 [Software engineering and code standards](CODE_STANDARDS.md)
- DEV-001 [GitHub repository governance](GITHUB_GOVERNANCE.md)
- REL-001 [Release management](RELEASE_MANAGEMENT.md)
- [Architecture Decision Record template](ADR_TEMPLATE.md)
- [ADR-001: Production data platform selection](ADR-001-DATA-PLATFORM.md)
- [Administrator guide](ADMINISTRATOR_GUIDE.md)
- [SOC analyst guide](ANALYST_GUIDE.md)
- [Auditor guide](AUDITOR_GUIDE.md)
- [Operations guide](OPERATIONS_GUIDE.md)
- [Data dictionary and glossary](DATA_DICTIONARY.md)
- [Security scanning and supply-chain controls](../SECURITY_SCAN.md)
- [Draft OpenAPI 3.1 API contract](../../openapi/openapi.yaml)
- [Canonical event schema specification](../EVENT_SCHEMA.md)
- [Case management domain core](../CASE_MANAGEMENT.md)
- [Synthetic operations dashboard and manual acceptance](../DEMO_DASHBOARD.md)
- [Synthetic event processing pipeline](../DETECTION_ENGINE.md#pipeline-integration)
- [Synthetic detection benchmark harness](../BENCHMARK_HARNESS.md)
- [Versioned synthetic benchmark fixtures](../../services/benchmarkScenarios.ts)

## Handover rule
No production handover may be declared until mandatory requirements have implementation references, passing tests, security review, operational runbooks, recovery evidence and written acceptance by the receiving institution. No government endorsement, certification or authorization is implied by these documents.
