import"./style-B_l4csH6.js";document.addEventListener("DOMContentLoaded",()=>{const p=new URLSearchParams(window.location.search),L=p.get("nickname"),Y=p.get("page"),I=document.getElementById("word"),$=document.getElementById("curWordCount"),v=document.getElementById("allWordCount"),J=document.getElementById("prevButton"),T=document.getElementById("flipButton"),z=document.getElementById("nextButton"),U=document.getElementById("searchButton"),j=document.getElementById("toggleMenuButton"),f=document.getElementById("toggleDrawButton"),w=document.getElementById("controlAutoProgressButton"),R=document.getElementById("shuffleButton"),H=document.getElementById("excludeWordButton"),m=document.getElementById("checkWordButton"),_=document.getElementById("backButton"),c=document.getElementById("canvas"),u=c.getContext("2d");let r=[],o=0,i=!0,g=!1,E=0,k=0,d;l(),X(),fetch(`https://gyahury.github.io/japanese-word/${L}/words.json`).then(e=>e.json()).then(e=>{localStorage.getItem("lastKey")&&G(e.words),r=e.words.filter(n=>n.type===Y),v.textContent=r.length,r.length>0?s(o):(alert("invalid access"),ce())}).catch(e=>alert("error occurred : "+e)),window.addEventListener("resize",l),document.addEventListener("keydown",function(e){e.key==="ArrowLeft"||e.key==="q"?(l(),C()):e.key==="ArrowRight"||e.key==="w"?(l(),y()):e.key==="ArrowUp"||e.key==="ArrowDown"?B():e.key==="e"&&W()}),J.addEventListener("click",()=>{l(),C()}),z.addEventListener("click",()=>{l(),y()}),T.addEventListener("click",()=>{B()}),U.addEventListener("click",()=>{const t=`https://ja.dict.naver.com/?m=mobile#/search?query=${r[o].word}`;window.open(t,"_blank")}),j.addEventListener("click",A),f.addEventListener("click",ne),w.addEventListener("click",oe),H.addEventListener("click",W),m.addEventListener("click",S),R.addEventListener("click",()=>{confirm("would you like to shuffle?")&&(o=0,i=!0,l(),Q(r),s(o),A())}),_.addEventListener("click",()=>{confirm("are you sure you want to go back? unsaved changes will be lost")&&x()});function s(e){const t=r[e];t.type=="Checked"&&q(),i?I.innerHTML=`${t.word}`:I.innerHTML=`${t.furigana}<div style='font-size: clamp(0.7rem, 6vw, 2rem);'>${t.meaning}</div>`,$.textContent=e+1}function q(){m.id="uncheckWordButton",m.textContent="Uncheck Word",m.removeEventListener("click",S),document.getElementById("uncheckWordButton").addEventListener("click",F)}function W(){confirm("would you like to exclude this word? it will be temporarily excluded")&&(r=r.filter((e,t)=>t!==o),r.length==0?(alert("congratulations. there are no more words to memorize"),x()):(o>=r.length&&(o=0),i=!0,s(o)),v.textContent=r.length)}function S(){let e=localStorage.getItem("lastKey");e=e?parseInt(e):-1;const t=e+1,n=JSON.parse(JSON.stringify(r[o]));n.type="Checked",n.key=t,V(n,e)?confirm("this word already exists. would you like to check it?")&&(localStorage.setItem(t,JSON.stringify(n)),localStorage.setItem("lastKey",t.toString()),alert("successfully checked")):confirm("would you like to check it? you can check it in word notes")&&(localStorage.setItem(t,JSON.stringify(n)),localStorage.setItem("lastKey",t.toString()),alert("successfully checked"))}function F(){confirm("would you like to uncheck this word?")&&(localStorage.removeItem(r[o].key),r=r.filter((e,t)=>t!==o),r.length==0?(alert("congratulations. there are no more words to memorize"),x()):(o>=r.length&&(o=0),i=!0,s(o)),v.textContent=r.length)}function G(e){let t=localStorage.getItem("lastKey");for(let n=0;n<t+1;n++){const a=JSON.parse(localStorage.getItem(n));a&&e.push(a)}return e}function V(e,t){for(let n=0;n<t+1;n++){const a=JSON.parse(localStorage.getItem(n));if(a&&a.word===e.word)return!0}return!1}function C(){o>0?(o--,i=!0,s(o)):o==0&&(o=r.length-1,i=!0,s(o))}function y(){o<r.length-1?(o++,i=!0,s(o)):o==r.length-1&&(o=0,i=!0,s(o))}function B(){i=!i,s(o)}function A(){const e=document.getElementById("toggleMenuButton"),t=e.parentNode.nextElementSibling,n=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-expanded",!n),t.style.display=n?"none":"block"}function Q(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}function Z(e,t){u.beginPath(),u.moveTo(E,k),u.lineTo(e,t),u.lineWidth=3,u.lineCap="round",u.strokeStyle="RGBA(169, 169, 169, 1)",u.stroke()}function D(e){E=e.offsetX,k=e.offsetY,g=!0}function O(e){if(!g)return;let t=e.offsetX,n=e.offsetY;Z(t,n),E=t,k=n}function M(){g=!1}function b(){g=!1}function P(e){if(e.touches.length==1){const t=e.touches[0],n=new MouseEvent("mousedown",{clientX:t.clientX,clientY:t.clientY});c.dispatchEvent(n)}e.preventDefault()}function K(e){if(e.touches.length==1){const t=e.touches[0],n=new MouseEvent("mousemove",{clientX:t.clientX,clientY:t.clientY});c.dispatchEvent(n)}e.preventDefault()}function N(e){const t=new MouseEvent("mouseup",{});c.dispatchEvent(t),e.preventDefault()}function l(){var e=window.devicePixelRatio;c.width=c.clientWidth*e,c.height=c.clientHeight*e,u.scale(e,e)}function X(){c.addEventListener("mousedown",D),c.addEventListener("mouseup",M),c.addEventListener("mousemove",O),c.addEventListener("mouseout",b),c.addEventListener("touchstart",P),c.addEventListener("touchmove",K),c.addEventListener("touchend",N)}function ee(){c.removeEventListener("mousedown",D),c.removeEventListener("mouseup",M),c.removeEventListener("mousemove",O),c.removeEventListener("mouseout",b),c.removeEventListener("touchstart",P),c.removeEventListener("touchmove",K),c.removeEventListener("touchend",N)}function h(e){return d&&clearInterval(d),d=setInterval(()=>{B(),setTimeout(y,e/2)},e),d}function te(){d&&(clearInterval(d),d=null)}function ne(){f.textContent==="Draw Off"?(ee(),f.textContent="Draw On"):(X(),f.textContent="Draw Off"),l()}function oe(){const e=[{text:"Auto Off",action:te},{text:"Auto x1 On",action:()=>h(8e3)},{text:"Auto x2 On",action:()=>h(4e3)},{text:"Auto x4 On",action:()=>h(2e3)},{text:"Auto x8 On",action:()=>h(1e3)}];let t=e.findIndex(n=>n.text===w.textContent);e[t].action(),t=(t+1)%e.length,w.textContent=e[t].text}function ce(){window.history.back()}function x(){location.href=`/ring-word/wordPage?nickname=${L}`}});
