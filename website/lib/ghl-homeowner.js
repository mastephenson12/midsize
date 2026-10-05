import { createHash } from 'node:crypto';

export function ghlConfigured(env=process.env) {
  return env.GHL_HOMEOWNER_ENABLED === 'true' && Boolean(env.GHL_PRIVATE_INTEGRATION_TOKEN && env.GHL_LOCATION_ID);
}

// Server-only: no estimate text, files, marketing messages or DND changes.
export async function deliverToGhl(lead, {env=process.env, fetchImpl=fetch, now=new Date()}={}) {
  if(!ghlConfigured(env)) throw new Error('GHL configuration incomplete');
  const request = async(path,method='GET',body) => {
    const response=await fetchImpl('https://services.leadconnectorhq.com'+path,{
      method, headers:{Authorization:`Bearer ${env.GHL_PRIVATE_INTEGRATION_TOKEN}`,Version:'v3','Content-Type':'application/json'},
      ...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(8000),
    });
    if(!response.ok) throw new Error(`GHL ${method} failed (${response.status})`);
    return response.json();
  };
  const contactBody={locationId:env.GHL_LOCATION_ID,name:lead.name,email:lead.email,postalCode:lead.zip};
  if(lead.phone)contactBody.phone=lead.phone;
  const created=await request('/contacts/upsert','POST',contactBody);
  const contact=created.contact;
  if(!contact?.id || (contact.locationId && contact.locationId!==env.GHL_LOCATION_ID)) throw new Error('GHL returned an unexpected contact');
  const base='/contacts/'+encodeURIComponent(contact.id);
  const marker='MidSize request '+createHash('sha256').update(JSON.stringify([lead.email,lead.requestId||now.toISOString().slice(0,10),lead.situation,lead.roofType,lead.timeline,lead.microApp])).digest('hex').slice(0,24);
  const existing=await request(base+'/tasks');
  if(!Array.isArray(existing.tasks))throw new Error('GHL task list unavailable');
  if(existing.tasks.some(task=>String(task.body||'').includes(marker)))return {ok:true};
  const urgent=lead.timeline==='Emergency / active leak';
  const labels={'second-opinion':'Second opinion','another-estimate':'Another estimate','find-roofer':'Find a roofer','roofer-contact':'Roofer contact'};
  const body=[marker,`Received: ${lead.submittedAt}`,`Source: ${lead.source}`,`Request: ${labels[lead.situation]||lead.situation}`,`ZIP: ${lead.zip}`,`Roof: ${lead.roofType||'Not specified'}`,`Timeline: ${lead.timeline||'Not specified'}`,`Tool result: ${lead.appResult||'Not specified'}`,`Consent version: ${lead.consentVersion}`,`Consent: ${lead.consentText}`,'No estimate document or estimate text was transmitted.','Follow up about this request only. Respect existing do-not-contact preferences. No marketing text consent was collected.'].join('\n');
  const task=await request(base+'/tasks','POST',{
    title:`${urgent?'URGENT — ':''}Homeowner: ${labels[lead.situation]||'Follow up'}`,
    body,completed:false,dueDate:new Date(now.getTime()+(urgent?0:24*60*60*1000)).toISOString(),
    ...(env.GHL_ASSIGNEE_USER_ID?{assignedTo:env.GHL_ASSIGNEE_USER_ID}:{}),
  });
  if(!task.task?.id)throw new Error('GHL task was not confirmed');
  return {ok:true};
}
