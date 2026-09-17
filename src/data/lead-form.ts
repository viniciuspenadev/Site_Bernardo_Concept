// Opções do campo Serviço do formulário de orçamento.
export const leadServices = [
  'Pele de vidro / fachada',
  'Envidraçamento de sacada',
  'Guarda-corpo de vidro',
  'Esquadrias, portas e janelas',
  'Portões',
  'Box para banheiro',
  'Cobertura de vidro',
  'Outro',
] as const;

// Destino do lead: app da web do Google Apps Script ligado à Planilha de leads.
// Configure PUBLIC_LEAD_ENDPOINT (URL terminada em /exec) e PUBLIC_LEAD_TOKEN
// antes de publicar. Sem endpoint o formulário avisa e oferece o WhatsApp.
// Passo a passo em docs/APPS-SCRIPT.md.
export const leadEndpoint = '';
