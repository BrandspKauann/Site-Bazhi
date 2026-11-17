/* Shared menu, keyboard and selected-state behavior for the home and prices page. */
(() => {
 const nav=document.querySelector('.nav');
 const toggle=nav?.querySelector('.menu-toggle');
 if(!toggle)return;
 function setOpen(open,restoreFocus=false){
  nav.classList.toggle('menu-open',open);
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  if(restoreFocus)toggle.focus({preventScroll:true});
 }
 toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('menu-open')));
 nav.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>setOpen(false)));
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&nav.classList.contains('menu-open')){setOpen(false,true);event.preventDefault();}
 });
 document.addEventListener('pointerdown',event=>{if(!nav.contains(event.target))setOpen(false);});
 const desktop=matchMedia('(min-width: 761px)');
 desktop.addEventListener('change',()=>{if(desktop.matches)setOpen(false);});
 document.querySelectorAll('[data-tone]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.tone==='consultivo')));
 document.addEventListener('click',event=>{
  const tone=event.target.closest('[data-tone]');
  if(tone)document.querySelectorAll('[data-tone]').forEach(button=>button.setAttribute('aria-pressed',String(button===tone)));
 });
})();
