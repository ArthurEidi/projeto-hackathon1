# Correções visuais B24b — apenas conteúdo (16/11/2026)

Correções aplicadas exclusivamente nos arquivos de aula (`content/**`), sem alterações em `src/`, a partir de `docs/visual/pendencias-b19.md`. Capturas antes/depois em `400 × 860` (`C:\Users\mkf10\projetos\capturas-b24\{antes,depois}`).

## Resumo por item

| Item | Capítulo e passo | Ação | Parâmetro / Motivo | Capturas |
|---|---|---|---|---|
| 1 | `piramides` p2 (`abrir-paredes`) | **Corrigido no conteúdo** | Adicionado `"placar": false` em `params` do `solido_3d`. O chip roxo `V = 48` desaparece no passo de área lateral. | `antes/piramides-p2.png` → `depois/piramides-p2.png` |
| 2 | `poligonos-e-quadrilateros` p2 (`giro-externo-360`) | **Corrigido no conteúdo** | Adicionado `"diagonais": false` em `params` do `geometria_poligono` (padrão era `true`). O chip azul `3 triângulos` e as diagonais internas desaparecem no passo de ângulos externos. | `antes/poligonos-e-quadrilateros-p2.png` → `depois/poligonos-e-quadrilateros-p2.png` |
| 3 | `circunferencia-equacao-e-posicoes` p4 (`reta-sobe`) | **Lacuna de widget** | `circunferencia_no_plano` (`src/widgets/common/circunferencia/params.ts` e `desenho.ts`) não possui `mostrar` e `ponto` é obrigatório (padrão `[1, 1]`), desenhando sempre o ponto `P` e o segmento `CP`. Usar `"rotulos": false` esconderia também a equação `x² + y² = 9` e `Secante: 2 pontos`, mantendo `P` visível. Necessita parâmetro no widget para ocultar `P` e o chip `d = ...`. | `antes/circunferencia-equacao-e-posicoes-p4.png` |
| 4a | `angulos-retas-paralelas` p1, p2 (`cruzamento-reto`, `opostos-e-suplementares`) | **Lacuna de widget** | `geometria_poligono` (`modo: "paralelas"`) não tem parâmetro de conteúdo para afastar os quatro chips `90°` centrais em p1 (`α = 90°`) nem para reposicionar o rótulo `t` atrás do chip `60°` em p2. | `antes/angulos-retas-paralelas-p1.png`, `antes/angulos-retas-paralelas-p2.png` |
| 4b | `prismas-e-paralelepipedos` p3, p5 (`diagonal-do-bloco`, `fechamento`) | **Lacuna de widget** | `solido_3d` (`modo: "prisma"`) não tem parâmetro de conteúdo para deslocar o texto `12` (área da base) em relação ao chip `d = 5` na diagonal da base. | `antes/prismas-e-paralelepipedos-p3.png`, `antes/prismas-e-paralelepipedos-p5.png` |

## Validação executada

- `npx vitest run src/conteudo/piramides.test.ts src/conteudo/poligonos-e-quadrilateros.test.ts`: ambos os arquivos de teste passaram após as edições.
- `npm run lint:content`: nenhum erro nos 5 capítulos da B24b (único erro reportado no repositório pertence a `funcoes-trigonometricas`, frente B24a).
