import { normalizeIsoTimestamp } from './time';

export type CaseStatus = 'new' | 'triaged' | 'in_progress' | 'escalated' | 'pending_information' | 'resolved' | 'closed';
export type CaseRole = 'analyst' | 'supervisor' | 'auditor';

export interface CaseRecord {
  caseId: string;
  tenantId: string;
  title: string;
  status: CaseStatus;
  assignedTo?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseActor {
  principalId: string;
  tenantId: string;
  role: CaseRole;
}

export type CaseAction =
  | { type: 'triage' }
  | { type: 'start' }
  | { type: 'escalate'; reasonCode: 'severity_review' | 'scope_expansion' | 'policy_required' | 'other' }
  | { type: 'request_information'; reasonCode: 'evidence_gap' | 'external_dependency' | 'other' }
  | { type: 'resume' }
  | { type: 'resolve'; reasonCode: 'false_positive' | 'contained' | 'no_further_action' | 'other' }
  | { type: 'close'; reasonCode: 'review_complete' | 'duplicate' | 'other' }
  | { type: 'reopen'; reasonCode: 'new_evidence' | 'review_reversal' | 'other' }
  | { type: 'assign'; assigneeId: string; reasonCode: 'initial_assignment' | 'reassignment' };

export interface CaseCommand {
  action: CaseAction;
  actor: CaseActor;
  expectedVersion: number;
  auditEventId: string;
  occurredAt: string;
}

export interface CaseAuditEvent {
  auditEventId: string;
  tenantId: string;
  caseId: string;
  actorId: string;
  action: CaseAction['type'];
  fromStatus: CaseStatus;
  toStatus: CaseStatus;
  fromAssignee?: string;
  toAssignee?: string;
  reasonCode?: string;
  occurredAt: string;
}

export interface CaseTransitionResult {
  caseRecord: CaseRecord;
  auditEvent: CaseAuditEvent;
}

const ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,79}$/;

function isValidId(value: unknown): value is string {
  return typeof value === 'string' && ID_PATTERN.test(value);
}

const ALLOWED_REASON_CODES: Record<string, readonly string[]> = {
  escalate: ['severity_review', 'scope_expansion', 'policy_required', 'other'],
  request_information: ['evidence_gap', 'external_dependency', 'other'],
  resolve: ['false_positive', 'contained', 'no_further_action', 'other'],
  close: ['review_complete', 'duplicate', 'other'],
  reopen: ['new_evidence', 'review_reversal', 'other'],
  assign: ['initial_assignment', 'reassignment'],
};

function validTime(value: string): boolean {
  return normalizeIsoTimestamp(value) !== null;
}

/**
 * Pure case-state transition function.
 * The caller MUST derive CaseActor from a verified server-side identity/session.
 * This function is not an authentication or persistence boundary.
 */
export function transitionCase(current: CaseRecord, command: CaseCommand): CaseTransitionResult {
  if (!current || typeof current !== 'object') throw new Error('A case record is required.');
  if (!command || typeof command !== 'object') throw new Error('A case command is required.');
  const { actor, action } = command;
  if (!actor || !isValidId(actor.principalId) || !isValidId(actor.tenantId)) throw new Error('Invalid actor identity.');
  if (actor.role !== 'analyst' && actor.role !== 'supervisor' && actor.role !== 'auditor') throw new Error('Invalid actor role.');
  if (!isValidId(current.caseId) || !isValidId(current.tenantId)) throw new Error('Invalid case identity.');
  if (!Number.isSafeInteger(current.version) || current.version < 1) throw new Error('Invalid case version.');
  if (!['new', 'triaged', 'in_progress', 'escalated', 'pending_information', 'resolved', 'closed'].includes(current.status)) throw new Error('Invalid case status.');
  if (typeof current.title !== 'string' || current.title.trim().length < 5 || current.title.length > 160) throw new Error('Invalid case title.');
  if (current.assignedTo !== undefined && !isValidId(current.assignedTo)) throw new Error('Invalid case assignee.');
  if (!validTime(current.createdAt) || !validTime(current.updatedAt)) throw new Error('Case timestamps must be valid ISO-8601 timestamps with timezone.');
  if (actor.tenantId !== current.tenantId) throw new Error('Cross-tenant case access is denied.');
  if (actor.role === 'auditor') throw new Error('Auditor role is read-only.');
  if (!Number.isSafeInteger(command.expectedVersion) || command.expectedVersion !== current.version) throw new Error('Case version conflict; reload before retrying.');
  if (!isValidId(command.auditEventId)) throw new Error('Invalid audit event ID.');
  if (!validTime(command.occurredAt)) throw new Error('occurredAt must be a valid ISO-8601 timestamp with timezone.');
  if (!action || typeof action !== 'object') throw new Error('A valid case action is required.');
  if ('reasonCode' in action && (!ALLOWED_REASON_CODES[action.type] || !ALLOWED_REASON_CODES[action.type].includes(action.reasonCode))) throw new Error('Invalid reason code for case action.');

  const supervisorOnly = action.type === 'close' || action.type === 'reopen' || action.type === 'assign';
  if (supervisorOnly && actor.role !== 'supervisor') throw new Error('This action requires supervisor authority.');

  let nextStatus = current.status;
  let nextAssignee = current.assignedTo;
  let reasonCode: string | undefined;

  switch (action.type) {
    case 'triage':
      if (current.status !== 'new') throw new Error('Only new cases can be triaged.');
      nextStatus = 'triaged';
      break;
    case 'start':
      if (current.status !== 'triaged' && current.status !== 'escalated') throw new Error('Only triaged or escalated cases can be started.');
      nextStatus = 'in_progress';
      break;
    case 'escalate':
      if (current.status !== 'triaged' && current.status !== 'in_progress' && current.status !== 'pending_information') throw new Error('This case cannot be escalated from its current state.');
      nextStatus = 'escalated';
      reasonCode = action.reasonCode;
      break;
    case 'request_information':
      if (current.status !== 'in_progress' && current.status !== 'escalated') throw new Error('Information can only be requested from an active case.');
      nextStatus = 'pending_information';
      reasonCode = action.reasonCode;
      break;
    case 'resume':
      if (current.status !== 'pending_information') throw new Error('Only cases pending information can be resumed.');
      nextStatus = 'in_progress';
      break;
    case 'resolve':
      if (current.status !== 'in_progress' && current.status !== 'escalated' && current.status !== 'pending_information') throw new Error('Only active cases can be resolved.');
      nextStatus = 'resolved';
      reasonCode = action.reasonCode;
      break;
    case 'close':
      if (current.status !== 'resolved') throw new Error('Only resolved cases can be closed.');
      nextStatus = 'closed';
      reasonCode = action.reasonCode;
      break;
    case 'reopen':
      if (current.status !== 'resolved' && current.status !== 'closed') throw new Error('Only resolved or closed cases can be reopened.');
      nextStatus = 'in_progress';
      reasonCode = action.reasonCode;
      break;
    case 'assign':
      if (current.status === 'closed') throw new Error('Closed cases cannot be reassigned.');
      if (!isValidId(action.assigneeId)) throw new Error('Invalid assignee ID.');
      nextAssignee = action.assigneeId;
      reasonCode = action.reasonCode;
      break;
    default: {
      const exhaustive: never = action;
      throw new Error('Unsupported action: ' + String(exhaustive));
    }
  }

  const caseRecord: CaseRecord = {
    ...current,
    status: nextStatus,
    ...(nextAssignee ? { assignedTo: nextAssignee } : {}),
    version: current.version + 1,
    updatedAt: new Date(Date.parse(command.occurredAt)).toISOString(),
  };
  const auditEvent: CaseAuditEvent = {
    auditEventId: command.auditEventId,
    tenantId: current.tenantId,
    caseId: current.caseId,
    actorId: actor.principalId,
    action: action.type,
    fromStatus: current.status,
    toStatus: nextStatus,
    ...(current.assignedTo ? { fromAssignee: current.assignedTo } : {}),
    ...(nextAssignee ? { toAssignee: nextAssignee } : {}),
    ...(reasonCode ? { reasonCode } : {}),
    occurredAt: caseRecord.updatedAt,
  };
  return { caseRecord, auditEvent };
}
