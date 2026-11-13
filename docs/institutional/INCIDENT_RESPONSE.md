# Incident Response for the Platform Itself

**ID:** IR-001 | **Status:** Proposed; institutional contacts and escalation paths are missing.

This procedure concerns incidents affecting CCC itself (compromise, data exposure, outage, malicious access, evidence tampering or supply-chain compromise). It is separate from the product's future capability to help analysts investigate incidents in monitored environments.

## Severity
| Level | Description | Initial action |
|---|---|---|
| Critical | Privileged compromise, major sensitive-data exposure, evidence integrity compromise or widespread service compromise | Activate incident command, safely isolate affected service, notify authority immediately |
| High | Significant suspected compromise, major control failure or material disruption | Escalate to security and operations leads; preserve evidence |
| Medium | Limited suspicious activity or contained security defect | Assign owner, investigate and track remediation |
| Low | Minor issue with no current compromise evidence | Record, assess and schedule remediation |

Institutional definitions and notification deadlines override this draft.

## Response phases
1. Preparation: maintain contacts, runbooks, evidence procedure and exercise records.
2. Detection/reporting: record time, reporter, service, indicators and initial confidence.
3. Triage: establish scope, severity, containment safety and decision authority.
4. Containment: use approved reversible measures; preserve logs/evidence.
5. Evidence preservation: capture logs, hashes, state and access history.
6. Eradication: remove root cause after scope and approvals.
7. Recovery: restore trusted systems, rotate credentials, validate controls, monitor.
8. Notification: follow institution-approved legal, regulatory, contractual and stakeholder procedures.
9. Lessons learned: record timeline, root cause, impact, decisions, gaps and actions.

## Evidence record
Incident ID, evidence ID, collector, authority, date/time/timezone, source, collection method, hash, storage, access log, transfer history and transformations. Preserve originals separately from working copies.

## Communications and exercises
Only designated spokespeople communicate externally. Do not disclose sensitive incident details through public GitHub issues or repositories. Exercise account compromise, data exposure, evidence tampering, dependency compromise and database outage scenarios. Record participants, decisions, timing and corrective actions.

## Contacts
No institution contacts are assigned. Populate security operations, system owner, privacy/legal, operations, executive escalation, hosting provider and external response contacts before production.
