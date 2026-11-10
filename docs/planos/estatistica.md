# Plano — Estatística

## a) Ancoragem mecânica
A estatística resume uma coleção de dados brutos `x₁, x₂, …, xₙ` por meio de dois mecanismos complementares: **centralidade** e **dispersão**. A **média aritmética** `x̄` é o ponto de equilíbrio físico (gangorra) onde a soma das distâncias à esquerda iguala a soma à direita, nivelando todas as barras na mesma altura; a **mediana** é o valor que ocupa a posição central na fila ordenada (imune a extremos isolados); a **moda** é o pico de frequência; e a **variância / desvio padrão** medem o quão longe, em média quadrática, os dados se espalham ao redor da média `x̄`.

## b) Visual de partida
Palco `barras`: colunas verticais cujas alturas os alunos podem arrastar para cima ou para baixo, acompanhadas de uma linha horizontal tracejada de **média** `x̄` (nivelamento líquido / gangorra de desvios `xᵢ − x̄`), destaque da coluna central da **mediana** e indicador visual de **desvio padrão** `σ` como faixa de espalhamento ao redor da média.

## c) Caso neutro
Conjunto de dados perfeitamente uniforme, como `{5, 5, 5, 5, 5}`: todas as barras já têm a mesma altura `5`; a média é `5`, a mediana é `5`, todos os desvios individuais `xᵢ − x̄` valem `0` e, portanto, a variância e o desvio padrão são **exatamente zero** (`σ = 0`, ausência total de dispersão).

## d) Panorama e recorte
Situar leitura de gráficos de barras/histogramas, medidas de tendência central (média simples, média ponderada, mediana para `n` ímpar e par, moda) e medidas de dispersão (amplitude, variância e desvio padrão). Escopo: intuição visual de nivelamento, sensibilidade da média a valores discrepantes (outliers) versus robustez da mediana, e comparação de regularidade pelo desvio padrão. Deixar curva normal padronizada com tabela Z extensa para aprofundamento.

## e) Progressão por contraste
1. Dados constantes `{5, 5, 5}` (`σ = 0`) versus dados espalhados `{2, 5, 8}` (mesma média `5` e mesma mediana `5`, mas desvios `−3, 0, +3` e `σ > 0`).
2. **Média** (sensível a valores extremos: puxar a última barra para o alto arrasta a média junto) versus **mediana** (depende só do elemento do meio na fila ordenada: puxar o maior valor não move a mediana nem um milímetro).
3. Quantidade **ímpar** de dados (mediana é o único termo central) versus quantidade **par** de dados (mediana é a média dos dois termos centrais).
4. **Média simples** (pesos iguais a 1) versus **média ponderada** (cada nota/valor repetido `p` vezes puxa a gangorra com força proporcional ao seu peso `p`).

## f) Dedução causal da forma
Por que a média é `soma / n`? Porque se juntarmos o conteúdo de todas as `n` barras num reservatório e redistribuirmos igualmente entre as `n` colunas, todas ficam na altura `(x₁ + … + xₙ)/n` — o que sobra acima da linha da média preenche exatamente o que falta abaixo dela (`∑(xᵢ − x̄) = 0`). E por que a variância eleva os desvios `(xᵢ − x̄)` ao quadrado antes de tirar a média? Porque sem elevar ao quadrado os desvios negativos à esquerda e os positivos à direita sempre se cancelam e somam zero! O quadrado torna todos positivos e penaliza desvios grandes; a raiz quadrada final devolve o **desvio padrão** `σ` para a mesma unidade original dos dados.

## g) Simulação espacial e fronteiras
Arrastar apenas a última barra de `{2, 4, 6, 8, 10}` de `10` para `50` (criando um *outlier*) mostra a linha da média saltar de `6` para `14`, enquanto a mediana continua cravada em `6` (o 3º valor ordenado). Quando o aluno desordena a sequência para `{10, 2, 8, 4, 6}`, um alerta visual mostra a armadilha clássica: pegar o número do meio **sem ordenar antes** dá errado (`8` em vez de `6`). Na dispersão, a fronteira inferior é `σ = 0` (variância nunca é negativa).

## h) Roteiro da lição

1. **Fala:** “Se 4 amigos têm todos `R$ 5` `{5, 5, 5, 5}`, qual é a média e quanto cada um se afasta dela? A média é 5 e o afastamento (desvio padrão) é zero, pois todas as barras já estão niveladas.” **Widget §5.6 — `barras`:** exibe 4 barras de altura 5 com a linha da média `x̄ = 5` e faixa de dispersão `σ = 0`.
2. **Fala:** “Se mudarmos as alturas para `{3, 4, 6, 7}`, como achar a altura que nivela todas as barras por igual? Somando tudo (`20`) e dividindo pelas 4 barras (`20/4 = 5`): o que passa de 5 na direita (`+1` e `+2`) tapa exatamente o que falta na esquerda (`−2` e `−1`).” **Widget §5.6 — `barras`:** aluno ajusta as barras para `{3, 4, 6, 7}`; os blocos acima da linha `y = 5` destacam que compensam os vazios abaixo dela.
3. **Fala:** “Na fila ordenada de 5 salários `{2, 3, 4, 5, 6}` (em mil reais), quanto valem a média e a mediana (o valor bem do meio)? Ambas valem `4`, porque a fila é simétrica.” **Widget §5.6 — `barras`:** mostra as 5 barras em ordem crescente com a barra central `4` destacada como mediana e a linha `x̄ = 4`.
4. **Fala:** “O que acontece com a média e com a mediana se o último salário saltar de `6` para `26` (`{2, 3, 4, 5, 26}`)? A média dispara de `4` para `8` puxada pelo extremo, mas a mediana continua firme em `4` (o 3º da fila)!” **Widget §5.6 — `barras`:** aluno puxa a 5ª barra até 26; a linha da média sobe para 8 enquanto o marcador da mediana no 3º posto nem se mexe.
5. **Fala:** “E se os dados vierem fora de ordem, como `{10, 2, 8, 4, 6}`, a mediana é o `8` que está no meio da lista? Não! Primeiro é obrigatório ordenar para `{2, 4, 6, 8, 10}`, revelando a mediana correta `6`.” **Widget §5.6 — `barras`:** botão “Ordenar barras” reorganiza as colunas em escada crescente e corrige o destaque central para `6`.
6. **Fala:** “Quando há um número PAR de barras ordenadas, como `{2, 4, 8, 10}`, quem fica no meio? Ninguém sozinho: pegamos a média dos dois centrais (`4` e `8`), dando mediana `(4 + 8)/2 = 6`.” **Widget §5.6 — `barras`:** destaca o par central `(4, 8)` nas 4 barras e marca a mediana `6` exatamente entre eles.
7. **Fala:** “Num gráfico de frequência de calçados, qual medida representa o tamanho mais vendido (a barra mais alta)? É a **moda**, o valor que mais se repete.” **Widget §5.6 — `barras`:** exibe um histograma de frequências onde a coluna de maior altura acende com o rótulo `Moda`.
8. **Fala:** “Se na escola a Prova 1 tem peso 1 (nota 4) e a Prova 2 tem peso 3 (nota 8), a média fica no meio (`6`) ou mais perto de 8? Fica em `(1·4 + 3·8)/(1+3) = 28/4 = 7`, porque o peso 3 equivale a contar a nota 8 três vezes (`{4, 8, 8, 8}`)." **Widget §5.6 — `barras`:** expande a barra de peso 3 em três barras iguais de altura 8 ao lado da barra 4, equilibrando a gangorra em `7`.
9. **Fala:** “Dois alunos têm a mesma média `6`: o Aluno A tirou `{6, 6, 6}` e o Aluno B tirou `{2, 6, 10}`. Quem é mais regular e por quê? O Aluno A, pois seus desvios até a média são `0` (`σ = 0`), enquanto B tem desvios `−4, 0, +4` (`variância = (16+0+16)/3`).” **Widget §5.6 — `barras`:** compara lado a lado os dois conjuntos de mesma média 6, desenhando os quadrados dos desvios `(xᵢ − x̄)²`.

## i) Questões pós-lição (6)
Quatro alternativas cobrindo média simples/ponderada, mediana (ordenação e caso par), moda e desvio padrão como regularidade.

1. **Qual é a média aritmética e a moda do conjunto `{4, 7, 7, 10, 12}`?** A) Média 7 e moda 7 B) Média 8 e moda 7 C) Média 7 e moda 8 D) Média 8 e moda 12. **Gabarito: B.** Feedback: a soma é `4+7+7+10+12 = 40`, logo a média é `40/5 = 8`; o valor que mais se repete (moda) é `7`.
2. **Qual é a mediana dos valores `{12, 3, 9, 5, 7}`?** A) 9 B) 5 C) 7 D) 6. **Gabarito: C.** Feedback: ordenando primeiro em `{3, 5, 7, 9, 12}`, o termo central (3º valor) é `7`.
3. **Qual é a mediana dos 4 números `{2, 5, 9, 12}`?** A) 5 B) 7 C) 9 D) 6,5. **Gabarito: B.** Feedback: com quantidade par já ordenada, a mediana é a média dos dois termos centrais: `(5 + 9)/2 = 7`.
4. **Um aluno tirou nota 5 num trabalho de peso 2 e nota 8 numa prova de peso 3. Qual foi sua média ponderada?** A) `6,5` B) `6,8` C) `7,0` D) `7,5`. **Gabarito: B.** Feedback: `(2×5 + 3×8) / (2 + 3) = (10 + 24)/5 = 34/5 = 6,8`.
5. **Em uma pequena empresa, 4 funcionários ganham R$ 2.000 e o dono passa a ganhar R$ 50.000 (antes ganhava R$ 10.000). Com esse aumento do dono, o que acontece com a média e com a mediana dos 5 rendimentos?** A) Ambas aumentam muito. B) A média aumenta e a mediana não muda (continua R$ 2.000). C) A mediana aumenta e a média não muda. D) Nenhuma muda. **Gabarito: B.** Feedback: a média sobe com a soma total, mas o 3º valor da fila ordenada `{2000, 2000, 2000, 2000, 50000}` continua sendo R$ 2.000.
6. **Três atletas têm a mesma média de tempo nos 100 m, com desvios padrão `σ_A = 0,1 s`, `σ_B = 0,5 s` e `σ_C = 0,9 s`. Qual atleta teve o desempenho mais regular (constante)?** A) Atleta A B) Atleta B C) Atleta C D) Todos têm a mesma regularidade. **Gabarito: A.** Feedback: quanto menor o desvio padrão, mais próximos da média estão os resultados e maior é a regularidade.
