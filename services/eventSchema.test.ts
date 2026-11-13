import { describe, expect, it } from 'vitest';
import { CANONICAL_EVENT_SCHEMA_VERSION, parseCanonicalEvent } from './eventSchema';
const valid = () => ({
  eventId: 'evt-001', observedAt: '2026-01-01T00:00:00Z', receivedAt: '2026-01-01T00:00:01+00:00',
  sourceId: 'lab-source-01', sourceType: 'synthetic', schemaVersion: CANONICAL_EVENT_SCHEMA_VERSION,
  eventType: 'authentication.failure', simulation: true, attributes: { username: 'demo', attempt: 4 },
});
describe('canonical event schema v1.0.0', () => {
  it('parses and normalizes a valid synthetic event', () => {
    const result = parseCanonicalEvent(valid());
    expect(result.observedAt).toBe('2026-01-01T00:00:00.000Z');
    expect(result.receivedAt).toBe('2026-01-01T00:00:01.000Z');
    expect(result.schemaVersion).toBe('1.0.0');
  });
  it('rejects null, arrays and non-object inputs', () => {
    expect(() => parseCanonicalEvent(null)).toThrow('JSON object');
    expect(() => parseCanonicalEvent([])).toThrow('JSON object');
  });
  it('rejects unknown fields to prevent ambiguous schema drift', () => {
    expect(() => parseCanonicalEvent({ ...valid(), admin: true })).toThrow('Unsupported event field');
  });
  it('rejects unsupported schema versions and event types', () => {
    expect(() => parseCanonicalEvent({ ...valid(), schemaVersion: '2.0.0' })).toThrow('schemaVersion');
    expect(() => parseCanonicalEvent({ ...valid(), eventType: 'shell.command' })).toThrow('eventType');
  });
  it('rejects non-synthetic sources and simulation flags', () => {
    expect(() => parseCanonicalEvent({ ...valid(), sourceType: 'endpoint' })).toThrow('synthetic sourceType');
    expect(() => parseCanonicalEvent({ ...valid(), simulation: false })).toThrow('simulation=true');
  });
  it('requires explicit timezone and valid timestamps', () => {
    expect(() => parseCanonicalEvent({ ...valid(), observedAt: '2026-01-01T00:00:00' })).toThrow('explicit timezone');
    expect(() => parseCanonicalEvent({ ...valid(), receivedAt: 'not-a-date' })).toThrow('explicit timezone');
    expect(() => parseCanonicalEvent({ ...valid(), observedAt: '2026-02-31T00:00:00Z' })).toThrow('valid ISO-8601');
  });
  it('rejects malformed identifiers', () => {
    expect(() => parseCanonicalEvent({ ...valid(), eventId: undefined })).toThrow('eventId');
    expect(() => parseCanonicalEvent({ ...valid(), sourceId: 'bad source' })).toThrow('sourceId');
  });
  it('rejects nested, null and non-finite attribute values', () => {
    expect(() => parseCanonicalEvent({ ...valid(), attributes: { nested: { x: 1 } } })).toThrow('only strings');
    expect(() => parseCanonicalEvent({ ...valid(), attributes: { absent: null } })).toThrow('only strings');
    expect(() => parseCanonicalEvent({ ...valid(), attributes: { number: Number.NaN } })).toThrow('only strings');
  });
  it('rejects too many attributes and oversized strings', () => {
    const many = Object.fromEntries(Array.from({ length: 33 }, (_, i) => ['field' + i, i]));
    expect(() => parseCanonicalEvent({ ...valid(), attributes: many })).toThrow('32 attributes');
    expect(() => parseCanonicalEvent({ ...valid(), attributes: { note: 'x'.repeat(513) } })).toThrow('512 characters');
  });
  it('normalizes attribute ordering deterministically', () => {
    const result = parseCanonicalEvent({ ...valid(), attributes: { zeta: true, alpha: 'a' } });
    expect(Object.keys(result.attributes)).toEqual(['alpha', 'zeta']);
  });
});