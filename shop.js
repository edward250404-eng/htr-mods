(async function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl=u=>/^https:\/\//i.test(u||"")?u:"";

/* ---------- Языки ---------- */
const T={
 ru:{search:"Найти мод…",cart:"Корзина",all:"Все",car:"Машины",moto:"Мотоциклы",ped:"Персонажи",map:"Карты",pack:"Наборы",other:"Другое",
  mods:"модов",install:"установка",world:"Весь мир",payment:"оплата",found:"Найдено",sOrder:"По порядку",sNew:"Сначала новые",sLo:"Сначала дешёвые",sHi:"Сначала дорогие",
  empty:"Ничего не найдено",how:"Как купить",step:"Шаг",h1:"Выбери мод",p1:"Нажми «Купить» или собери несколько модов в корзину.",h2:"Оплати",h3:"Установи",
  p3:"В архиве мод и инструкция: Add-On через dlclist или Addon Peds. Вопросы пиши в Telegram.",foot:"Моды для одиночной игры GTA 5.",
  buy:"Купить",add:"В корзину",inCart:"В корзине",new:"Новинка",hit:"Хит",photos:"фото",cartEmpty:"Корзина пустая. Добавь моды из каталога.",total:"Итого",
  orderNote:"Нажми «Написать в Telegram»: текст заказа скопируется сам, просто вставь его в чат с {tg}. В ответ пришлю реквизиты: PayPal, USDT или карта украинского банка.",copy:"Скопировать заказ",openTg:"Написать в Telegram",order:"Заказ",
  added:"Добавлено в корзину",removed:"Убрано из корзины",copied:"Заказ скопирован",selected:"Текст выделен, нажми Ctrl+C",
  cat:"Категория",size:"Размер",specs:"Особенности",game:"Игра",gameV:"GTA 5 (одиночная)",close:"Закрыть",prev:"Предыдущее фото",next:"Следующее фото",
  hello:"Привет! Хочу купить:",copiedTg:"Заказ скопирован — вставь его в чат (Ctrl+V)",tagline:"САМЫЕ СВЕЖИЕ МОДЫ",cta:"Смотреть моды",uaCards:"Карты Украины",weAccept:"Принимаем к оплате",payWith:"Способы оплаты",loadErr:"Не удалось загрузить каталог. Обнови страницу.",
  heroTitle:"Моды для GTA 5",heroAccent:"от HTR",heroText:"Машины, мотоциклы и персонажи, собранные вручную в Blender. Каждый мод проверен в игре и ставится как Add-On, не заменяя стандартные модели.",payNote:"Оплата картой любой страны или PayPal. После оплаты файл приходит на почту автоматически."},
 en:{search:"Search mods…",cart:"Cart",all:"All",car:"Cars",moto:"Motorcycles",ped:"Characters",map:"Maps",pack:"Packs",other:"Other",
  mods:"mods",install:"install",world:"Worldwide",payment:"payment",found:"Found",sOrder:"Default order",sNew:"Newest first",sLo:"Price: low to high",sHi:"Price: high to low",
  empty:"Nothing found",how:"How to buy",step:"Step",h1:"Pick a mod",p1:"Press “Buy” or add several mods to the cart.",h2:"Pay",h3:"Install",
  p3:"The archive contains the mod and a guide: Add-On via dlclist or Addon Peds. Questions? Write on Telegram.",foot:"Mods for GTA 5 single player.",
  buy:"Buy",add:"Add to cart",inCart:"In cart",new:"New",hit:"Hit",photos:"photos",cartEmpty:"Your cart is empty. Add mods from the catalog.",total:"Total",
  orderNote:"Press “Message on Telegram”: your order text is copied automatically, just paste it into the chat with {tg}. I’ll reply with payment details: PayPal, USDT or a Ukrainian bank card.",copy:"Copy order",openTg:"Message on Telegram",order:"Order",
  added:"Added to cart",removed:"Removed from cart",copied:"Order copied",selected:"Text selected, press Ctrl+C",
  cat:"Category",size:"Size",specs:"Features",game:"Game",gameV:"GTA 5 (single player)",close:"Close",prev:"Previous photo",next:"Next photo",
  hello:"Hi! I’d like to buy:",copiedTg:"Order copied — paste it into the chat (Ctrl+V)",tagline:"THE FRESHEST MODS",cta:"Browse mods",uaCards:"Ukrainian cards",weAccept:"We accept",payWith:"Payment methods",loadErr:"Couldn’t load the catalog. Please refresh the page.",
  heroTitle:"Mods for GTA 5",heroAccent:"by HTR",heroText:"Cars, motorcycles and characters hand-built in Blender. Every mod is tested in game and installs as an Add-On without replacing the stock models.",payNote:"Pay with a card from any country or with PayPal. The file arrives by email automatically after payment."},
 hi:{search:"मॉड खोजें…",cart:"कार्ट",all:"सभी",car:"कारें",moto:"मोटरसाइकिलें",ped:"किरदार",map:"मैप",pack:"पैक",other:"अन्य",
  mods:"मॉड",install:"इंस्टॉल",world:"पूरी दुनिया",payment:"भुगतान",found:"मिले",sOrder:"क्रम से",sNew:"पहले नए",sLo:"पहले सस्ते",sHi:"पहले महंगे",
  empty:"कुछ नहीं मिला",how:"कैसे खरीदें",step:"चरण",h1:"मॉड चुनें",p1:"«खरीदें» दबाएँ या कई मॉड कार्ट में जोड़ें।",h2:"भुगतान करें",h3:"इंस्टॉल करें",
  p3:"आर्काइव में मॉड और निर्देश हैं: dlclist या Addon Peds से Add-On। कोई सवाल हो तो Telegram पर लिखें।",foot:"GTA 5 सिंगल-प्लेयर के लिए मॉड।",
  buy:"खरीदें",add:"कार्ट में डालें",inCart:"कार्ट में है",new:"नया",hit:"हिट",photos:"फ़ोटो",cartEmpty:"कार्ट खाली है। कैटलॉग से मॉड जोड़ें।",total:"कुल",
  orderNote:"«Telegram पर लिखें» दबाएँ: ऑर्डर का टेक्स्ट अपने-आप कॉपी हो जाएगा, बस उसे {tg} के चैट में पेस्ट करें। जवाब में भुगतान की जानकारी भेजूँगा: PayPal, USDT या यूक्रेनी बैंक कार्ड।",copy:"ऑर्डर कॉपी करें",openTg:"Telegram पर लिखें",order:"ऑर्डर",
  added:"कार्ट में जोड़ा गया",removed:"कार्ट से हटाया गया",copied:"ऑर्डर कॉपी हो गया",selected:"टेक्स्ट चुना गया, Ctrl+C दबाएँ",
  cat:"श्रेणी",size:"साइज़",specs:"विशेषताएँ",game:"गेम",gameV:"GTA 5 (सिंगल-प्लेयर)",close:"बंद करें",prev:"पिछली फ़ोटो",next:"अगली फ़ोटो",
  hello:"नमस्ते! मैं ये खरीदना चाहता हूँ:",copiedTg:"ऑर्डर कॉपी हो गया — चैट में पेस्ट करें (Ctrl+V)",tagline:"सबसे नए मॉड",cta:"मॉड देखें",uaCards:"यूक्रेनी कार्ड",weAccept:"हम स्वीकार करते हैं",payWith:"भुगतान के तरीके",loadErr:"कैटलॉग लोड नहीं हुआ। पेज रीफ़्रेश करें।",
  heroTitle:"GTA 5 के लिए मॉड",heroAccent:"HTR से",heroText:"Blender में हाथ से बनाई गई कारें, मोटरसाइकिलें और किरदार। हर मॉड गेम में जाँचा गया है और Add-On के रूप में इंस्टॉल होता है, मूल मॉडल नहीं बदलता।",payNote:"किसी भी देश के कार्ड या PayPal से भुगतान। भुगतान के बाद फ़ाइल अपने-आप ईमेल पर आ जाती है।"}
};
const LANGS=[["ru","RU","Русский"],["en","EN","English"],["hi","HI","हिन्दी"]];
function detectLang(){
  try{const s=localStorage.getItem("htr-lang");if(T[s])return s}catch(e){}
  let tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
  if(/^Asia\/(Kolkata|Calcutta)$/.test(tz))return "hi";
  const langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]).map(l=>String(l).toLowerCase().split("-")[0]);
  for(const l of langs){
    if(["ru","uk","be","kk","ky","uz","tg","tk","az","hy","ka"].includes(l))return "ru";
    if(["hi","mr","bn","ta","te","gu","pa","kn","ml","or","as","ur"].includes(l))return "hi";
    if(l==="en"&&langs[0]===l)return "en";
  }
  if(/^(Europe\/(Moscow|Kiev|Kyiv|Minsk|Simferopol|Volgograd|Kirov|Astrakhan|Saratov|Ulyanovsk|Samara|Kaliningrad|Chisinau)|Asia\/(Yekaterinburg|Omsk|Novosibirsk|Barnaul|Tomsk|Novokuznetsk|Krasnoyarsk|Irkutsk|Chita|Yakutsk|Khandyga|Vladivostok|Ust-Nera|Magadan|Sakhalin|Srednekolymsk|Kamchatka|Anadyr|Almaty|Qostanay|Aqtobe|Aqtau|Atyrau|Oral|Qyzylorda|Bishkek|Tashkent|Samarkand|Dushanbe|Ashgabat|Baku|Yerevan|Tbilisi))$/.test(tz))return "ru";
  return "en";
}
let lang=detectLang();
const t=k=>(T[lang]&&T[lang][k])??T.en[k]??k;

/* ---------- Данные ---------- */
const CATS=["all","car","moto","ped","map","pack","other"];
const COLORS={car:"#2f5d8a",moto:"#b35a1f",ped:"#c9a227",map:"#2f6a8a",pack:"#6b3f8a",other:"#4f6d7a"};
const ICONS={
 car:'<svg viewBox="0 0 120 60" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><path d="M8 40v-8l14-4 14-12h34l18 12 20 4v8"/><path d="M8 40h12M40 40h40M100 40h12"/><circle cx="30" cy="42" r="9"/><circle cx="90" cy="42" r="9"/><path d="M40 28h50"/></svg>',
 moto:'<svg viewBox="0 0 120 60" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><circle cx="24" cy="42" r="13"/><circle cx="96" cy="42" r="13"/><path d="M24 42l22-18h22l10 12h18"/><path d="M46 24l-6-8h-10M78 36l8-22h12"/></svg>',
 ped:'<svg viewBox="0 0 120 80" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><circle cx="60" cy="16" r="10"/><path d="M42 34h36l-4 22h-6l-2 20h-8l-2-20h-6z"/><path d="M42 34l-10 22M78 34l10 22"/></svg>',
 map:'<svg viewBox="0 0 120 70" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><path d="M10 14l30-8 40 10 30-8v50l-30 8-40-10-30 8z"/><path d="M40 6v50M80 16v50"/></svg>',
 pack:'<svg viewBox="0 0 120 70" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linejoin="round"><path d="M20 22l40-14 40 14v32l-40 14-40-14z"/><path d="M20 22l40 14 40-14M60 36v32"/></svg>'
};
ICONS.other=ICONS.pack;

let S={name:"HTR Mods",tg:"",cur:"$"},ITEMS=[];
try{
  const [s,p]=await Promise.all([fetch("/data/settings.json",{cache:"no-cache"}).then(r=>r.json()),fetch("/data/products.json",{cache:"no-cache"}).then(r=>r.json())]);
  S=Object.assign(S,s);
  ITEMS=(p.items||[]).map((it,k)=>{const c=ICONS[it.cat]?it.cat:"other";return Object.assign({specs:[]},it,{cat:c,order:k,id:"i"+k,color:COLORS[c],photos:(it.photos||[]).map(x=>typeof x==="string"?x:x&&x.photo).filter(Boolean)})});
}catch(e){$("#root").innerHTML='<p style="padding:40px;text-align:center">'+esc(t("loadErr"))+'</p>';return}

/* ---------- Google Analytics (включается, если в админке указан ID вида G-XXXXXXX) ---------- */
const GA=String(S.gaId||"G-89GFTE8JJG").trim().toUpperCase();
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
const track=(name,params)=>{try{if(GA)gtag("event",name,params||{})}catch(e){}};
if(/^G-[A-Z0-9]{4,}$/.test(GA)){
  const sc=document.createElement("script");sc.async=true;sc.src="https://www.googletagmanager.com/gtag/js?id="+GA;document.head.appendChild(sc);
  gtag("js",new Date());gtag("config",GA);
}
const itemParams=i=>({currency:S.cur==="$"?"USD":S.cur==="€"?"EUR":S.cur==="₴"?"UAH":"RUB",value:Number(i.price)||0,items:[{item_id:i.id,item_name:i.name,item_category:i.cat,price:Number(i.price)||0}]});

/* текст из админки: сначала поле на языке посетителя (name_en), потом общее поле */
const loc=(o,k)=>{const v=o[k+"_"+lang];return v&&String(v).trim()?v:o[k]};
/* тексты магазина: если в настройках не задан перевод и русский текст не меняли — берём встроенный перевод */
const st=k=>{const v=S[k+"_"+lang];if(v&&String(v).trim())return v;if(lang==="ru")return S[k]??T.ru[k];return (!S[k]||S[k]===T.ru[k])?T[lang][k]:S[k]};

const money=n=>{const v=Number(n)||0;return S.cur==="$"||S.cur==="€"?S.cur+v.toLocaleString("en-US"):v.toLocaleString("ru-RU")+" "+S.cur};
const bg=c=>`background:radial-gradient(120% 90% at 30% 20%, ${c} 0%, color-mix(in srgb, ${c} 45%, #0d0f13) 70%)`;
const tg=()=>String(S.tg||"").replace(/^@/,"");
let cat="all",q="",sort="order",cart=[],openId=null,photoIdx=0;
const slidePos={};
try{const saved=JSON.parse(localStorage.getItem("htr-cart2")||"[]");cart=saved.filter(id=>ITEMS.some(i=>i.id===id))}catch(e){}
const saveCart=()=>{try{localStorage.setItem("htr-cart2",JSON.stringify(cart))}catch(e){}};

/* ---------- Карусель фото ---------- */
function carousel(i,key,big){
  const ph=i.photos;
  if(!ph.length)return `<div class="thumb ${big?"big":""}" style="${bg(i.color)}" ${big?"":`data-open="${i.id}" data-idx="0" role="button" tabindex="0" aria-label="${esc(loc(i,"name"))}"`}>${ICONS[i.cat]}${tagHTML(i)}</div>`;
  return `<div class="thumb ${big?"big":""}" style="${bg(i.color)}">
   <div class="slides" data-key="${key}">${ph.map((p,k)=>`<div class="slide" ${big?"":`data-open="${i.id}" data-idx="${k}" role="button" tabindex="0"`}><img src="${esc(p)}" alt="${esc(loc(i,"name"))}" loading="${k===0&&!big?"eager":"lazy"}" draggable="false"></div>`).join("")}</div>
   ${tagHTML(i)}
   ${ph.length>1?`<button class="nav prev" data-nav="-1" data-key="${key}" aria-label="${esc(t("prev"))}">‹</button><button class="nav next" data-nav="1" data-key="${key}" aria-label="${esc(t("next"))}">›</button>
   <div class="dots" data-dots="${key}">${ph.map((_,k)=>`<span${k===0?' class="on"':""}></span>`).join("")}</div>`:""}
  </div>`;
}
const onSale=i=>Number(i.oldPrice)>Number(i.price);
const pct=i=>Math.round((1-Number(i.price)/Number(i.oldPrice))*100);
const tagHTML=i=>`${onSale(i)?`<span class="sale">−${pct(i)}%</span>`:""}${i.tag==="new"||i.tag==="hit"?`<span class="tag ${i.tag}">${esc(t(i.tag))}</span>`:""}`;
const priceHTML=i=>`<span class="price${onSale(i)?" on":""}">${onSale(i)?`<s>${money(i.oldPrice)}</s>`:""}${money(i.price)}</span>`;
function goSlide(key,dir){
  const el=document.querySelector(`.slides[data-key="${key}"]`);if(!el)return;
  const n=el.children.length,cur=Math.round(el.scrollLeft/el.clientWidth);
  const to=(cur+dir+n)%n;
  el.scrollTo({left:to*el.clientWidth,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}
function syncDots(el){
  const key=el.dataset.key,idx=Math.round(el.scrollLeft/Math.max(1,el.clientWidth));
  slidePos[key]=idx;
  const d=document.querySelector(`[data-dots="${key}"]`);
  if(d)[...d.children].forEach((s,k)=>s.classList.toggle("on",k===idx));
  if(key.startsWith("m:"))document.querySelectorAll(".gal button").forEach((b,k)=>b.setAttribute("aria-current",k===idx));
}
function restoreSlides(){
  document.querySelectorAll(".slides").forEach(el=>{const p=slidePos[el.dataset.key];if(p){el.scrollLeft=p*el.clientWidth;syncDots(el)}});
}
document.addEventListener("scroll",e=>{const el=e.target;if(el.classList&&el.classList.contains("slides"))syncDots(el)},true);

/* поиск: название, описание, особенности, категория на всех языках и скрытые ключевые слова */
const norm=x=>String(x??"").toLowerCase().replace(/ё/g,"е");
const hayCache={};
function haystack(i){
  if(hayCache[i.id])return hayCache[i.id];
  const kw=Array.isArray(i.keywords)?i.keywords.join(" "):i.keywords;
  const parts=[i.name,i.name_ru,i.name_en,i.name_hi,i.desc,i.desc_ru,i.desc_en,i.desc_hi,(i.specs||[]).join(" "),kw,T.ru[i.cat],T.en[i.cat],T.hi[i.cat]];
  return hayCache[i.id]=norm(parts.filter(Boolean).join(" "));
}
/* ---------- Флаги и оплата ---------- */
const FLAGS={
 ru:'<svg viewBox="0 0 30 20" class="flag" aria-hidden="true"><rect width="30" height="20" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0039a6"/><rect y="13.33" width="30" height="6.67" fill="#d52b1e"/></svg>',
 en:'<svg viewBox="0 0 30 20" class="flag" aria-hidden="true"><rect width="30" height="20" fill="#b22234"/>'+[1,3,5,7,9,11].map(k=>`<rect y="${k*20/13}" width="30" height="${20/13}" fill="#fff"/>`).join("")+'<rect width="13" height="10.77" fill="#3c3b6e"/><g fill="#fff">'+[[2,2],[5,2],[8,2],[11,2],[3.5,4.2],[6.5,4.2],[9.5,4.2],[2,6.4],[5,6.4],[8,6.4],[11,6.4],[3.5,8.6],[6.5,8.6],[9.5,8.6]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".6"/>`).join("")+'</g></svg>',
 hi:'<svg viewBox="0 0 30 20" class="flag" aria-hidden="true"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#ff9933"/><rect y="13.33" width="30" height="6.67" fill="#138808"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".7"/><circle cx="15" cy="10" r=".6" fill="#000080"/></svg>'
};
const PAY_ICONS={
 paypal:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8.3 21.5H4.6c-.4 0-.6-.3-.6-.7L6.7 3.4c.1-.5.5-.9 1-.9h6.4c3.7 0 5.6 2 5 5.3-.7 4-3.3 5.6-6.8 5.6H10c-.5 0-.9.4-1 .9l-.7 4.9z" fill="#003087"/><path d="M19.6 7.6c-.7 4-3.3 5.6-6.8 5.6h-2.3c-.5 0-.9.4-1 .9l-1.2 7.4h3.1c.4 0 .8-.3.9-.8l.6-3.9c.1-.5.5-.8.9-.8h.6c3 0 5.4-1.3 6-4.9.3-1.6 0-2.9-.8-3.5z" fill="#009cde"/></svg>',
 usdt:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#26a17b"/><path d="M13.2 10.6V8.9h3.6V6.6H7.2v2.3h3.6v1.7c-2.9.1-5.1.7-5.1 1.4s2.2 1.3 5.1 1.4v5h2.4v-5c2.9-.1 5.1-.7 5.1-1.4s-2.2-1.3-5.1-1.4zm0 2.3c-.1 0-.5 0-1.2 0-.6 0-1 0-1.2 0-2.6-.1-4.4-.6-4.4-1.1s1.9-1 4.4-1.1v1.8h2.4v-1.8c2.6.1 4.4.6 4.4 1.1s-1.9 1-4.4 1.1z" fill="#fff"/></svg>',
 card:'<svg viewBox="0 0 38 24" width="28" height="18" aria-hidden="true"><rect width="38" height="24" rx="3" fill="#fff"/><circle cx="15" cy="12" r="7" fill="#eb001b"/><circle cx="23" cy="12" r="7" fill="#f79e1b"/><path d="M19 6.3a7 7 0 0 1 0 11.4 7 7 0 0 1 0-11.4z" fill="#ff5f00"/></svg>',
 visa:'<svg viewBox="0 0 38 24" width="28" height="18" aria-hidden="true"><rect width="38" height="24" rx="3" fill="#1a1f71"/><text x="19" y="16" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="700" font-style="italic" fill="#fff">VISA</text></svg>'
};
function payBadges(){
  return `<div class="paylist"><span class="pb">${PAY_ICONS.paypal}PayPal</span><span class="pb">${PAY_ICONS.usdt}USDT</span><span class="pb">${PAY_ICONS.visa}${PAY_ICONS.card}${esc(t("uaCards"))}</span></div>`;
}
/* ---------- Отрисовка ---------- */
function card(i){
  const inCart=cart.includes(i.id),buy=safeUrl(i.buyUrl);
  const btn=buy?`<a class="btn pri add" href="${esc(buy)}" target="_blank" rel="noopener">${esc(t("buy"))}</a>`:`<button class="btn add ${inCart?"in":""}" data-add="${i.id}">${esc(t(inCart?"inCart":"add"))}</button>`;
  return `<article class="card">${carousel(i,"c:"+i.id,false)}
  <div class="body"><h3>${esc(loc(i,"name"))}</h3><div class="specs">${(i.specs||[]).map(s=>`<span>${esc(s)}</span>`).join("")}</div>
  <div class="foot">${priceHTML(i)}${btn}</div></div></article>`;
}
function render(){
  document.title=S.name;document.documentElement.lang=lang;
  const words=norm(q).split(/[\s,]+/).filter(Boolean);
  let list=ITEMS.filter(i=>(cat==="all"||i.cat===cat)&&(!words.length||words.every(w=>haystack(i).includes(w))));
  list.sort((a,b)=>sort==="lo"?a.price-b.price:sort==="hi"?b.price-a.price:sort==="new"?b.order-a.order:a.order-b.order);
  const [n1,...rest]=S.name.split(" ");
  $("#root").innerHTML=`
  <header><div class="wrap bar"><a class="logo" href="/" aria-label="${esc(S.name)}"><b>${esc(n1)}</b><span class="rest">${esc(rest.join(" "))}</span></a>
   <div class="search"><input id="q" type="search" placeholder="${esc(t("search"))}" aria-label="${esc(t("search"))}" value="${esc(q)}"></div>
   <details class="langdd"><summary aria-label="Language">${FLAGS[lang]}<span>${LANGS.find(l=>l[0]===lang)[1]}</span><svg class="chev" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></summary>
    <div class="langmenu">${LANGS.map(([c,sh,n])=>`<button data-lang="${c}" aria-current="${c===lang}">${FLAGS[c]}<span>${n}</span></button>`).join("")}</div></details>
   <button class="btn pri" id="openCart" aria-label="${esc(t("cart"))}"><span class="lbl">${esc(t("cart"))}</span><span class="cnt">${cart.length}</span></button></div></header>
  <main>
   <section class="hero"><div class="wrap herowrap">
    <h1>${esc(st("heroTitle"))} <span>${esc(st("heroAccent"))}</span></h1>
    <p class="tagline"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2c.6 3.2-1 5-2.6 6.8C7.8 10.6 6 12.6 6 15.5A6 6 0 0 0 18 15.5c0-2.4-1-4.3-2.4-5.6.2 1.6-.4 2.9-1.6 3.4.4-3.6-.6-8.4-2-11.3z"/></svg>${esc(t("tagline"))}</p>
    <div class="accept"><span class="acclbl">${esc(t("weAccept"))}</span>${payBadges()}</div>
   </div></section>
   <section class="wrap" id="catalog">
    <div class="cats" role="toolbar">${CATS.map(id=>{const n=id==="all"?ITEMS.length:ITEMS.filter(i=>i.cat===id).length;return n||id==="all"?`<button data-c="${id}" aria-pressed="${id===cat}">${esc(t(id))}<span class="c">${n}</span></button>`:""}).join("")}</div>
    <div class="tools"><span></span>
     <select id="sort"><option value="order">${esc(t("sOrder"))}</option><option value="new">${esc(t("sNew"))}</option><option value="lo">${esc(t("sLo"))}</option><option value="hi">${esc(t("sHi"))}</option></select></div>
    <div class="grid">${list.length?list.map(card).join(""):`<div class="empty">${esc(t("empty"))}</div>`}</div>
   </section>
  </main>
  <footer><div class="wrap"><span>© ${new Date().getFullYear()} ${esc(S.name)}. ${esc(t("foot"))}</span><span>Telegram: <a class="mono" href="https://t.me/${encodeURIComponent(tg())}" target="_blank" rel="noopener">@${esc(tg())}</a></span></div></footer>`;
  $("#sort").value=sort;
  renderOverlay();
  restoreSlides();
}
function renderOverlay(){
  let o=$("#ov");if(!o){o=document.createElement("div");o.id="ov";document.body.appendChild(o)}
  document.body.style.overflow=openId?"hidden":"";
  if(openId==="cart"){o.innerHTML=cartHTML();return}
  const i=openId&&ITEMS.find(x=>x.id===openId);
  o.innerHTML=i?itemHTML(i):"";
  if(i&&photoIdx){const el=o.querySelector(".slides");if(el){el.scrollLeft=photoIdx*el.clientWidth;syncDots(el)}}
}
function cartHTML(){
  const its=cart.map(id=>ITEMS.find(i=>i.id===id)).filter(Boolean),total=its.reduce((s,i)=>s+Number(i.price||0),0);
  const txt=`${t("hello")}\n\n${t("order")} ${S.name}\n`+its.map(i=>`• ${loc(i,"name")} — ${money(i.price)}`).join("\n")+`\n${t("total")}: ${money(total)}`;
  return `<div class="shade" data-close></div><aside class="drawer" aria-label="${esc(t("cart"))}"><div class="dh"><h3>${esc(t("cart"))}</h3><button class="x" data-close aria-label="${esc(t("close"))}">✕</button></div>
  <div class="items">${its.length?its.map(i=>`<div class="row"><div class="sw" style="${bg(i.color)}">${i.photos[0]?`<img src="${esc(i.photos[0])}" alt="">`:""}</div><div class="t"><div>${esc(loc(i,"name"))}</div>${i.size?`<small>${esc(i.size)}</small>`:""}</div><span class="p">${onSale(i)?`<s>${money(i.oldPrice)}</s> `:""}${money(i.price)}</span><button class="rm" data-add="${i.id}" aria-label="✕">✕</button></div>`).join(""):`<p class="note" style="padding:24px 0;text-align:center">${esc(t("cartEmpty"))}</p>`}</div>
  <div class="df"><div class="total"><span>${esc(t("total"))}</span><span>${money(total)}</span></div>
  ${its.length?`<div class="cartpay"><span class="acclbl">${esc(t("payWith"))}</span>${payBadges()}</div><p class="note">${esc(t("orderNote")).replace("{tg}",`<span class="mono">@${esc(tg())}</span>`)}</p><div class="order" id="orderText">${esc(txt)}</div>
  <a class="btn pri" id="tgLink" href="https://t.me/${encodeURIComponent(tg())}?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">${esc(t("openTg"))}</a><button class="btn" id="copy">${esc(t("copy"))}</button>`:""}</div></aside>`;
}
function itemHTML(i){
  const inCart=cart.includes(i.id),buy=safeUrl(i.buyUrl);
  return `<div class="shade" data-close></div><div class="modal" role="dialog" aria-modal="true"><div class="mbox">
   ${carousel(i,"m:"+i.id,true)}
   ${i.photos.length>1?`<div class="gal">${i.photos.map((p,k)=>`<button data-ph="${k}" aria-current="${k===photoIdx}" aria-label="${k+1}"><img src="${esc(p)}" alt=""></button>`).join("")}</div>`:""}
   <div class="mbody"><div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><h3>${esc(loc(i,"name"))}</h3><button class="x" data-close aria-label="${esc(t("close"))}">✕</button></div>
   ${loc(i,"desc")?`<p>${esc(loc(i,"desc"))}</p>`:""}
   <dl class="kv"><dt>${esc(t("cat"))}</dt><dd>${esc(t(i.cat))}</dd>${i.size?`<dt>${esc(t("size"))}</dt><dd>${esc(i.size)}</dd>`:""}${(i.specs||[]).length?`<dt>${esc(t("specs"))}</dt><dd>${esc(i.specs.join(" · "))}</dd>`:""}<dt>${esc(t("game"))}</dt><dd>${esc(t("gameV"))}</dd></dl>
   <div class="foot">${priceHTML(i)}<div style="display:flex;gap:8px;flex-wrap:wrap">${buy?`<a class="btn pri" href="${esc(buy)}" target="_blank" rel="noopener">${esc(t("buy"))}</a>`:""}<button class="btn ${inCart?"in pri":""}" data-add="${i.id}">${esc(t(inCart?"inCart":"add"))}</button></div></div>
   </div></div></div>`;
}
function toast(m){let el=$("#toast");if(!el){el=document.createElement("div");el.id="toast";el.className="toast";document.body.appendChild(el)}el.textContent=m;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,2400)}

/* ---------- События ---------- */
document.addEventListener("click",ev=>{
  document.querySelectorAll("details.langdd[open]").forEach(x=>{if(!x.contains(ev.target))x.removeAttribute("open")});
  if(ev.target.classList&&ev.target.classList.contains("modal")){openId=null;renderOverlay();return}
  const el=ev.target.closest("[data-lang],[data-nav],[data-c],[data-add],[data-open],[data-close],[data-ph],#openCart,#copy,#tgLink");if(!el)return;
  const d=el.dataset;
  if(d.lang){lang=d.lang;track("select_language",{language:lang});try{localStorage.setItem("htr-lang",lang)}catch(x){}render();return}
  if(d.nav){ev.preventDefault();goSlide(d.key,+d.nav)}
  else if(d.c){cat=d.c;render()}
  else if(d.add){cart.includes(d.add)?(cart=cart.filter(x=>x!==d.add),toast(t("removed"))):(cart.push(d.add),toast(t("added")),track("add_to_cart",itemParams(ITEMS.find(x=>x.id===d.add))));saveCart();render()}
  else if(d.open){openId=d.open;photoIdx=+d.idx||0;renderOverlay();track("view_item",itemParams(ITEMS.find(x=>x.id===d.open)))}
  else if(d.ph!==undefined){const s=document.querySelector(".mbox .slides");if(s)s.scrollTo({left:+d.ph*s.clientWidth,behavior:"smooth"})}
  else if("close" in d){openId=null;renderOverlay()}
  else if(el.id==="openCart"){openId="cart";renderOverlay()}
  else if(el.id==="tgLink"){{const its=cart.map(id=>ITEMS.find(i=>i.id===id)).filter(Boolean);track("begin_checkout",{currency:"USD",value:its.reduce((a,i)=>a+Number(i.price||0),0),items:its.map(i=>({item_id:i.id,item_name:i.name,price:Number(i.price)||0}))})}const o=$("#orderText");if(o&&navigator.clipboard)navigator.clipboard.writeText(o.textContent).then(()=>toast(t("copiedTg"))).catch(()=>{})}
  else if(el.id==="copy"){const o=$("#orderText");navigator.clipboard.writeText(o.textContent).then(()=>toast(t("copied"))).catch(()=>{const r=document.createRange();r.selectNodeContents(o);const s=getSelection();s.removeAllRanges();s.addRange(r);toast(t("selected"))})}
});
/* мышью тоже можно тянуть фото */
let drag=null;
document.addEventListener("pointerdown",e=>{const s=e.target.closest(".slides");if(!s||e.pointerType!=="mouse")return;drag={s,x:e.clientX,left:s.scrollLeft,moved:false};s.classList.add("dragging")});
document.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>4)drag.moved=true;drag.s.scrollLeft=drag.left-dx});
document.addEventListener("pointerup",e=>{if(!drag)return;const {s,moved,left}=drag;s.classList.remove("dragging");const w=s.clientWidth,dx=s.scrollLeft-left;const idx=Math.round(left/w)+(Math.abs(dx)>w*0.15?Math.sign(dx):0);s.scrollTo({left:Math.max(0,Math.min(idx,s.children.length-1))*w,behavior:"smooth"});if(moved){const stop=ev=>{ev.stopPropagation();ev.preventDefault()};window.addEventListener("click",stop,{capture:true,once:true});setTimeout(()=>window.removeEventListener("click",stop,true),50)}drag=null});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){openId=null;renderOverlay();return}
  if((e.key==="Enter"||e.key===" ")&&e.target.dataset&&e.target.dataset.open){e.preventDefault();e.target.click()}
  if(openId&&openId!=="cart"&&(e.key==="ArrowLeft"||e.key==="ArrowRight"))goSlide("m:"+openId,e.key==="ArrowLeft"?-1:1);
});
document.addEventListener("input",e=>{if(e.target.id==="q"){q=e.target.value.trim().toLowerCase();const pos=e.target.selectionStart;render();const n=$("#q");n.focus();try{n.setSelectionRange(pos,pos)}catch(x){}}});
document.addEventListener("change",e=>{
  if(e.target.id==="sort"){sort=e.target.value;render()}
  if(e.target.id==="lang"){lang=e.target.value;try{localStorage.setItem("htr-lang",lang)}catch(x){}render()}
});
let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(restoreSlides,120)});
render();
})();
