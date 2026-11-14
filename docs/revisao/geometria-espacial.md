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

## Correções da conferência visual

### Antigravity #4 (`posicoes-relativas-no-espaco`, `prismas-e-paralelepipedos`, `projecoes-cortes-e-planificacoes`, `solidos-de-revolucao`, `troncos-de-solidos`)

- `posicoes-relativas-no-espaco`:
  - `desafio-cubo`: na opção `"Coincidentes"`, `highlight: ["c4"]` (sem efeito visível nas retas `c1`/`c2`) → `planos: ["piso", "teto"], highlight: ["c1", "c2"]` (mostra os dois planos separados). *Widget:* `solido_3d_figura` (`modo: "espaco"`) não possui param para esconder o chip de classificação `"reversas (90°)"`.
  - `fechamento`: token `"r ∩ s = ∅"` → `"r∩s=∅"` (sem espaços, evita quebra em 2 linhas em 400 px).
- `prismas-e-paralelepipedos`:
  - `desafio-prisma`: em `"13 cm³"`, removido `h: 1` (que trocava o bloco) para `a: 5, b: 2, h: 6, camadas: false, highlight: ["c1", "c2"]`; em `"30 cm³"`, trocado para `base: "triangulo", a: 5, b: 2, h: 6, camadas: true, highlight: ["c1"]` (ilustra o prisma triangular de volume `5·2·6/2 = 30`). *Widget:* `Prisma` não possui param para esconder o chip `"V = 60"`.
  - `fechamento`, `definitions` e `glossario`: removidos sublinhados crus (`A_b` → `Ab`, `A_l` → `Al`, `A_t` → `At`); fórmula encurtada para 5 tokens `V = Ab · h` (mantendo `D = √(a² + b² + c²)` na definição).
- `projecoes-cortes-e-planificacoes`:
  - **Caso grave — `desafio-face-oposta` (gabarito alterado: `"Face 3"` → `"Face 6"`):** Prova pelo código de `moldeDado(t)` em `src/widgets/common/solido/cenas.ts` (linhas 612–624): face `1` está na base `(0, 0)`, face `2` em `(0, 2)`, face `5` em `(0, -2)`, face `3` em `(2, 0)`, face `4` em `(-2, 0)` e face `6` (`tampa`) em `(0, -4)` presa à borda de `5`. Ao dobrar `t = 1`, `2` opõe-se a `5`, `3` opõe-se a `4`, e `6` fica paralela no topo, **oposta à `1`** (confirmado também pelo passo 3). Opções refeitas para `Face 6` (correta, `fechar: 1`) e distratores `Face 2`, `Face 3`, `Face 5` (`fechar: 0.5`). *Atenção (teste não editado por regra do briefing):* `src/conteudo/projecoes-cortes-e-planificacoes.test.ts:68` ainda espera `"Face 3"` e precisa ser atualizado para `"Face 6"`.
  - `fechamento`: fórmula encurtada de 9 para 5 tokens (`vistas + cortes + moldes`, `c1`, `c2`, `c3`).
- `solidos-de-revolucao`:
  - **Caso grave — `desafio-revolucao-trapezio`:** a `figure` desenhava `modo: "revolucao", perfil: "trapezio", r: 2, r2: 1, h: 5` (tronco de cone de `V = 11,67π`), contradizendo o enunciado (retângulo `r = 2, h = 2` + triângulo `r = 2, h = 3`, volume `8π + 4π = 12π`). Trocado para `modo: "composicao", montagem: "silo", r: 2, h: 2, hc: 3, juntar: 1` (cilindro + cone exatamente com `V = 12π`). Opções erradas passaram a usar `juntar: 0` (separando cilindro e cone) + `highlight` em `c2` ou `c1`. *Widget:* `Composicao` não possui param para esconder o chip `V = 12π`.
  - `fechamento`: fórmula encurtada para 5 tokens curtos `Perfil + giro ⇒ sólido` (`c2`, `c1`, `c4`).
- `troncos-de-solidos`:
  - **Caso grave — passo 3 `trapezio-meridiano`:** a fala descrevia `R = 6, r = 2` (`R − r = 4`), `h = 3` e `g = 5`, mas `params` tinha `H: 10, corte: 5` (dando `r = 3, R − r = 3, h_t = 5, g ≈ 5,83`). Prova dos novos `params`: com `R = 6, H = 4.5, corte = 1.5`, por semelhança `k = 1.5 / 4.5 = 1/3`, logo `r = (1/3)·6 = 2`, `R − r = 4`, altura do tronco `h_t = 4.5 − 1.5 = 3` e geratriz `g = √(3² + 4²) = 5`. Removidos sublinhados crus (`h_t`, `g_t` → `altura 3`, `g`).
  - `desafio-tronco`: adicionados `meridiano: true` (`40 cm³`, `20 cm³`) e `separar: 1` (`70 cm³`) nas figuras de erro. *Widget:* `Tronco` não possui param para esconder os chips `k = 0,5` / `volume ×0,125`.
  - `glossario`, `definitions` e `fechamento`: removidos sublinhados crus (`h_menor`, `A_m`, `A_M`, `V_m`, `V_t`, `V_tronco`, `g_t`) e fórmula encurtada para `V = k³ · Vt` (`c3`, `c4`).

### Antigravity (Gemini 4 Hydrogen) (`areas-e-volumes-por-composicao`, `cilindros`, `esferas`, `piramides`, `poliedros-e-relacao-de-euler`)

- `areas-e-volumes-por-composicao`:
  - Passo 3 (`cavar-diminui-volume-aumenta-area`): `done` ajustado para remover números (`9π`, `15π`) não mostrados na cena.
  - `desafio-volume-silo`: figuras de erro alteradas para mudanças visíveis distintas — `v72p` (`hc: 9`), `v45p` (`modo: "cilindro", r: 3, h: 5`), `v36p` (`montagem: "cavidade"`). *Widget:* `Composicao` não possui param para esconder o chip de volume.
  - `fechamento`: fórmula encurtada para 6 tokens curtos (`V = V₁ ± V₂ ; A: casca`).
  - Teste e lint: `areas-e-volumes-por-composicao.test.ts` (18/18) e `npm run lint:content` ok.
- `cilindros`:
  - `desafio-cilindro`: figuras de erro alteradas para mudanças visíveis distintas — `v15p` (`modo: "revolucao", perfil: "triangulo", r: 3, h: 5`), `v30p` (`desenrolar: 1`), `v225p` (`h: 25`). *Widget:* `Cilindro` não possui param para esconder o chip de volume.
  - `fechamento`, `definitions` e `treino`: removidos sublinhados crus (`A_l`, `A_b` → `Al`, `Ab`) e fórmula encurtada para 5 tokens (`Al = 2π r h ; V = πr²h`).
  - Teste e lint: `cilindros.test.ts` (10/10) e `npm run lint:content` ok.
- `esferas`:
  - Passo 2 (`quatro-circulos-maximos`): `done` alinhado à cena da esfera inscrita no cilindro.
  - `desafio-esfera`: figuras de erro alteradas para mudanças visíveis distintas — `av12` (`corte: 1.5`), `av108` (`no_cilindro: true`); `av9` mantida com `corte: 0`. *Widget:* `Esfera` não possui param para esconder o chip de área/volume.
  - `fechamento` e `treino`: removidos sublinhados crus (`V_esfera / V_cilindro`, `V_cil` → `V(esfera) / V(cilindro)`, `V(cilindro)`) e fórmula encurtada para 5 tokens (`r² + d² = R² ; A = 4πR²`).
  - Teste e lint: `esferas.test.ts` (10/10) e `npm run lint:content` ok.
- `piramides`:
  - `desafio-piramide`: figuras de erro alteradas para mudanças visíveis distintas — `v144` (`dividir: 1`), `v60` (`abrir: 1`); `v24` mantida com `h: 2`. *Widget:* `Piramide` não possui param para esconder o chip de volume.
  - `glossario`, `steps`, `fechamento` e `treino`: removidos sublinhados crus (`a_p`, `A_b`, `A_t` → `ap`, `Ab`, `At`), exceto os dois rótulos do `treino` (`qual-altura-na-face` e `triangulo-interno-pitagoras`) que o teste `piramides.test.ts` exige exatamente como `"O apótema da pirâmide (a_p)"`; fórmula do `fechamento` encurtada para 5 tokens (`ap² = h² + m² ; V = Ab·h/3`).
  - Teste e lint: `piramides.test.ts` (10/10) e `npm run lint:content` ok.
- `poliedros-e-relacao-de-euler`:
  - `desafio-euler`: figuras de erro alteradas para mudanças visíveis distintas — `v4` (`solidos: ["tetraedro"]`), `v18` (`soltar: 1`), `v22` (`solidos: ["dodecaedro"]`). *Widget:* `Poliedro` não possui param para esconder o chip de contagem `V, A, F`.
  - Teste e lint: `poliedros-e-relacao-de-euler.test.ts` (18/18) e `npm run lint:content` ok.

