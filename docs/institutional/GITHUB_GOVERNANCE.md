# GitHub Repository Governance

**ID:** DEV-001 | **Status:** Target repository policy; settings must be inspected and enforced.

## Repository layout
- .github/workflows: CI, security and release automation.
- .github/ISSUE_TEMPLATE: structured issue intake.
- .github/PULL_REQUEST_TEMPLATE.md: change evidence.
- docs/: architecture, research and operations documents.
- docs/institutional/: controlled institutional evidence pack.
- services/: domain services and deterministic rules.
- components/: user-interface components.
- tests/: cross-service/integration tests when introduced.

## Issue types
Use issues for defect, security finding (private reporting channel only), feature, technical debt, documentation gap, risk and change request. Each issue needs impact, reproduction/acceptance criteria, owner, priority and linked requirement.

Never publish exploitable vulnerability details, credentials, private incident data or personal data in public issues. Security reports must follow SECURITY.md's private reporting route.

## Pull request checklist
- [ ] Linked issue/change request and requirement IDs.
- [ ] Scope and behavior explained.
- [ ] Threat/privacy impact considered.
- [ ] Tests added/updated and executed.
- [ ] Test evidence includes commit and environment.
- [ ] Documentation and traceability updated.
- [ ] Migrations and rollback described.
- [ ] No secrets or sensitive data added.
- [ ] Dependency/license impact reviewed.
- [ ] CI passes and qualified reviewer approves.

## Branching and release
Use short-lived feature branches. Protect main. Do not push unreviewed changes directly to production. Release tags identify immutable source commit. Publish release notes, artifact checksums, SBOM and test evidence. Keep PR history and decisions.

## Current repository automation

- `.github/workflows/quality.yml`: frozen npm install, dependency audit, CycloneDX SBOM, unit tests/coverage, strict typecheck and production build.
- `.github/workflows/codeql.yml`: JavaScript/TypeScript CodeQL analysis.
- `.github/workflows/secrets.yml`: full-history Gitleaks secret scanning on pushes, PRs and schedule.
- `.github/workflows/lockfile.yml`: controlled package-lock generation on research branches when package.json changes; write permission is limited to that workflow.
- `.github/dependabot.yml`: weekly npm and GitHub Actions update proposals.
- `.github/CODEOWNERS`: default code owner and sensitive-path ownership.

CODEOWNERS does not enforce review by itself. Branch protection and rulesets must be enabled and tested separately. An attempt to inspect branch protection through the connected GitHub integration was denied for insufficient API permission; current protection settings therefore remain unverified. The repository owner must inspect and enforce them in GitHub settings.

## Automation security
Grant workflows minimum permissions. Pin third-party actions to full immutable commit SHAs after verifying source and version. Avoid pull-request secrets exposure. Use protected environments for deployment. Review workflow changes as security-sensitive code.

## Current verification gap
Repository settings (branch protection, CODEOWNERS enforcement, secret scanning, dependency review, rulesets, signed commits/tags) have not been verified from this documentation exercise. Do not claim they are enabled until inspected in GitHub settings.
