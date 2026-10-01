# Análise de UI/UX do site — 01/10/2026

Escopo: home (`/`) observada no navegador em desktop 1440 × 900 e celular 390 × 844, mais o
código-fonte e os documentos de `docs/`. Os itens trazem o arquivo onde a mudança aconteceria.
Nada desta lista foi alterado na home, exceto os links para a nova página de sacadas.

## O que está bom e deve ficar

- **Identidade coerente.** Azul-marinho com Playfair Display e DM Sans, fotos amplas e muito
  respiro: o site passa um padrão de acabamento compatível com o ticket do serviço.
- **Base técnica sólida.** Astro estático, imagens WebP responsivas, carregamento sob demanda e
  pouco JavaScript. Não há framework pesado no navegador.
- **Conversão bem instrumentada.** Google Ads e GA4, `gclid` guardado por 90 dias, um listener
  único para WhatsApp e telefone, `/obrigado` e a página `/whatsapp` para sitelinks.
- **Acessibilidade de base.** Link para pular ao conteúdo, foco visível, movimento reduzido
  respeitado, slides ocultos fora do teclado e validação do formulário sem `alert()`.
- **Conteúdo honesto.** Nenhum número ou avaliação inventada, o que protege a conta de anúncios.
- **Vários caminhos de contato.** Telefone no cabeçalho, WhatsApp flutuante, formulário e rodapé.

## Problemas, por prioridade

### Alta: afetam conversão e busca

1. **H1 genérico e sem região.** O H1 atual é "Portas e janelas que conectam espaços.":
   bonito, mas não diz o serviço nem onde a empresa atende. `scripts/verify-seo.mjs` espera
   "Vidros e esquadrias na Grande São Paulo." e hoje falha por isso, desde que o carrossel foi
   reordenado (a build de 20/09 já tinha esse H1). Sugestão: H1 com serviço e região, e a frase
   atual como subtítulo. Arquivo: `heroSlides` em `src/data/content.ts`. A ordem dos slides foi
   pedida pelo cliente, então a troca precisa ser combinada com ele.
2. **Carrossel no topo dilui a mensagem.** São três slides trocando a cada 7 s, e só o primeiro
   tem H1. Para quem chega por anúncio, uma mensagem fixa ligada ao que foi buscado converte
   melhor. Sugestão: topo fixo com uma imagem e uma mensagem, ou ao menos sem troca automática.
   Arquivos: `src/components/Hero.astro` e `src/scripts/hero.ts`.
3. **"Sobre nós" leva ao vídeo da sacada.** O item do menu aponta para `#diferenciais`, que é a
   sequência em vídeo da sacada. Não existe conteúdo sobre a empresa, e quem procura saber
   quem ela é encontra quatro telas de vídeo. Sugestão: renomear o item para "Sacadas" e
   apontar para a nova página, ou criar um bloco "Sobre" de verdade com os dados que já
   existem (endereço, CNPJ, horário). Arquivo: `navigation` em `src/data/site.ts`.
4. **O vídeo da sacada custa muita rolagem na home.** São 400svh no desktop e 360svh no
   celular, com três frases, no meio de uma página sobre vários serviços. Sugestão: encurtar
   para cerca de 200svh. A versão interativa da página de sacadas mostra o mesmo vídeo sem
   prender a rolagem. Arquivo: `src/styles/balcony.css`.
5. **Os destaques abaixo do topo parecem atalhos, mas não são clicáveis.** Esquadrias,
   Portões, Vidros e Sacadas têm ícone e título, e o toque não faz nada. Sugestão: transformar
   em links para cada solução, com Sacadas indo para a nova página. Arquivo:
   `src/components/TrustIndicators.astro`.
6. **Imagens geradas apresentadas como projetos.** Já registrado em
   [CONVERSAO.md](CONVERSAO.md), item 2.5. Em tráfego pago é o maior risco de confiança.
   Em 01/10/2026 chegaram fotos reais de sacadas: estão no portfólio da página de sacadas e,
   na home, substituíram o cartão de sacada gerado no carrossel de projetos. Continuam gerados
   os demais cartões e a foto de sacadas em Soluções. Sugestão: trocar essa foto por uma real
   e pedir fotos reais dos outros serviços. Arquivo: `src/data/service-photos.ts`.

### Média: atrito e clareza

7. **O formulário pede muito e o ícone engana.** São quatro campos obrigatórios e uma caixa de
   LGPD obrigatória, e o botão de enviar tem o ícone do WhatsApp, mas envia o formulário.
   Sugestões: trocar o ícone por um de envio; avaliar com o jurídico do cliente um aviso de
   privacidade no lugar da caixa obrigatória (pedido de orçamento é procedimento preliminar a
   contrato feito a pedido do titular, LGPD art. 7º, V). Arquivo:
   `src/components/LeadForm.astro`.
8. **Sem botão de orçamento no cabeçalho do desktop.** Só o telefone, em letras pequenas.
   Sugestão: um botão "Pedir orçamento", como o da página de sacadas. Arquivo:
   `src/components/Navbar.astro`.
9. **O WhatsApp flutuante cobre os campos do formulário no celular.** A 390 px ele fica sobre
   a borda direita do campo WhatsApp. Sugestão: esconder o botão quando o formulário estiver
   na tela, como a barra fixa da página de sacadas faz. Arquivos:
   `src/components/WhatsAppFloat.astro` e `src/styles/global.css`.
10. **Carrossel de projetos com controles demais e sem filtro de sacadas.** Resolvido em
    01/10/2026: rolagem contínua, sem pausa, com uma seta em cada ponta e degradê nas bordas
    (o mesmo carrossel da página de sacadas), filtro "Sacadas" e produtos intercalados.
    Arquivos: `src/components/CarrosselContinuo.astro` e `src/data/projects.ts`.
11. **Botões que parecem desativados em Soluções.** No desktop, os blocos inativos ficam com
    35% de opacidade, e o botão de orçamento deles parece desabilitado. Sugestão: esmaecer só
    o texto. Arquivo: `.service-step` em `src/styles/global.css`.

### Baixa: legibilidade e consistência

12. **Textos pequenos demais.** Rótulos de 9 px nos destaques, 10–11 px em caixa alta no menu e
    nos rótulos, e corpo de texto em peso 300. Sugestão: no mínimo 12 px para rótulos e peso
    400 para texto corrido.
13. **Cinzas misturados.** `global.css` define fundo `#fafaf9` e texto `#1c1917` (tons quentes)
    fora de camada, e isso vence as classes do `body` no Layout (tons frios). Sugestão:
    escolher uma família de cinzas.
14. **Token duplicado.** `primary-600` e `primary-700` têm o mesmo valor (`#004a8f`).
15. **Título fora do padrão.** "Esquadrias, vidros e portões." em Soluções usa DM Sans; os
    outros títulos de seção usam Playfair.
16. **Sem imagem de compartilhamento.** Falta `og:image` para a prévia de links no WhatsApp e
    nas redes. Depende do domínio definitivo configurado.

## Ambiente local

Um `postcss.config.mjs` solto em `C:\`, de um projeto Next.js descompactado na raiz do disco,
quebrava o `npm run dev` com "Failed to load PostCSS config": o Vite procura essa configuração
nas pastas acima do projeto. A correção ficou dentro do projeto (`css.postcss` declarado em
`astro.config.mjs`, já que o Tailwind roda pelo plugin do Vite). Os arquivos em `C:\` não foram
tocados, mas vale removê-los da raiz do disco.

## Feito nesta etapa

- Landing page de envidraçamento de sacadas, com portfólio de fotos reais: [LP-SACADAS.md](LP-SACADAS.md).
- Links da home para ela (Soluções, vídeo da sacada e rodapé) e entrada no sitemap.

## Próximos passos sugeridos

1. Confirmar com o cliente os itens `CONFIRMAR` da página de sacadas e subir a campanha.
2. Resolver o H1 da home (item 1) e voltar a passar o `verify-seo.mjs`.
3. Topo fixo na home (item 2) e menu sem "Sobre nós" apontando para o vídeo (item 3).
4. Destaques clicáveis, botão no cabeçalho e WhatsApp flutuante fora do formulário (5, 8 e 9).
5. Fotos reais e avaliações no Perfil da Empresa no Google para ligar a prova social.
6. Repetir o modelo da página de sacadas para os serviços com mais demanda nos anúncios.
