# B53 — Revisão de código da B49 parte 2

Revisei `82c7e08` e a parte 2 do [relatório da B49](../visual/produto-b49.md). Executei o commit isolado em `http://127.0.0.1:5301`, com Chrome headless, perfis descartáveis e capturas de 400 × 860 e 1280 × 800. Os quatro testes de `produto-b49.test.tsx` passaram. A comparação visual de widgets alternou a folha de estilos do commit com a do seu pai na mesma página. As 32 capturas e os dados de DOM, foco e contraste estão em [capturas-b53](../../../capturas-b53/), ao lado do repositório.

Confirmei três cenários de tela em branco. A leitura desprotegida da propriedade `localStorage` entrou na B49 parte 2. O parser de hash e a falta de validação da estrutura de progresso já existiam. O convite de vestibular passou nos quatro tamanhos testados e os sete tokens de interface passaram nos pares medidos.

## Achados

### Bloqueia a abertura da trilha quando o acesso ao armazenamento é negado

**Cenário.** Ao simular um navegador que lança `SecurityError` no getter de `window.localStorage`, a página abre em branco. Em `src/Home.tsx:26` e `:37`, os valores padrão dos parâmetros de `lerPilarInicial` e `lerAbertos` leem a propriedade antes do `try`. Até `typeof localStorage` aciona o getter nesse contexto. Negar apenas a escrita com `QuotaExceededError` permitiu mudar de pilar e abrir o setor na sessão, sem exceção. [Tela em branco](../../../capturas-b53/06-localstorage-getter-bloqueado.png) · [Dados de armazenamento](../../../capturas-b53/medicoes-storage-routes.json)

**Correção sugerida.** Resolver o `Storage` dentro do `try` e distinguir o parâmetro omitido de `null` explícito, preservando a injeção usada nos testes. Usar o fallback de memória para as duas chaves. Testar o getter que lança, `getItem` que lança e `setItem` que lança. Mover a escrita dos acordeões para fora do updater de React para que o updater permaneça puro.

### Bloqueia a abertura de um link de aula com escape inválido

**Cenário.** `#/aula/nao/%/aqui/aula-01` e `#/aula/nao/%E0%A4/aqui/aula-01` passam pela expressão regular e `decodeURIComponent` lança `URIError`. Ao abrir a URL diretamente, React fica sem tela. Ao trocar o hash com a trilha montada, a rota anterior continua na tela e o erro aparece no console. O teste existente só renderiza `AulaNaoEncontrada` com props prontas. [Tela em branco](../../../capturas-b53/09-rota-percent-tela-branca.png) · [Matriz de rotas](../../../capturas-b53/medicoes-storage-routes.json)

**Correção sugerida.** Em `src/App.tsx:29–32`, tratar falha de decodificação como endereço de aula inválido e renderizar a tela amigável. Testar carga direta e `hashchange`, incluindo escapes válidos de barras, `%` solto e UTF-8 truncado.

### Bloqueia a trilha com progresso gravado como JSON `null`

**Cenário.** Em um perfil que já dispensou as boas-vindas, `mat:progress:v1 = null` em texto JSON provoca `TypeError` em `Object.keys(progress)` e deixa a tela em branco. `src/engine/progress.ts:6–12` valida a sintaxe, mas faz cast do valor para `Progress`. O defeito já existia e afeta o fluxo de retorno auditado. [Tela em branco](../../../capturas-b53/06b-progresso-json-nulo.png) · [Dados de armazenamento](../../../capturas-b53/medicoes-storage-routes.json)

**Correção sugerida.** Validar o formato do mapa e de cada entrada antes de expor o progresso à trilha. Usar `{}` para JSON nulo, array e valor escalar. Preservar as entradas válidas quando só parte do mapa estiver corrompida.

### Atrapalha o retorno quando a trilha gravada ficou obsoleta

**Cenário.** `mat:trilha-aberta:v1 = "[]"` preserva corretamente o fechamento intencional. Já JSON `null`, chaves de setores e unidades removidos ou um array que só contém itens inválidos também fecham tudo. Com JSON malformado e `mat:pilar-ativo:v1 = algebra`, as chaves padrão são de Aritmética e nenhum acordeão do pilar ativo abre. Uma conclusão gravada para uma aula removida continua contando em `Object.keys(progress)`, então Paco diz “Continue de onde parou” mesmo com zero aulas à vista. O armazenamento guarda conclusões por chave, sem uma posição para retomar dentro da aula. Um pilar removido ou inválido volta corretamente a Aritmética. [Trilha com JSON nulo](../../../capturas-b53/04-trilha-json-nulo-fechada.png) · [Aula removida](../../../capturas-b53/05-aula-removida-saudacao-sem-destino.png)

**Correção sugerida.** Validar os IDs de acordeão na taxonomia e preservar `[]` explícito. Em estado inválido ou inteiramente obsoleto, abrir o caminho da primeira aula publicada no pilar ativo. Basear a saudação de retomada em progresso de aulas ainda publicadas. Exibir uma instrução para expandir a trilha quando o usuário tiver fechado tudo deliberadamente.

### Atrapalha a recuperação de links com variações no hash

**Cenário.** O hash canônico com aula inexistente, chave URL-encoded, chave parcial não vazia, `?passo=2` ou query antes do `#` abre a tela amigável. Uma aula cadastrada sem arquivo também abre essa tela. `#/aula`, `#/aula/`, `?passo=abc`, `?passo=2&origem=link` e `?origem=link` dentro do hash caem silenciosamente na trilha. Os controles com hash vazio e `#/` abrem a trilha como esperado. `#/nao-existe` também cai na trilha. `/aula/...` sem hash abre a trilha no fallback do Vite e está fora do formato de aula documentado para hospedagem estática. Repeti os casos principais no build de produção servido em `/dist/index.html` na mesma porta. O build ignorou `passo=2` para aula válida, exibiu a mensagem para a chave inexistente, caiu na trilha com query desconhecida e ficou em branco com `%` solto. [Tela amigável](../../../capturas-b53/07-rota-inexistente-tela-amigavel.png) · [Query descartada](../../../capturas-b53/08-rota-com-query-nao-reconhecida.png) · [Matriz de rotas](../../../capturas-b53/medicoes-storage-routes.json) · [Dados do build](../../../capturas-b53/medicoes-production.json)

**Correção sugerida.** Identificar primeiro o prefixo de aula e separar caminho da query no fragmento. Validar a chave independentemente da query. Ler `passo` com `URLSearchParams` em desenvolvimento e ignorar parâmetros desconhecidos. Encaminhar tentativa de aula sem chave para a tela amigável. Documentar o que a raiz faz com os demais hashes.

### Atrapalha a navegação ao voltar da aula pelo teclado

**Cenário.** Com todos os acordeões abertos, Tab percorreu 73 controles ativos em Aritmética, 90 em Álgebra e 103 em Geometria, incluindo Matérias e Pilares em cada percurso. Cada controle alcançado tinha indicador `:focus-visible`. Shift+Tab voltou um controle nos três pilares. Espaço fechou e Enter reabriu a unidade mantendo foco. Ao entrar na aula e ao voltar, `document.activeElement` passou a `BODY`. Na aula, o próximo Tab chegou a “Sair da aula”. Na trilha, o próximo Tab voltou a Matemática. “Voltar à trilha” na rota inexistente também retorna o foco a `BODY`. Em 400 × 860, o botão da primeira Aula 01 ficou parcialmente abaixo da borda ao receber foco, com a maior parte do contorno visível. [Foco na aula da trilha](../../../capturas-b53/10-foco-aula.png) · [Volta ao início da trilha](../../../capturas-b53/12-foco-volta-a-primeira-materia.png) · [Percurso Tab](../../../capturas-b53/medicoes-focus.json) · [Transições](../../../capturas-b53/medicoes-transitions.json) · [WCAG 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)

**Correção sugerida.** Guardar a chave de origem ao abrir uma aula e devolver o foco ao botão correspondente, com acordeões e rolagem restaurados. Se a chave deixar de existir ou a rota não tiver origem na trilha, focar o título da trilha. Na entrada da aula ou da tela de rota inválida, posicionar o foco em um alvo de início significativo. Dar folga de rolagem aos botões para expor o contorno por inteiro.

### Atrapalha a leitura de estados e dos rótulos da aula com baixo contraste

**Cenário.** Os sete tokens `--ui-*` atingem AA nos pares medidos abaixo. A revisão dos estados exibidos encontrou estes casos fora dos tokens.

| Elemento observado | Par | Contraste | Mínimo aplicável |
| --- | --- | --- | --- |
| Check que indica aula concluída | `#FFFFFF` / `#FFC21A` | **1,62:1** | 3:1 para informação gráfica |
| Nome “Raio” na dica de Cones (14 px) | `#F28C00` / `#FFFFFF` | **2,46:1** | 4,5:1 |
| Expoente de `h²` em Cones (15,4 px) | `#1C8BE0` / `#FFFFFF` | **3,61:1** | 4,5:1 |
| Rótulo “trapézio” selecionado em Sólidos de revolução (14 px) | `#FFFFFF` / `#1C8BE0` | **3,61:1** | 4,5:1 |

O check fica em SVG com `aria-hidden` e o nome do botão só informa número e título da aula. A condição de conclusão não é anunciada no nome nem na descrição acessível. Esses pares já existiam no CSS pai. [Aula concluída](../../../capturas-b53/16-check-aula-amarelo.png) · [Dica de raio e fórmula](../../../capturas-b53/18b-tooltip-raio-contraste.png) · [Widget de sólidos](../../../capturas-b53/19-widget-revolucao-atual.png) · [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

**Correção sugerida.** Usar um check escuro sobre o amarelo e acrescentar “concluída” à descrição ou ao nome acessível. Aplicar tons escuros aos nomes de dicas, expoentes e texto de chaves de widget com contraste insuficiente, mantendo os tons semânticos das figuras.

## Verificações que passaram

- **Primeira visita e persistência.** Sem chaves gravadas, a trilha abre em Aritmética, com Conjuntos e sua primeira unidade expandidos. Em 400 × 860 o botão da Aula 01 aparece depois de rolar a grade de matérias, conforme o detalhe D1 da B49. Após escolher Álgebra e expandir Funções e Introdução às Funções, uma nova carga da página manteve o pilar e as expansões. Um progresso válido nessa unidade reapareceu com check. [Antes da rolagem](../../../capturas-b53/02b-primeira-visita-antes-da-rolagem.png) · [Primeira aula](../../../capturas-b53/02-primeira-visita-aula-exposta.png) · [Retorno com progresso](../../../capturas-b53/03-visita-seguinte-algebra-e-check.png)
- **Treino.** Completei as sete perguntas básicas e os cinco desafios em quatro aulas do commit. Quartis, Percentis e Boxplot, com zero questões oficiais, terminou com “Voltar à trilha” e “Refazer estas perguntas”, sem convite de vestibular. Valor Absoluto e Distância mostrou singular e abriu “Vestibular 1 de 1”. Sistemas Numéricos e Divisibilidade e Princípio Fundamental da Contagem mostraram plural e abriram “1 de 3” e “1 de 4”. O schema exige sete perguntas básicas, então um convite básico com zero perguntas não é alcançável por conteúdo válido. [Zero](../../../capturas-b53/14-convite-vestibular-0.png) · [Uma](../../../capturas-b53/14-convite-vestibular-1.png) · [Três](../../../capturas-b53/14-convite-vestibular-3.png) · [Quatro](../../../capturas-b53/14-convite-vestibular-4.png) · [Dados do treino](../../../capturas-b53/medicoes-training.json)
- **Cores dos widgets.** `palette.ts`, as variáveis originais e o código de widgets não mudaram no commit. As quatro implementações de chave com `.btn` fixam `--c`, `--c-dark` e `--c-text` por estilo inline. Em Sólidos de revolução, as quatro chaves mantiveram exatamente as mesmas cores computadas e o canvas de 429 × 386 manteve o checksum de pixels `2252850795` com o CSS atual e o CSS pai. Em Cones, o texto do botão de raio fora do canvas mudou de `#F28C00` para `#A85E00`, como previsto em A5. Não observei mudança involuntária nos rótulos do widget amostrado. [Cones antes](../../../capturas-b53/18-formula-cones-css-pai.png) · [Cones depois](../../../capturas-b53/17-formula-cones-atual.png) · [Widget com CSS pai](../../../capturas-b53/20-widget-revolucao-css-pai.png) · [Medições](../../../capturas-b53/medicoes-contrast.json)

## Contraste dos tokens

Calculei as razões com luminância relativa sRGB, a partir dos valores computados no Chromium. Todos os pares abaixo passam o corte de 4,5:1 para texto comum. Verde e vermelho escuros também foram medidos contra branco para as bordas dos botões. O contorno de teclado azul dos acordeões mediu 3,61:1 contra branco e 3,37:1 contra `#F7F7F7`. O preto dos demais contornos mediu 17,22:1 contra branco. [Dados de contraste](../../../capturas-b53/medicoes-contrast.json) · [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

| Token | Cor | Par medido | Razão |
| --- | --- | --- | --- |
| `--ui-muted` | `#666666` | branco / `#F7F7F7` | 5,74:1 / 5,36:1 |
| `--ui-green` | `#2E7D0A` | texto branco do botão primário | 5,18:1 |
| `--ui-green-dark` | `#215C06` | `#DDF5CC` no feedback / branco | 6,93:1 / 8,08:1 |
| `--ui-red` | `#C82327` | branco da variante de perigo no CSS | 5,64:1 |
| `--ui-red-dark` | `#9B1B1E` | branco | 8,17:1 |
| `--ui-yellow-text` | `#8C6200` | branco | 5,44:1 |
| `--ui-orange-text` | `#A85E00` | branco, em ambos os estados da ficha | 4,92:1 |
