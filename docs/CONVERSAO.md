# Conversão e rastreamento — Google Ads

Este documento cobre a camada de contato e conversão do site: o que já está implementado,
o que precisa ser configurado antes de subir a campanha e como validar cada item.

## 1. O que já está no código

| Item | Onde |
| --- | --- |
| Tag do Google (`AW-18287438973` + GA4 `G-RPBMP9ELX7`) como primeiro elemento do `<head>` | `src/components/GoogleTag.astro`, injetado por `src/layouts/Layout.astro` |
| IDs e rótulos de conversão | `src/data/tracking.ts` |
| Botão flutuante de WhatsApp | `src/components/WhatsAppFloat.astro` + `.wa-float` em `src/styles/global.css` |
| CTAs de WhatsApp por serviço | `src/components/WhatsAppCta.astro`, usados em `Hero.astro` e `Services.astro` |
| Mensagens pré-preenchidas por serviço | `src/data/content.ts` (`whatsappMessage`, `heroWhatsappMessage`) |
| Telefone no cabeçalho (desktop e mobile) | `src/components/Navbar.astro` |
| Formulário de orçamento | `src/components/LeadForm.astro` + `src/scripts/lead-form.ts` |
| Recebimento do lead (Planilha + e-mail) | `docs/apps-script/Codigo.gs`, publicado como app da web |
| Página de obrigado | `src/pages/obrigado.astro` |
| Listener único de conversão, no fim do `<body>` | `src/components/ConversionEvents.astro` |
| NAP e JSON-LD `LocalBusiness` | `src/data/site.ts` (`nap`) e `src/data/seo.ts` |

Número oficial usado em todos os pontos: **+55 11 91877-0752** (`wa.me/5511918770752`, `tel:+5511918770752`),
definido uma única vez em `src/data/site.ts`.

### Eventos disparados

| Gatilho | Eventos |
| --- | --- |
| Clique em link com `wa.me` ou `api.whatsapp.com` | `conversion` (`AW-18287438973/il31CLyUs_scEP3YkJBE`, value 1.0 BRL) + `contato_whatsapp` com `servico` |
| Clique em link `tel:` | `conversion` (`AW-18287438973/Jz95CL-Us_scEP3YkJBE`, value 1.0 BRL) + `contato_telefone` |
| Carregamento de `/obrigado` | `conversion` (`AW-18287438973/yaiGCMKUs_scEP3YkJBE`, value 1.0 BRL) + `solicitar_cotacao` |

Valores de `data-servico` em uso: `hero`, `esquadrias`, `portoes`, `vidros`, `sacadas`,
`flutuante`, `contato`, `rodape`, `obrigado`, `formulario-falhou`.
Links sem `data-servico` enviam `servico: 'geral'`.

## 2. Pendências antes de subir a campanha

### 2.1 Destino do lead (obrigatório)

O formulário envia cada lead para um **app da web do Google Apps Script** ligado a uma
Planilha Google: o lead vira uma linha na planilha e um e-mail sai na hora. Nenhum serviço
de terceiros é contratado — usa a conta Google da própria campanha.

Passo a passo completo em [APPS-SCRIPT.md](APPS-SCRIPT.md). Resumo:

1. Criar a planilha e colar `docs/apps-script/Codigo.gs` em **Extensões → Apps Script**.
2. Preencher `EMAIL_DESTINO` e `TOKEN` no bloco `CONFIG` do script.
3. Publicar como **App da Web**, executando como você, acessível a **Qualquer pessoa**.
4. Ajustar `leadEndpoint` e `leadToken` em `src/data/lead-form.ts` (no código, não em
   variável de ambiente: a build roda dentro do Docker e não enxerga variável do Easypanel).
5. `npm run build`.

Enquanto `PUBLIC_LEAD_ENDPOINT` estiver vazio, o formulário valida normalmente mas avisa
"O envio do formulário ainda não está configurado" e oferece o WhatsApp — nenhum visitante
fica sem caminho de contato.

### 2.2 Entrega no WhatsApp da equipe

O e-mail do Apps Script traz um botão **Responder no WhatsApp** que abre a conversa com o
número do visitante já preenchida. Na prática isso cobre o atendimento: o aviso chega por
e-mail (celular incluso) e a resposta sai pelo WhatsApp em um toque.

Se quiser que a mensagem chegue direto num número de WhatsApp, sem passar pelo e-mail,
é preciso a WhatsApp Cloud API com um provedor (Twilio, 360dialog) chamada de dentro do
Apps Script com `UrlFetchApp` — o token fica no script, no servidor do Google, nunca no
navegador. Isso ainda não foi implementado.

### 2.3 GA4 — instalado

Propriedade **G-RPBMP9ELX7**, ligada em 20/09/2026 (`ga4Id` em `src/data/tracking.ts`).
Um único carregamento de `gtag.js` atende as duas contas: Ads e GA4 entram como dois
`config`. Para desligar o GA4 sem mexer em mais nada, basta esvaziar `ga4Id`.

Os eventos `contato_whatsapp`, `contato_telefone` e `solicitar_cotacao` são disparados
**sem** `send_to`, então chegam também ao GA4 automaticamente, junto do `page_view`.
As conversões (`conversion`) levam `send_to` apontando para os rótulos do Ads e não
aparecem no GA4 — é o comportamento correto, para não duplicar métrica.

### 2.4 NAP e prova social (dados do cliente)

Ambos estão implementados mas **vazios**, porque dependem de informação que só o cliente tem.
Nada fictício foi publicado.

- `nap` em `src/data/site.ts`: razão social, CNPJ, endereço, CEP e horário. Enquanto vazio,
  o bloco de endereço do rodapé e o `address` do JSON-LD simplesmente não são renderizados.
- `socialProof` em `src/data/site.ts`: anos de mercado, obras entregues e avaliação no Google.
  Há três linhas de exemplo comentadas. Assim que preenchido, o bloco acima da dobra troca
  automaticamente os quatro destaques de serviço pela prova social.

A nota e a quantidade de avaliações devem sair do Perfil da Empresa no Google real —
publicar número estimado é publicidade enganosa e pode custar a conta de anúncios.

### 2.5 Fotos reais de obras entregues

Os selos "Imagem ilustrativa" e "Foto aprimorada" foram **removidos do site a pedido do cliente**
(17/09/2026), junto com os textos alternativos e legendas que indicavam origem gerada. As imagens
atuais continuam sendo as geradas/aprimoradas descritas em `docs/HERO-IMAGENS.md`,
`docs/PORTFOLIO-IMAGENS.md` e `docs/PELE-VIDRO-BOX.md` — esses documentos foram preservados como
registro interno de proveniência.

Com os selos fora, **substituir as imagens por fotos reais de obras entregues virou prioridade**:
até a troca, o site apresenta material gerado sem qualquer ressalva, em tráfego pago. A troca é
direta: basta substituir o arquivo importado e atualizar o `alt`.

- `src/data/service-photos.ts` — fotos da seção SOLUÇÕES.
- `src/data/projects.ts` — cartões do carrossel de projetos.
- `src/data/media.ts` — hero (versões desktop e mobile de cada slide).

Arquivos novos vão em `src/assets/tecnoglass/`. O Astro gera WebP e versões responsivas
automaticamente — basta subir o original em boa resolução (JPG ou PNG).

## 3. Como validar

### 3.1 Tag do Google

1. `npm run build && npm run preview` (ou o site publicado).
2. Abra <https://tagassistant.google.com>, conecte ao domínio.
3. Esperado: as tags `AW-18287438973` **e** `G-RPBMP9ELX7` detectadas em `/` e em `/obrigado`.
4. No console do navegador, `typeof window.gtag` deve retornar `"function"` nas duas páginas.
5. No GA4, **Relatórios → Tempo real** deve registrar a visita em até 30 segundos.

### 3.2 Cliques de WhatsApp e telefone

Com o Tag Assistant conectado, clique no botão flutuante, num CTA de serviço e no telefone do
cabeçalho. Devem aparecer, em sequência, `conversion` e `contato_whatsapp` / `contato_telefone`.
Confira o parâmetro `servico` de cada CTA.

### 3.3 Formulário ponta a ponta

1. Abra `/?gclid=TESTE_MANUAL_123`.
2. Em `#contato`, envie o formulário com dados de teste.
3. Esperado: redirecionamento para `/obrigado/`, conversão de formulário no Tag Assistant,
   e-mail recebido em menos de 1 minuto e campo `gclid` com `TESTE_MANUAL_123` no e-mail.
4. Volte ao site por uma URL sem `gclid` e envie outro teste: o `gclid` deve continuar
   preenchido (fica 90 dias em `localStorage`, chave `tg_gclid`).

### 3.4 Validação e falha de rede

- Enviar o formulário vazio deve marcar os campos em vermelho com mensagem ao lado de cada um,
  sem nenhum `alert()`, e focar o primeiro campo inválido.
- Simule falha (DevTools → Network → Offline) e envie: deve aparecer a mensagem de erro com
  o link "Falar no WhatsApp agora".

### 3.5 Responsivo

Botão flutuante: 60px no desktop, 56px no mobile, sempre no canto inferior direito, acima de
todas as seções (`z-index: 90`). No mobile o telefone aparece como ícone no cabeçalho fixo.

## 4. Observações

- A seção SOLUÇÕES tem **quatro** blocos (esquadrias, portões, vidros e sacadas), não três.
  Todos receberam CTA próprio, com `data-servico` igual ao id do bloco.
- O verde `#25D366` é usado apenas no botão flutuante. Os demais CTAs de WhatsApp seguem a
  paleta do site (azul `#0a3560` sobre fundo claro, pílula branca sobre fundo escuro).
- O carrossel do hero avança sozinho a cada 7s. O botão de pausa foi removido e o ponteiro do
  mouse não interrompe mais o autoplay; o avanço ainda para quando o teclado está dentro do
  hero, quando a aba fica oculta e sob `prefers-reduced-motion`.
- O site já entregava WebP e `loading="lazy"` fora da primeira dobra pelo pipeline de imagens
  do Astro (`Photo.astro` / `HeroPhoto.astro`). Só a primeira imagem do hero é `eager`.
- `/obrigado` tem `noindex, nofollow` na meta, mas **não** está bloqueada no `robots.txt` —
  bloquear no robots impediria o Google de ler a meta.
