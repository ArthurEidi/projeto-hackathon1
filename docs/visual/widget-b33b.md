# Registro B33b — `grupos_inteiros` + `grupos_inteiros_figura`

**Capítulo:** `aritmetica/conjuntos/sistemas-numericos-e-divisibilidade`
**Pasta do widget:** `src/widgets/common/grupos/` (`params.ts`, `calc.ts`, `desenho.ts`, `GruposWidget.tsx`, `GruposFigura.tsx`, `grupos.test.ts`)
**Registro compartilhado:** `src/widgets/common/index.ts` e `src/widgets/common/params.ts`

## O que foi feito por passo

- **Passo 1 (`caso-neutro`):** Mantido com `reta_numerica`, conforme o roteiro `docs/planos/sistemas-numericos-e-divisibilidade.md`.
- **Passo 2 (`agrupar-unidades`):** Trocado para `grupos_inteiros` (`modo: "divisao"`, `n: 6`, `d: "$d"`, `referencia_d: 1`, `highlight: ["c2"]`). Slider `d` de `1` a `3` (passo `1`, inicial `1`), `complete_when: { metric: "d", gte: 3 }`.
  - Em `d = 1`: 6 grupos de 1 ficha, `q = 6`, `r = 0`, referência `Ref: d = 1 (6 grupos, r = 0)`, identidade `6 = 1·6 + 0`.
  - Em `d = 3`: 2 grupos de 3 fichas, `q = 2`, `r = 0`, identidade `6 = 3·2 + 0`.
- **Passo 3 (`divisores-e-multiplos`):** Trocado para `grupos_inteiros` (`modo: "mmc"`, `m: "$m"`, `a: 4`, `b: 6`, `mostrar_fatores: true`, `mostrar_mmc: true`, `highlight: ["c1"]`, `antes_de_concluir: { mostrar_mmc: false }`). Slider `m` de `4` a `12` (passo `4`, inicial `4`), `complete_when: { metric: "m", gte: 12 }`.
  - Em `m = 4`: `Grupos de 4 (4 = 2²)` dá `q = 1, r = 0`; `Grupos de 6 (6 = 2·3)` dá `q = 0, r = 4`; resposta `MMC = 12` oculta antes de concluir (`grupos 4 e 6` e `Compare as sobras nas duas trilhas`).
  - Em `m = 12`: `q = 3, r = 0` nos grupos de 4 e `q = 2, r = 0` nos grupos de 6; `MMC = 12` e `Sem sobras nas duas trilhas: 12 = 2²·3`.
- **Passo 4 (`fatorar-e-testar`):** Trocado para `grupos_inteiros` (`modo: "fatoracao"`, `n: 12`, `d: "$d"`, `referencia_d: 3`, `highlight: ["c2"]`). Slider `d` de `3` a `5` (passo `1`, inicial `3`), `complete_when: { metric: "d", gte: 5 }`.
  - Em `d = 3`: 4 grupos de 3 fichas à esquerda, árvore `12 → 2 · 6 → 2 · 3` (`12 = 2·2·3`) à direita, `Ref: d = 3 (4 grupos)`, `12 = 3·4 + 0`.
  - Em `d = 5`: 2 grupos de 5 fichas e 2 fichas de sobra (`Sobra: r = 2`), `12 = 5·2 + 2`.
- **Passo 5 (`conferir-previsao`):** Trocado para `grupos_inteiros_figura` (`modo: "divisao"`, `n: 6`, `d: 3`, `mostrar_resto: false`, `highlight: ["c1", "c2"]`).
  - Inicial: exibe `n = 6`, `d = 3`, `q = 2` e legenda `6 fichas em grupos de 3` sem revelar `r = 0`.
  - Opção `0` (certa): `mostrar_resto: true`, `highlight: ["c4"]` — mostra `r = 0` e `6 = 3·2 + 0`.
  - Opção `2`: `mostrar_resto: true`, `highlight: ["c3"]`.
  - Opção `3`: `limite_grupos: 1`, `mostrar_resto: true`, `highlight: ["c1"]` — mostra 1 grupo de 3 e `Sobra: r = 3`, `6 = 3·1 + 3`.
  - Opção `6`: `limite_grupos: 0`, `mostrar_resto: true`, `highlight: ["c1"]`.
- **Passo 6 (`fechamento`):** Trocado para `grupos_inteiros_figura` (`modo: "divisao"`, `n: 6`, `d: 3`, `mostrar_resto: true`, `highlight: ["c1", "c2", "c3", "c4"]`) com a fórmula `n = d · q + r ; 0 ≤ r < d; d | n ⇔ r = 0`.

## Contas conferidas (executadas em `grupos.test.ts` e `sistemas-numericos-e-divisibilidade.test.ts`)

- `dividirInteiros(6, 1)` → `{ n: 6, d: 1, q: 6, r: 0, qTotal: 6, exata: true }`.
- `dividirInteiros(6, 3)` → `{ n: 6, d: 3, q: 2, r: 0, qTotal: 2, exata: true }`.
- `dividirInteiros(6, 3, 1)` → `{ n: 6, d: 3, q: 1, r: 3, qTotal: 2, exata: true }` (simula parada no 1º grupo).
- `dividirInteiros(12, 3)` → `{ n: 12, d: 3, q: 4, r: 0, qTotal: 4, exata: true }`.
- `dividirInteiros(12, 5)` → `{ n: 12, d: 5, q: 2, r: 2, qTotal: 2, exata: false }`.
- `fatorarPrimos(4) = [2, 2]` (`"2²"`), `fatorarPrimos(6) = [2, 3]` (`"2·3"`), `fatorarPrimos(12) = [2, 2, 3]` (`"2²·3"`), `mdc(4, 6) = 2`, `mmc(4, 6) = 12`.
- `metricasGrupos` no modo `"mmc"` (`a = 4, b = 6`): `m = 4` → `resto_a = 0, resto_b = 4, resto = 4`; `m = 8` → `resto_a = 0, resto_b = 2, resto = 2`; `m = 12` → `resto_a = 0, resto_b = 0, resto = 0`.

## Capturas conferidas (`C:\Users\mkf10\projetos\capturas-b33b`)

- `sistemas-numericos-e-divisibilidade-p2.png` e `p2-d=3.png`: chips, 6 fichas, referência `d = 1`, identidade `6 = d·q + r` e fala sem cortes ou sobreposição em 400 px.
- `sistemas-numericos-e-divisibilidade-p3.png` e `p3-m=12.png`: duas trilhas (`Grupos de 4` e `Grupos de 6`), fatorações `4 = 2²` e `6 = 2·3`, `MMC = 12` oculto antes de concluir e visível ao concluir.
- `sistemas-numericos-e-divisibilidade-p4.png` e `p4-d=5.png`: grupos de fichas à esquerda, árvore `12 → 2 · 6 → 2 · 3` à direita, sobra `Sobra: r = 2` destacada em `d = 5`, sem sobreposição em 400 px.
- `sistemas-numericos-e-divisibilidade-p5.png`, `p5-0.png`, `p5-3.png`, `p5-0-VERIFICAR.png` e `p5-3-VERIFICAR.png`: figura inicial não revela `r = 0`; ao verificar `0` destaca `r = 0` e `6 = 3·2 + 0`; ao verificar `3` mostra `q = 1, r = 3` (`6 = 3·1 + 3`).
- `sistemas-numericos-e-divisibilidade-p6.png`: figura com 4 marcas, fórmula `n = d · q + r ; 0 ≤ r < d; d | n ⇔ r = 0`, dica e definições visíveis sem corte lateral.

---

## Seção pronta para colar no `docs/GUIA-CAPITULOS.md`

```markdown
### 5.x `grupos_inteiros` + `grupos_inteiros_figura` — PRONTOS

Organiza `n` fichas em grupos completos de tamanho `d` (quociente `q` e resto `r`), compara duas trilhas de múltiplos para MMC (`modo: "mmc"`), ou combina o agrupamento com a árvore de fatoração prima de `n` (`modo: "fatoracao"`). A figura estática (`grupos_inteiros_figura`) recusa `"$slider"`.

- **Modos (`modo`):** `"divisao"` | `"mmc"` | `"fatoracao"`.
- **Parâmetro comum:** `highlight`: lista de marcas `c1..c4` em destaque (padrão `[]`).
- **Modo `"divisao"`:**
  - `n`: número ou expressão (padrão `6`).
  - `d`: número ou expressão (padrão `3`).
  - `referencia_d`: inteiro `1..12` opcional para mostrar linha de referência em `muted`.
  - `limite_grupos`: inteiro `0..30` opcional para limitar quantos grupos completos são formados (útil em `micro_challenge` para ilustrar erro de parar antes do fim).
  - `mostrar_resto`: booleano para exibir `r` nos chips e na equação (padrão `true`).
- **Modo `"mmc"`:**
  - `m`: número ou expressão para o total comum nas duas trilhas (padrão `4`).
  - `a`, `b`: inteiros `1..12` dos tamanhos dos grupos nas duas trilhas (padrão `4` e `6`).
  - `mostrar_fatores`: booleano para exibir as fatorações primas de `a` e `b` (padrão `true`).
  - `mostrar_mmc`: booleano para exibir o chip e a conclusão do MMC (padrão `true`; use `false` em `antes_de_concluir` para não revelar a resposta antes).
- **Modo `"fatoracao"`:**
  - `n`: número ou expressão (padrão `12`).
  - `d`: número ou expressão (padrão `3`).
  - `referencia_d`: inteiro `1..12` opcional para referência em `muted`.
  - `mostrar_resto`: booleano (padrão `true`).
- **Métricas emitidas:** `n`, `d`, `q`, `resto`, `m` (e no modo `"mmc"`, também `resto_a` e `resto_b`).
- **Exemplo de JSON:**
```jsonc
{
  "widget": "grupos_inteiros",
  "controls": [
    { "id": "d", "label": "Tamanho do grupo", "min": 1, "max": 3, "step": 1, "initial": 1, "color": "c2" }
  ],
  "params": {
    "modo": "divisao",
    "n": 6,
    "d": "$d",
    "referencia_d": 1,
    "highlight": ["c2"]
  },
  "complete_when": { "metric": "d", "gte": 3 }
}
```
```

---

## Correções da revisão B35 (19/11)

- **Alta (`desenho.ts:311, :315` — selo `"MMC = 24"` para `a = 4, b = 6, m = 24`):**
  - **Teste que prova:** `grupos.test.ts` (`"mmc só exibe «MMC = m» quando m == mmc(a, b) (12 sim, 24 não)"`) — falhava antes por desenhar `"MMC = 24"`.
  - **Correção:** `desenharMmc` passou a comparar `m` com `mmc(p.a, p.b)`: exibe `"MMC = m"` somente quando `m === mmc(p.a, p.b)`; para outros múltiplos comuns exibe o selo `"múltiplo comum"` e o rodapé `"Múltiplo comum de a e b (MMC = ...)"`.
- **Média (`calc.ts:17`, `params.ts:16` — `d = −3` virando `1` e `d = 2,5` virando `3`):**
  - **Teste que prova:** `grupos.test.ts` (`"valida d inteiro positivo no schema, em dividirInteiros e no desenho após avaliar expressão"`) — falhava antes por aceitar `d = −3` e `d = 2,5` no schema, arredondar em `dividirInteiros` e desenhar `6 = 1·6 + 0` / `6 = 3·2 + 0`.
  - **Correção:** `params.ts` passou a recusar `n` fora de inteiro `≥ 0` e `d`/`m` fora de inteiro `≥ 1` quando literais; `calc.ts` ganhou `validarDivisao(n, d)` (com `RangeError` em `dividirInteiros` e fallback seguro em `metricasGrupos`); `desenharDivisao` e `desenharFatoracao` validam após avaliar expressões e exibem mensagem de estado inválido em vez de efetuar outra divisão.
- **Média (`desenho.ts:93, :137` — `n = d = 40` estourando caixa e largura de 400 px):**
  - **Teste que prova:** `grupos.test.ts` (`"com n = d = 40 todas as fichas cabem dentro da largura de 368 px"`) — falhava antes com fichas em `x = −173,5` (fora de `[0, 368]`).
  - **Correção:** `desenharGradeGrupos` passou a quebrar as fichas dentro de cada caixa (e da sobra) em múltiplas linhas conforme `colsPorGrupo`, mantendo todas as fichas dentro da caixa e da largura do canvas.
- **Média (`desenho.ts:415` — `fatoracao` com `mostrar_resto: false` ainda escrevia `"12 = 5·2 + 2"`):**
  - **Teste que prova:** `grupos.test.ts` (`"fatoracao com mostrar_resto: false oculta o resto também na identidade do rodapé"`) — falhava antes por desenhar `"12 = 5·2 + 2"`.
  - **Correção:** `desenharFatoracao` passou a aplicar `p.mostrar_resto` também na linha do rodapé (`"12 fichas em grupos de 5"` quando `false`).
- **Baixa (`desenho.ts:414` e `calc.ts:27` — `n = 0` ou `n = 1` imprimia `"1 = "`):**
  - **Teste que prova:** `grupos.test.ts` (`"fatoracao com n = 1 e n = 0 explica que não têm decomposição em fatores primos"`) — falhava antes por desenhar `"0 = "` e `"1 = "`.
  - **Correção:** `desenharFatoracao` passou a tratar `n < 2` explicitamente exibindo `"0 não tem fatoração prima"` / `"1 não tem fatoração prima"`.

