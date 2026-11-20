# Correções B44b

As quatro suítes focadas reproduziram dez falhas antes das correções. Os testes de `src/conteudo/` rodaram como parte da suíte completa.

| Item | Regressão reproduzida | Correção |
| --- | --- | --- |
| `escala` | `escala.test.ts` renderiza expoentes 20 e −20. O quadro antigo emitia 23 cabeçalhos. O teste verifica o limite de colunas e marcas, as reticências, a presença do algarismo significativo e os limites do chip de valor. | Até nove colunas contando as reticências, com a janela em torno dos algarismos significativos. Até oito marcas rotuladas, incluindo os extremos. O chip de `N` usa notação científica conforme o espaço e a precisão do valor. |
| `grupos` | `grupos.test.ts` verifica o raio das fichas nos dois eixos para 200 ÷ 200, 200 ÷ 7 e 120 ÷ 1, além da contagem de fichas omitidas. Antes, havia fichas abaixo da área de desenho nos três casos. | O desenho calcula a capacidade da área antes de renderizar, reserva espaço para a sobra e indica a quantidade omitida com `+ k fichas`. |
| `grupos` no modo MMC | `grupos.test.ts` usa `m = 11,5` via slider. Antes, o widget exibiu `MMC = 12`. Também verifica `eh_mmc` para 8, 12 e 24 com `a = 4` e `b = 6`. | O widget valida o valor bruto de `m`, mostra o erro e sobrescreve métricas anteriores com valores inválidos. `eh_mmc` vale 1 para 12 e 0 para 8 e 24. |
| `divisao` | `divisao.test.ts` mede o dividendo e a identidade final com quatro coeficientes de oito algarismos. Em 400 px, o dividendo alcançava x = 270,4 para um limite de 218. A identidade começava em x = −72,7. | A chave e o rodapé usam a largura máxima do Canvas 2D depois de reduzir a fonte. O gravador de canvas registra a largura efetivamente limitada. |
| `grade` | `grade.test.ts` mede os alvos de 20 casas em uma etapa. Antes, contou duas linhas. | O desenho produz quatro linhas de cinco e preserva a ordem e os identificadores das casas. |

O GUIA registra a grade de 20 casas em §5.4, os limites do desenho de escala em §5.21, o tratamento de `m` e a métrica `eh_mmc` em §5.22 e o ajuste de largura da divisão em §5.23.

`npm run typecheck`, `npx vitest run` (132 arquivos, 2.130 testes) e `npm run lint:content` passaram. Para o lint neste ambiente Windows, um preload temporário forneceu o nome de usuário de `USERNAME` quando a consulta de `os.userInfo()` falhou com `ENOMEM` antes da execução do linter.

## Conferência visual da grade

As capturas de `probabilidade-uniao-e-intersecao` p5 em 400 × 860 px estão em `C:/Users/mkf10/projetos/capturas-b44b/antes` e `C:/Users/mkf10/projetos/capturas-b44b/depois`, ambas com o nome `probabilidade-uniao-e-intersecao-p5.png`. O script `scripts/captura-aula.mjs` foi executado a partir de uma cópia temporária com espera maior pelo carregamento da aula e verificação da presença do canvas. Para a captura anterior, o Vite serviu o desenho de `08475d4`. A fonte externa ficou indisponível no ambiente de captura e as duas imagens usaram a fonte de fallback.

O canvas manteve 364 × 218 px nas duas capturas. A figura passou de duas linhas de dez para quatro linhas de cinco, com casas ligeiramente maiores. Os rótulos de 1 a 20 continuam em ordem, as cores dos múltiplos e as listras de 10 e 20 continuam visíveis, e o contador de 20 casas cabe no quadro. O enunciado, as quatro alternativas e o botão Verificar continuam no mesmo lugar. A inspeção dos JSONs das aulas encontrou esse passo como o único com 20 ou mais casas configuradas no modo `casas`.
