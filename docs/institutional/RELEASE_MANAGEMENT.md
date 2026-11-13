# Release Management and Change Record

**ID:** REL-001 | **Status:** Proposed process.

## Versioning
Use semantic versioning after the product has a stable public API. Before that, label releases as pre-release candidates and state compatibility limitations. A Git tag must identify the exact commit and must not be moved after publication.

## Release stages
1. Development: feature branch and local tests.
2. CI: frozen dependency install, static checks, tests and build.
3. Security review: dependency, secret, SAST and targeted security checks.
4. Staging: deploy exact candidate and run smoke/integration/UAT.
5. Approval: release owner and required security/operations authorities sign off.
6. Production: deploy approved artifact with recorded change.
7. Verification: health, critical workflows, telemetry and rollback readiness.
8. Closure: publish release notes, checksums, SBOM, test report and known limitations.

## Required release record
Release ID/tag; source commit SHA; dependency lock hash; build artifact checksum; SBOM reference; environment; configuration version (no secret values); migration version; tests and results; security findings; approvals; deployment start/end; operator; smoke results; rollback version; incident/change references.

## Rollback
Define rollback triggers before deployment. Preserve evidence and audit trail. Roll back application and compatible configuration without silently reverting or corrupting persistent data. Database rollback requires an explicit migration strategy; prefer forward-fix when rollback risks data integrity. Verify service and data after rollback.

## Release blockers
Unresolved critical defects; mandatory tests not run; no reproducible build; missing required approvals; unreviewed schema migration; known secret exposure; untriaged high-risk security findings; missing rollback plan; or contradiction between documentation and artifact.
