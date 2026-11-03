# Cybersecurity Command Center

**Status:** Early-stage research prototype; not production-ready.

> **Safety boundary:** The current application is a local educational simulator. It does not perform real network discovery, vulnerability scanning, exploitation, credential attacks, or incident response actions. Scan and system-information output is fixed synthetic fixture data.

## Project purpose

The project is being developed to investigate how security operations teams can combine deterministic detection, structured evidence, and carefully constrained AI assistance to improve security-event triage while preserving accuracy, traceability, and analyst control.

The research direction below is provisional pending confirmation of the researcher's approved PhD topic and a literature review establishing novelty.

## Current implementation

- React 19 + TypeScript + Vite frontend.
- Terminal-style demonstration interface.
- Deterministic local simulation service; no provider request is made by the current simulator.
- Bounded input and validation for fictional asset labels.
- The previous browser-side Gemini SDK integration has been removed.
- Seven deterministic unit tests covering simulation labelling, input bounds, supported topics, and disabled offensive commands.
- GitHub Actions quality workflow; latest verified run passed unit tests, TypeScript validation, and production build.
- Initial research, architecture, threat-model, validation, presentation, and security documentation.

Not yet implemented: backend, real telemetry ingestion, event persistence, detection engine, authentication/RBAC, case management, audit trail, benchmark harness, and scientific evaluation.

See [docs/BASELINE_AUDIT.md](docs/BASELINE_AUDIT.md) for the initial code audit and subsequent changes.

## Proposed research direction

**Working title:** Evidence-Grounded AI Assistance for Explainable and Reproducible Security-Event Triage.

The target architecture separates authorized event collection and provenance, deterministic versioned detection, evidence references and decision traces, optional AI explanation grounded in established evidence, human review, and reproducible evaluation against defined baselines.

This is a proposed direction, not a claim of novelty or demonstrated improvement.

## Documentation

- [Research foundation and questions](docs/RESEARCH_FOUNDATION.md)
- [Baseline audit](docs/BASELINE_AUDIT.md)
- [System architecture](docs/SYSTEM_ARCHITECTURE.md)
- [Threat model](docs/THREAT_MODEL.md)
- [Validation and experimental protocol](docs/VALIDATION_PLAN.md)
- [Presentation and demonstration plan](docs/DEMO_AND_PRESENTATION.md)
- [Engineering roadmap](docs/ROADMAP.md)
- [Security policy](SECURITY.md)

## Development

Install dependencies with npm install. Run npm test, npm run typecheck, and npm run build.

A committed dependency lockfile is still outstanding. CI success is tied to a specific commit and must be rechecked after subsequent code changes.

## Research integrity

Do not report synthetic outputs as observations, proposed architecture as implemented functionality, or unrun experiments as results. Document dataset provenance, licensing, preprocessing, splits, baselines, metrics, uncertainty, and limitations. Human-subject studies require applicable institutional ethics approval.

## License

No license is currently declared. An explicit license should be selected before external reuse or distribution.
