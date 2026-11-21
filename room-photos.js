// Latest business plan: Appendix D (king/twin) and Appendices E–H.
const rooms = [
  ['room-0', 22, 'D'], ['room-0-twin', 23, 'D'],
  ['room-1', 24, 'E'], ['room-2', 25, 'F'],
  ['room-3', 26, 'G'], ['room-4', 27, 'H'],
];
export const roomPhotos = Object.fromEntries(rooms.map(([id, image, appendix]) => {
  const url = `./resources/appendix-20261121/image-${image}.webp`;
  return [id, {url, page: url, note: [
    `附錄 ${appendix} · 文檔原圖 · 房型概念效果圖`,
    `Appendix ${appendix} · Illustration from the plan · Room concept rendering`,
    `Apêndice ${appendix} · Imagem do plano · Conceito de quarto`,
  ]}];
}));
