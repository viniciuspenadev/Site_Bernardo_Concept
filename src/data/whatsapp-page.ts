// Página /whatsapp: destino de sitelink do Google Ads.
//
// O Google reprova sitelink que aponta para domínio diferente do anúncio, então
// não dá para linkar direto o wa.me. Esta página fica no próprio domínio e o
// visitante clica no botão. NÃO pode redirecionar sozinho: o Google renderiza a
// página e segue redirecionamento, inclusive por JavaScript, e reprovaria igual.

/** Valores aceitos em ?servico= e o nome usado na mensagem do WhatsApp. */
export const servicosWhatsapp = {
  'pele-de-vidro': 'pele de vidro / fachada',
  'sacada': 'envidraçamento de sacada',
  'guarda-corpo': 'guarda-corpo de vidro',
  'esquadrias': 'esquadrias, portas e janelas',
  'portoes': 'portões',
  'box': 'box para banheiro',
  'cobertura': 'cobertura de vidro',
} as const;

export type ServicoWhatsapp = keyof typeof servicosWhatsapp;

/** Mensagem pré-preenchida. Sem serviço reconhecido, cai no texto genérico. */
export const mensagemWhatsapp = (nome?: string) =>
  nome
    ? `Olá! Vim pelo site e gostaria de um orçamento de ${nome}.`
    : 'Olá! Vim pelo site e gostaria de um orçamento.';
