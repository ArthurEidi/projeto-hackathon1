# Plano — Sequências: PA e PG

## a) Ancoragem mecânica
Sequência é máquina indexada: `n → termo a_n`. Na PA, cada avanço soma a mesma diferença d: `a_{n+1}=a_n+d`. Na PG, cada avanço multiplica pela mesma razão q: `a_{n+1}=q·a_n`. O índice n é o passo; o termo é a quantidade naquele passo.

## b) Visual de partida
Palco: pontos em grade discreta (n inteiro positivo no eixo horizontal, a_n no vertical), com fita numérica e tabela. Sliders para primeiro termo a₁, diferença d e razão q; alternador PA/PG. Avançar n anima soma ou multiplicação repetida. Não desenhar curva contínua como se houvesse termos entre índices.

## c) Caso neutro
PA com d=0: `4,4,4,4…`, sem mudança por passo. PG com q=1: `4,4,4,4…`, mesmo resultado por mecanismo multiplicativo neutro. Usar a mesma sequência constante para contrastar duas causas diferentes.

## d) Panorama e recorte
Situar regra recursiva e explícita, termo geral, soma finita e padrões. Escopo: identificar PA/PG, avançar termos, termo geral e crescimento/decrescimento em casos simples. Deixar somas extensas e demonstrações formais para além desta primeira unidade.

## e) Progressão por contraste
1. PA soma `+2`: 1,3,5,7; diferenças constantes.
2. PG multiplica `×2`: 1,2,4,8; quocientes constantes.
3. Comparar PA e PG iniciadas em 4 com d=0 e q=1: mesma aparência, regra interna distinta.
4. Testar d negativo e q entre 0 e 1; mostrar queda.
5. Usar q<0 para alternância de sinal, destacando que tamanho escala por |q|.

## f) Dedução causal da forma
Na PA, a diferença entre passos não muda: depois de n−1 avanços, `a_n=a₁+(n−1)d`; a forma é linear em n. Na PG, cada passo reaplica q: `a_n=a₁q^(n−1)`. A PG muda de ritmo porque a mudança absoluta depende do termo atual; a PA não. Os dois termos “constantes” d e q têm papéis diferentes: aditivo versus multiplicativo.

## g) Simulação espacial e fronteiras
Índices são naturais positivos (ou começar em n=0 somente se convenção explicitamente declarada). Os pontos da sequência não preenchem uma curva contínua. PA com d>0 sobe; d<0 desce. PG: q>1 cresce em módulo para |q|>1; 0<q<1 decai; q<0 alterna; q=0 zera após primeiro passo. Lembrar que PG com termo inicial zero permanece zero.

## h) Roteiro da lição

1. **Fala:** “Na sequência 1,3,5,7, qual mudança se repete entre vizinhos? Soma 2; essa máquina é aditiva.” **Widget §5.1 — `plano_cartesiano` (família `pontos`):** aluno avança o índice n e vê cada termo aparecer como ponto discreto.
2. **Fala:** “Se começamos em 1 e damos quatro passos de +2, o quinto termo é 7 ou 9? É 9: 1→3→5→7→9.” **Widget §5.1 — `plano_cartesiano`:** avançar o controle de n até 5 e comparar pontos, sem ligar por curva contínua.
3. **Fala:** “Agora olhe 1,2,4,8: o que se repete, soma 1 ou multiplica por 2? Multiplica por 2.” **Widget §5.1 — `plano_cartesiano` (família `pontos`):** alternar para PG e avançar os termos no mesmo eixo.
4. **Fala:** “Depois de 1,2,4, qual vem: 6 ou 8? Vem 8, porque a máquina multiplica o termo atual por 2.” **Widget §5.6 — `barras`:** aluno dá um passo e vê a altura da barra dobrar de 4 para 8.
5. **Fala:** “Uma PA com d=0 e uma PG com q=1 mudam o termo? Não; ambas mostram 4,4,4, embora uma some zero e outra multiplique por um.” **Widget §5.1 — `plano_cartesiano`:** alternar PA/PG mantendo os mesmos pontos; destacar a regra ativa.
6. **Fala:** “Se a PA começa em 4 e d=−1, quais são os próximos termos? 3 e 2, pois cada passo subtrai 1.” **Widget §5.1 — `plano_cartesiano`:** slider d vai a −1 e o aluno percorre n=1,2,3.
7. **Fala:** “Se a PG começa em 16 e q=1/2, qual é o terceiro termo? 4, porque fazemos 16→8→4.” **Widget §5.6 — `barras`:** reduzir a razão pela metade a cada avanço e observar as barras encolherem.
8. **Fala:** “O gráfico de uma sequência contém valores para todos os n entre 1 e 5? Não; n só assume índices inteiros permitidos, então vemos pontos separados.” **Widget §5.1 — `plano_cartesiano`:** alternar pontos discretos e uma curva de referência fantasma para deixar visível a diferença.

## i) Questões pós-lição (6)
Quatro alternativas; feedback distingue soma constante de razão constante.

1. **Qual é o próximo termo da PA `2,5,8,…`?** A) 10 B) 11 C) 13 D) 16. **Gabarito: B.** Feedback: cada passo soma 3.
2. **Qual é o próximo termo da PG `3,6,12,…`?** A) 15 B) 18 C) 24 D) 36. **Gabarito: C.** Feedback: cada termo é multiplicado por 2.
3. **Na PA com a₁=4 e d=2, quanto é a₄?** A) 8 B) 10 C) 12 D) 14. **Gabarito: B.** Feedback: três avanços: 4+3·2=10.
4. **Na PG com a₁=2 e q=3, quanto é a₃?** A) 6 B) 8 C) 18 D) 27. **Gabarito: C.** Feedback: dois avanços multiplicativos: 2·3²=18.
5. **Qual sequência é PA?** A) 2,4,8,16 B) 7,5,3,1 C) 1,2,4,7 D) 3,6,18,72. **Gabarito: B.** Feedback: as diferenças são sempre −2.
6. **Uma PG começa em 16 e tem q=1/2. Qual é o 4º termo?** A) 8 B) 4 C) 2 D) 1. **Gabarito: C.** Feedback: três passos: 16→8→4→2.