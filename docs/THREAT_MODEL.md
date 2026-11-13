# Threat Model

**Status:** Initial design threat model; update as implementation and deployment evolve.

## Assets

- Provider credentials and application secrets.
- User identities, sessions, and authorization decisions.
- Security event records and raw evidence.
- Detection rules and rule versions.
- Findings, cases, analyst notes, and dispositions.
- Audit records and evaluation datasets.
- Integrity and availability of the research results.

## Trust boundaries

1. Browser to application API.
2. Application API to database/event store.
3. Ingestion adapter to normalization pipeline.
4. Detection engine to evidence store.
5. Explanation service to external AI provider.
6. Analyst actions to case/audit services.
7. CI/deployment pipeline to runtime environment.

## Threat scenarios and controls

| Threat | Potential impact | Required mitigations |
|---|---|---|
| API key shipped to browser | Credential theft and unauthorized provider use | Server-side secrets; secret scanning; rotate exposed credentials |
| Prompt injection in event fields | Model follows hostile instructions embedded in telemetry | Treat all event text as untrusted data; isolate instructions; structured outputs; no tool execution |
| Hallucinated explanation | False analyst belief or incorrect incident conclusion | Evidence IDs, claim validation, explicit uncertainty, human review |
| Forged or replayed telemetry | False alerts and misleading evaluation | Source authentication, timestamps, deduplication, provenance, replay tests |
| Malformed/oversized events | Crashes, resource exhaustion, parser abuse | Schema validation, limits, timeouts, fuzz tests |
| Broken access control | Unauthorized event/case access or mutation | Server-side authorization on every operation; least privilege; negative tests |
| Cross-tenant data leakage | Confidentiality breach | Tenant scoping in data access and tests if multi-tenancy is introduced |
| Audit record modification | Loss of accountability | Append-only design, restricted write paths, integrity checks |
| Dependency compromise | Supply-chain compromise | Lockfile, pinned CI actions, dependency review, minimal dependencies |
| Denial of service | Service unavailability and provider cost | Rate limits, bounded work, quotas, circuit breakers |
| Sensitive data leakage to model provider | Privacy or contractual breach | Data minimization, redaction, provider review, opt-in controls |
| Unsafe command execution | Unauthorized system impact | No arbitrary shell execution; simulation-only commands; allowlisted adapters |

## Historical finding and current status

The baseline audit identified a browser-side Gemini SDK integration expecting `process.env.API_KEY`, which was not an acceptable production secret boundary. The active research branch removed the browser-side provider integration. This remediation must still be verified against the final production build and repository history/secrets. Any future AI provider call must be server-side, explicitly enabled by institutional policy, protected by managed secrets, redaction, quotas, timeouts and evidence validation. No provider feature is currently part of a production service.

## Current known risks

The application has no backend authentication/authorization boundary, persistent evidence store, audit service, or production ingestion path. The synthetic-only parser and detector are not source-authentication mechanisms. These are critical gaps for any operational deployment.

## Safety policy

The prototype must not execute user-supplied shell commands, exploit code, credential attacks, or arbitrary network probes. Any future real telemetry connector must be explicitly configured for systems the operator is authorized to monitor. Destructive or consequential response actions remain outside the initial research scope.

## Residual risks

A written threat model does not establish that controls are implemented or effective. Each mitigation must map to code, configuration, tests, and operational evidence. Reassess this document after major architectural changes and before external demonstrations or deployment.
