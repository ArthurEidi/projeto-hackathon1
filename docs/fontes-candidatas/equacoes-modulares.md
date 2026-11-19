# Fontes candidatas — equacoes-modulares

Nenhuma candidata no ENEM (motivo: não há questão no cache matematica.json sobre equações modulares).


---

## Candidatas B40 (provas oficiais)

### Candidata 1 — UFRGS 2022 (1º dia, Matemática, Questão 57)

- **Banca / Ano / Fase / Número:** UFRGS, 2022, Concurso Vestibular (1º dia — Matemática), Questão 57.
- **Página do PDF:** p. 30.
- **Caminho local do PDF e do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ufrgs-2022-1dia\prova.pdf` e `C:\Users\mkf10\projetos\provas-oficiais\ufrgs-2022-1dia\gabarito.html`.
- **URL oficial:** `https://vestibular.ufrgs.br/cv2022/` (provas e gabaritos oficiais Coperse/UFRGS).
- **Depende de figura:** não.
- **Enunciado:**
  > A área da região compreendida entre os gráficos das funções f(x) e g(x), definidas por f(x) = |x − 2| + 1 e g(x) = −|x| + 5, é
- **Alternativas:**
  - (A) 4.
  - (B) 6.
  - (C) 10.
  - (D) 15.
  - (E) 20.
- **Gabarito oficial:** B.
- **Resolução:**
  Para achar os pontos de interseção, resolvemos a equação modular `|x − 2| + 1 = −|x| + 5 ⇔ |x − 2| + |x| = 4`:
  - Para `x < 0`: `(2 − x) + (−x) = 4 ⇒ −2x = 2 ⇒ x = −1`, com `y = 4`, dando `A = (−1, 4)`.
  - Para `0 ≤ x ≤ 2`: `(2 − x) + x = 2 ≠ 4` (sem solução nesse intervalo).
  - Para `x > 2`: `(x − 2) + x = 4 ⇒ 2x = 6 ⇒ x = 3`, com `y = 2`, dando `C = (3, 2)`.
  Os outros dois vértices da região são os vértices dos gráficos modulares: `B = (0, 5)` (em `g`) e `D = (2, 1)` (em `f`).
  Os vetores `AB = (1, 1)` e `BC = (3, −3)` são perpendiculares (`1·3 + 1·(−3) = 0`), formando um retângulo de lados `|AB| = √2` e `|BC| = 3√2`.
  Logo, a área é `√2 · 3√2 = 6`. Confere com o gabarito oficial **B**.
