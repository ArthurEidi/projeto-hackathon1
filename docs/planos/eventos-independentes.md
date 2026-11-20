# Plano — Eventos independentes e multiplicação de probabilidades

**Aula:** 1 — A Pista que Não Diz Nada · Independência e a regra do produto
**Caminho:** aritmetica / combinatoria-e-probabilidade / eventos-independentes
**Pré-requisitos que o aluno já domina:** probabilidade condicional, interseção de eventos.

## a) Ancoragem mecânica
A máquina recebe dois eventos e testa se a pista B muda a chance de A. Se não muda (P(A | B) = P(A)), os eventos são independentes, e a chance de os dois acontecerem é o produto P(A) · P(B). A entrada são os dois eventos; a saída é o veredito e a probabilidade conjunta.

## b) Visual de partida
WIDGET NOVO `grade_resultados` na grade 6 × 6 de dois dados: A ocupa linhas inteiras (c1), B ocupa colunas inteiras (c2), e a interseção aparece como um retângulo (c3). Uma régua dupla compara P(A) com P(A | B). Modo extra: árvore de lançamentos repetidos de moeda.

## c) Caso neutro
A pista sobre o segundo dado não diz nada sobre o primeiro: dentro de qualquer coluna, a fração de linhas de A é a mesma. P(A | B) = P(A), a pista passa sem alterar nada.

## d) Panorama e recorte
Independência é a base da distribuição binomial e das simulações. Aqui: reconhecer independência, usar a regra do produto e notar quando ela falha (sem reposição, eventos do mesmo dado).

## e) Progressão por contraste
1. Dois dados, A no 1º e B no 2º: a pista não muda nada (referência).
2. A interseção é um retângulo: área = produto das frações.
3. Um dado só, A = par e B = maior que 3: a pista muda 1/2 para 2/3; dependentes.
4. Lançamentos repetidos: cada moeda corta a fatia pela metade, (1/2)ⁿ.

## f) Dedução causal da forma
Se A ocupa a fração p das linhas e B a fração q das colunas, o cruzamento ocupa p · q da grade, como a área de um retângulo dentro de um quadrado. Isso é o mesmo que dizer que, dentro de B, A continua com fração p: P(A ∩ B) = P(B) · P(A | B) = P(B) · P(A).

## g) Simulação espacial e fronteiras
Tirar sem reposição cria dependência: a segunda retirada vê uma urna diferente. Eventos disjuntos com chance positiva nunca são independentes (saber que um aconteceu zera o outro). A moeda não tem memória: depois de 3 caras, a próxima ainda é 1/2.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Evento A | Linhas da grade em que A acontece. |
| c2 | Evento B | Colunas da grade em que B acontece. |
| c3 | A e B | O retângulo onde as linhas de A cruzam as colunas de B. |
| c4 | Pista que muda | Informação que altera a chance: sinal de dependência. |

### Passo 1 — `pista-que-nao-muda`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `grade_resultados` (modo pista) — grade 6 × 6; A = 1º dado par (linhas 2, 4, 6) em c1; chave da pista B = 2º dado maior que 4 (colunas 5 e 6) em c2; régua compara P(A) e P(A | B). Emite `pista_ligada`.
- **Sliders:** nenhum
- **Paco (abertura):** "Dois dados: a pista diz que o segundo deu mais que 4. Isso muda a chance de o primeiro ser par?"
- **Interação do aluno:** liga a pista; as colunas 1 a 4 ficam cinza e a régua de A não se mexe.
- **Conclusão:** `pista_ligada ≥ 1`
- **Paco (conclusão):** "Não muda: dentro da pista, metade das casas ainda tem o primeiro par. A pista não fala nada de A, então são independentes."
- **Tati (dúvida):** `fim` — P: "Para que serve saber disso?" / R: "Com independência dá para multiplicar chances, e isso abre a binomial. Hoje vemos quando pode."

### Passo 2 — `retangulo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6
- **Widget:** `grade_resultados` — mesma grade; botão "A e B" acende o cruzamento 3 × 2 em c3, com as frações 1/2 e 1/3 nas bordas. Emite `intersecao_vista`.
- **Sliders:** nenhum
- **Paco (abertura):** "Acenda A e B juntos. Que forma tem a interseção, e quanto ela mede?"
- **Interação do aluno:** toca o botão e vê o retângulo com 6 casas.
- **Conclusão:** `intersecao_vista ≥ 1`
- **Paco (conclusão):** "Um retângulo de 3 por 2 casas: 6/36 = 1/6. É 1/2 · 1/3: a chance conjunta é área de retângulo."

### Passo 3 — `dependentes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7
- **Widget:** `grade_resultados` (modo pista) — um dado só; A = par (c1), pista B = maior que 3 (c2); a régua de A pula de 1/2 para 2/3 e fica com contorno c4. Emite `pista_ligada`.
- **Sliders:** nenhum
- **Paco (abertura):** "Agora um dado só: A é par e B é maior que 3. A pista B muda a chance de A?"
- **Interação do aluno:** liga a pista e vê a régua subir.
- **Conclusão:** `pista_ligada ≥ 1`
- **Paco (conclusão):** "Muda: de 1/2 para 2/3, porque 4 e 6 dominam a pista. Os eventos são dependentes e o produto 1/2 · 1/2 falha."

### Passo 4 — `moeda-sem-memoria`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7, 6
- **Widget:** `grade_resultados` (modo árvore) — árvore de n lançamentos de moeda; o caminho "só caras" fica aceso e mostra sua fração.
- **Sliders:** `n` · "Lançamentos" · 1..4 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Uma moeda não tem memória: qual a chance de 3 caras seguidas? Aumente os lançamentos e veja a fatia encolher."
- **Interação do aluno:** move n; a fatia do caminho "só caras" cai pela metade a cada lançamento.
- **Conclusão:** `n ≥ 3`
- **Paco (conclusão):** "Cada lançamento corta a chance pela metade: (1/2)³ = 1/8."
- **Tati (dúvida):** `fim` — P: "Depois de 3 caras, a quarta tende a ser coroa?" / R: "Não: a moeda não lembra. A próxima continua 1/2."

### Passo 5 — `desafio-dado-e-moeda`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — grade 2 × 6 (moeda × dado).
- **Paco (abertura):** "Moeda e dado não se influenciam. Que retângulo você precisa?"
- **Enunciado:** "Lançam-se uma moeda e um dado. Qual a probabilidade de sair cara e 6?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a2-3` | 2/3 | não | "1/2 + 1/6 soma chances, mas o pedido é 'e'. Multiplica: 1/12." | linha e coluna acesas inteiras |
| `a1-12` | 1/12 | **sim** | "Isso. Independentes: 1/2 · 1/6 = 1/12." | uma casa acesa em c3 |
| `a1-8` | 1/8 | não | "1/8 seria com 8 casas. A grade tem 2 · 6 = 12: 1/12." | grade 2 × 6 contada |
| `a7-12` | 7/12 | não | "7/12 é cara ou 6. Cara e 6: só uma casa, 1/12." | união acesa, interseção piscando |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — grade 6 × 6 com o retângulo 3 × 2.
- **Fórmula:** `P(A ∩ B)`→c3 · `=` · `P(A)`→c1 · `·` · `P(B)`→c2
- **Definições:** "Independentes: saber B não muda a chance de A, P(A | B) = P(A)." · "Regra do produto: só vale para eventos independentes." · "Sem reposição, as retiradas costumam ser dependentes."
- **Paco (abertura):** "Se A ocupa a mesma fração dentro de B e fora dele, a interseção é um retângulo. Por isso a chance conjunta é o produto."
- **Dica (hint):** "Toque em uma letra para ver suas linhas e colunas."

**Frase de encerramento (outro):** "Você testou pistas que não dizem nada: quando a chance não muda, os eventos são independentes e as probabilidades se multiplicam."

## i) Treino pós-aula

### Fáceis

#### F1 — `duas-caras`
- **Enunciado:** "Duas moedas são lançadas. Qual a probabilidade de saírem duas caras?"
- **Conta de conferência:** 1/2 · 1/2 = 1/4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-4` | 1/4 | **sim** | "Isso. 1/2 · 1/2 = 1/4." |
| `a1-2` | 1/2 | não | "1/2 é uma moeda só. As duas: 1/2 · 1/2 = 1/4." |
| `a1` | 1 | não | "1/2 + 1/2 soma, mas é 'e'. Multiplica: 1/4." |
| `a1-3` | 1/3 | não | "Os 3 'tipos' não têm a mesma chance. KK é 1 de 4." |

#### F2 — `par-e-coroa`
- **Enunciado:** "Num dado e numa moeda, qual a chance de sair par e coroa?"
- **Conta de conferência:** 1/2 · 1/2 = 1/4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-4` | 1/4 | **sim** | "Certo. Independentes: 1/2 · 1/2." |
| `a1` | 1 | não | "Somar dá 1, mas é 'e'. Produto: 1/4." |
| `a1-12` | 1/12 | não | "1/12 é um número específico com coroa. Par tem 3 faces: 1/4." |
| `a1-2` | 1/2 | não | "1/2 é só par. Com coroa: 1/2 · 1/2 = 1/4." |

#### F3 — `sem-memoria`
- **Enunciado:** "Uma moeda deu 5 caras seguidas. Qual a chance de a próxima ser cara?"
- **Conta de conferência:** independente: 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-2` | 1/2 | **sim** | "Isso. A moeda não lembra o passado." |
| `a1-64` | 1/64 | não | "1/64 é seis caras seguidas desde o início. A próxima sozinha: 1/2." |
| `menor` | Menos que 1/2 | não | "A moeda não compensa sequências. Continua 1/2." |
| `maior` | Mais que 1/2 | não | "Uma moeda justa não pega embalo. Continua 1/2." |

#### F4 — `sem-reposicao-depende`
- **Enunciado:** "Tirar duas cartas de um baralho sem devolver a primeira: as retiradas são independentes?"
- **Conta de conferência:** a 2ª vê um baralho diferente

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `nao` | Não | **sim** | "Certo. A primeira carta muda o baralho da segunda." |
| `sim` | Sim | não | "Sem devolver, o baralho da segunda retirada muda. São dependentes." |

### Médias

#### M1 — `produto-03-05`
- **Enunciado:** "A e B são independentes, com P(A) = 0,3 e P(B) = 0,5. Quanto vale P(A e B)?"
- **Conta de conferência:** 0,3 · 0,5 = 0,15

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a015` | 0,15 | **sim** | "Isso. Independentes: multiplica." |
| `a08` | 0,8 | não | "0,8 é a soma. 'E' independente é produto: 0,15." |
| `a06` | 0,6 | não | "0,3 / 0,5 não é a conta. Produto: 0,15." |
| `a065` | 0,65 | não | "0,65 é P(A ou B). P(A e B) = 0,15." |

#### M2 — `tres-seis`
- **Enunciado:** "Lançando três dados, qual a chance de os três darem 6?"
- **Conta de conferência:** (1/6)³ = 1/216

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-216` | 1/216 | **sim** | "Certo. 1/6 · 1/6 · 1/6." |
| `a1-18` | 1/18 | não | "1/18 soma os denominadores. Produto: 1/216." |
| `a1-2` | 1/2 | não | "1/6 + 1/6 + 1/6 soma, mas é 'e'. Produto: 1/216." |
| `a1-36` | 1/36 | não | "1/36 vale para dois dados. Com três: 1/216." |

#### M3 — `sao-independentes`
- **Enunciado:** "P(A) = 0,4, P(B) = 0,5 e P(A e B) = 0,2. A e B são independentes?"
- **Conta de conferência:** 0,4 · 0,5 = 0,2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sim` | Sim | **sim** | "Isso. O produto 0,4 · 0,5 é exatamente 0,2." |
| `nao` | Não | não | "Compare: 0,4 · 0,5 = 0,2, igual a P(A e B). São independentes." |

### Desafios

#### D1 — `uniao-independentes`
- **Enunciado:** "A e B independentes, P(A) = 0,5 e P(B) = 0,4. Quanto vale P(A ou B)?"
- **Fala do Paco:** "Ache a interseção pelo produto e use a fórmula da união."
- **Conta de conferência:** 0,5 + 0,4 − 0,2 = 0,7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a07` | 0,7 | **sim** | "Certo. Interseção 0,2, união 0,9 − 0,2 = 0,7." |
| `a09` | 0,9 | não | "0,9 conta a interseção duas vezes. Ela vale 0,2: união 0,7." |
| `a02` | 0,2 | não | "0,2 é A e B. A ou B: 0,5 + 0,4 − 0,2 = 0,7." |
| `a1` | 1 | não | "Não é certeza. 0,5 + 0,4 − 0,2 = 0,7." |

#### D2 — `pelo-menos-um-6-tres`
- **Enunciado:** "Lançando três dados, qual a chance de sair pelo menos um 6?"
- **Conta de conferência:** 1 − (5/6)³ = 1 − 125/216 = 91/216

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a91` | 91/216 | **sim** | "Isso. Nenhum 6 é (5/6)³ = 125/216; o resto é 91/216." |
| `a1-2` | 1/2 | não | "1/6 + 1/6 + 1/6 conta repetições. Pelo complemento: 91/216." |
| `a125` | 125/216 | não | "125/216 é nenhum 6. Pelo menos um: 91/216." |
| `a1-216` | 1/216 | não | "1/216 são três 6. Pelo menos um: 1 − 125/216 = 91/216." |

#### D3 — `com-reposicao`
- **Enunciado:** "Urna com 2 vermelhas e 3 azuis; tiram-se duas bolas, devolvendo a primeira. Qual a chance de as duas serem vermelhas?"
- **Conta de conferência:** 2/5 · 2/5 = 4/25

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4-25` | 4/25 | **sim** | "Certo. Com reposição a urna se repete: 2/5 · 2/5." |
| `a1-10` | 1/10 | não | "1/10 seria sem reposição. Devolvendo: 4/25." |
| `a4-5` | 4/5 | não | "2/5 + 2/5 soma, mas é 'e'. Produto: 4/25." |
| `a2-5` | 2/5 | não | "2/5 é uma retirada. As duas: 4/25." |

#### D4 — `sem-reposicao`
- **Enunciado:** "Mesma urna, agora sem devolver a primeira bola. Qual a chance de as duas serem vermelhas?"
- **Conta de conferência:** 2/5 · 1/4 = 1/10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-10` | 1/10 | **sim** | "Isso. Depois da primeira vermelha, sobra 1 em 4: 2/5 · 1/4." |
| `a4-25` | 4/25 | não | "4/25 supõe reposição. Sem ela, a segunda é 1/4: 1/10." |
| `a2-9` | 2/9 | não | "Sem reposição a urna tem 4 bolas, com 1 vermelha. 2/5 · 1/4 = 1/10." |
| `a1-4` | 1/4 | não | "1/4 é só a segunda retirada. Vezes 2/5: 1/10." |

#### D5 — `condicional-dependentes`
- **Enunciado:** "P(A) = 0,6, P(B) = 0,5 e P(A e B) = 0,4. Quanto vale P(A | B)?"
- **Fala do Paco:** "Última. Compare o resultado com P(A): eles são independentes?"
- **Conta de conferência:** 0,4 / 0,5 = 0,8 ≠ 0,6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a08` | 0,8 | **sim** | "Certo. 0,4 / 0,5 = 0,8, diferente de 0,6: são dependentes." |
| `a06` | 0,6 | não | "0,6 supõe independência. A conta dá 0,4 / 0,5 = 0,8." |
| `a03` | 0,3 | não | "0,3 é 0,6 · 0,5. A condicional é 0,4 / 0,5 = 0,8." |
| `a04` | 0,4 | não | "0,4 é A e B. Dividindo por P(B): 0,8." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2023-urnas`
- **Enunciado (resumido):** "P(preta em A) = 20%; B tem 4 pretas e 12 brancas (25%); quantas brancas pôr em B para P(duas pretas) <= 1%?"
- **Fala do Paco:** "Escreva P(A e B) = 0,20 × 4/(16 + x) <= 0,01 e isole x."
- **Fonte:** ENEM 2023 (adaptada) — **Adaptação:** Questão 138: enunciado resumido; alternativas e gabarito (64) mantidos. — **URL:** https://api.enem.dev/v1/exams/2023/questions/138
- **Conta de conferência:** 0,20 · 4 / (16 + x) <= 0,01 => 16 + x >= 80 => x >= 64.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20 | não | "Com 20 brancas a mais, B teria 36 bolas e 0,20 × 4/36 ≈ 2,2% > 1%; precisa 16 + x >= 80, logo x = 64." |
| `a60` | 60 | não | "Com 60, B teria 76 bolas e 0,8/76 ≈ 1,05% > 1%; faltam 4 para chegar a 80: 64." |
| `a64` | 64 | **sim** | "Exato. 0,20 × 4/(16 + x) <= 0,01 dá 16 + x >= 80, logo x = 64." |
| `a68` | 68 | não | "68 = 80 − 12 desconta só as 12 brancas; as 4 pretas também já estão em B. De 16 para 80 bolas faltam 64." |
| `a80` | 80 | não | "80 é o total final de bolas em B, não as adicionadas; tirando as 16 iniciais, são 64." |

#### V2 — `enem-2021-dardos`
- **Enunciado (resumido):** "Cada dardo acerta o alvo com chance 1/2; quantos dardos lançar para acertar pelo menos um com chance >= 9/10?"
- **Fala do Paco:** "Use o complementar: a chance de errar todos os n dardos é (1/2)ⁿ <= 1/10."
- **Fonte:** ENEM 2021 (adaptada) — **Adaptação:** Questão 142: enunciado resumido; alternativas e gabarito (4) mantidos. — **URL:** https://api.enem.dev/v1/exams/2021/questions/142
- **Conta de conferência:** 1 − (1/2)ⁿ >= 9/10 => 2ⁿ >= 10 => n = 4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | não | "Com 2 dardos, 1 − 1/4 = 3/4 = 0,75 < 0,9; precisa de 2ⁿ >= 10, logo n = 4." |
| `a4` | 4 | **sim** | "Isso. 1 − (1/2)⁴ = 15/16 = 0,9375 >= 0,9, e com 3 dardos daria 7/8 = 0,875." |
| `a6` | 6 | não | "Com 6 passa de 9/10, mas 4 já basta: 1 − 1/16 = 15/16 >= 9/10." |
| `a9` | 9 | não | "9 vem do numerador de 9/10. O que se exige é errar todos com chance (1/2)ⁿ <= 1/10: 2⁴ = 16 >= 10, logo n = 4." |
| `a10` | 10 | não | "10 vem de comparar 1/n <= 1/10; o decaimento é exponencial (1/2)ⁿ, então n = 4." |

#### V3 — `enem-2019-placas`
- **Enunciado (resumido):** "Cada placa é vista com chance 1/2 e já existe 1 placa; quantas novas instalar para ver ao menos uma com chance > 99/100?"
- **Fala do Paco:** "Ache o total n com (1/2)ⁿ < 1/100 e lembre de descontar a placa que já existe."
- **Fonte:** ENEM 2019 (adaptada) — **Adaptação:** Questão 159: enunciado resumido; alternativas e gabarito (6) mantidos. — **URL:** https://api.enem.dev/v1/exams/2019/questions/159
- **Conta de conferência:** 1 − (1/2)ⁿ > 99/100 => 2ⁿ > 100 => n = 7; novas = 7 − 1 = 6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a99` | 99 | não | "Com 99 novas a chance passa de 99%, mas não é o mínimo: (1/2)⁷ < 1/100, então 7 placas no total bastam, 6 novas." |
| `a51` | 51 | não | "Com 51 novas também passa de 99%, mas sobra placa: (1/2)⁷ = 1/128 < 1/100 já com 7 no total, ou 6 novas." |
| `a50` | 50 | não | "50 é 100 ÷ 2, como se cada placa somasse um pouco de chance. Não ver nenhuma tem chance (1/2)ⁿ; 2⁷ = 128 > 100: 7 placas, 6 novas." |
| `a6` | 6 | **sim** | "Exato. 2⁷ = 128 > 100 exige 7 placas no total; descontando 1 existente, são 6 novas." |
| `a1` | 1 | não | "Com 1 nova seriam 2 placas e chance 3/4 = 75%; para > 99% são 7 no total, 6 novas." |

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** decidir se dois eventos são independentes.
- **Onde procurar:** UFPR, UnB, PUC-Rio.
