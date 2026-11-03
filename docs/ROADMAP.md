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
- [ ] Replace runtime CDN styling with locally built, versioned assets.
- [ ] Add and validate a committed dependency lockfile.
- [ ] Enable strict TypeScript checking and linting.
- [x] Add initial deterministic unit tests and a CI workflow.
- [ ] Verify the latest complete CI run and pin workflow actions to immutable commit SHAs.

## M2 — Evidence and detection core
- [ ] Define versioned canonical event schema.
- [ ] Implement deterministic event normalization.
- [ ] Implement rule registry with versioned, testable rules.
- [ ] Implement finding/evidence references.
- [ ] Add replayable synthetic scenarios.
- [ ] Add event deduplication and timestamp handling.
- [ ] Test malformed, adversarial, and boundary inputs.

## M3 — Case workflow and accountability
- [ ] Implement case lifecycle and analyst dispositions.
- [ ] Implement role-based authorization.
- [ ] Add append-only audit events and integrity tests.
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

## M6 — Presentation and operational readiness
- [ ] Build polished research dashboard and deterministic demo mode.
- [ ] Produce architecture, data-flow, and experiment diagrams.
- [ ] Prepare a judge-ready demonstration and offline fallback.
- [ ] Document deployment, secrets, backup, restore, monitoring, and incident response.
- [ ] Complete accessibility and browser testing.
- [ ] Conduct independent code and security review.
- [ ] Publish a truthful readiness report.

## Definition of done

A feature is not complete because a screen exists. It is complete when requirements, implementation, tests, security implications, documentation, and observable evidence agree. Research claims require experimental evidence; production claims require deployment and operational evidence.
