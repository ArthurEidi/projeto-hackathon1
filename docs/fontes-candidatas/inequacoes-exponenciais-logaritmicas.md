# Fontes candidatas — inequacoes-exponenciais-logaritmicas

## Questão 1
- **Banca / Ano / Questão:** ENEM 2017 — Questão 137
- **URL do enunciado:** https://api.enem.dev/v1/exams/2017/questions/137
- **URL do gabarito:** https://api.enem.dev/v1/exams/2017/questions/137 (`correctAlternative: "D"`)
- **Imagens:** `public/vestibular/enem-2017-137-1.png` (fórmula da prestação P = (5 000 × 1,013^n × 0,013) / (1,013^n − 1))
- **Enunciado:**
  > Para realizar a viagem dos sonhos, uma pessoa precisava fazer um empréstimo no valor de R$ 5000,00. Para pagar as prestações, dispõe de, no máximo, R$ 400,00 mensais. Para esse valor de empréstimo, o valor da prestação (P) é calculado em função do número de prestações (n) segundo a fórmula
  >
  > ![](https://enem.dev/2017/questions/137/e7e3ca34-7beb-43f1-bef0-8691dd8922f5.png)
  >
  > Se necessário, utilize 0,005 como aproximação para log 1,013; 2,602 como aproximação para log 400; 2,525 como aproximação para log 335.
  >
  > De acordo com a fórmula dada, o menor número de parcelas cujos valores não comprometem o limite definido pela pessoa é
- **Alternativas:**
  - A) 12
  - B) 14
  - C) 15
  - D) 16
  - E) 17
- **Gabarito:** D
- **Resolução (feita antes de olhar o gabarito):** Queremos P <= 400. Como 5 000 × 0,013 = 65 e 1,013^n − 1 > 0 para n >= 1, temos (65 × 1,013^n) / (1,013^n − 1) <= 400, donde 65 × 1,013^n <= 400 × 1,013^n − 400, isto é, 335 × 1,013^n >= 400, ou 1,013^n >= 400/335. Aplicando logaritmo decimal dos dois lados: n × log(1,013) >= log(400) − log(335). Usando as aproximações dadas: 0,005n >= 2,602 − 2,525 = 0,077, logo n >= 0,077 / 0,005 = 15,4. Como n é inteiro, o menor número de parcelas é 16.
- **Nível:** médio
