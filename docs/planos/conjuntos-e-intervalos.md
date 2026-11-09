# Plano — Conjuntos e intervalos

## a) Ancoragem mecânica
Conjunto é uma coleção de entradas que passam por um critério: `x → teste → pertence/não pertence`. Operações combinam filtros: união aceita quem passa em pelo menos um; interseção exige passar em ambos; diferença conserva quem passa no primeiro e falha no segundo. Intervalo é uma região contínua da reta real, descrita por limites e pela decisão de incluir ou excluir cada extremo.

## b) Visual de partida
Palco: reta numérica interativa com dois intervalos coloridos A e B. Controles: quatro sliders de extremos, alternância aberto/fechado em cada ponta e seleção de operação. Arrastar um extremo move a fronteira; alternar o ponto o preenche ou deixa vazado; trocar a operação atualiza a faixa resultante ao vivo. Exibir também a notação simbólica sincronizada.

## c) Caso neutro
Começar com A = [−2, 3] e B = [1, 4], antes de escolher operação: apenas duas faixas sobre a mesma reta. Um ponto-teste x = 2 pertence aos dois; x = 0 só pertence a A. A reta sem filtros representa R; intervalo vazio representa nenhuma entrada aprovada.

## d) Panorama e recorte
Situar pertinência, subconjunto, conjunto vazio, união, interseção, diferença, complemento e intervalos. Foco desta aula: leitura da reta, notação de extremos e operações entre dois intervalos finitos. Deixar conjuntos infinitos mais elaborados, desigualdades compostas e provas formais para depois.

## e) Progressão por contraste
1. Comparar `[1,3]` com `(1,3)`: mesmos números internos, mas só o primeiro inclui 1 e 3.
2. Abrir/fechar uma única ponta para isolar o efeito do colchete/parêntese.
3. Sobrepor A e B; união pinta o território coberto por qualquer faixa, interseção só a sobreposição.
4. Diferença A\B remove de A a parte coberta por B; comparar com complemento, que depende do universo declarado.

## f) Dedução causal da forma
O extremo fechado é incluído porque o próprio número satisfaz o limite; o aberto é excluído. A união é larga porque aceita a condição A **ou** B; a interseção é estreita porque exige A **e** B. Não é uma convenção arbitrária: a região desenhada traduz diretamente a regra de aceitação. Em extremos coincidentes, o ponto entra no resultado somente se ao menos uma faixa o incluir na união, e na interseção somente se ambas o incluírem.

## g) Simulação espacial e fronteiras
Arrastar as pontas atravessa números e pode inverter a ordem; impedir ou indicar intervalo vazio quando limite esquerdo > direito. Um ponto móvel testa a pertinência e ilumina cada condição. Explicitar que infinito nunca é um ponto incluído: usa sempre parêntese. Reforçar a diferença entre complemento relativo a R e relativo a outro universo.

## h) Roteiro da lição

1. **Fala:** “Se A vai de −2 a 3 e B vai de 1 a 4, o 2 passa por quais filtros? Ele está nos dois, porque 1≤2≤3.” **Widget §5.2 — `reta_numerica`:** mostrar A e B em faixas separadas; o aluno arrasta o ponto-teste até 2 e vê as duas iluminar.
2. **Fala:** “E o próprio 3 entra em `[−2,3)`? Não; a ponta aberta deixa o 3 do lado de fora.” **Widget §5.2 — `reta_numerica`:** aluno alterna o extremo direito entre aberto e fechado; o ponto da borda muda de estado de pertinência.
3. **Fala:** “Na união, basta passar em um filtro: qual faixa cobre tudo que A ou B aceita? De −2 até 4.” **Widget §5.2 — `reta_numerica`:** escolher união e observar a faixa resultante cobrir as duas, mantendo os extremos corretos.
4. **Fala:** “Agora exijo passar nos dois: o que sobra em comum? Só de 1 a 3.” **Widget §5.2 — `reta_numerica`:** trocar para interseção; a região sobreposta fica colorida e as partes exclusivas apagam.
5. **Fala:** “Se tiro B de A, o 2 permanece? Não, porque B também o cobre; o trecho de 1 a 3 sai de A.” **Widget §5.2 — `reta_numerica`:** selecionar diferença A\B e mover uma ponta de B para acompanhar o recorte.
6. **Fala:** “Se A termina em 3 aberto e B começa em 3 fechado, o 3 está na união? Sim, porque pelo menos uma faixa o inclui.” **Widget §5.2 — `reta_numerica`:** encostar extremos e alternar inclusão; a união conserva o ponto quando uma das pontas o fecha.
7. **Fala:** “E na interseção, com só B incluindo o 3, ele entra? Não; as duas faixas precisam incluir o mesmo ponto.” **Widget §5.2 — `reta_numerica`:** manter as faixas encostadas, escolher interseção e testar o ponto comum.
8. **Fala:** “O que completa `(−∞,2]` em R: incluir o 2 ou começar depois dele? Começamos em `(2,∞)`, pois 2 já foi aceito.” **Widget §5.2 — `reta_numerica`:** alternar para complemento relativo a R e ver a faixa complementar, sem marcar infinito como ponto.

## i) Questões pós-lição (6)
Formato de treino: pergunta curta, quatro alternativas, uma correta e feedback causal.

1. **Em `[−1, 3)`, o 3 pertence ao intervalo?** A) Sim, porque há colchete à esquerda. B) Não, a ponta 3 está aberta. C) Só se 3 for inteiro. D) Não, porque −1 é negativo. **Gabarito: B.** Feedback: colchete/parêntese da direita decide a ponta direita.
2. **Qual intervalo representa `−2 ≤ x < 2`?** A) `(−2,2)` B) `[−2,2]` C) `[−2,2)` D) `(−2,2]`. **Gabarito: C.** Feedback: −2 entra; 2 não entra.
3. **A = [0,3] e B = [2,5]. Qual é A ∩ B?** A) `[0,5]` B) `[2,3]` C) `[0,2]` D) `(3,5]`. **Gabarito: B.** Feedback: interseção guarda só o trecho comum.
4. **Com os mesmos A e B, qual é A ∪ B?** A) `[0,5]` B) `[2,3]` C) `[0,2)` D) `(3,5]`. **Gabarito: A.** Feedback: a união cobre tudo que está em pelo menos um dos dois.
5. **A = [−1,4] e B = [1,3). Qual é A\B?** A) `[1,3)` B) `[−1,1) ∪ [3,4]` C) `[−1,4]` D) `(−∞,1)`. **Gabarito: B.** Feedback: retire de A o trecho de B; 1 é retirado, 3 permanece.
6. **Em R, qual é o complementar de `(−∞,2]`?** A) `(2,∞)` B) `[2,∞)` C) `(−∞,2)` D) `[−2,∞)`. **Gabarito: A.** Feedback: 2 já está no conjunto, então o complemento começa depois dele.