/* Anchor every connection to its actual card, including after responsive resizing. */
(() => {
 const map=document.querySelector('.connection-map');
 if(!map)return;
 const svg=map.querySelector('.connection-paths'),core=map.querySelector('.connection-core>div');
 const nodes=Array.from(map.querySelectorAll('[data-connection]'));
 const lines=Array.from(svg.querySelectorAll('g[stroke] path'));
 const motions=Array.from(svg.querySelectorAll('animateMotion'));
 function sync(){
  const box=map.getBoundingClientRect();if(!box.width||!box.height)return;
  svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
  const center=el=>{const r=el.getBoundingClientRect();return {x:r.left+r.width/2-box.left,y:r.top+r.height/2-box.top}};
  const start=center(core);
  nodes.forEach((node,i)=>{const end=center(node),d=`M${start.x} ${start.y} C${start.x+(end.x-start.x)*.45} ${start.y} ${start.x+(end.x-start.x)*.55} ${end.y} ${end.x} ${end.y}`;lines[i]?.setAttribute('d',d);});
  motions.forEach((motion,i)=>motion.setAttribute('path',lines[[0,1,5][i]].getAttribute('d')));
 }
 const observer=new ResizeObserver(sync);observer.observe(map);observer.observe(core);
 window.addEventListener('resize',sync,{passive:true});
 document.fonts?.ready.then(sync);sync();
})();
