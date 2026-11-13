import type { BenchmarkScenario } from './benchmark';

function event(
  scenarioId: string,
  index: number,
  offsetSeconds: number,
  sourceId = 'fixture-idp-01',
  eventType: 'authentication.failure' | 'authentication.success' = 'authentication.failure',
) {
  const observedAt = new Date(Date.UTC(2026, 0, 1, 0, 0, offsetSeconds)).toISOString();
  return {
    eventId: scenarioId + '-event-' + index,
    observedAt,
    receivedAt: observedAt,
    sourceId,
    sourceType: 'synthetic',
    schemaVersion: '1.0.0',
    eventType,
    simulation: true,
    attributes: { dataset: 'synthetic-benchmark-v1', scenarioId },
  };
}

function failures(scenarioId: string, offsets: number[], sourceId = 'fixture-idp-01'): unknown[] {
  return offsets.map((offset, index) => event(scenarioId, index, offset, sourceId));
}

/**
 * Versioned hand-authored fixture set. These scenarios exercise known rule
 * boundaries; they are not sampled from operational or real-world telemetry.
 */
export const SYNTHETIC_BENCHMARK_V1: readonly BenchmarkScenario[] = [
  { scenarioId: 'positive-threshold', events: failures('positive-threshold', [0, 60, 120, 180, 240]), expectedFinding: true },
  { scenarioId: 'positive-extended-burst', events: failures('positive-extended-burst', [0, 60, 120, 180, 240, 300, 360]), expectedFinding: true },
  { scenarioId: 'positive-window-boundary', events: failures('positive-window-boundary', [0, 150, 300, 450, 600]), expectedFinding: true },
  { scenarioId: 'negative-below-threshold', events: failures('negative-below-threshold', [0, 60, 120, 180]), expectedFinding: false },
  { scenarioId: 'negative-outside-window', events: failures('negative-outside-window', [0, 150, 300, 450, 601]), expectedFinding: false },
  {
    scenarioId: 'negative-source-separation',
    events: [
      ...failures('negative-source-separation-a', [0, 60, 120], 'fixture-idp-a'),
      ...failures('negative-source-separation-b', [180, 240, 300], 'fixture-idp-b'),
    ],
    expectedFinding: false,
  },
  {
    scenarioId: 'negative-success-only',
    events: Array.from({ length: 6 }, (_, index) => event('negative-success-only', index, index * 60, 'fixture-idp-01', 'authentication.success')),
    expectedFinding: false,
  },
];
