# Plano — Trigonometria no triângulo retângulo

## a) Ancoragem mecânica
A máquina das razões trigonométricas (`sen θ = CO/HIP`, `cos θ = CA/HIP`, `tg θ = CO/CA`) recebe um ângulo agudo θ como entrada independente e devolve a proporção entre dois lados do triângulo retângulo como saída dependente. Escalar o triângulo inteiro multiplica os lados pelo mesmo fator k, mas a razão de saída permanece invariante; mudar o ângulo θ redistribui a abertura entre cateto oposto (vertical) e cateto adjacente (horizontal).

## b) Visual de partida
Palco: triângulo retângulo dinâmico apoiado na horizontal com hipotenusa, cateto oposto e cateto adjacente destacados em cores fixas. Sliders para o ângulo agudo θ (15° a 75°) e para o fator de escala k (hipotenusa de 1 a 10), além de vértice arrastável. Exibir medidas dos lados e o painel vivo das razões `CO/HIP`, `CA/HIP` e `CO/CA`.

## c) Caso neutro
Triângulo retângulo isósceles (`θ = 45°`, hipotenusa `1` ou catetos iguais a `1`): nenhum cateto domina o outro; cateto oposto e cateto adjacente têm a mesma medida, resultando em `tg 45° = 1` e `sen 45° = cos 45° = √2/2`. É o ponto de equilíbrio simétrico entre vertical e horizontal.

## d) Panorama e recorte
Situar o triângulo retângulo, teorema de Pitágoras, razões seno/cosseno/tangente, ângulos complementares (`sen θ = cos(90°−θ)`) e tabela notável (30°, 45°, 60°). Escopo: leitura geométrica das três razões, invariância por escala, relação fundamental `sen²θ + cos²θ = 1` e cálculo de alturas/distâncias acessíveis. Deixar lei dos senos/cossenos em triângulos quaisquer e funções periódicas para capítulos seguintes.

## e) Progressão por contraste
1. Manter `θ = 45°` (equilíbrio `CO = CA`) e variar apenas a escala k de 1 para 5: lados crescem, mas as razões não mudam.
2. Contrastar `θ = 45°` com `θ = 30°` (triângulo mais baixo, `CO = HIP/2`) e `θ = 60°` (triângulo mais alto, `CA = HIP/2`).
3. Comparar o olhar a partir do ângulo `θ` versus o complementar `90° − θ`: o que era oposto vira adjacente.
4. Contrastar seno/cosseno (limitados pela hipotenusa, sempre `< 1`) com a tangente (que passa de 1 quando `θ > 45°`).

## f) Dedução causal da forma
Todos os triângulos retângulos com o mesmo ângulo θ são semelhantes (caso AA), portanto dobrar a hipotenusa dobra obrigatoriamente os dois catetos e cancela o fator na divisão. Em `θ = 30°`, espelhar o triângulo retângulo cria um triângulo equilátero de lado igual à hipotenusa, provando visualmente que o cateto oposto vale metade da hipotenusa (`sen 30° = 1/2`). E como `CO² + CA² = HIP²`, dividir tudo por `HIP²` faz nascer `sen²θ + cos²θ = 1`.

## g) Simulação espacial e fronteiras
Arrastar θ próximo de 0° achata o cateto oposto (`sen θ → 0`, `cos θ → 1`, `tg θ → 0`); aproximar θ de 90° faz o cateto adjacente encolher a zero, o oposto colar na hipotenusa (`sen θ → 1`, `cos θ → 0`) e a tangente explodir (`CO/CA → ∞`). No triângulo retângulo geométrico, o domínio estrito de θ é `(0°, 90°)` porque em 0° ou 90° o triângulo degenera em segmento.

## h) Roteiro da lição

1. **Fala:** “Se os dois catetos medem 3 em `θ = 45°`, quanto dá a divisão do oposto pelo adjacente? Dá 1, porque a subida e o avanço horizontal são idênticos.” **Widget §5.4 — `geometria_plana`:** exibe o caso neutro `θ = 45°` com catetos iguais a 3, ângulo reto marcado e chip `tg 45° = 3/3 = 1`.
2. **Fala:** “Se esticarmos o triângulo de lados 3-4-5 para 6-8-10 sem mexer no ângulo, o seno muda ou continua `3/5`? Continua `0,6`, pois lados dobram juntos e a razão se conserva.” **Widget §5.4 — `geometria_plana`:** aluno move o slider de escala `k` de 1 a 3 sobre o triângulo fantasma 3-4-5 e vê `CO/HIP = 0,6` travado.
3. **Fala:** “O que acontece com o cateto oposto quando você aumenta o ângulo θ de 30° para 60° mantendo a hipotenusa 10? Ele cresce enquanto a sombra horizontal encolhe.” **Widget §5.4 — `geometria_plana`:** aluno arrasta o vértice no arco de raio 10; barras laterais de `CO` (seno) e `CA` (cosseno) trocam de tamanho em tempo real.
4. **Fala:** “Por que o seno de 30° vale exatamente meio? Espelhando o triângulo de 30° para baixo, formamos um triângulo equilátero onde dois catetos opostos somam uma hipotenusa.” **Widget §5.4 — `geometria_plana`:** botão/slider revela o reflexo fantasma do triângulo de 30°-60°-90°, destacando o equilátero completo de lado `HIP`.
5. **Fala:** “Se `sen 30° = 1/2` num triângulo de hipotenusa 2 e cateto oposto 1, quanto mede o cateto adjacente por Pitágoras? Mede `√3`, logo `cos 30° = √3/2`.” **Widget §5.4 — `geometria_plana`:** desenha os quadrados de área 1, 3 e 4 sobre os lados do triângulo 30°-60°-90° e atualiza os rótulos das razões.
6. **Fala:** “Quando olhamos pelo outro ângulo agudo, de 60°, quem passa a ser o cateto oposto? O lado `√3`, que antes era adjacente ao de 30°.” **Widget §5.4 — `geometria_plana`:** aluno alterna o arco destacado entre `30°` e `60°`, vendo os rótulos `CO` e `CA` trocarem de lugar (`sen 60° = cos 30°`).
7. **Fala:** “A tangente `CO/CA` pode ser maior que 1 se o seno e o cosseno nunca passam de 1? Sim: basta passar de 45°, quando o cateto oposto supera o adjacente.” **Widget §5.4 — `geometria_plana`:** cruzar `θ = 45°` acende a comparação `CO > CA` e mostra `tg 60° = √3 ≈ 1,73`.
8. **Fala:** “Por que `sen²θ + cos²θ` dá sempre 1 para qualquer ângulo θ? Porque num triângulo de hipotenusa 1 os próprios catetos medem `sen θ` e `cos θ`, e Pitágoras fecha a soma dos quadrados em 1.” **Widget §5.4 — `geometria_plana`:** fixa `HIP = 1`, exibe quadrados sobre os catetos e mostra a soma das áreas cravada em `1,00` ao girar θ.
9. **Fala:** “O que acontece com a tangente quando θ chega perto de 90°? O cateto adjacente quase some e a razão `CO/CA` dispara sem teto.” **Widget §5.4 — `geometria_plana`:** aluno arrasta θ até 85°, vendo a base `CA` colapsar perto de zero e o valor da tangente saltar.

## i) Questões pós-lição (6)
Quatro alternativas com diagnóstico imediato de trocas entre catetos, hipotenusa e escala.

1. **Num triângulo retângulo de lados 3, 4 e hipotenusa 5, o seno do ângulo oposto ao lado 3 vale…** A) `3/4` B) `3/5` C) `4/5` D) `5/3`. **Gabarito: B.** Feedback: o seno divide o cateto oposto (3) pela hipotenusa (5).
2. **Se dobrarmos todos os lados de um triângulo retângulo, o valor de `cos θ`…** A) dobra B) cai pela metade C) não muda D) fica ao quadrado. **Gabarito: C.** Feedback: por semelhança, numerador e denominador dobram juntos e a razão permanece igual.
3. **Para qual ângulo agudo o cateto oposto e o adjacente têm a mesma medida?** A) 30° B) 45° C) 60° D) 90°. **Gabarito: B.** Feedback: em 45° o triângulo retângulo é isósceles e `tg 45° = 1`.
4. **Se `sen 30° = 0,5`, qual é o valor de `cos 60°`?** A) `0,5` B) `√3/2` C) `1` D) `2`. **Gabarito: A.** Feedback: 30° e 60° são complementares; o oposto de 30° é o adjacente de 60°.
5. **Uma rampa reta sobe 6 m de altura ao percorrer 10 m de comprimento inclinado. Qual é o seno do ângulo de inclinação?** A) `0,6` B) `0,8` C) `0,75` D) `1,6`. **Gabarito: A.** Feedback: altura é cateto oposto (6) e a rampa é a hipotenusa (10), logo `6/10 = 0,6`.
6. **Num triângulo retângulo, por que o seno de um ângulo agudo nunca pode valer `1,2`?** A) Porque o ângulo é menor que 45°. B) Porque a hipotenusa é sempre maior que qualquer cateto. C) Porque a tangente vale 1. D) Porque os catetos são iguais. **Gabarito: B.** Feedback: como `CO < HIP`, a razão `CO/HIP` é sempre menor que 1.
