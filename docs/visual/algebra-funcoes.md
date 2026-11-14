# Conferência visual: álgebra (funções, polinômios e sequências)

Conferência em viewport 400 × 860 (`scripts/captura-aula.mjs`, estado inicial de cada passo).

## Achados

| slug | passo | defeito | tipo | corrigido? |
|---|---|---|---|---|
| `funcao-afim` | `p5` (`achar-raiz`) | Pílula da curva `f(x) = −x + 2` cobria a alça arrastável em `(−2; 4)` | conteúdo | sim (`ponto.x: -2 -> 4`) |
| `funcao-composta-e-inversa` | `p3` (`inversa`) | Chip `(0; 1)` sobreposto ao rótulo `f⁻¹(x) = (x−1)/2` | widget | não |
| `funcao-composta-e-inversa` | `p4`, `p5` | Chip `(1; 3)` sobreposto ao rótulo `y = x` | widget | não |
| `funcao-definida-por-partes` | `p2` (`trocar-trecho`) | Alça arrastável em `(−1; −1)` cobria o rótulo rosa `x` | conteúdo | sim (`ponto.x: -1 -> -2`) |
| `funcao-exponencial` | `p1` | Chip `(0; 1)` cobria o rótulo tracejado `y = 1` | widget | não |
| `funcao-modular` | `p5` (`fechamento`) | Chips de raízes `0,5` e `1,5` se sobrepõem e cobrem o vértice `(1; −1)` | widget | não |
| `funcao-quadratica` | `p3` | Chip `(−1; 4)` cobria o rótulo `f(x) = (x − 1)²` | conteúdo | sim (`ponto.x: -1 -> 0`) |
| `funcao-racional` | `p4` (`desafio-fronteira`) | `marcar.assintota: true` exibia `x = 2` e `y = 1` no desafio que pede as assíntotas | conteúdo | sim (`marcar.assintota: false`) |
| `introducao-a-funcoes` | — | sem achados (5 imagens vistas) | — | — |
| `logaritmos` | `p5` (`fechamento`) | Chip `(8; 3)` cobria `y = log₂(x)` e fórmula/fala exibia `log_b(x)` com sublinhado literal | conteúdo | sim (`ponto.x: 8 -> 4`; `logₐ(x)`, `aʸ`) |
| `transformacoes-graficos-de-funcoes` | `p4` (`desafio-fronteira`) | `marcar.vertice: true` exibia o vértice `(1; 2)` no desafio que pergunta onde vai o vértice | conteúdo | sim (`marcar.vertice: false`) |
| `divisao-polinomial-e-teorema-do-resto` | `p4` (`encontrar-fator`) | Alça arrastável em `(0; −1)` colidia com chips das raízes `−1` e `1` | conteúdo | sim (`ponto.x: 0 -> 2`) |
| `divisao-polinomial-e-teorema-do-resto` | `p5` (`conferir-previsao`) | Figura do desafio marcava `(2; 3)`, entregando a resposta do resto `3` | conteúdo | sim (`ponto` removido da figura) |
| `numeros-complexos` | `p3` | Rótulos `z` e `w` sobrepostos parcialmente no plano | widget | não |
| `numeros-complexos` | `p5` (`conferir-previsao`) | Figura do desafio exibia `Módulo = 5`, entregando a resposta de `3+4i` | conteúdo | sim (`mostrar.modulo: false`) |
| `numeros-complexos` | `p6` (`fechamento`) | Fórmula do `concept_lock` juntava `i ; \|z\|` no mesmo bloco colorido | conteúdo | sim (`i ; ` separado de `\|z\|`) |
| `polinomios` | `p5` (`fechamento`) | Fórmula do `concept_lock` incluía `=` dentro do bloco de `aₙ` | conteúdo | sim (`=` movido para texto neutro) |
| `raizes-polinomiais-e-multiplicidade` | `p1`, `p3` | Chip `(0; −1)` cobria o chip da raiz `1` | widget | não |
| `raizes-polinomiais-e-multiplicidade` | `p5` (`fechamento`) | Fórmula do `concept_lock` tinha prosa longa cortada na borda direita e `=` dentro de `(x − r)` | conteúdo | sim (prosa removida da fórmula e `=` separado) |
| `sequencias-pa-pg` | `p4` (`micro-desafio`) | Figura do desafio mostrava `termos: 5` com barra `a₅ = −4`, entregando a resposta | conteúdo | sim (`termos: 4`) |
| `sequencias-recursivas-e-padroes` | `p4` (`micro-desafio`) | Figura do desafio mostrava barra `a₅ = 5`, entregando a resposta | conteúdo | sim (`a₅` removido de `categorias`) |
| `sequencias-recursivas-e-padroes` | `p5` (`fechamento`) | Subscrito `aₙ₋₁` e `aₙ₋₂` renderiza `₋` próximo a `_` pelo glifo da fonte | widget | não |
| `soma-da-pg-infinita` | `p4` (`micro-desafio`) | Figura do desafio mostrava `limite 16`, entregando a soma infinita | conteúdo | sim (`limite: false`) |
| `somatorios-pa-pg` | `p4` (`micro-desafio`) | Figura do desafio mostrava barra acumulada `S₅ = 40`, entregando a resposta | conteúdo | sim (`acumular: false`) |

## Resumo

- **Capítulos revisados:** 18 (10 de `funcoes`, 4 de `polinomios-e-complexos`, 4 de `sequencias`; todas as capturas abertas e conferidas).
- **Totais:** 23 achados (16 de conteúdo corrigidos e revalidados; 7 de widget registrados).
- **Padrões que se repetem:**
  1. **Figuras de `micro_challenge` entregando a resposta:** marcadores de vértice, assíntota, ponto `(2; 3)`, `Módulo = 5`, `limite 16` ou barra final `a₅`/`S₅` aparecendo diretamente na figura do desafio.
  2. **Colisão de rótulos no `plano_cartesiano` / `plano_figura`:** chips de pontos e raízes sobrepostos a rótulos de curvas (ex.: `y = x`, `y = 1`, `f⁻¹(x)`), tanto por escolha de `ponto.x` inicial (corrigível em conteúdo) quanto pelo posicionamento fixo do widget.
  3. **Tokens do `concept_lock`:** operadores (`=`, `i ; `) agrupados dentro de blocos coloridos ou texto explicativo longo dentro da fórmula causando corte horizontal em viewport estreita.

### 5 achados mais graves

1. `raizes-polinomiais-e-multiplicidade` (`p5`): texto da fórmula cortado na borda direita em 400 px (`Q(r) ≠ 0; m par toca, m ímpa`) (corrigido).
2. `somatorios-pa-pg` (`p4`): barra acumulada `S₅ = 40` visível no desafio que pede `S₅` (corrigido).
3. `soma-da-pg-infinita` (`p4`): selo `limite 16` visível no desafio que pede a soma infinita `8 + 4 + 2 + …` (corrigido).
4. `divisao-polinomial-e-teorema-do-resto` (`p5`) e `numeros-complexos` (`p5`): ponto `(2; 3)` e selo `Módulo = 5` entregando diretamente a resposta do desafio (corrigidos).
5. `funcao-composta-e-inversa` (`p3`, `p4`, `p5`) e `funcao-modular` (`p5`): colisão de chips de ponto e raízes sobre rótulos de curvas e vértice no widget de plano cartesiano (registrados como `widget`).
