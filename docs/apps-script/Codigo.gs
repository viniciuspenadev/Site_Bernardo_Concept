/**
 * Recebe os leads do site da Bernardo Tecnoglass, grava numa Planilha Google
 * e avisa por e-mail. Instruções de instalação em docs/APPS-SCRIPT.md.
 *
 * Só há um lugar para editar: o bloco CONFIG abaixo.
 */

var CONFIG = {
  // Quem recebe o aviso. Para mais de um, separe por vírgula:
  // 'vendas@empresa.com.br,dono@empresa.com.br'
  EMAIL_DESTINO: 'adm@bernardotecnoglass.com.br',

  // Nome da aba da planilha onde os leads são gravados (criada automaticamente).
  ABA: 'Leads',

  // Token combinado com o site. Troque por um texto qualquer e repita o mesmo
  // valor na variável PUBLIC_LEAD_TOKEN do site. Serve para descartar envios
  // automáticos que descubram a URL — não é segredo, é um filtro simples.
  TOKEN: 'uahuahuhu5h4u3fu3n4untu34nf3u4nu34bt3u4funuqwn2',
};

var COLUNAS = [
  'Recebido em', 'Nome', 'WhatsApp', 'Serviço', 'Cidade/Bairro',
  'Detalhes', 'Consentimento LGPD', 'Origem', 'gclid', 'Página',
];

/** Abre a página no navegador só para confirmar que o deploy está no ar. */
function doGet() {
  return resposta({ success: true, message: 'Endpoint de leads ativo.' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return resposta({ success: false, message: 'Requisição sem corpo.' });
    }

    var dados = JSON.parse(e.postData.contents);

    if (CONFIG.TOKEN && dados.token !== CONFIG.TOKEN) {
      return resposta({ success: false, message: 'Token inválido.' });
    }

    // Armadilha de robô: o campo é invisível no site e só scripts preenchem.
    if (dados.botcheck) {
      return resposta({ success: true, message: 'Ignorado.' });
    }

    var nome = texto(dados.nome);
    var whatsapp = texto(dados.whatsapp);
    var servico = texto(dados.servico);
    var cidade = texto(dados.cidade);

    if (!nome || !whatsapp || !servico || !cidade) {
      return resposta({ success: false, message: 'Campos obrigatórios faltando.' });
    }

    var recebidoEm = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');
    var linha = [
      recebidoEm,
      nome,
      whatsapp,
      servico,
      cidade,
      texto(dados.detalhes) || '—',
      dados.consentimento ? 'Sim' : 'Não',
      texto(dados.origem) || '—',
      texto(dados.gclid) || '—',
      texto(dados.pagina) || '—',
    ];

    gravar(linha);
    avisar(linha);

    return resposta({ success: true });
  } catch (erro) {
    // O erro fica no painel de execuções do Apps Script para diagnóstico.
    console.error(erro);
    return resposta({ success: false, message: 'Erro ao processar o lead.' });
  }
}

/** Grava o lead na planilha, criando a aba e o cabeçalho na primeira vez. */
function gravar(linha) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(CONFIG.ABA);

  if (!aba) {
    aba = planilha.insertSheet(CONFIG.ABA);
  }
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
    aba.setFrozenRows(1);
  }

  aba.appendRow(linha);
}

/** Envia o aviso por e-mail, com link pronto para responder no WhatsApp. */
function avisar(linha) {
  if (!CONFIG.EMAIL_DESTINO || CONFIG.EMAIL_DESTINO.indexOf('PREENCHER') === 0) return;

  var nome = linha[1];
  var whatsapp = linha[2];
  var servico = linha[3];
  var link = linkWhatsApp(whatsapp, nome);

  var corpo =
    '<h2 style="font-family:Arial,sans-serif;color:#0a3560;margin:0 0 16px">Novo orçamento pelo site</h2>' +
    '<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">' +
    linhaTabela('Recebido em', linha[0]) +
    linhaTabela('Nome', nome) +
    linhaTabela('WhatsApp', whatsapp) +
    linhaTabela('Serviço', servico) +
    linhaTabela('Cidade/Bairro', linha[4]) +
    linhaTabela('Detalhes', linha[5]) +
    linhaTabela('Consentimento LGPD', linha[6]) +
    linhaTabela('Origem', linha[7]) +
    linhaTabela('gclid', linha[8]) +
    linhaTabela('Página', linha[9]) +
    '</table>' +
    (link
      ? '<p style="font-family:Arial,sans-serif;margin:24px 0 0">' +
        '<a href="' + link + '" style="background:#0a3560;color:#fff;padding:12px 24px;' +
        'border-radius:999px;text-decoration:none;font-weight:bold">Responder no WhatsApp</a></p>'
      : '');

  MailApp.sendEmail({
    to: CONFIG.EMAIL_DESTINO,
    subject: 'Novo orçamento pelo site — ' + servico + ' — ' + nome,
    htmlBody: corpo,
    name: 'Site Bernardo Tecnoglass',
  });
}

/** Monta wa.me a partir do telefone informado pelo visitante. */
function linkWhatsApp(whatsapp, nome) {
  var digitos = String(whatsapp).replace(/[^0-9]/g, '');
  if (digitos.length === 10 || digitos.length === 11) digitos = '55' + digitos;
  if (digitos.length < 12) return '';

  var mensagem = 'Olá, ' + nome + '! Aqui é da Bernardo Tecnoglass. ' +
    'Recebemos seu pedido de orçamento pelo site.';
  return 'https://wa.me/' + digitos + '?text=' + encodeURIComponent(mensagem);
}

function linhaTabela(rotulo, valor) {
  return '<tr>' +
    '<td style="padding:6px 16px 6px 0;color:#64748b;vertical-align:top">' + rotulo + '</td>' +
    '<td style="padding:6px 0;color:#0f172a"><strong>' + escapar(valor) + '</strong></td>' +
    '</tr>';
}

function escapar(valor) {
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function texto(valor) {
  return valor === undefined || valor === null ? '' : String(valor).trim();
}

function resposta(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
