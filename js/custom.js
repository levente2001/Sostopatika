(()=>{const header=document.querySelector('header'),nav=header?.querySelector('nav');if(!nav)return;document.documentElement.classList.add('js-menu');nav.id='site-navigation';const button=document.createElement('button');button.type='button';button.className='menu-toggle';button.setAttribute('aria-controls',nav.id);button.setAttribute('aria-expanded','false');button.innerHTML='<span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span>Menü</span>';header.insertBefore(button,nav);const set=open=>{button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);if(matchMedia('(max-width:1050px)').matches)nav.inert=!open;else nav.inert=false};button.onclick=()=>set(button.getAttribute('aria-expanded')!=='true');const mq=matchMedia('(max-width:1050px)');mq.addEventListener('change',()=>set(false));set(false);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){set(false);button.focus()}});const more=document.createElement('details');more.className='nav-more';more.innerHTML='<summary>További információk</summary><div class="nav-more-links"><a href="gyogyszerek.html">Gyógyszerek</a><a href="fizetes.html">Fizetés</a><a href="eszk.html">Segédeszközök</a><a href="egyeb2.html">Egyéb termékek</a><a href="homeopatia.html">Homeopátia</a><a href="akciok.html">Akciók</a><a href="hirek.html">Hírek</a><a href="ajanlott.html">Ajánlott oldalak</a></div>';nav.insertBefore(more,nav.lastElementChild);document.addEventListener('click',e=>{if(!more.contains(e.target))more.open=false});nav.querySelectorAll('a').forEach(a=>{if(new URL(a.href).pathname===location.pathname||location.pathname==='/'&&a.getAttribute('href')==='index.html')a.setAttribute('aria-current','page')});})();
(()=> {
if(window.SOSTO_CONFIG?.mode==="live")return;
const key='sosto-demo-v2';
try{localStorage.removeItem('sosto-demo-v1')}catch{}
const statuses=['Új','Előkészítés alatt','Telefonon értesítve','Lezárva'];
const sample={name:'Minta Beteg',phone:'+36 00 000 0000',email:'minta@example.invalid',message:'Mintakészítmény A – 1 doboz. Kérem, jelezzék telefonon, mikor érhető el.'};
const seeds=()=>[
 ['Minta Páciens 01','Mintakészítmény A – 2 doboz. Szeretnék érdeklődni az elérhetőségről.','Új',0],
 ['Minta Páciens 02','Mintakészítmény B – 1 doboz. Délután tudnék érte menni.','Új',1],
 ['Minta Páciens 03','Mintakészítmény C – 1 doboz. Kérem, telefonon jelezzenek.','Előkészítés alatt',2],
 ['Minta Páciens 04','Mintakészítmény D – 2 doboz.','Telefonon értesítve',3],
 ['Minta Páciens 05','Mintakészítmény E – 1 doboz.','Lezárva',4]
].map(([name,message,status,n])=>({name,message,status,id:1005-n,phone:'+36 00 000 000'+n,email:'minta'+(n+1)+'@example.invalid',date:new Date(Date.now()-n*3600000).toLocaleString('hu-HU')}));
const read=()=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):seeds()}catch{return seeds()}};
const save=x=>localStorage.setItem(key,JSON.stringify(x));
const f=document.querySelector('#request');
if(f){
 f.querySelector('[type=submit]').disabled=false;
 document.querySelector('#fill').onclick=()=>Object.entries(sample).forEach(([k,v])=>f.elements[k].value=v);
 f.onsubmit=e=>{e.preventDefault();if(!Object.entries(sample).every(([k,v])=>f.elements[k].value===v))return;
 const data=read();save([{...sample,id:Math.max(1000,...data.map(x=>x.id))+1,status:'Új',date:new Date().toLocaleString('hu-HU')},...data]);f.reset();
 const result=document.querySelector('#result');result.replaceChildren(document.createTextNode('A mintaigény helyben rögzítve. '));const a=document.createElement('a');a.href='admin.html';a.textContent='Megtekintés az adminisztrációban →';result.append(a);
 };
}
const records=document.querySelector('#records');
if(records){
 const search=document.querySelector('#search'),filter=document.querySelector('#filter');
 const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e};
 function render(){
 const data=read();document.querySelector('#stats').replaceChildren(...statuses.map(s=>{const d=el('div');d.append(el('b',String(data.filter(r=>r.status===s).length)),document.createTextNode(s));return d}));
 const q=search.value.trim().toLocaleLowerCase('hu');const visible=data.filter(r=>(!filter.value||r.status===filter.value)&&[r.id,r.name,r.message,r.email,r.phone].some(v=>String(v).toLocaleLowerCase('hu').includes(q)));
 document.querySelector('#count').textContent=visible.length+' / '+data.length+' igény';records.replaceChildren();
 if(!visible.length)records.append(el('p','Nincs a keresésnek megfelelő igény.','empty'));
 visible.forEach(r=>{
 const row=el('article',undefined,'desk-row');
 const person=el('div');person.append(el('p','#'+r.id+' · '+r.date,'eyebrow'),el('h3',r.name),el('small','Telefon: '+r.phone),el('small',r.email));
 const msg=el('div');msg.append(el('strong','Beteg üzenete'),el('p',r.message));
 const action=el('div');action.append(el('span',r.status,'status-pill'));const lab=el('label','Állapot módosítása');const sel=el('select');sel.setAttribute('aria-label','Igény '+r.id+' állapota');statuses.forEach(s=>sel.add(new Option(s,s)));sel.value=r.status;
 const change=s=>{save(read().map(x=>x.id===r.id?{...x,status:s}:x));render()};sel.onchange=()=>change(sel.value);lab.append(sel);action.append(lab);
 if(r.status!=='Telefonon értesítve'&&r.status!=='Lezárva'){const b=el('button','Telefonon értesítve','outline btn');b.type='button';b.style.marginTop='10px';b.onclick=()=>change('Telefonon értesítve');action.append(b)}
 row.append(person,msg,action);records.append(row);
 });
 }
 search.oninput=render;filter.onchange=render;document.querySelector('#reset').onclick=()=>{save(seeds());search.value='';filter.value='';render()};window.addEventListener('storage',render);render();
}
})();