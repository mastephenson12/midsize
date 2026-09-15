const consentText = 'Email me this kit and practical follow-up tips from MidSize AI. I can unsubscribe anytime.';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const ready=process.env.CONTRACTOR_KIT_ENABLED==='true' && Boolean(process.env.CONTRACTOR_KIT_WEBHOOK_URL);
 if(req.method==='GET') return res.status(200).json({ready});
 if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return res.status(405).json({ok:false,error:'Method not allowed'});}
 if(!ready)return res.status(503).json({ok:false,error:'Signup is temporarily unavailable.'});
 try{
  if(!String(req.headers?.['content-type']||'').includes('application/json'))return res.status(415).json({ok:false,error:'Unsupported request format.'});
  if(typeof req.body==='string'&&req.body.length>4096)return res.status(413).json({ok:false,error:'Request too large.'});
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return res.status(400).json({ok:false,error:'Invalid request.'});}
  if(!body||typeof body!=='object')return res.status(400).json({ok:false,error:'Invalid request.'});
  if(body.companyWebsite)return res.status(400).json({ok:false,error:'Unable to process this request.'});
  const firstName=typeof body.firstName==='string'?body.firstName.trim():'';
  const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
  if(!firstName||firstName.length>80||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||body.consent!==true)return res.status(400).json({ok:false,error:'Please enter your first name, valid email, and email permission.'});
  const response=await fetch(process.env.CONTRACTOR_KIT_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.CONTRACTOR_KIT_WEBHOOK_KEY?{'x-api-key':process.env.CONTRACTOR_KIT_WEBHOOK_KEY}:{})},body:JSON.stringify({firstName,email,source:'estimate-follow-up-kit',tag:'estimate-follow-up-kit',consent:true,consentText,consentVersion:'2026-09-15',submittedAt:new Date().toISOString(),kitUrl:'https://www.midsizeai.com/estimate-follow-up-kit/download/',referrer:String(body.referrer||'website').slice(0,100)}),signal:AbortSignal.timeout(10000)});
  if(!response.ok)return res.status(502).json({ok:false,error:'We could not save your request. Please try again.'});
  return res.status(200).json({ok:true});
 }catch{return res.status(502).json({ok:false,error:'We could not save your request. Please try again.'});}
}
