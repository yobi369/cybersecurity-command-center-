import { describe, expect, it } from 'vitest';
import { detectAuthenticationFailureBursts, type SecurityEvent } from './eventEngine';
function event(eventId: string, minute: number, sourceId = 'lab-source-01', eventType: SecurityEvent['eventType'] = 'authentication.failure'): SecurityEvent {
  return { eventId, observedAt: new Date(Date.UTC(2026, 0, 1, 0, minute)).toISOString(), sourceId, eventType, simulation: true };
}
describe('deterministic authentication failure detector', () => {
  it('creates a finding at threshold and preserves evidence IDs', () => {
    const result = detectAuthenticationFailureBursts([0,1,2,3,4].map((minute, i) => event('evt-' + i, minute)));
    expect(result.findings).toHaveLength(1); expect(result.findings[0].severity).toBe('high');
    expect(result.findings[0].evidenceEventIds).toEqual(['evt-0','evt-1','evt-2','evt-3','evt-4']);
  });
  it('does not alert below threshold', () => expect(detectAuthenticationFailureBursts([0,1,2,3].map((m,i)=>event('evt-'+i,m))).findings).toHaveLength(0));
  it('does not combine failures from different sources', () => {
    const events=[event('a1',0),event('a2',1),event('a3',2),event('b1',0,'lab-source-02'),event('b2',1,'lab-source-02')];
    expect(detectAuthenticationFailureBursts(events).findings).toHaveLength(0);
  });
  it('enforces the rolling ten-minute window', () => expect(detectAuthenticationFailureBursts([0,1,2,3,12].map((m,i)=>event('evt-'+i,m))).findings).toHaveLength(0));
  it('ignores successful authentications and counts them', () => {
    const events=[event('ok',0,'lab-source-01','authentication.success'),...[1,2,3,4,5].map((m,i)=>event('fail-'+i,m))];
    const result=detectAuthenticationFailureBursts(events); expect(result.ignoredEventCount).toBe(1); expect(result.findings).toHaveLength(1);
  });
  it('rejects duplicate IDs and malformed timestamps', () => {
    expect(()=>detectAuthenticationFailureBursts([event('same',0),event('same',1)])).toThrow('Duplicate eventId');
    expect(()=>detectAuthenticationFailureBursts([{...event('bad-time',0),observedAt:'yesterday'}])).toThrow('ISO-8601');
  });
  it('rejects non-synthetic events', () => expect(()=>detectAuthenticationFailureBursts([{...event('real-event',0),simulation:false as unknown as true}])).toThrow('synthetic events only'));
  it('emits one consolidated finding for an extended burst', () => {
    const result=detectAuthenticationFailureBursts([0,1,2,3,4,5].map((m,i)=>event('long-'+i,m)));
    expect(result.findings).toHaveLength(1); expect(result.findings[0].evidenceEventIds).toHaveLength(6);
  });
  it('rejects missing identifiers instead of coercing undefined to text', () => {
    expect(()=>detectAuthenticationFailureBursts([{...event('x',0),eventId:undefined} as unknown as SecurityEvent])).toThrow('eventId');
    expect(()=>detectAuthenticationFailureBursts([{...event('x',0),sourceId:undefined} as unknown as SecurityEvent])).toThrow('sourceId');
  });
  it('requires explicit timezone information', () => {
    expect(()=>detectAuthenticationFailureBursts([{...event('local-time',0),observedAt:'2026-01-01T00:00:00'}])).toThrow('explicit timezone');
  });
  it('rejects batches above the documented limit', () => {
    const batch=Array.from({length:10001},(_,i)=>event('evt-'+i,0));
    expect(()=>detectAuthenticationFailureBursts(batch)).toThrow('10,000');
  });
});