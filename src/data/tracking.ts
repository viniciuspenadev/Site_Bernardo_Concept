// Identificadores oficiais informados pelo cliente em 17/09/2026.
// Os rótulos de conversão vêm da conta Google Ads AW-18287438973.
export const googleAds = {
  id: 'AW-18287438973',
  conversions: {
    whatsapp: 'AW-18287438973/il31CLyUs_scEP3YkJBE',
    telefone: 'AW-18287438973/Jz95CL-Us_scEP3YkJBE',
    formulario: 'AW-18287438973/yaiGCMKUs_scEP3YkJBE',
  },
} as const;

// Valor padrão enviado com cada conversão. Ajustar quando houver ticket médio confirmado.
export const conversionValue = { value: 1.0, currency: 'BRL' } as const;

// O gclid é gravado no navegador por 90 dias e enviado junto do lead.
export const gclidStorageKey = 'tg_gclid';
export const gclidMaxAgeDays = 90;
