# API Contract Baseline

**ID:** API-001 | **Status:** Proposed contract; no backend API currently exists.

## Machine-readable specification

The draft OpenAPI 3.1 contract is maintained at [openapi/openapi.yaml](../../openapi/openapi.yaml). CI validates the description with Redocly CLI. The current lint passes with two documented warnings: no license is declared because licensing is unresolved, and the liveness-only endpoint has no applicable 4xx response. This validates the specification document, not a running API. No production endpoint is deployed.

## Principles
Version APIs (initial proposal /api/v1); publish OpenAPI before stability; validate schemas server-side; enforce auth, authorization, size and rate limits; use correlation IDs and safe errors; never expose secrets, stack traces or unauthorized object existence; define pagination, idempotency and concurrency.

## Proposed resource groups
| Resource | Operations | Permission boundary |
|---|---|---|
| Identity/session | Current user, sign out | Authenticated identity |
| Sources | Register, update, disable | Security administrator |
| Events | Ingest, search, retrieve | Source identity / scoped analyst |
| Findings | List, retrieve, acknowledge | Scoped analyst |
| Cases | Create, assign, update, close | Analyst/supervisor |
| Evidence | Retrieve, export | Case/evidence scope |
| Rules | Propose, validate, activate | Detection engineering/admin |
| Audit | Query, export | Auditor/approved admin |
| Health | Liveness, readiness, metrics | Operations; sanitized |

## Proposed event ingestion
POST /api/v1/events. Require authenticated source, idempotency key, versioned schema, bounded JSON, source identity mapping and timestamp/type validation. A source must not establish trust solely by setting a payload flag. Success returns 202 with receipt ID, correlation ID and processing status. Retries return prior receipt or documented duplicate outcome.

## Error semantics
Use a stable code, safe message, correlation ID and optional non-sensitive field errors. Proposed status: 400 malformed; 401 unauthenticated; 403 unauthorized; 404 unavailable/not visible; 409 conflict; 413 too large; 422 schema invalid; 429 rate-limited; 500 unexpected; 503 dependency unavailable.

## Contract acceptance
Review OpenAPI 3 specification; define auth scopes and errors; canonical event schema/versioning; pagination/query limits; idempotency/retry; generate contract tests; define compatibility/deprecation policy. No endpoint is represented as available until implemented, deployed and tested.
