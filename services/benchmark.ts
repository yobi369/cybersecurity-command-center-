import { processSyntheticEventBatch } from './eventPipeline';
import { DETECTION_RULE_SET_VERSION } from './eventEngine';

export interface BenchmarkScenario {
  scenarioId: string;
  events: readonly unknown[];
  expectedFinding: boolean;
}

export interface BenchmarkScenarioResult {
  scenarioId: string;
  expectedFinding: boolean;
  actualFinding: boolean;
  findingIds: string[];
  passed: boolean;
}

export interface BenchmarkMetrics {
  truePositive: number;
  falsePositive: number;
  trueNegative: number;
  falseNegative: number;
  precision: number | null;
  recall: number | null;
  f1Score: number | null;
  accuracy: number | null;
}

export interface BenchmarkReport {
  ruleSetVersion: typeof DETECTION_RULE_SET_VERSION;
  scenarioCount: number;
  eventCount: number;
  passedScenarioCount: number;
  metrics: BenchmarkMetrics;
  results: BenchmarkScenarioResult[];
}

function ratio(numerator: number, denominator: number): number | null {
  return denominator === 0 ? null : Number((numerator / denominator).toFixed(4));
}

/**
 * Run deterministic labelled synthetic scenarios against the current rule.
 * Results are software-regression evidence, not real-world effectiveness metrics.
 */
export function runSyntheticDetectionBenchmark(scenarios: readonly BenchmarkScenario[]): BenchmarkReport {
  if (!Array.isArray(scenarios) || scenarios.length === 0) throw new Error('At least one benchmark scenario is required.');
  if (scenarios.length > 1000) throw new Error('A maximum of 1,000 scenarios may be evaluated.');
  const seen = new Set<string>();
  const results: BenchmarkScenarioResult[] = [];
  let eventCount = 0;
  let plannedEventCount = 0;
  let ruleSetVersion: typeof DETECTION_RULE_SET_VERSION = DETECTION_RULE_SET_VERSION;
  let truePositive = 0;
  let falsePositive = 0;
  let trueNegative = 0;
  let falseNegative = 0;

  for (const scenario of scenarios) {
    if (!scenario || typeof scenario !== 'object') throw new Error('Each benchmark scenario must be an object.');
    if (typeof scenario.scenarioId !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,79}$/.test(scenario.scenarioId)) {
      throw new Error('scenarioId has an invalid format.');
    }
    if (seen.has(scenario.scenarioId)) throw new Error('Duplicate scenarioId: ' + scenario.scenarioId);
    seen.add(scenario.scenarioId);
    if (typeof scenario.expectedFinding !== 'boolean') throw new Error('expectedFinding must be a boolean.');
    if (!Array.isArray(scenario.events)) throw new Error('Scenario events must be an array.');
    plannedEventCount += scenario.events.length;
    if (plannedEventCount > 100_000) throw new Error('A maximum of 100,000 events may be evaluated across one benchmark.');

    const detection = processSyntheticEventBatch(scenario.events).detection;
    ruleSetVersion = detection.ruleSetVersion;
    eventCount += detection.evaluatedEventCount;
    const actualFinding = detection.findings.length > 0;
    if (scenario.expectedFinding && actualFinding) truePositive += 1;
    else if (!scenario.expectedFinding && actualFinding) falsePositive += 1;
    else if (!scenario.expectedFinding && !actualFinding) trueNegative += 1;
    else falseNegative += 1;

    results.push({
      scenarioId: scenario.scenarioId,
      expectedFinding: scenario.expectedFinding,
      actualFinding,
      findingIds: detection.findings.map(finding => finding.findingId),
      passed: scenario.expectedFinding === actualFinding,
    });
  }

  const precision = ratio(truePositive, truePositive + falsePositive);
  const recall = ratio(truePositive, truePositive + falseNegative);
  const f1Score = precision === null || recall === null || precision + recall === 0
    ? null
    : Number((2 * precision * recall / (precision + recall)).toFixed(4));

  return {
    ruleSetVersion,
    scenarioCount: scenarios.length,
    eventCount,
    passedScenarioCount: results.filter(result => result.passed).length,
    metrics: {
      truePositive, falsePositive, trueNegative, falseNegative,
      precision, recall, f1Score,
      accuracy: ratio(truePositive + trueNegative, scenarios.length),
    },
    results,
  };
}
