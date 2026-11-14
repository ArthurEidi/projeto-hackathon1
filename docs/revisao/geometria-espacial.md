# Revisão de `content/geometria/geometria-espacial`

Critério: segunda passada nos feedbacks de distratores (`treino.faceis`, `medias`, `desafios`), conferência de `steps` (`params` × falas para todo valor que satisfaz `complete_when`) e texto geral (GUIA §2.4).

| slug | erradas conferidas | feedbacks reescritos | passos corrigidos | exemplos |
|---|---:|---:|---:|---|
| areas-e-volumes-por-composicao | 24 | 4 | 0 | `f2` alt. "250 cm³": explicitado `200 + 50 = 250`; `f2` alt. "100 cm³": genérico → `200 − 2·50 = 100`; `d3` alt. "3 cm": genérico → `πr³ = 27π`, `27π / 9π = 3`; `d5` alt. "8π cm³": "passa do trecho" → `(h² − r²)π = (9 − 1)π = 8π`. |
| cilindros | 24 | 2 | 0 | `f3` alt. "h = 4r": genérico → dobrou o diâmetro `2·2r = 4r`; `m3` alt. "6 m": genérico → tirou `√36 = 6` em vez de `36 / 4 = 9`. |
| cones | 35 | 1 | 0 | `d4` alt. "10": genérico ("Como (5√2)² = 50...") → multiplicou `5·2 = 10` da raiz. |
| esferas | 24 | 2 | 1 | Passo `corte-no-equador-e-acima` (`d >= 3`): `done` citava apenas `d = 3, r = 4` → generalizado para `r² + d² = 5²` (`d = 3, r = 4` como exemplo); `m1` alt. "8 cm": explicitado `5 + 3 = 8`; `d4` alt. "4 cm": genérico → pegou o coeficiente `4` da fórmula. |
| piramides | 24 | 0 | 0 | Contas verificadas: `m1` alt. "7 cm" (`3 + 4 = 7`); `m3` alt. "60 cm³" (`(36·5)/3 = 60`); `d1` alt. "84 cm²" (`36 + 4·(6·4)/2 = 84`). |
| poliedros-e-relacao-de-euler | 24 | 2 | 0 | `f4` alt. "7": genérico → somou `4 + 3 = 7`; `d3` alt. "12": genérico → `12` é o total de arestas do cubo original. |
| posicoes-relativas-no-espaco | 28 | 2 | 0 | `d1` alt. "6": genérico → descontou só 2 concorrentes (`11 − 3 − 2 = 6`); `d3` alt. "Um segmento de 0,5 m": genérico → bastão inclinado a `60°` (`1·cos 60° = 0,5`). |
| prismas-e-paralelepipedos | 24 | 1 | 1 | Passo `empilhar-camadas` (`h >= 4`): `done` citava apenas `h = 4` (`12·4 = 48`) → generalizado para qualquer `h >= 4` (`h = 4` como exemplo); `d5` alt. "70 cm³": explicitado `(20 + 15)·2 = 70`. |
| projecoes-cortes-e-planificacoes | 25 | 1 | 0 | `d3` alt. "6": genérico → somou `4 + 2 = 6` em vez de multiplicar `4·2 = 8`. |
| solidos-de-revolucao | 24 | 2 | 1 | Passo `afastar-do-eixo-furo` (`d >= 1`): `done` citava apenas `d = 1` (`40π`) → generalizado para raio interno `d` e externo `2 + d`; `d2` alt. "4π/3 cm³": explicitado uso de `h = 2` (`2·(π·1²·2)/3 = 4π/3`); `d5` alt. "100π cm³": genérico → elevou `d = 5` ao quadrado (`4·π·5² = 100π`). |
| troncos-de-solidos | 25 | 1 | 1 | Passo `corte-na-metade-areas` (`h_menor <= 4`): `done` citava apenas `h' = 4` (`k = 0,5`, área `9`) → generalizado para `k = h'/8` (`h' = 4` como exemplo); `m2` alt. "120 cm³": genérico → dividiu `240 / 2 = 120`. |
| **Total (11 capítulos)** | **281** | **18** | **4** | — |

## Dúvidas não resolvidas

- Em `posicoes-relativas-no-espaco`, a questão `d4` (`planos-perpendiculares-terceiro`: "Elas são paralelas entre si?") possui 2 alternativas ("Não, podem ser secantes" / "Sim, sempre paralelas"). Por ser questão de Sim/Não, foi mantida com 2 alternativas conforme o briefing.
- `cones` não possui arquivo `src/conteudo/cones.test.ts` dedicado (os demais 10 capítulos possuem `src/conteudo/<slug>.test.ts`, todos executados e aprovados).
- `npm run lint:content` passou após todas as edições em `geometria-espacial`, porém na última execução reportou 1 erro pré-existente em outro setor (`content/geometria/trigonometria/lei-dos-senos-e-cossenos/aula-01.json`, fora do escopo deste setor).

## Auditoria do maestro (Claude, Máquina B, 13/11)

Conferidas uma a uma as 18 reescritas e as 4 falas. Todas as contas batem com os rótulos (ex.: sólidos de revolução "4π/3" = 2 · (1/3)π · 1² · 2; Pappus "100π" = 4 · π · 5²; reversas "6" = 11 − 3 − 2). Só uma redação foi melhorada: `cones` alt. "10" → "Você trocou √2 por 2 (5 · 2 = 10)...". `planos-perpendiculares-terceiro` segue com 2 alternativas (Sim/Não), como nos outros pilares.
