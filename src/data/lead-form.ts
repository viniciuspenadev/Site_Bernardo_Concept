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
// Publicado em 17/09/2026. Passo a passo e republicação em docs/APPS-SCRIPT.md.
//
// A URL e o token ficam aqui, no código, de propósito. O site é estático e a build
// roda dentro do Docker, onde as variáveis de ambiente do Easypanel — que são de
// runtime do contêiner — não chegam. Como os dois valores já viajam em texto claro
// no JavaScript entregue ao navegador de qualquer visitante, guardá-los em variável
// não acrescentaria sigilo nenhum: só criaria uma forma silenciosa de publicar o
// site com o formulário desligado, que foi exatamente o que aconteceu no 1º deploy.
//
// O token não é senha. É um filtro para descartar robôs que descubram a URL do
// script. Se começar a entrar spam, troque nos dois lugares: aqui e no bloco CONFIG
// de docs/apps-script/Codigo.gs (republicando o script como "Nova versão").
//
// Segredo de verdade (senha de SMTP, token da Meta) nunca pode entrar aqui — tem
// que ficar dentro do Apps Script, que roda nos servidores do Google.
export const leadEndpoint = 'https://script.google.com/macros/s/AKfycbwZE8bN_PIV1-uRSJuyUF4dY3_UeM2UU5oTVe_HN7VS3KfgtT_JmrqVSqgpZGglAFVbbg/exec';
export const leadToken = 'uahuahuhu5h4u3fu3n4untu34nf3u4nu34bt3u4funuqwn2';
