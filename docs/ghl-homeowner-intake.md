# Direct GoHighLevel homeowner intake

Target: MidSize AI subaccount `1SpoGkK9K6rxCsz7l2iX`.

The server can upsert the requesting contact and create an internal follow-up task with request type, ZIP, roof type, timeline, source and consent record. Normal tasks are due in 24 hours; active-leak requests are due immediately. This does not send customer messages, enroll contacts in campaigns, change DND, or transmit estimate files/text. Existing GHL automations must be checked before live customer testing.

Activation requires a location-specific private integration with `contacts.readonly` and `contacts.write`. Store its token only as a Production secret in Vercel, never in source or client code:

- `GHL_PRIVATE_INTEGRATION_TOKEN`: private integration token
- `GHL_LOCATION_ID`: `1SpoGkK9K6rxCsz7l2iX`
- `GHL_HOMEOWNER_ENABLED`: `true`
- Optional `GHL_ASSIGNEE_USER_ID`: follow-up owner's GHL user ID; otherwise tasks are unassigned

Redeploy after setting variables. With the flag off, the existing webhook route remains unchanged. With the flag on, missing configuration or failed CRM operations fail closed; there is no fallback to an unverified destination. Test using a clearly synthetic contact, then confirm contact and task in the account before calling the connection live.

The browser reuses a request ID after a failed submission. The server checks existing tasks for the same request marker before creating another. This handles sequential retries, not simultaneous duplicate requests; strict concurrency-safe idempotency would require a durable store. Legacy clients without a request ID are deduplicated for identical request fields within a UTC date.

Validation: 25 tests pass, including task timing, privacy, sequential retry deduplication, incomplete configuration and failed upstream operations. Live delivery needs activation and end-to-end confirmation.

API references: https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/ and https://marketplace.gohighlevel.com/docs/ghl/contacts/create-task/index.html
