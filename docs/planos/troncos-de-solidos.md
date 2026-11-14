# Plano — Troncos de pirâmides e cones

**Aula:** 1 — Cortar o Topo e Ficar com a Base · Escala k, k², k³ e o volume do tronco
**Caminho:** geometria / geometria-espacial / troncos-de-solidos
**Pré-requisitos que o aluno já domina:** `piramides`, `cones`, `semelhanca-e-teorema-de-tales`.

## a) Ancoragem mecânica
O tronco nasce quando um plano paralelo à base corta uma pirâmide ou um cone a uma distância `h'` do vértice superior (numa altura total `H`): a razão linear `k = h' / H` entra como fator de semelhança que governa tudo — reduz os lados/raios do topo para `k`, a área da seção do corte para `k²` (`A_menor = k² · A_maior`) e o volume da ponta retirada para `k³` (`V_menor = k³ · V_total`). O tronco embaixo fica com a diferença: `V_tronco = V_total − V_menor`.

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo troncos) — cone ou pirâmide transparente de altura `H` cortado por um plano horizontal deslizante a distância `h'` do vértice; exibe ao vivo a razão linear `k = h'/H` (`c1`), a área da base menor `k²` (`c2`), o volume do topo `k³` (`c3`) e o tronco remanescente embaixo (`c4`), além do trapézio meridiano (`h_t`, `R − r` e geratriz `g_t`).

## c) Caso neutro
Corte passando exatamente na base (`h' = H ⇒ k = 1`): nada foi cortado além do próprio sólido inteiro (`A_menor = A_maior`, `V_menor = V_total`, tronco de altura zero); ou corte no vértice (`h' = 0 ⇒ k = 0`), onde a ponta retirada é nula e o tronco é o sólido completo.

## d) Panorama e recorte
Estudamos razão de semelhança linear (`k`), de áreas (`k²`) e de volumes (`k³`) em seções paralelas à base de pirâmides e cones, volume do tronco por subtração (`V_total − V_menor`) e pela fórmula das bases, além do trapézio retângulo no corte meridiano do tronco de cone (`g_t² = h_t² + (R − r)²`).

## e) Progressão por contraste
1. Sólido inteiro (`k = 1`, referência) antes do corte.
2. Corte exatamente na metade da altura (`k = 1/2`): o raio/lado do corte cai para `1/2`, mas a área da seção cai para `(1/2)² = 1/4`.
3. Volume no corte da metade (`k = 1/2`): a pontinha do topo não tem metade do volume — tem apenas `(1/2)³ = 1/8` do volume total, deixando `7/8` no tronco de baixo!
4. Geratriz do tronco de cone: no corte vertical aparece um trapézio retângulo onde o cateto horizontal vale a diferença dos raios `R − r`, dando `g_t² = h_t² + (R − r)²`.

## f) Dedução causal da forma
Por que cortar um cone ou pirâmide na metade da altura deixa `7/8` do volume na parte de baixo? Porque a ponta retirada no topo é semelhante ao sólido inteiro com razão `k = 1/2` nas **três dimensões** (largura, profundidade e altura): multiplicar `1/2 · 1/2 · 1/2` dá `1/8` no topo, restando `1 − 1/8 = 7/8` no tronco! E na parede inclinada do tronco de cone, descer uma perpendicular da borda do topo (raio `r`) até a base maior (raio `R`) separa um retângulo de largura `r` e um triângulo retângulo de catetos `h_t` e `R − r`, de onde sai `g_t² = h_t² + (R − r)²`.

## g) Simulação espacial e fronteiras
Arrastar `h'` de `0` a `H` mostra como `k³` cresce devagar no começo e dispara no final: para dividir o volume de uma taça cônica ao meio (`V_menor / V_total = 1/2`), `h'/H` precisa ser `∛(1/2) ≈ 0,79` (quase `80%` da altura!). Na fronteira `r = R`, o tronco deixa de afunilar e vira um cilindro/prisma reto (`g_t = h_t`).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Razão linear (k) | Proporção das alturas e raios: k = h_menor / H_total = r / R. |
| c2 | Razão de áreas (k²) | Proporção entre a área do corte e a base: A_menor / A_maior = k². |
| c3 | Volume do topo (k³) | Fração do volume que fica na ponta cortada: V_menor = k³ · V_total. |
| c4 | Tronco | Parte inferior que sobra após retirar a ponta: V_total − V_menor. |

### Passo 1 — `corte-na-metade-areas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (altura do corte como entrada), 2 (visual), 3 (caso neutro k = 1), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — pirâmide quadrangular de base `6 × 6` (`A = 36`) e altura `H = 8`; plano de corte começa na base (`h' = 8, k = 1` fantasma) e sobe até a metade (`h' = 4, k = 0,5` em `c1`), destacando a seção `3 × 3` (`A = 9` em `c2`).
- **Sliders:** `h_menor` · "Distância do topo ao corte (h')" · 2..8 · passo 2 · inicial 8 · c1
- **Paco (abertura):** "Na base (h' = 8), o corte tem área 36. Leve o corte para a metade da altura (h' = 4): a área cai para a metade (18) ou para um quarto (9)?"
- **Interação do aluno:** move `h'` de 8 para 4 e vê o quadrado do corte passar de `6×6 = 36` para `3×3 = 9`.
- **Conclusão:** `h_menor ≤ 4`
- **Paco (conclusão):** "Cai para 9 (um quarto)! Como o lado caiu pela metade nas duas direções, a área multiplica por (1/2)² = 1/4."
- **Tati (dúvida):** `fim` — P: "E o que sobra embaixo quando tiramos a pontinha de cima?" / R: "Chama-se tronco de pirâmide (ou de cone, como um copo ou balde). Vamos ver quanto volume fica nele."

### Passo 2 — `volume-um-oitavo-e-sete-oitavos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste k² × k³), 6 (dedução do volume do tronco)
- **Widget:** WIDGET NOVO: `solido_3d` — cone de volume total `80` cortado em `k = 1/2`; slider separa a pontinha superior (`V_menor = 10` em `c3`) do tronco inferior (`V_tronco = 70` em `c4`).
- **Sliders:** `separar` · "Separar ponta e tronco" · 0..100 · passo 25 · inicial 0 · c4
- **Paco (abertura):** "Se o corte na metade da altura reduz cada medida a 1/2, que fração do volume total de 80 fica na pontinha de cima? Separe as partes!"
- **Interação do aluno:** separa o topo do tronco e lê `V_menor = 10` (`1/8` de 80) e `V_tronco = 70` (`7/8` de 80).
- **Conclusão:** `separar ≥ 100`
- **Paco (conclusão):** "Volume tem 3 dimensões: (1/2)³ = 1/8! A pontinha leva só 10, e o tronco embaixo fica com 80 − 10 = 70 (7/8 do total)."

### Passo 3 — `geratriz-do-tronco-de-cone`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6 (dedução do trapézio meridiano), 7 (fronteira r = R)
- **Widget:** WIDGET NOVO: `solido_3d` — tronco de cone em corte meridiano com raio maior `R = 5`, raio menor `r = 2` e altura do tronco `h_t = 4`, destacando o triângulo retângulo lateral de catetos `h_t = 4` e `R − r = 3` e hipotenusa `g_t = 5`.
- **Sliders:** `destacar_trapezio` · "Ver triângulo da borda" · 0..1 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "No tronco de cone de raios R = 5, r = 2 e altura 4, quanto avança a rampa na horizontal: 5, 2 ou a diferença 5 − 2 = 3?"
- **Interação do aluno:** ativa o corte do trapézio e vê a altura `4` descer da borda de raio `2`, deixando o cateto `5 − 2 = 3` e geratriz `g_t = 5`.
- **Conclusão:** `destacar_trapezio ≥ 1`
- **Paco (conclusão):** "O miolo de raio 2 é um cilindro reto; a rampa só avança R − r = 3! Por Pitágoras, g_t² = 4² + 3² = 5²."
- **Tati (dúvida):** `fim` — P: "E se r ficar igual a R?" / R: "Aí R − r = 0, a parede fica vertical (g_t = h_t) e o tronco vira um cilindro comum."

### Passo 4 — `desafio-tronco-metade`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: `solido_3d_figura` — pirâmide de volume total `V = 56 cm³` cortada por um plano paralelo à base exatamente na metade da altura (`k = 1/2`), destacando o tronco inferior em `c4`.
- **Paco (abertura):** "Calcule primeiro o volume da pontinha de cima usando (1/2)³ = 1/8."
- **Enunciado:** "Uma pirâmide de volume 56 cm³ é cortada ao meio na altura (k = 1/2). Qual é o volume do TRONCO (parte de baixo)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `v49` | 49 cm³ | **sim** | "Exato. A ponta tem 56 · (1/8) = 7 cm³, e o tronco fica com 56 − 7 = 49 cm³." | separa o topo de 7 cm³ e destaca o tronco de 49 cm³ |
| `v7` | 7 cm³ | não | "7 cm³ é o volume da pontinha retirada (1/8). O tronco embaixo tem 56 − 7 = 49 cm³." | pisca a ponta superior (7 cm³) contra o tronco (49 cm³) |
| `v28` | 28 cm³ | não | "O corte na metade da altura não divide o volume por 2! O topo tem 1/8 (7) e o tronco tem 49 cm³." | mostra a proporção cúbica `1/8` vs `7/8` |
| `v42` | 42 cm³ | não | "Você usou 1/4 (área) em vez de 1/8 (volume). O topo tem 7 cm³ e o tronco tem 49 cm³." | compara `k² = 1/4` com `k³ = 1/8` |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — cone cortado em tronco exibindo `k = h'/H`, seção `k²`, topo `k³`, tronco inferior e o triângulo `g_t² = h_t² + (R − r)²`.
- **Fórmula:** `k = h'/H`→c1 · `⇒` · `A'/A = k²`→c2 · `,` · `V'/V = k³`→c3 · `e` · `V_tronco = V − V'`→c4
- **Definições:** "Escala de áreas e volumes: cortar à razão linear k reduz a área a k² e o volume do topo a k³." · "Volume do tronco: volume do sólido inteiro menos o volume da ponta (ou h_t/3 · (A_B + √(A_B·A_b) + A_b))." · "Geratriz do tronco de cone: hipotenusa de h_t e da diferença dos raios R − r."
- **Paco (abertura):** "A semelhança atua em duas dimensões na área e em três no volume; por isso a ponta cortada tem volume k³ · V e o tronco fica com o resto."
- **Dica (hint):** "Toque em cada parte da relação para ver k, k², k³ e o tronco no sólido."

**Frase de encerramento (outro):** "Você viu como cortar um cone ou pirâmide escala áreas por k² e volumes por k³, deixando 7/8 do volume no tronco quando k = 1/2."

## i) Treino pós-aula

### Fáceis

#### F1 — `razao-linear-corte`
- **Enunciado:** "Um cone de altura H = 12 cm é cortado paralelamente à base a h' = 4 cm do vértice. Qual é a razão de semelhança linear k = h'/H?"
- **Conta de conferência:** k = 4 / 12 = 1/3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `k13` | 1/3 | **sim** | "Isso. k = h'/H = 4 / 12 = 1/3." |
| `k12` | 1/2 | não | "4 em 12 simplifica por 4: k = 4 / 12 = 1/3." |
| `k23` | 2/3 | não | "2/3 é a altura do tronco (8/12). A razão da ponta para o cone todo é 4/12 = 1/3." |

#### F2 — `area-secao-metade`
- **Enunciado:** "Uma pirâmide cuja base tem área 40 cm² é cortada na metade da altura (k = 1/2). Qual é a área da seção do corte?"
- **Conta de conferência:** A_menor = 40 · (1/2)² = 40 / 4 = 10 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 cm² | **sim** | "Certo. A área multiplica por k² = (1/2)² = 1/4: 40 / 4 = 10 cm²." |
| `a20` | 20 cm² | não | "Na metade da altura, a área cai para k² = 1/4 (não metade): 40 / 4 = 10 cm²." |
| `a5` | 5 cm² | não | "5 seria dividir por 8 (volume). Para área dividimos por 2² = 4: 10 cm²." |

#### F3 — `volume-ponta-metade`
- **Enunciado:** "Um cone tem volume total de 80 cm³. Cortado na metade da altura (k = 1/2), qual é o volume do conezinho do topo?"
- **Conta de conferência:** V_menor = 80 · (1/2)³ = 80 / 8 = 10 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v10` | 10 cm³ | **sim** | "Exato. O volume multiplica por k³ = (1/2)³ = 1/8: 80 / 8 = 10 cm³." |
| `v40` | 40 cm³ | não | "O volume não cai pela metade, e sim por (1/2)³ = 1/8: 80 / 8 = 10 cm³." |
| `v20` | 20 cm³ | não | "Dividir por 4 é para área (k²). No volume usamos k³ = 1/8: 10 cm³." |

#### F4 — `volume-tronco-subtracao`
- **Enunciado:** "Se uma pirâmide inteira tem volume 100 cm³ e a ponta retirada pelo corte tem volume 25 cm³, qual é o volume do tronco?"
- **Conta de conferência:** V_tronco = 100 − 25 = 75 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v75` | 75 cm³ | **sim** | "Isso. O tronco é o que sobra ao tirar a ponta: 100 − 25 = 75 cm³." |
| `v125` | 125 cm³ | não | "A ponta foi retirada, então subtraímos: 100 − 25 = 75 cm³." |
| `v50` | 50 cm³ | não | "Basta subtrair o topo do total: 100 − 25 = 75 cm³." |

### Médias

#### M1 — `geratriz-tronco-cone`
- **Enunciado:** "Um tronco de cone reto tem raio maior R = 6 cm, raio menor r = 3 cm e altura h_t = 4 cm. Quanto mede sua geratriz g_t?"
- **Conta de conferência:** R − r = 6 − 3 = 3 cm; g_t = √(4² + 3²) = 5 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g5` | 5 cm | **sim** | "Certo. O cateto horizontal é R − r = 6 − 3 = 3 cm; com h_t = 4 cm, g_t = √(3² + 4²) = 5 cm." |
| `g7` | 7 cm | não | "Use Pitágoras com h_t = 4 e R − r = 3: g_t = √(16 + 9) = 5 cm." |
| `g4` | 4 cm | não | "4 cm é a altura vertical. A parede inclinada mede √(4² + (6−3)²) = 5 cm." |

#### M2 — `volume-tronco-terco-altura`
- **Enunciado:** "Uma pirâmide de volume 54 cm³ é cortada a 1/3 da altura a partir do topo (k = 1/3). Qual é o volume do tronco inferior?"
- **Conta de conferência:** V_menor = 54 · (1/3)³ = 54 / 27 = 2 cm³; V_tronco = 54 − 2 = 52 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v52` | 52 cm³ | **sim** | "Exato. O topo tem 54 · (1/3)³ = 54 / 27 = 2 cm³; o tronco fica com 54 − 2 = 52 cm³." |
| `v2` | 2 cm³ | não | "2 cm³ é o volume da pontinha retirada. O tronco tem 54 − 2 = 52 cm³." |
| `v36` | 36 cm³ | não | "O volume da ponta é (1/3)³ = 1/27 do total (2 cm³), logo o tronco tem 52 cm³." |
| `v48` | 48 cm³ | não | "Você dividiu por 3² = 9 em vez de 3³ = 27. Topo = 2 cm³ e tronco = 52 cm³." |

#### M3 — `raio-do-corte-cone`
- **Enunciado:** "Um cone de raio da base R = 10 cm e altura H = 15 cm é cortado a h' = 6 cm do vértice. Qual é o raio r do círculo do corte?"
- **Conta de conferência:** r / 10 = 6 / 15 = 2/5 ⇒ r = 4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r4` | 4 cm | **sim** | "Isso. Pela semelhança r / 10 = 6 / 15 = 2/5, temos r = 4 cm." |
| `r6` | 6 cm | não | "6 cm é a distância ao vértice (ou o resto). Como k = 6/15 = 2/5, r = 10 · (2/5) = 4 cm." |
| `r5` | 5 cm | não | "5 cm seria na metade da altura (7,5 cm). Em h' = 6 cm, r = 4 cm." |

### Desafios

#### D1 — `taca-ate-a-metade-da-altura`
- **Enunciado:** "Uma taça em forma de cone tem capacidade total de 160 mL. Se colocarmos líquido até a METADE da altura do cone, quantos mL há na taça?"
- **Fala do Paco:** "O líquido ocupa justamente o conezinho do fundo (vértice) com k = 1/2!"
- **Conta de conferência:** V_líquido = 160 · (1/2)³ = 160 / 8 = 20 mL

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v20` | 20 mL | **sim** | "Exato! Até metade da altura (k = 1/2), o conezinho contém só (1/2)³ = 1/8 de 160 = 20 mL." |
| `v80` | 80 mL | não | "Pegadinha clássica! Na metade da altura cabe apenas (1/2)³ = 1/8 da taça: 20 mL." |
| `v40` | 40 mL | não | "1/4 é a razão das áreas. No volume é (1/2)³ = 1/8: 160 / 8 = 20 mL." |
| `v140` | 140 mL | não | "140 mL é o que falta para encher (o tronco no topo). No fundo há 20 mL." |

#### D2 — `quantas-tacas-meia-altura`
- **Enunciado:** "Quantas taças cônicas cheias apenas até a METADE da altura (k = 1/2) são necessárias para igualar o volume de 1 taça cheia até a borda?"
- **Conta de conferência:** cada meia-altura tem (1/2)³ = 1/8 do volume ⇒ 8 taças

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t8` | 8 | **sim** | "Certo. Como metade da altura guarda só (1/2)³ = 1/8 do volume, são precisas 8 taças." |
| `t2` | 2 | não | "O cone afunila no fundo: metade da altura tem 1/8 do volume, exigindo 8 taças." |
| `t4` | 4 | não | "4 é 2² (área). Em 3 dimensões, 2³ = 8 taças." |

#### D3 — `achar-k-pela-area`
- **Enunciado:** "Uma seção paralela à base de uma pirâmide tem área igual a 1/9 da área da base. Que fração do volume total tem a pirâmide menor do topo?"
- **Conta de conferência:** k² = 1/9 ⇒ k = 1/3 ⇒ k³ = (1/3)³ = 1/27

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v127` | 1/27 | **sim** | "Exato. Se k² = 1/9, então k = 1/3; logo a razão dos volumes é k³ = (1/3)³ = 1/27." |
| `v19` | 1/9 | não | "1/9 é a razão das áreas (k²). Tirando a raiz (k = 1/3) e elevando ao cubo, dá 1/27." |
| `v13` | 1/3 | não | "1/3 é a razão linear k. O volume da ponta é k³ = (1/3)³ = 1/27." |

#### D4 — `formula-volume-tronco-piramide`
- **Enunciado:** "Um tronco de pirâmide quadrada tem base maior de área 16 cm², base menor de área 4 cm² e altura h_t = 3 cm. Qual é o seu volume?"
- **Conta de conferência:** V = (h_t / 3) · (A_B + √(A_B·A_b) + A_b) = (3/3) · (16 + √64 + 4) = 1 · (16 + 8 + 4) = 28 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v28` | 28 cm³ | **sim** | "Isso. V = (3/3)·(16 + √(16·4) + 4) = 16 + 8 + 4 = 28 cm³ (ou 32 − 4 pela pirâmide toda)." |
| `v20` | 20 cm³ | não | "Faltou o termo médio √(16·4) = 8 na soma das bases: 16 + 8 + 4 = 28 cm³." |
| `v30` | 30 cm³ | não | "Não é a média simples das bases (10·3). Com k = 1/2, V = 32 − 4 = 28 cm³." |

#### D5 — `area-lateral-tronco-cone`
- **Enunciado:** "Um abajur tem a forma de um tronco de cone aberto com raios R = 6 cm, r = 2 cm e altura h_t = 3 cm. Qual é a área lateral `π(R + r)·g_t`?"
- **Fala do Paco:** "Ache primeiro a geratriz g_t com h_t = 3 e R − r = 4!"
- **Conta de conferência:** R − r = 4 e h_t = 3 ⇒ g_t = 5 cm; A_l = π·(6 + 2)·5 = 40π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a40p` | 40π cm² | **sim** | "Exato. g_t = √(3² + 4²) = 5 cm, e A_l = π·(R + r)·g_t = π·8·5 = 40π cm²." |
| `a24p` | 24π cm² | não | "Você usou h_t = 3 em vez da geratriz inclinada g_t = 5: π·(6 + 2)·5 = 40π cm²." |
| `a20p` | 20π cm² | não | "Na área lateral soma-se R + r = 8 (não subtrai): π·8·5 = 40π cm²." |

### Vestibular

#### V1 — `enem-2020-kukulkan`
- **Enunciado (resumido):** O Templo de Kukulkán tem formato de tronco reto de pirâmide de base quadrada. Quais figuras planas formam esse sólido?
- **Fala do Paco:** "Conte as duas tampas paralelas e as quatro paredes inclinadas laterais."
- **Fonte:** ENEM 2020, Questão 151 — `https://api.enem.dev/v1/exams/2020/questions/151`
- **Adaptação:** enunciado resumido; alternativas e gabarito (2 quadrados e 4 trapézios isósceles) mantidos.
- **Conta de conferência:** tronco reto de pirâmide quadrangular regular tem 2 bases quadradas e 4 faces laterais em trapézio isósceles.
- **Opções e feedback:** 2 quad + 4 ret, 1 ret + 4 tri isósc, 2 quad + 4 trap isósc (correta), 1 quad + 3 ret + 2 trap ret, 2 ret + 2 quad + 2 trap ret.

#### V2 — `enem-2009-vela`
- **Enunciado (resumido):** Pirâmide (base 6 cm, altura 19 cm) tem 4 blocos iguais espaçados de 1 cm. Retirando a ponta (base 1,5 cm), qual o volume?
- **Fala do Paco:** "Desconte os 3 espaços de 1 cm para achar a altura útil (16 cm) e use semelhança k = 1,5 / 6 = 1/4."
- **Fonte:** ENEM 2009, Questão 173 — `https://api.enem.dev/v1/exams/2009/questions/173`
- **Adaptação:** enunciado resumido; alternativas e gabarito (189 cm³) mantidos.
- **Conta de conferência:** `H_útil = 19 - 3 = 16 cm`; `V_total = (36·16)/3 = 192 cm³`; `k = 1,5/6 = 1/4 => V_ponta = (1/4)³·192 = 3 cm³`; `192 - 3 = 189 cm³`.
- **Opções e feedback:** 156 cm³, 189 cm³ (correta), 192 cm³, 216 cm³, 540 cm³.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** relacionar área da seção transversal com altura do corte em pirâmides/cones.
- **Onde procurar:** Fuvest, UFPR, UFRGS.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular geratriz e área lateral de tronco de cone ou pirâmide.
- **Onde procurar:** ENEM, UERJ, Unifesp.
