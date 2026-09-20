import crypto from 'node:crypto';

const ALLOWED_SCORES = new Set([0, 25, 50, 75, 100]);
const STAGES = ['missed', 'speed', 'estimate', 'noshow', 'reviews'];
const STAGE_NAMES = {
  missed: 'Missed-call recovery',
  speed: 'Speed-to-lead',
  estimate: 'Estimate follow-up',
  noshow: 'No-show recovery',
  reviews: 'Review and referral follow-up',
};
const PRODUCTION_ORIGINS = new Set([
  'https://midsizeai.com',
  'https://www.midsizeai.com',
  'https://roofers.midsizeai.com',
]);

function clean(value, max = 120) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPhone(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

function allowedOrigins() {
  const configured = String(process.env.CONTRACTOR_LEAD_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return new Set([...PRODUCTION_ORIGINS, ...configured]);
}

async function verifyTurnstile(token, remoteip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;
  const form = new URLSearchParams({ secret, response: token });
  if (remoteip) form.set('remoteip', remoteip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return false;
  const result = await response.json().catch(() => ({}));
  return result.success === true;
}

function calculateAudit(stageScores) {
  const scores = {};
  for (const stage of STAGES) {
    const score = Number(stageScores?.[stage]);
    if (!ALLOWED_SCORES.has(score)) throw new Error('invalid_scores');
    scores[stage] = score;
  }
  const auditScore = Math.round(STAGES.reduce((sum, stage) => sum + scores[stage], 0) / STAGES.length);
  const weakestStage = [...STAGES].sort((a, b) => scores[a] - scores[b])[0];
  return { scores, auditScore, weakestStage };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const ready =
    process.env.CONTRACTOR_LEAD_ENABLED === 'true' &&
    Boolean(process.env.CONTRACTOR_LEAD_WEBHOOK_URL) &&
    Boolean(process.env.TURNSTILE_SECRET_KEY);

  if (req.method === 'GET') return res.status(200).json({ ready });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }
  if (!ready) return res.status(503).json({ ok: false, error: 'Follow-up review requests are temporarily unavailable.' });

  try {
    const origin = clean(req.headers?.origin, 240);
    if (!allowedOrigins().has(origin)) return res.status(403).json({ ok: false, error: 'Request origin not allowed.' });
    if (!String(req.headers?.['content-type'] || '').includes('application/json')) {
      return res.status(415).json({ ok: false, error: 'Unsupported request format.' });
    }
    if (typeof req.body === 'string' && req.body.length > 8192) {
      return res.status(413).json({ ok: false, error: 'Request too large.' });
    }

    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid request.' });
    }
    if (!body || typeof body !== 'object' || body.companyWebsite) {
      return res.status(400).json({ ok: false, error: 'Unable to process this request.' });
    }

    const formLoadedAt = Number(body.formLoadedAt);
    const elapsed = Date.now() - formLoadedAt;
    if (!Number.isFinite(formLoadedAt) || elapsed < 3000 || elapsed > 86400000) {
      return res.status(400).json({ ok: false, error: 'Please reload the form and try again.' });
    }

    const firstName = clean(body.firstName, 80);
    const lastName = clean(body.lastName, 80);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 40);
    const company = clean(body.company, 120);
    const trade = clean(body.trade, 80);
    if (!firstName || !company || !trade || !validEmail(email) || !validPhone(phone) || body.consent !== true) {
      return res.status(400).json({ ok: false, error: 'Please complete every required field and confirm permission.' });
    }

    const remoteip = clean(req.headers?.['x-forwarded-for']?.split(',')[0], 64);
    if (!(await verifyTurnstile(clean(body.turnstileToken, 2048), remoteip))) {
      return res.status(403).json({ ok: false, error: 'Verification failed. Please try again.' });
    }

    const { scores, auditScore, weakestStage } = calculateAudit(body.stageScores);
    const submittedAt = new Date().toISOString();
    const idempotencyKey = crypto
      .createHash('sha256')
      .update([email, phone.replace(/\D/g, ''), trade, auditScore, submittedAt.slice(0, 13)].join('|'))
      .digest('hex');

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      company,
      trade,
      source: 'follow-up-leak-audit',
      tags: ['follow-up-leak-audit', 'contractor-lead', trade.toLowerCase().replace(/[^a-z0-9]+/g, '-')],
      pipelineStage: 'new-follow-up-review',
      opportunityName: `${company} - Follow-Up Leak Audit`,
      auditScore,
      weakestStage,
      weakestStageLabel: STAGE_NAMES[weakestStage],
      stageScores: scores,
      consent: true,
      consentText: 'Contact me about my Follow-Up Leak Audit and practical follow-up improvements.',
      consentVersion: '2026-09-20',
      submittedAt,
      pageUrl: clean(body.pageUrl, 500),
      utmSource: clean(body.utmSource, 100),
      utmMedium: clean(body.utmMedium, 100),
      utmCampaign: clean(body.utmCampaign, 100),
    };

    const response = await fetch(process.env.CONTRACTOR_LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
        ...(process.env.CONTRACTOR_LEAD_WEBHOOK_KEY
          ? { 'x-api-key': process.env.CONTRACTOR_LEAD_WEBHOOK_KEY }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error('Contractor lead webhook rejected request', response.status);
      return res.status(502).json({ ok: false, error: 'We could not save your request. Please try again.' });
    }

    return res.status(200).json({ ok: true, auditScore, weakestStage });
  } catch (error) {
    if (error instanceof Error && error.message === 'invalid_scores') {
      return res.status(400).json({ ok: false, error: 'Audit scores are invalid.' });
    }
    console.error('Contractor lead delivery failed', error instanceof Error ? error.message : error);
    return res.status(502).json({ ok: false, error: 'We could not save your request. Please try again.' });
  }
}

export { calculateAudit };
