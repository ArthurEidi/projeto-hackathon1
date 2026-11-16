# Plano — Ensaios repetidos e distribuição binomial

**Aula:** 1 — Caminhos de Sucesso e Fracasso · A distribuição binomial
**Caminho:** aritmetica / combinatoria-e-probabilidade / experimentos-binomial-e-repetidos
**Pré-requisitos que o aluno já domina:** combinações C(n, k), eventos independentes, binômio de Newton.

## a) Ancoragem mecânica
A máquina repete n vezes o mesmo ensaio independente, com chance p de sucesso, e devolve a chance de sair exatamente k sucessos. As entradas são n, p e k; a saída é P(k). Cada sequência de sucessos e fracassos é um caminho de uma árvore.

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo árvore: n níveis, galho de sucesso (c2) e de fracasso (c3); as pontas se agrupam em barras pelo número de sucessos (k). Cada ponta mostra a chance do caminho. Sliders de n (1 a 4) e de p (0% a 100%).

## c) Caso neutro
n = 1: um ensaio só, P(1 sucesso) = p e P(0) = 1 − p. Não há caminhos a combinar. Depois cada ensaio novo dobra os caminhos.

## d) Panorama e recorte
Há distribuições com ensaios dependentes (hipergeométrica), média e desvio da binomial e a curva normal. Aqui: n pequeno, ensaios independentes, chance de exatamente k sucessos.

## e) Progressão por contraste
1. n = 1: p e 1 − p (referência).
2. Moeda, n = 3: barras 1, 3, 3, 1; todos os caminhos valem 1/8.
3. Dado (sucesso = 6), n = 3: caminhos com um 6 valem 25/216 cada, diferente dos outros grupos.
4. p deslizando: as barras escorregam para k = 0 ou k = n; com p = 50% ficam simétricas.

## f) Dedução causal da forma
Um caminho com k sucessos e n − k fracassos tem chance pᵏ (1 − p)ⁿ⁻ᵏ, porque os ensaios são independentes e as chances se multiplicam. Todos os caminhos com k sucessos valem o mesmo, e há C(n, k) deles (escolher em quais ensaios veio o sucesso). Por isso P(k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ.

## g) Simulação espacial e fronteiras
p = 0 e p = 1 concentram tudo num extremo. Somando P(k) para todo k dá 1 (é o binômio (p + (1 − p))ⁿ). "Pelo menos um" é mais rápido pelo complemento (1 − p)ⁿ. Sem independência (retirar sem repor), cada caminho tem chance própria e a fórmula não vale.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Caminhos | Quantas sequências têm exatamente k sucessos: C(n, k). |
| c2 | Sucesso | Resultado que contamos, com chance p em cada ensaio. |
| c3 | Fracasso | Qualquer outro resultado, com chance 1 − p. |
| c4 | Ensaios | Quantas vezes o experimento é repetido (n). |

### Passo 1 — `um-ensaio`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `grade_resultados` (modo árvore) — moeda (sucesso = cara); pontas agrupadas em barras por k.
- **Sliders:** `n` · "Lançamentos" · 1..3 · passo 1 · inicial 1 · c4
- **Paco (abertura):** "Um lançamento: qual a chance de 1 cara? Depois aumente para 3 e veja os caminhos se agruparem por número de caras."
- **Interação do aluno:** move n e vê as pontas formarem as barras 1, 3, 3, 1.
- **Conclusão:** `n ≥ 3`
- **Paco (conclusão):** "Com 3 lançamentos, 1 caminho dá 0 caras, 3 dão 1, 3 dão 2 e 1 dá 3. É a linha do binômio."
- **Tati (dúvida):** `fim` — P: "Isso vale para qualquer experimento repetido?" / R: "Vale se os ensaios forem independentes e iguais. Hoje: moedas, dados e chutes."

### Passo 2 — `cada-caminho`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6
- **Widget:** `grade_resultados` (modo árvore) — n = 3; tocar uma ponta mostra 1/2 · 1/2 · 1/2. Emite `pontas_k2` (pontas com 2 caras tocadas).
- **Sliders:** nenhum
- **Paco (abertura):** "Cada caminho de 3 lançamentos tem a mesma chance? Toque nos caminhos com 2 caras e some."
- **Interação do aluno:** toca KKC, KCK e CKK.
- **Conclusão:** `pontas_k2 ≥ 3`
- **Paco (conclusão):** "Cada caminho vale 1/8, e há 3 com duas caras: 3 · 1/8 = 3/8."

### Passo 3 — `dado-sucesso-6`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6
- **Widget:** `grade_resultados` (modo árvore) — dado lançado 3 vezes; sucesso = 6 (c2, 1/6), fracasso (c3, 5/6). Emite `pontas_k1`.
- **Sliders:** nenhum
- **Paco (abertura):** "Agora sucesso é tirar 6. Os caminhos com exatamente um 6 ainda valem todos o mesmo?"
- **Interação do aluno:** toca os 3 caminhos com um 6 e lê a chance de cada.
- **Conclusão:** `pontas_k1 ≥ 3`
- **Paco (conclusão):** "Valem o mesmo entre si: 1/6 · 5/6 · 5/6 = 25/216. Com 3 caminhos, 75/216."

### Passo 4 — `p-desliza`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `grade_resultados` (modo barras) — n = 4; barras de P(k) para k = 0..4.
- **Sliders:** `p` · "Chance de sucesso" · 0..100 · passo 10 · inicial 50 · unidade "%" · c2
- **Paco (abertura):** "Leve a chance de sucesso de 50% para perto de 100%. Para onde as barras escorregam?"
- **Interação do aluno:** move p e vê a massa ir para a direita.
- **Conclusão:** `p ≥ 90`
- **Paco (conclusão):** "Escorregam para k = 4: com sucesso quase certo, quase todo caminho é só sucesso. Em 50% elas ficam simétricas."
- **Tati (dúvida):** `fim` — P: "E se os ensaios não forem independentes?" / R: "Aí cada caminho tem chance própria e a fórmula não vale."

### Passo 5 — `desafio-quatro-moedas`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — barras 1, 4, 6, 4, 1 apagadas para n = 4.
- **Paco (abertura):** "Quantos caminhos, e quanto vale cada um?"
- **Enunciado:** "Lançando 4 moedas, qual a probabilidade de sair exatamente 2 caras?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a1-2` | 1/2 | não | "Os 5 valores de k não têm a mesma chance. São 6 caminhos de 1/16: 3/8." | barras com alturas diferentes |
| `a1-16` | 1/16 | não | "1/16 é um caminho só. Há C(4, 2) = 6: 6/16 = 3/8." | uma ponta acesa |
| `a3-8` | 3/8 | **sim** | "Isso. 6 caminhos de 1/16: 6/16 = 3/8." | barra k = 2 acesa com 6 pontas |
| `a1-4` | 1/4 | não | "Faltou contar os caminhos certos: C(4, 2) = 6, e 6/16 = 3/8." | 4 pontas acesas, 2 piscando |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — árvore de 3 lançamentos de dado com os 3 caminhos de um 6 acesos.
- **Fórmula:** `P(k)` · `=` · `C(n, k)`→c1 · `·` · `pᵏ`→c2 · `·` · `(1 − p)ⁿ⁻ᵏ`→c3
- **Definições:** "Ensaios de Bernoulli: repetições independentes com dois resultados." · "Cada caminho com k sucessos vale pᵏ (1 − p)ⁿ⁻ᵏ." · "Há C(n, k) caminhos com k sucessos."
- **Paco (abertura):** "Cada caminho multiplica as chances dos seus ensaios, e há C(n, k) caminhos iguais. Por isso a fórmula é o produto dos três."
- **Dica (hint):** "Toque em uma parte da fórmula para ver o que ela conta na árvore."

**Frase de encerramento (outro):** "Você contou caminhos de sucesso e fracasso: C(n, k) caminhos, cada um valendo pᵏ (1 − p)ⁿ⁻ᵏ."

## i) Treino pós-aula

### Fáceis

#### F1 — `duas-moedas-uma-cara`
- **Enunciado:** "Lançando duas moedas, qual a chance de exatamente uma cara?"
- **Conta de conferência:** KC, CK: 2/4 = 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-2` | 1/2 | **sim** | "Isso. 2 caminhos de 1/4." |
| `a1-4` | 1/4 | não | "1/4 é um caminho só. KC e CK: 1/2." |
| `a1-3` | 1/3 | não | "Os 3 valores de k não têm a mesma chance. 2 caminhos de 4: 1/2." |
| `a3-4` | 3/4 | não | "3/4 é pelo menos uma cara. Exatamente uma: 1/2." |

#### F2 — `caminhos-k2-n3`
- **Enunciado:** "Em 3 lançamentos de moeda, quantos caminhos têm exatamente 2 caras?"
- **Conta de conferência:** C(3, 2) = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Certo. KKC, KCK e CKK." |
| `a2` | 2 | não | "A coroa pode estar em 3 lugares. São 3 caminhos." |
| `a8` | 8 | não | "8 são todos os caminhos. Com 2 caras: 3." |
| `a6` | 6 | não | "6 é 3 · 2, contando ordens das caras iguais. São C(3, 2) = 3." |

#### F3 — `fracasso`
- **Enunciado:** "Num ensaio, o sucesso tem chance 0,3. Qual a chance de fracasso?"
- **Conta de conferência:** 1 − 0,3 = 0,7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a07` | 0,7 | **sim** | "Isso. Fracasso é o complemento." |
| `a03` | 0,3 | não | "0,3 é o sucesso. Fracasso: 0,7." |
| `a05` | 0,5 | não | "Os dois resultados não precisam ter a mesma chance. 1 − 0,3 = 0,7." |
| `a009` | 0,09 | não | "0,09 é 0,3². Fracasso: 1 − 0,3 = 0,7." |

#### F4 — `valor-de-um-caminho`
- **Enunciado:** "Em 3 lançamentos de moeda, quanto vale a chance de um caminho específico, como KCK?"
- **Conta de conferência:** (1/2)³ = 1/8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-8` | 1/8 | **sim** | "Certo. 1/2 · 1/2 · 1/2." |
| `a3-8` | 3/8 | não | "3/8 soma os 3 caminhos com 2 caras. Um caminho só: 1/8." |
| `a1-2` | 1/2 | não | "1/2 é um lançamento. Três: 1/8." |
| `a1-6` | 1/6 | não | "1/6 é de dado. Moeda, 3 vezes: 1/8." |

### Médias

#### M1 — `tres-moedas-uma-cara`
- **Enunciado:** "Lançando 3 moedas, qual a chance de exatamente uma cara?"
- **Conta de conferência:** 3 · 1/8 = 3/8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3-8` | 3/8 | **sim** | "Isso. 3 caminhos de 1/8." |
| `a1-8` | 1/8 | não | "1/8 é um caminho. Há 3: 3/8." |
| `a1-3` | 1/3 | não | "Contando caminhos: 3 de 8, não 1 de 3." |
| `a7-8` | 7/8 | não | "7/8 é pelo menos uma. Exatamente uma: 3/8." |

#### M2 — `quatro-caras`
- **Enunciado:** "Lançando 4 moedas, qual a chance de saírem 4 caras?"
- **Conta de conferência:** (1/2)⁴ = 1/16

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-16` | 1/16 | **sim** | "Certo. Um único caminho, KKKK." |
| `a1-8` | 1/8 | não | "1/8 vale para 3 moedas. Com 4: 1/16." |
| `a1-4` | 1/4 | não | "1/4 é com duas moedas. Quatro caras: 1/16." |
| `a4-16` | 4/16 | não | "Só há um caminho com 4 caras: 1/16." |

#### M3 — `um-seis-em-dois`
- **Enunciado:** "Lançando 2 dados, qual a chance de exatamente um 6?"
- **Conta de conferência:** 2 · 1/6 · 5/6 = 10/36 = 5/18

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5-18` | 5/18 | **sim** | "Isso. 2 caminhos de 5/36." |
| `a5-36` | 5/36 | não | "5/36 é um caminho só. O 6 pode vir em qualquer dado: 10/36." |
| `a11-36` | 11/36 | não | "11/36 inclui (6, 6). Exatamente um: 10/36 = 5/18." |
| `a1-3` | 1/3 | não | "1/6 + 1/6 não desconta o outro dado. 2 · 1/6 · 5/6 = 5/18." |

### Desafios

#### D1 — `cinco-moedas-duas`
- **Enunciado:** "Lançando 5 moedas, qual a chance de exatamente 2 caras?"
- **Conta de conferência:** C(5, 2) / 32 = 10/32 = 5/16

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5-16` | 5/16 | **sim** | "Certo. 10 caminhos de 1/32." |
| `a2-5` | 2/5 | não | "2 de 5 moedas não é a chance. 10 caminhos de 32: 5/16." |
| `a1-32` | 1/32 | não | "1/32 é um caminho. Há C(5, 2) = 10." |
| `a1-6` | 1/6 | não | "Os 6 valores de k não têm a mesma chance. 10/32 = 5/16." |

#### D2 — `chute-vf`
- **Enunciado:** "Num teste de 3 questões de verdadeiro ou falso, um aluno chuta tudo. Qual a chance de acertar pelo menos 2?"
- **Fala do Paco:** "Some as barras k = 2 e k = 3."
- **Conta de conferência:** (3 + 1) / 8 = 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-2` | 1/2 | **sim** | "Isso. 3 caminhos com 2 acertos e 1 com 3: 4/8." |
| `a3-8` | 3/8 | não | "3/8 é exatamente 2. Com os 3 acertos: 1/2." |
| `a1-8` | 1/8 | não | "1/8 é acertar tudo. Pelo menos 2: 4/8." |
| `a2-3` | 2/3 | não | "2 de 3 questões não é a chance. Contando caminhos: 4/8 = 1/2." |

#### D3 — `nenhum-sucesso`
- **Enunciado:** "Um ensaio tem chance 0,2 de sucesso. Repetido 3 vezes, qual a chance de nenhum sucesso?"
- **Conta de conferência:** 0,8³ = 0,512

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0512` | 0,512 | **sim** | "Certo. Três fracassos: 0,8 · 0,8 · 0,8." |
| `a0008` | 0,008 | não | "0,008 é 0,2³, três sucessos. Nenhum: 0,8³ = 0,512." |
| `a04` | 0,4 | não | "0,8 − 0,2 − 0,2 não é a conta. Produto: 0,512." |
| `a024` | 0,24 | não | "Nenhum sucesso é um único caminho, três fracassos seguidos: 0,8³ = 0,512." |

#### D4 — `dois-seis-em-quatro`
- **Enunciado:** "Lançando 4 dados, qual a chance de exatamente dois 6?"
- **Fala do Paco:** "Conte os caminhos e calcule um deles."
- **Conta de conferência:** 6 · (1/6)² · (5/6)² = 150/1296 = 25/216

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a25-216` | 25/216 | **sim** | "Isso. 6 caminhos de 25/1296: 150/1296 = 25/216." |
| `a25-1296` | 25/1296 | não | "25/1296 é um caminho só. Há C(4, 2) = 6: 25/216." |
| `a1-36` | 1/36 | não | "1/36 esquece os dois fracassos e os caminhos. 6 · (1/6)² · (5/6)² = 25/216." |
| `a1-3` | 1/3 | não | "2 de 6 faces não é a conta. Binomial: 25/216." |

#### D5 — `k-mais-provavel`
- **Enunciado:** "Lançando 4 moedas, qual número de caras é o mais provável?"
- **Fala do Paco:** "Última. Pense nas barras 1, 4, 6, 4, 1."
- **Conta de conferência:** C(4, 2) = 6 é o maior

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | **sim** | "Certo. k = 2 tem 6 caminhos, o maior grupo." |
| `a4` | 4 | não | "4 caras é um caminho só. O maior grupo é k = 2, com 6." |
| `a0` | 0 | não | "0 caras é um caminho só. O pico fica no meio, k = 2." |
| `igual` | Todos iguais | não | "As barras são 1, 4, 6, 4, 1. O mais provável é k = 2." |

### Vestibular

#### V1 — ENEM 2022 — Questão 137 (`enem-2022-world-series`)
- **Habilidade-alvo:** ensaios repetidos independentes com `p = 1/2` (série de até 7 jogos, faltando ao menos 3 vitórias em 6 jogos: `42/64`).

#### V2 — ENEM 2009 — Questão 145 (`enem-2009-celulares-defeito`)
- **Habilidade-alvo:** fórmula binomial direta em 4 ensaios com `p = 0,2%` (`C(4,2) · (0,2%)² · (99,8%)²`).

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** pelo menos um sucesso pelo complemento.
- **Onde procurar:** Unicamp, UERJ.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** reconhecer quando a binomial se aplica.
- **Onde procurar:** UnB, UFPR.
