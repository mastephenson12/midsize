const allowedTrades = new Set(['roofing', 'hvac', 'plumbing', 'electrical', 'remodeling', 'other']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const email = String(body.email || '').trim().toLowerCase().slice(0, 254);
    const trade = String(body.trade || '').trim().toLowerCase();
    const monthlyLeads = Number(body.monthlyLeads);
    const averageJobValue = Number(body.averageJobValue);
    const missedLeadRate = Number(body.missedLeadRate);
    const closeRate = Number(body.closeRate);
    const monthlyRevenue = Number(body.monthlyRevenue);
    const annualRevenue = Number(body.annualRevenue);
    const consent = body.consent === true;

    if (!email || !allowedTrades.has(trade) || !consent) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email and confirm you want the report sent.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    const numericFields = [monthlyLeads, averageJobValue, missedLeadRate, closeRate, monthlyRevenue, annualRevenue];
    if (numericFields.some((value) => !Number.isFinite(value) || value < 0)) {
      return res.status(400).json({ ok: false, error: 'Calculator values are invalid.' });
    }

    const payload = {
      source: 'midsizeai-missed-lead-calculator',
      submittedAt: new Date().toISOString(),
      email,
      trade,
      monthlyLeads,
      averageJobValue,
      missedLeadRate,
      closeRate,
      monthlyRevenue,
      annualRevenue,
      consent: true
    };

    const webhookUrl = process.env.CONTRACTOR_LEAD_WEBHOOK_URL || process.env.HOMEOWNER_LEAD_WEBHOOK_URL;
    const apiKey = process.env.MAKE_WEBHOOK_API_KEY;

    if (!webhookUrl) {
      console.error('CONTRACTOR_LEAD_WEBHOOK_URL is not configured');
      return res.status(503).json({ ok: false, error: 'Report delivery is being connected. Your calculator result is still available on this page.' });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(apiKey ? { 'x-api-key': apiKey } : {})
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Contractor lead webhook returned', response.status);
      return res.status(502).json({ ok: false, error: 'We could not send the report. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('contractor-calculator-lead error', error);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
  }
}
