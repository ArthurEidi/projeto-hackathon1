# Plano — Função quadrática

## a) Ancoragem mecânica
A máquina `f(x)=ax²+bx+c` combina o quadrado da entrada, uma correção linear e um ponto de partida. A saída desenha uma parábola; a controla abertura e orientação, b desloca o equilíbrio do eixo de simetria junto com a, c fixa a saída em x=0. A entrada é x; a saída dependente é f(x).

## b) Visual de partida
Palco: gráfico dinâmico de parábola com sliders a,b,c e um marcador x→f(x). Mostrar eixo de simetria, vértice, interceptos e sinal da saída. Controle inicial em valores inteiros pequenos e uma tabela simétrica em torno do eixo.

## c) Caso neutro
Começar em `f(x)=x²`: entrada ao quadrado, vértice na origem, simetria esquerda/direita e abertura para cima. O zero da entrada fica fixo; x=±1 dão 1 e x=±2 dão 4.

## d) Panorama e recorte
Localizar parábolas, raízes, vértice, eixo, concavidade e discriminante. Foco: leitura causal do gráfico, raízes inteiras/pares simples e vértice em exemplos acessíveis. Deixar fórmula geral de Bhaskara com coeficientes difíceis, otimização aplicada e parábolas em cônicas para além do recorte.

## e) Progressão por contraste
1. Comparar `x²` a `x`: o termo quadrático introduz curvatura.
2. Trocar a de 1 para 2 e −1: curva mais estreita e depois invertida.
3. Alterar c: parábola sobe/desce inteira.
4. Adicionar b em `x²+2x`; o centro de simetria sai de zero. Reescrever visualmente `(x+1)²−1` para enxergar o vértice (−1,−1).
5. Contrastar duas, uma ou nenhuma raiz real pelo encontro com o eixo x.

## f) Dedução causal da forma
Em `x²`, entradas opostas têm o mesmo quadrado; daí simetria. O quadrado cresce mais depressa longe do zero, logo a curva se encurva. Multiplicar por a estica ou inverte a altura. Somar c desloca todos os pontos igualmente. O termo bx inclina o balanço e move o eixo: completar quadrado mostra `a(x+b/(2a))² + c−b²/(4a)`; a simetria ocorre onde os dois lados ficam à mesma distância.

## g) Simulação espacial e fronteiras
Mover x de −3 a 3; destacar pares equidistantes do eixo e observar saída. O domínio da expressão polinomial é R. A imagem depende do vértice: se a>0, `y≥y_v`; se a<0, `y≤y_v`. Uma raiz só existe quando a parábola toca/cruza o eixo x; discriminante positivo, zero ou negativo descreve dois, um ou nenhum cruzamento real.

## h) Roteiro da lição

1. **Fala:** “Se x vale −2 ou 2, qual saída dá `x²`? Em ambos os casos, 4; elevar ao quadrado apaga o sinal.” **Widget §5.1 — `plano_cartesiano`:** aluno arrasta o ponto entre −2 e 2; curva e rastro mostram as duas entradas na mesma altura.
2. **Fala:** “A reta fantasma y=x cresce por passos iguais; o que muda quando somamos x²? A inclinação deixa de ser constante e a curva dobra.” **Widget §5.1 — `plano_cartesiano`:** habilitar curva quadrática junto da reta fantasma e percorrer x=−1,0,1.
3. **Fala:** “Se eu troco x² por 2x², o ponto em x=2 fica em 4 ou 8? Fica em 8; o fator 2 estica a altura.” **Widget §5.1 — `plano_cartesiano`:** slider a de 1 para 2; comparar as parábolas sem apagar o caso anterior.
4. **Fala:** “E com a=−1, para onde vai a saída em x=2? Para −4; o sinal negativo reflete a curva para baixo.” **Widget §5.1 — `plano_cartesiano`:** levar a para −1 e observar a mudança de concavidade e do vértice mínimo para máximo.
5. **Fala:** “Somar 2 muda a abertura ou só a altura em cada ponto? Só soma 2: `x²+2` dá 6 em x=2.” **Widget §5.1 — `plano_cartesiano`:** slider c sobe a parábola inteira e mostra o intercepto y.
6. **Fala:** “Em `x²−2x`, que entradas fazem a saída zero? 0 e 2, porque `x(x−2)` zera em cada fator.” **Widget §5.1 — `plano_cartesiano`:** ativar raízes e mover o marcador até os cruzamentos, conferindo a fatoração.
7. **Fala:** “Em `x²−2x+1=(x−1)²`, onde fica o ponto mais baixo? Em (1,0), pois o quadrado zera quando x=1.” **Widget §5.1 — `plano_cartesiano`:** exibir vértice e eixo de simetria enquanto o aluno aproxima o cursor de x=1.
8. **Fala:** “Se a parábola fica um pouco acima do eixo, existe raiz real? Não; sem tocar ou cruzar o eixo, nenhuma entrada produz saída zero.” **Widget §5.1 — `plano_cartesiano`:** elevar c de −1 a 1 e contar as raízes visíveis: duas, uma e nenhuma.

## i) Questões pós-lição (6)
Quatro alternativas, feedback curto e correção de confusões entre raiz, vértice e coeficiente.

1. **Para `f(x)=x²`, quais entradas têm a mesma saída 9?** A) 3 e −3 B) 3 e 9 C) −9 e 9 D) 0 e 3. **Gabarito: A.** Feedback: números opostos têm o mesmo quadrado.
2. **Em `f(x)=−x²`, a parábola…** A) abre para cima B) abre para baixo C) vira reta D) não tem vértice. **Gabarito: B.** Feedback: o sinal negativo reflete todas as alturas no eixo x.
3. **Qual é a saída de `x²−4` em x=0?** A) −4 B) 0 C) 4 D) 16. **Gabarito: A.** Feedback: no eixo y, x=0 e resta c.
4. **Quais são as raízes de `x²−4=0`?** A) 0 e 4 B) −2 e 2 C) −4 e 4 D) só 2. **Gabarito: B.** Feedback: `x²=4` admite as duas entradas simétricas.
5. **O vértice de `x²−2x+1=(x−1)²` é…** A) (0,1) B) (1,0) C) (−1,0) D) (1,1). **Gabarito: B.** Feedback: o quadrado zera quando x=1 e a menor saída é 0.
6. **`x²+1=0` tem quantas raízes reais?** A) Duas B) Uma C) Nenhuma D) Infinitas. **Gabarito: C.** Feedback: `x²` nunca é negativo, então `x²+1` fica sempre acima do eixo.