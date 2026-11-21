import { attractionPhotos } from './attraction-photos.js';
import { foodPhotos } from './food-photos.js';
import { roomPhotos } from './room-photos.js?v=simple-rooms-20261121';
import { hotelPhotos } from './hotel-gallery.js?v=simple-rooms-20261121';
const photoCatalog = { ...attractionPhotos, ...foodPhotos, ...roomPhotos, ...hotelPhotos };

const label = (lang, zh, en, pt) => ({ zh, en, pt })[lang] || en;
const safe = value => String(value || '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function photoMarkup(id, title, lang, compact = false) {
  const photo = photoCatalog[id];
  if (!photo) return '';
  const caption = /^(room-|hotel-)/.test(id) && photo.note ? photo.note[({zh:0,en:1,pt:2})[lang]] || photo.note[1] : '';
  return `<figure class="attraction-photo ${compact ? 'photo-compact' : ''} ${photo.fit === 'contain' ? 'photo-contain' : ''}" data-photo-id="${safe(id)}">
    <button type="button" class="photo-open" aria-label="${safe(label(lang, '放大照片：', 'Enlarge photo: ', 'Ampliar fotografia: ') + title)}">
      <img src="${safe(photo.url)}" alt="${safe(title)}" loading="lazy" decoding="async" width="720" height="480" referrerpolicy="no-referrer">
      <span class="photo-enlarge" aria-hidden="true">${label(lang, '放大', 'Enlarge', 'Ampliar')}</span>
    </button>
    ${caption ? `<figcaption>${safe(caption)}</figcaption>` : ''}
    <div class="photo-error" hidden><p>${label(lang, '照片暂时无法加载。', 'Photo temporarily unavailable.', 'Fotografia temporariamente indisponível.')}</p><button type="button" class="photo-retry">${label(lang, '重新加载', 'Retry', 'Tentar novamente')}</button></div>
  </figure>`;
}

function lightbox() {
  let dialog = document.querySelector('#photo-lightbox');
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.id = 'photo-lightbox';
  dialog.innerHTML = '<button class="lightbox-close" type="button"></button><h2></h2><img alt="" referrerpolicy="no-referrer">';
  document.body.append(dialog);
  dialog.querySelector('button').onclick = () => dialog.close();
  dialog.onclick = event => { if (event.target === dialog) dialog.close(); };
  return dialog;
}

export function bindPhotos(container, lang) {
  container.querySelectorAll('[data-photo-id]').forEach(figure => {
    const photo = photoCatalog[figure.dataset.photoId];
    const image = figure.querySelector('img');
    const error = figure.querySelector('.photo-error');
    let fallback = false;
    const open = figure.querySelector('.photo-open');
    image.onerror = () => {
      if (!fallback && photo.backup?.url && photo.backup.url !== photo.url) {
        fallback = true;
        image.src = photo.backup.url;
        return;
      }
      image.hidden = true;
      open.hidden = true;
      error.hidden = false;
    };
    image.onload = () => {
      image.hidden = false;
      open.hidden = false;
      error.hidden = true;
    };
    figure.querySelector('.photo-retry').onclick = () => {
      fallback = false;
      error.hidden = true;
      open.hidden = false;
      image.hidden = false;
      image.src = photo.url;
    };
    open.onclick = () => {
      const dialog = lightbox();
      dialog.querySelector('h2').textContent = image.alt;
      dialog.querySelector('img').src = image.currentSrc || image.src;
      dialog.querySelector('img').alt = image.alt;
      dialog.querySelector('.lightbox-close').textContent = label(lang, '关闭', 'Close', 'Fechar');
      dialog.showModal();
    };
    if (image.complete && image.naturalWidth === 0) image.onerror();
  });
}
