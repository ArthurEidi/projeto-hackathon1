# Correções visuais B25c — `solido` e conteúdo (16/11/2026)

Correções da frente B25c em `src/widgets/common/solido/`, `docs/GUIA-CAPITULOS.md` §5.7 e aulas de geometria espacial. Capturas antes/depois em `400 × 860` (`C:\Users\mkf10\projetos\capturas-b25\{antes,depois}`).

## Alterações por item

| Item | Alvo | O que mudou | Arquivos | Capturas |
|---|---|---|---|---|
| 1 | `prismas-e-paralelepipedos` p3, p5 (`solido_3d` modo `prisma`) | Em `cenaPrisma`, quando `p.diagonal && p.base === "retangulo"`, omite a anotação `{ tipo: "texto", p: cb, s: num(Ab) }` no centro da base (onde passa a diagonal da base e fica `d = 5`). O placar `Ab = 12` no topo permanece inalterado; passos sem `diagonal: true` (como p1) mantêm o texto `12`. Documentado no GUIA §5.7 e testado em `solido.test.ts`. | `src/widgets/common/solido/cenas.ts`, `src/widgets/common/solido/solido.test.ts`, `docs/GUIA-CAPITULOS.md` | `antes/prismas-e-paralelepipedos-p{1,3,5}.png` → `depois/prismas-e-paralelepipedos-p{1,3,5}.png` |
| 2 | `areas-e-volumes-por-composicao` p3 (`cavar-diminui-volume-aumenta-area`) | **Lacuna de widget registrada:** `solido_3d` (`modo: "composicao"`) só exibe volumes no placar (`cilindro 36π`, `cone 12π`) e não possui opção de mostrar áreas (`9π`, `15π`). A fala atual da aula já não cita `9π` nem `15π` e corresponde ao que a figura mostra (cone escavado no cilindro). | — | `antes/areas-e-volumes-por-composicao-p3.png` |
| 3 | `esferas` p2 (`quatro-circulos-maximos`) | **Fala ajustada + lacuna registrada:** `solido_3d` (`modo: "esfera"`, `no_cilindro: true`) mostra a esfera dentro do cilindro circunscrito e `4πR² = 36π`, sem ilustrar 4 círculos máximos ou a sombra `9π`. A fala `intro` foi ajustada para a comparação com a parede lateral do cilindro circunscrito (mantendo a equivalência com os 4 círculos de área `πR²` no `done`). | `content/geometria/geometria-espacial/esferas/aula-01.json` | `antes/esferas-p2.png` → `depois/esferas-p2.png` |

## Validação executada

- `npx vitest run src/widgets/common/solido` + testes das 10 aulas que usam `solido_3d` (`areas-e-volumes-por-composicao`, `cilindros`, `esferas`, `piramides`, `poliedros-e-relacao-de-euler`, `posicoes-relativas-no-espaco`, `prismas-e-paralelepipedos`, `projecoes-cortes-e-planificacoes`, `solidos-de-revolucao`, `troncos-de-solidos`): **11 arquivos, 164/164 testes passaram**.
- `npm run lint:content`: `conteúdo ok`.
- `npm run typecheck`: `tsc --noEmit` passou sem erros.
