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
| Página de sitelink do WhatsApp | `src/pages/whatsapp.astro` + `src/data/whatsapp-page.ts` |
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
| Carregamento de `/whatsapp` | `ver_pagina_whatsapp` com `servico` — **somente GA4, nenhuma conversão** |

Valores de `data-servico` em uso: `hero`, `esquadrias`, `portoes`, `vidros`, `sacadas`,
`flutuante`, `contato`, `rodape`, `rodape-lista`, `obrigado`, `formulario-falhou`, e os
sete valores de `?servico=` da página `/whatsapp`.
Links sem `data-servico` enviam `servico: 'geral'`.

### Página `/whatsapp` — destino de sitelink

O Google reprova sitelink que aponta para domínio diferente do anúncio, então não dá para
linkar o `wa.me` direto. Esta página fica no próprio domínio e o visitante clica no botão.

**Ela não pode redirecionar sozinha.** Nada de `<meta refresh>`, `window.location` no
carregamento ou 301/302 no servidor: o Google renderiza a página e segue o redirecionamento,
inclusive por JavaScript, e reprovaria pelo mesmo motivo.

**Nenhuma conversão é disparada no carregamento.** O botão é um link `wa.me` e já é
capturado pelo listener global — um disparo próprio faria o mesmo lead contar duas vezes.
Só o evento de GA4 `ver_pagina_whatsapp` sai no load, sem `send_to`.

`?servico=` aceita `pele-de-vidro`, `sacada`, `guarda-corpo`, `esquadrias`, `portoes`, `box`
e `cobertura`. Qualquer outro valor, ou a ausência dele, cai em `geral`. O valor define a
mensagem pré-preenchida, o `data-servico` do botão e o serviço já marcado no formulário.

O `href` do botão já vem pronto do servidor com a mensagem genérica, e o script apenas o
refina — assim o botão funciona mesmo se o JavaScript falhar.

## 2. Pendências antes de subir a campanha

### 2.1 Destino do lead (obrigatório)

> **Republicar o Apps Script:** a versão em `docs/apps-script/Codigo.gs` é mais nova que a
> publicada. Ela traz o relatório `?diagnostico=TOKEN`, devolve a causa real do erro em vez
> de mensagem genérica, e deixou de exigir a cidade — que o formulário curto de `/whatsapp`
> não pergunta. O site contorna isso enviando "Não informado", então **nada quebra sem a
> republicação**; ela só melhora o diagnóstico.

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

### 2.4 NAP — preenchido; prova social — pendente

**NAP preenchido em 20/09/2026** em `nap` (`src/data/site.ts`), a partir do Perfil da Empresa
no Google e da consulta pública do CNPJ na Receita Federal:

| Campo | Valor | Fonte |
| --- | --- | --- |
| Razão social | Bernardo Tecnoglass Esquadrias de Alumínios Indústria e Comércio Ltda. | Receita |
| CNPJ | 65.107.139/0001-84 | cliente / Receita |
| Endereço | Av. Gago Coutinho, 715 - Santa Maria, Santo André - SP, 09070-000 | Perfil no Google |
| Telefone | (11) 91877-0752 | confere nos dois |

**Dois endereços diferentes.** O cadastro na Receita aponta Av. Giovanni Gronchi, 6195,
Vila Andrade, São Paulo/SP, CEP 05724-003 — endereço fiscal. O site publica o de
**atendimento**, que é o do Perfil no Google, porque é esse que precisa bater com o Perfil
para o SEO local. Confirmar com o cliente qual é o endereço onde de fato se atende.

**`mapsUrl` é provisório**: uma busca por nome + endereço. Substituir pelo link curto do
botão "Compartilhar" do Perfil, que aponta para a ficha exata.

**Horário preenchido** em 20/09/2026, informado pelo cliente:

| Dias | Horário | schema.org |
| --- | --- | --- |
| Segunda a sexta | 08:00 – 20:00 | `Mo-Fr 08:00-20:00` |
| Sábado | 09:00 – 13:00 | `Sa 09:00-13:00` |
| Domingo | Fechado | não declarado (dia omitido = fechado) |

Domingo entrou como "Fechado" por dedução — só foram informados segunda a sábado.
**Conferir se bate com o Perfil da Empresa no Google**; horário divergente entre site e
Perfil confunde o visitante e prejudica o SEO local.

#### Prova social — desligada de propósito

Dados reais apurados:

- **Perfil no Google: nota 5,0 com 2 avaliações.** Exibir a contagem com duas avaliações
  enfraquece mais do que ajuda. Vale juntar avaliações antes de ligar o bloco.
- **Abertura da empresa: 12/02/2026.** Não há "anos de mercado" a alegar — publicar tempo
  de casa seria falso.
- **Obras entregues**: número ainda não informado.

A linha pronta está comentada em `socialProof` (`src/data/site.ts`). Enquanto vazio, o bloco
acima da dobra mostra os quatro destaques de serviço.

#### Alerta sobre o Perfil da Empresa no Google

O nome cadastrado é **"Bernardo Tecnoglass - Esquadrias de Alumínio Gold, Suprema |
Envidraçamento de Sacada | Janelas | Box - Alto de Pinheiros, SP"**. Dois problemas:

1. **Excesso de palavras-chave no nome viola as diretrizes do Google** e é causa comum de
   suspensão do Perfil. O campo deve conter apenas o nome real da empresa.
2. **O nome diz "Alto de Pinheiros, SP" e o endereço é Santo André.** Além de contraditório,
   cria inconsistência de NAP, que é exatamente o que derruba ranqueamento local.

O site publica **"Bernardo Tecnoglass"**, o nome real. Recomendação: corrigir o Perfil para
o mesmo nome. Perder o Perfil por suspensão custa mais que qualquer ganho dessas palavras.

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

### 3.5 Página `/whatsapp`

1. Abrir `/whatsapp` — não pode haver redirecionamento nenhum.
2. Tag Assistant: as duas tags reconhecidas, `ver_pagina_whatsapp` disparado no load
   e **nenhuma** conversão.
3. `/whatsapp?servico=sacada` — o botão deve abrir o WhatsApp citando envidraçamento de
   sacada, e o select do formulário já vem marcado.
4. `/whatsapp` sem parâmetro — mensagem genérica.
5. Clicar no botão: o `send_to` de WhatsApp deve aparecer **uma única vez**.
6. Responsividade verificada a 320, 360, 390 e 414px de largura (20/09/2026):

   | Largura | Estouro horizontal | Botão (base/dobra) | Telefone |
   | --- | --- | --- | --- |
   | 320 | não | 381 / 640 | 425 / 640 |
   | 360 | não | 381 / 640 | 425 / 640 |
   | 390 | não | 359 / 640 | 403 / 640 |
   | 414 | não | 359 / 640 | 403 / 640 |

   O botão flutuante fica **desligado** nesta página (`floatingWhatsapp={false}` no
   `Layout`): ele é redundante aqui e, abaixo de 360px, cobria a borda direita dos
   campos do formulário.

### 3.6 Responsivo

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
