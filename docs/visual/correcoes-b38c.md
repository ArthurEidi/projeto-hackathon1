# Correções B38c — `unidades-conversoes-e-escalas` (19/11/2026)

Migração dos passos de `content/aritmetica/proporcionalidade/unidades-conversoes-e-escalas/aula-01.json` das adaptações (`geometria_poligono` e `reta_numerica`) para `retangulo_areas` / `retangulo_areas_figura` em `modo: "escala"` (`src/widgets/common/areas/params.ts`, `docs/GUIA-CAPITULOS.md` §5.18), seguindo `docs/planos/unidades-conversoes-e-escalas.md`.

## O que mudou por passo

| Passo | Antes | Depois | Contas e comportamento |
|---|---|---|---|
| **p1** (`caso-neutro`) | `geometria_poligono` (`modo: "malha"`, `b: 2`, `h: 2`, `k: "$k"`) | `retangulo_areas` (`modo: "escala"`, `L: 2`, `k: "$k"`, `highlight: ["c2"]`) | `k = 1`: `Lado = 2`, `Área = 4`, `Lado ×1; área ×1`. `k = 2`: `Lado = 4`, `Área = 16`, `Lado ×2; área ×4` (`2 · 2 = 4`, `4² = 16`). `complete_when: { metric: "k", gte: 2 }` mantido; não entrega a resposta antes de concluir. |
| **p2** (`converter-unidade`) | `reta_numerica` (`0..2`, pontos `2 m`, `20 dm`, `200 cm`, `x: "$e"`) | **Mantido** em `reta_numerica` (versão do `HEAD`) | O modo `unidade: true` do `retangulo_areas` desenha apenas um segmento liso com `2 m = 200 cm` sem mostrar a progressão `2 m → 20 dm → 200 cm` que sustenta *"o número de unidades cresce"*. `reta_numerica` mantém os três marcos visíveis com `complete_when: { metric: "e", gte: 2 }`. |
| **p4** (`conferir-previsao`) | `geometria_poligono_figura` (`b: 2, h: 2, k: 1`) | **Mantido** em `geometria_poligono_figura` | `retangulo_areas_figura` só desenha quadrados (`desenho.ts:87` usa `d.lado × d.lado`). Na opção `micro-erro` (`8`), o feedback diz *"ficou com um retângulo 4 × 2"* e na `usou-k-ao-cubo` (`32`), a figura mostra `8 × 4`. Trocar para `retangulo_areas_figura` impediria mostrar os retângulos `4 × 2` e `8 × 4`, piorando o passo. |
| **p5** (`fechamento`) | `geometria_poligono_figura` (`b: 2, h: 2, k: 2`) | `retangulo_areas_figura` (`modo: "escala"`, `L: 2`, `k: 2`, `highlight: ["c3"]`) | Mostra quadrado `4 × 4` com referência tracejada `2 × 2`, `Lado = 4`, `Área = 16`, `Lado ×2; área ×4`, alinhado ao passo 1 e à fórmula do fechamento. |

## Validação e capturas (`400 × 860`, porta 5298)

- `npx vitest run src/conteudo/unidades-conversoes-e-escalas.test.ts`: **15/15** testes passando.
- `npm run lint:content`: **conteúdo ok**.
- `npm run typecheck`: limpo (código de saída 0).
- Capturas em `C:\Users\mkf10\projetos\capturas-b38c` (todas abertas e conferidas, sem corte nem rolagem lateral em `400 px`):
  - `unidades-conversoes-e-escalas-p1.png` (inicial, `k = 1`) e `unidades-conversoes-e-escalas-p1-k=2.png` (concluído, `k = 2`)
  - `unidades-conversoes-e-escalas-p2.png` (captura anterior com `retangulo_areas`, recusada na auditoria; passo revertido para `reta_numerica` do `HEAD`)
  - `unidades-conversoes-e-escalas-p4.png` (inicial do micro-desafio mantido)
  - `unidades-conversoes-e-escalas-p5.png` (fechamento com `retangulo_areas_figura`)
