# Auditor and Compliance Reviewer Guide

**Status:** Target manual; audit service and reporting interface are not implemented.

## Purpose
Provide an independent review process for system configuration, access, cases, releases, evidence exports and control operation.

## Review procedure
1. Obtain written audit scope and authority.
2. Use a named read-only account with minimum required access.
3. Confirm system version, deployment environment and date range.
4. Review access grants, role changes, privileged activity and access recertification.
5. Sample case creation, assignment, escalation, disposition and closure records.
6. Verify evidence references, integrity metadata and export history.
7. Review rule versions, approvals, deployment history and test evidence.
8. Review security findings, exceptions, risk acceptances and expiry dates.
9. Review backup/restore exercise and incident-response exercise evidence.
10. Record findings, evidence IDs, limitations and recommendations.

## Independence and evidence
Auditors must not modify the records under review. Audit logs must be protected from administrators who could otherwise alter both application state and audit evidence. Exported records should carry provenance and integrity metadata.

## Limitations
This guide describes intended audit capabilities. No tamper-evident audit service, auditor role, access review workflow or compliance report generator currently exists. Do not describe the prototype as compliant or certified.
