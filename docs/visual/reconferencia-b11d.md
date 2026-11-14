# Reconferência Visual B11d — Álgebra (Funções, Polinômios, Complexos e Sequências)

Escopo: 18 capítulos (`algebra/funcoes/*`, `algebra/polinomios-e-complexos/*`, `algebra/sequencias/*`), 45 passos reconferidos (65 capturas em largura 400 px, `overflowX=false` e `scrollW=400` em todas; `micro_challenge` com clique na alternativa errada + `VERIFICAR`, passos marcados `sim` em `docs/visual/algebra-funcoes.md` e passos de fechamento).

## Tabela de Reconferência

| slug | passo | resultado | detalhe concreto do que se vê | tipo |
| :--- | :--- | :--- | :--- | :--- |
| funcao-afim | p5 | ok | `f(x) = −x + 2` aparece acima da alça `(4; −2)`, sem colisão entre rótulos. | conteúdo |
| funcao-afim | p7 | ok | Inicial mostra apenas `f(x) = −2x + 4`; cada errada muda a figura (`errada1 (4)` marca `4` no eixo y; `errada2 (−2)` mostra triângulo `1`/`−2`; `errada4 (0)` marca `(0; 4)`) e os feedbacks não entregam a certa (`2`). | conteúdo |
| funcao-afim | p8 | ok com ressalva | Fórmula `f(x) = a x + b` cabe em 400 px; no gráfico, o chip preto `1` no eixo x fica muito próximo de `(0; 1)` e da pílula `−0,5`. | widget |
| funcao-composta-e-inversa | p3 | ok | Pontos `(0; 1)` e `(1; 0)` bem separados dos rótulos das retas. | conteúdo |
| funcao-composta-e-inversa | p4 | defeito | `errada2 (2x − 1)` altera a figura (desenha reta roxa `2x − 1`), mas o feedback entrega a resposta certa: `"É preciso isolar y após trocar x e y: f⁻¹(x) = (x − 1)/2."`. | conteúdo |
| funcao-composta-e-inversa | p5 | ok | `f`, `f⁻¹`, `y = x`, `(1; 3)` e `(3; 1)` separados; fórmula em 2 linhas cabe sem corte. | conteúdo |
| funcao-definida-por-partes | p2 | ok | Alça `(−2; −2)` separada do rótulo rosa `x`. | conteúdo |
| funcao-definida-por-partes | p4 | defeito | `errada1 (−4)` não altera a figura (fica idêntica à inicial) e o feedback entrega a resposta certa (`"usa f(x)=x, logo f(−2)=−2."`). | conteúdo |
| funcao-definida-por-partes | p5 | ok | Gráfico e fórmula `f(x) = f₁(x) se x∈I₁; f₂(x) se x∈I₂` cabem em 400 px. | conteúdo |
| funcao-exponencial | p1 | ok | `(0; 1)`, `y = 1`, `y = x` e `y = 2ˣ` separados e legíveis. | conteúdo |
| funcao-exponencial | p4 | defeito | `errada1 (−4)` muda a figura para `(−2; 0,25)`, mas o feedback entrega a resposta certa (`"2⁻² = 1/4."`). | conteúdo |
| funcao-exponencial | p5 | ok | `(0; 1)` e `f(x) = 2ˣ` limpos; fórmula `f(x) = bˣ` cabe em 400 px. | conteúdo |
| funcao-modular | p4 | defeito | `errada1 ((−1; −2))` muda a figura para `(−1; 0)`, mas o feedback entrega a resposta certa (`"A distância zera em x = 1, onde vale 2."`). | conteúdo |
| funcao-modular | p5 | ok | Chips `1,5` e `0,5` separados sem cobrir `(1; −1)`; fórmula `f(x) = a \|x − h\| + k` cabe. | conteúdo |
| funcao-quadratica | p3 | ok | `(0; 1)` separado de `f(x) = (x − 1)²`. | conteúdo |
| funcao-quadratica | p4 | defeito | `errada1 ((−1; 1))` muda a figura para `(−1; 3)`, mas o feedback entrega a resposta certa (`"O quadrado zera em x = 1 e o mínimo é −1."`). | conteúdo |
| funcao-quadratica | p5 | ok | `0`, `2` e `(1; −1)` separados; fórmula cabe em 400 px. | conteúdo |
| funcao-racional | p4 | defeito | Inicial sem assíntotas (`marcar.assintota: false`); `errada1 (x=−2 e y=−1)` desenha tracejados `x = −2` e `y = −1`, mas o feedback entrega a resposta certa (`"x−2 zera em 2; +1 fixa y=1."`). | conteúdo |
| funcao-racional | p5 | ok com ressalva | Gráfico limpo; a fórmula quebra deixando `, Q(x) ≠ 0` com vírgula inicial na 2ª linha. | widget |
| introducao-a-funcoes | p4 | defeito | `errada2 (É função)` não muda a figura (idêntica à inicial), embora o feedback explique sem entregar outra resposta (`"Aqui x = 1 tem saídas 2 e 4."`). | conteúdo |
| introducao-a-funcoes | p5 | ok | Gráfico e fórmula `f(x) = y` limpos em 400 px. | conteúdo |
| logaritmos | p4 | defeito | `errada1 (8)` marca `(8; 3)`, mas o feedback entrega a resposta certa (`"2³ = 8, então log₂(8) = 3."`). | conteúdo |
| logaritmos | p5 | ok com ressalva | Gráfico com `(4; 2)` limpo; fórmula `logₐ(x) = y ⇔ aʸ = x` deixa `=` órfão no fim da 1ª linha e chip `x` isolado na 2ª linha. | widget |
| transformacoes-graficos-de-funcoes | p4 | defeito | Inicial sem vértice marcado; `errada1 ((−1;−2))` marca `x = −1` e `−2`, mas o feedback entrega a resposta certa (`"O vértice (0;0) vai 1 à direita e 2 para cima: (1;2)."`). | conteúdo |
| transformacoes-graficos-de-funcoes | p5 | ok | Gráfico e fórmula `g(x) = a · f(b(x − h)) + k` cabem sem cortes. | conteúdo |
| divisao-polinomial-e-teorema-do-resto | p4 | ok | Alça `(2; 3)` separada dos chips `−1` e `1`. | conteúdo |
| divisao-polinomial-e-teorema-do-resto | p5 | defeito | `errada1 (0)` não altera a figura (idêntica à inicial, sem marcar `(2; 3)` ou `x = 2`) e o feedback entrega a resposta certa (`"P(2)=4−1=3, então o resto é 3."`). | conteúdo |
| divisao-polinomial-e-teorema-do-resto | p6 | ok | `(2; 3)` limpo e fórmula `P(x) = (x − r) · Q(x) + P(r)` cabe em 400 px. | conteúdo |
| numeros-complexos | p3 | ok | Rótulos `z` e `w` separados, módulo/soma legíveis. | conteúdo |
| numeros-complexos | p5 | defeito | Inicial oculta módulo; `errada1 (7)` não altera a figura (idêntica à inicial) e o feedback entrega a resposta certa (`"√(9+16)=5, então o módulo é 5."`). | conteúdo |
| numeros-complexos | p6 | ok | `z = a + b i ; \|z\| = √(a² + b²)` separado em 2 linhas e limpo. | conteúdo |
| polinomios | p4 | defeito | `errada1 (6)` não altera a figura (idêntica à inicial) e o feedback entrega a resposta certa (`"o maior expoente não nulo é 3, então o grau é 3."`). | conteúdo |
| polinomios | p5 | ok | `0` e `−1` separados; `P(x) = aₙ xⁿ + ... + a₁x + a₀; aₙ ≠ 0` cabe com `=` fora de `aₙ`. | conteúdo |
| raizes-polinomiais-e-multiplicidade | p1 | ok com ressalva | Chip `(0; −1)` separado do chip `1`, mas pílula `(0; −1)` toca levemente o eixo x/`−1` e a alça `o` fica sobre `−1` do eixo y. | widget |
| raizes-polinomiais-e-multiplicidade | p3 | ok | `(0; −1)` separado de `1`. | conteúdo |
| raizes-polinomiais-e-multiplicidade | p4 | defeito | `errada1 (−2)` não altera a figura (idêntica à inicial, que já marca `−2` em roxo) e o feedback entrega a resposta certa (`"(x−1)² repete a raiz 1 duas vezes."`). | conteúdo |
| raizes-polinomiais-e-multiplicidade | p5 | ok | `(1; 0)` e `−2` separados; fórmula `P(x) = (x − r)ᵐ · Q(x), Q(r) ≠ 0` cabe limpa. | conteúdo |
| sequencias-pa-pg | p4 | defeito | `errada2 (−6)` muda a figura para `n = 6` (`−6`), ilustrando os 5 avanços, mas o feedback entrega a resposta certa (`"Contou cinco avanços; são quatro, então a₅ = −4."`). | conteúdo |
| sequencias-pa-pg | p5 | ok | Gráfico limpo; fórmula com chips `aₙ`, `n`, `d`, `aₙ`, `qⁿ⁻¹` cabe em 2 linhas em 400 px. | conteúdo |
| sequencias-recursivas-e-padroes | p4 | defeito | `errada2 (4)` destaca `a₃ (2)` e `a₄ (3)` em magenta na figura, mas o feedback entrega a resposta certa (`"4 não aplica a regra ao último par: a₅ = 2 + 3 = 5."`). | conteúdo |
| sequencias-recursivas-e-padroes | p5 | ok | Gráfico `a₁..a₅` limpo; fórmula `aₙ = F(aₙ₋₁, aₙ₋₂)` quebra para 2 linhas (`aₙ₋₂ )` abaixo) com subscritos legíveis em 400 px. | conteúdo |
| soma-da-pg-infinita | p4 | defeito | `errada2 (14)` muda a figura para `n = 3` (`S₃ = 14`), ilustrando o corte na 3ª parcela, mas o feedback entrega a resposta certa (`"14 é a soma até 2; a cauda soma mais 2, e o total é 16."`). | conteúdo |
| soma-da-pg-infinita | p5 | ok com ressalva | Gráfico com `limite 16` e `S₆ = 15,8` limpo; fórmula `S∞ = a₁ ÷ (1 − q), com \|q\| < 1` cabe, mas a quebra deixa `), com \|q\| < 1` com parêntese isolado no início da 2ª linha. | widget |
| somatorios-pa-pg | p4 | defeito | `errada2 (26)` muda a figura para `n = 4` (barra `5` tracejada/vazia), mas o feedback entrega a resposta certa (`"26 omite o quinto termo: é S₄. Somando os cinco, S₅ = 40."`). | conteúdo |
| somatorios-pa-pg | p5 | ok | Gráfico `S₅ = 40` limpo; fórmula dupla de PA e PG cabe em 4 linhas sem corte em 400 px. | conteúdo |

## Resumo

- **Total reconferido:** 18 capítulos, 45 passos (23 `ok`, 5 `ok com ressalva`, 17 `defeito`).

### Defeitos de conteúdo (17 passos)
1. **Feedback da alternativa errada entrega a resposta certa (16 passos):**
   - `funcao-composta-e-inversa` (`p4`)
   - `funcao-definida-por-partes` (`p4`) — também sem alteração visual na errada
   - `funcao-exponencial` (`p4`)
   - `funcao-modular` (`p4`)
   - `funcao-quadratica` (`p4`)
   - `funcao-racional` (`p4`)
   - `logaritmos` (`p4`)
   - `transformacoes-graficos-de-funcoes` (`p4`)
   - `divisao-polinomial-e-teorema-do-resto` (`p5`) — também sem alteração visual na errada
   - `numeros-complexos` (`p5`) — também sem alteração visual na errada
   - `polinomios` (`p4`) — também sem alteração visual na errada
   - `raizes-polinomiais-e-multiplicidade` (`p4`) — também sem alteração visual na errada
   - `sequencias-pa-pg` (`p4`)
   - `sequencias-recursivas-e-padroes` (`p4`)
   - `soma-da-pg-infinita` (`p4`)
   - `somatorios-pa-pg` (`p4`)
2. **Figura da alternativa errada não muda em relação à inicial (6 passos):**
   - `funcao-definida-por-partes` (`p4`)
   - `introducao-a-funcoes` (`p4`)
   - `divisao-polinomial-e-teorema-do-resto` (`p5`)
   - `numeros-complexos` (`p5`)
   - `polinomios` (`p4`)
   - `raizes-polinomiais-e-multiplicidade` (`p4`)

### Defeitos / ressalvas de widget (5 passos, todos `ok com ressalva`)
- `funcao-afim` (`p8`): chip preto `1` no eixo x muito próximo de `(0; 1)` e da pílula `−0,5`.
- `raizes-polinomiais-e-multiplicidade` (`p1`): pílula `(0; −1)` toca levemente o eixo x/`−1` e a alça `o` fica sobre `−1` do eixo y.
- `funcao-racional` (`p5`), `logaritmos` (`p5`), `soma-da-pg-infinita` (`p5`): quebra de linha na barra de fórmula do `concept_lock` em 400 px deixa vírgula, `=` ou `)` isolados na transição de linha.
