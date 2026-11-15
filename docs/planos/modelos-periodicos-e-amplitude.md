# Plano — Modelagem periódica, amplitude, período e fase

**Aula:** 1 — Domando a Onda · Linha média, amplitude e frequência nos fenômenos cíclicos
**Caminho:** geometria / trigonometria / modelos-periodicos-e-amplitude
**Pré-requisitos que o aluno já domina:** funcoes-trigonometricas, funcao-afim

## a) Ancoragem mecânica
A máquina transforma a onda básica sen x na função f(x) = D + A·sen(Bx + C) por meio de quatro controles: D sobe ou desce a linha média, A estica verticalmente a amplitude, B acelera ou freia a frequência (mudando o período para T = 2π/B) e C desloca a fase horizontalmente. Os parâmetros D, A, B e C são os agentes que o aluno ajusta para encaixar a onda nos dados reais de maré, roda-gigante ou temperatura.

## b) Visual de partida
`plano_cartesiano`: a senoide padrão y = sen x desenhada como curva fantasma, sobreposta pela curva viva f(x) = D + A·sen(Bx + C). Linhas horizontais tracejadas marcam a linha média y = D (c1), o máximo y = D + |A| e o mínimo y = D − |A|, e uma chave horizontal mostra o período T = 2π/B (c3).

## c) Caso neutro
Com D = 0, A = 1, B = 1 e C = 0, a máquina não altera nada e devolve f(x) = sen x, com linha média 0, amplitude 1, imagem [−1; 1] e período 2π. A partir dessa curva fantasma, alteramos um parâmetro de cada vez.

## d) Panorama e recorte
Ondas completas também podem ser somadas (séries de Fourier, batimentos acústicos) ou amortecidas no tempo. Aqui dominamos o modelo padrão f(t) = D + A·sen(Bt + C), campeão absoluto de questões do ENEM sobre fenômenos periódicos.

## e) Progressão por contraste
1. f(x) = sen x (referência): D = 0, A = 1, B = 1; oscila entre −1 e 1 com período 2π.
2. Amplitude A: dobrar A para 3 estica a onda verticalmente para [−3; 3] sem mexer nas raízes nem no período.
3. Linha média D: somar D = 4 levanta toda a onda, levando a imagem para [4 − 3; 4 + 3] = [1; 7].
4. Velocidade B e período T: aumentar B para 2 faz a onda correr o dobro mais rápido, encurtando o período para T = 2π / 2 = π.

## f) Dedução causal da forma
Como o seno varia sempre entre −1 e 1, o termo A·sen(Bx + C) varia entre −|A| e +|A|. Somando D, a função atinge mínimo D − |A| e máximo D + |A|; além disso, o arco interno completa uma volta quando Bx aumenta 2π, por isso o período é T = 2π / B.

## g) Simulação espacial e fronteiras
O aluno testa A negativo (que espelha a onda verticalmente, mas mantém a amplitude |A| positiva e a mesma imagem) e resolve o problema inverso: dados o máximo e o mínimo de uma roda-gigante, encontra D como a média (máx + mín)/2 e |A| como a semidiferença (máx − mín)/2.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Linha média D | Altura central da onda: média entre o valor máximo e o mínimo. |
| c2 | Amplitude |A| | Distância vertical da linha média até o topo ou até o fundo da onda. |
| c3 | Multiplicador B (frequência) | Acelera o giro dentro do seno e define o período T = 2π / B. |
| c4 | Fase C | Deslocamento horizontal que ajusta em que instante o ciclo começa. |

### Passo 1 — `amplitude-a`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** `plano_cartesiano` — fantasma y = sen x; curva ativa y = A·sen x com linhas de topo +A e fundo −A (c2).
- **Sliders:** `A` · "Amplitude A" · 1..3 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Com A = 1, a onda vai de −1 a 1 (caso neutro). Leve A até 3: para onde vão o máximo, o mínimo e o período da onda?"
- **Interação do aluno:** move o slider `A` de 1 para 3; a onda estica verticalmente até 3 e −3, mas continua cruzando o eixo x nos mesmos pontos.
- **Conclusão:** `A ≥ 3`
- **Paco (conclusão):** "O máximo vai a 3 e o mínimo a −3, mas o período continua 2π. A amplitude |A| só estica a altura da onda."
- **Tati (dúvida):** `fim` — P: "Onde usamos uma onda ajustável assim na vida real?" / R: "Em tudo que se repete: altura da maré, cadeira de roda-gigante, pressão arterial e temperatura ao longo do ano."

### Passo 2 — `linha-media-d`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 5, 6
- **Widget:** `plano_cartesiano` — fantasma y = 2·sen x; curva ativa y = D + 2·sen x com linha média tracejada y = D (c1) e faixa de imagem [D − 2; D + 2].
- **Sliders:** `D` · "Linha média D" · 0..4 · passo 2 · inicial 0 · c1
- **Paco (abertura):** "A onda 2·sen x oscila entre −2 e 2. Suba a linha média D para 4: quais passam a ser as alturas mínima e máxima?"
- **Interação do aluno:** move `D` até 4; toda a onda sobe 4 unidades, ficando entre 4 − 2 = 2 e 4 + 2 = 6.
- **Conclusão:** `D ≥ 4`
- **Paco (conclusão):** "Mínimo 4 − 2 = 2 e máximo 4 + 2 = 6. A linha média D fica bem no meio entre o mínimo e o máximo, a uma distância |A| de cada um."

### Passo 3 — `periodo-b`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7 (inversão de A e efeito de B)
- **Widget:** `plano_cartesiano` — fantasma y = sen x em [0; 2π]; curva ativa y = sen(Bx) mostrando o período T = 2π / B (c3).
- **Sliders:** `B` · "Multiplicador B" · 1..2 · passo 1 · inicial 1 · c3
- **Paco (abertura):** "Com B = 1, uma onda leva 2π para fechar. Dobre B para 2: o período da onda dobra para 4π ou cai pela metade para π?"
- **Interação do aluno:** muda `B` de 1 para 2; vê a onda acelerar e caber duas vezes dentro de [0; 2π], com período T = π.
- **Conclusão:** `B ≥ 2`
- **Paco (conclusão):** "Cai pela metade, para π! Multiplicar x por 2 faz o arco girar duas vezes mais rápido, por isso T = 2π / B."
- **Tati (dúvida):** `fim` — P: "E se o número A na frente do seno for negativo, tipo −3·sen x?" / R: "A onda vira de cabeça para baixo, mas a amplitude continua sendo |−3| = 3 e a imagem continua de −3 a 3."

### Passo 4 — `desafio-roda-gigante`
- **Tipo:** `micro_challenge`
- **Pilares:** 6, 7
- **Figura:** `plano_figura` — gráfico da altura h(t) = 12 + 10·sen(πt / 6) com linha média em 12 m (c1) e amplitude de 10 m (c2).
- **Paco (abertura):** "Olhe para D = 12 e A = 10: some para achar o topo e subtraia para achar a base."
- **Enunciado:** "A altura de uma cabine na roda-gigante é h(t) = 12 + 10·sen(πt / 6), em metros. Quais são as alturas máxima e mínima da cabine?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `m22e2` | 22 m e 2 m | **sim** | "Isso. Máximo = 12 + 10 = 22 m (quando sen = 1) e mínimo = 12 − 10 = 2 m (quando sen = −1)." | destaca o topo em 22 m e a base em 2 m |
| `m12e10` | 12 m e 10 m | não | "12 é a linha média e 10 é a amplitude. O máximo é 12 + 10 = 22 m e o mínimo é 12 − 10 = 2 m." | destaca a linha média 12 m e a seta ±10 m |
| `m10em10` | 10 m e −10 m | não | "Faltou somar a linha média 12: máximo 12 + 10 = 22 m e mínimo 12 − 10 = 2 m." | mostra a onda subindo de [−10; 10] para [2; 22] |
| `m22e12` | 22 m e 12 m | não | "12 m é o meio da roda (quando sen = 0). No fundo (sen = −1), a altura é 12 − 10 = 2 m." | marca o ponto mais baixo em y = 2 m |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `plano_figura` — onda completa f(x) = D + A·sen(Bx + C) com D (c1), amplitude |A| (c2), período T = 2π/B (c3) e fase C (c4).
- **Fórmula:** `f(x)` · `=` · `D`→c1 · `+` · `A`→c2 · `·sen(` · `B`→c3 · `x +` · `C`→c4 · `)` · `;` · `T`→c3 · `=` · `2π / B`→c3
- **Definições:** "Linha média e amplitude: D = (máx + mín) / 2 e |A| = (máx − mín) / 2." · "Imagem: varia sempre de D − |A| (mínimo) até D + |A| (máximo)." · "Período: T = 2π / |B| é o tempo ou espaço de um ciclo completo."
- **Paco (abertura):** "O seno sempre oscila entre −1 e 1 e fecha um ciclo em 2π, por isso a imagem vai de D − |A| a D + |A| e o período vale 2π / B."
- **Dica (hint):** "Toque em cada letra da fórmula para ver o que ela controla na onda."

**Frase de encerramento (outro):** "Você controlou a linha média D, a amplitude A e o período 2π/B da senoide para modelar fenômenos periódicos do mundo real."

## i) Treino pós-aula

### Fáceis

#### F1 — `maximo-basico`
- **Enunciado:** "Qual é o valor máximo da função f(x) = 5 + 3·sen x?"
- **Conta de conferência:** máx = D + |A| = 5 + 3 = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m8` | 8 | **sim** | "Certo. Quando sen x = 1, temos f(x) = 5 + 3·1 = 8." |
| `m3` | 3 | não | "3 é apenas a amplitude. Somando a linha média 5, o máximo é 5 + 3 = 8." |
| `m5` | 5 | não | "5 é a linha média (quando sen x = 0). No pico (sen x = 1), vale 5 + 3 = 8." |
| `m2` | 2 | não | "2 é o valor mínimo (5 − 3). O valor máximo é 5 + 3 = 8." |

#### F2 — `minimo-basico`
- **Enunciado:** "E qual é o valor mínimo da mesma função f(x) = 5 + 3·sen x?"
- **Conta de conferência:** mín = D − |A| = 5 − 3 = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `n2` | 2 | **sim** | "Isso. Quando sen x = −1, temos f(x) = 5 + 3·(−1) = 2." |
| `nm3` | −3 | não | "−3 seria sem o 5. Somando a linha média: 5 − 3 = 2." |
| `n5` | 5 | não | "5 é a linha média. Como o seno desce até −1, o mínimo é 5 − 3 = 2." |
| `n8` | 8 | não | "8 é o máximo. O mínimo ocorre quando sen x = −1: 5 − 3 = 2." |

#### F3 — `periodo-sen-4x`
- **Enunciado:** "Qual é o período T da função f(x) = sen(4x)?"
- **Conta de conferência:** T = 2π / B = 2π / 4 = π/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tp2` | π/2 | **sim** | "Exato. T = 2π / 4 = π/2." |
| `t8p` | 8π | não | "Divida 2π por 4 em vez de multiplicar: T = 2π / 4 = π/2." |
| `t4p` | 4π | não | "Use T = 2π / B com B = 4: T = 2π / 4 = π/2." |
| `t2p` | 2π | não | "2π é para sen(1x). Com B = 4, o período encurta para 2π / 4 = π/2." |

#### F4 — `identificar-amplitude`
- **Enunciado:** "Uma onda varia entre a altura mínima de 10 m e a altura máxima de 18 m. Qual é a sua linha média D e sua amplitude A?"
- **Conta de conferência:** D = (18 + 10)/2 = 14 m; A = (18 − 10)/2 = 4 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d14a4` | D = 14 m e A = 4 m | **sim** | "Certo. O meio entre 10 e 18 é 14 m, e a distância do meio ao topo é 18 − 14 = 4 m." |
| `d14a8` | D = 14 m e A = 8 m | não | "8 m é a distância total do fundo ao topo. A amplitude é metade disso: 4 m (e D = 14 m)." |
| `d10a8` | D = 10 m e A = 8 m | não | "10 m é o mínimo. A linha média fica no meio: D = 14 m e A = 4 m." |
| `d18a4` | D = 18 m e A = 4 m | não | "18 m é o máximo. A linha média fica em D = 14 m, com A = 4 m." |

### Médias

#### M1 — `amplitude-com-sinal-menos`
- **Enunciado:** "Qual é o conjunto imagem da função f(x) = 10 − 4·cos(2x)?"
- **Conta de conferência:** mín = 10 − 4 = 6; máx = 10 + 4 = 14 ⇒ [6; 14]

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `i6a14` | [6; 14] | **sim** | "Isso. Como cos(2x) varia de −1 a 1, f(x) varia entre 10 − 4 = 6 e 10 + 4 = 14." |
| `i6a10` | [6; 10] | não | "Quando cos(2x) = −1, temos 10 − 4·(−1) = 14. A imagem é [6; 14]." |
| `im4a4` | [−4; 4] | não | "Faltou somar a linha média 10: a imagem vai de 10 − 4 = 6 a 10 + 4 = 14." |
| `i8a12` | [8; 12] | não | "O 2 dentro de cos(2x) muda só o período; a amplitude é 4, dando [6; 14]." |

#### M2 — `periodo-em-horas`
- **Enunciado:** "A altura da maré em função do tempo t (em horas) é h(t) = 3 + 2·cos(πt / 6). Qual é o período T dessa maré?"
- **Conta de conferência:** B = π/6 ⇒ T = 2π / (π/6) = 12 horas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h12` | 12 horas | **sim** | "Certo. T = 2π / (π/6) = 2 · 6 = 12 horas." |
| `h6` | 6 horas | não | "Em t = 6 o arco vale π (meio ciclo). O ciclo completo de 2π leva 12 horas." |
| `h3` | 3 horas | não | "3 é a altura média. O período é T = 2π / (π/6) = 12 horas." |
| `h24` | 24 horas | não | "Para πt / 6 atingir 2π, basta t = 12 horas." |

#### M3 — `montar-equacao-temperatura`
- **Enunciado:** "A temperatura de uma estufa segue T(t) = D + A·sen(Bt), variando de 15 °C a 25 °C. Quanto valem D e A (com A > 0)?"
- **Conta de conferência:** D = (25 + 15)/2 = 20; A = (25 − 15)/2 = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d20a5` | D = 20 e A = 5 | **sim** | "Exato. Média D = (15 + 25)/2 = 20, e amplitude A = 25 − 20 = 5." |
| `d15a10` | D = 15 e A = 10 | não | "Se D = 15 e A = 10, o mínimo seria 15 − 10 = 5 °C. O certo é D = 20 e A = 5." |
| `d20a10` | D = 20 e A = 10 | não | "10 °C é a variação total (25 − 15). A amplitude A é metade disso: D = 20 e A = 5." |
| `d25a5` | D = 25 e A = 5 | não | "25 é o máximo; a linha média fica no meio: D = 20 e A = 5." |

### Desafios

#### D1 — `descobrir-b-pelo-periodo`
- **Enunciado:** "Uma roda-gigante dá uma volta completa a cada 40 segundos (T = 40). No modelo h(t) = D + A·sen(Bt), quanto vale B?"
- **Conta de conferência:** T = 2π / B = 40 ⇒ B = 2π / 40 = π/20

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `bp20` | π/20 | **sim** | "Isso. Como T = 2π / B = 40, temos B = 2π / 40 = π/20." |
| `bp40` | π/40 | não | "O período completo corresponde a 2π, não a π: B = 2π / 40 = π/20." |
| `b40` | 40 | não | "40 é o período T. O coeficiente B vale 2π / T = π/20." |
| `b20p` | 20π | não | "Divida 2π por 40: B = 2π / 40 = π/20." |

#### D2 — `instante-de-maximo`
- **Enunciado:** "Para h(t) = 10 + 6·sen(πt / 4), com t ≥ 0 em segundos, qual é o primeiro instante t em que h(t) atinge seu valor máximo de 16?"
- **Conta de conferência:** máximo quando sen(πt / 4) = 1 ⇒ πt / 4 = π/2 ⇒ t / 4 = 1/2 ⇒ t = 2 s

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t2` | 2 s | **sim** | "Certo. O seno vale 1 em π/2: fazendo πt / 4 = π/2, achamos t = 2 s." |
| `t4` | 4 s | não | "Em t = 4 temos sen π = 0 (altura 10). O máximo ocorre em πt / 4 = π/2 ⇒ t = 2 s." |
| `t1` | 1 s | não | "Em t = 1 o arco é π/4 (45°). Para dar π/2 (90°), precisamos de t = 2 s." |
| `t8` | 8 s | não | "8 s é o período inteiro (volta a 10). O primeiro máximo é em 1/4 do período: t = 2 s." |

#### D3 — `diametro-roda-gigante`
- **Enunciado:** "Na roda-gigante h(t) = 15 − 13·cos(πt / 10), em metros, qual é o diâmetro da roda e qual é a altura mínima do assento?"
- **Conta de conferência:** raio = amplitude = 13 m ⇒ diâmetro = 26 m; altura mínima = 15 − 13 = 2 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d26h2` | Diâmetro 26 m e base a 2 m | **sim** | "Exato. A amplitude 13 m é o raio (diâmetro 26 m), e o ponto mais baixo é 15 − 13 = 2 m." |
| `d13h2` | Diâmetro 13 m e base a 2 m | não | "13 m é o raio da roda (amplitude). O diâmetro é o dobro: 26 m, e a base fica a 2 m." |
| `d26h15` | Diâmetro 26 m e base a 15 m | não | "15 m é a altura do eixo central. A base fica em 15 − 13 = 2 m (diâmetro 26 m)." |
| `d30h2` | Diâmetro 30 m e base a 2 m | não | "O raio é a amplitude 13 m, então o diâmetro é 2 · 13 = 26 m e a base está a 2 m." |

#### D4 — `frequencia-batimentos`
- **Enunciado:** "A pressão arterial num treino é P(t) = 110 + 30·sen(4πt), com t em segundos. Quantos batimentos completos ocorrem em 1 segundo?"
- **Conta de conferência:** T = 2π / (4π) = 0,5 s por ciclo ⇒ 2 ciclos por segundo

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `b2` | 2 batimentos | **sim** | "Isso. O período é T = 2π / 4π = 0,5 s, então cabem 2 batimentos em 1 segundo." |
| `b4` | 4 batimentos | não | "Cada ciclo exige 2π radianos: 4π / 2π = 2 batimentos por segundo." |
| `b05` | 0,5 batimento | não | "0,5 s é a duração de 1 batimento; em 1 segundo ocorrem 2 batimentos." |
| `b30` | 30 batimentos | não | "30 é a amplitude da pressão. Como T = 2π / 4π = 0,5 s, são 2 batimentos por segundo." |

#### D5 — `modelo-completo-com-fase`
- **Enunciado:** "Em V(t) = 50 + 20·sen(πt/12 − π/2), em mil litros (0 ≤ t ≤ 24 h), qual é o volume em t = 0 e em que hora t atinge 70 mil litros?"
- **Fala do Paco:** "Para t = 0, lembre que sen(−π/2) = −1; para 70 mil, iguale o seno a 1."
- **Conta de conferência:** V(0) = 50 + 20·sen(−π/2) = 50 − 20 = 30; para V = 70, sen(πt/12 − π/2) = 1 ⇒ πt/12 − π/2 = π/2 ⇒ πt/12 = π ⇒ t = 12 h

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v30t12` | 30 mil litros e t = 12 h | **sim** | "Exato. Em t = 0, 50 + 20·(−1) = 30; para 70, πt/12 − π/2 = π/2 ⇒ t = 12 h." |
| `v50t6` | 50 mil litros e t = 6 h | não | "Por causa da fase −π/2, em t = 0 temos sen(−π/2) = −1 (30 mil), e o máximo é em t = 12 h." |
| `v30t6` | 30 mil litros e t = 6 h | não | "Em t = 6 h o arco vale 0 (V = 50). O máximo 70 ocorre quando πt/12 − π/2 = π/2 ⇒ t = 12 h." |
| `v70t12` | 70 mil litros e t = 12 h | não | "Em t = 0 temos sen(−π/2) = −1, então V(0) = 50 − 20 = 30 mil litros (e máximo em t = 12 h)." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular os valores máximo e mínimo de um fenômeno modelado por f(t) = D + A·sen(Bt + C).
- **Onde procurar:** ENEM (questões clássicas de maré, pistão, pressão arterial ou temperatura).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** determinar o período T = 2π/B ou o instante de ocorrência do máximo/mínimo numa função trigonométrica.
- **Onde procurar:** ENEM, Unicamp, Vunesp.

#### V3 — ENEM 2021 — Questão 156
- **Habilidade-alvo:** montar a expressão algébrica f(t) = D + A·sen(Bt + C) ou D + A·cos(Bt + C) a partir de um gráfico ou tabela periódica.
- **Onde procurar:** ENEM, Fuvest, UFRGS, UFPR.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** interpretar os parâmetros geométricos de uma roda-gigante (altura do centro D, raio A e tempo de volta T) na função trigonométrica.
- **Onde procurar:** ENEM, Unesp, UERJ.

---
**Notas da implementação (JSON):** unidade criada na taxonomia (geometria / trigonometria, ícone `onda`, título "Modelagem Periódica"). Sliders com ids minúsculos (`a`, `d`, `b`: o `$slider` não aceita maiúscula). Panorama (somar ondas/Fourier) como dúvida de `linha-media-d`; a dúvida "onda na vida real" ficou no passo 1; a de A negativo no passo 3. Vestibular `[]`. Linhas de topo/linha média/mínimo são curvas afins a = 0 (não há marcador próprio). Sem correção de gabarito: todas as contas conferidas por teste.
**Lacunas de widget:** o tipo `seno` é a·sen(b·x) + c, sem fase C (então c4 = Fase não tem elemento no gráfico e nenhum passo mexe em C; só D5 do treino usa fase, em texto); sem chave do período T = 2π/B; linhas de máximo/mínimo/linha média só por curvas afins; o fantasma "y = sen x em [0; 2π]" é limitado só pela janela.
