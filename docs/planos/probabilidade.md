# Plano — Probabilidade

## a) Ancoragem mecânica
A máquina da probabilidade em espaços equiprováveis mede a **fração de área ou de casas** que um evento ocupa dentro do universo possível: o espaço amostral `Ω` entra como o total de resultados possíveis no denominador, o filtro do evento `A` pinta os casos favoráveis no numerador, e a saída dependente é a razão `P(A) = n(A) / n(Ω)` (sempre entre `0` e `1`). Quando uma informação extra chega (“sabendo que `B` ocorreu”), a máquina da **probabilidade condicional** recorta e reduz o universo apenas às casas de `B`: `P(A|B) = n(A ∩ B) / n(B)`.

## b) Visual de partida
Palco `grade_resultados` (matriz `6×6` de dois dados, diagrama de conjuntos na grade ou árvore ponderada de 2 etapas): o aluno ativa filtros para os eventos `A` (azul) e `B` (laranja), vê a interseção `A ∩ B` acender em destaque, a união `A ∪ B` contada sem duplicidade e um botão “Condicionar em B (recortar universo)” que apaga tudo fora de `B`.

## c) Caso neutro
Moeda honesta (`n(Ω) = 2`, Cara ou Coroa) ou evento de metade exata da grade (`P = 1/2 = 50%`): nenhum lado pesa mais que o outro; os casos favoráveis e desfavoráveis têm exatamente o mesmo tamanho (`P(A) = P(Aᶜ) = 0,5`).

## d) Panorama e recorte
Situar espaço amostral `Ω`, evento, probabilidade clássica `favoráveis / possíveis`, evento complementar `P(Aᶜ) = 1 − P(A)`, probabilidade da união `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)`, probabilidade condicional `P(A|B)` e eventos independentes (`P(A ∩ B) = P(A)·P(B)`). Escopo: visualização direta na grade e na árvore finita. Deixar distribuição binomial longa e teorema de Bayes com muitas partições para aprofundamento.

## e) Progressão por contraste
1. Lançamento de 1 dado (`6` resultados na linha) versus 2 dados (`6 × 6 = 36` pares na grade: a soma `7` tem 6 diagonais favoráveis, enquanto a soma `2` tem só 1).
2. União de eventos **mutuamente exclusivos** (`A ∩ B = ∅`, soma direta `P(A) + P(B)`) versus eventos **com interseção** (somar `P(A) + P(B)` conta a interseção duas vezes, exigindo descontar `− P(A ∩ B)`).
3. Probabilidade **global** `P(A) = n(A)/n(Ω)` (universo inteiro) versus probabilidade **condicional** `P(A|B) = n(A ∩ B)/n(B)` (universo encolhido apenas ao conjunto `B`).
4. Sorteio **com reposição** (eventos independentes, a 2ª rodada mantém a mesma fração) versus **sem reposição** (a 1ª retirada altera o denominador e o numerador da 2ª rodada).

## f) Dedução causal da forma
Por que `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)`? Porque ao pintar todas as casas de `A` e depois todas as casas de `B` na grade, as casas que pertencem aos dois eventos (`A ∩ B`) recebem duas camadas de tinta; subtrair uma vez `P(A ∩ B)` corrige a dupla contagem. Por que na probabilidade condicional o denominador vira `n(B)`? Porque saber que `B` já aconteceu elimina todos os resultados fora de `B` — o novo universo tem tamanho `n(B)` e dentro dele só servem os casos de `A` que também estão em `B` (`A ∩ B`). E quando saber `B` é difícil de contar na frente (“pelo menos um”), o evento complementar resolve em um passo porque o universo inteiro vale `1`: `P(A) = 1 − P(nenhum)`.

## g) Simulação espacial e fronteiras
Testar os extremos do intervalo `[0, 1]`: evento impossível (`n(A) = 0 → P = 0`, nenhuma casa pintada) e evento certo (`A = Ω → P = 1`, grade 100% pintada). Nunca existe probabilidade negativa nem maior que 1 — se alguém somar `P(A) + P(B)` e passar de 1, é sinal imediato de que esqueceu de descontar a interseção ou somou eventos não disjuntos.

## h) Roteiro da lição

1. **Fala:** “Num dado honesto de 6 faces `{1, 2, 3, 4, 5, 6}`, qual é a chance de sair número par? São 3 casas favoráveis `{2, 4, 6}` em 6 possíveis: `3/6 = 1/2 = 50%`.” **Widget §5.6 — `grade_resultados`:** exibe as 6 casas do dado, pinta as 3 pares e mostra a barra `P = 3/6 = 0,50`.
2. **Fala:** “Se lançarmos 2 dados, por que a soma 7 sai muito mais vezes que a soma 2? Porque na grade `6×6` de 36 pares, só `(1,1)` soma 2 (`1/36`), enquanto a diagonal da soma 7 tem 6 pares (`6/36 = 1/6`)!” **Widget §5.6 — `grade_resultados`:** abre a grade `6×6` (36 células) e destaca a diagonal `(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)` da soma 7 contra a célula única `(1,1)`.
3. **Fala:** “Qual é a probabilidade de NÃO sair soma 2 ao lançar dois dados? Em vez de contar as 35 casas restantes, basta tirar do total 1 a única casa da soma 2: `1 − 1/36 = 35/36`.” **Widget §5.6 — `grade_resultados`:** alterna entre o evento `A` (1 casa acesa) e o complementar `Aᶜ` (35 casas acesas), destacando `P(A) + P(Aᶜ) = 1`.
4. **Fala:** “De 1 a 6, se `A = {pares} = {2, 4, 6}` e `B = {maiores que 3} = {4, 5, 6}`, por que `P(A ou B)` não é `3/6 + 3/6 = 6/6`? Porque o `4` e o `6` estão nos dois conjuntos e foram contados duas vezes!” **Widget §5.6 — `grade_resultados`:** pinta `A` em azul (3 casas), `B` em laranja (3 casas) e pisca a sobreposição `A ∩ B = {4, 6}` (2 casas), corrigindo `3/6 + 3/6 − 2/6 = 4/6`.
5. **Fala:** “Agora veja o poder da informação extra: **sabendo que saiu um número maior que 3** (`B = {4, 5, 6}`), qual passa a ser a chance de ele ser par (`A`)? O universo encolhe para apenas as 3 casas `{4, 5, 6}`, e nelas há 2 pares (`{4, 6}`), logo `P(A|B) = 2/3`!” **Widget §5.6 — `grade_resultados`:** botão “Condicionar em B” escurece e descarta `{1, 2, 3}`, mantendo só as 3 casas de `B` e destacando `2/3`.
6. **Fala:** “Em dois lançamentos seguidos de uma moeda honesta (`2 × 2 = 4` ramos), qual é a chance de sair Cara na 1ª **E** Cara na 2ª? Metade da metade: `(1/2) × (1/2) = 1/4`.” **Widget §5.6 — `grade_resultados`:** árvore de 2 etapas mostra que o resultado da 1ª moeda não altera a fração `1/2` da 2ª (eventos independentes).
7. **Fala:** “E se uma urna tem 3 bolas azuis e 2 laranjas (total 5) e tiramos 2 bolas **sem reposição**? Na 1ª a chance de azul é `3/5`, mas na 2ª sobram apenas 2 azuis em 4 bolas (`2/4`), dando `(3/5) × (2/4) = 6/20 = 3/10`.” **Widget §5.6 — `grade_resultados`:** chave “Sem reposição” atualiza os pesos do 2º nível da árvore de `3/5` para `2/4`.
8. **Fala:** “Como calcular rápido a chance de sair **pelo menos uma** Cara em 3 moedas (`8` casos)? O único caso sem nenhuma Cara é `Coroa-Coroa-Coroa` (`1/8`), então pelo complementar temos `1 − 1/8 = 7/8`!” **Widget §5.6 — `grade_resultados`:** exibe os 8 caminhos de 3 moedas, destacando os 7 com alguma Cara contra o único caminho `KKK`.

## i) Questões pós-lição (6)
Quatro alternativas cobrindo razão favoráveis/possíveis, complementar, união, condicional e retirada sem reposição.

1. **Ao lançar um dado honesto de 6 faces, qual é a probabilidade de sair um número maior que 4?** A) `1/6` B) `1/3` C) `1/2` D) `2/3`. **Gabarito: B.** Feedback: os números maiores que 4 são `{5, 6}` (2 casos favoráveis em 6 possíveis), logo `2/6 = 1/3`.
2. **Se a probabilidade de chover amanhã é `0,35` (35%), qual é a probabilidade de NÃO chover?** A) `0,35` B) `0,50` C) `0,65` D) `0,75`. **Gabarito: C.** Feedback: pelo evento complementar, `1 − 0,35 = 0,65` (65%).
3. **Numa turma de 20 alunos, 12 praticam vôlei, 8 praticam basquete e 4 praticam os dois esportes. Sorteando um aluno ao acaso, qual é a probabilidade de ele praticar vôlei OU basquete?** A) `16/20` B) `20/20` C) `12/20` D) `8/20`. **Gabarito: A.** Feedback: descontando a interseção contada duas vezes, `12 + 8 − 4 = 16` alunos em 20 (`16/20 = 4/5`).
4. **Um dado honesto foi lançado e sabemos que saiu um número ÍMPAR (`{1, 3, 5}`). Qual é a probabilidade de esse número ser o `5`?** A) `1/6` B) `1/3` C) `1/2` D) `2/3`. **Gabarito: B.** Feedback: o espaço amostral reduzido pela condição tem apenas 3 resultados `{1, 3, 5}`, e apenas 1 deles é o 5 (`1/3`).
5. **Uma caixa contém 4 fichas verdes e 2 vermelhas (total 6). Retirando-se 2 fichas sucessivamente e SEM reposição, qual é a probabilidade de ambas serem verdes?** A) `4/9` B) `2/5` C) `1/3` D) `4/6`. **Gabarito: B.** Feedback: na 1ª retirada a chance é `4/6` e na 2ª restam 3 verdes em 5 fichas (`3/5`), logo `(4/6) × (3/5) = 12/30 = 2/5`.
6. **Jogando uma moeda honesta 3 vezes seguidas, qual é a probabilidade de sair PELO MENOS uma Cara?** A) `1/8` B) `3/8` C) `1/2` D) `7/8`. **Gabarito: D.** Feedback: o único resultado sem Cara é Coroa-Coroa-Coroa (`1/8`); pelo complementar, `1 − 1/8 = 7/8`.
