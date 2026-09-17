import { leadEndpoint, leadToken } from '../data/lead-form';
import { gclidStorageKey, gclidMaxAgeDays } from '../data/tracking';

const form = document.querySelector<HTMLFormElement>('#form-orcamento');

if (form) {
  // As variáveis de ambiente apenas sobrescrevem o padrão do código, para apontar a
  // um script de teste. `||` e não `??`: variável declarada vazia cai no padrão.
  const endpoint: string = import.meta.env.PUBLIC_LEAD_ENDPOINT || leadEndpoint;
  const token: string = import.meta.env.PUBLIC_LEAD_TOKEN || leadToken;

  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const statusText = form.querySelector<HTMLElement>('[data-status-text]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const defaultLabel = submitLabel?.textContent ?? 'Solicitar orçamento';

  /* ---------- gclid: querystring, com persistência de 90 dias ---------- */

  const readStoredGclid = (): string => {
    try {
      const raw = window.localStorage.getItem(gclidStorageKey);
      if (!raw) return '';
      const parsed = JSON.parse(raw) as { value?: string; expires?: number };
      if (!parsed.value || !parsed.expires || parsed.expires < Date.now()) return '';
      return parsed.value;
    } catch {
      return '';
    }
  };

  const persistGclid = (value: string) => {
    try {
      window.localStorage.setItem(
        gclidStorageKey,
        JSON.stringify({ value, expires: Date.now() + gclidMaxAgeDays * 864e5 }),
      );
    } catch {
      /* armazenamento indisponível: o lead segue sem gclid */
    }
  };

  const params = new URLSearchParams(window.location.search);
  const freshGclid = params.get('gclid') ?? '';
  if (freshGclid) persistGclid(freshGclid);
  const gclid = freshGclid || readStoredGclid();

  let origem = 'direto';
  if (gclid) origem = 'google-ads';
  else if (params.get('utm_source')) origem = params.get('utm_source') as string;
  else if (document.referrer) {
    try {
      origem = new URL(document.referrer).hostname;
    } catch {
      origem = 'direto';
    }
  }

  const fieldOf = (name: string) => form.elements.namedItem(name);

  const setHidden = (name: string, next: string) => {
    const field = fieldOf(name);
    if (field instanceof HTMLInputElement) field.value = next;
  };
  setHidden('gclid', gclid);
  setHidden('origem', origem);
  setHidden('pagina', window.location.href);

  /* ---------- máscara (00) 00000-0000 ---------- */

  const onlyDigits = (input: string) => input.replace(/[^0-9]/g, '');

  const maskPhone = (input: string) => {
    const digits = onlyDigits(input).slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const phone = fieldOf('whatsapp');
  if (phone instanceof HTMLInputElement) {
    phone.addEventListener('input', () => {
      phone.value = maskPhone(phone.value);
    });
  }

  /* ---------- validação com erro ao lado do campo, sem alert() ---------- */

  const valueOf = (name: string) => {
    const field = fieldOf(name);
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
      return field.value.trim();
    }
    return '';
  };

  const isChecked = (name: string) => {
    const field = fieldOf(name);
    return field instanceof HTMLInputElement && field.checked;
  };

  interface Rule {
    field: string;
    valid: () => boolean;
  }

  const rules: Rule[] = [
    { field: 'nome', valid: () => valueOf('nome').length >= 2 },
    {
      field: 'whatsapp',
      valid: () => {
        const digits = onlyDigits(valueOf('whatsapp'));
        return digits.length >= 10 && digits.length <= 11;
      },
    },
    { field: 'servico', valid: () => valueOf('servico') !== '' },
    { field: 'cidade', valid: () => valueOf('cidade').length >= 2 },
    { field: 'consentimento', valid: () => isChecked('consentimento') },
  ];

  const rowOf = (field: string) => form.querySelector<HTMLElement>(`[data-field="${field}"]`);

  const mark = (rule: Rule) => {
    const ok = rule.valid();
    const row = rowOf(rule.field);
    if (row) row.dataset.invalid = ok ? 'false' : 'true';
    const control = fieldOf(rule.field);
    if (control instanceof HTMLElement) control.setAttribute('aria-invalid', ok ? 'false' : 'true');
    return ok;
  };

  let validateLive = false;
  for (const rule of rules) {
    const control = fieldOf(rule.field);
    if (!(control instanceof HTMLElement)) continue;
    const revalidate = () => {
      if (validateLive) mark(rule);
    };
    control.addEventListener('blur', revalidate);
    control.addEventListener('input', revalidate);
    control.addEventListener('change', revalidate);
  }

  /* ---------- envio ---------- */

  const showError = (message: string) => {
    if (statusText) statusText.textContent = message;
    if (status) status.dataset.visible = 'true';
  };

  const setBusy = (busy: boolean) => {
    if (submit) submit.disabled = busy;
    if (submitLabel) submitLabel.textContent = busy ? 'Enviando…' : defaultLabel;
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    validateLive = true;
    if (status) status.dataset.visible = 'false';

    const firstInvalid = rules.map(mark).indexOf(false);
    if (firstInvalid !== -1) {
      const rule = rules[firstInvalid];
      rowOf(rule.field)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      const control = fieldOf(rule.field);
      if (control instanceof HTMLElement) control.focus({ preventScroll: true });
      return;
    }

    // Armadilha de robô: campo escondido que só scripts automáticos preenchem.
    if (valueOf('botcheck')) return;

    if (!endpoint) {
      showError('O envio do formulário ainda não está configurado. Fale com a gente pelo WhatsApp.');
      return;
    }

    setBusy(true);

    const lead = {
      token,
      nome: valueOf('nome'),
      whatsapp: valueOf('whatsapp'),
      servico: valueOf('servico'),
      cidade: valueOf('cidade'),
      detalhes: valueOf('detalhes'),
      consentimento: isChecked('consentimento'),
      origem,
      gclid,
      pagina: window.location.href,
    };

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      // `text/plain` mantém a requisição "simples": o navegador não dispara o
      // preflight OPTIONS, que o Apps Script não sabe responder. O corpo continua
      // sendo JSON e o script lê via e.postData.contents.
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(lead),
        redirect: 'follow',
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // O endpoint pode responder 200 com { success: false } (token errado, cota
      // estourada, campo faltando). Sem esta checagem o site redirecionaria para
      // /obrigado e registraria uma conversão sem que nenhum lead tivesse chegado.
      const payload: unknown = await response.json().catch(() => null);
      if (!payload || typeof payload !== 'object' || (payload as { success?: unknown }).success !== true) {
        throw new Error('endpoint não confirmou a entrega');
      }

      window.location.assign('/obrigado/');
    } catch {
      setBusy(false);
      showError('Não conseguimos enviar seu pedido agora. Tente novamente em instantes ou fale direto com a gente.');
    } finally {
      window.clearTimeout(timeout);
    }
  });
}
