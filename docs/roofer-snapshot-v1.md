# MidSizeAI Roofer Kit v1 — Estimate Follow-Up
Build record · November 14, 2026

## Product
First reusable module for Roofer's Booking Blueprint. The approved catalog lists this service from $299/month plus $499 setup. This build does not establish a separate snapshot price. The existing $500, 14-day pilot is a different offer.

## Saved in GHL
Account: MidSize AI.
Pipeline: MidSizeAI Roofer Kit v1 — Estimate Follow-Up.
Pipeline ID: RjHQZ7pCAnx4oxq4bnAt.
Stages: Estimate sent → Follow-up due → Customer replied → Decision pending → Job booked → Closed / not proceeding.
Pipeline was created and read back successfully. Stage labels alone do not change opportunity status. Configure Job booked as won and Closed / not proceeding as lost when implementing the outcome workflow.

## Workflow build sheet
All workflows below are specifications pending creation and testing in GHL.

### 01 — Estimate sent to assigned follow-up
Trigger: Opportunity enters Estimate sent in this kit's pipeline.
Require an assigned user, estimate reference and next-action date. Missing information creates an internal completion task for the configured fallback owner.
Create one task for the assigned user to confirm estimate receipt, due on the next-action date. Store task/enrollment reference per opportunity. Reject repeat enrollment for the same estimate version.
A contact with multiple estimates must retain independent opportunity records and task dates. Avoid storing estimate-specific details in contact fields.

### 02 — Follow-up due
Trigger: The opportunity next-action date arrives while status is open.
Recheck pipeline, stage, owner, previous completion and next-action date immediately before acting. Create at most one due task for that estimate and date, then move to Follow-up due.
At the end of the next business day, surface the unresolved task to the configured manager. The manager and working hours are installation inputs.
Initial delivery uses staff tasks. Optional customer messages require an approved channel, sender, documented contact permission and a stop check before every send.

### 03 — Reply and human handoff
Trigger: Customer replies through a supported channel.
Match the reply to the relevant open estimate. If there are multiple candidates, assign a clarification task rather than updating all opportunities.
Move the matched estimate to Customer replied, stop pending follow-up messages for it, and task its owner to respond. After the human response, require a new dated action before moving to Decision pending.
A request to stop contact cancels pending customer outreach and routes the owner to record the preference.

### 04 — Outcome and cleanup
Trigger: Opportunity moves to Job booked or Closed / not proceeding.
Set the correct won/lost status. Cancel pending follow-up for that opportunity. Resolve only tasks belonging to this module and estimate.
Store outcome date and reason. Track booked value and collected revenue separately.

## Field mapping to create or reuse
Opportunity fields: external estimate ID, estimate sent date, estimate version, next-action date, last follow-up date, outcome reason.
Use native opportunity assigned user, status, value and contact association.
Installation values: roofer business name, manager/fallback owner, business timezone and hours, approved sending address/number, calendar link.
Keep customer-specific credentials and IDs out of reusable content. Map destination users, pipeline, stages and fields after installation.

## Staff message drafts
Receipt check: “Hi [first name], this is [name] with [roofer]. Did your roofing estimate arrive, and is there anything you would like us to explain?”
Question follow-up: “Is there a question about the scope, materials, timing or payment terms that would help you decide?”
Close the loop: “Would you like us to keep this estimate open, check back on a specific date, or close it for now?”
These are drafts for staff review. Configure working hours and contact preferences before automated delivery.

## Acceptance cases
1. One estimate creates one assigned, dated task.
2. Repeated submission and repeated stage entry do not duplicate the task.
3. Two estimates for one customer retain independent follow-up.
4. A reply stops pending outreach and assigns the correct human.
5. A booked or declined estimate exits follow-up and receives the correct status.
6. A changed next-action date invalidates the old scheduled action.
7. Missing owner, invalid contact details, blocked channel and stop request lead to a visible internal resolution path.
8. A second empty test subaccount imports the selected assets, remaps dependencies, and passes cases 1–7 before customer installation.

## Snapshot packaging
Create the snapshot in Agency View using the source subaccount. Select this pipeline, its fields, module workflows and relevant values/templates explicitly. Import into a test subaccount with workflows inactive, map dependencies, and execute the acceptance cases.
HighLevel source: https://help.gohighlevel.com/support/solutions/articles/48000982512-creating-new-snapshots-in-highlevel

## Website integration findings
Homeowner intake GET reports ready=true. Production variable names include GHL_HOMEOWNER_ENABLED, GHL_LOCATION_ID, GHL_PRIVATE_INTEGRATION_TOKEN and GHL_ASSIGNEE_USER_ID. Values were not exposed.
Existing published workflows include Homeowner Request Review Queue, Homeowner Task Alerts and $500 Pilot Inquiry to Call.
Contractor audit GET reports ready=false. Its handler requires CONTRACTOR_LEAD_ENABLED=true, CONTRACTOR_LEAD_WEBHOOK_URL and TURNSTILE_SECRET_KEY. Those names were absent from the production variable listing.
Next integration step: inspect existing published workflow triggers and actions, then verify a controlled website submission through contact creation and task readback. Resolve the contractor intake destination and bot-check configuration before activation.

## Current blockers
Workflow definition/search API returns WORKFLOW_API_NOT_ENABLED_FOR_LOCATION. Legacy workflow listing and pipeline management work.
Computer-control runtime failed to initialize with “failed to write kernel assets.” Consequently workflow creation, trigger inspection and snapshot export are pending.
Live delivery of a submitted lead is unverified. No new automated customer messages were activated.
