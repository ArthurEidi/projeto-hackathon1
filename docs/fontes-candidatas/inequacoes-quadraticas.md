# Fontes candidatas — inequacoes-quadraticas

Nenhuma questão adequada encontrada na varredura completa do ENEM 2015–2023 via `https://api.enem.dev` (sem imagens e com alternativas em texto). A única candidata próxima (ENEM 2015, Questão 150) está com parte do enunciado ausente na API (falta o preço inicial de referência para comparar a arrecadação quadrática), impossibilitando a resolução apenas pelo texto.


---

## Candidatas B40 (provas oficiais)

### Candidata 1 — UNICAMP 2025 (1ª fase, Prova Q, Questão 54)

- **Banca / Ano / Fase / Número:** UNICAMP, 2025, 1ª fase (Conhecimentos Gerais — Prova Q), Questão 54.
- **Página do PDF:** p. 50.
- **Caminho local do PDF:** `C:\Users\mkf10\projetos\provas-oficiais\unicamp-2025-1fase\prova.pdf` (Prova Comentada oficial da Comvest, contém o gabarito oficial na própria página).
- **URL oficial:** `https://www.comvest.unicamp.br/wp-content/uploads/2025/06/F1_2025.pdf`
- **Depende de figura:** não.
- **Enunciado:**
  > Sejam f(x) = x − 2 e g(x) = x² − 4x funções reais. A quantidade de números x ∈ ℤ que satisfazem à inequação g(f(x)) < 0 é:
- **Alternativas:**
  - a) 2.
  - b) 3.
  - c) 4.
  - d) 5.
- **Gabarito oficial:** b.
- **Resolução:**
  `g(f(x)) = (x − 2)² − 4(x − 2) = (x − 2)[(x − 2) − 4] = (x − 2)(x − 6)`.
  Queremos `(x − 2)(x − 6) < 0`. Como a parábola tem concavidade para cima (`a = 1 > 0`) e raízes `2` e `6`, o conjunto solução real é `2 < x < 6`.
  Os números inteiros nesse intervalo aberto são `3, 4` e `5`, totalizando `3` inteiros.
  Confere com o gabarito oficial **b**.

### Candidata 2 — ITA 2021 (1ª fase, Matemática, Questão 42)

- **Banca / Ano / Fase / Número:** ITA, 2021, 1ª fase, Matemática, Questão 42.
- **Página do PDF:** p. 14.
- **Caminho local do PDF e do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2021-1fase\prova.pdf` e `C:\Users\mkf10\projetos\provas-oficiais\ita-2021-1fase\gabarito.pdf`.
- **URL oficial:** `https://www.vestibular.ita.br/` (acervo oficial de provas e gabaritos ITA 2021).
- **Depende de figura:** não.
- **Enunciado:**
  > Seja S ⊂ ℝ o conjunto solução da inequação (x² + x + 1)^(2x²−x−1) ≤ 1. Podemos afirmar que:
- **Alternativas:**
  - A) S = [−1, 1].
  - B) S = [−1, −1/2].
  - C) S = [0, 1].
  - D) S = [−1, −1/2] ∪ [0, 1].
  - E) S é o conjunto vazio.
- **Gabarito oficial:** D.
- **Resolução:**
  Como `x² + x + 1 > 0` para todo `x ∈ ℝ`, analisamos os sinais das duas expressões quadráticas:
  - `x² + x + 1 = 1 ⇔ x(x + 1) = 0 ⇒ x = −1` ou `x = 0` (ambos dão `1^k = 1 ≤ 1`).
  - Se `−1 < x < 0`, a base está em `(0, 1)`, exigindo expoente `2x² − x − 1 ≥ 0 ⇔ (2x + 1)(x − 1) ≥ 0 ⇒ x ≤ −1/2` ou `x ≥ 1`. Interseção: `(−1, −1/2]`.
  - Se `x < −1` ou `x > 0`, a base é `> 1`, exigindo expoente `2x² − x − 1 ≤ 0 ⇒ −1/2 ≤ x ≤ 1`. Interseção: `(0, 1]`.
  Unindo os casos (com `x = −1` e `x = 0`): `S = [−1, −1/2] ∪ [0, 1]`. Confere com o gabarito oficial **D**.
