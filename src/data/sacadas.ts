// Landing page de envidraçamento de sacadas: /envidracamento-de-sacadas/
//
// Todos os textos da página ficam aqui. Regras seguidas, as mesmas do resto do site:
//   • Sem preço, prazo, garantia, número de obras ou avaliações: nada disso foi
//     informado pelo cliente, e promessa sem comprovação em tráfego pago custa a conta
//     de anúncios.
//   • "Orçamento sem compromisso", "medição no local" e "resposta em até 1 hora útil"
//     já estão publicados no site (rodapé, /obrigado e /whatsapp).
//   • Itens marcados com CONFIRMAR descrevem o sistema retrátil, o mais comum em
//     envidraçamento de sacadas. Conferir com o cliente se é o sistema que ele instala
//     antes de subir a campanha; se não for, ajustar ou remover o item.
//   • Os dados técnicos das dúvidas (norma ABNT NBR 16259, aprovação do condomínio)
//     foram conferidos em fontes públicas em 01/10/2026. Ver docs/LP-SACADAS.md.

export const sacadasPath = '/envidracamento-de-sacadas/';

export const sacadasSeo = {
  title: 'Envidraçamento de Sacadas na Grande São Paulo | Bernardo Tecnoglass',
  description: 'Envidraçamento e manutenção de sacadas na Grande São Paulo. Proteção contra chuva, vento e poeira sem perder a vista. Orçamento sem compromisso.',
};

/** Mensagens pré-preenchidas do WhatsApp, por ponto de contato. */
export const sacadasMensagens = {
  geral: 'Olá! Vim pela página de sacadas e gostaria de um orçamento de envidraçamento de sacada.',
  manutencao: 'Olá! Vim pela página de sacadas e preciso de manutenção na minha sacada envidraçada.',
  acustica: 'Olá! Vim pela página de sacadas e gostaria de saber sobre soluções acústicas para sacada ou janela.',
  duvida: 'Olá! Vim pela página de sacadas e tenho uma dúvida sobre envidraçamento.',
  obras: 'Olá! Vim pela página de sacadas, vi as obras de vocês e gostaria de um orçamento de envidraçamento.',
};

/** Selos do topo: só compromissos que o site já publica. */
export const sacadasGarantias = ['Orçamento sem compromisso', 'Medição no local', 'Resposta em até 1 hora útil'];

/**
 * Itens da demonstração interativa. As fotos de obras mostram folhas sem perfis verticais
 * e trilhos no piso e no teto. CONFIRMAR: abertura parcial e folhas que giram para limpeza.
 */
export const sacadasDemo = ['Abertura total ou parcial', 'Trilhos discretos no piso e no teto', 'Folhas que giram para facilitar a limpeza'];

export const sacadasEtapas = [
  { icone: 'message', titulo: 'Conte sobre a sua sacada', texto: 'Pelo WhatsApp ou pelo formulário. Fotos e medidas aproximadas já ajudam a orientar o orçamento.' },
  { icone: 'ruler', titulo: 'Medição no local', texto: 'Agendamos uma visita para medir o vão com precisão e conhecer o padrão do prédio.' },
  { icone: 'file', titulo: 'Proposta detalhada', texto: 'Você recebe o orçamento com o sistema, o vidro e o acabamento indicados para a sua sacada.' },
  { icone: 'hammer', titulo: 'Fabricação e instalação', texto: 'Aprovada a proposta, as peças são feitas sob medida e instaladas no seu imóvel.' },
] as const;

// CONFIRMAR: sintomas atendidos na manutenção.
export const sacadasManutencao = [
  'Folhas pesadas, travando ou saindo do trilho',
  'Entrada de água ou de vento',
  'Borrachas e vedações ressecadas',
  'Trinco ou fechadura com defeito',
];

/**
 * Depoimentos reais, com autorização do cliente. Vazio = a seção não aparece.
 * Nunca preencher com texto inventado: depoimento falso é propaganda enganosa.
 */
export const sacadasDepoimentos: { nome: string; local?: string; texto: string }[] = [
  // { nome: 'Nome do cliente', local: 'Santo André', texto: 'Depoimento autorizado.' },
];

export const sacadasDuvidas = [
  {
    pergunta: 'Quanto custa envidraçar uma sacada?',
    resposta: 'O valor depende da largura e da altura do vão, do número de folhas, do tipo de vidro e do acabamento dos perfis. Com fotos e medidas aproximadas, já conseguimos orientar você pelo WhatsApp. O valor final é confirmado depois da medição no local.',
  },
  {
    pergunta: 'Preciso de autorização do condomínio?',
    resposta: 'Em geral, sim. A fachada é área comum do prédio: o envidraçamento precisa estar previsto na convenção ou ser aprovado em assembleia, que define o padrão — cor dos perfis, tipo e cor do vidro. Se o seu prédio já tem um padrão aprovado, o orçamento segue esse padrão.',
  },
  {
    pergunta: 'O envidraçamento substitui o guarda-corpo?',
    resposta: 'Não. O guarda-corpo continua sendo a proteção contra quedas, e o envidraçamento não cumpre essa função. Os dois trabalham juntos.',
  },
  {
    pergunta: 'Que tipo de vidro é usado?',
    resposta: 'A norma ABNT NBR 16259, que trata dos sistemas de envidraçamento de sacadas, exige vidro de segurança: temperado ou laminado. A espessura e a cor são definidas no orçamento, de acordo com o tamanho do vão e o padrão do prédio.',
  },
  {
    // CONFIRMAR: sistema retrátil.
    pergunta: 'Dá para abrir a sacada inteira?',
    resposta: 'Sim. No sistema retrátil, as folhas correm pelo trilho e se recolhem nas laterais, liberando o vão. Também dá para abrir só uma parte.',
  },
  {
    // CONFIRMAR: folhas que giram para limpeza.
    pergunta: 'Como limpo o lado de fora dos vidros?',
    resposta: 'No sistema retrátil, as folhas giram depois de recolhidas. Assim dá para limpar os dois lados do vidro por dentro do imóvel, sem se debruçar para fora.',
  },
  {
    pergunta: 'O vidro isola o barulho da rua?',
    resposta: 'Fechado, ele diminui o ruído, mas o envidraçamento de sacada não é um isolamento acústico. Se o barulho é o problema principal, fale com a gente sobre as soluções acústicas para sacadas e janelas.',
  },
  {
    pergunta: 'Quais regiões vocês atendem?',
    resposta: 'Atendemos toda a Grande São Paulo a partir de Santo André. Mande o seu bairro pelo WhatsApp para confirmarmos a sua região e agendarmos a medição.',
  },
  {
    pergunta: 'Vocês fazem manutenção de sacadas já envidraçadas?',
    resposta: 'Sim. Conte pelo WhatsApp o que está acontecendo. Fotos ou um vídeo curto ajudam a identificar o que precisa ser feito.',
  },
];

/** Opções do campo Serviço no formulário desta página. */
export const sacadasServicosFormulario = ['Envidraçamento de sacada', 'Manutenção de sacada', 'Sacada ou janela acústica', 'Outro'] as const;

// ---------------------------------------------------------------------------
// Orçamento guiado: três perguntas que montam a mensagem do WhatsApp ou preenchem
// o formulário. Cada necessidade tem a sua segunda pergunta.
// ---------------------------------------------------------------------------
export const assistenteNecessidades = [
  {
    id: 'envidracamento', icone: 'window', titulo: 'Envidraçar minha sacada', detalhe: 'Fechamento com vidro',
    pedido: 'gostaria de um orçamento de envidraçamento de sacada', servico: 'Envidraçamento de sacada',
  },
  {
    id: 'manutencao', icone: 'wrench', titulo: 'Manutenção da sacada', detalhe: 'Já envidraçada: ajustes e reparos',
    pedido: 'preciso de manutenção na minha sacada envidraçada', servico: 'Manutenção de sacada',
  },
  {
    id: 'acustica', icone: 'quiet', titulo: 'Sacada ou janela acústica', detalhe: 'Menos barulho da rua',
    pedido: 'gostaria de saber sobre soluções acústicas', servico: 'Sacada ou janela acústica',
  },
] as const;

export type NecessidadeId = (typeof assistenteNecessidades)[number]['id'];

export const assistenteDetalhes: Record<NecessidadeId, { pergunta: string; rotulo: string; opcoes: string[]; dica?: string }> = {
  envidracamento: {
    pergunta: 'Qual a largura aproximada da sacada?',
    rotulo: 'Largura aproximada',
    opcoes: ['Até 3 m', 'De 3 a 5 m', 'De 5 a 8 m', 'Mais de 8 m', 'Não sei medir'],
    dica: 'Não precisa ser exato: a medida final é feita no local.',
  },
  manutencao: {
    pergunta: 'O que está acontecendo?',
    rotulo: 'Problema',
    opcoes: ['Folhas pesadas ou travando', 'Entrada de água ou vento', 'Trinco ou fechadura', 'Vidro solto ou danificado', 'Outro problema'],
  },
  acustica: {
    pergunta: 'Onde está o barulho?',
    rotulo: 'Onde',
    opcoes: ['Na sacada', 'Nas janelas', 'Nos dois'],
  },
};

export const assistenteLocal = {
  pergunta: 'Onde fica o imóvel?',
  rotulo: 'Local',
  placeholder: 'Cidade e bairro',
  // Só sugestões de preenchimento, não uma lista de cidades atendidas.
  sugestoes: ['São Paulo', 'Santo André', 'São Bernardo do Campo', 'São Caetano do Sul', 'Diadema', 'Mauá', 'Ribeirão Pires', 'Guarulhos', 'Osasco'],
};
