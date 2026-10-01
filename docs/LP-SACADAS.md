# Landing page de envidraçamento de sacadas — 01/10/2026

Página: `/envidracamento-de-sacadas/`. É o destino dos anúncios de sacada e, ao mesmo tempo,
a página de serviço "Sacadas" proposta em [SEO-GEO.md](SEO-GEO.md).

## Estrutura

Cada seção tem um papel no caminho até o contato. O visitante pode converter em qualquer
ponto, mas nunca é obrigado a passar por todos.

| Seção | Âncora | Papel |
| --- | --- | --- |
| Topo | — | H1 com serviço e região, igual à busca e ao anúncio. Três compromissos que o site já publica, WhatsApp e telefone. |
| Orçamento guiado | `#orcamento-guiado` | Três perguntas, resumo e envio pelo WhatsApp com a mensagem pronta, ou formulário já preenchido. Fica ao lado do texto no desktop e logo abaixo no celular. |
| Obras entregues | `#obras` | Carrossel de rolagem contínua com fotos reais, o mesmo da home (`CarrosselContinuo`): abas de filtro, cartões `ProjectCard`, largura total com degradê nas pontas e uma seta em cada extremidade. Cada foto abre a galeria ampliada, com o botão "Quero uma assim", que cita a obra na mensagem do WhatsApp. |
| Demonstração | `#demonstracao` | O vídeo da home, agora controlado pelo visitante: arrastar a cena, o controle ou o botão abre e fecha a sacada. Não prende a rolagem. |
| Como funciona | `#como-funciona` | Quatro etapas e o aviso sobre o padrão do condomínio, a dúvida mais comum. |
| Manutenção e acústica | `#manutencao` | Os outros dois serviços de sacada, cada um com a sua mensagem de WhatsApp. |
| Empresa | `#empresa` | Confiança por dados verificáveis: endereço, horário, telefone e CNPJ. Depoimentos aparecem quando forem preenchidos. |
| Dúvidas | `#duvidas` | Nove objeções respondidas. O mesmo texto vai para o JSON-LD `FAQPage`. |
| Orçamento | `#orcamento` | WhatsApp, telefone e o formulário da home com o serviço já marcado. |

O cabeçalho é enxuto: âncoras da própria página, telefone e o botão de orçamento, sem o menu
da home. O botão flutuante fica desligado; no celular, uma barra fixa com WhatsApp e telefone
aparece depois do topo e some ao chegar no formulário, para não cobrir os campos.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Todos os textos, perguntas do assistente e dúvidas | `src/data/sacadas.ts` |
| Fotos das obras | `src/assets/tecnoglass/sacadas/obras/` |
| Ordem, legendas e etiquetas das obras | `src/data/sacadas-obras.ts` |
| Seções | `src/components/sacadas/` |
| Estilos (classes `lp-`) | `src/styles/sacadas.css` |
| Assistente | `src/scripts/quote-wizard.ts` e `src/scripts/quote-message.ts` |
| Demonstração | `src/scripts/balcony-slider.ts` |
| Carrossel (o mesmo da home) | `src/components/CarrosselContinuo.astro`, `src/scripts/carrossel-continuo.ts` e `.carrossel` em `src/styles/global.css` |
| Galeria das obras | `src/scripts/obras-lightbox.ts` |
| JSON-LD `Service` + `FAQPage` | `sacadasStructuredData` em `src/data/seo.ts` |
| Página | `src/pages/envidracamento-de-sacadas.astro` |

A home aponta para a página em três lugares: Soluções (bloco de sacadas), o botão final do
vídeo da sacada e a lista de soluções do rodapé. O sitemap lista a página quando a indexação
estiver liberada.

## Rastreamento

Nada novo foi instalado: os links usam o listener único de `ConversionEvents.astro`.

| `data-servico` | Onde |
| --- | --- |
| `sacadas-cabecalho` | Botão do cabeçalho (desktop) |
| `sacadas-topo` | Botão principal do topo |
| `sacadas-guiado` | Resumo do orçamento guiado (e a alternativa sem JavaScript) |
| `sacadas-obras` | "Pedir orçamento" junto do portfólio |
| `sacadas-obra` | "Quero uma assim" na galeria, com o nome da obra na mensagem |
| `sacadas-demonstracao` | "Quero na minha sacada" |
| `sacadas-processo` | "Começar pelo WhatsApp" |
| `sacadas-manutencao` | "Agendar manutenção" |
| `sacadas-acustica` | "Falar sobre acústica" |
| `sacadas-duvidas` | "Tirar dúvida no WhatsApp" |
| `sacadas-final` | Seção de orçamento |
| `sacadas-barra` | Barra fixa do celular |

Clique em WhatsApp ou telefone registra a conversão do Google Ads como no resto do site. O
formulário leva ao `/obrigado`, que registra a conversão de formulário; na planilha, a coluna
Página identifica que o lead veio daqui.

Eventos só de GA4, sem conversão, para medir o funil do assistente:

| Evento | Parâmetros |
| --- | --- |
| `orcamento_guiado_inicio` | — |
| `orcamento_guiado_passo` | `passo` (1, 2 ou 3), `resposta` ou `informou_local` |
| `orcamento_guiado_resumo` | `servico` |
| `orcamento_guiado_formulario` | `servico` |
| `demo_sacada_interacao` | — |
| `obra_sacada_abrir` | `obra` (nome do arquivo da foto) |

Sugestão: uma exploração de funil no GA4 com início → resumo → `contato_whatsapp` com
`servico = sacadas-guiado`. O `obra_sacada_abrir` mostra quais fotos mais atraem atenção:
boas candidatas ao início do carrossel.

## Regras de conteúdo

Seguem as do resto do site: sem preço, prazo, garantia, número de obras ou avaliações, porque
nada disso foi informado. Os compromissos do topo ("orçamento sem compromisso", "medição no
local", "resposta em até 1 hora útil") já estavam publicados no rodapé, no `/obrigado` e no
`/whatsapp`.

**CONFIRMAR com o cliente antes de subir a campanha.** Os itens abaixo descrevem o sistema
retrátil, o mais comum em envidraçamento de sacadas, e estão marcados com `CONFIRMAR` em
`src/data/sacadas.ts`:

1. Folhas que se recolhem nas laterais (demonstração e dúvidas).
2. Folhas que giram para facilitar a limpeza (demonstração e dúvidas).
3. Abertura parcial (demonstração e dúvidas).
4. Sintomas atendidos na manutenção.

As fotos de obras já mostram folhas sem perfis verticais entre elas e trilhos no piso e no
teto, que por isso saíram da lista.

Fatos técnicos das dúvidas, conferidos em 01/10/2026:

- A ABNT NBR 16259:2014 (sistemas de envidraçamento de sacadas) exige vidro de segurança,
  temperado (NBR 14698) ou laminado (NBR 14697). Fonte: [normas.com.br](https://www.normas.com.br/visualizar/artigo-tecnico/3229/o-envidracamento-de-sacadas-deve-obrigatoriamente-obedecer-a-norma-tecnica).
- A fachada é área comum: o envidraçamento precisa estar na convenção ou ser aprovado em
  assembleia, que define o padrão (Código Civil, art. 1.336, III). Fonte: [SíndicoNet](https://www.sindiconet.com.br/informese/fechamento-ou-envidracamento-de-sacadas-administracao-alteracao-de-fachadas).

A página não afirma que a empresa segue a norma nem cita isolamento acústico: a resposta
sobre ruído diz que o envidraçamento reduz o barulho, mas não é isolamento, e encaminha para o
serviço de acústica.

## Imagens

| Uso | Arquivo | Origem |
| --- | --- | --- |
| Topo (desktop) | `src/assets/tecnoglass/sacadas/sacada-fechada-desktop-v1.jpg` | Primeiro quadro de `public/media/sacada-scroll-v1.mp4`, extraído com o FFmpeg de `.astro/video-tools` (1920 × 1080) |
| Topo (celular) | `src/assets/tecnoglass/portfolio/sacada-premium-v1.png` | Ver [PORTFOLIO-IMAGENS.md](PORTFOLIO-IMAGENS.md) |
| Obras entregues | `src/assets/tecnoglass/sacadas/obras/` | Fotos reais de obras, recebidas em 01/10/2026 |
| Demonstração | `public/media/sacada-scroll-v1.mp4` e o poster | Ver [SACADA-VIDEO.md](SACADA-VIDEO.md) |

As fotos de Obras entregues são reais e saem como vieram, sem retoque: algumas foram tiradas
no dia da instalação, ainda com os adesivos nos vidros, e o texto da seção diz isso. As
legendas descrevem só o que aparece na foto, sem endereço, bairro ou nome de prédio.

Para incluir uma obra, salve a foto na pasta e acrescente a legenda em
`src/data/sacadas-obras.ts`; o carrossel segue a ordem da lista, e as etiquetas definem a
etiqueta do cartão (a primeira) e os filtros em que a obra entra. Uma foto salva sem legenda
entra no fim da galeria com texto genérico, e uma legenda que aponte para arquivo inexistente
interrompe a build com o nome do arquivo, para nenhum erro de digitação passar despercebido.
O cartão usa recorte vertical 3:4, como na home (ajustável por foto em `posicao`); a galeria
mostra a foto inteira.

### Carrossel

O mesmo componente da home (`CarrosselContinuo`), para os dois ficarem iguais:

- Rolagem contínua, sem encaixe nem parada entre cartões: um cartão a cada 10 s
  (`segundosPorCartao`), cerca de 45 px/s no desktop. Partidas e paradas são suaves.
- Largura total da tela, com degradê nas duas pontas (máscara): os cartões surgem e somem
  dentro da página. Uma seta em cada extremidade desliza um cartão; não há botão de pausa.
- Arrastar com o mouse ou deslizar com o dedo move o trilho, com inércia; o fim de um
  arraste não vira clique (não abre a galeria por engano).
- Volta infinita: cópias dos cartões antes e depois dos originais, fora do leitor de tela e
  do Tab. Clicar numa cópia abre a obra original na galeria. Pelo teclado, o cartão que
  recebe foco vem inteiro para a tela.
- Para só fora da tela, com a aba oculta, com a galeria (ou outro `<dialog>`) aberta, com o
  foco do teclado no carrossel e com "reduzir movimento" ligado (fica parado; setas e
  arraste continuam funcionando). Sem botão de pausa, essas duas últimas são o que atende
  quem precisa de conteúdo parado (WCAG 2.2.2).
- Filtros: Todas, Perfil preto, Perfil branco e Em L e de canto. Filtro sem obra não aparece.
  Quando os cartões do filtro cabem na tela, ficam parados e centralizados, sem setas.
- Sem JavaScript: rolagem nativa, sem setas nem degradê.

O topo ainda usa imagens geradas. Com as fotos reais, vale trocá-lo por uma obra mobiliada
e com boa luz quando houver uma à altura.

O vídeo (7,6 MB) só carrega quando a demonstração se aproxima da tela; com economia de dados
ligada, só no primeiro toque. No iPhone, o primeiro gesto faz um play/pause imediato, porque o
Safari só decodifica quadros depois de um `play()`.

## Comportamento sem JavaScript e com movimento reduzido

- Sem JavaScript, o cartão do assistente vira "Peça seu orçamento" com o botão do WhatsApp e o
  link para o formulário. A demonstração mostra o poster, sem controles nem dica de arrastar.
  A primeira dúvida já vem aberta.
- Com `prefers-reduced-motion`, o botão da demonstração abre e fecha sem animação e os passos
  do assistente aparecem sem transição.

## Validação

- `npm run build`: `astro check` com 0 erros, 0 avisos e 0 sugestões.
- `node scripts/verify-sacadas.mjs`: H1, metadados, `FAQPage` igual às dúvidas visíveis,
  `data-servico` em todos os links de WhatsApp, uma obra para cada foto da pasta (com alt,
  versão grande na build e mensagem própria), formulário com o serviço marcado, vídeo e
  poster na build, ausência de preço, garantia e números, montagem da mensagem, links da home
  e, com o domínio informado, canonical e sitemap:
  `node scripts/verify-sacadas.mjs dist https://DOMINIO`.
- Navegador (Chrome headless, 01/10/2026), no servidor de desenvolvimento e na build de
  produção: os três ramos do assistente, voltar e recomeçar; mensagem do WhatsApp; conversão
  `contato_whatsapp` com `sacadas-guiado` no clique; formulário pré-preenchido com foco no
  nome; demonstração a 60% com o quadro correspondente; botão e arraste; barra fixa só entre o
  fim do topo e o formulário; console sem erros; sem rolagem horizontal em 320, 360, 390, 768,
  1024, 1280 e 1440 px; botão do WhatsApp acima da dobra em todas essas larguras; cenários sem
  JavaScript e com movimento reduzido.
- Galeria das obras, nos mesmos dois ambientes: abre a foto clicada com o foco no botão
  fechar; setas do teclado, botões com volta circular e gesto de deslizar; Esc e clique fora
  fecham e devolvem o foco; Ctrl + clique abre a foto em outra aba; conversões
  `sacadas-obra` e `sacadas-obras`; no celular, foto e botão do WhatsApp cabem na tela.
- Carrossel contínuo, na home e nesta página, nos mesmos dois ambientes: velocidade
  constante medida em amostras de 120 ms (o menor passo fica acima de 95% da média, sem
  paradas); largura total, setas nas pontas e degradê; seta desliza um cartão e a rolagem
  continua; arraste com inércia sem virar clique; filtros (poucos cartões ficam parados e
  centralizados); na home, produtos intercalados sem repetição lado a lado; galeria para o
  carrossel e ele retoma ao fechar; foco do teclado para e traz o cartão para a tela; no
  celular, deslizar move o trilho e a rolagem continua; movimento reduzido; sem JavaScript;
  sem rolagem lateral da página de 320 a 1440 px.
- `scripts/verify-seo.mjs` falha por um motivo anterior a esta página: o H1 da home mudou
  quando o carrossel foi reordenado. Ver [ANALISE-UX.md](ANALISE-UX.md).

## Antes de subir a campanha

1. Confirmar os itens `CONFIRMAR` com o cliente.
2. Avaliar trocar o topo por uma foto real de obra.
3. Configurar `PUBLIC_SITE_URL` e `PUBLIC_ALLOW_INDEXING` (vale para o site inteiro).
4. No Google Ads, usar `https://DOMINIO/envidracamento-de-sacadas/` como URL final dos grupos
   de sacada. O sitelink `/whatsapp?servico=sacada` continua valendo.
5. Montar o funil do assistente no GA4.
