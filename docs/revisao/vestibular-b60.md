# Vestibular B60 — Geometria (2ª questão por aula)

Frente B60: buscar e inserir uma 2ª questão de prova oficial (PDF + gabarito oficiais em `provas-oficiais/`) para as 18 aulas de geometria listadas em `aulas-com-1-vestibular.txt` (exceto as 4 em auditoria/outro agente).

---

## Leva 1 — Geometria Analítica (5 aulas)

### 1. `geometria/geometria-analitica/circunferencia-equacao-e-posicoes`
- **Já tinha:** `enem-2018-tiros` (ENEM 2018 Q138).
- **2ª questão inserida:** **Unicamp 2020, 1ª fase, Q43** (`unicamp-2020-circunferencia-c`), vaga V2.
  - **URL oficial:** `https://www.comvest.unicamp.br/wp-content/uploads/2020/10/prova_comentada_F1_2020.pdf` (`HTTP 200`, `2224122` bytes, idêntico ao PDF local `unicamp-2020-1fase/prova.pdf`).
  - **Gabarito oficial:** `d) 3` (`x² − 2cx + y² = 0 ⇒ (x − c)² + y² = c²`, centro `(c; 0)` na reta `x + 2y = 3 ⇒ c = 3`).
  - **Validação:** `vitest` (21/21) e `lint:content` OK.

### 2. `geometria/geometria-analitica/posicoes-relativas-de-retas`
- **Já tinha:** `unicamp-2021-mediatriz` (Unicamp 2021, 1ª fase, Q31).
- **2ª questão inserida:** **UFPR 2022, 1ª fase, Conhecimentos Gerais, Q13** (`ufpr-2022-reta-paralela-bc`), vaga V3.
  - **URL oficial:** `https://servicos.nc.ufpr.br/documentos/PS2022/provas/Geral.pdf` (`HTTP 200`, `602779` bytes, idêntico ao PDF local `ufpr-2022-1fase/prova.pdf`).
  - **Gabarito oficial:** `a) 3x + 2y = 15` (`AB` corta o eixo `x` em `D(5; 0)`; paralela a `BC` de inclinação `−3/2` por `D` dá `3x + 2y = 15`).
  - **Validação:** `vitest` (12/12) e `lint:content` OK.

### 3. `geometria/geometria-analitica/parabola-conica`
- **Já tinha:** `ita-2009-parabola` (ITA 2009, Q16).
- **2ª questão inserida:** **Unicamp 2019, 1ª fase, Matemática, Q69** (`unicamp-2019-parabola-circunferencia`), vaga V2.
  - **URL oficial:** `https://www.comvest.unicamp.br/wp-content/uploads/2019/08/Matematica2019F1_final.pdf` (`HTTP 200`, `1419848` bytes, idêntico ao PDF local `unicamp-2019-1fase/prova.pdf`).
  - **Gabarito oficial:** `c) três pontos` (`3y² − 11y + 8 = 0` dá `y = 1 ⇒ (0; 1)` e `y = 8/3 ⇒ (±√5/3; 8/3)`).
  - **Validação:** `vitest` e `lint:content` pendentes de conferência nesta leva.

### 4. `geometria/geometria-analitica/elipse`
- **Já tinha:** `ufrgs-2019-losango-elipse` (UFRGS 2019, Q45).
- **Em avaliação:** busca em `provas_cache.jsonl` (6.818 páginas de 154 PDFs).

### 5. `geometria/geometria-analitica/hiperbole`
- **Já tinha:** `enem-2017-hiperbole` (ENEM 2017).
- **Em avaliação:** busca em `provas_cache.jsonl`.
