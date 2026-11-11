(()=>{
const R=document.documentElement;
if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion: reduce)').matches){R.classList.remove('js');return}
gsap.registerPlugin(ScrollTrigger);
const $=(s,c=document)=>[...c.querySelectorAll(s)],mob=innerWidth<=700,ease='expo.out',fine=matchMedia('(hover:hover)').matches;
// 1. Abertura do hero: linhas sobem em máscara, depois textos, cards e navbar
gsap.timeline({defaults:{ease}})
 .fromTo('.ln>span',{yPercent:110,opacity:1},{yPercent:0,duration:1.4,stagger:.12},.3)
 .fromTo('.fu',{y:30,opacity:0},{y:0,opacity:1,duration:1,stagger:.1},1)
 .fromTo('.nav',{yPercent:-140},{yPercent:0,duration:1.1},1.2);
// 2. Reveal ao rolar (títulos grandes com mais deslocamento)
$('.rv:not(.c)').forEach(el=>{const big=el.matches('h2,p.p');
 gsap.fromTo(el,{y:big?90:50,opacity:0,skewY:big?2:0},{y:0,opacity:1,skewY:0,duration:big?1.5:1.1,ease,clearProps:'transform,opacity',scrollTrigger:{trigger:el,start:'top 88%'}})});
gsap.fromTo('.c',{y:110,opacity:0,scale:.94},{y:0,opacity:1,scale:1,duration:1.2,stagger:.12,ease,clearProps:'transform,opacity',scrollTrigger:{trigger:'.sl',start:'top 85%'}});
// 3. Escala ligada ao scroll (rede e vídeo)
$('.sz').forEach(el=>gsap.fromTo(el,{scale:.86},{scale:1,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 35%',scrub:.6}}));
// 4. Parallax das formas e do hero
const k=mob?.4:1;
$('.pxa:not(.as):not(.rg)').forEach(el=>gsap.fromTo(el,{y:-90*k},{y:90*k,ease:'none',scrollTrigger:{trigger:el.closest('.s'),start:'top bottom',end:'bottom top',scrub:true}}));
const hero=$('.hero')[0],st=$('.hero .st')[1];
gsap.to('.hero .bl2',{y:160*k,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
gsap.to(st,{y:-140*k,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
gsap.to($('.hero h1')[0].parentNode,{y:-80*k,opacity:0,ease:'none',scrollTrigger:{trigger:hero,start:'30% top',end:'bottom top',scrub:true}});
// 5. Inclinação 3D do hero pelo mouse
if(!mob&&fine){const rx=gsap.quickTo(st,'rotationX',{duration:1.2,ease:'power3'}),ry=gsap.quickTo(st,'rotationY',{duration:1.2,ease:'power3'});
 addEventListener('mousemove',e=>{ry((e.clientX/innerWidth-.5)*10);rx(-(e.clientY/innerHeight-.5)*8)})}
// 6. Carrossel: arrastar, setas, progresso e cursor circular
const sl=$('.sl')[0],pg=$('.pg i')[0];
const prog=()=>{pg.style.marginLeft=sl.scrollLeft/Math.max(1,sl.scrollWidth-sl.clientWidth)*70+'%'};
sl.addEventListener('scroll',prog,{passive:true});
$('[aria-label="Anterior"],[aria-label="Próximo"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();sl.scrollBy({left:(a.ariaLabel==='Próximo'?1:-1)*sl.clientWidth*.6,behavior:'smooth'})}));
if(!mob&&fine){const cur=document.createElement('div');cur.className='cur';cur.textContent='Arraste';document.body.append(cur);
 const cx=gsap.quickTo(cur,'x',{duration:.4}),cy=gsap.quickTo(cur,'y',{duration:.4});let d=0,sx=0,s0=0;
 sl.addEventListener('mousemove',e=>{cx(e.clientX);cy(e.clientY)});
 sl.addEventListener('mouseenter',()=>cur.classList.add('on'));sl.addEventListener('mouseleave',()=>cur.classList.remove('on'));
 sl.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;d=1;sx=e.clientX;s0=sl.scrollLeft;sl.style.scrollSnapType='none'});
 addEventListener('pointermove',e=>{if(d)sl.scrollLeft=s0-(e.clientX-sx)});
 addEventListener('pointerup',()=>{if(d){d=0;sl.style.scrollSnapType=''}})}
// 7. Navbar muda de tema sobre as seções claras
const nav=$('.nav')[0],lt=new Set();
$('.s.L').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 60px',end:'bottom 60px',onToggle:t=>{t.isActive?lt.add(s):lt.delete(s);nav.classList.toggle('lt',lt.size>0)}}));
addEventListener('load',()=>ScrollTrigger.refresh());document.fonts&&document.fonts.ready.then(()=>ScrollTrigger.refresh());
})();
