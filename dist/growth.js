/* Start once on page load. Reduced-motion users receive the completed chart. */
(() => {
 const visual=document.querySelector('.reach-visual');
 if(!visual)return;
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 document.addEventListener('visibilitychange',()=>{
  visual.querySelectorAll('.scale-column,.scale-trajectory,.scale-arrow').forEach(el=>el.style.animationPlayState=document.hidden?'paused':'running');
 });
 if(media.matches)visual.classList.add('motion-reduced');
})();
