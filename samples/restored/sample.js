// Server-rendered search, filter controls and links work without JavaScript.
const shell=document.querySelector('.yb-filter-shell');
if(shell){
 const panel=shell.querySelector('.yb-filter-panel');
 const summary=shell.querySelector(':scope > summary');
 const close=panel.querySelector('.yb-drawer-close');
 const breakpoint=matchMedia('(max-width:760px)');
 const backdrop=document.createElement('button');backdrop.type='button';backdrop.className='yb-filter-backdrop';backdrop.setAttribute('aria-label','Close filters');shell.insertBefore(backdrop,panel);
 const background=[...document.querySelectorAll('.site-header,.site-footer,.whatsapp-float,.yb-results,.yb-search,.yb-catalogue-heading,.yb-review-note')];
 let inertBefore=null;let overflowBefore='';
 const sync=()=>{
  const modal=breakpoint.matches&&shell.open;
  if(modal){
   if(!inertBefore){inertBefore=background.map(node=>node.inert);overflowBefore=document.body.style.overflow;background.forEach(node=>{node.inert=true;});document.body.style.overflow='hidden';}
   panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Product filters');close.focus();
  }else{
   panel.removeAttribute('role');panel.removeAttribute('aria-modal');panel.removeAttribute('aria-label');
   if(inertBefore){background.forEach((node,i)=>{node.inert=inertBefore[i];});inertBefore=null;document.body.style.overflow=overflowBefore;if(breakpoint.matches)summary.focus();}
  }
 };
 const configure=()=>{shell.open=!breakpoint.matches;sync();};
 document.documentElement.classList.add('yb-enhanced');configure();breakpoint.addEventListener('change',configure);shell.addEventListener('toggle',sync);
 close.addEventListener('click',()=>{shell.open=false;});backdrop.addEventListener('click',()=>{shell.open=false;});
 document.addEventListener('keydown',event=>{
  if(!breakpoint.matches||!shell.open)return;
  if(event.key==='Escape'){event.preventDefault();shell.open=false;return;}
  if(event.key==='Tab'){
   const focusable=[...panel.querySelectorAll('a[href],button,input,summary')].filter(node=>node.getClientRects().length&&!node.disabled);
   const first=focusable[0],last=focusable.at(-1);
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
 });
}
