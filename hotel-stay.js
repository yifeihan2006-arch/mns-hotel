import { baseRates, benchmark, quoteStay } from './room-pricing.js';
import { hotelGalleryMarkup } from './hotel-gallery.js?v=photo-gallery-20261121';
import { roomPhotoTitles } from './room-photos.js?v=bed-review-20261121';

let state = { room: 0, checkin: '', checkout: '', rooms: 1, guests: 2 };
let saved = null;
let bedPhoto = 'twin';
try {
  const draft = JSON.parse(localStorage.getItem('mns-book'));
  if (draft?.version === 2 && Number.isInteger(draft.room) && baseRates[draft.room]
    && Number.isInteger(draft.guests) && draft.guests >= 1 && draft.guests <= 30) {
    const quote = quoteStay(draft.room, draft.checkin, draft.checkout, draft.rooms);
    saved = { ...draft, total: quote.total, nightly: quote.nightly };
    state = { ...state, ...draft };
  }
} catch {}

export function mountStay(container, options) {
  const { lang, roomNames, photoMarkup, bindPhotos } = options;
  const tr = (zh, en, pt) => ({ zh, en, pt })[lang] || en;
  const room = index => roomNames[index][{ zh: 0, en: 1, pt: 2 }[lang]];
  const photoTitle = id => roomPhotoTitles[id][{ zh: 0, en: 1, pt: 2 }[lang]];
  const money = value => 'MOP ' + value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  const kind = type => ({
    weekday: tr('平日', 'Weekday', 'Dia útil'),
    weekend: tr('周末', 'Weekend', 'Fim de semana'),
    peak: tr('酒店旺季', 'Hotel peak period', 'Época alta do hotel'),
  })[type];
  const disclaimer = tr(
    '概念酒店演示报价，非确认订单或实时房态。无真实付款。',
    'Concept hotel quotation, not a confirmed booking or live availability. No real payment.',
    'Cotação conceptual, sem reserva confirmada ou disponibilidade real. Sem pagamento real.'
  );
  const $ = selector => container.querySelector(selector);
  const input = (id, label, type, rest = '') => '<label>' + label
    + '<input id="' + id + '" type="' + type + '" ' + rest + ' required></label>';

  container.innerHTML = [
    '<section class="panel"><div class="eyebrow">STAY WITH US</div><h2>',
    tr('澳门街区故事酒店', 'Macao Neighbourhood Stories Hotel', 'Macao Neighbourhood Stories Hotel'),
    '</h2><p>', tr('120间客房 · 五种房型 · 本酒店专属预订', '120 rooms · Five room types · Our hotel only', '120 quartos · Cinco tipologias · Apenas o nosso hotel'),
    '</p><p class="hint">', disclaimer, '</p>',
    '<details class="rate-policy"><summary>',
    tr('房价说明与定价参考', 'Rate policy and market reference', 'Preços e referência de mercado'),
    '</summary><p>',
    tr(
      '参考2025年澳门酒店协会会员四星级酒店全年平均房价 MOP 1,124.6，街区故事房平日定价 MOP 850，低约 MOP 275。该统计为历史平均值，并非统一定价标准或同日同房型报价；其他房型按空间与配置加价。',
      'The 2025 annual average for four-star Macau Hotel Association member hotels was MOP 1,124.6. Our entry room weekday base is MOP 850, about MOP 275 lower. This historical average is not a regulated tariff or a matched room/date quote. Larger room types carry a premium.',
      'A média anual de 2025 dos hotéis de quatro estrelas associados foi MOP 1.124,6. O quarto de entrada custa MOP 850 em dias úteis, cerca de MOP 275 abaixo. A média histórica não é uma tarifa oficial nem uma comparação para o mesmo quarto e data. Tipologias superiores têm suplemento.'
    ),
    ' <a href="', benchmark.source, '" target="_blank" rel="noopener">',
    tr('查看统计来源', 'View statistical source', 'Consultar fonte estatística'), '</a></p><p>',
    tr(
      '本酒店演示规则：周日至周四为平日价，周五和周六上调20%；每年1月1–3日、5月1–5日、10月1–7日、12月24–31日设为旺季，上调50%。旺季覆盖周末，不重复加价。这些是酒店自行设定的价格区间，不代表法定假期或实时市场预测。',
      'Hotel demo rules: Sunday–Thursday base rates; Friday–Saturday +20%. Hotel peak windows are Jan 1–3, May 1–5, Oct 1–7 and Dec 24–31 each year at +50%. Peak overrides weekend pricing. These are hotel settings, not an official holiday calendar or a live market forecast.',
      'Regras do hotel: domingo a quinta ao preço base; sexta e sábado +20%. Períodos definidos pelo hotel: 1–3 jan., 1–5 maio, 1–7 out. e 24–31 dez., com +50%. A época alta substitui o suplemento de fim de semana. Não é um calendário oficial ou previsão de mercado.'
    ), '</p></details></section>',
    '<section class="panel rate-search"><h3>',
    tr('选择日期，查看当晚房价', 'Choose dates for nightly rates', 'Escolha datas para consultar preços'),
    '</h3><div class="formgrid">',
    input('checkin', tr('入住日期', 'Check-in', 'Entrada'), 'date'),
    input('checkout', tr('退房日期', 'Check-out', 'Saída'), 'date'),
    '</div><p class="muted">',
    tr('按入住每一晚的日期计价，退房日不计费。可查询1–90晚。', 'Rates follow each occupied night; checkout is excluded. Quote 1–90 nights.', 'Preços por noite ocupada, sem cobrar o dia de saída. Entre 1 e 90 noites.'),
    '</p><p id="rate-error" class="error" role="alert"></p></section>',
    '<div class="grid room-grid">',
    ...roomNames.map((_, index) => [
      '<article class="card" data-room-card="', index, '">',
      index === 0 ? '<div class="room-photo-selector"><div class="room-photo-tabs" role="group" aria-label="' + tr('床型圖片展示', 'Bed layout images', 'Imagens das camas') + '"><button type="button" data-bed-photo="twin">' + tr('雙床圖片', 'Twin-bed image', 'Duas camas') + '</button><button type="button" data-bed-photo="king">' + tr('大床圖片', 'King-bed image', 'Cama king') + '</button></div>'
        + '<div data-bed-view="twin">' + photoMarkup('room-0-twin', photoTitle('room-0-twin'), lang) + '</div>'
        + '<div data-bed-view="king">' + photoMarkup('room-0', photoTitle('room-0'), lang) + '</div></div>'
        : photoMarkup('room-' + index, photoTitle('room-' + index), lang),
      '<span class="tag">MNS HOTEL</span><h3>', room(index), '</h3>',
      '<div class="price" data-room-price="', index, '"></div>',
      '<p class="muted" data-room-range="', index, '"></p>',
      '<button data-room="', index, '" aria-pressed="false">',
      tr('选择此房型', 'Choose room', 'Escolher quarto'), '</button></article>',
    ].join('')),
    '</div><section id="booking" class="panel rate-search"><h3 id="booking-room"></h3>',
    '<form id="book-form"><div class="formgrid">',
    input('rooms', tr('房间数', 'Rooms', 'Quartos'), 'number', 'min="1" max="10"'),
    input('guests', tr('人数（入住容量须礼宾确认）', 'Guests (capacity subject to review)', 'Hóspedes (capacidade a confirmar)'), 'number', 'min="1" max="30"'),
    '</div><div id="rate-quote" aria-live="polite"></div><div class="actions">',
    '<button class="primary" type="submit">',
    tr('计算并保存预订草案', 'Calculate & save booking draft', 'Calcular e guardar rascunho'),
    '</button></div><p id="book-result" role="status"></p></form></section>',
    hotelGalleryMarkup(lang, photoMarkup),
  ].join('');

  function updateBedPhoto() {
    container.querySelectorAll('[data-bed-view]').forEach(view => { view.hidden = view.dataset.bedView !== bedPhoto; });
    container.querySelectorAll('[data-bed-photo]').forEach(button => {
      const active = button.dataset.bedPhoto === bedPhoto;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  container.querySelectorAll('[data-bed-photo]').forEach(button => {
    button.onclick = () => { bedPhoto = button.dataset.bedPhoto; updateBedPhoto(); };
  });
  updateBedPhoto();

  ['checkin', 'checkout', 'rooms', 'guests'].forEach(key => {
    $('#' + key).value = state[key];
    $('#' + key).oninput = () => {
      state[key] = ['rooms', 'guests'].includes(key) ? Number($('#' + key).value) : $('#' + key).value;
      $('#book-result').textContent = '';
      refreshQuote();
    };
  });

  function quoteError(error) {
    return error?.message === 'rooms'
      ? tr('房间数须为1–10间的整数。', 'Choose 1–10 whole rooms.', 'Escolha entre 1 e 10 quartos.')
      : tr('请输入有效日期；退房须晚于入住，住宿1–90晚。', 'Enter valid dates; checkout must follow check-in, for 1–90 nights.', 'Datas válidas: saída após entrada, entre 1 e 90 noites.');
  }

  function refreshQuote() {
    $('#booking-room').textContent = room(state.room);
    container.querySelectorAll('[data-room]').forEach(button => {
      const selected = Number(button.dataset.room) === state.room;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    let validDates = false;
    $('#rate-error').textContent = '';
    if (state.checkin && state.checkout) {
      try {
        quoteStay(state.room, state.checkin, state.checkout);
        validDates = true;
      } catch (error) {
        $('#rate-error').textContent = quoteError(error);
      }
    }
    roomNames.forEach((_, index) => {
      const price = $('[data-room-price="' + index + '"]');
      const range = $('[data-room-range="' + index + '"]');
      if (validDates) {
        const quote = quoteStay(index, state.checkin, state.checkout);
        const rates = quote.nightly.map(night => night.rate);
        price.textContent = money(quote.average);
        range.textContent = tr('所选日期平均／间夜；', 'Selected-stay average / room-night; ', 'Média / quarto-noite; ')
          + money(Math.min(...rates)) + '–' + money(Math.max(...rates));
      } else {
        price.textContent = money(baseRates[index]);
        range.textContent = tr('平日／间夜起；选择日期查看报价', 'Weekday base / room-night; select dates for a quote', 'Base / quarto-noite; escolha datas para cotação');
      }
    });
    if (!validDates) {
      $('#rate-quote').textContent = tr('请选择有效入住和退房日期。', 'Select valid check-in and checkout dates.', 'Escolha datas válidas.');
      return;
    }
    try {
      const quote = quoteStay(state.room, state.checkin, state.checkout, state.rooms);
      $('#rate-quote').innerHTML = [
        '<h4>', tr('每晚房价明细', 'Nightly rate breakdown', 'Preços por noite'), '</h4><div class="nightly-list">',
        ...quote.nightly.map(night => '<div class="nightly-row"><span>' + night.date + ' · '
          + kind(night.kind) + '</span><strong>' + money(night.rate) + '</strong></div>'),
        '</div><p>', tr('每晚单价 × 房间数；共', 'Nightly rates × rooms; total ', 'Preço por noite × quartos; total '),
        quote.nights, tr('晚，', ' nights, ', ' noites, '), quote.rooms, tr('间房', ' rooms', ' quartos'),
        '</p><p class="price">', tr('住宿总额：', 'Stay total: ', 'Total: '), money(quote.total), '</p><p class="muted">',
        tr('演示总额已包含假设税费及服务费，不再另加；不含早餐和其他消费。', 'Demo total includes assumed taxes and service charges; no extra fee is added. Breakfast and extras excluded.', 'Total ilustrativo com impostos e serviço pressupostos, sem suplementos adicionais. Sem pequeno-almoço ou extras.'),
        '</p>',
      ].join('');
    } catch (error) {
      $('#rate-quote').textContent = quoteError(error);
    }
  }

  container.querySelectorAll('[data-room]').forEach(button => {
    button.onclick = () => {
      state.room = Number(button.dataset.room);
      $('#book-result').textContent = '';
      refreshQuote();
    };
  });
  $('#book-form').onsubmit = event => {
    event.preventDefault();
    try {
      const quote = quoteStay(state.room, state.checkin, state.checkout, state.rooms);
      if (!Number.isInteger(state.guests) || state.guests < 1 || state.guests > 30) {
        $('#book-result').textContent = tr('请输入1–30位入住人数。', 'Enter 1–30 guests.', 'Indique entre 1 e 30 hóspedes.');
        return;
      }
      saved = { ...state, version: 2, total: quote.total, nightly: quote.nightly };
      localStorage.setItem('mns-book', JSON.stringify(saved));
      $('#book-result').textContent = tr('已保存预订草案：', 'Draft saved: ', 'Rascunho guardado: ')
        + room(state.room) + ' · ' + state.checkin + ' / ' + state.checkout + ' · '
        + money(quote.total) + ' · ' + disclaimer;
    } catch (error) {
      $('#book-result').textContent = quoteError(error);
    }
  };
  refreshQuote();
  if (saved) {
    $('#book-result').textContent = tr('已保存草案：', 'Saved draft: ', 'Rascunho guardado: ')
      + room(saved.room) + ' · ' + saved.checkin + ' / ' + saved.checkout
      + ' · ' + money(saved.total) + ' · ' + disclaimer;
  } else if (localStorage.getItem('mns-book')) {
    $('#book-result').textContent = tr('旧版固定价格草案需重新选择日期并报价。', 'Requote the legacy fixed-price draft by selecting dates.', 'Selecione datas para recalcular o rascunho antigo.');
  }
  bindPhotos(container, lang);
}
