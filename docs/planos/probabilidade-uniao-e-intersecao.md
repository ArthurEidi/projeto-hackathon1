# Plano — União, interseção e complemento de eventos

**Aula:** 1 — Casas Contadas Duas Vezes · P(A ou B), P(A e B) e o complemento
**Caminho:** aritmetica / combinatoria-e-probabilidade / probabilidade-uniao-e-intersecao
**Pré-requisitos que o aluno já domina:** probabilidade como fração da grade, união e interseção de conjuntos.

## a) Ancoragem mecânica
A máquina recebe dois eventos A e B pintados na mesma grade e devolve P(A ou B), P(A e B) e P(não A). As casas de A e de B são as entradas; a saída é a fração acesa. Quando A e B dividem casas, somar as duas frações conta essas casas duas vezes.

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo dois eventos: casas de A em azul (c1), de B em laranja (c2), as comuns em listrado com contorno violeta (c3). Contador de casas acesas e régua de 0 a 1. Botão "complemento" acende o que falta (c4).

## c) Caso neutro
A e B sem casas em comum: a união é só juntar, P(A ou B) = P(A) + P(B), e não há nada a descontar. É o sistema sem a "força" da interseção.

## d) Panorama e recorte
Depois vêm condicional, independência e probabilidade total. Aqui: união, interseção e complemento num mesmo sorteio justo.

## e) Progressão por contraste
1. Disjuntos (1 ou 2 contra 5 ou 6): soma direta (referência).
2. Com sobreposição (par contra maior que 3): a soma dá 6/6 mas só 4 casas acendem; desconta a interseção.
3. Complemento: contar o que falta é às vezes mais curto (pelo menos um 6 em dois dados).
4. A sobreposição crescendo até B = A: a união encolhe até P(A).

## f) Dedução causal da forma
Somando as casas de A e as de B, as casas comuns entram duas vezes. Tirando-as uma vez, cada casa da união é contada exatamente uma vez: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Como A e não A cobrem a grade sem se sobrepor, P(não A) = 1 − P(A).

## g) Simulação espacial e fronteiras
A união nunca passa de 1 nem fica menor que o maior dos dois eventos. Se P(A) + P(B) > 1, a interseção não pode ser vazia: ela vale pelo menos P(A) + P(B) − 1. "Pelo menos um" quase sempre se resolve pelo complemento "nenhum".

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Evento A | Casas que fazem A acontecer. |
| c2 | Evento B | Casas que fazem B acontecer. |
| c3 | Interseção | Casas comuns a A e B: os dois acontecem juntos. |
| c4 | Complemento | Casas fora do evento: ele não acontece. |

### Passo 1 — `disjuntos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `grade_resultados` (modo dois eventos) — fila de 6 faces; A = {1, 2} em c1, B = {5, 6} em c2; o aluno toca "unir" e a régua mostra a fração. Emite `uniu`.
- **Sliders:** nenhum
- **Paco (abertura):** "No dado, A é sair 1 ou 2 e B é sair 5 ou 6. A chance de A ou B é a soma das duas?"
- **Interação do aluno:** toca "unir" e conta as casas acesas.
- **Conclusão:** `uniu ≥ 1`
- **Paco (conclusão):** "É: 2/6 + 2/6 = 4/6. Sem casas em comum, juntar é só somar."
- **Tati (dúvida):** `fim` — P: "E se saber que A aconteceu mudar a chance de B?" / R: "Isso é probabilidade condicional, a próxima aula. Hoje olhamos a grade inteira."

### Passo 2 — `contada-duas-vezes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6
- **Widget:** `grade_resultados` — A = par {2, 4, 6}, B = maior que 3 {4, 5, 6}; as casas 4 e 6 ficam listradas (c3) com um "×2". Emite `descontou` ao tocar "tirar repetidas".
- **Sliders:** nenhum
- **Paco (abertura):** "Agora A é par e B é maior que 3. Some 3/6 + 3/6 e conte as casas acesas: bate?"
- **Interação do aluno:** vê 4 casas acesas contra a soma 6/6 e toca "tirar repetidas".
- **Conclusão:** `descontou ≥ 1`
- **Paco (conclusão):** "Não bate: acendem 4 casas, não 6. As casas 4 e 6 entraram duas vezes, então 3/6 + 3/6 − 2/6 = 4/6."

### Passo 3 — `pelo-menos-um-seis`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6, 7
- **Widget:** `grade_resultados` — grade 6 × 6 de dois dados; botão "complemento" (c4) acende as casas sem nenhum 6 (um quadrado 5 × 5). Emite `complemento_visto`.
- **Sliders:** nenhum
- **Paco (abertura):** "Com dois dados, quantas casas têm pelo menos um 6? Não fica mais fácil contar as que não têm nenhum?"
- **Interação do aluno:** toca "complemento" e vê o quadrado 5 × 5 acender.
- **Conclusão:** `complemento_visto ≥ 1`
- **Paco (conclusão):** "Sem nenhum 6 há 5 · 5 = 25 casas. O resto, 36 − 25 = 11, tem pelo menos um 6: P = 11/36."

### Passo 4 — `sobreposicao-cresce`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `grade_resultados` — fila de 1 a 10; A = {1, 2, 3, 4} fixo (c1); B é uma janela de 4 casas que desliza (c2); régua com P(A ∪ B).
- **Sliders:** `inicio_b` · "Início de B" · 1..7 · passo 1 · inicial 7 · c2
- **Paco (abertura):** "Deslize B até ele coincidir com A. O que acontece com a união quando as casas comuns aumentam?"
- **Interação do aluno:** arrasta B da direita para a esquerda; a régua da união cai de 8/10 para 4/10.
- **Conclusão:** `inicio_b ≤ 1`
- **Paco (conclusão):** "A união encolhe até virar só A, 4/10. Quanto mais casas comuns, mais a soma precisa descontar."
- **Tati (dúvida):** `fim` — P: "A soma P(A) + P(B) pode passar de 1?" / R: "A soma pode, a união não. Se passar de 1, A e B são obrigados a ter casas em comum."

### Passo 5 — `desafio-2-ou-5`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — números de 1 a 20 em grade 4 × 5.
- **Paco (abertura):** "Marque os múltiplos de 2, depois os de 5. Algum número ficou com as duas cores?"
- **Enunciado:** "Sorteia-se um número de 1 a 20. Qual a probabilidade de ele ser múltiplo de 2 ou de 5?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a7-10` | 7/10 | não | "10 + 4 = 14 conta 10 e 20 duas vezes. Descontando: 12/20 = 3/5." | 10 e 20 piscando com "×2" |
| `a3-5` | 3/5 | **sim** | "Isso. 10 + 4 − 2 = 12 casas de 20." | 12 casas acesas, 10 e 20 listradas |
| `a1-2` | 1/2 | não | "1/2 são só os pares. Os múltiplos de 5 ímpares (5 e 15) também contam: 3/5." | 5 e 15 acesos em c2 |
| `a1-10` | 1/10 | não | "1/10 é a interseção, 10 e 20. A união é 12/20 = 3/5." | só 10 e 20 acesos |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — fila 1 a 6 com A = par e B = maior que 3, casas 4 e 6 listradas.
- **Fórmula:** `P(A ∪ B)` · `=` · `P(A)`→c1 · `+` · `P(B)`→c2 · `−` · `P(A ∩ B)`→c3
- **Definições:** "União: A ou B, pelo menos um acontece." · "Interseção: A e B ao mesmo tempo." · "Complemento: P(não A) = 1 − P(A)."
- **Paco (abertura):** "Somando A e B, as casas comuns entram duas vezes. Por isso a união desconta a interseção uma vez."
- **Dica (hint):** "Toque em uma letra para ver suas casas na grade."

**Frase de encerramento (outro):** "Você viu casas contadas duas vezes: a união soma e desconta a interseção, e o complemento é o que falta para 1."

## i) Treino pós-aula

### Fáceis

#### F1 — `um-ou-seis`
- **Enunciado:** "Num dado, qual a probabilidade de sair 1 ou 6?"
- **Conta de conferência:** 2/6 = 1/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-3` | 1/3 | **sim** | "Isso. Sem casas comuns: 1/6 + 1/6 = 1/3." |
| `a1-6` | 1/6 | não | "1/6 é um número só. O 1 ou o 6: 2/6 = 1/3." |
| `a1-36` | 1/36 | não | "1/36 multiplica, como se fossem dois dados. No mesmo dado, soma: 1/3." |
| `a7-6` | 7/6 | não | "Probabilidade não passa de 1. São 2 casas de 6: 1/3." |

#### F2 — `nao-chover`
- **Enunciado:** "A chance de chover amanhã é 0,3. Qual a chance de não chover?"
- **Conta de conferência:** 1 − 0,3 = 0,7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a07` | 0,7 | **sim** | "Certo. O complemento é o que falta para 1." |
| `a03` | 0,3 | não | "0,3 é chover. Não chover: 1 − 0,3 = 0,7." |
| `a05` | 0,5 | não | "Os dois casos não têm a mesma chance. 1 − 0,3 = 0,7." |
| `am03` | −0,3 | não | "Probabilidade não é negativa. O complemento é 1 − 0,3 = 0,7." |

#### F3 — `intersecao-dado`
- **Enunciado:** "Num dado, A = par e B = maior que 4. Que casas formam A e B ao mesmo tempo?"
- **Conta de conferência:** {2, 4, 6} ∩ {5, 6} = {6}

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s6` | {6} | **sim** | "Isso. 6 é o único par maior que 4." |
| `s56` | {5, 6} | não | "5 é maior que 4, mas não é par. A interseção é {6}." |
| `uniao` | {2, 4, 5, 6} | não | "Isso é a união. A interseção pede as duas coisas: {6}." |
| `vazio` | Nenhuma | não | "O 6 é par e maior que 4. A interseção é {6}." |

#### F4 — `mesmo-lancamento`
- **Enunciado:** "Num único lançamento de dado, qual a probabilidade de sair 2 e 3 ao mesmo tempo?"
- **Conta de conferência:** sem casas comuns: 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | **sim** | "Certo. Uma face só aparece por vez: os eventos não se cruzam." |
| `a1-36` | 1/36 | não | "1/36 seria com dois dados. Num dado só, 2 e 3 juntos é impossível." |
| `a1-3` | 1/3 | não | "1/3 é 2 OU 3. Os dois juntos: 0." |
| `a1-6` | 1/6 | não | "Não há casa que seja 2 e 3 ao mesmo tempo. P = 0." |

### Médias

#### M1 — `par-ou-mult-3`
- **Enunciado:** "Num dado, qual a probabilidade de sair par ou múltiplo de 3?"
- **Conta de conferência:** {2, 4, 6} ∪ {3, 6} = {2, 3, 4, 6}: 4/6 = 2/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2-3` | 2/3 | **sim** | "Isso. 3/6 + 2/6 − 1/6 = 4/6." |
| `a5-6` | 5/6 | não | "O 6 entrou duas vezes. Descontando: 4/6 = 2/3." |
| `a1-2` | 1/2 | não | "1/2 são só os pares. Com o 3: 4/6 = 2/3." |
| `a1-6` | 1/6 | não | "1/6 é a interseção, o 6. A união é 4/6 = 2/3." |

#### M2 — `formula-uniao`
- **Enunciado:** "P(A) = 0,5, P(B) = 0,4 e P(A e B) = 0,2. Quanto vale P(A ou B)?"
- **Conta de conferência:** 0,5 + 0,4 − 0,2 = 0,7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a07` | 0,7 | **sim** | "Certo. Soma e desconta a interseção: 0,7." |
| `a09` | 0,9 | não | "0,9 conta a interseção duas vezes. Tirando 0,2: 0,7." |
| `a02` | 0,2 | não | "0,2 é A e B. A ou B: 0,5 + 0,4 − 0,2 = 0,7." |
| `a11` | 1,1 | não | "Probabilidade não passa de 1. A conta é 0,9 − 0,2 = 0,7." |

#### M3 — `tres-moedas-uma-cara`
- **Enunciado:** "Lançando três moedas, qual a probabilidade de sair pelo menos uma cara?"
- **Conta de conferência:** 1 − P(nenhuma) = 1 − 1/8 = 7/8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a7-8` | 7/8 | **sim** | "Isso. Só CCC fica de fora: 1 − 1/8." |
| `a3-8` | 3/8 | não | "3/8 é exatamente uma cara. Pelo menos uma: 1 − 1/8 = 7/8." |
| `a1-2` | 1/2 | não | "Pelo complemento: nenhuma cara é 1/8, então 7/8." |
| `a1-8` | 1/8 | não | "1/8 é nenhuma cara. O pedido é o complemento: 7/8." |

### Desafios

#### D1 — `mult-2-ou-3-ate-30`
- **Enunciado:** "Sorteia-se um número de 1 a 30. Qual a probabilidade de ser divisível por 2 ou por 3?"
- **Conta de conferência:** 15 + 10 − 5 = 20: 2/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2-3` | 2/3 | **sim** | "Certo. 15 + 10 − 5 = 20 de 30." |
| `a5-6` | 5/6 | não | "25 conta os múltiplos de 6 duas vezes. Descontando 5: 20/30 = 2/3." |
| `a1-2` | 1/2 | não | "1/2 são só os pares. Com os múltiplos de 3 ímpares: 2/3." |
| `a1-6` | 1/6 | não | "1/6 é a interseção. A união é 20/30 = 2/3." |

#### D2 — `pelo-menos-um-6`
- **Enunciado:** "Com dois dados, qual a probabilidade de sair pelo menos um 6?"
- **Conta de conferência:** 1 − 25/36 = 11/36

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a11-36` | 11/36 | **sim** | "Isso. Nenhum 6 ocupa 25 casas; sobram 11." |
| `a1-3` | 1/3 | não | "1/6 + 1/6 conta (6, 6) duas vezes. Fica 11/36." |
| `a1-36` | 1/36 | não | "1/36 é só (6, 6). Pelo menos um 6: 11/36." |
| `a25-36` | 25/36 | não | "25/36 é nenhum 6. O pedido é o complemento: 11/36." |

#### D3 — `achar-intersecao`
- **Enunciado:** "P(A ou B) = 0,8, P(A) = 0,5 e P(B) = 0,6. Quanto vale P(A e B)?"
- **Fala do Paco:** "Use a fórmula da união ao contrário."
- **Conta de conferência:** 0,5 + 0,6 − 0,8 = 0,3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a03` | 0,3 | **sim** | "Certo. 0,5 + 0,6 − 0,8 = 0,3." |
| `a11` | 1,1 | não | "1,1 é P(A) + P(B). Descontando a união: 0,3." |
| `a0` | 0 | não | "Se fosse 0, a união seria 1,1. Ela é 0,8: a interseção é 0,3." |
| `a02` | 0,2 | não | "0,8 − 0,6 = 0,2 esquece o A. A conta é 0,5 + 0,6 − 0,8 = 0,3." |

#### D4 — `nenhum-esporte`
- **Enunciado:** "Numa turma de 20, 12 jogam futebol, 10 vôlei e 5 os dois. Qual a chance de um sorteado não jogar nenhum?"
- **Conta de conferência:** união 12 + 10 − 5 = 17; nenhum 3: 3/20

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3-20` | 3/20 | **sim** | "Isso. 17 jogam algum; sobram 3 de 20." |
| `a0` | 0 | não | "12 + 10 passa de 20 porque 5 contam duas vezes. Jogam 17; nenhum: 3/20." |
| `a17-20` | 17/20 | não | "17/20 é jogar algum. O pedido é o complemento: 3/20." |
| `a1-4` | 1/4 | não | "A união é 17, não 15. Nenhum: 3/20." |

#### D5 — `minima-intersecao`
- **Enunciado:** "P(A) = 0,7 e P(B) = 0,6. Qual o menor valor possível de P(A e B)?"
- **Fala do Paco:** "Última. A união não pode passar de 1."
- **Conta de conferência:** 0,7 + 0,6 − 1 = 0,3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a03` | 0,3 | **sim** | "Certo. Com a união no máximo 1, sobra pelo menos 0,3 em comum." |
| `a0` | 0 | não | "Disjuntos somariam 1,3, mais que a grade toda. O mínimo é 0,3." |
| `a042` | 0,42 | não | "0,7 · 0,6 vale para independentes, não é o mínimo. O mínimo é 0,3." |
| `a06` | 0,6 | não | "0,6 é o máximo, com B dentro de A. O mínimo é 0,3." |

### Vestibular

#### V1 — `enem-2020-digital-gol`
- **Enunciado (resumido):** "Numa contagem de 1 a 103, diz-se GOL no lugar de cada múltiplo de 4 e de cada número terminado em 4. Quantas vezes se diz GOL?"
- **Fala do Paco:** "Conte cada grupo e veja quem está nos dois."
- **Fonte:** ENEM 2020 Digital (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (30) mantidos — **URL:** https://www.projetoagathaedu.com.br/questoes-enem/matematica-3/analise-combinatoria/pfc.php
- **Conta de conferência:** múltiplos de 4: 25; terminados em 4: 10; os dois (4, 24, 44, 64, 84): 5; 25 + 10 − 5 = 30

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20 | não | "20 desconta demais. 25 múltiplos de 4 + 10 terminados em 4 − 5 comuns = 30." |
| `a28` | 28 | não | "Os comuns são 5: 4, 24, 44, 64 e 84. Fica 25 + 10 − 5 = 30." |
| `a30` | 30 | **sim** | "Isso. 25 + 10 − 5 = 30." |
| `a35` | 35 | não | "35 conta 4, 24, 44, 64 e 84 duas vezes. Descontando: 30." |
| `a40` | 40 | não | "40 passa de tudo o que existe: 25 múltiplos de 4 e 10 terminados em 4, com 5 comuns. São 30." |

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** probabilidade da união com interseção não vazia.
- **Onde procurar:** ENEM, UFRGS, PUC-RS.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** complemento ("pelo menos um").
- **Onde procurar:** Fuvest, Unicamp, UERJ.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** diagrama de Venn com dados de pesquisa.
- **Onde procurar:** ENEM ("pesquisa", "preferem ambos").
