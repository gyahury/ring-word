import"./style-B_l4csH6.js";document.addEventListener("DOMContentLoaded",()=>{const f=new URLSearchParams(window.location.search),v=f.get("nickname"),E=f.get("page"),h=document.getElementById("word"),g=document.getElementById("curWordCount"),w=document.getElementById("allWordCount"),p=document.getElementById("prevButton"),B=document.getElementById("flipButton"),L=document.getElementById("nextButton"),k=document.getElementById("searchButton"),y=document.getElementById("menuButton"),I=document.getElementById("shuffleButton"),b=document.getElementById("backButton"),o=document.getElementById("canvas"),s=o.getContext("2d");let u=[],n=0,i=!0,l=!1,a=0,m=0;r(),fetch("https://gyahury.github.io/japanese-word/"+v+"/words.json").then(t=>t.json()).then(t=>{u=t.words.filter(e=>e.type===E),w.textContent=u.length,u.length>0&&d(n)}).catch(t=>alert("error occurred : "+t)),window.addEventListener("resize",r),o.addEventListener("mousedown",W),o.addEventListener("mouseup",Y),o.addEventListener("mousemove",X),o.addEventListener("mouseout",D),o.addEventListener("touchstart",S),o.addEventListener("touchmove",j),o.addEventListener("touchend",P),p.addEventListener("click",()=>{r(),n>0?(n--,i=!0,d(n)):n==0&&(n=u.length-1,i=!0,d(n))}),L.addEventListener("click",()=>{r(),n<u.length-1?(n++,i=!0,d(n)):n==u.length-1&&(n=0,i=!0,d(n))}),B.addEventListener("click",()=>{i=!i,d(n)}),k.addEventListener("click",()=>{const e=`https://ja.dict.naver.com/?m=mobile#/search?query=${u[n].word}`;window.open(e,"_blank")}),y.addEventListener("click",x),I.addEventListener("click",()=>{confirm("would you like to shuffle?")&&(n=0,i=!0,r(),M(u),d(n))}),b.addEventListener("click",()=>{T()});function d(t){const e=u[t];i?h.innerHTML=`${e.word}`:h.innerHTML=`${e.furigana}<div style='font-size: clamp(0.7rem, 6vw, 2rem);'>${e.meaning}</div>`,g.textContent=t+1}function x(){const t=document.getElementById("menuButton"),e=t.parentNode.nextElementSibling,c=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!c),e.style.display=c?"none":"block"}function M(t){for(let e=t.length-1;e>0;e--){const c=Math.floor(Math.random()*(e+1));[t[e],t[c]]=[t[c],t[e]]}}function C(t,e){s.beginPath(),s.moveTo(a,m),s.lineTo(t,e),s.lineWidth=3,s.lineCap="round",s.strokeStyle="RGBA(169, 169, 169, 1)",s.stroke()}function W(t){a=t.offsetX,m=t.offsetY,l=!0}function X(t){if(!l)return;let e=t.offsetX,c=t.offsetY;C(e,c),a=e,m=c}function Y(){l=!1}function D(){l=!1}function S(t){if(t.touches.length==1){const e=t.touches[0],c=new MouseEvent("mousedown",{clientX:e.clientX,clientY:e.clientY});o.dispatchEvent(c)}t.preventDefault()}function j(t){if(t.touches.length==1){const e=t.touches[0],c=new MouseEvent("mousemove",{clientX:e.clientX,clientY:e.clientY});o.dispatchEvent(c)}t.preventDefault()}function P(t){const e=new MouseEvent("mouseup",{});o.dispatchEvent(e),t.preventDefault()}function r(){var t=window.devicePixelRatio;o.width=o.clientWidth*t,o.height=o.clientHeight*t,s.scale(t,t)}function T(){window.history.back()}});
