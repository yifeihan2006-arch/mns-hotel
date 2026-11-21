// Hotel room images and equipment descriptions.
const rooms = [['room-0',22],['room-1',24],['room-2',25],['room-3',26],['room-4',27]];
export const roomPhotoTitles = {
  'room-0': ['街區故事房', 'Neighbourhood Story Room', 'Quarto Histórias do Bairro'],
  'room-1': ['文化豪華房', 'Heritage Deluxe Room', 'Quarto Heritage Deluxe'],
  'room-2': ['家庭探索房', 'Family Discovery Room', 'Quarto Familiar Discovery'],
  'room-3': ['文化工作室房', 'Culture Studio Room', 'Estúdio Cultural'],
  'room-4': ['澳門文化套房', 'Macao Heritage Suite', 'Suite Património de Macau'],
};
const descriptions = {
  'room-0': ['大床、書桌及行李置物架。', 'King bed, writing desk and luggage rack.', 'Cama king, secretária e suporte para bagagem.'],
  'room-1': ['大床及配有座椅、邊桌的閱讀角。', 'Large bed and a reading corner with an armchair and side table.', 'Cama grande e canto de leitura com poltrona e mesa de apoio.'],
  'room-2': ['一張大床、一張單人床及書桌。', 'One large bed, one single bed and a writing desk.', 'Uma cama grande, uma cama individual e uma secretária.'],
  'room-3': ['創作書桌、書架及閱讀座椅。', 'Creative desk, bookshelves and a reading armchair.', 'Mesa criativa, estantes e poltrona de leitura.'],
  'room-4': ['分隔式客廳與臥室，配有沙發及茶几。', 'Separate living room and bedroom, with a sofa and coffee table.', 'Sala e quarto separados, com sofá e mesa de centro.'],
};
export const roomPhotos = Object.fromEntries(rooms.map(([id, image]) => {
  const url = `./resources/appendix-20261121/image-${image}.webp`;
  return [id, {url, page: url, fit: 'contain', hideCredit: true,
    note: descriptions[id].map((text, i) => roomPhotoTitles[id][i] + ' · ' + text)}];
}));
