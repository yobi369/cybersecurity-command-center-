import { normalizeIsoTimestamp } from './time';
/**
 * Strict parser for the current research fixture event contract.
 * This is not an ingestion endpoint or production source-authentication mechanism.
 */
export const CANONICAL_EVENT_SCHEMA_VERSION = '1.0.0' as const;
export type CanonicalEventType = 'authentication.failure' | 'authentication.success';
export type CanonicalAttribute = string | number | boolean;
export interface CanonicalSecurityEvent {
  eventId: string;
  observedAt: string;
  receivedAt: string;
  sourceId: string;
  sourceType: 'synthetic';
  schemaVersion: typeof CANONICAL_EVENT_SCHEMA_VERSION;
  eventType: CanonicalEventType;
  simulation: true;
  attributes: Readonly<Record<string, CanonicalAttribute>>;
}
const ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,79}$/;
const ATTRIBUTE_KEY_PATTERN = /^[a-zA-Z][a-zA-Z0-9_.-]{0,63}$/;
const ALLOWED_FIELDS = new Set(['eventId','observedAt','receivedAt','sourceId','sourceType','schemaVersion','eventType','simulation','attributes']);
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function validateTimestamp(value: unknown, field: string): string {
  const normalized = normalizeIsoTimestamp(value);
  if (!normalized) throw new Error(field + ' must be a valid ISO-8601 timestamp with an explicit timezone.');
  return normalized;
}
/** Validate and normalize an untrusted JSON-like fixture into canonical event v1.0.0. */
export function parseCanonicalEvent(input: unknown): CanonicalSecurityEvent {
  if (!isRecord(input)) throw new Error('Event must be a JSON object.');
  for (const key of Object.keys(input)) {
    if (!ALLOWED_FIELDS.has(key)) throw new Error('Unsupported event field: ' + key);
  }
  if (typeof input.eventId !== 'string' || !ID_PATTERN.test(input.eventId)) throw new Error('eventId has an invalid format.');
  if (typeof input.sourceId !== 'string' || !ID_PATTERN.test(input.sourceId)) throw new Error('sourceId has an invalid format.');
  if (input.sourceType !== 'synthetic') throw new Error('Only synthetic sourceType is accepted by this research parser.');
  if (input.schemaVersion !== CANONICAL_EVENT_SCHEMA_VERSION) throw new Error('Unsupported schemaVersion.');
  if (input.eventType !== 'authentication.failure' && input.eventType !== 'authentication.success') throw new Error('Unsupported eventType.');
  if (input.simulation !== true) throw new Error('Only simulation=true events are accepted by this research parser.');
  const observedAt = validateTimestamp(input.observedAt, 'observedAt');
  const receivedAt = validateTimestamp(input.receivedAt, 'receivedAt');
  if (!isRecord(input.attributes)) throw new Error('attributes must be an object.');
  const entries = Object.entries(input.attributes);
  if (entries.length > 32) throw new Error('A maximum of 32 attributes is allowed.');
  const attributes: Record<string, CanonicalAttribute> = {};
  for (const [key, value] of entries.sort(([a], [b]) => a.localeCompare(b))) {
    if (!ATTRIBUTE_KEY_PATTERN.test(key)) throw new Error('Invalid attribute key: ' + key);
    if (typeof value === 'string') {
      if (value.length > 512) throw new Error('Attribute values must not exceed 512 characters.');
      attributes[key] = value;
    } else if (typeof value === 'number' && Number.isFinite(value)) {
      attributes[key] = value;
    } else if (typeof value === 'boolean') {
      attributes[key] = value;
    } else {
      throw new Error('Attributes must contain only strings, finite numbers, or booleans.');
    }
  }
  return {
    eventId: input.eventId, observedAt, receivedAt, sourceId: input.sourceId,
    sourceType: 'synthetic', schemaVersion: CANONICAL_EVENT_SCHEMA_VERSION,
    eventType: input.eventType, simulation: true, attributes,
  };
}