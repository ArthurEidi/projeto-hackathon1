# Plano — Esfera

## a) Ancoragem mecânica
A esfera nasce da rotação completa (`360°`) de um semicírculo de raio `R` em torno de seu diâmetro, ou geometricamente como o lugar de todos os pontos no espaço cuja distância ao centro é no máximo `R`. O raio `R` é a única variável independente do sólido; quando um plano corta a esfera a uma distância `d` do centro (`0 ≤ d < R`), ele produz sempre um círculo de raio `r` governado pelo mecanismo pitagórico `r² + d² = R²`.

## b) Visual de partida
Palco 3D ortográfico (`solido_3d`): semicírculo de raio `R` que gira `360°` varrendo a esfera, com plano de corte horizontal deslizante à distância `d` do centro (exibindo o triângulo retângulo interno `d-r-R`), além da comparação visual da esfera inscrita num cilindro equilátero de raio `R` e altura `2R`.

## c) Caso neutro
Corte passando exatamente pelo centro da esfera (`d = 0`, no equador): sem deslocamento vertical, o raio da seção circular `r` é idêntico ao próprio raio da esfera (`r = R`), produzindo o **círculo máximo** de área `πR²`. Para `R = 1`, a área da superfície vale `4π` (quatro círculos máximos) e o volume vale `4π/3`.

## d) Panorama e recorte
Situar esfera como sólido de revolução, seção plana (`R² = d² + r²`), área da superfície esférica (`A = 4πR²`), volume (`V = (4/3)πR³`), fuso/cunha esférica por regra de três com o ângulo `α`, e inscrição/circunscrição com cubo e cilindro. Escopo: geometria do corte plano, comparação com o cilindro de Arquimedes e escala `R²` versus `R³`. Deixar calota esférica avançada para além do recorte.

## e) Progressão por contraste
1. Semicírculo 2D (`θ = 0°`) versus esfera 3D (`θ = 360°`): o giro transforma o arco plano na superfície esférica.
2. Corte no equador (`d = 0`, círculo máximo `r = R`) versus corte afastado (`0 < d < R`, círculo menor `r = √(R² − d²)`) versus plano tangente no polo (`d = R`, um único ponto `r = 0`).
3. Área de um círculo máximo (`πR²`, sombra plana da esfera) versus área da casca esférica inteira (`4πR²`, exatamente 4 sombras).
4. Cilindro circunscrito de raio `R` e altura `2R` (`V_cil = 2πR³`) versus esfera inscrita (`V_esf = (4/3)πR³`, exatamente `2/3` do cilindro).

## f) Dedução causal da forma
Por que toda seção plana de uma esfera a distância `d` do centro tem raio `r = √(R² − d²)`? Porque qualquer ponto na borda do corte está na casca da esfera (logo a uma distância `R` do centro), formando um triângulo retângulo de hipotenusa `R` e catetos `d` e `r`. E de onde vêm `4πR²` e `(4/3)πR³`? Na comparação clássica de Arquimedes, a esfera de raio `R` ocupa `2/3` tanto do volume (`(2/3)·2πR³ = (4/3)πR³`) quanto da área lateral (`4πR²`) do cilindro que a envolve perfeitamente; e dividir a esfera em infinitas pirâmides com vértice no centro e altura `R` liga os dois resultados por `V = (1/3)·A_superfície·R = (1/3)·(4πR²)·R = (4/3)πR³`.

## g) Simulação espacial e fronteiras
Arrastar a altura do plano de corte `d` de `0` até `R`: em `d = 0` temos `r = R`; conforme `d` cresce, `r` diminui segundo o arco `r = √(R² − d²)`; na fronteira `d = R`, o plano apenas tangencia o polo (`r = 0`); para `d > R`, o plano não intercepta a esfera. Ao escalar o raio por um fator `k`, a área cresce com `k²` e o volume dispara com `k³`.

## h) Roteiro da lição

1. **Fala:** “Se girarmos um semicírculo de raio `R = 5` em `360°` ao redor do seu diâmetro, por que todos os pontos da casca ficam à mesma distância 5 do centro? Porque o raio do semicírculo não muda durante o giro.” **Widget §5.5 — `solido_3d`:** aluno arrasta o slider de giro `θ` de `0°` a `360°`, vendo o semicírculo plano varrer a esfera de raio `R = 5`.
2. **Fala:** “Quando um plano corta a esfera bem no meio (`d = 0`), qual é o raio do círculo formado no corte? É o próprio `r = R = 5`, o círculo máximo da esfera, de área `25π`.” **Widget §5.5 — `solido_3d`:** exibe o corte equatorial em `d = 0` destacando o disco de raio `r = 5`.
3. **Fala:** “Se subirmos o corte para uma distância `d = 3` do centro numa esfera de raio `R = 5`, o círculo do corte diminui para quanto? Diminui para `r = 4`, porque `d = 3`, `r` e a hipotenusa `R = 5` formam o triângulo retângulo `3-4-5`!” **Widget §5.5 — `solido_3d`:** aluno move o slider `d` de 0 para 3; o triângulo retângulo `d=3, r=4, R=5` acende dentro da esfera.
4. **Fala:** “E o que acontece quando o plano chega à distância limite `d = 5` (`d = R`)? O cateto `r` zera (`5² − 5² = 0`) e o plano apenas encosta num único ponto no polo, tangenciando a esfera.” **Widget §5.5 — `solido_3d`:** levar `d` até `5` faz o círculo da seção encolher até um ponto brilhante no topo.
5. **Fala:** “Quantos círculos máximos (`πR²`) cabem na superfície inteira da casca da esfera? Cabem exatamente 4 (`A = 4πR²`), o mesmo que a área lateral do cilindro de raio `R` e altura `2R` que envolve a esfera.” **Widget §5.5 — `solido_3d`:** projeta a casca da esfera sobre o cilindro envolvente e abre-o em 4 discos de área `πR²`.
6. **Fala:** “Se imaginarmos a esfera fatiada em muitas pirâmides fininhas com vértice no centro e altura `R`, como a área `4πR²` gera o volume? Pela regra da pirâmide `(1/3)·Base·Altura`: somando todas as bases temos `(1/3)·(4πR²)·R = (4/3)πR³`.” **Widget §5.5 — `solido_3d`:** destaca um setor piramidal saindo do centro até a casca com altura `R`, conectando `A = 4πR²` a `V = (4/3)πR³`.
7. **Fala:** “Qual fração do cilindro circunscrito (raio `R` e altura `2R`, volume `2πR³`) a esfera ocupa? Ocupa exatamente `2/3` do cilindro (`(2/3)·2πR³ = (4/3)πR³`), deixando `1/3` vazio.” **Widget §5.5 — `solido_3d`:** exibe a esfera inscrita no cilindro equilátero com comparador de preenchimento `2/3` vs `1/3`.
8. **Fala:** “Se dobrarmos o raio da esfera de `R` para `2R`, a área e o volume dobram? Não: a casca quadruplica (`2² = 4`) e o volume fica **8 vezes maior** (`2³ = 8`)!” **Widget §5.5 — `solido_3d`:** slider de raio `k` de 1 para 2 compara a esfera base fantasma com a ampliada (`A = 4x`, `V = 8x`).

## i) Questões pós-lição (6)
Quatro alternativas cobrindo corte plano `R² = d² + r²`, área `4πR²`, volume `(4/3)πR³` e escala cúbica.

1. **Uma esfera de raio `R = 10 cm` é cortada por um plano a uma distância `d = 6 cm` do seu centro. Qual é o raio `r` do círculo formado na seção?** A) 4 cm B) 6 cm C) 8 cm D) 10 cm. **Gabarito: C.** Feedback: pelo triângulo retângulo interno, `r² + 6² = 10² → r² = 64 → r = 8 cm`.
2. **Qual é a área da superfície de uma esfera de raio `R = 3 cm`?** A) `9π cm²` B) `12π cm²` C) `27π cm²` D) `36π cm²`. **Gabarito: D.** Feedback: a superfície esférica vale 4 círculos máximos: `4π·3² = 36π cm²`.
3. **Qual é o volume de uma esfera de raio `R = 3 cm`?** A) `12π cm³` B) `27π cm³` C) `36π cm³` D) `108π cm³`. **Gabarito: C.** Feedback: `V = (4/3)πR³ = (4/3)π·27 = 36π cm³`.
4. **Se o raio de uma bola esférica é multiplicado por 2, o seu volume fica multiplicado por…** A) 2 B) 4 C) 6 D) 8. **Gabarito: D.** Feedback: o volume depende de `R³`, logo dobrar o raio multiplica o volume por `2³ = 8`.
5. **Uma esfera está perfeitamente inscrita num cubo de aresta 6 cm (encostando nas 6 faces). Quanto mede o raio da esfera?** A) 6 cm B) 3 cm C) `3√2 cm` D) 12 cm. **Gabarito: B.** Feedback: o diâmetro da esfera inscrita é igual à aresta do cubo (`2R = 6`), portanto `R = 3 cm`.
6. **Um fuso esférico de `90°` corresponde a que fração da área total da superfície da esfera?** A) `1/2` B) `1/3` C) `1/4` D) `1/6`. **Gabarito: C.** Feedback: uma volta completa tem `360°`, logo `90°/360° = 1/4` da casca esférica.
