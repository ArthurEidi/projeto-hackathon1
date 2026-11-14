# Entrega: Correções de widgets e UI (14/11 — Antigravity #4)

Referência: `docs/visual/geometria.md` e `C:\Users\User\Hackathon\tarefas\tarefa-14-11-antigravity-4.md`.

## Alterações realizadas

1. **`ciclo_trigonometrico` (`marcos_rad`):**
   - `src/widgets/common/ciclo/calc.ts`: adicionada e exportada `rotuloMarcoRad(r)` para formatar múltiplos de π/12 (tolerância 0,0035 rad) como frações de π (`π/6`, `π/2`, `π`, `2π`) e demais valores com até 2 casas decimais (`fmt(r) + " rad"`), eliminando o arredondamento para inteiro (`0,5` -> `"1 rad"`, `π` -> `"3 rad"`).
   - `src/widgets/common/ciclo/desenho.ts`: `marcos_rad` passou a usar `rotuloMarcoRad(r)`.
   - `src/widgets/common/ciclo/ciclo.test.ts`: teste unitário cobrindo `rotuloMarcoRad`.

2. **`geometria_triangulo` (`angulos` com `externo: true` e `razoes`):**
   - `src/widgets/common/triangulo/calc.ts`: corrigido `externo` no vértice B para `alfa + gama` (soma dos dois internos não adjacentes), substituindo `alfa + beta`.
   - `src/widgets/common/triangulo/desenho.ts` (`dRazoes`): escala máxima `k_max` passa a ser usada somente quando `k` é slider (`typeof p.k === "string"`); com `k` fixo o triângulo ocupa o canvas proporcionalmente a `g.hip`, com margens proporcionais e separação dos rótulos `CO`, `CA` e `HIP`.
   - `src/widgets/common/triangulo/triangulo.test.ts`: asserção de `externo = alfa + gama`, testes de `razoes` com `k` fixo vs `k_max` e legenda da diagonal em `notaveis`.

3. **Legendas com aproximação numérica coerente (`≈` e símbolo exato):**
   - `src/widgets/common/triangulo/desenho.ts` (`notaveis` quadrado): legenda alterada de `d = L · √2 = 5 · 1,41 = 7,07` para `d = L · √2 = 5√2 ≈ 7,07`.
   - `src/widgets/common/circulo/desenho.ts` (`roda` variante `voltas`): legenda alterada para usar `π` e `≈` (`10 voltas → 10 · π ≈ 31,42 m`), removendo o formato `10 · 3,14 = 31,42`.

4. **`geometria_poligono` (`paralelas`) e `geometria_circulo` (`voltas`, `razao`, `fatias`):**
   - `src/widgets/common/poligono/desenho.ts`: em `dParalelas`, caixa horizontal centralizada em `(X1.x + X2.x) / 2` com folga dinâmica para `α = 150°` e `α = 25°`, rótulos `r`, `s`, `t` sempre dentro da vista, `aspectoPoligono` de `paralelas` ajustado de `0.62` para `0.70` e raios/distâncias dos chips reduzidos (`21`/`26` + `18`) para evitar sobreposição em `α = 90°`.
   - `src/widgets/common/circulo/desenho.ts`:
     - `voltas`: `aspectoCirculo` aumentado de `0.5` para `0.68` e espaçamento vertical ajustado para não sobrepor a legenda à barra nem cortar a linha inferior.
     - `razao`: separação vertical das marcas da régua, `π`, barra cinza (`d = 1`) e barra de `C` (`y0 = -2.15`).
     - `fatias` (`disco`): `banda(2)` e `rodape` dividido em 2 linhas (`N setores: base ≈ πr, altura r` e `área ≈ πr · r = πr² = ...π`) para caber em 400 px sem corte lateral.
   - `src/widgets/common/poligono/poligono.test.ts` e `src/widgets/common/circulo/circulo.test.ts`: novos casos de teste adicionados.

5. **`MicroChallenge.tsx` e `ConceptLock.tsx` (`src/steps/MicroChallenge.tsx`, `src/ui/styles.css`):**
   - `src/steps/MicroChallenge.tsx`: aplica `options--texto` quando algum rótulo tem `> 4` caracteres e `options--lista` (1 coluna) quando algum rótulo tem `> 10` caracteres, evitando quebra no meio de palavras como `"Concorrentes"` e `"Perpendiculares"`.
   - `src/ui/styles.css`: adicionada regra `.options--lista` (`grid-template-columns: 1fr`), `flex-wrap: wrap` e `max-width: 100%` em `.formula`, e `white-space: nowrap` em `.formula .btn` e `.formula__op` para quebrar linha apenas entre chips.

## Verificações executadas

- `npx vitest run src/widgets/common/ciclo/ciclo.test.ts src/widgets/common/triangulo/triangulo.test.ts src/widgets/common/poligono/poligono.test.ts src/widgets/common/circulo/circulo.test.ts`: **4 arquivos, 153 testes passaram (153)**.
- `npm run typecheck`: passou sem erros (código de saída 0).
- `npm run lint:content`: passou (`conteúdo ok`).
- Conferência visual headless (Edge `--headless=new --window-size=400,860` em `localhost:5202`) nos passos de:
  - `radianos-e-ciclo-trigonometrico/aula-01?passo=5`
  - `triangulos-congruencia-e-propriedades/aula-01?passo=2`
  - `trigonometria-no-triangulo-retangulo/aula-01?passo=1` e `?passo=2`
  - `angulos-retas-paralelas/aula-01?passo=1`
  - `area-do-circulo-e-setores/aula-01?passo=1`
  - `comprimento-da-circunferencia/aula-01?passo=4`
  - `posicoes-relativas-de-retas/aula-01?passo=5`
  - `identidades-trigonometricas/aula-01?passo=5`

## Observações para o coordenador (sem edições em `content/**`)

- Nenhuma alteração em `content/**` foi necessária para estas correções.

## Ajustes complementares (tarefa 3 — `triangulo/**`)

1. **`geometria_triangulo` (`razoes` com `k` em slider — `src/widgets/common/triangulo/desenho.ts`):**
   - Janela dinâmica no modo `razoes` passou a usar `caMax` e `coMax` baseados no ângulo (em vez de `hipMax` bruto), aumentando o tamanho do triângulo no `k` mínimo mantendo `k_max` dentro da vista.
   - Extraída e exportada `layoutRazoes(...)` para posicionar os 4 chips (`ang`, `ca`, `co`, `hip`) fora do triângulo quando `hipPx < 190` e resolver qualquer interseção entre caixas de chips, mantendo todos dentro dos limites do canvas.
   - `src/widgets/common/triangulo/triangulo.test.ts`: teste unitário verificando `layoutRazoes` para `k` mínimo (`1`) e máximo (`3`) sem interseção entre caixas e dentro do canvas.

2. **`geometria_triangulo` (`angulos` com `externo: true` — `src/widgets/common/triangulo/desenho.ts`):**
   - Alargada a `caixa` quando `p.externo` é verdadeiro (`x0: -4.2, x1: 6.2`) e estendido o prolongamento de `B` até `x = 5.5` para que o chip `50°` à direita de `B` e `e = 140°` tenham margem confortável da borda direita.
   - Mantido o rótulo do ângulo interno `β` em `B` (`40°`) mesmo com `externo: true`.
   - `src/widgets/common/triangulo/triangulo.test.ts`: teste unitário verificando que `40°` e `e = 140°` são desenhados dentro dos limites horizontais do canvas.

3. **Verificações após ajustes:**
   - `npx vitest run src/widgets/common/triangulo/triangulo.test.ts`: **47 testes passaram (47)**.
   - `npm run typecheck`: passou (código 0).
   - `npm run lint:content`: passou (`conteúdo ok`).
   - Screenshots 400 × 860 via `node scripts/captura-aula.mjs 5210 C:/Users/User/Hackathon/capturas/w4` inspecionados em `trigonometria-no-triangulo-retangulo-p1.png`, `trigonometria-no-triangulo-retangulo-p2.png` e `triangulos-congruencia-e-propriedades-p2.png`: sem sobreposição e sem corte.

