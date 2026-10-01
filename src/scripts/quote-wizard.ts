import { assistenteNecessidades, assistenteDetalhes, type NecessidadeId } from '../data/sacadas';
import { whatsappLink } from '../data/site';
import { quoteDetails, quoteLines, quoteMessage, type QuoteAnswers } from './quote-message';

const root = document.querySelector<HTMLElement>('[data-wizard]');

if (root) {
  const card = root.closest<HTMLElement>('.lp-wizard') ?? root;
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const count = card.querySelector<HTMLElement>('[data-wizard-count]');
  const bar = root.querySelector<HTMLElement>('[data-wizard-bar]');
  const live = root.querySelector<HTMLElement>('[data-wizard-live]');
  const summary = root.querySelector<HTMLElement>('[data-summary]');
  const whatsapp = root.querySelector<HTMLAnchorElement>('[data-wizard-whatsapp]');
  const localForm = root.querySelector<HTMLFormElement>('[data-local-form]');
  const localInput = root.querySelector<HTMLInputElement>('#wiz-local');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const progress = [0, 25, 55, 85, 100];

  let need: NecessidadeId | null = null;
  let detail = '';
  let current = 1;
  let started = false;

  // Eventos só de GA4 (sem send_to): medem o funil do assistente sem contar
  // conversão. A conversão continua vindo do clique no wa.me ou do /obrigado.
  const track = (name: string, params: Record<string, unknown> = {}) => {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') gtag('event', name, params);
  };

  const needItem = () => assistenteNecessidades.find(item => item.id === need);

  const answers = (): QuoteAnswers | null => {
    const item = needItem();
    if (!item || !detail) return null;
    return { pedido: item.pedido, rotulo: assistenteDetalhes[item.id].rotulo, detalhe: detail, local: localInput?.value ?? '' };
  };

  const stepFor = (n: number) =>
    steps.find(step => Number(step.dataset.step) === n && (n !== 2 || step.dataset.for === need));

  const show = (n: number, moveFocus = true) => {
    current = n;
    const target = stepFor(n);
    steps.forEach(step => { step.hidden = step !== target; });
    if (count) count.textContent = n <= 3 ? `${n}/3` : '✓';
    bar?.style.setProperty('--wizard-progress', `${progress[n]}%`);

    const question = target?.querySelector<HTMLElement>('.lp-wizard-question');
    if (live && question) live.textContent = n <= 3 ? `Passo ${n} de 3: ${question.textContent}` : question.textContent ?? '';
    if (!moveFocus || !question) return;

    // No passo do local, quem usa mouse já cai digitando. No toque, o foco vai para a
    // pergunta, para o teclado virtual não abrir sozinho e cobrir a tela.
    const focusTarget = n === 3 && finePointer.matches && localInput ? localInput : question;
    focusTarget.focus({ preventScroll: true });
    const box = question.getBoundingClientRect();
    if (box.top < 90 || box.bottom > window.innerHeight - 40) {
      question.scrollIntoView({ block: 'center', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  };

  const press = (buttons: NodeListOf<HTMLElement> | HTMLElement[], selected: HTMLElement | null) => {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
  };

  const renderSummary = () => {
    const item = needItem();
    const result = answers();
    if (!item || !result || !summary) return;
    const rows: [string, string][] = [['Serviço', item.titulo], ...quoteLines(result)];
    summary.replaceChildren(...rows.map(([label, value]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.textContent = value;
      row.append(term, description);
      return row;
    }));
    if (whatsapp) whatsapp.href = whatsappLink(quoteMessage(result));
  };

  root.querySelectorAll<HTMLButtonElement>('[data-need]').forEach(button => {
    button.addEventListener('click', () => {
      const chosen = button.dataset.need as NecessidadeId;
      if (chosen !== need) {
        detail = '';
        root.querySelectorAll<HTMLElement>('[data-detail]').forEach(chip => chip.setAttribute('aria-pressed', 'false'));
      }
      need = chosen;
      press(root.querySelectorAll<HTMLElement>('[data-need]'), button);
      if (!started) {
        started = true;
        track('orcamento_guiado_inicio');
      }
      track('orcamento_guiado_passo', { passo: 1, resposta: chosen });
      show(2);
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-detail]').forEach(button => {
    button.addEventListener('click', () => {
      detail = button.dataset.detail ?? '';
      const group = button.closest<HTMLElement>('[data-step]');
      if (group) press(group.querySelectorAll<HTMLElement>('[data-detail]'), button);
      track('orcamento_guiado_passo', { passo: 2, resposta: detail });
      show(3);
    });
  });

  localForm?.addEventListener('submit', event => {
    event.preventDefault();
    renderSummary();
    track('orcamento_guiado_passo', { passo: 3, informou_local: Boolean(localInput?.value.trim()) });
    track('orcamento_guiado_resumo', { servico: need });
    show(4);
  });

  root.querySelectorAll<HTMLButtonElement>('[data-back]').forEach(button => {
    button.addEventListener('click', () => show(Math.max(1, current - 1)));
  });

  root.querySelector<HTMLButtonElement>('[data-restart]')?.addEventListener('click', () => {
    need = null;
    detail = '';
    if (localInput) localInput.value = '';
    root.querySelectorAll<HTMLElement>('[aria-pressed]').forEach(button => button.setAttribute('aria-pressed', 'false'));
    show(1);
  });

  // "Prefiro deixar meu contato": leva as respostas para o formulário do fim da
  // página. O envio segue o fluxo normal do lead-form.ts (planilha + /obrigado).
  root.querySelector<HTMLButtonElement>('[data-wizard-form]')?.addEventListener('click', () => {
    const item = needItem();
    const result = answers();
    const form = document.querySelector<HTMLFormElement>('#form-orcamento');
    if (!form || !item || !result) return;

    const service = form.querySelector<HTMLSelectElement>('#lead-servico');
    if (service && Array.from(service.options).some(option => option.value === item.servico)) service.value = item.servico;
    const city = form.querySelector<HTMLInputElement>('#lead-cidade');
    if (city && result.local.trim()) city.value = result.local.trim();
    const details = form.querySelector<HTMLTextAreaElement>('#lead-detalhes');
    if (details) details.value = quoteDetails(result);

    track('orcamento_guiado_formulario', { servico: need });
    form.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    form.querySelector<HTMLInputElement>('#lead-nome')?.focus({ preventScroll: true });
  });

  show(1, false);
}
