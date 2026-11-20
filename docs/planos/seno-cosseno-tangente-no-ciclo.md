# Plano — Seno, cosseno, tangente e sinais por quadrante

**Aula:** 1 — Sombras nos Eixos · Seno, cosseno, tangente e simetrias nos quatro quadrantes
**Caminho:** geometria / trigonometria / seno-cosseno-tangente-no-ciclo
**Pré-requisitos que o aluno já domina:** radianos-e-ciclo-trigonometrico

## a) Ancoragem mecânica
A máquina gira um ponto P(x; y) sobre o ciclo trigonométrico de raio 1 conforme o ângulo θ e projeta sua sombra no eixo horizontal (cosseno), no eixo vertical (seno) e o prolongamento do raio na reta vertical x = 1 (tangente). O ângulo θ é a entrada; as coordenadas x = cos θ, y = sen θ e a altura na reta tangente tg θ são as saídas com seus sinais em cada quadrante.

## b) Visual de partida
WIDGET NOVO `ciclo_trigonometrico`: ciclo de raio 1 com eixos x (cosseno) e y (seno), reta tangente vertical tocando A(1; 0), ponto P arrastável de 0° a 360° e suas projeções coloridas nos três eixos. Ao passar do 1º quadrante, um retângulo de simetria liga P ao arco correspondente do 1º quadrante.

## c) Caso neutro
Em θ = 0°, o ponto P está em (1; 0): toda a projeção está no eixo horizontal (cos 0° = 1) e não há altura vertical (sen 0° = 0, tg 0° = 0). Essa posição inicial serve de partida para ver o seno crescer e o cosseno diminuir rumo a 90°.

## d) Panorama e recorte
Com as projeções definidas no ciclo, podemos demonstrar identidades algébricas e desenhar os gráficos das ondas trigonométricas. Aqui dominamos a leitura de seno, cosseno e tangente nos 4 quadrantes, a redução ao 1º quadrante e onde a tangente deixa de existir.

## e) Progressão por contraste
1. θ = 0° e 1º quadrante (referência): x > 0 e y > 0, logo seno, cosseno e tangente são todos positivos.
2. 2º quadrante (180° − α): P vai para a esquerda do eixo y; a altura y = sen θ continua positiva, mas x = cos θ fica negativo.
3. 3º e 4º quadrantes: no 3º quadrante ambos x e y são negativos (e tg θ = y/x fica positiva); no 4º quadrante x > 0 e y < 0.
4. Fronteira da tangente em 90° e 270°: o raio fica paralelo à reta tangente x = 1 e nunca a encontra (cos θ = 0).

## f) Dedução causal da forma
No triângulo retângulo dentro do ciclo de hipotenusa r = 1, cos θ = x / 1 = x e sen θ = y / 1 = y. Por semelhança com o triângulo até a reta x = 1, a altura na reta tangente é y / x, por isso cos θ é a abscissa, sen θ é a ordenada e tg θ = sen θ / cos θ (desde que cos θ ≠ 0).

## g) Simulação espacial e fronteiras
O aluno percorre os 4 quadrantes observando o sinal de x, y e y/x, compara os simétricos de 30° (150°, 210° e 330°) e testa os ângulos de eixo (0°, 90°, 180°, 270°), onde a reta do raio em 90° e 270° fica paralela ao eixo das tangentes.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Seno (eixo y) | Coordenada vertical do ponto P no ciclo unitário; varia de −1 a 1. |
| c2 | Cosseno (eixo x) | Coordenada horizontal do ponto P no ciclo unitário; varia de −1 a 1. |
| c3 | Tangente (reta x = 1) | Altura onde a reta do raio corta a tangente vertical; vale sen θ / cos θ. |
| c4 | Arco simétrico | Arco correspondente no 1º quadrante, que tem os mesmos módulos de seno e cosseno. |

### Passo 1 — `partida-e-1q`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `ciclo_trigonometrico` — ponto P em θ = 0° (cos 0° = 1 em c2, sen 0° = 0 em c1); slider `theta` de 0° a 90°. Emite `theta`.
- **Sliders:** `theta` · "Ângulo θ (graus)" · 0..90 · passo 30 · inicial 0 · ink
- **Paco (abertura):** "Em 0°, P está em (1; 0): cosseno 1 e seno 0. Suba θ até 90°: o que acontece com a sombra horizontal (cosseno) e a vertical (seno)?"
- **Interação do aluno:** move `theta` de 0° até 90°; vê a projeção horizontal c2 encolher de 1 até 0 e a vertical c1 crescer de 0 até 1.
- **Conclusão:** `theta ≥ 90`
- **Paco (conclusão):** "Em 90°, P chega a (0; 1): cos 90° = 0 e sen 90° = 1. No ciclo de raio 1, cosseno é o x do ponto e seno é o y."
- **Tati (dúvida):** `fim` — P: "Então agora seno e cosseno podem dar zero ou negativo?" / R: "Sim: como são coordenadas x e y no plano, ganham o sinal do quadrante e mais adiante viram ondas."

### Passo 2 — `simetria-4-quadrantes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 7 (quadrantes)
- **Widget:** `ciclo_trigonometrico` — fantasma fixo em 30° (c4) com retângulo de simetria ligando 30°, 150°, 210° e 330°; mostra sen θ (c1) e cos θ (c2). Emite `theta`.
- **Sliders:** `theta` · "Ângulo θ (graus)" · 30..330 · passo 60 · inicial 30 · c4
- **Paco (abertura):** "Em 30°, sen = 0,5 e cos ≈ 0,87. Passe por 150°, 210° e 330°: os números mudam ou só os sinais?"
- **Interação do aluno:** avança `theta` até 330°; o retângulo mostra que o tamanho das sombras é sempre o mesmo de 30°, mudando só o sinal em cada quadrante.
- **Conclusão:** `theta ≥ 330`
- **Paco (conclusão):** "Só os sinais mudam: em 150° temos sen > 0 e cos < 0; em 210° os dois são negativos; em 330° só o cosseno é positivo."

### Passo 3 — `reta-tangente-e-90`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7 (fronteira de domínio)
- **Widget:** `ciclo_trigonometrico` — reta tangente em x = 1 ativada (c3); prolongamento do raio corta a reta em tg θ. Emite `theta`.
- **Sliders:** `theta` · "Ângulo θ (graus)" · 0..135 · passo 45 · inicial 45 · c3
- **Paco (abertura):** "Em 45° o raio corta a reta tangente na altura 1. Leve θ a 90° e depois a 135°: onde o raio corta a reta em 90°?"
- **Interação do aluno:** passa por 90° (onde a linha do raio fica vertical e paralela à reta tangente, mostrando "não existe") e chega a 135° (tg 135° = −1).
- **Conclusão:** `theta ≥ 135`
- **Paco (conclusão):** "Em 90° o raio fica paralelo à reta tangente e cos 90° = 0, por isso tg 90° não existe. Em 135°, o prolongamento corta em −1."
- **Tati (dúvida):** `fim` — P: "Por que no 3º quadrante a tangente volta a ser positiva?" / R: "Porque no 3º quadrante seno e cosseno são ambos negativos, e negativo dividido por negativo dá positivo."

### Passo 4 — `desafio-reduzir-150`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `ciclo_trigonometrico_figura` — ciclo mostrando o ponto em 150° no 2º quadrante e seu simétrico de 30° no 1º quadrante (c4).
- **Paco (abertura):** "Olhe para que lado estão o x (cosseno) e o y (seno) do ponto de 150°."
- **Enunciado:** "Sabendo que em 30° temos sen 30° = 1/2 e cos 30° = √3/2, quanto valem sen 150° e cos 150°?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `spcm` | 1/2 e −√3/2 | **sim** | "Isso. No 2º quadrante y > 0 (seno positivo) e x < 0 (cosseno negativo)." | destaca y = +1/2 em c1 e x = −√3/2 em c2 |
| `smcp` | −1/2 e √3/2 | não | "Você trocou os sinais: no 2º quadrante o y (seno) é positivo e o x (cosseno) é negativo." | pisca o eixo y positivo e o eixo x negativo |
| `spcp` | 1/2 e √3/2 | não | "Em 150° o ponto está à esquerda do eixo y, então cos 150° é negativo: −√3/2." | destaca a projeção de 150° no semieixo x negativo |
| `smcm` | −1/2 e −√3/2 | não | "Ambos negativos é no 3º quadrante (210°). Em 150° o seno é +1/2 e o cosseno é −√3/2." | compara 150° (acima do eixo x) com 210° (abaixo) |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `ciclo_trigonometrico_figura` — ciclo completo com ponto P(cos θ; sen θ), projeções em c2 e c1, reta tangente em c3 e simétricos nos 4 quadrantes (c4).
- **Fórmula:** `P` · `=` · `(cos θ`→c2 · `;` · `sen θ)`→c1 · `;` · `tg θ`→c3 · `=` · `sen θ`→c1 · `/` · `cos θ`→c2
- **Definições:** "Seno (y): positivo no 1º e 2º quadrantes; negativo no 3º e 4º." · "Cosseno (x): positivo no 1º e 4º quadrantes; negativo no 2º e 3º." · "Tangente (y/x): positiva no 1º e 3º quadrantes; não existe em 90° e 270°."
- **Paco (abertura):** "Cosseno e seno são as coordenadas x e y no ciclo de raio 1, por isso seus sinais e simetrias vêm diretamente dos quatro quadrantes."
- **Dica (hint):** "Toque em cada razão na fórmula para ver seu eixo e seus sinais no ciclo."

**Frase de encerramento (outro):** "Você leu seno, cosseno e tangente como coordenadas no ciclo, descobriu os sinais nos 4 quadrantes e viu por que tg 90° não existe."

## i) Treino pós-aula

### Fáceis

#### F1 — `cosseno-180`
- **Enunciado:** "No ciclo trigonométrico, o ângulo de 180° fica no ponto (−1; 0). Quanto valem cos 180° e sen 180°?"
- **Conta de conferência:** cos 180° = x = −1; sen 180° = y = 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1e0` | −1 e 0 | **sim** | "Certo. Cosseno é o x (−1) e seno é o y (0)." |
| `z0em1` | 0 e −1 | não | "0 e −1 são de 270°. Em 180° o ponto é (−1; 0): cos = −1 e sen = 0." |
| `p1e0` | 1 e 0 | não | "1 e 0 são de 0°. Em 180° estamos na esquerda: cos 180° = −1 e sen 180° = 0." |
| `m1em1` | −1 e −1 | não | "Em 180° o ponto está sobre o eixo x (altura zero): cos = −1 e sen = 0." |

#### F2 — `sinais-2-quadrante`
- **Enunciado:** "Para um ângulo θ do 2º quadrante (entre 90° e 180°), os sinais de sen θ e cos θ são:"
- **Conta de conferência:** 2º Q: y > 0 (sen > 0) e x < 0 (cos < 0)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pm` | + e − | **sim** | "Isso. No 2º quadrante estamos acima do eixo x (sen > 0) e à esquerda do eixo y (cos < 0)." |
| `mp` | − e + | não | "− e + ocorrem no 4º quadrante. No 2º quadrante, sen é + e cos é −." |
| `mm` | − e − | não | "− e − ocorrem no 3º quadrante. No 2º quadrante, sen é + e cos é −." |
| `pp` | + e + | não | "+ e + ocorrem só no 1º quadrante. No 2º quadrante, sen é + e cos é −." |

#### F3 — `seno-270`
- **Enunciado:** "Quanto vale sen 270° (ou sen 3π/2)?"
- **Conta de conferência:** em 270°, P = (0; −1) ⇒ sen 270° = −1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sm1` | −1 | **sim** | "Exato. Em 270° estamos no ponto mais baixo do ciclo: y = −1." |
| `s0` | 0 | não | "0 é o cos 270°. A ordenada vertical em 270° é sen 270° = −1." |
| `sp1` | 1 | não | "1 é sen 90° (no topo). Lá embaixo, em 270°, sen 270° = −1." |
| `ne` | Não existe | não | "Quem não existe em 270° é a tangente. O seno vale −1." |

#### F4 — `tangente-sinal-3q`
- **Enunciado:** "No 3º quadrante, sen θ é negativo e cos θ é negativo. Qual é o sinal de tg θ?"
- **Conta de conferência:** tg θ = sen θ / cos θ = (−) / (−) = +

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pos` | Positivo | **sim** | "Certo. Negativo dividido por negativo dá positivo." |
| `neg` | Negativo | não | "Como sen θ < 0 e cos θ < 0, a divisão sen θ / cos θ fica positiva." |
| `zero` | Zero | não | "Tangente só é zero em 0° e 180°. No 3º quadrante ela é positiva." |
| `ind` | Indefinido | não | "No 3º quadrante cos θ ≠ 0, e (−)/(−) dá tangente positiva." |

### Médias

#### M1 — `valor-cos-120`
- **Enunciado:** "Sabendo que cos 60° = 1/2, quanto vale cos 120°?"
- **Conta de conferência:** 120° = 180° − 60° (2º Q) ⇒ cos 120° = −cos 60° = −1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `cm05` | −1/2 | **sim** | "Isso. 120° é simétrico de 60° no 2º quadrante, onde o cosseno é negativo: −1/2." |
| `cp05` | 1/2 | não | "120° está no 2º quadrante (x negativo), então cos 120° = −1/2." |
| `cmr3` | −√3/2 | não | "√3/2 é o sen 60°. O simétrico de cos 60° no 2º quadrante vale −1/2." |
| `cpr3` | √3/2 | não | "√3/2 é sen 120°. Para o cosseno no 2º quadrante: cos 120° = −1/2." |

#### M2 — `valor-tg-225`
- **Enunciado:** "Sabendo que tg 45° = 1, quanto vale tg 225°?"
- **Conta de conferência:** 225° = 180° + 45° (3º Q, tangente positiva) ⇒ tg 225° = +1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tp1` | 1 | **sim** | "Certo. 225° = 180° + 45° fica no 3º quadrante, onde a tangente é positiva: 1." |
| `tm1` | −1 | não | "No 3º quadrante seno e cosseno têm o mesmo sinal, então tg 225° = +1." |
| `t0` | 0 | não | "225° é o simétrico de 45° no 3º quadrante, logo tg 225° = 1." |
| `tr2` | √2/2 | não | "√2/2 é o módulo do seno e do cosseno; a divisão deles em 225° dá tg 225° = 1." |

#### M3 — `qual-quadrante`
- **Enunciado:** "Se sen θ < 0 e cos θ > 0, em qual quadrante está o arco θ?"
- **Conta de conferência:** y < 0 (abaixo) e x > 0 (direita) ⇒ 4º quadrante

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `q4` | 4º quadrante | **sim** | "Exato. Direita (x > 0) e abaixo (y < 0) formam o 4º quadrante." |
| `q2` | 2º quadrante | não | "No 2º quadrante sen > 0 e cos < 0. Para sen < 0 e cos > 0, é o 4º quadrante." |
| `q3` | 3º quadrante | não | "No 3º quadrante o cosseno também é negativo. Com cos > 0 e sen < 0, é o 4º Q." |
| `q1` | 1º quadrante | não | "No 1º quadrante ambos são positivos. Com sen < 0 e cos > 0, é o 4º Q." |

### Desafios

#### D1 — `seno-330-rad`
- **Enunciado:** "Quanto vale sen(11π/6), sabendo que π/6 = 30° e sen 30° = 0,5?"
- **Conta de conferência:** 11π/6 = 2π − π/6 = 330° (4º Q) ⇒ sen 330° = −sen 30° = −0,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sm05` | −0,5 | **sim** | "Isso. 11π/6 é 330° (simétrico de 30° no 4º Q), onde o seno vale −0,5." |
| `sp05` | 0,5 | não | "11π/6 está no 4º quadrante (y negativo), então sen(11π/6) = −0,5." |
| `pr3` | √3/2 | não | "√3/2 é cos(11π/6). Para o seno no 4º quadrante, o valor é −0,5." |
| `mr3` | −√3/2 | não | "O arco de referência é π/6 (30°), cujo seno tem módulo 0,5: −0,5." |

#### D2 — `duas-solucoes-seno`
- **Enunciado:** "Quantos arcos θ no intervalo [0°; 360°[ satisfazem sen θ = 1/2, e quais são?"
- **Conta de conferência:** sen > 0 no 1º Q (30°) e no 2º Q (180° − 30° = 150°)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d30e150` | Dois: 30° e 150° | **sim** | "Certo. A linha horizontal y = 1/2 corta o ciclo em 30° (1º Q) e em 150° (2º Q)." |
| `u30` | Apenas um: 30° | não | "No 2º quadrante a altura y também é +1/2: são dois arcos, 30° e 150°." |
| `d30e330` | Dois: 30° e 330° | não | "Em 330° o seno é −1/2 (30° e 330° têm o mesmo cosseno). Para sen = 1/2: 30° e 150°." |
| `d30e210` | Dois: 30° e 210° | não | "Em 210° o seno é −1/2. Os dois arcos com sen = +1/2 são 30° e 150°." |

#### D3 — `fronteira-tangente-inexistente`
- **Enunciado:** "Para quais valores de θ em [0; 2π[ a razão tg θ = sen θ / cos θ NÃO está definida?"
- **Conta de conferência:** cos θ = 0 ⇒ θ = π/2 e θ = 3π/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p2e3p2` | π/2 e 3π/2 | **sim** | "Exato. Em 90° (π/2) e 270° (3π/2) temos cos θ = 0, e não se divide por zero." |
| `z0ep` | 0 e π | não | "Em 0 e π temos sen θ = 0, então tg θ = 0. Ela não existe onde cos θ = 0: π/2 e 3π/2." |
| `sop2` | Apenas π/2 | não | "Em 3π/2 (270°) o cosseno também é zero; ela não existe em π/2 e 3π/2." |
| `todos` | Existe para todos | não | "Em π/2 e 3π/2 o cosseno vale zero e o raio fica paralelo à reta tangente." |

#### D4 — `expressao-eixos`
- **Enunciado:** "Quanto vale a expressão E = sen 90° + cos 180° − sen 270° + cos 0°?"
- **Conta de conferência:** E = 1 + (−1) − (−1) + 1 = 1 − 1 + 1 + 1 = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `e2` | 2 | **sim** | "Isso. E = 1 + (−1) − (−1) + 1 = 2." |
| `e0` | 0 | não | "Cuidado com −sen 270° = −(−1) = +1. A conta é 1 − 1 + 1 + 1 = 2." |
| `e4` | 4 | não | "cos 180° é −1, não +1. Assim, 1 + (−1) − (−1) + 1 = 2." |
| `em2` | −2 | não | "Substituindo: sen 90° = 1, cos 180° = −1, sen 270° = −1 e cos 0° = 1; soma = 2." |

#### D5 — `simetria-soma-zero`
- **Enunciado:** "Quanto vale a soma cos 40° + cos 140° + sen 210°?"
- **Fala do Paco:** "Compare 40° e 140°: eles são suplementares (somam 180°)."
- **Conta de conferência:** cos 140° = −cos 40° ⇒ cos 40° + cos 140° = 0; sen 210° = −sen 30° = −0,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sm05` | −0,5 | **sim** | "Exato. cos 140° = −cos 40° (cancelam-se), e sobra sen 210° = −0,5." |
| `sp05` | 0,5 | não | "cos 40° + cos 140° = 0, mas 210° está no 3º quadrante: sen 210° = −0,5." |
| `s0` | 0 | não | "cos 40° + cos 140° zera, mas falta somar sen 210° = −0,5." |
| `s15` | −1,5 | não | "Por simetria, cos 140° = −cos 40° (soma 0); logo sobra apenas sen 210° = −0,5." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2009-projecao`
- **Enunciado (resumido):** "P sai de (r; 0) na circunferência de raio r e percorre um arco d ≤ r no sentido anti-horário. Quanto anda sua projeção Q no eixo x?"
- **Fala do Paco:** "O ângulo central em radianos é θ = d/r. Calcule a variação da abscissa de Q desde x = r."
- **Fonte:** ENEM 2009 (adaptada) — **Adaptação:** Questão 174: enunciado resumido explicitando a partida em (R; 0); alternativas e gabarito (R( 1 - cos d/r )) mantidos. — **URL:** https://api.enem.dev/v1/exams/2009/questions/174
- **Conta de conferência:** `θ = d/R rad`; `x_Q` varia de `R` para `R·cos(d/R)` ⇒ distância `R(1 − cos(d/R))`.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sen` | r(1 − sen(d/r)) | não | "r · sen(d/r) é a altura y de P, não a abscissa de Q. Como x cai de r para r · cos(d/r), Q anda r(1 − cos(d/r))." |
| `cos` | r(1 − cos(d/r)) | **sim** | "Isso. Com ângulo θ = d/r rad, Q vai de r até r · cos(d/r), andando r(1 − cos(d/r))." |
| `tag` | r(1 − tg(d/r)) | não | "tg(d/r) não projeta P no eixo x. A projeção horizontal usa cosseno: r(1 − cos(d/r))." |
| `rsen` | r · sen(r/d) | não | "Inverteu a razão para r/d (o ângulo é arco/raio = d/r) e usou seno. O certo é r(1 − cos(d/r))." |
| `rcos` | r · cos(r/d) | não | "Além de inverter para r/d: r · cos(d/r) seria a posição final de Q, não o quanto ele andou desde x = r. O certo é r(1 − cos(d/r))." |

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** reduzir arcos do 2º, 3º e 4º quadrantes ao 1º quadrante para calcular seno, cosseno e tangente.
- **Onde procurar:** Fuvest, Vunesp, UFRGS, UFPR.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** identificar o sinal de expressões trigonométricas a partir do quadrante do arco.
- **Onde procurar:** Mackenzie, PUC, UERJ, UFRGS.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** resolver equação trigonométrica elementar (ex.: sen x = 1/2 ou cos x = −1/2) no intervalo [0; 2π].
- **Onde procurar:** Fuvest, Unicamp, Unesp.
