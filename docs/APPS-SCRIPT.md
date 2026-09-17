# Receber os leads numa Planilha Google

O formulário do site envia cada pedido de orçamento para um script ligado a uma Planilha
Google. O lead vira uma linha na planilha e um e-mail chega em segundos. Não é preciso
contratar nada: usa a mesma conta Google da campanha.

Tempo: cerca de 10 minutos, uma vez só.

---

## Passo 1 — Criar a planilha

1. Abra <https://sheets.new> (entre com a conta Google da empresa).
2. Dê um nome, por exemplo **Leads — Site Bernardo Tecnoglass**.

Não precisa criar colunas: o script monta o cabeçalho sozinho no primeiro lead.

## Passo 2 — Colar o script

1. Na planilha, menu **Extensões → Apps Script**.
2. Apague o conteúdo do editor (`function myFunction() {}`).
3. Cole todo o conteúdo do arquivo [`apps-script/Codigo.gs`](apps-script/Codigo.gs).
4. No topo do arquivo, ajuste as duas linhas do bloco `CONFIG`:

   ```js
   EMAIL_DESTINO: 'vendas@suaempresa.com.br',   // quem recebe o aviso
   TOKEN: 'tecnoglass-2026',                    // troque por outro texto
   ```

   Para mais de um destinatário, separe por vírgula dentro das mesmas aspas.
   Guarde o `TOKEN`: ele precisa ser repetido igualzinho no passo 5.

5. Clique no ícone de salvar (💾).

## Passo 3 — Publicar como app da web

1. Botão azul **Implantar → Nova implantação**.
2. No ícone de engrenagem, escolha o tipo **App da Web**.
3. Preencha:
   - **Descrição**: `Leads do site`
   - **Executar como**: **Eu** (seu e-mail)
   - **Quem pode acessar**: **Qualquer pessoa**
4. **Implantar**.

> **"Quem pode acessar: Qualquer pessoa" assusta, mas é necessário** — quem envia é o
> navegador do visitante, que não está logado na sua conta. O script não lê nem devolve
> nada da planilha: só aceita leads que tragam o `TOKEN` certo.

## Passo 4 — Autorizar

Na primeira publicação o Google pede autorização:

1. **Revisar permissões** → escolha sua conta.
2. Aparece o aviso **"O Google não verificou este app"**. Clique em **Avançado** e depois em
   **Acessar Leads — Site Bernardo Tecnoglass (não seguro)**.
   O aviso é o padrão para scripts próprios não publicados na loja; o código é o que você
   acabou de colar.
3. **Permitir**.

No fim aparece a **URL do app da Web**, terminada em `/exec`. Copie.
Cole no navegador para conferir: deve responder `{"success":true,"message":"Endpoint de leads ativo."}`.

## Passo 5 — Ligar o site ao script

A URL `/exec` e o `TOKEN` ficam em [`src/data/lead-form.ts`](../src/data/lead-form.ts),
no código do site. Basta editar as duas constantes do fim do arquivo e gerar a build:

```sh
npm run build
```

**Não coloque esses valores em variável de ambiente do Easypanel.** O site é estático e a
build roda dentro do Docker: variável do painel é de *runtime do contêiner* e não chega à
build, então o site sobe com o formulário desligado, sem erro nenhum aparecer no deploy.
Foi o que aconteceu na primeira publicação.

Guardar a URL e o token no código não perde sigilo: os dois já são entregues em texto
claro no JavaScript de qualquer visitante. O token é filtro anti-robô, não senha.

Se precisar apontar a um script de teste sem mexer no código, passe como *build arg*:

```sh
docker build --build-arg PUBLIC_LEAD_ENDPOINT=... --build-arg PUBLIC_LEAD_TOKEN=... .
```

O `Dockerfile` também verifica, ao fim da build, se o endpoint está presente no HTML —
uma build sem destino de lead falha em vez de ir para produção desligada.

## Passo 6 — Testar

1. Abra o site publicado em `/?gclid=TESTE_MANUAL_123`.
2. Preencha o formulário na seção Contato e envie.
3. Esperado, em menos de 1 minuto:
   - o navegador vai para `/obrigado`;
   - uma linha nova aparece na aba **Leads** da planilha;
   - o e-mail chega com os dados e o botão **Responder no WhatsApp**;
   - a coluna **gclid** mostra `TESTE_MANUAL_123`.

Se algo falhar, o site mostra a mensagem de erro e o link do WhatsApp — nenhum visitante
fica sem caminho de contato.

---

## Quando mexer no script depois

**Editar o código não muda o que está no ar.** É preciso publicar de novo:

**Implantar → Gerenciar implantações → ✏️ (editar) → Versão: Nova versão → Implantar**

Isso mantém a **mesma URL**. Se você usar "Nova implantação", sai uma URL diferente e o site
para de entregar até você atualizar `leadEndpoint` em `src/data/lead-form.ts` e refazer a build.

## Limites e diagnóstico

- **E-mails por dia**: 100 numa conta Gmail comum, 1.500 numa conta Google Workspace.
  Acima disso o e-mail para, mas **a linha continua sendo gravada na planilha** — nenhum
  lead se perde.
- **Erros**: no editor do Apps Script, menu lateral **Execuções**, mostra cada chamada e a
  mensagem de erro.
- **Spam**: o formulário tem campo-armadilha invisível e o `TOKEN`. Se começar a entrar lixo,
  troque o `TOKEN` no script (republicando como "Nova versão") e `leadToken` em
  `src/data/lead-form.ts`, e refaça a build.

## Por que o envio usa `text/plain`

Detalhe técnico, caso alguém mexa no código do site: o Apps Script não responde à requisição
de verificação `OPTIONS` que o navegador dispara antes de um `POST` com
`Content-Type: application/json`. Por isso [`src/scripts/lead-form.ts`](../src/scripts/lead-form.ts)
envia com `Content-Type: text/plain;charset=utf-8`. O corpo continua sendo JSON e o script lê
normalmente em `e.postData.contents`. **Trocar esse cabeçalho para `application/json` quebra o
formulário** com erro de CORS.
