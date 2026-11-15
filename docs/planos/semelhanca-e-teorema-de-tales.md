# Plano — Semelhança de triângulos e teorema de Tales

**Aula:** 1 — Mesma Forma, Outra Escala · Paralela no triângulo, razão constante e Tales
**Caminho:** geometria / geometria-plana / semelhanca-e-teorema-de-tales
**Pré-requisitos que o aluno já domina:** triangulos-congruencia-e-propriedades, razao-proporcao-porcentagem.

## a) Ancoragem mecânica
A máquina desliza uma reta paralela cortando um feixe de retas ou um triângulo. A entrada é a posição da paralela (fator de escala k); a saída é um triângulo menor com os mesmos ângulos do original e todos os lados multiplicados pela mesma razão k.

## b) Visual de partida
WIDGET NOVO `geometria_plana` em modo semelhança/Tales: um triângulo ABC de lados 6, 8 e 10 cortado por uma paralela à base BC que desliza verticalmente, mostrando o triângulo menor ADE (em c1), o original (em c2), os ângulos correspondentes iguais (c3) e o mostrador da razão k (c4).

## c) Caso neutro
Quando a paralela está colada na própria base BC, a razão de semelhança é k = 1: o triângulo novo coincide com o original sem ampliar nem reduzir. Subir a paralela reduz k mantendo todos os ângulos intactos.

## d) Panorama e recorte
Proporções aparecem em escalas de mapas, homotetia, áreas (que variam com k²) e volumes (k³). Aqui focamos nos comprimentos lineares: o teorema de Tales nos feixes de paralelas e a semelhança de triângulos pelo caso AA (dois ângulos iguais).

## e) Progressão por contraste
1. Paralela na base (k = 1): cópia congruente 6, 8, 10 (referência).
2. Paralela no meio da altura (k = 0,5): ângulos continuam iguais por correspondência, e os lados caem pela metade (3, 4, 5).
3. Três paralelas cortadas por duas transversais (Tales): se um lado divide em 2 e 4, o outro divide na mesma razão (3 e 6).
4. Sombra do poste e do bastão: dois triângulos separados com os mesmos ângulos (AA) mantêm a mesma razão entre altura e sombra.

## f) Dedução causal da forma
Cortar um triângulo com uma paralela à base cria ângulos correspondentes iguais nos dois lados e compartilha o ângulo do topo (caso AA). Como a inclinação dos lados não muda, andar metade de um lado obriga a andar metade do outro e da base, por isso a′/a = b′/b = c′/c = k.

## g) Simulação espacial e fronteiras
Quando k → 0, a paralela encosta no vértice do topo e o triângulo encolhe a um ponto. Se a reta deixar de ser paralela à base, os ângulos correspondentes mudam, a semelhança nessa posição quebra e as razões dos dois lados deixam de empatar.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Triângulo semelhante | Figura de mesmo formato cujos lados foram todos multiplicados por k. |
| c2 | Triângulo original | Figura de referência (k = 1) com lados a, b e c. |
| c3 | Ângulos correspondentes (AA) | Dois ângulos iguais já garantem que os triângulos são semelhantes. |
| c4 | Razão de semelhança (k) | Constante pela qual todos os lados são multiplicados: lado novo / lado original. |

### Passo 1 — `escala-na-paralela`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `geometria_plana` (modo semelhança) — triângulo original de lados 6, 8, 10 (c2, fantasma em k = 1); paralela deslizante formando triângulo menor (c1) com ângulos marcados (c3).
- **Sliders:** `k` · "Escala k" · 0,25..1,5 · passo 0,25 · inicial 1 · c4
- **Paco (abertura):** "Em k = 1 os dois triângulos empatam. Leve k até 0,5: os ângulos mudam ou só os lados encolhem?"
- **Interação do aluno:** move `k` de 1 para 0,5; vê os lados irem a 3, 4 e 5 enquanto os ângulos permanecem idênticos.
- **Conclusão:** `k ≤ 0,5`
- **Paco (conclusão):** "Os ângulos não mudam nada (são correspondentes na paralela), e todos os três lados caem exatamente pela metade."
- **Tati (dúvida):** `fim` — P: "E a área também cai pela metade?" / R: "A área multiplica base e altura, então varia com k² (cai para um quarto). Hoje olhamos só os comprimentos, que seguem k."

### Passo 2 — `teorema-de-tales`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` (modo Tales) — 3 paralelas horizontais cortadas por duas transversais; a esquerda tem pedaços `x` e 4 (c1), a direita tem 3 e 6 (c2).
- **Sliders:** `h_meio` · "Posição da paralela do meio" · 1..5 · passo 1 · inicial 2 · c4
- **Paco (abertura):** "Na transversal da direita, o pedaço de baixo é o dobro do de cima. Mova a paralela do meio: a razão da esquerda acompanha a da direita?"
- **Interação do aluno:** move `h_meio` até 4; vê as duas razões (esquerda e direita) mudarem juntas e sempre empatarem.
- **Conclusão:** `h_meio ≥ 4`
- **Paco (conclusão):** "Empatam sempre: é o teorema de Tales. Paralelas cortam qualquer transversal na mesma proporção."

### Passo 3 — `caso-aa-sombras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` (modo sombras) — bastão de 2 m com sombra 3 m (c2) e poste de altura H com sombra 9 m (c1); raios de sol paralelos (c3). Emite `sobrepos_triangulos`.
- **Sliders:** nenhum
- **Paco (abertura):** "O sol ilumina um bastão de 2 m (sombra 3 m) e um poste (sombra 9 m). Encaixe o triângulo do bastão no do poste: qual a altura do poste?"
- **Interação do aluno:** arrasta o triângulo menor até o canto do maior; vê os ângulos de 90° e do sol coincidirem (AA) e a escala k = 3 revelar H = 6 m.
- **Conclusão:** `sobrepos_triangulos ≥ 1`
- **Paco (conclusão):** "90° e o ângulo do sol são iguais (caso AA). Se a sombra é 3 vezes maior (9 ÷ 3), a altura também é: 2 · 3 = 6 m."

### Passo 4 — `quebra-semelhanca`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `geometria_plana` — permite entortar o corte no triângulo tirando-o do paralelo. Emite `entortou_corte`.
- **Sliders:** `giro` · "Entortar corte" · 0..20 · passo 5 · inicial 0 · c3
- **Paco (abertura):** "E se o corte dentro do triângulo não for paralelo à base? Entorte o corte e compare as razões dos lados."
- **Interação do aluno:** aumenta `giro` para 15; vê os ângulos correspondentes ficarem diferentes e a razão da esquerda diferir da direita.
- **Conclusão:** `giro ≥ 15`
- **Paco (conclusão):** "Sem paralelismo, os ângulos mudam e as razões descolam. Semelhança exige ângulos iguais (AA)."
- **Tati (dúvida):** `fim` — P: "Preciso conferir os 3 ângulos para ter certeza da semelhança?" / R: "Basta conferir 2 ângulos (caso AA): como a soma é 180°, o terceiro já fica igual automaticamente."

### Passo 5 — `desafio-tales`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — três paralelas cortadas por duas transversais: na esquerda segmentos 4 e 6 (c2); na direita segmentos 6 e x (c1).
- **Paco (abertura):** "Monte a proporção entre o pedaço de cima e o de baixo de cada transversal."
- **Enunciado:** "No feixe de paralelas, a transversal da esquerda mede 4 e 6; a da direita mede 6 e x. Quanto vale x?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a9` | 9 | **sim** | "Isso. 4 / 6 = 6 / x, então 4x = 36 e x = 9." | destaca a razão 1,5 nos dois lados e marca x = 9 |
| `a8` | 8 | não | "Você somou 2 (4 + 2 = 6, 6 + 2 = 8). Tales usa multiplicação (proporção): 4/6 = 6/x dá x = 9." | mostra que 4/6 ≠ 6/8 e corrige para 6/9 |
| `a4` | 4 | não | "4 seria se os segmentos de cima fossem iguais. Como 6 é 1,5 vez 4, x = 1,5 · 6 = 9." | destaca a razão 6 / 4 = 1,5 aplicando sobre o 6 |
| `a10` | 10 | não | "10 é a soma 4 + 6. Pela proporção 4 / 6 = 6 / x, temos x = 9." | mostra a conta 4x = 36 ⇒ x = 9 |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — triângulo original (c2) cortado por paralela gerando triângulo semelhante (c1) com ângulos AA (c3) e razão k (c4).
- **Fórmula:** `a′`→c1 · `/` · `a`→c2 · `=` · `b′`→c1 · `/` · `b`→c2 · `=` · `k`→c4
- **Definições:** "Caso AA: dois ângulos iguais garantem triângulos semelhantes." · "Razão k: todos os lados e alturas correspondentes dividem na mesma razão k." · "Teorema de Tales: paralelas cortam transversais em segmentos proporcionais."
- **Paco (abertura):** "A paralela conserva os ângulos de inclinação dos lados, por isso todos os comprimentos crescem ou encolhem na mesma razão k."
- **Dica (hint):** "Toque em cada letra para ver o lado correspondente na figura."

**Frase de encerramento (outro):** "Você deslizou paralelas, descobriu a razão constante k de Tales e usou o caso AA para medir alturas por sombras."

## i) Treino pós-aula

### Fáceis

#### F1 — `razao-de-semelhanca`
- **Enunciado:** "Um triângulo de lados 3, 4 e 5 foi ampliado para um semelhante de lados 6, 8 e 10. Qual foi a razão de semelhança k?"
- **Conta de conferência:** 6 / 3 = 8 / 4 = 10 / 5 = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `k2` | 2 | **sim** | "Isso. Todos os lados dobraram: 6 / 3 = 2." |
| `k3` | 3 | não | "3 é quanto somou no menor lado (3 + 3 = 6). A razão divide: 6 / 3 = 2." |
| `k4` | 4 | não | "4 é k² (razão das áreas). Nos lados a razão é 6 / 3 = 2." |
| `k05` | 0,5 | não | "0,5 é a redução de 6 para 3. Na ampliação de 3 para 6, k = 2." |

#### F2 — `tales-direto`
- **Enunciado:** "Três paralelas cortam duas transversais: na primeira os segmentos medem 2 e 6; na segunda medem 3 e x. Quanto vale x?"
- **Conta de conferência:** 2 / 6 = 3 / x ⇒ x = 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a9` | 9 | **sim** | "Certo. O segmento de baixo é o triplo do de cima: 3 · 3 = 9." |
| `a7` | 7 | não | "Você somou 4 (como em 2 + 4 = 6). Em Tales multiplica-se por 3: 3 · 3 = 9." |
| `a6` | 6 | não | "A razão é 6 / 2 = 3, então x = 3 · 3 = 9." |
| `a1` | 1 | não | "1 seria dividir por 3. O de baixo é 3 vezes maior: x = 9." |

#### F3 — `angulos-na-ampliacao`
- **Enunciado:** "Um triângulo tem ângulos de 40°, 60° e 80°. Se dobrarmos todos os seus lados (k = 2), quanto medirão os novos ângulos?"
- **Conta de conferência:** semelhança preserva os ângulos = 40°, 60° e 80°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `iguais` | 40°, 60° e 80° | **sim** | "Exato. Triângulos semelhantes têm exatamente os mesmos ângulos." |
| `dobro` | 80°, 120° e 160° | não | "Isso somaria 360°! Na semelhança só os lados dobram; os ângulos continuam 40°, 60° e 80°." |
| `metade` | 20°, 30° e 40° | não | "Os ângulos nunca mudam na escala: continuam 40°, 60° e 80°." |
| `retos` | 60°, 60° e 60° | não | "A forma não vira equilátera; mantém os ângulos 40°, 60° e 80°." |

#### F4 — `paralela-no-meio`
- **Enunciado:** "Uma reta paralela à base de 12 cm de um triângulo passa exatamente na metade dos outros dois lados. Quanto mede esse segmento paralelo?"
- **Conta de conferência:** base média ⇒ k = 0,5 ⇒ 12 · 0,5 = 6 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 cm | **sim** | "Isso. Na metade da altura (k = 0,5), o segmento paralelo mede metade da base: 6 cm." |
| `a12` | 12 cm | não | "12 cm é a base inteira. Na metade dos lados, o segmento cai pela metade: 6 cm." |
| `a3` | 3 cm | não | "3 cm seria um quarto. Na metade dos lados (k = 0,5), mede 12 / 2 = 6 cm." |
| `a24` | 24 cm | não | "O triângulo de cima é menor (metade), então mede 12 / 2 = 6 cm." |

### Médias

#### M1 — `sombra-predio`
- **Enunciado:** "No mesmo instante, uma pessoa de 1,8 m projeta sombra de 2 m e um prédio projeta sombra de 10 m. Qual a altura do prédio?"
- **Conta de conferência:** H / 1,8 = 10 / 2 = 5 ⇒ H = 9 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a9` | 9 m | **sim** | "Certo. A sombra é 5 vezes maior (10 / 2), então a altura é 5 · 1,8 = 9 m." |
| `a9-8` | 9,8 m | não | "Você somou 8 m. A relação é proporcional: (10 / 2) · 1,8 = 9 m." |
| `a11-1` | 11,1 m | não | "Você inverteu 2 / 1,8. O certo é H = 1,8 · (10 / 2) = 9 m." |
| `a5` | 5 m | não | "5 é a razão entre as sombras (10 / 2). Multiplicando por 1,8 m dá 9 m." |

#### M2 — `paralela-interna-total`
- **Enunciado:** "No triângulo ABC, DE é paralelo à base BC = 15. Se AD = 2 e DB = 3 (lado AB inteiro vale 5), quanto mede DE?"
- **Fala do Paco:** "Cuidado: compare o lado do triângulo pequeno (AD = 2) com o lado inteiro do grande (AB = 2 + 3 = 5)."
- **Conta de conferência:** DE / 15 = 2 / (2 + 3) = 2 / 5 ⇒ DE = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | **sim** | "Exato. O lado inteiro é 2 + 3 = 5, então DE / 15 = 2 / 5 e DE = 6." |
| `a10` | 10 | não | "10 usa 2 / 3 (só o pedaço de baixo). O lado do triângulo grande é 2 + 3 = 5, dando DE = 6." |
| `a5` | 5 | não | "5 é o lado AB (2 + 3). Pela proporção DE / 15 = 2 / 5, DE vale 6." |
| `a9` | 9 | não | "9 seria usando 3 / 5. O triângulo de cima tem lado AD = 2: (2 / 5) · 15 = 6." |

#### M3 — `perimetro-semelhante`
- **Enunciado:** "Dois triângulos semelhantes têm razão k = 3. Se o perímetro do menor é 14 cm, qual é o perímetro do maior?"
- **Conta de conferência:** se cada lado multiplica por 3, a soma dos lados multiplica por 3 ⇒ 14 · 3 = 42 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a42` | 42 cm | **sim** | "Isso. Como cada lado triplica, o perímetro também triplica: 14 · 3 = 42 cm." |
| `a126` | 126 cm | não | "126 é 14 · 9 (usando k²). O perímetro é comprimento linear, então multiplica por k = 3: 42 cm." |
| `a17` | 17 cm | não | "A escala multiplica por 3, não soma 3: 14 · 3 = 42 cm." |
| `a28` | 28 cm | não | "28 seria o dobro. Com k = 3, o perímetro vale 14 · 3 = 42 cm." |

### Desafios

#### D1 — `tales-decimal`
- **Enunciado:** "Três paralelas cortam duas transversais: na esquerda os pedaços medem 2 e 3; na direita medem 3 e x. Quanto vale x?"
- **Conta de conferência:** 2 / 3 = 3 / x ⇒ 2x = 9 ⇒ x = 4,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4-5` | 4,5 | **sim** | "Certo. 2 / 3 = 3 / x dá 2x = 9, portanto x = 4,5." |
| `a4` | 4 | não | "4 vem de somar 1 (2 + 1 = 3, 3 + 1 = 4). Em Tales, 3 · (3 / 2) = 4,5." |
| `a2` | 2 | não | "Você inverteu a fração (3 · 2/3). Como o de baixo é maior, x = 3 · 1,5 = 4,5." |
| `a6` | 6 | não | "A razão é 3 / 2 = 1,5, não 2. Multiplicando 3 por 1,5 dá 4,5." |

#### D2 — `ampulheta-alternos`
- **Enunciado:** "Duas paralelas AB = 4 e CD = 10 são ligadas por AD e BC que se cruzam em O (formato de ampulheta). Se AO = 2, quanto mede OD?"
- **Fala do Paco:** "Os alternos internos e o oposto pelo vértice fazem os dois triângulos da ampulheta serem semelhantes."
- **Conta de conferência:** OD / AO = CD / AB ⇒ OD / 2 = 10 / 4 = 2,5 ⇒ OD = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Exato. A razão entre as bases é 10 / 4 = 2,5, então OD = 2 · 2,5 = 5." |
| `a8` | 8 | não | "Você somou 6 (como de 4 para 10). Na semelhança multiplica-se por 10 / 4 = 2,5: OD = 5." |
| `a4` | 4 | não | "A razão das bases é 10 / 4 = 2,5, não 2. Portanto OD = 2 · 2,5 = 5." |
| `a7` | 7 | não | "7 seria a soma AO + OD final. O segmento OD sozinho mede 2 · (10 / 4) = 5." |

#### D3 — `quadrado-inscrito`
- **Enunciado:** "Num triângulo retângulo de catetos 6 e 6, inscreve-se um quadrado apoiado nos dois catetos. Quanto mede o lado x desse quadrado?"
- **Fala do Paco:** "O triângulo menor que sobra em cima do quadrado tem base x e altura 6 − x."
- **Conta de conferência:** (6 − x) / 6 = x / 6 ⇒ 6 − x = x ⇒ 2x = 6 ⇒ x = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. Por semelhança, (6 − x) / 6 = x / 6, logo 6 − x = x e x = 3." |
| `a2` | 2 | não | "Com x = 2 sobraria altura 4 em cima (não seria quadrado). A proporção (6 − x)/6 = x/6 dá x = 3." |
| `a4` | 4 | não | "Com x = 4 a altura restante seria 2. O equilíbrio (6 − x) = x acontece em x = 3." |
| `a1-5` | 1,5 | não | "Como os catetos são iguais a 6, o quadrado pega exatamente a metade: x = 3." |

#### D4 — `rampa-altura-intermediaria`
- **Enunciado:** "Uma rampa reta sobe 3 m de altura ao longo de 12 m horizontais. A que altura ela está após percorrer 4 m horizontais?"
- **Conta de conferência:** h / 3 = 4 / 12 = 1 / 3 ⇒ h = 1 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1` | 1 m | **sim** | "Certo. 4 m é um terço de 12 m, então a altura também é um terço de 3 m: 1 m." |
| `a1-5` | 1,5 m | não | "1,5 m é a metade (em 6 m horizontais). Em 4 m (um terço), a altura é 1 m." |
| `a0-75` | 0,75 m | não | "0,75 m seria um quarto (em 3 m horizontais). Em 4 de 12, vale 3 · (4 / 12) = 1 m." |
| `a2` | 2 m | não | "2 m de altura acontece em 8 m horizontais. Em 4 m, a altura é 1 m." |

#### D5 — `trapezio-base-intermediaria`
- **Enunciado:** "Três terrenos entre ruas paralelas têm frentes de 10 m, 15 m e 25 m na Rua A. Se o fundo total na Rua B tem 60 m, qual o fundo do maior?"
- **Fala do Paco:** "Use a soma das frentes na Rua A (10 + 15 + 25) para achar a razão entre a Rua B e a Rua A."
- **Conta de conferência:** soma A = 10 + 15 + 25 = 50 m; razão B/A = 60 / 50 = 1,2 ⇒ maior = 25 · 1,2 = 30 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a30` | 30 m | **sim** | "Exato. O total em A é 50 m; como 25 m é metade de 50 m, na Rua B leva metade de 60 m: 30 m." |
| `a25` | 25 m | não | "25 m é na Rua A. Na Rua B o total é 60 m (1,2 vez maior): 25 · 1,2 = 30 m." |
| `a35` | 35 m | não | "Os 10 m extras (60 − 50) se dividem proporcionalmente, não vão todos para um lote: dá 30 m." |
| `a20` | 20 m | não | "20 m seria dividir 60 por 3 lotes iguais. O maior tem metade da frente (25/50), logo 30 m." |

### Vestibular

#### V1 — ENEM 2009 — Questão 154
- **Habilidade-alvo:** calcular altura inacessível (prédio, árvore, poste) por semelhança de triângulos com sombras.
- **Onde procurar:** ENEM, Vunesp, UERJ, Unicamp.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar o teorema de Tales em loteamentos com ruas paralelas e avenidas transversais.
- **Onde procurar:** ENEM, Fuvest, UFPR, UFRGS.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** usar semelhança de triângulos para inscrever retângulo ou quadrado dentro de um triângulo.
- **Onde procurar:** Fuvest, Unicamp, FGV, Mackenzie.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** relacionar escalas e comprimentos em triângulos semelhantes formados por cruzamento de segmentos (ampulheta).
- **Onde procurar:** ENEM, OBMEP, EPCAR, Unesp.
