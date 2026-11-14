# Plano — Graus, radianos e ciclo trigonométrico

**Aula:** 1 — O Raio que Mede a Curva · Do grau ao radiano e às voltas no ciclo
**Caminho:** geometria / trigonometria / radianos-e-ciclo-trigonometrico
**Pré-requisitos que o aluno já domina:** trigonometria-no-triangulo-retangulo

## a) Ancoragem mecânica
A máquina gira o ponteiro do ciclo trigonométrico de raio r = 1 a partir do ponto A(1; 0) e mede o comprimento do arco percorrido na borda. O giro é a entrada que o aluno controla; o ângulo em graus e o comprimento do arco em radianos são as duas réguas de saída, onde meia-volta de 180° equivale exatamente a π radianos.

## b) Visual de partida
WIDGET NOVO `ciclo_trigonometrico`: circunferência de raio unitário r = 1 centrada na origem, com o ponto inicial A(1; 0) e um ponto P arrastável ao longo do ciclo (ou controlado por slider de giro). Mostra o arco percorrido esticado ao lado como uma fita métrica em unidades de raio (radianos) e a leitura simultânea em graus.

## c) Caso neutro
Com giro zero (θ = 0° = 0 rad), o ponto P repousa na largada A(1; 0) e o arco tem comprimento zero. O segundo marco de referência é o giro de 1 radiano (≈ 57,3°), onde o comprimento do arco na borda é exatamente igual a 1 raio.

## d) Panorama e recorte
O ciclo trigonométrico permitirá ler seno, cosseno, tangente e construir ondas periódicas para qualquer número real. Nesta aula construímos a régua do ciclo: a medida em radianos, a conversão com graus e os arcos côngruos após várias voltas.

## e) Progressão por contraste
1. θ = 0 rad e θ = 1 rad (referência): um arco na borda com o exato comprimento de 1 raio define 1 radiano.
2. Meia-volta (180°): cabem pouco mais de 3 raios (π ≈ 3,14 raios) na meia-circunferência, cravando π rad = 180°.
3. Frações de meia-volta: dividir 180° por 2, 3, 4 e 6 gera π/2 (90°), π/3 (60°), π/4 (45°) e π/6 (30°).
4. Mais de uma volta (arcos côngruos): somar 2π rad (360°) dá uma volta inteira e devolve o ponto P exatamente ao mesmo lugar do ciclo.

## f) Dedução causal da forma
O comprimento de uma circunferência inteira é C = 2πr. Como cada radiano mede 1 raio de arco, na volta completa de 360° cabem C / r = 2π radianos; dividindo ao meio, por isso 180° corresponde a π radianos e qualquer conversão usa essa proporção direta.

## g) Simulação espacial e fronteiras
O aluno gira P além de 360° (ex.: 420° = 60° + 360°) e no sentido horário (ângulos negativos, ex.: −60° = 300°) para ver que arcos diferentes na fita métrica param no mesmo ponto geométrico da circunferência.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Raio unitário | Raio r = 1 do ciclo trigonométrico que serve de unidade de medida. |
| c2 | Arco em radianos | Comprimento do arco no ciclo medido em quantidades de raio (rad). |
| c3 | Ângulo em graus | Medida do giro onde a volta inteira é dividida em 360 partes (graus). |
| c4 | Arco côngruo | Arco que difere de outro por voltas completas (2kπ) e para no mesmo ponto. |

### Passo 1 — `um-radiano`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `ciclo_trigonometrico` — ciclo de raio r = 1 (c1), fita do arco em radianos (c2) e mostrador em graus (c3); começa em 0 rad. Emite `rad`.
- **Sliders:** `rad` · "Giro em radianos" · 0..3 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Na largada o arco é 0. Avance o giro até 1 radiano: que tamanho tem esse arco comparado ao raio?"
- **Interação do aluno:** move `rad` de 0 para 1; vê um segmento de comprimento 1 (igual ao raio) curvar-se sobre a borda até cerca de 57,3°.
- **Conclusão:** `rad ≥ 1`
- **Paco (conclusão):** "Tem exatamente 1 raio de comprimento: isso é 1 radiano. Em graus, esse mesmo giro dá cerca de 57,3°."
- **Tati (dúvida):** `fim` — P: "Por que criar o radiano se já temos o grau?" / R: "Porque o radiano mede a distância real percorrida no ciclo de raio 1, o que será essencial nas funções trigonométricas."

### Passo 2 — `meia-volta-pi`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `ciclo_trigonometrico` — marcações de 1 rad, 2 rad, 3 rad em fantasma; slider `graus` em múltiplos de 30° mostrando a fração de π correspondente. Emite `graus`.
- **Sliders:** `graus` · "Giro em graus" · 0..180 · passo 30 · inicial 60 · c3
- **Paco (abertura):** "Três raios quase fecham meia-volta. Leve o giro até 180°: quantos radianos cabem exatamente em meia circunferência?"
- **Interação do aluno:** arrasta `graus` até 180° e vê o arco completar π rad ≈ 3,14 rad no ponto (−1; 0).
- **Conclusão:** `graus ≥ 180`
- **Paco (conclusão):** "Cabem exatamente π radianos: 180° = π rad. Dividindo 180° por 2, 3 ou 6, achamos π/2 = 90°, π/3 = 60° e π/6 = 30°."

### Passo 3 — `arcos-congruos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 7 (fronteira de voltas)
- **Widget:** `ciclo_trigonometrico` — fantasma parado em 60° (π/3); ponto ativo gira de 0° a 420° marcando o número de voltas completas k. Emite `graus`.
- **Sliders:** `graus` · "Giro total (graus)" · 60..420 · passo 60 · inicial 60 · c4
- **Paco (abertura):** "O ponto fantasma está em 60° (π/3). Some uma volta inteira levando o giro até 420°: onde o ponto vai parar?"
- **Interação do aluno:** move `graus` de 60° até 420°; o ponto dá uma volta completa e pousa exatamente sobre o fantasma de 60°.
- **Conclusão:** `graus ≥ 420`
- **Paco (conclusão):** "Pousa no mesmo lugar de 60°, pois 420° = 60° + 360°. Arcos que diferem por voltas inteiras (2kπ) são chamados de côngruos."
- **Tati (dúvida):** `fim` — P: "E se a gente girar ao contrário, no sentido dos ponteiros do relógio?" / R: "Aí o ângulo é negativo: girar −60° para no mesmo ponto que girar +300°."

### Passo 4 — `desafio-conversao`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `ciclo_trigonometrico_figura` — ciclo com meia-volta π rad = 180° destacada e um arco no 2º quadrante em 120° (c3).
- **Paco (abertura):** "Lembre que 60° é π/3 rad; veja quantos blocos de 60° cabem em 120°."
- **Enunciado:** "Sabendo que π rad = 180°, quanto vale o ângulo de 120° em radianos?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `r2p3` | 2π/3 rad | **sim** | "Isso. 120° é 2 · 60°, então vale 2 · (π/3) = 2π/3 rad." | divide o arco de 180° em 3 partes e destaca 2π/3 |
| `rp3` | π/3 rad | não | "π/3 rad é 60°. Como 120° é o dobro de 60°, vale 2π/3 rad." | mostra o arco de 60° (π/3) ao lado do de 120° |
| `r3p2` | 3π/2 rad | não | "Você inverteu a fração: 3π/2 é 270°. Para 120°: 120π / 180 = 2π/3 rad." | marca 270° lá embaixo e destaca 120° = 2π/3 |
| `r2p` | 2π rad | não | "2π rad é a volta inteira de 360°. Para 120°, fica 2π/3 rad." | destaca a volta completa de 360° contra 120° |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `ciclo_trigonometrico_figura` — ciclo de raio r = 1 (c1) com os marcos π/6, π/4, π/3, π/2, π e 2π (c2), graus (c3) e expressão de arcos côngruos (c4).
- **Fórmula:** `π rad`→c2 · `=` · `180°`→c3 · `;` · `θ_geral`→c4 · `=` · `θ`→c2 · `+` · `2kπ`→c4
- **Definições:** "1 radiano: arco cujo comprimento é igual ao raio da circunferência." · "Conversão: π rad equivale a 180° (meia-volta) e 2π rad equivale a 360°." · "Arcos côngruos: diferem por k voltas inteiras (360°·k ou 2kπ) e têm a mesma extremidade."
- **Paco (abertura):** "A circunferência de raio 1 mede 2π de comprimento, por isso a volta de 360° vale 2π rad e a meia-volta de 180° vale π rad."
- **Dica (hint):** "Toque em cada parte da fórmula para ver a equivalência no ciclo trigonométrico."

**Frase de encerramento (outro):** "Você mediu arcos usando o próprio raio, descobriu que π rad = 180° e viu que somar 2π devolve o ponto ao mesmo lugar."

## i) Treino pós-aula

### Fáceis

#### F1 — `pi-sobre-2`
- **Enunciado:** "Sabendo que π rad = 180°, quantos graus valem π/2 rad?"
- **Conta de conferência:** 180° / 2 = 90°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g90` | 90° | **sim** | "Certo. Metade de 180° é 90°." |
| `g180` | 180° | não | "180° é π rad inteiro. Dividindo por 2, π/2 rad = 90°." |
| `g45` | 45° | não | "45° é π/4 rad. Para π/2 rad, fazemos 180° / 2 = 90°." |
| `g270` | 270° | não | "270° é 3π/2 rad. Para π/2 rad, o valor é 90°." |

#### F2 — `graus-60-em-rad`
- **Enunciado:** "Quanto vale o ângulo de 60° em radianos?"
- **Conta de conferência:** 60° = 180° / 3 = π/3 rad

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `rp3` | π/3 rad | **sim** | "Isso. 60° é a terça parte de 180°, então vale π/3 rad." |
| `rp6` | π/6 rad | não | "π/6 rad é 180° / 6 = 30°. Para 60°, é π/3 rad." |
| `rp4` | π/4 rad | não | "π/4 rad é 45°. Como 180° / 3 = 60°, a resposta é π/3 rad." |
| `r3p` | 3π rad | não | "Divida π por 3 em vez de multiplicar: 60° = π/3 rad." |

#### F3 — `definicao-1-rad`
- **Enunciado:** "Numa circunferência de raio 5 cm, qual é o comprimento de um arco de 1 radiano?"
- **Conta de conferência:** l = θ · r = 1 · 5 = 5 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c5` | 5 cm | **sim** | "Exato. 1 radiano é o arco que tem o mesmo comprimento do raio: 5 cm." |
| `c1` | 1 cm | não | "Seria 1 cm se o raio fosse 1 cm. Com raio 5 cm, 1 rad mede 5 cm." |
| `c10` | 10 cm | não | "10 cm são 2 raios (2 radianos). O arco de 1 radiano mede 5 cm." |
| `c5p` | 5π cm | não | "5π cm é meia-volta (π rad). Um arco de 1 radiano mede 1 raio: 5 cm." |

#### F4 — `volta-completa`
- **Enunciado:** "Uma volta completa de 360° no ciclo trigonométrico equivale a quantos radianos?"
- **Conta de conferência:** 2 · 180° = 2π rad

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r2p` | 2π rad | **sim** | "Certo. Se meia-volta é π rad, a volta inteira é 2π rad." |
| `rp` | π rad | não | "π rad é meia-volta (180°). A volta completa de 360° vale 2π rad." |
| `r4p` | 4π rad | não | "4π rad são duas voltas. Uma volta de 360° vale 2π rad." |
| `r360p` | 360π rad | não | "Troque 180° por π rad: 360° = 2 · 180° = 2π rad." |

### Médias

#### M1 — `converter-270`
- **Enunciado:** "Converta 270° para radianos."
- **Conta de conferência:** 270° = 3 · 90° = 3π/2 rad

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r3p2` | 3π/2 rad | **sim** | "Isso. São três quartos de volta: 3 · (π/2) = 3π/2 rad." |
| `r2p3` | 2π/3 rad | não | "2π/3 rad é 120°. Simplificando 270π / 180 por 90, dá 3π/2 rad." |
| `r5p4` | 5π/4 rad | não | "5π/4 rad é 225°. Para 270°, são 3 · 90° = 3π/2 rad." |
| `r3p4` | 3π/4 rad | não | "3π/4 rad é 135°. O dobro disso é 270° = 3π/2 rad." |

#### M2 — `primeira-determinacao-780`
- **Enunciado:** "Qual é a primeira determinação positiva (entre 0° e 360°) do arco de 780°?"
- **Conta de conferência:** 780° = 2 · 360° + 60° ⇒ 60°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g60` | 60° | **sim** | "Certo. Duas voltas dão 720°, e sobram 780° − 720° = 60°." |
| `g120` | 120° | não | "Duas voltas são 720°, não 660°. O resto é 780° − 720° = 60°." |
| `g30` | 30° | não | "780° − 720° = 60° (duas voltas completas mais 60°)." |
| `g2` | 2° | não | "2 é o número de voltas; o arco que sobra é 780° − 720° = 60°." |

#### M3 — `comprimento-arco`
- **Enunciado:** "Numa pista circular de raio 10 m, um corredor percorre um arco de 1,5 rad. Quantos metros ele correu?"
- **Conta de conferência:** l = θ · r = 1,5 · 10 = 15 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m15` | 15 m | **sim** | "Exato. Cada radiano vale 1 raio (10 m), então 1,5 · 10 = 15 m." |
| `m10` | 10 m | não | "10 m é 1 radiano. Em 1,5 rad ele corre 1,5 · 10 = 15 m." |
| `m15p` | 15π m | não | "O ângulo já está em radianos (sem π): basta fazer 1,5 · 10 = 15 m." |
| `m66` | 6,6 m | não | "Multiplique o raio pelo ângulo em radianos: 10 · 1,5 = 15 m." |

### Desafios

#### D1 — `arco-negativo`
- **Enunciado:** "Se você girar −50° (no sentido horário) a partir do 0°, em qual arco positivo de 0° a 360° você para?"
- **Conta de conferência:** 360° − 50° = 310°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g310` | 310° | **sim** | "Isso. Somando uma volta inteira: −50° + 360° = 310°." |
| `g50` | 50° | não | "50° é no sentido anti-horário. No horário: 360° − 50° = 310°." |
| `g130` | 130° | não | "Você usou 180° − 50°. A volta completa é 360°: 360° − 50° = 310°." |
| `g230` | 230° | não | "Some 360° ao arco negativo: −50° + 360° = 310°." |

#### D2 — `congruo-em-radianos`
- **Enunciado:** "Qual arco entre 0 e 2π é côngruo a 9π/4 rad?"
- **Conta de conferência:** 9π/4 = 8π/4 + π/4 = 2π + π/4 ⇒ π/4 rad

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `rp4` | π/4 rad | **sim** | "Certo. 8π/4 é uma volta inteira (2π), então sobra π/4 rad." |
| `r3p4` | 3π/4 rad | não | "Desconte uma volta de 2π = 8π/4: 9π/4 − 8π/4 = π/4 rad." |
| `r5p4` | 5π/4 rad | não | "Uma volta inteira vale 8π/4, não 4π/4. Sobram 9π/4 − 8π/4 = π/4 rad." |
| `rp2` | π/2 rad | não | "9π/4 − 2π = 9π/4 − 8π/4 = π/4 rad." |

#### D3 — `ponteiro-minutos`
- **Enunciado:** "Que ângulo, em radianos, o ponteiro dos minutos de um relógio varre em 20 minutos?"
- **Conta de conferência:** 20 min = 1/3 de hora (1/3 de volta) = 2π/3 rad

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r2p3` | 2π/3 rad | **sim** | "Exato. 20 min é 1/3 de 60 min; 1/3 da volta de 2π rad dá 2π/3 rad." |
| `rp3` | π/3 rad | não | "π/3 rad é 1/3 de meia-volta (10 min). Em 20 min, é 1/3 de 2π = 2π/3 rad." |
| `rp6` | π/6 rad | não | "20 minutos são 120° (um terço de 360°), que valem 2π/3 rad." |
| `r4p3` | 4π/3 rad | não | "4π/3 rad seriam 40 minutos. Em 20 minutos o giro é 2π/3 rad." |

#### D4 — `quadrante-de-3 rad`
- **Enunciado:** "Sabendo que π ≈ 3,14 e π/2 ≈ 1,57, em qual quadrante fica o arco de 3 radianos?"
- **Conta de conferência:** 1,57 < 3 < 3,14 ⇒ entre π/2 e π ⇒ 2º quadrante

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `q2` | 2º quadrante | **sim** | "Isso. Como 1,57 < 3 < 3,14, o arco de 3 rad está entre 90° e 180° (2º Q)." |
| `q1` | 1º quadrante | não | "O 1º quadrante vai até π/2 ≈ 1,57 rad. Como 3 > 1,57, está no 2º quadrante." |
| `q3` | 3º quadrante | não | "O 3º quadrante começa em π ≈ 3,14 rad. Como 3 < 3,14, ainda é 2º quadrante." |
| `q4` | 4º quadrante | não | "3 rad é quase meia-volta (3,14 rad), logo fica no 2º quadrante." |

#### D5 — `bicicleta-voltas`
- **Enunciado:** "Uma roda de raio 0,4 m girou um ângulo total de 10π rad. Quantas voltas completas ela deu e quantos metros andou (use π ≈ 3)?"
- **Fala do Paco:** "Cada volta são 2π rad; a distância é o ângulo em radianos vezes o raio."
- **Conta de conferência:** voltas = 10π / (2π) = 5; distância = 10π · 0,4 = 4π ≈ 12 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v5d12` | 5 voltas e 12 m | **sim** | "Exato. 10π / 2π = 5 voltas, e d = 10 · 3 · 0,4 = 12 m." |
| `v10d12` | 10 voltas e 12 m | não | "10π rad dividido por 2π rad por volta dá 5 voltas, e 12 m percorridos." |
| `v5d6` | 5 voltas e 6 m | não | "A distância é θ · r = 10π · 0,4 = 4π ≈ 12 m (5 voltas e 12 m)." |
| `v10d24` | 10 voltas e 24 m | não | "Cada volta é 2π rad: são 5 voltas e 10π · 0,4 ≈ 12 m." |

### Vestibular

#### V1 — `enem-2018-camera`
- **Enunciado (resumido):** Uma câmera aponta para Oeste (180°) e gira: 135° anti-horário, 60° horário e 45° anti-horário. Qual o menor giro até Noroeste (135°)?
- **Fala do Paco:** "Some os giros anti-horários e subtraia o horário a partir de 180° para achar a posição final."
- **Fonte:** ENEM 2018, Questão 171 — `https://api.enem.dev/v1/exams/2018/questions/171`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`165° no sentido horário`) mantidos.
- **Conta de conferência:** `180° + 135° − 60° + 45° = 300°`; menor giro até `135°`: `300° − 135° = 165°` no sentido horário.
- **Opções e feedback:** `75° no sentido horário`, `105° no sentido anti-horário`, `120° no sentido anti-horário`, `135° no sentido anti-horário`, `165° no sentido horário` (correta).

#### V2 — `enem-2012-vulcao`
- **Enunciado (resumido):** Um vulcão está na longitude 124° 3' 0", sabendo que 1° = 60' e 1' = 60". Qual é essa medida em graus na forma decimal?
- **Fala do Paco:** "Divida os 3 minutos por 60 para converter em fração de grau."
- **Fonte:** ENEM 2012, Questão 171 — `https://api.enem.dev/v1/exams/2012/questions/171`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`124,05°`) mantidos.
- **Conta de conferência:** `3' = 3/60° = 0,05° ⇒ 124° + 0,05° = 124,05°`.
- **Opções e feedback:** `124,02°`, `124,05°` (correta), `124,20°`, `124,30°`, `124,50°`.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular ângulo entre ponteiros de relógio ou giro de ponteiro em radianos.
- **Onde procurar:** Fuvest, Vunesp, ENEM.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** relacionar o número de voltas de uma roda ao deslocamento linear usando radianos.
- **Onde procurar:** ENEM, Unicamp, Unesp.
