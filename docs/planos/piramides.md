# Plano — Pirâmides

## a) Ancoragem mecânica
A máquina da pirâmide liga todos os pontos de um polígono da base a um único vértice superior a uma altura `h`: à medida que subimos da base até o topo, cada fatia horizontal encolhe proporcionalmente à distância até o vértice, fazendo o sólido ocupar exatamente `1/3` do volume do prisma de mesma base e altura (`V = (1/3)·A_base·h`). Nas faces inclinadas, a altura do sólido `h` e o raio inscrito da base `m` (apótema da base) determinam por Pitágoras a altura inclinada da face lateral, o apótema da pirâmide `a_p` (`a_p² = h² + m²`).

## b) Visual de partida
Palco 3D ortográfico (`solido_3d`): pirâmide regular de base quadrada (ou triangular/hexagonal) com arestas ocultas tracejadas, destacando em cores fixas a altura vertical `h` (azul), o apótema da base `m` (laranja) e o apótema da pirâmide `a_p` (rosa), com controles para abrir a planificação em estrela, fatiar horizontalmente e encaixar 3 pirâmides dentro de um cubo/prisma.

## c) Caso neutro
Pirâmide quadrangular regular com base de lado `2m = 6` (`m = 3`) e altura `h = 0` (plana no chão, onde o apótema da face `a_p` coincide com o próprio `m = 3`), que ao erguer o vértice central até `h = 4` forma o triângulo retângulo interno clássico `3-4-5` (`m = 3, h = 4, a_p = 5`).

## d) Panorama e recorte
Situar pirâmides regulares (quadrangular, triangular/tetraedro, hexagonal), elementos métricos (`h`, apótema da base `m`, apótema da pirâmide `a_p`, aresta lateral `l`), áreas lateral/total, relação `V = A_base·h / 3` e tronco por seção paralela. Escopo: pirâmides retas regulares, triângulo retângulo interno e proporção `1/3` do prisma. Deixar poliedros de Platão avançados e relação de Euler geral para complemento.

## e) Progressão por contraste
1. Prisma de base `A_base` e altura `h` (fatia constante, `V = A_base·h`) versus pirâmide de mesma base e altura (fatia que encolhe até um ponto, `V = A_base·h / 3`).
2. Altura da pirâmide `h` (segmento vertical interno que desce do vértice ao centro da base) versus apótema da pirâmide `a_p` (altura inclinada da face triangular externa, sempre maior que `h`).
3. Apótema da pirâmide `a_p` (desce pelo meio da face lateral) versus aresta lateral `l` (desce até a quina da base, formando outro triângulo retângulo com a metade da diagonal ou com `a_p` e metade do lado).
4. Seção transversal na metade da altura (`k = 1/2`): a área da seção cai para `k² = 1/4` da base e o volume da pirâmide menor no topo cai para `k³ = 1/8`.

## f) Dedução causal da forma
Por que `a_p` é sempre maior que `h`? Porque a parede lateral é inclinada: `h` é o cateto vertical, `m` é o cateto horizontal do centro até o meio do lado da base, e `a_p` é a hipotenusa (`a_p² = h² + m²`) — que, quando a pirâmide é aberta na planificação, vira a altura de cada triângulo da lateral. E por que o volume tem o fator `1/3`? Porque um cubo (ou prisma triangular) pode ser decomposto geometricamente em **3 pirâmides congruentes** de mesma base e mesma altura.

## g) Simulação espacial e fronteiras
Variar `h` de `0` a `8` mostra `a_p` crescendo a partir de `m`; nunca pode existir pirâmide real com `a_p ≤ m` nem `a_p ≤ h`. Deslizar um plano paralelo à base à distância `d` do topo mostra a seção transversal encolhendo na razão `(d/h)²`: em `d = 0` (no vértice) a área é `0`, e em `d = h` (na base) recupera `A_base`.

## h) Roteiro da lição

1. **Fala:** “Com o vértice ainda colado no centro de uma base quadrada de lado 6 (`h = 0`), a que distância o centro está do meio de cada lado? Está a `m = 3` (metade do lado), que é o apótema da base.” **Widget §5.5 — `solido_3d`:** mostra a base quadrada `6×6` com `h = 0` e destaca o segmento `m = 3` do centro ao ponto médio da borda.
2. **Fala:** “Quando puxamos o vértice para cima até a altura `h = 4`, a parede lateral continua medindo 4 ou fica maior? Fica maior (`a_p = 5`), porque ela desce inclinada formando a hipotenusa do triângulo `3-4-5`.” **Widget §5.5 — `solido_3d`:** aluno arrasta o slider `h` de 0 a 4, erguendo a pirâmide e revelando o triângulo retângulo interno `h=4, m=3, a_p=5`.
3. **Fala:** “Qual medida usamos para calcular a área de cada triângulo da parede lateral: a altura vertical `h = 4` ou o apótema inclinado `a_p = 5`? Usamos `a_p = 5`, porque ao abrir a pirâmide no plano é o apótema que fica perpendicular à base do triângulo!” **Widget §5.5 — `solido_3d`:** slider de planificação abre as 4 faces triangulares como pétalas no chão, mostrando cada triângulo de base 6 e altura `a_p = 5`.
4. **Fala:** “Com base 6 e altura inclinada 5 em cada uma das 4 faces, quanto dá a área lateral e a área total? Cada face tem `(6×5)/2 = 15`, as 4 somam `60`, e com a base `6² = 36` fechamos `96`.” **Widget §5.5 — `solido_3d`:** na vista planificada, tocar nas 4 abas triangulares e no quadrado central soma `4 × 15 + 36 = 96`.
5. **Fala:** “A aresta lateral `l` (que vai até a quina do quadrado) mede 5 igual ao apótema `a_p`? Não: ela é ainda maior, pois na face lateral ela é a hipotenusa de um triângulo de catetos `a_p = 5` e metade do lado (`3`), dando `√(25+9) = √34`.” **Widget §5.5 — `solido_3d`:** destaca na face lateral o triângulo retângulo formado por `a_p = 5`, `b/2 = 3` e a aresta lateral `l`.
6. **Fala:** “Por que o volume da pirâmide vale exatamente `1/3` do prisma de mesma base e altura, e não a metade? Porque dentro de um cubo cabem exatamente 3 pirâmides iguais encaixadas pelos vértices!” **Widget §5.5 — `solido_3d`:** animação interativa separa e encaixa 3 pirâmides quadrangulares idênticas compondo um cubo completo (`V = A_base · h / 3`).
7. **Fala:** “Então, na nossa pirâmide de base `36` e altura `h = 4`, qual é o volume? O prisma completo teria `36 × 4 = 144`, e a terça parte dá `144 / 3 = 48`.” **Widget §5.5 — `solido_3d`:** exibe o prisma envolvente fantasma (`V = 144`) em volta da pirâmide (`V = 48`).
8. **Fala:** “E se cortarmos a pirâmide na metade da altura (`k = 1/2`), a área do quadradinho do corte vale metade ou um quarto da base? Vale `1/4` (`k²`), e a pirâmidezinha do topo tem `1/8` (`k³`) do volume total.” **Widget §5.5 — `solido_3d`:** aluno desliza o plano de corte até `h/2`, vendo o quadrado da seção medir `3×3 = 9` (`36/4`) e destacando o tronco abaixo.

## i) Questões pós-lição (6)
Quatro alternativas cobrindo a diferença entre `h`, `m` e `a_p`, área lateral e o fator `1/3` no volume.

1. **Uma pirâmide quadrangular regular tem lado da base 6 cm (`m = 3 cm`) e altura `h = 4 cm`. Quanto mede o apótema da pirâmide (`a_p`)?** A) 4 cm B) 5 cm C) 6 cm D) 7 cm. **Gabarito: B.** Feedback: `a_p` é a hipotenusa do triângulo retângulo de catetos `h = 4` e `m = 3`, logo `a_p = 5 cm`.
2. **Na mesma pirâmide de base quadrada de lado 6 cm e apótema `a_p = 5 cm`, qual é a área de UMA face lateral triangular?** A) 12 cm² B) 15 cm² C) 24 cm² D) 30 cm². **Gabarito: B.** Feedback: a face lateral é um triângulo de base 6 e altura `a_p = 5`, logo `(6 × 5)/2 = 15 cm²`.
3. **Qual é o volume de uma pirâmide cuja base tem área 30 cm² e cuja altura mede 6 cm?** A) 60 cm³ B) 90 cm³ C) 180 cm³ D) 36 cm³. **Gabarito: A.** Feedback: o volume da pirâmide é um terço do prisma correspondente: `(30 × 6)/3 = 60 cm³`.
4. **Um prisma e uma pirâmide têm exatamente a mesma base e a mesma altura. Se o volume da pirâmide é 25 cm³, o volume do prisma é…** A) 25 cm³ B) 50 cm³ C) 75 cm³ D) 125 cm³. **Gabarito: C.** Feedback: o prisma comporta 3 vezes o volume da pirâmide de mesma base e altura (`3 × 25 = 75 cm³`).
5. **Uma pirâmide é cortada por um plano paralelo à base exatamente na metade de sua altura (`k = 1/2`). Se a base tem área 40 cm², a área da seção do corte é…** A) 20 cm² B) 10 cm² C) 5 cm² D) 16 cm². **Gabarito: B.** Feedback: a razão entre áreas é o quadrado da razão linear: `40 × (1/2)² = 40/4 = 10 cm²`.
6. **Por que não se pode usar a altura vertical `h` da pirâmide diretamente como altura do triângulo da face lateral?** A) Porque `h` é maior que a aresta lateral. B) Porque a face lateral é inclinada e sua altura real é o apótema `a_p = √(h² + m²)`. C) Porque a base não é plana. D) Porque `h` mede o perímetro. **Gabarito: B.** Feedback: `h` desce na vertical pelo interior do sólido, enquanto a face lateral desce inclinada pela hipotenusa `a_p`.
