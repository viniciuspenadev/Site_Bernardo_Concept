# Tecnoglass

Versão em Astro da base visual do site Concept. Projeto independente em `C:\xampp\htdocs\tecnoglass`; a versão Next.js permanece em `C:\xampp\htdocs\concept`.

## Executar

Requer Node.js 22.12 ou superior (ambiente usado: Node 24).

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:4321. A pasta contém código-fonte: o Apache do XAMPP não executa arquivos `.astro`.

```sh
npm run build
npm run preview
```

A build gera o site estático em `dist/`. Não há servidor React/Next.js em produção. As interações usam TypeScript compilado em JavaScript: menu mobile, slides, galeria filtrável e imagens na rolagem.

## Material da Tecnoglass

- `src/data/site.ts`: nome, metadados, WhatsApp, telefone, NAP (razão social, CNPJ, endereço), prova social e redes sociais.
- `src/data/tracking.ts`: ID do Google Ads e rótulos de conversão.
- `src/data/lead-form.ts`: opções do campo Serviço e endpoint do formulário.
- `src/data/media.ts`: imagens do topo, apresentação e sequência visual.
- `src/data/projects.ts`: fotos, categorias e textos da galeria.
- `src/data/content.ts`: textos dos destaques e os 13 serviços informados pelo cliente.
- `src/data/sacadas.ts`: textos, orçamento guiado e dúvidas da landing page de sacadas.
- `src/data/sacadas-obras.ts` e `src/assets/tecnoglass/sacadas/obras/`: fotos reais e legendas do portfólio de sacadas.
- `src/components/Brand.astro`: marca tipográfica provisória; substituir pelo logotipo oficial quando recebido.
- `src/assets/tecnoglass/`: fotografias originais da fachada e do portão, enviadas pelo cliente.
- `src/assets/tecnoglass/hero/`: versões desktop e mobile de cada slide do hero. Proveniência de cada arquivo em `docs/HERO-IMAGENS.md`.
- `docs/reference-images/`: arquivo das fotos da base anterior, fora dos arquivos públicos e da build.

O hero ocupa toda a tela, com texto sobre a fotografia. O carrossel de projetos rola de forma contínua, em largura total, com degradê nas pontas, uma seta em cada extremidade e filtros (`CarrosselContinuo.astro`, o mesmo da página de sacadas); os produtos são intercalados automaticamente e incluem as fotos reais de sacadas. O hero inclui pele de vidro, fachada residencial e portão. Cópias visuais dos cartões, fora do leitor de tela e do Tab, permitem a volta infinita. Os prompts e arquivos estão em docs/PORTFOLIO-IMAGENS.md e docs/PELE-VIDRO-BOX.md. Abaixo estão preservadas a seção com foto e texto e a seção com imagem fixa durante a rolagem.

O conteúdo agora descreve vidros, esquadrias, portões e soluções para sacadas conforme a lista enviada. Não são reutilizados preços, garantias, estatísticas, nomes de dirigentes ou contatos da empresa original. Os canais de contato aparecem automaticamente quando preenchidos em `site.ts`. Logo, contato e domínio oficiais ainda não foram fornecidos.

## Contato e conversão

O site gera contato por WhatsApp, telefone e formulário, e registra as conversões na conta
Google Ads `AW-18287438973`. A tag do Google é o primeiro elemento do `<head>` de todas as
páginas e um único listener no fim do `<body>` cobre todos os links de WhatsApp e telefone.

O formulário entrega cada lead numa Planilha Google, por um app da web do Google Apps
Script (`docs/apps-script/Codigo.gs`): linha na planilha e e-mail em segundos, sem
contratar serviço nenhum. A URL do script e o token ficam em `src/data/lead-form.ts`, no código — e não em variável
de ambiente, porque a build roda dentro do Docker e não enxerga as variáveis de runtime do
Easypanel. Passo a passo em [docs/APPS-SCRIPT.md](docs/APPS-SCRIPT.md).

Continuam pendentes de dados do cliente, e por isso ficam vazios em vez de inventados:
NAP (razão social, CNPJ, endereço) e números de prova social. Fotos reais de obras só
existem, por enquanto, para sacadas (usadas na página de sacadas desde 01/10/2026); nas demais
seções as imagens seguem geradas — e, com os selos de ressalva removidos a pedido do cliente,
a troca virou prioridade.

Passo a passo de configuração e roteiro de validação em [docs/CONVERSAO.md](docs/CONVERSAO.md).

## Publicação

```sh
docker build -t tecnoglass .
docker run --rm -p 8080:3000 tecnoglass
```

O Dockerfile compila com Node 24 e serve `dist/` com Nginx na porta interna 3000. No Easypanel, configurar essa porta e o domínio. O proxy da hospedagem deve encerrar TLS e redirecionar HTTP para HTTPS; o antigo middleware Next.js foi substituído por essa responsabilidade na infraestrutura.

Esta versão local usa `noindex, nofollow` porque ainda contém material provisório. Antes de publicar: inserir fotos e conteúdo oficiais, confirmar contatos, remover essa meta de `src/layouts/Layout.astro`, configurar canonical/URL e imagem de compartilhamento com o domínio definitivo, e validar HTTPS na hospedagem. Nenhum deploy foi realizado.

Para servir pelo XAMPP, apontar um VirtualHost para `dist/` como raiz do site. As URLs de recursos partem de `/`; se publicar dentro de uma subpasta, será necessário configurar `base` e adaptar os caminhos.

## Sacada interativa

A seção da sacada usa o vídeo fornecido pelo cliente em tela cheia, com avanço controlado pela rolagem, três mensagens e transição natural para Soluções ao terminar. Há poster estático para movimento reduzido e falhas de carregamento. Detalhes em [docs/SACADA-VIDEO.md](docs/SACADA-VIDEO.md). Execute `node scripts/verify-balcony.mjs` com Node 24 para verificar a timeline. A documentação da primeira proposta em CSS 3D foi preservada em `docs/SACADA-INTERATIVA.md` como histórico.

## Landing page de sacadas

`/envidracamento-de-sacadas/` é a página de conversão do envidraçamento de sacadas e o destino dos anúncios desse serviço: topo com orçamento guiado em três perguntas (WhatsApp com mensagem pronta ou formulário preenchido), carrossel contínuo com fotos reais de obras (o mesmo da home) e galeria ampliada, demonstração interativa com o vídeo da sacada, etapas, dúvidas com JSON-LD `FAQPage` e o formulário da home com o serviço já marcado. Estrutura, rastreamento e pendências em [docs/LP-SACADAS.md](docs/LP-SACADAS.md). Execute `node scripts/verify-sacadas.mjs` depois da build. A análise de UI/UX do site está em [docs/ANALISE-UX.md](docs/ANALISE-UX.md).

## Recuperação do projeto original

O projeto Next.js original está preservado na pasta `concept`. A migração foi feita em uma pasta independente, sem alterar suas fontes ou dependências. Para reverter uma publicação futura, restaurar a imagem/configuração da implantação anterior.


