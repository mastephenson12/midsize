# Homeowner Resource Hub — Next Steps

Work these in order. Keep each change small enough to commit separately.

## 1. Review the starter hub

Files:
- `website/src/HomeownerApp.jsx`
- `website/src/main.jsx`

Preview locally with the homeowner query string if the subdomain is not connected yet:

`?site=homeowner`

Check the page on mobile first.

## 2. Replace generic copy with real homeowner questions

In `HomeownerApp.jsx`, expand the resources around questions real homeowners ask:

- How much should my roof cost?
- Should I repair or replace my roof?
- How old is too old for a roof?
- How do I compare roofing estimates?
- What should be included in a roofing estimate?
- What questions should I ask a roofer?
- What roofing warranties matter?
- What happens if damaged decking is found?
- How do I know whether storm damage is urgent?
- How many roofing estimates should I get?

Do not create ten pages at once. Add one useful section or page at a time.

## 3. Build the estimate comparison tool

Turn the static estimate checklist into an interactive comparison tool.

Suggested first version:
- Estimate A contractor name
- Estimate A price
- Estimate B contractor name
- Estimate B price
- Checkbox rows for material, tear-off, underlayment, flashing, ventilation, decking terms, permits, cleanup, workmanship warranty, manufacturer warranty, payment schedule, exclusions
- Show missing items for each estimate
- Do not declare a contractor a winner based only on price

Suggested component:

`website/src/EstimateComparison.jsx`

## 4. Build a repair-or-replace decision helper

Suggested inputs:
- Roof age
- Material type
- Number of known leaks
- Repeat leak at same location?
- Visible storm damage?
- Widespread deterioration?
- Known decking damage?

Output should be educational, such as:
- Start with a repair inspection
- Get both repair and replacement options
- Replacement conversation is reasonable

Never present the result as a professional inspection or guarantee.

Suggested component:

`website/src/RepairReplaceGuide.jsx`

## 5. Add homeowner FAQ content

Add concise answers to common questions. Prioritize usefulness over keyword stuffing.

Each answer should include a useful next step where appropriate.

## 6. Add trust and editorial transparency

Add a small section explaining:
- who MidSize AI is
- why the homeowner resource exists
- that education is separate from contractor sales claims
- estimates are planning ranges only
- local codes, labor, materials, roof condition, and market pricing vary

## 7. Connect the subdomain

Target:

`homeowner.midsizeai.com`

The React router already recognizes this hostname on the starter branch.

Do not change DNS casually from a work computer. Confirm the correct Vercel project before connecting the domain.

## 8. Test every CTA

Verify:
- estimator link works
- internal anchors work
- page is readable on a phone
- buttons are large enough to tap
- no horizontal scrolling
- logo loads
- page still works with JavaScript console free of obvious errors

## 9. Commit pattern

Use small commits such as:

- `add estimate comparison UI`
- `add repair replace helper`
- `expand homeowner FAQ`
- `improve homeowner mobile spacing`
- `add homeowner trust section`

Small commits are much easier to undo than one heroic 2,700-line mystery commit.

## Definition of useful

Before adding anything, ask:

> Does this help a homeowner make a better decision before, during, or after talking to a contractor?

If not, put it in the parking lot instead of the page.
