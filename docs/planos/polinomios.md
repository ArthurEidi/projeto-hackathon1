# Plano — Polinômios

## a) Ancoragem mecânica
Polinômio é uma máquina que calcula várias potências da entrada, escala cada uma por um coeficiente e soma os efeitos: `P(x)=a_nx^n+…+a₁x+a₀`. x entra; P(x) sai. Cada termo contribui de modo diferente, e as raízes são entradas em que as contribuições se equilibram até a soma zerar.

## b) Visual de partida
Palco: gráfico interativo com controles de coeficientes e grau até 4, mais marcadores para raízes e tabela de valores. Alternar “termo a termo” para mostrar como cada parcela adiciona uma curva ao resultado total. Entrada x deslizante percorre o gráfico; eixos e sinal da saída permanecem visíveis.

## c) Caso neutro
Começar por `P(x)=x`: entrada passa sem alteração, gráfico y=x e única raiz 0. Depois adicionar constante e termo quadrático um por vez. Esse caso-calibração ajuda a enxergar o efeito novo de cada parcela.

## d) Panorama e recorte
Situar grau, coeficientes, raízes, fatoração, multiplicidade e comportamento nas pontas. Escopo: polinômios reais de grau até 3 para leitura de gráfico, raízes evidentes, fator comum e comportamento qualitativo. Deixar divisão polinomial formal, teoremas gerais e raízes complexas para capítulos próprios.

## e) Progressão por contraste
1. Constante `1`: saída fixa; termo x: reta.
2. Somar `x²`: curva fica não linear e simétrica se só esse termo atuar.
3. Somar termo constante desloca valores e pode mover/retirar raízes.
4. Fatorar `x(x−2)`: zeros 0 e 2 aparecem como cruzamentos.
5. Comparar `(x−1)²` e `(x−1)³`: raiz de multiplicidade par toca/retorna; ímpar atravessa (sem prometer que multiplicidade sozinha determina toda forma local sem coeficiente analisado).

## f) Dedução causal da forma
Cada fator `(x−r)` zera precisamente em x=r; por isso produto de fatores marca raízes. O sinal muda ao atravessar um fator simples, mas fator repetido par mantém o sinal. O termo de maior grau domina quando |x| fica muito grande porque cresce mais depressa que as potências menores; seu coeficiente decide comportamento final e orientação. A forma surge da soma dos termos, não de um molde a decorar.

## g) Simulação espacial e fronteiras
Polinômios reais aceitam todo x real; sem assíntotas verticais por restrição do domínio. O gráfico pode ter no máximo n raízes reais distintas para grau n (não necessariamente n). Distinguir raiz real de raiz complexa e mostrar que um zero de multiplicidade par pode tocar o eixo sem cruzar. Limitar escala do gráfico sem concluir que curva não existe fora da janela.

## h) Roteiro da lição

1. **Fala:** “Se a máquina é `P(x)=x`, qual saída aparece para x=−1? −1; este é nosso caso-base y=x.” **Widget §5.1 — `plano_cartesiano`:** exibir a reta fantasma e arrastar o ponto por −1, 0 e 1.
2. **Fala:** “Ao acrescentar x², o que acontece com a saída em x=−2 e x=2? O quadrado soma 4 nos dois lados, então a curva deixa de ser reta.” **Widget §5.1 — `plano_cartesiano`:** ligar o termo quadrático e mostrar cada parcela e a soma no ponto móvel.
3. **Fala:** “Se o coeficiente de x⁴ é 2, qual termo domina bem longe da origem em `2x⁴−5x²+1`? O termo 2x⁴, pois cresce mais depressa.” **Widget §5.1 — `plano_cartesiano`:** aluno amplia a janela de x; as parcelas aparecem separadas e a de maior grau domina.
4. **Fala:** “Em `x(x−2)`, quais entradas fazem a saída zero? 0 e 2; basta um dos fatores zerar.” **Widget §5.1 — `plano_cartesiano`:** exibir pontos de raiz e deixar o aluno percorrer o intervalo entre eles.
5. **Fala:** “Entre 0 e 2, o produto `x(x−2)` fica positivo ou negativo? Negativo, porque um fator é positivo e o outro negativo.” **Widget §5.1 — `plano_cartesiano`:** mover x=1 e colorir o sinal da saída; depois testar x=−1 e x=3.
6. **Fala:** “Em `(x−1)²`, o gráfico cruza o eixo em x=1 ou só toca? Só toca; o quadrado fica não negativo dos dois lados.” **Widget §5.1 — `plano_cartesiano`:** traçar a curva e aproximar o marcador de x=1 por ambos os lados.
7. **Fala:** “E em `(x−1)³`, a saída muda de sinal ao passar por 1? Sim; potência ímpar mantém o sinal do fator.” **Widget §5.1 — `plano_cartesiano`:** sobrepor os dois gráficos e comparar o comportamento em x=0, 1 e 2.
8. **Fala:** “Um polinômio de grau 3 precisa ter três raízes reais distintas? Não; pode ter menos, embora não passe de três.” **Widget §5.1 — `plano_cartesiano`:** alternar exemplos de grau 3 com uma e três interseções reais e observar as raízes marcadas.

## i) Questões pós-lição (6)
Quatro alternativas por questão, uma correta e feedback sobre fatores e grau.

1. **Qual é o grau de `3x³−2x+1`?** A) 1 B) 2 C) 3 D) 6. **Gabarito: C.** Feedback: o maior expoente com coeficiente não nulo determina o grau.
2. **Quanto vale `P(0)` para `P(x)=x²+3x−2`?** A) −2 B) 0 C) 2 D) 3. **Gabarito: A.** Feedback: em x=0, termos com x desaparecem.
3. **Quais são as raízes de `x(x−2)`?** A) 0 e 2 B) 1 e 2 C) −2 e 0 D) só 2. **Gabarito: A.** Feedback: produto zera quando qualquer fator zera.
4. **Qual é o comportamento de `x³` quando x vai de −1 a 1?** A) Sempre positivo B) cruza a origem e troca de sinal C) só toca o eixo em 1 D) fica constante. **Gabarito: B.** Feedback: a potência ímpar preserva o sinal de x.
5. **`(x−1)²` em x=1…** A) vale 1 B) vale 0 e toca o eixo C) vale −1 D) não está definido. **Gabarito: B.** Feedback: o fator se anula; como é quadrado, não fica negativo dos lados.
6. **Para valores muito grandes de |x|, qual termo domina em `2x⁴−5x²+1`?** A) 1 B) −5x² C) 2x⁴ D) todos igualmente. **Gabarito: C.** Feedback: a maior potência cresce mais rápido e define o comportamento nas pontas.