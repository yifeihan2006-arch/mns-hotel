// Original room renderings extracted from the hotel's business plan, figures 5–9.
export const roomPhotos = Object.fromEntries(
  [0, 1, 2, 3, 4].map(index => [
    `room-${index}`,
    {
      url: `./resources/room-${index}.jpg`,
      page: `./resources/room-${index}.jpg`,
      note: [
        '文档原图 · AI生成的房型概念效果图',
        'Original from the hotel plan · AI-generated room concept',
        'Imagem original do plano do hotel · Conceito de quarto gerado por IA',
      ],
    },
  ])
);
