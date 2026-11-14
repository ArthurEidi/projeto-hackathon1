# Revisão de geometria analítica — `content/geometria/geometria-analitica`

Escopo: 7 capítulos do setor (exceto `reta-equacao-e-inclinacao`, a cargo de outro agente).
Critério: segunda passada nos feedbacks de distratores de `treino` (`faceis`, `medias`, `desafios`) com execução das contas, conferência dos passos interativos (`params` × `complete_when` × falas) e revisão de texto geral.

| slug | erradas conferidas | feedbacks reescritos | passos corrigidos | exemplos |
|---|---|---|---|---|
| `circunferencia-equacao-e-posicoes` | 33 | 7 | 1 | Passo `mover-centro` (`a >= 3`, `max: 4`): `"(3; 0): (x − 3)²..."` → `"(a; 0), como em (x − 3)²..."` (vale para `a = 3` e `a = 4`). `d3` (`raio-por-ponto`) alt. `"x² + y² = 48"`: `"r² = 6² + 8² = 100."` → `"Você multiplicou 6 · 8 = 48 em vez de somar os quadrados: r² = 6² + 8² = 100."`; `f1` (`raio-16`) alt. `"2"`: `"2 seria com r² = 4..."` → `"Você tirou a raiz duas vezes (√16 = 4 e √4 = 2). O raio é 4."`. |
| `elipse` | 36 | 0 | 0 | Contas verificadas: `m1` (`c-de-25-16`) alt. `"1"` (`5 − 4 = 1`); `m3` (`b-por-pitagoras`) alt. `"√136"` (`10² + 6² = 136`); `d5` (`orbita`) alt. `"8"` (`5 + 3 = 8`, afélio). |
| `hiperbole` | 36 | 3 | 0 | `d4` (`qual-e-hiperbole`): alts. `"x² + y² = 1"`, `"x² = 4y"` e `"x²/4 + y² = 1"` não informavam a resposta certa no feedback; reescritos incluindo `"Hipérbole: x² − y² = 1."`. Contas verificadas: `m1` (`c-3-4`) alt. `"√7"` (`√(16 − 9)`); `d2` (`vertical`) alt. `"(0; ±√7)"` (`√(16 − 9)`). |
| `parabola-conica` | 36 | 3 | 0 | `f3` (`ponto-na-curva`) alt. `"2"`: `"x² = 4, então y = 4/4 = 1."` → `"Você repetiu x = 2 (ou dividiu 4 por 2). Como 2² = 4y, y = 4/4 = 1."`; `d4` (`distancia-10`) alt. `"25"`: `"Basta usar a definição..."` → `"25 viria de x = 10 em x² = 4y. Pela definição, y + 1 = 10, logo y = 9."` (e alt. `"11"`: `10 + 1 = 11`). |
| `plano-cartesiano-distancia-e-ponto-medio` | 36 | 5 | 1 | Passo `sinais-somem` (`dx <= -3`): `"(−4)² = 16"` → `"(−3)² = 9"` como exemplo (vale para todo `dx <= -3`). `m2` (`um-dois-quatro-seis`): `"√74"` → `"√89"` (`(1+4)² + (2+6)² = 5² + 8² = 89`, já que `√74` não vinha das coordenadas `(1;2)` e `(4;6)`); `d1` (`achar-b-pelo-medio`): `"(4; 3)"` → `"(2; 3)"` (`M − A = (2; 3)`). |
| `posicoes-relativas-de-retas` | 36 | 0 | 1 | Passo `angulo-reto` (`m2 <= -1`, `min: -3`): `"Com m₂ = −1..."` → `"Quando m₂ = −1, temos m₁ · m₂ = 1 · (−1) = −1 e o ângulo fica reto..."` (vale para `m2 = -1, -2, -3`). Contas verificadas: `f1` alt. `"Perpendiculares"` (`3 · 3 = 9 ≠ −1`); `m2` alt. `"−2"` (`2 · (−2) = −4`); `d3` alt. `"y = −2x + 3"` (`2 · (−2) = −4`). |
| `vetores-no-plano` | 36 | 0 | 2 | Passo `somar-encaixando` (`v_comprimento >= 2`): `"Com v = (1; 2)..."` → `"Por exemplo, com v = (1; 2)..."`; passo `esticar` (`k >= 2`, `max: 3`): `"2u = (6; 2)..."` → `"k·u mantém a direção e multiplica o comprimento (ex.: 2u = (6; 2))."`. Contas verificadas: `d1` (`desafio-soma`) alt. `"(2; −4)"` (`v − u = (4−2; −1−3)`); `d3` (`modulo-da-soma`) alt. `"√5 + √8"` (`|(1;2)| + |(2;2)|`). |
| **Total** | **249** | **18** | **5** | **7 capítulos**; todos os testes de capítulo e `npm run lint:content` passando após a última edição. |

## Dúvidas não resolvidas

Nenhuma.

## Auditoria do maestro (Claude, Máquina B, 13/11)

Conferidas uma a uma todas as alterações deste setor (18 feedbacks, 2 rótulos trocados, 5 falas). Todas as contas batem com os rótulos (ex.: "√89" = √(5² + 8²) somando coordenadas; "(2; 3)" = M − A). Nenhuma correção.
