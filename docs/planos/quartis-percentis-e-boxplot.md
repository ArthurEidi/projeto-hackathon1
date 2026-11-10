# Plano — Quartis, percentis e diagrama de caixa

**Aula:** 1 — Cortar a Fila em Quatro · Quartis, percentis e boxplot
**Caminho:** aritmetica / estatistica / quartis-percentis-e-boxplot
**Pré-requisitos que o aluno já domina:** mediana, amplitude, ordenar números.

## a) Ancoragem mecânica
A máquina recebe uma lista, põe em fila e devolve três cortes que dividem a fila em quatro grupos com a mesma quantidade de valores: Q1, Q2 (a mediana) e Q3. Com eles, mais o menor e o maior valor, desenha o diagrama de caixa. A lista é a entrada; os cortes e a caixa são a saída.

## b) Visual de partida
WIDGET NOVO `barras` em modo fila: os valores como fichas ordenadas sobre uma régua, e três marcadores de corte arrastáveis (Q1 em c1, Q2 em c4, Q3 em c2) que encaixam entre fichas ou sobre elas. Embaixo, o boxplot se desenha a partir dos cortes; a largura da caixa (c3) aparece como número.

## c) Caso neutro
Todos os valores iguais: os três cortes caem no mesmo ponto e a caixa vira um traço. Sem espalhamento, não há o que dividir. Depois usamos a fila 1, 3, 4, 6, 8, 9, 12.

## d) Panorama e recorte
Há vários métodos para calcular quartis, percentis de dados agrupados e critérios de valor atípico. Aqui: listas pequenas com quantidade ímpar, quartis como medianas das metades, leitura do boxplot e percentis como "porcentagem abaixo".

## e) Progressão por contraste
1. Mediana corta a fila ao meio (referência da aula anterior).
2. Cortar cada metade ao meio: Q1 e Q3.
3. Boxplot: a caixa guarda os 50% do meio; os bigodes vão até as pontas.
4. Valor extremo: a caixa não muda, só o bigode estica.

## f) Dedução causal da forma
Cada corte só depende da posição na fila, não do tamanho dos valores. Por isso a caixa (de Q1 a Q3) sempre contém metade dos dados, e sua largura, AIQ = Q3 − Q1, mede o espalhamento do meio sem ser puxada pelos extremos. O percentil p é o corte que deixa p% dos dados abaixo dele; Q1, Q2 e Q3 são os percentis 25, 50 e 75.

## g) Simulação espacial e fronteiras
Arrastar o maior valor para longe estica o bigode e não move a caixa. Um valor além de Q3 + 1,5 · AIQ (ou aquém de Q1 − 1,5 · AIQ) é marcado como atípico. Com quantidade par, as metades e as medianas exigem média dos centrais; convenções diferentes podem dar quartis um pouco diferentes.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Primeiro quartil | Corte que deixa 25% dos dados abaixo (Q1). |
| c2 | Terceiro quartil | Corte que deixa 75% dos dados abaixo (Q3). |
| c3 | Amplitude interquartil | Largura da caixa: Q3 − Q1. |
| c4 | Mediana | Corte do meio, Q2: metade dos dados de cada lado. |

### Passo 1 — `mediana-corta`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro na dúvida), 4
- **Widget:** WIDGET NOVO `barras` (modo fila) — valores 8, 1, 12, 4, 6, 9, 3; botão "pôr em fila"; marcador Q2 (c4) arrastável. Emite `q2_certo` (0/1).
- **Sliders:** nenhum
- **Paco (abertura):** "Ponha as 7 notas em fila. Onde fica o corte que deixa metade de cada lado?"
- **Interação do aluno:** ordena e arrasta o marcador até a 4ª ficha.
- **Conclusão:** `q2_certo ≥ 1`
- **Paco (conclusão):** "No 4º valor, o 6: é a mediana, que aqui também se chama Q2."
- **Tati (dúvida):** `fim` — P: "E se todas as notas fossem iguais?" / R: "Todos os cortes cairiam no mesmo lugar. Não haveria nada para separar."

### Passo 2 — `quartis`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `barras` (modo fila) — fila 1, 3, 4, 6, 8, 9, 12 com Q2 fixo; marcadores Q1 (c1) e Q3 (c2) arrastáveis. Emite `cortes_certos` (0 a 2).
- **Sliders:** nenhum
- **Paco (abertura):** "Agora corte cada metade ao meio. Que valores ficam nos cortes?"
- **Interação do aluno:** arrasta Q1 para o 3 e Q3 para o 9.
- **Conclusão:** `cortes_certos ≥ 2`
- **Paco (conclusão):** "Q1 = 3 e Q3 = 9. Os três cortes dividem a fila em quatro grupos com o mesmo número de valores."

### Passo 3 — `desenhar-caixa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6
- **Widget:** `barras` — botão "desenhar caixa": a caixa vai de Q1 a Q3 com a linha da mediana, e os bigodes vão de 1 a 12. A largura da caixa aparece em c3. Emite `caixa_desenhada`.
- **Sliders:** nenhum
- **Paco (abertura):** "Desenhe a caixa de Q1 a Q3 e os bigodes até o menor e o maior valor. Onde ficam os 50% do meio?"
- **Interação do aluno:** toca o botão e vê o boxplot nascer dos cortes.
- **Conclusão:** `caixa_desenhada ≥ 1`
- **Paco (conclusão):** "Dentro da caixa, de 3 a 9. A largura dela, 9 − 3 = 6, é a amplitude interquartil."
- **Tati (dúvida):** `fim` — P: "E o que são percentis?" / R: "O percentil 90 é o corte com 90% dos dados abaixo. Q1, Q2 e Q3 são os percentis 25, 50 e 75."

### Passo 4 — `extremo-estica`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `barras` — a ficha 12 é arrastável até 40; caixa e bigode se redesenham; passando de Q3 + 1,5 · AIQ = 18, a ficha vira um ponto isolado. Emite `maior_valor`.
- **Sliders:** nenhum
- **Paco (abertura):** "Arraste o maior valor para 40. A caixa muda?"
- **Interação do aluno:** arrasta a ficha; só o bigode reage, até a ficha se soltar como ponto atípico.
- **Conclusão:** `maior_valor ≥ 30`
- **Paco (conclusão):** "A caixa não muda: ela só depende dos cortes do meio. O 40 passou de 18 e virou um valor atípico."

### Passo 5 — `desafio-q1`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `barras_figura` — fila 2, 4, 5, 7, 8, 10, 11 com a mediana marcada.
- **Paco (abertura):** "Q1 é a mediana da metade de baixo."
- **Enunciado:** "Na lista 2, 4, 5, 7, 8, 10, 11, qual é o primeiro quartil?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a4` | 4 | **sim** | "Isso. A metade de baixo é 2, 4, 5, e o meio dela é 4." | metade de baixo destacada, 4 em c1 |
| `a7` | 7 | não | "7 é a mediana, Q2. Q1 é o meio da metade de baixo: 4." | 7 em c4, metade de baixo piscando |
| `a2` | 2 | não | "2 é o menor valor. Q1 é o meio de 2, 4, 5: 4." | ponta do bigode acesa |
| `a10` | 10 | não | "10 é Q3, da metade de cima. Q1 é 4." | metade de cima destacada |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `barras_figura` — fila 1, 3, 4, 6, 8, 9, 12 com o boxplot embaixo.
- **Fórmula:** `AIQ`→c3 · `=` · `Q3`→c2 · `−` · `Q1`→c1
- **Definições:** "Quartis: cortes que dividem a fila ordenada em quatro grupos iguais." · "Boxplot: caixa de Q1 a Q3, linha na mediana, bigodes até os extremos." · "Percentil p: valor que deixa p% dos dados abaixo."
- **Paco (abertura):** "Os cortes dependem só da posição na fila. Por isso a caixa guarda a metade do meio e não se assusta com extremos."
- **Dica (hint):** "Toque em uma letra para ver o corte na fila."

**Frase de encerramento (outro):** "Você cortou a fila em quatro: os quartis desenham a caixa, e a largura dela mede o espalhamento do meio."

## i) Treino pós-aula

### Fáceis

#### F1 — `nome-da-mediana`
- **Enunciado:** "Entre os quartis, qual deles é a mediana?"
- **Conta de conferência:** Q2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `q2` | Q2 | **sim** | "Isso. O corte do meio." |
| `q1` | Q1 | não | "Q1 deixa 25% abaixo. A mediana é Q2." |
| `q3` | Q3 | não | "Q3 deixa 75% abaixo. A mediana é Q2." |
| `q4` | Q4 | não | "Não usamos Q4: três cortes bastam. A mediana é Q2." |

#### F2 — `dentro-da-caixa`
- **Enunciado:** "Que porcentagem dos dados fica entre Q1 e Q3?"
- **Conta de conferência:** 75% − 25% = 50%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a50` | 50% | **sim** | "Certo. A caixa guarda a metade do meio." |
| `a25` | 25% | não | "25% é cada quarto. Entre Q1 e Q3 há dois quartos: 50%." |
| `a75` | 75% | não | "75% fica abaixo de Q3. Entre Q1 e Q3: 50%." |
| `a100` | 100% | não | "Fora da caixa ainda há os 25% de cada ponta. Dentro: 50%." |

#### F3 — `abaixo-de-q1`
- **Enunciado:** "Que porcentagem dos dados fica abaixo de Q1?"
- **Conta de conferência:** 25%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a25` | 25% | **sim** | "Isso. Q1 é o percentil 25." |
| `a50` | 50% | não | "50% fica abaixo da mediana. Abaixo de Q1: 25%." |
| `a75` | 75% | não | "75% fica abaixo de Q3. Abaixo de Q1: 25%." |
| `a1` | 1% | não | "Q1 é o primeiro quarto, não o primeiro por cento: 25%." |

#### F4 — `largura-caixa`
- **Enunciado:** "Uma caixa vai de 10 a 20. Qual a amplitude interquartil?"
- **Conta de conferência:** 20 − 10 = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | **sim** | "Certo. Q3 − Q1." |
| `a15` | 15 | não | "15 é o meio da caixa. A largura é 20 − 10 = 10." |
| `a30` | 30 | não | "30 é a soma. Largura: 20 − 10 = 10." |
| `a20` | 20 | não | "20 é Q3. AIQ = 20 − 10 = 10." |

### Médias

#### M1 — `q3-1-a-7`
- **Enunciado:** "Na lista 1, 2, 3, 4, 5, 6, 7, qual é o terceiro quartil?"
- **Conta de conferência:** metade de cima 5, 6, 7: Q3 = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | **sim** | "Isso. O meio de 5, 6, 7." |
| `a4` | 4 | não | "4 é a mediana. Q3 é o meio da metade de cima: 6." |
| `a7` | 7 | não | "7 é o maior. Q3 é 6." |
| `a2` | 2 | não | "2 é Q1. Q3 é 6." |

#### M2 — `percentil-90`
- **Enunciado:** "Um aluno ficou no percentil 90 de uma prova. O que isso quer dizer?"
- **Conta de conferência:** 90% das notas ficam abaixo ou igual

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `abaixo` | 90% tiraram nota menor ou igual | **sim** | "Certo. Ele está à frente de 90% da turma." |
| `nota90` | Ele tirou 90 | não | "Percentil é posição, não nota. 90% ficaram abaixo dele." |
| `acima` | 90% tiraram mais que ele | não | "É o contrário: 90% ficaram abaixo." |
| `acertou` | Acertou 90% da prova | não | "Isso seria a nota. O percentil compara com os colegas: 90% abaixo." |

#### M3 — `amplitude-total`
- **Enunciado:** "Um boxplot tem mínimo 5, Q1 = 8, mediana 10, Q3 = 15 e máximo 20. Qual a amplitude total?"
- **Conta de conferência:** 20 − 5 = 15

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a15` | 15 | **sim** | "Isso. Do fim de um bigode ao fim do outro." |
| `a7` | 7 | não | "7 é a AIQ, Q3 − Q1. A amplitude total é 20 − 5 = 15." |
| `a10` | 10 | não | "10 é a mediana. Amplitude total: 15." |
| `a20` | 20 | não | "20 é o máximo. Menos o mínimo: 15." |

### Desafios

#### D1 — `aiq-impar`
- **Enunciado:** "Qual a amplitude interquartil de 3, 5, 7, 9, 11, 13, 15?"
- **Conta de conferência:** Q1 = 5, Q3 = 13: 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 | **sim** | "Certo. 13 − 5." |
| `a12` | 12 | não | "12 é a amplitude total. AIQ = 13 − 5 = 8." |
| `a9` | 9 | não | "9 é a mediana. AIQ = 13 − 5 = 8." |
| `a4` | 4 | não | "Q1 é 5 e Q3 é 13: AIQ = 8." |

#### D2 — `maior-dobra`
- **Enunciado:** "O maior valor de uma lista dobra. O que muda no boxplot?"
- **Conta de conferência:** só o bigode de cima

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `bigode` | Só o bigode de cima | **sim** | "Isso. Os cortes dependem da posição, não do tamanho do maior." |
| `caixa` | A caixa inteira | não | "A caixa vem de Q1 e Q3, que não mudam. Só o bigode estica." |
| `mediana` | A mediana | não | "A mediana é posição do meio, não muda. Só o bigode." |
| `nada` | Nada | não | "O máximo mudou, então o bigode de cima estica." |

#### D3 — `mais-concentrado`
- **Enunciado:** "Dois boxplots têm mediana 11; a caixa de A vai de 10 a 12 e a de B, de 5 a 20. Qual tem o meio mais concentrado?"
- **Conta de conferência:** AIQ 2 contra 15

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | A | **sim** | "Certo. Caixa estreita: metade dos dados entre 10 e 12." |
| `b` | B | não | "A caixa de B tem largura 15. A de A, só 2: A é mais concentrado." |
| `iguais` | Iguais | não | "A mediana é igual, mas as caixas não. A é mais concentrado." |

#### D4 — `limite-atipico`
- **Enunciado:** "Valor acima de Q3 + 1,5 · AIQ é atípico. Com Q1 = 20 e Q3 = 30, a partir de quanto?"
- **Conta de conferência:** 30 + 1,5 · 10 = 45

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a45` | 45 | **sim** | "Isso. AIQ = 10; 30 + 15 = 45." |
| `a40` | 40 | não | "Somou só 10. É 1,5 · 10 = 15: 30 + 15 = 45." |
| `a35` | 35 | não | "35 usa 0,5 · AIQ. Com 1,5 · 10: 45." |
| `a75` | 75 | não | "Multiplicou Q3 em vez da AIQ. 30 + 1,5 · 10 = 45." |

#### D5 — `percentil-25-de-200`
- **Enunciado:** "Numa turma de 200 alunos, quantos ficam abaixo do percentil 25?"
- **Fala do Paco:** "Última. Percentil 25 é o mesmo que Q1."
- **Conta de conferência:** 0,25 · 200 = 50

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a50` | 50 | **sim** | "Certo. Um quarto de 200." |
| `a25` | 25 | não | "25 é a porcentagem. De 200: 50 alunos." |
| `a150` | 150 | não | "150 fica acima do percentil 25. Abaixo: 50." |
| `a75` | 75 | não | "0,25 · 200 = 50." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** leitura de boxplot (mediana, quartis, amplitude).
- **Onde procurar:** ENEM 2017–2023 (exige imagem; verificar se o texto basta).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** quartis de uma lista pequena.
- **Onde procurar:** UFPR, UFSC, Unicamp.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** interpretação de percentil.
- **Onde procurar:** ENEM, UERJ.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** valor atípico e efeito na mediana × média.
- **Onde procurar:** Unicamp, Fuvest.

---
**Notas da implementação (JSON):** `barras` modo `fila` (passo 1 com `arrastaveis: ["q2"]` e fila embaralhada; passo 2 com Q2 fixo; passo 3 com `chave_caixa`; passo 4 com `maior_arrastavel` até 40). Vestibular `[]` (os 4 itens do plano são PENDENTE-FONTE). Sem correção de gabarito.
