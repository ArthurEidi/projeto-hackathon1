# Plano — Probabilidade, espaço amostral e eventos

**Aula:** 1 — A Fração da Grade · Casos favoráveis sobre casos possíveis
**Caminho:** aritmetica / combinatoria-e-probabilidade / probabilidade-espaco-amostral
**Pré-requisitos que o aluno já domina:** princípio fundamental da contagem, frações.

## a) Ancoragem mecânica
A máquina recebe um sorteio justo (todos os resultados com a mesma chance) e um evento, e devolve a probabilidade do evento. A entrada é o evento escolhido; a saída é a fração da grade de resultados que ele ocupa: P(A) = n(A) / n(Ω).

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo sorteio: cada resultado possível é uma casa (1 × 6 para um dado, 6 × 6 para dois dados, 2 × 2 para duas moedas). O aluno toca casas para montar o evento (c1); uma régua de 0 a 1 (c3) mostra a fração acesa.

## c) Caso neutro
O evento certo ("sair um número de 1 a 6") acende a grade inteira: P = 1. O impossível ("sair 7") não acende nada: P = 0. Todo evento fica entre esses dois extremos.

## d) Panorama e recorte
Há probabilidade de união, condicional, independência, binomial e sorteios com chances diferentes. Aqui: espaço amostral de resultados igualmente prováveis e a razão favoráveis / possíveis.

## e) Progressão por contraste
1. Um dado, evento "par": 3 de 6 casas (referência).
2. Extremos: certo (1) e impossível (0).
3. Dois dados: a grade vira um quadrado 6 × 6; a soma 7 é uma diagonal de 6 casas, a soma 2 é uma casa só.
4. Duas moedas: "uma cara e uma coroa" ocupa 2 casas (KC e CK), não 1 de 3.

## f) Dedução causal da forma
Se as n(Ω) casas têm a mesma chance, cada uma vale 1/n(Ω). Um evento com n(A) casas junta n(A) desses pedaços. Por isso P(A) = n(A) / n(Ω), e o valor só pode ir de 0 (nenhuma casa) a 1 (todas).

## g) Simulação espacial e fronteiras
A razão só vale com resultados igualmente prováveis: "cara-coroa" listado como um resultado só engana. Probabilidade nunca é negativa nem passa de 1. A grade de dois dados mostra que somas do meio têm mais casas que as das pontas.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Casos favoráveis | Casas da grade que fazem o evento acontecer, n(A). |
| c2 | Espaço amostral | Todas as casas possíveis do sorteio, n(Ω). |
| c3 | Probabilidade | Fração da grade ocupada pelo evento, entre 0 e 1. |
| c4 | Evento certo | Evento que ocupa a grade inteira, com probabilidade 1. |

### Passo 1 — `um-dado`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 4 (panorama)
- **Widget:** WIDGET NOVO `grade_resultados` (modo sorteio) — fila de 6 faces (c2); tocar acende a face (c1); régua 0–1 (c3) com a fração. Emite `marcadas_certas` (casas do evento pedido que estão acesas).
- **Sliders:** nenhum
- **Paco (abertura):** "Um dado tem 6 faces. Toque nas faces pares: que fração da fila ficou acesa?"
- **Interação do aluno:** acende 2, 4 e 6 e vê a régua chegar a 1/2.
- **Conclusão:** `marcadas_certas ≥ 3`
- **Paco (conclusão):** "3 de 6 acesas: P(par) = 3/6 = 1/2. Probabilidade é a fração da grade que o evento ocupa."
- **Tati (dúvida):** `fim` — P: "Isso funciona para qualquer sorteio?" / R: "Só quando os resultados têm a mesma chance. Hoje: dados, moedas e urnas justos."

### Passo 2 — `certo-e-impossivel`
- **Tipo:** `interactive_canvas`
- **Pilares:** 3 (caso neutro), 7
- **Widget:** `grade_resultados` — mesma fila; botões de evento "de 1 a 6" (c4) e "sair 7". Emite `extremos_vistos` (0 a 2).
- **Sliders:** nenhum
- **Paco (abertura):** "Escolha o evento 'sair de 1 a 6' e depois 'sair 7'. Onde cada um cai na régua?"
- **Interação do aluno:** alterna os dois eventos e vê a régua ir para 1 e para 0.
- **Conclusão:** `extremos_vistos ≥ 2`
- **Paco (conclusão):** "O certo ocupa a grade inteira, P = 1; o impossível não ocupa nada, P = 0. Toda probabilidade mora entre os dois."

### Passo 3 — `dois-dados`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste), 6
- **Widget:** `grade_resultados` — grade 6 × 6 (1º dado nas linhas, 2º nas colunas); cada casa mostra a soma ao ser tocada. Emite `marcadas_certas` para "soma 7".
- **Sliders:** nenhum
- **Paco (abertura):** "Dois dados: qual soma você acha mais provável, 2 ou 7? Marque as casas de soma 7."
- **Interação do aluno:** acende a diagonal (1, 6), (2, 5), …, (6, 1).
- **Conclusão:** `marcadas_certas ≥ 6`
- **Paco (conclusão):** "A soma 7 ocupa uma diagonal de 6 casas: 6/36 = 1/6. A soma 2 só tem a casa (1, 1): 1/36."

### Passo 4 — `duas-moedas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira: equiprobabilidade)
- **Widget:** `grade_resultados` — grade 2 × 2 (KK, KC, CK, CC). Emite `marcadas_certas` para "uma cara e uma coroa".
- **Sliders:** nenhum
- **Paco (abertura):** "Duas moedas: 'uma cara e uma coroa' tem chance 1/3, já que há 3 tipos de resultado? Marque na grade."
- **Interação do aluno:** acende KC e CK.
- **Conclusão:** `marcadas_certas ≥ 2`
- **Paco (conclusão):** "São 2 casas de 4, KC e CK: 1/2. Os 3 'tipos' não têm a mesma chance, por isso a conta precisa da grade."
- **Tati (dúvida):** `fim` — P: "Então listar resultados pode enganar?" / R: "Pode, se eles não forem igualmente prováveis. Monte a grade e conte casas."

### Passo 5 — `desafio-urna`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — urna com 3 bolas azuis e 2 vermelhas, cada bola numa casa.
- **Paco (abertura):** "Cada bola é uma casa da grade, com a mesma chance."
- **Enunciado:** "Uma urna tem 3 bolas azuis e 2 vermelhas. Qual a probabilidade de tirar uma vermelha?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a2-3` | 2/3 | não | "2/3 compara vermelhas com azuis. O total são 5 bolas: 2/5." | vermelhas sobre azuis, total riscado |
| `a1-2` | 1/2 | não | "Há 2 cores, mas elas não têm a mesma chance. 2 de 5 casas: 2/5." | duas casas grandes "azul" e "vermelha", depois as 5 bolas |
| `a2-5` | 2/5 | **sim** | "Isso. 2 casas favoráveis de 5 possíveis." | 2 casas acesas de 5, régua em 0,4 |
| `a3-5` | 3/5 | não | "3/5 é a chance de azul. Vermelha: 2/5." | 3 casas azuis acesas |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — grade 6 × 6 com a diagonal da soma 7 acesa.
- **Fórmula:** `P(A)`→c3 · `=` · `n(A)`→c1 · `/` · `n(Ω)`→c2
- **Definições:** "Espaço amostral: todos os resultados possíveis do sorteio." · "Evento: o conjunto de resultados que interessa." · "Vale 0 ≤ P(A) ≤ 1, com 0 no impossível e 1 no certo."
- **Paco (abertura):** "Cada casa tem a mesma chance, 1/n(Ω). Por isso a probabilidade é casas do evento dividido pelo total."
- **Dica (hint):** "Toque em uma letra para ver o que ela conta na grade."

**Frase de encerramento (outro):** "Você mediu chances como fração da grade: casos favoráveis sobre casos possíveis, sempre entre 0 e 1."

## i) Treino pós-aula

### Fáceis

#### F1 — `face-5`
- **Enunciado:** "Num dado comum, qual a probabilidade de sair 5?"
- **Conta de conferência:** 1/6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-6` | 1/6 | **sim** | "Isso. Uma casa favorável em 6." |
| `a1-5` | 1/5 | não | "O dado tem 6 faces, não 5. P = 1/6." |
| `a5-6` | 5/6 | não | "5/6 é a chance de NÃO sair 5. De sair: 1/6." |
| `a1-2` | 1/2 | não | "1/2 seria metade das faces. O 5 é uma face só: 1/6." |

#### F2 — `cara`
- **Enunciado:** "Ao lançar uma moeda justa, qual a probabilidade de sair cara?"
- **Conta de conferência:** 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-2` | 1/2 | **sim** | "Certo. Uma casa de duas." |
| `a1` | 1 | não | "1 seria certeza. Cara é uma de 2 casas: 1/2." |
| `a0` | 0 | não | "Cara pode sair. P = 1/2." |
| `a2` | 2 | não | "Probabilidade não passa de 1. É 1/2." |

#### F3 — `impossivel`
- **Enunciado:** "Qual a probabilidade de sair 0 num dado comum?"
- **Conta de conferência:** nenhuma casa: 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | **sim** | "Isso. Não há face 0: evento impossível." |
| `a1-6` | 1/6 | não | "Não existe face 0 entre as 6. P = 0." |
| `a1` | 1 | não | "1 é o evento certo. Sair 0 é impossível: P = 0." |
| `am1` | −1 | não | "Probabilidade nunca é negativa. O impossível vale 0." |

#### F4 — `moeda-e-dado`
- **Enunciado:** "Lança-se uma moeda e um dado. Quantos resultados tem o espaço amostral?"
- **Conta de conferência:** 2 · 6 = 12

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 | **sim** | "Certo. Grade 2 × 6: 12 casas." |
| `a8` | 8 | não | "8 é a soma 2 + 6. A grade multiplica: 12." |
| `a6` | 6 | não | "6 é só o dado. Com a moeda: 2 · 6 = 12." |
| `a2` | 2 | não | "2 é só a moeda. Com o dado: 12 resultados." |

### Médias

#### M1 — `soma-7`
- **Enunciado:** "Lançando dois dados, qual a probabilidade de a soma ser 7?"
- **Conta de conferência:** 6/36 = 1/6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-6` | 1/6 | **sim** | "Isso. A diagonal da soma 7 tem 6 casas de 36." |
| `a7-36` | 7/36 | não | "A soma 7 tem 6 casas, de (1, 6) a (6, 1). P = 6/36 = 1/6." |
| `a1-11` | 1/11 | não | "As somas 2 a 12 não têm a mesma chance. Contando casas: 6/36 = 1/6." |
| `a1-12` | 1/12 | não | "1/12 é a chance da soma 10. A soma 7 tem 6 casas: 1/6." |

#### M2 — `urna-branca`
- **Enunciado:** "Uma urna tem 1 bola verde e 3 brancas. Qual a probabilidade de sair branca?"
- **Conta de conferência:** 3/4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3-4` | 3/4 | **sim** | "Certo. 3 casas brancas de 4." |
| `a1-2` | 1/2 | não | "As duas cores não têm a mesma chance. Brancas: 3 de 4." |
| `a3` | 3 | não | "3 é a contagem. Dividindo pelo total: 3/4." |
| `a1-4` | 1/4 | não | "1/4 é a verde. Branca: 3/4." |

#### M3 — `multiplo-de-3`
- **Enunciado:** "Sorteia-se um número de 1 a 20. Qual a probabilidade de ele ser múltiplo de 3?"
- **Conta de conferência:** {3, 6, 9, 12, 15, 18}: 6/20 = 3/10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3-10` | 3/10 | **sim** | "Isso. 6 múltiplos de 3 em 20 números." |
| `a1-3` | 1/3 | não | "1/3 valeria se 20 fosse múltiplo de 3. São 6 de 20: 3/10." |
| `a7-20` | 7/20 | não | "São 6 múltiplos: 3, 6, 9, 12, 15, 18. P = 3/10." |
| `a1-6` | 1/6 | não | "1/6 é de dado. Aqui: 6 em 20, 3/10." |

### Desafios

#### D1 — `pelo-menos-uma-cara`
- **Enunciado:** "Lançando duas moedas, qual a probabilidade de sair pelo menos uma cara?"
- **Conta de conferência:** KK, KC, CK de 4: 3/4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3-4` | 3/4 | **sim** | "Certo. Só CC fica de fora: 3 casas de 4." |
| `a1-2` | 1/2 | não | "1/2 é exatamente uma cara. Pelo menos uma inclui KK: 3/4." |
| `a2-3` | 2/3 | não | "Com 3 'tipos' a conta engana. Na grade 2 × 2: 3/4." |
| `a1-4` | 1/4 | não | "1/4 é só KK. Pelo menos uma: 3/4." |

#### D2 — `soma-10`
- **Enunciado:** "Com dois dados, qual a probabilidade de a soma ser 10?"
- **Conta de conferência:** (4, 6), (5, 5), (6, 4): 3/36 = 1/12

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-12` | 1/12 | **sim** | "Isso. 3 casas de 36." |
| `a1-18` | 1/18 | não | "(4, 6) e (6, 4) são casas diferentes. Com (5, 5): 3/36 = 1/12." |
| `a1-11` | 1/11 | não | "As 11 somas não têm a mesma chance. Contando casas: 1/12." |
| `a10-36` | 10/36 | não | "O 10 é a soma, não o número de casas. São 3: 3/36 = 1/12." |

#### D3 — `letra-banana`
- **Enunciado:** "Sorteia-se uma letra da palavra BANANA. Qual a probabilidade de ser A?"
- **Conta de conferência:** 3/6 = 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-2` | 1/2 | **sim** | "Certo. 3 A em 6 letras." |
| `a1-3` | 1/3 | não | "Há 3 letras diferentes, mas elas aparecem em quantidades diferentes. A: 3 de 6." |
| `a1-6` | 1/6 | não | "O A aparece 3 vezes. P = 3/6 = 1/2." |
| `a3` | 3 | não | "3 é a contagem de A. Dividindo por 6: 1/2." |

#### D4 — `dados-iguais`
- **Enunciado:** "Com dois dados, qual a probabilidade de saírem números iguais?"
- **Conta de conferência:** diagonal principal: 6/36 = 1/6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-6` | 1/6 | **sim** | "Isso. A diagonal (1, 1) a (6, 6) tem 6 casas." |
| `a1-36` | 1/36 | não | "1/36 é um par específico, como (3, 3). Qualquer par igual: 6/36." |
| `a1-12` | 1/12 | não | "São 6 pares iguais em 36 casas: 1/6." |
| `a1-2` | 1/2 | não | "Iguais é só a diagonal: 6 de 36, 1/6." |

#### D5 — `tres-moedas-duas-caras`
- **Enunciado:** "Lançando três moedas, qual a probabilidade de sair exatamente duas caras?"
- **Fala do Paco:** "Última. São 8 sequências; liste as que têm duas caras."
- **Conta de conferência:** KKC, KCK, CKK: 3/8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3-8` | 3/8 | **sim** | "Certo. KKC, KCK e CKK: 3 de 8." |
| `a1-4` | 1/4 | não | "Com 4 'tipos' (0 a 3 caras) a conta engana. Na grade: 3/8." |
| `a2-3` | 2/3 | não | "2/3 compara caras com moedas. São 3 sequências de 8: 3/8." |
| `a1-8` | 1/8 | não | "1/8 é uma ordem só. A coroa pode estar em 3 lugares: 3/8." |

### Vestibular

#### V1 — `enem-2023-urnas`
- **Enunciado:** "Urna A tem 20% de chance de bola preta e B tem 4 pretas em 16; quantas brancas pôr em B para P(duas pretas) <= 1%?"
- **Fala do Paco:** "Escreva 0,20 × 4/(16 + x) <= 0,01 e resolva para o mínimo x inteiro."
- **Fonte:** ENEM 2023 (adaptada); Questão 138: enunciado resumido; alternativas e gabarito (64) mantidos; https://api.enem.dev/v1/exams/2023/questions/138
- **Conta de conferência:** 0,20 · 4/(16 + x) <= 0,01 => 16 + x >= 80 => x = 64.

#### V2 — `enem-2021-dardos`
- **Enunciado:** "Com chance 1/2 de acertar cada dardo, qual o mínimo de dardos por rodada para acertar pelo menos um com chance >= 9/10?"
- **Fala do Paco:** "Use o evento complementar: errar todos os n dardos tem chance (1/2)ⁿ <= 1/10."
- **Fonte:** ENEM 2021 (adaptada); Questão 142: enunciado resumido; alternativas e gabarito (4) mantidos; https://api.enem.dev/v1/exams/2021/questions/142
- **Conta de conferência:** 1 − (1/2)ⁿ >= 9/10 => 2ⁿ >= 10 => n = 4.

#### V3 — `enem-2018-cartoes`
- **Enunciado:** "Uma urna tem 20 perguntas, sendo 25% fáceis; quantas fáceis acrescentar para que a chance de sortear uma fácil seja 75%?"
- **Fala do Paco:** "Comece com 5 fáceis em 20 e resolva (5 + x)/(20 + x) = 3/4."
- **Fonte:** ENEM 2018 (adaptada); Questão 167: enunciado resumido; alternativas e gabarito (40) mantidos; https://api.enem.dev/v1/exams/2018/questions/167
- **Conta de conferência:** (5 + x)/(20 + x) = 3/4 => 20 + 4x = 60 + 3x => x = 40.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** probabilidade lida em tabela ou gráfico.
- **Onde procurar:** ENEM 2015–2023.
