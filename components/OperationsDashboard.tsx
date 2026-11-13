import React, { useMemo, useState } from 'react';
import { processSyntheticEventBatch } from '../services/eventPipeline';
import { transitionCase, type CaseAction, type CaseActor, type CaseRecord, type CaseAuditEvent } from '../services/caseManagement';

const DEMO_TENANT = 'demo-tenant-01';
const DEMO_ANALYST: CaseActor = { principalId: 'demo-analyst-01', tenantId: DEMO_TENANT, role: 'analyst' };

function makeFixture(eventId: string, minute: number, eventType: 'authentication.failure' | 'authentication.success') {
  const observedAt = new Date(Date.UTC(2026, 0, 1, 10, minute)).toISOString();
  return {
    eventId,
    observedAt,
    receivedAt: observedAt,
    sourceId: 'demo-identity-provider-01',
    sourceType: 'synthetic',
    schemaVersion: '1.0.0',
    eventType,
    simulation: true,
    attributes: { account: 'demo-user-01', environment: 'training-lab' },
  };
}

const DEMO_RESULT = processSyntheticEventBatch([
  makeFixture('demo-event-001', 0, 'authentication.failure'),
  makeFixture('demo-event-002', 1, 'authentication.failure'),
  makeFixture('demo-event-003', 2, 'authentication.failure'),
  makeFixture('demo-event-004', 3, 'authentication.failure'),
  makeFixture('demo-event-005', 4, 'authentication.failure'),
  makeFixture('demo-event-006', 5, 'authentication.success'),
]);

function formatUtc(value: string): string {
  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC',
  }).format(new Date(value)) + ' UTC';
}

const OperationsDashboard: React.FC = () => {
  const [caseRecord, setCaseRecord] = useState<CaseRecord | null>(null);
  const [auditEvent, setAuditEvent] = useState<CaseAuditEvent | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const finding = DEMO_RESULT.detection.findings[0];

  const caseActions = useMemo(() => {
    if (!caseRecord) return [];
    if (caseRecord.status === 'new') return [{ type: 'triage' as const, label: 'Triage case' }];
    if (caseRecord.status === 'triaged') return [{ type: 'start' as const, label: 'Start investigation' }];
    if (caseRecord.status === 'in_progress') return [{ type: 'resolve' as const, label: 'Resolve case', reasonCode: 'contained' as const }];
    return [];
  }, [caseRecord]);

  const createCase = () => {
    if (!finding) return;
    setCaseRecord({
      caseId: 'demo-case-001',
      tenantId: DEMO_TENANT,
      title: 'Synthetic authentication failure burst',
      status: 'new',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setAuditEvent(null);
    setFeedback('A demonstration case was created from the synthetic finding.');
  };

  const applyAction = (action: CaseAction) => {
    if (!caseRecord) return;
    try {
      const result = transitionCase(caseRecord, {
        action,
        actor: DEMO_ANALYST,
        expectedVersion: caseRecord.version,
        auditEventId: 'demo-audit-' + (caseRecord.version + 1),
        occurredAt: new Date().toISOString(),
      });
      setCaseRecord(result.caseRecord);
      setAuditEvent(result.auditEvent);
      setFeedback('Case transition accepted by the local demonstration state machine.');
    } catch {
      setFeedback('The demonstration transition was rejected. No state was changed.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 border-b border-slate-800 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400">Security operations workspace</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Cybersecurity Command Center</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Evidence-linked event triage and case workflow research environment.</p>
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Demonstration mode</p>
            <p className="mt-1 text-sm text-amber-100">Synthetic fixtures only · No live telemetry</p>
          </div>
        </header>

        <section aria-label="Operational boundary" className="mb-6 rounded-xl border border-sky-900 bg-sky-950/40 p-4">
          <p className="text-sm font-semibold text-sky-200">System boundary</p>
          <p className="mt-1 text-sm leading-6 text-sky-100/80">This workspace runs locally in the browser. It does not connect to an institution, collect network traffic, authenticate analysts, persist evidence, or perform response actions. All displayed events and findings are generated synthetic fixtures.</p>
        </section>

        <section aria-label="Demonstration metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Synthetic events" value={String(DEMO_RESULT.detection.evaluatedEventCount)} detail="Local fixture batch" />
          <Metric label="Detection findings" value={String(DEMO_RESULT.detection.findings.length)} detail="Rule auth-failure-burst v1.0.0" />
          <Metric label="Ignored events" value={String(DEMO_RESULT.detection.ignoredEventCount)} detail="Successful authentication" />
          <Metric label="Open demo cases" value={caseRecord && caseRecord.status !== 'closed' ? '1' : '0'} detail="Browser memory only" />
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-xl border border-slate-800 bg-slate-900/70">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
              <div>
                <h2 className="font-semibold text-white">Detection findings</h2>
                <p className="mt-1 text-xs text-slate-400">Deterministic output with linked evidence IDs</p>
              </div>
              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">SIMULATED</span>
            </div>
            {finding ? (
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-rose-500/15 px-2.5 py-1 text-xs font-bold uppercase text-rose-300">High severity</span>
                  <span className="text-xs text-slate-500">Rule {finding.detectorId} · {finding.ruleVersion}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{finding.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{finding.summary}</p>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div><dt className="text-xs uppercase tracking-wide text-slate-500">Source</dt><dd className="mt-1 font-mono text-slate-200">{finding.sourceId}</dd></div>
                  <div><dt className="text-xs uppercase tracking-wide text-slate-500">Evidence events</dt><dd className="mt-1 text-slate-200">{finding.evidenceEventIds.length} linked IDs</dd></div>
                  <div><dt className="text-xs uppercase tracking-wide text-slate-500">First observed</dt><dd className="mt-1 text-slate-200">{formatUtc(finding.firstObservedAt)}</dd></div>
                  <div><dt className="text-xs uppercase tracking-wide text-slate-500">Last observed</dt><dd className="mt-1 text-slate-200">{formatUtc(finding.lastObservedAt)}</dd></div>
                </dl>
                <div className="mt-5 rounded-lg bg-slate-950 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence references</p>
                  <ul className="mt-2 space-y-1">
                    {finding.evidenceEventIds.map(id => <li key={id} className="font-mono text-xs text-emerald-300">{id}</li>)}
                  </ul>
                </div>
                {!caseRecord && <button onClick={createCase} className="mt-5 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">Create demonstration case</button>}
              </div>
            ) : <p className="p-5 text-sm text-slate-400">No findings in this fixture batch.</p>}
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900/70">
            <div className="border-b border-slate-800 px-5 py-4">
              <h2 className="font-semibold text-white">Case workspace</h2>
              <p className="mt-1 text-xs text-slate-400">Local state-machine demonstration</p>
            </div>
            <div className="p-5">
              {caseRecord ? (
                <>
                  <p className="font-mono text-xs text-slate-500">{caseRecord.caseId} · v{caseRecord.version}</p>
                  <h3 className="mt-2 font-semibold text-white">{caseRecord.title}</h3>
                  <p className="mt-3 inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold capitalize text-sky-200">{caseRecord.status.replaceAll('_', ' ')}</p>
                  <p className="mt-4 text-sm text-slate-400">Assigned to: {caseRecord.assignedTo ?? 'Unassigned'}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {caseActions.map(item => <button key={item.type} onClick={() => applyAction(item)} className="rounded-lg border border-emerald-500/40 px-3 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">{item.label}</button>)}
                    <button onClick={() => { setCaseRecord(null); setAuditEvent(null); setFeedback('The local demonstration case was reset.'); }} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Reset demo</button>
                  </div>
                  {caseRecord.status === 'resolved' && <p className="mt-4 text-xs leading-5 text-amber-200">Closure requires a supervisor-authorized action. This demonstration has no real identity or role provider.</p>}
                  {auditEvent && <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Latest transition record</p><p className="mt-2 text-xs text-slate-300">{auditEvent.action}: {auditEvent.fromStatus} → {auditEvent.toStatus}</p><p className="mt-1 font-mono text-[11px] text-slate-500">{auditEvent.auditEventId} · {auditEvent.actorId}</p></div>}
                </>
              ) : <p className="text-sm leading-6 text-slate-400">Create a demonstration case from the synthetic finding to explore the locally validated case lifecycle.</p>}
              {feedback && <p className="mt-4 rounded-lg bg-slate-950 p-3 text-xs text-slate-300" role="status" aria-live="polite">{feedback}</p>}
            </div>
          </section>
        </div>

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="border-b border-slate-800 px-5 py-4">
            <h2 className="font-semibold text-white">Event evidence register</h2>
            <p className="mt-1 text-xs text-slate-400">Six synthetic records passed through schema validation and the detection pipeline.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-950/70 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Event ID</th><th className="px-5 py-3">Event type</th><th className="px-5 py-3">Source</th><th className="px-5 py-3">Observed (UTC)</th><th className="px-5 py-3">Provenance</th></tr></thead>
              <tbody className="divide-y divide-slate-800">
                {DEMO_RESULT.normalizedEvents.map(event => <tr key={event.eventId}><td className="px-5 py-3 font-mono text-xs text-slate-200">{event.eventId}</td><td className="px-5 py-3 text-slate-300">{event.eventType}</td><td className="px-5 py-3 font-mono text-xs text-slate-400">{event.sourceId}</td><td className="px-5 py-3 text-slate-400">{formatUtc(event.observedAt)}</td><td className="px-5 py-3"><span className="rounded bg-amber-500/10 px-2 py-1 text-xs text-amber-200">Synthetic</span></td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 border-t border-slate-800 pt-5 text-xs leading-6 text-slate-500">
          Research prototype · Local browser state · No live monitoring · No external telemetry · No durable evidence storage · No automated response.
        </footer>
      </div>
    </main>
  );
};

interface MetricProps { label: string; value: string; detail: string; }
const Metric: React.FC<MetricProps> = ({ label, value, detail }) => (
  <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
    <p className="mt-3 text-3xl font-bold tabular-nums text-white">{value}</p>
    <p className="mt-1 text-xs text-slate-400">{detail}</p>
  </article>
);

export default OperationsDashboard;
