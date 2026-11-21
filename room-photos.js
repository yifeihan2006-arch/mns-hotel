// Latest business plan: Appendix D (king/twin) and Appendices E–H.
const rooms = [
  ['room-0', 22, 'D'], ['room-0-twin', 23, 'D'],
  ['room-1', 24, 'E'], ['room-2', 25, 'F'],
  ['room-3', 26, 'G'], ['room-4', 27, 'H'],
];
export const roomPhotoTitles = {
  'room-0': ['街區故事房：一張大床', 'Neighbourhood Story Room · one king bed', 'Quarto Histórias do Bairro · uma cama king'],
  'room-0-twin': ['街區故事房：兩張獨立單人床', 'Neighbourhood Story Room · two separate single beds', 'Quarto Histórias do Bairro · duas camas individuais separadas'],
  'room-1': ['文化豪華房：大床與閱讀角', 'Heritage Deluxe Room · large bed and reading corner', 'Quarto Heritage Deluxe · cama grande e canto de leitura'],
  'room-2': ['家庭探索房：一張大床及一張單人床', 'Family Discovery Room · one large bed and one single bed', 'Quarto Familiar Discovery · uma cama grande e uma cama individual'],
  'room-3': ['文化工作室房：創作桌與閱讀區', 'Culture Studio Room · creative desk and reading area', 'Estúdio Cultural · mesa criativa e zona de leitura'],
  'room-4': ['澳門文化套房：獨立客廳與臥室', 'Macao Heritage Suite · separate living room and bedroom', 'Suite Património de Macau · sala e quarto separados'],
};
export const roomPhotos = Object.fromEntries(rooms.map(([id, image, appendix]) => {
  const url = `./resources/appendix-20261121/image-${image}.webp`;
  return [id, {url, page: url, fit: 'contain', note: [
    `附錄 ${appendix} · ${roomPhotoTitles[id][0]} · 概念效果圖`,
    `Appendix ${appendix} · ${roomPhotoTitles[id][1]} · Concept rendering`,
    `Apêndice ${appendix} · ${roomPhotoTitles[id][2]} · Visualização conceptual`,
  ]}];
}));
