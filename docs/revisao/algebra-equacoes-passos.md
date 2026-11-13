# Revisão de passos e params — algebra/equacoes-e-inequacoes

Conferidos todos os 43 passos `interactive_canvas` e 28 figuras (`micro_challenge` e `concept_lock`) dos 14 capítulos (71 passos no total). Nenhuma curva ou figura tinha parâmetros trocados em relação a `plot2d.ts`; os 7 problemas encontrados eram falas `done` que citavam um único ponto ou valor numérico específico quando o `complete_when` aceitava outros valores de `b` ou `ponto_x`.

| slug | passo | problema | correção |
|---|---|---|---|
| expressoes-algebricas-e-produtos-notaveis | caso-neutro | `done` citava área 4 → 9 (só vale para `b = 1`), mas slider `b` vai de 0 a 3 com `b >= 1` | reescrito `done` em função de `b`: duas faixas `2b`, canto `b²` e área total de 4 para `(2 + b)²` |
| equacoes-exponenciais | caso-neutro | `done` dizia "Sai 4" sem fixar `x = 2`, mas `ponto_x >= 2` aceita `x = 3` ou `4` | explicitado "Em x = 2 sai 4..." |
| equacoes-irracionais | caso-neutro | `done` dizia "Sai 1" sem fixar `x = −1`, mas `ponto_x <= −1` aceita `x < −1` | explicitado "Em x = −1 sai 1..." |
| equacoes-irracionais | rejeitar-sinal | `done` dizia "1 ≠ −1" sem citar `x = −1`, mas `ponto_x <= −1` aceita `x < −1` | explicitado "em x = −1, 1 ≠ −1..." |
| equacoes-logaritmicas | caso-neutro | `done` dizia "Sai 1" sem fixar `x = 2`, mas `ponto_x >= 2` aceita `x > 2` | explicitado "Em x = 2 sai 1..." |
| fatoracao-algebrica | caso-neutro | `done` dizia "Sai 2" sem fixar `x = 2`, mas `ponto_x >= 2` aceita `x > 2` | explicitado "Em x = 2 sai 2..." |
| inequacoes-produto-quociente | produto-de-sinais | `done` citava fatores `1` e `3` sem fixar `x = 2`, mas `ponto_x >= 2` aceita `x > 2` | explicitado "Em x = 2 o produto é positivo..." |
