import { storyProgress, messageOpacity, filmTime } from './balcony-timeline';

const story = document.querySelector<HTMLElement>('[data-balcony-story]');
const screen = story?.querySelector<HTMLElement>('[data-balcony-screen]');
const film = story?.querySelector<HTMLVideoElement>('[data-balcony-film]');
if (story && screen && film) {
  const messages = Array.from(story.querySelectorAll<HTMLElement>('[data-balcony-message]'));
  const bar = story.querySelector<HTMLElement>('[data-balcony-progress]')!;
  const instruction = story.querySelector<HTMLElement>('[data-balcony-instruction]')!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = false;
  let loaded = false;
  let failed = false;
  let frame = 0;
  let progress = 0;
  let targetTime = 0;

  // Complete the pending decode before seeking to the latest scroll target.
  function seek() {
    if (failed || motion.matches || film!.readyState < 2 || film!.seeking || !Number.isFinite(film!.duration)) return;
    if (Math.abs(film!.currentTime - targetTime) > 1 / 48) film!.currentTime = targetTime;
  }
  function render() {
    frame = 0;
    const enabled = !motion.matches && !failed;
    const bounds = story!.getBoundingClientRect();
    progress = enabled ? storyProgress(bounds.top, bounds.height, screen!.offsetHeight) : 0;
    story!.dataset.progress = String(Math.round(progress * 100));
    messages.forEach((message, index) => {
      const opacity = messageOpacity(progress, index);
      message.style.opacity = String(opacity);
      message.style.transform = enabled ? `translateY(${(1 - opacity) * 18}px)` : 'none';
      message.setAttribute('aria-hidden', String(opacity < .1));
      message.inert = opacity < .1;
    });
    bar.style.transform = `scaleX(${progress})`;
    if (Number.isFinite(film!.duration)) {
      targetTime = filmTime(progress, film!.duration);
      seek();
    }
  }
  function queue() { if (!frame) frame = requestAnimationFrame(render); }
  function configure() {
    story!.dataset.enhanced = String(!motion.matches && !failed);
    instruction.textContent = motion.matches || failed ? 'Envidraçamento de sacadas na Grande São Paulo.' : 'Role para abrir e descobrir a vista ↓';
    if (motion.matches) film!.pause();
    queue();
  }
  function loadFilm() {
    if (loaded || motion.matches || failed) return;
    loaded = true;
    film!.src = film!.dataset.src!;
    film!.preload = 'auto';
    film!.load();
  }
  function fallback() { failed = true; configure(); }
  film.addEventListener('error', fallback);
  film.addEventListener('loadedmetadata', queue);
  film.addEventListener('loadeddata', queue);
  film.addEventListener('seeked', seek);
  film.addEventListener('canplay', seek);
  new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    if (active) { loadFilm(); queue(); }
  }, {rootMargin: '100% 0px'}).observe(story);
  window.addEventListener('scroll', () => { if (active) queue(); }, {passive: true});
  window.addEventListener('resize', queue, {passive: true});
  motion.addEventListener('change', () => { configure(); if (active) loadFilm(); });
  configure();
}
