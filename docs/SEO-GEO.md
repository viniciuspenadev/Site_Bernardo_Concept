# SEO e GEO — Bernardo Tecnoglass

Marca confirmada: Bernardo Tecnoglass. Área atendida confirmada: Grande São Paulo.

## Aplicado nesta etapa

- Title: Esquadrias e Vidros na Grande São Paulo | Bernardo Tecnoglass.
- Um H1 visível: Vidros e esquadrias na Grande São Paulo.
- Títulos de serviços e cartões descritivos, sem repetição artificial de cidades.
- Região de atendimento no conteúdo visível e nos dados estruturados.
- JSON-LD Organization com os 13 serviços efetivamente informados. Sem avaliações, certificações, endereço ou números de obras inventados.
- Canonical, og:url e WebSite usam apenas o domínio configurado.
- robots.txt e sitemap.xml gerados no build; sitemap divulga somente URLs liberadas para indexação.
- Prévia em noindex, follow. A versão de desenvolvimento não deve competir com o site público.

## Publicação

Configuração no ambiente de BUILD (não basta alterar o ambiente do nginx após compilar):

```dotenv
PUBLIC_SITE_URL=https://DOMINIO-OFICIAL-CONFIRMADO
PUBLIC_ALLOW_INDEXING=true
```

O domínio ainda não foi confirmado para esta nova versão. O site bernardotecnoglass.com.br foi encontrado na pesquisa, mas não foi adotado automaticamente como destino. Para Docker, os mesmos nomes estão disponíveis como argumentos de build. Em desenvolvimento, omitir as variáveis deixa a indexação desativada. Liberar indexação sem domínio causa erro de build.

Antes de publicar: confirmar destino, domínio canônico com ou sem www e dados oficiais de contato; mapear URLs do site antigo e aplicar redirecionamentos 301 quando necessários; conferir HTTPS, páginas acessíveis e ausência de bloqueios; inspecionar a URL e enviar sitemap no Search Console. Se houver troca de domínio, planejar a migração separadamente.

## Próximo trabalho editorial

Construir páginas próprias para serviços que tenham conteúdo específico suficiente. Estes são alvos editoriais propostos, não palavras-chave com volume ou dificuldade já medidos:

| Página | Título proposto | Conteúdo necessário |
| --- | --- | --- |
| Esquadrias | Esquadrias de alumínio na Grande São Paulo — Bernardo Tecnoglass | Tipos atendidos, materiais confirmados, processo e obras reais |
| Portões | Portões de alumínio, ACM e aço galvanizado — Bernardo Tecnoglass | Diferenças das opções, aplicações e fotos de trabalhos |
| Box | Box de vidro na Grande São Paulo — Bernardo Tecnoglass | Modelos efetivamente oferecidos, ferragens e processo de orçamento |
| Sacadas | Envidraçamento de sacadas na Grande São Paulo — Bernardo Tecnoglass | Sistemas oferecidos, etapas e dúvidas respondidas pela equipe |
| Manutenção | Manutenção de sacadas na Grande São Paulo — Bernardo Tecnoglass | Problemas atendidos e limites reais do serviço |
| Fachadas | Pele de vidro na Grande São Paulo — Bernardo Tecnoglass | Tipos de fachada atendidos, materiais e casos reais |

Não gerar páginas quase idênticas para cada município nem afirmar presença física onde existe somente atendimento. Depois de consultar demanda e concorrência, priorizar os serviços e municípios que de fato geram orçamentos.

## Confiança, busca local e IA

- Alinhar nome, telefone, endereço e horários entre site e Perfil da Empresa no Google. Obter link direto do perfil: o link enviado pelo cliente abre uma busca pelo nome, não identifica sozinho a ficha de forma estável.
- Confirmar endereço e contato antes de acrescentar LocalBusiness. Os dados encontrados em outro site não foram copiados automaticamente. Não reutilizar alegações de 10 anos, 2.500 obras ou avaliações sem comprovação da empresa.
- Produzir relatos de obras reais, com fotos autorizadas, serviço, contexto e solução. Cenas geradas continuam identificadas como ilustrações.
- Responder dúvidas reais de clientes em texto acessível, com revisão da equipe técnica. Não prometer índices acústicos, garantias ou prazos ainda não confirmados.
- Usar Search Console para acompanhar consultas, impressões, cliques, CTR e posição por serviço/região; medir contatos e orçamentos para avaliar resultado comercial. Não há medição de posições atuais nesta etapa.
- GEO significa otimização para mecanismos generativos. Não é sinônimo de localização geográfica; SEO local e GEO compartilham a necessidade de dados confiáveis. As recomendações consultadas abaixo se referem ao Google; não garantem citação em outros assistentes.

## Referências oficiais consultadas

- [Títulos nos resultados](https://developers.google.com/search/docs/appearance/title-link)
- [Google: otimização para busca generativa](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Classificação local: relevância, distância e destaque](https://support.google.com/business/answer/7091?hl=pt-BR)
- [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization)

Nenhuma posição, inclusão no índice, resultado enriquecido ou citação em resposta de IA é garantida. As mudanças atuais estabelecem a base; autoridade, concorrência, localização e conteúdo real também influenciam o desempenho.
