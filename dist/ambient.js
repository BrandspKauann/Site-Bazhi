/* Ambient network: decorative, paused off-screen and responsive to reduced motion. */
(() => {
 const section=document.querySelector('#ecossistema');
 const canvas=document.querySelector('#connection-particles');
 const button=document.querySelector('#motion-toggle');
 if(!section||!canvas)return;
 const ctx=canvas.getContext('2d');
 if(!ctx)return;
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let width=1,height=1,frame=0,last=0,visible=false,manualPause=false,reduced=media.matches;
 let pointer={x:-1000,y:-1000},points=[];
 const makePoints=()=>{
   const count=width<600?22:42;
   points=Array.from({length:count},(_,i)=>({x:(Math.sin(i*91.7)*.5+.5)*width,y:(Math.cos(i*57.4)*.5+.5)*height,vx:(Math.sin(i*2.4)||.5)*.11,vy:(Math.cos(i*3.2)||.4)*.08,r:i%6===0?1.7:1,color:i%3===0?'255,71,111':'115,144,206'}));
 };
 const resize=()=>{
   width=section.clientWidth;height=section.clientHeight;
   const ratio=Math.min(devicePixelRatio||1,1.5);
   canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
   ctx.setTransform(ratio,0,0,ratio,0,0);makePoints();draw(false);
 };
 function draw(move){
   ctx.clearRect(0,0,width,height);
   const reach=width<600?110:155;
   for(let i=0;i<points.length;i++){
     const p=points[i];
     if(move){p.x+=p.vx;p.y+=p.vy;if(p.x<-10)p.x=width+10;if(p.x>width+10)p.x=-10;if(p.y<-10)p.y=height+10;if(p.y>height+10)p.y=-10;}
     for(let j=i+1;j<points.length;j++){
       const q=points[j],distance=Math.hypot(p.x-q.x,p.y-q.y);
       if(distance<reach){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(${p.color},${(1-distance/reach)*.13})`;ctx.lineWidth=.6;ctx.stroke();}
     }
     const near=Math.hypot(p.x-pointer.x,p.y-pointer.y)<150;
     if(near){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pointer.x,pointer.y);ctx.strokeStyle='rgba(255,71,111,.09)';ctx.lineWidth=.7;ctx.stroke();}
     ctx.beginPath();ctx.arc(p.x,p.y,p.r*(near?1.4:1),0,Math.PI*2);ctx.fillStyle=`rgba(${p.color},${near?.75:.37})`;ctx.fill();
   }
 }
 function tick(time){
   frame=0;if(!visible||manualPause||reduced||document.hidden)return;
   if(time-last>32){draw(true);last=time;}
   frame=requestAnimationFrame(tick);
 }
 function sync(){
   const paused=manualPause||reduced||!visible||document.hidden;
   section.classList.toggle('motion-paused',paused);
   if(frame){cancelAnimationFrame(frame);frame=0;}
   if(!paused)frame=requestAnimationFrame(tick);else draw(false);
   section.querySelectorAll('animateMotion').forEach(el=>{
     const svg=el.ownerSVGElement;
     if(svg&&typeof svg.pauseAnimations==='function'){if(paused)svg.pauseAnimations();else svg.unpauseAnimations();}
   });
   if(button){button.setAttribute('aria-pressed',String(manualPause||reduced));button.innerHTML=(manualPause||reduced)?'<span>▶</span> Ativar movimento':'<span>Ⅱ</span> Pausar movimento';}
 }
 if(button)button.addEventListener('click',()=>{manualPause=!(manualPause||reduced);if(reduced&&!manualPause)reduced=false;sync();});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05}).observe(section);
 new ResizeObserver(resize).observe(section);
 section.addEventListener('pointermove',e=>{if(reduced||manualPause)return;const r=section.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top};},{passive:true});
 section.addEventListener('pointerleave',()=>{pointer={x:-1000,y:-1000};},{passive:true});
 document.addEventListener('visibilitychange',sync);
 media.addEventListener('change',e=>{reduced=e.matches;sync();});
 resize();sync();
})();

