# Plano — Leitura e comparação de tabelas e gráficos

**Aula:** 1 — A Régua do Gráfico · Barras, linhas, setores e escalas que enganam
**Caminho:** aritmetica / estatistica / leitura-de-tabelas-e-graficos
**Pré-requisitos que o aluno já domina:** frações e decimais, porcentagem.

## a) Ancoragem mecânica
A máquina recebe uma tabela de números e devolve uma figura: altura de barra, posição de ponto numa linha ou ângulo de fatia. A tabela é a entrada; a forma é a saída. A regra de tradução (escala do eixo, ângulo por porcentagem) decide se a figura conta a verdade.

## b) Visual de partida
WIDGET NOVO `barras`: a mesma tabela desenhada como barras, linha ou setores, com uma chave de tipo de gráfico. Um slider move o início do eixo vertical (c4). Tocar numa barra mostra o valor (c3); no modo setores, cada fatia mostra porcentagem (c1) e ângulo (c2).

## c) Caso neutro
Eixo começando em zero: a altura de cada barra é proporcional ao valor. Uma barra com o dobro do valor tem o dobro da altura. Nada distorce a comparação.

## d) Panorama e recorte
Há histogramas, gráficos de dispersão, mapas e infográficos. Aqui: tabelas simples, barras, linhas e setores, e o efeito da escala.

## e) Progressão por contraste
1. Barras com eixo em zero: altura proporcional (referência).
2. Eixo truncado: a mesma diferença de 10% parece o dobro.
3. Linha: valores no tempo; a inclinação mostra o ritmo da mudança.
4. Setores: parte do todo; 25% vira um quarto do círculo.

## f) Dedução causal da forma
Barras comparam por altura, então a régua precisa começar em zero para que altura dobrada signifique valor dobrado. Num gráfico de setores o círculo inteiro é o total (360°), por isso cada parte ocupa sua fração do círculo: ângulo = porcentagem · 360°. Na linha, ligar os pontos em ordem de tempo transforma variação em inclinação.

## g) Simulação espacial e fronteiras
Truncar o eixo exagera diferenças; ampliar demais o eixo esconde mudanças. Setores só fazem sentido quando as partes somam 100%. Linha entre categorias sem ordem (frutas, cidades) sugere uma tendência que não existe.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Porcentagem | A parte do total que a categoria representa. |
| c2 | Ângulo do setor | Fatia do círculo: porcentagem vezes 360°. |
| c3 | Valor | O número da tabela que a barra ou o ponto representa. |
| c4 | Início do eixo | Onde a régua vertical começa; fora de zero, distorce barras. |

### Passo 1 — `tabela-vira-barras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `barras` — vendas: segunda 20, terça 40, quarta 30, quinta 10; tabela ao lado; tocar uma barra acende a linha da tabela (c3). Emite `barras_tocadas`.
- **Sliders:** nenhum
- **Paco (abertura):** "A tabela diz que terça vendeu 40 e quinta, 10. Toque nas duas barras: quantas vezes a de terça é maior?"
- **Interação do aluno:** toca as barras e compara alturas com a régua.
- **Conclusão:** `barras_tocadas ≥ 2`
- **Paco (conclusão):** "4 vezes maior. Com o eixo começando em zero, a altura é proporcional ao valor."
- **Tati (dúvida):** `fim` — P: "Gráfico é sempre de barras?" / R: "Há linhas, setores, histogramas e mapas. Hoje: barras, linhas e setores."

### Passo 2 — `eixo-truncado`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira), 5
- **Widget:** `barras` — candidato A 50 votos, B 55; o eixo começa onde o slider mandar; uma etiqueta mostra "B parece X vezes A".
- **Sliders:** `eixo` · "Início do eixo" · 0..45 · passo 5 · inicial 0 · c4
- **Paco (abertura):** "A tem 50 votos e B tem 55. Suba o início do eixo e veja o que acontece com a diferença aparente."
- **Interação do aluno:** move o slider; a barra de B passa a parecer o dobro da de A.
- **Conclusão:** `eixo ≥ 45`
- **Paco (conclusão):** "Com o eixo em 45, B parece o dobro de A. Os números não mudaram: B tem só 10% a mais."
- **Tati (dúvida):** `fim` — P: "Então gráfico com eixo cortado é mentira?" / R: "Nem sempre, mas para barras engana. Confira sempre onde a régua começa."

### Passo 3 — `linha-no-tempo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `barras` — temperatura em 5 dias (18, 20, 25, 26, 22); chave "barras / linha". Emite `tipo_linha`.
- **Sliders:** nenhum
- **Paco (abertura):** "Para mostrar como a temperatura mudou dia a dia, barras ou linha? Troque e veja qual deixa a mudança mais clara."
- **Interação do aluno:** alterna para linha; o trecho de 20 para 25 aparece como a subida mais íngreme.
- **Conclusão:** `tipo_linha ≥ 1`
- **Paco (conclusão):** "A linha liga os dias em ordem e mostra a tendência. Onde ela inclina mais, a mudança foi maior: de 20 para 25."

### Passo 4 — `setores`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6
- **Widget:** `barras` — preferências: 25%, 25%, 40%, 10%; chave "barras / setores"; cada fatia mostra % (c1) e ângulo (c2). Emite `tipo_setores`.
- **Sliders:** nenhum
- **Paco (abertura):** "Agora importa a fatia de cada parte no total. Troque para setores: quanto do círculo vale 25%?"
- **Interação do aluno:** alterna para setores e toca a fatia de 25%.
- **Conclusão:** `tipo_setores ≥ 1`
- **Paco (conclusão):** "Um quarto do círculo, 90°. O círculo inteiro é o total, então cada fatia é a porcentagem vezes 360°."

### Passo 5 — `desafio-maior-crescimento`
- **Tipo:** `micro_challenge`
- **Pilares:** 6, 7
- **Figura:** WIDGET NOVO `barras_figura` — vendas: jan 10, fev 15, mar 25, abr 28.
- **Paco (abertura):** "Cuidado: crescer mais não é ter a maior barra."
- **Enunciado:** "Em qual mês as vendas mais cresceram em relação ao mês anterior?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `abr` | Abril | não | "Abril tem a maior barra, mas subiu só 3. Março subiu 10, de 15 para 25." | degraus entre barras com +5, +10, +3 |
| `mar` | Março | **sim** | "Isso. De 15 para 25 são +10, o maior degrau." | degrau de março aceso em c3 |
| `fev` | Fevereiro | não | "Fevereiro subiu 5. Março subiu 10: foi o maior aumento." | degrau de fevereiro e de março lado a lado |
| `jan` | Janeiro | não | "Janeiro é o primeiro mês, sem anterior para comparar. O maior aumento foi março, +10." | janeiro sem degrau |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `barras_figura` — setores 25%, 25%, 40%, 10%.
- **Fórmula:** `ângulo`→c2 · `=` · `porcentagem`→c1 · `·` · `360°`
- **Definições:** "Barras: comparam valores pela altura; o eixo deve começar em zero." · "Linha: mostra mudança no tempo; inclinação é ritmo." · "Setores: mostram partes de um total que soma 100%."
- **Paco (abertura):** "Cada gráfico é uma régua diferente. Por isso o setor usa ângulo proporcional e a barra exige eixo a partir de zero."
- **Dica (hint):** "Toque em uma palavra para ver o que ela mede no gráfico."

**Frase de encerramento (outro):** "Você viu a mesma tabela virar barras, linha e setores, e aprendeu a desconfiar de eixos que não começam em zero."

## i) Treino pós-aula

### Fáceis

#### F1 — `maior-da-tabela`
- **Enunciado:** "Uma feira vendeu 12 kg de maçã, 18 kg de banana e 6 kg de uva. Qual barra será a mais alta?"
- **Conta de conferência:** 18 > 12 > 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `banana` | Banana | **sim** | "Isso. 18 kg é o maior valor." |
| `maca` | Maçã | não | "Maçã tem 12 kg. A maior é banana, 18 kg." |
| `uva` | Uva | não | "Uva tem 6 kg, a menor. A maior é banana." |
| `iguais` | Iguais | não | "Os valores são diferentes. A maior barra é a da banana." |

#### F2 — `metade-do-circulo`
- **Enunciado:** "Num gráfico de setores, uma fatia de 50% ocupa quantos graus?"
- **Conta de conferência:** 0,5 · 360° = 180°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a180` | 180° | **sim** | "Certo. Metade do círculo." |
| `a90` | 90° | não | "90° é um quarto. 50% é metade: 180°." |
| `a50` | 50° | não | "Porcentagem não vira grau direto. 0,5 · 360° = 180°." |
| `a360` | 360° | não | "360° é o círculo todo. Metade: 180°." |

#### F3 — `barra-dobro`
- **Enunciado:** "Com o eixo começando em zero, a barra A vale 20 e a B vale 40. A barra B é quantas vezes a A?"
- **Conta de conferência:** 40 / 20 = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | **sim** | "Isso. Eixo em zero: altura proporcional." |
| `a20` | 20 | não | "20 é a diferença. Quantas vezes: 40 / 20 = 2." |
| `a4` | 4 | não | "40 é o dobro de 20, não o quádruplo." |
| `a1` | 1 | não | "As barras não são iguais: B tem o dobro." |

#### F4 — `tipo-para-tempo`
- **Enunciado:** "Para mostrar a temperatura ao longo da semana, qual gráfico é mais indicado?"
- **Conta de conferência:** tempo em ordem ⇒ linha

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `linha` | Linha | **sim** | "Certo. A linha mostra a mudança de um dia para o outro." |
| `setores` | Setores | não | "Setores mostram partes de um total. Para tempo, linha." |
| `tabela` | Só tabela | não | "A tabela funciona, mas a linha mostra a tendência de relance." |
| `barras` | Barras | não | "Barras comparam categorias. Para a mudança no tempo, linha é melhor." |

### Médias

#### M1 — `quanto-a-mais`
- **Enunciado:** "A tem 50 votos e B tem 55. Quantos por cento B tem a mais que A?"
- **Conta de conferência:** 5 / 50 = 10%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10% | **sim** | "Isso. 5 a mais sobre 50: 10%." |
| `a100` | 100% | não | "100% é o que o eixo cortado sugere. A conta é 5 / 50 = 10%." |
| `a5` | 5% | não | "5 é a diferença em votos. Em relação a 50: 10%." |
| `a50` | 50% | não | "A diferença é 5 votos, 10% de 50." |

#### M2 — `setor-72`
- **Enunciado:** "Um setor de 72° representa qual porcentagem do total?"
- **Conta de conferência:** 72 / 360 = 20%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20% | **sim** | "Certo. 72 é um quinto de 360." |
| `a72` | 72% | não | "Grau não é porcentagem. 72 / 360 = 20%." |
| `a25` | 25% | não | "25% seria 90°. 72° é 20%." |
| `a36` | 36% | não | "72 / 360 = 0,2, ou seja 20%." |

#### M3 — `variacao-linha`
- **Enunciado:** "Uma linha passa por 100 em janeiro, 120 em fevereiro e 90 em março. Quanto variou de fevereiro para março?"
- **Conta de conferência:** 90 − 120 = −30

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `am30` | −30 | **sim** | "Isso. Caiu 30, a linha desce." |
| `a30` | 30 | não | "O valor caiu de 120 para 90: variação −30." |
| `am10` | −10 | não | "−10 compara março com janeiro. De fevereiro: −30." |
| `a20` | 20 | não | "20 é de janeiro para fevereiro. De fevereiro para março: −30." |

### Desafios

#### D1 — `trinta-por-cento`
- **Enunciado:** "Numa pesquisa com 200 pessoas, o setor de quem prefere X marca 30%. Quantas pessoas preferem X?"
- **Conta de conferência:** 0,3 · 200 = 60

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a60` | 60 | **sim** | "Certo. 30% de 200." |
| `a30` | 30 | não | "30 é a porcentagem. De 200 pessoas: 60." |
| `a108` | 108 | não | "108 é o ângulo em graus. Pessoas: 0,3 · 200 = 60." |
| `a170` | 170 | não | "170 é 200 − 30. 30% de 200 é 60." |

#### D2 — `aumento-percentual`
- **Enunciado:** "Uma barra passou de 20 para 25. Qual foi o aumento percentual?"
- **Conta de conferência:** 5 / 20 = 25%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a25` | 25% | **sim** | "Isso. 5 de aumento sobre os 20 iniciais." |
| `a5` | 5% | não | "5 é o aumento em unidades. Sobre 20: 25%." |
| `a20` | 20% | não | "20% divide 5 por 25, o valor final. Divide pelo inicial: 25%." |
| `a125` | 125% | não | "125% é o valor final em relação ao inicial. O aumento é 25%." |

#### D3 — `dois-setores`
- **Enunciado:** "Dois setores representam 45% e 15%. Quantos graus ocupam juntos?"
- **Conta de conferência:** 0,6 · 360° = 216°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a216` | 216° | **sim** | "Certo. 60% de 360°." |
| `a60` | 60° | não | "60 é a porcentagem somada. Em graus: 0,6 · 360° = 216°." |
| `a162` | 162° | não | "162° é só o setor de 45%. Com o de 15%: 216°." |
| `a144` | 144° | não | "144° são 40%. Juntos são 60%: 216°." |

#### D4 — `qual-cresceu-mais`
- **Enunciado:** "A passou de 10 para 20; B passou de 100 para 120. Qual cresceu mais em porcentagem?"
- **Fala do Paco:** "Compare o aumento com o valor de partida de cada um."
- **Conta de conferência:** A: 100%; B: 20%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | A | **sim** | "Isso. A dobrou (100%); B subiu 20%." |
| `b` | B | não | "B subiu 20 unidades, mas sobre 100 é 20%. A subiu 100%." |
| `igual` | Iguais | não | "Os percentuais são 100% e 20%. A cresceu mais." |

#### D5 — `ponto-do-meio`
- **Enunciado:** "Uma linha vai de 40 no mês 1 a 60 no mês 3, com variação constante. Quanto vale no mês 2?"
- **Fala do Paco:** "Última. Variação constante é uma linha reta."
- **Conta de conferência:** (40 + 60) / 2 = 50

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a50` | 50 | **sim** | "Certo. A reta sobe 10 por mês." |
| `a20` | 20 | não | "20 é a subida total em 2 meses. No mês 2: 40 + 10 = 50." |
| `a60` | 60 | não | "60 é o mês 3. No meio do caminho: 50." |
| `a45` | 45 | não | "Com variação constante, a metade do caminho é 50." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** ler e comparar valores em gráfico de barras ou tabela.
- **Onde procurar:** ENEM (presente em quase todas as edições; questões sem imagem são raras).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** porcentagem e ângulo em gráfico de setores.
- **Onde procurar:** ENEM, UERJ, Unicamp.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** maior variação num gráfico de linha.
- **Onde procurar:** ENEM ("maior aumento", "período").

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** escala do eixo e gráfico enganoso.
- **Onde procurar:** ENEM, Unicamp.

---
**Notas da implementação (JSON):** widget canônico `barras`/`barras_figura` modo `categorias`; barras em `ink` (c1 é "Porcentagem" no glossário); passo 2 com `eixo_fim` 60 e `comparar [0,1]`. Vestibular `[]`. Lacuna: `categorias` não desenha os degraus +5/+10/+3 entre barras (o plano pedia no desafio): usei `acesas` para acender a(s) barra(s) lida(s) por cada opção. Unidade nova na taxonomia (setor estatistica).
