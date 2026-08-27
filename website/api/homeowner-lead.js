const allowedSituations = new Set(['second-opinion','another-estimate','find-roofer','roofer-contact']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const name = String(body.name || '').trim().slice(0, 120);
    const email = String(body.email || '').trim().toLowerCase().slice(0, 254);
    const phone = String(body.phone || '').trim().slice(0, 40);
    const zip = String(body.zip || '').trim().slice(0, 12);
    const situation = String(body.situation || '').trim();
    const roofType = String(body.roofType || '').trim().slice(0, 80);
    const timeline = String(body.timeline || '').trim().slice(0, 80);
    const consent = body.consent === true;
    const score = Number.isFinite(Number(body.score)) ? Math.max(0, Math.min(100, Number(body.score))) : null;

    if (!name || !email || !zip || !allowedSituations.has(situation) || !consent) {
      return res.status(400).json({ ok: false, error: 'Please complete the required fields and consent.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    const payload = {
      source: 'honest-roofer-estimate-decoder',
      submittedAt: new Date().toISOString(),
      name,
      email,
      phone,
      zip,
      situation,
      roofType,
      timeline,
      decoderScore: score,
      consent: true
    };

    const webhookUrl = process.env.HOMEOWNER_LEAD_WEBHOOK_URL;
    const apiKey = process.env.MAKE_WEBHOOK_API_KEY;

    if (!webhookUrl) {
      console.error('HOMEOWNER_LEAD_WEBHOOK_URL is not configured');
      return res.status(503).json({ ok: false, error: 'Lead routing is being connected. Please email mark@midsizeai.com for now.' });
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
      console.error('Lead webhook returned', response.status);
      return res.status(502).json({ ok: false, error: 'We could not send your request. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('homeowner-lead error', error);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
  }
}
