import"./style-B_l4csH6.js";document.addEventListener("DOMContentLoaded",()=>{const a=new URLSearchParams(window.location.search).get("nickname");fetch("https://gyahury.github.io/japanese-word/"+a+"/words.json").then(e=>e.json()).then(e=>{const r=e.words;d(r)}).catch(e=>alert("error occurred : "+e));function d(e){const r=document.getElementById("cardContainer"),o={};e.forEach(t=>{o[t.type]?o[t.type]++:o[t.type]=1});for(const t in o){const n=document.createElement("button");n.className="bg-white hover:bg-gray-100 text-gray-600 text-sm font-medium w-36 h-16 py-3 px-6 border border-gray-400 rounded-lg shadow-md whitespace-nowrap text-ellipsis overflow-hidden",n.type="button",n.textContent=`${t}`,n.addEventListener("click",()=>{window.location.href="../word?nickname="+a+"&page="+t}),r.appendChild(n)}}});
