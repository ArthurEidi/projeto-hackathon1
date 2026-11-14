# Revisão de geometria — `content/geometria/geometria-plana`

Critério: segunda passada nos distratores de `treino` (`faceis`, `medias`, `desafios`), conferência de passos interativos (`params × falas` para todo valor que satisfaz `complete_when`) e revisão geral de texto/português.

| slug | erradas conferidas | feedbacks reescritos | passos corrigidos | exemplos |
|---|---|---|---|---|
| angulos-retas-paralelas | 36 | 5 | 1 | `opostos-e-suplementares` done: "O vizinho vale 110°..." → "O vizinho é 180° − α (em 70°, dá 110°)..." (`alfa >= 70`); f3 alt. "30°": genérico → "60° / 2 = 30°"; m1 alt. "65° e 155°": genérico → "90−30+5 = 65° e 180−30+5 = 155°". |
| area-do-circulo-e-setores | 36 | 12 | 0 | f1 alt. "5π cm²": genérico → "π · 5 = 5π sem elevar ao quadrado"; f4 alt. "8π cm²": genérico → "4 · 2 · π = 8π"; m2 alt. "24,5 cm": genérico → "49 / 2 = 24,5 em vez de √49". |
| circunferencia-arcos-e-angulos | 36 | 2 | 2 | `arco-e-central` done: "Mede os mesmos 80°" → "Mede os mesmos α (em 80°, dá 80°)" (`alfa >= 80`); `angulo-inscrito-metade` done: "Vale 60°" → "Vale sempre a metade (em 120°, dá 60°)" (`alfa >= 120`); f2 alt. "75°": genérico → "25° + 50° = 75°"; d3 alt. "30°": genérico → "90° / 3 = 30°". |
| comprimento-da-circunferencia | 36 | 4 | 0 | f2 alt. "314 cm": genérico → "3,14·100 = 314"; m1 alt. "1200 m": genérico → "2·600 = 1200 m (ou r = 40 m)"; d4 alt. "9,42 cm": genérico → "0,15·62,8 = 9,42 cm"; d5 alt. "20 voltas": genérico → "4·5 = 20". |
| perimetro-e-area-de-figuras-planas | 36 | 2 | 1 | `retangulo-malha` done: "São 4 colunas de 3..." → "A área conta as b colunas de h linhas (b·h; em 4×3 dá 12)..." (`b >= 4` não fixa `h`); m3 alt. "1 cm": genérico → "(18 / 9) / 2 = 1"; d5 alt. "6": genérico → "3 + 3 = 6 (ou 12 / 2)". |
| poligonos-e-quadrilateros | 24 | 2 | 0 | f2 alt. "1800°": genérico → "10·180° = 1800°"; f3 alt. "90°": genérico → "290° + 90° = 380°". |
| poligonos-regulares | 24 | 6 | 1 | `atalho-pelo-externo` done: "Vale 180° − 60° = 120°!" → "Vale 180° − 360°/n (em n = 6, 180° − 60° = 120°)!" (`n >= 6`); f1 alt. "30°": genérico → "60° / 2 = 30°"; m3 alt. "35 cm²": genérico → "5 · 7 = 35"; d1 alt. "54°": genérico → "108° / 2 = 54°". |
| relacoes-metricas-triangulo-retangulo | 24 | 5 | 0 | f1 alt. "21 cm": genérico → "3 · 7 = 21"; f1 alt. "4 cm": genérico → "7 − 3 = 4"; m2 alt. "3 cm": genérico → "9 − 6 = 3"; m3 alt. "9 cm": genérico → "6 + 3 = 9". |
| semelhanca-e-teorema-de-tales | 36 | 2 | 1 | `escala-na-paralela` done: "...caem exatamente pela metade" → "...encolhem na mesma razão k (em 0,5, caem pela metade)" (`k <= 0.5`); f2 alt. "6": genérico → "copiou o 6 da primeira transversal"; f4 alt. "24 cm": genérico → "12 · 2 = 24". |
| teorema-de-pitagoras | 36 | 6 | 0 | f1 alt. "1 cm": genérico → "4 − 3 = 1"; f3 alt. "8": genérico → "5 + 3 = 8"; m1 alt. "16 m": genérico → "10 + 6 = 16"; m3 alt. "2 cm": genérico → "5 − 3 = 2"; d2 alt. "12 cm²": genérico → "2 · 6 = 12". |
| transformacoes-isometrias-e-homotetia | 24 | 5 | 0 | f1 alt. "24 cm²": genérico → "12 · 2 = 24"; f2 alt. "8": genérico → "2 · 4 = 8"; m2 alt. "4 cm²": genérico → "32 / 8 = 4"; d3 alt. "4,5": genérico → "9 / 2 = 4,5". |
| triangulos-congruencia-e-propriedades | 36 | 4 | 2 | `angulo-externo` done: "Vale 110°, exatamente 70° + 40°" → "Vale sempre α + 40° (em 70°, dá 110°)" (`alfa >= 70`); `desigualdade-triangular` done: "5 + 2 = 7" → "5 + c ≤ 7" (`c <= 2`); m2 alt. "120°": genérico → "3·40° = 120°"; d3 alt. "140°": genérico → "180° − 80°/2 = 140°". |
| triangulos-notaveis-e-construcoes | 24 | 3 | 0 | m3 alt. "L = 14 cm e A = 196 cm²": genérico → "7·2 = 14"; d1 alt. "12 cm²": genérico → "2·6 = 12"; d5 alt. "12√3 cm²": genérico → "6·2√3 = 12√3". |
| **Total (13 capítulos)** | **408** | **58** | **8** | — |

## Dúvidas não resolvidas

Nenhuma dúvida em aberto. Todos os 13 capítulos passaram no `vitest` específico e no `npm run lint:content`.

## Auditoria do maestro (Claude, Máquina B, 13/11)

Conferidas uma a uma todas as alterações deste setor (cerca de 60 feedbacks e 8 falas), refazendo a conta de cada feedback contra o rótulo. Três feedbacks ainda não descreviam o erro que leva àquela alternativa e foram reescritos:
- `poligonos-regulares` m2 alt. "15": → "Você dividiu 150 por 10 (150 / 10 = 15)..."
- `area-do-circulo-e-setores` pizza alt. "16": → "Você elevou ao quadrado duas vezes (2² = 4 e 4² = 16)..."
- `area-do-circulo-e-setores` área pelo diâmetro alt. "12π": → "usou o diâmetro como raio na fórmula do comprimento (2π · 6 = 12π)..."
As falas de passo generalizadas conferem com os `complete_when`.
