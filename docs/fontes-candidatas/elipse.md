# Fontes candidatas — elipse

Nenhuma candidata no cache do ENEM (mesmo aceitando questões com imagem).


## Candidatas B40 (provas oficiais)

### Candidata 1 — ITA 2024, 1ª Fase, Questão 48
- **Banca / Ano / Fase:** ITA / 2024 / 1ª Fase
- **Número:** Questão 48
- **Página do PDF:** 17
- **Caminho local do PDF:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2024-1fase\prova.pdf`
- **Caminho local do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2024-1fase\gabarito.pdf`
- **URL oficial (prova):** `https://www.vestibular.ita.br/provas/2024_fase1.pdf`
- **URL oficial (gabarito):** `https://www.vestibular.ita.br/provas/gabarito_2024.pdf`
- **Depende de figura:** não
- **Enunciado:**
  Considere a elipse dada pela equação
  `λx² + (λ + 4)y² − 4λx − (10λ + 40)y + 25(λ + 4) − λ² = 0`;
  e o círculo de equação
  `x² + y² − 4x − 12y + 36 = 0`.
  Estando o interior do círculo inteiramente contido no interior da elipse, o valor de `λ ∈ ℝ − {−4; 0}` quando a excentricidade da elipse é máxima é igual a:
- **Alternativas:**
  - A) 3.
  - B) 5.
  - C) 9.
  - D) 13.
  - E) 15.
- **Gabarito oficial:** C
- **Resolução:**
  Completando quadrados na elipse: `λ(x − 2)² + (λ + 4)(y − 5)² = λ(λ + 4)`. Para definir uma elipse real, devemos ter `λ > 0`, donde:
  `(x − 2)² / (λ + 4) + (y − 5)² / λ = 1`.
  Os semieixos são `a = √(λ + 4)` e `b = √λ`, com `c = √(a² − b²) = 2` e excentricidade `e = 2 / √(λ + 4)`. Logo, `e` é máxima quando `λ` é mínimo.
  O círculo é `(x − 2)² + (y − 6)² = 4`, centrado em `(2, 6)` e de raio `2`. Para qualquer `(x, y)` do disco fechado (`4 ≤ y ≤ 8`, `(x − 2)² ≤ 4 − (y − 6)²`), devemos ter `(4 − (y − 6)²)/(λ + 4) + (y − 5)²/λ ≤ 1`.
  Em `y = 8`, obtemos `(8 − 5)² / λ ≤ 1 ⇒ 9 / λ ≤ 1 ⇒ λ ≥ 9`. Para `λ = 9`, a condição equivale a `36 − 9(y − 6)² + 13(y − 5)² ≤ 117 ⇔ 4y² − 22y + 37 ≤ 117`, que é satisfeita em todo `y ∈ [4, 8]` (máximo em `y = 8`, valendo `117`). Portanto, `λ = 9`. Confere com o gabarito oficial **C**.
