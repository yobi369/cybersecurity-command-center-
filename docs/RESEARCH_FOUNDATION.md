# Research Foundation

**Status:** Draft research framing; researcher confirmation required.

## Working title

**Evidence-Grounded AI Assistance for Explainable and Reproducible Security-Event Triage**

The title is intentionally provisional. The final title must match the researcher's approved PhD topic, discipline, institutional requirements, and actual contribution.

## Problem context

Security operations teams must interpret high-volume, heterogeneous security events under time pressure. Automated rules can provide repeatable detection but may produce noisy alerts and limited contextual explanation. Generative AI can produce readable summaries, but unconstrained generation can introduce unsupported claims, obscure provenance, and make decisions difficult to reproduce.

The research problem is therefore not simply to add a chatbot to a security dashboard. It is to investigate whether AI assistance can be constrained by structured, traceable evidence and deterministic detection so that analysts receive useful explanations without allowing generated text to become the source of truth.

## Proposed research problem

Can an evidence-grounded architecture that separates event evidence, deterministic detection, AI-generated explanation, and human approval improve the quality and efficiency of security-event triage while preserving decision traceability and reproducibility?

This statement is a candidate formulation, not an established research gap. A literature review is required to establish novelty and position the work against prior research.

## Candidate research questions

- **RQ1 — Detection quality:** How does the proposed pipeline perform against selected rule-based and/or established baseline approaches on a documented security-event benchmark?
- **RQ2 — Explanation faithfulness:** To what extent do AI-generated explanations remain supported by the underlying event fields and detection evidence?
- **RQ3 — Analyst utility:** Does evidence-linked explanation reduce triage time or improve analyst decision consistency compared with an appropriate baseline?
- **RQ4 — Reproducibility:** Can the same event, rule version, and system configuration reproduce the same detection result and decision trace?
- **RQ5 — Operational trade-offs:** What latency, resource, and false-positive trade-offs arise from adding AI-assisted explanation to the detection workflow?

The final study may narrow these questions. Do not retain questions that cannot be tested with available participants, data, or resources.

## Candidate hypotheses

- **H1:** A deterministic evidence and detection layer will produce more reproducible alert decisions than a workflow in which generated text is treated as the primary decision source.
- **H2:** Evidence-linked explanations will contain fewer unsupported factual statements than unconstrained AI summaries under the same evaluation conditions.
- **H3:** Providing evidence-linked explanations may reduce analyst triage time without a material reduction in decision accuracy.

Each hypothesis requires operational definitions, a baseline, a sampling plan, and a statistical analysis plan before experiments begin. No hypothesis is currently supported by experimental results.

## Proposed contribution claims to test

1. A provenance-preserving event and evidence representation for security-event triage.
2. A separation-of-concerns architecture in which deterministic detection establishes findings and AI provides bounded explanation.
3. An evaluation protocol for explanation faithfulness, detection quality, reproducibility, and analyst utility.
4. An openly documented, reproducible prototype and synthetic demonstration environment.

These are candidate contributions. Novelty must be established through a systematic literature review and comparison with existing systems.

## Scope boundaries

### In scope (proposed)
- Structured event normalization.
- Versioned, deterministic detection rules.
- Evidence-to-alert traceability.
- AI-assisted explanation grounded only in supplied evidence.
- Human review and auditable case decisions.
- Reproducible benchmark evaluation.
- Safe synthetic demonstrations.

### Out of scope unless separately approved
- Autonomous offensive operations.
- Credential cracking or exploitation.
- Unbounded scanning of real networks.
- Autonomous containment or destructive remediation.
- Claims of enterprise-grade real-time monitoring without validated ingestion and deployment.
- Use of sensitive organizational data without authorization and required approvals.

## Literature review requirements

Build a structured review matrix with: citation, research question, system/approach, dataset, evaluation design, metrics, findings, limitations, reproducibility, and relevance to this work. Search peer-reviewed work on SOC alert triage, explainable AI for cybersecurity, LLM faithfulness/grounding, intrusion detection evaluation, human-AI decision support, and security-event provenance.

Do not claim that a gap is novel until competing literature and systems have been examined.

## Research integrity

- Preserve raw data and record all transformations.
- Record dataset provenance, licensing, and permitted use.
- Separate synthetic, public benchmark, and authorized operational data.
- Predefine train/validation/test boundaries and avoid leakage.
- Report negative and inconclusive results.
- Publish metric definitions, scripts, seeds, configurations, and limitations.
- Never invent sample sizes, participant feedback, performance numbers, or deployment outcomes.
