import { describe, expect, it } from 'vitest';
import { runSyntheticDetectionBenchmark, type BenchmarkScenario } from './benchmark';
import { SYNTHETIC_BENCHMARK_V1 } from './benchmarkScenarios';

function fixture(scenarioId: string, count: number, expectedFinding: boolean, spacing = 1, sourceId = 'lab-source-01'): BenchmarkScenario {
  const events = Array.from({ length: count }, (_, index) => {
    const observedAt = new Date(Date.UTC(2026, 0, 1, 0, index * spacing)).toISOString();
    return {
      eventId: scenarioId + '-event-' + index,
      observedAt,
      receivedAt: observedAt,
      sourceId,
      sourceType: 'synthetic',
      schemaVersion: '1.0.0',
      eventType: 'authentication.failure',
      simulation: true,
      attributes: { fixture: scenarioId },
    };
  });
  return { scenarioId, events, expectedFinding };
}

describe('synthetic detection benchmark harness', () => {
  it('replays the versioned synthetic benchmark fixture set reproducibly', () => {
    const report = runSyntheticDetectionBenchmark(SYNTHETIC_BENCHMARK_V1);
    expect(report.ruleSetVersion).toBe('1.0.0');
    expect(report.scenarioCount).toBe(7);
    expect(report.passedScenarioCount).toBe(7);
    expect(report.metrics).toEqual({
      truePositive: 3, falsePositive: 0, trueNegative: 4, falseNegative: 0,
      precision: 1, recall: 1, f1Score: 1, accuracy: 1,
    });
  });

  it('computes confusion matrix and classification metrics', () => {
    const report = runSyntheticDetectionBenchmark([
      fixture('tp', 5, true),
      fixture('tn', 4, false),
      fixture('fp', 5, false),
      fixture('fn', 4, true),
    ]);
    expect(report.metrics).toEqual({
      truePositive: 1, falsePositive: 1, trueNegative: 1, falseNegative: 1,
      precision: 0.5, recall: 0.5, f1Score: 0.5, accuracy: 0.5,
    });
    expect(report.passedScenarioCount).toBe(2);
    expect(report.scenarioCount).toBe(4);
  });

  it('detects a positive fixture and preserves finding IDs', () => {
    const report = runSyntheticDetectionBenchmark([fixture('positive', 5, true)]);
    expect(report.results[0].actualFinding).toBe(true);
    expect(report.results[0].findingIds).toHaveLength(1);
    expect(report.metrics.recall).toBe(1);
  });

  it('counts below-threshold events as true negatives', () => {
    const report = runSyntheticDetectionBenchmark([fixture('negative', 4, false)]);
    expect(report.metrics.trueNegative).toBe(1);
    expect(report.metrics.precision).toBeNull();
    expect(report.metrics.recall).toBeNull();
  });

  it('rejects scenarios with duplicate identifiers', () => {
    const scenario = fixture('duplicate', 5, true);
    expect(() => runSyntheticDetectionBenchmark([scenario, scenario])).toThrow('Duplicate scenarioId');
  });

  it('rejects empty and oversized benchmark sets', () => {
    expect(() => runSyntheticDetectionBenchmark([])).toThrow('At least one');
    const tooMany = Array.from({ length: 1001 }, (_, index) => fixture('scenario-' + index, 0, false));
    expect(() => runSyntheticDetectionBenchmark(tooMany)).toThrow('1,000');
  });

  it('rejects a benchmark whose aggregate event count exceeds the safety limit', () => {
    expect(() => runSyntheticDetectionBenchmark([{ scenarioId: 'oversized', events: new Array(100_001), expectedFinding: false }])).toThrow('100,000');
  });

  it('rejects malformed benchmark scenario metadata', () => {
    expect(() => runSyntheticDetectionBenchmark([{ scenarioId: 'bad id', events: [], expectedFinding: false }])).toThrow('scenarioId');
    expect(() => runSyntheticDetectionBenchmark([{ scenarioId: 'valid', events: [], expectedFinding: 'yes' as unknown as boolean }])).toThrow('expectedFinding');
    expect(() => runSyntheticDetectionBenchmark([{ scenarioId: 'valid', events: {} as unknown as unknown[], expectedFinding: false }])).toThrow('array');
  });

  it('propagates invalid fixture errors instead of silently scoring them', () => {
    expect(() => runSyntheticDetectionBenchmark([{
      scenarioId: 'invalid-fixture', events: [{ eventId: 'bad', observedAt: '2026-01-01T00:00:00Z', receivedAt: '2026-01-01T00:00:01Z', sourceId: 'lab-source', sourceType: 'synthetic', schemaVersion: '9.0.0', eventType: 'authentication.failure', simulation: true, attributes: {} }], expectedFinding: false,
    }])).toThrow('schemaVersion');
  });
});
