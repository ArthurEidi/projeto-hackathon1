# Plano — Polígonos e quadriláteros: propriedades e ângulos

**Aula:** 1 — Fatiar em Triângulos e Dar a Volta · Soma dos ângulos (n − 2)·180° e família dos quadriláteros
**Caminho:** geometria / geometria-plana / poligonos-e-quadrilateros
**Pré-requisitos que o aluno já domina:** `angulos-retas-paralelas`, `triangulos-congruencia-e-propriedades`.

## a) Ancoragem mecânica
Qualquer polígono convexo de `n` lados funciona como um mosaico de triângulos: escolhendo um único vértice e traçando todas as diagonais a partir dele, o polígono é fatiado em exatamente `n − 2` triângulos, fazendo a soma dos ângulos internos crescer `180°` a cada lado novo (`S_i = (n − 2) · 180°`). Já por fora, caminhar ao redor do polígono exige dar **uma volta completa**, mantendo a soma dos ângulos externos travada em `S_e = 360°` para qualquer `n`.

## b) Visual de partida
WIDGET NOVO: `geometria_plana` (modo polígonos e quadriláteros) — polígono convexo com seletor de número de lados `n` (`3` a `8`), botão que traça as diagonais a partir de um vértice fatiando-o em `n − 2` triângulos coloridos, animação de "encolher o polígono" que junta todos os ângulos externos num giro de `360°`, e painel de deformação da família dos quadriláteros (trapézio → paralelogramo → retângulo / losango → quadrado).

## c) Caso neutro
O **triângulo** (`n = 3`): não tem diagonais (`0`) e já é `3 − 2 = 1` único triângulo, com soma interna `S_i = 1 · 180° = 180°` e soma externa `360°`. Cada novo vértice adicionado pendura mais `1` triângulo (`+180°`) na figura.

## d) Panorama e recorte
Estudamos nomenclatura dos polígonos por número de lados `n`, soma dos ângulos internos `S_i = (n − 2)·180°`, soma dos externos `S_e = 360°`, contagem de diagonais `d = n(n − 3)/2` e a árvore genealógica dos quadriláteros notáveis (trapézio, paralelogramo, retângulo, losango e quadrado).

## e) Progressão por contraste
1. Triângulo (`n = 3`): `1` triângulo interno, `S_i = 180°` (referência).
2. Quadrilátero (`n = 4`): `1` diagonal divide em `2` triângulos → `S_i = 2 · 180° = 360°`.
3. Pentágono (`n = 5`) e Hexágono (`n = 6`): `3` triângulos (`540°`) e `4` triângulos (`720°`); enquanto `S_i` cresce sem parar, a soma dos ângulos externos `S_e` permanece fixa em `360°`.
4. Família dos paralelogramos: no **paralelogramo** lados e ângulos opostos são iguais e diagonais cortam-se ao meio; no **retângulo** as diagonais ficam iguais; no **losango** as diagonais ficam perpendiculares (`90°`); no **quadrado** valem os dois!

## f) Dedução causal da forma
Por que cabem `n − 2` triângulos num polígono de `n` lados? Porque ligando um vértice fixo a todos os outros, não ligamos a ele mesmo nem aos 2 vizinhos (que já são lados), traçando `n − 3` diagonais que abrem `n − 2` fatias triangulares de `180°` cada. E por que o total de diagonais de todos os vértices é `n(n − 3) / 2`? Porque cada um dos `n` vértices lança `n − 3` diagonais, mas como a diagonal de `A` até `C` é a mesma de `C` até `A`, dividimos por `2`.

## g) Simulação espacial e fronteiras
Arrastar um vértice para dentro até passar de `180°` (polígono côncavo) mostra a fronteira: uma diagonal passa por fora da figura, embora a soma dos ângulos internos continue `(n − 2)·180°`. Nos quadriláteros, todo quadrado é ao mesmo tempo um retângulo (tem 4 ângulos de `90°`) e um losango (tem 4 lados iguais), mas a recíproca não vale.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Triângulos (n − 2) | Quantidade de triângulos em que um vértice fatia o polígono. |
| c2 | Soma interna (S_i) | Soma de todos os ângulos internos: (n − 2) · 180°. |
| c3 | Soma externa (360°) | Giro total por fora do polígono, sempre igual a 360°. |
| c4 | Diagonais | Segmentos que ligam vértices não vizinhos: n(n − 3)/2. |

### Passo 1 — `fatiar-em-triangulos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (n como entrada), 2 (visual), 3 (caso neutro n = 3), 4 (panorama)
- **Widget:** WIDGET NOVO: `geometria_plana` — polígono começando no caso neutro do triângulo (`n = 3`, `1` triângulo em `c1`, `S_i = 180°` em `c2`); slider aumenta `n` até `6` (hexágono), traçando as diagonais a partir de um vértice.
- **Sliders:** `n` · "Número de lados (n)" · 3..6 · passo 1 · inicial 3 · c1
- **Paco (abertura):** "O triângulo tem soma interna de 180°. Se aumentarmos n até 6 (hexágono), em quantos triângulos ele é fatiado a partir de um vértice?"
- **Interação do aluno:** leva `n` de 3 até 6 e vê aparecerem 2 triângulos no quadrilátero (`360°`), 3 no pentágono (`540°`) e 4 no hexágono (`720°`).
- **Conclusão:** `n ≥ 6`
- **Paco (conclusão):** "Em 4 triângulos (6 − 2 = 4)! Cada triângulo soma 180°, por isso a soma interna é sempre (n − 2) · 180°."
- **Tati (dúvida):** `fim` — P: "Por que são sempre n − 2 triângulos?" / R: "Porque o vértice escolhido e seus 2 vizinhos já gastam 3 cantos no primeiro triângulo; cada canto novo fecha mais 1 triângulo!"

### Passo 2 — `giro-externo-360`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste S_i cresce × S_e constante), 6 (dedução da volta completa)
- **Widget:** WIDGET NOVO: `geometria_plana` — pentágono com seus 5 ângulos externos coloridos (`c3`); slider afasta a câmera (encolhe o polígono a um ponto) juntando os 5 setores num círculo perfeito de `360°`.
- **Sliders:** `encolher` · "Juntar ângulos externos" · 0..100 · passo 25 · inicial 0 · c3
- **Paco (abertura):** "A soma interna cresce com n, mas e a soma dos ângulos EXTERNOS (as curvas ao redor da borda)? Encolha o polígono para ver!"
- **Interação do aluno:** move o slider até 100% e vê os ângulos externos se encaixarem fechando exatamente 1 volta (`360°`).
- **Conclusão:** `encolher ≥ 100`
- **Paco (conclusão):** "Dá sempre 360°, não importa quantos lados tenha! Andar em volta do polígono e voltar ao início é dar exatamente 1 volta completa."

### Passo 3 — `diagonais-dos-quadrilateros`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (paralelogramo → retângulo × losango → quadrado), 7 (fronteira de inclusão)
- **Widget:** WIDGET NOVO: `geometria_plana` — paralelogramo articulado com suas duas diagonais (`c4`); controles permitem endireitar os ângulos a `90°` (retângulo: diagonais iguais) ou igualar os 4 lados (losango: diagonais a `90°`). Emite `formas_testadas`.
- **Sliders:** `formas_testadas` · "Transformar quadrilátero" · 1..3 · passo 1 · inicial 1 · c4
- **Paco (abertura):** "No paralelogramo as diagonais se cortam ao meio. O que acontece com elas quando ele vira retângulo, losango e quadrado?"
- **Interação do aluno:** alterna pelas 3 formas e observa: no retângulo as diagonais igualam o tamanho; no losango cruzam-se a `90°`; no quadrado fazem os dois.
- **Conclusão:** `formas_testadas ≥ 3`
- **Paco (conclusão):** "Retângulo tem diagonais iguais; losango tem diagonais perpendiculares (90°); e o quadrado herda as duas propriedades!"
- **Tati (dúvida):** `fim` — P: "Então todo quadrado é um losango e também um retângulo?" / R: "Sim! Ele tem 4 lados iguais (é losango) e 4 ângulos retos (é retângulo)."

### Passo 4 — `desafio-soma-pentagono`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — pentágono convexo (`n = 5`) com as 2 diagonais tracejadas a partir de um vértice (`c1`).
- **Paco (abertura):** "Conte em quantos triângulos as diagonais de um vértice dividem o pentágono."
- **Enunciado:** "Qual é a soma dos ângulos internos de um pentágono convexo (n = 5)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `g540` | 540° | **sim** | "Exato. São 5 − 2 = 3 triângulos internos: 3 · 180° = 540°." | colore os 3 triângulos de 180° cada |
| `g360` | 360° | não | "360° é a soma dos externos (ou do quadrilátero). No pentágono são 3 · 180° = 540°." | destaca o 3º triângulo extra além do quadrilátero |
| `g720` | 720° | não | "720° é do hexágono (4 triângulos). No pentágono são (5 − 2) · 180° = 540°." | numera os 3 triângulos `1, 2, 3` |
| `g900` | 900° | não | "Você multiplicou 5 · 180° sem descontar 2: é (5 − 2) · 180° = 540°." | aponta a fórmula `(5 − 2) · 180°` |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — hexágono fatiado em `4` triângulos (`c1, c2`), giro externo de `360°` (`c3`) e diagonais (`c4`).
- **Fórmula:** `S_i`→c2 · `=` · `(n − 2)`→c1 · `· 180°` · `,` · `S_e = 360°`→c3 · `e` · `d = n(n − 3)/2`→c4
- **Definições:** "Soma dos ângulos internos: (n − 2) triângulos vezes 180°." · "Soma dos ângulos externos: sempre 360° em qualquer polígono convexo." · "Número de diagonais: d = n(n − 3)/2."
- **Paco (abertura):** "Um vértice fatia o polígono em n − 2 triângulos e o contorno dá uma volta; por isso S_i = (n − 2)·180° e S_e = 360°."
- **Dica (hint):** "Toque em cada parte da fórmula para ver os triângulos, o giro externo ou as diagonais."

**Frase de encerramento (outro):** "Você deduziu a soma dos ângulos fatiando polígonos em triângulos e dominou as propriedades dos quadriláteros."

## i) Treino pós-aula

### Fáceis

#### F1 — `soma-interna-quadrilatero`
- **Enunciado:** "Qual é a soma dos ângulos internos de qualquer quadrilátero convexo (n = 4)?"
- **Conta de conferência:** (4 − 2) · 180° = 2 · 180° = 360°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g360` | 360° | **sim** | "Isso. Uma diagonal divide o quadrilátero em 2 triângulos: 2 · 180° = 360°." |
| `g180` | 180° | não | "180° é do triângulo. O quadrilátero tem 2 triângulos: 360°." |
| `g540` | 540° | não | "540° é do pentágono. Para n = 4, (4 − 2) · 180° = 360°." |

#### F2 — `soma-externa-decagono`
- **Enunciado:** "Qual é a soma dos ângulos EXTERNOS de um decágono convexo (10 lados)?"
- **Conta de conferência:** S_e = 360° para qualquer n

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g360` | 360° | **sim** | "Certo! A soma dos ângulos externos vale sempre 360°, para qualquer número de lados." |
| `g1440` | 1440° | não | "1440° é a soma dos internos (8·180°). A soma dos externos é sempre 360°." |
| `g1800` | 1800° | não | "Dar a volta por fora de qualquer polígono soma sempre 360°." |

#### F3 — `quarto-angulo-quadrilatero`
- **Enunciado:** "Três ângulos internos de um quadrilátero medem 80°, 100° e 110°. Quanto mede o quarto ângulo?"
- **Conta de conferência:** 360° − (80° + 100° + 110°) = 360° − 290° = 70°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g70` | 70° | **sim** | "Exato. Os 3 somam 290°; para fechar os 360° do quadrilátero, faltam 70°." |
| `g80` | 80° | não | "290° + 80° passaria de 360°. O quarto ângulo mede 360° − 290° = 70°." |
| `g90` | 90° | não | "A soma precisa dar 360°: 360° − 290° = 70°." |

#### F4 — `propriedade-losango`
- **Enunciado:** "Qual quadrilátero tem obrigatoriamente os 4 lados de mesma medida e diagonais perpendiculares (90°)?"
- **Conta de conferência:** definição e propriedade do losango

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `los` | Losango | **sim** | "Isso. Todo losango tem 4 lados iguais e diagonais que se cruzam a 90°." |
| `ret` | Retângulo | não | "O retângulo tem 4 ângulos retos, mas seus 4 lados não precisam ser iguais. É o losango." |
| `trap` | Trapézio | não | "O trapézio tem apenas um par de lados paralelos. Lados iguais caracterizam o losango." |

### Médias

#### M1 — `soma-interna-hexagono`
- **Enunciado:** "Qual é a soma dos ângulos internos de um hexágono convexo (n = 6)?"
- **Conta de conferência:** (6 − 2) · 180° = 4 · 180° = 720°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g720` | 720° | **sim** | "Certo. São 6 − 2 = 4 triângulos internos: 4 · 180° = 720°." |
| `g540` | 540° | não | "540° é do pentágono (3·180°). No hexágono são 4 · 180° = 720°." |
| `g1080` | 1080° | não | "Você fez 6 · 180° sem descontar 2: (6 − 2) · 180° = 720°." |

#### M2 — `numero-diagonais-pentagono`
- **Enunciado:** "Quantas diagonais ao todo possui um pentágono (n = 5), formando a estrela interna?"
- **Conta de conferência:** d = 5 · (5 − 3) / 2 = 5 · 2 / 2 = 5 diagonais

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5` | 5 | **sim** | "Exato. Cada um dos 5 vértices lança 2 diagonais: (5 · 2) / 2 = 5 diagonais." |
| `d2` | 2 | não | "2 são as diagonais que saem de UM único vértice. Ao todo são (5 · 2) / 2 = 5." |
| `d10` | 10 | não | "Faltou dividir por 2 (pois A→C é a mesma de C→A): 10 / 2 = 5." |

#### M3 — `angulos-paralelogramo`
- **Enunciado:** "Em um paralelogramo, um dos ângulos internos mede 70°. Quanto medem o ângulo OPOSTO a ele e o ângulo VIZINHO a ele?"
- **Conta de conferência:** opostos são iguais (70°) e vizinhos são suplementares (180° − 70° = 110°)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a70110` | 70° e 110° | **sim** | "Isso. No paralelogramo, ângulos opostos são iguais (70°) e vizinhos somam 180° (110°)." |
| `a11070` | 110° e 70° | não | "Você inverteu: o oposto é igual (70°) e o vizinho completa 180° (110°)." |
| `a7020` | 70° e 20° | não | "Ângulos vizinhos entre paralelas somam 180° (não 90°): 70° e 110°." |

### Desafios

#### D1 — `descobrir-n-pela-soma`
- **Enunciado:** "A soma dos ângulos internos de um polígono convexo é 1080°. Quantos lados (n) tem esse polígono?"
- **Fala do Paco:** "Divida 1080° por 180° para descobrir quantos triângulos `(n − 2)` existem!"
- **Conta de conferência:** (n − 2) · 180° = 1080° ⇒ n − 2 = 6 ⇒ n = 8 (octógono)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `n8` | 8 | **sim** | "Exato. 1080° / 180° = 6 triângulos; como n − 2 = 6, o polígono tem n = 8 lados." |
| `n6` | 6 | não | "6 é o número de triângulos (n − 2). Somando 2, o polígono tem 8 lados." |
| `n10` | 10 | não | "Você somou 4 em vez de 2. Como n − 2 = 1080 / 180 = 6, temos n = 8." |

#### D2 — `soma-interna-igual-externa`
- **Enunciado:** "Em qual polígono convexo a soma dos ângulos internos é IGUAL à soma dos ângulos externos (360°)?"
- **Conta de conferência:** (n − 2) · 180° = 360° ⇒ n − 2 = 2 ⇒ n = 4 (quadrilátero)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `quad` | Quadrilátero (n = 4) | **sim** | "Certo! Em n = 4, (4 − 2)·180° = 360°, empatando com a soma externa de 360°." |
| `tri` | Triângulo (n = 3) | não | "No triângulo S_i = 180° e S_e = 360°. Empatam em 360° no quadrilátero (n = 4)." |
| `hex` | Hexágono (n = 6) | não | "No hexágono S_i = 720°. Quem tem S_i = 360° é o quadrilátero (n = 4)." |

#### D3 — `diagonais-hexagono`
- **Enunciado:** "Quantas diagonais possui um hexágono convexo (n = 6)?"
- **Conta de conferência:** d = 6 · (6 − 3) / 2 = 6 · 3 / 2 = 9 diagonais

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d9` | 9 | **sim** | "Exato. d = 6 · (6 − 3) / 2 = 18 / 2 = 9 diagonais." |
| `d3` | 3 | não | "3 diagonais saem de 1 único vértice. Ao todo são (6 · 3) / 2 = 9." |
| `d18` | 18 | não | "Faltou dividir por 2 para não contar cada diagonal duas vezes: 18 / 2 = 9." |

#### D4 — `area-losango-pelas-diagonais`
- **Enunciado:** "As diagonais de um losango medem 6 cm e 8 cm e se cortam ao meio a 90° (catetos 3 cm e 4 cm). Quanto mede o LADO do losango?"
- **Conta de conferência:** metades das diagonais = 3 cm e 4 cm a 90° ⇒ lado = hipotenusa = √(3² + 4²) = 5 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l5` | 5 cm | **sim** | "Isso! As semidiagonais 3 cm e 4 cm formam 90°, e o lado é a hipotenusa: 5 cm." |
| `l10` | 10 cm | não | "Você usou as diagonais inteiras (6 e 8). Como se cortam ao meio (3 e 4), o lado é 5 cm." |
| `l7` | 7 cm | não | "Não some 3 + 4; aplique Pitágoras nas semidiagonais: √(3² + 4²) = 5 cm." |

#### D5 — `base-media-trapezio`
- **Enunciado:** "Um trapézio tem base menor b = 6 cm e base maior B = 14 cm. Quanto mede sua base média (que une os meios dos lados inclinados)?"
- **Fala do Paco:** "No meio da altura, a largura é exatamente a média das duas bases!"
- **Conta de conferência:** B_m = (B + b) / 2 = (14 + 6) / 2 = 10 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `bm10` | 10 cm | **sim** | "Exato. A base média fica na metade do caminho entre 6 e 14: (6 + 14) / 2 = 10 cm." |
| `bm8` | 8 cm | não | "8 cm é a diferença 14 − 6. A base média é a média aritmética: (6 + 14) / 2 = 10 cm." |
| `bm20` | 20 cm | não | "20 cm é a soma das bases; dividindo por 2, a base média mede 10 cm." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular a soma dos ângulos internos ou número de lados de um polígono convexo.
- **Onde procurar:** ENEM, Fuvest, Unesp, UERJ.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** contar diagonais de um polígono ou diagonais que passam pelo centro.
- **Onde procurar:** ENEM, Unicamp, UFPR, UFRGS.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** usar propriedades de paralelogramos, losangos, retângulos e trapézios para achar ângulos ou lados.
- **Onde procurar:** ENEM, Fuvest, OBMEP.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** soma dos ângulos externos (`360°`) aplicada a trajetórias poligonais fechadas.
- **Onde procurar:** ENEM, Unicamp, OBMEP.
