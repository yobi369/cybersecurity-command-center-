# Cybersecurity Command Center

**Research and engineering status:** Early-stage prototype. This repository is being developed into a reproducible, evidence-grounded cybersecurity operations research platform.

> **Safety boundary:** The current application is an educational simulator. It does not perform real network discovery, vulnerability scanning, exploitation, credential attacks, or incident response actions. Outputs must be identified as simulated unless they are derived from explicitly configured, authorized telemetry sources.

## Project purpose

The project aims to investigate how security operations teams can combine deterministic detection logic, structured evidence, and carefully constrained AI assistance to improve the triage and explanation of security events without sacrificing accuracy, traceability, or analyst control.

The research direction in this README is provisional until the research questions, target environment, and evaluation protocol are confirmed with the researcher.

## Current implementation (repository audit: 2026-11-03)

- React 19 + TypeScript + Vite frontend.
- Terminal-style command interface.
- Gemini-powered generation of fictional educational command output.
- Commands currently include `scan`, `analyze`, `crack`, `exploit`, `systeminfo`, `help`, and `clear`.
- No backend service, telemetry ingestion pipeline, persistent event store, detection engine, identity layer, role model, audit trail, benchmark harness, automated test suite, or CI workflow was present in the initial repository snapshot.
- The initial UI is not evidence of a functioning SOC or real security monitoring system.

See [docs/BASELINE_AUDIT.md](docs/BASELINE_AUDIT.md) for verified findings.

## Proposed research direction

**Working title:** Evidence-Grounded AI Assistance for Explainable and Reproducible Security-Event Triage.

The proposed system separates:
1. **Evidence collection** — ingest explicitly authorized, reproducible event records.
2. **Deterministic detection** — evaluate versioned rules against normalized events.
3. **Evidence management** — retain event provenance, timestamps, rule versions, and decision traces.
4. **AI-assisted explanation** — summarize already-established evidence; AI does not invent telemetry or independently declare an incident.
5. **Human decision-making** — analysts review, annotate, escalate, or close cases with auditable actions.
6. **Evaluation** — compare the proposed workflow against defined baselines using reproducible datasets and predeclared metrics.

This is a research hypothesis and system direction, not a claim of demonstrated improvement.

## Documentation

- [Research foundation and questions](docs/RESEARCH_FOUNDATION.md)
- [Baseline audit](docs/BASELINE_AUDIT.md)
- [System architecture](docs/SYSTEM_ARCHITECTURE.md)
- [Threat model](docs/THREAT_MODEL.md)
- [Validation and experimental protocol](docs/VALIDATION_PLAN.md)
- [Presentation and demonstration plan](docs/DEMO_AND_PRESENTATION.md)
- [Engineering roadmap](docs/ROADMAP.md)
- [Security policy](SECURITY.md)

## Safety and responsible use

Only use real telemetry from systems for which you have explicit authorization. Keep demonstrations synthetic by default. Do not place secrets, personal data, live credentials, or sensitive production logs in this repository or public issue reports. See [SECURITY.md](SECURITY.md).

## Development status

This repository is at the research-prototype stage. Production readiness, detection effectiveness, dataset validity, performance, and research novelty have not yet been established. Progress will be reported through tests, reproducible experiments, documented limitations, and traceable commits—not unsupported feature claims.

## License

No license was present in the initial repository snapshot. The project owner should select and add an explicit license before external reuse or distribution.
