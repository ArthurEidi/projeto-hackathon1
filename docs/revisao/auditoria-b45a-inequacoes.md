# Auditoria B45a — Inequações trigonométricas, Q67 da UFU

## Fonte e gabarito

Conferi a Q67 do caderno de Medicina de 28/08/2021, 1º dia, Tipo 1, na página 37 do PDF e na página impressa. A cópia local `provas-oficiais/ufu-2021-2-medicina/prova.pdf` e o caderno do portal exibem a mesma inequação em `[0; 2π]` e as mesmas quatro alternativas, na ordem A–D. [Caderno oficial, p. 37](https://www.portalselecao.ufu.br/servicos/arquivo_administrativo/download/96752f0608aff8b3436a1b5a5099c0ce#page=37)

O gabarito definitivo da cópia local (`gabarito.pdf`, p. 2) indica A. O portal do Edital 5/2021 também lista uma versão definitiva retificada em 13/10/2021. Na página 2 dessa versão, a linha 67 de Matemática confirma A para o Tipo 1. A questão permaneceu válida. A cópia local do gabarito corresponde à versão definitiva de setembro. Consultei a retificação no PDF servido pelo portal. [Cronograma oficial](https://www.portalselecao.ufu.br/servicos/Edital/cronograma/1073) · [Gabarito definitivo de setembro, p. 2](https://www.portalselecao.ufu.br/servicos/arquivo_administrativo/download/06d86297d6e28d4637d60c86c2a2f5b6#page=2) · [Gabarito definitivo retificado, p. 2](https://www.portalselecao.ufu.br/servicos/arquivo_administrativo/download/04c7f37f2420f0532d7f0e062ff2d5b5#page=2)

## Conta e nível

Com `t = cos(x)`, vale `−1 ≤ t ≤ 1`. Pela fórmula do arco duplo, `cos(2x) = 2t² − 1`, então o lado esquerdo vira `2t² + 3t + 1 = (2t + 1)(t + 1)`. Em `t = −1`, o produto zera. Para `t > −1`, o segundo fator é positivo e o produto é não positivo se `2t + 1 ≤ 0`. Juntando os casos, `−1 ≤ t ≤ −1/2`. O cosseno decresce de 1 a −1 em `[0; π]` e cresce de −1 a 1 em `[π; 2π]`. Ele vale `−1/2` em `2π/3` e `4π/3`, de modo que a solução é **A, `[2π/3; 4π/3]`**, incluindo os extremos e `π`.

O item cabe como questão de vestibular da aula. Combina a leitura de arcos e fronteiras no ciclo, trabalhada na aula, com a fórmula de arco duplo e a identidade fundamental de aulas anteriores. A redução exige uma fatoração quadrática curta. A fala fornece a forma da identidade em cosseno para apoiar essa passagem.

## Enunciado, fala e feedbacks

- **Enunciado.** A redação resumida preserva a inequação `≤ 0` e o intervalo fechado `[0; 2π]`. A adaptação usa `·` para o produto, frações em linha e ponto e vírgula nos intervalos. A fonte da aula agora aponta para o gabarito retificado.
- **Fala.** A dica aparece antes de Verificar. Fornece a forma da identidade de arco duplo e sugere usar o cosseno como incógnita. O aluno ainda precisa fatorar, estudar o sinal e encontrar o arco.
- **A.** O novo feedback trata `t = −1` à parte antes de usar a positividade de `t + 1`. Isso explica a inclusão de `x = π`, onde a expressão também zera.
- **B.** Restringir a leitura a `[0; π]` dá exatamente `[2π/3; π]`. O feedback recupera o trecho `[π; 4π/3]`. Por exemplo, `7π/6` satisfaz a inequação original, pois seu lado esquerdo vale `(5 − 3√3)/2 < 0`.
- **C.** Trocar o sinal da raiz de `2t + 1 = 0` leva a usar `cos(x) ≤ 1/2`. Os cruzamentos em `π/3` e `5π/3` delimitam exatamente `[π/3; 5π/3]`. O feedback corrige o limite para `−1/2` e dá o intervalo correto.
- **D.** Trocar o limite para `1/2` e escolher o lado direito da reta vertical de corte produz `cos(x) ≥ 1/2`. Com os mesmos cruzamentos de C e a volta fechada, isso dá exatamente `[0; π/3] ∪ [5π/3; 2π]`. O feedback corrige o sinal do limite e o sentido da comparação.

O roteiro reproduz a dica e os feedbacks do JSON, com a conta e as páginas consultadas. O teste confere a ordem, os rótulos e a marcação exclusiva de A. A verificação numérica avalia as três raízes, pontos dos dois lados de cada uma delas e os extremos do domínio.


## Validação

- `npm run typecheck` passou. `npx vitest run` passou com 2.145 testes em 132 arquivos. A execução da aula e do teste do motor de conteúdo passou com 341 testes.
- `npm run lint:content` passou. O `tsx` precisou de um ajuste temporário somente no processo de validação para obter o nome do usuário no Windows após `uv_os_get_passwd` retornar `ENOMEM`.
- `npm run lint:planos` marcou este roteiro como válido, com 13 de 13 questões preenchidas válidas. O comando global ainda aponta três erros em `funcao-modular.md`.
- Conferi os cinco arquivos da frente em UTF-8 e a correspondência entre os textos e as URLs da aula, do roteiro e do registro de fontes. A tentativa de baixar pelo PowerShell encontrou falha de conexão. O PDF retificado foi conferido no portal oficial, sem comparação de bytes com uma cópia local.
