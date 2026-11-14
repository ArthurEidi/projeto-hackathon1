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

## Substituta de ENEM 2023/138 (cache ENEM, 14/11)
- **Banca / Ano / Questão:** ENEM 2012 — Questão 178
- **URL do enunciado:** https://api.enem.dev/v1/exams/2012/questions/178
- **URL do gabarito:** https://api.enem.dev/v1/exams/2012/questions/178 (`correctAlternative: "D"`)
- **Enunciado:**
  > José, Paulo e Antônio estão jogando dados não viciados, nos quais, em cada uma das seis faces, há um número de 1 a 6. Cada um deles jogará dois dados simultaneamente. José acredita que, após jogar seus dados, os números das faces voltadas para cima lhe darão uma soma igual a 7. Já Paulo acredita que sua soma será igual a 4 e Antônio acredita que sua soma será igual a 8.
  >
  > Com essa escolha, quem tem a maior probabilidade de acertar sua respectiva soma é
- **Alternativas:**
  - A) Antônio, já que sua soma é a maior de todas as escolhidas.
  - B) José e Antônio, já que há 6 possibilidades tanto para a escolha de José quanto para a escolha de Antônio, e há apenas 4 possibilidades para a escolha de Paulo.
  - C) José e Antônio, já que há 3 possibilidades tanto para a escolha de José quanto para a escolha de Antônio, e há apenas 2 possibilidades para a escolha de Paulo.
  - D) José, já que há 6 possibilidades para formar sua soma, 5 possibilidades para formar a soma de Antônio e apenas 3 possibilidades para formar a soma de Paulo.
  - E) Paulo, já que sua soma é a menor de todas.
- **Gabarito:** D
- **Resumo para o app (adaptada):** Ao lançar dois dados comuns, José aposta na soma 7, Paulo na 4 e Antônio na 8. Quem tem maior probabilidade de acertar?
- **Conferência matemática:** Soma 7 tem 6 pares ((1,6)..(6,1)); soma 8 tem 5 pares ((2,6)..(6,2)); soma 4 tem 3 pares ((1,3),(2,2),(3,1)). José tem a maior chance (6/36). Gabarito D.

## Substituta de ENEM 2021/142 (cache ENEM, 14/11)
- **Banca / Ano / Questão:** ENEM 2011 — Questão 168
- **URL do enunciado:** https://api.enem.dev/v1/exams/2011/questions/168
- **URL do gabarito:** https://api.enem.dev/v1/exams/2011/questions/168 (`correctAlternative: "C"`)
- **Enunciado:**
  > Em um jogo disputado em uma mesa de sinuca, há 16 bolas: 1 branca e 15 coloridas, as quais, de acordo com a coloração, valem de 1 a 15 pontos (um valor para cada bola colorida).
  >
  > O jogador acerta o taco na bola branca de forma que esta acerte as outras, com o objetivo de acertar duas das quinze bolas em quaisquer caçapas. Os valores dessas duas bolas são somados e devem resultar em um valor escolhido pelo jogador antes do início da jogada.
  >
  > Arthur, Bernardo e Caio escolhem os números 12, 17 e 22 como sendo resultados de suas respectivas somas.
  >
  > Com essa escolha, quem tem a maior probabilidade de ganhar o jogo é
- **Alternativas:**
  - A) Arthur, pois a soma que escolheu é a menor.
  - B) Bernardo, pois há 7 possibilidades de compor a soma escolhida por ele, contra 4 possibilidades para a escolha de Arthur e 4 possibilidades para a escolha de Caio.
  - C) Bernardo, pois há 7 possibilidades de compor a soma escolhida por ele, contra 5 possibilidades para a escolha de Arthur e 4 possibilidades para a escolha de Caio.
  - D) Caio, pois há 10 possibilidades de compor a soma escolhida por ele, contra 5 possibilidades para a escolha de Arthur e 8 possibilidades para a escolha de Bernardo.
  - E) Caio, pois a soma que escolheu é a maior.
- **Gabarito:** C
- **Resumo para o app (adaptada):** De 15 bolas numeradas de 1 a 15, sorteiam-se duas distintas. Arthur escolhe soma 12, Bernardo 17 e Caio 22. Quem tem mais chance?
- **Conferência matemática:** Soma 12: {1,11},{2,10},{3,9},{4,8},{5,7} (5 pares); soma 17: {2,15}..{8,9} (7 pares); soma 22: {7,15}..{10,12} (4 pares). Bernardo vence com 7 possibilidades. Gabarito C.
