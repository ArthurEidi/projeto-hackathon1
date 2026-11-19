# Fontes candidatas — expressoes-algebricas-e-produtos-notaveis

Nenhuma candidata no ENEM (motivo: não há questão no cache matematica.json focada em expansão de produtos notáveis como conteúdo central, sem imagem).


---

## Candidatas B40 (provas oficiais)

### Candidata 1 — FUVEST 2020 (1ª fase, Prova V, Questão 20)

- **Banca / Ano / Fase / Número:** FUVEST, 2020, 1ª fase (Prova V), Questão 20.
- **Página do PDF:** p. 7.
- **Caminho local do PDF e do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\fuvest-2020-1fase\prova.pdf` e `C:\Users\mkf10\projetos\provas-oficiais\fuvest-2020-1fase\gabarito.pdf`.
- **URL oficial:** `https://www.fuvest.br/wp-content/uploads/fuvest_2020_primeira_fase_prova_V.pdf` e `https://www.fuvest.br/wp-content/uploads/fuvest_2020_primeira_fase_gabaritos.pdf`
- **Depende de figura:** não.
- **Enunciado:**
  > Se 3x² − 9x + 7 = (x − a)³ − (x − b)³, para todo número real x, o valor de a + b é
- **Alternativas:**
  - (A) 3.
  - (B) 5.
  - (C) 6.
  - (D) 9.
  - (E) 12.
- **Gabarito oficial:** A.
- **Resolução:**
  Expandindo o cubo da diferença:
  `(x − a)³ − (x − b)³ = (x³ − 3ax² + 3a²x − a³) − (x³ − 3bx² + 3b²x − b³) = 3(b − a)x² + 3(a² − b²)x + (b³ − a³)`.
  Igualando os coeficientes a `3x² − 9x + 7`:
  - `3(b − a) = 3 ⇒ b − a = 1 ⇒ a − b = −1`.
  - `3(a² − b²) = −9 ⇒ a² − b² = −3`.
  Pela diferença de quadrados: `(a − b)(a + b) = −3 ⇒ (−1)(a + b) = −3 ⇒ a + b = 3`.
  (Verificação do termo independente: `a = 1, b = 2 ⇒ b³ − a³ = 8 − 1 = 7`, confere.)
  Confere com o gabarito oficial **A**.

### Candidata 2 — UFRGS 2022 (1º dia, Matemática, Questão 47)

- **Banca / Ano / Fase / Número:** UFRGS, 2022, Concurso Vestibular (1º dia — Matemática), Questão 47.
- **Página do PDF:** p. 25.
- **Caminho local do PDF e do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ufrgs-2022-1dia\prova.pdf` e `C:\Users\mkf10\projetos\provas-oficiais\ufrgs-2022-1dia\gabarito.html`.
- **URL oficial:** `https://vestibular.ufrgs.br/cv2022/` (provas e gabaritos oficiais Coperse/UFRGS).
- **Depende de figura:** não.
- **Enunciado:**
  > Considere as seguintes afirmações sobre números reais.
  > I. √(a² + b²) = a + b.
  > II. √(a²) = a.
  > III. Se 0 < b < a, então √(ab) ≤ (a + b)/2.
  > Quais estão corretas?
- **Alternativas:**
  - (A) Apenas I.
  - (B) Apenas III.
  - (C) Apenas I e II.
  - (D) Apenas II e III.
  - (E) I, II e III.
- **Gabarito oficial:** B.
- **Resolução:**
  - I é falsa: `(a + b)² = a² + 2ab + b² ≠ a² + b²` quando `ab ≠ 0` (ex.: `a = 3, b = 4` dá `√25 = 5 ≠ 7`).
  - II é falsa: `√(a²) = |a|`, que difere de `a` para `a < 0` (ex.: `a = −2` dá `√4 = 2 ≠ −2`).
  - III é verdadeira: como `a > 0` e `b > 0`, pelo produto notável `(√a − √b)² ≥ 0 ⇒ a − 2√(ab) + b ≥ 0 ⇒ √(ab) ≤ (a + b)/2`.
  Logo, apenas III está correta. Confere com o gabarito oficial **B**.
