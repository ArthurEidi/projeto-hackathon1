# Plano — Geometria analítica: ponto e reta

## a) Ancoragem mecânica
No plano cartesiano, dois pontos `A(x₁, y₁)` e `B(x₂, y₂)` funcionam como entradas independentes que alimentam três mecanismos geométricos: o **passo horizontal** `Δx = x₂ − x₁` e o **passo vertical** `Δy = y₂ − y₁`. Desses dois passos nascem por Pitágoras a **distância** `d = √(Δx² + Δy²)`, pela média das coordenadas o **ponto médio** `M`, e pela razão `m = Δy/Δx` a **inclinação da reta** que passa por eles (`y − y₁ = m(x − x₁)`).

## b) Visual de partida
Palco no `plano_cartesiano`: pontos `A` e `B` arrastáveis sobre a malha com triângulo retângulo de degraus `Δx` (horizontal) e `Δy` (vertical) desenhado automaticamente, ponto médio `M` marcado no meio do segmento, reta viva passando por `A` e `B`, e segunda reta auxiliar para testar paralelismo (`m₁ = m₂`) e perpendicularidade (`m₁·m₂ = −1`).

## c) Caso neutro
Pontos alinhados na horizontal ou na origem: `A(0, 0)` e `B(4, 0)` (`Δy = 0`), onde a distância é simplesmente a contagem horizontal `d = Δx = 4`, o ponto médio é `(2, 0)` e a inclinação da reta é nula (`m = 0`). Para a inclinação, o caso de referência é `A(0, 0)` e `B(1, 1)` (`Δx = 1, Δy = 1`), gerando a bissetriz `y = x` com `m = 1`.

## d) Panorama e recorte
Situar coordenadas no plano, distância entre dois pontos, ponto médio, condição de alinhamento de 3 pontos (mesma inclinação), coeficiente angular `m = Δy/Δx`, equação reduzida (`y = mx + n`) e geral (`ax + by + c = 0`), retas paralelas e perpendiculares. Escopo: leitura visual de `Δx` e `Δy` unificando distância, ponto médio e retas. Deixar distância de ponto a reta com radicais complexos e feixes avançados para complemento.

## e) Progressão por contraste
1. Segmento horizontal/vertical (`Δy = 0` ou `Δx = 0`, distância por subtração simples) versus segmento inclinado (`d = √(Δx² + Δy²)` por Pitágoras).
2. Duas retas com mesma inclinação `m₁ = m₂` e alturas diferentes (paralelas, nunca se cruzam) versus inclinações diferentes (concorrentes num ponto).
3. Retas concorrentes comuns versus retas **perpendiculares** (`90°`): girar o triângulo de degraus `(Δx, Δy)` em `90°` transforma-o em `(−Δy, Δx)`, invertendo e trocando o sinal da inclinação (`m₂ = −1/m₁`).
4. Reta inclinada (`Δx ≠ 0`, função afim `y = mx + n`) versus reta vertical (`Δx = 0`, equação `x = k`, sem coeficiente angular definido).

## f) Dedução causal da forma
Nenhuma fórmula da geometria analítica é nova: a distância `d = √((x₂−x₁)² + (y₂−y₁)²)` é literalmente o teorema de Pitágoras aplicado aos catetos `Δx` e `Δy` da grade cartesiana. O ponto médio `M` fica na metade do caminho horizontal e na metade do caminho vertical, logo suas coordenadas são as médias `(x₁+x₂)/2` e `(y₁+y₂)/2`. Três pontos `A, B, C` estão na mesma reta se, e somente se, o degrau de `A` para `B` tem a mesma inclinação `Δy/Δx` que o degrau de `B` para `C`. E a regra `m₁ · m₂ = −1` das perpendiculares vem de girar o triângulo de catetos `(a, b)` em `90°`: o avanço horizontal vira `−b` e a subida vira `a`, trocando `b/a` por `a/(−b)`.

## g) Simulação espacial e fronteiras
Arrastar `B` ao redor de `A` mostra o sinal de `Δx` e `Δy` mudar conforme o quadrante relativo, mas `Δx²` e `Δy²` são sempre positivos. Na fronteira `x₂ = x₁` (`Δx = 0`), a reta fica perfeitamente vertical (`x = x₁`): a divisão `Δy/Δx` trava por divisão por zero, marcando o limite em que uma reta no plano **não** é gráfico de função `y = f(x)`.

## h) Roteiro da lição

1. **Fala:** “Se `A` está em `(1, 2)` e `B` em `(5, 2)`, na mesma linha horizontal, qual é a distância entre eles? É `5 − 1 = 4`, pois a altura não mudou (`Δy = 0`).” **Widget §5.1 — `plano_cartesiano`:** mostra `A(1,2)` e `B(5,2)` ligados por segmento horizontal de comprimento 4 e ponto médio `M(3,2)`.
2. **Fala:** “Agora se subirmos `B` para `(4, 6)` mantendo `A(1, 2)`, quanto andamos na horizontal (`Δx`) e na vertical (`Δy`)? Andamos `Δx = 3` e `Δy = 4`, formando um triângulo retângulo de hipotenusa `d = 5`!” **Widget §5.1 — `plano_cartesiano`:** aluno arrasta `B` até `(4, 6)`; os catetos tracejados `Δx = 3` e `Δy = 4` acendem junto com `d = √(3²+4²) = 5`.
3. **Fala:** “Onde fica o ponto médio `M` exatamente no meio do caminho entre `A(1, 2)` e `B(5, 6)`? Basta pegar a metade do caminho em x (`(1+5)/2 = 3`) e a metade em y (`(2+6)/2 = 4`), dando `M(3, 4)`.” **Widget §5.1 — `plano_cartesiano`:** destaca `M(3, 4)` dividindo tanto `Δx` quanto `Δy` em duas partes iguais.
4. **Fala:** “Qual é a inclinação `m` da reta que sobe de `A(1, 2)` até `B(3, 6)`? Para avançar `Δx = 2`, ela sobe `Δy = 4`, logo sobe `m = 4/2 = 2` unidades de y para cada 1 de x.” **Widget §5.1 — `plano_cartesiano`:** traça a reta por `A` e `B` com degraus unitários “anda 1, sobe 2” e equação `y = 2x`.
5. **Fala:** “Como saber sem desenhar tudo se um terceiro ponto `C(4, 8)` está alinhado nessa mesma reta? Conferindo se o ritmo de subida de `B(3, 6)` para `C(4, 8)` continua sendo `m = 2`: `Δy/Δx = (8−6)/(4−3) = 2`!” **Widget §5.1 — `plano_cartesiano`:** aluno move o ponto `C` até `(4, 8)` e vê o indicador de colinearidade acender quando `m_BC = m_AB`.
6. **Fala:** “O que acontece se criarmos outra reta com a mesma inclinação `m = 2`, como `y = 2x + 3`? As duas sobem no mesmo ritmo e mantêm distância constante: são paralelas.” **Widget §5.1 — `plano_cartesiano`:** exibe a segunda reta `y = 2x + 3` paralela a `y = 2x`, mostrando que não há ponto de interseção.
7. **Fala:** “E se girarmos a reta de inclinação `m₁ = 2` (`anda 1, sobe 2`) em exatos `90°` para formar uma perpendicular, qual passa a ser a nova inclinação? O triângulo gira para `anda 2, desce 1`, dando `m₂ = −1/2` (produto `m₁·m₂ = −1`)!” **Widget §5.1 — `plano_cartesiano`:** botão/slider gira a segunda reta até formar `90°` com a primeira, girando o triângulo de degraus `(1, 2)` para `(2, −1)`.
8. **Fala:** “O que acontece com `m = Δy/Δx` se alinharmos `B` exatamente em cima de `A` na vertical, em `x = 3`? O passo horizontal zera (`Δx = 0`), a inclinação não existe como número e a reta vira a parede vertical `x = 3`.” **Widget §5.1 — `plano_cartesiano`:** aluno arrasta `B` para `(1, 6)` sobre `A(1, 2)`, ativando o alerta de fronteira `Δx = 0 → reta vertical x = 1`.

## i) Questões pós-lição (6)
Quatro alternativas verificando distância por Pitágoras, ponto médio, coeficiente angular e paralelismo/perpendicularidade.

1. **Qual é a distância entre os pontos `A(1, 2)` e `B(4, 6)`?** A) 3 B) 4 C) 5 D) 7. **Gabarito: C.** Feedback: `Δx = 4 − 1 = 3` e `Δy = 6 − 2 = 4`; por Pitágoras, `d = √(3² + 4²) = 5`.
2. **Qual é o ponto médio do segmento de extremidades `A(2, −4)` e `B(6, 8)`?** A) `(4, 2)` B) `(4, 4)` C) `(8, 4)` D) `(2, 6)`. **Gabarito: A.** Feedback: somando e dividindo por 2 cada coordenada: `x_M = (2+6)/2 = 4` e `y_M = (−4+8)/2 = 2`.
3. **Qual é o coeficiente angular `m` da reta que passa por `A(1, 3)` e `B(3, 9)`?** A) 2 B) 3 C) 4 D) 6. **Gabarito: B.** Feedback: `m = Δy/Δx = (9 − 3)/(3 − 1) = 6/2 = 3`.
4. **Qual das retas abaixo é paralela à reta `y = 3x − 1`?** A) `y = −3x + 2` B) `y = 3x + 5` C) `y = (1/3)x − 1` D) `y = −(1/3)x + 4`. **Gabarito: B.** Feedback: retas paralelas têm exatamente a mesma inclinação `m = 3`.
5. **Se uma reta `r` tem coeficiente angular `m = 2`, qual é o coeficiente angular de uma reta perpendicular a `r`?** A) `2` B) `−2` C) `1/2` D) `−1/2`. **Gabarito: D.** Feedback: na perpendicular, a inclinação inverte e troca de sinal (`m_perp = −1/m = −1/2`).
6. **Qual é a equação da reta vertical que passa pelos pontos `(4, 1)` e `(4, 7)`?** A) `y = 4` B) `x = 4` C) `y = 4x` D) `x + y = 4`. **Gabarito: B.** Feedback: em toda reta vertical a coordenada `x` é fixa e igual a 4 para qualquer altura `y`.
