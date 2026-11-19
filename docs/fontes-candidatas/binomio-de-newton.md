# Fontes candidatas — binomio-de-newton

Nenhuma candidata no ENEM (motivo: não há questão no cache matematica.json sobre Binômio de Newton e coeficientes binomiais).


## Candidatas B40 (provas oficiais)

### Candidata 1 — ITA 2025, 1ª Fase, Questão 3
- **Banca / Ano / Fase:** ITA / 2025 / 1ª Fase
- **Número:** Questão 3
- **Página do PDF:** 2
- **Caminho local do PDF:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2025-1fase\prova.pdf`
- **Caminho local do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2025-1fase\gabarito.pdf`
- **URL oficial (prova):** `https://www.vestibular.ita.br/provas/2025_fase1.pdf`
- **URL oficial (gabarito):** `https://www.vestibular.ita.br/provas/gabarito_2025.pdf`
- **Depende de figura:** não
- **Enunciado:**
  O termo independente da expansão de `(x + 1/x)⁶ (x − 2/x)⁵` é
- **Alternativas:**
  - A) −18.
  - B) −12.
  - C) 0.
  - D) 12.
  - E) 18.
- **Gabarito oficial:** C
- **Resolução:**
  No primeiro fator `(x + x⁻¹)⁶`, cada termo tem a forma `C(6, k) · x^(6 − k) · x^(−k) = C(6, k) · x^(6 − 2k)`, logo todos os expoentes de `x` são pares (`6, 4, 2, 0, −2, −4, −6`).
  No segundo fator `(x − 2x⁻¹)⁵`, cada termo tem a forma `C(5, j) · (−2)^j · x^(5 − 2j)`, logo todos os expoentes de `x` são ímpares (`5, 3, 1, −1, −3, −5`).
  Qualquer produto de uma potência par por uma potência ímpar de `x` resulta em uma potência ímpar de `x` (`2m + 1 ≠ 0`). Portanto, não há termo em `x⁰`, e o termo independente é `0`. Confere com o gabarito oficial **C**.

### Candidata 2 — ITA 2018, Matemática, Questão 3
- **Banca / Ano / Fase:** ITA / 2018 / 1ª Fase (Matemática)
- **Número:** Questão 3
- **Página do PDF:** 2
- **Caminho local do PDF:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2018-mat\prova.pdf`
- **Caminho local do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2018-mat\gabarito.pdf`
- **URL oficial (prova):** `https://www.vestibular.ita.br/provas/matematica_2018.pdf`
- **URL oficial (gabarito):** `https://www.vestibular.ita.br/provas/gabarito_2018.pdf`
- **Depende de figura:** não
- **Enunciado:**
  Sejam a e b números inteiros positivos. Se a e b são, nessa ordem, termos consecutivos de uma progressão geométrica de razão 1/2 e o termo independente de `(ax − b/√x)¹²` é igual a 7920, então a + b é
- **Alternativas:**
  - A) 2.
  - B) 3.
  - C) 4.
  - D) 5.
  - E) 6.
- **Gabarito oficial:** B
- **Resolução:**
  Da PG de razão `1/2`, temos `b = a/2`, ou seja, `a = 2b` (com `a, b ∈ ℤ₊`).
  O termo geral de `(ax − b·x^(−1/2))¹²` é `T_(p+1) = C(12, p) · a^(12−p) · (−b)^p · x^(12 − p − p/2) = C(12, p) · a^(12−p) · (−b)^p · x^(12 − 3p/2)`.
  Para o termo independente de `x`, fazemos `12 − 3p/2 = 0 ⇒ p = 8`.
  Logo, `T₉ = C(12, 8) · a⁴ · (−b)⁸ = 495 · (2b)⁴ · b⁸ = 495 · 16 · b¹² = 7920 · b¹²`.
  Como `T₉ = 7920`, segue `b¹² = 1 ⇒ b = 1` (pois `b > 0`), e `a = 2`. Assim, `a + b = 3`. Confere com o gabarito oficial **B**.
