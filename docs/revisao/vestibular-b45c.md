# Registro B45c — Vestibular de provas oficiais (`algebra/funcoes/`)

**Frente:** B45c (`funcao-modular`, `funcao-racional`, `transformacoes-graficos-de-funcoes`)
**Pasta das provas oficiais:** `C:\Users\mkf10\projetos\provas-oficiais\`

## Candidatas analisadas

| Aula | Candidata (banca/ano/nº, página) | Gabarito | Sua conta | Nível ok? | Veredito |
|---|---|---|---|---|---|
| `transformacoes-graficos-de-funcoes` | UFRGS 2025, 1º dia, Q71 (p. 37) | D (`g(x) = −3f(x) + 3`) | `f(x) = \|x\|` em `[−3, 3]`; reflexão no eixo `x`, escala `3` e `+3` vertical dão `g(0) = 3`, `g(±1) = 0`, `g(±3) = −6` | Sim (exatamente `g(x) = a·f(b(x − h)) + k`) | **aprovada, inserida** (`ufrgs-2025-grafico-v`) |
| `transformacoes-graficos-de-funcoes` | Unicamp 2023, 1ª fase, Q46 (p. 42) | B | `f(0) = √2/2`, `g(0) = 0`, `h(0) = −√2/2`, `p(0) = 1` | Não (usa `sen` e `cos`; roteiro exclui trigonométricas) | recusada (tema) |
| `funcao-modular` | Nenhuma candidata nova (UFRGS 2022 Q57 e Unicamp 2025 Q52 já usadas na B42; ITA 2017 Q9 fora do recorte) | — | — | — | **vazia** (6 bancas consultadas) |
| `funcao-racional` | Nenhuma candidata encontrada | — | — | — | **vazia** (6 bancas consultadas) |

## URLs testadas

- `https://www.ufrgs.br/coperse/wp-content/uploads/2024/12/Prova-1o-DIA.pdf` — HTTP 200, `4902377` bytes (igual ao arquivo local `ufrgs-2025-1dia\prova.pdf`).
- `https://vestibular.ufrgs.br/cv2025/gabaritos/` — HTTP 200, `50950` bytes (igual ao arquivo local `ufrgs-2025-1dia\gabarito.html`).

## O que entrou

- **`transformacoes-graficos-de-funcoes`:** inserida `ufrgs-2025-grafico-v` (UFRGS 2025, 1º dia, Q71) em `content/algebra/funcoes/transformacoes-graficos-de-funcoes/aula-01.json`, com descrição completa em texto dos dois gráficos em V e feedback diagnóstico para cada alternativa errada (`A`, `B`, `C`, `E`). Atualizados `docs/planos/transformacoes-graficos-de-funcoes.md` e `src/conteudo/transformacoes-graficos-de-funcoes.test.ts`.
- **`funcao-modular` e `funcao-racional`:** permanecem com `treino.vestibular: []` após consulta em 6 bancas oficiais (Fuvest 2016–2025, Unicamp 2019–2026, UFRGS 2019/2022–2025, UFPR 2020/2022–2025, ITA 2008–2026, IME 2023–2026).

## Validação

- `npx vitest run src/conteudo/transformacoes-graficos-de-funcoes.test.ts`
- `npm run lint:content`
- `npm run typecheck`
- `npx vitest run`
