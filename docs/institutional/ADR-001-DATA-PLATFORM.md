# ADR-001: Production Data Platform Selection

**Status:** Blocked — institutional and ownership decisions required  
**Date:** 2026-11-13  
**Decision owner:** Product owner and receiving institution  
**Related requirements:** FR-001 to FR-015; NFR-001, NFR-007, NFR-010, NFR-011  
**Related risks:** RSK-002, RSK-003, RSK-006, RSK-009, RSK-014

## Context

Cybersecurity Command Center currently has no production backend, database, identity provider or approved hosting environment. The current event pipeline and case workflow are in-memory demonstration components.

The product is intended for possible institutional or government evaluation. Security telemetry may contain sensitive operational information, personal data, credentials or information whose handling is governed by law, contract and institutional policy. The hosting region, data controller, data processor, legal basis, retention, incident notification and support responsibilities must be established before selecting a production data plane.

Existing connected data projects are associated with other work and are not approved for this product. They must not be reused or modified for CCC.

## Options considered

| Option | Benefits | Risks / costs | Status |
|---|---|---|---|
| Dedicated managed PostgreSQL and separately hosted API | Managed operations, mature database, clear separation of API and data plane | Region, provider, contract, cost and identity integration must be approved | Candidate |
| Institution-controlled cloud or on-premises PostgreSQL | Stronger institutional control and potential data-residency fit | Institution owns patching, monitoring, backup, resilience and support | Candidate |
| Dedicated Supabase project | Integrated Postgres, Auth, RLS and developer workflow | Available regions and contractual controls may not satisfy institutional requirements; project and cost need approval | Candidate |
| Reuse an unrelated existing project | Fast initial setup | Cross-product data/control boundary, ownership, retention and billing contamination | Rejected |

## Decision

Do not provision or connect a production database or backend until the product owner and receiving institution approve:
1. Hosting owner and provider.
2. Permitted region and data-residency/transfer requirements.
3. Data classification and approved source types.
4. Identity provider, MFA, roles and tenant model.
5. Availability, RTO, RPO, retention and deletion requirements.
6. Network boundaries, encryption/key ownership and backup location.
7. Procurement, cost and support responsibilities.

No paid service, new cloud project, production dataset or external telemetry source is authorized by this ADR.

## Consequences

- No real or sensitive telemetry may be loaded into the current prototype.
- Current event processing and case state remain synthetic and in-memory.
- A portable PostgreSQL schema and API adapter may be designed in the repository, but must not be represented as deployed or production verified.
- The final architecture must support data export, migration and institution-controlled key/identity ownership where required.
- This decision is a blocker for production deployment and institutional operational acceptance.

## Revisit criteria

Revisit when a named receiving institution or authorized product owner provides written hosting, data classification, identity, residency, recovery and cost requirements.
