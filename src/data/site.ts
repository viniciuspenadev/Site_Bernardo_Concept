// Serviços e fotografias informados pelo cliente em 14/09/2026.
// WhatsApp e telefone oficiais informados em 17/09/2026.
export const site = {
  name: 'Bernardo Tecnoglass',
  title: 'Esquadrias e Vidros na Grande São Paulo | Bernardo Tecnoglass',
  description: 'Bernardo Tecnoglass na Grande São Paulo: esquadrias, portões, pele de vidro, box para banheiro, guarda-corpo e envidraçamento e manutenção de sacadas.',
  serviceArea: 'Grande São Paulo',
  // Número único de atendimento: usado no WhatsApp, no telefone do cabeçalho e no rodapé.
  whatsapp: '5511918770752',
  phoneDisplay: '(11) 91877-0752',
  email: '',
  socialLinks: [] as { label: string; href: string }[],
};

// ---------------------------------------------------------------------------
// NAP: os dados de identificação da empresa, usados no rodapé e no JSON-LD.
//
// COPIE DO PERFIL DA EMPRESA NO GOOGLE (google.com/business), para que o que
// está no site seja exatamente igual ao que está no Google. NAP divergente entre
// site e Perfil prejudica o ranqueamento local — mesma grafia, mesma abreviação,
// mesmo formato de telefone.
//
// O CNPJ e a razão social NÃO vêm do Google: saem do contrato social.
//
// Campo vazio simplesmente não é renderizado. Não preencher com estimativa:
// endereço ou horário errado gera visita perdida e reclamação.
// ---------------------------------------------------------------------------
export const nap = {
  // Razão social e CNPJ conforme o cadastro da Receita Federal (consulta em 20/09/2026).
  legalName: 'Bernardo Tecnoglass Esquadrias de Alumínios Indústria e Comércio Ltda.',
  taxId: '65.107.139/0001-84',

  // Endereço de ATENDIMENTO, copiado do Perfil da Empresa no Google.
  // O endereço fiscal na Receita é outro (Av. Giovanni Gronchi, 6195, Vila Andrade,
  // São Paulo/SP) — no site vale o de atendimento, que é o que precisa bater com o
  // Perfil para o SEO local. Ver docs/CONVERSAO.md antes de trocar.
  street: 'Av. Gago Coutinho, 715',
  district: 'Santa Maria',
  city: 'Santo André',
  state: 'SP',
  postalCode: '09070-000',

  // Busca pelo nome + endereço. Substituir pelo link curto do botão "Compartilhar"
  // do Perfil da Empresa quando disponível: ele aponta para a ficha exata.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bernardo+Tecnoglass+Av.+Gago+Coutinho+715+Santo+Andr%C3%A9+SP',
  reviewsUrl: '',
};

/**
 * Horário exibido no rodapé, informado pelo cliente em 20/09/2026.
 * Domingo entra como "Fechado" por dedução: só foram informados segunda a sábado.
 * Precisa bater com o Perfil da Empresa no Google — horário divergente entre site e
 * Perfil confunde o visitante e prejudica o SEO local.
 */
export const openingHours: { days: string; time: string }[] = [
  { days: 'Seg. a sex.', time: '08:00 – 20:00' },
  { days: 'Sábado', time: '09:00 – 13:00' },
  { days: 'Domingo', time: 'Fechado' },
];

/**
 * O mesmo horário no formato do schema.org, para o JSON-LD.
 * Escrito à mão de propósito: converter o texto acima automaticamente daria
 * margem a dado estruturado errado, que o Google usa sem o visitante conferir.
 * Dias não declarados significam fechado, então domingo não aparece aqui.
 * Dias: Mo Tu We Th Fr Sa Su. Ex.: 'Mo-Fr 08:00-18:00'
 */
export const openingHoursSchema: string[] = [
  'Mo-Fr 08:00-20:00',
  'Sa 09:00-13:00',
];

/** Endereço em uma linha, para o rodapé. */
export const addressLine = [
  [nap.street, nap.district].filter(Boolean).join(' - '),
  [[nap.city, nap.state].filter(Boolean).join(' - '), nap.postalCode].filter(Boolean).join(', '),
].filter(Boolean).join(', ');

// Prova social acima da dobra. Vazio = o bloco mostra os quatro destaques de serviço.
//
// Dados reais apurados em 20/09/2026:
//   • Perfil da Empresa no Google: nota 5,0 com 2 avaliações.
//   • Abertura da empresa na Receita: 12/02/2026 — ou seja, não há "anos de mercado"
//     a alegar. Publicar tempo de casa aqui seria falso.
//   • Obras entregues: número ainda não informado pelo cliente.
//
// Por isso segue desligado: com 2 avaliações, exibir a contagem enfraquece mais do que
// ajuda. Vale juntar avaliações primeiro e só então descomentar a linha abaixo.
// Nunca publicar número estimado: propaganda enganosa custa a conta de anúncios.
export const socialProof: { value: string; label: string; icon: 'sparkles' | 'layers' | 'star'; href?: string }[] = [
  // { value: '5,0 ★', label: '2 avaliações no Google', icon: 'star', href: nap.reviewsUrl || nap.mapsUrl },
  // { value: '+000', label: 'obras entregues', icon: 'layers' },
];

export const whatsappDigits = site.whatsapp.replace(/\D/g, '');
export const telHref = `tel:+${whatsappDigits}`;
export const whatsappBase = `https://wa.me/${whatsappDigits}`;

/** Monta o link do WhatsApp com a mensagem já preenchida. */
export const whatsappLink = (message: string) => `${whatsappBase}?text=${encodeURIComponent(message)}`;

export const contactHref = whatsappBase;

export const navigation = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre nós', href: '#diferenciais' },
  { label: 'Soluções', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
];
