# Reconferência Visual — Álgebra B11c (Equações, Inequações, Matrizes e Sistemas)

Reconferência em viewport mobile (`400 × 860`, `overflowX = false` em todos os 41 passos) cobrindo:
1. Todos os 17 passos `micro_challenge` no estado inicial e após selecionar cada alternativa e clicar em **VERIFICAR**;
2. Todos os passos marcados como corrigidos (`sim`) em `docs/visual/algebra-equacoes.md`;
3. Todos os 17 passos de fechamento (`concept_lock`).

| slug | passo | resultado | detalhe concreto do que se vê | tipo |
|---|---|---|---|---|
| `equacoes-exponenciais` | `p4` (`conferir-previsao`) | ok | Inicial mostra `y = 2ˣ` e `y = 8` sem entregar `(3; 8)`. Errada `4` exibe ponto azul `(4; 16)` mostrando `2⁴ ≠ 8`; feedback claro (2 opções). | conteúdo |
| `equacoes-exponenciais` | `p5` (`fechamento`) | ok | Ponto `(3; 8)` único no gráfico; fórmula `[b] ᵘ = bᵛ ⇔ u = v` e chips cabem sem corte em 400 px. | conteúdo |
| `equacoes-irracionais` | `p4` (`conferir-previsao`) | ok | Inicial mostra `y = √(x+2)` e `y = x` sem etiqueta `(2; 2)`. Errada `−1` traça `x = −1` com pontos `1` (rosa) e `−1` (preto), evidenciando `1 ≠ −1`. | conteúdo |
| `equacoes-irracionais` | `p5` (`fechamento`) | ok | Ponto `(2; 2)` único; fórmula `√[A] = [B] ⇔ A=B² e B≥0` e chips cabem sem corte em 400 px. | conteúdo |
| `equacoes-logaritmicas` | `p4` (`conferir-previsao`) | ok | Inicial mostra `log₂(x−1)` e `y = 1` sem etiqueta `(3; 1)`. Errada `2` marca ponto azul `(2; 0)` mostrando que em `x = 2` o log vale `0 ≠ 1`. | conteúdo |
| `equacoes-logaritmicas` | `p5` (`fechamento`) | ok com ressalva | Ponto `(4; 2)` único; fórmula e chips cabem em 400 px. Ressalva leve: fala e chip usam `log_β` (beta grego) enquanto a condição abaixo usa `b>0,b≠1` (`b` latino). | conteúdo |
| `equacoes-modulares` | `p1` (`caso-neutro`) | ok | Correção da Máquina A confirmada: `reta_numerica` exibe etiquetas `0`, `1` e distância `1` inteiras dentro do cartão, sem recorte na borda inferior. | widget |
| `equacoes-modulares` | `p4` (`conferir-previsao`) | ok | Inicial mostra `y = |x − 1|` e `y = 2` sem etiquetas de solução. Errada `1 e 3` destaca ponto laranja `(1; 0)` mostrando que `1` é o centro. | conteúdo |
| `equacoes-modulares` | `p5` (`fechamento`) | ok | Barras de módulo fora dos chips (`|[x] − [c]| = r ⇒ [x = c ± r], r ≥ 0`), tudo legível em 400 px. | conteúdo |
| `equacoes-primeiro-grau` | `p4` (`conferir-previsao`) | defeito | Inicial mostra `y = 2x − 4` e `y = 0` sem entregar `(2; 0)`. Porém, na errada `−2`, a figura não muda: permanece idêntica à inicial, sem destacar `x = −2` ou `2(−2) − 4 = −8`. | conteúdo |
| `equacoes-primeiro-grau` | `p5` (`fechamento`) | ok | Ponto `(2; 0)` único; fórmula `[a][x] + b = 0 ⇒ [x] = −b/a (a ≠ 0)` cabe sem corte em 400 px. | conteúdo |
| `equacoes-quadraticas` | `p5` (`conferir-previsao`) | defeito | Inicial mostra `y = x² + 1` acima do eixo x. Porém, na errada `Duas`, a figura não muda: permanece idêntica à inicial, sem destaque do mínimo `(0; 1)` ou distância ao eixo x. | conteúdo |
| `equacoes-quadraticas` | `p6` (`fechamento`) | ok | Correção confirmada: `[x] = (−b ± √Δ)/(2a);` / `[raízes]` quebra limpo e cabe sem corte lateral em 400 px; gráfico exibe `0`, `2` e `(1; −1)`. | conteúdo |
| `equacoes-racionais` | `p4` (`conferir-previsao`) | ok | Inicial mostra `(x²−1)/(x−1)` com furo em `(1; 2)` e `y = 2` sem etiqueta. Errada `{1}` destaca o furo azul com etiqueta `(1; 2)`. | conteúdo |
| `equacoes-racionais` | `p5` (`fechamento`) | ok | Ponto `(2; 1)` único; fórmula `N(x)/[D(x)] = k ⇔ N(x)=kD(x), D(x)≠0` cabe inteira em 400 px. | conteúdo |
| `expressoes-algebricas-e-produtos-notaveis` | `p4` (`conferir-previsao`) | defeito | Inicial exibe `Lado = 3` e peças `a²`, `ab`, `ab`, `b²` sem os números de área (corrigido). Porém, na errada `5`, a figura não muda: permanece idêntica à inicial, sem destacar `a² + b²` sem as faixas `ab`. | conteúdo |
| `expressoes-algebricas-e-produtos-notaveis` | `p5` (`fechamento`) | ok | Correção confirmada: `([a] + [b])² =` / `[a² + 2ab + b²]` com parênteses fora dos chips, cabe em 400 px. | conteúdo |
| `fatoracao-algebrica` | `p4` (`conferir-previsao`) | defeito | Inicial mostra `y = x² − 2x` sem marcação de raízes (corrigido). Porém, na errada `Só 2`, a figura não muda: permanece idêntica à inicial, sem destacar a raiz `x = 0` perdida. | conteúdo |
| `fatoracao-algebrica` | `p5` (`fechamento`) | ok | Fórmula `[x] · [(x−2)] = [P(x)] ; raízes [0 e 2]` e chips cabem inteiros em 400 px. | conteúdo |
| `inequacoes-exponenciais-logaritmicas` | `p4` (`conferir-previsao`) | ok | Inicial mostra `y = (0,5)ˣ` e `y = 1` sem destacar intervalo. Errada `x>0` marca ponto azul `(1; 0,5)` abaixo de `y = 1`. | conteúdo |
| `inequacoes-exponenciais-logaritmicas` | `p5` (`fechamento`) | ok | Ponto `(0; 1)` único; fórmula `bᵘ > bᵛ ⇔ [u > v] se b > 1; [u < v] se 0 < b < 1` cabe em 400 px. | conteúdo |
| `inequacoes-modulares` | `p1` (`caso-neutro`) | ok | Correção confirmada: `reta_numerica` exibe etiquetas `|x| ≤ 0`, `1`, `0` e distância `1` inteiras dentro do cartão. | widget |
| `inequacoes-modulares` | `p2` (`abrir-interior`) | ok | Correção confirmada: `reta_numerica` exibe `−3`, `|x| < 2`, `-2`, `2` e distância `3` inteiros dentro do cartão. | widget |
| `inequacoes-modulares` | `p4` (`conferir-previsao`) | defeito | A figura inicial já exibe o segmento roxo com bolinhas abertas em `−2` e `2`, entregando diretamente a resposta `(−2; 2)` antes da escolha (a errada `[−2; 2]` fecha as bolinhas). | conteúdo |
| `inequacoes-modulares` | `p5` (`fechamento`) | ok | Correção confirmada: `|[x] [− c]| < r ⇔ [c − r < x < c + r] (r > 0)` com barras fora dos chips, cabe em 400 px. | conteúdo |
| `inequacoes-primeiro-grau` | `p4` (`conferir-previsao`) | ok | Inicial mostra apenas bolinha aberta em `1` sem indicar o lado. Errada `x > 1` desenha seta roxa para a direita `(1; +∞)`. | conteúdo |
| `inequacoes-primeiro-grau` | `p5` (`fechamento`) | ok | Gráfico com trecho `x > 1` limpo; fórmula `[a] · [x] + b > 0 ⇔ [x] [> −b/a] (a > 0)` cabe em 400 px. | conteúdo |
| `inequacoes-produto-quociente` | `p4` (`conferir-previsao`) | ok | Inicial mostra reta limpa `−4..4` sem entregar aberto/fechado (corrigido). Errada `Sim` marca ponto laranja aberto `"x=−1 não pode"` e ponto roxo em `1`. | conteúdo |
| `inequacoes-produto-quociente` | `p5` (`fechamento`) | ok | Reta exibe `x < −1 (+)` e `x ≥ 1 (+)` sem corte; fórmula `([x] −1)/([x+1]) ≥ 0 ⇔ [x<−1 ou x≥1]` cabe em 400 px. | conteúdo |
| `inequacoes-quadraticas` | `p2` (`entre-raizes`) | ok | Correção confirmada: etiqueta `(−2; 3)` aparece inteira dentro do cartão sem corte na borda superior. | conteúdo |
| `inequacoes-quadraticas` | `p4` (`conferir-previsao`) | ok | Inicial mostra `y = x² − 1` e raízes `−1` e `1` sem entregar o intervalo. Errada `Fora de [−1; 1]` marca ponto preto `(2; 3)` mostrando altura positiva fora do intervalo. | conteúdo |
| `inequacoes-quadraticas` | `p5` (`fechamento`) | ok com ressalva | Fórmula `[a] · (x − r1)(x − r2) ≤ 0 ⇔ [r1 ≤ x ≤ r2]` e chips cabem em 400 px. Ressalva leve: `r1` e `r2` sem subscrito (`r₁`, `r₂`). | conteúdo |
| `determinantes-e-matriz-inversa` | `p3` (`perder-informacao`) | ok | Correção confirmada: etiquetas `(1; 1)` e `(2; 1)` azul e rosa ficam empilhadas verticalmente sem sobreposição. | widget |
| `determinantes-e-matriz-inversa` | `p4` (`conferir-previsao`) | defeito | Inicial mostra `(1; 1) → (2; 1)` e `det A = 2`. Porém, na errada `diag(−2; −1)`, a figura não muda: permanece idêntica à inicial, sem mostrar a inversão para o 3º quadrante. | conteúdo |
| `determinantes-e-matriz-inversa` | `p5` (`fechamento`) | ok | Correção confirmada: `[A⁻¹] = (1 / [ad − bc]) · [[d, −b], [−c, a]]` quebra em duas linhas e cabe inteira em 400 px. | conteúdo |
| `matrizes-determinantes-sistemas` | `p1` (`caso-neutro`) | ok | Correção confirmada: etiquetas `(0; 1)` azul e rosa ficam empilhadas verticalmente sem sobreposição. | widget |
| `matrizes-determinantes-sistemas` | `p2` (`esticar-coluna`) | ok | Correção confirmada: etiquetas `(1; 1)` azul e rosa ficam empilhadas verticalmente sem sobreposição. | widget |
| `matrizes-determinantes-sistemas` | `p5` (`conferir-previsao`) | defeito | Inicial corrigido (exibe apenas `(1; 3)` no vetor azul, sem entregar `(2; 3)`). Porém, na errada `(2;6)`, a figura não muda: permanece idêntica à inicial, sem mostrar o vetor `(2; 6)` ou destacar que só `x` dobra. | conteúdo |
| `matrizes-determinantes-sistemas` | `p6` (`fechamento`) | ok | Fórmula `[A] · [(x; y)] = [(ax + by; cx + dy)] ; det A = [ad − bc]` e chips cabem inteiros em 400 px. | conteúdo |
| `sistemas-lineares-e-escalonamento` | `p5` (`conferir-previsao`) | defeito | Inicial mostra duas retas paralelas (`2x + 2y = 5` e `x + y = 2`). Porém, na errada `Infinitas`, a figura não muda: permanece idêntica à inicial, sem destacar o paralelismo/contradição frente a retas coincidentes. | conteúdo |
| `sistemas-lineares-e-escalonamento` | `p6` (`fechamento`) | ok | Correção confirmada: ponto `(1; 2)` único no gráfico; fórmula `[L₂] ← L₂ − [k] · L₁; 0 = 0: livre; [0 = c: impossível]` cabe inteira em 400 px. | conteúdo |

---

## Resumo B11c

- **Capítulos conferidos:** 17 (`14` de `algebra/equacoes-e-inequacoes` + `3` de `algebra/matrizes-e-sistemas`).
- **Passos conferidos:** **41 passos** (`31 ok`, `2 ok com ressalva`, `8 defeitos`). Todos os passos marcados como corrigidos pela Máquina A e todos os 17 fechamentos passaram sem sobreposição nem corte em 400 px.
- **Defeitos de widget (0):** nenhum.
- **Defeitos de conteúdo (8):**
  - **7 desafios em que a figura da alternativa errada não muda** (fica igual à inicial):
    1. `equacoes-primeiro-grau` (`p4`, errada `−2`)
    2. `equacoes-quadraticas` (`p5`, errada `Duas`)
    3. `expressoes-algebricas-e-produtos-notaveis` (`p4`, errada `5`)
    4. `fatoracao-algebrica` (`p4`, errada `Só 2`)
    5. `determinantes-e-matriz-inversa` (`p4`, errada `diag(−2; −1)`)
    6. `matrizes-determinantes-sistemas` (`p5`, errada `(2;6)`)
    7. `sistemas-lineares-e-escalonamento` (`p5`, errada `Infinitas`)
  - **1 figura inicial que entrega a resposta:**
    8. `inequacoes-modulares` (`p4`, figura inicial já mostra o intervalo aberto `(−2; 2)` na reta numérica).
- **Ressalvas leves (2):** `equacoes-logaritmicas p5` (`log_β` vs `b`) e `inequacoes-quadraticas p5` (`r1`/`r2` sem subscrito).


## Correções B11c-fix

| slug | passo | antes → depois |
| --- | --- | --- |
| `equacoes-primeiro-grau` | p4 (`conferir-previsao`) | **Antes:** opção `−2` sem `figure` (imagem idêntica à inicial). **Depois:** `−2` mostra o ponto `(−2; −8)` sobre `y = 2x − 4` (`x: [-3, 5]`, `highlight: ["c4"]`), evidenciando que `y ≠ 0`; opção `2` marca o encontro `(2; 0)`. |
| `equacoes-quadraticas` | p5 (`conferir-previsao`) | **Antes:** opção `Duas` só tinha `highlight: ["c3"]`, idêntica à inicial e à certa. **Depois:** `Duas` mantém `y = x² + 1` tracejada (`fantasma: true`) e adiciona `y = x² − 1` com `marcar.raizes: true` (raízes `−1` e `1`); opção `Nenhuma` marca o vértice e a guia horizontal `mín = 1`. |
| `expressoes-algebricas-e-produtos-notaveis` | p4 (`conferir-previsao`) | **Antes:** opção `5` sem `figure` (imagem idêntica à inicial). **Depois:** `5` usa `highlight: ["c1", "c3"]` (destaca apenas `a²` e `b²`, afinando as duas faixas `ab` que faltaram); opção `9` usa `highlight: ["c1", "c2", "c3"]` e `mostrar.total: true`. |
| `fatoracao-algebrica` | p4 (`conferir-previsao`) | **Antes:** opção `Só 2` tinha apenas `highlight: ["c4"]` sem efeito visível. **Depois:** `Só 2` mantém `y = x² − 2x` tracejada (`fantasma: true`) e mostra `y = x − 2` com `marcar.raizes: true` (apenas raiz `2`, ilustrando a divisão por `x`); opção `0 e 2` marca as duas raízes da parábola. |
| `inequacoes-modulares` | p4 (`conferir-previsao`) | **Antes:** figura inicial já desenhava o segmento `(−2; 2)` com bolinhas abertas, entregando a resposta. **Depois:** figura inicial mostra apenas a reta vazia `[-4, 4]`; opção `[−2; 2]` desenha segmento e bolinhas fechadas, e `(−2; 2)` desenha segmento e bolinhas abertas. |
| `determinantes-e-matriz-inversa` | p4 (`conferir-previsao`) | **Antes:** alternativas usavam chave `"override"` (ignorada por `MicroChallenge.tsx`, que lê `"figure"`), mantendo a imagem igual à inicial. **Depois:** renomeado `"override"` → `"figure"` nas duas alternativas; `diag(−2; −1)` exibe os 3 painéis `v → Bv=(2;1) → A(Bv)=(−4;−1)` com `janela: [-3, 3]`. |
| `matrizes-determinantes-sistemas` | p5 (`conferir-previsao`) | **Antes:** alternativas usavam chave `"override"` (ignorada por `MicroChallenge.tsx`), mantendo a imagem sem vetor imagem. **Depois:** renomeado `"override"` → `"figure"`; opção `(2;6)` mostra `matriz: [[2,0],[0,2]]` com `imagem: true` e `janela: [-1, 7]` (levando `(1;3)` a `(2;6)`, `det = 4`); opção `(2;3)` revela a imagem real `(2;3)` de `diag(2;1)`. |
| `sistemas-lineares-e-escalonamento` | p5 (`conferir-previsao`) | **Antes:** opção `Infinitas` sem `figure` (imagem idêntica à inicial com duas retas paralelas distintas). **Depois:** `Infinitas` mostra retas coincidentes `x + y = 2` e `2x + 2y = 4` (`fantasma: true`), ilustrando `0 = 0`; opção `Nenhuma` destaca as duas retas paralelas distintas (`highlight: ["c3", "c4"]`). |
| `equacoes-logaritmicas` | p5 (`fechamento`) | **Antes:** usava `logᵦ` (beta grego) em `formula` e `lines.intro`. **Depois:** trocado para `log_b` (b latino, igual ao restante da aula). **Nota para o maestro:** `ConceptLock.tsx` (`partesTextoFormula` / `SUBSCRITOS`) só converte caracteres Unicode já subscritos para `<sub>`, e o Unicode não possui `b` latino subscrito; por isso `log_b` aparece literalmente com `_b` até que `ConceptLock.tsx` passe a tratar `_b` (não alterado aqui por ser código em `src/`). |
| `inequacoes-quadraticas` | p5 (`fechamento`) | **Antes:** fórmula usava `r1` e `r2` sem subscrito. **Depois:** atualizado para `r₁` e `r₂` (renderizados como subscrito em `ConceptLock.tsx`). |
