export function handoff(state, fail=false) {
  if(fail)return {...state,message:'Illustrated delivery failure. No new contact or task was created. Existing demonstration records, if any, are unchanged.'};
  return {created:true,message:state.created?'Same demonstration event replayed. The existing contact and task were reused.':'Illustrated success: one contact and one assigned internal task created.'};
}
