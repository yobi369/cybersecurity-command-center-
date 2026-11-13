import { describe, expect, it } from 'vitest';
import { transitionCase, type CaseActor, type CaseRecord } from './caseManagement';

const analyst: CaseActor = { principalId: 'analyst-01', tenantId: 'tenant-01', role: 'analyst' };
const supervisor: CaseActor = { principalId: 'supervisor-01', tenantId: 'tenant-01', role: 'supervisor' };
const base = (): CaseRecord => ({
  caseId: 'case-001', tenantId: 'tenant-01', title: 'Synthetic authentication alert',
  status: 'new', version: 1, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
});
function command(actor: CaseActor, action: Parameters<typeof transitionCase>[1]['action'], expectedVersion = 1) {
  return { actor, action, expectedVersion, auditEventId: 'audit-001', occurredAt: '2026-01-01T00:01:00Z' };
}

describe('case management domain state machine', () => {
  it('triages a new case and increments optimistic version', () => {
    const result = transitionCase(base(), command(analyst, { type: 'triage' }));
    expect(result.caseRecord.status).toBe('triaged');
    expect(result.caseRecord.version).toBe(2);
    expect(result.auditEvent.fromStatus).toBe('new');
    expect(result.auditEvent.toStatus).toBe('triaged');
  });
  it('enforces valid start and escalation transitions', () => {
    expect(() => transitionCase(base(), command(analyst, { type: 'start' }))).toThrow('Only triaged');
    const triaged = { ...base(), status: 'triaged' as const };
    expect(transitionCase(triaged, command(analyst, { type: 'start' })).caseRecord.status).toBe('in_progress');
    expect(transitionCase(triaged, command(analyst, { type: 'escalate', reasonCode: 'severity_review' })).caseRecord.status).toBe('escalated');
  });
  it('supports request-information and resume transitions', () => {
    const active = { ...base(), status: 'in_progress' as const };
    const pending = transitionCase(active, command(analyst, { type: 'request_information', reasonCode: 'evidence_gap' }));
    expect(pending.caseRecord.status).toBe('pending_information');
    expect(transitionCase(pending.caseRecord, command(analyst, { type: 'resume' }, 2)).caseRecord.status).toBe('in_progress');
  });
  it('resolves active cases with a recorded reason code', () => {
    const active = { ...base(), status: 'in_progress' as const };
    const result = transitionCase(active, command(analyst, { type: 'resolve', reasonCode: 'contained' }));
    expect(result.caseRecord.status).toBe('resolved');
    expect(result.auditEvent.reasonCode).toBe('contained');
  });
  it('requires supervisor authority to close or reopen', () => {
    const resolved = { ...base(), status: 'resolved' as const };
    expect(() => transitionCase(resolved, command(analyst, { type: 'close', reasonCode: 'review_complete' }))).toThrow('supervisor authority');
    expect(transitionCase(resolved, command(supervisor, { type: 'close', reasonCode: 'review_complete' })).caseRecord.status).toBe('closed');
  });
  it('allows supervisors to reopen closed cases with a reason', () => {
    const closed = { ...base(), status: 'closed' as const };
    const result = transitionCase(closed, command(supervisor, { type: 'reopen', reasonCode: 'new_evidence' }));
    expect(result.caseRecord.status).toBe('in_progress');
    expect(result.auditEvent.reasonCode).toBe('new_evidence');
  });
  it('restricts assignment to supervisors and records the change', () => {
    expect(() => transitionCase(base(), command(analyst, { type: 'assign', assigneeId: 'analyst-02', reasonCode: 'initial_assignment' }))).toThrow('supervisor authority');
    const result = transitionCase(base(), command(supervisor, { type: 'assign', assigneeId: 'analyst-02', reasonCode: 'initial_assignment' }));
    expect(result.caseRecord.assignedTo).toBe('analyst-02');
    expect(result.auditEvent.toAssignee).toBe('analyst-02');
  });
  it('denies cross-tenant access and auditor mutations', () => {
    expect(() => transitionCase(base(), command({ ...analyst, tenantId: 'tenant-02' }, { type: 'triage' }))).toThrow('Cross-tenant');
    expect(() => transitionCase(base(), command({ ...analyst, role: 'auditor' }, { type: 'triage' }))).toThrow('read-only');
  });
  it('rejects stale versions and malformed audit metadata', () => {
    expect(() => transitionCase(base(), command(analyst, { type: 'triage' }, 0))).toThrow('version conflict');
    expect(() => transitionCase(base(), { ...command(analyst, { type: 'triage' }), occurredAt: 'yesterday' })).toThrow('ISO-8601');
  });
  it('rejects malformed runtime roles, identifiers and reason codes', () => {
    expect(() => transitionCase(base(), command({ ...analyst, role: 'owner' as CaseActor['role'] }, { type: 'triage' }))).toThrow('Invalid actor role');
    expect(() => transitionCase(base(), command({ ...analyst, principalId: undefined as unknown as string }, { type: 'triage' }))).toThrow('Invalid actor identity');
    expect(() => transitionCase({ ...base(), caseId: undefined as unknown as string }, command(analyst, { type: 'triage' }))).toThrow('Invalid case identity');
    expect(() => transitionCase({ ...base(), status: 'unknown' as CaseRecord['status'] }, command(analyst, { type: 'triage' }))).toThrow('Invalid case status');
    expect(() => transitionCase({ ...base(), status: 'in_progress' }, command(analyst, { type: 'resolve', reasonCode: 'made_up' as 'contained' }))).toThrow('Invalid reason code');
  });
  it('rejects malformed assignee and audit event identifiers', () => {
    expect(() => transitionCase(base(), command(supervisor, { type: 'assign', assigneeId: 'bad id', reasonCode: 'initial_assignment' }))).toThrow('Invalid assignee');
    expect(() => transitionCase(base(), { ...command(analyst, { type: 'triage' }), auditEventId: 'bad id' })).toThrow('Invalid audit event ID');
  });
  it('does not allow invalid state transitions or reassigning closed cases', () => {
    const closed = { ...base(), status: 'closed' as const };
    expect(() => transitionCase(closed, command(supervisor, { type: 'assign', assigneeId: 'analyst-02', reasonCode: 'reassignment' }))).toThrow('Closed cases');
    expect(() => transitionCase(base(), command(analyst, { type: 'resume' }))).toThrow('pending information');
  });
});
