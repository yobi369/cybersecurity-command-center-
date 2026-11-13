# System Architecture

**Status:** Target architecture; components are not yet implemented unless explicitly marked as present in the baseline audit.

## Architectural principles

1. Evidence is the source of truth; generated language is not evidence.
2. Detection decisions must be deterministic, versioned, and testable.
3. Every finding must be traceable to source events and rule versions.
4. AI is optional, bounded, and unable to silently change detection outcomes.
5. Human approval is required for consequential case actions.
6. Synthetic data is visibly labelled and kept distinct from real telemetry.
7. Secure defaults, least privilege, and data minimization apply throughout.

## Logical components

| Component | Responsibility | Trust boundary |
|---|---|---|
| Web console | Dashboards, event review, case workflow | Untrusted browser |
| API gateway | Authentication, authorization, validation, rate limits | Public application boundary |
| Ingestion adapter | Accept approved event formats and validate provenance | External data boundary |
| Normalization layer | Convert inputs into canonical event schema | Parsing boundary |
| Event store | Preserve raw/normalized records and metadata | Sensitive data boundary |
| Detection engine | Evaluate versioned rules against normalized events | Deterministic decision boundary |
| Evidence service | Link findings to source events and rule versions | Integrity boundary |
| Explanation service | Produce bounded summaries from selected evidence | External AI provider boundary |
| Case service | Human review, notes, disposition, escalation | Authorization boundary |
| Audit service | Append-only record of privileged and case actions | Accountability boundary |
| Evaluation harness | Run fixed datasets, baselines, and metrics | Research reproducibility boundary |

## Event lifecycle

1. Receive a source record from an explicitly authorized adapter or synthetic fixture.
2. Validate schema, size, timestamp, source identity, and provenance.
3. Preserve the raw record or a documented privacy-safe representation.
4. Normalize into a versioned canonical event schema.
5. Evaluate the event using an identified detection-rule version.
6. Create a finding with rule ID, evidence references, confidence semantics, and execution metadata.
7. Optionally request an AI explanation using only the minimum required evidence.
8. Validate explanation structure and evidence references; mark unsupported or failed explanations.
9. Present the finding for human review.
10. Record analyst disposition and a tamper-evident audit event.

## Canonical event (initial proposal)

Required fields:
- `eventId`: stable unique identifier.
- `observedAt`: UTC timestamp normalized from an ISO-8601 timestamp with explicit timezone.
- `receivedAt`: server-side receipt timestamp; must not be trusted from an external source in production.
- `sourceType`: documented source category; current research parser accepts only synthetic.
- `sourceId`: source identifier bound to authenticated source identity in production.
- `schemaVersion`: explicit event schema version (current fixture schema 1.0.0).
- `simulation`: provenance label; production provenance must be assigned by trusted ingestion code, not self-asserted by a payload.
- `eventType`: normalized category.
- `attributes`: validated scalar event-specific attributes with bounded keys and values.
- `rawReference`: optional pointer/hash to protected raw evidence.

Do not put credentials, API keys, session tokens, or unnecessary personal data in event attributes.

## Finding model (initial proposal)

A finding should contain: finding ID, detector ID/version, rule ID/version, created timestamp, severity, status, event references, evidence references, deterministic rationale, and optional explanation metadata. A model-generated explanation must be stored separately from the detector's rationale.

## AI explanation contract

The explanation service must:
- Receive a bounded set of normalized evidence fields and the detection rationale.
- Be instructed to cite supplied evidence identifiers for factual claims.
- Return a structured response with summary, supporting evidence IDs, uncertainty, and recommended analyst checks.
- Never fabricate missing fields or claim to have performed a scan.
- Return an explicit unavailable/failed state on provider timeout or invalid output.
- Avoid making a final incident disposition or triggering a response action.
- Apply redaction, output size limits, provider deadlines, and rate limits.

## Security controls

- Server-side secret storage only.
- Strong authentication and role-based authorization for non-public operations.
- Strict request schemas, payload limits, and safe error handling.
- Rate limiting and abuse monitoring.
- TLS in deployed environments.
- Encryption at rest where sensitive data is stored.
- Append-only audit events with access controls and integrity verification.
- Dependency pinning, lockfile, automated vulnerability review, and CI.
- Backup, restore, retention, and deletion policies defined before production use.

## Deployment topology

The initial research prototype should use a simple, documented topology: web client, API service, database, and optional AI provider adapter. Local development and CI should use synthetic fixtures and deterministic tests without requiring provider credentials. Production-like deployment is a later stage and must include a threat model, operational monitoring, secrets management, backups, and recovery exercises.

## Current versus target

The current repository contains the frontend simulator, a synthetic-only event detection library, and a strict synthetic canonical-event parser. The parser is not yet integrated with the detector or an ingestion endpoint. Backend, authorized ingestion, durable event store, evidence service, case workflow, audit service, and evaluation components described above remain target architecture, not existing capabilities.
