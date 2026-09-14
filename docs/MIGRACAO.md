# Migração Tecnoglass — 14/09/2026

## Entrega local

Projeto Astro 7.3.2 independente, com Tailwind 4, TypeScript e fontes locais. A versão original permanece em `C:\xampp\htdocs\concept`. Marca, textos e contatos centralizados em `src/data/`.

Foram preservados a estrutura das seções, a paleta azul, a tipografia, o menu responsivo, os slides do topo, o carrossel com filtros e a troca de imagens na rolagem. Os componentes React foram convertidos para Astro; as interações são scripts de navegador sem React ou Next.js.

A adaptação de marca inclui uma assinatura tipográfica provisória Tecnoglass. Informações comerciais e pessoais da marca anterior foram removidas. A galeria apresenta referências, sem atribuir os ambientes fotografados à Tecnoglass.

## Validação executada

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Aprovado; 22 arquivos verificados, sem erros, avisos ou sugestões |
| Slides anterior/próximo | Alternância confirmada no navegador |
| Filtro Dormitórios | 4 itens visíveis |
| Filtro Living | 1 item; navegação desativada quando não há rolagem |
| Filtro Todos | 7 itens visíveis |
| Galeria | Botão próximo desloca os cartões |
| Cabeçalho | Aparência sólida após rolagem |
| Sequência de imagens | Segunda imagem ativa na segunda etapa |
| Menu mobile | Abre, fecha com Escape, navega por âncora e restaura `aria-expanded` |
| Layout | Desktop e celular inspecionados; sem transbordamento horizontal a 320, 390 e 768 px |
| Console | Nenhum erro ou aviso observado |
| Arquivos e âncoras | 15 referências locais verificadas; nenhum arquivo ou alvo interno ausente |
| Marca anterior | Nenhuma referência textual, telefone antigo ou nome de dirigente encontrado no HTML gerado |
| JavaScript da página | 4 scripts inline, 4.780 bytes no total antes de compressão |

A medição de JavaScript é do artefato gerado, não um benchmark comparativo de desempenho. Docker não está disponível neste ambiente: o Dockerfile e a configuração Nginx foram preparados, mas o contêiner não foi executado. A hospedagem e o redirecionamento HTTPS ainda não foram validados em produção.

## Próxima etapa editorial

Receber as fotografias, o logotipo, os produtos/serviços e os contatos oficiais da Tecnoglass; substituir os dados provisórios; definir o domínio e concluir os metadados de publicação. A prévia está marcada com `noindex, nofollow` até essa finalização. Não foi realizado deploy.
