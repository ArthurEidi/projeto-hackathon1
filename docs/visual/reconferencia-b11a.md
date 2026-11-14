# Reconferência visual B11a: Aritmética — Conjuntos e Proporcionalidade (12 capítulos)

Inspeção em largura móvel (`400 x 860 px`) via Chrome headless (`reconfere-b11a.mjs`, porta `5211`), cobrindo:
1. Todos os passos marcados como corrigidos (`sim`) em `docs/visual/aritmetica.md` nos 12 capítulos;
2. Todos os passos `micro_challenge` (estado inicial e após selecionar a alternativa errada e clicar em **VERIFICAR**);
3. Todos os passos finais `concept_lock` (`fechamento`).

Total: **37 passos** inspecionados (25 passos interativos/fechamentos + 12 `micro_challenge` com suas alternativas erradas verificadas).

## Tabela de reconferência

| slug | passo | resultado | detalhe concreto do que se vê | tipo |
| :--- | :--- | :--- | :--- | :--- |
| `conjuntos-e-intervalos` | p2 (`unir-e-intersectar`) | ok | `A = [-2; 3]`, `B = [1; 4]`, `A ∪ B` e o ponto `2` aparecem separados em raias distintas, sem sobreposição nem corte em 400 px. | widget |
| `conjuntos-e-intervalos` | p3 (`retirar-e-testar-pontas`) | ok | `A = [-2; 3]`, `B = [1; 4]`, `A \ B` e `0` estão inteiros e legíveis, sem corte ou colisão. | widget |
| `conjuntos-e-intervalos` | p4 (`conferir-previsao`) | defeito | Figura inicial (`A = [0; 3]`, `B = [2; 5]`) não entrega a resposta; porém, ao escolher a errada `[0; 5]` e clicar em VERIFICAR, a figura não muda (não mostra o intervalo da união) e o feedback começa com `"Resposta: [2; 3]; ..."` e repete `: [2; 3].` no fim, entregando a certa. | conteúdo |
| `conjuntos-e-intervalos` | p5 (`fechamento`) | ok | `A = [0; 3]`, `B = [2; 5]` e `A ∩ B` sem colisão; fórmula `x ∈ A ∪ B ⇔ x ∈ A ou x ∈ B; A ∩ B exige ambos` e chips cabem em 400 px. | conteúdo/widget |
| `fracoes-e-decimais` | p1 (`caso-neutro`) | ok | Marcas `0`, `0,5`, `1`, `1,5`, `2` visíveis; ponto `1` e badge roxo `1` inteiros com folga inferior. | conteúdo/widget |
| `fracoes-e-decimais` | p2 (`subdividir-sem-mover`) | ok com ressalva | Marcas `0`, `0,5`, `1` e trecho `1/2` visíveis; o rótulo `0` da reta fica parcialmente encoberto atrás do ponto móvel azul em `x = 0`. | widget |
| `fracoes-e-decimais` | p3 (`medir-em-meias`) | ok | Marcas `0`, `0,25`, `0,5`, `0,75`, `1` visíveis; trecho `1/2` e badge `0,5` legíveis. | conteúdo |
| `fracoes-e-decimais` | p4 (`somar-partes`) | ok | Marcas `0`, `0,25`, `0,5`, `0,75`, `1` visíveis; trechos `1/2`, `1/4` e badge `0,5` separados. | conteúdo |
| `fracoes-e-decimais` | p5 (`conferir-previsao`) | ok | Figura inicial mostra só `1/2`; na errada `0,2`, a figura muda e mostra o ponto/trecho `0,2` (erro escolhido). Desafio com 2 alternativas, sem sobreposição nem corte em 400 px. | conteúdo |
| `fracoes-e-decimais` | p6 (`fechamento`) | ok | Trecho `1/2` e badge `0,5` inteiros; fórmula `a / b = (k·a) / (k·b) , b≠0 e k≠0` e chips cabem em 400 px. | conteúdo/widget |
| `notacao-cientifica-e-ordem-grandeza` | p1 (`caso-neutro`) | ok | Os 5 rótulos (`2·10⁻²`, `2·10⁻¹`, `n = 0`, `2·10¹`, `2·10²`) ficam distribuídos em raias verticais sem sobreposição. | widget |
| `notacao-cientifica-e-ordem-grandeza` | p2 (`normalizar`) | ok | Texto cinza `20/200` no topo esquerdo visível e badge inferior `2·10² = 200` inteiro sem corte. | widget |
| `notacao-cientifica-e-ordem-grandeza` | p3 (`ordem-e-arredondamento`) | ok | Badges `a = 2`, `a = 3` e `corte √10` distribuídos em raias sem sobreposição. | widget |
| `notacao-cientifica-e-ordem-grandeza` | p4 (`conferir-previsao`) | ok | Figura inicial mostra `200 = 200` e `20/200` sem corte; na errada `20·10¹`, a figura muda para `20·10¹ = 200` (erro escolhido). Desafio com 2 alternativas, sem corte em 400 px. | conteúdo |
| `notacao-cientifica-e-ordem-grandeza` | p5 (`fechamento`) | ok | `20/200`, `200/200`, `100%` e `2·10² = 200` inteiros; fórmula `N = a ·10ⁿ ; 1≤a<10; ordem =10ⁿ se a<√10, senão 10ⁿ⁺¹` e chips cabem em 400 px. | conteúdo/widget |
| `potencias-e-radicais` | p4 (`conferir-previsao`) | defeito | Figura inicial mostra `2ˣ` e `(0; 1)`; na errada `−2`, desenha `y = −2` (tocando o `-2` do eixo `y`), mas exibe junto o ponto `(-1; 0,5)` entregando a resposta visualmente, e o feedback `"Expoente negativo pede inverso, não troca de sinal; 2⁻¹=1/2."` entrega `1/2`. | conteúdo |
| `potencias-e-radicais` | p5 (`fechamento`) | ok | Gráfico de `2ˣ` limpo; fórmula `aᵐ · aⁿ = aᵐ⁺ⁿ ; a⁻ⁿ = 1 / aⁿ ; √( a² ) = |a|` e chips cabem sem fichas soltas em 400 px. | conteúdo |
| `sistemas-numericos-e-divisibilidade` | p5 (`conferir-previsao`) | defeito | Na errada `2`, a figura não muda em relação à inicial (mantém 3 blocos de `2`, `d = 6`, `n = 6`), e o feedback `"Você confundiu quociente com resto; 6=3·2+0."` entrega a resposta certa (`0`). | conteúdo |
| `sistemas-numericos-e-divisibilidade` | p6 (`fechamento`) | ok | Barras `3/3`, `100%`, `d = 6`, `n = 6` limpas; fórmula `n = d · q + r ; 0 ≤ r < d; d | n ⇔ r = 0` e chips cabem em 400 px. | conteúdo |
| `valor-absoluto-e-distancia` | p2 (`espelhar-ponto`) | ok | Badges `0`, `2` e badge roxo da distância `2` inteiros dentro do cartão, sem corte inferior. | widget |
| `valor-absoluto-e-distancia` | p4 (`conferir-previsao`) | defeito | Figura inicial (`−2` e `1`) sem corte; porém, na errada `−3`, a figura não muda em relação à inicial e o feedback começa com `"Resposta: 3; ..."` e termina com `= 3.`, entregando a certa. | conteúdo |
| `valor-absoluto-e-distancia` | p5 (`fechamento`) | ok | Badges `x = -2`, `c = 1` e `3` inteiros sem sobreposição ou corte; fórmula `d ( x ; c ) = | x − c |` e chips cabem em 400 px. | widget |
| `descontos-acrescimos-e-indices` | p4 (`micro-desafio`) | defeito | Figura inicial mostra só `Início (100)` e `+10% (110)`; porém, na errada `R$ 100`, a figura exibe a 3ª barra `−10%` com valor `99` (mostrando a resposta certa em vez do erro `100`), e o feedback `"As bases são diferentes e não se cancelam: o −10% incide em 110. O final é R$ 99."` entrega `R$ 99`. | conteúdo |
| `descontos-acrescimos-e-indices` | p5 (`fechamento`) | ok | Barras `100`, `110`, `99` limpas; fórmula `V' = V · (1 ∓ p )` e chips cabem em 400 px. | conteúdo |
| `grandezas-direta-e-inversa` | p4 (`conferir-previsao`) | defeito | Figura inicial mostra `(1; 6)` sem entregar `3`; porém, na errada `12`, a figura exibe `(2; 3)` com `2 · 3 = 6` (a resposta certa em vez do erro `12`), e o feedback `"Você aplicou proporcionalidade direta; o produto exige y = 6/2 = 3."` entrega `3`. | conteúdo |
| `grandezas-direta-e-inversa` | p5 (`fechamento`) | ok | Curva `y = 6/x` e ponto `(2; 3)` limpos; fórmula `y = k x (y/x = k) ; inversa: xy = k` e chips cabem em 400 px. | conteúdo |
| `matematica-financeira` | p4 (`micro-desafio`) | defeito | Figura inicial mostra `n = 2` (`110`) com 3ª barra tracejada vazia; porém, na errada `R$ 120`, exibe `n = 3` com `121` (a resposta certa em vez de `120`), e o feedback `"R$ 120 é simples; composto dá 100·1,1² = 121."` entrega `121`. | conteúdo |
| `matematica-financeira` | p5 (`fechamento`) | ok | Barras `100`, `110`, `121`, `133,1` limpas; fórmula `M (simples) = C (1 + i · t ) | M (composto) = C (1 + i ) ᵗ` e chips cabem em 400 px. | conteúdo |
| `razao-proporcao-porcentagem` | p2 (`escalar-os-dois`) | ok | Barra `2/4`, `razão 1/2`, `50%`, `P = 2` e `T = 4` inteiros dentro do cartão, sem corte inferior. | widget |
| `razao-proporcao-porcentagem` | p3 (`mudar-a-base`) | ok | `P = 2` e `T = 4` inteiros dentro do cartão, sem corte inferior. | widget |
| `razao-proporcao-porcentagem` | p4 (`conferir-previsao`) | ok | Figura inicial mostra `1/4` e `25%`; na errada `4`, a figura muda para `P = 4`, `T = 8`, `50%` (erro escolhido). Desafio com 2 alternativas, sem corte em 400 px. | conteúdo |
| `razao-proporcao-porcentagem` | p5 (`fechamento`) | ok | Barra `1/4`, `25%`, `P = 2`, `T = 8` limpa; fórmula `p = 100·P /T ; P/T = p/100` e chips cabem em 400 px. | conteúdo |
| `taxas-equivalentes-e-inflacao` | p4 (`micro-desafio`) | defeito | Figura inicial mostra só `Salário (nominal) 110` e `Preços 105`; porém, na errada `5%`, exibe a 3ª barra `Valor real` com `104,8` (a resposta certa em vez do erro `5%`), e o feedback `"Subtrair dá só uma aproximação; o exato é 1,10 ÷ 1,05 − 1 ≈ 4,76%."` entrega `≈ 4,76%`. | conteúdo |
| `taxas-equivalentes-e-inflacao` | p5 (`fechamento`) | ok | Barras `110`, `105`, `104,8` limpas; fórmula `i equivalente = (1 + i ) ⁿ − 1 ; valor real = nominal ÷ fator de preços` e chips cabem em 400 px. | conteúdo |
| `unidades-conversoes-e-escalas` | p2 (`converter-unidade`) | ok | Badges `2 m`, `20 dm` e `200 cm` inteiros dentro do cartão, sem corte lateral ou inferior. | widget |
| `unidades-conversoes-e-escalas` | p4 (`conferir-previsao`) | defeito | Figura inicial mostra `b = 2, h = 2, A = 4`; porém, na errada `8`, exibe `b = 4, h = 4, A = 16` e `"ampliar 2× multiplica a área por 4"` (a resposta certa em vez do erro `8`), e o feedback `"Você dobrou só uma dimensão; (2·2)²=16."` entrega `16`. | conteúdo |
| `unidades-conversoes-e-escalas` | p5 (`fechamento`) | ok | Quadrado `4 × 4`, `A = 16` limpo; fórmula `L' = k L; A' = k²A; V' = k³V; escala = L desenho / L real` e chips cabem em 400 px sem corte lateral. | conteúdo |

## Resumo

- **Passos inspecionados:** 37 passos em 12 capítulos (`27` ok, `1` ok com ressalva, `9` com defeito).
- **Defeitos de conteúdo (9 — todos nos `micro_challenge`):**
  *(Nota: todos os 12 desafios têm 2 alternativas; pelo critério ajustado, o feedback da errada citar a resposta certa não conta como defeito em desafios de 2 opções.)*
  - **3 não mudam a figura da errada (igual à inicial):** `conjuntos-e-intervalos` p4, `sistemas-numericos-e-divisibilidade` p5, `valor-absoluto-e-distancia` p4.
  - **6 mostram a resposta certa na figura da errada (em vez do erro escolhido):** `potencias-e-radicais` p4 (`(-1; 0,5)` junto com `y = −2`), `descontos-acrescimos-e-indices` p4 (`99`), `grandezas-direta-e-inversa` p4 (`(2; 3)` e `2·3=6`), `matematica-financeira` p4 (`n=3` com `121`), `taxas-equivalentes-e-inflacao` p4 (`104,8`), `unidades-conversoes-e-escalas` p4 (`4×4`, `A=16`).
  - *(Os outros 3 desafios — `fracoes-e-decimais` p5, `notacao-cientifica-e-ordem-grandeza` p4 e `razao-proporcao-porcentagem` p4 — mostram corretamente a figura do erro escolhido e estão `ok`.)*
- **Defeitos / ressalvas de widget (1 ressalva leve, 0 bloqueantes):**
  - Todas as correções de `widget` registradas em `docs/visual/aritmetica.md` para esses 12 capítulos foram confirmadas como resolvidas em `400 px`.
  - Única ressalva leve de widget: em `fracoes-e-decimais` p2 (`subdividir-sem-mover`), o rótulo `0` do eixo fica parcialmente encoberto pelo ponto móvel azul em `x = 0` no estado inicial.

## Triagem do maestro (14/11)

Os 12 desafios destes capítulos têm 2 alternativas: o feedback da errada citar a certa não é defeito (só sobra a outra opção). Figura da errada que mostra o resultado certo ao lado do erro (descontos, grandezas, matemática financeira, taxas, unidades, potências) também fica: com 2 alternativas, ela é a explicação do erro. Ficam para correção (B11a-fix): figura da errada igual à inicial em `conjuntos-e-intervalos` p4, `sistemas-numericos-e-divisibilidade` p5 e `valor-absoluto-e-distancia` p4, e o prefixo "Resposta: …;" nos feedbacks de `conjuntos-e-intervalos` p4 e `valor-absoluto-e-distancia` p4.

## Correções B11a-fix (14/11)

- **`conjuntos-e-intervalos` p4 (`conferir-previsao`):**
  - **Antes:** opções `micro-acerto` e `micro-erro` usavam a chave `"override"` (ignorada por `MicroChallenge.tsx`, que lê `"figure"`), mantendo a figura da errada `[0; 5]` igual à inicial; feedback da errada era `"Resposta: [2; 3]; Você fez a união; a interseção exige os dois filtros: [2; 3]."`.
  - **Depois:** trocado `"override"` por `"figure"` em ambas as opções (na errada `[0; 5]`, desenha a barra roxa `A ∪ B` de `0` a `5`); feedback da errada alterado para `"Você fez a união, que junta os dois conjuntos; a interseção exige pertencer aos dois ao mesmo tempo."`. Recapturado após clicar em `VERIFICAR`: `A ∪ B` visível sem sobreposição ou corte.
- **`sistemas-numericos-e-divisibilidade` p5 (`conferir-previsao`):**
  - **Antes:** opção errada `2` (`micro-erro`) não tinha `"figure"`, repetindo a figura inicial de 3 blocos (`3/3`, `d = 6`, `n = 6`).
  - **Depois:** adicionado `"figure"` com `partes: 2`, `pintadas: 2`, `todo: 6`, `rotulos: { parte: "2×3", todo: "n" }`, `highlight: ["c2"]`. Recapturado após clicar em `VERIFICAR`: exibe 2 blocos de `3` (`2/2`, `100%`, `2×3 = 6`, `n = 6`), ilustrando os 2 grupos (quociente) confundidos com o resto.
- **`valor-absoluto-e-distancia` p4 (`conferir-previsao`):**
  - **Antes:** opções `micro-acerto` e `micro-erro` usavam `"override"` em vez de `"figure"`, mantendo a errada `−3` igual à figura inicial; feedback da errada era `"Resposta: 3; −3 é o deslocamento; a distância é não negativa: ∣−2 − 1∣ = 3."`.
  - **Depois:** trocado `"override"` por `"figure"` em ambas as opções (na errada `−3`, adiciona trecho `desloc. −3` em `c3` com `mostrar.distancia: false` e `highlight: ["c3"]`); feedback da errada alterado para `"−3 é o deslocamento com sinal; a distância mede comprimento e é sempre não negativa."`. Recapturado após clicar em `VERIFICAR`: trecho rosa `desloc. −3` e seta de direção visíveis sem revelar a distância `3`.
