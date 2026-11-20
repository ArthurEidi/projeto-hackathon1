# B54: correções da revisão de código da B49 parte 2

Feito em 20/11/2026. A revisão é `docs/revisao/codigo-b49-revisao.md` (Codex #2, B53). Os 7 achados foram corrigidos: 3 telas em branco e 4 que atrapalham.

Cada achado tem teste em `src/ui/produto-b54.test.tsx`, com 16 testes ao todo. Rodado contra o HEAD publicado sem a B54 (`ee0716d`), o arquivo dá **16 de 16 falhando, cada um pelo defeito do achado**:
- `SecurityError`;
- `URIError: URI malformed`;
- `expected null to deeply equal {}`;
- a saudação "Continue de onde parou" com aula removida;
- a falta de `data-aula`, e assim por diante.

Com a B54, os 16 passam. Os módulos e funções novos entram por import dinâmico, para cada teste falhar sozinho no código antigo.

A verificação no navegador usa Chrome headless em `400 × 860`, com perfis descartáveis e o mesmo roteiro nas duas versões. Ela comparou o build de `ee0716d` com o de `ee0716d` + B54. As capturas e as medições (`antes-medicoes.json`, `depois-medicoes.json`) estão em `C:\Users\mkf10\projetos\capturas-b54\`.

**Arquivos:**
- `src/engine/armazenamento.ts` (novo)
- `src/engine/rota.ts` (novo)
- `src/engine/progress.ts`
- `src/engine/LessonPlayer.tsx`
- `src/App.tsx`
- `src/Home.tsx`
- `src/ui/styles.css`
- `src/ui/produto-b54.test.tsx` (novo)

Nenhum widget, conteúdo ou `src/steps/` foi tocado. As chaves dos widgets foram corrigidas só pelo CSS.

## Achado 1: armazenamento negado (tela em branco)

**Causa.** Os valores padrão de `lerPilarInicial` e `lerAbertos` liam `localStorage` fora do `try`. Quando até ler a propriedade lança, a trilha ficava em branco.

**Correção:** um módulo novo, `src/engine/armazenamento.ts`.
- O `Storage` é resolvido **dentro** do `try`, a cada acesso. Isso cobre o getter da propriedade, `getItem` e `setItem`.
- Tudo o que se grava também fica numa reserva em memória. Sem armazenamento, pilar, acordeões e progresso valem para a visita: concluir uma aula e voltar mostra o check.
- A injeção dos testes foi preservada. Parâmetro omitido usa o armazenamento do app; `null` explícito significa "sem armazenamento".
- A gravação dos acordeões saiu do updater do React, que voltou a ser puro.

| Navegador com o getter de `localStorage` que lança | Antes | Depois |
|---|---|---|
| Abrir a trilha | **em branco** (`SecurityError`) | trilha, com Conjuntos e a 1ª unidade abertos |
| Escolher Álgebra e abrir um setor na mesma visita | — | funciona; 0 exceções |

Capturas: `antes-` e `depois-a1-storage-bloqueado-400.png`.

## Achado 2: link de aula com escape inválido (tela em branco)

**Causa.** `decodeURIComponent` lançava `URIError` com `%` solto ou UTF-8 truncado.

**Correção:** o parser novo `src/engine/rota.ts` (`lerRota`) nunca lança. Escape inválido vira "aula inválida", e o App mostra a tela amigável. O mesmo parser atende a carga direta e o `hashchange`.

| Rota | Antes (carga direta / `hashchange`) | Depois (as duas) |
|---|---|---|
| `#/aula/nao/%/aqui/aula-01` | **em branco** / fica na tela anterior + `URIError` | "Aula não encontrada" |
| `#/aula/nao/%E0%A4/aqui/aula-01` | **em branco** / idem | "Aula não encontrada" |
| `#/aula/<chave com %2F>` (escape válido) | aula | aula |

Capturas: `antes-` e `depois-a2-rota-percent-400.png`.

## Achado 3: progresso gravado como JSON `null` (tela em branco)

**Causa.** `getProgress` fazia cast do JSON sem validar. Com `null`, `Object.keys(progress)` lançava `TypeError`.

**Correção:** `normalizarProgresso` aceita só um objeto cujas entradas tenham a forma `{ completedAt: string }`.
- `null`, array, número, texto, booleano e JSON malformado viram `{}`.
- Num mapa parcialmente corrompido, as entradas válidas são preservadas.

Antes: **em branco** (`TypeError: Cannot convert undefined or null to object`). Depois: trilha com "Comece pela primeira aula da trilha". Capturas: `antes-` e `depois-a3-progresso-null-400.png`.

## Achado 4: trilha gravada obsoleta

`lerAbertos` passou a validar cada chave de acordeão na taxonomia atual.

| Valor gravado | Antes | Depois |
|---|---|---|
| `[]` (aluno fechou tudo) | tudo fechado, sem orientação | tudo fechado + "Toque num setor para ver as unidades e as aulas." |
| `null` | tudo fechado | Conjuntos + 1ª unidade abertos (caminho da 1ª aula publicada) |
| Só chaves de setores ou unidades removidos | tudo fechado | idem: caminho da 1ª aula |
| Lista mista (válidas + removidas) | mantinha as removidas | mantém só as válidas |
| `{` (malformado) com pilar salvo Álgebra | abria chaves de Aritmética: nada aberto em Álgebra | Funções + Introdução às Funções abertos |

- O padrão agora é o caminho da **primeira aula publicada do pilar ativo** (`chavesPrimeiraAula(pilarId)`).
- **Saudação de retomada:** só conta conclusões de aulas ainda publicadas (`temProgressoPublicado`). Com só uma aula removida no progresso, o Paco diz "Comece pela primeira aula da trilha", e não mais "Continue de onde parou".
- **Pilar removido ou inválido:** continua voltando a Aritmética, como já fazia.

Capturas: `depois-a4-fechou_tudo-400.png` e `antes-`/`depois-a4-malformado_algebra-400.png`.

## Achado 5: variações do hash

`lerRota` agora:
- identifica primeiro o prefixo de aula;
- separa o caminho da query dentro do fragmento;
- lê `passo` com `URLSearchParams`, só em desenvolvimento e só com inteiro ≥ 1;
- ignora parâmetros desconhecidos;
- aceita barra no fim.

| Rota (carga direta) | Antes | Depois |
|---|---|---|
| `#/aula`, `#/aula/` | trilha, em silêncio | "Aula não encontrada" |
| `#/aula/<aula>?origem=link` | trilha, em silêncio | abre a aula |
| `#/aula/<aula>?passo=abc` | trilha, em silêncio | abre a aula (passo ignorado) |
| `#/aula/<aula>?passo=2&origem=link` (dev) | trilha | aula no passo 2 |
| `#/`, vazio | trilha | trilha |
| `#/nao-existe` | trilha | trilha (documentado) |

**O que a raiz faz com os demais hashes** (documentado em `src/engine/rota.ts`):
- vazio, `#/` ou qualquer hash que não comece por `#/aula` abrem a trilha;
- tudo o que começa por `#/aula` é tentativa de aula: abre a aula ou a tela amigável.

O caso `/aula/...` sem `#` segue fora do formato documentado para hospedagem estática.

## Achado 6: foco ao entrar e ao voltar da aula

**Ao abrir uma aula pela trilha:**
- o `App` guarda a chave de origem, e a trilha guarda a rolagem;
- na volta, pelo "X", pelo botão voltar do navegador ou pelo fim do treino, a trilha restaura a rolagem e devolve o foco ao botão daquela aula.

**Quando não há para onde voltar:** se a aula não veio da trilha (link direto, rota inválida) ou se o botão não existe mais, o foco vai ao título "Trilha". Na primeira carga da página, o foco não é movido.

**Ao entrar numa aula:** o foco vai para um título "Aula: <título>", visível só para leitor de tela, entre o cabeçalho e o passo. O próximo Tab chega ao primeiro controle do passo, e Shift+Tab chega a "Sair da aula". Isso foi feito no `LessonPlayer`, porque o passo fica em `src/steps/`, fora desta frente.

**Na tela de rota inválida:** o foco vai ao título, e o próximo Tab chega a "Voltar à trilha".

**Folga de rolagem:** `.node__btn` tem `scroll-margin-block: 16px` e a trilha tem `scroll-padding-block: 16px`. Ao receber foco, o contorno aparece inteiro.

Percurso só com teclado (Tab, Enter, Shift+Tab, Enter) no build:

| Momento | Antes (`document.activeElement`) | Depois |
|---|---|---|
| Entrar na aula | `BODY` | título da aula (só para leitor de tela) |
| Shift+Tab na aula | `BODY` | "Sair da aula" |
| Voltar à trilha | `BODY` | botão "Aula 1: … " de onde saiu |
| Voltar com a trilha rolada 150 px | `BODY` | rolagem 150 px restaurada, foco no botão |
| Rota inválida | `BODY` | título "Aula não encontrada" |
| "Voltar à trilha" da rota inválida | `BODY` | título "Trilha" |

Captura com o anel de foco na volta: `depois-a6-foco-na-volta-400.png`.

## Achado 7: contraste de estados e rótulos

Valores computados pela folha de estilos do build:

| Elemento | Antes | Depois |
|---|---|---|
| Check da aula concluída (gráfico, mínimo 3:1) | branco sobre `#FFC21A`: **1,62:1** | `#1B1B1B` (ink) sobre o amarelo: **10,65:1** |
| Nome acessível da aula concluída | "Aula 1: …" | "Aula 1: … (concluída)" |
| Nome "Raio" na dica (14 px) | `#F28C00`: **2,46:1** | `#A85E00` (`--ui-orange-text`): **4,92:1** |
| Nome "Altura" na dica (14 px) | `#1C8BE0`: **3,61:1** | `#136AAD` (`--h-dark`): **5,69:1** |
| Expoente de `h²` na fórmula, desligado (~15 px) | 3,61:1 | 5,69:1 |
| Expoente de `h²` na fórmula, ligado | 3,61:1 | 5,69:1 |
| Chave azul ligada de widget ("trapézio", 14 px) | branco sobre `#1C8BE0`: **3,61:1** | branco sobre `#14619D`: **6,51:1** |
| Chave laranja ligada de widget | branco sobre `#F28C00`: **2,46:1** | branco sobre `#A96200`: **4,74:1** |

- **Dica:** a borda mantém a cor da marca; só o nome usa o tom escuro (variável `--dica-texto`).
- **Fórmula:** azul ligado e desligado usam `--h-dark`, seguindo a mesma solução que a B49 já usava para o laranja.
- **Chaves dos widgets:** as cores chegam por estilo inline, e o código dos widgets não foi tocado. O CSS escurece o fundo da chave **ligada** para 70% do tom com `color-mix`, mantendo o matiz da figura. A regra pega só `.btn` sem variante e com `aria-pressed="true"`, que são as quatro implementações de chave. Os botões da fórmula têm variante e ficam de fora.
- **Cores que passam 4,5:1:** com esse escurecimento, todas as cores usadas por chaves passam: azul 6,51, laranja 4,74, rosa 7,94, violeta 8,81, cinza-escuro 12,27. O canvas não muda.

Capturas: `antes-`/`depois-a7-chave-trapezio-400.png` (Sólidos de revolução) e `antes-`/`depois-a7-aula-concluida-400.png`.

## Validação

Validação na cópia com a B54 (`ee0716d` + os arquivos da B54):

| Comando | Resultado |
|---|---|
| `npm run typecheck` | ok |
| `npm run lint:content` | "conteúdo ok" |
| `npx vitest run` | 134 arquivos, **2.162 testes aprovados**, incluindo os 16 da B54 e os 4 da B49 |
| `npm run build` | ok; JS inicial 435,6 kB (127,7 kB gzip), praticamente igual à B52 |
| `node scripts/varre-aulas.mjs` completo (Vite dev) | **104 aulas, 560 passos e 104 treinos, 0 problemas** |

Na árvore de trabalho real, que tem mudanças de outros agentes ainda não publicadas, `tsc --noEmit` também passa, assim como os testes de `src/ui/`.
