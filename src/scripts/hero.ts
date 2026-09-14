const hero = document.querySelector<HTMLElement>('#inicio');
if (hero) {
  const slides = Array.from(hero.querySelectorAll<HTMLElement>('[data-slide]'));
  const number = hero.querySelector<HTMLElement>('[data-slide-number]');
  const progress = hero.querySelector<HTMLElement>('[data-slide-progress]');
  const pauseButton = hero.querySelector<HTMLButtonElement>('[data-slide-pause]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = reducedMotion.matches;
  let hovering = false;
  let focused = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let animation: Animation | undefined;
  const duration = 7000;

  function schedule() {
    clearTimeout(timer);
    animation?.cancel();
    if (paused || hovering || focused || document.hidden || slides.length < 2) return;
    animation = progress?.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration, fill: 'forwards' });
    timer = setTimeout(() => show(current + 1), duration);
  }
  function show(next: number) {
    current = (next + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const active = index === current;
      slide.dataset.active = String(active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    if (number) number.textContent = String(current + 1).padStart(2, '0');
    schedule();
  }
  function updatePause() {
    pauseButton?.setAttribute('aria-pressed', String(paused));
    pauseButton?.setAttribute('aria-label', paused ? 'Retomar slides' : 'Pausar slides');
    const pauseIcon = hero?.querySelector<HTMLElement>('[data-pause-icon]');
    const playIcon = hero?.querySelector<HTMLElement>('[data-play-icon]');
    if (pauseIcon) pauseIcon.hidden = paused;
    if (playIcon) playIcon.hidden = !paused;
    schedule();
  }
  hero.querySelector('[data-slide-prev]')?.addEventListener('click', () => show(current - 1));
  hero.querySelector('[data-slide-next]')?.addEventListener('click', () => show(current + 1));
  pauseButton?.addEventListener('click', () => { paused = !paused; updatePause(); });
  hero.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  hero.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  hero.addEventListener('focusin', () => { focused = true; schedule(); });
  hero.addEventListener('focusout', event => {
    focused = event.relatedTarget instanceof Node && hero.contains(event.relatedTarget);
    schedule();
  });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updatePause(); });
  document.addEventListener('visibilitychange', schedule);
  updatePause();
}
