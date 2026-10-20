/* Teaching models only. Original WebGL algorithms are in readable/ and shaders/. */
(() => {
  const slot = (name) => document.querySelector(`[data-lab="${name}"]`);
  const paper = slot('paper');
  paper.innerHTML = `<h3>Experiment: turn the printing into a surface</h3><p class="note">Illustrative projection of the recovered cylindrical bend equation. The portfolio draws its mesh with WebGL; this diagram uses Canvas 2D.</p><canvas id="paper-demo" width="720" height="340" aria-label="A triangulated sheet bending in three dimensions"></canvas><label>Turn <input id="turn" type="range" min="0" max="1" step=".01" value=".12"></label><label>Bend <input id="bend" type="range" min="0" max="2.5" step=".01" value=".7"></label><label class="check"><input id="wire" type="checkbox" checked> Show mesh</label><output id="paper-readout"></output>`;
  const pc = document.querySelector('#paper-demo').getContext('2d');
  const turn = document.querySelector('#turn'), bend = document.querySelector('#bend'), wire = document.querySelector('#wire');
  function drawPaper() {
    const angle = +turn.value * Math.PI, k = +bend.value / 160;
    pc.clearRect(0,0,720,340);
    pc.fillStyle='#eee9dc'; pc.fillRect(0,0,720,340);
    pc.strokeStyle='#c2baab'; pc.beginPath();pc.moveTo(45,285);pc.lineTo(675,285);pc.stroke();
    const point=(s,t)=>{
      const a=angle+k*s;
      const x=k<1e-6?s*Math.cos(angle):(Math.sin(a)-Math.sin(angle))/k;
      const z=k<1e-6?s*Math.sin(angle):(Math.cos(angle)-Math.cos(a))/k;
      const scale=900/(900-z);
      return [360+(x+z*.32)*scale,165+(t-z*.42)*scale];
    };
    const n=24,m=6;
    for(let i=0;i<n;i++) for(let j=0;j<m;j++){
      const s0=-160+i*320/n,s1=s0+320/n,t0=-85+j*170/m,t1=t0+170/m;
      const pts=[point(s0,t0),point(s1,t0),point(s1,t1),point(s0,t1)];
      const a=angle+k*(s0+s1)/2,front=Math.cos(a)>=0;
      const normalLight=(-Math.sin(a)*-.36+Math.abs(Math.cos(a))*.81)/Math.hypot(.36,.46,.81);
      const light=.65+.3*Math.max(0,normalLight);
      const color=front?(i<2||i>21||j===0||j===5?[251,247,238]:(i+j)%2?[54,103,69]:[68,128,83]):[228,207,173];
      pc.beginPath();pts.forEach((p,index)=>index?pc.lineTo(...p):pc.moveTo(...p));pc.closePath();pc.fillStyle=`rgb(${color.map(v=>Math.round(v*light)).join(',')})`;pc.fill();
      if(wire.checked){pc.strokeStyle='rgba(28,41,34,.3)';pc.lineWidth=.8;pc.stroke();pc.beginPath();pc.moveTo(...pts[0]);pc.lineTo(...pts[2]);pc.stroke();}
    }
    pc.fillStyle='#554c40';pc.font='14px system-ui';pc.fillText('A continuous bend changes position AND surface direction.',30,322);
    document.querySelector('#paper-readout').textContent=`Turn ${Math.round(+turn.value*180)}° · Bend ${bend.value} · Actual ordinary-paper mesh: 48 × 8 cells`;
  }
  [turn,bend,wire].forEach(el=>el.addEventListener('input',drawPaper));drawPaper();

  const motion=slot('motion');
  motion.innerHTML=`<h3>Experiment: input, damping and spring</h3><p class="note">Click to change the target. Blue follows the rate-7 filter. Red follows the stiffness-130, damping-13 spring. These are the controller's values, applied to one teaching coordinate.</p><canvas id="motion-demo" width="720" height="210" aria-label="Target, damped movement and spring response"></canvas><button id="step">Change target</button><output id="motion-readout">Move the target to compare their responses.</output>`;
  const mc=document.querySelector('#motion-demo').getContext('2d');
  let target=0,current=0,spring=0,velocity=0,last=performance.now(),running=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function drawMotion(){
    mc.clearRect(0,0,720,210);mc.fillStyle='#eee9dc';mc.fillRect(0,0,720,210);mc.font='15px system-ui';
    [['Target',target,'#686157'],['Damped',current,'#255bca'],['Spring',spring,'#bc3333']].forEach(([name,value,color],i)=>{
      const y=40+i*65;mc.fillStyle='#4b443b';mc.fillText(name,18,y+5);mc.strokeStyle='#c9c0af';mc.beginPath();mc.moveTo(145,y);mc.lineTo(655,y);mc.stroke();mc.fillStyle=color;mc.beginPath();mc.arc(165+value*440,y,11,0,Math.PI*2);mc.fill();
    });
  }
  function tick(now){
    const dt=Math.min((now-last)/1000,.05);last=now;
    current+=(target-current)*(1-Math.exp(-7*dt));
    velocity+=((target-spring)*130-velocity*13)*dt;spring+=velocity*dt;
    drawMotion();
    if(Math.abs(current-target)+Math.abs(spring-target)+Math.abs(velocity)>.001)requestAnimationFrame(tick);else running=false;
  }
  document.querySelector('#step').addEventListener('click',()=>{
    target=target?0:1;document.querySelector('#motion-readout').textContent=`Target changed to ${target}. Damping approaches; the spring carries momentum.`;
    if(reduced){current=spring=target;velocity=0;drawMotion();return;}
    if(!running){running=true;last=performance.now();requestAnimationFrame(tick);}
  });drawMotion();

  const shadow=slot('shadow');
  shadow.innerHTML=`<h3>Experiment: lift changes shadow</h3><p class="note">A teaching diagram of light projection and height-dependent softness. The original renderer uses silhouette framebuffers and two separable blur scales.</p><svg viewBox="0 0 720 300" role="img" aria-label="Paper lifting above a surface with its displaced shadow"><defs><filter id="soft-shadow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur id="blur" stdDeviation="2"/></filter><pattern id="checks" width="32" height="32" patternUnits="userSpaceOnUse"><rect width="32" height="32" fill="#f7e4dc"/><path d="M0 0h16v16H0zM16 16h16v16H16z" fill="#cc4852"/></pattern></defs><rect x="0" y="0" width="720" height="300" fill="url(#checks)"/><rect id="shadow-shape" x="260" y="90" width="200" height="120" rx="2" fill="#32211d" opacity=".4" filter="url(#soft-shadow)"/><line id="height-line" x1="245" y1="215" x2="245" y2="210" stroke="#28231c" stroke-width="2" stroke-dasharray="4 4"/><g id="lifted-paper"><rect x="260" y="90" width="200" height="120" fill="#fff8e4"/><rect x="272" y="102" width="176" height="96" fill="#527d58"/><text x="360" y="157" text-anchor="middle" fill="#fff8e4" font-family="system-ui" font-size="19">Same object.</text></g><text x="22" y="278" font-family="system-ui" fill="#211e19" font-size="15">Lift → displacement + broader shadow + separation</text></svg><label>Height <input id="height" type="range" min="0" max="100" step="1" value="35"></label><output id="shadow-readout"></output>`;
  const height=document.querySelector('#height');
  function drawShadow(){
    const h=+height.value,dx=.36/.81*h,dy=.46/.81*h;
    document.querySelector('#shadow-shape').setAttribute('transform',`translate(${dx} ${dy})`);
    document.querySelector('#blur').setAttribute('stdDeviation',2+h*.12);
    document.querySelector('#lifted-paper').setAttribute('transform',`translate(0 ${-h*.55})`);
    document.querySelector('#height-line').setAttribute('y2',210-h*.55);
    document.querySelector('#shadow-readout').textContent=`Height ${h} · light-projected displacement (${dx.toFixed(1)}, ${dy.toFixed(1)}) · Diagram softness ${(2+h*.12).toFixed(1)}`;
  }
  height.addEventListener('input',drawShadow);drawShadow();

  const toc=document.querySelector('#contents');
  document.querySelectorAll('article h2').forEach((h,i)=>{h.id=`chapter-${i}`;const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;toc.appendChild(a)});
})();
