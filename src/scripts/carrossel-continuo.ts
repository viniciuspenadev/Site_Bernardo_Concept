// Módulo (export vazio): as variáveis deste arquivo não colidem com as dos outros scripts.
export {};

// Carrossel de rolagem contínua (home e página de sacadas), ligado a CarrosselContinuo.astro.
//
// O trilho anda por transform, em velocidade constante: um cartão a cada N segundos, sem
// encaixe nem parada entre cartões. Há uma cópia de todos os cartões antes dos originais e
// outra depois; a janela visível percorre sempre a mesma faixa (do fim da primeira cópia ao
// fim dos originais) e recomeça sem salto visível, porque as cópias são idênticas. Assim
// qualquer cartão original pode aparecer inteiro na tela, o que importa para o foco do
// teclado: é o original que recebe o foco, não a cópia. As setas deslizam um cartão; arrastar com o mouse ou deslizar
// com o dedo move o trilho, com inércia ao soltar. Partidas e paradas são sempre suaves.
//
// Ele só para quando faz sentido: fora da tela, com a aba oculta, com algum <dialog> aberto
// (galeria, menu), com o foco do teclado dentro dele e com a preferência por menos
// movimento (nesse caso fica parado e só as setas e o arraste o movem). Quando os cartões
// cabem todos na tela, fica parado e centralizado, sem setas.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mod = (value: number, size: number) => ((value % size) + size) % size;
const easeInOut = (t: number) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

document.querySelectorAll<HTMLElement>('[data-carrossel]').forEach(iniciar);

function iniciar(root: HTMLElement) {
  const viewport = root.querySelector<HTMLElement>('[data-carrossel-viewport]');
  const track = root.querySelector<HTMLElement>('[data-carrossel-trilho]');
  if (!viewport || !track) return;
  const prev = root.querySelector<HTMLButtonElement>('[data-carrossel-anterior]');
  const next = root.querySelector<HTMLButtonElement>('[data-carrossel-proxima]');
  const status = root.querySelector<HTMLElement>('[data-carrossel-status]');
  const empty = root.querySelector<HTMLElement>('[data-carrossel-vazio]');
  const filters = Array.from(document.querySelectorAll<HTMLButtonElement>(`[data-carrossel-filtro][aria-controls="${track.id}"]`));
  const originals = Array.from(track.querySelectorAll<HTMLElement>('[data-carrossel-slide]'));
  const secondsPerCard = Number(root.dataset.segundosPorCartao) || 10;

  // Cópias de todos os cartões, antes e depois: fora do leitor de tela e do Tab, mas clicáveis.
  const copy = (slide: HTMLElement) => {
    const clone = slide.cloneNode(true) as HTMLElement;
    for (const attribute of ['data-carrossel-slide', 'role', 'aria-roledescription', 'aria-label']) clone.removeAttribute(attribute);
    clone.setAttribute('data-carrossel-clone', '');
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a, button').forEach(element => element.setAttribute('tabindex', '-1'));
    return clone;
  };
  const before = originals.map(copy);
  const after = originals.map(copy);
  track.prepend(...before);
  track.append(...after);
  const clones = [...before, ...after];
  root.classList.add('carrossel-ativo');

  let visible = originals;
  let offset = 0;        // deslocamento em px; o trilho mostra mod(offset, setWidth)
  let step = 0;          // largura de um cartão + espaço entre cartões
  let setWidth = 0;      // largura de um conjunto
  let fade = 0;          // largura do degradê, em px
  let moving = false;    // os cartões não cabem na tela: modo contínuo
  let speed = 0;         // px/s, sempre aproximando da velocidade alvo
  let glide: { from: number; to: number; start: number; duration: number } | null = null;
  let fling = 0;         // inércia depois de arrastar, em px/s
  let inView = false;
  let keyboardInside = false;
  let pointerId: number | null = null;
  let dragged = false;
  let startX = 0;
  let startOffset = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let frame = 0;
  let lastFrame = 0;

  // Mesma largura do degradê de .carrossel em global.css: clamp(48px, 9vw, 160px).
  const fadeWidth = () => Math.min(160, Math.max(48, viewport.clientWidth * .09));
  const dialogOpen = () => document.querySelector('dialog[open]') !== null;
  const targetSpeed = () =>
    !moving || reducedMotion.matches || !inView || document.hidden || keyboardInside || dialogOpen() ? 0 : step / secondsPerCard;

  // Início da janela visível no trilho: de (conjunto - degradê) até (2 conjuntos - degradê).
  // offset = i × passo - degradê deixa o cartão original i logo depois do degradê.
  const render = () => {
    track.style.transform = moving ? `translate3d(${-(setWidth - fade + mod(offset + fade, setWidth))}px, 0, 0)` : '';
  };

  const needsFrame = () =>
    moving && (glide !== null || pointerId !== null || fling !== 0 || speed > .5 || targetSpeed() > 0);

  const tick = (now: number) => {
    frame = 0;
    const dt = Math.min(.05, Math.max(0, (now - lastFrame) / 1000));
    lastFrame = now;
    if (glide) {
      const t = glide.duration ? Math.min(1, (now - glide.start) / glide.duration) : 1;
      offset = glide.from + (glide.to - glide.from) * easeInOut(t);
      if (t >= 1) {
        glide = null;
        speed = 0; // retoma a deriva do zero, acelerando aos poucos
      }
    } else if (pointerId === null) {
      speed += (targetSpeed() - speed) * Math.min(1, dt * 2.5);
      offset += (speed + fling) * dt;
      fling *= Math.pow(.05, dt);
      if (Math.abs(fling) < 4) fling = 0;
    }
    render();
    if (needsFrame()) frame = requestAnimationFrame(tick);
  };

  const wake = () => {
    if (frame || !needsFrame()) return;
    lastFrame = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const measure = () => {
    const first = visible[0];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    step = first ? first.getBoundingClientRect().width + gap : 0;
    setWidth = step * visible.length;
    fade = fadeWidth();
    moving = visible.length > 1 && setWidth > viewport.clientWidth;
    clones.forEach((clone, i) => { clone.hidden = !moving || Boolean(originals[i % originals.length]?.hidden); });
    root.dataset.modo = moving ? 'continuo' : 'parado';
    if (prev) prev.hidden = !moving;
    if (next) next.hidden = !moving;
    render();
    wake();
  };

  const filter = (id: string, announce: boolean) => {
    filters.forEach(button => button.setAttribute('aria-pressed', String((button.dataset.carrosselFiltro ?? '') === id)));
    originals.forEach(slide => {
      slide.hidden = id !== '' && !(slide.dataset.filtros ?? '').split(' ').includes(id);
    });
    visible = originals.filter(slide => !slide.hidden);
    // O primeiro cartão começa logo depois do degradê da esquerda.
    offset = -fadeWidth();
    glide = null;
    fling = 0;
    speed = 0;
    measure();
    if (empty) empty.hidden = visible.length > 0;
    if (announce && status) {
      const noun = visible.length === 1 ? root.dataset.itemSingular : root.dataset.itemPlural;
      const label = filters.find(button => (button.dataset.carrosselFiltro ?? '') === id)?.textContent?.trim();
      status.textContent = `${visible.length} ${noun}${id && label ? ` — ${label}` : ''}`;
    }
  };

  const slide = (direction: 1 | -1) => {
    if (!moving) return;
    // Cliques seguidos se somam: cada um vale um cartão a partir do destino anterior.
    const to = (glide ? glide.to : offset) + direction * step;
    fling = 0;
    glide = { from: offset, to, start: performance.now(), duration: reducedMotion.matches ? 0 : 700 };
    wake();
  };

  // Traz para a tela o cartão que recebeu foco pelo teclado, logo depois do degradê.
  const reveal = (card: HTMLElement) => {
    const index = visible.indexOf(card);
    if (index < 0 || !moving) return;
    let delta = mod(index * step - fade - offset, setWidth);
    if (delta > setWidth / 2) delta -= setWidth;
    fling = 0;
    glide = { from: offset, to: offset + delta, start: performance.now(), duration: reducedMotion.matches ? 0 : 500 };
    wake();
  };

  filters.forEach(button => button.addEventListener('click', () => filter(button.dataset.carrosselFiltro ?? '', true)));
  prev?.addEventListener('click', () => slide(-1));
  next?.addEventListener('click', () => slide(1));

  // Arrastar (mouse) e deslizar (dedo). O CSS deixa o gesto vertical com a página
  // (touch-action: pan-y); só o horizontal move o trilho. Abaixo de 6 px ainda é clique.
  viewport.addEventListener('pointerdown', event => {
    if (!moving || (event.pointerType === 'mouse' && event.button !== 0)) return;
    pointerId = event.pointerId;
    dragged = false;
    startX = lastX = event.clientX;
    lastTime = event.timeStamp;
    startOffset = offset;
    velocity = 0;
    glide = null;
    fling = 0;
    wake();
  });
  viewport.addEventListener('pointermove', event => {
    if (event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    if (!dragged && Math.abs(dx) > 6) {
      dragged = true;
      viewport.setPointerCapture(event.pointerId);
      root.dataset.arrastando = 'true';
    }
    if (!dragged) return;
    offset = startOffset - dx;
    const elapsed = event.timeStamp - lastTime;
    if (elapsed > 0) velocity = .8 * ((lastX - event.clientX) / elapsed) * 1000 + .2 * velocity;
    lastX = event.clientX;
    lastTime = event.timeStamp;
    render();
  });
  const release = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    root.dataset.arrastando = 'false';
    if (dragged) {
      fling = Math.max(-2400, Math.min(2400, velocity));
      speed = 0;
    }
    wake();
  };
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);
  // O fim de um arraste não pode virar clique num cartão (abriria a galeria).
  viewport.addEventListener('click', event => {
    if (!dragged) return;
    dragged = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  viewport.addEventListener('dragstart', event => event.preventDefault());

  // Só o foco vindo do teclado para o carrossel: clicar numa seta também foca o botão.
  root.addEventListener('focusin', event => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    keyboardInside = Boolean(target?.matches(':focus-visible'));
    const card = target?.closest<HTMLElement>('[data-carrossel-slide]');
    if (keyboardInside && card) reveal(card);
    wake();
  });
  root.addEventListener('focusout', event => {
    if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return;
    keyboardInside = false;
    wake();
  });
  // overflow: clip impede que o foco role a janela do carrossel; isto cobre navegadores
  // sem clip, devolvendo a rolagem para o deslocamento do trilho.
  viewport.addEventListener('scroll', () => {
    if (!viewport.scrollLeft) return;
    offset += viewport.scrollLeft;
    viewport.scrollLeft = 0;
    render();
  });

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    wake();
  }).observe(root);
  document.addEventListener('visibilitychange', wake);
  reducedMotion.addEventListener('change', wake);
  document.querySelectorAll('dialog').forEach(dialog => {
    new MutationObserver(wake).observe(dialog, { attributes: true, attributeFilter: ['open'] });
  });
  new ResizeObserver(measure).observe(viewport);

  const initial = filters.find(button => button.getAttribute('aria-pressed') === 'true')?.dataset.carrosselFiltro ?? '';
  filter(initial, false);
}
