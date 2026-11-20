# Auditoria B45b — Relações métricas no triângulo retângulo

**Veredito.** Mantive `ufrgs-2025-semicirculo-area`. A Q72 de Matemática, 1º dia da UFRGS 2025, tem resposta **C, `10√(20x − x²)`**. Conferi a página 38 renderizada de `provas-oficiais/ufrgs-2025-1dia/prova.pdf`, incluindo o diagrama e as cinco alternativas na ordem A–E. A seção Matemática de `gabarito.html` traz `72 → C`. A cópia do gabarito em `ufrgs-2025-vestibular` tem o mesmo SHA-256. A consulta online desta rodada excedeu o tempo limite. A verificação usa os arquivos oficiais já baixados, cuja coleta consta no [registro B45b](vestibular-b45b.md). [Caderno oficial, p. 38](https://www.ufrgs.br/coperse/wp-content/uploads/2024/12/Prova-1o-DIA.pdf#page=38) · [Gabarito oficial de Matemática](https://vestibular.ufrgs.br/cv2025/gabaritos/#matematica)

## Enunciado, conta e nível

No diagrama, B e C são os extremos do diâmetro e D é o pé da altura de A sobre BC. A versão em texto explicita essas relações, preserva o raio 10, `BD = x` e o domínio fechado `[0; 20]`. O centro O e a posição aparente de D à esquerda de O no desenho dispensam descrição, pois a pergunta percorre o diâmetro inteiro.

Para `0 < x < 20`, a hipotenusa é `BC = 20` porque o diâmetro subtende um ângulo reto em A. Como `BD = x` e `DC = 20 − x`, a semelhança dos dois triângulos menores dá `AD² = BD·DC = x(20 − x)`. A área é `(BC·AD)/2 = 10√(20x − x²)`. Nos extremos `x = 0` e `x = 20`, o triângulo degenera e a expressão dá zero. Pelo círculo centrado no ponto médio de BC, `AD² = 10² − (x − 10)²` confirma a mesma expressão.

A relação `h² = m·n` e o caso do vértice que percorre um semicírculo fazem parte da aula. O item pede combinar a altura com a fórmula da área e expressar o resultado em função de `x`. A fala fornece o ângulo reto no semicírculo e pede ao aluno que recupere a relação métrica e monte a conta.

## Feedbacks

| Alternativa | Como o erro produz exatamente a opção |
| --- | --- |
| A, `20√(20x − x²)` | Mantém a altura correta e usa `BC·AD` como área. Dividir por 2 recupera C. |
| B, `10√(10x − x²)` | Usa o raio no cálculo exclusivo de `DC`, chegando a `DC = 10 − x` e `AD² = x(10 − x) = 10x − x²`. Mantém a meia base 10 na área. |
| D, `20√(10 − x²)` | Combina os erros de B e E, escrevendo `x(10 − x)` como `10 − x²`, e omite o divisor 2 como em A. A explicação anterior deixava sem origem o termo `−x²`. |
| E, `10√(20 − x²)` | Distribui `x` só sobre `−x` e deixa 20 sem multiplicar. O feedback anterior dizia para esquecer o fator `x` inteiro, o que daria `20 − x`. |

Os feedbacks terminam com o valor correto. O de C liga a altura às projeções e faz a conta da área. O teste verifica ordem, rótulos e marcação exclusiva de C. Também confere as duas contas de área em `x = 0, 4, 10, 16, 20`, incluindo os extremos degenerados e a simetria em torno do centro.


## Validação

A V3 do roteiro reproduz os textos da aula e inclui o caderno e o gabarito. Conferi em UTF-8 o enunciado, as cinco alternativas, as fontes e a conta dos distratores.

Passaram `npm run typecheck` e `npm run lint:content`. Para executar o `tsx` neste ambiente Windows, usei um ajuste temporário de processo para a consulta de usuário. O roteiro passou no lint de planos com 13 de 13 questões preenchidas válidas. O comando global apontou os três erros do roteiro `funcao-modular.md`.

A suíte completa do Vitest passou com 2.174 testes em 135 arquivos.
