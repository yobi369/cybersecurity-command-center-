# Governance and Document Control

**ID:** GOV-001 | **Status:** Proposed; institutional approval required.

## Accountability
The project maintainer is not automatically the receiving institution's system owner, data controller, security authority or authorizing official.

| Role | Responsibility |
|---|---|
| Product owner | Scope, priorities and acceptance proposal |
| Technical lead | Architecture, implementation and engineering quality |
| Security lead | Threat model, controls, risk assessment |
| QA lead | Test strategy, evidence and quality reporting |
| Privacy lead | Data inventory, privacy review, retention |
| Operations lead | Deployment, monitoring, backup and support |
| Institutional system owner | Business ownership and service acceptance |
| Authorizing official | Formal authorization and institutional risk acceptance |
| Independent assessor | Independent review, not approval of own implementation |

High-risk approvals must be independent before production use.

## Document control
Each controlled document records ID, title, owner, status, version, created/reviewed dates, reviewer, approval state, change summary and references. Drafts must remain labelled as drafts.

## Change control
1. Create a change request and rationale.
2. Identify affected requirements, code, data, interfaces, controls, tests and documents.
3. Assess risk, compatibility, privacy, cost and rollback.
4. Obtain technical/security review.
5. Implement on a feature branch and open a pull request.
6. Run automated checks and human review.
7. Record evidence and update traceability.
8. Merge only under branch protection.
9. Deploy through a recorded release process.
10. Verify deployment and close the change request.

Emergency changes require retrospective review; emergency status is not an audit bypass.

## GitHub governance target
Protect production branches; require PRs, reviewers and passing CI; restrict force-push/deletion; use CODEOWNERS; enable secret scanning/push protection and dependency review; pin Actions to immutable SHAs; use least-privilege workflow permissions and protected environments; keep secrets and production data out of repository content/logs; preserve PR, issue, release and test evidence. These controls are targets until repository settings are verified.

## Institution-specific approval
The receiving organization must name system owner, security authority, privacy contact, operations owner and authorized acceptance signatories. Applicable Kenyan legal, public-sector, procurement and records requirements require institution-specific review.
