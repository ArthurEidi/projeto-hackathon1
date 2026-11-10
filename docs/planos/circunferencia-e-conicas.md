# Plano — Circunferência e cônicas

## a) Ancoragem mecânica
A circunferência de centro `C(a, b)` e raio `r` é uma máquina de distância constante: qualquer ponto `P(x, y)` entra na régua pitagórica `(x − a)² + (y − b)²` e, se a saída for exatamente `r²`, o ponto pertence ao traçado. Esticar diferentemente os dois eixos ou abrir o centro em dois focos transforma essa mesma máquina nas cônicas irmãs: **elipse** (soma das distâncias aos focos constante: `d₁ + d₂ = 2a`), **hipérbole** (diferença constante: `|d₁ − d₂| = 2a`) e **parábola** (distância ao foco igual à distância à diretriz).

## b) Visual de partida
Palco no `plano_cartesiano` combinado com visão de corte em `solido_3d`: no plano 2D, circunferência viva com centro `C(a, b)` arrastável, slider de raio `r`, ponto `P(x, y)` percorrendo a curva com o triângulo retângulo de catetos `|x − a|` e `|y − b|` e hipotenusa `r`, além de controle para afastar os dois focos `F₁, F₂` e observar a circunferência virar elipse.

## c) Caso neutro
Circunferência centrada na origem `C(0, 0)` com raio `r = 1` (ou `r = 5` para ternas inteiras `3-4-5`): equação mínima `x² + y² = r²`, sem deslocamentos `a` ou `b` e com os dois focos fundidos num único centro (`c = 0`, excentricidade zero).

## d) Panorama e recorte
Situar equação reduzida `(x − a)² + (y − b)² = r²` e geral da circunferência (completando quadrados), posição relativa entre ponto/reta e circunferência, e visão panorâmica das cônicas (elipse, hipérbole, parábola) como cortes do cone e lugares geométricos. Escopo: domínio completo da circunferência e reconhecimento visual/equação canônica das cônicas centradas na origem. Deixar rotação de eixos e retas tangentes com discriminante extenso para aprofundamento.

## e) Progressão por contraste
1. Circunferência na origem `x² + y² = r²` versus circunferência deslocada `(x − a)² + (y − b)² = r²`: a forma e o raio não mudam, apenas o centro translada para `(a, b)`.
2. Ponto dentro (`d < r`), sobre (`d = r`) e fora (`d > r`) da circunferência; reta secante (`d < r`, 2 pontos), tangente (`d = r`, 1 ponto) e externa (`d > r`, 0 pontos).
3. Circunferência (`x²/r² + y²/r² = 1`, raios iguais) versus **elipse** (`x²/a² + y²/b² = 1`, raios horizontal `a` e vertical `b` diferentes, centro dividido em dois focos com `a² = b² + c²`).
4. Soma de quadrados na elipse (`x²/a² + y²/b² = 1`, curva fechada) versus diferença de quadrados na **hipérbole** (`x²/a² − y²/b² = 1`, curva aberta em dois ramos).

## f) Dedução causal da forma
Por que a equação da circunferência tem `(x − a)` e `(y − b)` com sinal de menos? Porque `x − a` e `y − b` são literalmente os catetos do triângulo retângulo que mede a distância entre `P(x, y)` e o centro `C(a, b)`; aplicar Pitágoras exige `cateto₁² + cateto₂² = hipotenusa²`, isto é, `(x − a)² + (y − b)² = r²`. Na elipse de barbante `d₁ + d₂ = 2a`, quando o ponto está no topo do eixo menor `b`, os dois fios até os focos `±c` são iguais a `a`, formando dois triângulos retângulos de catetos `b, c` e hipotenusa `a` (`a² = b² + c²`).

## g) Simulação espacial e fronteiras
Variar o termo independente na equação geral `x² + y² − 2ax − 2by + k = 0`: após completar os quadrados, se o lado direito `r²` for positivo temos uma circunferência real; na fronteira `r² = 0` ela colapsa num único ponto `(a, b)`; se `r² < 0`, nenhum ponto real satisfaz a equação (conjunto vazio). No corte do cone (`solido_3d`), inclinar o plano de corte de horizontal (`0°`) até passar pela geratriz transita continuamente entre círculo → elipse → parábola → hipérbole.

## h) Roteiro da lição

1. **Fala:** “Se um ponto `P(x, y)` gira sempre a distância `r = 5` da origem `(0, 0)`, que relação o triângulo retângulo de catetos `x` e `y` obedece? Obedece `x² + y² = 5² = 25`, a própria equação da circunferência!” **Widget §5.1 — `plano_cartesiano`:** aluno arrasta `P` pela circunferência de raio 5 na origem, passando por `(3, 4)`, `(0, 5)` e `(−4, 3)` com o triângulo retângulo vivo.
2. **Fala:** “Se movermos o centro da circunferência da origem para `C(2, 1)` mantendo o raio 5, quanto medem agora os catetos até `P(x, y)`? Medem `x − 2` e `y − 1`, então Pitágoras escreve `(x − 2)² + (y − 1)² = 25`.” **Widget §5.1 — `plano_cartesiano`:** aluno arrasta o centro `C` para `(2, 1)` sobre a circunferência fantasma da origem, vendo os catetos `x − 2` e `y − 1`.
3. **Fala:** “Cuidado com o sinal: na equação `(x + 3)² + (y − 4)² = 9`, onde está o centro e quanto vale o raio? O centro zera os parênteses em `(−3, 4)`, e o raio é `√9 = 3` (não 9!).” **Widget §5.1 — `plano_cartesiano`:** destaca o centro `(−3, 4)` onde os catetos zeram e o raio `r = 3`.
4. **Fala:** “Como saber se um ponto está dentro, na borda ou fora da circunferência `x² + y² = 25`? Basta comparar `x² + y²` com `25`: menor que 25 está dentro, igual a 25 na borda e maior que 25 fora.” **Widget §5.1 — `plano_cartesiano`:** aluno arrasta um ponto de teste pelo plano, vendo a região interna (`< r²`), a borda (`= r²`) e o exterior (`> r²`) mudarem de cor.
5. **Fala:** “E quando aproximamos uma reta de uma circunferência de raio `r`, quando ela é externa, tangente ou secante? Depende da distância `d` do centro até a reta: `d > r` não toca, `d = r` toca em 1 ponto perpendicular ao raio, e `d < r` corta em 2 pontos.” **Widget §5.1 — `plano_cartesiano`:** slider move uma reta em direção à circunferência, marcando os 0, 1 ou 2 pontos de encontro e o raio perpendicular na tangência.
6. **Fala:** “Se a equação vier aberta como `x² + y² − 6x + 8 = 0`, como enxergar o centro escondido? Completando o quadrado: `x² − 6x` pede `+9` dos dois lados para virar `(x − 3)²`, revelando `(x − 3)² + y² = 1`.” **Widget §5.1 — `plano_cartesiano`:** mostra passo a passo o agrupamento `(x − 3)² + y² = 9 − 8 = 1`, posicionando o círculo em `(3, 0)` com `r = 1`.
7. **Fala:** “Por que círculo, elipse, parábola e hipérbole se chamam ‘cônicas’? Porque todas nascem de cortar um cone duplo com um plano em diferentes inclinações!” **Widget §5.5 — `solido_3d`:** slider inclina o plano de corte num cone duplo, exibindo a seção virar círculo, elipse, parábola e hipérbole.
8. **Fala:** “No plano, o que acontece quando separamos o centro da circunferência em dois focos `F₁` e `F₂` presos por um barbante de soma `d₁ + d₂ = 2a`? Nasce a elipse `x²/a² + y²/b² = 1`, esticada em `a` na horizontal e `b` na vertical.” **Widget §5.1 — `plano_cartesiano`:** slider afasta a distância focal `c` a partir de 0; o círculo se achata em elipse com o barbante `d₁ + d₂ = 2a` e o triângulo `a² = b² + c²`.
9. **Fala:** “E se na equação trocarmos a soma por uma subtração `x²/a² − y²/b² = 1`? Em vez de fechar numa oval, a curva se abre para fora em dois ramos simétricos: é a hipérbole.” **Widget §5.1 — `plano_cartesiano`:** alterna entre elipse (`+`), hipérbole (`−`, com assíntotas tracejadas) e parábola (`y = x²/(4p)` com foco e diretriz).

## i) Questões pós-lição (6)
Quatro alternativas cobrindo leitura de centro e raio, posição de ponto/reta e identificação das cônicas.

1. **Qual é o centro e o raio da circunferência `(x − 3)² + (y + 2)² = 16`?** A) `C(−3, 2)` e `r = 16` B) `C(3, −2)` e `r = 4` C) `C(3, 2)` e `r = 4` D) `C(−3, −2)` e `r = 8`. **Gabarito: B.** Feedback: os parênteses zeram em `x = 3` e `y = −2`, e o raio é a raiz quadrada de 16 (`r = 4`).
2. **Em relação à circunferência `x² + y² = 25`, o ponto `P(3, 3)` está…** A) no centro B) no interior C) sobre a circunferência D) no exterior. **Gabarito: B.** Feedback: `3² + 3² = 18 < 25`, logo a distância até a origem é menor que o raio 5.
3. **Uma reta está a uma distância `d = 6` do centro de uma circunferência de raio `r = 6`. Essa reta é…** A) secante B) tangente C) externa D) passa pelo centro. **Gabarito: B.** Feedback: quando a distância do centro à reta é exatamente igual ao raio (`d = r`), a reta toca a circunferência em um único ponto (tangente).
4. **Qual é a equação reduzida da circunferência de centro na origem `(0, 0)` que passa pelo ponto `(3, 4)`?** A) `x² + y² = 5` B) `x² + y² = 7` C) `x² + y² = 25` D) `(x−3)² + (y−4)² = 25`. **Gabarito: C.** Feedback: o quadrado do raio até `(3, 4)` vale `r² = 3² + 4² = 25`, dando `x² + y² = 25`.
5. **Na elipse `x²/25 + y²/9 = 1`, quanto medem o semieixo maior `a` e o semieixo menor `b`?** A) `a = 25, b = 9` B) `a = 5, b = 3` C) `a = 5, b = 4` D) `a = 10, b = 6`. **Gabarito: B.** Feedback: os denominadores são `a² = 25` e `b² = 9`, logo `a = 5` e `b = 3`.
6. **O lugar geométrico dos pontos do plano cuja soma das distâncias a dois focos fixos `F₁` e `F₂` é sempre constante (`d₁ + d₂ = 2a`) é uma…** A) circunferência B) parábola C) elipse D) hipérbole. **Gabarito: C.** Feedback: soma constante das distâncias aos dois focos define a elipse (regra do jardineiro).
