# Baseline Repository Audit

**Initial audit date:** 2026-11-03  
**Initial audited ref:** main  
**Initial audited commit:** 2a58c72bebeef55e9eaafacdf4010e926ce89424  
**Follow-up implementation ref:** research/phd-foundation

## Executive finding

The initial repository was a small educational terminal simulator, not a cybersecurity command center. It contained a React/TypeScript/Vite frontend and a browser-side Gemini integration that generated fictional command output. It had no backend, telemetry pipeline, event store, detection engine, identity model, case workflow, audit trail, tests, lockfile, or CI workflow.

A research-foundation branch has since been created. It adds project governance documentation, replaces provider-backed fictional output with deterministic local fixtures, removes the browser-side Gemini integration, adds input constraints, and introduces initial CI and unit tests. These changes improve prototype safety and reproducibility but do not create a functioning SOC.

## Initial verified inventory

| Area | Initial state on main |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Interface | Terminal component and command input |
| AI integration | Browser-side service imported Google GenAI and called Gemini |
| Commands | scan, analyze, crack, exploit, systeminfo, help, clear |
| Backend / ingestion / persistence | Not present |
| Detection engine | Not present |
| Authentication / RBAC | Not present |
| Audit / case management | Not present |
| Automated tests | No test files or test script found |
| CI | No workflow files; zero workflow runs at initial audit |
| Dependency lock | No lockfile found |
| License | No license file found |

## Initial findings and disposition

### F-01: Provider integration was in the frontend

The initial Gemini service constructed the Google GenAI client in code imported by the browser application and expected an environment API key.

**Disposition on research branch:** The browser-side provider service and dependency were removed from the active implementation. The current simulator uses deterministic local fixtures. If AI explanation is reintroduced, it must be through a secured server-side adapter with authentication, limits, redaction, timeouts, output validation, and server-side secrets. No claim is made that a provider key was exposed in a deployed build; deployment was not inspected.

### F-02: Generated output was not security evidence

The original prompts instructed the model to invent ports, services, vulnerabilities, hashes, and system information.

**Disposition on research branch:** Scan and system information commands now return fixed synthetic fixture output and explicitly state that no network or host was contacted. Credential cracking and exploit simulation commands were removed from the active command set.

### F-03: Command parsing was unbounded

The initial terminal lowercased and split free-form input before passing arguments to prompt construction.

**Disposition on research branch:** The input has a maximum length, blank submissions are ignored, and fictional asset labels are validated. This remains a small command interface, not a general command execution facility.

### F-04: Terminal state lifecycle needed improvement

The initial handler used a history snapshot across an asynchronous provider request.

**Disposition on research branch:** Functional history updates are used around asynchronous output. The interface serializes commands while a local demonstration response is being prepared.

### F-05: Build and quality gates were incomplete

The initial package had no typecheck, test, or CI scripts, and index.html referenced a stylesheet absent from the initial tree.

**Disposition on research branch:** A stylesheet, typecheck script, Vitest runner, deterministic simulator tests, and GitHub Actions workflow were added. A dependency lockfile remains outstanding. The latest CI run must be checked before claiming all gates pass.

### F-06: Research evaluation was absent

No benchmark, experimental design, metrics, ground-truth protocol, or statistical analysis was present.

**Disposition:** Research foundation and a proposed validation plan are documented. No experimental results or novelty claim are made.

## Follow-up branch changes

- Added README and research documentation covering baseline, research framing, architecture, threat model, validation, presentation, roadmap, and security policy.
- Added deterministic local simulation service and unit tests for its safety and validation behavior.
- Removed browser-side Gemini SDK service and dependency.
- Added bounded input and local-only command semantics.
- Added initial quality workflow for unit tests, typechecking, and production build.

## Remaining high-priority gaps

1. Commit and validate a dependency lockfile; pin CI actions to immutable commit SHAs.
2. Verify the latest unit test, typecheck, and production build workflow.
3. Replace CDN-based styling with locally built, versioned assets.
4. Implement canonical event schema, ingestion adapter, deterministic rule engine, and evidence provenance.
5. Implement authentication, authorization, case workflow, and audit trail before multi-user or sensitive-data use.
6. Confirm research topic, literature gap, datasets, baseline, metrics, and ethics requirements.
7. Verify deployment behavior from actual execution logs.

## Audit limitations

This was a source-tree and source-file inspection, not a penetration test, dependency vulnerability scan, runtime test, deployment inspection, or research evaluation. No production controls or external service settings were verified.
