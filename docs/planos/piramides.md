# Plano — Pirâmides e volume

**Aula:** 1 — Três Pirâmides num Prisma · Apótemas, área lateral e o fator 1/3
**Caminho:** geometria / geometria-espacial / piramides
**Pré-requisitos que o aluno já domina:** `poliedros-e-relacao-de-euler`, `perimetro-e-area-de-figuras-planas`, `teorema-de-pitagoras`.

## a) Ancoragem mecânica
A máquina da pirâmide liga todos os pontos de uma base poligonal a um único vértice superior a uma altura `h`: enquanto o vértice sobe, as paredes laterais inclinam-se e sua altura inclinada — o **apótema da pirâmide** `a_p` — cresce segundo o triângulo retângulo interno `a_p² = h² + m²` (onde `m` é o apótema da base). Como as fatias horizontais encolhem até zerar no topo, o volume acumulado vale exatamente a terça parte do prisma de mesma base e altura: `V = (A_b · h) / 3`.

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo pirâmides) — pirâmide quadrangular regular transparente com a altura vertical `h` (`c1`), o apótema da base `m` (`c2`) e o apótema da pirâmide `a_p` (`c3`) formando o triângulo retângulo interno; controles para variar `h`, abrir as 4 faces triangulares no chão e encaixar 3 pirâmides dentro de um prisma/cubo de mesmo piso e altura.

## c) Caso neutro
Com `h = 0` (vértice ainda colado no centro da base quadrada de lado `6`), as 4 faces triangulares estão deitadas no chão, o volume é `0` e o apótema da face coincide com o próprio apótema da base (`a_p = m = 3`). Ao puxar o vértice para `h = 4`, nasce o sólido 3D e o triângulo retângulo `3-4-5` (`a_p = 5`).

## d) Panorama e recorte
Estudamos pirâmides regulares (base quadrada, triangular e hexagonal), tetraedro regular, relação pitagórica `a_p² = h² + m²`, área lateral e total e o volume `V = A_b · h / 3`. Deixamos o corte em tronco de pirâmide para o capítulo seguinte (`troncos-de-solidos`).

## e) Progressão por contraste
1. Vértice no chão (`h = 0`, `a_p = m = 3`, volume `0`) como referência plana.
2. Subir o vértice até `h = 4`: a altura vertical é `4`, mas a parede lateral desce inclinada e mede `a_p = 5` (`3² + 4² = 5²`).
3. Abrir a pirâmide na planificação: a altura de cada triângulo da parede é o apótema `a_p = 5` (e **não** `h = 4`).
4. Prisma de mesma base e altura (`V = A_b · h`) contra a pirâmide inscrita nele: o prisma se decompõe em **3 pirâmides de mesmo volume**, provando `V = A_b · h / 3`.

## f) Dedução causal da forma
Por que usamos `a_p` e não `h` para calcular a área de cada face triangular lateral? Porque `h` passa pelo ar no centro da pirâmide, enquanto a face lateral é uma rampa inclinada cuja altura perpendicular à aresta da base é a hipotenusa `a_p = √(h² + m²)`. E por que o volume divide por `3`? Porque qualquer prisma triangular (e um cubo dividido em 3 pirâmides quadrangulares pelo vértice) se parte em 3 pirâmides de mesma base e mesma altura, logo cada uma ocupa `1/3` do prisma.

## g) Simulação espacial e fronteiras
Testar o limite de validade do triângulo interno: como `a_p` é hipotenusa de `h` e `m`, o apótema da pirâmide é **sempre maior** que a altura `h` e que o apótema da base `m` (`a_p > h` e `a_p > m` para todo `h > 0`). Não confunda `a_p` (que desce até o **meio** do lado da base) com a aresta lateral `l` (que desce até a **quina** da base e é ainda maior: `l² = a_p² + (b/2)²`).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Altura (h) | Distância vertical do vértice até o centro da base. |
| c2 | Apótema da base (m) | Distância do centro da base até o meio de um lado. |
| c3 | Apótema da pirâmide (a_p) | Altura inclinada da face lateral: a_p² = h² + m². |
| c4 | Volume (V) | Um terço do prisma de mesma base e altura: A_b·h / 3. |

### Passo 1 — `nasce-o-apotema`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (h como entrada), 2 (visual), 3 (caso neutro h = 0), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — base quadrada de lado `6` (`m = 3` em `c2`), vértice começando no centro (`h = 0` fantasma); ao subir `h` (`c1`) até `4`, o segmento inclinado na face mostra `a_p = 5` (`c3`).
- **Sliders:** `h` · "Altura da pirâmide (h)" · 0..4 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "No caso neutro h = 0, o vértice está no chão a m = 3 da borda. Puxe o vértice até h = 4: a rampa da parede mede 4 ou mais?"
- **Interação do aluno:** ergue `h` até 4 e vê o triângulo retângulo interno `m = 3`, `h = 4` fechar a hipotenusa `a_p = 5`.
- **Conclusão:** `h ≥ 4`
- **Paco (conclusão):** "Mede 5! A altura h = 4 desce reta pelo meio, mas a parede desce inclinada pela hipotenusa: 3² + 4² = 5²."
- **Tati (dúvida):** `fim` — P: "Essa altura inclinada da parede tem nome?" / R: "Sim: é o apótema da pirâmide (a_p). Aqui vamos usá-lo nas faces laterais e depois achar o volume."

### Passo 2 — `abrir-faces-laterais`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste h × a_p), 6 (dedução da área lateral)
- **Widget:** WIDGET NOVO: `solido_3d` — pirâmide de base `6 × 6` e `h = 4`, `a_p = 5` que abre as 4 faces triangulares em estrela no plano, mantendo o segmento `a_p = 5` (`c3`) como altura de cada triângulo.
- **Sliders:** `planificar` · "Abrir faces no plano" · 0..100 · passo 25 · inicial 0 · c3
- **Paco (abertura):** "Para achar a área de cada triângulo da parede, usamos h = 4 ou o apótema a_p = 5? Abra a pirâmide e confira."
- **Interação do aluno:** abre a planificação em estrela e vê cada triângulo de base 6 ter altura `a_p = 5` (`área = 15`).
- **Conclusão:** `planificar ≥ 100`
- **Paco (conclusão):** "No plano, quem fica em pé no triângulo da face é o a_p = 5! Cada face tem (6·5)/2 = 15, e as 4 somam 60."

### Passo 3 — `tres-piramides-no-prisma`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (prisma × pirâmide), 6 (dedução do 1/3), 7 (fronteira)
- **Widget:** WIDGET NOVO: `solido_3d` — cubo/prisma transparente de base `A_b = 36` e `h = 4` (`V_prisma = 144`) dividido em 3 pirâmides congruentes de volume `48` (`c4`) que se encaixam com o slider.
- **Sliders:** `encaixar` · "Encaixar 3 pirâmides" · 1..3 · passo 1 · inicial 1 · c4
- **Paco (abertura):** "Quantas pirâmides de mesma base e mesma altura cabem dentro de um prisma? Junte as peças para testar."
- **Interação do aluno:** encaixa a 2ª e a 3ª pirâmide até preencher 100% do prisma.
- **Conclusão:** `encaixar ≥ 3`
- **Paco (conclusão):** "Cabem exatamente 3! Por isso o volume da pirâmide é um terço do prisma: V = (A_b · h) / 3."
- **Tati (dúvida):** `fim` — P: "O apótema a_p pode ser menor que a altura h?" / R: "Nunca! Como a_p é a hipotenusa de h e m, a rampa da parede é sempre maior que a altura vertical."

### Passo 4 — `desafio-volume-piramide`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — pirâmide de base quadrada de lado `6 cm` (`A_b = 36` em `c2`) e altura `h = 4 cm` (`c1`).
- **Paco (abertura):** "Lembre quantas pirâmides cabem no prisma de mesma base e altura."
- **Enunciado:** "Uma pirâmide tem base quadrada de lado 6 cm e altura 4 cm. Qual é o seu volume?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `v48` | 48 cm³ | **sim** | "Exato. A_b = 6² = 36 cm², e V = (36 · 4) / 3 = 48 cm³." | mostra o prisma fantasma de 144 cm³ dividido por 3 |
| `v144` | 144 cm³ | não | "144 cm³ é o prisma inteiro (36·4). Na pirâmide divide-se por 3: 48 cm³." | exibe as 3 pirâmides que compõem os 144 cm³ |
| `v72` | 72 cm³ | não | "Você dividiu por 2 em vez de 3. O volume da pirâmide é (36·4) / 3 = 48 cm³." | destaca o fator 1/3 em `c4` |
| `v24` | 24 cm³ | não | "A área da base é 6² = 36 (não 6·3). Então V = (36·4) / 3 = 48 cm³." | ilumina a malha `6 × 6 = 36` na base |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — pirâmide quadrangular regular com o triângulo retângulo `h-m-a_p` e o prisma circunscrito em fantasma.
- **Fórmula:** `a_p²`→c3 · `=` · `h²`→c1 · `+` · `m²`→c2 · `e` · `V`→c4 · `=` · `(A_b · h) / 3`
- **Definições:** "Apótema da pirâmide (a_p): altura da face lateral, hipotenusa de h e m." · "Área lateral: soma das áreas dos triângulos das faces (usando a_p)." · "Volume da pirâmide: um terço do prisma de mesma base e altura."
- **Paco (abertura):** "A parede desce inclinada e três pirâmides preenchem o prisma; por isso usamos a_p² = h² + m² na casca e dividimos A_b · h por 3 no volume."
- **Dica (hint):** "Toque em cada letra da fórmula para destacá-la na pirâmide."

**Frase de encerramento (outro):** "Você descobriu o triângulo retângulo interno dos apótemas, abriu as faces laterais e viu por que o volume tem o fator 1/3."

## i) Treino pós-aula

### Fáceis

#### F1 — `achar-apotema-345`
- **Enunciado:** "Numa pirâmide quadrangular regular, a altura mede h = 4 cm e o apótema da base mede m = 3 cm. Quanto mede o apótema da pirâmide (a_p)?"
- **Conta de conferência:** a_p² = 4² + 3² = 25 ⇒ a_p = 5 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 cm | **sim** | "Isso. Pelo triângulo retângulo interno, a_p = √(4² + 3²) = 5 cm." |
| `a7` | 7 cm | não | "Você somou 4 + 3. Como formam 90°, aplicamos Pitágoras: √(16 + 9) = 5 cm." |
| `a4` | 4 cm | não | "4 cm é a altura vertical h. A rampa inclinada mede √(4² + 3²) = 5 cm." |
| `a25` | 25 cm | não | "25 é a_p²; tirando a raiz quadrada, a_p = 5 cm." |

#### F2 — `volume-direto-piramide`
- **Enunciado:** "Qual é o volume de uma pirâmide cuja base tem área 30 cm² e cuja altura mede 5 cm?"
- **Conta de conferência:** V = (30 · 5) / 3 = 50 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v50` | 50 cm³ | **sim** | "Certo. V = (A_b · h) / 3 = (30 · 5) / 3 = 50 cm³." |
| `v150` | 150 cm³ | não | "150 cm³ seria o prisma. Na pirâmide dividimos por 3: 150 / 3 = 50 cm³." |
| `v75` | 75 cm³ | não | "Divide-se por 3, não por 2: (30 · 5) / 3 = 50 cm³." |

#### F3 — `comparar-prisma-piramide`
- **Enunciado:** "Uma pirâmide e um prisma têm a mesma base e a mesma altura. Se a pirâmide tem volume 20 cm³, qual é o volume do prisma?"
- **Conta de conferência:** V_prisma = 3 · V_pirâmide = 3 · 20 = 60 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v60` | 60 cm³ | **sim** | "Exato. No prisma cabem 3 pirâmides iguais: 3 · 20 = 60 cm³." |
| `v20` | 20 cm³ | não | "O prisma tem o triplo do volume da pirâmide: 3 · 20 = 60 cm³." |
| `v40` | 40 cm³ | não | "Cabem 3 pirâmides no prisma (não 2): 3 · 20 = 60 cm³." |

#### F4 — `apotema-base-quadrada`
- **Enunciado:** "Se a base de uma pirâmide regular é um quadrado de lado 10 cm, quanto mede o apótema da base (m)?"
- **Conta de conferência:** do centro até o meio do lado = metade do lado = 10 / 2 = 5 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m5` | 5 cm | **sim** | "Isso. Do centro do quadrado até a borda mede metade do lado: 10 / 2 = 5 cm." |
| `m10` | 10 cm | não | "10 cm é o lado inteiro. Do centro até a borda é a metade: 5 cm." |
| `m20` | 20 cm | não | "O apótema da base quadrada vale metade do lado: 10 / 2 = 5 cm." |

### Médias

#### M1 — `area-lateral-piramide-quadrada`
- **Enunciado:** "Uma pirâmide quadrangular regular tem lado da base 8 cm e apótema da pirâmide a_p = 5 cm. Qual é a sua área lateral?"
- **Conta de conferência:** 4 triângulos de base 8 e altura 5 ⇒ 4 · (8·5)/2 = 4 · 20 = 80 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a80` | 80 cm² | **sim** | "Certo. Cada face tem (8·5)/2 = 20 cm²; nas 4 faces laterais são 4·20 = 80 cm²." |
| `a20` | 20 cm² | não | "20 cm² é apenas 1 face triangular. Somando as 4 faces laterais, dá 80 cm²." |
| `a160` | 160 cm² | não | "Faltou dividir a área de cada triângulo por 2: 4 · (8·5)/2 = 80 cm²." |
| `a144` | 144 cm² | não | "144 cm² é a área total (80 + 64 da base). Só a área lateral é 80 cm²." |

#### M2 — `achar-altura-pelo-apotema`
- **Enunciado:** "Uma pirâmide de base quadrada de lado 12 cm (m = 6 cm) tem apótema da pirâmide a_p = 10 cm. Quanto mede a altura h?"
- **Conta de conferência:** h² + 6² = 10² ⇒ h² = 100 − 36 = 64 ⇒ h = 8 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h8` | 8 cm | **sim** | "Exato. Como a_p = 10 é a hipotenusa e m = 6 é cateto, h = √(10² − 6²) = 8 cm." |
| `h10` | 10 cm | não | "10 cm é a rampa inclinada a_p. A altura vertical é √(10² − 6²) = 8 cm." |
| `h4` | 4 cm | não | "Você subtraiu 10 − 6. Por Pitágoras, h = √(100 − 36) = √64 = 8 cm." |

#### M3 — `volume-pelo-apotema`
- **Enunciado:** "Na pirâmide de base quadrada de lado 6 cm (m = 3 cm) e apótema a_p = 5 cm, qual é o seu volume?"
- **Conta de conferência:** h = √(5² − 3²) = 4 cm; A_b = 36 cm²; V = (36 · 4)/3 = 48 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v48` | 48 cm³ | **sim** | "Isso. Primeiro h = √(5² − 3²) = 4 cm; depois V = (36 · 4) / 3 = 48 cm³." |
| `v60` | 60 cm³ | não | "Você usou a_p = 5 no lugar da altura h = 4. O certo é (36 · 4) / 3 = 48 cm³." |
| `v144` | 144 cm³ | não | "Faltou dividir por 3: V = (36 · 4) / 3 = 48 cm³." |

### Desafios

#### D1 — `area-total-pelos-dados-base-h`
- **Enunciado:** "Uma pirâmide quadrangular regular tem lado da base 6 cm e altura h = 4 cm. Qual é a sua ÁREA TOTAL (base + 4 faces)?"
- **Fala do Paco:** "Ache primeiro a_p por Pitágoras (3-4-5) para calcular as 4 faces!"
- **Conta de conferência:** m = 3, h = 4 ⇒ a_p = 5; A_b = 36; A_l = 4 · (6·5)/2 = 60; A_t = 36 + 60 = 96 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a96` | 96 cm² | **sim** | "Exato. Com a_p = 5, as 4 faces somam 60 cm² e a base tem 36 cm²: 60 + 36 = 96 cm²." |
| `a60` | 60 cm² | não | "60 cm² é só a área lateral. Somando a base quadrada 6² = 36 cm², dá 96 cm²." |
| `a84` | 84 cm² | não | "Você usou h = 4 nas faces em vez de a_p = 5. Com a_p = 5, A_t = 36 + 60 = 96 cm²." |

#### D2 — `aresta-lateral-piramide`
- **Enunciado:** "Numa pirâmide quadrangular regular de lado da base 6 cm e apótema a_p = 4 cm, quanto mede a ARESTA LATERAL l até a quina?"
- **Conta de conferência:** na face lateral, l é hipotenusa de a_p = 4 e metade do lado (3) ⇒ l = √(4² + 3²) = 5 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l5` | 5 cm | **sim** | "Certo. Na face triangular, a_p = 4 e metade da base (3) formam 90°: l = √(4² + 3²) = 5 cm." |
| `l4` | 4 cm | não | "4 cm é o apótema no meio da face; até a quina é a hipotenusa: √(4² + 3²) = 5 cm." |
| `l7` | 7 cm | não | "Não some 4 + 3; use Pitágoras na metade da face: √(16 + 9) = 5 cm." |

#### D3 — `tetraedro-regular-area`
- **Enunciado:** "Um tetraedro regular tem todas as 4 faces iguais a um triângulo equilátero de área 5 cm². Qual é a área total desse tetraedro?"
- **Conta de conferência:** 4 faces congruentes · 5 cm² = 20 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20 cm² | **sim** | "Isso. O tetraedro regular tem 4 faces triangulares idênticas: 4 · 5 = 20 cm²." |
| `a15` | 15 cm² | não | "15 cm² são só as 3 faces laterais; contando a base também são 4 · 5 = 20 cm²." |
| `a25` | 25 cm² | não | "O tetraedro tem 4 faces (não 5): 4 · 5 = 20 cm²." |

#### D4 — `dobrar-lado-base-piramide`
- **Enunciado:** "Se dobrarmos o lado da base quadrada de uma pirâmide mantendo a MESMA altura h, o seu volume fica multiplicado por:"
- **Conta de conferência:** A_b multiplica por 2² = 4 e h mantém-se ⇒ V multiplica por 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `k4` | 4 | **sim** | "Exato. Dobrar o lado quadruplica a área da base (2² = 4), logo o volume quadruplica." |
| `k2` | 2 | não | "A base é bidimensional: dobrar o lado multiplica a área da base e o volume por 2² = 4." |
| `k8` | 8 | não | "Multiplicaria por 8 se a altura também dobrasse. Com h fixa, multiplica por 4." |

#### D5 — `octaedro-duas-piramides`
- **Enunciado:** "Um octaedro une duas pirâmides quadrangulares iguais base com base (lado 6 cm e h = 4 cm em cada). Qual é o seu volume?"
- **Fala do Paco:** "Calcule o volume de uma pirâmide e multiplique por 2!"
- **Conta de conferência:** V_1 = (36 · 4)/3 = 48 cm³ ⇒ V_octaedro = 2 · 48 = 96 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v96` | 96 cm³ | **sim** | "Exato. Cada pirâmide tem (36·4)/3 = 48 cm³; juntas, as duas somam 2·48 = 96 cm³." |
| `v48` | 48 cm³ | não | "48 cm³ é uma pirâmide só. Como o octaedro junta duas iguais, 2·48 = 96 cm³." |
| `v288` | 288 cm³ | não | "Faltou dividir por 3 no volume de cada pirâmide: 2 · (36·4)/3 = 96 cm³." |

### Vestibular

#### V1 — `enem-2009-piramide-pentagonal`
- **Enunciado (resumido):** Um artesão corta uma pirâmide de base quadrada com um plano e obtém uma face pentagonal. Qual argumento justifica esse resultado?
- **Fala do Paco:** "Conte as faces da pirâmide e pense no que o plano deixa em cada face que atravessa."
- **Fonte:** ENEM 2009, Questão 177 — `https://api.enem.dev/v1/exams/2009/questions/177`
- **Adaptação:** enunciado resumido e rótulos das alternativas encurtados mantendo o sentido; gabarito (C) mantido.
- **Conta de conferência:** pirâmide de base quadrada tem 5 faces (1 base + 4 laterais); se o plano interceptar todas as 5 faces, a seção tem 5 lados.
- **Opções e feedback:** A (4 arestas), B (4 faces), C (5 faces, correta), D (sempre 5), E (sempre 4).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** relacionar apótema da pirâmide, apótema da base e altura para achar área lateral/total.
- **Onde procurar:** Unesp, UERJ, UFPR, ENEM.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** volume de pirâmide inscrita ou recortada de um cubo/paralelepípedo.
- **Onde procurar:** Fuvest, Unicamp, ENEM.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** geometria métrica do tetraedro regular ou octaedro.
- **Onde procurar:** UFRGS, Unifesp, ITA.
