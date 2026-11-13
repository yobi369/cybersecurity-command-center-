# Cybersecurity Command Center

**Status:** Early-stage research prototype; not production-ready.

> **Safety boundary:** The current application is a local educational simulator. It does not perform real network discovery, vulnerability scanning, exploitation, credential attacks, or incident response actions. Scan and system-information output is fixed synthetic fixture data.

## Project purpose

The project is being developed to investigate how security operations teams can combine deterministic detection, structured evidence, and carefully constrained AI assistance to improve security-event triage while preserving accuracy, traceability, and analyst control.

The research direction below is provisional pending confirmation of the researcher's approved PhD topic and a literature review establishing novelty.

## Current implementation

- React 19 + TypeScript + Vite frontend.
- Evidence-linked synthetic SOC dashboard with event register, detection findings and local case workflow demonstration.
- Deterministic local simulation service; no provider request is made by the current simulator.
- Bounded input and validation for fictional asset labels.
- The previous browser-side Gemini SDK integration has been removed.
- Seven deterministic simulator tests covering simulation labelling, input bounds, supported topics, and disabled offensive commands.
- Eleven event-engine tests covering thresholds, rolling windows, source separation, evidence references, duplicate rejection, malformed identifiers, timezone validation, batch limits, and synthetic-only enforcement.
- Ten canonical event-schema tests, six end-to-end in-memory pipeline tests, twelve case-management tests and nine synthetic benchmark tests, and seven strict timestamp tests (62 automated tests in total).
- An isolated deterministic authentication-failure burst detector with rule versioning and evidence event IDs.
- A strict synthetic-only canonical event parser (schema v1.0.0) with UTC normalization, unknown-field rejection and bounded scalar attributes, integrated with the deterministic detector through an in-memory processing pipeline.
- A reproducible synthetic benchmark harness reporting TP/FP/TN/FN, precision, recall, F1 and accuracy, with strict scenario/event bounds and explicit limitations.
- A role-aware case lifecycle domain core with tenant-scope checks, supervisor gates, optimistic concurrency and structured audit-event output; no authenticated API or durable persistence yet.
- GitHub Actions quality workflow; CI uses a committed lockfile and frozen `npm ci`, V8 coverage reporting with regression thresholds, dependency-tree verification, high-severity npm audit, strict TypeScript validation and production build. CycloneDX SBOM and coverage reports are retained as workflow artifacts; CodeQL static analysis and full-history Gitleaks secret scanning run separately.
- Initial research, architecture, threat-model, validation, presentation, security and institutional handover documentation.
- A locally compiled Tailwind CSS bundle; the runtime Tailwind CDN dependency has been removed.
- A draft OpenAPI 3.1 API contract, linted in CI; no API server or endpoint is deployed.

Not yet implemented: backend, real telemetry ingestion, event persistence, authenticated analyst workflow, full persistent case management, append-only audit storage, benchmark harness, and scientific evaluation. The institutional documentation is a target specification, not proof that these controls or workflows exist. The initial detection engine is a synthetic-only library, not a production detector.

See [docs/BASELINE_AUDIT.md](docs/BASELINE_AUDIT.md) for the initial code audit and subsequent changes.

## Proposed research direction

**Working title:** Evidence-Grounded AI Assistance for Explainable and Reproducible Security-Event Triage.

The target architecture separates authorized event collection and provenance, deterministic versioned detection, evidence references and decision traces, optional AI explanation grounded in established evidence, human review, and reproducible evaluation against defined baselines.

This is a proposed direction, not a claim of novelty or demonstrated improvement.

## Documentation

- [Research foundation and questions](docs/RESEARCH_FOUNDATION.md)
- [Baseline audit](docs/BASELINE_AUDIT.md)
- [System architecture](docs/SYSTEM_ARCHITECTURE.md)
- [Draft OpenAPI contract](openapi/openapi.yaml)
- [Canonical event schema](docs/EVENT_SCHEMA.md)
- [Synthetic dashboard demonstration and manual tests](docs/DEMO_DASHBOARD.md)
- [Case management domain core](docs/CASE_MANAGEMENT.md)
- [Threat model](docs/THREAT_MODEL.md)
- [Security scanning and supply-chain controls](docs/SECURITY_SCAN.md)
- [Validation and experimental protocol](docs/VALIDATION_PLAN.md)
- [Presentation and demonstration plan](docs/DEMO_AND_PRESENTATION.md)
- [Engineering roadmap](docs/ROADMAP.md)
- [Security policy](SECURITY.md)
- [Institutional engineering and handover pack](docs/institutional/README.md)

## Development

Install dependencies with npm install. Run npm test, npm run typecheck, and npm run build.

A committed npm lockfile is now generated and tracked. CI uses `npm ci` for frozen dependency installation, followed by dependency-tree verification, vulnerability audit, tests, typecheck and production build.

## Research integrity

Do not report synthetic outputs as observations, proposed architecture as implemented functionality, or unrun experiments as results. Document dataset provenance, licensing, preprocessing, splits, baselines, metrics, uncertainty, and limitations. Human-subject studies require applicable institutional ethics approval.

## License

No license is currently declared. An explicit license should be selected before external reuse or distribution.
