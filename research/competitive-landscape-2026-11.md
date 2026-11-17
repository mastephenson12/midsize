# MidSizeAI Competitive Research & Test Backlog
Updated: 2026-11-17
Status: Research and proposed experiments. Not approved claims or launched features.

## Positioning
MidSizeAI should connect homeowner confidence with contractor responsiveness. Avoid claiming to independently certify roofers or guarantee estimates, insurance outcomes, or savings. Separate homeowner education from any paid referral relationship and disclose lead routing.

## Roofing software and marketing benchmarks
| Competitor | Capability / positioning | What to test for MidSizeAI | Source |
|---|---|---|---|
| Roofr | Roof measurement, CRM, instant estimator, proposals, invoicing; announced AI receptionist Oct 2026 | Clear connected journey and status visibility rather than copy full CRM | https://roofr.com/crm ; https://roofr.com/blog/roofr-announces-new-ai-receptionist-and-more-at-roofr-builds-fall-2026 |
| JobNimbus | Roofing sales and production CRM, follow-up and financing | Lead-to-inspection pipeline and quote follow-up templates | https://www.jobnimbus.com/industries/roofing-software |
| Roofle | Contractor-owned instant quote tool, financing and CRM integration | Transparent estimate expectations and explanation of preliminary vs final quotes | https://win.roofle.com/faqs |
| AccuLynx | Roofing operational CRM and insurance workflows | Claim-document organization and practical homeowner updates, not claim-adjuster promises | https://www.capterra.com/roofing-software/ |
| Hatch / Sameday AI / Avoca | AI-driven phone intake and lead follow-up | Roofing-specific emergency-vs-routine intake and consent-aware recovery of missed inquiries | https://www.ansovo.com/trades/roofers |

## Homeowner benchmarks
| Competitor | Notable experience | What to test for MidSizeAI | Source |
|---|---|---|---|
| RoofVista | Price planning plus side-by-side roof proposals | Compare scope, warranty and exclusions, not only totals | https://roofvista.com/ |
| CostSquared | Local cost calculators and AI quote decoder | Plain-English explanations and limitations of benchmark prices | https://www.costsquared.com/ |
| EstimateHawk | Extracted bid items, insurance scope review and confidence signals | Visible confidence and missing-information markers | https://estimatehawk.com/for/roofing/ |
| BidWise | Compare 2–5 contractor bids | Multi-bid view with unanswered questions for each roofer | https://bidwise.report/ |
| Frankly | Independent roof-estimate review for homeowners | 'What should I ask my roofer?' output, without implying professional inspections | https://franklyconsulting.com/ |
| Angi | Contractor discovery, reviews and quote requests | Clear privacy and explicit opt-in before sharing homeowner contact data | https://www.angi.com/ |

## Language signals from public discussions (anecdotal, not representative)
- Homeowner: "the price difference is insane"; uncertainty about flashing, tear-off, materials and warranties. https://www.reddit.com/r/Roofing/comments/1sgwqn0/getting_roof_quotes_and_the_price_difference_is/
- Homeowner: "Is the cheaper quote comparable to the other?" https://www.reddit.com/r/Roofing/comments/1rco2st/comparing_two_quotes_for_roof_replacement/
- Contractor: "Calls got missed while the crew was up on a roof." Anecdotal promotional post, not verified outcome evidence. https://www.reddit.com/r/AiAutomations/comments/1xhidzb/breakdown_of_the_follow_up_system_we_built_for_a/

## Experiments (prioritized)
### E1. Homeowner Compare Two Estimates
Hypothesis: a side-by-side view of scope, materials, warranty, exclusions, and open questions increases useful Estimate Decoder completions.
MVP: Upload or paste two estimates; normalize categories; distinguish absent vs unclear vs included; identify quote-specific questions. Never declare a contractor best or claim guaranteed fair price.
Metrics: started comparisons; completed comparisons; report downloads; optional consented quote-help requests.
Privacy: redact PII by default; avoid persistent document storage without explicit consent.

### E2. Roofer Missed Lead Recovery Audit
Hypothesis: concrete missed-call and response-time examples convert better than 'AI automation'.
MVP: Free calculator/audit with examples and a consent-compliant demo of after-hours triage.
Metrics: audit starts/completions; qualified demo bookings; average response time when connected.
Guardrail: no unconsented promotional SMS or invented ROI.

### E3. Bid Follow-Up Assistant
Hypothesis: transparent, polite estimate follow-up improves booking rates without pressuring homeowners.
MVP: Roofers can send an opt-in follow-up with project-specific answers, status link, and clear unsubscribe where required.
Metrics: reply rates, appointment conversions, complaint/unsubscribe rate.

### E4. Educational pages based on actual questions
- Why are two roofing quotes so different?
- What does a roofing estimate usually leave out?
- Repair or replace? What a homeowner should ask.
- Insurance claim scope vs roofer quote: why they can differ.
Each page should connect to a single matching MidSizeAI tool.

## 14-day validation plan
1. Verify production route of the new Roofing Estimate Checklist and add its link to the Homeowner Trust Center.
2. Confirm GA4 or Vercel Analytics is loaded and click events actually arrive. Existing event hooks alone do not prove tracking works.
3. Publish and measure one homeowner message: 'Two roof quotes. Same roof. Why the different prices?'
4. Publish and measure one roofer message: 'How many estimates go quiet after you send them?'
5. Review qualitative comments and opt-in funnel counts; choose E1 or E2 for next build based on demand.

## Cautions
- Roofing prices depend on location, materials, scope, roof geometry, and unforeseen repairs. No guaranteed fair-price verdict.
- Insurance coverage, permits, licensing, and contractor compliance depend on jurisdiction and policy specifics.
- Consumer advocacy must not be represented as independent if partner recommendations create a material financial relationship without clear disclosure.
- Competitor features can change; verify again before public comparisons.
