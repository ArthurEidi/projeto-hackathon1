# Plano — Função exponencial

## a) Ancoragem mecânica
A máquina exponencial `f(x)=a^x` usa x como número de repetições do mesmo fator a. Um passo à direita multiplica a saída por a; um passo à esquerda divide por a. Em aplicações de tempo, a é o fator por período, não a quantidade somada.

## b) Visual de partida
Palco: gráfico cartesiano com slider de base a (faixa positiva) e entrada x arrastável; tabela mostra potências sucessivas. Uma sequência de blocos representa multiplicações repetidas: a cada passo, a altura/quantidade é multiplicada pelo mesmo fator. Marcar a=1 e x=0 como referências.

## c) Caso neutro
Base a=1 produz `1^x=1`: repetir um fator neutro não muda a quantidade, reta horizontal y=1. No eixo, `a^0=1` para qualquer a>0: zero passos deixa a quantidade inicial intacta. Mostrar ambas as neutralidades e não confundi-las.

## d) Panorama e recorte
Situar crescimento, decaimento, juros compostos e inversão por logaritmo. Escopo: `a^x`, a>0, casos a>1 e 0<a<1, leitura de propriedades e domínio/imagem. Deixar equações exponenciais complexas e crescimento contínuo e para o cálculo avançado.

## e) Progressão por contraste
1. `1^x`: nada muda; referência neutra.
2. Base 2: cada passo dobra; base 1/2: cada passo reduz à metade.
3. Comparar `2^x` e `2x`: potência dobra repetidamente; regra linear soma sempre 2.
4. Variar a pela marca 1: acima cresce para a direita, entre 0 e 1 decresce.

## f) Dedução causal da forma
Para x inteiro positivo, `a^x` é a multiplicação `a·a·…`; cada avanço repete a mesma causa multiplicativa. Para x=0, a saída deve ser 1 para preservar a regra de dividir por a ao voltar um passo. Expoentes negativos são passos para trás: `a^(−n)=1/a^n`. A curva cresce se o fator de cada passo supera 1 e decresce se fica entre 0 e 1.

## g) Simulação espacial e fronteiras
Domínio real: todos os x quando a>0. Saídas sempre positivas; imagem `(0,∞)` se a≠1, e `{1}` se a=1. A curva aproxima o eixo x sem tocá-lo. A base não pode ser zero ou negativa no modelo real geral; a=1 não tem inversa porque todas as entradas dão a mesma saída. Destacar referência x=0, y=1.

## h) Roteiro da lição

1. **Fala:** “Começamos com uma unidade e fator 1 por etapa: quanto fica depois de três etapas? Continua 1, pois multiplicar por 1 não altera.” **Widget §5.1 — `plano_cartesiano`:** slider da base em 1; aluno avança x=0,1,2,3 e vê a reta horizontal y=1.
2. **Fala:** “Agora cada etapa dobra: partindo de 1, quais são os próximos dois saldos? 2 e 4, porque repetimos a multiplicação por 2.” **Widget §5.1 — `plano_cartesiano`:** trocar a para 2 e mover o marcador por x=0,1,2, lendo pontos e tabela.
3. **Fala:** “A saída cresce por somar 2 a cada passo? Não; ela dobra, então de 4 vai para 8, uma mudança cada vez maior.” **Widget §5.1 — `plano_cartesiano`:** comparar `2^x` com a reta fantasma 2x; percorrer os pontos inteiros.
4. **Fala:** “Com fator 1/2, 1 vira 1/2 e depois 1/4; isso é crescimento ou decaimento? Decaimento, porque cada passo encolhe.” **Widget §5.1 — `plano_cartesiano`:** mover a para 1/2 e seguir x=0,1,2 no gráfico.
5. **Fala:** “Voltando um passo a partir de 1 em `2^x`, quanto era antes? 1/2, pois desfazer multiplicar por 2 é dividir por 2.” **Widget §5.1 — `plano_cartesiano`:** arrastar x de 0 a −1 e exibir o rastro e a tabela de potências.
6. **Fala:** “A curva `2^x` chega a zero em algum x? Não; as saídas ficam positivas e se aproximam do eixo sem tocá-lo.” **Widget §5.1 — `plano_cartesiano`:** afastar a janela para x negativo e destacar a assíntota y=0.
7. **Fala:** “O que acontece exatamente quando x=0, qualquer que seja a base positiva? Sai 1: zero etapas deixam o fator acumulado neutro.” **Widget §5.1 — `plano_cartesiano`:** variar a entre 1/2, 1 e 2 e observar todas passarem por (0,1).
8. **Fala:** “Uma quantidade inicial 5 que triplica duas vezes chega a 15 ou 45? A 45: primeiro 15, depois 45, porque cada etapa multiplica o saldo atual.” **Widget §5.6 — `barras`:** animar barras por etapa 5→15→45; o aluno avança a contagem e compara os saltos.

## i) Questões pós-lição (6)
Quatro alternativas por pergunta; feedback corrige confusão entre crescimento aditivo e multiplicativo.

1. **Quanto vale `2^0`?** A) 0 B) 1 C) 2 D) −2. **Gabarito: B.** Feedback: zero repetições deixa o fator acumulado neutro em 1.
2. **Em `2^x`, a saída dobra quando x…** A) diminui 1 B) aumenta 1 C) dobra D) vira zero. **Gabarito: B.** Feedback: um passo novo multiplica por 2.
3. **Quanto vale `2^(−2)`?** A) −4 B) 1/4 C) 4 D) −1/4. **Gabarito: B.** Feedback: dois passos para trás dividem por 2 duas vezes.
4. **Qual base gera decaimento quando x aumenta?** A) 3 B) 2 C) 1/2 D) 1. **Gabarito: C.** Feedback: fator entre zero e um encolhe a cada passo.
5. **Qual frase vale para `f(x)=3^x` em x real?** A) Pode sair zero B) Só aceita x positivo C) A saída é sempre positiva D) A saída é sempre maior que 3. **Gabarito: C.** Feedback: potência de base positiva nunca cruza nem toca zero.
6. **Uma cultura começa com 5 células e triplica a cada etapa. Quantas após 2 etapas?** A) 11 B) 15 C) 30 D) 45. **Gabarito: D.** Feedback: são duas multiplicações por 3: 5→15→45.