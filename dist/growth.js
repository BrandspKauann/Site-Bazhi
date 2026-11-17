/* Pause outside the viewport and honor reduced-motion preferences. */
(() => {
 const visual=document.querySelector('.reach-visual');
 if(!visual)return;
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const svg=visual.querySelector('svg');
 let visible=true;
 function sync(){
  const paused=document.hidden||!visible||media.matches;
  visual.classList.toggle('is-paused',paused);
  if(typeof svg.pauseAnimations==='function'){
   if(paused)svg.pauseAnimations();else svg.unpauseAnimations();
  }
 }
 document.addEventListener('visibilitychange',sync);
 media.addEventListener('change',sync);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.05}).observe(visual);
 sync();
})();
