# Data Governance, Privacy and Evidence Handling

**ID:** DATA-001 | **Status:** Proposed; institutional privacy/legal review required.

## Principles
Collect only what is necessary for an approved security purpose. Preserve provenance and integrity. Restrict by role/case scope. Define retention before production ingestion. Do not collect credentials, secrets, unnecessary personal data or unrelated content.

## Initial data categories
| Category | Examples | Handling target |
|---|---|---|
| Identity | User ID, role, institution identity reference | Restricted; minimize |
| Telemetry | Authentication, endpoint and network events | Classification assigned by institution |
| Evidence | Raw reference, hashes, attachments | Highly restricted; integrity protected |
| Findings | Rule, severity, evidence links, status | Restricted; access logged |
| Cases | Notes, decisions, assignments | Restricted; records policy |
| Audit | Actor, action, target, timestamp, outcome | Protected from unauthorized alteration |
| Operations | Health, latency, safe error codes | No secrets or unnecessary payloads |
| Research | Synthetic, public or approved datasets | License/provenance documented |

Labels are provisional, not an official classification scheme.

## Data lifecycle
Identify purpose and authority; record source/owner/classification; validate and minimize at ingestion; apply access controls and encryption; preserve provenance; use only for approved purposes; enforce retention/legal holds; export only through audited workflows; delete/anonymize when authorized; verify deletion from primary, derived, backup, cache and export locations according to policy.

## Inventory fields
Source ID, owner, purpose, legal authority/basis, fields, classification, personal data categories, processing location, recipients, transfer mechanism, retention, deletion method, access roles, encryption, provenance, quality limitations and approval reference.

## Evidence integrity
Use immutable identifiers, source references, receipt timestamps, cryptographic hashes where appropriate, transformation history and access/export audit events. A hash supports integrity checking but does not prove source authenticity alone.

## Legal/privacy review
Before real telemetry is connected, obtain institution-specific review of applicable Kenyan data protection requirements, cybersecurity laws/policies, public-sector records rules, cross-border transfers, contracts and sector obligations. Determine whether a DPIA or other assessment is required. This is not legal advice or proof of compliance.

Operational data must not be reused for academic/product research without explicit authorization and any required ethics/privacy approval.
