# Plano — Simetrias, isometrias e homotetia

**Aula:** 1 — Mover sem Deformar vs Ampliar · Translação, reflexão, rotação e homotetia
**Caminho:** geometria / geometria-plana / transformacoes-isometrias-e-homotetia
**Pré-requisitos que o aluno já domina:** `poligonos-e-quadrilateros`, `unidades-conversoes-e-escalas`.

## a) Ancoragem mecânica
As transformações do plano dividem-se em duas máquinas: as **isometrias** (translação por um vetor, reflexão num espelho e rotação em torno de um ponto), que mudam a posição ou a orientação da figura mas **preservam todas as distâncias, ângulos e áreas** (`razão k = 1`); e a **homotetia** de centro `O` e razão `k`, que estica ou encolhe os raios que saem de `O`, multiplicando todos os comprimentos por `|k|`, o perímetro por `|k|` e a área por `k²` (invertendo a figura de cabeça para baixo quando `k < 0`).

## b) Visual de partida
WIDGET NOVO: `geometria_plana` (modo isometrias e homotetia) — bandeirinha/polígono assimétrico em forma de "F" sobre malha quadriculada (para enxergar quando a orientação espelha ou gira), com seletor das 3 isometrias (translação, reflexão em eixo, rotação) e modo homotetia com centro `O` e slider de razão `k` de `−2` a `3`.

## c) Caso neutro
A transformação identidade (`translação zero`, `rotação 0°` ou `homotetia de razão k = 1`): a imagem coincide exatamente com a figura original (mantida em fantasma no palco), com mesma posição, mesma orientação, mesmo perímetro e mesma área.

## d) Panorama e recorte
Estudamos simetria axial e de rotação, as três isometrias do plano (translação, reflexão, rotação) e a homotetia (ampliação `|k| > 1`, redução `0 < |k| < 1` e inversão `k < 0`), destacando o que permanece invariante em cada uma.

## e) Progressão por contraste
1. **Translação** (arrastar sem girar): todos os pontos andam o mesmo passo na mesma direção; posição muda, mas orientação, lados e área não mudam.
2. **Rotação** contra **Reflexão (espelho)**: girar mantém o sentido dos vértices (horário continua horário), enquanto refletir na reta espelha a mão esquerda na direita (inverte o sentido horário ↔ anti-horário!).
3. **Isometrias** (`k = 1`, congruência) contra **Homotetia** (`k = 2`, semelhança): na homotetia os ângulos continuam iguais, mas os lados dobram (`2x`) e a área quadruplica (`2² = 4x`).
4. Homotetia positiva (`k = 2`, mesmo lado do centro `O`) contra homotetia negativa (`k = −1` ou `k = −2`, raios cruzam o centro `O` como numa câmara escura e a imagem sai invertida!).

## f) Dedução causal da forma
Por que translação, reflexão e rotação se chamam *isometrias* (*iso* = mesma, *metria* = medida)? Porque nenhuma delas afasta um vértice do outro: a distância entre quaisquer dois pontos `A'` e `B'` da imagem continua idêntica à distância `AB` original, garantindo figuras congruentes. Já na homotetia de centro `O` e razão `k`, como `OA' = k · OA` e `OB' = k · OB` com o mesmo ângulo em `O`, o triângulo `OA'B'` é semelhante a `OAB` na razão `|k|`, logo o segmento `A'B'` também fica multiplicado por `|k|` e a área por `k²`.

## g) Simulação espacial e fronteiras
Levar a razão da homotetia a `k = 0` mostra a fronteira de colapso: toda a figura encolhe até o único ponto `O`. Em `k = −1`, a homotetia equivale exatamente a uma **rotação de 180°** (simetria central em relação a `O`), mantendo o tamanho mas invertendo o topo com a base.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Isometria | Transformação que preserva comprimentos, ângulos e áreas. |
| c2 | Eixo de reflexão | Reta-espelho que fica no meio a 90° entre cada ponto e sua imagem. |
| c3 | Centro de giro / homotetia | Ponto fixo ao redor do qual a figura gira ou se amplia. |
| c4 | Razão de homotetia (k) | Fator que multiplica lados por |k| e áreas por k². |

### Passo 1 — `translacao-e-rotacao`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (transformação como máquina), 2 (visual), 3 (caso neutro k = 1 / 0°), 4 (panorama)
- **Widget:** WIDGET NOVO: `geometria_plana` — letra "F" na malha (fantasma no caso neutro `0°`) que gira ao redor da origem (`c3`) com o slider até `90°` e `180°`, mantendo medidas e área cravadas (`c1`).
- **Sliders:** `angulo` · "Girar figura" · 0..180 · passo 90 · inicial 0 · c3
- **Paco (abertura):** "No caso neutro 0°, a imagem está sobre o F original. Gire até 90° e 180°: o tamanho dos lados ou a área do F mudam durante o giro?"
- **Interação do aluno:** gira a figura para `90°` (F deitado) e `180°` (F de cabeça para baixo) e confere que lados e área não mudam.
- **Conclusão:** `angulo ≥ 180`
- **Paco (conclusão):** "Não mudam nada! Translação, rotação e reflexão são isometrias: movem a figura, mas preservam todas as medidas."
- **Tati (dúvida):** `fim` — P: "Qual é a diferença entre girar o F e olhar o F no espelho?" / R: "No giro você consegue deslizar o F pelo papel até aquela posição; no espelho ele vira do avesso (os braços do F apontam para a esquerda!)."

### Passo 2 — `reflexao-no-espelho`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (rotação × reflexão), 6 (dedução da distância ao espelho)
- **Widget:** WIDGET NOVO: `geometria_plana` — figura "F" à esquerda de uma reta-espelho vertical (`c2`); slider ativa a reflexão mostrando que cada vértice e sua imagem ficam à mesma distância `d` do espelho, ligados por segmentos perpendiculares.
- **Sliders:** `refletir` · "Refletir no espelho" · 0..1 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Se um canto do F está a 3 quadradinhos à esquerda do espelho, onde aparece o reflexo dele do outro lado?"
- **Interação do aluno:** aciona a reflexão e vê cada ponto atravessar o espelho a `90°` para a mesma distância `3` na direita, invertendo o F.
- **Conclusão:** `refletir ≥ 1`
- **Paco (conclusão):** "A exatos 3 quadradinhos à direita, em linha perpendicular ao espelho! As medidas continuam iguais, mas o sentido inverte."

### Passo 3 — `homotetia-positiva-e-negativa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (isometria k = 1 × homotetia k = 2 e k = −1), 6 (dedução de k e k²), 7 (fronteira k < 0)
- **Widget:** WIDGET NOVO: `geometria_plana` — triângulo de base `2` e área `2` com raios saindo do centro `O` (`c3`); slider varia a razão `k` (`c4`) de `1` (caso neutro) para `2` (lados `2x`, área `4x = 8`) e para `−1` (invertido do outro lado de `O`).
- **Sliders:** `k` · "Razão de homotetia (k)" · -1..2 · passo 1 · inicial 1 · c4
- **Paco (abertura):** "Em k = 1 a imagem tem área 2. Leve k até 2 para dobrar a distância ao centro O, e depois teste k = −1: o que acontece?"
- **Interação do aluno:** leva `k` a `2` (vendo a área quadruplicar para `8`) e depois a `−1` (vendo os raios cruzarem `O` e inverterem a figura).
- **Conclusão:** `k ≤ -1`
- **Paco (conclusão):** "Em k = 2 os lados dobram e a área multiplica por 2² = 4; já em k = −1 os raios atravessam o centro O e a imagem fica de cabeça para baixo!"
- **Tati (dúvida):** `fim` — P: "Por que a foto numa câmara escura com furinho sai de cabeça para baixo?" / R: "Porque os raios de luz se cruzam no furinho (centro O), fazendo uma homotetia de razão k negativa!"

### Passo 4 — `desafio-homotetia-area`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — polígono original de perímetro `10 cm` e área `6 cm²` sofrendo homotetia de razão `k = 3` a partir do centro `O` (`c4`).
- **Paco (abertura):** "Cuidado: perímetro é comprimento (`× k`), mas área é superfície (`× k²`)!"
- **Enunciado:** "Uma figura de área 6 cm² sofre uma homotetia de razão k = 3. Qual é a área da figura ampliada?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a54` | 54 cm² | **sim** | "Exato. Na homotetia de razão k = 3, a área multiplica por k² = 3² = 9: 6 · 9 = 54 cm²." | preenche a figura ampliada com 9 blocos de 6 cm² |
| `a18` | 18 cm² | não | "Multiplicar por 3 vale para lados e perímetro. A área multiplica por 3² = 9: 6 · 9 = 54 cm²." | mostra que tanto a base (×3) quanto a altura (×3) triplicaram |
| `a24` | 24 cm² | não | "24 seria para k = 2 (×4). Para k = 3, multiplicamos por 3² = 9: 6 · 9 = 54 cm²." | destaca os raios 3 vezes maiores a partir de O |
| `a6` | 6 cm² | não | "6 cm² seria numa isometria (k = 1). Na homotetia k = 3, a área vai para 6 · 9 = 54 cm²." | compara o tamanho original (k = 1) com o triplo (k = 3) |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — painel comparando reflexão (`c2`), rotação (`c3`) e homotetia de razão `k` (`c4`).
- **Fórmula:** `Isometrias: L' = L, A' = A`→c1 · `e` · `Homotetia: L' = |k|·L, A' = k²·A`→c4
- **Definições:** "Isometrias (translação, reflexão, rotação): preservam distâncias, ângulos e áreas (figuras congruentes)." · "Reflexão na reta: cada ponto e sua imagem ficam à mesma distância do espelho e invertem o sentido." · "Homotetia de razão k: preserva ângulos, multiplica comprimentos por |k| e áreas por k²."
- **Paco (abertura):** "Isometrias mantêm as distâncias e a homotetia estica as 2 dimensões por k; por isso isometrias conservam a área e a homotetia usa k²."
- **Dica (hint):** "Toque em cada transformação para comparar congruência e ampliação."

**Frase de encerramento (outro):** "Você diferenciou translação, rotação e reflexão e viu como a homotetia escala lados por |k| e áreas por k²."

## i) Treino pós-aula

### Fáceis

#### F1 — `qual-preserva-area`
- **Enunciado:** "Um triângulo de área 12 cm² sofre uma rotação de 90° e depois uma reflexão numa reta. Qual é a área da figura final?"
- **Conta de conferência:** rotação e reflexão são isometrias ⇒ área permanece 12 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 cm² | **sim** | "Isso. Rotação e reflexão são isometrias: não alteram lados nem área (continua 12 cm²)." |
| `a24` | 24 cm² | não | "Isometrias não ampliam a figura; a área permanece 12 cm²." |
| `a6` | 6 cm² | não | "Girar ou espelhar mantém a figura congruente: a área continua 12 cm²." |

#### F2 — `eixos-simetria-quadrado`
- **Enunciado:** "Quantos eixos de simetria (linhas de dobra em que as duas metades coincidem) possui um quadrado?"
- **Conta de conferência:** 2 passando pelos meios dos lados opostos + 2 pelas diagonais = 4 eixos

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `e4` | 4 | **sim** | "Certo! São 2 eixos pelos meios dos lados (vertical e horizontal) mais as 2 diagonais: 4." |
| `e2` | 2 | não | "2 é num retângulo que não é quadrado. No quadrado as 2 diagonais também são eixos: 4." |
| `e8` | 8 | não | "São 2 pelos lados e 2 pelas diagonais: ao todo 4 eixos de simetria." |

#### F3 — `homotetia-perimetro`
- **Enunciado:** "Um quadrado de perímetro 20 cm sofre uma homotetia de razão k = 2. Qual é o perímetro do novo quadrado?"
- **Conta de conferência:** perímetro é medida linear ⇒ multiplica por k = 2 ⇒ 20 · 2 = 40 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p40` | 40 cm | **sim** | "Exato. O perímetro é soma de comprimentos, então multiplica por k = 2: 20 · 2 = 40 cm." |
| `p80` | 80 cm | não | "Multiplicar por 2² = 4 é para a ÁREA. O perímetro é linear e multiplica por 2: 40 cm." |
| `p20` | 20 cm | não | "Na homotetia k = 2 todos os lados dobram, então o perímetro dobra para 40 cm." |

#### F4 — `identificar-reflexao`
- **Enunciado:** "Quando uma palavra escrita num papel fica espelhada da direita para a esquerda, a transformação aplicada foi uma:"
- **Conta de conferência:** inversão de sentido lateral ⇒ reflexão axial

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `ref` | Reflexão | **sim** | "Isso. Só a reflexão (espelhamento) inverte a esquerda com a direita." |
| `trans` | Translação | não | "A translação apenas desliza a palavra sem espelhar as letras. Foi uma reflexão." |
| `rot` | Rotação de 180° | não | "Rotação de 180° deixa de cabeça para baixo, mas não espelha como um espelho vertical." |

### Médias

#### M1 — `reflexao-no-eixo-y`
- **Enunciado:** "No plano cartesiano, qual é a imagem do ponto P(3; 5) ao ser refletido em relação ao eixo vertical y (espelho em x = 0)?"
- **Conta de conferência:** a altura y = 5 mantém-se e a abscissa 3 passa para −3 ⇒ (−3; 5)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pm35` | (−3; 5) | **sim** | "Certo. Atravessando o espelho vertical (eixo y), x troca de 3 para −3 e y continua 5." |
| `p3m5` | (3; −5) | não | "(3; −5) é a reflexão no eixo horizontal x. No eixo y, quem troca de sinal é o x: (−3; 5)." |
| `pm3m5` | (−3; −5) | não | "(−3; −5) é a reflexão na origem (rotação de 180°). No eixo y fica (−3; 5)." |

#### M2 — `homotetia-reducao-area`
- **Enunciado:** "Um triângulo de área 32 cm² sofre uma homotetia de redução de razão k = 1/2. Qual é a área do triângulo reduzido?"
- **Conta de conferência:** A' = 32 · (1/2)² = 32 / 4 = 8 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 cm² | **sim** | "Exato. A área multiplica por k² = (1/2)² = 1/4: 32 / 4 = 8 cm²." |
| `a16` | 16 cm² | não | "1/2 é a redução dos lados. A área cai para (1/2)² = 1/4: 32 / 4 = 8 cm²." |
| `a4` | 4 cm² | não | "Multiplique por (1/2)² = 1/4: 32 / 4 = 8 cm²." |

#### M3 — `simetria-de-rotacao-triangulo`
- **Enunciado:** "Qual é o menor ângulo positivo de giro em torno do centro que faz um triângulo equilátero coincidir exatamente consigo mesmo?"
- **Conta de conferência:** 3 pontas iguais na volta de 360° ⇒ 360° / 3 = 120°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g120` | 120° | **sim** | "Isso. Como tem 3 vértices igualmente espaçados na volta, ele coincide a cada 360° / 3 = 120°." |
| `g60` | 60° | não | "60° é o ângulo interno; girando 60°, uma ponta fica onde não havia ponta. O giro central é 360°/3 = 120°." |
| `g180` | 180° | não | "Em 180° o triângulo fica de cabeça para baixo. Ele coincide em 360° / 3 = 120°." |

### Desafios

#### D1 — `duas-reflexoes-paralelas`
- **Enunciado:** "Refletir uma figura num espelho vertical e depois noutro espelho paralelo ao primeiro equivale a qual transformação única?"
- **Fala do Paco:** "O 1º espelho inverte o sentido e o 2º desinverte de volta!"
- **Conta de conferência:** duas reflexões em retas paralelas compõem uma translação (pelo dobro da distância entre os espelhos)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `trans` | Uma translação | **sim** | "Exato! A 2ª reflexão desfaz o espelhamento da 1ª e a figura apenas desliza (translação)." |
| `ref` | Uma única reflexão | não | "Espelhar duas vezes devolve a orientação original (não fica espelhada): equivale a uma translação." |
| `hom` | Uma homotetia de razão 2 | não | "Reflexões são isometrias e não mudam o tamanho: o efeito final é uma translação." |

#### D2 — `homotetia-negativa`
- **Enunciado:** "Uma figura sofre uma homotetia de centro O e razão k = −2. O que acontece com seus comprimentos e sua orientação?"
- **Conta de conferência:** comprimentos multiplicam por |−2| = 2 e o sinal negativo inverte a figura (rotação de 180° em relação a O)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2inv` | Lados dobram e a imagem fica invertida (180°) do outro lado de O | **sim** | "Certo! O módulo |−2| = 2 dobra as medidas, e o sinal negativo cruza o centro O invertendo a figura." |
| `d2mes` | Lados dobram no mesmo sentido e mesmo lado | não | "O sinal negativo faz os raios atravessarem o centro O, invertendo a imagem em 180°." |
| `red` | Lados caem à metade | não | "Redução à metade seria k = 1/2 (ou −1/2). Para k = −2, os lados dobram e a figura inverte." |

#### D3 — `achar-k-pelas-areas`
- **Enunciado:** "Após uma homotetia positiva, a área de um polígono passou de 5 cm² para 45 cm². Por qual fator k o PERÍMETRO foi multiplicado?"
- **Conta de conferência:** k² = 45 / 5 = 9 ⇒ k = √9 = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `k3` | 3 | **sim** | "Exato. A área multiplicou por 45 / 5 = 9 = k², logo a razão linear do perímetro é k = √9 = 3." |
| `k9` | 9 | não | "9 é a razão das áreas (k²). O perímetro cresce com a razão linear k = √9 = 3." |
| `k45` | 4,5 | não | "Como k² = 45 / 5 = 9, tiramos a raiz quadrada: k = 3." |

#### D4 — `rotacao-90-anti-horario`
- **Enunciado:** "O ponto A(4; 0), sobre o eixo x positivo, gira 90° no sentido anti-horário em torno da origem (0; 0). Para qual posição ele vai?"
- **Conta de conferência:** girar 4 unidades do eixo x positivo em 90° anti-horário leva ao eixo y positivo ⇒ (0; 4)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p04` | (0; 4) | **sim** | "Isso. Girando 90° anti-horário a partir do eixo x positivo, o ponto de raio 4 para no eixo y positivo: (0; 4)." |
| `pm40` | (−4; 0) | não | "(−4; 0) é um giro de 180°. Em 90° anti-horário, ele para no eixo y em (0; 4)." |
| `p0m4` | (0; −4) | não | "(0; −4) é no sentido horário. No anti-horário vai para o topo: (0; 4)." |

#### D5 — `eixos-retangulo-nao-quadrado`
- **Enunciado:** "Por que a diagonal de um retângulo `6 cm × 2 cm` (que não é quadrado) NÃO é um eixo de simetria de reflexão?"
- **Fala do Paco:** "Tente dobrar uma folha A4 pela diagonal: as pontas batem ou ficam tortas?"
- **Conta de conferência:** dobrar pela diagonal leva o lado maior (6) sobre uma direção diferente do lado menor (2), não coincidindo

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `nconj` | Porque os lados vizinhos (6 e 2) são diferentes e as pontas não coincidem ao dobrar | **sim** | "Exato! Só quando os 4 lados são iguais (losango/quadrado) a dobra pela diagonal casa os cantos." |
| `area` | Porque a diagonal não divide a área ao meio | não | "Ela divide a área em dois triângulos iguais, mas ao dobrar (refletir) as pontas ficam desencontradas!" |
| `ang` | Porque os ângulos não são de 90° | não | "Os ângulos são de 90°, mas como 6 ≠ 2, o reflexo da quina não cai sobre a outra quina." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** identificar a figura resultante de uma sequência de reflexões, rotações e translações (logotipos, ladrilhos, faixas decorativas).
- **Onde procurar:** ENEM (questões recorrentes de isometrias em artesanato, azulejos e cartões).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** contar eixos de simetria e ângulos de simetria rotacional de figuras planas.
- **Onde procurar:** ENEM, OBMEP, Unesp, Unicamp.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar homotetia / escala para relacionar comprimentos (`k`) e áreas (`k²`).
- **Onde procurar:** ENEM, Fuvest, UFRGS.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** coordenadas de vértices após reflexão ou rotação no plano cartesiano.
- **Onde procurar:** ENEM, UFPR, UERJ.
