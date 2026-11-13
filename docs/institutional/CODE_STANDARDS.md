# Software Engineering and Code Standards

**ID:** ENG-001 | **Status:** Proposed engineering baseline.

## General rules
- Use TypeScript strict mode; avoid any and unsafe type assertions.
- Keep domain logic independent from UI, storage and provider SDKs.
- Prefer small, cohesive modules with explicit interfaces and deterministic behavior.
- Validate all external inputs at runtime; TypeScript types do not validate network data.
- Use UTC timestamps with explicit timezone; define clock-skew policy.
- Use stable identifiers, schema versions and documented error semantics.
- Never log secrets, credentials, tokens, unnecessary personal data or raw sensitive payloads.
- Never embed production secrets in frontend bundles.
- Treat telemetry, filenames, imported documents and AI output as untrusted.
- Do not execute arbitrary user-supplied commands or code.
- Keep security-critical decisions server-side.

## TypeScript
Enable strict, noImplicitAny, strictNullChecks, noUncheckedIndexedAccess where compatible, exactOptionalPropertyTypes where practical, and noUnusedLocals/noUnusedParameters. Use discriminated unions for state machines and explicit Result/error types where appropriate. Narrow unknown input before use. Avoid implicit coercion and mutable shared state.

## React/UI
Use accessible semantic controls, labels and focus handling. Separate presentation from domain services. Keep loading, empty, error, unauthorized and unavailable states explicit. Do not rely on client-side hiding as authorization. Render event content as text, never trusted HTML. Clearly label simulated data.

## Testing
Name tests by behavior and expected outcome. Include positive, negative, boundary and regression cases. Use fixed clocks and fixtures. Do not make tests depend on external networks or live provider accounts. Keep test data synthetic unless approved otherwise. Preserve failing evidence and explain any skipped tests.

## Dependencies
Prefer the smallest maintained dependency set. Review license, maintenance, security advisories and transitive dependencies. Pin versions through lockfile. Document exceptions and upgrade cadence.

## Pull requests
Each PR states purpose, scope, risk, requirements covered, tests executed, migration/rollback implications, screenshots where useful, and documentation changes. Require reviewer approval and passing checks before merge.

## Definition of done
Code is not complete until requirement, design, implementation, tests, security review, documentation, observability, failure handling and release evidence agree.
