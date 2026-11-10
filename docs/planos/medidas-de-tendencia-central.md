# Plano — Média, mediana e moda

**Aula:** 1 — O Ponto de Equilíbrio · Média, mediana e moda
**Caminho:** aritmetica / estatistica / medidas-de-tendencia-central
**Pré-requisitos que o aluno já domina:** frequências, ordenar números, frações.

## a) Ancoragem mecânica
A máquina recebe uma lista de valores e devolve três "centros": a média (ponto de equilíbrio dos valores), a mediana (o valor do meio da fila ordenada) e a moda (o valor que mais se repete). Os valores são as entradas que o aluno arrasta; os três marcadores são as saídas.

## b) Visual de partida
WIDGET NOVO `barras` em modo pontos: cada valor é um peso arrastável sobre uma régua numérica. Embaixo, um apoio triangular marca a média (c3); uma bandeira marca a mediana (c4); a coluna mais alta de pesos marca a moda. Os pesos podem ser alinhados em fila ordenada com um toque.

## c) Caso neutro
Todos os valores iguais (cinco notas 6): média, mediana e moda ficam no mesmo ponto, 6. Nada puxa para lado nenhum. Depois mexemos um valor por vez.

## d) Panorama e recorte
Há medidas de dispersão, médias ponderadas, geométricas e harmônicas, e quartis. Aqui: média aritmética (com uma pitada de ponderada), mediana e moda, e quando cada uma representa melhor os dados.

## e) Progressão por contraste
1. Valores iguais: as três medidas coincidem (referência).
2. Valores espalhados simétricos (2, 4, 6, 8): média e mediana em 5.
3. Valor extremo (8 → 30): a média foge, a mediana fica.
4. Quantidade par e valores repetidos: mediana como média dos dois do meio; moda como o mais frequente.

## f) Dedução causal da forma
A média é o ponto onde a régua equilibra: as distâncias dos valores à esquerda somam o mesmo que as da direita. Isso acontece exatamente quando a média vale a soma dos valores dividida pela quantidade. A mediana só depende da posição na fila, por isso um valor extremo não a desloca. Visão alternativa da média (modo barras): despejar todas as barras num reservatório e redistribuir por igual; a altura comum é a média, e o que sobra acima da linha preenche exatamente o que falta abaixo.

## g) Simulação espacial e fronteiras
Com quantidade par, a mediana é a média dos dois centrais. Pode haver duas modas ou nenhuma. A média pode não ser nenhum dos valores (média 2,5 de filhos). Para salários com poucos valores enormes, a mediana representa melhor o típico. Armadilha visual a mostrar no widget: com a lista desordenada (10, 2, 8, 4, 6), pegar o valor do meio sem ordenar dá 8 em vez de 6; o widget pisca um alerta até o aluno tocar em "pôr em fila".

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Soma dos valores | Todos os valores somados. |
| c2 | Quantidade | Quantos valores há na lista (n). |
| c3 | Média | Ponto de equilíbrio: soma dividida pela quantidade. |
| c4 | Mediana | O valor do meio quando a lista está em ordem. |

### Passo 1 — `todos-iguais`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `barras` (modo pontos) — cinco pesos em 6 sobre uma régua de 0 a 10; apoio da média (c3), bandeira da mediana (c4) e marca da moda. Emite `arrastes`.
- **Sliders:** nenhum
- **Paco (abertura):** "Cinco notas iguais a 6: onde ficam média, mediana e moda? Arraste uma nota e veja quem se mexe."
- **Interação do aluno:** arrasta um peso para 10; o apoio da média anda, a bandeira da mediana não.
- **Conclusão:** `arrastes ≥ 1`
- **Paco (conclusão):** "Iguais, as três ficam em 6. Mexendo uma nota, a média anda junto, mas a mediana pode ficar parada."
- **Tati (dúvida):** `fim` — P: "Só existem essas três médias?" / R: "Há ponderada, geométrica e outras, além das medidas de espalhamento. Hoje: média, mediana e moda."

### Passo 2 — `gangorra`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6
- **Widget:** `barras` (modo pontos) — pesos em 2, 4, 6 e 8; o aluno arrasta o apoio (c3); a régua inclina até equilibrar. Emite `equilibrio` (0/1).
- **Sliders:** nenhum
- **Paco (abertura):** "Pense nas notas como pesos numa régua. Onde fica o apoio para ela não tombar?"
- **Interação do aluno:** arrasta o apoio até a régua ficar reta.
- **Conclusão:** `equilibrio ≥ 1` (o widget emite 1 quando o apoio está sobre a média)
- **Paco (conclusão):** "Em 5 as distâncias da esquerda (3 + 1) igualam as da direita (1 + 3). A média é esse ponto: (2 + 4 + 6 + 8) / 4 = 5."

### Passo 3 — `valor-extremo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7
- **Widget:** `barras` (modo pontos) — pesos em 4, 5, 6, 7, 8 numa régua de 0 a 30; o maior é arrastável. Emite `maior_valor`.
- **Sliders:** nenhum
- **Paco (abertura):** "Arraste a maior nota para bem longe. Quem foge mais: a média ou a mediana?"
- **Interação do aluno:** leva o peso de 8 até 30; o apoio corre para a direita.
- **Conclusão:** `maior_valor ≥ 25`
- **Paco (conclusão):** "Com 30, a média foi de 6 para 10,4; a mediana ficou em 6. Um valor extremo puxa a média, mas não muda quem está no meio."

### Passo 4 — `par-e-moda`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6, 7
- **Widget:** `barras` (modo pontos) — seis valores 3, 5, 5, 7, 8, 10; botão "pôr em fila"; o aluno toca os dois do meio. Emite `meios_tocados`.
- **Sliders:** nenhum
- **Paco (abertura):** "Com seis notas, não há uma única do meio. Qual valor fica no centro da fila, e qual se repete mais?"
- **Interação do aluno:** põe em fila e toca o 5 e o 7 centrais.
- **Conclusão:** `meios_tocados ≥ 2`
- **Paco (conclusão):** "A mediana é a média dos dois do meio: (5 + 7) / 2 = 6. A moda é 5, o valor que mais aparece."
- **Tati (dúvida):** `fim` — P: "Pode ter duas modas, ou nenhuma?" / R: "Pode: um empate faz duas modas, e se nenhum valor repete não há moda."

### Passo 5 — `desafio-nota-que-falta`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `barras_figura` — régua com pesos em 5 e 7 e o apoio fixo em 7; terceiro peso com "?".
- **Paco (abertura):** "O apoio está fixo em 7. Onde precisa ficar o terceiro peso para equilibrar?"
- **Enunciado:** "Um aluno tirou 5 e 7 e quer média 7 em três provas. Quanto precisa tirar na terceira?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a7` | 7 | não | "Com 7, a média seria 19 / 3 ≈ 6,3. Para média 7 a soma tem de ser 21: falta 9." | régua inclinada para a esquerda |
| `a9` | 9 | **sim** | "Isso. 5 + 7 + 9 = 21, e 21 / 3 = 7." | régua equilibrada em 7 |
| `a21` | 21 | não | "21 é a soma necessária, não a nota. Faltam 21 − 12 = 9." | soma 21 destacada em c1 |
| `a8` | 8 | não | "Com 8 a soma seria 20 e a média 6,7. Precisa de 9." | régua ainda pendendo à esquerda |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `barras_figura` — pesos 3, 5, 5, 7, 8, 10 com apoio e bandeira.
- **Fórmula:** `x̄`→c3 · `=` · `soma`→c1 · `/` · `n`→c2
- **Definições:** "Média: ponto de equilíbrio, soma dividida pela quantidade." · "Mediana: o valor central da lista ordenada (ou a média dos dois centrais)." · "Moda: o valor que mais se repete."
- **Paco (abertura):** "A média equilibra as distâncias dos dois lados, por isso é soma sobre quantidade. A mediana olha só a posição na fila."
- **Dica (hint):** "Toque em uma letra para ver onde ela aparece na régua."

**Frase de encerramento (outro):** "Você equilibrou pesos numa régua: a média é o apoio, a mediana é o meio da fila e a moda é o que mais se repete."

## i) Treino pós-aula

### Fáceis

#### F1 — `media-2-4-6`
- **Enunciado:** "Qual a média de 2, 4 e 6?"
- **Conta de conferência:** 12 / 3 = 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 | **sim** | "Isso. 12 / 3 = 4." |
| `a12` | 12 | não | "12 é a soma. Dividindo por 3: 4." |
| `a6` | 6 | não | "6 é o maior valor. A média é 12 / 3 = 4." |
| `a3` | 3 | não | "3 é a quantidade. A média é 12 / 3 = 4." |

#### F2 — `mediana-impar`
- **Enunciado:** "Qual a mediana de 3, 9, 1, 5, 7?"
- **Conta de conferência:** em ordem 1, 3, 5, 7, 9: 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Certo. Em ordem, o 5 fica no meio." |
| `a1` | 1 | não | "Primeiro ponha em ordem: 1, 3, 5, 7, 9. O meio é 5." |
| `a9` | 9 | não | "9 é o maior. A mediana, no meio da fila ordenada, é 5." |
| `a3` | 3 | não | "Sem ordenar, o meio engana. Ordenada, a mediana é 5." |

#### F3 — `moda`
- **Enunciado:** "Qual a moda de 2, 3, 3, 5, 8?"
- **Conta de conferência:** 3 aparece duas vezes

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. É o único valor repetido." |
| `a4-2` | 4,2 | não | "4,2 é a média. A moda é o mais frequente: 3." |
| `a8` | 8 | não | "8 aparece uma vez. A moda é 3." |
| `a5` | 5 | não | "5 aparece uma vez. O que se repete é 3." |

#### F4 — `todas-iguais`
- **Enunciado:** "Uma turma tirou 7 em todas as notas. Qual é a média?"
- **Conta de conferência:** 7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a7` | 7 | **sim** | "Certo. Valores iguais: média igual a eles." |
| `a0` | 0 | não | "Sem variação, a média é o próprio valor: 7." |
| `depende` | Depende de quantos | não | "Com todos em 7, a média é 7 para qualquer quantidade." |
| `a70` | 70 | não | "70 seria a soma de 10 notas. A média é 7." |

### Médias

#### M1 — `mediana-par`
- **Enunciado:** "Qual a mediana de 2, 4, 6, 8?"
- **Conta de conferência:** (4 + 6) / 2 = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Isso. Média dos dois centrais." |
| `a4` | 4 | não | "Com quantidade par, use os dois do meio: (4 + 6) / 2 = 5." |
| `a6` | 6 | não | "6 é um dos centrais. A mediana é (4 + 6) / 2 = 5." |
| `nao-ha` | Não há | não | "Há sim: a média dos dois centrais, 5." |

#### M2 — `soma-pela-media`
- **Enunciado:** "A média de 4 provas foi 6. Quanto dá a soma das notas?"
- **Conta de conferência:** 6 · 4 = 24

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a24` | 24 | **sim** | "Certo. Soma = média · quantidade." |
| `a10` | 10 | não | "6 + 4 não é a conta. Soma = 6 · 4 = 24." |
| `a1-5` | 1,5 | não | "6 / 4 inverte. Soma = 6 · 4 = 24." |
| `a6` | 6 | não | "6 é a média. A soma é 24." |

#### M3 — `salario-tipico`
- **Enunciado:** "Salários de 5 pessoas, em mil reais: 1, 1, 1, 1 e 16. Qual medida representa melhor o salário típico?"
- **Conta de conferência:** média 4; mediana 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `mediana` | Mediana | **sim** | "Isso. A mediana, 1, mostra o comum; o 16 puxa a média para 4." |
| `media` | Média | não | "A média dá 4, mas ninguém ganha perto disso. A mediana, 1, é mais típica." |
| `maior` | O maior valor | não | "16 é uma exceção. O típico é a mediana, 1." |

### Desafios

#### D1 — `ponderada`
- **Enunciado:** "A prova tem peso 2 e o trabalho peso 1. Com 8 na prova e 5 no trabalho, qual é a média ponderada?"
- **Fala do Paco:** "Peso 2 é como contar a prova duas vezes."
- **Conta de conferência:** (2 · 8 + 5) / 3 = 7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a7` | 7 | **sim** | "Certo. (8 + 8 + 5) / 3 = 7." |
| `a6-5` | 6,5 | não | "6,5 ignora os pesos. Com a prova valendo 2: (16 + 5) / 3 = 7." |
| `a10-5` | 10,5 | não | "Faltou dividir pela soma dos pesos, 3: 21 / 3 = 7." |
| `a8` | 8 | não | "8 é só a prova. Com o trabalho: (16 + 5) / 3 = 7." |

#### D2 — `entra-um-valor`
- **Enunciado:** "A média de 5 números é 10. Acrescentando o número 16, qual a nova média?"
- **Conta de conferência:** (50 + 16) / 6 = 11

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a11` | 11 | **sim** | "Isso. Soma 66 em 6 números." |
| `a13` | 13 | não | "(10 + 16) / 2 trata a média como um valor só. Soma 66 / 6 = 11." |
| `a13-2` | 13,2 | não | "Divida por 6, não por 5: 66 / 6 = 11." |
| `a10` | 10 | não | "16 está acima da média, então ela sobe: 66 / 6 = 11." |

#### D3 — `media-de-grupos`
- **Enunciado:** "Uma turma de 10 alunos tem média 6 e outra de 20 tem média 9. Qual a média das duas juntas?"
- **Fala do Paco:** "A turma maior pesa mais."
- **Conta de conferência:** (60 + 180) / 30 = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 | **sim** | "Certo. Soma 240 em 30 alunos." |
| `a7-5` | 7,5 | não | "7,5 dá o mesmo peso às turmas. A maior pesa o dobro: 240 / 30 = 8." |
| `a15` | 15 | não | "6 + 9 não é média. Somando notas: 240 / 30 = 8." |
| `a9` | 9 | não | "9 é só a turma maior. Juntas: 8." |

#### D4 — `nota-para-media-7`
- **Enunciado:** "Um aluno tirou 6 e 7 e quer média 7 em três provas. Quanto precisa na terceira?"
- **Conta de conferência:** 21 − 13 = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 | **sim** | "Isso. Soma 21 menos 13 = 8." |
| `a7` | 7 | não | "Com 7, a soma seria 20 e a média 6,7. Precisa de 8." |
| `a21` | 21 | não | "21 é a soma necessária. A nota é 21 − 13 = 8." |
| `a9` | 9 | não | "Com 9 a média passa de 7. Basta 8." |

#### D5 — `o-que-nao-muda`
- **Enunciado:** "Na lista 2, 4, 6, 8, 10, o maior valor passa a ser 100. Qual medida não muda?"
- **Fala do Paco:** "Última. Quem olha só a posição na fila?"
- **Conta de conferência:** mediana continua 6; média vai de 6 para 24

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `mediana` | Mediana | **sim** | "Certo. O meio da fila ainda é 6." |
| `media` | Média | não | "A média sobe de 6 para 24. A mediana fica em 6." |
| `soma` | Soma | não | "A soma cresce 90. Quem não muda é a mediana." |
| `todas` | Todas mudam | não | "A mediana depende só da posição: continua 6." |

### Vestibular

#### V1 — `enem-2018-media-ponderada`
- **Enunciado (resumido):** "Provas com pesos 20%, 10%, 30% e 40%; a média mínima é 60. Com 46, 60 e 50 nas três primeiras, quanto falta tirar na quarta?"
- **Fala do Paco:** "Some o que já foi garantido e veja quanto falta para 60."
- **Fonte:** ENEM 2018 (adaptada) — **Adaptação:** questão 166, caderno azul; enunciado resumido; alternativas mantidas; gabarito conferido pela conta (74,5) — **URL:** https://www.todamateria.com.br/lista-de-exercicios-de-media-moda-e-mediana-de-enem/
- **Conta de conferência:** 0,2 · 46 + 0,1 · 60 + 0,3 · 50 = 30,2; 0,4 · x ≥ 29,8 ⇒ x ≥ 74,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a29-8` | 29,8 | não | "29,8 é o que falta na média, mas a 4ª prova vale 40%. Nota: 29,8 / 0,4 = 74,5." |
| `a71` | 71,0 | não | "Com 71 a média fica 58,6. Precisa de 29,8 / 0,4 = 74,5." |
| `a74-5` | 74,5 | **sim** | "Isso. As três primeiras dão 30,2; faltam 29,8, e 29,8 / 0,4 = 74,5." |
| `a75-5` | 75,5 | não | "75,5 passa do mínimo. O mínimo exato é 29,8 / 0,4 = 74,5." |
| `a84` | 84,0 | não | "84 ignora os pesos. Pesando: 74,5 basta." |

#### V2 — `uft-2013-alturas`
- **Enunciado (resumido):** "A altura média de 35 indígenas é 1,65 m, e a dos 20 homens é 1,70 m. Qual a altura média das mulheres?"
- **Fala do Paco:** "Use somas: total do grupo menos total dos homens."
- **Fonte:** UFT 2013 (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (1,58) mantidos — **URL:** https://www.todamateria.com.br/exercicios-de-media-moda-e-mediana/
- **Conta de conferência:** 35 · 1,65 = 57,75; 20 · 1,70 = 34; 23,75 / 15 ≈ 1,58

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1-46` | 1,46 | não | "Somas: 57,75 − 34 = 23,75 para 15 mulheres. Média ≈ 1,58." |
| `a1-55` | 1,55 | não | "Divida 23,75 por 15, não por 20 ou 35. Dá ≈ 1,58." |
| `a1-58` | 1,58 | **sim** | "Certo. 23,75 / 15 ≈ 1,58 m." |
| `a1-60` | 1,60 | não | "A conta pelas somas dá 23,75 / 15 ≈ 1,58." |
| `a1-65` | 1,65 | não | "1,65 é a média geral. As mulheres puxam para baixo: ≈ 1,58." |

#### V3 — `essa-2012-aprovados`
- **Enunciado (resumido):** "A média de todos os candidatos foi 9,0; a dos aprovados, 9,8; a dos eliminados, 7,8. Que porcentagem foi aprovada?"
- **Fala do Paco:** "Média geral é o equilíbrio entre os dois grupos."
- **Fonte:** EsSA 2012 (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (60%) mantidos — **URL:** https://www.todamateria.com.br/exercicios-de-media-moda-e-mediana/
- **Conta de conferência:** 9,8 A + 7,8 E = 9 (A + E) ⇒ 0,8 A = 1,2 E ⇒ A / (A + E) = 0,6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20% | não | "Equilíbrio: 0,8 · A = 1,2 · E, então A = 1,5 E. Aprovados: 60%." |
| `a25` | 25% | não | "Os aprovados estão mais perto da média geral, então são maioria: 60%." |
| `a30` | 30% | não | "A distância 0,8 dos aprovados contra 1,2 dos eliminados dá A = 1,5 E: 60%." |
| `a50` | 50% | não | "Com 50% a média seria 8,8. Para 9,0 os aprovados são 60%." |
| `a60` | 60% | **sim** | "Isso. A = 1,5 E, então A é 60% do total." |

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** mediana ou moda lidas em tabela de frequências.
- **Onde procurar:** ENEM (questões de "mediana" sem imagem).
