# Plano — Probabilidade condicional

**Aula:** 1 — A Pista que Encolhe a Grade · P(A dado B)
**Caminho:** aritmetica / combinatoria-e-probabilidade / probabilidade-condicional
**Pré-requisitos que o aluno já domina:** probabilidade como fração da grade, interseção de eventos.

## a) Ancoragem mecânica
A máquina recebe uma pista (o evento B que já aconteceu) e um evento A, e devolve a nova chance de A. A pista é a entrada que age: ela apaga da grade tudo o que não é B. A saída é a fração de B que também é A: P(A | B) = n(A ∩ B) / n(B).

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo pista: a grade do sorteio com A em c1; ao ligar a pista B (c2), as casas fora de B ficam cinza e saem da conta, e a régua passa a medir só dentro de B. Também há um modo tabela de dupla entrada (linhas e colunas tocáveis).

## c) Caso neutro
Pista vazia (B = todos os resultados): nada é apagado, e P(A | B) = P(A). A pista só muda alguma coisa quando elimina casas.

## d) Panorama e recorte
A condicional leva a independência, probabilidade total e ao teorema de Bayes. Aqui: restringir a grade a B, ler tabelas de dupla entrada e perceber que P(A | B) e P(B | A) são diferentes.

## e) Progressão por contraste
1. Sem pista: P(6) = 1/6 (referência).
2. Pista "par": a grade cai para 3 casas e P(6 | par) = 1/3; o favorável é o mesmo, o total mudou.
3. Tabela: P(óculos | menina) usa só a linha das meninas.
4. Inverter a pista: P(menina | óculos) usa só a coluna dos óculos, e dá outro número.

## f) Dedução causal da forma
Saber que B aconteceu elimina as casas fora de B; as que sobram continuam com a mesma chance entre si. Então a nova grade tem n(B) casas, das quais n(A ∩ B) são A. Dividindo numerador e denominador por n(Ω): P(A | B) = P(A ∩ B) / P(B).

## g) Simulação espacial e fronteiras
P(A | B) ≠ P(B | A) em geral: o total muda conforme a pista. A condicional não existe se P(B) = 0. Teste com doença rara: mesmo com teste bom, um positivo pode ter chance de só 1/2 de ser doente, porque os saudáveis são muitos.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Evento A | O que queremos saber se aconteceu. |
| c2 | Pista B | O que já sabemos que aconteceu; vira a nova grade. |
| c3 | A e B | Casas da pista que também são A: o novo favorável. |
| c4 | Casa eliminada | Resultado que a pista tornou impossível. |

### Passo 1 — `sem-pista`
- **Tipo:** `interactive_canvas`
- **Pilares:** 3 (caso neutro), 4 (panorama), 1
- **Widget:** WIDGET NOVO `grade_resultados` (modo pista) — fila de 6 faces, a face 6 em c1; pista desligada. Emite `marcadas_certas`.
- **Sliders:** nenhum
- **Paco (abertura):** "Alguém lançou um dado e escondeu o resultado. Sem nenhuma pista, qual a chance de ser 6?"
- **Interação do aluno:** toca a face 6; a régua marca 1/6.
- **Conclusão:** `marcadas_certas ≥ 1`
- **Paco (conclusão):** "Uma casa de 6: 1/6. Sem pista, a grade inteira continua valendo."
- **Tati (dúvida):** `fim` — P: "Uma pista sempre muda a chance?" / R: "Nem sempre, e isso se chama independência. Hoje vemos como a pista encolhe a grade."

### Passo 2 — `pista-par`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 6
- **Widget:** `grade_resultados` (modo pista) — chave "pista: saiu par" (c2); ligada, 1, 3 e 5 ficam cinza (c4). Emite `pista_ligada`.
- **Sliders:** nenhum
- **Paco (abertura):** "Pista: o número é par. As casas ímpares ainda contam, e como fica a chance do 6?"
- **Interação do aluno:** liga a pista e vê a grade encolher para 2, 4, 6.
- **Conclusão:** `pista_ligada ≥ 1`
- **Paco (conclusão):** "A grade encolheu para 3 casas, e o 6 é uma delas: 1/3. A pista mudou o total, não o favorável."

### Passo 3 — `tabela-linha`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5
- **Widget:** `grade_resultados` (modo tabela) — 100 alunos: linhas meninas (60) e meninos (40); colunas óculos (15 e 10) e sem óculos. Tocar uma linha a transforma na pista. Emite `linha_meninas`.
- **Sliders:** nenhum
- **Paco (abertura):** "Há 60 meninas e 40 meninos; 15 meninas e 10 meninos usam óculos. Sabendo que é menina, qual a chance de usar óculos?"
- **Interação do aluno:** toca a linha "meninas"; o resto da tabela fica cinza.
- **Conclusão:** `linha_meninas ≥ 1`
- **Paco (conclusão):** "A grade virou só a linha das meninas: 15 de 60, ou seja, 1/4."

### Passo 4 — `inverter-a-pista`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira), 5
- **Widget:** `grade_resultados` (modo tabela) — mesma tabela; tocar a coluna "óculos" a transforma na pista. Emite `coluna_oculos`.
- **Sliders:** nenhum
- **Paco (abertura):** "Agora ao contrário: sabendo que usa óculos, qual a chance de ser menina? Aposte antes: dá o mesmo 1/4?"
- **Interação do aluno:** toca a coluna "óculos" e compara.
- **Conclusão:** `coluna_oculos ≥ 1`
- **Paco (conclusão):** "Não: a grade agora é a coluna, com 25 pessoas, e 15 são meninas: 3/5. Trocar a pista troca o total."
- **Tati (dúvida):** `fim` — P: "Então a ordem do 'dado que' importa?" / R: "Importa muito. P(A dado B) usa B como total; P(B dado A) usa A."

### Passo 5 — `desafio-soma-8`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — grade 6 × 6 de dois dados.
- **Paco (abertura):** "Primeiro acenda as casas da pista; depois conte."
- **Enunciado:** "Dois dados somaram 8. Qual a probabilidade de o primeiro dado ter dado 3?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a1-36` | 1/36 | não | "1/36 usa a grade toda. Com a pista, sobram 5 casas de soma 8, e uma tem o 3: 1/5." | diagonal da soma 8 acesa, resto cinza |
| `a1-6` | 1/6 | não | "1/6 ignora a pista. Na soma 8 há 5 casas: 1/5." | fila do primeiro dado = 3 acesa |
| `a1-5` | 1/5 | **sim** | "Isso. 5 casas somam 8, e só (3, 5) começa com 3." | casa (3, 5) em c3 dentro da diagonal |
| `a5-36` | 5/36 | não | "5/36 é a chance da soma 8 sem pista. Dentro dela: 1/5." | diagonal acesa com contador 5 |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — tabela meninas/meninos × óculos com a linha das meninas destacada.
- **Fórmula:** `P(A | B)` · `=` · `P(A ∩ B)`→c3 · `/` · `P(B)`→c2
- **Definições:** "Probabilidade condicional: chance de A sabendo que B aconteceu." · "A pista B vira o novo espaço amostral." · "Em geral, P(A | B) é diferente de P(B | A)."
- **Paco (abertura):** "A pista apaga o que não é B e deixa o resto com a mesma chance. Por isso dividimos a parte comum por B."
- **Dica (hint):** "Toque em uma letra para ver que casas ela ocupa."

**Frase de encerramento (outro):** "Você viu a pista encolher a grade: P(A dado B) conta A só dentro de B, e trocar a pista troca o total."

## i) Treino pós-aula

### Fáceis

#### F1 — `seis-dado-maior-3`
- **Enunciado:** "Saiu um número maior que 3 num dado. Qual a probabilidade de ser 6?"
- **Conta de conferência:** {4, 5, 6}: 1/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-3` | 1/3 | **sim** | "Isso. A pista deixa 4, 5 e 6, e o 6 é um deles." |
| `a1-6` | 1/6 | não | "1/6 ignora a pista. Sobram 3 casas: 1/3." |
| `a1-2` | 1/2 | não | "Maior que 3 deixa 3 casas, não 2. P = 1/3." |
| `a3-6` | 3/6 | não | "3/6 é a chance da pista. Dentro dela, o 6 é 1 de 3." |

#### F2 — `quem-ja-aconteceu`
- **Enunciado:** "Em P(A | B), qual evento já se sabe que aconteceu?"
- **Conta de conferência:** o evento depois da barra

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `b` | B | **sim** | "Certo. O que vem depois da barra é a pista." |
| `a` | A | não | "A é o que queremos saber. A pista é B, depois da barra." |
| `ambos` | Os dois | não | "Só B é conhecido. A é o que estamos medindo." |
| `nenhum` | Nenhum | não | "A barra quer dizer 'sabendo que': B já aconteceu." |

#### F3 — `urna-vermelha-1`
- **Enunciado:** "Uma urna tem bolas vermelhas numeradas de 1 a 4 e azuis de 1 a 6. Sabendo que saiu vermelha, qual a chance de ser 1?"
- **Conta de conferência:** 1/4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-4` | 1/4 | **sim** | "Isso. A pista deixa só as 4 vermelhas." |
| `a1-10` | 1/10 | não | "1/10 é a chance da vermelha 1 sem pista. Com a pista: 1/4." |
| `a2-10` | 2/10 | não | "As azuis saíram da conta. Entre as vermelhas: 1/4." |
| `a1-6` | 1/6 | não | "6 são as azuis. Sabendo que é vermelha: 1/4." |

#### F4 — `pista-inutil`
- **Enunciado:** "Uma pista que não elimina nenhuma casa muda a probabilidade?"
- **Conta de conferência:** B = Ω ⇒ P(A | B) = P(A)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `nao` | Não | **sim** | "Certo. Com a grade inteira, a conta é a mesma." |
| `sim` | Sim | não | "Se nada some, numerador e total ficam iguais: a chance não muda." |

### Médias

#### M1 — `pelo-menos-uma-cara-duas`
- **Enunciado:** "Duas moedas: sabendo que saiu pelo menos uma cara, qual a chance de terem saído duas?"
- **Conta de conferência:** {KK, KC, CK}: 1/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-3` | 1/3 | **sim** | "Isso. A pista deixa 3 casas, e KK é uma." |
| `a1-2` | 1/2 | não | "A pista tira só CC, sobram 3 casas. P = 1/3." |
| `a1-4` | 1/4 | não | "1/4 ignora a pista. Sem CC: 1/3." |
| `a2-3` | 2/3 | não | "2/3 é exatamente uma cara dentro da pista. Duas: 1/3." |

#### M2 — `gosta-dado-menina`
- **Enunciado:** "Numa sala há 15 meninas, e 12 delas gostam de Matemática. Escolhida uma menina, qual a chance de gostar?"
- **Conta de conferência:** 12/15 = 4/5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4-5` | 4/5 | **sim** | "Certo. A pista é ser menina: 12 de 15." |
| `a12-30` | 12/30 | não | "A turma inteira saiu da conta. Entre as 15 meninas: 12/15 = 4/5." |
| `a1-5` | 1/5 | não | "1/5 são as que não gostam. Gostam: 4/5." |
| `a12` | 12 | não | "12 é a contagem. Dividindo por 15: 4/5." |

#### M3 — `formula-condicional`
- **Enunciado:** "P(A e B) = 0,12 e P(B) = 0,4. Quanto vale P(A | B)?"
- **Conta de conferência:** 0,12 / 0,4 = 0,3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a03` | 0,3 | **sim** | "Isso. 0,12 dividido por 0,4." |
| `a0048` | 0,048 | não | "Multiplicou em vez de dividir. 0,12 / 0,4 = 0,3." |
| `a012` | 0,12 | não | "0,12 é A e B. Dividindo pela pista: 0,3." |
| `a052` | 0,52 | não | "Não se soma aqui. P(A | B) = 0,12 / 0,4 = 0,3." |

### Desafios

#### D1 — `soma-7-tem-6`
- **Enunciado:** "Dois dados somaram 7. Qual a probabilidade de um deles ser 6?"
- **Conta de conferência:** (1, 6), (6, 1) entre 6 casas: 1/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-3` | 1/3 | **sim** | "Certo. 2 das 6 casas de soma 7 têm um 6." |
| `a1-6` | 1/6 | não | "(1, 6) e (6, 1) são duas casas. P = 2/6 = 1/3." |
| `a11-36` | 11/36 | não | "11/36 é pelo menos um 6 sem pista. Com a soma 7: 1/3." |
| `a1-18` | 1/18 | não | "1/18 usa a grade toda. Dentro da soma 7: 2/6 = 1/3." |

#### D2 — `menina-dado-gosta`
- **Enunciado:** "Na sala, 18 gostam de Matemática, e 12 delas são meninas. Escolhido alguém que gosta, qual a chance de ser menina?"
- **Fala do Paco:** "Agora a pista é gostar, não ser menina."
- **Conta de conferência:** 12/18 = 2/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2-3` | 2/3 | **sim** | "Isso. A pista são os 18; 12 são meninas." |
| `a4-5` | 4/5 | não | "4/5 é gostar sabendo que é menina. Invertendo a pista: 12/18 = 2/3." |
| `a1-3` | 1/3 | não | "1/3 são os meninos entre os que gostam. Meninas: 2/3." |
| `a12-30` | 12/30 | não | "A pista tira quem não gosta. 12 de 18: 2/3." |

#### D3 — `sem-reposicao`
- **Enunciado:** "Uma urna tem 3 brancas e 2 pretas; tira-se uma branca, que não volta. Qual a chance de a 2ª ser branca?"
- **Conta de conferência:** 2 brancas de 4: 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-2` | 1/2 | **sim** | "Certo. Sobraram 2 brancas em 4 bolas." |
| `a3-5` | 3/5 | não | "3/5 é a primeira tirada. Sem reposição sobram 2 de 4: 1/2." |
| `a2-5` | 2/5 | não | "A urna agora tem 4 bolas, não 5. P = 2/4 = 1/2." |
| `a3-10` | 3/10 | não | "3/10 é branca e branca, antes de saber a primeira. Sabendo: 1/2." |

#### D4 — `achar-intersecao`
- **Enunciado:** "P(A | B) = 0,5 e P(B) = 0,6. Quanto vale P(A e B)?"
- **Conta de conferência:** 0,5 · 0,6 = 0,3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a03` | 0,3 | **sim** | "Isso. P(A e B) = P(A | B) · P(B)." |
| `a083` | 0,83 | não | "0,5 / 0,6 inverte a conta. Multiplicando: 0,3." |
| `a11` | 1,1 | não | "Não se soma. P(A e B) = 0,5 · 0,6 = 0,3." |
| `a05` | 0,5 | não | "0,5 já é dentro de B. Na grade toda: 0,5 · 0,6 = 0,3." |

#### D5 — `teste-positivo`
- **Enunciado:** "De 100 pessoas, 10 estão doentes; o teste dá positivo em 9 doentes e 9 saudáveis. Dado um positivo, qual a chance de doença?"
- **Fala do Paco:** "Última. A pista é dar positivo: conte todos os positivos."
- **Conta de conferência:** 9 / (9 + 9) = 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-2` | 1/2 | **sim** | "Certo. 18 positivos, 9 doentes." |
| `a9-10` | 9/10 | não | "9/10 é positivo sabendo que é doente. Invertendo a pista: 9/18 = 1/2." |
| `a1-10` | 1/10 | não | "1/10 ignora a pista. Entre os positivos: 1/2." |
| `a9-100` | 9/100 | não | "9/100 é doente e positivo na grade toda. Dentro dos positivos: 1/2." |

### Vestibular

#### V1 — `enem-2013-idiomas`
- **Enunciado (resumido):** "Escola de 1200 alunos: 600 falam inglês, 500 espanhol e 300 nenhum. Um aluno que não fala inglês: qual a chance de falar espanhol?"
- **Fala do Paco:** "A pista é não falar inglês. Quantos alunos são?"
- **Fonte:** ENEM 2013 (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (1/2) mantidos — **URL:** https://projetoagathaedu.com.br/questoes-enem/matematica-3/probabilidade/probabilidade-condicional.php
- **Conta de conferência:** falam algum: 900; ambos: 200; só espanhol: 300; não inglês: 600; 300/600 = 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-2` | 1/2 | **sim** | "Isso. 600 não falam inglês, e 300 deles falam espanhol." |
| `a5-8` | 5/8 | não | "5/8 usa os 500 de espanhol, mas 200 deles falam inglês. Fora do inglês: 300/600 = 1/2." |
| `a1-4` | 1/4 | não | "1/4 divide por 1200. A pista deixa 600 alunos: 300/600 = 1/2." |
| `a5-6` | 5/6 | não | "Dos 500 de espanhol, 200 falam inglês e saem da pista. Fica 300/600 = 1/2." |
| `a5-14` | 5/14 | não | "O total da pista é 600, os que não falam inglês. Deles, 300 falam espanhol: 1/2." |

#### V2 — `enem-2025-declaracoes`
- **Enunciado (resumido):** "Declarações: 20% inconsistentes, 25% delas fraude; das demais, 6,25% fraude. Dada uma fraude, qual a chance de ser inconsistente?"
- **Fala do Paco:** "A pista é ser fraude. Some as fraudes dos dois grupos."
- **Fonte:** ENEM 2019 (adaptada) — **Adaptação:** Questão 173: enunciado resumido; alternativas e gabarito (0,5000) mantidos — **URL:** https://api.enem.dev/v1/exams/2019/questions/173 (B42: ano e URL corrigidos; antes estava ENEM 2025)
- **Conta de conferência:** 0,2 · 0,25 = 0,05; 0,8 · 0,0625 = 0,05; 0,05 / 0,10 = 0,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a005` | 0,0500 | não | "0,05 é inconsistente e fraude na grade toda. Dentro das fraudes (0,10): 0,5." |
| `a01` | 0,1000 | não | "0,10 é o total de fraudes, a pista. A parte inconsistente é metade: 0,5." |
| `a01125` | 0,1125 | não | "As fraudes somam 0,05 + 0,05 = 0,10. Inconsistentes entre elas: 0,5." |
| `a03125` | 0,3125 | não | "0,25 + 0,0625 soma taxas de grupos diferentes. Pesando: 0,05 / 0,10 = 0,5." |
| `a05` | 0,5000 | **sim** | "Isso. Cada grupo traz 0,05 de fraude: metade vem das inconsistentes." |

#### V3 — `enem-2021-ppl-maquinas`
- **Enunciado (resumido):** "Máquinas M1, M2 e M3 fazem 25%, 30% e 45% das peças, com 2%, 3% e 4% de defeito. Dada uma peça defeituosa, qual a chance de vir de M2?"
- **Fala do Paco:** "Calcule quanto de defeito cada máquina produz no total."
- **Fonte:** ENEM 2021 PPL (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (28,1%) mantidos — **URL:** https://projetoagathaedu.com.br/questoes-enem/matematica-3/probabilidade/probabilidade-condicional.php
- **Conta de conferência:** 0,005 + 0,009 + 0,018 = 0,032; 0,009 / 0,032 = 0,28125

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a156` | 15,6% | não | "M2 gera 0,30 · 0,03 = 0,009 de 0,032 defeituosas: 28,1%." |
| `a281` | 28,1% | **sim** | "Isso. 0,009 / 0,032 ≈ 28,1%." |
| `a437` | 43,7% | não | "Divida o defeito de M2 pelo total de defeitos: 0,009 / 0,032 ≈ 28,1%." |
| `a562` | 56,2% | não | "A pista são as 0,032 defeituosas. M2 responde por 0,009: 28,1%." |
| `a718` | 71,8% | não | "71,8% são as defeituosas que NÃO vêm de M2. De M2: 28,1%." |

#### V4 — `enem-2017-atraso`
- **Enunciado (resumido):** "Com chuva, a chance de atraso é 50%; sem chuva, 25%; a previsão dá 30% de chuva. Qual a chance de atraso?"
- **Fala do Paco:** "Última. Some o atraso dos dois caminhos: com e sem chuva."
- **Fonte:** ENEM 2017 (adaptada) — **Adaptação:** Questão 179: enunciado resumido; alternativas e gabarito (0,325) mantidos — **URL:** https://api.enem.dev/v1/exams/2017/questions/179 (B42: número e URL identificados no cache)
- **Conta de conferência:** 0,3 · 0,5 + 0,7 · 0,25 = 0,15 + 0,175 = 0,325

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0075` | 0,075 | não | "Faltou o caminho com chuva (0,15). Somando: 0,15 + 0,175 = 0,325." |
| `a015` | 0,150 | não | "0,15 é só o atraso com chuva. Sem chuva entra mais 0,175: 0,325." |
| `a0325` | 0,325 | **sim** | "Certo. 0,3 · 0,5 + 0,7 · 0,25 = 0,325." |
| `a06` | 0,600 | não | "Não se somam as taxas 0,5 e 0,25 direto. Pesando pela chuva: 0,325." |
| `a08` | 0,800 | não | "0,8 soma taxas e chance de chuva. A conta pesada dá 0,325." |
