# Registro B33c — `divisao_polinomial` + `divisao_polinomial_figura`

**Capítulo:** `algebra/polinomios-e-complexos/divisao-polinomial-e-teorema-do-resto`
**Pasta do widget:** `src/widgets/common/divisao/` (`params.ts`, `calc.ts`, `desenho.ts`, `DivisaoWidget.tsx`, `DivisaoFigura.tsx`, `divisao.test.ts`)
**Registro compartilhado:** `src/widgets/common/index.ts` e `src/widgets/common/params.ts`

## O que foi feito por passo

- **Passo 1 (`caso-neutro`):** Trocado `plano_cartesiano` por `divisao_polinomial` (`modo: "constante"`, `coeficientes: [1, 0, -1]`, `d: "$d"`, `fantasma: true`). Mantido `complete_when: { metric: "d", gte: 2 }`.
  - Em `d = 1`: `Q(x) = x² − 1`, `Resto = 0`, curva coincide com `P(x)`.
  - Em `d = 2`: `Q(x) = 0,5x² − 0,5`, `Resto = 0`, curva original `P(x)` permanece em traço fantasma tracejado.
- **Passo 3 (`montar-quociente`):** Trocado `plano_cartesiano` (que usava `antes_de_concluir`) por `divisao_polinomial` (`modo: "chave"`, `coeficientes: [1, 0, -1]`, `r: 2`, `etapa: "$etapa"`). Mantido `complete_when: { metric: "etapa", gte: 2 }`.
  - Em `etapa = 0`: exibe apenas o dividendo `x² + 0x − 1`, o divisor `x − 2` e `Q(x) = ?` (não revela `Q` nem `R` antes da interação).
  - Em `etapa = 1`: retira `−(x² − 2x)` e deixa `2x − 1`; quociente parcial `x + ?`.
  - Em `etapa = 2`: retira `−(2x − 4)` e deixa `R = 3`; quociente `Q(x) = x + 2` e identidade `x² − 1 = (x − 2)(x + 2) + 3`.
- **Passos 2, 4, 5 e 6:** Mantidos com `plano_cartesiano` / `plano_figura`, conforme o roteiro `docs/planos/divisao-polinomial-e-teorema-do-resto.md`.

## Contas conferidas (executadas em `divisao.test.ts` e `divisao-polinomial-e-teorema-do-resto.test.ts`)

- `dividirPorConstante([1, 0, -1], 1)` -> `quociente: [1, 0, -1]`, `resto: 0`, `formatarPolinomio` = `"x² − 1"`.
- `dividirPorConstante([1, 0, -1], 2)` -> `quociente: [0.5, 0, -0.5]`, `resto: 0`, `formatarPolinomio` = `"0,5x² − 0,5"`.
- `dividirLonga([1, 0, -1], 2)`:
  - Etapa 1: `termoQ = 1`, `produto = [1, -2, 0]` (`"x² − 2x"`), `restante = [2, -1]` (`"2x − 1"`).
  - Etapa 2: `termoQ = 2`, `produto = [2, -4]` (`"2x − 4"`), `restante = [3]`.
  - `quociente = [1, 2]` (`"x + 2"`), `resto = 3 === avaliarPolinomio([1, 0, -1], 2)`.
- `dividirLonga([1, 0, -1], 1)` -> `quociente = [1, 1]` (`"x + 1"`), `resto = 0`.
- `dividirLonga([1, 0, 0, -1], 1)` -> `quociente = [1, 1, 1]` (`"x² + x + 1"`), `resto = 0`.
- Validações: `npm run lint:content` ok; `npm run typecheck` sem erros em `divisao/` nem na aula; `npx vitest run src/widgets/common/divisao/divisao.test.ts src/conteudo/divisao-polinomial-e-teorema-do-resto.test.ts` 18/18 passaram.

## Capturas conferidas (`C:\Users\mkf10\projetos\capturas-b33c`)

- `divisao-polinomial-e-teorema-do-resto-p1.png` (inicial, `d = 1`): gráfico, chips e texto sem cortes ou sobreposição em 400 px; botão Continuar desabilitado.
- `divisao-polinomial-e-teorema-do-resto-p1-d=2.png` (concluído, `d = 2`, `scrollWidth 400`): curva fantasma `P(x)` + `Q(x) = 0,5x² − 0,5`, `Resto = 0`, fala de conclusão visível.
- `divisao-polinomial-e-teorema-do-resto-p3.png` (inicial, `etapa = 0`): quadro da chave com `x² + 0x − 1` e `x − 2`, `Q(x) = ?`, resposta não revelada.
- `divisao-polinomial-e-teorema-do-resto-p3-etapa=2.png` (concluído, `etapa = 2`, `scrollWidth 400`): duas retiradas completas, `R = 3`, `Q(x) = x + 2`, identidade final e fala de conclusão visíveis.

## Correção de 19/11

Após a correção de `formatarQuocienteParcial` em `src/widgets/common/divisao/calc.ts` (feita pelo maestro para manter o grau dos termos parciais), as 5 capturas dos passos 1 e 3 foram refeitas em `C:\Users\mkf10\projetos\capturas-b33c` e conferidas visualmente (todas com largura 400 px, sem cortes ou sobreposição):

- `divisao-polinomial-e-teorema-do-resto-p1.png` (inicial, `d = 1`): curva `P(x) = x² − 1`, `Q(x) = x² − 1`, `Resto = 0`, `CONTINUAR` desabilitado.
- `divisao-polinomial-e-teorema-do-resto-p1-d=2.png` (concluído, `d = 2`, `scrollWidth 400`): curva fantasma `P(x)` tracejada + `Q(x) = 0,5x² − 0,5`, `Resto = 0`, identidade `P(x) = 2 · (0,5x² − 0,5) + 0` e fala de conclusão visíveis.
- `divisao-polinomial-e-teorema-do-resto-p3.png` (inicial, `etapa = 0`): `x² + 0x − 1` dividido por `x − 2`, `Q(x) = ?`, `Etapa 0 de 2 — avance o controle`, resposta não revelada.
- `divisao-polinomial-e-teorema-do-resto-p3-etapa=1.png` (`etapa = 1`, `scrollWidth 400`): retirada `−(x² − 2x)`, resto parcial `2x − 1` e quociente parcial corrigido exibindo `x + ?` (antes exibia `1 + ?`).
- `divisao-polinomial-e-teorema-do-resto-p3-etapa=2.png` (concluído, `etapa = 2`, `scrollWidth 400`): segunda retirada `−(2x − 4)`, `R = 3`, `Q(x) = x + 2`, identidade `x² − 1 = (x − 2)(x + 2) + 3` e fala de conclusão visíveis.

---

## Seção pronta para colar no `docs/GUIA-CAPITULOS.md`

```markdown
### 5.x `divisao_polinomial` + `divisao_polinomial_figura` — PRONTOS

Quadro da divisão de polinômios em dois modos: divisão por constante `d ≠ 0` (com mini gráfico da curva fantasma `P(x)` e do quociente `Q(x) = P(x)/d`) e divisão longa por divisor linear `x − r` no método da chave passo a passo. A figura estática (`divisao_polinomial_figura`) recusa `"$slider"`.

- **Modos (`modo`):** `"constante"` | `"chave"`.
- **Parâmetros comuns:**
  - `coeficientes`: lista de 2 a 4 números em ordem decrescente de grau, com `coeficientes[0] !== 0` (padrão `[1, 0, -1]`, isto é, `x² − 1`).
  - `highlight`: marcas `c1..c4` em destaque (padrão `[]`).
- **Modo `"constante"`:**
  - `d`: número ou expressão com slider (padrão `1`; recusa só o zero exato: `0,000000000001` é divisor válido, no schema e na conta).
  - `fantasma`: booleano para exibir `P(x)` original em traço tracejado (padrão `true`).
  - `mostrar_resto`: booleano (padrão `true`). Com `false`, o chip vira "Resto = ?" (muted) e as frases do rodapé não dizem o resto ("Dividir por 1 mantém P(x)", identidade sem "+ 0"). Feito para `antes_de_concluir` (`divisao-polinomial-e-teorema-do-resto` p1).
- **Modo `"chave"`:**
  - `r`: número ou expressão com slider para a raiz do divisor `x − r` (padrão `2`).
  - `etapa`: número ou expressão com slider de `0` até `grau(P)` (padrão `0`).
- **Métricas emitidas:** `d`, `etapa`, `resultado` (1 quando Q e R estão na tela: divisor constante diferente de 0; na chave, `etapa` = grau de P) e `resto`, **só quando `resultado` = 1** (uma meta sobre o resto não conclui com divisor 0 nem na etapa 0 da chave). Para concluir pela leitura do resto, use `{ "metric": "resultado", "gte": 1 }` ou `etapa`.
- **Textos longos:** dividendo, retiradas, restos parciais e identidade encolhem a fonte (até 9 px) para caber na coluna; o chip do divisor e do quociente vira texto sem fundo, encolhido, quando não cabe na coluna. Identidade com resto negativo: "x² − 5 = (x − 2)(x + 2) − 1".
- **Exemplo de JSON:**
```jsonc
{
  "widget": "divisao_polinomial",
  "controls": [
    { "id": "etapa", "label": "Parcela retirada", "min": 0, "max": 2, "step": 1, "initial": 0, "color": "ink" }
  ],
  "params": {
    "modo": "chave",
    "coeficientes": [1, 0, -1],
    "r": 2,
    "etapa": "$etapa"
  },
  "complete_when": { "metric": "etapa", "gte": 2 }
}
```
```jsonc
// p1: o resto só aparece quando o aluno chega a d = 2
"params": { "modo": "constante", "coeficientes": [1, 0, -1], "d": "$d", "fantasma": true },
"antes_de_concluir": { "mostrar_resto": false },
"complete_when": { "metric": "d", "gte": 2 }
```
```

---

## Correções da revisão B35 (19/11, B39b, Claude Code #2)

Fonte: `docs/revisao/codigo-b33-codex.md`, seção `divisao`. Cada teste foi escrito antes da correção e visto falhando com o código antigo (mensagem entre parênteses). Testes em `src/widgets/common/divisao/divisao.test.ts` (bloco "revisão B35: divisao") e `src/conteudo/divisao-polinomial-e-teorema-do-resto.test.ts`. Para ler o que o canvas escreve, criei `src/widgets/common/divisao/gravadorCanvas.ts` (contexto 2D falso que grava texto, extremos horizontais e preenchimentos; mede 0,6 · fonte por caractere). Ele substitui, nesses testes, o mock antigo que dava 40 px a qualquer texto.

| Achado | Teste que prova | Correção |
|---|---|---|
| **Média**: o passo 1 pergunta se aparece resto, mas em d = 1 o chip "Resto = 0" e o rodapé "… e resto 0" já respondem | widget: "Média (resto anunciado cedo)" (falhava: `d = 1: expected [ 'Resto = 0', … ] to deeply equal []`); aula: "caso-neutro (revisão B35)", desenha com `paramsDoPasso(params, antes_de_concluir, false)` em d = 1 e com os params completos em d = 2 (falhava igual) | `params.ts`: `mostrar_resto` (padrão `true`). `desenho.ts`: com `false`, "Resto = ?" em muted, rodapé "Dividir por 1 mantém P(x)" e identidade sem "+ 0". Aula p1: `"antes_de_concluir": { "mostrar_resto": false }`. A meta `d ≥ 2` não depende da chave trocada (o teste confere `d = 2` com os params trocados) |
| **Média**: d = 10⁻¹² passa no schema, mas a conta (`quase(d, 0)`) o trata como zero | "Média (zero exato)": para d em 10⁻¹², −10⁻¹², 2, −2 e 0, `dividirPorConstante(...).valido` = schema aceita (falhava: `d = 1e-12: expected false to be true`); d = −2 dá `[−0,5; 0; 0,5]` = "−0,5x² + 0,5" | `calc.ts`: inválido só com `d === 0` ou não finito, a mesma regra do schema. O 0 dividido por −2 virava −0; agora sai 0 |
| **Média**: uma meta sobre `resto` concluiria com divisor 0 (resto 0) ou na etapa 0 da chave (resto 3 já emitido) | "Média (métrica de resultado)": etapa 0 → `{ d: 0, etapa: 0, resultado: 0 }`, etapa 2 → `{ …, resultado: 1, resto: 3 }`, d = 0 → sem `resto` (falhava: `expected { d: 0, etapa: 0, resto: 3 } to deeply equal { d: 0, etapa: 0, resultado: 0 }`) | `calc.ts` `metricasDivisao`: métrica nova `resultado` e `resto` só com o resultado na tela (`isComplete` dá falso para métrica ausente). Os dois testes antigos de métrica, que exigiam `resto: 3` na etapa 0, foram atualizados. Passos 1 e 3 usam `d` e `etapa`: comportamento igual |
| **Baixa**: coeficientes grandes atravessam a chave e o rodapé | "Baixa (largura)": `[−99, −99, −99, −99]`, r = 2, etapas 0 a 3 e modo constante com d = 7, todo texto dentro de 0..360 px e o dividendo antes da chave (falhava: `expected 229 to be less than or equal to 196`) | `desenho.ts`: `fonteQueCabe` / `notaQueCabe` / `notaEsqQueCabe` encolhem até 9 px para caber na coluna; `etiquetaQueCabe` usa o chip quando cabe e, senão, o texto sem fundo encolhido (com a mesma dica). Ficou de fora: com 8 algarismos por coeficiente nem 9 px cabe. Não limitei os coeficientes no schema para não mudar o contrato; a seção do GUIA diz que o texto encolhe |
| **Baixa** (achei ao testar a largura): resto negativo saía "+ −1485" na identidade | "Baixa (identidade)": `[1, 0, −5]`, r = 2 → "x² − 5 = (x − 2)(x + 2) − 1" (falhava: o texto não existia) | `desenho.ts`: `maisResto` escreve "− 1" ou "+ 3" |

`formatarQuocienteParcial` não mudou (etapa 1 continua "x + ?", ver captura). Validação: `npm run typecheck` ok; `npx vitest run` 132 arquivos, 2114 testes; `npm run lint:content` "conteúdo ok".

Capturas refeitas em 19/11 (`C:\Users\mkf10\projetos\capturas-b33c`, porta 5294, todas abertas e conferidas, `scrollWidth 400`):

- `divisao-polinomial-e-teorema-do-resto-p1.png` (inicial, d = 1): chip "Divisor d = 1", **"Resto = ?"** em cinza, "Q(x) = x² − 1", rodapé "Dividir por 1 mantém P(x)" (sem o resto). Continuar desabilitado.
- `divisao-polinomial-e-teorema-do-resto-p1-d=2.png` (concluído): curva fantasma P(x), "Resto = 0" em c4, "Q(x) = 0,5x² − 0,5", "P(x) = 2 · (0,5x² − 0,5) + 0", fala "Não; nos reais, (x²−1)/2 é polinômio e o resto é zero."
- `divisao-polinomial-e-teorema-do-resto-p3.png`, `-p3-etapa=1.png`, `-p3-etapa=2.png`: iguais às de antes ("Q(x) = ?"; "x + ?" com 2x − 1; "R = 3", "Q(x) = x + 2" e "x² − 1 = (x − 2)(x + 2) + 3").
