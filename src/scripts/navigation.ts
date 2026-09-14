const header = document.querySelector<HTMLElement>('#site-header');
const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
const openButton = document.querySelector<HTMLButtonElement>('#menu-open');
const closeButton = document.querySelector<HTMLButtonElement>('#menu-close');

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 50);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (menu && openButton && closeButton) {
  const closeMenu = () => menu.close();
  openButton.addEventListener('click', () => {
    menu.showModal();
    openButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-is-open');
  });
  closeButton.addEventListener('click', closeMenu);
  menu.addEventListener('close', () => {
    openButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-is-open');
  });
  menu.querySelectorAll<HTMLAnchorElement>('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  const desktop = window.matchMedia('(min-width: 1024px)');
  desktop.addEventListener('change', () => { if (desktop.matches && menu.open) closeMenu(); });
}
