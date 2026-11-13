# SOC Analyst Guide

**Status:** Target user manual; analyst workspace and case workflow are not implemented.

## Purpose
Describe the intended safe analyst workflow for alerts, evidence and cases. This is not a current operational SOC interface.

## Triage workflow
1. Sign in with a named institutional account and MFA as required.
2. Open the assigned alert queue and verify the scope displayed.
3. Review detection rule/version, timestamps, source metadata and evidence references.
4. Open the underlying event evidence through authorized links.
5. Distinguish observed evidence, deterministic rule rationale, analyst interpretation and optional AI explanation.
6. Check source reliability, timestamp context, duplicates and known data-quality limitations.
7. Record a concise assessment, supporting evidence IDs, uncertainty and recommended next checks.
8. Create or link a case where policy requires.
9. Assign/escalate according to severity and operating procedure.
10. Record disposition only within assigned authority.

## Evidence handling
Do not alter original evidence. Add annotations as separate records. Do not paste secrets or unnecessary personal data into notes. Exports require explicit permission and must be logged. Preserve chain of custody for records that may be used in formal proceedings.

## AI explanation
Use only if enabled by institutional policy. Treat output as an aid, not evidence or a verdict. Verify every cited event ID. Report unsupported claims. Never allow an AI recommendation to substitute for required approval or trigger response action.

## Case states (proposed)
New → Assigned → In Progress → Escalated / Pending Information → Resolved → Closed. Reopen requires reason and audit record. The institution must approve actual states and transition permissions.

## Current product limitation
There is no live event feed, analyst login, case management, evidence store or AI explanation workflow. All existing terminal outputs are synthetic demonstration data.
