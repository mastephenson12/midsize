# Verify homeowner intake and internal alerts
Prepared November 7, 2026. Operational checklist; production execution remains unverified.

## What acceptance means
GET /api/homeowner-lead reports configuration readiness only. With GHL_HOMEOWNER_ENABLED=true it checks that the enable flag, integration token and location ID exist; it does not authenticate them. Otherwise it checks HOMEOWNER_LEAD_WEBHOOK_URL exists.
POST success follows either direct GHL contact/task delivery or webhook HTTP acceptance. An optional internal alert runs afterward using waitUntil. Alert failure does not change a successful intake response.
Sources: website/api/homeowner-lead.js, website/lib/ghl-homeowner.js, website/lib/homeowner-alert.js and docs/homeowner-contact-handoff.md.

## First: inspect without changing anything (about 10 minutes)
1. In Vercel's midsize production project, inspect variable NAMES and whether configured; never copy values into notes. Record direct GHL enabled/disabled and alert configured/not configured.
2. If direct mode is enabled, identify the configured GHL location and whether an assignee is configured. If webhook mode is selected, identify the existing Make/GHL destination. Do not enable a second intake path.
3. In GHL, inspect the existing homeowner alert workflow: exact name, location, trigger, saved/published state, recipient and re-entry. Compare with current request fields rather than an old sample.
4. Record whether the workflow filters this homeowner route. Do not publish or broaden a trigger during inspection.

## Controlled acceptance test (separate authorization for live submissions/messages)
Use Mark's designated test contact only. Record reference, time and evidence privately in the approved work record; avoid putting contact details in GitHub.
| Check | Pass evidence | What does not establish a pass |
| --- | --- | --- |
| Intake | Matching request reference reaches intended destination | A ready=true response |
| Review task | Correct contact/location, Homeowner task, due date and intended assignee | Webhook HTTP acceptance alone |
| Routing | Pending MidSizeAI review; no roofer assigned | A successful UI receipt alone |
| Internal alert | Matching workflow enrollment and internal email event, then actual intended inbox receipt | A task or API success alone |
| Retry | Same reference checked against existing record; no unexpected duplicate task | Contact upsert alone |
| New request from same contact | New reference gets the intended task and alert | A tag that was already on the contact |

Direct GHL attempts deduplication by a marker in the returned contact task list; it is not an atomic concurrency guarantee. Make/webhook mode needs its own persisted requestId check. Even a deduplicated intake retry can invoke the optional alert again: alert behavior must be checked separately. Browser timeouts do not prove rejection.

## Diagnose the first missing link
- No task: verify selected intake route and destination before touching alerts.
- Task exists, no workflow enrollment: verify HOMEOWNER_ALERT_WEBHOOK_URL configuration and inbound trigger mapping; a contact-tag-only trigger can miss a later request.
- Enrollment exists, no delivered event: inspect the saved recipient/action and execution error.
- Provider accepted, inbox absent: check spam/inbox routing; do not call provider acceptance inbox proof.
- Duplicate alert: inspect retry/re-entry rules and persisted request reference; do not disable legitimate new requests to hide duplicates.
- No assignee: direct task assignment is optional in code; verify intended owner before declaring routing complete.

## Closeout
Record each check as passed, failed or not tested, with date and evidence. Keep the contractor pilot test separate. Preserve request-only consent, DND settings and manual MidSizeAI review. Never include estimate documents/text or credentials in alert payloads or this checklist.
