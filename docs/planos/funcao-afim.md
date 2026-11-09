# Plano — Função afim

## a) Ancoragem mecânica
A máquina `f(x)=ax+b` aplica dois gestos: multiplica a entrada por a (inclinação) e depois soma b (deslocamento vertical). x é a entrada independente; y=f(x), a saída dependente. a mede quanto y muda por unidade de x; b é a saída quando x=0.

## b) Visual de partida
Palco: gráfico cartesiano de uma reta viva. Sliders para a e b; um ponto de entrada x também pode ser arrastado. O ponto imagem percorre a reta. Exibir inclinação como triângulo “anda 1, sobe a” e intercepto no eixo y. Faixa sugerida: a,b de −4 a 4.

## c) Caso neutro
`f(x)=x` (a=1, b=0): cada entrada sai intacta; reta diagonal de referência. Depois zerar a (saída constante 0) e, separadamente, zerar b para isolar cada efeito.

## d) Panorama e recorte
Situar funções constantes, lineares e afins, raiz/zero, crescimento/decrescimento e interseções. Escopo: `ax+b`, leitura dos parâmetros, raiz e interpretação gráfica. Deixar inequações e modelagem de múltiplas retas para sequência posterior.

## e) Progressão por contraste
1. Variar b com a=1: reta sobe/desce sem inclinação mudar.
2. Variar a com b=0: a reta gira ao redor da origem; sinal de a decide subida ou descida.
3. Comparar a=0 (horizontal), a>0 e a<0.
4. Sobrepor `x` e `2x+1`, ler onde as saídas coincidem.

## f) Dedução causal da forma
Para qualquer passo Δx, a saída muda `a·Δx`; por isso a taxa é constante e o gráfico é uma reta. O termo b desloca toda saída igualmente, então não muda a inclinação. Se a>0, aumentar x aumenta y; se a<0, diminui; se a=0, não muda. A raiz vem de pedir saída zero: `ax+b=0`, isto é, `x=−b/a` quando a≠0.

## g) Simulação espacial e fronteiras
Arrastar x evidencia deslocamento constante. Marcar quadrantes e cruzamentos dos eixos; para a≠0 há uma raiz, para a=0 e b≠0 nenhuma, e para a=b=0 todos os x são raízes. A função afim tem domínio R; uma situação real pode impor recorte (ex.: tempo não negativo), que deve ser desenhado como restrição do modelo, não da fórmula.

## h) Roteiro da lição
1. “A máquina devolve x. O que vemos?” Começar em `x`.
2. Somar 2; observar reta inteira subir dois, sem girar.
3. Mudar a para 2; por cada passo de 1, a saída cresce 2.
4. Mudar a para −1 e prever o movimento para a direita.
5. Colocar b=2, a=−1; achar o zero pelo cruzamento do eixo x.
6. Perguntar quando duas máquinas dão a mesma saída, com números pequenos.
7. Resumir a como ritmo e b como ponto de partida.

## i) Questões pós-lição (6)
Cada item oferece quatro respostas e feedback para erros comuns.

1. **Em `f(x)=2x+1`, qual é f(0)?** A) 0 B) 1 C) 2 D) 3. **Gabarito: B.** Feedback: com x=0, sobra o ponto de partida b.
2. **Na máquina `f(x)=3x`, se x aumenta 1, quanto muda a saída?** A) −3 B) 1 C) 3 D) depende de x. **Gabarito: C.** Feedback: a inclinação é a mudança por cada unidade de entrada.
3. **Qual é o efeito de trocar `f(x)=x+2` por `g(x)=x−1`?** A) A reta gira. B) Desce 3 unidades, mantendo a inclinação. C) A raiz não muda. D) O domínio fica negativo. **Gabarito: B.** Feedback: só o termo constante mudou.
4. **A reta de `f(x)=−2x+4` cruza o eixo x em…** A) −2 B) 2 C) 4 D) 8. **Gabarito: B.** Feedback: peça saída zero: −2x+4=0.
5. **Qual função é decrescente?** A) `4x+1` B) `x−7` C) `−3x+2` D) `8`. **Gabarito: C.** Feedback: inclinação negativa faz y cair quando x avança.
6. **`f(x)=0x+5` tem quantas raízes reais?** A) Nenhuma B) Uma C) Duas D) Infinitas. **Gabarito: A.** Feedback: a saída fica 5 para toda entrada e nunca zera.