# Fontes candidatas — `matematica-financeira`

## Questão 1 — ENEM 2023, Questão 161 (Prova Azul)
- **Banca / Ano / Número:** ENEM (INEP), 2023, Questão 161
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/161
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/161 (`correctAlternative: "D"`)
- **Enunciado:**
  Uma loja vende seus produtos de duas formas: à vista ou financiado em três parcelas mensais iguais. Para definir o valor dessas parcelas nas vendas financiadas, a loja aumenta em 20% o valor do produto à vista e divide esse novo valor por 3. A primeira parcela deve ser paga no ato da compra, e as duas últimas, em 30 e 60 dias após a compra.
  Um cliente da loja decidiu comprar, de forma financiada, um produto cujo valor à vista é R$ 1 500,00.
  Utilize 5,29 como aproximação para √28.
  A taxa mensal de juros compostos praticada nesse financiamento é de
- **Alternativas:**
  - A) 6,7%
  - B) 10%
  - C) 20%
  - D) 21,5%
  - E) 23,3%
- **Gabarito:** D
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):**
  Um item de R$ 1 500 sai com +20% em 3x de R$ 600 (uma no ato, duas em 30 e 60 dias; √28 ≈ 5,29). Qual a taxa mensal de juros compostos?
- **Conta que confirma o gabarito:**
  Total financiado = 1 500 × 1,2 = 1 800, logo cada parcela vale R$ 600,00. Após a entrada no ato, resta saldo de 1 500 − 600 = R$ 900,00: 900 = 600/(1+i) + 600/(1+i)² ⇒ 3(1+i)² − 2(1+i) − 2 = 0 ⇒ 1 + i = (2 + √28)/6 ≈ 7,29/6 = 1,215 ⇒ i = 21,5%.

## Questão 2 — ENEM 2019, Questão 150 (Prova Azul)
- **Banca / Ano / Número:** ENEM (INEP), 2019, Questão 150
- **URL do enunciado:** https://api.enem.dev/v1/exams/2019/questions/150
- **URL do gabarito:** https://api.enem.dev/v1/exams/2019/questions/150 (`correctAlternative: "B"`)
- **Enunciado:**
  Uma pessoa se interessou em adquirir um produto anunciado em uma loja. Negociou com o gerente e conseguiu comprá-lo a uma taxa de juros compostos de 1% ao mês.
  O primeiro pagamento será um mês após a aquisição do produto, e no valor de R$ 202,00. O segundo pagamento será efetuado um mês após o primeiro, e terá o valor de R$ 204,02.
  Para concretizar a compra, o gerente emitirá uma nota fiscal com o valor do produto à vista negociado com o cliente, correspondendo ao financiamento aprovado.
  O valor à vista, em real, que deverá constar na nota fiscal é de
- **Alternativas:**
  - A) 398,02
  - B) 400,00
  - C) 401,94
  - D) 404,00
  - E) 406,02
- **Gabarito:** B
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):**
  Uma compra a juros compostos de 1% ao mês foi quitada com R$ 202 após 1 mês e R$ 204,02 após 2 meses. Qual era o valor à vista?
- **Conta que confirma o gabarito:**
  Valor presente = 202 / 1,01 + 204,02 / 1,01² = 200 + 200 = R$ 400,00.

## Questão 3 — ENEM 2018, Questão 175 (Prova Azul)
- **Banca / Ano / Número:** ENEM (INEP), 2018, Questão 175
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/175
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/175 (`correctAlternative: "B"`)
- **Enunciado:**
  Uma loja vende automóveis em N parcelas iguais sem juros. No momento de contratar o financiamento, caso o cliente queira aumentar o prazo, acrescentando mais 5 parcelas, o valor de cada uma das parcelas diminui R$ 200,00, ou se ele quiser diminuir o prazo, com 4 parcelas a menos, o valor de cada uma das parcelas sobe R$ 232,00. Considere ainda que, nas três possibilidades de pagamento, o valor do automóvel é o mesmo, todas são sem juros e não é dado desconto em nenhuma das situações.
  Nessas condições, qual é a quantidade N de parcelas a serem pagas de acordo com a proposta inicial da loja?
- **Alternativas:**
  - A) 20
  - B) 24
  - C) 29
  - D) 40
  - E) 58
- **Gabarito:** B
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):**
  Um carro é pago em N parcelas iguais; com +5 parcelas cada uma cai R$ 200, e com −4 parcelas sobe R$ 232. Qual é o valor de N?
- **Conta que confirma o gabarito:**
  Sendo P o valor da parcela: (N + 5)(P − 200) = NP ⇒ 5P − 200N = 1 000 ⇒ P = 40N + 200. E (N − 4)(P + 232) = NP ⇒ 232N − 4P = 928 ⇒ 232N − 4(40N + 200) = 928 ⇒ 72N = 1 728 ⇒ N = 24.
