// Optional server-only alert, sent only after the request destination accepts intake.
export async function notifyHomeownerRequest(lead, {env=process.env, fetchImpl=fetch}={}) {
  const endpoint=env.HOMEOWNER_ALERT_WEBHOOK_URL;
  if(!endpoint)return {sent:false};
  try {
    const url=new URL(endpoint);
    if(url.protocol!=='https:'||url.hostname!=='services.leadconnectorhq.com'||!url.pathname.startsWith('/hooks/'))throw new Error('Invalid alert endpoint');
    // Explicit allowlist excludes estimate text, documents, phone and consent details.
    const payload=Object.fromEntries(['requestId','name','email','source','situation','zip','contactMethod','routingStatus','rooferAssigned','submittedAt'].map(key=>[key,lead[key]]));
    const response=await fetchImpl(url.toString(),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(5000)});
    if(!response.ok)throw new Error('Alert rejected');
    return {sent:true};
  } catch {
    console.error('Homeowner alert not confirmed; intake task remains available');
    return {sent:false};
  }
}
