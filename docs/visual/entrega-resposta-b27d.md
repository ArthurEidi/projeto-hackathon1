# Conferência B27d — figura que entrega a resposta (aritmética e álgebra, 16/11/2026)

Levantamento dos **62 capítulos** de `content/aritmetica/**` e `content/algebra/**` (**211** passos `interactive_canvas` e **62** `micro_challenge`; total de **273 passos** conferidos). Nenhuma aula ou widget foi alterado.

Método: captura do estado inicial de todos os 273 passos em `400 × 860` (`C:\Users\mkf10\projetos\capturas-b27d`) e comparação entre `lines.intro` / `prompt` / alternativa certa e os chips, rótulos, trechos ou marcadores visíveis na tela antes de o aluno agir.

## Casos encontrados (16 passos)

| slug | passo | o que a fala pergunta | o que a figura já mostra | parâmetro que poderia esconder (ver GUIA §5) |
|---|---|---|---|---|
| `fatorial-e-permutacoes` | p1 (`tres-amigos`) | Quantos podem ocupar a primeira cadeira, e quantos sobram para a segunda? | Os três degraus `3`, `2`, `1` e o chip `3 × 2 × 1 = 6` logo abaixo das caixas vazias (`capturas-b27d/fatorial-e-permutacoes-p1.png`). | `"escada": false` em `grade_resultados` modo `fila` (GUIA §5.4). |
| `fatorial-e-permutacoes` | p3 (`letras-iguais`) | Se os dois O fossem diferentes, seriam 6 ordens; quantas sobram quando eles são iguais? | A lista já agrupada com exatamente **3** ordens (`OVO`, `OOV`, `VOO`) abaixo do botão `IGUAIS SÃO IGUAIS` (`capturas-b27d/fatorial-e-permutacoes-p3.png`). | `"listar": false` em `grade_resultados` modo `fila` (GUIA §5.4). |
| `medidas-de-tendencia-central` | p4 (`par-e-moda`) | Qual valor fica no centro da fila, e qual se repete mais? | O marcador `mediana 6` e o rótulo `moda` sobre as duas notas `5` (`capturas-b27d/medidas-de-tendencia-central-p4.png`). | `"mostrar": { "mediana": false, "moda": false }` em `barras` modo `pontos` (GUIA §5.3). |
| `descontos-acrescimos-e-indices` | p3 (`teste-de-fronteira`) | Após +10% e depois −10%, o preço volta a 100? | A terceira barra `−10%` já exibe `99` no topo (`capturas-b27d/descontos-acrescimos-e-indices-p3.png`). | Sem parâmetro no `barras` modo `categorias` para ocultar o valor acima de uma barra antes do toque (lacuna de widget). |
| `sistemas-numericos-e-divisibilidade` | p3 (`divisores-e-multiplos`) | Qual primeiro total cabe em grupos de 4 e de 6 sem sobras? (a fala também cita `12`) | Ponto azul marcado com o chip `MMC = 12` na reta (`capturas-b27d/sistemas-numericos-e-divisibilidade-p3.png`). | Remover `{"x": 12, "rotulo": "MMC = 12"}` de `pontos` em `reta_numerica` (GUIA §5.2). |
| `soma-da-pg-infinita` | p1 (`caso-neutro`) | Com `a₁ = 8` e `q = 1/2`, o total passa de 16? | A linha tracejada horizontal com o chip `limite 16` (`capturas-b27d/soma-da-pg-infinita-p1.png`). | `"limite": false` em `barras` modo `sequencia` (GUIA §5.3). |
| `divisao-polinomial-e-teorema-do-resto` | p3 (`montar-quociente`) | Qual termo anula `x²` primeiro e qual elimina o `2x` restante? | A reta laranja com o rótulo `Q(x) = x + 2` e a reta `R = 3` já desenhadas (`capturas-b27d/divisao-polinomial-e-teorema-do-resto-p3.png`). | `plano_cartesiano` sem slider ligado às curvas; omitir `Q(x)`/`R` do estado inicial ou usar coeficientes `"$..."` (GUIA §5.1). |
| `equacoes-modulares` | p2 (`dois-lados`) | Para `|x| = 2`, o lado negativo também serve? | Ponto `−2` já destacado em roxo (`c4`) sobre a reta (`capturas-b27d/equacoes-modulares-p2.png`). | Remover `−2` de `pontos` em `reta_numerica` (GUIA §5.2). |
| `inequacoes-primeiro-grau` | p1 (`caso-neutro`) | No caso neutro `x > 0`, zero entra na solução? | Trecho `x > 0` com bolinha aberta em `0` (`capturas-b27d/inequacoes-primeiro-grau-p1.png`). | Omitir `trechos` (e bolinha aberta em `pontos`) no estado inicial de `reta_numerica` (GUIA §5.2). |
| `inequacoes-primeiro-grau` | p2 (`mover-fronteira`) | Em `2x − 2 > 0`, qual lado de 1 serve? | Trecho `x > 1` desenhado à direita de `1` (`capturas-b27d/inequacoes-primeiro-grau-p2.png`). | Omitir `trechos` no estado inicial de `reta_numerica` (GUIA §5.2). |
| `inequacoes-primeiro-grau` | p3 (`espelhar-ordem`) | Agora `−2x + 2 > 0`; o lado válido muda? | Trecho `x < 1` desenhado à esquerda de `1` (`capturas-b27d/inequacoes-primeiro-grau-p3.png`). | Omitir `trechos` no estado inicial de `reta_numerica` (GUIA §5.2). |
| `inequacoes-modulares` | p1 (`caso-neutro`) | No caso neutro `|x| ≤ 0`, o trecho tem largura? | Ponto isolado com rótulo `|x| ≤ 0` em `0` (`capturas-b27d/inequacoes-modulares-p1.png`). | Omitir `trechos` no estado inicial de `reta_numerica` (GUIA §5.2). |
| `inequacoes-modulares` | p2 (`abrir-interior`) | Em `|x| < 2`, a fronteira 2 entra? | Trecho `|x| < 2` com bolinhas abertas em `−2` e `2` (`capturas-b27d/inequacoes-modulares-p2.png`). | Omitir `trechos` (e `aberto: true` em `pontos`) no estado inicial de `reta_numerica` (GUIA §5.2). |
| `inequacoes-modulares` | p3 (`trocar-para-exterior`) | Se pedirmos `|x| ≥ 2`, o centro ainda serve? | Trechos `x ≤ −2` e `x ≥ 2` deixando o centro fora (`capturas-b27d/inequacoes-modulares-p3.png`). | Omitir `trechos` no estado inicial de `reta_numerica` (GUIA §5.2). |
| `inequacoes-produto-quociente` | p1 (`caso-neutro`) | Quando a saída de `x − 1` fica não negativa? | Trecho `x ≥ 1` desenhado sobre a reta (`capturas-b27d/inequacoes-produto-quociente-p1.png`). | Omitir `trechos` no estado inicial de `reta_numerica` (GUIA §5.2). |
| `inequacoes-produto-quociente` | p2 (`produto-de-sinais`) | Se o outro fator for `x + 1`, qual sinal aparece à direita de 1? | Trechos `x ≤ −1` e `x ≥ 1` já destacados (`capturas-b27d/inequacoes-produto-quociente-p2.png`). | Omitir `trechos` no estado inicial de `reta_numerica` (GUIA §5.2). |

*(Observação: nos `62` desafios `micro_challenge`, nenhum apresentou o valor exato da alternativa certa na figura inicial.)*

---

**Total de passos conferidos:** **273** (`211` `interactive_canvas` + `62` `micro_challenge` em `62` capítulos de `content/aritmetica/**` e `content/algebra/**`).
