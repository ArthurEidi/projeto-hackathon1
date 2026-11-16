# Correções B25a — `vetores` e `triangulo` (16/11/2026, Claude Code #2)

Capturas em 400 × 860: `C:\Users\mkf10\projetos\capturas-b25\antes` e `...\depois`, mais `depois-k2` e `depois-k3`, com o slider do p1 da trigonometria em k = 2 e k = 3. Essas duas foram tiradas trocando o `initial` da aula por um momento; o arquivo foi restaurado em seguida, conferido com `cmp`.

## 1. `vetores-no-plano` p2: chips x/y presos em `u`

- **Antes:** com `v` arrastável, os chips mostravam sempre `x = 3` e `y = 1`, que são as componentes de `u`.
- **Correção:** parâmetro novo, opcional, `componentes_de` (só no modo `vetores`). É o id do vetor cujas componentes aparecem nos chips; o mesmo vetor vale para o chip Módulo e para os degraus c1/c2.
  - Sem o parâmetro, os chips seguem o primeiro vetor, como antes.
  - Quando o vetor escolhido não é o primeiro, os chips levam o nome dele: `v: x = …`, `v: y = …`, `Módulo de v = …`.
  - O schema recusa um id que não exista.
- Na aula, só o p2 recebeu `"componentes_de": "v"`. Como `v` é o único vetor arrastável nesse passo, os chips agora acompanham o vetor arrastado.
- **Depois:** `v: x = 0` e `v: y = 0` com `Soma = (3; 1)`, o que combina com a fala "v começa nulo: quanto dá u + v?".

## 2. `vetores-no-plano` p6: `Módulo = 3,61` encostava em `Soma = (6; 2)`

- **Antes:** chips x/y a h − 60, Módulo a h − 34 e Soma a h − 11. O Módulo encostava na Soma e quase tocava o chip x.
- **Correção:** a função `rodapeVetores` só muda as posições quando Módulo e Soma estão visíveis ao mesmo tempo. Nesse caso a faixa de baixo cresce de 80 para 104 px, com x/y a h − 86, Módulo a h − 54 e Soma a h − 16. Em qualquer outro caso as posições continuam as de antes.
- **Depois:** três linhas separadas, sem contato.
- **Conferência de que nada mais mudou:** comparei pixel a pixel as capturas antes e depois de todas as aulas que usam o widget (`vetores-no-plano` p1–p6 e `numeros-complexos` p1–p6), com o script `pngdiff.mjs`, que decodifica o PNG e usa tolerância de 8 por canal.
  - Fora dos passos alvo, as diferenças ficam só na caixa x 24–83, y 84–210, que é o mascote animado. O widget ficou idêntico.
  - `numeros-complexos` p6, que mostra o Módulo sem a Soma, deu igual até no PNG.
  - Mudaram de fato só `vetores-no-plano` p2 (chips) e p6 (rodapé).

## 3. `trigonometria-no-triangulo-retangulo` p1: triângulo minúsculo com k = 1

- **Antes:** a janela ficava presa em `k_max = 3`. Em k = 1 o triângulo ocupava cerca de 1/3 da grade, no canto.
- **Decisão, a partir da fala do passo:** a fala diz "aumente k… os lados triplicaram, mas CO / CA continua 1". Por isso o aluno precisa continuar vendo o tamanho crescer.
- **Correção:** parâmetro novo, opcional, `janela` no modo `razoes`.
  - `"k_max"` é o padrão e mantém o comportamento de antes.
  - `"k"` enquadra o triângulo atual, que passa a ocupar a área em qualquer k. A malha guarda a unidade da escala 1, então o crescimento aparece na contagem de quadradinhos por cateto: 3,5 em k = 1, 7,1 em k = 2 e 10,6 em k = 3. A mesma forma com mais quadradinhos mostra a semelhança, e a escala da tela não pula.
- Na aula, só o p1 recebeu `"janela": "k"`.
- **Tentativa descartada:** um `fantasma` de k = 1 aninhado dentro do triângulo. Em k = 3 ele ficava quase todo sob o chip `45°`, e em k = 2 virava uma linha tracejada fraca. Tirei e desfiz a troca de ordem de desenho que tinha feito para ele.
- **Depois:** em k = 1 o triângulo ocupa a grade, com o mesmo layout de chips já aceito no p2 (`HIP 5`, `CO 3,5`, `CA 3,5`, `45°`). Em k = 2 e k = 3 tem o mesmo tamanho na tela, com a malha mais densa.
- **Conferência de que nada mais mudou:**
  - `trigonometria-no-triangulo-retangulo` p2–p5 só diferem no mascote; o p5 deu igual até no PNG.
  - Nenhuma outra aula usa `janela`. O padrão `k_max` deixa o código igual ao de antes: `kDinamico` e o passo da malha só mudam com `janela: "k"`.

## Testes novos

- `vetores.test.ts`:
  - sem `componentes_de`, os chips seguem o primeiro vetor, sem prefixo;
  - com `componentes_de: "v"`, aparecem as componentes de `v`, com o prefixo `v: `;
  - id inexistente é recusado;
  - o rodapé é igual ao de antes nos 3 casos que não têm Módulo e Soma juntos, e com os dois juntos tem 30 px ou mais entre as linhas.
- `triangulo.test.ts`:
  - o padrão é `k_max`, e a vista não muda com k;
  - com `janela: "k"`, a hipotenusa tem o mesmo tamanho em pixels em k = 1, 2 e 3, e a escala em k = 1 é mais que o dobro da de `k_max`.

## Validação

- Comando: `npx vitest run src/widgets/common/vetores src/widgets/common/triangulo` mais os testes das 9 aulas que usam os widgets (`vetores-no-plano`, `numeros-complexos`, `relacoes-metricas-triangulo-retangulo`, `semelhanca-e-teorema-de-tales`, `teorema-de-pitagoras`, `triangulos-congruencia-e-propriedades`, `triangulos-notaveis-e-construcoes`, `lei-dos-senos-e-cossenos`, `trigonometria-no-triangulo-retangulo`). Resultado: 11 arquivos, 194 testes, todos passaram.
- `npm run lint:content`: "conteúdo ok".
- `npm run typecheck`: sem erros.

## Arquivos

- `src/widgets/common/vetores/params.ts`, `desenho.ts` e `vetores.test.ts`
- `src/widgets/common/triangulo/params.ts`, `desenho.ts` e `triangulo.test.ts`
- `docs/GUIA-CAPITULOS.md`: §5.10, linha `razoes` da tabela e acréscimo de 16/11; §5.17, acréscimos de 16/11
- `content/geometria/geometria-analitica/vetores-no-plano/aula-01.json`: p2
- `content/geometria/trigonometria/trigonometria-no-triangulo-retangulo/aula-01.json`: p1
- `docs/visual/correcoes-b25a.md`
