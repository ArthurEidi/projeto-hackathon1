# Plano — Logaritmos

## a) Ancoragem mecânica
Logaritmo é a máquina que desfaz uma potência: `log_b(x)=y` pergunta “a que expoente elevar b para chegar a x?”. Entrada x (resultado positivo), saída y (expoente). É a operação inversa de `b^y=x`, não uma fórmula isolada.

## b) Visual de partida
Palco duplo sincronizado: à esquerda, exponencial `y=b^x`; à direita, logaritmo `y=log_b(x)`. Slider escolhe base b>0, b≠1; marcador em um gráfico espelha ponto do outro pela reta `y=x`. Um controle x do argumento só aceita valores positivos e mostra o expoente correspondente.

## c) Caso neutro
Começar com `2^0=1` e a pergunta inversa `log₂(1)=0`: entrada 1 volta ao expoente neutro 0. Depois usar `2^3=8 ↔ log₂(8)=3`. Fazer a ida e a volta visíveis antes de qualquer regra de logaritmos.

## d) Panorama e recorte
Situar definição, bases, log decimal/natural, propriedades como atalhos de produto/potência e equações exponenciais. Recorte inicial: significado de log, conversão potência↔log, domínio e gráficos. Deixar demonstrações de propriedades avançadas e logaritmos complexos de fora.

## e) Progressão por contraste
1. Comparar pergunta direta `2^3=?` com a inversa `log₂(8)=?`.
2. Usar potências exatas: `2^1=2`, `2^2=4`, `2^3=8`.
3. Trocar base 2 por 1/2: o gráfico logarítmico passa a decrescer.
4. Comparar exponencial e log pela reflexão na diagonal y=x.
5. Mostrar produto como soma de expoentes: `log₂(4·2)=log₂4+log₂2` deriva de `2²·2¹=2³`.

## f) Dedução causal da forma
Se `y=log_b(x)`, então exatamente `b^y=x`. Por isso os gráficos são inversos e seus pontos trocam coordenadas. O argumento precisa ser positivo porque potência de base positiva nunca produz zero ou valor negativo. `log_b(1)=0` pois `b⁰=1`; `log_b(b)=1`. Produto vira soma porque expoentes se somam ao multiplicar potências iguais. Essas propriedades devem vir depois da máquina inversa.

## g) Simulação espacial e fronteiras
Domínio: x>0; não existe ponto do gráfico para x≤0 nos reais. Imagem é R para b>0, b≠1. Para b>1, log cresce; para 0<b<1, decresce. A base b=1 é proibida pois `1^y` não alcança valores além de 1 e não pode ser desfeita; b≤0 não serve como base real geral. Mostrar a assíntota x=0.

## h) Roteiro da lição

1. **Fala:** “Se `2³=8`, a pergunta `log₂(8)` pede o 2, o 3 ou o 8? Pede o expoente 3; o log desfaz a potência.” **Widget §5.1 — `plano_cartesiano`:** exibir exponencial e ponto (3,8), com a projeção para o gráfico inverso.
2. **Fala:** “E se `2⁰=1`, quanto vale `log₂(1)`? Zero, porque esse é o expoente que produz 1.” **Widget §5.1 — `plano_cartesiano`:** mover o marcador até (0,1) e mostrar o ponto correspondente (1,0) no log.
3. **Fala:** “A que expoente elevamos 2 para chegar a 4? A 2, então `log₂(4)=2`.” **Widget §5.1 — `plano_cartesiano`:** aluno escolhe argumento 4; o marcador percorre a curva até exibir saída 2.
4. **Fala:** “Se trocamos a entrada por zero, há um expoente de 2 que produza zero? Não; potências positivas de 2 continuam positivas.” **Widget §5.1 — `plano_cartesiano`:** arrastar argumento em direção ao eixo x=0; domínio sombreado termina antes do zero.
5. **Fala:** “Os pontos (3,8) e (8,3) parecem espelhados em que linha? Em y=x, pois a função inversa troca entrada e saída.” **Widget §5.1 — `plano_cartesiano`:** alternar exponencial/log e exibir a diagonal como espelho.
6. **Fala:** “Se `log₂(4)=2` e `log₂(2)=1`, quanto dá `log₂(8)`? 3, porque 4·2=8 e os expoentes se somam.” **Widget §5.1 — `plano_cartesiano`:** montar visualmente 4×2=8 com os marcadores dos expoentes 2+1.
7. **Fala:** “Com base 1, `1^y` consegue produzir 2 e 4 para podermos desfazer? Não; só produz 1, então essa base não serve.” **Widget §5.1 — `plano_cartesiano`:** mover o slider da base a 1 e ver a exponencial colapsar em y=1 e a inversa desaparecer.
8. **Fala:** “Se a base passa de 2 para 1/2, o log continua crescendo? Não; agora a potência cai quando o expoente aumenta, então a inversa também decresce.” **Widget §5.1 — `plano_cartesiano`:** deslizar a base para 1/2 e acompanhar o espelhamento da curva decrescente.

## i) Questões pós-lição (6)
Quatro alternativas e feedback, mantendo os valores em potências inteiras simples.

1. **`log₂(8)` pergunta qual expoente?** A) 2 B) 3 C) 4 D) 8. **Gabarito: B.** Feedback: `2³=8`.
2. **Quanto vale `log₅(1)`?** A) 0 B) 1 C) 5 D) −1. **Gabarito: A.** Feedback: qualquer base positiva permitida elevada a zero dá 1.
3. **Qual igualdade é equivalente a `log₃(9)=2`?** A) `3·2=9` B) `3²=9` C) `9²=3` D) `2³=9`. **Gabarito: B.** Feedback: log devolve o expoente que produz o argumento.
4. **Qual argumento é permitido em `log₂(x)` nos reais?** A) −4 B) 0 C) 1/2 D) nenhum negativo e nenhum zero. **Gabarito: C.** Feedback: argumento deve ser estritamente positivo.
5. **`log₂(4)+log₂(2)` vale…** A) 2 B) 3 C) 6 D) 8. **Gabarito: B.** Feedback: os expoentes 2 e 1 somam, como `log₂(8)`.
6. **Qual é a base inválida para um logaritmo real?** A) 1/2 B) 2 C) 10 D) 1. **Gabarito: D.** Feedback: base 1 transforma todo expoente em 1, então não há inversa única.