# Registro B38a — `geometria_poligono` (modo `paralelas`): rótulo `t` e separação dos chips

**Frente:** B38a (`angulos-retas-paralelas` p1 e widget `src/widgets/common/poligono/`)
**Arquivos alterados:** `src/widgets/common/poligono/desenho.ts` e `src/widgets/common/poligono/poligono.test.ts`

## O que mudou no widget

1. **Rótulo `t` (`src/widgets/common/poligono/desenho.ts`, `dParalelas`):**
   - Movida a chamada de `etiqueta(ctx, hits, posT, "t", "ink")` para depois do desenho dos 8 chips de ângulo e dos destaques, garantindo que `t` fique por cima de tudo.
   - Ampliada a borda superior da caixa (`y1: 2.0` em vez de `1.5`) e estendida a ponta superior da transversal `t` até `X1 + 1,65·u`, posicionando `posT` (quando `!p.foco`) na ponta com deslocamento perpendicular de `14 px` para cima/fora do chip vizinho (`r-ne` quando `α ≤ 90°`, `r-nw` quando `α > 90°`).
2. **Separação dos 8 chips em qualquer `α` (`dParalelas`):**
   - Ampliada a faixa do afastamento `dy90` para `Math.abs(g.alfa - 90) <= 35` (antes `< 15`), mantendo os chips centrais (`r-sw`, `r-se`, `s-nw`, `s-ne`) afastados `10 px` em direção à respectiva reta paralela entre `55°` e `125°` e evitando colisão entre `r-sw` e `s-nw` em `α = 60°`, `70°` e `110°`.

## Testes adicionados (`src/widgets/common/poligono/poligono.test.ts`)

- Bloco `paralelas: rótulo t fora dos chips e sem colisão entre chips (B38a)` testando `α` de `30°` a `150°` (passo `10°`, 13 casos):
  - verifica que `t` é desenhado após o último chip de ângulo;
  - verifica que a caixa de `t` não cruza nenhum dos 8 chips;
  - verifica que nenhum dos 8 chips de ângulo se cruza entre si.

## Capturas conferidas (`C:\Users\mkf10\projetos\capturas-b38a`)

- `angulos-retas-paralelas-p1.png` (inicial, `α = 90°`): `t` acima da faixa dos chips `90°`, por cima de tudo, sem tocar nenhum chip; os 8 chips centrais e externos sem encostar.
- `angulos-retas-paralelas-p1-alfa=30.png` (`α = 30°` mínimo, `scrollWidth 400`): `t` fora dos chips (`30°` e `150°`), 8 chips legíveis e separados, fala de conclusão visível.
- `angulos-retas-paralelas-p1-alfa=150.png` (`α = 150°` máximo, `scrollWidth 400`): `t` fora dos chips (`30°` e `150°`), 8 chips legíveis e separados, fala de conclusão visível.

## Validação

- `npm run typecheck`: sem erros.
- `npx vitest run`: todos os testes passaram (incluindo os 68 testes de `src/widgets/common/poligono/poligono.test.ts`).
- `npm run lint:content`: sem erros.
