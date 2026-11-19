# Registro B33a — `escala_decimal` + `escala_decimal_figura`

**Capítulo:** `aritmetica/conjuntos/notacao-cientifica-e-ordem-grandeza`
**Pasta do widget:** `src/widgets/common/escala/` (`params.ts`, `calc.ts`, `desenho.ts`, `EscalaWidget.tsx`, `EscalaFigura.tsx`, `escala.test.ts`)
**Registro compartilhado:** `src/widgets/common/index.ts` e `src/widgets/common/params.ts`

## O que foi feito por passo (conferido contra `docs/planos/notacao-cientifica-e-ordem-grandeza.md`)

- **Passo 1 (`caso-neutro`):** `escala_decimal` no modo `"potencia"` (`a: 2`, `n: "$n"`, `n_ref: 0`, `faixa_n: [-2, 2]`), slider `n` de `−2` a `2` (passo `1`, inicial `0`, `c2`), `complete_when: { metric: "n", gte: 1 }`.
  - Em `n = 0`: `2·10⁰ = 2`, algarismo `2` na coluna `U (10⁰)` do quadro de ordens; botão Continuar desabilitado.
  - Em `n = 1`: `2·10¹ = 20` (`2` em `D`, `0` em `U`), referência `ref: 2·10⁰` em `muted`, conclusão alcançada.
  - Em `n = 2`: `2·10² = 200` (`2` em `C`, `0` em `D`, `0` em `U`); a fala de conclusão cobre `n = 1` e `n = 2`.
- **Passo 2 (`normalizar`):** `escala_decimal` no modo `"normalizar"` (`valor: 20`, `n: "$n"`, `n_ref: 0`), slider `n` de `0` a `1` (passo `1`, inicial `0`, `c2`), `complete_when: { metric: "n", gte: 1 }`.
  - Em `n = 0`: `a = 20`, `N = 20`, marcador na zona `≥ 10` (`a = 20 (fora de [1; 10))`), referência `20·10⁰` em `muted`.
  - Em `n = 1`: `a = 2`, `N = 20`, marcador dentro da faixa destacada `1 ≤ a < 10` (`a = 2 (normalizado)`), coluna `D (10¹)` destacada.
  - Observação: `max: 1` no slider garante que `complete_when: n ≥ 1` conclua exatamente em `2·10¹`, mantendo coerência com a fala de conclusão.
- **Passo 3 (`ordem-e-arredondamento`):** `escala_decimal` no modo `"ordem"` (`a: "$a"`, `n: 2`), slider `a` de `2` a `4` (passo `1`, inicial `2`, `c1`), `complete_when: { metric: "a", gte: 4 }`.
  - Régua logarítmica de `10²` a `10³` com linha vertical tracejada no corte `√10 ≈ 3,16`.
  - Em `a = 2`: `200 (2·10²)`, `2 < √10 ⇒ ordem 10²`.
  - Em `a = 3`: `300 (3·10²)`, `3 < √10 ⇒ ordem 10²`.
  - Em `a = 4`: `400 (4·10²)`, `4 ≥ √10 ⇒ ordem 10³`, conclusão alcançada.
- **Passo 4 (`conferir-previsao`):** `micro_challenge` com `escala_decimal_figura`.
  - Estado inicial (`mostrar_notacao: false`, `faixa_n: [0, 3]`): mostra apenas `N = 200`, quadro de ordens (`2`, `0`, `0` sem coluna destacada) e régua neutra `10⁰..10³` com `"Faixa normalizada: 1 ≤ a < 10"`, sem revelar `a`, `n` nem a potência `10²`.
  - Ao verificar `2·10²` (certa): revela `a = 2`, `n = 2`, `N = 200`, destaca `c1` e `c2` e marca `2·10²` na régua.
  - Ao verificar `20·10¹` (errada): muda para o modo `"normalizar"` (`valor: 200`, `n: 1`, `highlight: ["c1"]`), mostrando `a = 20 (fora de [1; 10))`.
  - Demais erradas (`2·10³` e `2·10⁻²`) trocam a figura para `2000` e `0,02` destacando `c2` e `c3`.
- **Passo 5 (`fechamento`):** `concept_lock` com `escala_decimal_figura` (`modo: "potencia"`, `a: 2`, `n: 2`, `n_ref: 0`, `faixa_n: [0, 3]`, `mostrar_notacao: true`, `mostrar_ordem: true`), exibindo `a = 2`, `n = 2`, `N = 200`, quadro de ordens, régua com referência `2·10⁰` e `ordem: 10²`, com contorno de destaque nos chips quando o aluno toca nas marcas `c1..c4` da fórmula.

## Correções feitas na conferência visual (19/11)

1. **`src/widgets/common/escala/desenho.ts` — Passo 4 (resposta antes de concluir):** com `mostrar_notacao: false`, a régua ainda pintava `10²` em `c2` e desenhava o ponto em `10²`. Passou a manter a régua neutra e ocultar o ponto quando `mostrar_notacao: false`.
2. **`src/widgets/common/escala/desenho.ts` — Passo 3 (sobreposição e linha tracejada):** `seg()` redefinia o traço para sólido sem o 6º argumento `[5, 4]`, e o rótulo `300 (3·10²)` / `400 (4·10²)` cruzava a linha vertical do corte `√10`. Passou a usar `[5, 4]` em `seg()` e deslocar o rótulo para a esquerda do corte quando `a < √10` e para a direita quando `a ≥ √10`.
3. **`src/widgets/common/escala/desenho.ts` — Quadro de ordens e `highlight`:** adicionado `ctx.clip()` na caixa arredondada do quadro de ordens para o preenchimento da coluna `C` não vazar nos cantos arredondados; adicionado `destacarChipSeAtivo` para contornar os chips `c1..c4` quando presentes em `highlight`; margem lateral do rótulo de status em `normalizar` ampliada para `96 px`.
4. **`content/aritmetica/conjuntos/notacao-cientifica-e-ordem-grandeza/aula-01.json` — Passo 1 (`lines.intro`):** ajustada a abertura para fazer a pergunta de previsão do roteiro em 2 frases (`"No caso neutro, 2·10⁰ = 2; ao levar n a 1, o valor soma 1 ou multiplica por 10? Arraste n."`).

## Contas conferidas (executadas em `escala.test.ts` e `notacao-cientifica-e-ordem-grandeza.test.ts`)

- Modo `"potencia"`: `valorDe(2, 0) = 2`, `valorDe(2, 1) = 20`, `valorDe(2, 2) = 200`, `valorDe(2, −1) = 0,2`, `valorDe(2, −2) = 0,02`.
- Modo `"normalizar"` (`valor = 20`): `n = 0` → `a = 20`, `normalizado = 0`; `n = 1` → `a = 2`, `normalizado = 1`; `n = 2` → `a = 0,2`, `normalizado = 0`. Fronteiras: `estaNormalizado(1) = true`, `estaNormalizado(9,99) = true`, `estaNormalizado(10) = false`, `estaNormalizado(0,99) = false`.
- Modo `"ordem"` (`n = 2`, corte `√10 ≈ 3,1623`): `a = 2` → `200`, `ordem_exp = 2`; `a = 3` → `300`, `ordem_exp = 2`; `a = √10` → empate sobe (`ordem_exp = 3`); `a = 4` → `400`, `ordem_exp = 3`.
- `quadroOrdens(200)` → `["C:2", "D:0", "U:0", "d:", "c:"]`; `quadroOrdens(0,02)` → `["C:", "D:", "U:0,", "d:0", "c:2"]`; `quadroOrdens(2000)` expande para `UM:2`.
- `EscalaDecimalFigura` recusa `"$slider"` nos 3 modos.
- Validações: `npm run typecheck` ok; `npm run lint:content` (`conteúdo ok`); `npx vitest run` 132 arquivos / 2083 testes aprovados (incluindo 7 em `escala.test.ts` e 6 em `notacao-cientifica-e-ordem-grandeza.test.ts`).

## Capturas conferidas (`C:\Users\mkf10\projetos\capturas-b33a`)

Todas verificadas visualmente em `400 × 860 px`, `scrollWidth 400`, sem cortes nem sobreposição:

- `notacao-cientifica-e-ordem-grandeza-p1.png` (inicial, `n = 0`): `a = 2`, `n = 0`, `N = 2`, `2` em `U (10⁰)`, abertura em pergunta, Continuar desabilitado.
- `notacao-cientifica-e-ordem-grandeza-p1-n=1.png` (concluído, `n = 1`, `scrollWidth 400`): `N = 20`, `ref: 2·10⁰`, `2·10¹` ativo, fala de conclusão visível.
- `notacao-cientifica-e-ordem-grandeza-p1-n=2.png` (concluído, `n = 2`, `scrollWidth 400`): `N = 200`, coluna `C` recortada nos cantos arredondados sem vazamento.
- `notacao-cientifica-e-ordem-grandeza-p2.png` (inicial, `n = 0`): `a = 20 (fora de [1; 10))`, `Referência: 20·10⁰`, Continuar desabilitado.
- `notacao-cientifica-e-ordem-grandeza-p2-n=1.png` (concluído, `n = 1`, `scrollWidth 400`): `a = 2 (normalizado)` dentro da faixa `1 ≤ a < 10`, coluna `D` destacada, fala de conclusão visível.
- `notacao-cientifica-e-ordem-grandeza-p3.png` (inicial, `a = 2`): `200 (2·10²)`, linha tracejada `corte √10 ≈ 3,16`, `2 < √10 ⇒ ordem 10²`.
- `notacao-cientifica-e-ordem-grandeza-p3-a=3.png` (intermediário, `a = 3`, `scrollWidth 400`): `300 (3·10²)` posicionado à esquerda da linha tracejada, sem cruzar o corte.
- `notacao-cientifica-e-ordem-grandeza-p3-a=4.png` (concluído, `a = 4`, `scrollWidth 400`): `400 (4·10²)` posicionado à direita da linha tracejada, `ordem: 10³`, fala de conclusão visível.
- `notacao-cientifica-e-ordem-grandeza-p4.png` (inicial): apenas `N = 200`, quadro de ordens e régua neutra `10⁰..10³`; resposta não revelada.
- `notacao-cientifica-e-ordem-grandeza-p4-2·10²-VERIFICAR.png` (acerto, `scrollWidth 400`): `a = 2` e `n = 2` contornados em destaque, `2·10²` na régua, feedback verde.
- `notacao-cientifica-e-ordem-grandeza-p4-20·10¹-VERIFICAR.png` (erro, `scrollWidth 400`): modo `normalizar` com `a = 20 (fora de [1; 10))`, feedback vermelho.
- `notacao-cientifica-e-ordem-grandeza-p5.png` (`fechamento`): `a = 2`, `n = 2`, `N = 200`, `ordem: 10²`, fórmula tocável e quadro de ordens limpos em 400 px.

---

## Seção pronta para colar no `docs/GUIA-CAPITULOS.md`

```markdown
### 5.x `escala_decimal` + `escala_decimal_figura` — PRONTOS

Quadro de ordens decimais (`C`, `D`, `U`, `d`, `c`, expandindo para `UM` / `m` quando necessário), régua igualmente espaçada de potências de 10, faixa de normalização `1 ≤ a < 10` e régua logarítmica com corte `√10` para ordem de grandeza. A figura estática (`escala_decimal_figura`) recusa `"$slider"`.

- **Modos (`modo`):** `"potencia"` | `"normalizar"` | `"ordem"`.
- **Parâmetro comum:**
  - `highlight`: marcas `c1..c4` em destaque (padrão `[]`).
- **Modo `"potencia"`:**
  - `a`: coeficiente, número ou expressão com slider (padrão `2`).
  - `n`: expoente de 10, número ou expressão com slider (padrão `0`).
  - `n_ref`: expoente de referência em `muted` (`-6..6` ou `null`; padrão `0`).
  - `faixa_n`: tupla `[nMin, nMax]` de inteiros em `-6..6` com `nMin < nMax` (padrão `[-2, 2]`).
  - `mostrar_notacao`: booleano; quando `false`, oculta `a`, `n` e o ponto na régua para não entregar a resposta em desafios (padrão `true`).
  - `mostrar_ordem`: booleano para exibir o chip `ordem: 10ᵏ` no rodapé (padrão `false`).
- **Modo `"normalizar"`:**
  - `valor`: número positivo fixo `N` (padrão `20`).
  - `n`: expoente compensado, número ou expressão com slider (padrão `0`); calcula `a = valor · 10⁻ⁿ`.
  - `n_ref`: expoente de referência em `muted` (`-6..6` ou `null`; padrão `0`).
- **Modo `"ordem"`:**
  - `a`: coeficiente, número ou expressão com slider (padrão `2`).
  - `n`: expoente base inteiro em `-6..6` (padrão `2`); compara `a` com `√10` entre `10ⁿ` e `10ⁿ⁺¹` (empate sobe).
- **Métricas emitidas:** `n`, `a`, `valor`, `normalizado` (`0` ou `1`), `ordem_exp`.
- **Exemplo de JSON:**
```jsonc
{
  "widget": "escala_decimal",
  "controls": [
    { "id": "n", "label": "Expoente de dez", "min": -2, "max": 2, "step": 1, "initial": 0, "color": "c2" }
  ],
  "params": {
    "modo": "potencia",
    "a": 2,
    "n": "$n",
    "n_ref": 0,
    "faixa_n": [-2, 2]
  },
  "complete_when": { "metric": "n", "gte": 1 }
}
```
```

---

## Correções da revisão B35 (19/11)

- **Alta (`calc.ts:76` — `quadroOrdens` truncando extremos `a = 2, n = 4` e `a = 2, n = −4`):**
  - **Teste que prova:** `escala.test.ts` (`"quadroOrdens deriva casas para extremos 20000 (a=2, n=4) e 0,0002 (a=2, n=−4)"`) — falhava antes da correção por retornar `undefined` na coluna `exp = 4` e na coluna `exp = −4`.
  - **Correção:** `quadroOrdens` passou a derivar as posições decimais diretamente da representação exponencial normalizada (`toPrecision(10)` + `toExponential()`), expandindo `maxExp` e `minExp` para conter todos os algarismos do número.
- **Média (`desenho.ts:205` — referência em `normalizar` com `n_ref ≠ 0`):**
  - **Teste que prova:** `escala.test.ts` (`"normalizar calcula o coeficiente de referência para n_ref != 0 (valor=20, n_ref=1 -> 2·10¹)"`) — falhava antes por desenhar `"Referência: 20·10¹"`.
  - **Correção:** `desenharNormalizar` passou a calcular `aRef = valorDe(s.valor, -p.n_ref)` antes de formatar a referência.
- **Média (`desenho.ts:171` — marcador fora de `faixa_n`):**
  - **Teste que prova:** `escala.test.ts` (`"potencia expande o eixo quando n resolvido sai de faixa_n (faixa [-2, 2], n = 3)"`) — falhava antes porque `2·10³` era desenhado sobre a marca `10²`.
  - **Correção:** `desenharPotencia` passou a calcular `nMin = Math.min(p.faixa_n[0], s.n)` e `nMax = Math.max(p.faixa_n[1], s.n)`, expandindo a régua para incluir o expoente resolvido.
- **Baixa (`calc.ts:39` — tolerância em `estaNormalizado`):**
  - **Teste que prova:** `escala.test.ts` (`"estaNormalizado aplica 1 ≤ a < 10 nos vizinhos dos limites"`) — falhava antes por aceitar `0,9999999995` e rejeitar `9,9999999995`.
  - **Correção:** `estaNormalizado` passou a aplicar diretamente `Number.isFinite(a) && a >= 1 && a < 10`.

