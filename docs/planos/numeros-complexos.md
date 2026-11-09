# Plano — Números complexos

## a) Ancoragem mecânica
Um complexo `z=a+bi` é um ponto/vetor no plano: a é deslocamento horizontal, b vertical, e i indica a segunda direção com `i²=−1`. Somar complexos soma deslocamentos. Multiplicar escala e gira: módulos multiplicam, ângulos somam. O plano substitui a tentativa impossível de ordenar todos os números como numa reta.

## b) Visual de partida
Palco: plano de Argand com vetor z arrastável (a,b), origem e grade. Controles alteram parte real e imaginária; um segundo vetor w permite soma por ponta-cauda. Modo produto mostra rotação e escala ao multiplicar por i ou por um complexo fixo. Alternar forma algébrica e coordenadas; exibir módulo como distância à origem.

## c) Caso neutro
Multiplicar por 1 mantém o vetor; somar 0 não desloca. Em seguida multiplicar por i: vetor gira 90° anti-horário sem mudar comprimento, revelando por que `i²=−1` (duas rotações de 90° apontam para −1).

## d) Panorama e recorte
Situar forma a+bi, plano complexo, conjugado, módulo, operações, raízes de equações quadráticas e forma polar. Escopo: representação geométrica, soma, produto por i, conjugado, módulo e divisão simples por conjugado. Deixar De Moivre e raízes n-ésimas para aprofundamento.

## e) Progressão por contraste
1. Números reais ficam no eixo horizontal; incluir b desloca ao plano.
2. Somar `(a,b)+(c,d)=(a+c,b+d)` compara-se a juntar vetores.
3. Multiplicar por i gira; por −1 gira meia-volta; por 2 dobra comprimento.
4. Conjugado `(a+bi)→(a−bi)` espelha no eixo real.
5. Resolver `x²+1=0`: as raízes ±i não vivem na reta real, mas existem no plano complexo.

## f) Dedução causal da forma
A regra `i²=−1` faz o produto algébrico `(a+bi)(c+di)` distribuir termos e transformar `bd i²` em `−bd`; no plano, isso corresponde a uma rotação/escala. Para `z=a+bi`, multiplicar por conjugado dá `z·z̄=a²+b²`, número real igual ao quadrado da distância ao zero; daí `|z|=√(a²+b²)` e o denominador da divisão fica não nulo quando z≠0. A geometria explica as operações.

## g) Simulação espacial e fronteiras
Todo complexo corresponde a um ponto de R²; não há ordem total compatível com a dos reais (não dizer que um complexo é “maior” que outro). Módulo é distância não negativa. Divisão por zero é proibida. Somas seguem vetores; produtos podem alterar ângulo e tamanho. A conjugação espelha e preserva módulo.

## h) Roteiro da lição

1. **Fala:** “Onde colocamos `3+2i`: no ponto (2,3) ou (3,2)? Em (3,2), porque a parte real vai na horizontal e a imaginária na vertical.” **Widget §5.1 — `plano_cartesiano` (família `pontos`):** aluno posiciona o ponto e lê as coordenadas nos eixos real e imaginário.
2. **Fala:** “Se somamos `1−i`, qual ponto resulta de (3,2)+(1,−1)? (4,1), pois somamos cada coordenada.” **Widget §5.1 — `plano_cartesiano`:** arrastar o segundo vetor pela regra ponta-cauda; o resultante é desenhado no plano.
3. **Fala:** “Multiplicar por i muda o comprimento ou gira o vetor? Para `3+2i`, vira `−2+3i`: gira 90° e mantém o comprimento.” **Widget §5.6 — `transformacao_plano`:** aplicar a rotação-matriz equivalente a multiplicar por i e observar a malha girar.
4. **Fala:** “Se aplicamos i duas vezes, para onde vai (1,0)? Para (−1,0), porque duas rotações de 90° fazem meia-volta e `i²=−1`.” **Widget §5.6 — `transformacao_plano`:** aluno avança duas aplicações da mesma transformação; o vetor termina oposto ao inicial.
5. **Fala:** “O conjugado de `3+2i` fica acima ou abaixo do eixo real? Em (3,−2), refletido abaixo, com a mesma distância à origem.” **Widget §5.1 — `plano_cartesiano`:** selecionar conjugado e comparar os pontos espelhados e seus módulos.
6. **Fala:** “Qual é a distância de `3+4i` até zero: 5 ou 7? É 5, pois o triângulo 3-4-5 mede a distância.” **Widget §5.4 — `geometria_plana`:** mostrar o triângulo retângulo no plano, com catetos 3 e 4 e hipotenusa 5.
7. **Fala:** “Quanto dá `(2+i)(2−i)`? 5, porque os termos imaginários se cancelam e `i²=−1`.” **Widget §5.1 — `plano_cartesiano`:** destacar z e seu conjugado; a distância ao quadrado aparece como 2²+1².
8. **Fala:** “A equação `x²+1=0` tem solução real? Não; no plano complexo, as soluções são i e −i, cujos quadrados valem −1.” **Widget §5.1 — `plano_cartesiano` (família `pontos`):** marcar i e −i no eixo imaginário e mostrar o par conjugado.

## i) Questões pós-lição (6)
Quatro opções, feedback direto, alinhadas ao treino de múltipla escolha.

1. **Qual ponto representa `3+2i`?** A) (2,3) B) (3,2) C) (3,−2) D) (−3,2). **Gabarito: B.** Feedback: parte real vai no eixo horizontal; coeficiente de i no vertical.
2. **Quanto vale `i²`?** A) 1 B) i C) −1 D) −i. **Gabarito: C.** Feedback: duas rotações de 90° levam ao sentido oposto.
3. **`(2+i)+(1+3i)` é…** A) 3+4i B) 2+3i C) 3+3i D) 1+2i. **Gabarito: A.** Feedback: some separadamente as coordenadas real e imaginária.
4. **Qual é o conjugado de `4−2i`?** A) −4+2i B) 4+2i C) −4−2i D) 2+4i. **Gabarito: B.** Feedback: conjugado reflete o ponto no eixo real, trocando o sinal da parte imaginária.
5. **Qual é o módulo de `3+4i`?** A) 1 B) 5 C) 7 D) 25. **Gabarito: B.** Feedback: distância à origem é √(3²+4²)=5.
6. **As soluções complexas de `x²+1=0` são…** A) ±1 B) ±i C) 1 e i D) não existem em C. **Gabarito: B.** Feedback: i²=−1, então ambos i e −i ao quadrado dão −1.