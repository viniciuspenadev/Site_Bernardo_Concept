// Formulário do Kora no topo da página de sacadas (Kora → Formulários → aba Publicar →
// "Na página do site"). O Kora grava o pedido e chama a pessoa no WhatsApp.
// `formSacadas` vazio = o topo volta ao orçamento guiado antigo (QuoteWizard), sem mexer em mais nada.
// Para uma build de teste, PUBLIC_KORA_URL e PUBLIC_KORA_FORM_SACADAS sobrescrevem (build args).
export const kora = {
  url: import.meta.env.PUBLIC_KORA_URL || 'https://kora.bluedigitalhub.com.br',
  // "Orçamento guiado" da Bernardo no Kora (publicado em 05/10/2026; site autorizado: bernardotecnoglass.com.br).
  formSacadas: import.meta.env.PUBLIC_KORA_FORM_SACADAS || '87e93tki86xzmrebiv8k',
} as const;
