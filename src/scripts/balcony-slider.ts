// Módulo (export vazio): as variáveis deste arquivo não colidem com as dos outros scripts.
export {};

// Demonstração da página de sacadas: o visitante abre e fecha a sacada arrastando a
// cena, o controle deslizante ou o botão. O vídeo é o mesmo da home; a posição do
// controle define o quadro exibido, sem reprodução automática.
const root = document.querySelector<HTMLElement>('[data-demo]');
const film = root?.querySelector<HTMLVideoElement>('[data-demo-film]');
const stage = root?.querySelector<HTMLElement>('[data-demo-stage]');
const range = root?.querySelector<HTMLInputElement>('[data-demo-range]');
const toggle = root?.querySelector<HTMLButtonElement>('[data-demo-toggle]');

if (root && film && stage && range && toggle) {
  const controls = root.querySelector<HTMLElement>('[data-demo-controls]');
  const state = root.querySelector<HTMLElement>('[data-demo-state]');
  const hint = root.querySelector<HTMLElement>('[data-demo-hint]');
  const error = root.querySelector<HTMLElement>('[data-demo-error]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

  let value = 0;
  let loaded = false;
  let failed = false;
  let primed = false;
  let interacted = false;
  let animation = 0;

  if (controls) controls.hidden = false;

  const describe = (v: number) => (v <= 0 ? 'Fechada' : v >= 100 ? 'Totalmente aberta' : `Aberta ${v}%`);

  const load = () => {
    if (loaded || failed) return;
    loaded = true;
    film.src = film.dataset.src ?? '';
    film.preload = 'auto';
    film.load();
  };

  // Busca agrupada: enquanto um quadro decodifica, só o destino mais recente importa.
  // O evento seeked chama de novo e alcança a posição atual do controle.
  const seek = () => {
    if (failed || film.readyState < 1 || film.seeking || !Number.isFinite(film.duration)) return;
    const time = (value / 100) * Math.max(0, film.duration - 1 / 24);
    if (Math.abs(film.currentTime - time) > 1 / 48) film.currentTime = time;
  };

  const render = () => {
    range.value = String(value);
    range.setAttribute('aria-valuetext', describe(value));
    range.style.setProperty('--demo-progress', `${value}%`);
    if (state) state.textContent = describe(value);
    const open = value >= 50;
    toggle.textContent = open ? 'Fechar sacada' : 'Abrir sacada';
    toggle.setAttribute('aria-pressed', String(open));
    seek();
  };

  const set = (next: number) => {
    value = Math.round(Math.max(0, Math.min(100, next)));
    render();
  };

  // O Safari do iPhone só decodifica quadros depois de um play(). Como o primeiro
  // gesto do visitante autoriza a reprodução, um play/pause imediato libera a busca.
  const prime = () => {
    if (primed) return;
    primed = true;
    film.play()?.then(() => { film.pause(); seek(); }).catch(() => { /* a busca segue sem o play */ });
  };

  const firstInteraction = () => {
    load();
    prime();
    if (interacted) return;
    interacted = true;
    hint?.setAttribute('data-hidden', 'true');
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') gtag('event', 'demo_sacada_interacao');
  };

  const stopAnimation = () => {
    cancelAnimationFrame(animation);
    animation = 0;
  };

  const animateTo = (target: number) => {
    stopAnimation();
    if (reducedMotion.matches) {
      set(target);
      return;
    }
    const from = value;
    const duration = 300 + 1700 * (Math.abs(target - from) / 100);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      set(from + (target - from) * eased);
      animation = t < 1 ? requestAnimationFrame(step) : 0;
    };
    animation = requestAnimationFrame(step);
  };

  range.addEventListener('input', () => {
    firstInteraction();
    stopAnimation();
    set(Number(range.value));
  });

  toggle.addEventListener('click', () => {
    firstInteraction();
    animateTo(value >= 50 ? 0 : 100);
  });

  // Arrastar a própria cena. O CSS usa touch-action: pan-y, então no celular o gesto
  // vertical continua rolando a página e só o horizontal mexe na sacada.
  let dragging = false;
  let dragStartX = 0;
  let dragStartValue = 0;
  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0 || failed) return;
    dragging = true;
    dragStartX = event.clientX;
    dragStartValue = value;
    stage.setPointerCapture(event.pointerId);
    stage.dataset.dragging = 'true';
    firstInteraction();
    stopAnimation();
  });
  stage.addEventListener('pointermove', event => {
    if (dragging) set(dragStartValue + ((event.clientX - dragStartX) / stage.clientWidth) * 130);
  });
  const endDrag = () => {
    dragging = false;
    stage.dataset.dragging = 'false';
  };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  film.addEventListener('loadedmetadata', seek);
  film.addEventListener('loadeddata', seek);
  film.addEventListener('seeked', seek);
  film.addEventListener('error', () => {
    failed = true;
    stopAnimation();
    if (controls) controls.hidden = true;
    if (hint) hint.hidden = true;
    if (state) state.hidden = true;
    if (error) error.hidden = false;
    stage.style.cursor = 'default';
  });

  // O vídeo tem 7,6 MB: carrega quando a seção se aproxima da tela. Com economia de
  // dados ligada, espera o primeiro gesto do visitante.
  if (!saveData) {
    new IntersectionObserver((entries, observer) => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      load();
      observer.disconnect();
    }, { rootMargin: '400px 0px' }).observe(root);
  }

  render();
}
