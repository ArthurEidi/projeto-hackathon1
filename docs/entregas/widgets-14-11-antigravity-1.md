# Entrega de widgets: `grade_resultados` e `barras` (14-11)

Atualização dos widgets compartilhados `grade_resultados` / `grade_figura` (`src/widgets/common/grade/`) e `barras` / `barras_figura` (`src/widgets/common/barras/`) para resolver os achados visuais da conferência de aritmética (`docs/visual/aritmetica.md`).

## Novo parâmetro em `grade_resultados` + `grade_figura` (§5.4)

| `modo` | Campos principais (acréscimo) | Padrão | Uso |
|---|---|---|---|
| `escada` | `contador` (`boolean`) | `true` | Quando `false`, oculta a pílula inferior com o produto/soma acumulado (ex.: `5 × 4 × 3 × 2 × 1 = 120`) no estado inicial de desafios, mantendo a exibição quando omitido ou `true` (por exemplo no `figure` das alternativas). |
| `colunas` | `contador` (`boolean`) | `true` | Quando `false`, oculta a pílula inferior com o produto/soma acumulado (ex.: `3 × 4 × 2 = 24`) no estado inicial de desafios, mantendo a exibição quando omitido ou `true`. |

Exemplo de JSON (estado inicial sem entregar o resultado):

```json
{
  "widget": "grade_figura",
  "params": {
    "modo": "escada",
    "n": 5,
    "k": 5,
    "contador": false
  }
}
```

## Ajustes visuais incluídos (sem alteração de contrato para capítulos existentes)

- **`grade` (`desenho.ts`):**
  - `casas` em 1D com mais de 10 elementos quebra automaticamente em 2 linhas (`probabilidade-uniao-e-intersecao` p5).
  - `casas` no modo de interseção (`mostrar.inter` + `colunas`) reserva margem direita para a pílula de probabilidade da coluna (`eventos-independentes` p6).
  - `casas` com `regua` e `evento` sem casas destacadas e sem `botoes_evento` não marca mais a fração de `evento` na régua (`probabilidade-espaco-amostral` p1).
  - `arvore` reserva margem direita para títulos de nível (`principio-fundamental-da-contagem` p2), reduz `yBase` para evitar corte da pílula inferior (`eventos-independentes` p4) e exibe rótulos de folhas com fonte reduzida até 7 px em árvores de 3 níveis (`experimentos-binomial-e-repetidos` p3, p6).
  - `caixas` distribui listas com mais de 10 tuplas em 2 colunas à direita (`combinacoes-com-repeticao` p4).
- **`barras` (`desenho.ts`, `BarrasWidget.tsx`):**
  - `BarrasWidget.tsx` desenha o anel de convite de arraste apenas no peso do topo de cada pilha quando há mais de 2 pesos arrastáveis (`medidas-de-tendencia-central` p1).
  - `pontos` ajusta `yViga` para pilhas altas, separa horizontalmente o badge `mediana` do chip `moda` e escalona verticalmente pesos próximos sem sobreposição (`medidas-de-tendencia-central` p1, p3).
  - `fila` desenha as linhas verticais de corte (`Q1`, `Q2`, `Q3`) antes das caixas escuras, evitando cruzar sobre os dígitos (`quartis-percentis-e-boxplot` p2 a p6).
