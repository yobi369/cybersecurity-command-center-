import { describe, expect, it } from 'vitest';
import { normalizeIsoTimestamp } from './time';

describe('strict ISO-8601 timestamp normalization', () => {
  it('normalizes UTC timestamps', () => {
    expect(normalizeIsoTimestamp('2026-01-01T00:00:00Z')).toBe('2026-01-01T00:00:00.000Z');
  });

  it('normalizes explicit positive and negative offsets', () => {
    expect(normalizeIsoTimestamp('2024-02-29T23:59:59.123+03:00')).toBe('2024-02-29T20:59:59.123Z');
    expect(normalizeIsoTimestamp('2024-02-29T23:59:59-05:00')).toBe('2024-03-01T04:59:59.000Z');
  });

  it('accepts valid leap days and rejects invalid leap days', () => {
    expect(normalizeIsoTimestamp('2024-02-29T12:00:00Z')).not.toBeNull();
    expect(normalizeIsoTimestamp('2000-02-29T12:00:00Z')).not.toBeNull();
    expect(normalizeIsoTimestamp('1900-02-29T12:00:00Z')).toBeNull();
    expect(normalizeIsoTimestamp('2025-02-29T12:00:00Z')).toBeNull();
  });

  it('rejects impossible month lengths and invalid month values', () => {
    expect(normalizeIsoTimestamp('2026-04-31T00:00:00Z')).toBeNull();
    expect(normalizeIsoTimestamp('2026-13-01T00:00:00Z')).toBeNull();
    expect(normalizeIsoTimestamp('2026-00-01T00:00:00Z')).toBeNull();
  });

  it('rejects invalid clock components and leap seconds', () => {
    expect(normalizeIsoTimestamp('2026-01-01T24:00:00Z')).toBeNull();
    expect(normalizeIsoTimestamp('2026-01-01T00:60:00Z')).toBeNull();
    expect(normalizeIsoTimestamp('2026-01-01T00:00:60Z')).toBeNull();
  });

  it('requires an explicit timezone and bounded offset', () => {
    expect(normalizeIsoTimestamp('2026-01-01T00:00:00')).toBeNull();
    expect(normalizeIsoTimestamp('2026-01-01T00:00:00+24:00')).toBeNull();
    expect(normalizeIsoTimestamp('2026-01-01T00:00:00+02:60')).toBeNull();
  });

  it('rejects unsupported precision and non-string values', () => {
    expect(normalizeIsoTimestamp('2026-01-01T00:00:00.1234Z')).toBeNull();
    expect(normalizeIsoTimestamp(null)).toBeNull();
    expect(normalizeIsoTimestamp(123)).toBeNull();
  });
});
