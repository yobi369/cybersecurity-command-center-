# Platform Administrator Guide

**Status:** Target operator manual; no production administration console exists.

## Audience and authority
For designated platform administrators. This guide does not grant permissions. All actions must be performed using institution-issued named accounts and approved change processes.

## Responsibilities
Maintain platform configuration, user/role assignments, approved environment settings and access reviews. Security-source configuration and rule activation may belong to a separate security administrator role. Platform administration must not imply unrestricted access to case evidence.

## User lifecycle
1. Receive an approved access request and identity reference.
2. Verify manager, role, scope, expiry and separation-of-duties approval.
3. Provision through the institution identity provider where supported.
4. Assign least-privilege application role and resource scope.
5. Require MFA according to policy.
6. Record approver, actor, timestamp and reason.
7. Confirm access with the user through an approved channel.
8. Review access periodically and on role change/termination.
9. Revoke promptly when authorization expires or employment/assignment ends.

## Configuration change
Use a change request; document affected service, risk, planned window, validation and rollback. Never edit production configuration ad hoc. Never expose secret values in tickets, GitHub, screenshots or logs.

## Operational checks
Review service health, authentication anomalies, failed jobs, backup status, certificate expiry and open critical/high defects. Escalate through institution runbooks.

## Prohibited actions
Do not disable audit, bypass access checks, create shared accounts, use real production telemetry in development, or make undocumented emergency changes.

## Current product limitation
These are target procedures. User management, identity integration, RBAC, audit and admin console are not implemented.
