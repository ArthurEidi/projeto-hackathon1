# B58: correções da revisão de código da B52

Feito em 20/11/2026. A revisão é `docs/revisao/codigo-b52-revisao.md` (Codex #2, B55). Os 5 achados foram corrigidos: 1 bloqueio e 4 menores.

**Testes.** Os testes estão em `src/ui/produto-b58.test.tsx` (8 testes). Contra o HEAD publicado sem a B58 (`24157f1`), os 8 falham; com a B58, passam.
- Os da lógica nova falham porque `src/engine/abertura.ts` não existia.
- Os de tela falham por asserção: não havia `FalhaAula` nem `mostrarInteiro`, e a espera não tinha "Voltar à trilha".
- O bloqueio é testado com mock do import dinâmico: o importador rejeita com `TypeError: Failed to fetch dynamically imported module` e depois resolve.

**Prova no navegador.** Usei Chrome headless via CDP sobre o build de produção (`vite preview`), com o mesmo roteiro no antes (`24157f1`) e no depois (`24157f1` + B58):
- `Network.setBlockedURLs` bloqueia a URL do chunk `LessonPlayer-*.js`;
- `Fetch.requestPaused` retém os dados da aula.

Capturas e medições (`antes-medicoes.json`, `depois-medicoes.json`) em `C:\Users\mkf10\projetos\capturas-b58\`.

**Arquivos:**
- `src/engine/abertura.ts` (novo)
- `src/engine/content.ts`
- `src/App.tsx`
- `src/Home.tsx`
- `src/ui/styles.css`
- `src/ui/produto-b58.test.tsx` (novo)

Nenhum widget, conteúdo ou `src/steps/` foi tocado.

## Bloqueio: chunk do player rejeitado

**Causa.** O `React.lazy` guarda a promessa do import para sempre, e o player não tinha barreira de erro. Uma rejeição do chunk derrubava o `#root` inteiro, e nem a volta à trilha no mesmo documento recuperava.

**Correção:**
- **Carregador novo.** Saiu o `lazy`. Entrou `criarCarregadorPlayer` (`src/engine/abertura.ts`), que guarda o módulo depois que ele chega, mas **esquece a promessa rejeitada**. Assim, a nova tentativa faz um `import()` novo de verdade. Pedidos simultâneos (pré-carga e abertura) compartilham o mesmo download.
- **Falha como estado.** A falha virou estado do `App`, com a tela `FalhaAula`: título focado, "A conexão falhou no meio do caminho. Confira a internet e tente de novo.", e os botões **"Tentar de novo"** e **"Voltar à trilha"**.
- **Tentar de novo.** O botão refaz os dois downloads, dados e player.
- **Barreira de erro.** Uma Error Boundary (`BarreiraAula`) envolve o player. Um erro ao desenhar a aula mostra a mesma tela, com o texto "Algo deu errado ao mostrar esta aula", sem derrubar o app.
- **Falha só nos dados.** O B55 notou que essa tela mostrava o caminho interno `content/…/aula-01.json`. Agora `loadLesson` marca `rede: true` e diz "Não foi possível baixar a aula. Confira a conexão e tente de novo.", e o App mostra a mesma tela com "Tentar de novo". Conteúdo inválido continua na tela "Não foi possível abrir a aula", sem botão de tentar.

Link direto para Função Quadrática, com o chunk do player bloqueado:

| | Antes | Depois |
|---|---|---|
| Tela | **`#root` sem filhos** + `TypeError: Failed to fetch dynamically imported module` | "Não foi possível abrir a aula", com **Tentar de novo** e **Voltar à trilha**; foco no título; status anunciado; 0 exceções |
| Desbloquear + "Tentar de novo" | — (não há botão) | **1 novo pedido do chunk**, e a aula abre com o gráfico (foco em "Aula: A Reta que Dobra") |
| "Voltar à trilha", desbloquear e tocar na Aula 01 | — (em branco) | trilha navegável; a aula abre com o widget |

Capturas: `antes-` e `depois-1a-player-bloqueado.png`, `depois-1b-tentar-de-novo.png`.

## Primeira abertura sem pré-carga

**Causa.** O componente `lazy` só era renderizado depois que o JSON chegava, e por isso o player esperava os dados.

**Correção.** Ao confirmar uma rota de aula, `iniciarAbertura` pede **o player e os dados juntos** (o player primeiro, por ser o maior).

**Teste no navegador.** O callback ocioso foi desligado, e o JSON da aula ficou retido via `Fetch`:

| Situação | Antes | Depois |
|---|---|---|
| Pedidos do player com os dados retidos | **0** | **1** |

## Rede lenta e economia de dados

**Correção.** A pré-carga ociosa saiu do `App` para `agendarPreCarga` / `usePreCargaPlayer(rota é a trilha)`:
- **Onde roda:** só na trilha. Sair da trilha cancela o agendamento.
- **Quando é pulada:**
  - `navigator.connection.saveData`;
  - `effectiveType` `slow-2g`, `2g` ou `3g`;
  - `navigator.onLine === false`;
  - ausência de `navigator`.
- **Na hora de baixar:** a rede é conferida de novo quando o navegador fica ocioso.
- **Abertura de aula:** continua sob demanda em qualquer perfil.

Teste no navegador, com 6 s parado na tela, sem interação:

| Cenário | Antes | Depois |
|---|---|---|
| Trilha, rede boa | 1 pedido do player | 1 pedido (pré-carga mantida) |
| Trilha, economia de dados | 1 | **0** |
| Trilha, `effectiveType = 3g` | 1 | **0** |
| Trilha, offline | 1 | **0** |
| Rota de aula inexistente | 1 | **0** |

## Foco recortado nas matérias

**Causa.** O Chrome não rola uma matéria parcialmente visível ao receber foco por Tab. Quando rolava, o `scroll-snap` da faixa puxava de volta para um ponto que cortava o botão.

**Correção:**
- `onFocus` chama `mostrarInteiro`, que faz `scrollIntoView({ inline: "nearest", block: "nearest" })`.
- `.materia` ganhou `scroll-margin-inline: 8px`, folga para o contorno.
- O encaixe desliga com o foco dentro da faixa (`.materias:focus-within { scroll-snap-type: none }`). Deslizando com o dedo, o encaixe continua.
- Os botões nativos e os nomes acessíveis não mudaram.

Tab pelas 12 matérias com toque emulado. O botão e o contorno (6 px) foram medidos contra a faixa, 450 ms depois de cada Tab:

| Largura | Antes | Depois |
|---|---|---|
| 360 px | 5 cortadas (32 de 148 px visíveis) | **0 cortadas** |
| 400 px | 5 cortadas (72 de 148 px) | **0** |
| 430 px | 5 cortadas (102 de 148 px) | **0** |

Uma primeira versão, só com `scrollIntoView`, ainda deixava 5 cortadas em 430 px, por causa do encaixe. Por isso o encaixe desliga durante o foco. Capturas: `antes-` e `depois-4-foco-literatura-400.png`.

## Espera acessível sem saída

**Correção:**
- **Região de status persistente.** O App mantém uma região `role="status"` (`aria-live="polite"`, visível só para leitor de tela) montada em **todas** as telas, na mesma posição da árvore. A mensagem muda dentro dela: "Carregando aula…", "Não foi possível abrir a aula." ou vazia. Por existir antes, a mudança é anunciada.
- **Tela de espera.** A tela `CarregandoAula` tem o texto e o botão **"Voltar à trilha"**.
- **Foco.** Se o foco caiu no `<body>` (o botão da trilha que abriu a aula sumiu), ele vai para o texto da espera.
- **Sem piscar.** O botão existe desde o início para teclado e leitor de tela, mas só aparece na tela se a espera passar de 0,6 s. Em rede boa, a aula abre sem piscar um botão.

Teste no navegador, com os dados retidos:

| Momento | Antes | Depois |
|---|---|---|
| Foco durante a espera | `BODY` | texto "Carregando aula…" |
| Tab | `BODY` | botão "Voltar à trilha" |
| Enter | nada | volta à trilha |

Captura: `depois-2-dados-retidos.png`.

**Pendente.** O anúncio em leitor de tela real (áudio) não foi conferido; a verificação foi pela árvore do navegador, como no B55.

## Validação

Validação na cópia com a B58 (`24157f1` + os arquivos da B58):

| Comando | Resultado |
|---|---|
| `npm run typecheck` | ok |
| `npm run lint:content` | "conteúdo ok" |
| `npx vitest run` | 135 arquivos, **2.172 testes aprovados**, incluindo os 8 da B58 e os da B49 e B54 |
| `npm run build` | ok; JS inicial 438,3 kB (128,5 kB gzip), +2,7 kB pela abertura e telas novas; player 295,8 kB |
| `node scripts/varre-aulas.mjs` completo (Vite dev) | **104 aulas, 560 passos e 104 treinos, 0 problemas** |

Na árvore de trabalho real, `tsc --noEmit` passa, assim como os testes de `src/ui/` e `content.test.ts`. Ela tem mudanças de outros agentes ainda não publicadas: lá, `conteudo.test.ts` reprova as falas de `relacoes-metricas-triangulo-retangulo/aula-01.json`, que foi alterado por outro agente e não é desta frente.
