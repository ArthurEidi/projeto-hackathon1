# Plano — Lei dos senos e lei dos cossenos

**Aula:** 1 — Além do Ângulo Reto · Triângulos quaisquer, circunferência circunscrita e Pitágoras corrigido
**Caminho:** geometria / trigonometria / lei-dos-senos-e-cossenos
**Pré-requisitos que o aluno já domina:** trigonometria-no-triangulo-retangulo, triangulos-congruencia-e-propriedades

## a) Ancoragem mecânica
A máquina controla os vértices e o ângulo A de um triângulo qualquer e devolve o lado oposto a. Na lei dos cossenos, o ângulo A ajusta o termo corretivo −2bc·cos A sobre a soma b² + c²; na lei dos senos, o raio R da circunferência circunscrita trava a razão a / sen A em 2R.

## b) Visual de partida
WIDGET NOVO `geometria_plana`: um triângulo qualquer ABC com lados b e c fixos e ângulo A ajustável (modo cossenos), ou inscrito numa circunferência de raio R com vértice A arrastável sobre o arco (modo senos). Exibe em tempo real a², b² + c² − 2bc·cos A e a razão a / sen A = 2R.

## c) Caso neutro
Quando o ângulo A = 90°, cos 90° = 0 e o termo corretivo −2bc·cos A desaparece, devolvendo exatamente o Teorema de Pitágoras: a² = b² + c². O triângulo retângulo de A = 90° fica como fantasma na tela.

## d) Panorama e recorte
Resolver triângulos inclui cálculo de áreas por seno, relação de Stewart e trigonometria esférica. Aqui estudamos as duas leis que resolvem qualquer triângulo plano: a lei dos cossenos e a lei dos senos.

## e) Progressão por contraste
1. A = 90° (referência): cos 90° = 0, então a² = b² + c² (Pitágoras puro).
2. A agudo (A < 90°): o lado a encolhe em relação à hipotenusa fantasma porque cos A > 0 subtrai 2bc·cos A.
3. A obtuso (A > 90°): o lado a estica além da hipotenusa fantasma porque cos A < 0 soma |2bc·cos A|.
4. Vértice A deslizando na circunferência de raio R: o lado a e o ângulo A se mantêm ligados por a / sen A = 2R.

## f) Dedução causal da forma
Traçando a altura relativa ao lado c e aplicando Pitágoras nos dois triângulos retângulos formados, aparece a projeção b·cos A, gerando a² = b² + c² − 2bc·cos A. Já inscrivendo o triângulo no círculo de diâmetro 2R, o ângulo inscrito A enxerga a mesma corda a que o triângulo retângulo no diâmetro, por isso a / sen A = 2R.

## g) Simulação espacial e fronteiras
O aluno abre A de 60° a 120° para ver o sinal de cos A inverter o ajuste em a². Na lei dos senos, leva A a 90° e vê o lado a coincidir com o próprio diâmetro 2R (já que sen 90° = 1).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Lado oposto a | Lado que fica de frente para o ângulo A e abre ou fecha com ele. |
| c2 | Lados adjacentes b e c | Os dois lados que formam o ângulo A. |
| c3 | Ângulo A | Abertura entre os lados b e c que governa o tamanho de a. |
| c4 | Diâmetro 2R | Dobro do raio da circunferência circunscrita ao triângulo. |

### Passo 1 — `caso-neutro-pitagoras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `geometria_plana` (modo cossenos) — lados fixos b = 3, c = 4 (c2); ângulo A = 90° (c3) como fantasma com a = 5 (c1); slider `angA`. Emite `angA`.
- **Sliders:** `angA` · "Ângulo A (graus)" · 60..120 · passo 30 · inicial 90 · c3
- **Paco (abertura):** "Em A = 90°, b = 3 e c = 4 dão a² = 25. Feche o ângulo A para 60°: a² fica maior ou menor que 25?"
- **Interação do aluno:** move `angA` para 60° e observa o lado a encolher e a² cair de 25 para 13.
- **Conclusão:** `angA ≤ 60`
- **Paco (conclusão):** "Ficou menor: a² = 25 − 2·3·4·cos 60° = 13. Fechar o ângulo desconta 2bc·cos A da soma de Pitágoras."
- **Tati (dúvida):** `fim` — P: "Então a lei dos cossenos é o Teorema de Pitágoras para qualquer ângulo?" / R: "Isso mesmo: ela corrige Pitágoras quando o ângulo deixa de ser reto, e com a lei dos senos resolve qualquer triângulo."

### Passo 2 — `angulo-obtuso`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 7 (fronteira agudo/obtuso)
- **Widget:** `geometria_plana` (modo cossenos) — fantasma em A = 90° (a² = 25); lados b = 3, c = 4; slider `angA`. Emite `angA`.
- **Sliders:** `angA` · "Ângulo A (graus)" · 60..120 · passo 30 · inicial 60 · c3
- **Paco (abertura):** "Em 60° descontamos 12 porque cos 60° = 0,5. E se abrirmos A para 120°, onde cos 120° = −0,5?"
- **Interação do aluno:** leva `angA` até 120° e vê a² saltar para 25 + 12 = 37.
- **Conclusão:** `angA ≥ 120`
- **Paco (conclusão):** "Passou de 25 para 37. No ângulo obtuso o cosseno é negativo, então −2bc·cos A vira uma soma e estica o lado a."

### Passo 3 — `lei-dos-senos-2r`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7
- **Widget:** `geometria_plana` (modo senos) — triângulo inscrito em circunferência de raio R = 5 (2R = 10 em c4); slider `angA` move o vértice ou abre a corda a (c1). Emite `angA`.
- **Sliders:** `angA` · "Ângulo A (graus)" · 30..90 · passo 30 · inicial 30 · c3
- **Paco (abertura):** "Com R = 5, o diâmetro 2R vale 10. Suba o ângulo A de 30° até 90°: quanto dá a divisão a / sen A em cada posição?"
- **Interação do aluno:** move `angA` até 90°; em 30° vê a = 5 e a / 0,5 = 10; em 90° vê a = 10 (o próprio diâmetro) e 10 / 1 = 10.
- **Conclusão:** `angA ≥ 90`
- **Paco (conclusão):** "Dá sempre 10, que é o diâmetro 2R. Em 90°, sen 90° = 1 e o lado a vira o próprio diâmetro da circunferência."
- **Tati (dúvida):** `fim` — P: "Como sei qual das duas leis usar num exercício?" / R: "Dois lados e o ângulo entre eles (ou os três lados) pedem cossenos; pares de lado e ângulo oposto pedem senos."

### Passo 4 — `desafio-cossenos`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `geometria_plana_figura` — triângulo com lados b = 5, c = 8 (c2), ângulo A = 60° (c3) entre eles e lado oposto a (c1).
- **Paco (abertura):** "Você tem dois lados e o ângulo de 60° entre eles: aplique a lei dos cossenos."
- **Enunciado:** "Num triângulo, b = 5, c = 8 e o ângulo entre eles é A = 60° (cos 60° = 0,5). Quanto mede o lado a?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a7` | 7 | **sim** | "Isso. a² = 25 + 64 − 2·5·8·0,5 = 89 − 40 = 49, logo a = 7." | destaca a = 7 em c1 e mostra a² = 49 |
| `a49` | 49 | não | "49 é a². Tirando a raiz quadrada, o lado mede a = 7." | destaca √49 = 7 sobre o lado a |
| `a89` | √89 | não | "Faltou descontar 2bc·cos 60° = 40. Com o desconto: a² = 49 e a = 7." | mostra o fantasma de 90° versus 60° |
| `a11` | √129 | não | "Você somou 40 em vez de subtrair. Em 60° subtrai-se: a² = 49, a = 7." | destaca o ângulo agudo de 60° em c3 |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — triângulo qualquer inscrito na circunferência de diâmetro 2R (c4) com lados a (c1), b, c (c2) e ângulo A (c3).
- **Fórmula:** `a²`→c1 · `=` · `b² + c²`→c2 · `−` · `2bc·cos` · `A`→c3 · `;` · `a`→c1 · `/` · `sen A`→c3 · `=` · `2R`→c4
- **Definições:** "Lei dos cossenos: relaciona os três lados e um ângulo do triângulo." · "Lei dos senos: cada lado dividido pelo seno do ângulo oposto vale 2R." · "Em A = 90°, cos 90° = 0 e a lei dos cossenos vira Pitágoras."
- **Paco (abertura):** "O termo −2bc·cos A mede o quanto o ângulo desvia de 90°, por isso a lei dos cossenos generaliza Pitágoras para qualquer triângulo."
- **Dica (hint):** "Toque em cada parte da fórmula para destacá-la no triângulo e na circunferência."

**Frase de encerramento (outro):** "Você abriu e fechou o ângulo do triângulo, recuperou Pitágoras em 90° e ligou cada lado ao diâmetro 2R pela lei dos senos."

## i) Treino pós-aula

### Fáceis

#### F1 — `cossenos-em-90`
- **Enunciado:** "Quando A = 90° (cos 90° = 0), a lei dos cossenos a² = b² + c² − 2bc·cos A se reduz a:"
- **Conta de conferência:** a² = b² + c² − 0 = b² + c²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pit` | a² = b² + c² | **sim** | "Certo. Com cos 90° = 0, o termo −2bc·cos A zera e sobra Pitágoras." |
| `sub` | a² = b² + c² − 2bc | não | "Isso seria cos A = 1. Como cos 90° = 0, fica a² = b² + c²." |
| `som` | a² = b² + c² + 2bc | não | "Com cos 90° = 0 o produto zera: fica a² = b² + c²." |
| `sen` | a / sen A = 0 | não | "Em 90° o termo com cosseno some, restando a² = b² + c²." |

#### F2 — `senos-diametro`
- **Enunciado:** "Num triângulo inscrito em circunferência de raio R = 6, quanto vale a razão a / sen A?"
- **Conta de conferência:** a / sen A = 2R = 2 · 6 = 12

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r12` | 12 | **sim** | "Isso. Pela lei dos senos, a / sen A = 2R = 2 · 6 = 12." |
| `r6` | 6 | não | "6 é o raio R. A razão vale o diâmetro 2R = 12." |
| `r3` | 3 | não | "Multiplique o raio por 2: a / sen A = 2R = 12." |
| `r36` | 36 | não | "Não eleve ao quadrado: a / sen A = 2R = 12." |

#### F3 — `achar-lado-senos`
- **Enunciado:** "Num triângulo, A = 30° (sen 30° = 0,5) e o raio circunscrito é R = 10. Quanto mede o lado oposto a?"
- **Conta de conferência:** a = 2R · sen 30° = 20 · 0,5 = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l10` | 10 | **sim** | "Certo. a = 2R · sen 30° = 20 · 0,5 = 10." |
| `l20` | 20 | não | "20 é o diâmetro 2R. Multiplicando por sen 30° = 0,5, dá a = 10." |
| `l5` | 5 | não | "5 é R · sen 30°. Como usamos 2R = 20, o lado mede 20 · 0,5 = 10." |
| `l40` | 40 | não | "Multiplique 2R = 20 por 0,5, não divida: a = 10." |

#### F4 — `sinal-obtuso`
- **Enunciado:** "Se um triângulo tem lados b = 3, c = 4 e ângulo A obtuso (A > 90°), então a² é:"
- **Conta de conferência:** cos A < 0 ⇒ a² = 25 − 24·cos A > 25

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `mai25` | Maior que 25 | **sim** | "Exato. Em A = 90° dá 25; como A > 90°, o lado abre mais e a² > 25." |
| `ig25` | Igual a 25 | não | "25 ocorre só em A = 90°. Com A obtuso, a² é maior que 25." |
| `men25` | Menor que 25 | não | "Menor que 25 ocorre quando A é agudo. Com A obtuso, a² > 25." |
| `ig7` | Igual a 7 | não | "Com A > 90° o termo −2bc·cos A é positivo, então a² > 25." |

### Médias

#### M1 — `dois-angulos-senos`
- **Enunciado:** "Num triângulo, A = 30° (sen 30° = 0,5), B = 45° (sen 45° = √2/2) e a = 6. Quanto mede o lado b?"
- **Conta de conferência:** b / (√2/2) = 6 / 0,5 = 12 ⇒ b = 6√2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `b6r2` | 6√2 | **sim** | "Isso. a / sen 30° = 12, então b = 12 · (√2/2) = 6√2." |
| `b12` | 12 | não | "12 é a razão 2R = 6 / 0,5. Multiplicando por sen 45°, b = 6√2." |
| `b3r2` | 3√2 | não | "Dividir 6 por 0,5 dá 12, não 6. Logo b = 12 · (√2/2) = 6√2." |
| `b6` | 6 | não | "Os ângulos são diferentes. Pela lei dos senos, b = 6√2." |

#### M2 — `cossenos-lado-3-5`
- **Enunciado:** "Dois lados de um triângulo medem 3 e 5, e formam um ângulo de 120° (cos 120° = −0,5). Quanto mede o terceiro lado?"
- **Conta de conferência:** a² = 9 + 25 − 2·3·5·(−0,5) = 34 + 15 = 49 ⇒ a = 7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a7` | 7 | **sim** | "Certo. a² = 9 + 25 + 15 = 49, portanto a = 7." |
| `a19` | √19 | não | "Como cos 120° = −0,5, o termo −2bc·cos A soma +15: a² = 49 e a = 7." |
| `a49` | 49 | não | "49 é a². Extraindo a raiz quadrada, o lado mede 7." |
| `a34` | √34 | não | "√34 seria para 90°. Em 120° soma-se 15: a² = 49 e a = 7." |

#### M3 — `achar-cosseno`
- **Enunciado:** "Num triângulo de lados a = 7, b = 5 e c = 6, quanto vale cos A?"
- **Conta de conferência:** 49 = 25 + 36 − 2·5·6·cos A ⇒ 49 = 61 − 60·cos A ⇒ cos A = 12/60 = 1/5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c15` | 1/5 | **sim** | "Exato. 49 = 25 + 36 − 60·cos A, então 60·cos A = 12 e cos A = 1/5." |
| `cm15` | −1/5 | não | "Cuidado com o sinal: 61 − 49 = 12, então cos A = 12/60 = 1/5." |
| `c56` | 5/6 | não | "O triângulo não é retângulo. Pela lei dos cossenos, cos A = 1/5." |
| `c12` | 1/2 | não | "60·cos A = 61 − 49 = 12, logo cos A = 12/60 = 1/5." |

### Desafios

#### D1 — `terceiro-angulo-senos`
- **Enunciado:** "Num triângulo ABC, A = 75°, B = 45° e o lado c mede 12 (sen 60° = √3/2). Quanto vale o raio R da circunferência circunscrita?"
- **Conta de conferência:** C = 180° − 120° = 60°; 2R = c / sen 60° = 12 / (√3/2) = 8√3 ⇒ R = 4√3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r4r3` | 4√3 | **sim** | "Isso. C = 60°, então 2R = 12 / (√3/2) = 8√3 e R = 4√3." |
| `r8r3` | 8√3 | não | "8√3 é o diâmetro 2R. O raio R é a metade: 4√3." |
| `r6` | 6 | não | "C = 60°, não 90°. Com sen 60° = √3/2, R = 4√3." |
| `r6r2` | 6√2 | não | "O lado c é oposto a C = 60°, não a B = 45°. Assim, R = 4√3." |

#### D2 — `classificar-triangulo`
- **Enunciado:** "Um triângulo tem lados 4, 5 e 7. O maior ângulo desse triângulo é:"
- **Conta de conferência:** 4² + 5² = 41 < 7² = 49 ⇒ cos A < 0 ⇒ obtuso

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `obt` | Obtuso | **sim** | "Certo. Como 7² = 49 é maior que 4² + 5² = 41, o cosseno é negativo." |
| `ret` | Reto | não | "Seria reto se 4² + 5² desse 49, mas dá 41. Como 49 > 41, é obtuso." |
| `agu` | Agudo | não | "Para ser agudo, 7² deveria ser menor que 41. Como 49 > 41, é obtuso." |
| `ras` | Raso | não | "4 + 5 = 9 > 7, o triângulo fecha e tem maior ângulo obtuso." |

#### D3 — `cosseno-nao-inteiro`
- **Enunciado:** "Dois caminhos retos saem do mesmo ponto fazendo 60° (cos 60° = 0,5). Após 2 km num e 4 km no outro, qual a distância entre as pontas?"
- **Conta de conferência:** d² = 4 + 16 − 2·2·4·0,5 = 20 − 8 = 12 ⇒ d = √12 = 2√3 ≈ 3,46 km

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2r3` | 2√3 km | **sim** | "Exato. d² = 4 + 16 − 8 = 12, então d = √12 = 2√3 km." |
| `d12` | 12 km | não | "12 é d². Tirando a raiz quadrada: √12 = 2√3 km." |
| `d2r5` | 2√5 km | não | "2√5 seria para 90°. Descontando 2·2·4·0,5 = 8, fica √12 = 2√3 km." |
| `d3` | 3 km | não | "Pela lei dos cossenos, d² = 20 − 8 = 12, logo d = 2√3 km." |

#### D4 — `fronteira-diametro`
- **Enunciado:** "Num triângulo inscrito numa circunferência de raio R = 8, um dos lados mede 16. Quanto vale o seno do ângulo oposto a esse lado?"
- **Conta de conferência:** sen A = a / (2R) = 16 / 16 = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s1` | 1 | **sim** | "Isso. O lado 16 é o próprio diâmetro 2R, então sen A = 16/16 = 1 (A = 90°)." |
| `s05` | 0,5 | não | "Você dividiu 8 por 16. Como 2R = 16, sen A = 16 / 16 = 1." |
| `s0` | 0 | não | "Pela lei dos senos, sen A = a / (2R) = 16 / 16 = 1." |
| `s2` | 2 | não | "Seno nunca passa de 1; aqui 2R = 16, então sen A = 16 / 16 = 1." |

#### D5 — `combinar-seno-cosseno`
- **Enunciado:** "Num triângulo ABC, b = 4, c = 6 e cos A = 3/4. Quanto mede o lado a, e se sen A = √7/4, quanto vale o diâmetro 2R?"
- **Fala do Paco:** "Primeiro ache a pela lei dos cossenos; depois divida a por sen A."
- **Conta de conferência:** a² = 16 + 36 − 48·(3/4) = 52 − 36 = 16 ⇒ a = 4; 2R = 4 / (√7/4) = 16/√7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c4e16` | a = 4 e 2R = 16/√7 | **sim** | "Exato. a² = 52 − 36 = 16 ⇒ a = 4; depois 2R = 4 / (√7/4) = 16/√7." |
| `c16e4` | a = 16 e 2R = 4/√7 | não | "16 é a², então a = 4; dividindo por √7/4, temos 2R = 16/√7." |
| `c4e4` | a = 4 e 2R = √7 | não | "Para achar 2R, divida a = 4 por sen A = √7/4: 2R = 16/√7." |
| `c8e16` | a = √52 e 2R = 16/√7 | não | "Desconte 2bc·cos A = 36: a² = 16, a = 4 e 2R = 16/√7." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar a lei dos cossenos para calcular a distância entre dois pontos conhecendo dois lados e o ângulo entre eles.
- **Onde procurar:** ENEM, Fuvest, Unicamp.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar a lei dos senos para determinar um lado ou o raio da circunferência circunscrita.
- **Onde procurar:** ENEM, Vunesp, UFRGS.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** descobrir o cosseno de um ângulo a partir das medidas dos três lados do triângulo.
- **Onde procurar:** Fuvest, Unicamp, UFPR.

#### V4 — `enem-2023-pizzas`
- **Enunciado (resumido):** Diâmetros a, b, c de três pizzas formam um triângulo com ângulo α oposto a a. Para área(a) > área(b) + área(c), qual o intervalo de α?
- **Fala do Paco:** "A área é proporcional ao quadrado do diâmetro: escreva a² > b² + c² na lei dos cossenos."
- **Fonte:** ENEM 2023, Questão 172 — `https://api.enem.dev/v1/exams/2023/questions/172`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`90° < a < 180°`) mantidos.
- **Conta de conferência:** `a² > b² + c² ⇒ b² + c² − 2bc·cos α > b² + c² ⇒ cos α < 0 ⇒ 90° < α < 180°`.
- **Opções e feedback:** `0° < a < 90°`, `A = 90°`, `90° < a < 180°` (correta), `A = 180°`, `180° < a < 360°`.
