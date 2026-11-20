# Plano — Hipérbole como lugar geométrico

**Aula:** 1 — A Diferença que Não Muda · A hipérbole como lugar geométrico
**Caminho:** geometria / geometria-analitica / hiperbole
**Pré-requisitos que o aluno já domina:** distância entre pontos, elipse (soma constante), teorema de Pitágoras.

## a) Ancoragem mecânica
A máquina recebe dois focos F₁ e F₂ e uma diferença 2a e devolve todos os pontos P em que a distância ao foco mais longe menos a distância ao mais perto é exatamente 2a. Focos e diferença são as entradas; a curva de dois ramos é a saída.

## b) Visual de partida
WIDGET NOVO `lugar_geometrico` (modo hipérbole): focos em (±c; 0) (c3), com c = 5; slider da diferença 2a; P desliza sobre a curva (o widget prende P no ramo) e mostra PF₁, PF₂ e a diferença (c4). Chaves para mostrar o retângulo de lados 2a e 2b e as assíntotas; zoom da câmera. Métricas: `diferenca`, `pontos_vistos`, `zoom_longe`, `triangulo_ligado`.

## c) Caso neutro
Diferença zero: P está à mesma distância dos dois focos. Esses pontos formam a reta do meio (a mediatriz, x = 0). É a hipérbole "sem força": nenhum foco é preferido. Depois aumentamos a diferença.

## d) Panorama e recorte
Hipérboles aparecem em relações do tipo xy = constante (y = 1/x), em navegação por diferença de sinais e no corte de um cone. Aqui: centro na origem, focos num eixo, x²/a² − y²/b² = 1, c² = a² + b² e assíntotas.

## e) Progressão por contraste
1. Diferença zero: a reta do meio (referência).
2. Diferença 6: a reta se parte em dois ramos curvos.
3. Contraste com a elipse: soma lá, diferença aqui; c é o maior dos três.
4. Longe do centro: os ramos encostam nas assíntotas y = ±(b/a)x.

## f) Dedução causal da forma
No vértice (a; 0), as distâncias aos focos são c + a e c − a, cuja diferença é 2a. Escrevendo |PF₁ − PF₂| = 2a para (x; y) e simplificando como na elipse, chega-se a x²/a² − y²/b² = 1 com b² = c² − a², ou seja c² = a² + b²: no retângulo de lados a e b, c é a diagonal. Para x muito grande, o "1" fica desprezível e y ≈ ±(b/a)x: por isso os ramos se aproximam dessas retas.

## g) Simulação espacial e fronteiras
Panorama visual opcional (WIDGET NOVO `solido_3d`, corte do cone): inclinar o plano de corte leva de circunferência a elipse, parábola (plano paralelo à geratriz) e hipérbole; vale como abertura da dúvida da Tati no passo 1. Diferença zero dá a mediatriz; diferença igual à distância entre os focos (2a = 2c) dá duas semirretas; diferença maior não desenha nada. Se o termo positivo for y², os ramos abrem para cima e para baixo. Com a = b, as assíntotas são y = ±x (hipérbole equilátera), parente de y = k/x.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Semieixo real | a: do centro até cada vértice; a diferença é 2a. |
| c2 | Semieixo imaginário | b: metade do lado vertical do retângulo das assíntotas. |
| c3 | Distância focal | c: do centro até cada foco, o maior dos três. |
| c4 | Diferença das distâncias | |PF₁ − PF₂|, sempre igual a 2a. |

### Passo 1 — `diferenca-zero`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `lugar_geometrico` (modo hipérbole) — focos (±5; 0); a curva do lugar geométrico se redesenha com a diferença; em 0 é a reta x = 0.
- **Sliders:** `diferenca` · "Diferença 2a" · 0..6 · passo 2 · inicial 0 · c4
- **Paco (abertura):** "Pontos à mesma distância dos dois focos têm diferença zero: que desenho formam? Depois aumente a diferença."
- **Interação do aluno:** vê a reta do meio e sobe a diferença; a reta se parte em dois ramos.
- **Conclusão:** `diferenca ≥ 6`
- **Paco (conclusão):** "Com diferença zero, a reta do meio. Com diferença 6, ela se parte em dois ramos curvos: uma hipérbole."
- **Tati (dúvida):** `fim` — P: "Onde isso aparece fora da matemática?" / R: "Em leis do tipo 'um vezes o outro dá constante' e em navegação por sinais. Hoje: a curva no plano."

### Passo 2 — `diferenca-fixa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6
- **Widget:** `lugar_geometrico` — 2a = 6, c = 5; P desliza pelo ramo direito; PF₁, PF₂ e a diferença (c4) aparecem. Emite `pontos_vistos`.
- **Sliders:** nenhum
- **Paco (abertura):** "Deslize P pelo ramo e leia PF₁ e PF₂. As duas mudam; o que fica fixo?"
- **Interação do aluno:** desliza P por três posições, incluindo o vértice (3; 0).
- **Conclusão:** `pontos_vistos ≥ 3`
- **Paco (conclusão):** "A diferença: sempre 6. No vértice (3; 0), as distâncias são 8 e 2, e 8 − 2 = 6."

### Passo 3 — `triangulo-invertido`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste com a elipse), 6
- **Widget:** `lugar_geometrico` — chave "retângulo": desenha o retângulo de lados 2a = 6 (c1) e 2b = 8 (c2) e a diagonal até o canto, que mede c = 5 (c3). Emite `triangulo_ligado`.
- **Sliders:** nenhum
- **Paco (abertura):** "Na elipse, a era a hipotenusa. Na hipérbole, quem é o maior: a, b ou c?"
- **Interação do aluno:** liga o retângulo e compara as medidas.
- **Conclusão:** `triangulo_ligado ≥ 1`
- **Paco (conclusão):** "É c: o retângulo de lados a = 3 e b = 4 tem diagonal 5. Por isso c² = a² + b²."

### Passo 4 — `assintotas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira), 2
- **Widget:** `lugar_geometrico` — slider de zoom; as diagonais do retângulo se prolongam como retas y = ±(4/3)x.
- **Sliders:** `zoom` · "Afastar a câmera" · 1..5 · passo 1 · inicial 1 · ink
- **Paco (abertura):** "Afaste a câmera. Os ramos se aproximam de quais retas?"
- **Interação do aluno:** sobe o zoom e vê os ramos colarem nas diagonais.
- **Conclusão:** `zoom ≥ 4`
- **Paco (conclusão):** "De y = ±(4/3)x, as diagonais do retângulo. Longe do centro, a hipérbole quase vira essas retas, sem nunca tocá-las."
- **Tati (dúvida):** `fim` — P: "E se a diferença for maior que a distância entre os focos?" / R: "Nenhum ponto consegue isso, e a curva some. Precisa 2a < 2c."

### Passo 5 — `desafio-focos`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `lugar_figura` — hipérbole x²/9 − y²/16 = 1 sem focos.
- **Paco (abertura):** "Na hipérbole, c é o maior. Some, não subtraia."
- **Enunciado:** "Onde ficam os focos de x²/9 − y²/16 = 1?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `f5` | (±5; 0) | **sim** | "Isso. c² = 9 + 16 = 25." | focos em (±5; 0) e retângulo 3 × 4 com diagonal 5 |
| `f-raiz7` | (±√7; 0) | não | "Você subtraiu como na elipse. Aqui c² = a² + b² = 25." | elipse fantasma comparando |
| `f3` | (±3; 0) | não | "(±3; 0) são os vértices. Focos em c = 5." | vértices acesos em c1 |
| `f4` | (±4; 0) | não | "4 é b. c = √(9 + 16) = 5." | lado b do retângulo aceso |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `lugar_figura` — hipérbole a = 3, b = 4, c = 5, retângulo, assíntotas e um P com as duas distâncias.
- **Fórmula:** `x²/a²`→c1 · `−` · `y²/b²`→c2 · `=` · `1` ; `c² = a² + b²`→c3
- **Definições:** "Hipérbole: pontos com |PF₁ − PF₂| = 2a." · "c² = a² + b²: c é a diagonal do retângulo de lados a e b." · "Assíntotas: y = ±(b/a)x."
- **Paco (abertura):** "No vértice, as distâncias diferem 2a. E como c é a diagonal do retângulo, c² = a² + b², com sinal de menos na equação."
- **Dica (hint):** "Toque em uma letra para ver o segmento no desenho."

**Frase de encerramento (outro):** "Você fixou a diferença das distâncias: a hipérbole tem dois ramos, c² = a² + b² e assíntotas y = ±(b/a)x."

## i) Treino pós-aula

### Fáceis

#### F1 — `definicao`
- **Enunciado:** "Na hipérbole, o que é constante para todo ponto P?"
- **Conta de conferência:** |PF₁ − PF₂| = 2a

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `diferenca` | A diferença das distâncias aos focos | **sim** | "Isso. Sempre 2a." |
| `soma` | A soma das distâncias | não | "Soma constante é a elipse. Na hipérbole, a diferença." |
| `centro` | A distância ao centro | não | "Isso é circunferência. Hipérbole: diferença das distâncias." |
| `foco-reta` | A distância a um foco e a uma reta | não | "Isso é a parábola. Hipérbole: diferença das distâncias aos focos." |

#### F2 — `vertices`
- **Enunciado:** "Quais os vértices de x²/9 − y²/16 = 1?"
- **Conta de conferência:** a = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v3` | (±3; 0) | **sim** | "Certo. a² = 9 sob o termo positivo." |
| `v4` | (0; ±4) | não | "b = 4 não marca vértice: a curva não cruza o eixo y. Vértices (±3; 0)." |
| `v5` | (±5; 0) | não | "(±5; 0) são os focos. Vértices: (±3; 0)." |
| `v9` | (±9; 0) | não | "9 é a². Vértices em (±3; 0)." |

#### F3 — `ramos`
- **Enunciado:** "Quantos ramos tem uma hipérbole?"
- **Conta de conferência:** 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | **sim** | "Isso. Um perto de cada foco." |
| `a1` | 1 | não | "Um ramo só é parábola. A hipérbole tem 2." |
| `a4` | 4 | não | "As assíntotas são 2 retas, mas os ramos são 2." |
| `inf` | Infinitos | não | "São 2 ramos, cada um infinito." |

#### F4 — `um-sobre-x`
- **Enunciado:** "O gráfico de y = 1/x é que tipo de curva?"
- **Conta de conferência:** xy = 1, hipérbole equilátera

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `hiperbole` | Hipérbole | **sim** | "Certo. Os eixos são suas assíntotas." |
| `parabola` | Parábola | não | "Parábola não tem assíntotas. y = 1/x é hipérbole." |
| `reta` | Reta | não | "y muda cada vez mais devagar e não é reta: hipérbole." |
| `elipse` | Elipse | não | "Elipse é fechada. y = 1/x tem dois ramos infinitos: hipérbole." |

### Médias

#### M1 — `c-3-4`
- **Enunciado:** "Uma hipérbole tem a = 3 e b = 4. Quanto vale c?"
- **Conta de conferência:** c² = 9 + 16 = 25

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Isso. Diagonal do retângulo 3 × 4." |
| `a-raiz7` | √7 | não | "Subtraiu como na elipse. Hipérbole: c² = a² + b² = 25." |
| `a7` | 7 | não | "3 + 4 não é Pitágoras. c = 5." |
| `a25` | 25 | não | "25 é c². c = 5." |

#### M2 — `assintotas-4-9`
- **Enunciado:** "Quais as assíntotas de x²/4 − y²/9 = 1?"
- **Conta de conferência:** a = 2, b = 3: y = ±(3/2)x

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a32` | y = ±(3/2)x | **sim** | "Certo. b/a = 3/2." |
| `a23` | y = ±(2/3)x | não | "Invertido. y = ±(b/a)x = ±(3/2)x." |
| `a94` | y = ±(9/4)x | não | "Use b e a, não b² e a². y = ±(3/2)x." |
| `a1` | y = ±x | não | "Só com a = b. Aqui y = ±(3/2)x." |

#### M3 — `diferenca-16-9`
- **Enunciado:** "Na hipérbole x²/16 − y²/9 = 1, quanto vale |PF₁ − PF₂|?"
- **Conta de conferência:** 2a = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 | **sim** | "Isso. a = 4, diferença 2a = 8." |
| `a4` | 4 | não | "4 é a. A diferença é 2a = 8." |
| `a10` | 10 | não | "10 é 2c. A diferença das distâncias é 2a = 8." |
| `a6` | 6 | não | "6 é 2b. A diferença é 2a = 8." |

### Desafios

#### D1 — `montar-equacao`
- **Enunciado:** "Qual a hipérbole com centro na origem, focos (±5; 0) e vértices (±4; 0)?"
- **Conta de conferência:** b² = 25 − 16 = 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h16-9` | x²/16 − y²/9 = 1 | **sim** | "Certo. b² = c² − a² = 9." |
| `h16-25` | x²/16 − y²/25 = 1 | não | "25 é c². Sob y² vai b² = 9." |
| `e16-9` | x²/16 + y²/9 = 1 | não | "Com + é elipse. Hipérbole: x²/16 − y²/9 = 1." |
| `h25-16` | x²/25 − y²/16 = 1 | não | "Assim os vértices seriam (±5; 0). Vértices (±4; 0): x²/16 − y²/9 = 1." |

#### D2 — `vertical`
- **Enunciado:** "Onde ficam os focos de y²/9 − x²/16 = 1?"
- **Fala do Paco:** "Veja qual termo é positivo."
- **Conta de conferência:** c = 5, eixo y: (0; ±5)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f05` | (0; ±5) | **sim** | "Isso. O termo positivo é y²: ramos para cima e para baixo." |
| `f50` | (±5; 0) | não | "O positivo é y², então os focos ficam no eixo y: (0; ±5)." |
| `f03` | (0; ±3) | não | "(0; ±3) são os vértices. Focos em c = 5." |
| `f0r7` | (0; ±√7) | não | "Na hipérbole, c² = 9 + 16 = 25: (0; ±5)." |

#### D3 — `diferenca-zero`
- **Enunciado:** "Os pontos com diferença zero entre as distâncias a dois focos formam:"
- **Conta de conferência:** PF₁ = PF₂ ⇒ mediatriz

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `mediatriz` | A reta do meio entre os focos | **sim** | "Certo. É a mediatriz: o caso neutro da aula." |
| `hiperbole` | Uma hipérbole | não | "Diferença zero achata tudo numa reta: a mediatriz." |
| `circ` | Uma circunferência | não | "Pontos equidistantes de dois pontos formam uma reta, a mediatriz." |
| `nada` | Nada | não | "Existem, e são muitos: a reta do meio." |

#### D4 — `qual-e-hiperbole`
- **Enunciado:** "Qual destas equações representa uma hipérbole?"
- **Conta de conferência:** sinais opostos em x² e y²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `xmy` | x² − y² = 1 | **sim** | "Isso. Quadrados com sinais opostos." |
| `xpy` | x² + y² = 1 | não | "Sinais iguais e mesmo coeficiente: circunferência. Hipérbole: x² − y² = 1." |
| `x4y` | x² = 4y | não | "Só uma variável ao quadrado: parábola. Hipérbole: x² − y² = 1." |
| `e` | x²/4 + y² = 1 | não | "Soma de quadrados: elipse. Hipérbole: x² − y² = 1." |

#### D5 — `equilatera`
- **Enunciado:** "Numa hipérbole com a = b, quais são as assíntotas?"
- **Fala do Paco:** "Última. b/a vale quanto?"
- **Conta de conferência:** b/a = 1 ⇒ y = ±x

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `yx` | y = ±x | **sim** | "Certo. O retângulo vira quadrado e as diagonais têm inclinação ±1." |
| `y2x` | y = ±2x | não | "Com a = b, b/a = 1: y = ±x." |
| `y0` | y = 0 | não | "y = 0 é o eixo. As assíntotas são y = ±x." |
| `nao-tem` | Não tem assíntotas | não | "Toda hipérbole tem. Com a = b: y = ±x." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2017-hill`
- **Enunciado (resumido):** "A equação de Hill é (p + a)(v + b) = K, com a, b e K positivos. Que gráfico descreve v em função de p?"
- **Fala do Paco:** "Um fator vezes o outro dá constante, como y = 1/x deslocada."
- **Fonte:** ENEM 2017 (adaptada) — **Adaptação:** Questão 162: enunciado resumido sem contexto biológico; alternativas e gabarito (Ramo de hipérbole) mantidos. — **URL:** https://api.enem.dev/v1/exams/2017/questions/162
- **Conta de conferência:** v = K/(p + a) − b: hipérbole deslocada, com p restrito a um lado da assíntota

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `hiperbole` | Ramo de hipérbole | **sim** | "Isso. É y = k/x deslocada, e só um ramo tem sentido físico." |
| `obliqua` | Semirreta oblíqua | não | "Produto constante não dá reta: v = K/(p + a) − b é ramo de hipérbole." |
| `horizontal` | Semirreta horizontal | não | "v muda com p. A relação produto = K desenha um ramo de hipérbole." |
| `parabola` | Ramo de parábola | não | "Parábola teria um termo ao quadrado. Produto constante: hipérbole." |
| `circ` | Arco de circunferência | não | "Circunferência soma quadrados. Aqui é produto constante: hipérbole." |

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** focos e assíntotas a partir da equação.
- **Onde procurar:** UFRGS, PUC-Rio, UFAM (lista de cônicas do Projeto Agatha; precisam de ano).

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** reconhecer a cônica pela forma da equação.
- **Onde procurar:** UEL, FGV, Unicamp.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** relação inversamente proporcional como hipérbole.
- **Onde procurar:** ENEM (grandezas inversamente proporcionais com gráfico descrito em texto).
