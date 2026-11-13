import { detectAuthenticationFailureBursts, type DetectionResult, type SecurityEvent } from './eventEngine';
import { parseCanonicalEvent, type CanonicalSecurityEvent } from './eventSchema';

export interface EventPipelineResult {
  normalizedEvents: CanonicalSecurityEvent[];
  detection: DetectionResult;
}

/**
 * Parse and normalize untrusted research fixtures, then pass validated events
 * into the deterministic detector. This remains synthetic-only and in-memory.
 */
export function processSyntheticEventBatch(inputs: readonly unknown[]): EventPipelineResult {
  if (!Array.isArray(inputs)) throw new Error('inputs must be an array.');
  if (inputs.length > 10_000) throw new Error('A maximum of 10,000 events may be processed at once.');

  const normalizedEvents = inputs.map(parseCanonicalEvent);
  const detectorEvents: SecurityEvent[] = normalizedEvents.map(event => ({
    eventId: event.eventId,
    observedAt: event.observedAt,
    sourceId: event.sourceId,
    eventType: event.eventType,
    simulation: true,
    attributes: event.attributes,
  }));

  return {
    normalizedEvents,
    detection: detectAuthenticationFailureBursts(detectorEvents),
  };
}
