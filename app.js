import { photoMarkup, bindPhotos } from './photo-ui.js?v=bed-review-20261121';
import { catalog } from './attractions.js';
import { planRoute } from './route-planner.js';
import { mountStay } from './hotel-stay.js?v=bed-review-20261121';
import { mountWorkshops, workshopCopy, workshopCandidatesMarkup } from './workshops.js?v=appendix-20261121';
const $ = s => document.querySelector(s);
let lang = 'zh';
let workshopInterested = false;
try {
  const savedLanguage = localStorage.getItem('mns-lang');
  if (['zh', 'en', 'pt'].includes(savedLanguage)) lang = savedLanguage;
  workshopInterested = JSON.parse(localStorage.getItem('mns-plan'))?.workshopInterested === true;
} catch {}
let tab = 'stay';
let filter = 'all';
const tr = (zh, en, pt) => ({ zh, en, pt })[lang];
const base = 'https://www.macaotourism.gov.mo/';
const source = {
  ruins: base + 'zh-hans/step-out-macao/central/ruins-of-st-pauls',
  cunha:
    base +
    'zh-hans/macao-full-of-fun/portuguese-ambiance-tour-at-taipa-island/rua-do-cunha',
  venice: base + 'en/shopping/shopping-malls/shoppes-at-venetian',
  london: base + 'zh-hant/shopping/shopping-malls/shoppes-at-londoner',
  coloane:
    base + 'zh-hans/macao-full-of-fun/tranquility-tour-in-coloane-village',
  beach:
    base +
    'en/shows-and-entertainment/sports-and-recreation/beaches-and-nautical-sports',
  dining: base + 'zh-hans/dining/specialty-foods/specialty-restaurants',
  dishes: base + 'zh-hant/dining/taste-of-macao/macanese-and-portuguese-dishes',
};
const areas = () => [
  tr('全部', 'All', 'Todos'),
  tr('澳门半岛', 'Macao Peninsula', 'Península'),
  tr('氹仔', 'Taipa', 'Taipa'),
  tr('路氹', 'Cotai', 'Cotai'),
  tr('路环', 'Coloane', 'Coloane'),
];
const places = catalog.map(p => {
  source[p.id] = p.source;
  return [p.id, p.area, ...p.names, p.duration, '', '', '', p.id];
});
const foods = [
  [
    '土生葡菜',
    'Macanese',
    'Macaense',
    '非洲鸡、免治',
    'African chicken, minchi',
    'Galinha africana, minchi',
    'dishes',
  ],
  [
    '葡萄牙菜',
    'Portuguese',
    'Portuguesa',
    '马介休、海鲜饭',
    'Bacalhau, seafood rice',
    'Bacalhau, arroz de marisco',
    'dishes',
  ],
  [
    '粤式茶点',
    'Cantonese dim sum',
    'Dim sum cantonês',
    '大龙凤茶楼：茶点与粤曲文化',
    'Tai Long Fong: dim sum and Cantonese music',
    'Tai Long Fong: dim sum e música cantonesa',
    'dining',
  ],
  [
    '海鲜与粥品',
    'Seafood & congee',
    'Marisco e congee',
    '诚昌饭店：蟹粥',
    'Seng Cheong: crab congee',
    'Seng Cheong: congee de caranguejo',
    'dining',
  ],
  [
    '素食',
    'Vegetarian',
    'Vegetariana',
    'VEGA VEGA：创意素食与咖啡',
    'VEGA VEGA: plant-based café dishes',
    'VEGA VEGA: cozinha vegetariana e café',
    'dining',
  ],
  [
    '咖啡与轻食',
    'Coffee & light meals',
    'Café e refeições leves',
    '阿维斯南湾店：咖啡、土生菜及部分素食',
    'Café Alves Nam Van: coffee, Macanese and vegetarian options',
    'Café Alves Nam Van: café e opções vegetarianas',
    'dining',
  ],
  [
    '日式料理',
    'Japanese',
    'Japonesa',
    '大阪京都：大阪烧与日式小食',
    'Osaka Kyoto: okonomiyaki and Japanese snacks',
    'Osaka Kyoto: okonomiyaki e petiscos',
    'dining',
  ],
  [
    '东南亚料理',
    'Southeast Asian',
    'Sudeste asiático',
    'BIC越泰面馆：越南及泰式风味',
    'BIC: Vietnamese and Thai flavours',
    'BIC: sabores vietnamitas e tailandeses',
    'dining',
  ],
  [    '甜品',
    'Desserts',
    'Sobremesas',
    '木糠布甸，搭配咖啡作休息站',
    'Serradura and a coffee break',
    'Serradura e uma pausa para café',
    'dishes',
  ],
  [
    '街头小吃与手信',
    'Snacks & souvenirs',
    'Petiscos e lembranças',
    '官也街：小吃、传统礼饼与甜品',
    'Rua do Cunha: snacks, traditional pastries and sweets',
    'Rua do Cunha: petiscos e doces tradicionais',
    'cunha',
  ],
];
const roomNames = [
  ['街区故事房', 'Neighbourhood Story Room', 'Quarto Histórias do Bairro'],
  ['文化豪华房', 'Heritage Deluxe Room', 'Quarto Heritage Deluxe'],
  ['家庭探索房', 'Family Discovery Room', 'Quarto Familiar Discovery'],
  ['文化工作室房', 'Culture Studio Room', 'Estúdio Cultural'],
  ['澳门文化套房', 'Macao Heritage Suite', 'Suite Património de Macau'],
];
function name(p) {
  return p[{ zh: 2, en: 3, pt: 4 }[lang]];
}
function room(i) {
  return roomNames[i][{ zh: 0, en: 1, pt: 2 }[lang]];
}
function links(p) {
  return `<a target="_blank" rel="noopener" href="${source[p[9]]}">${tr('旅游局资料', 'MGTO source', 'Fonte DST')}</a> · <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p[3] + ' Macao')}">${tr('查看地图', 'Map', 'Mapa')}</a>`;
}
function render() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  $('#lang').value = lang;
  $('#notice').textContent = tr(
    '课堂演示｜行程按规则生成，非实时AI。房价与交通为模拟估算；不会产生真实订单或付款。资料核对：2026年11月19日。',
    'Classroom demo | Rule-based planner, not live AI. Illustrative prices and transport estimates; no real bookings or payments. Sources checked 19 Nov 2026.',
    'Demonstração académica | Planeador por regras, sem IA em tempo real. Valores ilustrativos; sem reservas ou pagamentos reais. Fontes verificadas em 19/11/2026.'
  );
  $('#app').innerHTML =
    `<section class="hero"><div class="eyebrow">STAY · DISCOVER · CONNECT</div><h1>${tr('从街区故事，出发探索澳门。', 'Your stay. Your stories. Your Macao.', 'A sua estadia. As suas histórias. Macau.')}</h1><p>${tr('澳门街区故事酒店 · 专属旅程助手', 'Macao Neighbourhood Stories Hotel · Your travel companion', 'Macao Neighbourhood Stories Hotel · O seu companheiro de viagem')}</p></section><nav>${[
      ['stay', tr('预订本酒店', 'Stay with us', 'A nossa estadia')],
      ['plan', tr('行程规划', 'Plan a trip', 'Planear')],
      ['places', tr('探索澳门', 'Explore Macao', 'Explorar')],
      ['food', tr('多元美食', 'Food & flavours', 'Sabores')],
      ['workshops', workshopCopy[lang].title],
    ]
      .map(
        ([k, v]) =>
          `<button data-tab="${k}" class="${tab === k ? 'active' : ''}">${v}</button>`
      )
      .join('')}</nav><div id="view"></div>`;
  document.querySelectorAll('[data-tab]').forEach(
    b =>
      (b.onclick = () => {
        tab = b.dataset.tab;
        filter = 'all';
        render();
      })
  );
  if (tab === 'plan') planner();
  if (tab === 'places') explore();
  if (tab === 'food') food();
  if (tab === 'stay') stay();
  if (tab === 'workshops') mountWorkshops($('#view'), { lang, photoMarkup, bindPhotos });
}
function explore() {
  $('#view').innerHTML = `<h2>${tr('澳门景点全览','Explore Macao attractions','Explore as atrações de Macau')}</h2>
    <p>${tr(`收录 ${places.length} 个地标、世遗景点、博物馆、度假区与海岸景点。`,`Browse ${places.length} landmarks, heritage sites, museums, resorts and coastal attractions.`,`Explore ${places.length} monumentos, museus, resorts e locais costeiros.`)}</p>
    <label>${tr('搜索景点','Search attractions','Pesquisar locais')}<input id="place-search" type="search" placeholder="${tr('例如：巴黎人、旅游塔、大熊猫','e.g. Parisian, Tower, Panda','Ex.: Parisian, Torre, Panda')}"></label>
    <div class="filters">${areas().map((a,i)=>`<button data-area="${i}" class="${filter===String(i)||(filter==='all'&&i===0)?'active':''}">${a}</button>`).join('')}</div><div id="place-count" role="status"></div><div class="grid" id="place-grid"></div>`;
  const draw = () => {
    const query=$('#place-search').value.trim().toLowerCase();
    const matches=places.filter(p=>(filter==='all'||filter==='0'||p[1]===Number(filter))&&p.slice(2,5).join(' ').toLowerCase().includes(query));
    $('#place-count').textContent=tr(`共 ${matches.length} 个景点`,`${matches.length} attractions`,`${matches.length} locais`);
    $('#place-grid').innerHTML=matches.length?matches.map(p=>`<article class="card">${photoMarkup(p[0], name(p), lang)}<span class="tag">${areas()[p[1]]}</span><h3>${name(p)}</h3><p>${tr('建议游览预留','Suggested visit allowance','Tempo de visita sugerido')} ${p[5]} min</p>${p[0]==='dominic'?`<p>${tr('旅游局标注暂停开放，仅安排外观。','MGTO lists a closure: exterior only.','Encerramento indicado pela DST: apenas exterior.')}</p>`:''}${catalog.find(item=>item.id===p[0]).bookingOnly?`<p>${tr('须另行预约场次，不自动安排未确认的演出。','Book a performance separately; unconfirmed shows are not scheduled.','Reserve o espetáculo separadamente; sessões não confirmadas não são incluídas.')}</p>`:''}<div>${links(p)}</div></article>`).join(''):`<p>${tr('没有匹配的景点，请换个关键词。','No matches. Try another keyword.','Sem resultados. Tente outra palavra.')}</p>`;
    bindPhotos($('#place-grid'), lang);
  };
  $('#place-search').oninput=draw;
  document.querySelectorAll('[data-area]').forEach(b=>b.onclick=()=>{filter=b.dataset.area;document.querySelectorAll('[data-area]').forEach(x=>x.classList.toggle('active',x===b));draw();});
  draw();
}
function food() {
  $('#view').innerHTML =
    `<h2>${tr('一座城，多种味道', 'A city of many flavours', 'Uma cidade de muitos sabores')}</h2><p class="hint">${tr('按菜系探索旅游局收录的餐厅。价格、分店营业时间和过敏原请向商户核实。素食不等于无蛋奶或无过敏原。', 'Explore MGTO-listed dining options. Confirm prices, branch hours and allergens directly. Vegetarian does not necessarily mean vegan or allergen-free.', 'Explore opções listadas pela DST. Confirme preços, horários e alergénios com o restaurante. Vegetariano não significa vegano ou sem alergénios.')}</p><div class="grid">${foods.map((f, i) => `<article class="card">${photoMarkup(`food-${i}`, f[{ zh: 0, en: 1, pt: 2 }[lang]], lang)}<span class="tag">MACAO FLAVOURS</span><h3>${f[{ zh: 0, en: 1, pt: 2 }[lang]]}</h3><p>${f[{ zh: 3, en: 4, pt: 5 }[lang]]}</p><a href="${source[f[6]]}" target="_blank" rel="noopener">${tr('查看旅游局推荐', 'Explore MGTO recommendations', 'Consultar sugestões da DST')}</a></article>`).join('')}</div>`;
  bindPhotos($('#view'), lang);
}
function planner() {
  const themes = [
    ['classic', tr('首次到访 · 经典地标', 'First visit · highlights', 'Primeira visita · destaques')],
    ['heritage', tr('文化与历史街区', 'Culture & heritage', 'Cultura e património')],
    ['family', tr('亲子与互动体验', 'Family & interactive', 'Família e experiências')],
    ['coast', tr('海岸与慢游', 'Coast & slow travel', 'Costa e passeios tranquilos')],
    ['shopping', tr('度假区与购物', 'Resorts & shopping', 'Resorts e compras')],
  ];
  $('#view').innerHTML = `<section class="panel"><h2>${tr('告诉我们你的旅行方式', 'Tell us how you like to travel', 'Diga-nos como gosta de viajar')}</h2>
    <p>${tr('不需要先选景点。我们会从完整景点库中，按兴趣、片区、可用时间和预算为你安排路线。', 'No attraction checklist. We choose a route from the full catalogue using your interests, available time and budget.', 'Sem lista de locais para selecionar. Criamos um percurso com base nos seus interesses, tempo e orçamento.')}</p>
    <form id="plan-form"><div class="formgrid">
    <label>${tr('游玩天数', 'Duration', 'Duração')}<select id="days">${[1,2,3,4,5,6,7].map(n => `<option value="${n}" ${n===2?'selected':''}>${n} ${tr('天', 'days', 'dias')}</option>`).join('')}</select></label>
    <label>${tr('旅行兴趣', 'Travel interests', 'Interesses')}<select id="theme">${themes.map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label>
    <label>${tr('游玩节奏', 'Pace', 'Ritmo')}<select id="pace"><option value="normal">${tr('适中', 'Balanced', 'Equilibrado')}</option><option value="slow">${tr('少走路，慢慢游', 'Less walking', 'Menos caminhada')}</option></select></label>
    <label>${tr('每人全程预算，不含住宿（MOP）', 'Total budget per person, excluding stay (MOP)', 'Orçamento total por pessoa, sem alojamento (MOP)')}<input id="budget" type="number" min="100" value="800" required></label>
    <label>${tr('每天出发时间', 'Daily start', 'Início diário')}<input id="start" type="time" value="10:00" required></label>
    <label>${tr('每天返回酒店的最晚时间', 'Latest daily hotel return', 'Hora limite de regresso ao hotel')}<input id="end" type="time" value="18:00" required></label>
    <label>${tr('天气条件', 'Weather scenario', 'Cenário meteorológico')}<select id="weather"><option value="dry">${tr('晴天／阴天', 'Dry', 'Sem chuva')}</option><option value="rain">${tr('雨天，优先室内', 'Rain: indoor activities', 'Chuva: atividades interiores')}</option></select></label>
    </div><div class="workshop-interest"><label class="workshop-interest-label"><input id="workshop-interest" type="checkbox" ${workshopInterested ? 'checked' : ''} aria-controls="workshop-preview">${workshopCopy[lang].interest}</label>
    <div id="workshop-preview" ${workshopInterested ? '' : 'hidden'}>${workshopCandidatesMarkup(lang)}</div></div>
    <div class="actions"><button class="primary" type="submit">${tr('为我规划行程', 'Plan my trip', 'Planear a minha viagem')}</button></div><p id="plan-error" class="error" role="alert"></p></form></section><div id="result" aria-live="polite"></div>`;
  $('#workshop-interest').onchange = event => {
    workshopInterested = event.target.checked;
    $('#workshop-preview').hidden = !workshopInterested;
  };
  $('#plan-form').onsubmit = e => { e.preventDefault(); build(); };
  try {
    const saved = JSON.parse(localStorage.getItem('mns-plan'));
    if (saved?.version === 2) showPlan(saved);
  } catch {}
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function minutes(s) {
  const [h,m] = s.split(':').map(Number);
  return h*60+m;
}
function clock(m) {
  return `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
}
function build() {
  try {
    const result = planRoute({
      days: Number($('#days').value), start: minutes($('#start').value), end: minutes($('#end').value),
      budget: Number($('#budget').value), rain: $('#weather').value === 'rain',
      pace: $('#pace').value, theme: $('#theme').value,
    });
    // Unconfirmed workshops remain candidates; never add a stop or charge here.
    result.workshopInterested = $('#workshop-interest').checked;
    if (!result.count) {
      $('#plan-error').textContent = tr('当前时段或预算不足以安排游览，请延长时间或调整预算。', 'This time window or budget is too limited. Please adjust and try again.', 'O tempo ou orçamento é insuficiente. Ajuste e tente novamente.');
      return;
    }
    localStorage.setItem('mns-plan', JSON.stringify(result));
    $('#plan-error').textContent = '';
    showPlan(result);
  } catch {
    $('#plan-error').textContent = tr('返回时间须晚于出发时间，并预留至少两小时。', 'Finish after your start and allow at least two hours.', 'O regresso deve ser após a partida, com pelo menos duas horas disponíveis.');
  }
}
function showPlan(r) {
  $('#result').innerHTML = `<section class="panel"><span class="eyebrow">YOUR MACAO</span><h2>${tr('已为你规划', 'Your planned itinerary', 'O seu itinerário')}</h2>
    <p>${tr(`从${r.total}个景点中安排${r.count}站，优先同区顺路游览。完整景点库可在“探索澳门”查看。`, `${r.count} stops selected from ${r.total} attractions, grouped by area. View the full catalogue in Explore Macao.`, `${r.count} paragens entre ${r.total} locais, agrupadas por zona. Consulte o catálogo em Explorar.`)}</p>
    ${r.rain?`<p class="hint">${tr('已调整为室内路线，暂不安排海滩、步道、露天广场及缆车。室内景点之间仍需交通。', 'Indoor route: beaches, trails, outdoor squares and cable cars are excluded. Transfers between indoor venues are still needed.', 'Percurso interior: praias, trilhos, praças exteriores e teleféricos excluídos. São necessárias deslocações entre locais.')}</p>`:''}
    ${r.schedule.map((day,i)=>`<h3>${tr('第','Day ','Dia ')}${i+1}${lang==='zh'?'天':''}</h3><div class="timeline">${day.length?day.map(s=>{
      if(s.back) return `<div class="stop"><b>${clock(s.time)}–${clock(s.end)} · ${tr('返回本酒店','Return to our hotel','Regresso ao hotel')}</b></div>`;
      if(s.meal) return `<div class="stop"><b>${clock(s.time)}–${clock(s.end)} · ${tr('午餐与休息','Lunch & rest','Almoço e pausa')}</b><p>${areas()[s.area]} · ${tr('就近选择粤式茶点、土生葡菜、小吃或素食。','Choose nearby dim sum, Macanese cuisine, snacks or vegetarian food.','Escolha dim sum, cozinha macaense, petiscos ou comida vegetariana nas proximidades.')}</p></div>`;
      const p=places.find(p=>p[0]===s.id);
      return `<div class="stop">${photoMarkup(p[0], name(p), lang, true)}<b>${clock(s.time)}–${clock(s.end)} · ${name(p)}</b><p>${areas()[p[1]]} · ${tr('前段交通预留','Transfer allowance','Margem para deslocação')} ${s.travel} min</p>${links(p)}</div>`;
    }).join(''):`<p>${tr('此日留作自由活动，可延长游览时间重新规划。','Free time; extend the time window to add activities.','Tempo livre; alargue o horário para incluir atividades.')}</p>`}</div>`).join('')}
    <p class="hint">${tr('每人全程模拟预算','Illustrative total per person','Estimativa total por pessoa')}: MOP ${r.estimate} / MOP ${r.budget}<br>${tr('餐饮','Food','Refeições')} ${r.meals} · ${tr('交通','Transport','Transporte')} ${r.transport} · ${tr('体验预留','Experiences allowance','Experiências')} ${r.tickets}<br>${tr('不含住宿与购物。费用为规划假设，不是商户报价。','Excludes accommodation and shopping. Allowances are planning assumptions, not operator quotes.','Não inclui alojamento e compras. Valores ilustrativos, não são cotações.')}</p>
    <p>${tr('景点开放、休馆、预约及门票需在出发前通过来源链接核实。交通时间是含步行、等候的估算，非实时导航。慢游模式减少站点并预留较长休息与移动时间。','Check opening, closures, reservations and tickets through the source links before travel. Transfer times include estimated walking and waiting, not live navigation. Slow pace allows fewer stops and longer transfers.','Confirme horários, encerramentos, reservas e bilhetes nas fontes antes da viagem. Tempos de deslocação estimados, sem navegação em tempo real. O ritmo lento inclui menos paragens.')}</p>
    ${r.workshopInterested ? workshopCandidatesMarkup(lang) : ''}
    <button id="print-plan">${tr('打印／存为PDF','Print / save PDF','Imprimir / guardar PDF')}</button></section>`;
  bindPhotos($('#result'), lang);
  $('#print-plan').onclick=()=>window.print();
}
function stay() {
  mountStay($('#view'), { lang, roomNames, photoMarkup, bindPhotos });
}
$('#lang').onchange = e => {
  lang = e.target.value;
  try { localStorage.setItem('mns-lang', lang); } catch {}
  render();
};
render();
