# Plano — Equação da reta, inclinação e interceptos

**Aula:** 1 — Dois Pontos Bastam · Coeficiente angular, linear e equação da reta
**Caminho:** geometria / geometria-analitica / reta-equacao-e-inclinacao
**Pré-requisitos que o aluno já domina:** função afim (a como ritmo, b como ponto de partida), distância e deslocamentos Δx e Δy.

## a) Ancoragem mecânica
A máquina recebe dois pontos do plano e devolve a reta que passa por eles: a inclinação m = Δy/Δx (quanto sobe por passo) e o corte no eixo y, n. Os pontos são as entradas que o aluno arrasta; a equação y = mx + n é a saída.

## b) Visual de partida
WIDGET NOVO `pontos_no_plano` em modo reta: dois pontos arrastáveis, a reta infinita que passa por eles (c3), o triângulo de degraus Δx (c4) e Δy, o valor de m (c1) e o corte no eixo y (c2). Para equações dadas, o `plano_cartesiano` existente (curva afim com sliders e `interceptoY`) faz o mesmo papel. Métricas: `dx`, `dy`, `pontos_vistos`, `dx_zero`, `intercepto_tocado`.

## c) Caso neutro
Pontos na mesma altura: Δy = 0, a reta é horizontal, m = 0 e a equação é y = constante. A reta não sobe nem desce. Depois subimos um dos pontos.

## d) Panorama e recorte
Há equação geral (ax + by + c = 0), forma segmentária, distância de ponto a reta e ângulo entre retas. Aqui: inclinação por dois pontos, equação reduzida y = mx + n, interceptos e a reta vertical.

## e) Progressão por contraste
1. Mesma altura: m = 0 (referência).
2. B sobe: m = Δy/Δx positivo; a reta gira.
3. B desliza pela reta: Δx e Δy mudam, a razão não.
4. Equação: m e o corte n bastam; é a função afim vista como reta.
5. Mesma vertical: Δx = 0, inclinação indefinida, reta x = constante.

## f) Dedução causal da forma
Qualquer par de pontos da reta forma um triângulo de degraus, e todos esses triângulos são semelhantes (mesmos ângulos). Por isso Δy/Δx é o mesmo número m em toda a reta. Saindo do corte (0; n) e andando x passos, a altura sobe m · x: y = mx + n. Com um ponto conhecido (x₀; y₀), o mesmo raciocínio dá y − y₀ = m(x − x₀).

## g) Simulação espacial e fronteiras
m negativo: a reta desce para a direita. Pontos na mesma vertical: Δx = 0, a divisão não existe e a reta x = k não é gráfico de função. Três pontos estão alinhados quando as inclinações entre pares são iguais.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Coeficiente angular | Quanto a reta sobe por passo de 1: m = Δy/Δx. |
| c2 | Coeficiente linear | Onde a reta corta o eixo y: n. |
| c3 | Reta | Todos os pontos (x; y) com y = mx + n. |
| c4 | Passo horizontal | O degrau Δx entre os dois pontos. |

### Passo 1 — `mesma-altura`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro)
- **Widget:** WIDGET NOVO `pontos_no_plano` (modo reta) — A(1; 2) fixo, B(4; 2) arrastável; reta c3; m em c1.
- **Sliders:** nenhum
- **Paco (abertura):** "A e B estão na mesma altura: quanto a reta sobe a cada passo? Depois suba B três quadradinhos."
- **Interação do aluno:** lê m = 0 e arrasta B até (4; 5).
- **Conclusão:** `dy ≥ 3`
- **Paco (conclusão):** "Na mesma altura a reta não sobe: m = 0 e y = 2. Subindo B 3 em 3 passos, ela sobe 1 por passo: m = 3/3 = 1."

### Passo 2 — `razao-constante`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6, 5
- **Widget:** `pontos_no_plano` (modo reta) — A(0; 1) e B(2; 5) definem a reta; depois B fica preso à reta e desliza; o triângulo de degraus se redesenha. Emite `pontos_vistos`.
- **Sliders:** nenhum
- **Paco (abertura):** "Arraste B pela reta. Δx e Δy mudam; a razão Δy/Δx também muda?"
- **Interação do aluno:** desliza B por três posições; os triângulos mudam de tamanho e m fica 2.
- **Conclusão:** `pontos_vistos ≥ 3`
- **Paco (conclusão):** "Não: os triângulos são semelhantes, então Δy/Δx = 2 em qualquer par de pontos. Esse número é o coeficiente angular m."

### Passo 3 — `corte-no-eixo-y`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 4 (panorama na dúvida)
- **Widget:** `plano_cartesiano` — curva afim a = 2, b = 1, cor c3, triângulo em x = 0 (c1), `marcar.interceptoY` com cor c2; tocar o ponto de corte o acende. Emite `intercepto_tocado` (WIDGET NOVO: métrica de toque no `plano_cartesiano`).
- **Sliders:** nenhum
- **Paco (abertura):** "A reta tem m = 2 e passa por (0; 1). Onde ela corta o eixo y, e qual é a equação?"
- **Interação do aluno:** toca o corte no eixo y.
- **Conclusão:** `intercepto_tocado ≥ 1`
- **Paco (conclusão):** "Corta em 1, então n = 1 e y = 2x + 1. É a mesma função afim, agora lida como reta no plano."
- **Tati (dúvida):** `fim` — P: "Toda reta é uma função afim?" / R: "Quase: a reta vertical não é função. E há outras formas de equação, como ax + by + c = 0."

### Passo 4 — `reta-vertical`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `pontos_no_plano` (modo reta) — A(1; 1) fixo, B livre; quando Δx = 0 o rótulo de m vira "indefinido" e a equação vira x = 1.
- **Sliders:** nenhum
- **Paco (abertura):** "Leve B para cima de A, na mesma vertical. O que acontece com Δy/Δx?"
- **Interação do aluno:** arrasta B até x = 1.
- **Conclusão:** `dx_zero ≥ 1`
- **Paco (conclusão):** "Δx vira 0 e a divisão não existe: a reta é vertical, x = 1. A inclinação é indefinida."

### Passo 5 — `desafio-equacao`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** `plano_figura` — curva afim a = 2, b = 1, cor c3, com `ponto` em x = 1 (mostra (1; 3)).
- **Paco (abertura):** "Primeiro a inclinação, depois o corte no eixo y."
- **Enunciado:** "Qual é a equação da reta que passa por (1; 3) e (3; 7)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `r2x1` | y = 2x + 1 | **sim** | "Isso. m = 4/2 = 2 e 3 = 2 · 1 + n dá n = 1." | `triangulo` em x = 1 e `marcar.interceptoY`, destaque c1 |
| `r4xm1` | y = 4x − 1 | não | "4 é Δy, não m. Dividindo por Δx = 2: m = 2, e a reta é y = 2x + 1." | `triangulo` em x = 1, destaque c1 |
| `rx2` | y = x + 2 | não | "Passa por (1; 3), mas não por (3; 7). Com m = 2: y = 2x + 1." | `ponto` em x = 3 |
| `r2x3` | y = 2x + 3 | não | "m = 2 está certo, mas em x = 1 daria 5. n = 1: y = 2x + 1." | `marcar.interceptoY`, destaque c2 |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `plano_figura` — afim a = 2, b = 1, triângulo em x = 0 (c1), `interceptoY` (c2).
- **Fórmula:** `y` · `=` · `m`→c1 · `x` · `+` · `n`→c2
- **Definições:** "Coeficiente angular: m = Δy/Δx, igual entre quaisquer dois pontos." · "Coeficiente linear: n, o corte no eixo y." · "Reta vertical: x = k, com inclinação indefinida."
- **Paco (abertura):** "Todos os triângulos de degraus da reta são semelhantes. Por isso m é o mesmo em toda ela, e y = mx + n."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Dois pontos bastam: a razão Δy/Δx dá a inclinação, o corte no eixo y dá n, e a reta é y = mx + n."

## i) Treino pós-aula

### Fáceis

#### F1 — `m-0-0-2-4`
- **Enunciado:** "Qual a inclinação da reta por (0; 0) e (2; 4)?"
- **Conta de conferência:** 4/2 = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | **sim** | "Isso. Sobe 4 em 2 passos." |
| `a4` | 4 | não | "4 é Δy. Dividindo por Δx = 2: m = 2." |
| `a1-2` | 1/2 | não | "Isso é Δx/Δy. m = Δy/Δx = 2." |
| `a6` | 6 | não | "Somar não dá inclinação. m = 4/2 = 2." |

#### F2 — `n-de-3x-5`
- **Enunciado:** "Na reta y = 3x − 5, onde ela corta o eixo y?"
- **Conta de conferência:** n = −5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `am5` | −5 | **sim** | "Certo. Com x = 0, y = −5." |
| `a3` | 3 | não | "3 é a inclinação. O corte é n = −5." |
| `a5` | 5 | não | "O sinal conta: y = −5 quando x = 0." |
| `a5-3` | 5/3 | não | "5/3 é onde corta o eixo x. No eixo y: −5." |

#### F3 — `y-igual-4`
- **Enunciado:** "Como é a reta y = 4?"
- **Conta de conferência:** m = 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `horizontal` | Horizontal | **sim** | "Isso. A altura é 4 para todo x." |
| `vertical` | Vertical | não | "Vertical seria x = 4. y = 4 é horizontal." |
| `sobe` | Sobe | não | "Não há termo em x: m = 0, horizontal." |
| `origem` | Passa pela origem | não | "Em x = 0, y = 4, não 0. É horizontal na altura 4." |

#### F4 — `m-zero`
- **Enunciado:** "Qual a inclinação da reta por (1; 1) e (3; 1)?"
- **Conta de conferência:** 0/2 = 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | **sim** | "Certo. Mesma altura, Δy = 0." |
| `a1` | 1 | não | "Δy = 0, então m = 0." |
| `indef` | Indefinida | não | "Indefinida é com Δx = 0. Aqui Δy = 0: m = 0." |
| `a2` | 2 | não | "2 é Δx. m = 0/2 = 0." |

### Médias

#### M1 — `m-3`
- **Enunciado:** "Qual a inclinação da reta por (1; 2) e (3; 8)?"
- **Conta de conferência:** 6/2 = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. 6/2." |
| `a6` | 6 | não | "6 é Δy. Dividindo por 2: 3." |
| `a1-3` | 1/3 | não | "Invertido. m = Δy/Δx = 3." |
| `a4` | 4 | não | "m = (8 − 2)/(3 − 1) = 3." |

#### M2 — `equacao-m-menos-1`
- **Enunciado:** "Qual a equação da reta de inclinação −1 que corta o eixo y em 4?"
- **Conta de conferência:** y = −x + 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `rmx4` | y = −x + 4 | **sim** | "Certo. m = −1, n = 4." |
| `r4xm1` | y = 4x − 1 | não | "Trocou os papéis. m = −1 multiplica x; n = 4: y = −x + 4." |
| `rx4` | y = x + 4 | não | "A inclinação é −1, a reta desce: y = −x + 4." |
| `rmx` | y = −x | não | "Faltou o corte em 4: y = −x + 4." |

#### M3 — `ponto-na-reta`
- **Enunciado:** "O ponto (2; k) está na reta y = 3x − 1. Quanto vale k?"
- **Conta de conferência:** 3 · 2 − 1 = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Isso. 6 − 1." |
| `a6` | 6 | não | "Faltou o −1: k = 5." |
| `a1` | 1 | não | "Substitua x = 2: 3 · 2 − 1 = 5." |
| `a7` | 7 | não | "3 · 2 − 1 = 5, não 7." |

### Desafios

#### D1 — `reta-2-1-4-5`
- **Enunciado:** "Qual a equação da reta por (2; 1) e (4; 5)?"
- **Conta de conferência:** m = 2; 1 = 4 + n ⇒ n = −3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r2xm3` | y = 2x − 3 | **sim** | "Certo. m = 4/2 = 2 e n = 1 − 4 = −3." |
| `r2x1` | y = 2x + 1 | não | "Em x = 2 daria 5, não 1. n = −3: y = 2x − 3." |
| `r4xm7` | y = 4x − 7 | não | "4 é Δy. m = 2: y = 2x − 3." |
| `rx` | y = x − 1 | não | "Passa por (2; 1), mas m = 2. y = 2x − 3." |

#### D2 — `m-negativo`
- **Enunciado:** "Qual a inclinação da reta por (−1; 3) e (2; −3)?"
- **Conta de conferência:** −6/3 = −2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `am2` | −2 | **sim** | "Isso. Desce 6 em 3 passos." |
| `a2` | 2 | não | "Δy = −6: a reta desce. m = −2." |
| `am1-2` | −1/2 | não | "Invertido. m = Δy/Δx = −6/3 = −2." |
| `am6` | −6 | não | "−6 é Δy. Dividindo por 3: −2." |

#### D3 — `corte-no-eixo-x`
- **Enunciado:** "Onde a reta y = −2x + 6 corta o eixo x?"
- **Conta de conferência:** 0 = −2x + 6 ⇒ x = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `x3` | x = 3 | **sim** | "Certo. Com y = 0, 2x = 6." |
| `x6` | x = 6 | não | "6 é o corte no eixo y. No eixo x: x = 3." |
| `xm3` | x = −3 | não | "−2x + 6 = 0 dá x = +3." |
| `xm2` | x = −2 | não | "−2 é a inclinação. O corte é x = 3." |

#### D4 — `reta-vertical`
- **Enunciado:** "Qual a equação da reta por (1; 1) e (1; 5)?"
- **Conta de conferência:** Δx = 0 ⇒ x = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `x1` | x = 1 | **sim** | "Isso. Os dois pontos têm x = 1: reta vertical." |
| `y1` | y = 1 | não | "y = 1 é horizontal. Aqui x fica fixo: x = 1." |
| `y4x` | y = 4x | não | "Δx = 0, não há m. A reta é x = 1." |
| `y5` | y = 5 | não | "A altura varia de 1 a 5; quem fica fixo é x = 1." |

#### D5 — `alinhados`
- **Enunciado:** "Os pontos (0; 1), (1; 3) e (2; k) estão alinhados. Quanto vale k?"
- **Fala do Paco:** "Última. Alinhados têm a mesma inclinação entre os pares."
- **Conta de conferência:** m = 2 ⇒ k = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Certo. Sobe 2 por passo: 1, 3, 5." |
| `a4` | 4 | não | "Com 4 a inclinação mudaria para 1. Mantendo 2: k = 5." |
| `a6` | 6 | não | "6 dobraria o ritmo. Sobe 2 por passo: k = 5." |
| `a3` | 3 | não | "Com 3 a reta deitaria. k = 5." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2018-rampa`
- **Enunciado (resumido):** "Rampa de garagem tem 8 m na horizontal e desce 2 m. Para respeitar inclinação máxima de 20% mantendo os 8 m, como ajustar o nível?"
- **Fala do Paco:** "Calcule 20% de 8 m para achar o desnível máximo permitido e compare com os 2 m atuais."
- **Fonte:** ENEM 2018 (adaptada) — **Adaptação:** Questão 149: enunciado resumido; alternativas e gabarito (Elevado em 40 cm) mantidos. — **URL:** https://api.enem.dev/v1/exams/2018/questions/149
- **Conta de conferência:** `0,20 · 8 m = 1,60 m = 160 cm`; `200 − 160 = 40 cm`.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `e40` | Elevado em 40 cm | **sim** | "Isso. 20% de 8 m é 1,60 m = 160 cm; como estava 200 cm abaixo, sobe 200 − 160 = 40 cm." |
| `e50` | Elevado em 50 cm | não | "Subir 50 cm deixaria o desnível em 150 cm (18,75%), além do necessário. Para 20% em 8 m o desnível é 160 cm: elevado em 40 cm." |
| `m0` | Mantido no mesmo nível | não | "Com 2 m em 8 m, a inclinação é 200 cm / 8 m = 25%, acima dos 20%. Deve ser elevado em 40 cm." |
| `r40` | Rebaixado em 40 cm | não | "Rebaixar 40 cm aumentaria o desnível para 240 cm (30%). Para cair de 200 cm para 160 cm, deve ser elevado em 40 cm." |
| `r50` | Rebaixado em 50 cm | não | "Rebaixar 50 cm levaria o desnível a 250 cm (31,25%). O certo é elevado em 40 cm." |

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** equação da reta por dois pontos. (Questão UEA 2018 encontrada depende de gráficos em imagem; não usar sem o caderno.)
- **Onde procurar:** UFRGS, PUC-RJ, Unesp.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** condição de alinhamento de três pontos.
- **Onde procurar:** Fuvest, UFSC.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** reta como modelo em contexto (custo, tarifa).
- **Onde procurar:** ENEM.
