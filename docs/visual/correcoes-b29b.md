# Correções B29b — esconder a resposta até concluir (`antes_de_concluir`) em geometria (16/11/2026)

Escopo: os **9 casos** de `docs/visual/entrega-resposta-b27c.md`, mantendo as falas originais e usando `antes_de_concluir` quando o widget possui chave para ocultar apenas a resposta (sem tocar em `src/`).
Capturas antes/depois em `C:\Users\mkf10\projetos\capturas-b29b`.

## 1. Casos corrigidos com `antes_de_concluir` (6 passos)

| slug | passo | `antes_de_concluir` aplicado | métrica de conclusão (`complete_when`) | prova visual (`capturas-b29b`) |
|---|---|---|---|---|
| `plano-cartesiano-distancia-e-ponto-medio` | p1 (`mesma-altura`) | `{"mostrar": {"quadrados": false, "medio": false, "degraus": true, "distancia": false}}` | `dy >= 3` (independe de `mostrar.distancia`) | `plano-cartesiano-p1-antes.png` (sem `d = 4`) → `plano-cartesiano-p1-depois.png` (`d = 5,66` + `CONTINUAR` verde) |
| `reta-equacao-e-inclinacao` | p3 (`corte-no-eixo-y`) | `{"curvas": [{"tipo": "afim", "a": 2, "b": 1, "cor": "c3"}]}` (omite `rotulo: "y = 2x + 1"` até o toque) | `intercepto_tocado >= 1` (`marcar.interceptoY` mantido para o toque) | `reta-p3-antes.png` (sem `y = 2x + 1`) |
| `esferas` | p2 (`quatro-circulos-maximos`) | `{"placar": false}` | `comparar >= 1` (slider) | `esferas-p2.png` (sem `4πR² = 36π`) → `esferas-p2-comparar=1.png` (`4πR² = 36π` + `CONTINUAR` verde) |
| `troncos-de-solidos` | p2 (`volume-escala-k3`) | `{"placar": false}` | `separar >= 100` (slider) | `troncos-de-solidos-p2.png` (sem `volume ×0,125`) → `troncos-de-solidos-p2-separar=100.png` (placar completo + `CONTINUAR` verde) |
| `poligonos-e-quadrilateros` | p2 (`giro-externo-360`) | `{"legenda": false}` | `encolher >= 100` (slider) | `poligonos-e-quadrilateros-p2.png` (sem `soma dos externos = 360°`) → `poligonos-e-quadrilateros-p2-encolher=100.png` (legenda + `CONTINUAR` verde) |
| `triangulos-notaveis-e-construcoes` | p2 (`metade-do-equilatero`) | `{"legenda": false}` | `cortar >= 1` (slider) | `triangulos-notaveis-e-construcoes-p2.png` (sem `h = 5,2`) → `triangulos-notaveis-e-construcoes-p2-cortar=1.png` (`h = 5,2` + `CONTINUAR` verde) |

## 2. Casos sem chave que oculte apenas a resposta (3 passos, não alterados)

- **`piramides` p2 (`abrir-paredes`):** `solido_3d` modo `piramide` tem apenas `apotemas: boolean` (se `false`, oculta o triângulo inteiro com `h = 4` e `3`, não apenas o valor `5` do apótema).
- **`poliedros-e-relacao-de-euler` p1 (`tetraedro-base`):** `placar: false` ocultaria também `V`, `A` e `F`, necessários quando o aluno troca de sólido; não há chave para ocultar só `V − A + F = 2`.
- **`lei-dos-senos-e-cossenos` p3 (`lei-dos-senos-2r`):** `geometria_triangulo` modo `senos` não possui parâmetro `legenda` (nem `mostrar`) para ocultar `a / sen A = 5 / 0,5 = 10` e `2R = 10`.

## Validação

- `npx vitest run` nos 6 capítulos editados (`plano-cartesiano-distancia-e-ponto-medio`, `reta-equacao-e-inclinacao`, `esferas`, `troncos-de-solidos`, `poligonos-e-quadrilateros`, `triangulos-notaveis-e-construcoes`): **6 arquivos / 71 testes passando**.
- `npm run lint:content`: `conteúdo ok` (0 erros).
