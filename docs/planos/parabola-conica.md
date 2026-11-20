# Plano — Parábola como lugar geométrico e cônica

**Aula:** 1 — Entre o Foco e a Reta · A parábola como lugar geométrico
**Caminho:** geometria / geometria-analitica / parabola-conica
**Pré-requisitos que o aluno já domina:** distância entre pontos, distância de ponto a reta horizontal, função quadrática.

## a) Ancoragem mecânica
A máquina recebe um ponto fixo (foco F) e uma reta fixa (diretriz d) e devolve todos os pontos que estão à mesma distância dos dois. O aluno controla o ponto P (entrada) e a distância do foco à diretriz; a saída é a curva traçada por todos os P que passam no teste: a parábola.

## b) Visual de partida
WIDGET NOVO `lugar_geometrico` (modo parábola): plano com foco F (c1) e diretriz horizontal (c2). P é arrastável (encaixe em inteiros) e mostra dois segmentos: PF e a perpendicular até a diretriz, com as medidas (c4). Quando as duas são iguais, P deixa um ponto permanente na curva (c3). Slider para a distância p do foco ao vértice. Métricas: `vertice_achado`, `pontos_sobre`, `igualou`, `p`.

## c) Caso neutro
O vértice: no eixo de simetria, o ponto exatamente no meio entre o foco e a diretriz. Ele está a p de cada um, sem nenhum deslocamento lateral. É o ponto mais simples da curva, e todos os outros saem dele.

## d) Panorama e recorte
Elipse e hipérbole são as outras cônicas, com regras de soma e diferença de distâncias, e todas aparecem cortando um cone. Aqui: parábola com vértice na origem e eixo vertical, x² = 4py.

## e) Progressão por contraste
1. O vértice: equidistante no próprio eixo (referência).
2. Outros pontos equidistantes: a curva se desenha e abraça o foco.
3. Igualando as distâncias de (x; y): x² = 4py, a mesma curva da função quadrática.
4. Afastando o foco: a parábola se abre.

## f) Dedução causal da forma
Para o foco (0; p) e a diretriz y = −p, a distância de P(x; y) ao foco é √(x² + (y − p)²) e à diretriz é y + p. Igualando e elevando ao quadrado: x² + y² − 2py + p² = y² + 2py + p², e sobra x² = 4py. Pontos simétricos (x e −x) dão a mesma conta, por isso a curva é simétrica em relação ao eixo.

## g) Simulação espacial e fronteiras
Panorama visual opcional (WIDGET NOVO `solido_3d`, corte do cone): inclinar o plano de corte leva de circunferência a elipse, parábola (plano paralelo à geratriz) e hipérbole; vale como abertura da dúvida da Tati no passo 1. p maior abre a parábola; p menor fecha. p negativo (foco abaixo da diretriz) vira a parábola para baixo: x² = −4|p|y. Pontos do lado do foco ficam mais perto dele que da reta; do outro lado da curva, o contrário. Raios que saem do foco refletem paralelos ao eixo (faróis e antenas).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Foco | O ponto fixo F de onde se mede uma das distâncias. |
| c2 | Diretriz | A reta fixa de onde se mede a outra distância. |
| c3 | Parábola | Todos os pontos à mesma distância do foco e da diretriz. |
| c4 | Distâncias de P | Os dois segmentos que P compara: até o foco e até a reta. |

### Passo 1 — `vertice`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `lugar_geometrico` (modo parábola) — F(0; 1), diretriz y = −1; P preso ao eixo y, arrastável. Emite `vertice_achado`.
- **Sliders:** nenhum
- **Paco (abertura):** "O foco está em (0; 1) e a diretriz é y = −1. Que ponto do eixo y fica à mesma distância dos dois?"
- **Interação do aluno:** arrasta P pelo eixo y até as duas medidas ficarem iguais.
- **Conclusão:** `vertice_achado ≥ 1`
- **Paco (conclusão):** "A origem: 1 até o foco e 1 até a reta. É o vértice, o ponto mais simples da curva."
- **Tati (dúvida):** `fim` — P: "Toda cônica nasce assim, de distâncias?" / R: "Sim, cada uma com sua regra: elipse soma, hipérbole subtrai. Hoje, parábola."

### Passo 2 — `tracar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 7
- **Widget:** `lugar_geometrico` — P livre; segmentos PF e P-diretriz (c4) com medidas; pontos que passam no teste ficam marcados (c3). Emite `pontos_sobre`.
- **Sliders:** nenhum
- **Paco (abertura):** "Procure outros pontos à mesma distância do foco e da diretriz. Teste (2; 1): quanto mede cada distância?"
- **Interação do aluno:** acha (2; 1), (−2; 1), (4; 4), (−4; 4)…
- **Conclusão:** `pontos_sobre ≥ 4`
- **Paco (conclusão):** "Em (2; 1) as duas valem 2. Os pontos achados desenham uma parábola que abraça o foco."

### Passo 3 — `igualar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6
- **Widget:** `lugar_geometrico` — P genérico (x; y) com as duas expressões escritas; botão "igualar" mostra os passos até x² = 4y e desenha y = x²/4 sobre os pontos marcados. Emite `igualou`.
- **Sliders:** nenhum
- **Paco (abertura):** "Escreva as duas distâncias de um ponto qualquer (x; y). O que sobra quando você iguala?"
- **Interação do aluno:** toca "igualar" e acompanha o cancelamento de y² e p².
- **Conclusão:** `igualou ≥ 1`
- **Paco (conclusão):** "x² + (y − 1)² = (y + 1)² simplifica para x² = 4y. É a parábola y = x²/4 da função quadrática."

### Passo 4 — `afastar-foco`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7
- **Widget:** `lugar_geometrico` — foco (0; p), diretriz y = −p; a curva x² = 4py se redesenha; a de p = 1 fica como fantasma cinza.
- **Sliders:** `p` · "Foco até o vértice" · 1..3 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Afaste o foco da diretriz. A parábola fica mais aberta ou mais fechada?"
- **Interação do aluno:** sobe p e compara com o fantasma.
- **Conclusão:** `p ≥ 3`
- **Paco (conclusão):** "Mais aberta: em x² = 4py, com p maior, y cresce mais devagar. Foco perto da reta deixa a curva fechada."
- **Tati (dúvida):** `fim` — P: "E se o foco ficar abaixo da diretriz?" / R: "A parábola vira para baixo: x² = −4py. Ela sempre abraça o foco."

### Passo 5 — `desafio-foco`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `lugar_figura` — parábola x² = 8y desenhada, sem foco nem diretriz.
- **Paco (abertura):** "Compare com x² = 4py: quanto vale p?"
- **Enunciado:** "Qual é o foco da parábola x² = 8y?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `f02` | (0; 2) | **sim** | "Isso. 4p = 8, então p = 2." | foco em (0; 2) e diretriz y = −2 |
| `f08` | (0; 8) | não | "8 é 4p. O foco fica em p = 2: (0; 2)." | foco em (0; 8) longe da curva, depois descendo |
| `f20` | (2; 0) | não | "O eixo é vertical: o foco fica no eixo y, (0; 2)." | ponto (2; 0) fora do eixo, piscando |
| `f04` | (0; 4) | não | "4 é 8/2, não 8/4. p = 2: (0; 2)." | distâncias desiguais a partir de (0; 4) |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `lugar_figura` — parábola x² = 4y com foco (0; 1), diretriz y = −1 e um ponto P(2; 1) com os dois segmentos.
- **Fórmula:** `x²` · `=` · `4` · `p`→c1 · `y` ; diretriz `y = −p`→c2
- **Definições:** "Parábola: pontos equidistantes do foco e da diretriz." · "Vértice: o ponto da curva no meio entre foco e diretriz." · "p: distância do vértice ao foco (e do vértice à diretriz)."
- **Paco (abertura):** "Igualar as duas distâncias faz os quadrados de y se cancelarem. Por isso sobra x² = 4py."
- **Dica (hint):** "Toque em uma letra para ver o que ela é no desenho."

**Frase de encerramento (outro):** "Você traçou pontos equidistantes de um foco e de uma reta: a parábola x² = 4py, a mesma da função quadrática."

## i) Treino pós-aula

### Fáceis

#### F1 — `vertice-x2-4y`
- **Enunciado:** "Qual o vértice da parábola x² = 4y?"
- **Conta de conferência:** (0; 0)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v00` | (0; 0) | **sim** | "Isso. No meio entre foco (0; 1) e diretriz y = −1." |
| `v01` | (0; 1) | não | "(0; 1) é o foco. O vértice fica na origem." |
| `v04` | (0; 4) | não | "4 é 4p. O vértice é (0; 0)." |
| `v0m1` | (0; −1) | não | "y = −1 é a diretriz. O vértice é a origem." |

#### F2 — `definicao`
- **Enunciado:** "A parábola é o conjunto dos pontos equidistantes de:"
- **Conta de conferência:** foco e diretriz

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `ponto-reta` | Um ponto e uma reta | **sim** | "Certo. Foco e diretriz." |
| `dois-pontos` | Dois pontos | não | "Equidistantes de dois pontos formam uma reta. Parábola: ponto e reta." |
| `centro` | Um ponto só | não | "Distância fixa a um ponto é circunferência. Parábola: ponto e reta." |
| `duas-retas` | Duas retas | não | "Isso dá retas. Parábola: um ponto e uma reta." |

#### F3 — `ponto-na-curva`
- **Enunciado:** "Na parábola x² = 4y, qual o y do ponto com x = 2?"
- **Conta de conferência:** 4 = 4y ⇒ y = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1` | 1 | **sim** | "Isso. 2² = 4y dá y = 1." |
| `a4` | 4 | não | "4 é x². Dividindo por 4: y = 1." |
| `a2` | 2 | não | "x² = 4, então y = 4/4 = 1." |
| `a16` | 16 | não | "Multiplicou em vez de dividir. y = 1." |

#### F4 — `foco-x2-4y`
- **Enunciado:** "Qual o foco da parábola x² = 4y?"
- **Conta de conferência:** 4p = 4 ⇒ p = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f01` | (0; 1) | **sim** | "Certo. p = 1." |
| `f04` | (0; 4) | não | "4 é 4p. O foco está em p = 1." |
| `f10` | (1; 0) | não | "O eixo é vertical: foco em (0; 1)." |
| `f00` | (0; 0) | não | "(0; 0) é o vértice. Foco (0; 1)." |

### Médias

#### M1 — `diretriz-x2-12y`
- **Enunciado:** "Qual a diretriz da parábola x² = 12y?"
- **Conta de conferência:** 4p = 12 ⇒ p = 3 ⇒ y = −3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `ym3` | y = −3 | **sim** | "Isso. p = 3, diretriz abaixo do vértice." |
| `y3` | y = 3 | não | "y = 3 passa pelo foco. A diretriz fica do outro lado: y = −3." |
| `ym12` | y = −12 | não | "12 é 4p. p = 3: y = −3." |
| `xm3` | x = −3 | não | "Com eixo vertical, a diretriz é horizontal: y = −3." |

#### M2 — `equacao-foco-0-2`
- **Enunciado:** "Qual a equação da parábola de foco (0; 2) e diretriz y = −2?"
- **Conta de conferência:** p = 2 ⇒ x² = 8y

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `x8y` | x² = 8y | **sim** | "Certo. 4p = 8." |
| `x2y` | x² = 2y | não | "Use 4p, não p: x² = 8y." |
| `x4y` | x² = 4y | não | "x² = 4y tem p = 1. Com p = 2: x² = 8y." |
| `y8x` | y² = 8x | não | "Isso abriria para a direita. Foco no eixo y: x² = 8y." |

#### M3 — `distancia-a-diretriz`
- **Enunciado:** "O ponto (4; 4) está na parábola x² = 4y. Qual sua distância até a diretriz y = −1?"
- **Conta de conferência:** 4 − (−1) = 5 (e PF = √(16 + 9) = 5)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Isso. 4 + 1; e até o foco também dá 5." |
| `a4` | 4 | não | "4 é a altura de P. Até y = −1 são 4 + 1 = 5." |
| `a3` | 3 | não | "A diretriz está abaixo do eixo: 4 + 1 = 5." |
| `a-raiz32` | √32 | não | "√32 é a distância até a origem. Até a reta: 5." |

### Desafios

#### D1 — `para-baixo`
- **Enunciado:** "Qual a equação da parábola de foco (0; −1) e diretriz y = 1?"
- **Conta de conferência:** abre para baixo: x² = −4y

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `xm4y` | x² = −4y | **sim** | "Certo. O foco está embaixo, a curva abre para baixo." |
| `x4y` | x² = 4y | não | "Essa abre para cima, com foco (0; 1). Aqui: x² = −4y." |
| `ym4x` | y² = −4x | não | "Isso abriria para a esquerda. Foco no eixo y: x² = −4y." |
| `xm1y` | x² = −y | não | "Use 4p: x² = −4y." |

#### D2 — `x-para-y9`
- **Enunciado:** "Na parábola x² = 4y, quais pontos têm y = 9?"
- **Conta de conferência:** x² = 36 ⇒ x = ±6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pm6` | (6; 9) e (−6; 9) | **sim** | "Isso. x² = 36 e a curva é simétrica." |
| `p6` | Só (6; 9) | não | "−6 também serve: (−6)² = 36. São dois pontos." |
| `p36` | (36; 9) | não | "36 é x². x = ±6." |
| `p3` | (3; 9) e (−3; 9) | não | "3² = 9, não 36. x = ±6." |

#### D3 — `farol`
- **Enunciado:** "Num farol com espelho parabólico, onde a lâmpada deve ficar para o feixe sair paralelo ao eixo?"
- **Conta de conferência:** raios do foco refletem paralelos ao eixo

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `foco` | No foco | **sim** | "Certo. Tudo o que sai do foco reflete paralelo ao eixo." |
| `vertice` | No vértice | não | "No vértice os raios se espalham. A lâmpada vai no foco." |
| `diretriz` | Na diretriz | não | "A diretriz fica atrás do espelho. A lâmpada vai no foco." |
| `qualquer` | Em qualquer lugar | não | "Só o foco faz os raios saírem paralelos." |

#### D4 — `distancia-10`
- **Enunciado:** "Um ponto da parábola x² = 4y está a 10 do foco. Qual é o y dele?"
- **Fala do Paco:** "Distância ao foco é igual à distância até a diretriz."
- **Conta de conferência:** y + 1 = 10 ⇒ y = 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a9` | 9 | **sim** | "Isso. Até a diretriz y = −1 também é 10: y = 9." |
| `a10` | 10 | não | "A distância até y = −1 é y + 1 = 10: y = 9." |
| `a11` | 11 | não | "A diretriz está abaixo: y + 1 = 10, y = 9." |
| `a25` | 25 | não | "Use a diretriz, não a fórmula: y + 1 = 10, y = 9." |

#### D5 — `mais-aberta`
- **Enunciado:** "Qual parábola é mais aberta: x² = 4y ou x² = 12y?"
- **Fala do Paco:** "Última. Compare os p, a distância do foco ao vértice."
- **Conta de conferência:** p = 1 contra p = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `x12y` | x² = 12y | **sim** | "Certo. p = 3, foco mais longe: curva mais aberta." |
| `x4y` | x² = 4y | não | "p = 1 é mais fechada. x² = 12y, com p = 3, abre mais." |
| `iguais` | Iguais | não | "Os p são 1 e 3. A de p = 3 é mais aberta." |

### Vestibular

**B42 (19/11/2026): questões de provas oficiais conferidas no PDF e inseridas na aula** (registro em `docs/revisao/vestibular-b42.md`). Os espaços PENDENTE-FONTE abaixo continuam abertos para outras questões.

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `ita-2009-parabola`
- **Enunciado (resumido):** "Qual é a distância entre o vértice e o foco da parábola 2x² − 4x − 4y + 3 = 0?"
- **Fala do Paco:** "Complete o quadrado em x e compare com (x − h)² = 4p(y − k): a distância vértice-foco é |p|."
- **Fonte:** ITA 2009 (adaptada) — **Adaptação:** Matemática, Questão 16: enunciado reescrito como pergunta; alternativas e gabarito oficial (E) mantidos. — **URL:** https://www.vestibular.ita.br/provas/matematica_2009.pdf · https://www.vestibular.ita.br/provas/gabarito_2009.pdf
- **Conta de conferência:** (x − 1)² = 2(y − 1/4) ⇒ 4p = 2 ⇒ p = 1/2 (E).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | não | "2 é o valor de 4p em (x − 1)² = 2(y − 1/4). A distância vértice-foco é p = 2/4 = 1/2." |
| `a3-2` | 3/2 | não | "3/2 é o termo constante de x² − 2x + 3/2 = 2y. Completando: (x − 1)² = 2(y − 1/4), 4p = 2 e p = 1/2." |
| `a1` | 1 | não | "1 é 2p. Em (x − 1)² = 2(y − 1/4), 4p = 2 e a distância vértice-foco é p = 1/2." |
| `a3-4` | 3/4 | não | "3/4 é o termo constante de y = x²/2 − x + 3/4. Completando: (x − 1)² = 2(y − 1/4), 4p = 2 e p = 1/2." |
| `a1-2` | 1/2 | **sim** | "Isso. 2x² − 4x + 3 = 4y vira (x − 1)² = 2(y − 1/4): é x² = 4py deslocada, com 4p = 2, então p = 1/2." |

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** foco e diretriz a partir da equação.
- **Onde procurar:** UFRGS, PUC-RJ, Unicamp.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** parábola em contexto (antena, farol, ponte).
- **Onde procurar:** ENEM ("antena parabólica").

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** reconhecer a cônica pela equação.
- **Onde procurar:** UFAM, UFPI, PUC-Rio (lista de cônicas do Projeto Agatha; precisam de ano).
