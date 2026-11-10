# Plano — Análise combinatória

## a) Ancoragem mecânica
A máquina da contagem constrói escolhas em etapas sucessivas: cada decisão independente `E₁, E₂, …` ramifica a árvore de possibilidades, multiplicando os caminhos disponíveis (`Princípio Multiplicativo: m × n`). Quando preenchemos `p` vagas com `n` candidatos sem repetir, o produto decrescente `n · (n−1) · …` conta todas as filas ordenadas (**Arranjo**); se a ordem dentro do grupo escolhido não importa, um filtro divisor `p!` agrupa em um único pacote todas as embaralhadas equivalentes (**Combinação = Arranjo / p!**).

## b) Visual de partida
Palco `grade_resultados` (grade 2D de pares + árvore de decisões ramificada + caixas de vagas): controles para o número de opções na etapa 1 e na etapa 2, botão de bloqueio “Sem repetição” (que risca o item já usado na etapa seguinte) e chave “A ordem importa? Sim (Fila/Arranjo) × Não (Grupo/Combinação)”, que funde visualmente os ramos com os mesmos elementos (ex.: `AB` e `BA` viram um único par `{A, B}`).

## c) Caso neutro
Escolha única (`1 vaga` com `n` elementos): não há ramificação nem distinção entre fila e grupo — o total de escolhas é simplesmente `n` (`A(n,1) = C(n,1) = n`). Na decisão em duas etapas, o caso base `1 × n` (primeira etapa com 1 única opção fixa) mostra a árvore sem multiplicar antes de abrir os novos ramos.

## d) Panorama e recorte
Situar Princípio Fundamental da Contagem (aditivo “OU” versus multiplicativo “E”), Permutação Simples (`n!`), Permutação com Repetição, Arranjo Simples e Combinação Simples. Escopo: decisão mecânica por vagas (multiplicação direta) e distinção causal entre Arranjo (ordem cria novo resultado) e Combinação (ordem repetida é dividida por `p!`). Deixar combinações completas (soluções inteiras com barras e estrelas) e lema de Kaplansky para aprofundamento.

## e) Progressão por contraste
1. Conector **“OU”** (caminhos alternativos disjuntos → **soma** `m + n`) versus conector **“E”** (etapas seguidas → **produto** `m × n` na grade `m` linhas por `n` colunas).
2. Escolhas **com repetição** (`n × n × n`, todas as opções continuam abertas) versus **sem repetição** (`n × (n−1) × (n−2)`, cada vaga ocupada reduz 1 opção da próxima).
3. Ocupar todas as `n` vagas em fila (**Permutação** `n!`) versus ocupar apenas `p` vagas dentre `n` (**Arranjo** `n · (n−1) …`).
4. **Arranjo** (pódio 1º e 2º lugar: `AB ≠ BA`) versus **Combinação** (dupla de trabalho: `AB = BA`, divide-se por `2!` para eliminar os clones).

## f) Dedução causal da forma
Por que multiplicamos no princípio fundamental da contagem? Porque para **cada** uma das `m` escolhas da 1ª etapa abrem-se `n` ramos completos na 2ª etapa, formando um retângulo de `m` linhas por `n` colunas (`m × n` pares). E por que a fórmula da combinação divide o arranjo por `p!`? Porque cada grupo de `p` pessoas pode ser trocado de lugar entre si de `p!` maneiras diferentes; se a ordem não diferencia o grupo, o arranjo contou cada grupo `p!` vezes a mais, então dividir por `p!` desfaz exatamente o excesso.

## g) Simulação espacial e fronteiras
Testar as fronteiras de escolha: escolher `0` elementos ou todos os `n` elementos num grupo só admite `1` resultado possível (`C(n,0) = C(n,n) = 1`, e por convenção `0! = 1`). Além disso, escolher `p` pessoas para entrar num grupo equivale automaticamente a escolher `n − p` pessoas para ficar de fora (`C(n, p) = C(n, n−p)`), o que aparece como simetria visual das caixas selecionadas versus vazias. Restrições (como “o primeiro algarismo não pode ser 0”) exigem começar o preenchimento pela vaga restrita.

## h) Roteiro da lição

1. **Fala:** “Se você tem 3 camisas e 2 calças, por que o total de visuais completos é `3 × 2 = 6` e não `3 + 2 = 5`? Porque para **cada** uma das 3 camisas existem 2 calças possíveis, fechando uma grade de 3 linhas por 2 colunas.” **Widget §5.6 — `grade_resultados`:** monta ao vivo a grade `3×2` e a árvore de 3 ramos que se abrem em 2 cada, contando 6 pares.
2. **Fala:** “E se a escolha for usar um tênis (entre 3) **OU** uma sandália (entre 2), sem poder calçar os dois ao mesmo tempo? Aí os caminhos não se combinam: apenas somamos `3 + 2 = 5` opções.” **Widget §5.6 — `grade_resultados`:** alterna o modo “E (multiplica)” com “OU (soma)”, separando os dois conjuntos disjuntos.
3. **Fala:** “Quantas senhas de 2 letras podemos formar com `{A, B, C, D}` se **puder repetir** letra, e quantas se **não puder repetir**? Com repetição são `4 × 4 = 16`; sem repetição a 1ª letra gasta 1 opção e sobram 3 para a 2ª, dando `4 × 3 = 12`.” **Widget §5.6 — `grade_resultados`:** chave “Permitir repetição” risca a diagonal principal (`AA, BB, CC, DD`) da grade `4×4`, reduzindo de 16 para 12.
4. **Fala:** “Se colocarmos todas as 4 letras `{A, B, C, D}` em fila sem repetir, quantas filas existem? A 1ª vaga tem 4 opções, a 2ª tem 3, a 3ª tem 2 e a última 1: `4 × 3 × 2 × 1 = 4! = 24` permutações.” **Widget §5.6 — `grade_resultados`:** exibe as 4 caixas de vagas preenchendo `4 × 3 × 2 × 1 = 24`.
5. **Fala:** “E se a palavra tiver letras repetidas, como `ANA` (3 letras, com dois `A` idênticos)? Trocar os dois `A` de lugar não muda a palavra, então dividimos `3! = 6` por `2! = 2`, restando `3` anagramas (`ANA, AAN, NAA`).” **Widget §5.6 — `grade_resultados`:** colore os dois `A` e funde os pares indistinguíveis de 6 para 3.
6. **Fala:** “Com 4 atletas `{A, B, C, D}`, de quantas formas podemos premiar Ouro (1º) e Prata (2º)? São 2 vagas onde a ordem muda o resultado (`AB ≠ BA`): `4 × 3 = 12` arranjos.” **Widget §5.6 — `grade_resultados`:** mostra os 12 pares ordenados na tabela de pódio (`AB` diferente de `BA`).
7. **Fala:** “Agora troque o pódio por uma dupla de limpeza com 2 pessoas dentre `{A, B, C, D}`: `A com B` é diferente de `B com A`? Não, é a mesma dupla! Como cada dupla apareceu 2 vezes no arranjo, dividimos `12 / 2! = 6` combinações.” **Widget §5.6 — `grade_resultados`:** aluno ativa “Ordem não importa (Combinação)”; cada par `(XY, YX)` da grade se funde num único cartão `{X, Y}`, caindo de 12 para 6.
8. **Fala:** “E se escolhermos um trio de 3 pessoas dentre 5? O arranjo daria `5 × 4 × 3 = 60`, mas como 3 pessoas se embaralham de `3! = 6` jeitos iguais, dividimos `60 / 6 = 10` grupos!” **Widget §5.6 — `grade_resultados`:** agrupa as `3! = 6` permutações de cada trio numa única coluna, mostrando `C(5,3) = 60 / 6 = 10`.
9. **Fala:** “Por que escolher 3 pessoas entre 5 para viajar dá o mesmo total (`10`) que escolher 2 pessoas entre 5 para ficar? Porque cada trio escolhido deixa automaticamente uma dupla de fora (`C(5,3) = C(5,2)`).” **Widget §5.6 — `grade_resultados`:** destaca simultaneamente os 3 selecionados (azul) e os 2 não selecionados (laranja) em cada uma das 10 linhas.

## i) Questões pós-lição (6)
Quatro alternativas verificando princípio multiplicativo, restrição sem repetição e diferença entre Arranjo e Combinação.

1. **Uma lanchonete oferece 4 tipos de pão e 5 tipos de recheio. Quantos sanduíches diferentes de 1 pão e 1 recheio podem ser montados?** A) 9 B) 15 C) 20 D) 25. **Gabarito: C.** Feedback: pelo princípio multiplicativo (pão E recheio), multiplicamos `4 × 5 = 20`.
2. **Quantos números de 3 algarismos DISTINTOS podem ser formados usando os dígitos `{1, 2, 3, 4, 5}`?** A) 15 B) 60 C) 125 D) 120. **Gabarito: B.** Feedback: sem repetição, temos 5 opções para a centena, 4 para a dezena e 3 para a unidade: `5 × 4 × 3 = 60`.
3. **De quantas maneiras diferentes 4 pessoas podem se sentar em fila num banco de 4 lugares?** A) 4 B) 12 C) 16 D) 24. **Gabarito: D.** Feedback: trata-se da permutação dos 4 lugares: `4! = 4 × 3 × 2 × 1 = 24`.
4. **Em uma corrida com 6 competidores, de quantos modos distintos podem ser definidos o 1º e o 2º lugar?** A) 12 B) 15 C) 30 D) 36. **Gabarito: C.** Feedback: a ordem importa (1º e 2º são prêmios diferentes), logo `6 × 5 = 30` arranjos.
5. **De um grupo de 6 alunos, serão escolhidos 2 para representar a turma numa reunião (sem cargos distintos). Quantas duplas diferentes podem ser formadas?** A) 12 B) 15 C) 30 D) 36. **Gabarito: B.** Feedback: como a ordem na dupla não importa, dividimos o arranjo por `2!`: `(6 × 5)/2 = 15` combinações.
6. **Qual é o número de anagramas da palavra `OVO`?** A) 6 B) 3 C) 2 D) 9. **Gabarito: B.** Feedback: são 3 letras com 2 letras `O` repetidas, logo `3! / 2! = 6 / 2 = 3` (`OVO, OOV, VOO`).
