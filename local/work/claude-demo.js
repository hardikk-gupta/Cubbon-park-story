(()=>{const v=`
  .cd{--bg:#faf9f5; --ink:#141413; --ink2:#5e5d59; --ink3:#87867f; --line:#e8e6dc; --bub:#f0eee6; --or:#c6613f;
    position:relative; border-radius:20px; background:var(--bg); border:1px solid var(--line); overflow:hidden; font-family:Geist,system-ui,sans-serif; color:var(--ink);
    box-shadow:0 1px 2px rgba(20,18,16,.06), 0 24px 48px -24px rgba(20,18,16,.28); width:100%; aspect-ratio:16/11; min-height:460px; display:flex; flex-direction:column; container-type:inline-size}
  .cd *{box-sizing:border-box}
  .cd-top{display:flex; align-items:center; gap:2.2cqw; height:max(8.4cqw, 43.7px); padding:0 3cqw; border-bottom:1px solid var(--line); font-size:max(2.3cqw, 12.0px); color:var(--ink2); flex:none}
  .cd-top i{width:max(1.6cqw, 8.3px); height:max(1.6cqw, 8.3px); border-radius:50%; background:#e2dfd4; flex:none}
  .cd-top b{margin-left:1.4cqw; font-weight:500; color:var(--ink)}
  .cd-view{position:relative; flex:1; overflow:hidden}
  .cd-thread{position:absolute; left:0; right:0; top:0; padding:3.4cqw 7cqw 2cqw; display:flex; flex-direction:column; gap:3cqw; transition:transform .7s cubic-bezier(.3,.7,.2,1)}
  .cd-msg{opacity:0; filter:blur(6px); translate:0 1.2cqw; transition:opacity .45s ease, filter .45s ease, translate .5s ease}
  .cd-msg.on{opacity:1; filter:none; translate:0 0}
  .cd-u{align-self:flex-end; max-width:78%; display:flex; flex-direction:column; align-items:flex-end; gap:1.2cqw}
  .cd-u p{margin:0; padding:max(1.7cqw, 8.8px) max(2.4cqw, 12.5px); border-radius:2.4cqw; background:var(--bub); font-size:max(2.6cqw, 13.5px); line-height:1.45}
  .cd-att{display:flex; align-items:center; gap:1.4cqw; padding:1.2cqw 1.8cqw 1.2cqw 1.2cqw; border-radius:1.8cqw; border:1px solid var(--line); background:#fff; font-size:max(2.1cqw, 10.9px)}
  .cd-att i{width:max(4.4cqw, 22.9px); height:max(4.4cqw, 22.9px); border-radius:1cqw; background:#f3efe4; display:grid; place-items:center; font-style:normal; font-size:max(2.2cqw, 11.4px); color:var(--ink2)}
  .cd-att small{display:block; color:var(--ink3); font-size:max(1.8cqw, 9.4px)}
  .cd-c{display:flex; flex-direction:column; gap:1.6cqw; font-size:max(2.6cqw, 13.5px); line-height:1.55}
  .cd-skill{display:inline-flex; align-self:flex-start; align-items:center; gap:1.2cqw; height:max(4.6cqw, 23.9px); padding:0 1.8cqw; border-radius:1.4cqw; border:1px solid var(--line); background:#fff; font-size:max(2.1cqw, 10.9px); color:var(--ink2)}
  .cd-skill svg{width:max(2.2cqw, 11.4px); height:max(2.2cqw, 11.4px); stroke:currentColor; fill:none; stroke-width:1.6; stroke-linecap:round}
  .cd-skill b{font-weight:500; color:var(--ink); font-family:'Geist Mono',ui-monospace,monospace; font-size:max(2cqw, 10.4px)}
  .cd-skill .sp{width:max(1.8cqw, 9.4px); height:max(1.8cqw, 9.4px); border-radius:50%; border:.3cqw solid #ddd9cc; border-top-color:var(--or); animation:cd-spin .8s linear infinite}
  .cd-skill.ok .sp{display:none}
  .cd-skill .tick{display:none; color:#3f8a52}
  .cd-skill.ok .tick{display:inline}
  @keyframes cd-spin{to{transform:rotate(360deg)}}
  .cd-c p{margin:0}
  .cd-c .w{opacity:0; transition:opacity .25s ease}
  .cd-c .w.on{opacity:1}
  .cd-doc{display:flex; align-items:center; gap:1.8cqw; padding:max(1.6cqw, 8.3px) max(2cqw, 10.4px); border-radius:1.8cqw; border:1px solid var(--line); background:#fff; align-self:flex-start; min-width:52%}
  .cd-doc i{width:max(5.4cqw, 28.1px); height:max(5.4cqw, 28.1px); border-radius:1.2cqw; background:#f3efe4; display:grid; place-items:center; font-style:normal; font-size:max(2.4cqw, 12.5px); color:var(--ink2)}
  .cd-doc b{display:block; font-weight:500; font-size:max(2.4cqw, 12.5px)} .cd-doc small{color:var(--ink3); font-size:max(2cqw, 10.4px)}
  .cd-list{display:flex; flex-direction:column; border:1px solid var(--line); border-radius:1.8cqw; background:#fff; overflow:hidden}
  .cd-list div{display:flex; justify-content:space-between; gap:2cqw; padding:max(1.4cqw, 7.3px) max(2cqw, 10.4px); font-size:max(2.3cqw, 12.0px); border-top:1px solid var(--line)}
  .cd-list div:first-child{border-top:0}
  .cd-list span{color:var(--ink3)}
  .cd-list em{font-style:normal; font-size:max(1.9cqw, 9.9px); padding:max(.3cqw, 1.6px) max(1.2cqw, 6.2px); border-radius:99px; background:#f0eee6; color:var(--ink2); white-space:nowrap; align-self:center}
  .cd-list em.r{background:#fbe3dc; color:#a3401f} .cd-list em.g{background:#e3efe2; color:#2f6b3c} .cd-list em.b{background:#e4e9f6; color:#33489a}
  .cd-btns{display:flex; gap:1.4cqw}
  .cd-btns span{display:inline-flex; align-items:center; height:max(5.4cqw, 28.1px); padding:0 2.4cqw; border-radius:1.4cqw; font-size:max(2.3cqw, 12.0px); font-weight:500; border:1px solid var(--line); background:#fff; transition:transform .15s ease, background .3s ease, color .3s ease}
  .cd-btns span:first-child{background:var(--ink); color:#fff; border-color:var(--ink)}
  .cd-btns span.press{transform:scale(.94)}
  .cd-btns.done span{opacity:.45}
  .cd-spark{width:max(3.6cqw, 18.7px); height:max(3.6cqw, 18.7px); margin-top:-.4cqw; opacity:0; transition:opacity .4s ease}
  .cd-spark.on{opacity:1}
  .cd-spark.think{animation:cd-pulse 1.2s ease-in-out infinite; opacity:1}
  @keyframes cd-pulse{50%{transform:rotate(25deg) scale(.86)}}
  .cd-box{flex:none; margin:0 5cqw 3.6cqw; border-radius:2.6cqw; background:#fff; border:1px solid #e3e0d6; box-shadow:0 .4cqw 1.6cqw rgba(20,18,16,.05); padding:2cqw 2.2cqw 1.6cqw}
  .cd-in{min-height:max(4.2cqw, 21.8px); font-size:max(2.6cqw, 13.5px); color:var(--ink)}
  .cd-in.ph{color:var(--ink3)}
  .cd-in .car{display:inline-block; width:max(.25cqw, 1.3px); height:max(3cqw, 15.6px); background:var(--ink); vertical-align:-.5cqw; margin-left:.2cqw; animation:cd-blink 1s steps(1) infinite}
  @keyframes cd-blink{50%{opacity:0}}
  .cd-row{display:flex; align-items:center; gap:1.6cqw; margin-top:1.4cqw; font-size:max(2.1cqw, 10.9px); color:var(--ink2)}
  .cd-row .pl{width:max(4.6cqw, 23.9px); height:max(4.6cqw, 23.9px); border-radius:1.2cqw; border:1px solid var(--line); display:grid; place-items:center; font-size:max(2.8cqw, 14.6px); color:var(--ink2)}
  .cd-row .md{margin-left:auto}
  .cd-row .go{width:max(4.6cqw, 23.9px); height:max(4.6cqw, 23.9px); border-radius:1.2cqw; background:var(--or); color:#fff; display:grid; place-items:center; font-size:max(2.6cqw, 13.5px); opacity:.45; transition:opacity .2s ease, transform .15s ease}
  .cd-row .go.on{opacity:1} .cd-row .go.press{transform:scale(.88)}
  .cd-cur{position:absolute; width:max(3.2cqw, 16.6px); height:max(3.2cqw, 16.6px); left:0; top:0; z-index:5; pointer-events:none; opacity:0; transition:left .7s cubic-bezier(.4,0,.2,1), top .7s cubic-bezier(.4,0,.2,1), opacity .3s ease}
  @media (prefers-reduced-motion: reduce){ .cd-msg, .cd-thread, .cd-c .w{transition:none} .cd-skill .sp, .cd-spark.think{animation:none} }
  `;if(!document.getElementById("cd-css")){const o=document.createElement("style");o.id="cd-css",o.textContent=v,document.head.appendChild(o)}const L=window.CD_SPARK||"claude-spark.png",z='<svg viewBox="0 0 16 16"><path d="M3 2.5h7.5L13 5v8.5H3z M10.5 2.5V5H13"/></svg>',t=o=>o.replace(/&/g,"&amp;").replace(/</g,"&lt;"),C=o=>o.split(/(\s+)/).map(f=>/^\s+$/.test(f)?f:`<span class="w">${f}</span>`).join("");window.ClaudeDemo=function(o,{title:f,steps:$}){o.innerHTML=`<div class="cd"><div class="cd-top"><i></i><i></i><i></i><b>${t(f)}</b></div>
      <div class="cd-view"><div class="cd-thread"></div></div>
      <div class="cd-box"><div class="cd-in ph">Reply to Claude&hellip;</div><div class="cd-row"><span class="pl">+</span><span class="md">Opus 5.5 &#8964;</span><span class="go">&uarr;</span></div></div>
      <svg class="cd-cur" viewBox="0 0 24 24"><path d="M5 3l14 8-6.2 1.4L10 19z" fill="#141413" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg></div>`;const p=o.firstChild,M=p.querySelector(".cd-view"),d=p.querySelector(".cd-thread"),x=p.querySelector(".cd-in"),q=p.querySelector(".cd-go")||p.querySelector(".go"),m=p.querySelector(".cd-cur");let u=[],h=!1,y=!1;const c=(e,s)=>u.push(setTimeout(s,e)),r=()=>{const e=d.scrollHeight-M.clientHeight;d.style.transform=`translateY(${-Math.max(0,e)}px)`},H=(e,s)=>{const i=document.createElement("div");return i.className="cd-msg "+s,i.innerHTML=e,d.appendChild(i),requestAnimationFrame(()=>{i.classList.add("on"),r()}),i},E=(e,s)=>{const i=p.getBoundingClientRect(),n=e.getBoundingClientRect();m.style.opacity=1,m.style.left=n.left-i.left+n.width*.55+"px",m.style.top=n.top-i.top+n.height*.55+"px",c(800,()=>{e.classList.add("press"),c(160,()=>{e.classList.remove("press"),s()})})};function k(){u.forEach(clearTimeout),u=[],d.innerHTML="",d.style.transition="none",d.style.transform="none",requestAnimationFrame(()=>{d.style.transition=""}),m.style.opacity=0,m.style.left="70%",m.style.top="110%";let e=700;$.forEach(s=>{if(s.you){const i=s.you;c(e,()=>{x.classList.remove("ph"),x.innerHTML='<span class="car"></span>'});for(let n=1;n<=i.length;n++)c(e+200+n*38,()=>{x.innerHTML=t(i.slice(0,n))+'<span class="car"></span>',q.classList.add("on")});e+=200+i.length*38+350,c(e,()=>{q.classList.add("press")}),c(e+150,()=>{q.classList.remove("press","on"),x.classList.add("ph"),x.innerHTML="Reply to Claude&hellip;",H((s.file?`<div class="cd-att"><i>&#9993;</i><span>${t(s.file)}<small>Email</small></span></div>`:"")+`<p>${t(i)}</p>`,"cd-u")}),e+=700}else{const i=document.createElement("div");if(i.className="cd-msg cd-c",i.innerHTML=`<span class="cd-skill">${z}Using skill <b>${t(s.skill)}</b><span class="sp"></span><span class="tick">&#10003;</span></span>`,c(e,()=>{d.appendChild(i),requestAnimationFrame(()=>{i.classList.add("on"),r()})}),e+=1300,c(e,()=>i.querySelector(".cd-skill").classList.add("ok")),(s.say||[]).forEach(a=>{const l=document.createElement("p");l.innerHTML=C(a),l.style.display="none",i.appendChild(l);const w=[...l.querySelectorAll(".w")];c(e,()=>{l.style.display="",r()}),w.forEach((g,b)=>c(e+b*55,()=>g.classList.add("on"))),e+=w.length*55+250}),s.list){const a=document.createElement("div");a.className="cd-list cd-msg",a.innerHTML=s.list.map(([l,w,g,b])=>`<div><span style="color:var(--ink)">${t(l)}</span>${w?`<span>${t(w)}</span>`:""}${g?`<em class="${b||""}">${t(g)}</em>`:""}</div>`).join(""),a.style.display="none",i.appendChild(a),c(e,()=>{a.style.display="",requestAnimationFrame(()=>{a.classList.add("on"),r()})}),e+=900}if(s.doc){const a=document.createElement("div");a.className="cd-doc cd-msg",a.innerHTML=`<i>&#9776;</i><span><b>${t(s.doc[0])}</b><small>${t(s.doc[1])}</small></span>`,a.style.display="none",i.appendChild(a),c(e,()=>{a.style.display="",requestAnimationFrame(()=>{a.classList.add("on"),r()})}),e+=900}if(s.ask){const a=document.createElement("div");a.className="cd-btns cd-msg",a.innerHTML=s.ask.map(l=>`<span>${t(l)}</span>`).join(""),a.style.display="none",i.appendChild(a),c(e,()=>{a.style.display="",requestAnimationFrame(()=>{a.classList.add("on"),r()})}),e+=900,c(e,()=>E(a.firstChild,()=>{a.classList.add("done"),m.style.opacity=0})),e+=1300}const n=document.createElement("img");n.className="cd-spark",n.src=L,n.alt="",i.appendChild(n),c(e,()=>{n.classList.add("on"),r()}),c(e+1400,()=>{n.classList.remove("on"),c(400,()=>{n.style.display="none",r()})}),e+=s.hold||1600}}),c(e+2600,()=>{d.style.opacity=0,d.style.transition="opacity .5s ease"}),c(e+3200,()=>{d.style.opacity=1,y?k():h=!1}),h=!0}new IntersectionObserver(([e])=>{y=e.isIntersecting,y&&!h&&k()},{threshold:.35}).observe(o)}})();