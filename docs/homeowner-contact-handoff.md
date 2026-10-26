# Homeowner follow-up handoff

The estimate evaluator and three roofing tools offer email or phone call as the preferred response method. Email remains the default for older clients. The API validates the preference and phone number, then includes contactMethod in the existing webhook payload or the GoHighLevel task. This does not send a message or book an appointment.

GoHighLevel tasks include the tool urgency and preferred method. Immediate, immediate-safety-concern, and today results are due immediately, even when the homeowner selects a routine timeline. Other requests keep the existing 24-hour task deadline. Existing do-not-contact preferences and request-only consent still apply.

For webhook workflows, map contactMethod to the contact record or follow-up task and preserve urgency. For the direct GoHighLevel path, the existing GHL_HOMEOWNER_ENABLED, GHL_PRIVATE_INTEGRATION_TOKEN, and GHL_LOCATION_ID configuration remains required. Validate delivery with a controlled test contact before enabling production routing.

## Before roofers join

All requests go to MidSizeAI for review. No roofer or inspection is assigned. The API includes routingStatus=pending-midsize-review and rooferAssigned=false; direct GoHighLevel tasks also state the manual review requirement. Webhook workflows must preserve this review status and must not automatically forward details to roofers. Consent version 2026-10-26 permits request-related contact by MidSizeAI and requires asking the homeowner before sharing contact details with a roofing professional.
