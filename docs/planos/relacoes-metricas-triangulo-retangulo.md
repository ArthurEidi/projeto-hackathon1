# Plano — Relações métricas no triângulo retângulo

**Aula:** 1 — Três Triângulos num Só · Altura na hipotenusa, projeções m e n, h² = m·n e b² = a·m
**Caminho:** geometria / geometria-plana / relacoes-metricas-triangulo-retangulo
**Pré-requisitos que o aluno já domina:** `teorema-de-pitagoras`, `semelhanca-e-teorema-de-tales`.

## a) Ancoragem mecânica
Quando traçamos a altura `h` do ângulo reto até a hipotenusa `a`, ela corta o triângulo retângulo original em **dois triângulos retângulos menores semelhantes ao grande** e entre si, dividindo a hipotenusa nas sombras (projeções) `m` e `n` (`a = m + n`). Mover o vértice do ângulo reto pelo semicírculo redistribui `m` e `n` e aciona três engrenagens de proporção: `h² = m · n` (entre os dois pequenos), `b² = a · m` e `c² = a · n` (entre cada pequeno e o grande), além da igualdade de área `a · h = b · c`.

## b) Visual de partida
WIDGET NOVO: `geometria_plana` (modo relações métricas) — triângulo retângulo apoiado sobre a hipotenusa `a` (para enxergar `m` e `n` como sombras no chão), altura `h` descendo do topo reto, e controle que destaca e gira os dois triângulos menores (`m-h-b` e `n-h-c`) ao lado do triângulo grande (`b-c-a`) para alinhar os lados correspondentes.

## c) Caso neutro
Triângulo retângulo isósceles apoiado na hipotenusa `a = 10` (`m = 5` e `n = 5`): no centro perfeito, as duas projeções são iguais (`m = n = 5`), e a altura no meio vale `h = √(5 · 5) = 5` (metade da hipotenusa!). Ao deslocar o vértice para o lado, `m` e `n` ficam diferentes e `h` diminui segundo `h² = m · n`.

## d) Panorama e recorte
Estudamos os elementos do triângulo retângulo apoiado na hipotenusa (`a, b, c, h, m, n`), a semelhança dos 3 triângulos e as 4 relações métricas (`a = m + n`, `h² = m · n`, `b² = a · m` / `c² = a · n` e `a · h = b · c`).

## e) Progressão por contraste
1. Simetria central (`m = 5, n = 5` em `a = 10`): `h = 5`, os dois triângulos menores são congruentes (referência).
2. Deslocar o pé da altura para `m = 9` e `n = 1` (ainda com `a = 9 + 1 = 10`): a altura cai de `5` para `h = √(9 · 1) = 3` (`h² = m · n`).
3. Comparar cada cateto com a sua sombra: o quadrado do cateto `b` é o retângulo da hipotenusa toda `a` pela sombra `m` debaixo dele (`b² = a · m`).
4. Calcular a área do mesmo triângulo de dois jeitos: base `a` vezes altura `h` dividido por 2 é igual a cateto `b` vezes cateto `c` dividido por 2, logo `a · h = b · c`.

## f) Dedução causal da forma
Por que `h² = m · n` e `b² = a · m` sem decorar? Porque os ângulos agudos se repetem nos 3 triângulos! No triângulo da esquerda e no da direita, a razão `cateto maior / cateto menor` é a mesma: `m / h = h / n ⇒ h² = m · n`. Entre o triângulo da esquerda e o grande, `hipotenusa / cateto adjacente` dá `b / m = a / b ⇒ b² = a · m`. E somando `b² + c² = a·m + a·n = a(m + n) = a·a = a²`, reencontramos o próprio Teorema de Pitágoras!

## g) Simulação espacial e fronteiras
Arrastar o vértice reto ao longo do semicírculo de diâmetro `a = 10` mostra que a maior altura possível ocorre no meio (`m = n = 5 ⇒ h_máx = 5`); perto das pontas (`n → 0`), `h → 0`. Além disso, toda projeção `m` ou `n` é sempre estritamente menor que a hipotenusa `a`.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Hipotenusa (a) | Maior lado, oposto ao ângulo reto: soma das projeções m + n. |
| c2 | Projeções (m e n) | Sombras dos catetos b e c sobre a hipotenusa a. |
| c3 | Altura (h) | Segmento perpendicular da quina de 90° até a hipotenusa: h² = m·n. |
| c4 | Catetos (b e c) | Lados do ângulo reto: b² = a·m, c² = a·n e a·h = b·c. |

### Passo 1 — `altura-e-sombras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (posição do vértice como entrada), 2 (visual), 3 (caso neutro m = n), 4 (panorama)
- **Widget:** WIDGET NOVO: `geometria_plana` — triângulo retângulo apoiado na hipotenusa `a = 10` (`c1`), começando no caso neutro simétrico `m = 5, n = 5` (`c2`) e `h = 5` (`c3`); slider move a projeção `m` até `8` (`n = 2`, `h = 4`).
- **Sliders:** `m` · "Projeção m" · 2..8 · passo 3 · inicial 5 · c2
- **Paco (abertura):** "No meio da hipotenusa 10 (m = 5 e n = 5), a altura vale h = 5. Leve m até 8 (sobrando n = 2): quanto passa a medir h?"
- **Interação do aluno:** move `m` de 5 para 8 e vê a altura `h` descer para `4`, cumprindo `4² = 8 · 2 = 16`.
- **Conclusão:** `m ≥ 8`
- **Paco (conclusão):** "Em m = 8 e n = 2, a altura vale 4 porque 4² = 8 · 2 = 16! A altura separa dois triângulos semelhantes, por isso h² = m · n."
- **Tati (dúvida):** `fim` — P: "Por que os triângulos menores são semelhantes ao grande?" / R: "Porque cada menor tem um ângulo de 90° e compartilha um ângulo agudo com o triângulo grande!"

### Passo 2 — `cateto-e-sua-sombra`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste h² = m·n × b² = a·m), 6 (dedução por semelhança)
- **Widget:** WIDGET NOVO: `geometria_plana` — hipotenusa `a = 9` (`c1`) dividida em `m = 4` e `n = 5` (`c2`), destacando o quadrado de lado `b = 6` (`b² = 36` em `c4`) igual ao retângulo `a · m = 9 · 4 = 36`.
- **Sliders:** `destacar_cateto` · "Comparar b² com a·m" · 0..1 · passo 1 · inicial 0 · c4
- **Paco (abertura):** "Se a hipotenusa toda mede a = 9 e a sombra debaixo do cateto b mede m = 4, quanto mede o cateto b?"
- **Interação do aluno:** ativa a comparação e vê o quadrado sobre `b` (`36`) igualar o retângulo `a × m = 9 × 4 = 36`, dando `b = 6`.
- **Conclusão:** `destacar_cateto ≥ 1`
- **Paco (conclusão):** "Mede 6! Pela semelhança entre o triângulo menor e o grande, b / m = a / b, logo b² = a · m = 9 · 4 = 36."

### Passo 3 — `duas-formas-da-area`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6 (dedução de a·h = b·c), 7 (fronteira)
- **Widget:** WIDGET NOVO: `geometria_plana` — triângulo `3-4-5` (`b = 3, c = 4` em `c4`, `a = 5` em `c1`) que gira para apoiar ora no cateto `4` (altura `3`), ora na hipotenusa `5` (altura `h = 2,4` em `c3`).
- **Sliders:** `girar_base` · "Apoiar na hipotenusa" · 0..1 · passo 1 · inicial 0 · c3
- **Paco (abertura):** "No triângulo 3-4-5, a área pelos catetos é (3·4)/2 = 6; apoiando na hipotenusa 5, a área muda? Gire para achar h!"
- **Interação do aluno:** gira o triângulo até apoiar na hipotenusa 5 e vê `(5 · h)/2 = (3 · 4)/2 ⇒ 5 · h = 12 ⇒ h = 2,4`.
- **Conclusão:** `girar_base ≥ 1`
- **Paco (conclusão):** "O triângulo é o mesmo, então a área não muda: (a · h)/2 = (b · c)/2. Cancelando o 2, fica sempre a · h = b · c!"
- **Tati (dúvida):** `fim` — P: "Qual é a maior altura h que cabe numa hipotenusa a = 10?" / R: "É h = 5, bem no meio (m = n = 5). Passar de 5 é impossível para um ângulo de 90°."

### Passo 4 — `desafio-altura-hipotenusa`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — triângulo retângulo com a altura `h` (`c3`) dividindo a hipotenusa em `m = 4 cm` e `n = 9 cm` (`c2`).
- **Paco (abertura):** "Olhe para as duas sombras m = 4 e n = 9 de cada lado da altura h."
- **Enunciado:** "A altura relativa à hipotenusa divide-a em dois segmentos de 4 cm e 9 cm. Quanto mede essa altura h?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `h6` | 6 cm | **sim** | "Exato. Como h² = m · n = 4 · 9 = 36, temos h = √36 = 6 cm." | destaca os dois triângulos semelhantes com `4/6 = 6/9` |
| `h13` | 13 cm | não | "13 cm é a hipotenusa a = 4 + 9. A altura é h = √(4 · 9) = 6 cm." | aponta `a = 4 + 9 = 13` na base e `h = 6` na vertical |
| `h36` | 36 cm | não | "36 é h² (4 · 9). Tirando a raiz quadrada, h = 6 cm." | mostra `h = √36 = 6 cm` |
| `h65` | 6,5 cm | não | "6,5 é a metade da hipotenusa (média aritmética). A altura é √(4 · 9) = 6 cm." | compara `h = 6` com o raio `6,5` |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — triângulo retângulo completo com `a` (`c1`), `m, n` (`c2`), `h` (`c3`) e `b, c` (`c4`).
- **Fórmula:** `h²`→c3 · `=` · `m · n`→c2 · `,` · `b²`→c4 · `=` · `a`→c1 · `· m`→c2 · `e` · `a · h = b · c`
- **Definições:** "Projeções (m e n): sombras dos catetos sobre a hipotenusa, somando a = m + n." · "Altura ao quadrado (h² = m · n): produto das duas projeções na hipotenusa." · "Cateto ao quadrado (b² = a · m): produto da hipotenusa inteira pela sombra daquele cateto."
- **Paco (abertura):** "A altura divide o triângulo retângulo em dois menores semelhantes ao grande; por isso h² = m · n, b² = a · m e a · h = b · c."
- **Dica (hint):** "Toque em cada letra para ver o segmento correspondente no triângulo."

**Frase de encerramento (outro):** "Você enxergou os 3 triângulos semelhantes dentro de um só e deduziu todas as relações métricas sem decoreba."

## i) Treino pós-aula

### Fáceis

#### F1 — `hipotenusa-pelas-projecoes`
- **Enunciado:** "Num triângulo retângulo, as projeções dos catetos sobre a hipotenusa medem m = 3 cm e n = 7 cm. Quanto mede a hipotenusa a?"
- **Conta de conferência:** a = m + n = 3 + 7 = 10 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 cm | **sim** | "Isso. A hipotenusa é a soma das duas projeções: 3 + 7 = 10 cm." |
| `a21` | 21 cm | não | "As duas projeções juntas formam a hipotenusa, então somamos: 3 + 7 = 10 cm." |
| `a4` | 4 cm | não | "Some as duas sombras na base: a = 3 + 7 = 10 cm." |

#### F2 — `altura-pelas-projecoes-2-8`
- **Enunciado:** "As projeções dos catetos na hipotenusa medem m = 2 cm e n = 8 cm. Quanto mede a altura h relativa à hipotenusa?"
- **Conta de conferência:** h² = 2 · 8 = 16 ⇒ h = 4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h4` | 4 cm | **sim** | "Certo. h² = m · n = 2 · 8 = 16, logo h = √16 = 4 cm." |
| `h10` | 10 cm | não | "10 cm é a hipotenusa (2 + 8). A altura é √(2 · 8) = 4 cm." |
| `h16` | 16 cm | não | "16 é h²; tirando a raiz quadrada, h = 4 cm." |

#### F3 — `cateto-pela-hipotenusa-e-sombra`
- **Enunciado:** "Um triângulo retângulo tem hipotenusa a = 8 cm e a projeção do cateto b mede m = 2 cm. Quanto mede o cateto b?"
- **Conta de conferência:** b² = a · m = 8 · 2 = 16 ⇒ b = 4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `b4` | 4 cm | **sim** | "Exato. Como b² = a · m = 8 · 2 = 16, temos b = √16 = 4 cm." |
| `b16` | 16 cm | não | "16 é b²; tirando a raiz quadrada, b = 4 cm." |
| `b6` | 6 cm | não | "6 cm é a outra projeção (8 − 2). O cateto é b = √(8 · 2) = 4 cm." |

#### F4 — `produto-ah-bc`
- **Enunciado:** "Num triângulo retângulo de catetos b = 6 cm, c = 8 cm e hipotenusa a = 10 cm, quanto vale o produto `a · h`?"
- **Conta de conferência:** a · h = b · c = 6 · 8 = 48

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p48` | 48 | **sim** | "Isso. Pela igualdade das áreas, a · h = b · c = 6 · 8 = 48." |
| `p24` | 24 | não | "24 cm² é a área (b·c/2). Sem dividir por 2, a · h = b · c = 48." |
| `p14` | 14 | não | "Multiplique os catetos: a · h = 6 · 8 = 48." |

### Médias

#### M1 — `achar-altura-6-8-10`
- **Enunciado:** "No triângulo retângulo de catetos 6 cm e 8 cm e hipotenusa 10 cm, quanto mede a altura h relativa à hipotenusa?"
- **Conta de conferência:** 10 · h = 6 · 8 = 48 ⇒ h = 4,8 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h48` | 4,8 cm | **sim** | "Certo. De a · h = b · c temos 10 · h = 6 · 8 = 48, logo h = 4,8 cm." |
| `h5` | 5 cm | não | "5 cm é metade da hipotenusa. Usando 10 · h = 6 · 8, achamos h = 4,8 cm." |
| `h24` | 2,4 cm | não | "2,4 cm é no triângulo 3-4-5. No 6-8-10 é o dobro: 48 / 10 = 4,8 cm." |

#### M2 — `achar-projecao-pelo-cateto`
- **Enunciado:** "Um triângulo retângulo tem cateto b = 6 cm e hipotenusa a = 9 cm. Quanto mede a projeção m desse cateto sobre a hipotenusa?"
- **Conta de conferência:** b² = a · m ⇒ 6² = 9 · m ⇒ 36 = 9m ⇒ m = 4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m4` | 4 cm | **sim** | "Exato. Como b² = a · m, temos 36 = 9 · m ⇒ m = 36 / 9 = 4 cm." |
| `m3` | 3 cm | não | "Use b² = a · m: 6² = 36, e 36 / 9 = 4 cm." |
| `m5` | 5 cm | não | "5 cm é a outra projeção n = 9 − 4. A projeção do cateto 6 é m = 36 / 9 = 4 cm." |

#### M3 — `achar-outra-projecao-pela-altura`
- **Enunciado:** "A altura relativa à hipotenusa mede h = 6 cm e uma das projeções mede m = 3 cm. Quanto mede a outra projeção n?"
- **Conta de conferência:** h² = m · n ⇒ 6² = 3 · n ⇒ 36 = 3n ⇒ n = 12 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `n12` | 12 cm | **sim** | "Isso. De h² = m · n temos 36 = 3 · n, logo n = 36 / 3 = 12 cm." |
| `n2` | 2 cm | não | "Você dividiu 6 por 3 sem elevar h ao quadrado! É 6² / 3 = 36 / 3 = 12 cm." |
| `n9` | 9 cm | não | "Usando h² = m · n: 36 = 3 · n ⇒ n = 12 cm." |

### Desafios

#### D1 — `cateto-pelas-duas-projecoes`
- **Enunciado:** "As projeções dos catetos sobre a hipotenusa medem m = 4 cm e n = 5 cm. Quanto mede o cateto b (cuja projeção é m = 4 cm)?"
- **Fala do Paco:** "Primeiro some m + n para ter a hipotenusa inteira `a`!"
- **Conta de conferência:** a = 4 + 5 = 9 cm; b² = a · m = 9 · 4 = 36 ⇒ b = 6 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `b6` | 6 cm | **sim** | "Exato. Primeiro a = 4 + 5 = 9 cm; depois b² = a · m = 9 · 4 = 36 ⇒ b = 6 cm." |
| `b2r5` | √20 cm | não | "√20 é a altura h = √(4·5). Para o cateto b usamos a hipotenusa toda (9): √(9·4) = 6 cm." |
| `b9` | 9 cm | não | "9 cm é a hipotenusa (4 + 5). O cateto mede √(9 · 4) = 6 cm." |

#### D2 — `altura-no-5-12-13`
- **Enunciado:** "Num triângulo retângulo de catetos 5 cm e 12 cm, quanto mede a altura h relativa à hipotenusa?"
- **Conta de conferência:** hipotenusa a = √(5² + 12²) = 13 cm; 13 · h = 5 · 12 = 60 ⇒ h = 60/13 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h6013` | 60/13 cm | **sim** | "Certo! Pela terna 5-12-13 a hipotenusa é 13 cm, e de 13·h = 5·12 sai h = 60/13 cm." |
| `h6` | 6 cm | não | "A hipotenusa é 13 (não 10). Como 13 · h = 60, temos h = 60/13 cm." |
| `h13` | 13 cm | não | "13 cm é a hipotenusa. A altura vale (5 · 12) / 13 = 60/13 cm." |

#### D3 — `diagonal-retangulo-projecao`
- **Enunciado:** "Num retângulo 3 cm × 4 cm, traça-se a diagonal (5 cm) e a altura de um canto até ela. Quanto mede a menor projeção na diagonal?"
- **Conta de conferência:** b² = a · m ⇒ 3² = 5 · m ⇒ m = 9/5 = 1,8 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m18` | 1,8 cm | **sim** | "Exato. No triângulo 3-4-5, b² = a · m dá 3² = 5 · m ⇒ m = 9 / 5 = 1,8 cm." |
| `m24` | 2,4 cm | não | "2,4 cm é a altura h = (3·4)/5. A menor projeção é m = 3² / 5 = 1,8 cm." |
| `m25` | 2,5 cm | não | "Como os lados 3 e 4 são diferentes, a altura não cai no meio: m = 9/5 = 1,8 cm." |

#### D4 — `semicirculo-corda-altura`
- **Enunciado:** "A altura de um ponto de um semicírculo até o diâmetro divide esse diâmetro em 1 cm e 9 cm. Quanto mede essa altura?"
- **Conta de conferência:** todo triângulo inscrito no semicírculo é retângulo ⇒ h² = 1 · 9 = 9 ⇒ h = 3 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h3` | 3 cm | **sim** | "Isso! Inscrito no semicírculo, o ângulo no topo é 90°; logo h = √(1 · 9) = 3 cm." |
| `h5` | 5 cm | não | "5 cm é no centro (5·5). A 1 cm da ponta, h = √(1 · 9) = 3 cm." |
| `h45` | 4,5 cm | não | "Use a média geométrica h = √(m · n) = √(1 · 9) = 3 cm." |

#### D5 — `soma-b2-c2-deduz-pitagoras`
- **Enunciado:** "Sabendo que num triângulo retângulo `a · m = 16` e `a · n = 9`, quanto mede a hipotenusa `a`?"
- **Fala do Paco:** "Some `a·m + a·n`: isso dá `a(m + n) = a²`!"
- **Conta de conferência:** a·m + a·n = a(m + n) = a² = 16 + 9 = 25 ⇒ a = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Exato! Somando b² + c² = a·m + a·n = a² = 16 + 9 = 25, tiramos a = √25 = 5." |
| `a25` | 25 | não | "25 é a² (pois a·m + a·n = a²). Tirando a raiz quadrada, a = 5." |
| `a7` | 7 | não | "4 e 3 são os catetos (b = 4, c = 3). A hipotenusa é √(16 + 9) = 5." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar `h² = m · n` ou `b² = a · m` em problemas geométricos de rampas, terrenos ou telhados.
- **Onde procurar:** ENEM, Fuvest, Unesp, Unicamp.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular a distância de um vértice de retângulo até sua diagonal (`a · h = b · c`).
- **Onde procurar:** Fuvest, UFRGS, UFPR, ENEM.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** usar a propriedade do triângulo retângulo inscrito em semicircunferência combinada com `h² = m · n`.
- **Onde procurar:** Unicamp, UERJ, Unifesp.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** encadear duas relações métricas para encontrar perímetro ou área de um triângulo retângulo.
- **Onde procurar:** Fuvest, ITA, Unesp.
