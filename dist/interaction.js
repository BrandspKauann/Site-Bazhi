(() => {
 const panel=document.querySelector('#process-panel');
 const tabs=Array.from(document.querySelectorAll('[data-step]'));
 const labels=[['▦','Encontrar empresas','Defina quem faz sentido'],['✦','Criar com IA','Personalize a sua mensagem'],['➤','Enviar abordagens','Revise antes de conversar'],['▥','Acompanhar insights','Aprenda com cada resposta']];
 tabs.forEach((tab,i)=>{tab.id='process-tab-'+i;tab.innerHTML=`<span class="step-tab-number">0${i+1}</span><span class="step-tab-text"><strong>${labels[i][1]}</strong><small>${labels[i][2]}</small></span><i>${labels[i][0]}</i>`;});
 if(panel){panel.setAttribute('aria-labelledby','process-tab-0');}
 document.addEventListener('click',event=>{
  const arrow=event.target.closest('[data-step-move]');
  if(arrow){const next=Math.max(0,Math.min(3,Number(panel.dataset.current||0)+Number(arrow.dataset.stepMove)));setStep(next);}
  const copy=event.target.closest('[data-step-copy]');
  if(copy){
   const direct=copy.dataset.version!=='direct';copy.dataset.version=direct?'direct':'context';
   const box=panel.querySelector('.full-copy');box.setAttribute('aria-live','polite');
   box.innerHTML=direct?'<strong>Para: Mariana · Nuvem Tech</strong><p>Olá, Mariana! Tenho uma ideia para apoiar a prospecção da Nuvem Tech.</p><p>Podemos ajudar seu time a encontrar as empresas certas e criar abordagens com o contexto de cada negócio.</p><p>Você tem 15 minutos para conversar nesta semana?</p><span class="copy-example-label">Variação demonstrativa · Tom direto</span>':'<strong>Para: Mariana · Nuvem Tech</strong><p>Olá, Mariana! Ao conhecer o momento da Nuvem Tech, pensei em como uma prospecção mais contextual pode apoiar seu time.</p><p>A ideia é conectar a oferta de vocês às empresas com o perfil certo, com mensagens relevantes desde o primeiro contato.</p><p>Faz sentido explorarmos esse caminho juntos?</p><span class="copy-example-label">Variação demonstrativa · Tom consultivo</span>';
   copy.textContent=direct?'✦ Experimentar tom consultivo':'✦ Experimentar tom direto';
  }
 });
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const targets=new Map();
 const groups=[
  ['#painel','left'],['.people-hero','right'],
  ['#como-funciona > .section-title','left'],
  ['.process-tabs button:nth-child(odd)','left'],['.process-tabs button:nth-child(even)','right'],
  ['#process-panel .process-copy','left'],['#process-panel .process-visual','right'],['.process-navigation','left'],
  ['.connected-heading','left'],['.connection-detail','left'],['.connection-map','right'],
  ['.human-portrait','left'],['.human-copy','right'],
  ['.bento-card:nth-child(odd)','left'],['.bento-card:nth-child(even)','right'],
  ['.market-strip > div:not(.site-shape-layer)','left'],['.faq > .section-title','left'],['#faq-list','right']
 ];
 let frame=0;
 const clamp=n=>Math.max(0,Math.min(1,n));
 const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
 function register(){
  for(const [selector,side] of groups){
   document.querySelectorAll(selector).forEach(el=>{
    if(targets.has(el))return;
    targets.set(el,side==='left'?-1:1);
    el.classList.add('scroll-reveal');el.dataset.revealSide=side;
   });
  }
  for(const el of targets.keys())if(!el.isConnected)targets.delete(el);
 }
 function update(){
  frame=0;
  const vh=innerHeight,small=innerWidth<700;
  const top=Math.max(0,document.querySelector('header')?.getBoundingClientRect().bottom||75);
  const distance=small?38:85;
  const focused=document.activeElement;
  for(const [el,side] of targets){
   if(!el.isConnected){targets.delete(el);continue;}
   const rect=el.getBoundingClientRect();
   // Enter from below; leave only as the last visible part passes the header.
   const enter=smooth((vh-8-rect.top)/(vh*.26));
   const leave=smooth((rect.bottom-top-5)/(vh*.18));
   const preserveFocus=focused&&el.contains(focused)&&(focused.matches(':focus-visible')||/^(INPUT|TEXTAREA|SELECT)$/.test(focused.tagName));
   const opacity=media.matches||preserveFocus?1:Math.min(enter,leave);
   el.style.setProperty('--reveal-opacity',opacity.toFixed(3));
   el.style.setProperty('--reveal-x',`${((1-opacity)*distance*side).toFixed(1)}px`);
   el.dataset.revealState=opacity<.01?'outside':opacity>.99?'visible':'transition';
  }
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 document.addEventListener('load',schedule,true);
 document.addEventListener('focusin',schedule);
 document.addEventListener('focusout',schedule);
 media.addEventListener('change',schedule);
 if(panel)new MutationObserver(()=>{register();schedule();}).observe(panel,{childList:true});
 register();update();document.documentElement.classList.add('scroll-motion-ready');
})();
