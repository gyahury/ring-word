import"./style-B_l4csH6.js";document.addEventListener("DOMContentLoaded",()=>{const s=new URLSearchParams(window.location.search).get("nickname"),r=document.getElementById("searchInput"),l=document.getElementById("searchButton"),c=localStorage.getItem("lastKey");fetch("https://gyahury.github.io/japanese-word/"+s+"/words.json").then(n=>n.json()).then(n=>{let t=n.words;t=c?u(t):t,d(t),l.addEventListener("click",function(){const e=r.value.toLowerCase();i(e,t)}),r.addEventListener("keypress",function(e){if(e.key==="Enter"){e.preventDefault();const o=r.value.toLowerCase();i(o,t)}})}).catch(n=>alert(n,"error occurred"));function d(n){const t=document.getElementById("cardContainer");t.innerHTML="";const e={};n.forEach(o=>{e[o.type]?e[o.type]++:e[o.type]=1});for(const o in e){const a=document.createElement("button");a.className="bg-white hover:bg-gray-100 text-gray-600 text-sm font-medium w-36 h-16 py-3 px-6 border border-gray-400 rounded-lg shadow-md whitespace-nowrap text-ellipsis overflow-hidden",a.type="button",a.textContent=`${o}`,a.addEventListener("click",()=>{window.location.href="../word?nickname="+s+"&page="+o}),t.appendChild(a)}if(Object.keys(e).length%3==1)for(let o=0;o<2;o++){const a=document.createElement("button");a.className="invisible w-36 h-0",t.appendChild(a)}else if(Object.keys(e).length%3==2){const o=document.createElement("button");o.className="invisible w-36 h-0",t.appendChild(o)}}function i(n,t){d(t.filter(e=>e.type.toLowerCase().includes(n)||e.word.toLowerCase().includes(n)||e.meaning.toLowerCase().includes(n)))}function u(n){for(let t=0;t<c+1;t++){const e=JSON.parse(localStorage.getItem(t));e&&n.push(e)}return n}});
