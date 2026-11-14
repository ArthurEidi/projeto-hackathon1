# Plano — Coordenadas, distância e ponto médio

**Aula:** 1 — O Triângulo Escondido Entre Dois Pontos · Distância e ponto médio
**Caminho:** geometria / geometria-analitica / plano-cartesiano-distancia-e-ponto-medio
**Pré-requisitos que o aluno já domina:** teorema de Pitágoras, plano cartesiano e coordenadas, média de dois números.

## a) Ancoragem mecânica
A máquina recebe dois pontos A e B e devolve o deslocamento horizontal Δx, o vertical Δy, a distância entre eles e o ponto do meio. As coordenadas de A e B são as entradas (o aluno arrasta os pontos); a distância e o ponto médio são as saídas.

## b) Visual de partida
WIDGET NOVO `pontos_no_plano`: plano cartesiano com dois pontos arrastáveis (encaixe em inteiros). Entre eles aparece o segmento AB (c3), o "degrau" horizontal Δx (c1) e o vertical Δy (c2), formando um triângulo retângulo. Uma chave desenha quadrados sobre os três lados; outra mostra o ponto médio M (c4). Métricas: `dx`, `dy`, `distancia`, `quadrados_ligados`, `medio_ligado`.

## c) Caso neutro
A e B na mesma altura: Δy = 0, o triângulo se achata e a distância é só |Δx|, como numa régua. Com A = B, tudo é zero. Depois subimos B para o triângulo nascer.

## d) Panorama e recorte
A mesma ideia mede distâncias no espaço (com Δz), entre ponto e reta e entre retas. Aqui: distância entre dois pontos do plano e ponto médio.

## e) Progressão por contraste
1. Mesma altura: distância = |Δx| (referência).
2. B sobe: aparece Δy e o triângulo retângulo; a distância é a hipotenusa.
3. B à esquerda ou abaixo: Δx ou Δy negativos, mas elevados ao quadrado.
4. Ponto médio: cada coordenada é a média das coordenadas de A e B.

## f) Dedução causal da forma
Andar de A até B pelos eixos é andar Δx na horizontal e Δy na vertical, e esses dois caminhos formam um ângulo reto. O segmento AB é a hipotenusa desse triângulo, então pelo teorema de Pitágoras d² = Δx² + Δy², ou seja d = √(Δx² + Δy²). O meio do segmento fica na metade de cada deslocamento: M = ((xA + xB)/2; (yA + yB)/2).

## g) Simulação espacial e fronteiras
Arrastar B pelos quatro quadrantes troca os sinais de Δx e Δy, mas a distância não muda de sinal: os quadrados apagam o sinal. A distância só é zero quando A = B. Pontos à mesma distância de A formam uma circunferência (gancho para a aula de circunferência).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Deslocamento horizontal | Quanto se anda em x de A até B: Δx = xB − xA. |
| c2 | Deslocamento vertical | Quanto se anda em y de A até B: Δy = yB − yA. |
| c3 | Distância | Comprimento do segmento AB, a hipotenusa do triângulo. |
| c4 | Ponto médio | O ponto no meio de A e B: média das coordenadas. |

### Passo 1 — `mesma-altura`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro)
- **Widget:** WIDGET NOVO `pontos_no_plano` — A(1; 2) fixo, B(5; 2) arrastável; degraus Δx (c1) e Δy (c2) e segmento AB (c3) com medida.
- **Sliders:** nenhum
- **Paco (abertura):** "A e B estão na mesma altura: quanto mede AB? Depois arraste B para cima e veja o que aparece."
- **Interação do aluno:** lê AB = 4 e arrasta B para cima; o degrau vertical cresce.
- **Conclusão:** `dy ≥ 3`
- **Paco (conclusão):** "Na mesma altura, a distância era só Δx = 4. Subindo B, nasce um triângulo retângulo com catetos Δx e Δy."

### Passo 2 — `pitagoras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6, 2
- **Widget:** `pontos_no_plano` — A(1; 2), B(5; 5); chave "quadrados" desenha quadrados de áreas 16 (c1), 9 (c2) e 25 (c3). Emite `quadrados_ligados`.
- **Sliders:** nenhum
- **Paco (abertura):** "Com Δx = 4 e Δy = 3, quanto mede AB? Pense no triângulo que apareceu."
- **Interação do aluno:** liga os quadrados e vê 16 + 9 = 25.
- **Conclusão:** `quadrados_ligados ≥ 1`
- **Paco (conclusão):** "AB é a hipotenusa: √(16 + 9) = 5. Distância entre pontos é Pitágoras com os deslocamentos."

### Passo 3 — `sinais-somem`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira), 4 (panorama na dúvida)
- **Widget:** `pontos_no_plano` — B arrastável por todo o plano; rótulos mostram Δx e Δy com sinal e a distância.
- **Sliders:** nenhum
- **Paco (abertura):** "Leve B para a esquerda de A. Δx fica negativo: a distância também fica?"
- **Interação do aluno:** arrasta B para x < 1 e vê Δx negativo e a distância positiva.
- **Conclusão:** `dx ≤ −3`
- **Paco (conclusão):** "Não: Δx entra ao quadrado, e (−4)² = 16. Distância nunca é negativa."
- **Tati (dúvida):** `fim` — P: "Isso funciona no espaço também?" / R: "Funciona com um Δz a mais. Aqui ficamos no plano: distância, ponto médio e depois retas."

### Passo 4 — `ponto-medio`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 6
- **Widget:** `pontos_no_plano` — A(1; 2) e B(5; 5); chave "ponto médio" mostra M (c4) e as médias de x e de y nos eixos. Emite `medio_ligado`.
- **Sliders:** nenhum
- **Paco (abertura):** "Onde fica o ponto exatamente no meio de A e B? Ligue M e compare as coordenadas dele com as de A e B."
- **Interação do aluno:** liga M e arrasta B; M acompanha sempre na metade.
- **Conclusão:** `medio_ligado ≥ 1`
- **Paco (conclusão):** "M = ((1 + 5)/2; (2 + 5)/2) = (3; 3,5). Cada coordenada do meio é a média das coordenadas."

### Passo 5 — `desafio-6-8`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `pontos_figura` — O(0; 0) e P(6; 8) com o segmento.
- **Paco (abertura):** "Desenhe os degraus de cabeça antes de responder."
- **Enunciado:** "Qual a distância entre O(0; 0) e P(6; 8)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a14` | 14 | não | "14 soma os degraus. A distância é a hipotenusa: √(36 + 64) = 10." | degraus 6 e 8 em fila |
| `a10` | 10 | **sim** | "Isso. √(36 + 64) = √100 = 10." | triângulo com quadrados 36, 64 e 100 |
| `a100` | 100 | não | "100 é d², a área do quadrado. A distância é √100 = 10." | quadrado de 100 destacado em c3 |
| `a2` | 2 | não | "2 é 8 − 6. Os degraus formam um triângulo: d = 10." | degraus perpendiculares acesos |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `pontos_figura` — A(1; 2), B(5; 5), degraus, quadrados e M.
- **Fórmula:** `d`→c3 · `=` · `√(` · `Δx²`→c1 · `+` · `Δy²`→c2 · `)`
- **Definições:** "Δx = xB − xA e Δy = yB − yA: os degraus entre os pontos." · "Distância: hipotenusa do triângulo dos degraus." · "Ponto médio: M = ((xA + xB)/2; (yA + yB)/2)."
- **Paco (abertura):** "Os degraus horizontal e vertical formam um ângulo reto. Por isso a distância é Pitágoras com eles."
- **Dica (hint):** "Toque em uma letra para ver o segmento no plano."

**Frase de encerramento (outro):** "Você achou o triângulo escondido entre dois pontos: a distância é a hipotenusa e o ponto médio é a média das coordenadas."

## i) Treino pós-aula

### Fáceis

#### F1 — `mesma-linha`
- **Enunciado:** "Qual a distância entre (1; 1) e (4; 1)?"
- **Conta de conferência:** Δx = 3, Δy = 0: 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. Mesma altura: só Δx." |
| `a5` | 5 | não | "5 soma 1 + 4. Na mesma altura, d = 4 − 1 = 3." |
| `a4` | 4 | não | "4 é a coordenada x de B. d = 4 − 1 = 3." |
| `a9` | 9 | não | "9 é d². A distância é 3." |

#### F2 — `medio-2-4-6-8`
- **Enunciado:** "Qual o ponto médio entre (2; 4) e (6; 8)?"
- **Conta de conferência:** (4; 6)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m46` | (4; 6) | **sim** | "Certo. Média de x e média de y." |
| `m812` | (8; 12) | não | "Isso é a soma. Dividindo por 2: (4; 6)." |
| `m24` | (2; 2) | não | "Isso é a metade dos degraus. O meio é (4; 6)." |
| `m44` | (4; 4) | não | "x médio é 4, mas y médio é (4 + 8)/2 = 6." |

#### F3 — `delta-x`
- **Enunciado:** "De A(2; 3) até B(7; 1), quanto vale Δx?"
- **Conta de conferência:** 7 − 2 = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Isso. 7 − 2." |
| `am2` | −2 | não | "−2 é Δy (1 − 3). Δx = 7 − 2 = 5." |
| `am5` | −5 | não | "De A para B é xB − xA = 7 − 2 = 5." |
| `a9` | 9 | não | "9 soma as coordenadas. Δx = 7 − 2 = 5." |

#### F4 — `ponto-a-si`
- **Enunciado:** "Qual a distância de um ponto até ele mesmo?"
- **Conta de conferência:** Δx = Δy = 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | **sim** | "Certo. Não há degrau nenhum." |
| `a1` | 1 | não | "Sem deslocamento, a distância é 0." |
| `depende` | Depende do ponto | não | "Para qualquer ponto, Δx = Δy = 0: distância 0." |
| `nao-existe` | Não existe | não | "Existe e vale 0." |

### Médias

#### M1 — `tres-quatro-cinco`
- **Enunciado:** "Qual a distância entre (0; 0) e (3; 4)?"
- **Conta de conferência:** √(9 + 16) = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Isso. √25 = 5." |
| `a7` | 7 | não | "7 soma os degraus. Hipotenusa: √(9 + 16) = 5." |
| `a25` | 25 | não | "25 é d². A distância é 5." |
| `a1` | 1 | não | "1 é 4 − 3. Pitágoras dá 5." |

#### M2 — `um-dois-quatro-seis`
- **Enunciado:** "Qual a distância entre (1; 2) e (4; 6)?"
- **Conta de conferência:** Δx = 3, Δy = 4: 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Certo. Degraus 3 e 4: hipotenusa 5." |
| `a7` | 7 | não | "7 soma os degraus. √(9 + 16) = 5." |
| `a8-6` | √74 | não | "√74 usa as coordenadas, não os degraus. Com Δx = 3 e Δy = 4: 5." |
| `a25` | 25 | não | "25 é d². d = 5." |

#### M3 — `medio-negativos`
- **Enunciado:** "Qual o ponto médio entre (−2; 3) e (4; −1)?"
- **Conta de conferência:** ((−2 + 4)/2; (3 − 1)/2) = (1; 1)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m11` | (1; 1) | **sim** | "Isso. Médias 2/2 e 2/2." |
| `m32` | (3; −2) | não | "Isso é metade dos degraus. O meio: ((−2 + 4)/2; (3 − 1)/2) = (1; 1)." |
| `m22` | (2; 2) | não | "Faltou dividir por 2: (1; 1)." |
| `m12` | (1; 2) | não | "y médio é (3 + (−1))/2 = 1. M = (1; 1)." |

### Desafios

#### D1 — `achar-b-pelo-medio`
- **Enunciado:** "M(3; 4) é o ponto médio de AB, com A(1; 1). Quais as coordenadas de B?"
- **Fala do Paco:** "De A até M é metade do caminho. Ande o mesmo de novo."
- **Conta de conferência:** B = 2M − A = (5; 7)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `b57` | (5; 7) | **sim** | "Certo. De A a M anda (2; 3); mais (2; 3) dá (5; 7)." |
| `b225` | (2; 2,5) | não | "Isso é o meio entre A e M. B fica do outro lado: (5; 7)." |
| `b43` | (4; 3) | não | "Do A ao M anda-se (2; 3). Repetindo: (5; 7)." |
| `b45` | (4; 5) | não | "Somar A e M não dá B. B = 2M − A = (5; 7)." |

#### D2 — `perimetro`
- **Enunciado:** "Qual o perímetro do triângulo de vértices (0; 0), (3; 0) e (0; 4)?"
- **Conta de conferência:** 3 + 4 + 5 = 12

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 | **sim** | "Isso. Catetos 3 e 4, hipotenusa 5." |
| `a7` | 7 | não | "Faltou a hipotenusa, 5. Perímetro 12." |
| `a6` | 6 | não | "6 é a área. O perímetro é 3 + 4 + 5 = 12." |
| `a14` | 14 | não | "A hipotenusa é 5, não 7. Perímetro 12." |

#### D3 — `equidistante-no-eixo`
- **Enunciado:** "Qual ponto do eixo x está à mesma distância de (0; 2) e de (4; 0)?"
- **Fala do Paco:** "Chame o ponto de (x; 0) e iguale os quadrados das distâncias."
- **Conta de conferência:** x² + 4 = (x − 4)² ⇒ 8x = 12 ⇒ x = 1,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p15` | (1,5; 0) | **sim** | "Isso. x² + 4 = (x − 4)² dá x = 1,5." |
| `p20` | (2; 0) | não | "(2; 0) é o meio em x, mas fica a √8 de um e a 2 do outro. Resolvendo: (1,5; 0)." |
| `p40` | (4; 0) | não | "(4; 0) é um dos pontos: distância 0 dele. A resposta é (1,5; 0)." |
| `p00` | (0; 0) | não | "A origem fica a 2 de um e a 4 do outro. Resolvendo: (1,5; 0)." |

#### D4 — `sinais-misturados`
- **Enunciado:** "Qual a distância entre (2; −3) e (−1; 1)?"
- **Conta de conferência:** Δx = −3, Δy = 4: 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Certo. (−3)² + 4² = 25." |
| `a1` | 1 | não | "Os degraus são −3 e 4, mas entram ao quadrado: √25 = 5." |
| `a7` | 7 | não | "7 soma |Δx| e |Δy|. Hipotenusa: 5." |
| `a-raiz5` | √5 | não | "√5 usaria degraus 1 e 2. Aqui são 3 e 4: 5." |

#### D5 — `diagonal-unitaria`
- **Enunciado:** "Qual a distância entre (1; 1) e (2; 2)?"
- **Fala do Paco:** "Última. Nem toda distância é inteira."
- **Conta de conferência:** √(1 + 1) = √2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `raiz2` | √2 | **sim** | "Isso. Diagonal de um quadradinho de lado 1." |
| `a2` | 2 | não | "2 soma os degraus. Hipotenusa: √(1 + 1) = √2." |
| `a1` | 1 | não | "1 é cada degrau. A diagonal é maior: √2." |
| `a0` | 0 | não | "Os pontos são diferentes. d = √2." |

### Vestibular

#### V1 — `etam-2011-distancia`
- **Enunciado (resumido):** "Qual a distância entre os pontos (−1; −1) e (1; 1)?"
- **Fala do Paco:** "Os degraus são de 2 em cada direção."
- **Fonte:** ETAM 2011 (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (2√2) mantidos; texto lido em resumo da página, conferir no caderno antes de publicar — **URL:** https://www.todamateria.com.br/distancia-entre-dois-pontos-exercicios/
- **Conta de conferência:** √(4 + 4) = √8 = 2√2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2r2` | 2√2 | **sim** | "Isso. √8 = 2√2." |
| `a3r2` | 3√2 | não | "3√2 = √18 usaria degraus 3. Aqui são 2 e 2: √8 = 2√2." |
| `a2r3` | 2√3 | não | "2√3 = √12. Com degraus 2 e 2: √8 = 2√2." |
| `a3r3` | 3√3 | não | "3√3 = √27. A conta é √(4 + 4) = 2√2." |

#### V2 — `ufrr-2017-valor-de-y`
- **Enunciado (resumido):** "A distância entre A(4; y) e B(1; 2) é 5. Quais os valores de y?"
- **Fala do Paco:** "Δx já é 3. Que Δy completa a hipotenusa 5?"
- **Fonte:** UFRR 2017 (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (6 e −2) mantidos; texto lido em resumo da página, conferir no caderno antes de publicar — **URL:** https://www.todamateria.com.br/distancia-entre-dois-pontos-exercicios/
- **Conta de conferência:** 9 + (y − 2)² = 25 ⇒ y − 2 = ±4 ⇒ y = 6 ou −2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6m2` | 6 e −2 | **sim** | "Certo. Δy = ±4: y = 2 + 4 ou 2 − 4." |
| `complexo` | 2 + 2i e 2 − 2i | não | "Não há raiz negativa aqui: (y − 2)² = 16. y = 6 ou −2." |
| `raiz3` | 2 + 2√3 e 2 − 3√3 | não | "(y − 2)² = 25 − 9 = 16, não 12. y = 6 ou −2." |
| `a20` | 2 e 0 | não | "Com y = 2 a distância seria 3. Precisa Δy = ±4: 6 ou −2." |
| `raiz6` | 4 + 2√6 e 4 − 2√6 | não | "O centro é y = 2, não 4. (y − 2)² = 16: 6 ou −2." |

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** ponto médio e simetria.
- **Onde procurar:** UFRGS, PUC-RJ, UFES.

#### V4 — `enem-2011-metro`
- **Enunciado (resumido):** Uma linha de metrô segue a reta y = x + 4 e há um hospital em P(−5; 5). Qual ponto da reta fica a no máximo 5 km do hospital?
- **Fala do Paco:** "Confira primeiro se o ponto pertence à reta y = x + 4 e depois calcule a distância até P(−5; 5)."
- **Fonte:** ENEM 2011, Questão 150 — `https://api.enem.dev/v1/exams/2011/questions/150`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`(–3, 1)`) mantidos.
- **Conta de conferência:** `1 = −3 + 4` (na reta) e `d = √((−3+5)² + (1−5)²) = √20 < 5`.
- **Opções e feedback:** `(–5, 0)` (fora da reta), `(–3, 1)` (correta), `(–2, 1)` (fora da reta), `(0, 4)` (√26 > 5), `(2, 6)` (√50 > 5).
