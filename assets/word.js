import"./style-B_l4csH6.js";document.addEventListener("DOMContentLoaded",()=>{const c=new URLSearchParams(window.location.search),u=c.get("nickname"),l=c.get("page"),i=document.getElementById("word"),s=document.getElementById("curWordCount"),a=document.getElementById("allWordCount"),m=document.getElementById("prevButton"),g=document.getElementById("flipButton"),h=document.getElementById("nextButton"),w=document.getElementById("dictButton");let n=[],t=0,o=!0;fetch("https://gyahury.github.io/japanese-word/"+u+"/words.json").then(e=>e.json()).then(e=>{n=e.words.filter(r=>r.type===l),a.textContent=n.length,n.length>0&&d(t)}).catch(e=>alert("error occurred : "+e)),m.addEventListener("click",()=>{t>0?(t--,o=!0,d(t)):t==0&&(t=n.length-1,o=!0,d(t))}),h.addEventListener("click",()=>{t<n.length-1?(t++,o=!0,d(t)):t==n.length-1&&(t=0,o=!0,d(t))}),g.addEventListener("click",()=>{o=!o,d(t)}),w.addEventListener("click",()=>{const r=`https://ja.dict.naver.com/?m=mobile#/search?query=${n[t].word}`;window.open(r,"_blank")});function d(e){const r=n[e];o?i.innerHTML=`${r.word}`:i.innerHTML=`${r.furigana}<div style='font-size: clamp(0.7rem, 6vw, 2rem);'>${r.meaning}</div>`,s.textContent=e+1}});
