import test from 'node:test';
import assert from 'node:assert/strict';
import handler, { calculateAudit } from '../api/contractor-lead.js';

const scores = { missed: 0, speed: 25, estimate: 50, noshow: 75, reviews: 100 };
const valid = {
  firstName: 'Alex',
  lastName: 'Rivera',
  email: 'alex@example.com',
  phone: '(602) 555-0123',
  company: 'Arizona Roofing Co',
  trade: 'Roofing',
  stageScores: scores,
  consent: true,
  companyWebsite: '',
  formLoadedAt: Date.now() - 5000,
  turnstileToken: 'verified-token',
  pageUrl: 'https://www.midsizeai.com/resources/follow-up-leak-audit/',
};

async function call(method, body, headers = {}) {
  const res = {
    headers: {},
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.code = code; return this; },
    json(data) { this.data = data; return this; },
  };
  await handler({
    method,
    body,
    headers: {
      origin: 'https://www.midsizeai.com',
      'content-type': 'application/json',
      'x-forwarded-for': '203.0.113.10',
      ...headers,
    },
  }, res);
  return res;
}

test('recalculates the audit score and weakest stage server-side', () => {
  assert.deepEqual(calculateAudit(scores), {
    scores,
    auditScore: 50,
    weakestStage: 'missed',
  });
  assert.throws(() => calculateAudit({ ...scores, missed: 12 }), /invalid_scores/);
});

test('fails closed until webhook and bot verification are configured', async () => {
  const previous = { ...process.env };
  try {
    delete process.env.CONTRACTOR_LEAD_ENABLED;
    delete process.env.CONTRACTOR_LEAD_WEBHOOK_URL;
    delete process.env.TURNSTILE_SECRET_KEY;
    assert.equal((await call('GET')).data.ready, false);
    assert.equal((await call('POST', valid)).code, 503);
  } finally {
    process.env = previous;
  }
});

test('validates, verifies and forwards a normalized CRM payload', async () => {
  const previous = { ...process.env };
  const originalFetch = global.fetch;
  try {
    process.env.CONTRACTOR_LEAD_ENABLED = 'true';
    process.env.CONTRACTOR_LEAD_WEBHOOK_URL = 'https://example.com/ghl';
    process.env.TURNSTILE_SECRET_KEY = 'turnstile-secret';

    let sent;
    global.fetch = async (url, options) => {
      if (String(url).includes('turnstile')) return { ok: true, json: async () => ({ success: true }) };
      sent = { url, options, body: JSON.parse(options.body) };
      return { ok: true };
    };

    assert.equal((await call('POST', { ...valid, email: 'bad' })).code, 400);
    assert.equal((await call('POST', { ...valid, companyWebsite: 'spam' })).code, 400);
    assert.equal((await call('POST', valid, { origin: 'https://evil.example' })).code, 403);

    const response = await call('POST', valid);
    assert.equal(response.code, 200);
    assert.equal(sent.body.auditScore, 50);
    assert.equal(sent.body.weakestStage, 'missed');
    assert.equal(sent.body.source, 'follow-up-leak-audit');
    assert.deepEqual(sent.body.tags.slice(0, 2), ['follow-up-leak-audit', 'contractor-lead']);
    assert.ok(sent.options.headers['Idempotency-Key']);
    assert.equal(sent.body.consent, true);
  } finally {
    global.fetch = originalFetch;
    process.env = previous;
  }
});
