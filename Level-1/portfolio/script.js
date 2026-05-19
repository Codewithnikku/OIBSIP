/* ── CURSOR ── */
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
(function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();
document.querySelectorAll('button,a,.chip,.project-card,.contact-link,.skill-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.width='20px';cursor.style.height='20px';
    ring.style.width='55px';ring.style.height='55px';ring.style.opacity='0.3';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.width='12px';cursor.style.height='12px';
    ring.style.width='38px';ring.style.height='38px';ring.style.opacity='0.5';
  });
});

/* ── 3D CARD TILT ── */
const card=document.getElementById('card3d');
if(card){
  const par=card.parentElement;
  par.addEventListener('mousemove',e=>{
    const r=par.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)/r.width;
    const y=(e.clientY-r.top-r.height/2)/r.height;
    card.style.transform=`perspective(800px) rotateY(${x*20}deg) rotateX(${-y*20}deg) translateZ(10px)`;
  });
  par.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  });
}

/* ── NAVBAR SCROLL ── */
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60);});

/* ── HAMBURGER ── */
const ham=document.getElementById('hamburger'),navLinks=document.getElementById('nav-links');
ham.addEventListener('click',()=>{ham.classList.toggle('active');navLinks.classList.toggle('open');});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ham.classList.remove('active');navLinks.classList.remove('open');}));

/* ── TYPEWRITER ── */
const words=['Frontend Developer','UI/UX Designer','Full Stack Developer','Creative Coder','Problem Solver'];
let wi=0,ci=0,del=false;
const tw=document.getElementById('tw');
function type(){
  const w=words[wi];
  tw.textContent=del?w.substring(0,--ci):w.substring(0,++ci);
  let spd=del?60:100;
  if(!del&&ci===w.length){spd=1800;del=true;}
  else if(del&&ci===0){del=false;wi=(wi+1)%words.length;spd=400;}
  setTimeout(type,spd);
}
type();

/* ── CANVAS PARTICLES ── */
const cnv=document.getElementById('bg-canvas');
const ctx=cnv.getContext('2d');
let W,H,particles=[];
function resize(){W=cnv.width=window.innerWidth;H=cnv.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);
function Particle(){
  this.x=Math.random()*W;this.y=Math.random()*H;
  this.r=Math.random()*1.5+0.3;
  this.vx=(Math.random()-0.5)*0.3;this.vy=(Math.random()-0.5)*0.3;
  this.a=Math.random()*0.5+0.1;
}
for(let i=0;i<140;i++)particles.push(new Particle());
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;
    if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(0,255,200,${p.a})`;ctx.fill();
  });
  particles.forEach((p,i)=>{
    for(let j=i+1;j<particles.length;j++){
      const q=particles[j];
      const dx=p.x-q.x,dy=p.y-q.y,dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<100){
        ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
        ctx.strokeStyle=`rgba(0,255,200,${0.04*(1-dist/100)})`;
        ctx.lineWidth=0.5;ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── SCROLL REVEAL ── */
const revEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'),i*80);
      obs.unobserve(e.target);
    }
  });
},{threshold:0.1});
revEls.forEach(el=>obs.observe(el));

/* ── SKILL BARS ── */
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-bar-fill').forEach(b=>{
        b.style.width=b.dataset.pct+'%';
      });
      barObs.unobserve(e.target);
    }
  });
},{threshold:0.3});
document.querySelectorAll('.skill-card').forEach(el=>barObs.observe(el));

/* ── COUNT UP ── */
function countUp(el,target,dur=1800){
  let start=0;const step=target/dur*16;
  const t=setInterval(()=>{start+=step;if(start>=target){el.textContent=target;clearInterval(t);}else{el.textContent=Math.floor(start);}},16);
}
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      countUp(document.getElementById('count1'),30);
      countUp(document.getElementById('count2'),20);
      countUp(document.getElementById('count3'),15);
      cntObs.disconnect();
    }
  });
},{threshold:0.5});
cntObs.observe(document.querySelector('.hero-stats'));

/* ── MOUSE PARALLAX ORBS ── */
document.addEventListener('mousemove',e=>{
  const xf=(e.clientX/window.innerWidth-0.5)*20;
  const yf=(e.clientY/window.innerHeight-0.5)*20;
  document.querySelector('.orb1').style.transform=`translate(${xf}px,${yf}px)`;
  document.querySelector('.orb2').style.transform=`translate(${-xf}px,${-yf}px)`;
});

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-primary,.btn-secondary,.nav-cta,.form-submit').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const dx=e.clientX-r.left-r.width/2;
    const dy=e.clientY-r.top-r.height/2;
    btn.style.transform=`translate(${dx*0.12}px,${dy*0.12}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
});
