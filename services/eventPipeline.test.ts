import { describe, expect, it } from 'vitest';
import { processSyntheticEventBatch } from './eventPipeline';

function fixture(eventId: string, minute: number, sourceId = 'lab-source-01', eventType = 'authentication.failure') {
  const timestamp = new Date(Date.UTC(2026, 0, 1, 0, minute)).toISOString();
  return {
    eventId, observedAt: timestamp, receivedAt: timestamp, sourceId,
    sourceType: 'synthetic', schemaVersion: '1.0.0', eventType,
    simulation: true, attributes: { fixture: 'pipeline-test' },
  };
}

describe('synthetic event processing pipeline', () => {
  it('normalizes canonical fixtures and invokes the detector', () => {
    const result = processSyntheticEventBatch([0, 1, 2, 3, 4].map((m, i) => fixture('evt-' + i, m)));
    expect(result.normalizedEvents).toHaveLength(5);
    expect(result.normalizedEvents[0].observedAt).toBe('2026-01-01T00:00:00.000Z');
    expect(result.detection.findings).toHaveLength(1);
    expect(result.detection.findings[0].evidenceEventIds).toEqual(['evt-0', 'evt-1', 'evt-2', 'evt-3', 'evt-4']);
  });

  it('rejects the entire batch when any event is invalid', () => {
    expect(() => processSyntheticEventBatch([fixture('ok', 0), { ...fixture('bad', 1), schemaVersion: '9.0.0' }]))
      .toThrow('schemaVersion');
  });

  it('rejects duplicate IDs in a batch', () => {
    expect(() => processSyntheticEventBatch([fixture('same', 0), fixture('same', 1)]))
      .toThrow('Duplicate eventId');
  });

  it('rejects non-synthetic source payloads', () => {
    expect(() => processSyntheticEventBatch([{ ...fixture('real', 0), sourceType: 'endpoint', simulation: false }]))
      .toThrow('synthetic sourceType');
  });

  it('does not combine events from different sources', () => {
    const result = processSyntheticEventBatch([
      fixture('a1', 0), fixture('a2', 1), fixture('a3', 2),
      fixture('b1', 0, 'lab-source-02'), fixture('b2', 1, 'lab-source-02'),
    ]);
    expect(result.detection.findings).toHaveLength(0);
  });

  it('rejects batches above the pipeline limit', () => {
    const large = Array.from({ length: 10_001 }, (_, i) => fixture('evt-' + i, 0));
    expect(() => processSyntheticEventBatch(large)).toThrow('10,000');
  });
});
