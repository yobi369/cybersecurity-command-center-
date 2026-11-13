# Security Policy

## Scope

This repository is an early-stage research prototype. It is not approved for production security monitoring or response.

## Safe use

- Use only systems and data for which you have explicit authorization.
- Keep the default demonstration synthetic and clearly labelled.
- Do not use the application to execute arbitrary shell commands, exploit targets, crack credentials, or scan networks without explicit authorization and a separately reviewed implementation.
- Do not upload secrets, credentials, personal data, or confidential production logs to public issues or source control.
- Do not treat generated text as verified security evidence.

## Reporting a vulnerability

Do not publish exploitable details, credentials, or sensitive logs in a public issue. Contact the repository owner through a private channel available from the repository profile. Include affected version/commit, impact, reproduction steps using a safe test environment, and suggested mitigation. Avoid accessing or modifying data beyond what is necessary to demonstrate the issue.

## Secrets

Never commit API keys, tokens, passwords, private keys, or production credentials. Use server-side secret management for runtime services. If a credential is exposed, revoke/rotate it immediately and investigate potential use; deleting the text from a later commit does not invalidate the credential.

## Disclosure and response

This is a research project without a guaranteed security response SLA. Reporters should allow reasonable time for triage and remediation before public disclosure.
