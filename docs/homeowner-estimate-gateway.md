# Homeowner estimate gateway

The existing /estimate-decoder/ route now evaluates roofing wording without a quality score. Replacement and repair contexts use different topic expectations. Each topic shows quoted evidence, or says no matching wording was found; exclusion/condition wording is sent to clarification. This remains a deterministic local text check, not an LLM, price appraisal or verification of scope.

Homeowner flow: MidSize homepage banner/resources → private estimate evaluation → download/copy questions → optional existing homeowner help request. No email gate. Files and extracted text stay in the browser; downloaded reports include quoted text. PDF.js is updated to 6.3.289, uses a module worker, disables evaluation, and limits PDFs to 30 pages. OCR uses the existing browser-only Tesseract reader. Readers download from a CDN and need a network connection.

/api/homeowner-lead GET exposes only configuration readiness. A configured webhook is not proof of delivery, and real delivery must be tested with a designated test contact before publishing. The existing explicit-consent POST sends contact/request fields only, never estimate text/file, and now records the consent version and text. The retired numeric score remains null. Failed delivery cannot show success.

Validation: 15 Node tests and Vite build pass. Preview browser QA follows in the PR. No production release or real lead submission is part of this change.

Hosted preview QA: sample evaluation, exclusion wording, 390px mobile layout, and synthetic one-page PDF extraction passed. Preview follow-up readiness returns unavailable; no lead was submitted. Report generation is covered by unit tests; native download/print dialogs and image OCR still need a standard-browser release check.
