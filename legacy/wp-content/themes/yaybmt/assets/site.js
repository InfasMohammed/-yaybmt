const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
const dropdowns=[...document.querySelectorAll('.nav-dropdown')];
const closeDropdowns=()=>dropdowns.forEach(item=>{item.open=false;});
if(toggle&&nav){
 toggle.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')!=='true';
  toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);
  if(!open)closeDropdowns();
 });
 nav.addEventListener('click',event=>{
  if(event.target.closest('a')){closeDropdowns();toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
 });
}
dropdowns.forEach(item=>item.addEventListener('toggle',()=>{if(item.open)dropdowns.forEach(other=>{if(other!==item)other.open=false;});}));
document.addEventListener('click',event=>dropdowns.forEach(item=>{if(!item.contains(event.target))item.open=false;}));
document.addEventListener('keydown',event=>{
 if(event.key!=='Escape')return;
 const open=dropdowns.find(item=>item.open);
 if(open){open.open=false;open.querySelector('summary').focus();return;}
 if(toggle&&nav&&toggle.getAttribute('aria-expanded')==='true'){
  toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');toggle.focus();
 }
});
