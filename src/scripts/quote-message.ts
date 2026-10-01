// Monta o texto do orçamento guiado. Sem imports de propósito: o arquivo é testado
// direto pelo Node em scripts/verify-sacadas.mjs, que não resolve imports sem extensão.

export interface QuoteAnswers {
  /** Frase do pedido, ex.: "gostaria de um orçamento de envidraçamento de sacada". */
  pedido: string;
  /** Rótulo e resposta da segunda pergunta, ex.: "Largura aproximada" / "De 3 a 5 m". */
  rotulo: string;
  detalhe: string;
  local: string;
}

/** Linhas do resumo, na ordem exibida. O local vazio sai como "Não informado". */
export function quoteLines(answers: QuoteAnswers): [string, string][] {
  return [
    [answers.rotulo, answers.detalhe],
    ['Local', answers.local.trim() || 'Não informado'],
  ];
}

/** Mensagem do WhatsApp: saudação padrão do site e uma linha por resposta. */
export function quoteMessage(answers: QuoteAnswers): string {
  const linhas = quoteLines(answers).map(([rotulo, valor]) => `• ${rotulo}: ${valor}`);
  return [`Olá! Vim pela página de sacadas e ${answers.pedido}.`, ...linhas].join('\n');
}

/** Texto para o campo Detalhes do formulário, quando o visitante prefere ser chamado. */
export function quoteDetails(answers: QuoteAnswers): string {
  return ['Orçamento guiado:', ...quoteLines(answers).map(([rotulo, valor]) => `${rotulo}: ${valor}`)].join('\n');
}
