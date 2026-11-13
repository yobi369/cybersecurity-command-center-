/** Deterministic, fixture-first event triage core. No network or response actions. */
export type SecurityEventType = 'authentication.failure' | 'authentication.success';
export interface SecurityEvent { eventId: string; observedAt: string; sourceId: string; eventType: SecurityEventType; simulation: true; attributes?: Readonly<Record<string, string | number | boolean>>; }
export interface DetectionFinding { findingId: string; detectorId: 'auth-failure-burst'; ruleVersion: typeof DETECTION_RULE_SET_VERSION; severity: 'high'; title: string; summary: string; sourceId: string; firstObservedAt: string; lastObservedAt: string; evidenceEventIds: string[]; simulation: true; }
export interface DetectionResult { findings: DetectionFinding[]; evaluatedEventCount: number; ignoredEventCount: number; ruleSetVersion: typeof DETECTION_RULE_SET_VERSION; }
import { normalizeIsoTimestamp } from './time';

export const DETECTION_RULE_SET_VERSION = '1.0.0' as const;
const FAILURE_THRESHOLD = 5;
const WINDOW_MS = 10 * 60 * 1000;
const ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,79}$/;
const ISO_WITH_TIMEZONE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
function validateEvent(event: SecurityEvent): number {
  if (!event || typeof event !== 'object' || Array.isArray(event)) throw new Error('Each event must be an object.');
  if (typeof event.eventId !== 'string' || !ID_PATTERN.test(event.eventId)) throw new Error('eventId has an invalid format.');
  if (typeof event.sourceId !== 'string' || !ID_PATTERN.test(event.sourceId)) throw new Error('sourceId has an invalid format.');
  if (event.simulation !== true) throw new Error('This research-stage detector accepts synthetic events only.');
  if (event.eventType !== 'authentication.failure' && event.eventType !== 'authentication.success') throw new Error('Unsupported eventType.');
  if (typeof event.observedAt !== 'string' || !ISO_WITH_TIMEZONE.test(event.observedAt)) throw new Error('observedAt must be an ISO-8601 timestamp with an explicit timezone.');
  const timestamp = Date.parse(event.observedAt);
  if (!Number.isFinite(timestamp)) throw new Error('observedAt must be a valid ISO-8601 timestamp.');
  return timestamp;
}
/** Detect five or more failures from one synthetic source in a rolling ten-minute window. */
export function detectAuthenticationFailureBursts(events: readonly SecurityEvent[]): DetectionResult {
  if (!Array.isArray(events)) throw new Error('events must be an array.');
  if (events.length > 10_000) throw new Error('A maximum of 10,000 events may be evaluated at once.');
  const seenIds = new Set<string>();
  const failuresBySource = new Map<string, Array<{ event: SecurityEvent; time: number }>>();
  let ignoredEventCount = 0;
  for (const event of events) {
    const time = validateEvent(event);
    if (seenIds.has(event.eventId)) throw new Error('Duplicate eventId: ' + event.eventId);
    seenIds.add(event.eventId);
    if (event.eventType !== 'authentication.failure') { ignoredEventCount += 1; continue; }
    const group = failuresBySource.get(event.sourceId) ?? [];
    group.push({ event, time });
    failuresBySource.set(event.sourceId, group);
  }
  const findings: DetectionFinding[] = [];
  for (const [sourceId, group] of failuresBySource) {
    group.sort((a, b) => a.time - b.time || a.event.eventId.localeCompare(b.event.eventId));
    let left = 0;
    let bestWindow: typeof group = [];
    for (let right = 0; right < group.length; right += 1) {
      while (group[right].time - group[left].time > WINDOW_MS) left += 1;
      const candidate = group.slice(left, right + 1);
      if (candidate.length > bestWindow.length) bestWindow = candidate;
    }
    if (bestWindow.length >= FAILURE_THRESHOLD) {
      const evidenceEventIds = bestWindow.map(item => item.event.eventId).sort();
      findings.push({
        findingId: 'auth-failure-burst:' + sourceId + ':' + evidenceEventIds.join(','),
        detectorId: 'auth-failure-burst', ruleVersion: DETECTION_RULE_SET_VERSION, severity: 'high',
        title: 'Authentication failure burst',
        summary: bestWindow.length + ' failed authentication events from one source within ten minutes.',
        sourceId, firstObservedAt: bestWindow[0].event.observedAt,
        lastObservedAt: bestWindow[bestWindow.length - 1].event.observedAt,
        evidenceEventIds, simulation: true,
      });
    }
  }
  findings.sort((a, b) => a.findingId.localeCompare(b.findingId));
  return { findings, evaluatedEventCount: events.length, ignoredEventCount, ruleSetVersion: DETECTION_RULE_SET_VERSION };
}