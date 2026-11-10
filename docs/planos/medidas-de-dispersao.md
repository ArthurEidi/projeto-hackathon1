# Plano — Amplitude, variância e desvio padrão

**Aula:** 1 — Quadrados Sobre os Desvios · Amplitude, variância e desvio padrão
**Caminho:** aritmetica / estatistica / medidas-de-dispersao
**Pré-requisitos que o aluno já domina:** média aritmética, quadrado de um número, raiz quadrada.

## a) Ancoragem mecânica
A máquina recebe uma lista de valores e devolve o quanto eles se espalham em volta da média. Para cada valor ela mede o desvio (distância até a média), transforma cada desvio num quadrado e tira a média das áreas (variância); a raiz dessa média é o desvio padrão. Os valores são as entradas; o "tamanho médio do afastamento" é a saída.

## b) Visual de partida
WIDGET NOVO `barras` em modo pontos: pesos sobre uma régua com o apoio na média (fixo). Setas mostram o desvio de cada peso (c1). Uma chave desenha um quadrado sobre cada seta; a média das áreas (c3) aparece como um quadrado cinza, cujo lado é o desvio padrão (c4). Um slider "espalhar" afasta os pesos da média sem mudá-la.

## c) Caso neutro
Todos os valores iguais à média: desvios zero, nenhum quadrado, variância e desvio padrão zero. É a régua sem nenhum espalhamento. Depois espalhamos mantendo a média.

## d) Panorama e recorte
Há também desvio médio, quartis e coeficiente de variação. Aqui: amplitude, variância e desvio padrão de listas pequenas (população), e o que acontece ao somar ou multiplicar todos os valores.

## e) Progressão por contraste
1. Valores iguais: dispersão zero (referência).
2. Mesma média, valores afastados: a dispersão aparece.
3. Amplitude igual, espalhamentos diferentes: as pontas não contam tudo.
4. Somar desvios dá zero; elevar ao quadrado resolve.
5. Quadrados sobre os desvios: a média das áreas é a variância, o lado do quadrado médio é o desvio padrão.

## f) Dedução causal da forma
A média é o ponto de equilíbrio, então os desvios de um lado cancelam os do outro e somam zero. Para que todo afastamento conte, elevamos cada desvio ao quadrado (sempre positivo) e tiramos a média: σ² = Σ(x − x̄)² / n. Essa área está em "unidade ao quadrado", por isso a raiz devolve uma distância na unidade original: σ.

## g) Simulação espacial e fronteiras
Somar uma constante a todos os valores desloca a régua inteira e não muda o desvio padrão. Multiplicar todos por 2 dobra os desvios e o desvio padrão (e quadruplica a variância). Um valor extremo pesa muito, porque o desvio dele é elevado ao quadrado. O desvio padrão nunca é negativo.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Desvio | Distância de um valor até a média, com sinal. |
| c2 | Quantidade | Quantos valores há (n). |
| c3 | Variância | Média das áreas dos quadrados dos desvios. |
| c4 | Desvio padrão | Lado do quadrado médio: raiz da variância. |

### Passo 1 — `espalhar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `barras` (modo pontos) — quatro pesos com valores 5 − s, 5 − s, 5 + s, 5 + s; apoio fixo em 5; setas de desvio (c1).
- **Sliders:** `s` · "Espalhar" · 0..3 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "Quatro notas iguais a 5: quanto elas se afastam da média? Espalhe as notas sem mudar a média."
- **Interação do aluno:** move s; os pesos se afastam do apoio, que não sai do lugar.
- **Conclusão:** `s ≥ 2`
- **Paco (conclusão):** "A média continua 5, mas cada nota está a 2 dela. Dispersão mede esse afastamento, que antes era zero."
- **Tati (dúvida):** `fim` — P: "Existe uma medida só para isso?" / R: "Há várias: amplitude, desvio médio, quartis. Hoje: amplitude, variância e desvio padrão."

### Passo 2 — `amplitude-engana`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7
- **Widget:** `barras` (modo pontos) — grupo A = 1, 5, 5, 5, 9 e grupo B = 1, 1, 5, 9, 9, um sobre o outro; chave "mostrar desvios". Emite `desvios_ligados`.
- **Sliders:** nenhum
- **Paco (abertura):** "Os dois grupos vão de 1 a 9, amplitude 8. Mostre os desvios: eles são igualmente espalhados?"
- **Interação do aluno:** liga a chave; em B quase todas as setas são longas.
- **Conclusão:** `desvios_ligados ≥ 1`
- **Paco (conclusão):** "Não: em A quase tudo está no 5, em B quase tudo está longe. A amplitude só olha as pontas."

### Passo 3 — `desvios-somam-zero`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6
- **Widget:** `barras` (modo pontos) — valores 2, 4, 6, 8 (média 5); botão "somar desvios" junta as setas: −3, −1, +1, +3 se cancelam. Emite `somou`.
- **Sliders:** nenhum
- **Paco (abertura):** "Some os desvios de cada nota até a média. O que você espera que aconteça?"
- **Interação do aluno:** toca o botão e vê as setas se anularem em zero.
- **Conclusão:** `somou ≥ 1`
- **Paco (conclusão):** "Dá zero: os desvios de um lado cancelam os do outro, porque a média é o ponto de equilíbrio. Somar não mede nada."

### Passo 4 — `quadrados`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6
- **Widget:** `barras` (modo pontos) — mesmos valores; chave "quadrados" desenha quadrados de lado |desvio| (áreas 9, 1, 1, 9) e o quadrado médio (área 5, c3) com lado √5 (c4). Emite `quadrados_ligados`.
- **Sliders:** nenhum
- **Paco (abertura):** "Desenhe um quadrado sobre cada desvio. Quadrado nunca é negativo: qual é a média das áreas?"
- **Interação do aluno:** liga os quadrados e vê o quadrado médio surgir.
- **Conclusão:** `quadrados_ligados ≥ 1`
- **Paco (conclusão):** "Áreas 9, 1, 1 e 9: média 20 / 4 = 5, a variância. O lado do quadrado médio, √5 ≈ 2,2, é o desvio padrão."
- **Tati (dúvida):** `fim` — P: "Por que tirar a raiz no fim?" / R: "Para voltar à unidade das notas. A variância está em 'nota ao quadrado'."

### Passo 5 — `desafio-dois-valores`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `barras_figura` — pesos em 2 e 8 com o apoio em 5.
- **Paco (abertura):** "Ache a média, os desvios e depois os quadrados."
- **Enunciado:** "Qual o desvio padrão dos valores 2 e 8?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a9` | 9 | não | "9 é a variância, a área média. O desvio padrão é o lado: √9 = 3." | quadrados de área 9 acesos |
| `a3` | 3 | **sim** | "Isso. Desvios de 3, quadrados de área 9, raiz 3." | quadrado médio com lado 3 em c4 |
| `a6` | 6 | não | "6 é a amplitude, 8 − 2. O desvio padrão é 3." | pontas 2 e 8 ligadas por uma seta |
| `a0` | 0 | não | "0 é a soma dos desvios, −3 + 3. Com quadrados: σ = 3." | setas −3 e +3 se anulando |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `barras_figura` — valores 2, 4, 6, 8 com os quatro quadrados e o quadrado médio.
- **Fórmula:** `σ²`→c3 · `=` · `Σ (x − x̄)²`→c1 · `/` · `n`→c2 · `;` · `σ = √σ²`→c4
- **Definições:** "Amplitude: maior valor menos o menor." · "Variância: média dos quadrados dos desvios." · "Desvio padrão: raiz da variância, na mesma unidade dos dados."
- **Paco (abertura):** "Os desvios somam zero, então elevamos cada um ao quadrado e tiramos a média. Por isso σ é a raiz dessa média."
- **Dica (hint):** "Toque em uma letra para ver o que ela desenha na régua."

**Frase de encerramento (outro):** "Você desenhou quadrados sobre os desvios: a variância é a área média e o desvio padrão é o lado desse quadrado."

## i) Treino pós-aula

### Fáceis

#### F1 — `amplitude`
- **Enunciado:** "Qual a amplitude de 3, 7 e 10?"
- **Conta de conferência:** 10 − 3 = 7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a7` | 7 | **sim** | "Isso. Maior menos menor." |
| `a10` | 10 | não | "10 é o maior valor. Amplitude: 10 − 3 = 7." |
| `a6-7` | 6,7 | não | "6,7 é a média. Amplitude: 10 − 3 = 7." |
| `a20` | 20 | não | "20 é a soma. Amplitude: 10 − 3 = 7." |

#### F2 — `dp-iguais`
- **Enunciado:** "Qual o desvio padrão de 5, 5, 5?"
- **Conta de conferência:** desvios 0: σ = 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | **sim** | "Certo. Ninguém se afasta da média." |
| `a5` | 5 | não | "5 é a média. Os desvios são 0, então σ = 0." |
| `a15` | 15 | não | "15 é a soma. Sem afastamento, σ = 0." |
| `a1` | 1 | não | "Não há afastamento algum: σ = 0." |

#### F3 — `um-desvio`
- **Enunciado:** "A média é 6. Qual o desvio do valor 9?"
- **Conta de conferência:** 9 − 6 = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. 9 está 3 acima da média." |
| `a9` | 9 | não | "9 é o valor. O desvio é 9 − 6 = 3." |
| `am3` | −3 | não | "9 está acima da média: desvio +3." |
| `a15` | 15 | não | "Desvio é diferença: 9 − 6 = 3." |

#### F4 — `mais-disperso`
- **Enunciado:** "Qual grupo é mais disperso: {4, 5, 6} ou {1, 5, 9}?"
- **Conta de conferência:** mesma média 5; desvios 1 contra 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `segundo` | {1, 5, 9} | **sim** | "Isso. Mesma média, mas valores bem mais afastados." |
| `primeiro` | {4, 5, 6} | não | "Em {4, 5, 6} os desvios são 1. Em {1, 5, 9} são 4: mais disperso." |
| `iguais` | Iguais | não | "A média é igual, mas os afastamentos não. {1, 5, 9} é mais disperso." |

### Médias

#### M1 — `variancia-2-4`
- **Enunciado:** "Qual a variância de 2 e 4?"
- **Conta de conferência:** média 3; desvios ±1; (1 + 1) / 2 = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1` | 1 | **sim** | "Certo. Quadrados de área 1, média 1." |
| `a2` | 2 | não | "2 é a soma das áreas. Dividindo por 2: 1." |
| `a3` | 3 | não | "3 é a média. A variância é 1." |
| `a0` | 0 | não | "0 é a soma dos desvios. Com quadrados: 1." |

#### M2 — `dp-da-variancia`
- **Enunciado:** "A variância de um grupo é 16. Qual o desvio padrão?"
- **Conta de conferência:** √16 = 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 | **sim** | "Isso. O lado do quadrado de área 16." |
| `a16` | 16 | não | "16 é a área. O desvio padrão é a raiz: 4." |
| `a8` | 8 | não | "16 / 2 não é raiz. √16 = 4." |
| `a256` | 256 | não | "256 é 16². O desvio padrão é √16 = 4." |

#### M3 — `soma-dos-desvios`
- **Enunciado:** "Para os valores 1, 2 e 6, quanto dá a soma dos desvios em relação à média?"
- **Conta de conferência:** média 3; −2 − 1 + 3 = 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | **sim** | "Certo. Os desvios sempre se cancelam." |
| `a6` | 6 | não | "Média 3: desvios −2, −1 e +3. Soma 0." |
| `a14` | 14 | não | "14 soma os quadrados. Os desvios somam 0." |
| `a3` | 3 | não | "3 é a média. A soma dos desvios é 0." |

### Desafios

#### D1 — `variancia-1-3-5`
- **Enunciado:** "Qual a variância de 1, 3 e 5?"
- **Conta de conferência:** média 3; (4 + 0 + 4) / 3 = 8/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8-3` | 8/3 | **sim** | "Isso. Áreas 4, 0 e 4, divididas por 3." |
| `a4` | 4 | não | "4 divide por 2. São 3 valores: 8/3." |
| `a8` | 8 | não | "8 é a soma das áreas. Média: 8/3." |
| `a2` | 2 | não | "2 é o desvio das pontas. A variância é 8/3." |

#### D2 — `somar-10`
- **Enunciado:** "Somando 10 pontos a todas as notas da turma, o que acontece com o desvio padrão?"
- **Conta de conferência:** desvios iguais ⇒ σ igual

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `igual` | Não muda | **sim** | "Certo. A régua toda anda 10, os afastamentos ficam iguais." |
| `mais10` | Aumenta 10 | não | "A média também sobe 10, então os desvios não mudam." |
| `dobra` | Dobra | não | "Dobrar seria multiplicar as notas. Somando, σ não muda." |
| `zera` | Zera | não | "As notas continuam espalhadas do mesmo jeito: σ igual." |

#### D3 — `multiplicar-2`
- **Enunciado:** "E se todas as notas forem multiplicadas por 2?"
- **Conta de conferência:** desvios dobram ⇒ σ dobra

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `dobra` | Dobra | **sim** | "Isso. Cada desvio dobra, e o lado do quadrado médio também." |
| `quadruplica` | Quadruplica | não | "Quem quadruplica é a variância. O desvio padrão dobra." |
| `igual` | Não muda | não | "Os afastamentos dobram, então σ dobra." |
| `mais2` | Aumenta 2 | não | "Multiplicar escala os desvios: σ dobra." |

#### D4 — `mais-regular`
- **Enunciado:** "Dois atletas têm média 7; um tem desvio padrão 0,5 e o outro, 2. Qual é mais regular?"
- **Conta de conferência:** menor σ = mais regular

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `dp05` | O de σ = 0,5 | **sim** | "Certo. Os resultados dele ficam mais perto da média." |
| `dp2` | O de σ = 2 | não | "σ = 2 indica resultados mais espalhados. O mais regular é o de 0,5." |
| `iguais` | Iguais | não | "A média é igual, mas a dispersão não. Mais regular: σ = 0,5." |

#### D5 — `dp-4-6-4-6`
- **Enunciado:** "Qual o desvio padrão de 4, 6, 4, 6?"
- **Fala do Paco:** "Última. Ache a média e veja o tamanho de cada desvio."
- **Conta de conferência:** média 5; desvios ±1; σ² = 1; σ = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1` | 1 | **sim** | "Isso. Todos estão a 1 da média." |
| `a2` | 2 | não | "2 é a amplitude. Cada valor está a 1 da média: σ = 1." |
| `a4` | 4 | não | "4 é a soma das áreas. Média 1, raiz 1." |
| `a0` | 0 | não | "Os valores não são iguais. σ = 1." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** comparar regularidade pelo desvio padrão.
- **Onde procurar:** ENEM (questões de "mais regular", sem imagem).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** coeficiente de variação. (A questão ENEM 2021 de ração de coelhos foi encontrada só em resumo e com gabarito ambíguo; não usar sem conferir o caderno oficial.)
- **Onde procurar:** ENEM 2021, caderno oficial do INEP.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular variância de uma lista curta.
- **Onde procurar:** UFRGS, UFPR, Unesp.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** efeito de somar ou multiplicar todos os dados.
- **Onde procurar:** Fuvest, Unicamp.
