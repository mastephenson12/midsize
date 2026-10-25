import {handoff} from './model.js';
let state={created:false,message:'Ready. No demonstration records yet.'};
function render(){
  document.getElementById('status').textContent=state.message;
  document.getElementById('contact').textContent=state.created?'DEMO-CONTACT-001 · Demo Customer · demo@example.com':'No contact yet.';
  document.getElementById('task').textContent=state.created?'DEMO-TASK-001 · Owner: office team · Next action: review DEMO-001 and arrange a next step.':'No task yet.';
}
document.getElementById('submit').addEventListener('click',()=>{state=handoff(state);render();});
document.getElementById('fail').addEventListener('click',()=>{state=handoff(state,true);render();});
document.getElementById('reset').addEventListener('click',()=>{state={created:false,message:'Reset. No demonstration records yet.'};render();});
