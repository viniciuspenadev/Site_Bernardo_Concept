const hero = document.querySelector<HTMLElement>('#inicio');
if (hero) {
  const slides = Array.from(hero.querySelectorAll<HTMLElement>('[data-slide]'));
  const number = hero.querySelector<HTMLElement>('[data-slide-number]');
  const progress = hero.querySelector<HTMLElement>('[data-slide-progress]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  // O autoplay só para por preferência de movimento reduzido ou enquanto o
  // teclado está dentro do hero. O ponteiro do mouse não interrompe mais:
  // o hero ocupa a tela inteira e o cursor ficava sempre sobre ele.
  let paused = reducedMotion.matches;
  let focused = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let animation: Animation | undefined;
  const duration = 7000;

  function schedule() {
    clearTimeout(timer);
    animation?.cancel();
    if (paused || focused || document.hidden || slides.length < 2) return;
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
  hero.querySelector('[data-slide-prev]')?.addEventListener('click', () => show(current - 1));
  hero.querySelector('[data-slide-next]')?.addEventListener('click', () => show(current + 1));
  hero.addEventListener('focusin', () => { focused = true; schedule(); });
  hero.addEventListener('focusout', event => {
    focused = event.relatedTarget instanceof Node && hero.contains(event.relatedTarget);
    schedule();
  });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  schedule();
}
