# Plano — Geometria plana: semelhança e áreas

## a) Ancoragem mecânica
Duas máquinas conectadas: na **deformação de forma**, mover a altura ou a base dentro de uma malha reconfigura polígonos (retângulo, paralelogramo, triângulo, trapézio) preservando ou cortando pela metade a quantidade de quadradinhos unitários; na **escala de semelhança**, o fator linear `k` entra como variável independente, multiplica todo comprimento por `k` e multiplica toda área por `k²` (porque a expansão atua nas duas dimensões ao mesmo tempo).

## b) Visual de partida
Palco em malha quadriculada interativa (`geometria_plana`): polígonos com vértices arrastáveis, corte e colagem visual de áreas, e um controle de razão de semelhança `k` (`1`, `2`, `3`) que projeta a figura ampliada ao lado da figura base fantasma, contando os quadradinhos internos em tempo real.

## c) Caso neutro
Quadrado unitário `1 × 1` (área `1`) e retângulo base `b × h` com razão de semelhança `k = 1` (congruência): a área é simplesmente a contagem direta de `b` colunas por `h` linhas de quadradinhos unitários (`A = b·h`), sem inclinação nem cortes.

## d) Panorama e recorte
Situar áreas de figuras planas (retângulo, paralelogramo, triângulo, trapézio, círculo), teorema de Tales e semelhança de triângulos/polígonos (`razão linear k` versus `razão de áreas k²`). Escopo: dedução visual de cada área a partir do retângulo e efeito quadrático da escala. Deixar relações métricas avançadas na circunferência e inscrição/circunscrição complexa para sequência posterior.

## e) Progressão por contraste
1. Retângulo `b × h` versus paralelogramo de mesma base `b` e mesma altura `h`: inclinar o topo desliza as fatias sem mudar a área (`b·h`).
2. Paralelogramo versus triângulo de mesma base e altura: o triângulo é exatamente metade do paralelogramo (`b·h / 2`).
3. Triângulo versus trapézio de bases `B` e `b`: juntar dois trapézios iguais invertidos monta um paralelogramo de base `B + b`, dando `(B + b)·h / 2`.
4. Escala linear `k` versus área `k²`: dobrar o lado (`k = 2`) não dobra a área — encaixa **4** cópias da figura original (`k² = 4`).

## f) Dedução causal da forma
Toda fórmula de área plana nasce do retângulo sem decoreba: no paralelogramo, o triângulo que sobra de um lado encaixa perfeitamente no vazio do outro, recompondo o retângulo `b·h`. Todo triângulo duplicado e girado forma um paralelogramo de área `b·h`, logo um único triângulo tem área `b·h/2`. E quando uma figura é ampliada por `k`, a base fica `k` vezes maior **e** a altura também fica `k` vezes maior, multiplicando a área por `k · k = k²`.

## g) Simulação espacial e fronteiras
Arrastar o vértice superior de um triângulo paralelamente à base (princípio de Cavalieri plano) deforma os lados e o perímetro, mas mantém a área cravada porque `b` e `h` não mudam. Na fronteira `h → 0`, o polígono colapsa num segmento de área zero; na semelhança, dois polígonos de mais de 3 lados só são semelhantes se tiverem ângulos iguais **e** lados proporcionais (apenas ângulos iguais bastam para triângulos, mas um retângulo `2×6` não é semelhante a um quadrado `2×2`).

## h) Roteiro da lição

1. **Fala:** “Quantos quadradinhos `1×1` cabem num retângulo de base 4 e altura 3? Cabem 12, pois são 3 fileiras de 4 quadradinhos cada.” **Widget §5.4 — `geometria_plana`:** exibe o retângulo `4×3` sobre a malha quadriculada com contagem viva `A = 4 × 3 = 12`.
2. **Fala:** “Se empurrarmos o topo desse retângulo para o lado, virando um paralelogramo de mesma base 4 e altura 3, a área aumenta com o lado inclinado ou continua 12? Continua 12: o triângulo que sai pela direita é o mesmo que faltava na esquerda.” **Widget §5.4 — `geometria_plana`:** aluno arrasta o topo horizontalmente; a aba triangular cortada desliza e encaixa, mantendo `A = 12`.
3. **Fala:** “Por que a área de qualquer triângulo de base 4 e altura 3 vale a metade (`6`)? Porque encaixando uma cópia invertida dele ao lado, fechamos sempre um paralelogramo de área 12.” **Widget §5.4 — `geometria_plana`:** botão/slider gira uma cópia fantasma do triângulo em 180°, completando o paralelogramo `4×3`.
4. **Fala:** “Se você arrastar a ponta superior do triângulo ao longo de uma reta paralela à base (`h = 3`), a área muda? Não: o formato estica, mas a base 4 e a altura 3 continuam idênticas (`A = 6`).” **Widget §5.4 — `geometria_plana`:** aluno corre o vértice superior pelo trilho horizontal `y = 3`, vendo perímetro mudar e área fixa em `6,0`.
5. **Fala:** “E no trapézio de base maior 5, base menor 3 e altura 3, de onde vem `(B + b)·h / 2`? Colando outro trapézio igual de cabeça para baixo, as bases somam `5 + 3 = 8` num paralelogramo de área `8 × 3 = 24`; metade disso é 12.” **Widget §5.4 — `geometria_plana`:** encaixa o trapézio gêmeo invertido, destacando a base total `B + b = 8`.
6. **Fala:** “Quando uma paralela corta um triângulo exatamente na metade da altura (`k = 1/2`), quanto mede a nova base menor? Mede metade da base original, porque os dois triângulos têm os mesmos ângulos e são semelhantes.” **Widget §5.4 — `geometria_plana`:** slider move uma reta paralela à base cortando o triângulo e mostra a proporção `b'/b = h'/h = k`.
7. **Fala:** “Agora o teste decisivo: se dobrarmos os lados de um triângulo (`k = 2`), a área dele dobra para 2x ou quadruplica para 4x? Quadruplica: dentro do triângulo de lados dobrados cabem exatamente 4 triângulos originais!” **Widget §5.4 — `geometria_plana`:** slider `k = 2` mosaica o triângulo ampliado com 4 cópias do triângulo base (3 em pé e 1 invertido no meio).
8. **Fala:** “E se triplicarmos os lados (`k = 3`), quantos triângulos pequenos caberão lá dentro? Caberão `3² = 9`, pois a escala multiplica a base por 3 e também a altura por 3.” **Widget §5.4 — `geometria_plana`:** avançar `k` para `3` preenche a malha com 9 triângulos unitários e destaca `A_nova / A_base = k² = 9`.

## i) Questões pós-lição (6)
Quatro alternativas focadas em invariância de área pela altura e na relação quadrática `k²` para áreas.

1. **Um paralelogramo tem base 6 cm, altura 4 cm e lado inclinado 5 cm. Qual é sua área?** A) 20 cm² B) 24 cm² C) 30 cm² D) 12 cm². **Gabarito: B.** Feedback: a área do paralelogramo depende da base e da altura perpendicular (`6 × 4 = 24`), não do lado inclinado.
2. **Dois triângulos têm a mesma base de 8 cm e seus vértices opostos estão na mesma reta paralela à base, a 5 cm de distância. Suas áreas são…** A) diferentes, pois os lados mudam B) iguais a 40 cm² C) iguais a 20 cm² D) iguais a 13 cm². **Gabarito: C.** Feedback: mesma base e mesma altura garantem a mesma área `(8 × 5)/2 = 20 cm²`.
3. **Um trapézio tem bases de 6 m e 4 m e altura de 3 m. Qual é sua área?** A) 15 m² B) 30 m² C) 18 m² D) 12 m². **Gabarito: A.** Feedback: somando as bases e multiplicando pela metade da altura, `((6 + 4) × 3)/2 = 15 m²`.
4. **Dois triângulos são semelhantes e os lados do maior medem o dobro (`k = 2`) dos lados do menor. Se o menor tem área 10 cm², a área do maior é…** A) 20 cm² B) 40 cm² C) 80 cm² D) 100 cm². **Gabarito: B.** Feedback: quando os comprimentos multiplicam por `k = 2`, a área multiplica por `k² = 4`, resultando em `4 × 10 = 40 cm²`.
5. **Uma praça quadrada terá seus lados reduzidos à metade (`k = 1/2`) na maquete. A área da maquete será que fração da área real?** A) `1/2` B) `1/3` C) `1/4` D) `1/8`. **Gabarito: C.** Feedback: a razão entre as áreas é o quadrado da razão linear: `(1/2)² = 1/4`.
6. **Num triângulo de base 12 cm e altura 8 cm, traça-se uma paralela à base a 4 cm do vértice superior (metade da altura). Quanto mede o segmento paralelo formado?** A) 3 cm B) 4 cm C) 6 cm D) 8 cm. **Gabarito: C.** Feedback: a metade da altura (`k = 4/8 = 1/2`) produz uma base paralela igual à metade da base original (`12/2 = 6 cm`).
