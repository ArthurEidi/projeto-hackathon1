# Reconferência Visual B11b — Aritmética (Contagem, Probabilidade e Estatística)

Reconferência visual em 400 px de largura (`overflowX = false` em todas as capturas) dos 15 capítulos designados na frente B11b, cobrindo:
1. Todos os 15 passos `micro_challenge` (`p5`): estado inicial + cada alternativa clicada e verificada (`VERIFICAR`), conferindo se a figura inicial não entrega a resposta, se cada errada mostra figura própria do erro (sem repetir a inicial nem a certa) e se o feedback não começa com `Resposta: ...;` nem entrega a certa.
2. Todos os 10 passos marcados como `corrigido = sim` em `docs/visual/aritmetica.md`.
3. Todos os 15 passos finais (`p6 fechamento`), conferindo encaixe da fórmula e dos chips em 400 px.

Capturas geradas em `C:/Users/mkf10/projetos/capturas-b11b/` com `reconfere-b11b.mjs` (porta 5212) e `scripts/captura-aula.mjs` (`arranjos-e-combinacoes-p5.png`).

| slug | passo | resultado | detalhe concreto do que se vê | tipo |
| --- | --- | --- | --- | --- |
| arranjos-e-combinacoes | p5 | defeito | Inicial `5 × 5 = 25` limpa. `alt1` (`20`) risca diagonal e mostra `20 casas`; `alt4` (`5`) destaca linha A; porém `alt2` (`25`) repete a figura inicial (`5 × 5 = 25`). Todas as 3 erradas entregam a resposta `10` no feedback (`20 / 2 = 10`, `Sem isso: 10`, `C(5, 2) = 10`). | conteúdo |
| arranjos-e-combinacoes | p6 | ok | Fórmula `C(n, k) = n! / (k! (n − k)!)` cabe em 2 linhas sem corte; 4 colunas de 6 permutações e `4 × 6 = 24` legíveis. | — |
| binomio-de-newton | p5 | defeito | Inicial limpa (árvore sem barras de `agrupar`). `alt1` (`4`) destaca os 6 caminhos certos de `k = 2` e mostra `6` em `k = 2` em vez de ilustrar `4`; `alt2` (`2`) e `alt4` (`1`) destacam folhas distintas. Todas as 3 erradas entregam `C(4, 2) = 6` no feedback. | conteúdo |
| binomio-de-newton | p6 | ok | Fórmula `(a + b)^n = Σ C(n, k) a^{n−k} b^k` cabe em 2 linhas sem sobreposição; árvore e barras `1 3 3 1` nítidas. | — |
| combinacoes-com-repeticao | p4 | ok | Passo corrigido (`pelo-menos-uma`): 21 tuplas `(5, 0, 0)` a `(0, 0, 5)` aparecem em 2 colunas à direita sem sobreposição nem corte. | — |
| combinacoes-com-repeticao | p5 | defeito | Inicial limpa (`4, 0, 0`, 4 pontos e 2 barras, sem `C(6, 2) = 15`). `alt1` (`64`) e `alt2` (`4`) repetem exatamente a figura inicial; `alt4` (`12`) mostra `0, 0, 4` (com zeros, apesar de o texto falar em soluções sem zero). Todas as 3 erradas entregam `C(6, 2) = 15` no feedback. | conteúdo |
| combinacoes-com-repeticao | p6 | ok | Fórmula `total = C(n + k − 1, k)` cabe em 2 linhas com folga; pontos, barras e lista limpos. | — |
| eventos-independentes | p4 | ok | Passo corrigido (`moeda-sem-memoria`): pílula rosa `1/2` tem margem inferior e não fica cortada pela borda. | — |
| eventos-independentes | p5 | defeito | Inicial limpa (`2 × 6 = 12`). `alt3` (`1/8`) repete exatamente a figura inicial; `alt1` (`2/3`) mostra `6 + 2 = 8` com a pílula rosa `×2` sobrepondo a célula `K6` (widget). Todas as 3 erradas entregam `1/12` no fim do feedback. | conteúdo / widget; **corrigido: sim** (parte de widget: o `×2` vai para a borda de baixo da casa, o texto `K6` sobe e é redesenhado por cima das listras; B12, 14/11, recapturado em 400 px) |
| eventos-independentes | p6 | ok | Passo corrigido + fechamento: pílula laranja `1/3` fica à direita da coluna `6` sem sobrepor `C6`/`K6`; fórmula `P(A ∩ B) = P(A) · P(B)` cabe em 2 linhas. | — |
| experimentos-binomial-e-repetidos | p3 | ok | Passo corrigido (`dado-sucesso-6`): todas as 8 folhas (`666` até `nãonãonão`) aparecem abaixo das bolinhas sem corte. | — |
| experimentos-binomial-e-repetidos | p5 | defeito | Inicial mostra barras `1 4 6 4 1` (sem `%`). Figuras de `alt1` (`1/2`), `alt2` (`1/16`) e `alt4` (`1/4`) distinguem cada erro, mas em `alt2` e `alt4` a pílula laranja superior (`C(4, 4) = 1`, `C(4, 1) = 4`) cobre o número `6` da barra `k = 2` (widget). Todas as 3 erradas entregam `3/8` no feedback. | conteúdo / widget; **corrigido: sim** (parte de widget: com a pílula `C(n, k)` no alto, as barras descem 22 px e o `6` de k = 2 fica livre (1/16 e 1/4); B12, 14/11, recapturado em 400 px) |
| experimentos-binomial-e-repetidos | p6 | ok | Todas as 8 folhas da árvore visíveis; fórmula `P(k) = C(n, k) · p^k · (1 − p)^{n−k}` cabe em 2 linhas sem corte. | — |
| fatorial-e-permutacoes | p5 | defeito | Inicial mostra degraus `5, 4, 3, 2, 1` sem `5 × 4 × 3 × 2 × 1 = 120`. `alt4` (`5`) mostra só uma barra `5 = 5`, mas `alt1` (`25`) e `alt2` (`15`) exibem a pílula `5 × 4 × 3 × 2 × 1 = 120` (entregando a resposta na figura). Todas as 3 erradas entregam `120` no feedback. | conteúdo |
| fatorial-e-permutacoes | p6 | ok | Fórmula `n! = n · (n − 1) · ... · 2 · 1` cabe em 2 linhas sem corte; degraus `4 × 3 × 2 × 1 = 24` limpos. | — |
| principio-fundamental-da-contagem | p2 | ok | Passo corrigido (`terceira-etapa`): rótulos cinzas `Camiseta`, `Bermuda` e `Boné` à direita têm margem limpa e não sobrepõem os nós. | — |
| principio-fundamental-da-contagem | p5 | defeito | Inicial limpa (3 colunas sem `3 × 4 × 2 = 24`). Figuras de `alt1` (`9`: `3 + 4 + 2 = 9`), `alt2` (`12`: `3 × 4 = 12`) e `alt4` (`14`: `12 + 2 = 14`) são distintas e fiéis ao erro. Feedback de `alt1` não entrega a resposta, mas `alt2` insinua `24` (`cada um dos 12 vira 2 lanches`) e `alt4` entrega explicitamente (`Fica 24.`). | conteúdo |
| principio-fundamental-da-contagem | p6 | ok com ressalva | Fórmula `total = n_1 · n_2 · ... · n_k` cabe em 2 linhas e `3 × 2 = 6` fica limpo; rótulo rotacionado `n1` à esquerda da árvore está bem pequeno. | widget; **corrigido: sim** (título curto das linhas (`n₁`) na horizontal, em 18 px, à esquerda dos rótulos; título das colunas também em 18 px; B12, 14/11, recapturado em 400 px) |
| probabilidade-condicional | p5 | defeito | Inicial limpa (`6 × 6 = 36`, pista laranja e linha 3 azul). `alt2` (`1/6`) mostra régua `1/6`; porém `alt4` (`5/36`) repete a figura inicial e `alt1` (`1/36`) risca as 31 casas mostrando `5 casas` (figura da pista, não de `1/36`). Todas as 3 erradas entregam `1/5` no feedback. | conteúdo |
| probabilidade-condicional | p6 | ok | Fórmula `P(A \| B) = P(A ∩ B) / P(B)` cabe em 2 linhas sem corte; tabela e pílula `1/4` limpas. | — |
| probabilidade-espaco-amostral | p1 | ok | Passo corrigido (`um-dado`): faces `1..6`, `6 casas` e régua `0..1` com pílula `0` limpa, sem corte. | — |
| probabilidade-espaco-amostral | p5 | defeito | Inicial limpa (`A1..V2`, `5 casas`). `alt2` (`1/2`) mostra `azul \| vermelha`, `2 casas`, e `alt4` (`3/5`) destaca `A1 A2 A3` na régua `3/5`; porém `alt1` (`2/3`) destaca `V1 V2` com `5 casas` (mesmo destaque da certa, sem mostrar razão `2/3`). Todas as 3 erradas entregam `2/5` no feedback. | conteúdo |
| probabilidade-espaco-amostral | p6 | ok | Fórmula `P(A) = n(A) / n(Ω)` cabe em 1 linha com folga; grade `6 × 6 = 36` e régua `1/6` limpas. | — |
| probabilidade-uniao-e-intersecao | p5 | defeito | Inicial limpa (`20 casas`). `alt1` (`7/10`) mostra `×2` em `10` e `20` (`10 + 4 = 14`); `alt4` (`1/10`) destaca `10` e `20` em rosa; porém `alt3` (`1/2`) destaca `5` e `15` em rosa sólido enquanto os pares ficam apenas em azul, contradizendo o texto `1/2 são só os pares`. Todas as 3 erradas entregam `3/5` no feedback. | conteúdo |
| probabilidade-uniao-e-intersecao | p6 | ok | Fórmula `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)` cabe em 2 linhas sem corte; `3 + 3 − 2 = 4` e régua `2/3` limpas. | — |
| distribuicao-de-frequencias-e-amostragem | p5 | defeito | Inicial limpa (barras `10, 8, 7`). `alt2` (`10%`) destaca `10` em `A`; porém `alt3` (`25%`) repete exatamente a figura inicial e `alt4` (`2,5%`) mostra a figura da resposta certa (`40%`, `32%`, `28%`). Todas as 3 erradas entregam `40%` no feedback. | conteúdo |
| distribuicao-de-frequencias-e-amostragem | p6 | ok | Fórmula `fr = f / n` cabe em 1 linha com folga; barras `40%, 30%, 20%, 10%` limpas. | — |
| leitura-de-tabelas-e-graficos | p5 | defeito | Inicial limpa (`Jan 10, Fev 15, Mar 25, Abr 28`). `alt1` (`Abril`) destaca `28` e `alt4` (`Janeiro`) destaca `10`; porém `alt3` (`Fevereiro`) destaca `15` e `25` juntos (incluindo março). Todas as 3 erradas entregam `Março` / `+10` no feedback. | conteúdo |
| leitura-de-tabelas-e-graficos | p6 | ok | Fórmula `ângulo = porcentagem · 360°` cabe em 2 linhas sem corte; gráfico de setor e rótulos `36°/10%`, `90°/25%`, `144°/40%` sem sobreposição. | — |
| medidas-de-dispersao | p5 | defeito | Inicial limpa (gangorra `2` e `8`, apoio `5`). `alt4` (`0`) mostra barras azuis `soma 0`; porém `alt3` (`6`) repete a figura inicial e `alt1` (`9`) mostra a mesma figura da certa (`√9 = 3`), entregando a resposta na imagem. Todas as 3 erradas entregam `3` no feedback. | conteúdo |
| medidas-de-dispersao | p6 | ok | Fórmula `σ² = Σ (x − x̄)² / n ; σ = √σ²` cabe em 2 linhas sem corte; quadrados e `√5 = 2,24` limpos. | — |
| medidas-de-tendencia-central | p1 | ok | Passo corrigido (`todos-iguais`): pílula `moda` à esquerda da `mediana 6` sem sobreposição. | — |
| medidas-de-tendencia-central | p3 | ok | Passo corrigido (`valor-extremo`): `mediana 6` acima e `média 6` abaixo sem sobreposição na régua `0..30`. | — |
| medidas-de-tendencia-central | p5 | defeito | Inicial limpa (gangorra inclinada com `5`, `7` e `?` sobre `7`). `alt1` (`7`) e `alt4` (`8`) mostram a gangorra inclinada com `?` em `7` e `8`; porém `alt3` (`21`) mostra a gangorra equilibrada com `?` em `9` (figura da certa). Todas as 3 erradas entregam `9` no feedback. | conteúdo |
| medidas-de-tendencia-central | p6 | ok | Fórmula `x̄ = soma / n` cabe em 1 linha com folga; gangorra com `moda`, `mediana 6` e `média 6,33` limpa. | — |
| quartis-percentis-e-boxplot | p2 | ok | Passo corrigido (`quartis`): `Q1 1`, `Q2 6`, `Q3 12` e régua `0..12` limpos, sem corte. | — |
| quartis-percentis-e-boxplot | p3 | ok | Passo corrigido (`desenhar-caixa`): `Q1 3`, `Q2 6`, `Q3 9` e botão `DESENHAR CAIXA` limpos. | — |
| quartis-percentis-e-boxplot | p4 | ok | Passo corrigido (`extremo-estica`): boxplot com `AIQ 6` e régua `0..40` com ponto arrastável em `12` limpos. | — |
| quartis-percentis-e-boxplot | p5 | defeito | Inicial limpa (lista `2..11` com `Q2 7`). `alt4` (`10`) mostra `Q2 7` e `Q3 10`; porém `alt2` (`7`) repete a figura inicial e `alt3` (`2`) desenha o boxplot completo com `Q1 = 4` (entregando a resposta na imagem). Todas as 3 erradas entregam `4` no feedback. | conteúdo |
| quartis-percentis-e-boxplot | p6 | ok | Fórmula `AIQ = Q3 − Q1` cabe em 1 linha com folga; quartis e boxplot `AIQ 6` limpos. | — |

## Resumo

- **Total inspecionado:** 15 capítulos, 40 passos (15 `micro_challenge` `p5` com 60 verificações de alternativas, 10 passos corrigidos de `aritmetica.md` e 15 fechamentos `p6`).
- **Resultado geral:** 24 `ok`, 1 `ok com ressalva` (`principio-fundamental-da-contagem p6`), 15 `defeito` (todos os 15 passos `p5` de desafio).
- **Passos corrigidos da Máquina A:** todos os 10 passos marcados como `corrigido = sim` em `docs/visual/aritmetica.md` estão **ok** nas novas capturas.
- **Fechamentos (`p6`):** todos os 15 cabem em 400 px sem corte nem sobreposição (apenas 1 ressalva menor de legibilidade em `principio-fundamental-da-contagem p6`).

### Defeitos de conteúdo (15 passos — todos os `micro_challenge` `p5`)

1. **Feedbacks das erradas entregando a resposta certa (15/15 capítulos):** nenhum começa com `Resposta: ...;`, porém **todos os 15** desafios `p5` ainda revelam o valor/opção correta no texto do feedback das alternativas erradas (apenas `principio-fundamental-da-contagem p5` `alt1` `"9"` não entrega). É preciso reescrever os feedbacks das erradas para apontar só o erro + uma pista para a próxima tentativa.
2. **Figuras das alternativas erradas repetindo a inicial, repetindo a certa ou inconsistentes com o erro (13/15 capítulos):**
   - Repetem exatamente a figura inicial: `arranjos-e-combinacoes p5 alt2` (`25`), `combinacoes-com-repeticao p5 alt1` (`64`) e `alt2` (`4`), `probabilidade-condicional p5 alt4` (`5/36`), `distribuicao-de-frequencias-e-amostragem p5 alt3` (`25%`), `medidas-de-dispersao p5 alt3` (`6`), `quartis-percentis-e-boxplot p5 alt2` (`7`).
   - Mostram a figura da resposta certa (ou revelam a resposta na imagem): `fatorial-e-permutacoes p5 alt1` (`25`) e `alt2` (`15`) com pílula `= 120`; `distribuicao-de-frequencias-e-amostragem p5 alt4` (`2,5%`) com barras `40%, 32%, 28%`; `medidas-de-dispersao p5 alt1` (`9`) com `√9 = 3`; `medidas-de-tendencia-central p5 alt3` (`21`) com `?` em `9`; `quartis-percentis-e-boxplot p5 alt3` (`2`) com `Q1 = 4`.
   - Destaque errado/inconsistente com a alternativa: `binomio-de-newton p5 alt1` (`4` destacando os 6 caminhos de `k = 2`), `combinacoes-com-repeticao p5 alt4` (`12` mostrando `0, 0, 4` com zeros), `probabilidade-condicional p5 alt1` (`1/36` mostrando `5 casas` da pista), `probabilidade-espaco-amostral p5 alt1` (`2/3` mostrando `5 casas` como na certa), `probabilidade-uniao-e-intersecao p5 alt3` (`1/2` destacando `5` e `15` em rosa sólido em vez dos pares), `leitura-de-tabelas-e-graficos p5 alt3` (`Fevereiro` destacando `Fev` e `Mar` juntos).

### Defeitos / ressalvas de widget (3 ocorrências)

1. `eventos-independentes p5` (`alt1`): pílula rosa `×2` sobrepõe parcialmente a célula `K6` da grade.
2. `experimentos-binomial-e-repetidos p5` (`alt2` e `alt4`): pílula laranja superior (`C(4, 4) = 1` / `C(4, 1) = 4`) cobre o número `6` acima da barra `k = 2`.
3. `principio-fundamental-da-contagem p6` (ressalva): rótulo rotacionado `n1` à esquerda da árvore aparece muito pequeno.

## Correções B11b-fix

Edições aplicadas exclusivamente no passo `p5` (`micro_challenge`) dos 15 capítulos em `content/aritmetica/` (sem alterar widgets nem outros passos), todas recapturadas após `VERIFICAR` e inspecionadas em 400 px:

- **arranjos-e-combinacoes (`p5`)**:
  - Feedbacks `alt1`/`alt2`/`alt4`: entregavam `10` → reescritos com erro + pista sem o valor certo (`≤ 140` chars, 2 frases).
  - Figura `alt2` (`25`): repetia a inicial (`5 × 5 = 25`) → passou a acender a diagonal `AA..EE` (`acesas: ["A,A", "B,B", "C,C", "D,D", "E,E"]`).
- **binomio-de-newton (`p5`)**:
  - Feedbacks `alt1`/`alt2`/`alt4`: entregavam `6` → reescritos sem o valor certo.
  - Figuras `alt1`/`alt2`/`alt4`: `agrupar: true` exibia as barras com `6` → alterado para `agrupar: false` (acendendo `4` caminhos com 1 `x`, `2` pontas ou `1` caminho `xxxx`).
- **combinacoes-com-repeticao (`p5`)**:
  - Feedbacks `alt1`/`alt2`/`alt4`: entregavam `15` → reescritos sem o valor certo.
  - Figuras: `alt1` (`64`) repetia a inicial → passou a usar `numeradas: true, sequencia: "●●|●|●"`; `alt2` (`4`) repetia a inicial → `sequencia: "||●●●●"`; `alt4` (`12`) tinha zeros → passou a `sequencia: "●|●●|●"` (sem zeros).
- **eventos-independentes (`p5`)**:
  - Feedbacks `alt1`/`alt3`/`alt4`: entregavam `1/12` → reescritos sem o valor certo.
  - Figura `alt3` (`1/8`): repetia a inicial (`2 × 6 = 12`) → passou a `n_colunas: 4, acesas: ["K,4"], regua: false` (`2 × 4 = 8`). (Ressalva de widget em `alt1` mantida para o Claude Code #2.)
- **experimentos-binomial-e-repetidos (`p5`)**:
  - Feedbacks `alt1`/`alt2`/`alt4`: entregavam `3/8` → reescritos sem o valor certo; figuras já distintas (`p: 50`, `k: 4`, `k: 1`). (Ressalva de widget em `alt2`/`alt4` mantida para o Claude Code #2.)
- **fatorial-e-permutacoes (`p5`)**:
  - Feedbacks `alt1`/`alt2`/`alt4`: entregavam `120` → reescritos sem o valor certo.
  - Figuras: `alt1` (`25`) exibia `= 120` → `n: 5, k: 2, iguais: true, contador: true` (`5 × 5 = 25`); `alt2` (`15`) exibia `= 120` → `operacao: "soma", contador: true` (`5 + 4 + 3 + 2 + 1 = 15`).
- **principio-fundamental-da-contagem (`p5`)**:
  - Feedbacks `alt2`/`alt4`: `alt2` insinuava `24` e `alt4` entregava `24` → reescritos sem o valor certo (`alt1` já não entregava). Figuras já distintas.
- **probabilidade-condicional (`p5`)**:
  - Feedbacks `alt1`/`alt2`/`alt4`: entregavam `1/5` → reescritos sem o valor certo.
  - Figuras: `alt1` (`1/36`) mostrava `5 casas` da pista → `pista: false, acesas: ["3,5"], regua: false`; `alt4` (`5/36`) repetia a inicial → `pista: false, acesas: ["2,6", "3,5", "4,4", "5,3", "6,2"], regua: false`.
- **probabilidade-espaco-amostral (`p5`)**:
  - Feedbacks `alt1`/`alt2`/`alt4`: entregavam `2/5` → reescritos sem o valor certo.
  - Figura `alt1` (`2/3`): mostrava `5 casas` como a certa → `contador: false` (sem a régua `2/5` nem `5 casas`). *Limitação do widget:* o modo `casas` não possui razão parte-parte (`2:3`) sem incluir as 5 fichas.
- **probabilidade-uniao-e-intersecao (`p5`)**:
  - Feedbacks `alt1`/`alt3`/`alt4`: entregavam `3/5` → reescritos sem o valor certo.
  - Figura `alt3` (`1/2`): destacava `5` e `15` em rosa → passou a acender os 10 pares (`2, 4, ..., 20`).
- **distribuicao-de-frequencias-e-amostragem (`p5`)**:
  - Feedbacks `alt2`/`alt3`/`alt4`: entregavam `40%` → reescritos sem o valor certo.
  - Figuras: `alt3` (`25%`) repetia a inicial → `acesas: [0, 1, 2]`; `alt4` (`2,5%`) mostrava `40%, 32%, 28%` → `categorias: [{"nome": "25 ÷ 10", "valor": 2.5}], unidade: "%", acesas: [0]`.
- **leitura-de-tabelas-e-graficos (`p5`)**:
  - Feedbacks `alt1`/`alt3`/`alt4`: entregavam `Março`/`+10` → reescritos sem o valor certo.
  - Figura `alt3` (`Fevereiro`): destacava `Fev` e `Mar` → `acesas: [1]` (só `Fev`).
- **medidas-de-dispersao (`p5`)**:
  - Feedbacks `alt1`/`alt3`/`alt4`: entregavam `3` → reescritos sem o valor certo.
  - Figuras: `alt1` (`9`) mostrava `√9 = 3` → `mostrar: {"desvios": true, "quadrados": false}` (*limitação do widget:* `quadrados: true` sempre exibe `√9 = 3`); `alt3` (`6`) repetia a inicial → `mostrar: {"conta_media": true}`.
- **medidas-de-tendencia-central (`p5`)**:
  - Feedbacks `alt1`/`alt3`/`alt4`: entregavam `9` → reescritos sem o valor certo.
  - Figura `alt3` (`21`): mostrava `?` em `9` (certa) → `valores: [5, 7, 21], regua: [0, 25]`.
- **quartis-percentis-e-boxplot (`p5`)**:
  - Feedbacks `alt2`/`alt3`/`alt4`: entregavam `4` → reescritos sem o valor certo.
  - Figuras: `alt2` (`7`) repetia a inicial → `fixos: ["q2"], cores: {"q2": "c3"}`; `alt3` (`2`) mostrava `Q1 = 4` no boxplot → `fixos: []` (*limitação do widget:* modo `fila` não possui marcador específico para o mínimo `2`).

### Validações após a última edição

- `npm run lint:content`: `conteúdo ok`
- `npx vitest run` (15 arquivos dos capítulos editados): `15 passed (15)`, `163 passed (163)`
- `npm run typecheck`: sem erros (`tsc --noEmit` saiu com código 0)
