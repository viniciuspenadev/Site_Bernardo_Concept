const portfolio = document.querySelector<HTMLElement>('#projetos');
const track = document.querySelector<HTMLElement>('#projects-scroll');
if (portfolio && track) {
  const originals = Array.from(track.querySelectorAll<HTMLElement>('[data-project]'));
  // Cópias visuais permitem rolagem contínua, sem duplicar a contagem dos registros.
  for (let copy = 0; copy < 2; copy++) {
    originals.forEach(card => {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.dataset.clone = 'true';
      clone.setAttribute('aria-hidden', 'true');
      clone.inert = true;
      track.append(clone);
    });
  }
  const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-project]'));
  const filters = Array.from(portfolio.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const pause = portfolio.querySelector<HTMLButtonElement>('[data-project-pause]');
  const previous = portfolio.querySelector<HTMLButtonElement>('[data-project-prev]');
  const next = portfolio.querySelector<HTMLButtonElement>('[data-project-next]');
  const status = portfolio.querySelector<HTMLElement>('[data-project-status]');
  const empty = portfolio.querySelector<HTMLElement>('[data-project-empty]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let interacting = false;
  let visible = false;
  let activeCount = originals.length;
  let normalizing = false;

  const stepWidth = () => {
    const first = originals.find(card => !card.hidden);
    return first ? first.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0) : 0;
  };
  const updateControls = () => {
    const disabled = activeCount < 2;
    if (previous) previous.disabled = disabled;
    if (next) next.disabled = disabled;
    if (pause) pause.disabled = disabled;
  };
  const normalize = () => {
    if (normalizing || activeCount < 2) return;
    const span = stepWidth() * activeCount;
    if (span && track.scrollLeft >= span - 2) {
      normalizing = true;
      track.scrollTo({left: Math.max(0, track.scrollLeft - span), behavior:'instant'});
      requestAnimationFrame(() => { normalizing = false; });
    }
  };
  const move = (direction: number) => {
    if (activeCount < 2) return;
    const step = stepWidth();
    if (direction < 0 && track.scrollLeft < 2) {
      track.scrollTo({left:step * (activeCount - 1), behavior:'instant'});
      return;
    }
    track.scrollBy({left:direction * step, behavior:reducedMotion.matches ? 'instant' : 'smooth'});
  };
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    originals.forEach(card => {card.hidden = category !== 'Todos' && card.dataset.category !== category;});
    activeCount = originals.filter(card => !card.hidden).length;
    cards.filter(card => card.dataset.clone).forEach(card => {
      card.hidden = activeCount < 2 || (category !== 'Todos' && card.dataset.category !== category);
    });
    track.scrollTo({left:0,behavior:'instant'});
    if (status) status.textContent = `${activeCount} ${activeCount === 1 ? 'projeto' : 'projetos'} — ${category}`;
    if (empty) empty.hidden = activeCount > 0;
    updateControls();
  }));
  previous?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
  const updatePause = () => {
    pause?.setAttribute('aria-label', paused ? 'Retomar carrossel' : 'Pausar carrossel');
    pause?.setAttribute('aria-pressed',String(paused));
    const pauseIcon = pause?.querySelector<HTMLElement>('[data-pause-icon]');
    const playIcon = pause?.querySelector<HTMLElement>('[data-play-icon]');
    if (pauseIcon) pauseIcon.hidden = paused;
    if (playIcon) playIcon.hidden = !paused;
  };
  pause?.addEventListener('click', () => {paused = !paused; updatePause();});
  reducedMotion.addEventListener('change', () => {paused = reducedMotion.matches; updatePause();});
  portfolio.addEventListener('pointerenter', () => {interacting = true;});
  portfolio.addEventListener('pointerleave', () => {interacting = false;});
  track.addEventListener('touchstart', () => {paused = true; updatePause();}, {passive:true});
  track.addEventListener('scrollend', normalize);
  new ResizeObserver(() => {track.scrollTo({left:0,behavior:'instant'});updateControls();}).observe(track);
  new IntersectionObserver(([entry]) => {visible = entry.isIntersecting;}).observe(track);
  setInterval(() => {
    if (visible && !paused && !interacting && !document.hidden && !portfolio.contains(document.activeElement)) move(1);
  },4000);
  updateControls();
  updatePause();
}
