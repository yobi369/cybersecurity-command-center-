# Validation and Experimental Plan

**Status:** Proposed protocol. No benchmark results are claimed.

## Evaluation goals

Evaluate the platform as a research system, not only as a user interface. Separate detection performance, explanation quality, reproducibility, analyst utility, and operational performance.

## Evaluation stages

### Stage A — Functional correctness
- Unit tests for event validation, normalization, rule evaluation, evidence linking, authorization, and audit events.
- Integration tests for event-to-finding and finding-to-case workflows.
- Negative tests for malformed input, missing fields, duplicate events, unauthorized access, and provider failure.
- Deterministic fixtures with fixed expected outputs.

### Stage B — Detection evaluation
Select documented public benchmark datasets or a properly authorized dataset appropriate to the final research question. Record source, license, version, collection process, label quality, class distribution, and preprocessing.

Candidate metrics:
- Precision = TP / (TP + FP)
- Recall = TP / (TP + FN)
- F1 = 2 × precision × recall / (precision + recall)
- False-positive rate = FP / (FP + TN)
- PR-AUC and ROC-AUC where score semantics and class imbalance make them appropriate.
- Per-class and per-scenario results, not only aggregate scores.

Report confusion matrices and confidence intervals. Do not compare numbers across incompatible datasets or label definitions.

### Stage C — Explanation faithfulness
Create a reviewed set of findings with ground-truth evidence references. Evaluate:
- Evidence citation precision and recall.
- Unsupported factual claim rate.
- Contradiction rate.
- Omission of critical evidence.
- Calibration/uncertainty quality where measurable.
- Human reviewer agreement and adjudication protocol.

Define a claim-level annotation guide before scoring. Use at least two independent reviewers if feasible and report agreement statistics.

### Stage D — Analyst utility
If human-subject evaluation is proposed, obtain required institutional ethics approval before recruitment or data collection. Define participant eligibility, consent, task scenarios, randomization/counterbalancing, training, and privacy safeguards.

Candidate outcomes:
- Time to triage.
- Correct disposition rate.
- Escalation accuracy.
- Analyst confidence calibrated against correctness.
- Cognitive workload using a preselected validated instrument if appropriate.

Do not claim analyst benefit from informal demonstrations or developer self-testing.

### Stage E — Reproducibility and performance
- Repeat identical benchmark runs using recorded versions and seeds.
- Record hardware, runtime, dependency versions, dataset hashes, configuration, and execution commands.
- Measure ingestion throughput, detection latency, explanation latency, and resource use under a documented load profile.
- Report median and tail latency, failures, and limitations.

## Baselines and ablations

Select baselines only after reviewing the literature and dataset. Candidate comparisons:
1. Deterministic rules without AI explanation.
2. Generic AI summary without structured evidence grounding (only in a safe offline evaluation).
3. Proposed evidence-grounded explanation workflow.
4. Human-only triage where an ethical, feasible study is approved.

Ablate evidence citation constraints, context size, and rule/explanation separation only where the experiment is meaningful and safe.

## Statistical analysis

Pre-register primary outcomes where practical. Define hypotheses, sample size rationale, exclusion criteria, missing-data handling, statistical tests, effect sizes, confidence intervals, and multiple-comparison corrections before examining final outcomes. Choose tests based on data distribution and study design; do not select tests to manufacture significance.

## Reproducibility package

Each experiment should include:
- Dataset citation, license, version, and checksum.
- Data preprocessing code and parameters.
- Train/validation/test split manifest.
- Rule and model/provider versions.
- Environment and dependency lock.
- Configuration and random seeds.
- Exact commands to reproduce.
- Raw metric outputs and analysis scripts.
- Known limitations and deviations from protocol.

## Reporting template

| Experiment ID | Dataset/version | Split/hash | Baseline | System version | Primary metric | Result | CI | Deviations |
|---|---|---|---|---|---|---|---|---|

Leave results blank until experiments are run. Do not fill this table with illustrative values presented as actual findings.
