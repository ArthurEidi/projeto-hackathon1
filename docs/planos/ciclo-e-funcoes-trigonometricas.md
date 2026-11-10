# Plano — Ciclo e funções trigonométricas

## a) Ancoragem mecânica
O ciclo trigonométrico é um gerador rotativo de raio 1: o ângulo `θ` (em graus ou radianos) entra como variável independente que gira um ponto na circunferência unitária, e suas coordenadas entregam duas saídas dependentes simultâneas — a sombra horizontal `x = cos θ` e a altura vertical `y = sen θ`. Ao desenrolar o giro no tempo, essa altura desenha a onda periódica `f(x) = A·sen(Bx + C) + D`.

## b) Visual de partida
Palco dividido e sincronizado: à esquerda, circunferência unitária com ponto arrastável no ângulo `θ`, projeções coloridas de `cos θ` (eixo horizontal) e `sen θ` (eixo vertical); à direita, a onda senoidal/cossenoidal sendo traçada ao vivo conforme `θ` avança de `0` a `2π`, com sliders para amplitude `A`, frequência `B` e deslocamento vertical `D`.

## c) Caso neutro
Posição inicial `θ = 0 rad (0°)` na circunferência de raio 1: o ponto está em `(1, 0)`, sem giro; a altura vertical é nula (`sen 0 = 0`) e a projeção horizontal é total (`cos 0 = 1`). Na função, a onda padrão `f(x) = sen x` (`A=1, B=1, C=0, D=0`) oscila simetricamente entre `−1` e `1` com período `2π`.

## d) Panorama e recorte
Situar radianos, arcos côngruos, sinais de seno/cosseno nos 4 quadrantes, redução ao 1º quadrante e gráficos de `sen x` e `cos x` com parâmetros de amplitude, período e linha média. Escopo: leitura visual do ciclo unitário e interpretação gráfica de `A·sen(Bx)+D`. Deixar secante/cossecante/cotangente, identidades de arco duplo e equações trigonométricas gerais para aprofundamento.

## e) Progressão por contraste
1. Do triângulo retângulo (`0° < θ < 90°`) para o ciclo inteiro (`0°` a `360°`): seno e cosseno ganham sinal negativo conforme o quadrante.
2. Contrastar a curva de `sen x` (parte de 0 subindo) com `cos x` (parte do topo 1 descendo, defasada em `π/2`).
3. Sobrepor `sen x` fantasma e variar `A` (`2·sen x`): estica os picos para `±2` sem mudar onde a onda zera.
4. Variar `B` (`sen(2x)`): comprime o período pela metade (`π`), dobrando o ritmo das oscilações.
5. Variar `D` (`sen x + 1`): sobe toda a onda e sua linha central sem alterar a amplitude.

## f) Dedução causal da forma
Como o ponto percorre um círculo de raio 1, sua altura `sen θ` nunca ultrapassa `1` no topo (`π/2`) nem cai abaixo de `−1` no fundo (`3π/2`). Acima do eixo horizontal (1º e 2º quadrantes) a ordenada `y` é positiva, por isso o seno é positivo ali; à esquerda do eixo vertical (2º e 3º quadrantes) a abscissa `x` é negativa, justificando o sinal do cosseno sem decoreba. Uma volta completa tem comprimento `2π`, logo a cada `2π` o movimento se repete identicamente.

## g) Simulação espacial e fronteiras
Percorrer os quatro quadrantes destaca zeros (`0, π, 2π` para seno; `π/2, 3π/2` para cosseno) e extremos (`±1`). O domínio de `sen x` e `cos x` é todo `R` (é possível girar infinitas voltas positivas ou negativas), mas a imagem fica confinada ao intervalo fechado `[D − |A|, D + |A|]`. Já na tangente, os pontos `π/2 + kπ` são fronteiras proibidas onde a reta vertical fica paralela ao eixo das tangentes.

## h) Roteiro da lição

1. **Fala:** “Em `θ = 0°`, no ponto `(1, 0)` da roda de raio 1, qual é a altura vertical do ponto? É zero, enquanto a largura horizontal ocupa todo o raio 1.” **Widget §5.3 — `ciclo_trigonometrico`:** mostra o ponto no marco `0 rad`, destacando `cos 0 = 1` no eixo horizontal e `sen 0 = 0`.
2. **Fala:** “Ao girar o ponto até o topo em `90° (π/2)`, quem chega ao máximo 1 e quem zera? A altura `sen(π/2)` atinge 1 e a sombra horizontal `cos(π/2)` encolhe para 0.” **Widget §5.3 — `ciclo_trigonometrico`:** aluno arrasta o ponto de `0` a `π/2`; a sombra vertical cresce até 1 e o primeiro quarto da onda senoidal nasce ao lado.
3. **Fala:** “Entrando no 2º quadrante (`90°` a `180°`), o seno fica negativo ou continua positivo? Continua positivo porque o ponto segue acima do chão, mas o cosseno fica negativo por estar à esquerda da origem.” **Widget §5.3 — `ciclo_trigonometrico`:** girar até `150° (5π/6)` pinta os sinais `(+)` vertical e `(−)` horizontal, espelhando o triângulo de `30°`.
4. **Fala:** “E quando o ponto passa por baixo do eixo, entre `180° (π)` e `360° (2π)`? A coordenada vertical fica abaixo de zero, então a onda do seno mergulha para valores negativos até `−1` em `3π/2`.” **Widget §5.3 — `ciclo_trigonometrico`:** aluno completa a volta até `2π`, fechando um ciclo inteiro da senoide de `0` a `2π`.
5. **Fala:** “Por que `150°` e `30°` têm exatamente o mesmo seno `0,5`? Porque ambos ficam à mesma altura acima do eixo horizontal, simétricos em relação ao eixo y.” **Widget §5.3 — `ciclo_trigonometrico`:** traça a linha horizontal tracejada ligando `30°` e `150°` no ciclo e na onda.
6. **Fala:** “Se compararmos a onda do cosseno com a do seno, por que ela já começa no valor 1 em `x = 0`? Porque em `0°` o ponto está na extremidade direita do círculo, onde a abscissa já é máxima.” **Widget §5.3 — `ciclo_trigonometrico`:** ativa simultaneamente a curva de `cos x` e a de `sen x` (fantasma), evidenciando o deslocamento de `π/2`.
7. **Fala:** “O que muda na onda se multiplicarmos o seno por `A = 2` em `f(x) = 2·sen x`? Os picos sobem para 2 e os vales descem para `−2`, mas os cruzamentos com o eixo continuam nos mesmos ângulos.” **Widget §5.1 — `plano_cartesiano`:** slider `A` vai de 1 a 2 sobre a curva fantasma `sen x`, destacando a nova imagem `[−2, 2]`.
8. **Fala:** “Se somarmos `D = 1` para formar `f(x) = sen x + 1`, qual passa a ser o menor valor da onda? Passa a ser `0`, porque a onda inteira sobe 1 unidade e oscila entre `0` e `2`.” **Widget §5.1 — `plano_cartesiano`:** slider `D` desloca a linha média tracejada de `y = 0` para `y = 1`.
9. **Fala:** “E se dobrarmos a velocidade de giro em `f(x) = sen(2x)`? A máquina completa uma volta inteira na metade do caminho, reduzindo o período de `2π` para `π`.” **Widget §5.1 — `plano_cartesiano`:** slider `B` vai de 1 para 2, mostrando duas ondas completas cabendo dentro da janela `[0, 2π]`.

## i) Questões pós-lição (6)
Quatro alternativas com foco em leitura de quadrantes, simetria no ciclo e parâmetros da onda.

1. **No ciclo trigonométrico, em qual quadrante o seno é positivo e o cosseno é negativo?** A) 1º B) 2º C) 3º D) 4º. **Gabarito: B.** Feedback: no 2º quadrante o ponto está acima do eixo x (`sen > 0`) e à esquerda do eixo y (`cos < 0`).
2. **Qual é o valor de `sen(π/2)` e de `cos(π)`?** A) `1` e `−1` B) `0` e `1` C) `1` e `0` D) `−1` e `−1`. **Gabarito: A.** Feedback: em `π/2` (topo) a altura é 1; em `π` (extremo esquerdo) a abscissa é `−1`.
3. **Sabendo que `sen 30° = 0,5`, quanto vale `sen 150°`?** A) `−0,5` B) `0,5` C) `√3/2` D) `−√3/2`. **Gabarito: B.** Feedback: `150° = 180° − 30°` tem a mesma altura positiva do arco de 30°.
4. **Qual é a imagem (valores mínimo e máximo) da função `f(x) = 3·sen(x)`?** A) `[−1, 1]` B) `[0, 3]` C) `[−3, 3]` D) `[−3, 0]`. **Gabarito: C.** Feedback: como `sen x` varia de `−1` a `1`, multiplicar por 3 estica os extremos para `−3` e `3`.
5. **Se a temperatura de uma estufa segue `T(t) = 20 + 4·cos(t)`, qual é a temperatura máxima atingida?** A) 16 °C B) 20 °C C) 24 °C D) 80 °C. **Gabarito: C.** Feedback: o valor máximo ocorre quando `cos(t) = 1`, dando `20 + 4·1 = 24`.
6. **Qual é o período da função `f(x) = sen(2x)`?** A) `π/2` B) `π` C) `2π` D) `4π`. **Gabarito: B.** Feedback: dobrar a velocidade angular faz o ciclo de `2π` fechar na metade da distância, `2π/2 = π`.
