# Registro B33d — `sistema_escalonado` + `sistema_escalonado_figura`

**Capítulo:** `algebra/matrizes-e-sistemas/sistemas-lineares-e-escalonamento`
**Pasta do widget:** `src/widgets/common/escalonado/` (`params.ts`, `calc.ts`, `desenho.ts`, `SistemaEscalonadoWidget.tsx`, `SistemaEscalonadoFigura.tsx`, `escalonado.test.ts`)
**Registro compartilhado:** `src/widgets/common/index.ts` (import + `sistema_escalonado`, `sistema_escalonado_figura`) e `src/widgets/common/params.ts` (`...escalonado.widgetParams`, `...escalonado.figureParams`)
**Aula e teste:** `content/.../sistemas-lineares-e-escalonamento/aula-01.json`, `src/conteudo/sistemas-lineares-e-escalonamento.test.ts`

Trabalho começado em 17/11 e interrompido pelo crash; retomado e fechado em 19/11 (B37).

## O que foi feito por passo

- **Passo 1 (`caso-neutro`):** sem mudança. O roteiro pede `plano_cartesiano` (arrastar até o encontro (1; 2)).
- **Passo 2 (`eliminar-linha`):** `plano_cartesiano` (três retas fixas) trocado por `sistema_escalonado` no modo `eliminar`: matriz `[[1, 1 | 3], [2, 1 | 4]]`, `operacao: { alvo: 1, base: 0, k: "$k" }`, plano `x ∈ [−2; 5]`, `y ∈ [−2; 6]`. Slider `k` (0..2, passo 1, inicial 0, c2). `complete_when` passou de `k ≥ 2` para `zerou ≥ 1` (só `k = 2` zera o x de L₂; o teste confere `zerou` = 0, 0, 1 para k = 0, 1, 2).
- **Passo 3 (`subir-tres-linhas`):** `plano_cartesiano` (adaptação em 2D de y + z = 2) trocado por `sistema_escalonado` no modo `substituir`: `[[1, 1, 1 | 3], [0, 1, 1 | 2], [0, 0, 1 | "$t"]]`, tabela de baixo para cima, sem plano 3D (como pede o roteiro). Slider `t` (0..1). `complete_when` mantido `t ≥ 1`.
- **Passo 4 (`classificar-linha`):** trocado por `sistema_escalonado` modo `eliminar`: `[[1, 1 | 2], [2, 2 | "4+$t"]]`, `k = 2` fixo, plano. `complete_when` passou de `t ≥ 1` para `impossivel ≥ 1` (mesma condição, agora medida na matriz).
- **Passo 5 (`conferir-previsao`):** figura `sistema_escalonado_figura` com `[[1, 1 | 2], [2, 2 | 5]]`, `k = 2`, `mostrar.classificacao: false` (a linha 0 = 1 aparece, mas o chip "impossível" só aparece no acerto). Figuras por opção: "Infinitas" mostra o caso 2x + 2y = 4 (0 = 0, retas coincidentes), "Uma" testa o ponto (3; 2), "Duas" testa (1; 1) (vale em L₁, falha em 0 = 1), "Nenhuma" acende c3 e c4 com a classificação.
- **Passo 6 (`fechamento`):** figura `sistema_escalonado_figura` com `[[1, 1 | 3], [2, 1 | 4]]`, `k = 2`: −y = −2, pivôs 1 e −1 em c4, solução (1; 2) em c1.
- **Não usei `antes_de_concluir`:** em nenhum passo interativo a figura inicial mostra a resposta da pergunta. Passo 2: o (1; 2) é a referência do passo 1 e a pergunta é se ele *se mantém*; passo 3: em t = 0 a tabela mostra (1; 2; 0), os valores para z = 1 só surgem com o próprio gesto que conclui; passo 4: em t = 0 o chip diz "0 = 0: y livre, infinitas", o "impossível" só surge em t = 1.

## Correções de 19/11 (depois de abrir as capturas de 17/11)

1. **Rótulo "L₂ antes" fora do quadro ou sobre a borda** (capturas antigas p4, p5, p5-infinitas: o rótulo ficava à esquerda do plano, fora da grade; p4-t=1, p5, p6: pousava na borda de baixo). Causa: os candidatos ao longo da reta só exigiam que o *ponto de âncora* estivesse no quadro, e a 2ª passada de `escolherPosicao` aceita caixa fora dos limites. Correção em `desenho.ts` (`desenharPlano`): para o rótulo "antes" (fundo opaco), escolho entre candidatos com a caixa inteira dentro do quadro (ou presos a ele) o de menor custo: colisão com rótulo 100, cruzar outra reta 2, cruzar a própria reta 1 (função nova `cruzaCaixa`, amostra o segmento a cada ~2 px). Assim o fundo branco não apaga trecho de outra reta (antes, em p2 k = 1, cortava a reta x = 1; numa tentativa intermediária cortava L₁ em p4 t = 1). Os chips L₁/L₂ ficaram com a escolha de antes (testei estendê-la a eles: o L₂ do passo 2 caiu em cima de L₁, pior; desfiz).
2. **Fórmula do fechamento:** "0 = c: impossível" virou "0 = c ≠ 0: impossível" (o roteiro diz `0=c≠0`; sem o "≠ 0" a regra inclui 0 = 0, que é o caso livre). Teste novo no `fechamento` cobra o texto.
3. Apagadas 4 capturas velhas `p5-<opção>.png` sem o "Verificar" (17/11), substituídas pelas `p5-<opção>-verificar.png`.

## Contas (executadas em `escalonado.test.ts` e `sistemas-lineares-e-escalonamento.test.ts`, 21 testes)

- Passo 2: L₂ − 2·L₁ = [2 − 2, 1 − 2 | 4 − 6] = [0, −1 | −2] ⇒ −y = −2 ⇒ y = 2; x = 3 − 2 = 1. Com k = 1: [1, 0 | 1] (x = 1, ainda dois pivôs na coluna de x, `escalonada = 0`). Para k = 0, 1, 2 `classificar(...).solucao` = [1, 2] (a solução não muda).
- Passo 3: t = 0 ⇒ z = 0, y = 2 − 0 = 2, x = 3 − 2 − 0 = 1; t = 1 ⇒ z = 1, y = 2 − 1 = 1, x = 3 − 1 − 1 = 1 (fórmulas "x = 3 − y − z", "y = 2 − z", "z = 1"). Dúvida da Tati: última linha 0 = 0 ⇒ z livre, y = 2 − z, x = 3 − (2 − z) − z = 1 (testado para z = −1; 0; 2,5).
- Passo 4: t = 0 ⇒ [2 − 2, 2 − 2 | 4 − 4] = [0, 0 | 0] ⇒ 0 = 0, infinitas (`livres = 1`, `impossivel = 0`); t = 1 ⇒ [0, 0 | 5 − 4] = 0 = 1, impossível (`impossivel = 1`).
- Passo 5: (3; 2) em L₁: 3 + 2 = 5 ≠ 2; em L₂: 0 ≠ 1. (1; 1) em L₁: 1 + 1 = 2 = 2; em L₂: 0 ≠ 1. Opção "Infinitas": 2x + 2y = 4 − 2·(x + y = 2) = 0 = 0.
- Passo 6: o mesmo do passo 2 com k = 2: [0, −1 | −2], solução (1; 2).
- Validação de 19/11: `npm run typecheck` sem erros; `npx vitest run` 132 arquivos, 2083 testes passando; `npm run lint:content` "conteúdo ok".

## Capturas (`C:\Users\mkf10\projetos\capturas-b33d`, refeitas em 19/11, todas abertas e conferidas; `scrollWidth 400` em todas as de slider/clique)

| Arquivo | Estado | O que a imagem mostra |
|---|---|---|
| `…-p2.png` | inicial, k = 0 | `← L₂ − 0·L₁`, "Dois pivôs na coluna de x", retas x + y = 3 e 2x + y = 4 com o encontro (1; 2) |
| `…-p2-k=1.png` | intermediário | linha [1, 0 \| 1], reta x = 1 em c4, "L₂ antes" sobre a própria reta tracejada, sem cortar x = 1 |
| `…-p2-k=2.png` | concluído | [0, −1 \| −2], −y = −2, chip "Um pivô por incógnita: única (1; 2)", reta y = 2, fala de conclusão |
| `…-p3.png` | inicial, t = 0 | tabela z = 0, y = 2 − z = 2 − 0, x = 3 − y − z = 3 − 2 − 0, chips z = 0, y = 2, x = 1 |
| `…-p3-t=1.png` | concluído | z = 1, y = 2 − 1, x = 3 − 1 − 1, chips 1, 1, 1, fala de conclusão |
| `…-p4.png` | inicial, t = 0 | linha 0 0 \| 0, "0 = 0: y livre, infinitas", retas coincidentes, "L₂ antes" dentro do quadro |
| `…-p4-t=1.png` | concluído | 0 0 \| 1 (o 1 em c4), "0 = 1: impossível", paralelas, "L₂ antes" junto da tracejada sem cortar L₁ |
| `…-p5.png` | inicial | 0 = 1 escrito, sem chip de classificação, 4 opções |
| `…-p5-nenhuma-verificar.png` | acerto | chip "0 = 1: impossível", L₁ destacada, "Certo: Nenhuma; Zero nunca é igual a 1." |
| `…-p5-infinitas-verificar.png` | erro | figura 0 = 0 (retas coincidentes), feedback "Infinitas apareceria com 0 = 0…" |
| `…-p5-uma-verificar.png` | erro | ponto (3; 2), "L₁ dá 5 ≠ 2; L₂ dá 0 ≠ 1" |
| `…-p5-duas-verificar.png` | erro | ponto (1; 1), "L₁ dá 2 = 2; L₂ dá 0 ≠ 1" |
| `…-p6.png` | fechamento | −y = −2, (1; 2), fórmula com "0 = c ≠ 0: impossível" |

Nada cortado ou sobreposto em 400 px. Observação fora da frente: no `concept_lock`, o chip da fórmula "L₂" aparece como "L ₂" (o renderizador da fórmula separa o subscrito); é do componente de fórmula, não do widget.

Fora dos meus arquivos (não editei): `docs/entregas/sistemas-lineares-e-escalonamento.md` ainda descreve a adaptação com `plano_cartesiano` nos passos 2 a 6.

---

## Seção pronta para colar no `docs/GUIA-CAPITULOS.md`

````markdown
### 5.x `sistema_escalonado` + `sistema_escalonado_figura`

Pasta `common/escalonado/`: matriz aumentada de um sistema 2×2 ou 3×3 (2 ou 3 linhas; 2 ou 3 incógnitas), com chips Lᵢ, barra antes do termo independente e anel `c4` no pivô de cada linha. `sistema_escalonado_figura` exige números (recusa `"$slider"` em `linhas` e em `operacao`). Aceita `highlight`.

- **Comuns:** `linhas` (2..3 linhas; cada uma com os coeficientes e, por último, o termo independente; números ou expressões com `$slider`, ex.: `"4+$t"`; todas do mesmo tamanho), `incognitas?` (padrão `x, y, z`), `cores` (cor do chip/reta de cada linha, padrão `["c3", "ink", "ink"]`), `mostrar: { pivos, classificacao, solucao, equacoes }` (todos `true` por padrão; para esconder um, repita o objeto inteiro), `ponto?` (coordenadas testadas: rodapé "Em (3; 2): L₁ dá 5 ≠ 2; L₂ dá 0 ≠ 1" e, com plano, um anel `c1`).
- **`eliminar`**: aplica `Lalvo ← Lalvo − k·Lbase`. `operacao: { alvo (padrão 1), base (padrão 0), k (padrão 0; aceita "$k") }`, `cor_nova` (cor da linha nova, padrão `c4`), `plano?: { x: [mín, máx], y: [mín, máx] }` (só com 2 incógnitas; sem `plano`, só a matriz). No plano, a reta original vira fantasma tracejada "L₂ antes"; se a linha nova vira 0 = c (sem reta), a original é desenhada tracejada na própria cor. Rodapés: equações por extenso (`c3`), classificação ("Dois pivôs na coluna de x" em `muted` enquanto não está escalonada; depois chip `c4` "Um pivô por incógnita: única (1; 2)", "0 = 0: y livre, infinitas" ou "0 = 1: impossível"). Solução única em `c1` (chip e ponto); `mostrar.solucao: false` esconde os dois.
- **`substituir`**: sistema já escalonado (com coeficientes numéricos, o schema recusa o que não está em escada; com slider num coeficiente que tire da escada, a tabela vira o aviso "Escalone antes de substituir"). Tabela de baixo para cima com a fórmula (`c3`, ex.: "y = 2 − z"), a conta com os valores achados (`muted`, "= 2 − 1") e o valor (chip `c1`, ou "y = ?" com `mostrar.solucao: false`). Incógnita sem pivô aparece como "z livre"; o que depende dela é propagado como expressão: com x + y + z = 3, y + z = 2 e 0 = 0, a tabela mostra "x = 3 − y − z = 3 − (2 − z) − z" e o chip "x = 1". Linha 0 = c aparece como "0 = 1". Sem plano 3D. A altura do canvas comporta todas as linhas da tabela (equações + livres).

```json
{"modo":"eliminar","linhas":[[1,1,3],[2,1,4]],"operacao":{"alvo":1,"base":0,"k":"$k"},"plano":{"x":[-2,5],"y":[-2,6]}}
```
```json
{"modo":"substituir","linhas":[[1,1,1,3],[0,1,1,2],[0,0,1,"$t"]]}
```

Métricas: `k` (multiplicador em uso; 0 no `substituir`), `zerou` (1 se a linha alvo ficou com 0 na coluna do pivô da base), `escalonada` (1 se cada pivô está à direita do de cima e linhas nulas embaixo), `unica`, `impossivel` (0/1), `livres` (número de incógnitas sem pivô; 0 se impossível). O valor de outros sliders (`t`) vem do próprio controle. Cores: solução `c1`, multiplicador `c2` (chip `← L₂ − 2·L₁`), equações `c3`, pivôs e classificação `c4`.

Usado em `sistemas-lineares-e-escalonamento` p2 (`complete_when: zerou ≥ 1`), p3 (`t ≥ 1`), p4 (`impossivel ≥ 1`), p5 e p6 (figura).
````

---

## Correções da revisão B35 (19/11, B39b)

Fonte: `docs/revisao/codigo-b33-codex.md`, seção `escalonado` (4 achados médios, nenhum alto ou baixo). Cada teste foi escrito antes da correção e visto falhando (mensagem entre parênteses). Testes em `src/widgets/common/escalonado/escalonado.test.ts`: os dois de substituição já existentes foram endurecidos, e há um bloco novo "revisão B35: escalonado". O desenho é lido com `src/widgets/common/divisao/gravadorCanvas.ts`, um contexto 2D falso que grava texto e preenchimentos.

| Achado | Teste que prova | Correção |
|---|---|---|
| **Média**: com 0 = 0 na última linha (a dúvida da Tati no p3), x = 3 − (2 − z) − z = 1, mas o cálculo propagava o z desconhecido e dava x indeterminado; o teste exigia esse erro | "última linha 0 = 0 … (dúvida da Tati)" agora exige `conta = "3 − (2 − z) − z"`, `valor = 1` e y com `expressao = "2 − z"` (falhava: `expected '3 − y − z' to be '3 − (2 − z) − z'`). D5 do treino: x = "3 − 2z", conta "3 − z − z" (falhava) | `calc.ts` `substituicao`: cada incógnita vira expressão afim nas livres (c + Σ tⱼ·livreⱼ) propagada de baixo para cima. Campo novo `expressao` ("2 − z", "3 − 2z"). `valor` é número quando nada depende de livre. A conta só aparece quando substitui algo (antes repetia "y = 2 − z = 2 − z"). Parênteses só em expressão com mais de um termo ou com sinal de menos |
| **Média**: o mesmo sistema tem 4 linhas na tabela (3 equações + "z livre"), mas a altura reservava 3; o rodapé saía do canvas | "Média (altura)": todo texto com y ≤ altura do canvas (falhava: `0 = 0: z livre, infinitas: expected 286 to be less than or equal to 266`); o aspecto do p3 da aula não muda (conferido por conta: (120 + 30 + 8 + 3·34 + 6)/360) | `calc.ts` `linhasDaTabela`: exato quando os coeficientes são fixos (equações + livres, ou 1 para o aviso); com slider num coeficiente, o pior caso (equações + incógnitas). `useCanvas` só lê o aspecto quando a largura muda, por isso ele não pode depender do slider. `aspectoSistema` usa essa contagem |
| **Média**: `mostrar.solucao: false` escondia a legenda, mas o ponto c1 continuava marcando a resposta no plano | "Média (solução oculta)": nenhum `fill` com `tinta("c1")` e nenhum "(1; 2)" (falhava: `expected [ … ] to not include '#1C8BE0'`) | `desenho.ts` `desenharPlano`: o ponto só é desenhado com `p.mostrar.solucao`. A aula não usa `solucao: false` em passo com plano: nada muda nela |
| **Média**: `substituir` aceitava `[[1, 1 \| 3], [2, 1 \| 4]]` (dois pivôs em x), e a tabela dizia "y livre" embora a solução seja (1; 2) | "Média (substituir sem escalonar)": schema recusa; com `["$a", 1, 4]` e a = 2 não há "livre" e aparece "Escalone antes de substituir"; com a = 0 a tabela é "y = 4", "x = 3 − y" (falhava: `expected true to be false`) | `params.ts`: com coeficientes numéricos, `substituir` exige a escada (cada pivô à direita do de cima, linhas nulas embaixo). `desenho.ts`: a matriz avaliada fora da escada mostra o aviso no lugar da tabela |

Passos da aula sem mudança de comportamento. O p3 (único passo `substituir`) foi recapturado em 19/11 (`capturas-b33d/sistemas-lineares-e-escalonamento-p3.png` e `-p3-t=1.png`, `scrollWidth 400`, abertos e conferidos): idênticos aos anteriores (z = 0, y = 2 − z = 2 − 0, x = 3 − y − z = 3 − 2 − 0; com t = 1, chips 1, 1, 1). Validação: `npm run typecheck` ok; `npx vitest run` 132 arquivos, 2114 testes; `npm run lint:content` "conteúdo ok". A seção do GUIA acima já inclui a regra do `substituir` (escada obrigatória e aviso), a propagação das livres e o ponto oculto com `mostrar.solucao: false`.
