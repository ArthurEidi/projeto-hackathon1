# Plano — Perímetro e área de figuras planas

**Aula:** 1 — Contorno e Preenchimento · Perímetro, área por corte e escala k²
**Caminho:** geometria / geometria-plana / perimetro-e-area-de-figuras-planas
**Pré-requisitos que o aluno já domina:** polígonos e quadriláteros, unidades, conversões e escalas.

## a) Ancoragem mecânica
A máquina recebe a base b, a altura h e a forma do polígono sobre a malha quadriculada, e devolve a soma do contorno (perímetro P) e a contagem de quadradinhos internos (área A). Recortar e encaixar pedaços muda o contorno, mas preserva a área; aplicar uma escala k multiplica o perímetro por k e a área por k².

## b) Visual de partida
WIDGET NOVO `geometria_plana` em modo malha quadriculada: retângulo, paralelogramo, triângulo e trapézio com base b (c1) e altura h (c2) ajustáveis, linha de corte e encaixe animada, contorno em c4 (perímetro) e preenchimento em c3 (área).

## c) Caso neutro
Um quadrado unitário de lado 1 tem área 1 quadradinho e perímetro 4 lados. Ele é a unidade de medida: medir qualquer área é contar quantos desses quadradinhos cabem dentro da figura.

## d) Panorama e recorte
Existem áreas de círculos, polígonos regulares, figuras compostas e superfícies espaciais. Aqui: contraste entre perímetro e área, dedução das áreas de retângulo, paralelogramo, triângulo e trapézio por corte, e o efeito da escala k².

## e) Progressão por contraste
1. Quadrado unitário 1×1 e retângulo b×h: b colunas de h quadradinhos dão A = b·h (referência).
2. Paralelogramo de mesma base b e altura h: o triângulo que sobra de um lado encaixa no outro e reconstrói o retângulo b·h.
3. Triângulo e trapézio: dois triângulos iguais formam um paralelogramo (A = b·h / 2) e o trapézio equivale a (B + b)·h / 2.
4. Escala k nos lados: quando os lados dobram (k = 2), o perímetro dobra, mas cabem k² = 4 figuras originais dentro.

## f) Dedução causal da forma
No retângulo cabem b fileiras de h quadrados unitários, logo A = b·h. Cortando o bico do paralelogramo perpendicularmente à base e transladando para o outro lado, obtemos o mesmo retângulo b·h sem perder nem ganhar área. Dois triângulos idênticos encaixados formam um paralelogramo de área b·h, por isso cada triângulo tem metade: A = b·h / 2; de modo análogo, dois trapézios formam um paralelogramo de base (B + b), dando A = (B + b)·h / 2.

## g) Simulação espacial e fronteiras
Inclinar o paralelogramo mantendo b e h fixos estica os lados inclinados: o perímetro cresce sem limite, mas a área continua b·h. Se h = 0, a figura colapsa num segmento de área zero, embora o perímetro ainda seja 2b.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Base (b, B) | Lado de apoio sobre a malha onde contamos as colunas (b ou B). |
| c2 | Altura (h) | Distância perpendicular entre a base e o topo, em linhas da malha. |
| c3 | Área (A) | Quantidade de quadradinhos unitários que preenchem o interior. |
| c4 | Perímetro (P) | Comprimento total do contorno, somando todos os lados. |

### Passo 1 — `retangulo-malha`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `geometria_plana` (modo malha) — quadrado unitário 1×1 como fantasma; retângulo com base `b` (c1), altura `h` (c2), preenchimento `A` (c3) e contorno `P` (c4). Emite `b` e `h`.
- **Sliders:** `b` · "Base b" · 1..6 · passo 1 · inicial 1 · c1; `h` · "Altura h" · 1..5 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "O quadradinho 1 por 1 é nossa unidade. Leve b até 4 e h até 3: quantos quadradinhos preenchem o retângulo e quanto mede o contorno?"
- **Interação do aluno:** move os sliders b e h; a malha destaca as 4 colunas de 3 quadradinhos e soma os 4 lados no contorno.
- **Conclusão:** `b ≥ 4`
- **Paco (conclusão):** "São 4 colunas de 3: área 4·3 = 12 quadradinhos, enquanto o perímetro soma o contorno: 4 + 3 + 4 + 3 = 14."
- **Tati (dúvida):** `fim` — P: "Toda figura plana se mede contando quadradinhos inteiros assim?" / R: "Em círculos usamos π e no espaço medimos volumes. Hoje recortamos polígonos para transformá-los em retângulos."

### Passo 2 — `paralelogramo-corte`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7 (fronteira: perímetro muda, área fixa)
- **Widget:** `geometria_plana` — retângulo 4×3 como fantasma; paralelogramo de base b = 4 (c1) e altura h = 3 (c2) com inclinação e chave "cortar e encaixar". Emite `encaixado`.
- **Sliders:** `inc` · "Inclinação" · 0..4 · passo 1 · inicial 2 · c4
- **Paco (abertura):** "Incline o paralelogramo e acione o corte: o contorno estica, mas a área muda quando encaixamos o triângulo na outra ponta?"
- **Interação do aluno:** varia a inclinação, aciona o corte e vê o triângulo da ponta esquerda deslizar e fechar o retângulo 4×3.
- **Conclusão:** `encaixado ≥ 1`
- **Paco (conclusão):** "O que sai de um lado entra no outro: a área continua 4·3 = 12, mesmo com o perímetro aumentando na inclinação."

### Passo 3 — `triangulo-e-trapezio`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` — triângulo de base b = 4 (c1) e altura h = 3 (c2); slider gira uma cópia idêntica em 180° até formar um paralelogramo; aba alterna para trapézio (B + b)·h / 2. Emite `duplicado`.
- **Sliders:** `duplicado` · "Girar cópia" · 0..1 · passo 1 · inicial 0 · c3
- **Paco (abertura):** "Encaixe uma cópia girada do triângulo ao lado dele. Que figura os dois formam juntos, e qual fração sobra para um só?"
- **Interação do aluno:** move o slider até 1 e vê os dois triângulos formarem um paralelogramo de base 4 e altura 3.
- **Conclusão:** `duplicado ≥ 1`
- **Paco (conclusão):** "Juntos formam um paralelogramo de área b·h = 12; logo um triângulo sozinho tem metade: A = b·h / 2 = 6."
- **Tati (dúvida):** `fim` — P: "E no trapézio, funciona igual?" / R: "Sim: dois trapézios iguais encaixados formam um paralelogramo de base B + b, então um só tem área (B + b)·h / 2."

### Passo 4 — `escala-k2`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 7
- **Widget:** `geometria_plana` — retângulo original 2×3 como fantasma (A = 6, P = 10); retângulo ampliado por fator `k`, mostrando `k²` cópias do original cabendo dentro. Emite `k`.
- **Sliders:** `k` · "Escala k" · 1..3 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Se dobrarmos a base e a altura (k = 2), o perímetro dobra. A área também só dobra ou cresce mais?"
- **Interação do aluno:** aumenta k para 2 e 3; o widget encaixa 4 e depois 9 retângulos originais dentro da figura ampliada.
- **Conclusão:** `k ≥ 2`
- **Paco (conclusão):** "Como base e altura são multiplicadas por k, a área multiplica por k·k = k². Dobrar os lados quadruplica a área: de 6 vai para 24."

### Passo 5 — `desafio-trapezio`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `geometria_plana_figura` — trapézio na malha com base maior B = 6 (c1), base menor b = 4 (c1) e altura h = 3 (c2).
- **Paco (abertura):** "Some as duas bases antes de multiplicar pela altura e dividir por 2."
- **Enunciado:** "Qual é a área de um trapézio com base maior 6, base menor 4 e altura 3?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a15` | 15 | **sim** | "Isso. (6 + 4)·3 / 2 = 30 / 2 = 15." | trapézio duplicado formando paralelogramo de base 10 e área 30 dividido ao meio |
| `a30` | 30 | não | "30 é a área de dois trapézios juntos. Divida por 2: (6 + 4)·3 / 2 = 15." | dois trapézios formando paralelogramo de área 30 com alerta de dividir por 2 |
| `a18` | 18 | não | "18 usa só a base maior (6·3). Some as bases e divida por 2: (6 + 4)·3 / 2 = 15." | retângulo 6×3 destacado mostrando as sobras fora do trapézio |
| `a13` | 13 | não | "13 soma 6 + 4 + 3. A área é (6 + 4)·3 / 2 = 15." | malha destacando as 15 unidades quadradas equivalentes |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — retângulo b·h, triângulo b·h / 2 e trapézio (B + b)·h / 2 lado a lado na malha.
- **Fórmula:** `A`→c3 · `=` · `b`→c1 · `·` · `h`→c2 · `/` · `2`
- **Definições:** "Perímetro (P): soma dos lados do contorno." · "Área (A): superfície interna; b·h no paralelogramo e (B + b)·h / 2 no trapézio." · "Escala k nos lados multiplica o perímetro por k e a área por k²."
- **Paco (abertura):** "Todo triângulo é metade de um paralelogramo de mesma base e altura, por isso sua área é sempre b·h / 2."
- **Dica (hint):** "Toque em cada letra para destacar a base, a altura e a área na malha."

**Frase de encerramento (outro):** "Você diferenciou contorno de preenchimento, deduziu áreas por corte e viu que a escala k gera k² na área."

## i) Treino pós-aula

### Fáceis

#### F1 — `retangulo-area`
- **Enunciado:** "Um retângulo tem base 5 cm e altura 4 cm. Qual é a sua área?"
- **Conta de conferência:** 5·4 = 20 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20 cm² | **sim** | "Certo. 5 colunas de 4 quadradinhos: 5·4 = 20 cm²." |
| `a18` | 18 cm² | não | "18 cm é o perímetro (5 + 4 + 5 + 4). A área é 5·4 = 20 cm²." |
| `a9` | 9 cm² | não | "9 soma base e altura. A área multiplica: 5·4 = 20 cm²." |
| `a10` | 10 cm² | não | "10 seria a área do triângulo (5·4 / 2). No retângulo é 5·4 = 20 cm²." |

#### F2 — `retangulo-perimetro`
- **Enunciado:** "Nesse mesmo retângulo de 5 cm por 4 cm, qual é o perímetro?"
- **Conta de conferência:** 2·(5 + 4) = 18 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a18` | 18 cm | **sim** | "Isso. Somando os 4 lados: 5 + 4 + 5 + 4 = 18 cm." |
| `a20` | 20 cm | não | "20 cm² é a área (5·4). O perímetro soma os 4 lados: 18 cm." |
| `a9` | 9 cm | não | "9 cm soma só dois lados. O contorno inteiro tem 2·(5 + 4) = 18 cm." |
| `a14` | 14 cm | não | "14 soma 5 + 5 + 4. Faltou o outro lado de 4 cm: total 18 cm." |

#### F3 — `triangulo-simples`
- **Enunciado:** "Qual é a área de um triângulo de base 6 m e altura 4 m?"
- **Conta de conferência:** 6·4 / 2 = 12 m²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 m² | **sim** | "Exato. Metade do paralelogramo: 6·4 / 2 = 12 m²." |
| `a24` | 24 m² | não | "24 m² é a área do retângulo 6·4. No triângulo divide-se por 2: 12 m²." |
| `a10` | 10 m² | não | "10 é 6 + 4. A área do triângulo é 6·4 / 2 = 12 m²." |
| `a5` | 5 m² | não | "Você somou e dividiu por 2. Multiplique primeiro: 6·4 / 2 = 12 m²." |

#### F4 — `paralelogramo-area`
- **Enunciado:** "Um paralelogramo tem base 7 cm, lado inclinado 5 cm e altura 3 cm. Qual é a área?"
- **Conta de conferência:** 7·3 = 21 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a21` | 21 cm² | **sim** | "Certo. Usa-se a altura perpendicular, não o lado inclinado: 7·3 = 21 cm²." |
| `a35` | 35 cm² | não | "35 multiplica pelo lado inclinado 5. Use a altura 3: 7·3 = 21 cm²." |
| `a24` | 24 cm² | não | "24 cm é o perímetro (7 + 5 + 7 + 5). A área é base vezes altura: 7·3 = 21 cm²." |
| `a105` | 10,5 cm² | não | "Não se divide por 2 no paralelogramo. A área é 7·3 = 21 cm²." |

### Médias

#### M1 — `trapezio-direto`
- **Enunciado:** "Um trapézio tem bases de 8 cm e 4 cm e altura de 5 cm. Qual é a sua área?"
- **Conta de conferência:** (8 + 4)·5 / 2 = 30 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a30` | 30 cm² | **sim** | "Isso. (8 + 4)·5 / 2 = 12·5 / 2 = 30 cm²." |
| `a60` | 60 cm² | não | "Faltou dividir por 2: (8 + 4)·5 / 2 = 30 cm²." |
| `a40` | 40 cm² | não | "40 usa só a base maior (8·5). Com as duas bases: (8 + 4)·5 / 2 = 30 cm²." |
| `a20` | 20 cm² | não | "20 usa só a base menor (4·5). O certo é (8 + 4)·5 / 2 = 30 cm²." |

#### M2 — `escala-triplicar`
- **Enunciado:** "Um jardim tem 10 m² de área. Se triplicarmos todos os seus lados (k = 3), qual será a nova área?"
- **Conta de conferência:** 10·3² = 90 m²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a90` | 90 m² | **sim** | "Certo. Escala 3 nos lados multiplica a área por 3² = 9: 10·9 = 90 m²." |
| `a30` | 30 m² | não | "O perímetro triplica, mas a área multiplica por 3² = 9: 10·9 = 90 m²." |
| `a60` | 60 m² | não | "O fator da área é k² = 3² = 9, não 6. Nova área: 10·9 = 90 m²." |
| `a19` | 19 m² | não | "Não se soma 9; multiplica-se por 3² = 9: 10·9 = 90 m²." |

#### M3 — `achar-altura`
- **Enunciado:** "Um triângulo tem área 18 cm² e base 9 cm. Quanto mede a sua altura?"
- **Conta de conferência:** 9·h / 2 = 18 ⇒ 9·h = 36 ⇒ h = 4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 cm | **sim** | "Exato. 9·h / 2 = 18 dá 9·h = 36, então h = 4 cm." |
| `a2` | 2 cm | não | "Com h = 2 a área seria 9·2 / 2 = 9. Como há divisão por 2, h = 36 / 9 = 4 cm." |
| `a9` | 9 cm | não | "9 é a metade de 18. Resolva 9·h / 2 = 18: h = 4 cm." |
| `a1` | 1 cm | não | "Substituindo na fórmula: 9·h = 36, logo h = 4 cm." |

### Desafios

#### D1 — `mesmo-perimetro-maior-area`
- **Enunciado:** "Dois terrenos retangulares têm perímetro 20 m: um mede 5 m por 5 m e o outro 8 m por 2 m. Qual tem maior área?"
- **Conta de conferência:** 5·5 = 25 m² e 8·2 = 16 m²; diferença 9 m²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `q55` | O de 5×5 (25 m²) | **sim** | "Isso. 5·5 = 25 m² contra 8·2 = 16 m²: mesmo perímetro não significa mesma área." |
| `q82` | O de 8×2 (16 m²) | não | "8·2 = 16 m², menor que 5·5 = 25 m². O quadrado 5×5 tem a maior área." |
| `iguais` | Têm áreas iguais | não | "Perímetros iguais podem ter áreas diferentes: 5·5 = 25 m² é maior que 8·2 = 16 m²." |
| `q20` | Ambos têm 20 m² | não | "20 m é o perímetro. As áreas são 25 m² (maior) e 16 m²." |

#### D2 — `figura-em-l`
- **Enunciado:** "De um retângulo de 6 cm por 5 cm foi recortado um canto de 2 cm por 2 cm. Qual é a área restante?"
- **Conta de conferência:** 6·5 − 2·2 = 30 − 4 = 26 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a26` | 26 cm² | **sim** | "Certo. Área total 6·5 = 30 menos o canto 2·2 = 4 dá 26 cm²." |
| `a30` | 30 cm² | não | "30 cm² é o retângulo inteiro. Subtraindo o canto 2·2 = 4, sobram 26 cm²." |
| `a28` | 28 cm² | não | "O canto tem área 2·2 = 4, não 2. Logo 30 − 4 = 26 cm²." |
| `a12` | 12 cm² | não | "Não subtraia os lados (4·3). Subtraia as áreas: 30 − 4 = 26 cm²." |

#### D3 — `triangulo-decimal`
- **Enunciado:** "Um triângulo tem base 5 cm e altura 2,5 cm. Qual é a sua área?"
- **Conta de conferência:** 5·2,5 / 2 = 12,5 / 2 = 6,25 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a625` | 6,25 cm² | **sim** | "Exato. 5·2,5 = 12,5, e metade de 12,5 é 6,25 cm²." |
| `a125` | 12,5 cm² | não | "12,5 é 5·2,5 (paralelogramo). Dividindo por 2: 6,25 cm²." |
| `a75` | 7,5 cm² | não | "7,5 é a soma 5 + 2,5. Multiplique e divida por 2: 5·2,5 / 2 = 6,25 cm²." |
| `a375` | 3,75 cm² | não | "3,75 é (5 + 2,5) / 2. O produto dividido por 2 dá 6,25 cm²." |

#### D4 — `fronteira-cavalieri-plano`
- **Enunciado:** "Três triângulos têm a mesma base de 4 cm sobre uma reta e o topo numa paralela a 3 cm de distância. O que vale para suas áreas?"
- **Fala do Paco:** "Lembre-se do que acontece quando inclinamos a figura sem mudar a base nem a altura."
- **Conta de conferência:** A = 4·3 / 2 = 6 cm² para todos

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `iguais` | Todas valem 6 cm² | **sim** | "Isso. Mesma base 4 e mesma altura 3 garantem área 4·3 / 2 = 6 cm² em todos." |
| `inclinado` | O mais inclinado é maior | não | "Inclinar aumenta o perímetro, mas base e altura não mudam: todas valem 6 cm²." |
| `reto` | O retângulo é maior | não | "Todos têm b = 4 e h = 3, logo todos têm área 4·3 / 2 = 6 cm²." |
| `a12` | Todas valem 12 cm² | não | "Faltou dividir por 2: todas têm área 4·3 / 2 = 6 cm²." |

#### D5 — `escala-reversa`
- **Enunciado:** "Uma foto retangular foi ampliada e sua área passou de 12 cm² para 108 cm². Por qual fator k o perímetro foi multiplicado?"
- **Fala do Paco:** "Última. Descubra primeiro por quanto a área foi multiplicada para achar k²."
- **Conta de conferência:** k² = 108 / 12 = 9 ⇒ k = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Exato. A área multiplicou por 108 / 12 = 9 = k², então os lados e o perímetro multiplicaram por k = 3." |
| `a9` | 9 | não | "9 é o fator da área (k²). O perímetro acompanha os lados: k = √9 = 3." |
| `a45` | 4,5 | não | "Não divida 9 por 2; tire a raiz quadrada: k² = 9 dá k = 3." |
| `a6` | 6 | não | "108 / 12 = 9, e √9 = 3. O perímetro foi multiplicado por 3." |

### Vestibular

#### V1 — `enem-2023-calcada`
- **Enunciado (resumido):** Uma piscina quadrada tem área de 400 m² e receberá ao redor uma calçada de 5 m de largura. Qual é a área da calçada?
- **Fala do Paco:** "Ache o lado da piscina, some 5 m de cada lado (10 m ao todo) para o quadrado externo e subtraia as áreas."
- **Fonte:** ENEM 2023, Questão 155 — `https://api.enem.dev/v1/exams/2023/questions/155`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`500`) mantidos.
- **Conta de conferência:** `L = √400 = 20 m`; `(20 + 2·5)² − 400 = 900 − 400 = 500 m²`.
- **Opções e feedback:** `1.000`, `900`, `600`, `500` (correta), `400`.

#### V2 — `enem-2013-placas`
- **Enunciado (resumido):** Uma caixa com N placas quadradas de lado y cobre área S. Se o lado das placas triplicar, quantas placas cobrem a mesma área S?
- **Fala do Paco:** "Se o lado multiplica por 3, por quanto multiplica a área de cada placa?"
- **Fonte:** ENEM 2013, Questão 156 — `https://api.enem.dev/v1/exams/2013/questions/156`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`N/9`) mantidos.
- **Conta de conferência:** `S = N·y² = X·(3y)² = 9X·y² ⇒ X = N/9`.
- **Opções e feedback:** `N/9` (correta), `N/6`, `N/3`, `3N`, `9N`.

#### V3 — `enem-2013-argila`
- **Enunciado (resumido):** Uma base retangular de 30 cm por 15 cm teve seus lados reduzidos em 20% após o cozimento. Em quantos por cento a área reduziu?
- **Fala do Paco:** "Multiplique os dois fatores de redução (0,8 × 0,8) para achar quanto da área original restou."
- **Fonte:** ENEM 2013, Questão 167 — `https://api.enem.dev/v1/exams/2013/questions/167`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`36%`) mantidos.
- **Conta de conferência:** `24 · 12 = 288` de `450` (`0,8 · 0,8 = 0,64 ⇒ 1 − 0,64 = 36%`).
- **Opções e feedback:** `4%`, `20%`, `36%` (correta), `64%`, `96%`.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** efeito da escala k sobre a área (fator k²) em mapas e maquetes.
- **Onde procurar:** ENEM (questões de escala e área).
