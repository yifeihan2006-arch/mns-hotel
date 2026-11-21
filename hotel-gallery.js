// Hotel facilities and equipment.
const assets = [
  ['site-map',4,['酒店位置','Hotel location','Localização do hotel'],['司打口周邊街區及酒店位置。','Hotel location and the surrounding Praça de Ponte e Horta neighbourhood.','Localização do hotel e zona envolvente da Praça de Ponte e Horta.']],
  ['exterior-front',5,['酒店正面外觀','Hotel exterior · front','Exterior do hotel · frente'],['主入口、門廊與街道側外觀。','Main entrance, entrance canopy and street-facing façade.','Entrada principal, cobertura de entrada e fachada voltada para a rua.']],
  ['exterior-aerial',6,['酒店外觀與周邊街道','Hotel exterior and surrounding streets','Exterior do hotel e ruas envolventes'],['酒店建築、入口及周邊街道。','Hotel building, entrance and surrounding streets.','Edifício do hotel, entrada e ruas envolventes.']],
  ['reception',28,['地面層接待大堂','Ground-floor reception','Receção no rés do chão'],['前台接待桌、等候座位及休憩茶几。','Reception desk, waiting seats and lounge tables.','Balcão de receção, assentos de espera e mesas de apoio.']],
  ['workshop',29,['地面層文化工作坊空間','Ground-floor cultural workshop space','Espaço de oficinas culturais no rés do chão'],['創作工作桌、座椅、手作材料與文化圖案展示。','Creative worktables, seating, craft materials and cultural motif displays.','Mesas de trabalho criativo, assentos, materiais de artesanato e motivos culturais em exposição.']],
  ['reading',30,['地面層街區閱讀休憩區','Ground-floor neighbourhood reading lounge','Sala de leitura dos bairros no rés do chão'],['書架、閱讀座椅與休憩茶几。','Bookshelves, reading seats and lounge tables.','Estantes, assentos de leitura e mesas de apoio.']],
  ['restaurant',31,['一樓餐廳與酒吧','First-floor restaurant and bar','Restaurante e bar no primeiro piso'],['餐桌、餐椅、吧台與用餐座席。','Dining tables, chairs, bar counter and dining seating.','Mesas de refeição, cadeiras, balcão de bar e lugares para refeições.']],
  ['pool',32,['二樓室內泳池','Second-floor indoor pool','Piscina interior no segundo piso'],['室內泳池、池畔通道及入水扶手。','Indoor pool, poolside walkway and entry handrails.','Piscina interior, passagem junto à piscina e corrimãos de entrada.']],
  ['fitness',33,['二樓健身室','Second-floor fitness room','Ginásio no segundo piso'],['跑步機、訓練器材與伸展空間。','Treadmills, exercise equipment and a stretching area.','Passadeiras, equipamento de exercício e zona de alongamentos.']],
];
export const hotelGallery = assets.map(([id,image,names,descriptions]) => ({id:'hotel-'+id,image,names,descriptions}));
export const hotelPhotos = Object.fromEntries(hotelGallery.map(item => {
  const url = `./resources/appendix-20261121/image-${item.image}.webp`;
  return [item.id,{url,page:url,fit:'contain',hideCredit:true,
    note:item.descriptions.map((text,i) => item.names[i] + ' · ' + text)}];
}));
export function hotelGalleryMarkup(lang,photoMarkup) {
  const n = {zh:0,en:1,pt:2}[lang] ?? 1;
  const tr = (zh,en,pt) => [zh,en,pt][n];
  const group = ids => `<div class="grid hotel-gallery-grid">${hotelGallery.filter(item=>ids.includes(item.id)).map(item=>`<article class="card">${photoMarkup(item.id,item.names[n],lang)}</article>`).join('')}</div>`;
  return `<section class="panel hotel-gallery" aria-labelledby="hotel-gallery-title"><h3 id="hotel-gallery-title">${tr('酒店設施與空間','Hotel facilities and spaces','Instalações e espaços do hotel')}</h3>
    ${group(['hotel-reception','hotel-workshop','hotel-reading','hotel-restaurant','hotel-pool','hotel-fitness'])}
    <details class="hotel-gallery-details"><summary>${tr('位置與酒店外觀','Location and hotel exterior','Localização e exterior do hotel')}</summary>${group(['hotel-site-map','hotel-exterior-front','hotel-exterior-aerial'])}</details>
  </section>`;
}
