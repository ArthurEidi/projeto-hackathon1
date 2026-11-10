# Plano — Triângulos notáveis e construções geométricas

**Aula:** 1 — Metade do Quadrado e Metade do Equilátero · 45°-45°-90°, 30°-60°-90° e lugares geométricos
**Caminho:** geometria / geometria-plana / triangulos-notaveis-e-construcoes
**Pré-requisitos que o aluno já domina:** `teorema-de-pitagoras`, `semelhanca-e-teorema-de-tales`.

## a) Ancoragem mecânica
Os dois triângulos retângulos mais importantes da geometria não têm fórmulas soltas — eles nascem de partir duas figuras perfeitamente simétricas ao meio: cortar um **quadrado de lado `L`** pela diagonal produz o triângulo **`45°-45°-90°`** de catetos `L, L` e hipotenusa `d = L√2`; cortar um **triângulo equilátero de lado `L`** pela altura produz o triângulo **`30°-60°-90°`** de hipotenusa `L`, cateto menor `L/2` e altura `h = L√3 / 2`. Nas construções geométricas, a **mediatriz** coleta os pontos equidistantes de dois pontos e a **bissetriz** coleta os equidistantes de dois lados.

## b) Visual de partida
WIDGET NOVO: `geometria_plana` (modo triângulos notáveis e construções) — quadrado de lado `L` que se divide pela diagonal (`45°-45°-90°`) e triângulo equilátero de lado `L` que se divide pela altura (`30°-60°-90°`), com slider de escala `L` (`1` a `10`) e modo compasso/lugar geométrico mostrando a mediatriz de `AB` e a bissetriz de um ângulo.

## c) Caso neutro
Quadrado unitário de lado `L = 1` cortado pela diagonal: os dois catetos medem `1` e `1` (caso simétrico `45°-45°-90°`), e Pitágoras entrega imediatamente a diagonal padrão `d = √(1² + 1²) = √2`. Multiplicar o lado por qualquer `L` apenas multiplica o molde por `L` (`L, L, L√2`).

## d) Panorama e recorte
Estudamos o triângulo retângulo isósceles (`45°-45°-90°` e diagonal do quadrado `L√2`), o meio-equilátero (`30°-60°-90°`, altura `L√3/2` e área `L²√3/4`), ternas pitagóricas inteiras (`3-4-5`, `5-12-13`) e os dois lugares geométricos fundamentais de construção (mediatriz e bissetriz).

## e) Progressão por contraste
1. Metade do quadrado (`45°-45°-90°`): dois ângulos agudos iguais (`45°`) → dois catetos iguais (`L` e `L`) e hipotenusa `L√2`.
2. Metade do triângulo equilátero (`30°-60°-90°`): ângulos agudos diferentes (`30°` e `60°`) → oposto ao `30°` vale **metade da hipotenusa** (`L/2`) e oposto ao `60°` vale `L√3 / 2`.
3. Triângulos com raízes (`1-1-√2` e `1-√3-2`) contra **ternas pitagóricas inteiras** (`3-4-5` e seus múltiplos `6-8-10`, além de `5-12-13`).
4. **Mediatriz** (equidistante de 2 **pontos** `A` e `B`) contra **Bissetriz** (equidistante de 2 **retas/lados** de um ângulo).

## f) Dedução causal da forma
Por que no triângulo `30°-60°-90°` o cateto oposto a `30°` é exatamente metade da hipotenusa (`L/2`)? Porque ao espelhar esse triângulo pelo cateto maior, os dois ângulos de `30°` somam `60°` e fecham um triângulo equilátero de três lados iguais a `L`; logo a base dividida ao meio mede `L/2`! Aplicando Pitágoras em `h² + (L/2)² = L²`, sai `h² = L² − L²/4 = 3L²/4 ⇒ h = L√3 / 2`, e a área do equilátero é `(base · altura)/2 = (L · L√3/2)/2 = L²√3 / 4`.

## g) Simulação espacial e fronteiras
No triângulo `30°-60°-90°`, o maior lado é sempre a hipotenusa `L` (oposta a `90°`), o lado médio é `L√3/2 ≈ 0,86·L` (oposto a `60°`) e o menor é `L/2 = 0,5·L` (oposto a `30°`) — nunca troque quem recebe o `√3/2` e quem recebe o `1/2`! Nas construções com dois círculos de mesmo raio centrados em `A` e `B`, eles só se cruzam para formar a mediatriz se o raio for maior que metade da distância `AB` (`r > AB/2`).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Diagonal do quadrado (L√2) | Hipotenusa do triângulo 45°-45°-90° de catetos L e L. |
| c2 | Cateto de 30° (L/2) | Lado oposto ao ângulo de 30°: vale metade da hipotenusa L. |
| c3 | Altura do equilátero (L√3/2) | Lado oposto ao ângulo de 60° no triângulo 30°-60°-90°. |
| c4 | Mediatriz / Bissetriz | Reta equidistante de 2 pontos (mediatriz) ou de 2 lados (bissetriz). |

### Passo 1 — `metade-do-quadrado`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (lado L como entrada), 2 (visual), 3 (caso neutro L = 1), 4 (panorama)
- **Widget:** WIDGET NOVO: `geometria_plana` — quadrado cortado pela diagonal num triângulo `45°-45°-90°`, começando no caso neutro `L = 1` (`d = √2` em `c1` fantasma) e escalando `L` até `5` (`d = 5√2`).
- **Sliders:** `L` · "Lado do quadrado (L)" · 1..5 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "No quadrado de lado 1, Pitágoras dá a diagonal √(1² + 1²) = √2. Aumente o lado L até 5: quanto passa a medir a diagonal?"
- **Interação do aluno:** move `L` de 1 a 5 e vê os catetos iguais `L` acompanhados sempre pela hipotenusa `L√2` (`5√2`).
- **Conclusão:** `L ≥ 5`
- **Paco (conclusão):** "Mede 5√2! Todo triângulo 45°-45°-90° é metade de um quadrado de lado L, por isso sua hipotenusa vale sempre L√2."
- **Tati (dúvida):** `fim` — P: "E quando os ângulos são 30° e 60° em vez de 45°?" / R: "Aí ele não vem do quadrado: vem da metade de um triângulo equilátero! Vamos abrir um agora."

### Passo 2 — `metade-do-equilatero`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (45°-45° × 30°-60°), 6 (dedução de L/2 e L√3/2)
- **Widget:** WIDGET NOVO: `geometria_plana` — triângulo equilátero de lado `L = 6` que é cortado ao meio pela altura vertical `h` (`c3`), destacando o triângulo `30°-60°-90°` de hipotenusa `6`, base `L/2 = 3` (`c2`) e altura `3√3` (`c3`).
- **Sliders:** `cortar_eq` · "Cortar equilátero ao meio" · 0..1 · passo 1 · inicial 0 · c3
- **Paco (abertura):** "Cortando o equilátero de lado 6 ao meio, o topo vira 30°. Quanto medem a metade da base lá embaixo e a altura?"
- **Interação do aluno:** aciona o corte e vê a base dividir-se em `3` e `3` (`L/2`, oposto a `30°`) e Pitágoras calcular `h = √(6² − 3²) = 3√3` (`L√3/2`, oposto a `60°`).
- **Conclusão:** `cortar_eq ≥ 1`
- **Paco (conclusão):** "Oposto a 30° mede metade da hipotenusa (L/2 = 3), e oposto a 60° (a altura do equilátero) mede L√3/2 = 3√3!"

### Passo 3 — `mediatriz-e-bissetriz`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (2 pontos × 2 retas), 7 (fronteira r > AB/2)
- **Widget:** WIDGET NOVO: `geometria_plana` — dois pontos `A` e `B` distantes `6` unidades; dois círculos de compasso de mesmo raio `r` centrados em `A` e `B` crescem com o slider até se cruzarem, traçando a **mediatriz** (`c4`) perpendicular pelo ponto médio.
- **Sliders:** `raio_compasso` · "Abrir compasso (r)" · 2..5 · passo 1 · inicial 2 · c4
- **Paco (abertura):** "Com raio r = 2 (menor que metade de AB = 6), os círculos nem se tocam. Aumente r até 5: que reta passa pelos cruzamentos?"
- **Interação do aluno:** abre o compasso até `r = 5` e vê os dois círculos se cruzarem em cima e embaixo, determinando a mediatriz de `AB`.
- **Conclusão:** `raio_compasso ≥ 5`
- **Paco (conclusão):** "Nasce a mediatriz! Como os raios a partir de A e B são iguais, todo ponto dessa reta está à mesma distância de A e de B."
- **Tati (dúvida):** `fim` — P: "E se eu quiser ficar à mesma distância de duas RETAS que formam uma esquina?" / R: "Aí você traça a bissetriz, que divide o ângulo da esquina exatamente ao meio!"

### Passo 4 — `desafio-triangulo-30-60`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — triângulo retângulo `30°-60°-90°` com hipotenusa `L = 10 cm` e os ângulos de `30°` e `60°` marcados.
- **Paco (abertura):** "Lembre que esse triângulo é metade de um equilátero de lado 10 cm!"
- **Enunciado:** "Em um triângulo retângulo de ângulos 30° e 60° e hipotenusa 10 cm, quanto medem o cateto oposto a 30° e o oposto a 60°?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `c55r3` | 5 cm e 5√3 cm | **sim** | "Exato. Oposto a 30° é metade da hipotenusa (5 cm), e oposto a 60° é L√3/2 = 5√3 cm." | espelha o equilátero fantasma de lado 10 cm |
| `c5r35` | 5√3 cm e 5 cm | não | "Você trocou! O menor ângulo (30°) enxerga o menor lado (5 cm), e o de 60° enxerga 5√3 cm." | destaca que 30° é menor que 60° |
| `c55r2` | 5 cm e 5√2 cm | não | "√2 é na diagonal do quadrado (45°). No 30°-60°-90° usamos √3: 5 cm e 5√3 cm." | mostra Pitágoras `10² − 5² = 75 ⇒ 5√3` |
| `c10r3` | 10 cm e 10√3 cm | não | "Faltou dividir por 2: L/2 = 5 cm e L√3/2 = 5√3 cm." | marca a metade da base `10 / 2 = 5` |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — quadrado com diagonal `L√2` (`c1`), equilátero com `L/2` (`c2`) e altura `L√3/2` (`c3`), e mediatriz (`c4`).
- **Fórmula:** `d_quad = L√2`→c1 · `,` · `c_30° = L/2`→c2 · `,` · `h_eq = L√3/2`→c3 · `e` · `A_eq = L²√3/4`
- **Definições:** "Triângulo 45°-45°-90°: metade do quadrado; catetos L e hipotenusa L√2." · "Triângulo 30°-60°-90°: metade do equilátero; hipotenusa L, oposto a 30° vale L/2 e oposto a 60° vale L√3/2." · "Mediatriz e bissetriz: pontos equidistantes de 2 pontos (mediatriz) ou de 2 lados (bissetriz)."
- **Paco (abertura):** "O 45°-45°-90° é metade de um quadrado e o 30°-60°-90° é metade de um equilátero; por isso suas medidas saem direto de L√2, L/2 e L√3/2."
- **Dica (hint):** "Toque em cada relação para ver o quadrado, o equilátero ou a construção."

**Frase de encerramento (outro):** "Você deduziu os triângulos de 45° e de 30°-60° a partir do quadrado e do equilátero e construiu mediatrizes e bissetrizes."

## i) Treino pós-aula

### Fáceis

#### F1 — `diagonal-quadrado-lado-6`
- **Enunciado:** "Quanto mede a diagonal de um quadrado de lado L = 6 cm?"
- **Conta de conferência:** d = L√2 = 6√2 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d6r2` | 6√2 cm | **sim** | "Isso. A diagonal do quadrado de lado L mede L√2 = 6√2 cm." |
| `d6r3` | 6√3 cm | não | "6√3 é a diagonal do cubo (3D). No quadrado plano é L√2 = 6√2 cm." |
| `d12` | 12 cm | não | "12 cm é a soma de dois lados. Pela hipotenusa, √(6² + 6²) = 6√2 cm." |

#### F2 — `cateto-oposto-30-graus`
- **Enunciado:** "Em um triângulo retângulo com um ângulo de 30° e hipotenusa de 14 m, quanto mede o cateto oposto ao ângulo de 30°?"
- **Conta de conferência:** oposto a 30° = metade da hipotenusa = 14 / 2 = 7 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c7` | 7 m | **sim** | "Certo! O cateto oposto a 30° vale sempre metade da hipotenusa: 14 / 2 = 7 m." |
| `c7r3` | 7√3 m | não | "7√3 m é o cateto adjacente (oposto a 60°). O oposto a 30° é a metade: 7 m." |
| `c14` | 14 m | não | "14 m é a própria hipotenusa. O oposto a 30° mede 14 / 2 = 7 m." |

#### F3 — `mediatriz-lugar-geometrico`
- **Enunciado:** "No plano, qual é o lugar geométrico de todos os pontos que estão à MESMA distância de dois pontos fixos A e B?"
- **Conta de conferência:** definição de mediatriz do segmento AB

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `med` | A mediatriz do segmento AB | **sim** | "Exato. A reta perpendicular que passa pelo ponto médio de AB tem pontos equidistantes de A e B." |
| `bis` | A bissetriz | não | "Bissetriz é equidistante de duas retas (lados de um ângulo). Para 2 pontos é a mediatriz." |
| `circ` | Uma circunferência | não | "Circunferência é equidistante de 1 único centro. Para 2 pontos A e B é a reta mediatriz." |

#### F4 — `terna-multipla-3-4-5`
- **Enunciado:** "Um triângulo retângulo tem catetos 9 cm e 12 cm (triplo de 3 e 4). Quanto mede sua hipotenusa?"
- **Conta de conferência:** 3 · (3-4-5) = 9-12-15 ⇒ hipotenusa = 15 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h15` | 15 cm | **sim** | "Isso! Como 9 = 3·3 e 12 = 3·4, a hipotenusa é o triplo de 5: 3·5 = 15 cm." |
| `h21` | 21 cm | não | "21 é a soma 9 + 12. Pela terna 3-4-5 multiplicada por 3, a hipotenusa é 15 cm." |
| `h13` | 13 cm | não | "13 cm é na terna 5-12-13. Para catetos 9 e 12 (3·3 e 3·4), a hipotenusa é 15 cm." |

### Médias

#### M1 — `altura-triangulo-equilatero`
- **Enunciado:** "Qual é a medida da altura h de um triângulo equilátero de lado L = 8 cm?"
- **Conta de conferência:** h = L√3 / 2 = 8√3 / 2 = 4√3 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h4r3` | 4√3 cm | **sim** | "Certo. A altura do equilátero é L√3 / 2 = 8√3 / 2 = 4√3 cm." |
| `h4` | 4 cm | não | "4 cm é a metade da base (L/2). A altura vertical mede L√3 / 2 = 4√3 cm." |
| `h8r3` | 8√3 cm | não | "Faltou dividir por 2 na fórmula L√3 / 2: 8√3 / 2 = 4√3 cm." |

#### M2 — `area-triangulo-equilatero`
- **Enunciado:** "Qual é a área de um triângulo equilátero de lado L = 4 cm?"
- **Conta de conferência:** A = L²√3 / 4 = 16√3 / 4 = 4√3 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4r3` | 4√3 cm² | **sim** | "Exato. Base 4 vezes altura 2√3 dividido por 2 (ou L²√3/4): 16√3 / 4 = 4√3 cm²." |
| `a2r3` | 2√3 cm² | não | "2√3 cm é a altura do triângulo. Multiplicando pela base 4 e dividindo por 2, dá 4√3 cm²." |
| `a16r3` | 16√3 cm² | não | "Faltou dividir por 4 em L²√3 / 4: 16√3 / 4 = 4√3 cm²." |

#### M3 — `achar-lado-pela-diagonal`
- **Enunciado:** "A diagonal de um quadrado mede `7√2 cm`. Quanto mede o lado L e qual é a área desse quadrado?"
- **Conta de conferência:** L√2 = 7√2 ⇒ L = 7 cm ⇒ Área = 7² = 49 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l7a49` | L = 7 cm e A = 49 cm² | **sim** | "Isso. Como d = L√2 = 7√2, o lado é L = 7 cm e a área é 7² = 49 cm²." |
| `l14a196` | L = 14 cm e A = 196 cm² | não | "Basta comparar L√2 com 7√2: o lado é L = 7 cm e a área é 49 cm²." |
| `l7a98` | L = 7 cm e A = 98 cm² | não | "Com lado 7 cm, a área do quadrado é 7² = 49 cm² (98 seria d²)." |

### Desafios

#### D1 — `achar-lado-quando-diagonal-e-inteira`
- **Enunciado:** "A diagonal de um quadrado mede 6 cm (sem raiz escrita). Qual é a ÁREA desse quadrado?"
- **Fala do Paco:** "Em todo quadrado, `d² = L² + L² = 2·Área`, então `Área = d² / 2`!"
- **Conta de conferência:** 2L² = 6² = 36 ⇒ A = L² = 36 / 2 = 18 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a18` | 18 cm² | **sim** | "Exato! Como d² = 2·L², a área L² é metade do quadrado da diagonal: 6² / 2 = 18 cm²." |
| `a36` | 36 cm² | não | "36 cm² seria se o LADO medisse 6 cm. Com diagonal 6 cm, a área é 6² / 2 = 18 cm²." |
| `a12` | 12 cm² | não | "Pelo teorema de Pitágoras, L² + L² = 6² = 36, logo a área L² = 18 cm²." |

#### D2 — `achar-lado-equilatero-pela-altura`
- **Enunciado:** "A altura de um triângulo equilátero mede `6 cm`. Quanto mede o lado L desse triângulo?"
- **Conta de conferência:** L√3 / 2 = 6 ⇒ L√3 = 12 ⇒ L = 12 / √3 = 4√3 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l4r3` | 4√3 cm | **sim** | "Certo! De L√3 / 2 = 6 sai L = 12 / √3 = 12√3 / 3 = 4√3 cm." |
| `l3r3` | 3√3 cm | não | "3√3 seria a altura se o lado fosse 6. Como a altura é 6, L = 12 / √3 = 4√3 cm." |
| `l12` | 12 cm | não | "12 cm é 2h, mas é L√3 que vale 12: dividindo por √3, L = 4√3 cm." |

#### D3 — `bissetriz-equidistante-ruas`
- **Enunciado:** "Um chafariz numa praça triangular deve ficar à MESMA distância das 3 ruas que formam os lados. Onde ele deve ficar?"
- **Conta de conferência:** ponto equidistante dos 3 lados = encontro das bissetrizes (incentro)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `inc` | No encontro das bissetrizes (incentro) | **sim** | "Exato! Cada bissetriz é equidistante de 2 lados (ruas); o encontro delas equidista das 3 ruas." |
| `circ` | No encontro das mediatrizes (circuncentro) | não | "O encontro das mediatrizes fica à mesma distância dos 3 VÉRTICES (esquinas). Para as 3 ruas (lados), são as bissetrizes!" |
| `bar` | No encontro das medianas (baricentro) | não | "Baricentro é o centro de gravidade. Equidistante dos 3 lados é o encontro das bissetrizes." |

#### D4 — `escada-60-graus`
- **Enunciado:** "Uma escada de 8 m está apoiada num muro vertical formando 60° com o chão horizontal. A que distância do muro está o pé da escada?"
- **Conta de conferência:** no triângulo 30°-60°-90°, o chão é adjacente a 60° (logo oposto ao ângulo de 30° no topo) ⇒ metade da hipotenusa = 8 / 2 = 4 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4` | 4 m | **sim** | "Isso! Se faz 60° no chão, no topo faz 30°; o chão é oposto a 30° e vale metade da escada: 8 / 2 = 4 m." |
| `d4r3` | 4√3 m | não | "4√3 m é a altura alcançada no muro (oposta a 60°). No chão (oposto a 30°) mede 4 m." |
| `d4r2` | 4√2 m | não | "4√2 m seria para 45°. Para 60° com o chão, o pé fica a 8 / 2 = 4 m." |

#### D5 — `area-hexagono-pela-formula-equilatero`
- **Enunciado:** "Sabendo que um triângulo equilátero de lado L = 2 cm tem área `L²√3/4 = √3 cm²`, qual é a área de um hexágono regular de lado 2 cm?"
- **Fala do Paco:** "O hexágono regular é formado por 6 desses triângulos equiláteros!"
- **Conta de conferência:** A_hex = 6 · A_eq = 6 · √3 = 6√3 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6r3` | 6√3 cm² | **sim** | "Exato! Cada um dos 6 triângulos equiláteros de lado 2 cm tem área √3 cm², somando 6√3 cm²." |
| `a4r3` | 4√3 cm² | não | "O hexágono regular se divide em 6 triângulos equiláteros (não 4): 6√3 cm²." |
| `a12r3` | 12√3 cm² | não | "Como 2²√3 / 4 = √3 cm² por triângulo, nos 6 triângulos dá 6√3 cm²." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** usar o triângulo notável `30°-60°-90°` ou `45°-45°-90°` para calcular alturas e distâncias sem calculadora.
- **Onde procurar:** ENEM, Fuvest, Unicamp, Unesp.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** localizar um ponto equidistante de 3 vértices (mediatrizes / circuncentro) ou de 3 lados (bissetrizes / incentro) num mapa.
- **Onde procurar:** ENEM, Unicamp, Unesp (questões de posicionar antena, hospital ou posto policial).

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular altura e área de triângulo equilátero (`L√3/2` e `L²√3/4`).
- **Onde procurar:** ENEM, UFRGS, UFPR, UERJ.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar ternas pitagóricas (`3-4-5`, `5-12-13`) e diagonal do quadrado (`L√2`) em figuras compostas.
- **Onde procurar:** ENEM, Fuvest, OBMEP.
