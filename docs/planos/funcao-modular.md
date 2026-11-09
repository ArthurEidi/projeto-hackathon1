# Plano — Função modular

## a) Ancoragem mecânica
Valor absoluto é uma máquina de distância: `|x|` mede quão longe x está do zero, sem guardar o lado. A máquina `f(x)=a|x−h|+k` mede a distância à referência h, escala/reflete por a e desloca o resultado por k. Entrada x; saída y.

## b) Visual de partida
Palco: eixo numérico com ponto móvel x e distância até zero convertida em altura no gráfico. Sliders h, a e k movem a referência, alteram a escala/orientação e elevam o V. Arrastar x mostra os dois trajetos simétricos até a referência.

## c) Caso neutro
`f(x)=|x|`: referência 0, escala 1, sem deslocamento vertical. Em x=−2 e x=2, a saída é 2; no próprio zero, a saída é 0. O gráfico é um V com vértice na origem.

## d) Panorama e recorte
Situar módulo como distância, função por partes, simetria, translações e equações simples com valor absoluto. Foco em interpretação gráfica e `a|x−h|+k`; deixar inequações compostas e funções com vários módulos para outro momento.

## e) Progressão por contraste
1. Comparar x e |x|: à esquerda do zero, o sinal muda; à direita, fica igual.
2. Mover h de 0 para 1: o V passa a medir distância de 1.
3. Variar k: vértice sobe/desce sem alterar abertura.
4. Variar a: escala vertical; a<0 vira o V de cabeça para baixo.
5. Contrastar com `x²`: ambos são simétricos, mas o módulo tem lados retos.

## f) Dedução causal da forma
A distância não pode ser negativa. Para x≥0, `|x|=x`; para x<0, `|x|=−x`, pois trocar o sinal transforma a distância negativa em positiva. A dobra ocorre exatamente na referência onde a expressão interna zera. O mesmo argumento aplicado a x−h explica o vértice em x=h. Escala e translação atuam depois sobre a distância.

## g) Simulação espacial e fronteiras
Arrastar x de um lado ao outro de h mostra duas retas espelhadas; a junção é o vértice. Domínio: R; imagem é `[k,∞)` se a>0, `(-∞,k]` se a<0, e `{k}` se a=0. Não há raiz quando a figura inteira fica acima/abaixo do eixo; se cruza, localizar as entradas por distância ao vértice.

## h) Roteiro da lição

1. **Fala:** “Distância de 2 até zero vale 2; e de −2? Também 2, porque distância não tem lado nem sinal negativo.” **Widget §5.2 — `reta_numerica`:** aluno arrasta x de 2 a −2 e vê o segmento até zero manter o comprimento.
2. **Fala:** “Em que ponto a distância até zero desaparece? Em x=0; por isso o V encontra o eixo ali.” **Widget §5.1 — `plano_cartesiano`:** traçar `|x|` e mover o ponto sobre o gráfico, com o vértice marcado.
3. **Fala:** “Se agora medimos a distância até 1, onde ela zera? Em x=1, então o vértice se desloca para (1,0).” **Widget §5.2 — `reta_numerica`:** mover o marcador de referência h para 1; a distância muda ao vivo.
4. **Fala:** “Com `|x−1|`, quanto sai para x=−1? 2, pois −1 está a duas unidades de 1.” **Widget §5.1 — `plano_cartesiano`:** mover a entrada para −1 e mostrar a altura 2 e o ramo correspondente.
5. **Fala:** “Se somamos 2 à distância, o vértice vai para cima ou para a direita? Para cima, até (1,2), porque a referência continua em 1.” **Widget §5.1 — `plano_cartesiano`:** slider k de 0 para 2; acompanhar apenas a translação vertical.
6. **Fala:** “Se multiplicamos por −1, a distância fica negativa? Não; é a saída que reflete e o V abre para baixo.” **Widget §5.1 — `plano_cartesiano`:** slider a cruza zero e inverte o V, com a reta anterior como fantasma.
7. **Fala:** “Resolver `|x−1|=2` significa procurar pontos a que distância de 1? Dois; por isso são −1 e 3.” **Widget §5.2 — `reta_numerica`:** aluno posiciona os dois pontos simétricos e vê as soluções aparecerem no gráfico.
8. **Fala:** “A distância mínima pode ser menor que zero? Não; com a=2 e k=−1, a saída mínima é −1, no vértice.” **Widget §5.1 — `plano_cartesiano`:** habilitar vértice e imagem para observar o limite inferior.

## i) Questões pós-lição (6)
Questões com quatro alternativas, uma correta e feedback causal.

1. **Quanto vale `|−3|`?** A) −3 B) 0 C) 3 D) 6. **Gabarito: C.** Feedback: distância até zero é não negativa.
2. **Qual é o vértice de `|x−2|`?** A) (0,2) B) (2,0) C) (−2,0) D) (0,−2). **Gabarito: B.** Feedback: a distância zera quando x=2.
3. **Para `f(x)=|x|+3`, qual é f(0)?** A) −3 B) 0 C) 3 D) 4. **Gabarito: C.** Feedback: o V sobe três unidades.
4. **Em quais entradas `|x−1|=2`?** A) 1 e 2 B) −1 e 3 C) −2 e 2 D) 0 e 2. **Gabarito: B.** Feedback: ficam duas unidades à esquerda e à direita de 1.
5. **Como fica o gráfico de `−|x|`?** A) V para cima com vértice em (0,0) B) V para baixo com vértice em (0,0) C) reta horizontal y=−1 D) parábola. **Gabarito: B.** Feedback: o sinal externo reflete as alturas.
6. **Qual é a imagem de `2|x−4|−1`?** A) todos os reais B) `y≥−1` C) `y≤−1` D) `x≥4`. **Gabarito: B.** Feedback: a distância mínima é zero em x=4 e depois a escala é positiva.