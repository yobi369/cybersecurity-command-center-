# Synthetic Operations Dashboard Demonstration

**Status:** Implemented as a local, browser-only demonstration. Not an operational SOC dashboard.

## Components
- `components/OperationsDashboard.tsx` renders the demonstration workspace.
- `services/eventPipeline.ts` validates and normalizes six deterministic fixtures.
- `services/eventEngine.ts` evaluates the authentication-failure burst rule.
- `services/caseManagement.ts` provides local case-state transitions.

## Visible data boundary
The header and system-boundary notice identify the workspace as demonstration mode. All six records are synthetic, generated in code, and labelled as synthetic in the evidence register. Metrics are computed from the local fixture batch, not from external telemetry. The finding links to the exact event IDs used by the detector.

## Demonstration workflow
1. Open the dashboard and verify the synthetic-only warning.
2. Confirm six fixture events are displayed.
3. Confirm five authentication failures from one source produce one finding under rule version 1.0.0.
4. Confirm the successful authentication is counted as ignored.
5. Create a demonstration case from the finding.
6. Triage the case, start investigation and resolve it.
7. Confirm the case version increments and the latest transition record is shown.
8. Reset the case and confirm browser state returns to the initial state.

## Manual acceptance checklist
- [ ] Synthetic-only warning is visible before interacting with the workspace.
- [ ] No claim of live monitoring or real telemetry is shown.
- [ ] Finding summary, rule version and evidence references match the fixture.
- [ ] Case transitions follow the domain state machine.
- [ ] Supervisor-only closure is clearly unavailable without real role integration.
- [ ] Reset clears the local case and transition display.
- [ ] Layout remains usable at mobile, tablet and desktop widths.
- [ ] All buttons are keyboard operable and have visible focus.
- [ ] Text remains readable at 200% zoom and with browser high-contrast settings.
- [ ] No console errors or external telemetry requests occur.

## Limitations
The dashboard does not authenticate, persist, ingest, export, alert, monitor, or respond. It does not implement a live SOC workflow. Case state is held in React memory and disappears on reload. The synthetic fixtures are not a benchmark dataset and must not be used to claim detection performance.

## Production replacement requirements
Replace demo fixture constants with authorized API data only after server-side identity, source authentication, schema validation, tenant isolation, durable persistence, audit, retention and monitoring are implemented and independently tested. Preserve explicit empty/loading/error/unauthorized states and keep provenance visible.
