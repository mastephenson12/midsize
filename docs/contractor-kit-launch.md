# Contractor kit launch and follow-up
Status: Kit and ungated access ready; email capture stays hidden until the delivery integration is verified and explicitly enabled.
## GoHighLevel setup after agency reactivation
1. Create a dedicated workflow in the MidSize AI agency's own marketing subaccount, not a client account. Trigger it with an inbound webhook from the dedicated kit endpoint.
2. Map email and firstName; upsert by email to avoid duplicate contacts. Record source, consent text/version/time and tag estimate-follow-up-kit.
3. Exclude unsubscribed/DND contacts from marketing. Do not resubscribe existing opt-outs solely from this webhook. Disable repeated enrollment while active.
4. Immediately email the kit link. Add a working unsubscribe link and verified sender details/address in the platform.
5. Wait two days, send the first-use tip; wait two more days, ask about obstacles; wait three more days, introduce the pilot.
6. Stop the sequence on a reply, unsubscribe, pilot purchase, or staff intervention; notify Mark on replies.
7. Add webhook spam/rate protection in the hosting layer and workflow deduplication. The endpoint has a honeypot and validation, but these alone are not rate limiting.
8. Set CONTRACTOR_KIT_WEBHOOK_URL (and optional CONTRACTOR_KIT_WEBHOOK_KEY) in Vercel. Keep secrets outside source. Set CONTRACTOR_KIT_ENABLED=true only after a controlled end-to-end test confirms contact creation, delivery, unsubscribe, repeat signup, and reply stop behavior.
9. Confirm the signup privacy text reflects the actual provider setup.
## Emails
Use approved sender identity, business address, and platform unsubscribe footer on every email.
### Immediately — Your Roofing Estimate Follow-Up Kit
Hi {{first_name}},
Here is your kit: https://www.midsizeai.com/estimate-follow-up-kit/download/
Start with five open estimates. Assign one owner and one dated next action to each. The page includes the blank tracker, three messages, and the checklist.
Mark
### Day 2 — Try this with five open estimates
Hi {{first_name}},
Choose five estimates your team has already sent. Check the latest reply, name the owner, and record the next useful action. If a customer has replied, answer their question before sending another follow-up.
Kit: https://www.midsizeai.com/estimate-follow-up-kit/download/
Mark
### Day 4 — What makes follow-up difficult?
Hi {{first_name}},
What gets in the way of consistent estimate follow-up: unclear ownership, not knowing what to say, or finding time?
Reply with the main obstacle. I read the replies.
Mark
### Day 7 — Want help putting the kit into practice?
Hi {{first_name}},
If your roofing team wants hands-on help, the $500, 14-day pilot includes a tracker, three personalized messages, kickoff, midpoint check-in, and a closing review.
Your team reviews and sends customer messages. There is no automatic renewal.
Details: https://www.midsizeai.com/estimate-follow-up-pilot/
We confirm scope, availability, and payment terms before payment.
Mark
## Measurement
Record landing visits, signups accepted, email deliveries, replies, pilot inquiries, invoices paid, delivery hours, and delivery costs. Never count a submitted form as a sale.
