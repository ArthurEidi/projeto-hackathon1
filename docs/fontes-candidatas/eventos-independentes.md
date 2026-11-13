# Fontes candidatas — `eventos-independentes`

## Questão 1 — ENEM 2023, Questão 138

- **Banca / Ano / Número:** ENEM, 2023, Questão 138.
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/138
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/138
- **Enunciado:**
  Visando atrair mais clientes, o gerente de uma loja anunciou uma promoção em que cada cliente que realizar uma compra pode ganhar um voucher para ser usado em sua próxima compra. Para ganhar seu voucher, o cliente precisa retirar, ao acaso, uma bolinha de dentro de cada uma das duas urnas A e B disponibilizadas pelo gerente, nas quais há apenas bolinhas pretas e brancas. Atualmente, a probabilidade de se escolher, ao acaso, uma bolinha preta na urna A é igual a 20% e a probabilidade de se escolher uma bolinha preta na urna B é 25%. Ganha o voucher o cliente que retirar duas bolinhas pretas, uma de cada urna. Com o passar dos dias, o gerente percebeu que, para a promoção ser viável aos negócios, era preciso alterar a probabilidade de acerto do cliente sem alterar a regra da promoção. Para isso, resolveu alterar a quantidade de bolinhas brancas na urna B de forma que a probabilidade de um cliente ganhar o voucher passasse a ser menor ou igual a 1%. Sabe-se que a urna B tem 4 bolinhas pretas e que, em ambas as urnas, todas as bolinhas têm a mesma probabilidade de serem retiradas.

  Qual é o número mínimo de bolinhas brancas que o gerente deve adicionar à urna B?
- **Alternativas:**
  - A) 20
  - B) 60
  - C) 64
  - D) 68
  - E) 80
- **Gabarito:** C
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):**
  Adaptada (ENEM 2023): P(preta em A)=20%; B tem 4 pretas e 12 brancas (25%). Quantas brancas pôr em B para P(A∩B) <= 1%?
- **Conta que confirma o gabarito:**
  Como B tem 4 pretas e `P(B) = 25% = 1/4`, B começa com `16` bolas (`12` brancas). Adicionando `x` brancas, `P(A ∩ B) = 0,20 · 4/(16+x) <= 0,01 => 0,80 / (16+x) <= 0,01 => 80 <= 16 + x => x >= 64`.

---

## Questão 2 — ENEM 2021, Questão 142

- **Banca / Ano / Número:** ENEM, 2021, Questão 142.
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/142
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/142
- **Enunciado:**
  O organizador de uma competição de lançamento de dados pretende tornar o campeonato mais competitivo. Pelas regras atuais da competição, numa rodada, o jogador lança 3 dardos e pontua caso acerte pelo menos um deles no alvo. O organizador considera que, em média, os jogadores tem, em cada lançamento, 1/2 de probabilidade de acertar um dardo no alvo. A fim de tornar o jogo mais atrativo, planeja modificar as regras de modo que a probabilidade de um jogador pontuar em uma rodada seja igual ou superior a 9/10. Para isso, decide aumentar a quantidade de dardos a serem lançados em cada rodada.

  Com base nos valores considerados pelo organizador da competição, a quantidade mínima de dardos que devem ser disponibilizados em uma rodada para tornar o jogo mais atrativo é
- **Alternativas:**
  - A) 2
  - B) 4
  - C) 6
  - D) 9
  - E) 10
- **Gabarito:** B
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):**
  Adaptada (ENEM 2021): Cada dardo acerta o alvo com chance 1/2. Quantos dardos lançar para acertar pelo menos um com chance >= 9/10?
- **Conta que confirma o gabarito:**
  A chance de errar todos os `n` dardos é `(1/2)^n`. Logo `1 - (1/2)^n >= 9/10 => (1/2)^n <= 1/10 => 2^n >= 10`. Como `2³ = 8` e `2⁴ = 16 >= 10`, o mínimo é `n = 4`.

---

## Questão 3 — ENEM 2019, Questão 159

- **Banca / Ano / Número:** ENEM, 2019, Questão 159.
- **URL do enunciado:** https://api.enem.dev/v1/exams/2019/questions/159
- **URL do gabarito:** https://api.enem.dev/v1/exams/2019/questions/159
- **Enunciado:**
  O dono de um restaurante situado às margens de uma rodovia percebeu que, ao colocar uma placa de propaganda de seu restaurante ao longo da rodovia, as vendas aumentaram. Pesquisou junto aos seus clientes e concluiu que a probabilidade de um motorista perceber uma placa de anúncio é 1/2. Com isso, após autorização do órgão competente, decidiu instalar novas placas com anúncios de seu restaurante ao longo dessa rodovia, de maneira que a probabilidade de um motorista perceber pelo menos uma das placas instaladas fosse superior a 99/100.

  A quantidade mínima de novas placas de propaganda a serem instaladas é
- **Alternativas:**
  - A) 99
  - B) 51
  - C) 50
  - D) 6
  - E) 1
- **Gabarito:** D
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):**
  Adaptada (ENEM 2019): Cada placa é vista com chance 1/2. Já existe 1 placa; quantas novas instalar para ver pelo menos uma com chance > 99/100?
- **Conta que confirma o gabarito:**
  Com `n` placas no total, `1 - (1/2)^n > 99/100 => (1/2)^n < 1/100 => 2^n > 100`. Como `2⁶ = 64` e `2⁷ = 128 > 100`, são necessárias `7` placas ao todo, ou seja, `7 - 1 = 6` novas placas.
