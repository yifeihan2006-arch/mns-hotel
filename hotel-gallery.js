// Hotel imagery from the latest hotel plan, Appendices A and I. Room imagery is mapped separately.
const assets = [
  ['site-map', 4, 'A', ['酒店建議選址圖', 'Proposed hotel site map', 'Mapa da localização proposta'], 'map'],
  ['exterior-front', 5, 'A', ['酒店外觀正面概念圖', 'Hotel exterior concept · front', 'Conceito da fachada · frente']],
  ['exterior-aerial', 6, 'A', ['酒店外觀鳥瞰概念圖', 'Hotel exterior concept · aerial view', 'Conceito do exterior · vista aérea']],
  ['reception', 28, 'I', ['地面層接待大堂', 'Ground-floor reception', 'Receção no rés do chão']],
  ['workshop', 29, 'I', ['地面層文化工作坊空間', 'Ground-floor cultural workshop space', 'Espaço de oficinas culturais no rés do chão']],
  ['reading', 30, 'I', ['地面層街區閱讀休憩區', 'Ground-floor neighbourhood reading lounge', 'Sala de leitura dos bairros no rés do chão']],
  ['restaurant', 31, 'I', ['一樓餐廳與酒吧', 'First-floor restaurant and bar', 'Restaurante e bar no primeiro piso']],
  ['pool', 32, 'I', ['二樓室內泳池', 'Second-floor indoor pool', 'Piscina interior no segundo piso']],
  ['fitness', 33, 'I', ['二樓健身室', 'Second-floor fitness room', 'Ginásio no segundo piso']],
];
export const hotelGallery = assets.map(([id, image, appendix, names, kind]) => ({id: 'hotel-' + id, image, appendix, names, kind}));
export const hotelPhotos = Object.fromEntries(hotelGallery.map(item => {
  const url = `./resources/appendix-20261121/image-${item.image}.webp`;
  const note = item.kind === 'map'
    ? ['附錄 A · 文檔選址圖 · © OpenStreetMap contributors', 'Appendix A · Site map from the plan · © OpenStreetMap contributors', 'Apêndice A · Mapa do plano · © OpenStreetMap contributors']
    : [`附錄 ${item.appendix} · 文檔原圖 · 概念效果圖`, `Appendix ${item.appendix} · Illustration from the plan · Concept rendering`, `Apêndice ${item.appendix} · Imagem do plano · Visualização conceptual`];
  return [item.id, {url, page: url, fit: 'contain', note}];
}));
export function hotelGalleryMarkup(lang, photoMarkup) {
  const n = {zh: 0, en: 1, pt: 2}[lang] ?? 1;
  const tr = (zh, en, pt) => [zh, en, pt][n];
  const group = ids => `<div class="grid hotel-gallery-grid">${hotelGallery.filter(item => ids.includes(item.id)).map(item => `<article class="card"><h4>${item.names[n]}</h4>${photoMarkup(item.id, item.names[n], lang)}</article>`).join('')}</div>`;
  return `<section class="panel hotel-gallery" aria-labelledby="hotel-gallery-title"><h3 id="hotel-gallery-title">${tr('酒店設計與設施圖集', 'Hotel design and facilities gallery', 'Galeria do hotel e das instalações')}</h3>
    <p class="hint">${tr('圖片取自最新商業企劃書附錄 A 及 I。效果圖屬概念設計，並非竣工照片或已開放設施。可點擊圖片放大查看。', 'Images follow Appendices A and I of the latest business plan. Renderings show concepts, not completed or operating facilities. Select an image to enlarge it.', 'Imagens dos Apêndices A e I do plano de negócios atualizado. As visualizações são conceptuais, não mostram instalações concluídas ou em funcionamento. Selecione uma imagem para a ampliar.')}</p>
    ${group(['hotel-reception', 'hotel-workshop', 'hotel-reading', 'hotel-restaurant', 'hotel-pool', 'hotel-fitness'])}
    <details class="hotel-gallery-details"><summary>${tr('選址與外觀 · 附錄 A', 'Site and exterior · Appendix A', 'Localização e exterior · Apêndice A')}</summary>${group(['hotel-site-map', 'hotel-exterior-front', 'hotel-exterior-aerial'])}</details>
  </section>`;
}
