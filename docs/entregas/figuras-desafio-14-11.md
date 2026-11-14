# Figuras de desafio em geometria e trigonometria (14/11)

Auditoria e correção das figuras de `micro_challenge` em `content/geometria/geometria-plana`, `geometria-espacial` e `trigonometria` para que os dados do enunciado continuem visíveis sem entregar a resposta nem a conta pronta.

- **Passos vistos:** 30
- **Já resolvidos (sem edição):** 6
- **Corrigidos só por conteúdo (`params` existente):** 1 (`radianos-e-ciclo-trigonometrico:4`)
- **Corrigidos por parâmetro novo / ajuste de widget:** 23 (incluindo `perimetro-e-area-de-figuras-planas:5`, que já usava `mostrar.area: false`)
- **Pendências:** nenhuma

## Tabela dos 30 passos

| slug | passo | o que entregava | solução | conferido na imagem |
| --- | --- | --- | --- | --- |
| `angulos-retas-paralelas` | 5 | Rodapé com `x = 115°` no modo `paralelas` | Parâmetro novo `legenda: false` em `geometria_poligono` (`paralelas`) | sim (`angulos-retas-paralelas-p5.png`) |
| `area-do-circulo-e-setores` | 4 | Rodapé com `A = 4π` no modo `setor` | Parâmetro novo `legenda: false` em `geometria_circulo` (`setor`) | sim (`area-do-circulo-e-setores-p4.png`) |
| `circunferencia-arcos-e-angulos` | 5 | Rótulo `70°` no ângulo central | Parâmetro novo `mostrar.valor_central: false` em `geometria_circulo` (`arcos`) | sim (`circunferencia-arcos-e-angulos-p5.png`) |
| `comprimento-da-circunferencia` | 5 | Rodapé `C = 2πr = 62,8` no modo `arco` | Parâmetro novo `legenda: false` em `geometria_circulo` (`arco`) | sim (`comprimento-da-circunferencia-p5.png`) |
| `perimetro-e-area-de-figuras-planas` | 5 | Rodapé `A = 15` no modo `malha` mesmo com `mostrar.area: false` | Rodapé do modo `malha` passou a respeitar `mostrar.area: false` em `geometria_poligono` | sim (`perimetro-e-area-de-figuras-planas-p5.png`) |
| `poligonos-e-quadrilateros` | 4 | Rodapé `S = 540°` no modo `poligono` | Parâmetro novo `legenda: false` em `geometria_poligono` (`poligono`) | sim (`poligonos-e-quadrilateros-p4.png`) |
| `poligonos-regulares` | 4 | Rótulos `135°` (interno), `45°` (externo/central) e rodapé no modo `regular` | Parâmetro novo `mostrar: { central: false, externo: false, interno: false, legenda: false }` em `geometria_poligono` (`regular`) | sim (`poligonos-regulares-p4.png`) |
| `relacoes-metricas-triangulo-retangulo` | 4 | Rótulos `h = 6`, `a = 13`, `b` e `c` no modo `metricas` | Parâmetro novo `ocultar: ["a", "b", "c", "h"]` em `geometria_triangulo` (`metricas`) | sim (`relacoes-metricas-triangulo-retangulo-p4.png`) |
| `semelhanca-e-teorema-de-tales` | 5 | Rótulo `9` no segmento pedido e rodapé com a proporção no modo `semelhanca` | Parâmetros novos `incognita: "d2"` e `legenda: false` em `geometria_triangulo` (`semelhanca`) | sim (`semelhanca-e-teorema-de-tales-p5.png`) |
| `teorema-de-pitagoras` | 5 | Rótulo `c = 6` no cateto pedido no modo `pitagoras` | Parâmetro novo `ocultar: ["c"]` em `geometria_triangulo` (`pitagoras`) | sim (`teorema-de-pitagoras-p5.png`) |
| `transformacoes-isometrias-e-homotetia` | 4 | Nada (já mostrava apenas `k = 1`, `área 2 → 2`) | Já resolvido | sim (captura inicial) |
| `triangulos-congruencia-e-propriedades` | 5 | Rótulos `70°` nos ângulos da base no modo `angulos` | Parâmetro novo `ocultar: ["alfa", "beta"]` em `geometria_triangulo` (`angulos`) | sim (`triangulos-congruencia-e-propriedades-p5.png`) |
| `triangulos-notaveis-e-construcoes` | 4 | Rodapé com `5` e `5√3` no modo `notaveis` | Parâmetro novo `legenda: false` em `geometria_triangulo` (`notaveis`) | sim (`triangulos-notaveis-e-construcoes-p4.png`) |
| `areas-e-volumes-por-composicao` | 4 | Placar `cilindro 45π`, `cone 9π`, `45π + 9π = 54π` | Parâmetro novo `placar: false` em `solido_3d` (`composicao`) | sim (`areas-e-volumes-por-composicao-p4.png`) |
| `cilindros` | 4 | Placar `V = 45π` | Parâmetro novo `placar: false` em `solido_3d` (`cilindro`) | sim (`cilindros-p4.png`) |
| `piramides` | 4 | Placar `V = 48` | Parâmetro novo `placar: false` em `solido_3d` (`piramide`) | sim (`piramides-p4.png`) |
| `poliedros-e-relacao-de-euler` | 4 | Placar `V 6`, `V − A + F = 2` | Parâmetro novo `placar: false` em `solido_3d` (`poliedro`) | sim (`poliedros-e-relacao-de-euler-p4.png`) |
| `posicoes-relativas-no-espaco` | 4 | Placar `reversas (90°)` | Parâmetro novo `placar: false` em `solido_3d` (`espaco`) | sim (`posicoes-relativas-no-espaco-p4.png`) |
| `prismas-e-paralelepipedos` | 4 | Placar `Ab = 10`, `V = 60` | Parâmetro novo `placar: false` em `solido_3d` (`prisma`) | sim (`prismas-e-paralelepipedos-p4.png`) |
| `solidos-de-revolucao` | 4 | Placar `cilindro 8π`, `cone 4π`, `8π + 4π = 12π` | Parâmetro novo `placar: false` em `solido_3d` (`composicao`) | sim (`solidos-de-revolucao-p4.png`) |
| `troncos-de-solidos` | 4 | Placar `k = 0,5`, `área ×0,25`, `volume ×0,125` | Parâmetro novo `placar: false` em `solido_3d` (`tronco`) | sim (`troncos-de-solidos-p4.png`) |
| `equacoes-trigonometricas` | 4 | Nada (arcos já sem rótulos `π/6` e `5π/6`) | Já resolvido | sim (captura inicial) |
| `formulas-de-adicao-e-arco-duplo` | 4 | Nada (mostra só `sen 0,6` e `cos 0,8`) | Já resolvido | sim (captura inicial) |
| `funcoes-trigonometricas` | 4 | Rótulo `cos 1` na ponta do gráfico | Parâmetro novo `mostrar.grafico_rotulo: false` em `ciclo_trigonometrico` | sim (`funcoes-trigonometricas-p4.png`) |
| `identidades-trigonometricas` | 4 | Nada (mostra só `sen 0,6`) | Já resolvido | sim (captura inicial) |
| `inequacoes-trigonometricas` | 4 | Nada (ciclo limpo em `0`) | Já resolvido | sim (captura inicial) |
| `lei-dos-senos-e-cossenos` | 4 | Rótulo `a = 7` e rodapé com a lei calculada no modo `cossenos` | Parâmetro novo `mostrar: { a: false, legenda: false }` em `geometria_triangulo` (`cossenos`) | sim (`lei-dos-senos-e-cossenos-p4.png`) |
| `radianos-e-ciclo-trigonometrico` | 4 | Mostrador `θ = 120° = 2π/3` | Conteúdo ajustado com `"unidade": "graus"` (parâmetro existente de `ciclo_trigonometrico`) | sim (`radianos-e-ciclo-trigonometrico-p4.png`) |
| `seno-cosseno-tangente-no-ciclo` | 4 | Nada (mostra só `150°`, `30°`, `210°`, `330°`) | Já resolvido | sim (captura inicial) |
| `trigonometria-no-triangulo-retangulo` | 4 | Rótulos `CO 5` e `CA 8,66` no modo `razoes` | Parâmetro novo `ocultar: ["co", "ca"]` em `geometria_triangulo` (`razoes`) | sim (`trigonometria-no-triangulo-retangulo-p4.png`) |

## Novos parâmetros (formato GUIA §5)

### `geometria_poligono` / `geometria_poligono_figura`

- **`legenda`** (booleano, padrão `true`, modos `poligono` e `paralelas`): exibe o rodapé com a soma/relação calculada. Em desafios de figura, use `legenda: false`.
- **`mostrar`** (objeto, modo `regular`, todos `true` por padrão): `{ central, externo, interno, legenda }` — controla os rótulos dos ângulos central, externo, interno e do rodapé.
- **`mostrar.area`** (booleano, padrão `true`, modo `malha`): agora também oculta o rodapé com o cálculo da área quando `false`.

### `geometria_circulo` / `geometria_circulo_figura`

- **`mostrar.valor_central`** (booleano, padrão `true`, modo `arcos`): controla o rótulo numérico do ângulo central (mantendo o arco desenhado).
- **`legenda`** (booleano, padrão `true`, modos `arco` e `setor`): exibe o rodapé com comprimento (`C = 2πr = ...`) ou área/fração do setor.

### `geometria_triangulo` / `geometria_triangulo_figura`

- **`ocultar`** (array de chaves, padrão `[]`):
  - modo `pitagoras`: `("a" | "b" | "c")[]` — omite o rótulo (e etiqueta da área do quadrado) dos lados indicados.
  - modo `razoes`: `("co" | "ca" | "hip" | "ang")[]` — omite as etiquetas correspondentes.
  - modo `metricas`: `("a" | "b" | "c" | "h" | "m" | "n")[]` — omite as etiquetas correspondentes.
  - modo `angulos`: `("alfa" | "beta" | "gama")[]` — mantém o arco do ângulo marcado sem imprimir o valor em graus.
- **`incognita`** (`"a1" | "a2" | "d1" | "d2"`, opcional, modo `semelhanca`): substitui o valor numérico da peça indicada por `"x"` na figura.
- **`legenda`** (booleano, padrão `true`, modos `semelhanca` e `notaveis`): oculta o rodapé com razões/medidas calculadas quando `false`.
- **`mostrar`** (objeto, modo `cossenos`, padrão `{ a: true, legenda: true }`): controla o rótulo do lado oposto `a` e o rodapé com a lei dos cossenos.

### `ciclo_trigonometrico` / `ciclo_trigonometrico_figura`

- **`mostrar.grafico_rotulo`** (booleano, padrão `true`): controla a etiqueta com o valor (`sen ...` ou `cos ...`) desenhada na ponta do gráfico cartesiano.

### `solido_3d` / `solido_3d_figura`

- **`placar`** (booleano, padrão `true`, todos os modos): exibe o placar superior com volumes, áreas, contagens (`V, A, F`), razões (`k, k², k³`) ou classificação. Use `placar: false` quando o placar entregar a resposta do desafio.
