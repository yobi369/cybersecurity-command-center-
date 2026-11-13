# Synthetic Detection Benchmark Harness

**Status:** Implemented for deterministic software regression only. Not a field-performance evaluation.

## Purpose
Evaluate whether the current versioned detection rule behaves as expected on a fixed, labelled set of synthetic scenarios. The harness reports a confusion matrix and standard classification metrics so rule changes can be compared reproducibly.

## Implementation
- Source: services/benchmark.ts
- Versioned fixture set: services/benchmarkScenarios.ts (seven hand-authored scenarios).\n- Tests: services/benchmark.test.ts
- Input: scenario ID, canonical synthetic event fixtures and expected finding boolean.
- Processing: every scenario passes through the canonical parser and in-memory event pipeline.
- Output: per-scenario result, finding IDs, event count, rule-set version and confusion matrix.

## Metrics
- True positive (TP): expected finding and detector produced a finding.
- False positive (FP): no finding expected but detector produced one.
- True negative (TN): no finding expected and none produced.
- False negative (FN): finding expected but none produced.
- Precision = TP / (TP + FP).
- Recall = TP / (TP + FN).
- F1 = harmonic mean of precision and recall.
- Accuracy = (TP + TN) / scenario count.

Undefined ratios are represented as null rather than fabricated as zero. Metrics are rounded to four decimal places.

## Safety and resource bounds
- Maximum 1,000 scenarios per benchmark.
- Maximum 100,000 aggregate events per benchmark.
- Each scenario is also subject to the event pipeline's 10,000-event limit.
- Duplicate scenario IDs and malformed fixture payloads are rejected.
- Invalid fixtures fail the benchmark rather than being silently scored as negatives.

## Reproducibility
Record commit SHA, lockfile, detector/rule version, scenario-set version, exact command, test/coverage artifact and result JSON in any research experiment. Keep fixture ordering and timestamps deterministic. A changed rule version or scenario set creates a new experiment record.

## Limitations
The seven benchmark scenarios are hand-authored synthetic cases derived from the current rule logic. The current v1 fixture set has 3 expected positives and 4 expected negatives; the regression test verifies all seven labels against the detector. They are not representative institutional telemetry, independent ground truth, adversarial evaluation, or a statistically powered sample. A perfect score on this harness would only demonstrate agreement with the labelled fixtures; it would not establish real-world precision, recall, effectiveness or novelty.

## Required future evaluation
Obtain institution-approved, de-identified datasets and adjudicated labels; document sampling and class balance; define train/development/test separation where applicable; include benign variation and adversarial edge cases; compare baseline rules; measure false positives per asset/time; assess drift and subgroup effects where lawful; obtain independent review and approvals before claiming operational performance.
