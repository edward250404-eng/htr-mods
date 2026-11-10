(async function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl=u=>/^https:\/\//i.test(u||"")?u:"";
const CATS=[["all","Все"],["car","Машины"],["moto","Мотоциклы"],["ped","Персонажи"],["map","Карты"],["pack","Наборы"],["other","Другое"]];
const PRE={car:"V",moto:"M",ped:"P",map:"MAP",pack:"PACK",other:"X"};
const COLORS={car:"#2f5d8a",moto:"#b35a1f",ped:"#c9a227",map:"#2f6a8a",pack:"#6b3f8a",other:"#4f6d7a"};
const ICONS={
 car:'<svg viewBox="0 0 120 60" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><path d="M8 40v-8l14-4 14-12h34l18 12 20 4v8"/><path d="M8 40h12M40 40h40M100 40h12"/><circle cx="30" cy="42" r="9"/><circle cx="90" cy="42" r="9"/><path d="M40 28h50"/></svg>',
 moto:'<svg viewBox="0 0 120 60" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><circle cx="24" cy="42" r="13"/><circle cx="96" cy="42" r="13"/><path d="M24 42l22-18h22l10 12h18"/><path d="M46 24l-6-8h-10M78 36l8-22h12"/></svg>',
 ped:'<svg viewBox="0 0 120 80" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><circle cx="60" cy="16" r="10"/><path d="M42 34h36l-4 22h-6l-2 20h-8l-2-20h-6z"/><path d="M42 34l-10 22M78 34l10 22"/></svg>',
 map:'<svg viewBox="0 0 120 70" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><path d="M10 14l30-8 40 10 30-8v50l-30 8-40-10-30 8z"/><path d="M40 6v50M80 16v50"/></svg>',
 pack:'<svg viewBox="0 0 120 70" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><path d="M20 22l40-14 40 14v32l-40 14-40-14z"/><path d="M20 22l40 14 40-14M60 36v32"/></svg>'
};
ICONS.other=ICONS.pack;

let S={name:"HTR Mods",tg:"",cur:"$",heroTitle:"",heroAccent:"",heroText:"",payNote:""},ITEMS=[];
try{
  const [s,p]=await Promise.all([fetch("/data/settings.json",{cache:"no-cache"}).then(r=>r.json()),fetch("/data/products.json",{cache:"no-cache"}).then(r=>r.json())]);
  S=Object.assign(S,s);
  const cnt={};
  ITEMS=(p.items||[]).map((it,k)=>{const c=it.cat||"other";cnt[c]=(cnt[c]||0)+1;return Object.assign({specs:[],photos:[]},it,{cat:c,order:k,id:(PRE[c]||"X")+"-"+String(cnt[c]).padStart(3,"0"),color:COLORS[c]||COLORS.other,photos:(it.photos||[]).map(x=>typeof x==="string"?x:x&&x.photo).filter(Boolean)})});
}catch(e){$("#root").innerHTML='<p style="padding:40px;text-align:center">Не удалось загрузить каталог. Обнови страницу.</p>';return}

const money=n=>{const v=Number(n)||0;return S.cur==="$"||S.cur==="€"?S.cur+v.toLocaleString("en-US"):v.toLocaleString("ru-RU")+" "+S.cur};
const bg=c=>`background:radial-gradient(120% 90% at 30% 20%, ${c} 0%, color-mix(in srgb, ${c} 45%, #0d0f13) 70%)`;
const tg=()=>String(S.tg||"").replace(/^@/,"");
let cat="all",q="",sort="order",cart=[],openId=null,photoIdx=0;
try{cart=JSON.parse(localStorage.getItem("htr-cart")||"[]").filter(id=>ITEMS.some(i=>i.id===id))}catch(e){}
const saveCart=()=>{try{localStorage.setItem("htr-cart",JSON.stringify(cart))}catch(e){}};

function thumb(i,big){const p=i.photos[big?photoIdx:0];return `${ICONS[i.cat]}${p?`<img src="${esc(p)}" alt="${esc(i.name)}" loading="lazy" onerror="this.remove()">`:""}`}
function card(i){
  const inCart=cart.includes(i.id),buy=safeUrl(i.buyUrl);
  const btn=buy?`<a class="btn pri add" href="${esc(buy)}" target="_blank" rel="noopener">Купить</a>`:`<button class="btn add ${inCart?"in":""}" data-add="${i.id}">${inCart?"В корзине":"В корзину"}</button>`;
  return `<article class="card"><button class="thumb" data-open="${i.id}" style="${bg(i.color)}" aria-label="Подробнее: ${esc(i.name)}">${thumb(i)}<span class="lot">HTR-${i.id}</span>${i.tag?`<span class="tag ${esc(i.tag)}">${i.tag==="new"?"Новинка":"Хит"}</span>`:""}${i.photos.length>1?`<span class="pcount">${i.photos.length} фото</span>`:""}</button>
  <div class="body"><h3>${esc(i.name)}</h3><div class="specs">${i.specs.map(s=>`<span>${esc(s)}</span>`).join("")}</div>
  <div class="foot"><span class="price">${money(i.price)}</span>${btn}</div></div></article>`;
}
function render(){
  document.title=S.name;
  let list=ITEMS.filter(i=>(cat==="all"||i.cat===cat)&&(i.name+" "+i.specs.join(" ")+" "+i.id).toLowerCase().includes(q));
  list.sort((a,b)=>sort==="lo"?a.price-b.price:sort==="hi"?b.price-a.price:sort==="new"?b.order-a.order:a.order-b.order);
  const [n1,...rest]=S.name.split(" ");
  $("#root").innerHTML=`
  <header><div class="wrap bar"><div class="logo"><b>${esc(n1)}</b>${esc(rest.join(" "))}</div>
   <div class="search"><input id="q" type="search" placeholder="Найти мод…" aria-label="Поиск" value="${esc(q)}"></div>
   <button class="btn pri" id="openCart" aria-label="Корзина"><span class="lbl">Корзина</span><span class="cnt">${cart.length}</span></button></div></header>
  <main>
   <section class="wrap hero"><div><h1>${esc(S.heroTitle)} <span>${esc(S.heroAccent)}</span></h1><p>${esc(S.heroText)}</p></div>
    <div class="stats"><div><strong>${ITEMS.length}</strong><small>модов</small></div><div><strong>Add-On</strong><small>установка</small></div><div><strong>Весь мир</strong><small>оплата</small></div></div></section>
   <section class="wrap">
    <div class="cats" role="toolbar" aria-label="Категории">${CATS.map(([id,nm])=>{const n=id==="all"?ITEMS.length:ITEMS.filter(i=>i.cat===id).length;return n||id==="all"?`<button data-c="${id}" aria-pressed="${id===cat}">${nm}<span class="c">${n}</span></button>`:""}).join("")}</div>
    <div class="tools"><span class="found">Найдено: ${list.length}</span>
     <select id="sort" aria-label="Сортировка"><option value="order">По порядку</option><option value="new">Сначала новые</option><option value="lo">Сначала дешёвые</option><option value="hi">Сначала дорогие</option></select></div>
    <div class="grid">${list.length?list.map(card).join(""):`<div class="empty">Ничего не нашлось. Попробуй другое название.</div>`}</div>
   </section>
   <section class="wrap how"><h2>Как купить</h2><div class="steps">
    <div><b>Шаг 1</b><h4>Выбери мод</h4><p>Нажми «Купить» или собери несколько модов в корзину.</p></div>
    <div><b>Шаг 2</b><h4>Оплати</h4><p>${esc(S.payNote)}</p></div>
    <div><b>Шаг 3</b><h4>Установи</h4><p>В архиве мод и инструкция: Add-On через dlclist или Addon Peds. Вопросы пиши в Telegram.</p></div>
   </div></section>
  </main>
  <footer><div class="wrap"><span>© ${new Date().getFullYear()} ${esc(S.name)}. Моды для одиночной игры GTA 5.</span><span>Telegram: <a class="mono" href="https://t.me/${encodeURIComponent(tg())}" target="_blank" rel="noopener">@${esc(tg())}</a></span></div></footer>`;
  $("#sort").value=sort;
  renderOverlay();
}
function renderOverlay(){
  let o=$("#ov");if(!o){o=document.createElement("div");o.id="ov";document.body.appendChild(o)}
  if(openId==="cart"){o.innerHTML=cartHTML();return}
  const i=openId&&ITEMS.find(x=>x.id===openId);o.innerHTML=i?itemHTML(i):"";
}
function cartHTML(){
  const its=cart.map(id=>ITEMS.find(i=>i.id===id)).filter(Boolean),total=its.reduce((s,i)=>s+Number(i.price||0),0);
  const txt=`Заказ ${S.name}\n`+its.map(i=>`• HTR-${i.id} ${i.name} — ${money(i.price)}`).join("\n")+`\nИтого: ${money(total)}`;
  return `<div class="shade" data-close></div><aside class="drawer" aria-label="Корзина"><div class="dh"><h3>Корзина</h3><button class="x" data-close aria-label="Закрыть">✕</button></div>
  <div class="items">${its.length?its.map(i=>`<div class="row"><div class="sw" style="${bg(i.color)}">${i.photos[0]?`<img src="${esc(i.photos[0])}" alt="">`:""}</div><div class="t"><div>${esc(i.name)}</div><small>HTR-${i.id} · ${esc(i.size)}</small></div><span class="p">${money(i.price)}</span><button class="rm" data-add="${i.id}" aria-label="Убрать">✕</button></div>`).join(""):`<p class="note" style="padding:24px 0;text-align:center">Корзина пустая. Добавь моды из каталога.</p>`}</div>
  <div class="df"><div class="total"><span>Итого</span><span>${money(total)}</span></div>
  ${its.length?`<p class="note">Скопируй заказ и отправь в Telegram <span class="mono">@${esc(tg())}</span>. Пришлю ссылку на оплату любой картой мира.</p><div class="order" id="orderText">${esc(txt)}</div>
  <button class="btn pri" id="copy">Скопировать заказ</button><a class="btn" href="https://t.me/${encodeURIComponent(tg())}" target="_blank" rel="noopener">Открыть Telegram</a>`:""}</div></aside>`;
}
function itemHTML(i){
  const inCart=cart.includes(i.id),buy=safeUrl(i.buyUrl);
  return `<div class="shade" data-close></div><div class="modal" role="dialog" aria-modal="true"><div class="mbox">
   <div class="thumb" style="${bg(i.color)}">${thumb(i,true)}<span class="lot">HTR-${i.id}</span></div>
   ${i.photos.length>1?`<div class="gal">${i.photos.map((p,k)=>`<button data-ph="${k}" aria-current="${k===photoIdx}" aria-label="Фото ${k+1}"><img src="${esc(p)}" alt=""></button>`).join("")}</div>`:""}
   <div class="mbody"><div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><h3>${esc(i.name)}</h3><button class="x" data-close aria-label="Закрыть">✕</button></div>
   <p>${esc(i.desc)}</p>
   <dl class="kv"><dt>Категория</dt><dd>${(CATS.find(c=>c[0]===i.cat)||["","Другое"])[1]}</dd>${i.size?`<dt>Размер</dt><dd>${esc(i.size)}</dd>`:""}${i.specs.length?`<dt>Особенности</dt><dd>${esc(i.specs.join(" · "))}</dd>`:""}<dt>Игра</dt><dd>GTA 5 (одиночная)</dd></dl>
   <div class="foot"><span class="price">${money(i.price)}</span><div style="display:flex;gap:8px;flex-wrap:wrap">${buy?`<a class="btn pri" href="${esc(buy)}" target="_blank" rel="noopener">Купить</a>`:""}<button class="btn ${inCart?"in pri":""}" data-add="${i.id}">${inCart?"В корзине":"В корзину"}</button></div></div>
   </div></div></div>`;
}
function toast(t){let el=$("#toast");if(!el){el=document.createElement("div");el.id="toast";el.className="toast";document.body.appendChild(el)}el.textContent=t;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,2400)}

document.addEventListener("click",ev=>{
  if(ev.target.classList&&ev.target.classList.contains("modal")){openId=null;renderOverlay();return}
  const t=ev.target.closest("[data-c],[data-add],[data-open],[data-close],[data-ph],#openCart,#copy");if(!t)return;
  const d=t.dataset;
  if(d.c){cat=d.c;render()}
  else if(d.add){cart.includes(d.add)?(cart=cart.filter(x=>x!==d.add),toast("Убрано из корзины")):(cart.push(d.add),toast("Добавлено в корзину"));saveCart();render()}
  else if(d.open){openId=d.open;photoIdx=0;renderOverlay()}
  else if(d.ph!==undefined){photoIdx=+d.ph;renderOverlay()}
  else if("close" in d){openId=null;renderOverlay()}
  else if(t.id==="openCart"){openId="cart";renderOverlay()}
  else if(t.id==="copy"){const el=$("#orderText");navigator.clipboard.writeText(el.textContent).then(()=>toast("Заказ скопирован")).catch(()=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);toast("Текст выделен, нажми Ctrl+C")})}
});
document.addEventListener("input",e=>{if(e.target.id==="q"){q=e.target.value.trim().toLowerCase();const pos=e.target.selectionStart;render();const n=$("#q");n.focus();try{n.setSelectionRange(pos,pos)}catch(x){}}});
document.addEventListener("change",e=>{if(e.target.id==="sort"){sort=e.target.value;render()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){openId=null;renderOverlay()}});
render();
})();
