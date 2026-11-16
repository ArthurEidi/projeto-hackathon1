# Conferência B27c — figura que entrega a resposta em geometria (16/11/2026)

Escopo: todas as **42 aulas** de `content/geometria/**` (**182 passos** no total: 140 `interactive_canvas` e 42 `micro_challenge`).
Capturas do estado inicial em 400 × 860 gravadas em `C:\Users\mkf10\projetos\capturas-b27c` (`node scripts/captura-aula.mjs`). Nenhuma aula ou widget foi alterado.

## Casos encontrados (9 passos interativos)

| slug | passo | o que a fala pergunta | o que a figura já mostra | parâmetro que poderia esconder (ver GUIA §5) |
|---|---|---|---|---|
| `plano-cartesiano-distancia-e-ponto-medio` | p1 (`mesma-altura`) | "A e B estão na mesma altura: quanto mede AB?" (`Δx = 4`) | Chip rosa `d = 4` no rodapé do plano | `mostrar: { distancia: false }` (`pontos_no_plano`, GUIA §5.14) |
| `reta-equacao-e-inclinacao` | p3 (`corte-no-eixo-y`) | "A reta tem m = 2: anda 1, sobe 2. Toque no ponto em que ela corta o eixo y." (`n = 1`, `y = 2x + 1`) | Bolinha roxa com chip `1` em `(0; 1)` e etiqueta `y = 2x + 1` na reta | Remover `marcar.intercepto` e `label` da curva (`plano_cartesiano`, GUIA §5.1) |
| `esferas` | p2 (`quatro-circulos-maximos`) | "Quanto mede a área da casca?" (`4πR² = 36π`) | Chip roxo `4πR² = 36π` no placar superior esquerdo | `placar: false` (`solido_3d`, GUIA §5.7) |
| `piramides` | p2 (`abrir-paredes`) | "Ao abrir as 4 faces triangulares no chão em volta da base 6 × 6, qual é a altura de cada triângulo?" (`5`) | Chip rosa `5` sobre o apótema da pirâmide | Não há parâmetro só para o valor do apótema (`apotemas: false` oculta o triângulo inteiro; `solido_3d`, GUIA §5.7) |
| `poliedros-e-relacao-de-euler` | p1 (`tetraedro-base`) | "No tetraedro, quanto dá 4 vértices menos 6 arestas mais 4 faces?" (`2`) | Chip roxo `V − A + F = 2` no placar superior | `placar: false` (também oculta `V`, `A`, `F`; não há opção só para `V − A + F = 2` em `solido_3d`, GUIA §5.7) |
| `troncos-de-solidos` | p2 (`volume-escala-k3`) | "Cortamos o cone na metade da altura (k = 0,5). Que fração do volume total você acha que fica na ponta de cima?" (`1/8`) | Chip rosa `volume ×0,125` no placar superior | `placar: false` (também oculta `k` e `área`; `solido_3d`, GUIA §5.7) |
| `poligonos-e-quadrilateros` | p2 (`giro-externo-360`) | "A soma interna cresce com n, mas e a soma dos ângulos EXTERNOS?" (`360°`) | Legenda `soma dos externos = 360° (sempre)` no rodapé | `legenda: false` (`geometria_poligono` modo `poligono`, GUIA §5.12) |
| `triangulos-notaveis-e-construcoes` | p2 (`metade-do-equilatero`) | "Quanto medem a metade da base e a altura?" (`L/2 = 3` e `L√3/2 = 3√3`) | Legenda `h = L · √3 / 2 = 5,2` no rodapé (`5,2 ≈ 3√3`) | `legenda: false` (`geometria_triangulo` modo `notaveis`, GUIA §5.10) |
| `lei-dos-senos-e-cossenos` | p3 (`lei-dos-senos-2r`) | "Suba o ângulo A de 30° até 90°: quanto dá a divisão a / sen A em cada posição?" (`10`) | Legenda `a / sen A = 5 / 0,5 = 10` e `2R = 10` no rodapé | Modo `senos` de `geometria_triangulo` não tem `legenda` (ao contrário de `cossenos` e `notaveis`, GUIA §5.10) |

## Observações

- **Desafios (`micro_challenge`):** todos os **42** desafios de geometria têm figura inicial limpa (nenhum mostra o valor da alternativa certa).
- **`prismas-e-paralelepipedos` p3 (`diagonal-do-bloco`):** já corrigido (captura mostra `Ab = 12`, `V = 144`, `h = 12`, `d = 5`, sem `D = 13`).
- **Total de passos conferidos:** **182 passos** (140 `interactive_canvas` + 42 `micro_challenge`) nas 42 aulas de `content/geometria/**`; **9 achados** (todos em `interactive_canvas`).
