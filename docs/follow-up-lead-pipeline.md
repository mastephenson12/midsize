# Follow-Up Leak Audit → GoHighLevel pipeline

The server endpoint is `POST /api/contractor-lead`. It is disabled until all required environment variables are configured.

## Required Vercel environment variables

- `CONTRACTOR_LEAD_ENABLED=true`
- `CONTRACTOR_LEAD_WEBHOOK_URL=` — GoHighLevel inbound webhook URL
- `TURNSTILE_SECRET_KEY=` — Cloudflare Turnstile secret used for bot verification

Optional:

- `CONTRACTOR_LEAD_WEBHOOK_KEY=` — forwarded as `x-api-key`
- `CONTRACTOR_LEAD_ALLOWED_ORIGINS=` — comma-separated preview or alternate origins

## GoHighLevel workflow mapping

Create/update the contact using email and phone, then:

1. Add tags from `tags`.
2. Create an opportunity in stage `new-follow-up-review`.
3. Store `auditScore`, `weakestStageLabel`, and each `stageScores` value in custom fields.
4. Send an immediate acknowledgment.
5. Notify the owner or assigned team member.
6. Track appointment booked, proposal sent, won/lost, and revenue.

The endpoint recalculates scores server-side, requires consent, verifies Turnstile, uses a honeypot and minimum-fill-time check, validates origin, limits payload size, and forwards an idempotency key. It never trusts the browser's calculated total.

## Next implementation step

Add the contact form and Turnstile widget to the audit result panel. Submit the five raw stage scores plus contact fields to `/api/contractor-lead`. Keep the existing external application link available while the endpoint reports `ready: false`.
