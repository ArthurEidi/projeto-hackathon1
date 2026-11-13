# Fontes candidatas — `probabilidade-condicional`

## Questão 1 — ENEM 2019, Questão 173

- **Banca / Ano / Número:** ENEM, 2019, Questão 173.
- **URL do enunciado:** https://api.enem.dev/v1/exams/2019/questions/173
- **URL do gabarito:** https://api.enem.dev/v1/exams/2019/questions/173
- **Enunciado:**
  Em um determinado ano, os computadores da receita federal de um país identificaram como inconsistentes 20% das declarações de imposto de renda que lhe foram encaminhadas. Uma declaração é classificada como inconsistente quando apresenta algum tipo de erro ou conflito nas informações prestadas. Essas declarações consideradas inconsistentes foram analisadas pelos auditores, que constataram que 25% delas eram fraudulentas. Constatou-se, ainda, que, dentre as declarações que não apresentaram inconsistências, 6,25% eram fraudulentas.

  Qual é a probabilidade de, nesse ano, a declaração de um contribuinte ser considerada inconsistente, dado que ela era fraudulenta?
- **Alternativas:**
  - A) 0,0500
  - B) 0,1000
  - C) 0,1125
  - D) 0,3125
  - E) 0,5000
- **Gabarito:** E
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):**
  Adaptada (ENEM 2019): 20% das declarações são inconsistentes (25% delas fraudulentas) e 6,25% das demais fraudam. Qual P(inconsistente | fraude)?
- **Conta que confirma o gabarito:**
  `P(inconsistente e fraude) = 0,20 · 0,25 = 0,05`. `P(consistente e fraude) = 0,80 · 0,0625 = 0,05`. Total de fraudulentas: `0,05 + 0,05 = 0,10`. Logo `P(inconsistente | fraude) = 0,05 / 0,10 = 0,5000`.

---

## Questão 2 — ENEM 2018, Questão 150

- **Banca / Ano / Número:** ENEM, 2018, Questão 150.
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/150
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/150
- **Enunciado:**
  Para ganhar um prêmio, uma pessoa deverá retirar, sucessivamente e sem reposição, duas bolas pretas de uma mesma urna. Inicialmente, as quantidades e cores das bolas são como descritas a seguir: • Urna A – Possui três bolas brancas, duas bolas pretas e uma bola verde; • Urna B – Possui seis bolas brancas, três bolas pretas e uma bola verde; • Urna C – Possui duas bolas pretas e duas bolas verdes; • Urna D – Possui três bolas brancas e três bolas pretas. A pessoa deve escolher uma entre as cinco opções apresentadas: • Opção 1 – Retirar, aleatoriamente, duas bolas da urna A; • Opção 2 – Retirar, aleatoriamente, duas bolas da urna B; • Opção 3 – Passar, aleatoriamente, uma bola da urna C para a urna A; após isso, retirar, aleatoriamente, duas bolas da urna A; • Opção 4 – Passar, aleatoriamente, uma bola da urna D para a urna C; após isso, retirar, aleatoriamente, duas bolas da urna C; • Opção 5 – Passar, aleatoriamente, uma bola da urna C para a urna D; após isso, retirar, aleatoriamente, duas bolas da urna D.

  Com o objetivo de obter a maior probabilidade possível de ganhar o prêmio, a pessoa deve escolher a opção
- **Alternativas:**
  - A) 1.
  - B) 2.
  - C) 3.
  - D) 4.
  - E) 5.
- **Gabarito:** E
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):**
  Adaptada (ENEM 2018): Ganha quem tirar 2 bolas pretas sem reposição. Entre as 5 opções de urnas (incluindo transferências), qual dá maior chance?
- **Conta que confirma o gabarito:**
  Opção 1: `(2/6)·(1/5) = 1/15 ≈ 0,067`. Opção 2: `(3/10)·(2/9) = 1/15 ≈ 0,067`. Opção 3: `(1/2)·(3/7)·(2/6) + (1/2)·(2/7)·(1/6) = 4/42 ≈ 0,095`. Opção 4: `(1/2)·(3/5)·(2/4) + (1/2)·(2/5)·(1/4) = 4/20 = 0,200`. Opção 5: `(1/2)·(4/7)·(3/6) + (1/2)·(3/7)·(2/6) = 9/42 ≈ 0,214`. A maior é a opção 5.
