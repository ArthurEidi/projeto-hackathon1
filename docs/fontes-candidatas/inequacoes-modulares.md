# Fontes candidatas — inequacoes-modulares

Nenhuma candidata no ENEM (motivo: não há questão no cache matematica.json sobre inequações modulares).


---

## Candidatas B40 (provas oficiais)

### Candidata 1 — UNICAMP 2025 (1ª fase, Prova Q, Questão 52)

- **Banca / Ano / Fase / Número:** UNICAMP, 2025, 1ª fase (Conhecimentos Gerais — Prova Q), Questão 52.
- **Página do PDF:** p. 49.
- **Caminho local do PDF:** `C:\Users\mkf10\projetos\provas-oficiais\unicamp-2025-1fase\prova.pdf` (Prova Comentada oficial da Comvest, contém o gabarito oficial na própria página).
- **URL oficial:** `https://www.comvest.unicamp.br/wp-content/uploads/2025/06/F1_2025.pdf`
- **Depende de figura:** não.
- **Enunciado:**
  > Ana está treinando as habilidades matemáticas de seu irmão mais novo. Ela escolheu dois números reais x, y e avisou para seu irmão que os números satisfazem às desigualdades |x − 2| ≤ 2 e |y − 3| ≤ 1. O que o irmão de Ana pode concluir corretamente sobre esses números?
- **Alternativas:**
  - a) x² + y² ≤ 1.
  - b) x + y ≥ 10.
  - c) x + y ≤ 8.
  - d) x² + y² ≥ 36.
- **Gabarito oficial:** c.
- **Resolução:**
  Resolvendo cada inequação modular:
  - `|x − 2| ≤ 2 ⇔ −2 ≤ x − 2 ≤ 2 ⇔ 0 ≤ x ≤ 4`.
  - `|y − 3| ≤ 1 ⇔ −1 ≤ y − 3 ≤ 1 ⇔ 2 ≤ y ≤ 4`.
  Somando as desigualdades: `0 + 2 ≤ x + y ≤ 4 + 4 ⇒ 2 ≤ x + y ≤ 8`.
  Portanto, `x + y ≤ 8` é necessariamente verdadeira. (As demais falham: para `x = 0, y = 2`, `x² + y² = 4 > 1`, `x + y = 2 < 10` e `x² + y² = 4 < 36`.)
  Confere com o gabarito oficial **c**.

### Candidata 2 — ITA 2017 (Matemática, Questão 7)

- **Banca / Ano / Fase / Número:** ITA, 2017, Matemática, Questão 7.
- **Página do PDF:** p. 2.
- **Caminho local do PDF e do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2017-mat\prova.pdf` e `C:\Users\mkf10\projetos\provas-oficiais\ita-2017-mat\gabarito.pdf`.
- **URL oficial:** `https://www.vestibular.ita.br/` (acervo oficial de provas e gabaritos ITA 2017).
- **Depende de figura:** não.
- **Enunciado:**
  > O número de soluções inteiras da inequação 0 ≤ x² − |3x² + 8x| ≤ 2 é
- **Alternativas:**
  - A) 1.
  - B) 2.
  - C) 3.
  - D) 4.
  - E) 5.
- **Gabarito oficial:** C.
- **Resolução:**
  Da primeira desigualdade: `x² − |3x² + 8x| ≥ 0 ⇔ |3x² + 8x| ≤ x² ⇔ −x² ≤ 3x² + 8x ≤ x²`.
  - `3x² + 8x ≤ x² ⇔ 2x² + 8x ≤ 0 ⇔ 2x(x + 4) ≤ 0 ⇔ −4 ≤ x ≤ 0`.
  - `3x² + 8x ≥ −x² ⇔ 4x² + 8x ≥ 0 ⇔ 4x(x + 2) ≥ 0 ⇔ x ≤ −2` ou `x ≥ 0`.
  A interseção é `x ∈ [−4, −2] ∪ {0}`, cujos inteiros candidatos são `−4, −3, −2, 0`.
  Testando `x² − |3x² + 8x| ≤ 2`:
  - `x = −4`: `16 − |48 − 32| = 0 ≤ 2` (serve).
  - `x = −3`: `9 − |27 − 24| = 6 > 2` (não serve).
  - `x = −2`: `4 − |12 − 16| = 0 ≤ 2` (serve).
  - `x = 0`: `0 − |0| = 0 ≤ 2` (serve).
  Há exatamente `3` soluções inteiras (`−4, −2, 0`). Confere com o gabarito oficial **C**.
