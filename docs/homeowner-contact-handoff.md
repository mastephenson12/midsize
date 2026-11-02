# Homeowner follow-up handoff

The estimate evaluator and three roofing tools offer email or phone call as the preferred response method. Email remains the default for older clients. The API validates the preference and phone number, then includes contactMethod in the existing webhook payload or the GoHighLevel task. This does not send a message or book an appointment.

GoHighLevel tasks include the tool urgency and preferred method. Immediate, immediate-safety-concern, and today results are due immediately, even when the homeowner selects a routine timeline. Other requests keep the existing 24-hour task deadline. Existing do-not-contact preferences and request-only consent still apply.

For webhook workflows, map contactMethod to the contact record or follow-up task and preserve urgency. For the direct GoHighLevel path, the existing GHL_HOMEOWNER_ENABLED, GHL_PRIVATE_INTEGRATION_TOKEN, and GHL_LOCATION_ID configuration remains required. Validate delivery with a controlled test contact before enabling production routing.

## Before roofers join

All requests go to MidSizeAI for review. No roofer or inspection is assigned. The API includes routingStatus=pending-midsize-review and rooferAssigned=false; direct GoHighLevel tasks also state the manual review requirement. Webhook workflows must preserve this review status and must not automatically forward details to roofers. Consent version 2026-10-26 permits request-related contact by MidSizeAI and requires asking the homeowner before sharing contact details with a roofing professional.

## Request receipts and retries

The estimate evaluator and shared roofing-tool forms retain a requestId when retrying a failed submission, block overlapping submissions, and stop waiting after 15 seconds. A successful response must explicitly contain ok=true before showing a receipt. The receipt displays a request reference and explains that no roofer or inspection has been assigned.

The API forwards requestId to Make and direct GoHighLevel delivery and returns it after delivery acceptance. Older clients without an ID receive a server-generated UUID. Direct GoHighLevel tasks include the reference for manual lookup. A webhook acceptance is not proof that downstream workflow steps completed.

Make must persist requestId and check it before creating tasks or forwarding records. The application does not provide durable webhook deduplication; concurrent deliveries and retries after a page reload can still create duplicates. Do not claim exactly-once delivery. A browser timeout also does not establish whether the downstream service accepted the request; retry with the same reference while the page remains open.

Release validation: automated handler and client-flow tests use mock integrations only. Check a controlled request in the configured production destination before claiming live end-to-end delivery. Preserve pending-midsize-review, request-only consent, and the prohibition on automatic roofer assignment.
