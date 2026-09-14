const allowedSources = new Set(['missed-lead-calculator']);

function cleanNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.min(max, Math.max(min, number));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const name = String(body.name || '').trim().slice(0, 120);
    const email = String(body.email || '').trim().toLowerCase().slice(0, 254);
    const company = String(body.company || '').trim().slice(0, 160);
    const source = String(body.source || '').trim();
    const consent = body.consent === true;
    const monthlyLeads = cleanNumber(body.monthlyLeads, 0, 100000);
    const averageJobValue = cleanNumber(body.averageJobValue, 0, 10000000);
    const missedLeadRate = cleanNumber(body.missedLeadRate, 0, 100);
    const closeRate = cleanNumber(body.closeRate, 0, 100);
    const monthlyOpportunity = cleanNumber(body.monthlyOpportunity, 0, 100000000000);

    if (!name || !email || !company || !consent || !allowedSources.has(source)) {
      return res.status(400).json({ ok: false, error: 'Please complete the required fields and consent.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    if ([monthlyLeads, averageJobValue, missedLeadRate, closeRate, monthlyOpportunity].some((value) => value === null)) {
      return res.status(400).json({ ok: false, error: 'Please check the calculator values and try again.' });
    }

    const payload = {
      source: 'midsizeai-missed-lead-calculator',
      submittedAt: new Date().toISOString(),
      audience: 'contractor',
      name,
      email,
      company,
      consent: true,
      calculator: {
        monthlyLeads,
        averageJobValue,
        missedLeadRate,
        closeRate,
        monthlyOpportunity,
      },
      requestedResource: 'personalized-missed-lead-recovery-plan',
      nextAction: 'offer-follow-up-leak-audit',
    };

    const webhookUrl = process.env.CONTRACTOR_LEAD_WEBHOOK_URL;
    const apiKey = process.env.MAKE_WEBHOOK_API_KEY;

    if (!webhookUrl) {
      console.error('CONTRACTOR_LEAD_WEBHOOK_URL is not configured');
      return res.status(503).json({ ok: false, error: 'Email delivery is being connected. Your plan is still available below.' });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(apiKey ? { 'x-api-key': apiKey } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Contractor lead webhook returned', response.status);
      return res.status(502).json({ ok: false, error: 'We could not email the plan. It is still available below.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('contractor-lead error', error);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Your plan is still available below.' });
  }
}
