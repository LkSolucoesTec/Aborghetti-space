(()=>{
if(!window.gsap||!window.ScrollTrigger||!document.documentElement.classList.contains('js'))return;
const $=(s,c=document)=>[...c.querySelectorAll(s)],sec=t=>$('.s').find(s=>s.textContent.includes(t)),R=document.documentElement;
const mm=gsap.matchMedia();

/* Faixa de marca: repete as três palavras em uma fita contínua. */
$('p.gt').filter(p=>p.textContent.trim().startsWith('CONECTAR. COMPARTILHAR. TRANSFORMAR.')).forEach(p=>{
 const band=document.createElement('div'); band.className='brand-marquee'; band.setAttribute('aria-label','Conectar. Compartilhar. Transformar.');
 const track=document.createElement('div'); track.className='brand-marquee-track';
 const phrase='<span>CONECTAR.</span><span class="separator">✦</span><span>COMPARTILHAR.</span><span class="separator">✦</span><span>TRANSFORMAR.</span><span class="separator">✦</span>';
 track.innerHTML=phrase.repeat(4); band.append(track); p.replaceWith(band);
});

/* Soluções: cards passam com a rolagem (seção fixada) e expandem ao clicar */
const ex=['Metodologia exclusiva PA + VI + EA: mapeamos o perfil do aluno, sintetizamos a informação e desenhamos a experiência de aprendizado ideal para o seu negócio.','E-books padrão ou interativos (QR code, links, vídeos), microlearning em séries, quizzes e cases, e one pages com grande apelo visual.','E-learning em SCORM 1.2 / HTML5 com alto poder de interatividade, simuladores e tutoriais guiados e gamificação para engajar.','Jogos presenciais (do desenho à aplicação), apresentações de alto impacto e campanhas de incentivo com toda a logística.','Vídeos animados, videoaulas, web séries e 360º, podcasts e lives, com captação, edição e produção completas.','Jornadas estruturadas, GênioBot (chatbot com IA e dashboard de resultados) e plataforma própria de campanhas de incentivo.','Infográficos padrão ou interativos e apresentações de alto impacto, que organizam a informação e deixam a comunicação mais clara.'];
const ws=sec('03 / Soluç'),sl=ws.querySelector('.sl');
let y0=0;const closeAll=x=>$('.c.open',sl).forEach(o=>{if(o!==x){o.classList.remove('open');const q=o.querySelector('.more');q.firstChild.textContent='Saiba mais ';q.lastElementChild.textContent='→'}});
addEventListener('scroll',()=>{if(sl.querySelector('.c.open')&&Math.abs(scrollY-y0)>80){closeAll();setTimeout(()=>ScrollTrigger.refresh(),800)}},{passive:true});
$('.c',sl).forEach((c,i)=>{const d=document.createElement('div');d.className='ex';
 d.innerHTML=`<p>${ex[i]}</p><div class="exb"><a class="bt bm" href="#contato">Falar com a equipe</a><a class="bt" href="#contato">Conheça os projetos</a></div>`;c.append(d);
 const m=c.querySelector('.more');m.addEventListener('click',e=>{e.preventDefault();closeAll(c);const o=c.classList.toggle('open');y0=scrollY;
  m.firstChild.textContent=o?'Fechar ':'Saiba mais ';m.lastElementChild.textContent=o?'×':'→';setTimeout(()=>ScrollTrigger.refresh(),800)})});
mm.add('(min-width:701px)',()=>{R.classList.add('pin');const bar=ws.querySelector('.pg i'),dist=()=>Math.max(0,sl.scrollWidth-innerWidth+60);
 gsap.to(sl,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:sl,start:'center center',end:()=>'+='+dist(),pin:ws,pinSpacing:true,scrub:.8,anticipatePin:1,invalidateOnRefresh:true,onUpdate:s=>{if(bar)bar.style.marginLeft=s.progress*70+'%'}}});
 return()=>R.classList.remove('pin')});

/* Processo criativo: peças permanecem conectadas; CSS cuida do hover sutil. */
const pr=sec('04 / Nosso');
if(pr){
 const puzzle=pr.querySelector('svg[aria-label^="Peças PA"]');
 if(puzzle){puzzle.querySelectorAll('g[style*="animation"]').forEach(g=>{g.style.animation='none';g.style.opacity='1';});}
 ['#E6008D','#7A2CA0','#1E234F'].forEach((c,i)=>{const b=$('b.p.gt',pr)[i];if(b)b.style.cssText+=`background:none;-webkit-text-fill-color:${c};color:${c}`});
}

/* Depoimentos: carrossel automático em looping, com controle manual e sem contador. */
const tm=sec('06 / Depo');
if(tm){
 tm.classList.add('tm');
 const cards=$('.sg .tsl',tm), next=tm.querySelector('.testimonial-next');
 let active=Math.max(0,cards.findIndex(c=>c.classList.contains('active')));
 const show=(index)=>{active=(index+cards.length)%cards.length;cards.forEach((card,i)=>{card.classList.toggle('active',i===active);card.setAttribute('aria-hidden',i===active?'false':'true')});};
 if(cards.length){show(active);let timer=setInterval(()=>show(active+1),7000);next?.addEventListener('click',()=>{show(active+1);clearInterval(timer);timer=setInterval(()=>show(active+1),7000)});tm.addEventListener('mouseenter',()=>{clearInterval(timer)});tm.addEventListener('mouseleave',()=>{clearInterval(timer);timer=setInterval(()=>show(active+1),7000)});}
}
/* Conversão: tema mais legível */
const cv=sec('07 / Vamos');if(cv)cv.classList.add('cv');
/* Vídeos: cada miniatura abre um modal em tela cheia; o único botão de fechar fica no modal. */
const vs=sec('05 / V');
const md=document.createElement('div'); md.className='vm'; md.setAttribute('role','dialog'); md.setAttribute('aria-modal','true'); md.setAttribute('aria-label','Reprodutor de vídeo');
md.innerHTML='<button class="vc" type="button" aria-label="Fechar vídeo">✕ Fechar</button><div class="vb"></div>';
document.body.append(md);
const closeVideo=()=>{md.classList.remove('on');const video=md.querySelector('video');if(video){video.pause();video.removeAttribute('src');video.load();}md.querySelector('.vb').innerHTML='';document.body.classList.remove('video-open')};
const openVideo=(src,label)=>{const box=md.querySelector('.vb');box.innerHTML='';if(src){const video=document.createElement('video');video.src=src;video.controls=true;video.autoplay=true;video.playsInline=true;box.append(video);}else{const note=document.createElement('p');note.textContent=`${label} — vídeo ainda não configurado. Defina o endereço em data-video-src no HTML.`;note.style.cssText='padding:24px;text-align:center;color:#fff';box.append(note);}md.classList.add('on');document.body.classList.add('video-open');md.querySelector('.vc').focus();};
if(vs){vs.querySelectorAll('.th').forEach((thumb)=>{const play=()=>openVideo(thumb.dataset.videoSrc||'',thumb.textContent.trim());thumb.addEventListener('click',play);thumb.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();play()}})});const playCircle=vs.querySelector('.plr');playCircle?.addEventListener('click',()=>openVideo(window.VIDEO_SRC||'','Vídeo institucional'));}
md.querySelector('.vc').addEventListener('click',closeVideo);md.addEventListener('click',e=>{if(e.target===md)closeVideo()});addEventListener('keydown',e=>{if(e.key==='Escape'&&md.classList.contains('on'))closeVideo()});

/* Formas da hero espalhadas pelo site, reagindo ao mouse e à rolagem */
const src=$('.hero .as'),spots=[['01 / Nosso',[[82,12,0],[6,70,2]]],['04 / Nosso',[[88,64,1],[3,10,3]]],['06 / Depo',[[5,18,0],[90,72,2]]]],fl=[];
spots.forEach(([t,ps])=>{const s=sec(t);if(!s)return;ps.forEach(([l,tp,n])=>{const o=src[n%src.length];if(!o)return;
 const w=document.createElement('div'),c=o.cloneNode(true);w.className='fl';w.style.cssText=`left:${l}%;top:${tp}%`;c.style.left='0';c.style.top='0';w.append(c);s.append(w);
 gsap.to(w,{yPercent:l>50?-60:60,ease:'none',scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:true}});fl.push([gsap.quickTo(w,'x',{duration:1.2}),gsap.quickTo(w,'y',{duration:1.2}),(n+1)*14])})});
if(matchMedia('(hover:hover)').matches)addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;fl.forEach(([fx,fy,d])=>{fx(x*d*2);fy(y*d*2)})},{passive:true});

/* Navegação mobile acessível. */
const mobileMenu=document.querySelector('.mobile-menu'), mobilePanel=document.querySelector('#mobile-nav');
if(mobileMenu&&mobilePanel){
 mobileMenu.addEventListener('click',()=>{const open=mobilePanel.classList.toggle('open');mobileMenu.setAttribute('aria-expanded',String(open));});
 mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobilePanel.classList.remove('open');mobileMenu.setAttribute('aria-expanded','false');}));
 document.addEventListener('click',e=>{if(!mobilePanel.contains(e.target)&&!mobileMenu.contains(e.target)){mobilePanel.classList.remove('open');mobileMenu.setAttribute('aria-expanded','false');}});
}

/* Reveal do texto de propósito quando a seção entra no viewport. */
const purpose=document.querySelector('#quem-somos');
if(purpose&&'IntersectionObserver' in window){
 const revealItems=purpose.querySelectorAll('.rv');
 revealItems.forEach(el=>el.classList.add('reveal-ready'));
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.18,rootMargin:'0px 0px -8% 0px'});
 revealItems.forEach(el=>observer.observe(el));
}

/* Download da apresentação comercial com validação, feedback e confete. */
const contactSection=document.querySelector('#contato');
if(contactSection){
 const fields=[...contactSection.querySelectorAll('input.in')].slice(0,4);
 const consent=contactSection.querySelector('input[type="checkbox"]');
 const downloadButton=contactSection.querySelector('#download-presentation');
 const progress=contactSection.querySelector('.download-progress');
 const progressBar=progress?.querySelector('span');
 const status=contactSection.querySelector('.download-status');
 const valid=()=>fields.length===4&&fields.every(f=>f.value.trim()&&f.checkValidity())&&!!consent?.checked;
 const refresh=()=>{if(downloadButton){downloadButton.disabled=!valid();downloadButton.style.opacity=valid()?'1':'.55';}};
 fields.forEach(f=>f.addEventListener('input',refresh)); consent?.addEventListener('change',refresh); refresh();
 const confetti=()=>{
  const colors=['#E6008D','#7A2CA0','#C9B8F4','#FF4DB8','#1E234F'];
  for(let i=0;i<64;i++){
   const bit=document.createElement('i');bit.className='download-confetti';bit.style.left=(Math.random()*100)+'vw';bit.style.background=colors[i%colors.length];bit.style.setProperty('--drift',((Math.random()-.5)*260)+'px');bit.style.animationDelay=(Math.random()*.45)+'s';bit.style.transform=`rotate(${Math.random()*180}deg)`;document.body.append(bit);setTimeout(()=>bit.remove(),2600);
  }
 };
 downloadButton?.addEventListener('click',()=>{
  refresh(); if(!valid()){status.textContent='Preencha os quatro campos e aceite a política para liberar a apresentação.';fields.find(f=>!f.value.trim()||!f.checkValidity())?.focus();return;}
  downloadButton.disabled=true;downloadButton.textContent='Preparando apresentação…';progress?.classList.add('active');if(progressBar)progressBar.style.width='12%';if(status)status.textContent='Preparando seu arquivo…';
  let pct=12;const interval=setInterval(()=>{pct=Math.min(92,pct+Math.random()*18);if(progressBar)progressBar.style.width=pct+'%';},180);
  setTimeout(()=>{
   clearInterval(interval);if(progressBar)progressBar.style.width='100%';
   const link=document.createElement('a');link.href='assets/apresentacao-comercial-aborghetti.pdf';link.download='Apresentacao-Comercial-Aborghetti.pdf';link.style.display='none';document.body.append(link);link.click();link.remove();
   if(status)status.textContent='Sua apresentação está pronta. O download foi iniciado.';downloadButton.textContent='Apresentação liberada ✓';confetti();
   setTimeout(()=>{if(progress)progress.classList.remove('active');if(progressBar)progressBar.style.width='0';downloadButton.disabled=false;downloadButton.textContent='Baixar apresentação novamente';},1800);
  },1100);
 });
}

/* A cena principal cresce durante a rolagem; os controles de vídeo ficam no modal. */
if(window.gsap&&window.ScrollTrigger){
 const mainVideo=document.querySelector('#video-principal');
 if(mainVideo){
  gsap.fromTo(mainVideo,{scale:.76,borderRadius:'48px'},{scale:1,borderRadius:'0px',ease:'none',scrollTrigger:{trigger:mainVideo,start:'top 92%',end:'top 22%',scrub:.7,invalidateOnRefresh:true}});
 }
}
})();
