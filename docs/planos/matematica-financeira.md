# Plano — Matemática financeira

## a) Ancoragem mecânica
Capital inicial passa por uma máquina de tempo e taxa e vira montante. No juro simples, cada período soma a mesma parcela `C·i`; no composto, cada período multiplica o saldo por `1+i`: `M=C(1+i)^t`. C é entrada inicial, i é taxa por período, t é número de períodos e M é saída final.

## b) Visual de partida
Palco: linha do tempo com saldo em cada marca, gráfico saldo×período e controles para capital C, taxa i e tempo t. Alternador simples/composto. Sliders com valores pequenos (C=100, i=10%, t=0…5). Ao mover t, pontos aparecem na linha e barras mostram parcela acrescida em cada etapa.

## c) Caso neutro
Começar em t=0: nenhum período passou, então M=C. Depois i=0: sem taxa, saldo não muda para qualquer tempo. Esses casos calibram o significado de capital e de fator antes de comparar juros.

## d) Panorama e recorte
Situar porcentagem, juros simples/compostos, montante e comparação de planos. Escopo: transformar taxa percentual em fator, calcular poucos períodos e explicar diferença entre somar e capitalizar. Deixar séries de pagamentos, descontos, inflação e equivalência de taxas para outras lições.

## e) Progressão por contraste
1. Capital 100 com i=10%: simples acrescenta 10 a cada período (100,110,120…).
2. Composto: multiplica por 1,1 (100,110,121…).
3. No primeiro período coincidem; no seguinte aparece contraste porque a taxa incide sobre saldo atualizado.
4. Variar taxa e tempo; taxa negativa pequena representa redução, desde que fator permaneça válido.

## f) Dedução causal da forma
No simples, a parcela de juros é sempre calculada sobre C, portanto a variação absoluta é constante e M cresce linearmente em t. No composto, juros entram no saldo e também rendem no próximo período: cada etapa multiplica o todo por `1+i`, produzindo potência. A diferença não é “juros sobre juros” como slogan: é o efeito mecânico de reaplicar o mesmo fator ao saldo atualizado.

## g) Simulação espacial e fronteiras
Usar períodos inteiros não negativos no modelo básico. Com C≥0 e i≥0, saldos não diminuem. Em composto, requerer `1+i>0`; para aplicações usuais, trabalhar i≥0 ou explicitar taxas negativas válidas. Distinguir taxa por período de duração e não misturar, por exemplo, taxa mensal com anos sem conversão. Valores reais dependem de tarifas, impostos e contrato: a visualização isola o modelo matemático.

## h) Roteiro da lição

1. **Fala:** “Se passaram zero meses, quanto vale o saldo que começou em 100? Continua 100; nenhum período agiu ainda.” **Widget §5.6 — `barras`:** mostrar uma única barra em t=0; aluno arrasta o marcador de tempo de volta ao início.
2. **Fala:** “Com 10% sobre 100, quanto rende um período? 10, porque dez por cento de cem são dez.” **Widget §5.6 — `barras`:** slider i=10%; a barra do primeiro período cresce de 100 a 110 e separa principal e rendimento.
3. **Fala:** “No juro simples, o segundo mês rende 10 ou 11? Rende 10 outra vez, porque a taxa incide sempre sobre os 100 iniciais.” **Widget §5.6 — `barras`:** avançar t para 2; duas parcelas iguais aparecem e totalizam 120.
4. **Fala:** “No composto, o segundo mês também rende 10? Não; agora 10% incide sobre 110, então acrescenta 11 e chega a 121.” **Widget §5.6 — `barras`:** alternar para composto e iluminar o rendimento sobre o saldo atualizado.
5. **Fala:** “Por que os modelos dão o mesmo resultado no primeiro período e diferem no segundo? No primeiro a base é 100 nos dois; depois só o composto atualiza a base.” **Widget §5.1 — `plano_cartesiano`:** comparar pontos de juros simples (reta) e compostos (curva) mantendo C=100 e i=10%.
6. **Fala:** “Se a taxa é zero, o saldo cresce ou fica igual? Fica igual a 100, pois o fator de cada período é 1.” **Widget §5.6 — `barras`:** mover i para 0 e avançar três períodos; barras permanecem na mesma altura.
7. **Fala:** “Se dobramos o capital para 200, o juro simples de 10% por período vira 10 ou 20? Vira 20, porque a parcela é proporcional ao capital.” **Widget §5.6 — `barras`:** slider C passa de 100 a 200; comparar rendimento por período e total.
8. **Fala:** “Uma taxa de 2% ao mês por três meses usa fator `1,02·3` ou `1,02³` no composto? Usa `1,02³`, pois multiplicamos pelo fator três vezes.” **Widget §5.6 — `barras`:** aluno avança três marcas mensais, observando `1,02` reaplicado em cada saldo.

## i) Questões pós-lição (6)
Quatro alternativas; feedback explícito sobre base de cálculo e unidade da taxa.

1. **Sem nenhum período transcorrido, quanto vale o montante de C=100?** A) 0 B) 10 C) 100 D) 110. **Gabarito: C.** Feedback: antes de qualquer rendimento, o saldo é o capital inicial.
2. **10% de 100 é…** A) 1 B) 10 C) 20 D) 110. **Gabarito: B.** Feedback: 10% significa 10 de cada 100.
3. **R$100 a juros simples de 10% por período: montante após 2 períodos?** A) 110 B) 120 C) 121 D) 200. **Gabarito: B.** Feedback: soma 10 duas vezes sobre o capital original.
4. **R$100 a juros compostos de 10% por período: saldo após 2 períodos?** A) 120 B) 121 C) 110 D) 130. **Gabarito: B.** Feedback: 100→110→121, o segundo rendimento incide sobre 110.
5. **Qual expressão modela composto com capital C, taxa i e t períodos?** A) `C+it` B) `C(1+it)` C) `C(1+i)^t` D) `Ci+t`. **Gabarito: C.** Feedback: cada período reaplica o fator `1+i`.
6. **Uma taxa de 2% ao mês será usada por 3 meses. Qual fator composto correto?** A) `1+0,02·3` B) `1,02³` C) `1,2³` D) `0,02³`. **Gabarito: B.** Feedback: a taxa já é mensal; multiplique por 1,02 em cada um dos três períodos.