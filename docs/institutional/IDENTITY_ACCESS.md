# Identity, Authentication and Access Control

**ID:** IAM-001 | **Status:** Proposed model; production identity/authz is not implemented.

## Principles
Prefer the receiving institution's approved identity provider. Do not build a custom password system without a documented need and reviewed design. Apply MFA according to institutional policy, especially for privileged roles. Identity proofing and emergency access remain institution decisions.

## Proposed roles
| Role | Intended scope |
|---|---|
| Platform administrator | Platform config and user/role administration; no automatic access to all case content |
| Security administrator | Approved source configuration and rule activation |
| SOC supervisor | Queue oversight, assignment, escalation and approvals |
| Security analyst | Review alerts and investigate assigned/in-scope cases |
| Incident investigator | Access assigned incidents/evidence |
| Auditor | Read approved audit records; cannot modify |
| Read-only stakeholder | Approved dashboards/reports |
| Service identity | Narrow machine-to-machine scope; no interactive login |

## Authorization principles
Deny by default. Enforce permission on every API action and object, not only in the UI. Scope by institution, tenant, classification, assignment and purpose. Prevent insecure direct object references and cross-tenant leakage. Require step-up auth for high-impact actions where policy requires. Record role changes, grants, revocations, privileged access, exports and failed authorization. Use short-lived credentials, secure session lifecycle, periodic access reviews and separate service identities. Emergency access requires justification, expiry, notification and retrospective review. Shared analyst accounts are prohibited.

## Initial action matrix
| Action | Platform admin | Security admin | Supervisor | Analyst | Investigator | Auditor |
|---|---|---|---|---|---|---|
| Manage users/roles | Yes | No | No | No | No | No |
| Register source | No | Yes | No | No | No | No |
| Activate rule | No | Approval-gated | Approve | No | No | Read |
| View alert queue | Scoped | Scoped | Yes | Scoped | Assigned | Read scope |
| Assign case | No | No | Yes | No | No | No |
| Investigate | No by default | No by default | Yes | Assigned | Assigned | Read scope |
| Change disposition | No | No | Approve/close | Recommend | Recommend | No |
| Export evidence | No by default | No by default | Policy-gated | Policy-gated | Policy-gated | Audit scope |

All scopes require institution approval and server-side enforcement.

## Required negative tests
Unauthenticated, expired/revoked session, insufficient role, out-of-scope resource, cross-tenant ID substitution, privilege escalation, bulk export, role-change audit, emergency access expiry and service identity overreach. Assert denial and no side effects/data leakage.
