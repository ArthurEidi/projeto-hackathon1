# Plano — Triângulos, congruência e propriedades

**Aula:** 1 — Três Cantos Travados em 180° · Soma interna, ângulo externo, lados e congruência
**Caminho:** geometria / geometria-plana / triangulos-congruencia-e-propriedades
**Pré-requisitos que o aluno já domina:** angulos-retas-paralelas.

## a) Ancoragem mecânica
A máquina move os vértices de um triângulo e atualiza seus três lados e três ângulos internos. Uma paralela auxiliar passa pelo vértice do topo e junta os três ângulos internos numa meia-volta fixa de 180°, enquanto o ângulo externo num vértice soma os dois internos de fora.

## b) Visual de partida
WIDGET NOVO `geometria_plana` em modo triângulo: triângulo ABC com vértice A arrastável, uma reta paralela à base BC passando por A, e os três ângulos internos pintados em c1, c2 e c3 encaixando na meia-volta no topo. Inclui modo de fechar 3 barras (desigualdade triangular) e carimbos de congruência (LAL, LLL, ALA).

## c) Caso neutro
O triângulo equilátero (três lados iguais e três ângulos de 60°) é a partida simétrica: 60° + 60° + 60° = 180°. Mover um vértice deforma os lados e redistribui os ângulos (isósceles, escaleno, retângulo), mas a soma continua cravada em 180°.

## d) Panorama e recorte
Existem polígonos de muitos lados, semelhança e trigonometria. Aqui estudamos um triângulo só e quando dois triângulos são cópias exatas (congruência): soma de 180°, ângulo externo, condição para os lados fecharem e casos LAL, LLL e ALA.

## e) Progressão por contraste
1. Triângulo equilátero (60°, 60°, 60°): simetria total somando 180° (referência).
2. Deformar o vértice com a paralela auxiliar ligada: α e β sobem como alternos internos e somam 180° com γ em qualquer formato.
3. Esticar a base para fora: o ângulo externo e = α + β, pois ambos completam 180° com γ.
4. Barras de comprimentos variáveis e cópia rígida: quando os 3 lados fecham (a < b + c) e quantas medidas travam o triângulo (LAL, LLL, ALA).

## f) Dedução causal da forma
Passando pelo vértice do topo uma reta paralela à base, os dois ângulos da base (α e β) reaparecem no topo como alternos internos ao lado de γ. Os três juntos formam meia-volta sobre a paralela, por isso α + β + γ = 180° sempre, e o suplementar de γ (o ângulo externo) vale obrigatoriamente α + β.

## g) Simulação espacial e fronteiras
Quando a soma de dois lados empata com o terceiro (b + c = a), o triângulo achata numa linha (ângulos 0°, 0° e 180°); se b + c < a, as pontas não se alcançam. Além disso, dar só os 3 ângulos (AAA) não trava o tamanho do triângulo.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Ângulos da base (α e β) | Sobem até a paralela do topo como alternos internos. |
| c2 | Ângulo do topo (γ) | Junta-se a α e β na meia-volta para somar 180°. |
| c3 | Ângulo externo (e) | Suplementar do interno ao lado; vale a soma dos outros dois (α + β). |
| c4 | Lados e congruência | Três barras que só fecham se cada uma for menor que a soma das outras duas. |

### Passo 1 — `soma-180-paralela`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama), 6
- **Widget:** WIDGET NOVO `geometria_plana` (modo triângulo) — começa no equilátero 60°-60°-60° (fantasma); vértice do topo arrastável; paralela à base no topo mostrando os alternos internos α e β (c1) ao lado de γ (c2). Emite `vertices_movidos`.
- **Sliders:** nenhum
- **Paco (abertura):** "No equilátero, três de 60° somam 180°. Arraste o vértice do topo: a soma dos três ângulos muda ou fica travada?"
- **Interação do aluno:** arrasta o vértice; α, β e γ mudam de valor, mas os três arcos no topo sempre preenchem a meia-volta de 180°.
- **Conclusão:** `vertices_movidos ≥ 3`
- **Paco (conclusão):** "Fica travada em 180°. A paralela no topo traz os ângulos da base como alternos internos, formando meia-volta."
- **Tati (dúvida):** `fim` — P: "Em figuras de 4 ou 5 lados a soma também é 180°?" / R: "Não: cada lado extra adiciona um triângulo e mais 180°. Hoje dominamos o bloco básico: o triângulo."

### Passo 2 — `angulo-externo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` — prolonga a base além de γ; mostra o ângulo externo `e` (c3) dividido em duas fatias iguais a α e β (c1).
- **Sliders:** `alfa` · "Ângulo α" · 20..80 · passo 10 · inicial 50 · c1
- **Paco (abertura):** "O ângulo externo e o interno γ formam meia-volta (180°). Mude α para 70° (com β = 40°): quanto vale o externo e?"
- **Interação do aluno:** move `alfa` até 70°; vê γ cair para 70° e o externo `e` marcar 110° = 70° + 40°.
- **Conclusão:** `alfa ≥ 70`
- **Paco (conclusão):** "Vale 110°, exatamente 70° + 40°. Como tanto o externo quanto α + β completam 180° com γ, o externo é sempre α + β."

### Passo 3 — `desigualdade-triangular`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `geometria_plana` (modo barras) — base fixa a = 8 (c4) e dois braços articulados b = 5 e c variável; mostra se as pontas se alcançam.
- **Sliders:** `c` · "Lado c" · 1..7 · passo 1 · inicial 6 · c4
- **Paco (abertura):** "A base mede 8 e um braço mede 5. Diminua o outro braço c até 2: o triângulo ainda consegue fechar?"
- **Interação do aluno:** reduz `c` de 6 até 2; em c = 3 o triângulo achata sobre a base, e em c = 2 abre um vão entre as pontas.
- **Conclusão:** `c ≤ 2`
- **Paco (conclusão):** "Não fecha: 5 + 2 = 7, que não alcança 8. O caminho reto é o mais curto, então dois lados juntos precisam passar do terceiro."

### Passo 4 — `congruencia-travar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 7 (fronteira AAA vs LLL/LAL/ALA)
- **Widget:** `geometria_plana` (modo congruência) — chaves para testar LLL, LAL, ALA e AAA num triângulo cópia. Emite `testou_congruencia`.
- **Sliders:** nenhum
- **Paco (abertura):** "Para garantir que dois triângulos são cópias exatas, basta ter os 3 ângulos iguais? Teste AAA contra LLL, LAL e ALA."
- **Interação do aluno:** toca nos 4 cartões; LLL, LAL e ALA travam o triângulo sem folga, mas AAA permite encolher e esticar.
- **Conclusão:** `testou_congruencia ≥ 4`
- **Paco (conclusão):** "Três lados (LLL), dois lados e o ângulo no meio (LAL) ou um lado e dois ângulos (ALA) travam tudo. Só ângulos (AAA) mudam o tamanho."
- **Tati (dúvida):** `fim` — P: "E no triângulo isósceles, com dois lados iguais?" / R: "Se dois lados são iguais, os dois ângulos opostos a eles na base também são iguais."

### Passo 5 — `desafio-isosceles-externo`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — triângulo isósceles com dois lados iguais marcados (c4) e ângulo do topo γ = 40° (c2); pede um ângulo da base x (c1).
- **Paco (abertura):** "Lembre que os três somam 180° e que os dois ângulos da base do isósceles são iguais."
- **Enunciado:** "Num triângulo isósceles, o ângulo do topo entre os lados iguais mede 40°. Quanto mede cada ângulo da base?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a70` | 70° | **sim** | "Isso. Faltam 180° − 40° = 140°, divididos igualmente nos dois da base: 70° cada." | marca 70° e 70° na base e soma 40° + 70° + 70° = 180° |
| `a140` | 140° | não | "140° é a soma dos dois da base. Como são iguais, cada um mede 140° / 2 = 70°." | destaca os dois ângulos da base juntos somando 140° |
| `a40` | 40° | não | "Três de 40° somariam 120°, não 180°. Na base cada um mede (180° − 40°) / 2 = 70°." | mostra que 40° + 40° + 40° = 120° deixa faltar 60° |
| `a50` | 50° | não | "50° + 50° + 40° dá 140°. Para fechar 180°, cada ângulo da base mede 70°." | mostra a soma 180° − 40° = 140° dividida por 2 = 70° |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — triângulo com paralela no topo mostrando α, β (c1), γ (c2) e o externo e = α + β (c3), mais lados (c4).
- **Fórmula:** `α + β`→c1 · `+` · `γ`→c2 · `=` · `180°` · `;` · `e`→c3 · `=` · `α + β`→c1
- **Definições:** "Soma interna: os 3 ângulos internos de qualquer triângulo somam 180°." · "Desigualdade triangular: cada lado é menor que a soma dos outros dois." · "Congruência: LLL, LAL e ALA garantem triângulos idênticos."
- **Paco (abertura):** "A paralela no topo junta os três ângulos internos numa meia-volta, por isso a soma dá sempre 180° e o externo vale a soma dos outros dois."
- **Dica (hint):** "Toque nos símbolos da fórmula para ver cada parte no triângulo."

**Frase de encerramento (outro):** "Você provou por que os ângulos do triângulo somam 180°, testou quando três lados fecham e travou cópias por congruência."

## i) Treino pós-aula

### Fáceis

#### F1 — `terceiro-angulo`
- **Enunciado:** "Dois ângulos internos de um triângulo medem 50° e 60°. Quanto mede o terceiro ângulo?"
- **Conta de conferência:** 180° − (50° + 60°) = 70°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a70` | 70° | **sim** | "Isso. 50° + 60° = 110°, e para 180° faltam 70°." |
| `a110` | 110° | não | "110° é a soma dos dois primeiros (e o ângulo externo). O interno restante é 180° − 110° = 70°." |
| `a80` | 80° | não | "50° + 60° + 80° passaria de 180° (dá 190°). O terceiro mede 70°." |
| `a90` | 90° | não | "A soma precisa dar 180°: 180° − 110° = 70°." |

#### F2 — `externo-direto`
- **Enunciado:** "Num triângulo, dois ângulos internos medem 45° e 35°. Quanto mede o ângulo externo ao terceiro vértice?"
- **Conta de conferência:** e = 45° + 35° = 80°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a80` | 80° | **sim** | "Certo. O ângulo externo é a soma dos dois internos não adjacentes: 45° + 35° = 80°." |
| `a100` | 100° | não | "100° é o terceiro ângulo interno (180° − 80°). O externo vale 45° + 35° = 80°." |
| `a10` | 10° | não | "10° é a diferença. O ângulo externo soma os dois internos: 45° + 35° = 80°." |
| `a135` | 135° | não | "135° é o externo ao de 45°. No terceiro vértice, o externo mede 45° + 35° = 80°." |

#### F3 — `lados-que-fecham`
- **Enunciado:** "Qual destes trios de medidas pode formar os lados de um triângulo?"
- **Conta de conferência:** 3 + 4 = 7 > 5 (fecha); nos outros a soma dos menores ≤ maior

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t345` | 3, 4 e 5 | **sim** | "Exato. 3 + 4 = 7, que é maior que 5, então os lados se alcançam." |
| `t236` | 2, 3 e 6 | não | "2 + 3 = 5, que é menor que 6: as pontas não se alcançam. Quem fecha é 3, 4 e 5." |
| `t123` | 1, 2 e 3 | não | "1 + 2 = 3 empata com o terceiro lado e achata numa linha. Quem fecha é 3, 4 e 5." |
| `t225` | 2, 2 e 5 | não | "2 + 2 = 4 < 5, não fecha. O trio que forma triângulo é 3, 4 e 5." |

#### F4 — `caso-congruencia-lal`
- **Enunciado:** "Dois triângulos têm lados de 5 cm e 7 cm e o ângulo de 60° entre eles. Eles são congruentes por qual caso?"
- **Conta de conferência:** dois lados e o ângulo compreendido = LAL

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `lal` | LAL | **sim** | "Isso. Dois Lados e o Ângulo entre eles: caso LAL." |
| `lll` | LLL | não | "LLL usa os três lados. Com dois lados e o ângulo do meio, o caso é LAL." |
| `ala` | ALA | não | "ALA usa dois ângulos e um lado. Aqui temos dois lados e um ângulo: LAL." |
| `aaa` | AAA | não | "AAA nem garante congruência (muda o tamanho). Aqui o caso é LAL." |

### Médias

#### M1 — `isosceles-topo`
- **Enunciado:** "Um triângulo isósceles tem os dois ângulos da base medindo 65° cada. Quanto mede o ângulo do vértice do topo?"
- **Conta de conferência:** 180° − 2 · 65° = 180° − 130° = 50°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a50` | 50° | **sim** | "Certo. Os dois da base somam 130°, e 180° − 130° = 50°." |
| `a65` | 65° | não | "65° é cada ângulo da base. No topo sobra 180° − 130° = 50°." |
| `a115` | 115° | não | "Você tirou um 65° só (180° − 65°). São dois na base: 180° − 130° = 50°." |
| `a57-5` | 57,5° | não | "57,5° seria se o topo fosse 65°. Com 65° e 65° na base, o topo mede 50°." |

#### M2 — `angulos-em-progressao`
- **Enunciado:** "Os ângulos internos de um triângulo medem x, 2x e 3x. Quanto mede o maior ângulo?"
- **Conta de conferência:** x + 2x + 3x = 180° ⇒ 6x = 180° ⇒ x = 30° ⇒ 3x = 90°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a90` | 90° | **sim** | "Exato. 6x = 180° dá x = 30°, e o maior ângulo é 3x = 90°." |
| `a30` | 30° | não | "30° é o menor (x). O maior vale 3x = 3 · 30° = 90°." |
| `a60` | 60° | não | "60° é o do meio (2x). O maior vale 3x = 90°." |
| `a120` | 120° | não | "A soma é 6x = 180°, então x = 30° e o maior (3x) mede 90°." |

#### M3 — `externo-com-incognita`
- **Enunciado:** "Num triângulo, o ângulo externo mede 130° e um dos internos não adjacentes mede 55°. Quanto mede o outro interno não adjacente?"
- **Conta de conferência:** x + 55° = 130° ⇒ x = 75°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a75` | 75° | **sim** | "Isso. Como o externo soma os dois internos de fora, 130° − 55° = 75°." |
| `a50` | 50° | não | "50° é o interno vizinho ao de 130° (180° − 130°). O outro mede 130° − 55° = 75°." |
| `a125` | 125° | não | "125° é 180° − 55°. Use a regra do externo: 130° − 55° = 75°." |
| `a65` | 65° | não | "Confira a subtração: 130° − 55° = 75°, não 65°." |

### Desafios

#### D1 — `terceiro-lado-inteiro`
- **Enunciado:** "Dois lados de um triângulo medem 4 cm e 9 cm. Qual é o maior valor inteiro possível para o terceiro lado?"
- **Fala do Paco:** "O terceiro lado precisa ser estritamente menor que a soma dos outros dois."
- **Conta de conferência:** c < 4 + 9 = 13 ⇒ maior inteiro = 12 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 cm | **sim** | "Certo. O lado deve ser menor que 4 + 9 = 13, então o maior inteiro é 12 cm." |
| `a13` | 13 cm | não | "Em 13 cm (4 + 9) o triângulo achata numa reta. Precisa ser menor que 13: 12 cm." |
| `a5` | 5 cm | não | "5 cm (9 − 4) é o limite inferior (e nem fecha). O maior inteiro menor que 13 é 12 cm." |
| `a14` | 14 cm | não | "14 cm passa da soma 4 + 9 = 13 e não fecha. O maior inteiro é 12 cm." |

#### D2 — `isosceles-decimal`
- **Enunciado:** "Num triângulo isósceles, o ângulo do topo mede 55°. Quanto mede cada ângulo da base?"
- **Conta de conferência:** (180° − 55°) / 2 = 125° / 2 = 62,5°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a62-5` | 62,5° | **sim** | "Exato. 180° − 55° = 125°, e dividindo por 2 dá 62,5°." |
| `a125` | 125° | não | "125° é a soma dos dois da base. Dividindo por 2, cada um mede 62,5°." |
| `a67-5` | 67,5° | não | "67,5° seria para topo de 45°. Com 55°, sobra 125° / 2 = 62,5°." |
| `a55` | 55° | não | "55° é o topo; na base cada um mede (180° − 55°) / 2 = 62,5°." |

#### D3 — `bissetrizes-internas`
- **Enunciado:** "Num triângulo ABC, o ângulo A mede 80°. As bissetrizes dos ângulos B e C se cruzam em P. Quanto mede o ângulo BPC?"
- **Fala do Paco:** "Primeiro ache B + C no triângulo grande; no triângulo BPC você usa metade de B mais metade de C."
- **Conta de conferência:** B + C = 180° − 80° = 100° ⇒ B/2 + C/2 = 50° ⇒ BPC = 180° − 50° = 130°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a130` | 130° | **sim** | "Isso. B + C = 100°, as metades somam 50°, e BPC = 180° − 50° = 130°." |
| `a100` | 100° | não | "100° é B + C. As bissetrizes pegam a metade (50°), então BPC = 180° − 50° = 130°." |
| `a50` | 50° | não | "50° é a soma dos dois ângulos da base de BPC. No topo P sobra 180° − 50° = 130°." |
| `a140` | 140° | não | "B + C = 100° e metade é 50°; portanto BPC = 180° − 50° = 130°." |

#### D4 — `falso-caso-lla`
- **Enunciado:** "Conhecendo apenas os três ângulos (60°, 60°, 60°) de dois triângulos, o que podemos afirmar?"
- **Conta de conferência:** AAA não trava o comprimento dos lados

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `formato` | Têm mesma forma, mas lados podem diferir | **sim** | "Certo. AAA garante o formato (equilátero), mas um pode ser maior que o outro." |
| `congr` | São obrigatoriamente congruentes | não | "Sem nenhum lado fixo, um pode ter lado 2 e outro lado 10. Só têm a mesma forma." |
| `naofecha` | Não formam triângulo | não | "60° + 60° + 60° = 180° fecha sim; têm a mesma forma, mas tamanhos livres." |
| `retang` | São triângulos retângulos | não | "Todos os ângulos são 60° (equiláteros): mesma forma, mas tamanhos podem diferir." |

#### D5 — `dois-isosceles-colados`
- **Enunciado:** "No triângulo ABC, AB = BD = DC (D está na base AC). Se o ângulo C mede 35°, quanto mede o ângulo BDC e o ângulo A?"
- **Fala do Paco:** "Comece no isósceles BDC para achar o externo ABD; depois use o isósceles ABD."
- **Conta de conferência:** BD = DC ⇒ DBC = C = 35° ⇒ BDC = 180° − 70° = 110°; externo ABD = 35° + 35° = 70° = A

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a110e70` | 110° e 70° | **sim** | "Exato. Em BDC sobram 110°, e o externo ADB = 35° + 35° = 70° iguala o ângulo A." |
| `a70e110` | 70° e 110° | não | "Você inverteu: BDC vale 180° − 70° = 110°, e A = ADB = 70°." |
| `a110e35` | 110° e 35° | não | "ADB é externo a BDC, então vale 35° + 35° = 70° (logo A = 70°, não 35°)." |
| `a145e70` | 145° e 70° | não | "Em BDC há dois ângulos de 35°: 180° − 70° = 110°, ficando 110° e 70°." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar a soma dos ângulos internos (180°) e propriedades do triângulo isósceles em situação contextualizada.
- **Onde procurar:** ENEM, OBMEP, Vunesp.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** usar o teorema do ângulo externo em cadeia de triângulos isósceles.
- **Onde procurar:** Fuvest, Unicamp, OBMEP, Mackenzie.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar a desigualdade triangular para determinar quantos triângulos existem com lados inteiros.
- **Onde procurar:** ENEM, UFMG, UERJ, OBMEP.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** identificar congruência de triângulos (LAL, ALA, LLL) para provar igualdade de segmentos ou ângulos.
- **Onde procurar:** Fuvest, Unicamp, Colégio Naval, EPCAR.
