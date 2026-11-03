# PhD Competition Presentation and Demonstration Plan

**Status:** Presentation strategy; claims must be updated to match verified implementation and completed experiments.

## Central narrative

A strong presentation should answer five questions in order:

1. What operational or scientific problem is being addressed?
2. Why do existing approaches leave a meaningful gap?
3. What exactly is the research contribution?
4. How was the contribution tested, and what evidence supports the findings?
5. What are the limitations, implications, and next research steps?

Do not begin with a long feature tour. Begin with a real research problem and a concise motivating scenario.

## Proposed presentation sequence

1. **Title and research question** — concise title, researcher, institution, supervisor (if applicable).
2. **Problem** — alert overload, fragmented evidence, and the risk of unsupported AI explanations.
3. **Research gap** — only after literature review establishes it.
4. **Aim, objectives, questions, hypotheses** — measurable and aligned.
5. **Proposed contribution** — evidence provenance + deterministic detection + bounded AI explanation + human review.
6. **Architecture** — show trust boundaries and data flow.
7. **Methodology** — datasets, baselines, splits, metrics, and analysis plan.
8. **Live demonstration** — one synthetic event through normalization, detection, evidence trace, explanation, and analyst disposition.
9. **Results** — real tables/plots generated from reproducible runs; include uncertainty and failures.
10. **Threats to validity and limitations** — be candid.
11. **Conclusion and impact** — what is established, what remains, and why it matters.

## Demonstration scenario

Use a clearly labelled synthetic dataset with a small, understandable incident narrative. The audience should be able to inspect:
- The source event and its synthetic provenance.
- The normalized event fields.
- The exact versioned rule that fired.
- The evidence supporting the finding.
- An explanation that references those evidence identifiers.
- The analyst's ability to accept, reject, annotate, or escalate.
- The audit record of the decision.

A deterministic replay button is preferable to a live external AI call during a high-stakes presentation. If AI explanation is demonstrated, prepare a deterministic fallback and label the AI-generated section.

## Visual design direction

Use a professional research/SOC visual language: clear hierarchy, restrained dark theme, readable typography, meaningful severity colors, evidence tables, timeline, rule trace, and confidence/uncertainty indicators. Avoid decorative green terminal effects, fake live traffic, invented threat counters, and animations that imply real monitoring.

## Judge questions to prepare for

- What is genuinely novel compared with SIEM/SOAR platforms and existing AI-assisted SOC tools?
- Which parts are implemented, and which are conceptual?
- How do you know the detection is correct?
- What is the source and quality of the dataset?
- How do you measure explanation faithfulness?
- What prevents prompt injection and hallucinations?
- How is the system reproducible?
- What are the false-positive and false-negative costs?
- What are the privacy and authorization boundaries?
- What are the limitations and generalizability constraints?

## Presentation evidence checklist

- Approved research title and supervisor/institution details.
- Literature review and defensible research gap.
- Architecture diagram matching implementation.
- Working, tested end-to-end demonstration.
- Dataset provenance and ethics approvals where applicable.
- Reproducible experiment scripts and raw results.
- Baseline comparison and statistical analysis.
- Limitations and threats-to-validity slide.
- Backup screenshots/video and offline demo data.
- README and technical documentation consistent with the live system.

## Claim discipline

Every slide claim should be tagged internally as one of: implemented and tested, experimentally measured, literature-supported, proposed, or future work. Only the first three may be presented as established facts, and measured results must include the evaluation context.
