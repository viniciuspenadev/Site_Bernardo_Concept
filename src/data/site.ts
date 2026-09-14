// Serviços e fotografias informados pelo cliente em 14/09/2026.
export const site = {
  name: 'Bernardo Tecnoglass',
  title: 'Esquadrias e Vidros na Grande São Paulo | Bernardo Tecnoglass',
  description: 'Bernardo Tecnoglass na Grande São Paulo: esquadrias, portões, pele de vidro, box para banheiro, guarda-corpo e envidraçamento e manutenção de sacadas.',
  serviceArea: 'Grande São Paulo',
  whatsapp: '',
  email: '',
  address: '',
  socialLinks: [] as { label: string; href: string }[],
};
export const contactHref = site.whatsapp
  ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`
  : site.email ? `mailto:${site.email}` : '#contato';
export const navigation = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre nós', href: '#diferenciais' },
  { label: 'Soluções', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
];

