import"./style-B_l4csH6.js";document.addEventListener("DOMContentLoaded",()=>{const c=new URLSearchParams(window.location.search),u=c.get("nickname"),i=c.get("page"),a=document.getElementById("word"),s=document.getElementById("curWordCount"),l=document.getElementById("allWordCount"),m=document.getElementById("prevButton"),g=document.getElementById("flipButton"),h=document.getElementById("nextButton");let n=[],t=0,o=!0;fetch("https://gyahury.github.io/japanese-word/"+u+"/words.json").then(e=>e.json()).then(e=>{n=e.words.filter(r=>r.type===i),l.textContent=n.length,n.length>0&&d(t)}).catch(e=>alert("error occurred : "+e)),m.addEventListener("click",()=>{t>0&&(t--,o=!0,d(t))}),h.addEventListener("click",()=>{t<n.length-1&&(t++,o=!0,d(t))}),g.addEventListener("click",()=>{o=!o,d(t)});function d(e){const r=n[e];o?a.innerHTML=`${r.word}`:a.innerHTML=`${r.furigana}<br>${r.meaning}`,s.textContent=e+1}});
