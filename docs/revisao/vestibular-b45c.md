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


## Continuação B45c (busca ampliada em PUCRS e UERJ)

- **Novas bancas consultadas:** PUCRS (Medicina Verão 2022 e 2023) e UERJ / Revista Eletrônica do Vestibular (`arquivos/pdf/questao/` 2015–2026, incluindo ABMDPII/CBMERJ 2025). (Unesp/Vunesp e Fatec retornaram HTTP 403; UFSC retornou 502.)
- **`funcao-modular`:** encontrada, aprovada e inserida **UERJ / ABMDPII-CBMERJ 2025, Q22** (`id: uerj-cbmerj-2025-modular`, p. 25–26 de `51.pdf`, gabarito oficial **B** = `8`).
  - URL testada: `https://www.revista.vestibular.uerj.br/arquivos/pdf/questao/51.pdf` — HTTP 200, `3258771` bytes (igual ao arquivo local).
  - Atualizados `content/algebra/funcoes/funcao-modular/aula-01.json`, `docs/planos/funcao-modular.md`, `src/conteudo/funcao-modular.test.ts` e `docs/fontes-candidatas/funcao-modular.md`.
- **`funcao-racional`:** nenhuma questão objetiva encontrada nas 8 bancas consultadas; permanece vazia (`treino.vestibular: []`).

### Encerramento B45c (`funcao-racional`)
- Ampliada a busca para **UEM** (Inverno 2025 `P1.pdf` + `gabdef.pdf`, baixados e varridos — 0 questões de função racional) e verificados os portais oficiais de **UECE**, **UEL**, **UFG**, **UFU**, **UnB/Cebraspe**, **Mackenzie**, **UFMG**, **UFBA** e **UFPE/Covest** (sem caderno objetivo de Matemática acessível em PDF para o tema). Respeitados os bloqueios 403/502 de Vunesp, Fatec e UFSC.
- `funcao-racional` encerrada vazia (`treino.vestibular: []`), com registro completo em `docs/fontes-candidatas/funcao-racional.md`.
