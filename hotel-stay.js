import { baseRates, quoteStay, rateFactors, pricingRevision } from './room-pricing.js?v=report-rates-20261122';
import { hotelGalleryMarkup } from './hotel-gallery.js?v=simple-rooms-20261121';
import { roomPhotoTitles } from './room-photos.js?v=simple-rooms-20261121';

let state = { room: 0, checkin: '', checkout: '', rooms: 1, guests: 2, rateKind: 'weekday', nightlyKinds: {} };
let saved = null;
let needsRequote = false;
try {
  const draft = JSON.parse(localStorage.getItem('mns-book'));
  if ([2, 3].includes(draft?.version) && Number.isInteger(draft.room) && baseRates[draft.room]
    && Number.isInteger(draft.guests) && draft.guests >= 1 && draft.guests <= 30) {
    const recovered = { room: draft.room, checkin: draft.checkin, checkout: draft.checkout,
      rooms: draft.rooms, guests: draft.guests, rateKind: draft.rateKind ?? 'weekday', nightlyKinds: draft.nightlyKinds ?? {} };
    const quote = quoteStay(recovered.room, recovered.checkin, recovered.checkout, recovered.rooms,
      { defaultKind: recovered.rateKind, overrides: recovered.nightlyKinds });
    state = recovered;
    if (draft.version === 3 && draft.pricingRevision === pricingRevision) saved = { ...recovered, nightlyKinds: { ...recovered.nightlyKinds }, version: 3, ...quote };
    else needsRequote = true;
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
    festival: tr('大型節慶', 'Major festival', 'Grande festividade'),
  })[type];
  const disclaimer = tr(
    '概念酒店演示报价，非确认订单或实时房态。无真实付款。',
    'Concept hotel quotation, not a confirmed booking or live availability. No real payment.',
    'Cotação conceptual, sem reserva confirmada ou disponibilidade real. Sem pagamento real.'
  );
  const $ = selector => container.querySelector(selector);
  const input = (id, label, type, rest = '') => '<label>' + label
    + '<input id="' + id + '" type="' + type + '" ' + rest + ' required></label>';
  const rateOptions = selected => Object.keys(rateFactors).map(key => '<option value="' + key + '"'
    + (key === selected ? ' selected' : '') + '>' + kind(key)
    + (key === 'weekday' ? '' : key === 'weekend' ? ' +20%' : ' +50%') + '</option>').join('');
  const currentQuote = (index = state.room, rooms = state.rooms) => quoteStay(index, state.checkin, state.checkout, rooms,
    { defaultKind: state.rateKind, overrides: state.nightlyKinds });

  container.innerHTML = [
    '<section class="panel"><div class="eyebrow">STAY WITH US</div><h2>',
    tr('澳门街区故事酒店', 'Macao Neighbourhood Stories Hotel', 'Macao Neighbourhood Stories Hotel'),
    '</h2><p>', tr('120间客房 · 五种房型 · 本酒店专属预订', '120 rooms · Five room types · Our hotel only', '120 quartos · Cinco tipologias · Apenas o nosso hotel'),
    '</p><p class="hint">', disclaimer, '</p>',
    '<details class="rate-policy"><summary>',
    tr('房價說明', 'Rate policy', 'Condições de preços'),
    '</summary><p>',
    tr(
      '平日每間每晚房價依次為 MOP 980、1,180、1,480、1,680、2,480，均未含稅。週末上調20%，大型節慶上調50%，兩者不疊加。住宿稅為房費的5%，不另加強制服務費。早餐及其他消費另計。',
      'Weekday room rates are MOP 980, 1,180, 1,480, 1,680 and 2,480 per room-night, before tax. Weekend rates are 20% higher and major-festival rates 50% higher; these uplifts do not compound. Accommodation tax is 5% of room charges, with no additional compulsory service charge. Breakfast and extras are separate.',
      'Preços em dias úteis: MOP 980, 1.180, 1.480, 1.680 e 2.480 por quarto e noite, antes de impostos. Fins de semana: +20%; grandes festividades: +50%, sem acumulação. O imposto de alojamento é de 5% sobre o quarto, sem taxa de serviço obrigatória adicional. Pequeno-almoço e extras à parte.'
    ), '</p></details></section>',
    '<section class="panel rate-search"><h3>',
    tr('选择日期，查看当晚房价', 'Choose dates for nightly rates', 'Escolha datas para consultar preços'),
    '</h3><div class="formgrid">',
    input('checkin', tr('入住日期', 'Check-in', 'Entrada'), 'date'),
    input('checkout', tr('退房日期', 'Check-out', 'Saída'), 'date'),
    '<label for="rate-kind">', tr('整段入住的試算價格時段', 'Rate period for the stay estimate', 'Período de preço para a estimativa'),
    '<select id="rate-kind">', rateOptions(state.rateKind), '</select></label>',
    '</div><p class="muted">',
    tr('按入住每一晚的日期计价，退房日不计费。可查询1–90晚。', 'Rates follow each occupied night; checkout is excluded. Quote 1–90 nights.', 'Preços por noite ocupada, sem cobrar o dia de saída. Entre 1 e 90 noites.'),
    '</p><p class="muted">', tr('可在每晚明細調整不同價格時段。週末及大型節慶的實際適用日期請向酒店確認。', 'Adjust individual nights below for mixed rate periods. Please confirm the applicable weekend and major-festival dates with the hotel.', 'Pode ajustar cada noite para combinar períodos de preço. Confirme com o hotel as datas de fim de semana e grandes festividades.'),
    '</p><p id="rate-error" class="error" role="alert"></p></section>',
    '<p class="muted">', tr('價格由低到高', 'Price: low to high', 'Preço: do mais baixo ao mais alto'), '</p><div class="grid room-grid">',
    ...roomNames.map((_, index) => index).sort((a,b) => baseRates[a] - baseRates[b]).map(index => [
      '<article class="card" data-room-card="', index, '">',
      photoMarkup('room-' + index, photoTitle('room-' + index), lang),
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

  ['checkin', 'checkout', 'rooms', 'guests'].forEach(key => {
    $('#' + key).value = state[key];
    $('#' + key).oninput = () => {
      state[key] = ['rooms', 'guests'].includes(key) ? Number($('#' + key).value) : $('#' + key).value;
      if (key === 'checkin' || key === 'checkout') state.nightlyKinds = {};
      $('#book-result').textContent = '';
      refreshQuote();
    };
  });
  $('#rate-kind').onchange = () => {
    state.rateKind = $('#rate-kind').value;
    state.nightlyKinds = {};
    $('#book-result').textContent = '';
    refreshQuote();
  };

  function quoteError(error) {
    return error?.message === 'rooms'
      ? tr('房间数须为1–10间的整数。', 'Choose 1–10 whole rooms.', 'Escolha entre 1 e 10 quartos.')
      : error?.message === 'period'
        ? tr('請選擇有效的試算價格時段。', 'Choose a valid rate period for the estimate.', 'Escolha um período de preço válido para a estimativa.')
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
        currentQuote(state.room, 1);
        validDates = true;
      } catch (error) {
        $('#rate-error').textContent = quoteError(error);
      }
    }
    const displayedRates = new Map();
    roomNames.forEach((_, index) => {
      const price = $('[data-room-price="' + index + '"]');
      const range = $('[data-room-range="' + index + '"]');
      if (validDates) {
        const quote = currentQuote(index, 1);
        const rates = quote.nightly.map(night => night.rate);
        displayedRates.set(index, quote.average);
        price.textContent = money(quote.average);
        range.textContent = tr('所選日期平均／間夜，未稅；', 'Selected-stay average / room-night, before tax; ', 'Média / quarto-noite, antes de impostos; ')
          + money(Math.min(...rates)) + '–' + money(Math.max(...rates));
      } else {
        displayedRates.set(index, baseRates[index]);
        price.textContent = money(baseRates[index]);
        range.textContent = tr('平日／間夜，未含5%住宿稅；選擇日期查看總額', 'Weekday / room-night, excluding 5% accommodation tax; select dates for the total', 'Dia útil / quarto-noite, sem imposto de alojamento de 5%; escolha datas para o total');
      }
    });
    [...container.querySelectorAll('[data-room-card]')]
      .sort((a,b) => displayedRates.get(Number(a.dataset.roomCard)) - displayedRates.get(Number(b.dataset.roomCard)))
      .forEach(card => $('.room-grid').appendChild(card));
    if (!validDates) {
      $('#rate-quote').textContent = tr('请选择有效入住和退房日期。', 'Select valid check-in and checkout dates.', 'Escolha datas válidas.');
      return;
    }
    try {
      const quote = currentQuote();
      $('#rate-quote').innerHTML = [
        '<h4>', tr('每晚房价明细', 'Nightly rate breakdown', 'Preços por noite'), '</h4><div class="nightly-list">',
        ...quote.nightly.map(night => '<div class="nightly-row"><label>' + night.date
          + '<select data-night-rate="' + night.date + '">' + rateOptions(night.kind)
          + '</select></label><strong>' + money(night.rate) + '</strong></div>'),
        '</div><p>', tr('每晚单价 × 房间数；共', 'Nightly rates × rooms; total ', 'Preço por noite × quartos; total '),
        quote.nights, tr('晚，', ' nights, ', ' noites, '), quote.rooms, tr('间房', ' rooms', ' quartos'),
        '</p><p>', tr('房費小計（未稅）：', 'Room subtotal before tax: ', 'Subtotal do alojamento antes de impostos: '), money(quote.subtotal),
        '<br>', tr('住宿稅（5%）：', 'Accommodation tax (5%): ', 'Imposto de alojamento (5%): '), money(quote.tax),
        '<br>', tr('強制服務費：', 'Compulsory service charge: ', 'Taxa de serviço obrigatória: '), money(quote.serviceCharge),
        '</p><p class="price">', tr('含住宿稅總額：', 'Total including accommodation tax: ', 'Total com imposto de alojamento: '), money(quote.total), '</p><p class="muted">',
        tr('總額為所選房費加5%住宿稅，沒有額外強制服務費；不含早餐、工作坊及其他消費。', 'Total is the selected room charges plus 5% accommodation tax, with no additional compulsory service charge. Breakfast, workshops and extras are excluded.', 'Total dos quartos mais imposto de alojamento de 5%, sem taxa de serviço obrigatória adicional. Não inclui pequeno-almoço, oficinas ou outros extras.'),
        '</p>',
      ].join('');
      container.querySelectorAll('[data-night-rate]').forEach(select => {
        select.onchange = () => {
          state.nightlyKinds[select.dataset.nightRate] = select.value;
          $('#book-result').textContent = '';
          refreshQuote();
        };
      });
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
      const quote = currentQuote();
      if (!Number.isInteger(state.guests) || state.guests < 1 || state.guests > 30) {
        $('#book-result').textContent = tr('请输入1–30位入住人数。', 'Enter 1–30 guests.', 'Indique entre 1 e 30 hóspedes.');
        return;
      }
      saved = { ...state, nightlyKinds: { ...state.nightlyKinds }, version: 3, ...quote };
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
  } else if (needsRequote || localStorage.getItem('mns-book')) {
    $('#book-result').textContent = tr('房價與稅費已更新，請核對價格時段並重新計算、保存草案。', 'Room rates and tax have been updated. Check the rate periods, then calculate and save a new draft.', 'Os preços e impostos foram atualizados. Confirme os períodos de preço, recalcule e guarde um novo rascunho.');
  }
  bindPhotos(container, lang);
}
