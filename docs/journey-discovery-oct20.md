# Discovery and next-step repair — October 20, 2026

Status: prepared for review; production unchanged.

## Problem and scope
Homeowner estimate CTAs sent visitors to an introductory page and a separate estimator domain despite a working same-domain decoder. The decoder was absent from the main sitemap. Homepage metadata described only contractor services despite its homeowner-first hero. Roofers had a missed-lead calculator but no prominent route to the broader Follow-Up Leak Audit.

## Changes
- Homepage estimate links now go directly to /estimate-decoder/.
- Existing /roofing-estimate-review/ links now reach that same tool, preserving the existing page URL.
- Tool title and resource card use the agreed Roofing Quote Checker / Estimate Decoder naming.
- Homepage search/social descriptions cover both homeowner tools and roofer systems.
- Main sitemap includes the decoder; removes the contractor page alias whose canonical is roofers.midsizeai.com and the client kickoff page. The canonical roofer homepage remains in its own sitemap.
- Roofer hero includes the existing free Follow-Up Leak Audit as a diagnostic alternative. Service links use customer-facing wording.

## Dependencies and customer impact
No new integrations. Existing decoder, calculator, audit and application paths remain in use. No backend, consent, communication or booking configuration changed. Changes remove intermediate homeowner clicks and clarify existing choices. No claim that contractor follow-up or Make delivery is verified.

## Verification
npm test: 25 passed. npm run build: passed. React server-render checks passed for direct homeowner links, agreed name, roofer audit link and calculator anchor. Sitemap parsed as XML. Direct production HTML retrieval confirmed /estimate-decoder/ exists and serves the estimate UI before changes. No customer forms submitted or messages sent. No visual browser or production post-deploy test performed.

Search visibility baseline remains unknown: GSC Wizard list_sites refused access due to expired trial/no active subscription. Public search lookup returned no results; that is not proof of deindexing. Search retrieval could not open the site, but direct HTTP retrieval returned 200; do not describe it as an outage.

## Next steps
After approval, merge and verify production links on mobile/desktop. Use Search Console directly to inspect the homepage, decoder, roofer homepage and audit; submit the production sitemap after deployment. Then test the existing contractor intake draft with designated test details and verify the intended acknowledgment/owner/opportunity. Preserve the unpublished v2 workflow until tested.

## Rollback
Revert this PR commit. No CRM or environment rollback required.
