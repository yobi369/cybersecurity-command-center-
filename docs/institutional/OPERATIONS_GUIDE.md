# Operations and Service Management Guide

**Status:** Target manual; production infrastructure and support service are not established.

## Daily operational checks
- Confirm service health, readiness and dependency status.
- Review ingestion backlog, processing latency and error/dead-letter rates when those services exist.
- Review authentication failures and privileged access alerts.
- Confirm database/storage capacity and health.
- Confirm backup completion and integrity status.
- Review certificate and secret expiry notifications.
- Review unresolved critical/high defects and security advisories.
- Confirm monitoring and audit pipelines are operating.

## Change and release operations
Follow RELEASE_MANAGEMENT.md and DEPLOYMENT_OPERATIONS.md. Do not deploy from a developer workstation directly to production. Use an approved immutable artifact and recorded release. Verify rollback readiness and migration safety.

## Incident handling
Use INCIDENT_RESPONSE.md. Preserve logs and evidence, appoint incident command, use approved communications and record decisions. Do not disclose sensitive incidents through public repository channels.

## Recovery
Follow BACKUP_RECOVERY.md. A restore is complete only after data consistency, access controls, audit integrity and critical user workflows are validated.

## Service management decisions required
Institution must set service hours, support contact, severity/response targets, escalation, maintenance windows, patch cadence, capacity thresholds, retention and vendor dependencies.

## Current limitation
No operational service, production monitoring, backup, support rota or recovery evidence exists. This guide is preparatory documentation only.
