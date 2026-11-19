# Correção B38b — `probabilidade-espaco-amostral` p5 (`desafio-urna`) no modo `urna`

**Capítulo:** `aritmetica/contagem-probabilidade/probabilidade-espaco-amostral`
**Arquivos alterados:**
- `content/aritmetica/contagem-probabilidade/probabilidade-espaco-amostral/aula-01.json` (passo 5 `desafio-urna`)
- `src/conteudo/probabilidade-espaco-amostral.test.ts`

## O que mudou no passo 5 (`desafio-urna`)

- **Figura inicial (`grade_figura`):** trocada de `modo: "casas"` (`linhas: ["A1","A2","A3","V1","V2"]`, 5 caixas) para `modo: "urna"` com `bolas: [{ rotulo: "A", cor: "c1", quantidade: 3 }, { rotulo: "V", cor: "c3", quantidade: 2 }]`, sem `destaque` (exibe `total: 5` sem revelar `2/5` antes da escolha).
- **Alternativa `a2-3` (`2/3`, errada):** `{ retiradas: 2, destaque: 1 }` — reduz o denominador restante de `5` para `3`, exibindo `2/3 (total: 5̶ → 3)` em coerência com o feedback ("2/3 compara vermelhas só com as azuis. Na probabilidade, o denominador é o total de bolas.").
- **Alternativa `a1-2` (`1/2`, errada):** `{ bolas: [{ rotulo: "A", cor: "c1", quantidade: 1 }, { rotulo: "V", cor: "c3", quantidade: 1 }], destaque: 1 }` — mostra 1 bola de cada cor e `1/2 (total: 2)`, ilustrando o erro de tratar as 2 cores como equiprováveis.
- **Alternativa `a2-5` (`2/5`, certa):** `{ destaque: 1, highlight: ["c3"] }` — destaca o grupo das vermelhas e exibe `2/5 (total: 5)`.
- **Alternativa `a3-5` (`3/5`, errada):** `{ destaque: 0, highlight: ["c1"] }` — destaca o grupo das azuis e exibe `3/5 (total: 5)` em azul (`c1`).

## Contas conferidas

- `totalUrna` na figura inicial: `3 + 2 = 5` bolas (`inicial: 5`, `retiradas: 0`, `restante: 5`).
- Probabilidade de bola vermelha: `2 / 5`.
- Teste `desafio-urna: 2 vermelhas em 5 bolas = 2/5` atualizado em `src/conteudo/probabilidade-espaco-amostral.test.ts` para validar `modo === "urna"`, `destaque === undefined`, `totalUrna(p, {}) === { inicial: 5, retiradas: 0, restante: 5 }` e `bolas` `[3, 2]`.

## Capturas conferidas (`C:\Users\mkf10\projetos\capturas-b38b`, 400 × 860)

- `probabilidade-espaco-amostral-p5.png`: estado inicial com 3 bolas azuis `A`, 2 bolas `V` e chip `total: 5` (sem revelar a fração `2/5`).
- `probabilidade-espaco-amostral-p5-2/3-VERIFICAR.png`: `scrollWidth 400`, chip `2/3 (total: 5̶ → 3)` e feedback de erro.
- `probabilidade-espaco-amostral-p5-1/2-VERIFICAR.png`: `scrollWidth 400`, 1 bola `A` + 1 bola `V`, chip `1/2 (total: 2)` e feedback de erro.
- `probabilidade-espaco-amostral-p5-2/5-VERIFICAR.png`: `scrollWidth 400`, chip `2/5 (total: 5)` e feedback de acerto.
- `probabilidade-espaco-amostral-p5-3/5-VERIFICAR.png`: `scrollWidth 400`, chip `3/5 (total: 5)` em azul (`c1`) e feedback de erro.
