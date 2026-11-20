# Auditoria B45c — UFRGS 2025, 1º dia, questão 71

**Veredito.** O gabarito **D** confere, as cinco alternativas foram preservadas e a descrição em texto basta para resolver a questão. Os quatro feedbacks de erro trazem a expressão correta e conferem ao avaliar as fórmulas. O ajuste principal é trocar a fala inicial, que já entrega as três transformações que identificam D.

## Fonte e adaptação

Abri a página impressa 37, que também é a página 37 do PDF local `provas-oficiais/ufrgs-2025-1dia/prova.pdf`, e conferi os dois gráficos da questão 71. Na seção Matemática de `gabarito.html`, a linha da questão 71 traz D. O PDF usa a letra `g` no próprio gráfico. [Caderno oficial, p. 37](https://www.ufrgs.br/coperse/wp-content/uploads/2024/12/Prova-1o-DIA.pdf#page=37) · [Gabarito oficial, Matemática](https://vestibular.ufrgs.br/cv2025/gabaritos/#matematica)

- **Gráfico de f.** Dois segmentos ligam (−3; 3), (0; 0) e (3; 3). O vértice e as pontas do V no texto determinam as duas inclinações.
- **Gráfico de g.** Dois segmentos ligam (−3; −6), (0; 3) e (3; −6), com zeros em −1 e 1. O texto preserva esses pontos e a abertura. A grade e as setas dos eixos não fornecem dados adicionais para a escolha.
- **Sugestão de enunciado.** As pontas já delimitam a parte desenhada. Se quiser tornar esse intervalo explícito no texto, use “Em [−3, 3], f tem V de vértice (0; 0) e pontas (±3; 3). Qual g tem V invertido de vértice (0; 3), zeros ±1 e pontas (±3; −6)?”
- **Fala inicial.** O treino exibe `fala` antes de Verificar. O texto atual entrega a reflexão, o fator 3 e a subida de 3, combinação que só ocorre em D. Sugestão “Compare os vértices e a abertura dos dois gráficos. Depois, teste um ponto em uma das expressões.”

## Conta refeita

No trecho desenhado, f(x) = |x|. Para uma opção da forma a·f(x) + k, o ponto (0; 3) dá k = 3, pois f(0) = 0. O ponto (1; 0) dá 0 = a·1 + 3, logo a = −3. Assim, g(x) = −3f(x) + 3. A expressão dá também g(−1) = 0 e g(±3) = −6, com inclinações +3 à esquerda e −3 à direita, como no desenho. As cinco alternativas dão respectivamente 6, −9, 9, 3 e −3 em x = 0.

## Feedback das erradas

| Opção | Como a escolha é produzida e conferida | Avaliação e texto sugerido |
| --- | --- | --- |
| A | Usar fator +3, deslocar 3 à esquerda e descer 3 produz exatamente `3f(x + 3) − 3`. O vértice fica em (−3; −3), e em x = 0 o valor é 3·3 − 3 = 6. | O feedback atual descreve a posição e a abertura, testa o valor e dá D. Para explicitar as operações que montam a opção, use “Mover 3 à esquerda, manter a abertura para cima com fator 3 e descer 3 dá 3f(x + 3) − 3. A correta é g(x) = −3f(x) + 3.” |
| B | Manter o fator −3 e trocar a translação vertical +3 pelo deslocamento de 3 à esquerda produz `−3f(x + 3)`. O vértice fica em (−3; 0), e em x = 0 o valor é −3·3 = −9. | O feedback atual já explica essa troca e dá D. Uma versão direta é “Trocar a subida de 3 por um deslocamento à esquerda dá −3f(x + 3), com vértice (−3; 0). A correta é g(x) = −3f(x) + 3.” |
| C | Trocar a subida por um deslocamento de 3 à direita e manter o fator positivo produz `3f(x − 3)`. O vértice fica em (3; 0), e em x = 0 o valor é 3·3 = 9. | O feedback atual descreve as duas operações e dá D. Para ligar o deslocamento errado ao dado do gráfico, use “Ler a subida como um avanço de 3 à direita e usar fator +3 dá 3f(x − 3), que abre para cima. A correta é g(x) = −3f(x) + 3.” |
| E | Manter o fator −3 e trocar a subida por uma descida de 3 produz `−3f(x) − 3`. O vértice fica em (0; −3), e em x = 0 o valor é −3. | O feedback atual já explica a troca de sinal, confirma o valor e dá D. Uma versão direta é “Trocar a subida pela descida dá −3f(x) − 3, com vértice (0; −3). A correta é g(x) = −3f(x) + 3.” |

A e C combinam mais de uma troca. A descrição acima identifica as operações que geram cada alternativa, sem atribuir ao aluno um raciocínio específico só pela opção que marcou.

## Roteiro e teste

O registro B45c, a seção V1 do roteiro e o JSON concordam sobre a fonte, a alternativa D e os pontos usados na conta. O checklist do roteiro ainda diz que o vestibular aguarda fonte e menciona quatro entradas pendentes. Texto sugerido para refletir o estado atual “V1 inserida com fonte oficial, cinco alternativas e um gabarito. V2–V4 aguardam fonte.”

A execução de `npx vitest run src/conteudo/transformacoes-graficos-de-funcoes.test.ts` passou com 10 testes. O caso novo confere o rótulo marcado como correto e os valores em 0, ±1 e ±3. A inspeção dos gráficos e dos feedbacks foi feita nesta auditoria.
