# Estimate evaluator improvements

- Put price and payment wording concerns first, with quoted evidence and questions. Identify missing labeled totals, multiple totals, conditional extras, and apparent advance full-payment wording. Amounts alone do not establish a project total.
- Support up to 10 files from one estimate (15 MB each, 30 MB per batch), with an explicit append option. Keep previous text if any file fails. Cancel stale uploads when the user edits, clears, or selects the sample.
- Bundle PDF.js 6.4.299. Limit PDFs to 30 pages and reject partially unreadable PDFs instead of silently omitting scanned pages. Users can supply photos or pasted text for those pages.
- Require review of extracted text before evaluation. Low OCR confidence prompts correction. Files and estimate text remain in the browser.

Validation: 22 automated tests; production build; browser checks using synthetic selectable PDF and PNG estimate, review gating, payment/extra-charge output, and phone-width overflow check. Real phone camera captures, severely blurred images, and native download/print dialogs were not tested. The checker is deterministic and does not judge price fairness or contract validity.
