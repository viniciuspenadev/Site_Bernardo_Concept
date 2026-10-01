// Módulo (export vazio): as variáveis deste arquivo não colidem com as dos outros scripts.
export {};

// Galeria das obras de sacada: abre a foto grande num <dialog>, com setas, teclado e
// gesto de deslizar. O botão do WhatsApp acompanha a obra que está na tela.
// Navega pelas obras do filtro ativo no carrossel, na mesma ordem dele.
const track = document.getElementById('obras-trilho');
const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');

if (track && dialog && typeof dialog.showModal === 'function') {
  let links: HTMLAnchorElement[] = [];
  const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const stage = dialog.querySelector<HTMLElement>('[data-lightbox-stage]');
  const count = dialog.querySelector<HTMLElement>('[data-lightbox-count]');
  const position = dialog.querySelector<HTMLElement>('[data-lightbox-position]');
  const title = dialog.querySelector<HTMLElement>('[data-lightbox-title]');
  const text = dialog.querySelector<HTMLElement>('[data-lightbox-text]');
  const tags = dialog.querySelector<HTMLElement>('[data-lightbox-tags]');
  const whatsapp = dialog.querySelector<HTMLAnchorElement>('[data-lightbox-whatsapp]');

  let index = 0;
  let opener: HTMLElement | null = null;

  const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') gtag('event', name, params);
  };

  const wrap = (i: number) => (i + links.length) % links.length;

  // Deixa a vizinha pronta para a troca não piscar.
  const preload = (i: number) => {
    const link = links[wrap(i)];
    if (link) new Image().src = link.href;
  };

  const show = (next: number) => {
    index = wrap(next);
    const link = links[index];
    if (!link || !image) return;
    image.dataset.loading = 'true';
    image.onload = () => { image.dataset.loading = 'false'; };
    image.width = Number(link.dataset.largura) || 0;
    image.height = Number(link.dataset.altura) || 0;
    image.alt = link.dataset.alt ?? '';
    image.src = link.href;
    if (count) count.textContent = `${index + 1} / ${links.length}`;
    if (position) position.textContent = `Foto ${index + 1} de ${links.length}.`;
    if (title) title.textContent = link.dataset.titulo ?? '';
    if (text) text.textContent = link.dataset.texto ?? '';
    if (tags) {
      tags.textContent = link.dataset.tags ?? '';
      tags.hidden = !link.dataset.tags;
    }
    if (whatsapp && link.dataset.whatsapp) whatsapp.href = link.dataset.whatsapp;
    preload(index + 1);
    preload(index - 1);
  };

  // Obras originais visíveis no filtro atual. As cópias do carrossel ficam de fora.
  const visibleLinks = () => Array.from(track.querySelectorAll<HTMLAnchorElement>('[data-carrossel-slide]:not([hidden]) a[data-obra]'));

  const open = (i: number, trigger: HTMLElement) => {
    opener = trigger;
    show(i);
    document.documentElement.classList.add('lp-lightbox-open');
    dialog.showModal();
    trackEvent('obra_sacada_abrir', { obra: links[index]?.dataset.slug });
  };

  // Um único ouvinte no trilho atende originais e cópias: a cópia abre a obra original
  // de mesmo data-index.
  track.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[data-obra]') : null;
    // Ctrl, ⌘ ou Shift + clique continuam abrindo a foto em outra aba ou janela.
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    links = visibleLinks();
    open(Math.max(0, links.findIndex(item => item.dataset.index === link.dataset.index)), link);
  });

  dialog.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1);
    }
  });

  // Esc também fecha (comportamento nativo do <dialog>). O foco volta para a foto clicada;
  // se foi uma cópia do carrossel (oculta para leitores de tela), vai para a obra original.
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('lp-lightbox-open');
    const original = opener?.closest('[data-carrossel-clone]')
      ? track.querySelector<HTMLElement>(`[data-carrossel-slide] a[data-index="${opener.dataset.index}"]`)
      : opener;
    original?.focus({ preventScroll: true });
  });

  // No celular, deslizar troca de foto; tocar fora da foto fecha. O CSS libera o zoom de
  // pinça (touch-action), então só o gesto horizontal é tratado aqui.
  let startX = 0;
  let startY = 0;
  let tracking = false;
  let swiped = false;
  stage?.addEventListener('pointerdown', event => {
    tracking = true;
    swiped = false;
    startX = event.clientX;
    startY = event.clientY;
  });
  stage?.addEventListener('pointerup', event => {
    if (!tracking) return;
    tracking = false;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swiped = true;
      show(index + (dx < 0 ? 1 : -1));
    }
  });
  stage?.addEventListener('pointercancel', () => { tracking = false; });
  stage?.addEventListener('click', event => {
    if (swiped) {
      swiped = false;
      return;
    }
    if (event.target === stage) dialog.close();
  });
}
