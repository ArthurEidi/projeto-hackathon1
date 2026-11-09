# Plano — Matrizes, determinantes e sistemas

## a) Ancoragem mecânica
Uma matriz 2×2 é máquina que recebe um vetor `(x,y)` e o transforma em outro vetor por combinações lineares. Duas equações lineares formam, ao mesmo tempo, retas no plano; resolver o sistema é descobrir onde as duas condições entregam a mesma solução. O determinante informa se a transformação preserva área (não nulo) ou amassa o plano numa linha/colapso (zero).

## b) Visual de partida
Palco principal: grade cartesiana com vetores-base e malha transformada. Quatro controles a,b,c,d editam a matriz; arrastar vetor de entrada mostra saída. Aba “sistema” plota duas retas com controles de coeficientes e destaca interseção. Exibir paralelogramo unitário cuja área orientada vira |det A|.

## c) Caso neutro
Matriz identidade `[[1,0],[0,1]]`: cada vetor passa sem mudança e a grade permanece. Sistema `x=2`, `y=1` cruza em (2,1), um caso de solução única sem contas grandes.

## d) Panorama e recorte
Situar operações matriciais, determinante, inversa, sistemas lineares e interpretação geométrica. Escopo: matriz 2×2 aplicada a vetor, determinante como fator de área e sistemas 2×2 por interseção/Cramer em exemplos simples. Deixar matrizes maiores e algoritmos extensos para etapa posterior.

## e) Progressão por contraste
1. Identidade versus reflexão `diag(−1,1)`: muda uma direção e preserva a outra.
2. Escala `diag(2,1)`: dobra horizontalmente; área dobra.
3. Rotação simples `[[0,−1],[1,0]]`: vetor gira 90°; área se conserva.
4. Matriz com linhas proporcionais: plano cai numa reta e det=0.
5. Sistemas: retas concorrentes (uma solução), paralelas distintas (nenhuma), coincidentes (infinitas).

## f) Dedução causal da forma
As colunas da matriz são destinos dos vetores unitários; qualquer vetor `x e₁+y e₂` vai para a mesma combinação das colunas. O paralelogramo formado por elas tem área orientada `ad−bc`, o determinante. Se as colunas ficam na mesma linha, área zero e a informação de uma direção se perde; não há transformação inversa. Para sistemas, cada equação restringe o ponto a uma reta; solução é a interseção, não um símbolo obtido por ritual.

## g) Simulação espacial e fronteiras
Domínio e contradomínio são R². det≠0 dá transformação reversível e sistema com solução única quando associado; det=0 exige olhar as retas: podem ser paralelas ou coincidentes. Distância e ângulo não são preservados por toda matriz; só casos especiais (rotações/reflexões e escalas apropriadas). Evitar afirmar que todo det=0 produz ausência de solução.

## h) Roteiro da lição

1. **Fala:** “Se a máquina recebe (2,1) e é a identidade, para onde vai o ponto? Continua em (2,1), porque nada foi alterado.” **Widget §5.6 — `transformacao_plano`:** aluno seleciona matriz identidade e arrasta um vetor de entrada sobre a malha.
2. **Fala:** “Se dobramos só a coordenada x, (1,2) vira (2,2) ou (2,4)? Vira (2,2); a segunda coordenada permanece.” **Widget §5.6 — `transformacao_plano`:** sliders da diagonal mudam para 2 e 1; a malha estica horizontalmente.
3. **Fala:** “O quadrado unitário virou uma faixa com que área? Área 2, pois só uma direção dobrou.” **Widget §5.6 — `transformacao_plano`:** mostrar o paralelogramo imagem e indicador da área antes/depois.
4. **Fala:** “Se as duas colunas da matriz ficam na mesma linha, ainda sobra área no paralelogramo? Não; ele colapsa numa linha e o determinante zera.” **Widget §5.6 — `transformacao_plano`:** aluno arrasta um coeficiente até alinhar as colunas e vê a malha perder uma dimensão.
5. **Fala:** “No sistema `x+y=3` e `x−y=1`, que ponto satisfaz as duas? (2,1), pois 2+1=3 e 2−1=1.” **Widget §5.1 — `plano_cartesiano`:** traçar as duas retas e mover o marcador até sua interseção.
6. **Fala:** “Se desloco uma reta para ficar paralela à outra, quantos pontos comuns aparecem? Nenhum, porque elas nunca se encontram.” **Widget §5.1 — `plano_cartesiano`:** aluno move o intercepto de uma reta; o cruzamento sai da janela e as retas ficam paralelas.
7. **Fala:** “E se as duas retas passam a ocupar exatamente o mesmo traço, quantas soluções há? Infinitas; cada ponto delas satisfaz ambas.” **Widget §5.1 — `plano_cartesiano`:** ajustar os coeficientes até as linhas coincidirem e destacar o conjunto de interseções.
8. **Fala:** “Determinante zero decide sozinho entre nenhuma e infinitas soluções? Não; precisamos comparar as retas, que podem ser paralelas distintas ou coincidentes.” **Widget §5.6 — `transformacao_plano` + §5.1 — `plano_cartesiano`:** alternar do colapso da transformação ao caso singular do sistema e comparar os dois resultados possíveis.

## i) Questões pós-lição (6)
Quatro opções e feedback; gráficos ou vetores devem acompanhar quando o widget estiver disponível.

1. **O que a matriz identidade faz a um vetor?** A) Zera B) Gira 90° C) Mantém igual D) Reflete. **Gabarito: C.** Feedback: é o caso em que entrada passa sem alteração.
2. **A matriz `[[2,0],[0,1]]` envia (1,3) para…** A) (1,6) B) (2,3) C) (2,6) D) (3,1). **Gabarito: B.** Feedback: dobra a coordenada x e mantém y.
3. **Qual é o determinante de `[[2,0],[0,3]]`?** A) 5 B) 6 C) 1 D) 0. **Gabarito: B.** Feedback: `ad−bc=2·3−0=6`, fator de área.
4. **As retas `x+y=3` e `x−y=1` se cruzam em…** A) (1,2) B) (2,1) C) (3,1) D) (0,3). **Gabarito: B.** Feedback: 2+1=3 e 2−1=1.
5. **Se duas retas distintas são paralelas, o sistema tem…** A) uma solução B) nenhuma C) infinitas D) sempre solução (0,0). **Gabarito: B.** Feedback: não há ponto que pertença às duas ao mesmo tempo.
6. **O determinante zero garante que o sistema não tem solução?** A) Sim, sempre B) Não; pode ter nenhuma ou infinitas C) Garante uma solução D) Só se os coeficientes forem positivos. **Gabarito: B.** Feedback: retas paralelas distintas não cruzam; coincidentes compartilham todos os pontos.