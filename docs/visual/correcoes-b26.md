# Correções B26 — `solido_3d` e `ciclo_trigonometrico` (16/11/2026, Claude Code #2)

Capturas em 400 × 860 ficam em `C:\Users\mkf10\projetos\capturas-b26\`:

- `antes`: estado anterior às correções. Para o prismas, é a cópia de `capturas-b25\depois`, que é o estado depois da B25c.
- `depois`: estado com as correções.
- `depois-etapa2`: prismas p3 com o slider no fim. Para essa captura, troquei o `initial` da aula para 2 por um momento; o arquivo foi restaurado e conferido com `cmp`.

## 1. `prismas-e-paralelepipedos` p3 (`diagonal-do-bloco`): `D = 13` já aparecia no início

- **Antes:** a fala pergunta "quanto mede a diagonal D que corta o ar?", mas a figura já mostrava `D = 13`. O slider "Destacar Pitágoras" (1..2) não estava ligado a nada da figura.
- **Parâmetro existente:** o `solido_3d` não tinha nenhum que escondesse esse chip. `placar` só controla `Ab`/`V`, e `diagonal` é booleano.
- **Correção:** parâmetro novo, opcional, `rotulo_diagonal` no modo `prisma`. É uma expressão com padrão `1`, que mantém o comportamento de antes.
  - O chip `D = …` só aparece quando o valor é ≥ 1.
  - O segmento da diagonal e os chips `d = 5` e `h = 12` continuam sempre visíveis.
  - Arquivos: `src/widgets/common/solido/params.ts` e `cenas.ts`.
- **Na aula:** só o p3 recebeu `"rotulo_diagonal": "$etapa_pitagoras - 1"`. O slider agora tem função: em 1 o `D` fica escondido, em 2 aparece o `D = 13` junto com a fala de conclusão ("5² + 12² = 169, logo D = 13!"). O p5 (fechamento) continua mostrando `D = 13`.
- **Teste novo** em `solido.test.ts`: sem o parâmetro, `D = 13` aparece; com o slider em 1 não aparece, mas `d = 5` e `h = 12` sim; com o slider em 2 aparece.

## 2. `formulas-de-adicao-e-arco-duplo` p3: chip `sen 0,5` cobrindo o marco `π`

- **Causa:** todos os candidatos de posição do chip colidiam:
  - à direita de P, a coluna das barras;
  - logo à esquerda, o `α`;
  - no 2º quadrante na altura de sen/2, também o `α`;
  - acima de P, o `β`.

  Por isso a fila de rótulos caía no anel de reserva, numa posição sobre o `π`, que estava reservado mas foi o "menos pior".
- **Correção** (`src/widgets/common/ciclo/desenho.ts`): um último candidato antes do anel, no 2º quadrante, meio raio mais longe do eixo. Os casos em que um candidato anterior já servia continuam iguais.
- **Depois:** `sen 0,5` fica no 2º quadrante alto, entre os marcos `π/2` e `π`, sem cobrir o `π` nem o `α`.
- **Teste novo** em `ciclo.test.ts`: com `soma` α = β = 15° (o p3), o chip `sen 0,5` fica afastado do `π` e do `α`. Para provar que o teste pega o defeito, tirei o candidato novo por um momento: o teste falhou (1 falha em 33). Com o candidato de volta, passou (33 de 33).

## Comparação antes/depois (todas as aulas do ciclo e o prismas)

- **O que foi comparado:** pixel a pixel, tolerância de 8 por canal, com o script `pngdiff.mjs` da B25a. Foram 40 capturas:
  - todos os passos das 7 aulas que usam `ciclo_trigonometrico`: equações, fórmulas de adição, funções, identidades, inequações, radianos e seno/cosseno/tangente;
  - todos os passos de `prismas-e-paralelepipedos`.
- **Resultado:**
  - 10 capturas saíram idênticas.
  - 28 só diferem na área do mascote animado (dentro de x 24–90, y 84–215).
  - Só 2 mudam fora dessa área, e são as alvo: `formulas-de-adicao-e-arco-duplo-p3` (chip `sen`) e `prismas-e-paralelepipedos-p3` (chip `D`).

## Validação

- `npx vitest run src/widgets/common/solido src/widgets/common/ciclo` mais os testes das 7 aulas do ciclo e de `prismas-e-paralelepipedos`: 10 arquivos, 155 testes, todos passaram.
- Testes das 10 aulas que usam `solido_3d`: 10 arquivos, 137 testes, todos passaram.
- `npm run lint:content`: "conteúdo ok".
- `npm run typecheck`: terminou com código 0, sem erros.

## Arquivos

- `src/widgets/common/solido/params.ts`, `cenas.ts` e `solido.test.ts`
- `src/widgets/common/ciclo/desenho.ts` e `ciclo.test.ts`
- `docs/GUIA-CAPITULOS.md`: §5.7 (`rotulo_diagonal`) e §5.11 (candidato novo do chip `sen`)
- `content/geometria/geometria-espacial/prismas-e-paralelepipedos/aula-01.json`: p3
- `docs/visual/correcoes-b26.md`

`formulas-de-adicao-e-arco-duplo` não precisou de mudança na aula nem no teste: a correção ficou toda no widget.
