import { ghlConfigured, deliverToGhl } from '../lib/ghl-homeowner.js';
const allowedSituations = new Set(['second-opinion','another-estimate','find-roofer','roofer-contact']);
const allowedTools = new Set(['estimate-decoder', 'roof-repair-or-replace']);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const directGhl = process.env.GHL_HOMEOWNER_ENABLED === 'true';
  if (req.method === 'GET') return res.status(200).json({ ready: directGhl ? ghlConfigured() : Boolean(process.env.HOMEOWNER_LEAD_WEBHOOK_URL) });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
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
    const score = body.score !== null && body.score !== undefined && body.score !== '' && Number.isFinite(Number(body.score)) ? Math.max(0, Math.min(100, Number(body.score))) : null;
    const tool = String(body.tool || 'estimate-decoder').trim();
    const result = String(body.result || '').trim().slice(0, 80);
    const urgency = String(body.urgency || '').trim().slice(0, 80);

    if (!name || !email || !zip || !allowedSituations.has(situation) || !allowedTools.has(tool) || !consent) {
      return res.status(400).json({ ok: false, error: 'Please complete the required fields and consent.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    const requestId = /^[a-zA-Z0-9-]{16,64}$/.test(String(body.requestId||'')) ? body.requestId : undefined;
    const payload = {
      source: `honest-roofer-${tool}`,
      submittedAt: new Date().toISOString(),
      name,
      email,
      phone,
      zip,
      situation,
      roofType,
      timeline,
      decoderScore: score,
      microApp: tool,
      appResult: result,
      urgency,
      consentText: "I agree that The Honest Roofer / MidSizeAI may contact me about this request and may share my request details with a participating roofing professional when necessary to help fulfill it. I am not agreeing to marketing texts by checking this box.",
      consentVersion: "2026-10-03",
      consent: true
    };

    if(directGhl){
      if(!ghlConfigured())return res.status(503).json({ok:false,error:'Follow-up is temporarily unavailable. Please email mark@midsizeai.com.'});
      try {
        await deliverToGhl({...payload,requestId});
        return res.status(200).json({ok:true});
      } catch {
        console.error('GHL homeowner intake did not complete');
        return res.status(502).json({ok:false,error:'We could not confirm your follow-up task. Please try again or email mark@midsizeai.com.'});
      }
    }
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
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Lead webhook returned', response.status);
      return res.status(502).json({ ok: false, error: 'We could not send your request. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('homeowner-lead request failed');
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
  }
}
