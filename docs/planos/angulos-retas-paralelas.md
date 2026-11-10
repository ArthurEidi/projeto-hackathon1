# Plano — Ângulos, retas paralelas e transversais

**Aula:** 1 — Uma Transversal, Dois Valores · Correspondentes, alternos e suplementares
**Caminho:** geometria / geometria-plana / angulos-retas-paralelas
**Pré-requisitos que o aluno já domina:** conjuntos-e-intervalos.

## a) Ancoragem mecânica
A máquina gira uma reta transversal sobre duas retas paralelas fixas. A entrada é o giro da transversal (o ângulo agudo α); a saída são os 8 ângulos formados nos dois cruzamentos, que assumem apenas dois valores: α ou 180° − α.

## b) Visual de partida
WIDGET NOVO `geometria_plana` em modo paralelas: duas retas horizontais paralelas r e s cortadas por uma transversal t arrastável. Os 8 ângulos aparecem coloridos em dois grupos (c1 para α e c2 para 180° − α), com slider de α de 30° a 150°.

## c) Caso neutro
Quando a transversal corta as paralelas em pé (α = 90°), todos os 8 ângulos são retos e iguais a 90°. Inclinar a transversal separa os 8 ângulos em 4 agudos iguais e 4 obtusos iguais.

## d) Panorama e recorte
Existem ângulos em polígonos, círculos e retas reversas no espaço. Aqui olhamos o cruzamento de retas no plano: opostos pelo vértice, suplementares e os pares em retas paralelas (correspondentes, alternos e colaterais).

## e) Progressão por contraste
1. Transversal perpendicular (α = 90°): os 8 ângulos empatam em 90° (referência).
2. Duas retas que se cruzam: opostos pelo vértice são iguais (α) e vizinhos somam 180° (suplementares).
3. Deslizar o cruzamento até a segunda paralela: ângulos correspondentes coincidem.
4. Cruzamento de lados entre as paralelas: alternos internos são iguais e colaterais internos somam 180°.

## f) Dedução causal da forma
Uma meia-volta sobre uma reta mede 180°; se um lado vale α, o vizinho vale 180° − α, e o oposto pelo vértice volta a valer α. Como a segunda reta tem a mesma direção da primeira, a transversal a corta com a mesma inclinação, por isso os correspondentes e os alternos internos valem α.

## g) Simulação espacial e fronteiras
Quando α = 0° ou 180°, a transversal fica paralela às outras e o cruzamento some. Se a segunda reta deixa de ser paralela, os ângulos correspondentes deixam de ser iguais e as duas retas se encontram num ponto.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Ângulo α | Abertura aguda ou escolhida entre a transversal e a paralela. |
| c2 | Suplementar (180° − α) | O que falta em α para completar meia-volta (180°). |
| c3 | Correspondentes | Par na mesma posição relativa nos dois cruzamentos; são iguais. |
| c4 | Alternos internos | Par entre as paralelas em lados opostos da transversal; são iguais. |

### Passo 1 — `cruzamento-reto`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `geometria_plana` (modo paralelas) — paralelas r e s cortadas por transversal t; começa em α = 90° (fantasma reto); destaca c1 (α) e c2 (180° − α). Emite `inclinou`.
- **Sliders:** `alfa` · "Inclinação α" · 30..150 · passo 10 · inicial 90 · c1
- **Paco (abertura):** "Em 90°, todos os 8 ângulos empatam. Incline a transversal: quantos valores diferentes aparecem nos 8 cantos?"
- **Interação do aluno:** move o slider `alfa` tirando de 90°; vê 4 ângulos ficarem em c1 (α) e 4 em c2 (180° − α).
- **Conclusão:** `inclinou ≥ 1`
- **Paco (conclusão):** "Só dois valores: α e 180° − α. Em qualquer inclinação, quatro cantos valem α e os outros quatro completam 180°."
- **Tati (dúvida):** `fim` — P: "A geometria só estuda retas assim?" / R: "Não: veremos triângulos, polígonos e círculos. Mas todos eles usam esses ângulos entre retas como base."

### Passo 2 — `opostos-e-suplementares`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` — foco em um cruzamento só; arco de meia-volta (180°) visível; opostos pelo vértice em c1 e vizinhos em c2.
- **Sliders:** `alfa` · "Ângulo α" · 30..150 · passo 10 · inicial 60 · c1
- **Paco (abertura):** "Olhe um cruzamento só. Leve α até 70°: quanto vale o vizinho que completa a meia-volta e quanto vale o oposto?"
- **Interação do aluno:** ajusta `alfa` para 70° e observa o vizinho marcar 110° e o oposto marcar 70°.
- **Conclusão:** `alfa ≥ 70`
- **Paco (conclusão):** "O vizinho vale 110° porque meia-volta tem 180°. E o oposto pelo vértice também completa 180° com 110°, então volta a ser 70°."

### Passo 3 — `correspondentes-e-alternos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` — paralelas r e s; botão/arraste desliza a cópia do cruzamento de r até s (c3 correspondentes) e destaca o Z dos alternos internos (c4). Emite `deslizou_paralela`.
- **Sliders:** nenhum
- **Paco (abertura):** "Deslize o cruzamento de cima até a paralela de baixo. O que acontece com os ângulos na mesma posição?"
- **Interação do aluno:** arrasta o cruzamento ao longo da transversal até encaixar na segunda paralela e ativa o destaque dos alternos internos.
- **Conclusão:** `deslizou_paralela ≥ 1`
- **Paco (conclusão):** "Encaixam certinho: são os correspondentes. E trocando para o oposto pelo vértice, os alternos internos também ficam iguais."

### Passo 4 — `quebrar-paralelismo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `geometria_plana` — permite girar a reta s num ângulo Δ em relação a r. Emite `desvio_paralela`.
- **Sliders:** `desvio` · "Inclinar reta s" · −20..20 · passo 5 · inicial 0 · c3
- **Paco (abertura):** "E se a reta de baixo não for paralela à de cima? Incline a reta s e veja se os correspondentes continuam iguais."
- **Interação do aluno:** muda `desvio` de 0 para outro valor; os correspondentes mostram valores diferentes e o ponto de encontro das retas aparece.
- **Conclusão:** `desvio ≥ 10`
- **Paco (conclusão):** "Sem paralelismo, os correspondentes mudam e as retas se cruzam. Igualdade dos correspondentes é a marca registrada das paralelas."
- **Tati (dúvida):** `fim` — P: "E se a transversal girar até ficar em cima das paralelas?" / R: "Em 0° ou 180° ela vira paralela também: deixa de ser transversal e nenhum ângulo se forma."

### Passo 5 — `desafio-colaterais`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `geometria_plana_figura` — duas paralelas cortadas por transversal; um ângulo interno vale 65° (c1) e o colateral interno do mesmo lado é x (c2).
- **Paco (abertura):** "Repare se o ângulo x é igual ao de 65° ou se completa meia-volta com o correspondente dele."
- **Enunciado:** "Nas paralelas abaixo, um ângulo interno mede 65°. Quanto mede x, do mesmo lado da transversal entre as paralelas?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a115` | 115° | **sim** | "Isso. Colaterais internos são suplementares: 180° − 65° = 115°." | desliza o 65° para baixo e mostra o arco de 180° com x = 115° |
| `a65` | 65° | não | "65° seria o alterno interno, do outro lado. Do mesmo lado soma 180°: x = 115°." | destaca o alterno interno de 65° em c4 e mostra que x é vizinho dele |
| `a25` | 25° | não | "25° soma 90° (complementar). Na reta a meia-volta é 180°: 180° − 65° = 115°." | desenha o arco de meia-volta (180°) sobre a paralela |
| `a125` | 125° | não | "Confira a subtração: 180° − 65° = 115°, não 125°." | mostra a conta 180° − 65° = 115° no cruzamento |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — paralelas r e s com transversal t marcando α (c1), suplementar 180° − α (c2), correspondente (c3) e alterno interno (c4).
- **Fórmula:** `α`→c1 · `+` · `β`→c2 · `=` · `180°` · `;` · `α`→c3 · `=` · `α`→c4
- **Definições:** "Suplementares: dois ângulos que juntos formam meia-volta (180°)." · "Correspondentes e alternos internos: têm a mesma medida (α)." · "Colaterais internos: ficam do mesmo lado e somam 180°."
- **Paco (abertura):** "A segunda paralela tem a mesma direção da primeira, por isso a transversal repete nela os mesmos ângulos α e 180° − α."
- **Dica (hint):** "Toque em cada cor para destacar o par de ângulos nas paralelas."

**Frase de encerramento (outro):** "Você inclinou a transversal sobre as paralelas e viu que todos os 8 ângulos se resumem a α e 180° − α."

## i) Treino pós-aula

### Fáceis

#### F1 — `oposto-pelo-vertice`
- **Enunciado:** "Duas retas se cruzam e um dos ângulos mede 50°. Quanto mede o ângulo oposto pelo vértice a ele?"
- **Conta de conferência:** opostos pelo vértice são iguais = 50°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a50` | 50° | **sim** | "Isso. Ângulos opostos pelo vértice têm sempre a mesma medida." |
| `a130` | 130° | não | "130° é o vizinho (suplementar). O oposto pelo vértice é igual: 50°." |
| `a40` | 40° | não | "40° seria o complementar (90° − 50°). O oposto pelo vértice vale 50°." |
| `a100` | 100° | não | "O oposto pelo vértice não dobra; ele tem a mesma abertura: 50°." |

#### F2 — `suplemento-de-70`
- **Enunciado:** "Dois ângulos vizinhos sobre uma mesma reta são suplementares. Se um mede 70°, quanto mede o outro?"
- **Conta de conferência:** 180° − 70° = 110°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a110` | 110° | **sim** | "Certo. Juntos eles formam meia-volta: 180° − 70° = 110°." |
| `a20` | 20° | não | "20° completa 90° (complementar). Para meia-volta (180°), faltam 110°." |
| `a70` | 70° | não | "70° é o oposto pelo vértice. O vizinho completa 180°: mede 110°." |
| `a290` | 290° | não | "290° completa 360°. Meia-volta tem 180°: 180° − 70° = 110°." |

#### F3 — `correspondente-paralelas`
- **Enunciado:** "Uma transversal corta duas paralelas formando 60° no canto superior direito de cima. Quanto mede o canto superior direito de baixo?"
- **Conta de conferência:** correspondentes são iguais = 60°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a60` | 60° | **sim** | "Exato. Estão na mesma posição (correspondentes), então medem 60°." |
| `a120` | 120° | não | "120° é o suplementar ao lado. Na mesma posição (correspondente) mede 60°." |
| `a30` | 30° | não | "As paralelas têm a mesma direção; o correspondente mantém 60°." |
| `a90` | 90° | não | "A transversal está inclinada em 60°, então o correspondente também vale 60°." |

#### F4 — `alterno-interno-110`
- **Enunciado:** "Duas retas paralelas são cortadas por uma transversal. Se um ângulo interno mede 110°, quanto mede seu alterno interno?"
- **Conta de conferência:** alternos internos são iguais = 110°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a110` | 110° | **sim** | "Isso. Alternos internos em retas paralelas são sempre iguais: 110°." |
| `a70` | 70° | não | "70° é o colateral interno (mesmo lado). O alterno interno é igual: 110°." |
| `a55` | 55° | não | "A transversal não divide o ângulo ao meio; o alterno interno vale 110°." |
| `a90` | 90° | não | "Alternos internos têm a mesma medida: 110°." |

### Médias

#### M1 — `complemento-vs-suplemento`
- **Enunciado:** "Um ângulo mede 35°. Quanto valem, nessa ordem, o seu complemento (soma 90°) e o seu suplemento (soma 180°)?"
- **Conta de conferência:** 90° − 35° = 55°; 180° − 35° = 145°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c55s145` | 55° e 145° | **sim** | "Certo. 90° − 35° = 55° e 180° − 35° = 145°." |
| `c145s55` | 145° e 55° | não | "Você inverteu: complemento soma 90° (55°) e suplemento soma 180° (145°)." |
| `c65s155` | 65° e 155° | não | "Cuidado na conta: 90° − 35° = 55° e 180° − 35° = 145°." |
| `c55s135` | 55° e 135° | não | "O suplemento é 180° − 35° = 145°, então fica 55° e 145°." |

#### M2 — `equacao-alternos`
- **Enunciado:** "Em duas paralelas cortadas por uma transversal, os alternos internos medem 2x + 10° e 70°. Quanto vale x?"
- **Conta de conferência:** 2x + 10 = 70 ⇒ 2x = 60 ⇒ x = 30°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a30` | 30° | **sim** | "Exato. Como são iguais, 2x + 10° = 70°, logo 2x = 60° e x = 30°." |
| `a40` | 40° | não | "Você somou 10° em vez de subtrair: 2x = 70° − 10° = 60°, então x = 30°." |
| `a50` | 50° | não | "50° vem de somar 180° (colaterais). Alternos são iguais: 2x + 10° = 70°, x = 30°." |
| `a60` | 60° | não | "60° é o valor de 2x. Dividindo por 2, x = 30°." |

#### M3 — `equacao-colaterais`
- **Enunciado:** "Dois ângulos colaterais internos entre paralelas medem x e 3x. Quanto mede o menor deles?"
- **Conta de conferência:** x + 3x = 180° ⇒ 4x = 180° ⇒ x = 45°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a45` | 45° | **sim** | "Isso. Colaterais internos somam 180°: x + 3x = 180°, então x = 45°." |
| `a135` | 135° | não | "135° é o maior (3x). O menor é x = 180° / 4 = 45°." |
| `a60` | 60° | não | "São x + 3x = 4x, não 3x. Dividindo 180° por 4, o menor mede 45°." |
| `a22-5` | 22,5° | não | "Colaterais somam 180°, não 90°: 4x = 180° dá x = 45°." |

### Desafios

#### D1 — `bissetriz-suplementares`
- **Enunciado:** "Dois ângulos vizinhos numa reta medem 40° e 140°. Qual é o ângulo entre as bissetrizes (metades) desses dois ângulos?"
- **Conta de conferência:** 40°/2 + 140°/2 = 20° + 70° = 90°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a90` | 90° | **sim** | "Certo. Metade de 40° mais metade de 140° dá 20° + 70° = 90°." |
| `a70` | 70° | não | "70° é só a metade de 140°. Somando a metade de 40° (20°), dá 90°." |
| `a100` | 100° | não | "100° é a diferença 140° − 40°. Entre as bissetrizes soma-se 20° + 70° = 90°." |
| `a180` | 180° | não | "180° é a soma inteira. As metades somam metade de 180°: 90°." |

#### D2 — `bico-entre-paralelas`
- **Enunciado:** "Entre duas paralelas, duas semirretas saem uma de cada paralela (a 30° e a 45°) e se encontram no meio. Qual o ângulo do bico?"
- **Fala do Paco:** "Passe uma terceira paralela bem na ponta do bico e use os alternos internos."
- **Conta de conferência:** 30° + 45° = 75°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a75` | 75° | **sim** | "Exato. A paralela no bico copia 30° de um lado e 45° do outro: 30° + 45° = 75°." |
| `a105` | 105° | não | "105° é o suplemento de 75°. O bico soma os dois alternos internos: 30° + 45° = 75°." |
| `a15` | 15° | não | "Os dois lados do bico se somam na paralela central, não se subtraem: 30° + 45° = 75°." |
| `a37-5` | 37,5° | não | "Não é a média; a paralela auxiliar soma os dois alternos: 30° + 45° = 75°." |

#### D3 — `suplemento-decimal`
- **Enunciado:** "Em duas paralelas, um ângulo agudo mede 52,5°. Quanto mede o ângulo obtuso suplementar a ele?"
- **Conta de conferência:** 180° − 52,5° = 127,5°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a127-5` | 127,5° | **sim** | "Isso. 180° − 52,5° = 127,5°." |
| `a128-5` | 128,5° | não | "Ao tirar 0,5°, 180° − 52° = 128° vira 127,5°, não 128,5°." |
| `a37-5` | 37,5° | não | "37,5° é o complemento (90° − 52,5°). O suplemento é 180° − 52,5° = 127,5°." |
| `a52-5` | 52,5° | não | "52,5° é o correspondente agudo. O obtuso suplementar vale 180° − 52,5° = 127,5°." |

#### D4 — `teste-de-paralelismo`
- **Enunciado:** "Uma transversal corta r a 80° e s a 82° na posição correspondente. O que acontece com as retas r e s?"
- **Conta de conferência:** 80° ≠ 82° ⇒ não são paralelas, logo se cruzam

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `cruzam` | Elas se cruzam | **sim** | "Certo. Como 80° ≠ 82°, elas não são paralelas e vão se encontrar." |
| `paralelas` | São paralelas | não | "Para serem paralelas, os correspondentes precisariam ser iguais; como 80° ≠ 82°, elas se cruzam." |
| `perpend` | São perpendiculares | não | "Elas diferem em apenas 2°; não formam 90°, mas se cruzam lá na frente." |
| `coincid` | São a mesma reta | não | "Com inclinações diferentes (80° e 82°), são retas distintas que se cruzam." |

#### D5 — `tres-paralelas-bissetriz`
- **Enunciado:** "Duas paralelas têm colaterais internos na razão 2 para 3. Quanto mede o maior deles?"
- **Fala do Paco:** "Colaterais internos somam 180°: divida 180° em 2 + 3 = 5 partes iguais."
- **Conta de conferência:** 180° / 5 = 36° por parte ⇒ maior = 3 · 36° = 108°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a108` | 108° | **sim** | "Exato. 2x + 3x = 180° dá x = 36°, e o maior vale 3 · 36° = 108°." |
| `a72` | 72° | não | "72° é o menor (2 · 36°). O maior tem 3 partes: 3 · 36° = 108°." |
| `a36` | 36° | não | "36° é o valor de uma parte (x). O maior ângulo vale 3x = 108°." |
| `a120` | 120° | não | "São 2 + 3 = 5 partes, não 3. Cada parte vale 36° e o maior mede 108°." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** identificar ângulos correspondentes e suplementares em cruzamento de ruas ou feixes paralelos.
- **Onde procurar:** ENEM, OBMEP (questões de mapas de ruas paralelas cortadas por avenida transversal).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular ângulo em linha quebrada ("bico" ou zigue-zague) entre duas retas paralelas.
- **Onde procurar:** Fuvest, Unicamp, UERJ, Mackenzie.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** equacionar ângulos alternos internos ou colaterais internos com incógnita.
- **Onde procurar:** IFSP,ETEC, UTFPR, vestibulares estaduais.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** combinar bissetriz com ângulos suplementares e paralelas.
- **Onde procurar:** EPCAR, Colégio Naval, FGV, Vunesp.
