export const workshopPrice = 220;
export const workshopDuration = 90;
export const workshopCapacity = 8;
export const workshopStorageKey = 'mns-workshop-intent-v1';

export const workshops = [
  {
    id: 'postcard',
    names: {
      zh: '澳門主題明信片製作',
      en: 'Macao-Inspired Postcard Making',
      pt: 'Criação de postais inspirados em Macau',
    },
    descriptions: {
      zh: '由本地工藝師或社區合作方介紹澳門建築、街道及文化圖案，帶領參加者設計自己的澳門主題明信片，完成後可帶回家作紀念。',
      en: 'A local artisan or community partner introduces Macao’s architecture, streets and cultural motifs, then guides participants in designing their own Macao-inspired postcard to take home as a souvenir.',
      pt: 'Um artesão local ou parceiro da comunidade apresenta a arquitetura, as ruas e os motivos culturais de Macau e orienta os participantes na criação de um postal inspirado em Macau, que podem levar para casa como recordação.',
    },
  },
  {
    id: 'collage',
    names: {
      zh: '街區故事拼貼',
      en: 'Neighbourhood Story Collage',
      pt: 'Colagem de histórias do bairro',
    },
    descriptions: {
      zh: '透過澳門街區圖片、文化元素及故事素材，帶領參加者製作個人化拼貼作品，認識澳門的街區生活與文化。',
      en: 'Using images of Macao’s neighbourhoods, cultural elements and story materials, participants create a personal collage and learn about neighbourhood life and culture in Macao.',
      pt: 'Com imagens dos bairros de Macau, elementos culturais e materiais narrativos, os participantes criam uma colagem personalizada e conhecem a vida e a cultura dos bairros de Macau.',
    },
  },
];

export const workshopCopy = {
  zh: {
    title: '文化工作坊', standalone: '可獨立預約，無須購買住宿套票。',
    intro: '在酒店認識澳門街區文化，製作屬於自己的紀念作品。',
    price: '價格', priceValue: '每人 MOP 220', duration: '時長', durationValue: '每場 90 分鐘',
    capacity: '人數', capacityValue: '每場最多八人', venue: '地點', venueValue: '酒店二樓工作坊',
    leader: '帶領者', leaderValue: '本地工藝師或社區合作方',
    select: '選擇此活動', formTitle: '保存工作坊預約意向', activity: '選擇活動', participants: '參加人數',
    people: '人', total: '所選人數的工作坊費用', separate: '工作坊費用獨立計算，不會自動加進房費；此處不收款。',
    date: '實際日期', time: '實際時間', age: '年齡要求', terms: '取消及退款條款', enquire: '請向酒店查詢',
    save: '保存預約意向', saved: '預約意向已保存在此裝置，尚未送交酒店，亦未確認名額。',
    localOnly: '此表單只把活動及參加人數保存在此裝置。這不是確認預約，沒有付款或即時名額查詢。',
    invalid: '請選擇有效活動及一至八位參加者。',
    saveError: '無法在此裝置保存預約意向，資料尚未保存，亦未送交酒店。請檢查瀏覽器的儲存設定。',
    savedDetails: '此裝置已保存的意向',
    interest: '我有興趣參加酒店工作坊', candidates: '酒店工作坊候選活動',
    candidateIntro: '以下為兩項獨立候選活動，可再選擇感興趣的一項。實際場次請向酒店查詢。',
    pending: '未確認場次：只列為候選，尚未排入確定行程，費用亦未計入目前預算。',
    future: '確認場次後，須檢查時間衝突、預留返回酒店及後續行程的交通時間，並將所選活動每人 MOP 220 計入體驗預算一次。',
  },
  en: {
    title: 'Cultural Workshops', standalone: 'Book separately. No accommodation package is required.',
    intro: 'Discover Macao’s neighbourhood culture at the hotel and make a personal keepsake.',
    price: 'Price', priceValue: 'MOP 220 per person', duration: 'Duration', durationValue: '90 minutes per session',
    capacity: 'Group size', capacityValue: 'Maximum eight participants per session', venue: 'Location', venueValue: 'Hotel workshop on the second floor',
    leader: 'Facilitator', leaderValue: 'Local artisan or community partner',
    select: 'Choose this activity', formTitle: 'Save a workshop booking intention', activity: 'Choose an activity', participants: 'Participants',
    people: 'participants', total: 'Workshop cost for the selected participants', separate: 'Workshop charges are separate and are not automatically added to room charges. No payment is taken here.',
    date: 'Actual date', time: 'Actual time', age: 'Age requirements', terms: 'Cancellation and refund terms', enquire: 'Please enquire with the hotel',
    save: 'Save booking intention', saved: 'Your booking intention is saved on this device. It has not been sent to the hotel, and no places are confirmed.',
    localOnly: 'This form saves only the activity and participant count on this device. It is not a confirmed booking and offers no payment or live availability check.',
    invalid: 'Choose a valid activity and one to eight participants.',
    saveError: 'The booking intention could not be saved on this device. Nothing has been saved or sent to the hotel. Please check your browser’s storage settings.',
    savedDetails: 'Intention saved on this device',
    interest: 'I am interested in a hotel workshop', candidates: 'Hotel workshop candidates',
    candidateIntro: 'These are two separate candidate activities. You can choose one that interests you. Please enquire with the hotel about actual sessions.',
    pending: 'Session unconfirmed: candidate only, not included in the confirmed itinerary or the current budget.',
    future: 'Once a session is confirmed, check time conflicts, allow travel time back to the hotel and for the onward itinerary, and count MOP 220 per person for the chosen activity once in the experiences budget.',
  },
  pt: {
    title: 'Oficinas culturais', standalone: 'Reserve separadamente. Não é necessário adquirir um pacote de alojamento.',
    intro: 'Descubra a cultura dos bairros de Macau no hotel e crie uma recordação pessoal.',
    price: 'Preço', priceValue: 'MOP 220 por pessoa', duration: 'Duração', durationValue: '90 minutos por sessão',
    capacity: 'Participantes', capacityValue: 'Máximo de oito participantes por sessão', venue: 'Local', venueValue: 'Oficina no segundo piso do hotel',
    leader: 'Orientação', leaderValue: 'Artesão local ou parceiro da comunidade',
    select: 'Escolher esta atividade', formTitle: 'Guardar intenção de reserva de uma oficina', activity: 'Escolher atividade', participants: 'Número de participantes',
    people: 'participantes', total: 'Custo da oficina para os participantes selecionados', separate: 'O custo da oficina é separado e não é adicionado automaticamente ao alojamento. Não são efetuados pagamentos aqui.',
    date: 'Data efetiva', time: 'Hora efetiva', age: 'Requisitos de idade', terms: 'Condições de cancelamento e reembolso', enquire: 'Consulte o hotel',
    save: 'Guardar intenção de reserva', saved: 'A intenção de reserva foi guardada neste dispositivo. Não foi enviada ao hotel e não há lugares confirmados.',
    localOnly: 'Este formulário guarda apenas a atividade e o número de participantes neste dispositivo. Não confirma uma reserva, não aceita pagamentos nem consulta a disponibilidade em tempo real.',
    invalid: 'Escolha uma atividade válida e entre um e oito participantes.',
    saveError: 'Não foi possível guardar a intenção neste dispositivo. Nada foi guardado ou enviado ao hotel. Verifique as definições de armazenamento do navegador.',
    savedDetails: 'Intenção guardada neste dispositivo',
    interest: 'Tenho interesse em participar numa oficina do hotel', candidates: 'Oficinas do hotel como atividades candidatas',
    candidateIntro: 'Estas são duas atividades candidatas separadas. Pode escolher uma que lhe interesse. Consulte o hotel sobre as sessões efetivas.',
    pending: 'Sessão por confirmar: apenas uma atividade candidata, fora do itinerário confirmado e do orçamento atual.',
    future: 'Após confirmar a sessão, verifique conflitos de horário, reserve tempo de transporte para regressar ao hotel e continuar o itinerário e conte MOP 220 por pessoa para a atividade escolhida uma única vez no orçamento de experiências.',
  },
};

const copy = lang => workshopCopy[lang] || workshopCopy.en;
const language = lang => workshopCopy[lang] ? lang : 'en';
let editing = null;

export function validateWorkshopIntent(value) {
  if (!value || !workshops.some(item => item.id === value.workshopId)
    || !Number.isInteger(value.participants) || value.participants < 1 || value.participants > workshopCapacity) {
    throw new Error('workshop-intent');
  }
  // Store interest only: actual sessions and availability have not been supplied.
  return { version: 1, workshopId: value.workshopId, participants: value.participants, status: 'interest-only' };
}

export function workshopCandidatesMarkup(lang) {
  const c = copy(lang), l = language(lang);
  return `<aside class="workshop-candidates hint"><h3>${c.candidates}</h3><p>${c.standalone}</p>
    <p>${c.candidateIntro}</p><ul>${workshops.map(w => `<li><b>${w.names[l]}</b><br>${c.durationValue} · ${c.priceValue}</li>`).join('')}</ul>
    <p><strong>${c.pending}</strong></p><p>${c.future}</p></aside>`;
}

export function mountWorkshops(container, { lang }) {
  const c = copy(lang), l = language(lang);
  const $ = selector => container.querySelector(selector);
  let saved = null;
  try {
    const value = JSON.parse(localStorage.getItem(workshopStorageKey));
    if (value?.version === 1 && value.status === 'interest-only') saved = validateWorkshopIntent(value);
  } catch {}
  let state = editing || saved || { workshopId: workshops[0].id, participants: 1 };
  try { state = validateWorkshopIntent(state); } catch { state = { workshopId: workshops[0].id, participants: 1 }; }

  const facts = `<dl class="workshop-facts">${['price', 'duration', 'capacity', 'venue', 'leader'].map(key => `<div><dt>${c[key]}</dt><dd>${c[key + 'Value']}</dd></div>`).join('')}</dl>`;
  container.innerHTML = `<section class="panel workshop-intro"><div class="eyebrow">STAY · DISCOVER · CONNECT</div>
    <h2>${c.title}</h2><p>${c.intro}</p><p class="hint workshop-standalone"><strong>${c.standalone}</strong></p></section>
    <div class="workshop-grid">${workshops.map(w => `<article class="card workshop-card"><h3>${w.names[l]}</h3>
      <p class="workshop-standalone"><strong>${c.standalone}</strong></p><p>${w.descriptions[l]}</p>${facts}
      <div class="actions"><button type="button" data-workshop="${w.id}">${c.select}</button></div></article>`).join('')}</div>
    <section class="panel workshop-booking" aria-labelledby="workshop-form-title"><h3 id="workshop-form-title">${c.formTitle}</h3>
      <p>${c.localOnly}</p><dl class="workshop-facts workshop-unknowns">${['date', 'time', 'age', 'terms'].map(key => `<div><dt>${c[key]}</dt><dd>${c.enquire}</dd></div>`).join('')}</dl>
      <form id="workshop-form"><div class="formgrid"><label for="workshop-activity">${c.activity}
        <select id="workshop-activity" required>${workshops.map(w => `<option value="${w.id}">${w.names[l]}</option>`).join('')}</select></label>
        <label for="workshop-participants">${c.participants}<select id="workshop-participants" required>${Array.from({length: workshopCapacity}, (_, i) => `<option value="${i + 1}">${i + 1} ${c.people}</option>`).join('')}</select></label></div>
        <p id="workshop-total" class="price" aria-live="polite"></p><p class="muted">${c.separate}</p>
        <div class="actions"><button type="submit" class="primary">${c.save}</button></div>
        <p id="workshop-status" role="status" aria-live="polite"></p><p id="workshop-saved-details"></p>
      </form></section>`;
  $('#workshop-activity').value = state.workshopId;
  $('#workshop-participants').value = String(state.participants);
  function updateTotal() {
    state = { workshopId: $('#workshop-activity').value, participants: Number($('#workshop-participants').value) };
    editing = state;
    $('#workshop-total').textContent = `${c.total}: MOP ${state.participants * workshopPrice}`;
  }
  function showSaved() {
    $('#workshop-status').classList.remove('error');
    $('#workshop-status').textContent = c.saved;
    const activity = workshops.find(w => w.id === saved.workshopId);
    $('#workshop-saved-details').textContent = `${c.savedDetails}: ${activity.names[l]} · ${saved.participants} ${c.people} · MOP ${saved.participants * workshopPrice}`;
  }
  ['#workshop-activity', '#workshop-participants'].forEach(selector => {
    $(selector).onchange = updateTotal;
  });
  container.querySelectorAll('[data-workshop]').forEach(button => {
    button.onclick = () => {
      $('#workshop-activity').value = button.dataset.workshop;
      updateTotal();
      $('#workshop-activity').focus();
    };
  });
  $('#workshop-form').onsubmit = event => {
    event.preventDefault();
    let value;
    try {
      value = validateWorkshopIntent({ workshopId: $('#workshop-activity').value, participants: Number($('#workshop-participants').value) });
    } catch {
      $('#workshop-status').textContent = c.invalid;
      $('#workshop-status').classList.add('error');
      return;
    }
    try {
      localStorage.setItem(workshopStorageKey, JSON.stringify(value));
      saved = value;
      editing = value;
      showSaved();
    } catch {
      $('#workshop-status').textContent = c.saveError;
      $('#workshop-status').classList.add('error');
    }
  };
  updateTotal();
  if (saved) showSaved();
}
