# Deterministic Event Engine — M2 Foundation

**Status:** Implemented as an isolated, synthetic-only library. It is connected to the canonical parser through an in-memory synthetic-only pipeline, but not to telemetry ingestion, persistence, UI, or response actions.

## Current rule

The auth-failure-burst rule version 1.0.0 evaluates normalized authentication events and emits a high-severity finding when one source has at least five failed authentication events inside a rolling ten-minute window.

A separate strict canonical fixture parser is implemented in [EVENT_SCHEMA.md](EVENT_SCHEMA.md). It validates schema v1.0.0 and normalizes timestamps/attributes. It is wired into the detector through `services/eventPipeline.ts`; it is not an ingestion endpoint.

## Evidence and reproducibility

- Every input event must carry a stable event ID, ISO-8601 observation timestamp, source ID, event type, and simulation=true.
- Duplicate event IDs, malformed timestamps, unsupported event types, and non-synthetic events are rejected.
- Findings retain contributing event IDs and the detector/rule version.
- Successful authentication events are counted as ignored.
- Results are sorted deterministically.
- No network access, data collection, account lockout, notification, or remediation occurs.

## Limitations

This rule is a teaching/research fixture, not a production brute-force detector. It does not model identity-provider semantics, NAT/shared-source effects, distributed attempts, account-target correlation, clock skew, ingestion delay, or false-positive rates. Threshold and window are provisional and must be evaluated against documented datasets before operational use.

## Pipeline integration

- `services/eventPipeline.ts` validates every input against schema v1.0.0 before detection.
- A batch with any invalid event is rejected; partial processing is not returned.
- Duplicate IDs are rejected by the detector.
- The pipeline is in-memory, synchronous and synthetic-only; it does not authenticate sources, persist evidence or expose an API.
- Tests cover normalization-to-detection, invalid batch rejection, duplicates, source separation and batch limits.

## Next integration gates

1. Define the canonical event schema and ingestion contract.
2. Add property-based tests and replayable benchmark fixtures.
3. Persist events/findings with provenance and retention controls.
4. Add authenticated analyst case workflow and append-only audit records.
5. Display findings in the dashboard only after evidence references are verified.
