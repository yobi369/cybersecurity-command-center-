# Security Scanning and Supply-Chain Controls

**Status:** CI automation implemented; scan results and repository-level security settings require ongoing review.

## Automated controls

| Control | Implementation | Scope | Limitation |
|---|---|---|---|
| Dependency reproducibility | package-lock.json + npm ci | Exact npm dependency graph | Lockfile must be regenerated and reviewed on dependency change |
| Dependency advisory audit | npm audit --audit-level=high | Known npm advisories | Does not prove absence of vulnerabilities or cover non-npm assets |
| Dependency tree check | npm ls --depth=0 | Direct dependency consistency | Not a full license or provenance review |
| Software bill of materials | npm sbom, CycloneDX | Locked npm dependency inventory | Not a license approval or proof of artifact integrity |
| Static application security testing | CodeQL workflow, JavaScript/TypeScript | Supported source-code query packs | Findings require triage; not a penetration test |
| Action pinning | Full commit SHA references | GitHub Actions used by CI | SHA pinning does not replace action source/release review |
| Repository secret scanning | Gitleaks full-history scan | Git history and pull requests | Findings require credential rotation and history remediation; scanner is not a secret manager |
| Automated dependency updates | Dependabot weekly npm and Actions checks | Proposed update PRs | Updates require human review and CI |

## Workflow execution
- Quality gates: .github/workflows/quality.yml
- CodeQL: .github/workflows/codeql.yml
- Gitleaks secret scanning: .github/workflows/secrets.yml
- Lockfile generation: .github/workflows/lockfile.yml
- Dependency updates: .github/dependabot.yml

## Manual controls still required
- Review Gitleaks findings; rotate exposed credentials and evaluate history remediation. GitHub-native secret scanning and push protection still require separate settings verification.
- Review CodeQL alerts and dependency advisories on every release.
- Perform license and third-party notice review.
- Review and retain the CI-generated CycloneDX SBOM for each release candidate.
- Verify action provenance, repository rulesets, branch protection and signed release tags.
- Conduct independent security review, threat-led testing and penetration testing before operational use.

## Interpretation
A clean npm audit or CodeQL run is limited evidence for the exact scanned commit and tools. It is not certification, compliance attestation, proof of no vulnerabilities or authorization to deploy. Critical/high findings must be triaged, assigned, remediated or formally risk-accepted by an authorized institutional authority.

## Latest verified scan evidence

- Quality Gates run `43396720137` passed on commit `db2f74c30db04d8d5b1873f1955068ed5c83b96f`, including npm audit, OpenAPI lint, CycloneDX SBOM, 62 unit tests, strict TypeScript, build and coverage thresholds.
- CodeQL run `43396720311` was still in progress on the same commit at the time of this record update. Review and disposition of any resulting alerts remains required.
- Gitleaks full-history scan run `43396720227` completed successfully on the same commit.
- CodeQL success means analysis completed and results were submitted; it does not mean there are no alerts. Review and disposition of findings in GitHub Security remains required. Gitleaks success is scoped to the scanned history and version; continue scanning every change.
