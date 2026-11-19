# Fontes candidatas — `equacoes-exponenciais`

## Questão 1 — FGV 2020

- **Banca / Ano / Identificação:** FGV, 2020 (Questão 7 da página).
- **URL do enunciado:** https://www.todamateria.com.br/exercicios-de-equacoes-exponenciais/
- **URL do gabarito:** https://www.todamateria.com.br/exercicios-de-equacoes-exponenciais/
- **Enunciado copiado:**
  > (FGV 2020) No conjunto dos números reais, a equação exponencial 2^(x+2) + 8^x = 4^(x+1) possui
- **Alternativas copiadas:**
  - a) zero raiz.
  - b) uma raiz.
  - c) duas raízes.
  - d) três raízes.
  - e) quatro raízes.
- **Gabarito:** b) uma raiz.
- **Resumo para o app (<= 140 caracteres, 2 frases):**
  Adaptada (FGV 2020): Considere a equação exponencial 2^(x+2) + 8^x = 4^(x+1). Quantas raízes reais ela possui?
- **Conta que confirma o gabarito:**
  Fazendo `y = 2^x > 0`, temos `4y + y³ = 4y² => y(y² - 4y + 4) = 0 => y(y - 2)² = 0`. Como `y = 2^x > 0`, a única solução é `y = 2 => 2^x = 2 => x = 1` (uma raiz real).

---

## Questão 2 — Enem 2016 (Questão 160, Caderno Azul)

- **Banca / Ano / Identificação:** Enem, 2016, Questão 160 do Caderno Azul (Dia 2).
- **URL do enunciado:** https://plataformaassaad.com.br/questao-160-caderno-azul-enem-2016/
- **URL do gabarito:** https://plataformaassaad.com.br/questao-160-caderno-azul-enem-2016/
- **Enunciado copiado:**
  > Uma liga metálica sai do forno a uma temperatura de 3 000℃ e diminui 1% de sua temperatura a cada 30 min.
  > Use 0,477 como aproximação para log_10 3 e 1,041 como aproximação para log_10 11.
  > O tempo decorrido, em hora, até que a liga atinja 30℃ é mais próximo de
- **Alternativas copiadas:**
  - A) 22
  - B) 50
  - C) 100
  - D) 200
  - E) 400
- **Gabarito:** D) 200.
- **Resumo para o app (<= 140 caracteres, 2 frases):**
  Adaptada (Enem 2016): Uma liga sai a 3 000 °C e perde 1% a cada 30 min. Em quantas horas atinge 30 °C (log 3=0,477; log 11=1,041)?
- **Conta que confirma o gabarito:**
  `30 = 3000 · (0,99)^(2t) => 10^(-2) = (99/100)^(2t)`. Aplicando `log_10`: `-2 = 2t · (log 99 - 2) = 2t · (2·log 3 + log 11 - 2) = 2t · (0,954 + 1,041 - 2) = 2t · (-0,005) = -0,01t => t = 2 / 0,01 = 200` horas.

---

## Questão 3 — Enem (PPL) 2015

- **Banca / Ano / Identificação:** Enem (PPL), 2015 (Questão 9 da página).
- **URL do enunciado:** https://www.todamateria.com.br/funcao-exponencial-exercicios/
- **URL do gabarito:** https://www.todamateria.com.br/funcao-exponencial-exercicios/
- **Enunciado copiado:**
  > O sindicato de trabalhadores de uma empresa sugere que o piso salarial da classe seja de R$ 1 800,00, propondo um aumento percentual fixo por cada ano dedicado ao trabalho. A expressão que corresponde à proposta salarial (s), em função do tempo de serviço (t), em anos, é s(t) = 1 800 . (1,03)^t.
  >
  > De acordo com a proposta do sindicato, o salário de um profissional dessa empresa com 2 anos de tempo de serviço será, em reais,
- **Alternativas copiadas:**
  - a) 7 416,00
  - b) 3 819,24
  - c) 3 709,62
  - d) 3 708,00
  - e) 1 909,62.
- **Gabarito:** e) 1 909,62.
- **Resumo para o app (<= 140 caracteres, 2 frases):**
  Adaptada (Enem PPL 2015): O salário após t anos é s(t) = 1 800 · (1,03)^t. Qual será o salário com 2 anos de serviço?
- **Conta que confirma o gabarito:**
  `s(2) = 1800 · (1,03)² = 1800 · 1,0609 = 1909,62`.


---

## Candidatas B40 (provas oficiais)

### Candidata 1 — UFPR 2024 (1ª fase, Questão 08)

- **Banca / Ano / Fase / Número:** UFPR, 2024, 1ª fase (Conhecimentos Gerais), Questão 08.
- **Página do PDF:** p. 4 (`4/33`).
- **Caminho local do PDF:** `C:\Users\mkf10\projetos\provas-oficiais\ufpr-2024-1fase\prova.pdf` (o caderno oficial `Geral.pdf` da NC/UFPR já marca o gabarito oficial com `►`).
- **URL oficial:** `https://servicos.nc.ufpr.br/documentos/ps2024/provas/Geral.pdf`
- **Depende de figura:** não.
- **Enunciado:**
  > Um bolo é retirado do forno e começa a resfriar segundo a expressão T(t) = 30 + 150a^(−0,05t), com a > 1, sendo T a temperatura do bolo e t o tempo decorrido em minutos. Assinale a alternativa que corresponde ao tempo em que o bolo atingirá a metade da temperatura inicial que apresentava quando foi retirado do forno em t = 0. (Use se necessário log_a 2 = 0,7 e log_a 5 = 1,6).
- **Alternativas:**
  - A) 10 minutos
  - B) 12 minutos
  - C) 16 minutos
  - D) 18 minutos
  - E) 22 minutos
- **Gabarito oficial:** D.
- **Resolução:**
  Em `t = 0`, `T(0) = 30 + 150·a⁰ = 180`. A metade da temperatura inicial é `90`. Resolvendo `30 + 150·a^(−0,05t) = 90`:
  `150·a^(−0,05t) = 60 ⇒ a^(−0,05t) = 60/150 = 2/5 ⇒ a^(0,05t) = 5/2`.
  Aplicando `log_a`: `0,05t = log_a(5/2) = log_a 5 − log_a 2 = 1,6 − 0,7 = 0,9 ⇒ t = 0,9 / 0,05 = 18` minutos. Confere com o gabarito oficial **D**.

### Candidata 2 — ITA 2021 (1ª fase, Questão 47)

- **Banca / Ano / Fase / Número:** ITA, 2021, 1ª fase, Matemática, Questão 47.
- **Página do PDF:** p. 15.
- **Caminho local do PDF e do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2021-1fase\prova.pdf` e `C:\Users\mkf10\projetos\provas-oficiais\ita-2021-1fase\gabarito.pdf`.
- **URL oficial:** `https://www.vestibular.ita.br/` (acervo oficial de provas e gabaritos ITA 2021).
- **Depende de figura:** não.
- **Enunciado:**
  > A única solução real da equação 7^x = 59^(x−1) pertence ao intervalo:
- **Alternativas:**
  - A) (0, 2/5].
  - B) (2/5, 4/3].
  - C) (4/3, 5/2].
  - D) (5/2, 10/3].
  - E) (10/3, 4].
- **Gabarito oficial:** C.
- **Resolução:**
  Reescrevendo `7^x = 59^(x−1) ⇔ (59/7)^x = 59`. Como `59/7 > 1`, `f(x) = (59/7)^x` é estritamente crescente.
  - Em `x = 4/3`: `(59/7)^(4/3) < 59 ⇔ 59⁴ < 59³ · 7⁴ ⇔ 59 < 2401` (verdadeiro), logo `x > 4/3`.
  - Em `x = 5/2`: `(59/7)^(5/2) > 59 ⇔ 59⁵ > 59² · 7⁵ ⇔ 59³ > 7⁵ ⇔ 205 379 > 16 807` (verdadeiro), logo `x < 5/2`.
  Portanto `x ∈ (4/3, 5/2]`. Confere com o gabarito oficial **C**.

### Candidata 3 — ITA 2020 (1ª fase, Questão 41)

- **Banca / Ano / Fase / Número:** ITA, 2020, 1ª fase, Matemática, Questão 41.
- **Página do PDF:** p. 16.
- **Caminho local do PDF e do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2020-1fase\prova.pdf` e `C:\Users\mkf10\projetos\provas-oficiais\ita-2020-1fase\gabarito.pdf`.
- **URL oficial:** `https://www.vestibular.ita.br/` (acervo oficial de provas e gabaritos ITA 2020).
- **Depende de figura:** não.
- **Enunciado:**
  > Sejam x₁, x₂, x₃, x₄, x₅ e x₆ números reais tais que 2^(x₁) = 4; 3^(x₂) = 5; 4^(x₃) = 6; 5^(x₄) = 7; 6^(x₅) = 8 e 7^(x₆) = 9. Então, o produto x₁x₂x₃x₄x₅x₆ é igual a
- **Alternativas:**
  - A) 6.
  - B) 8.
  - C) 10.
  - D) 12.
  - E) 14.
- **Gabarito oficial:** A.
- **Resolução:**
  Cada equação dá `x₁ = log₂ 4`, `x₂ = log₃ 5`, `x₃ = log₄ 6`, `x₄ = log₅ 7`, `x₅ = log₆ 8`, `x₆ = log₇ 9`.
  Usando mudança de base (`log_a b = ln b / ln a`), o produto telescópico fica:
  `x₁x₂x₃x₄x₅x₆ = (ln 4 / ln 2)·(ln 5 / ln 3)·(ln 6 / ln 4)·(ln 7 / ln 5)·(ln 8 / ln 6)·(ln 9 / ln 7) = (ln 8 / ln 2)·(ln 9 / ln 3) = log₂ 8 · log₃ 9 = 3 · 2 = 6`.
  Confere com o gabarito oficial **A**.
