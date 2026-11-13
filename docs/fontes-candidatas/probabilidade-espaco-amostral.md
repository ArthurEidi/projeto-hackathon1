# Fontes candidatas — probabilidade-espaco-amostral

## Questão 1
- **Banca / Ano / Questão:** ENEM 2023 — Questão 138 (caderno azul)
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/138
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/138 (`correctAlternative: "C"`)
- **Enunciado:**
  > Visando atrair mais clientes, o gerente de uma loja anunciou uma promoção em que cada cliente que realizar uma compra pode ganhar um voucher para ser usado em sua próxima compra. Para ganhar seu voucher, o cliente precisa retirar, ao acaso, uma bolinha de dentro de cada uma das duas urnas A e B disponibilizadas pelo gerente, nas quais há apenas bolinhas pretas e brancas. Atualmente, a probabilidade de se escolher, ao acaso, uma bolinha preta na urna A é igual a 20% e a probabilidade de se escolher uma bolinha preta na urna B é 25%. Ganha o voucher o cliente que retirar duas bolinhas pretas, uma de cada urna.
  >
  > Com o passar dos dias, o gerente percebeu que, para a promoção ser viável aos negócios, era preciso alterar a probabilidade de acerto do cliente sem alterar a regra da promoção. Para isso, resolveu alterar a quantidade de bolinhas brancas na urna B de forma que a probabilidade de um cliente ganhar o voucher passasse a ser menor ou igual a 1%. Sabe-se que a urna B tem 4 bolinhas pretas e que, em ambas as urnas, todas as bolinhas têm a mesma probabilidade de serem retiradas.
  >
  > Qual é o número mínimo de bolinhas brancas que o gerente deve adicionar à urna B?
- **Alternativas:**
  - A) 20
  - B) 60
  - C) 64
  - D) 68
  - E) 80
- **Gabarito:** C
- **Resumo para o app (adaptada):** Urna A tem 20% de chance de bola preta e urna B tem 4 pretas em 16. Quantas brancas pôr em B para P(duas pretas) <= 1%?
- **Conferência matemática:** Na urna B, 4 pretas correspondem a 25% (= 1/4), logo B tem inicialmente 16 bolas (4 pretas e 12 brancas). Acrescentando x bolas brancas em B, P(duas pretas) = 0,20 * 4 / (16 + x) <= 0,01 => 0,8 / (16 + x) <= 0,01 => 16 + x >= 80 => x >= 64.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2021 — Questão 142 (caderno azul)
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/142
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/142 (`correctAlternative: "B"`)
- **Enunciado:**
  > O organizador de uma competição de lançamento de dados pretende tornar o campeonato mais competitivo. Pelas regras atuais da competição, numa rodada, o jogador lança 3 dardos e pontua caso acerte pelo menos um deles no alvo. O organizador considera que, em média, os jogadores tem, em cada lançamento, 1/2 de probabilidade de acertar um dardo no alvo. A fim de tornar o jogo mais atrativo, planeja modificar as regras de modo que a probabilidade de um jogador pontuar em uma rodada seja igual ou superior a 9/10. Para isso, decide aumentar a quantidade de dardos a serem lançados em cada rodada.
  >
  > Com base nos valores considerados pelo organizador da competição, a quantidade mínima de dardos que devem ser disponibilizados em uma rodada para tornar o jogo mais atrativo é
- **Alternativas:**
  - A) 2
  - B) 4
  - C) 6
  - D) 9
  - E) 10
- **Gabarito:** B
- **Resumo para o app (adaptada):** Com chance 1/2 de acertar cada dardo, qual o mínimo de dardos por rodada para acertar pelo menos um com probabilidade >= 9/10?
- **Conferência matemática:** A chance de errar todos os n dardos é (1/2)^n. Logo, a chance de acertar pelo menos um é 1 - (1/2)^n >= 9/10 => (1/2)^n <= 1/10 => 2^n >= 10. Como 2^3 = 8 < 10 e 2^4 = 16 >= 10, o mínimo é n = 4.

## Questão 3
- **Banca / Ano / Questão:** ENEM 2018 — Questão 167 (caderno azul)
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/167
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/167 (`correctAlternative: "D"`)
- **Enunciado:**
  > O gerente do setor de recursos humanos de uma empresa está organizando uma avaliação em que uma das etapas é um jogo de perguntas e respostas. Para essa etapa, ele classificou as perguntas, pelo nível de dificuldade, em fácil, médio e difícil, e escreveu cada pergunta em cartões para colocação em uma urna. Contudo, após depositar vinte perguntas de diferentes níveis na urna, ele observou que 25% delas eram de nível fácil. Querendo que as perguntas de nível fácil sejam a maioria, o gerente decidiu acrescentar mais perguntas de nível fácil à urna, de modo que a probabilidade de o primeiro participante retirar, aleatoriamente, uma pergunta de nível fácil seja de 75%.
  >
  > Com essas informações, a quantidade de perguntas de nível fácil que o gerente deve acrescentar à urna é igual a
- **Alternativas:**
  - A) 10.
  - B) 15.
  - C) 35.
  - D) 40.
  - E) 45.
- **Gabarito:** D
- **Resumo para o app (adaptada):** Uma urna tem 20 perguntas, sendo 25% fáceis. Quantas perguntas fáceis acrescentar para que a chance de sortear uma fácil seja 75%?
- **Conferência matemática:** Inicialmente há 25% de 20 = 5 perguntas fáceis e 15 não fáceis. Ao acrescentar x fáceis, (5 + x) / (20 + x) = 3/4 => 20 + 4x = 60 + 3x => x = 40.
