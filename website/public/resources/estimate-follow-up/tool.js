const get = id => document.getElementById(id);
function generate(){
 const customer=get('customer').value.trim()||'[customer name]';
 const company=get('company').value.trim()||'[your name and company]';
 const project=get('project').value.trim()||'[project description]';
 const messages={first:'I wanted to check that you received the estimate for '+project+'. Is there anything in the scope you would like me to explain?',questions:'Do you have any questions about the estimate for '+project+'? I can walk through what is included, the exclusions, or the proposed next steps so you can compare your options.',close:'I am closing the loop on the estimate for '+project+'. If your plans have changed or you would prefer no further follow-up, just let me know. If you still have questions, I am happy to help.'};
 get('draft').value='Hi '+customer+', this is '+company+'. '+messages[get('stage').value];get('status').textContent='Draft ready. Review and edit before copying.';
}
get('generate').addEventListener('click',generate);
get('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(get('draft').value);get('status').textContent='Copied. Paste into your usual messaging tool when ready.';}catch{get('draft').focus();get('draft').select();get('status').textContent='Select and copy the message manually; clipboard access is unavailable.';}});generate();