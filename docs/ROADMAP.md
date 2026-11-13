# Engineering and Research Roadmap

This roadmap is gated by evidence. A milestone is complete only when its acceptance criteria are met and recorded.

## M0 — Baseline and research framing
- [x] Inspect initial repository tree and source.
- [x] Record verified baseline limitations.
- [x] Establish provisional research framing and documentation.
- [ ] Researcher confirms PhD topic, research questions, and institutional constraints.
- [ ] Literature review establishes novelty and related-work comparison.

## M1 — Secure frontend foundation
- [x] Remove browser-side provider secrets and SDK calls from the active application.
- [x] Replace generated fictional security observations with deterministic, labelled fixtures.
- [x] Add bounded input validation for the current fictional asset label.
- [x] Replace runtime CDN styling with locally compiled Tailwind assets.
- [x] Add and validate a committed npm lockfile; CI uses `npm ci`.
- [x] Enable strict TypeScript checks and no-implicit-return/fallthrough validation.
- [ ] Add linting and formatting gates.
- [x] Add deterministic unit tests, V8 coverage reporting, regression thresholds and a CI workflow.
- [x] Preserve coverage reports as CI artifacts.
- [x] Verify frozen install, dependency audit, OpenAPI lint, CycloneDX SBOM, 55 tests, coverage thresholds, strict TypeScript and production build on commit 79bb648718f6b2855bc1631622f10d66319d5a0c.
- [x] Pin workflow actions to immutable commit SHAs and add npm dependency audit to CI.
- [x] Add CodeQL static analysis and Gitleaks full-history secret scanning workflows; alert triage and GitHub-native secret scanning/push protection remain outstanding.
- [x] Generate CycloneDX SBOM and retain it with CI coverage evidence.

## M2 — Evidence and detection core

Progress: the synthetic-only detector is wired to the local demonstration dashboard through a strict in-memory pipeline. It is not connected to a data source, persistence layer or authenticated service.
- [x] Define canonical synthetic fixture schema v1.0.0 with strict parsing and UTC normalization.
- [x] Implement strict synthetic-fixture normalization; production ingestion contract remains outstanding.
- [x] Add an isolated deterministic authentication-failure burst rule (synthetic inputs only; rule version 1.0.0).
- [x] Emit findings with source IDs, rule versions, and evidence event IDs.
- [x] Add unit tests for thresholds, rolling windows, source separation, malformed inputs, duplicates, and synthetic-only enforcement.
- [x] Add replayable labelled synthetic scenarios and bounded benchmark harness with confusion matrix and classification metrics.
- [x] Integrate canonical parsing and deterministic detection in an in-memory synthetic-only pipeline with batch rejection and duplicate-ID checks.
- [x] Add malformed-shape, unknown-field, timezone, identifier, attribute-bound and batch-limit tests for current fixture parsers.

## M3 — Case workflow and accountability
- [x] Implement pure case lifecycle state machine, role-aware transition policy and structured audit-event output (in-memory domain only).
- [ ] Implement persistent case storage and analyst dispositions through an authenticated API.
- [ ] Implement server-side identity integration and role-based authorization; current domain policy is not an authentication boundary.
- [x] Define structured audit-event output for accepted case transitions.
- [ ] Persist append-only audit events atomically and add integrity/tamper tests.
- [ ] Add data retention and export policy.
- [ ] Add privacy-safe observability.

## M4 — Bounded AI assistance
- [ ] Define structured explanation schema.
- [ ] Add server-side provider adapter with timeouts and quotas.
- [ ] Ground explanations in evidence IDs and deterministic findings.
- [ ] Add output validation, redaction, prompt-injection tests, and failure states.
- [ ] Ensure AI cannot create or modify detections or execute actions.
- [ ] Compare grounded versus ungrounded explanation approaches in a controlled evaluation.

## M5 — Research validation
- [ ] Select and document dataset(s), licenses, and splits.
- [ ] Establish baselines and primary metrics.
- [ ] Implement reproducible benchmark harness.
- [ ] Run repeated experiments and error analysis.
- [ ] Measure explanation faithfulness.
- [ ] Conduct approved analyst study if in scope.
- [ ] Report confidence intervals, limitations, and negative results.

## M6 — Institutional engineering and governance foundation
- [x] Create institutional document register and controlled status vocabulary.
- [x] Specify functional/non-functional requirements and initial traceability.
- [x] Document end-to-end target workflows and test strategy/catalogue.
- [x] Specify security controls, identity/access model and data governance.
- [x] Document API contract baseline, deployment, backup/recovery and incident response.
- [x] Establish risk register, acceptance/handover plan, code standards and GitHub governance.
- [ ] Validate requirements and operational targets with a named receiving institution.
- [ ] Verify repository rulesets, branch protection, CODEOWNERS and security settings.

## M7 — Presentation and operational readiness
- [x] Build initial evidence-linked synthetic dashboard and local case workflow demo.
- [ ] Complete accessibility, responsive and institution-specific dashboard acceptance.
- [ ] Produce architecture, data-flow, and experiment diagrams.
- [ ] Prepare a judge-ready demonstration and offline fallback.
- [ ] Document deployment, secrets, backup, restore, monitoring, and incident response.
- [ ] Complete accessibility and browser testing.
- [ ] Conduct independent code and security review.
- [ ] Publish a truthful readiness report.

## Definition of done

A feature is not complete because a screen exists. It is complete when requirements, implementation, tests, security implications, documentation, and observable evidence agree. Research claims require experimental evidence; production claims require deployment and operational evidence.
