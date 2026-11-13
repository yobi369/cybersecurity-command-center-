# Canonical Event Schema v1.0.0

**Status:** Implemented strict parser for synthetic research fixtures only. Not connected to ingestion, persistence, source authentication or the detection engine.

## Contract fields

| Field | Type | Rule |
|---|---|---|
| eventId | string | 1–80 chars; alphanumeric first, then alphanumeric, dot, underscore, colon or hyphen |
| observedAt | ISO-8601 string | Explicit timezone required; normalized to UTC ISO string |
| receivedAt | ISO-8601 string | Explicit timezone required; normalized to UTC ISO string |
| sourceId | string | Same stable identifier rule |
| sourceType | literal | Must be synthetic in this research parser |
| schemaVersion | literal | 1.0.0 |
| eventType | enum | authentication.failure or authentication.success |
| simulation | boolean literal | Must be true |
| attributes | object | Maximum 32 scalar fields; keys restricted; values string (max 512 chars), finite number or boolean |

Unknown root fields are rejected. Nested attribute values, nulls, arrays, non-finite numbers and malformed identifiers are rejected. Attribute keys are sorted before output to provide deterministic normalization.

## Implementation

- Parser: services/eventSchema.ts\n- Pipeline: services/eventPipeline.ts (normalizes full batch, then invokes synthetic detector)
- Tests: services/eventSchema.test.ts
- Test scope: valid parsing, UTC normalization, invalid root values, unknown fields, unsupported versions/types, non-synthetic values, timezone validation, malformed IDs, unsafe attribute shapes, size limits and deterministic ordering.

## Trust and production limitations

The parser validates shape and basic semantics; it does not authenticate a source. A payload flag is not proof of provenance. Production ingestion must bind source identity to authenticated transport/credentials and server-controlled metadata, enforce payload byte limits before parsing, apply schema compatibility policy, preserve raw evidence safely, and record receipt metadata. This parser deliberately rejects non-synthetic sources and is not an operational telemetry ingestion contract.

## Change policy

Any incompatible field or semantic change requires a new schema version, migration/compatibility plan, fixtures, contract tests, documentation update and review. Never silently reinterpret an existing field.
