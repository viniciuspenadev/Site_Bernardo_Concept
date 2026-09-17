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

// NAP do rodapé e do schema.org/LocalBusiness.
// Campos vazios não são renderizados: preencher com os dados do contrato social.
// Não publicar CNPJ, razão social ou endereço sem confirmação documental do cliente.
export const nap = {
  legalName: '',      // Razão social exata, ex.: 'Bernardo Tecnoglass Vidros e Esquadrias Ltda.'
  taxId: '',          // CNPJ formatado, ex.: '00.000.000/0001-00'
  street: '',         // Logradouro e número
  district: '',       // Bairro
  city: '',           // Município
  state: '',          // UF
  postalCode: '',     // CEP
  openingHours: '',   // Ex.: 'Segunda a sexta, 8h às 18h · Sábado, 8h às 12h'
};

export const napLines = [
  nap.legalName,
  nap.taxId ? `CNPJ ${nap.taxId}` : '',
  [nap.street, nap.district].filter(Boolean).join(' — '),
  [[nap.city, nap.state].filter(Boolean).join('/'), nap.postalCode].filter(Boolean).join(' · '),
  nap.openingHours,
].filter(Boolean);

// Prova social acima da dobra. Vazio enquanto os números não forem confirmados:
// anos de mercado, obras entregues e nota/quantidade de avaliações no Perfil da Empresa no Google.
// Publicar números não verificados configura publicidade enganosa — preencher só com dados reais.
export const socialProof: { value: string; label: string; icon: 'sparkles' | 'layers' | 'star'; href?: string }[] = [
  // { value: '15 anos', label: 'de mercado na Grande São Paulo', icon: 'sparkles' },
  // { value: '+1.200', label: 'obras entregues', icon: 'layers' },
  // { value: '4,9 ★', label: '128 avaliações no Google', icon: 'star', href: 'https://g.page/r/SEU-ID' },
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
