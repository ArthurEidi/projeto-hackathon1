# Fontes candidatas — principio-fundamental-da-contagem

## Questão 1
- **Banca / Ano / Questão:** ENEM 2022 — Questão 142 (caderno azul)
- **URL do enunciado:** https://api.enem.dev/v1/exams/2022/questions/142
- **URL do gabarito:** https://api.enem.dev/v1/exams/2022/questions/142 (`correctAlternative: "B"`)
- **Enunciado:**
  > Uma montadora de automóveis divulgou que oferta a seus clientes mais de 1 000 configurações diferentes de carro, variando o modelo, a motorização, os opcionais e a cor do veículo. Atualmente, ela oferece 7 modelos de carros com 2 tipos de motores: 1.0 e 1.6. Já em relação aos opcionais, existem 3 escolhas possíveis: central multimídia, rodas de liga leve e bancos de couro, podendo o cliente optar por incluir um, dois, três ou nenhum dos opcionais disponíveis.
  >
  > Para ser fiel à divulgação feita, a quantidade mínima de cores que a montadora deverá disponibilizar a seus clientes é
- **Alternativas:**
  - A) 8.
  - B) 9.
  - C) 11.
  - D) 18.
  - E) 24.
- **Gabarito:** B
- **Resumo para o app (adaptada):** Uma montadora oferece 7 modelos, 2 motores e 3 opcionais independentes (incluindo ou não). Quantas cores no mínimo geram mais de 1 000 configurações?
- **Conferência matemática:** Cada opcional pode ser incluído ou não, dando 2^3 = 8 escolhas de opcionais. Pelo PFC, com c cores há 7 * 2 * 8 * c = 112c configurações. Para 112c > 1 000, temos c > 1 000 / 112 ≈ 8,93, logo o mínimo é 9 cores.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2020 — Questão 141 (caderno azul)
- **URL do enunciado:** https://api.enem.dev/v1/exams/2020/questions/141
- **URL do gabarito:** https://api.enem.dev/v1/exams/2020/questions/141 (`correctAlternative: "A"`)
- **Enunciado:**
  > Um hotel de 3 andares está sendo construído. Cada andar terá 100 quartos. Os quartos serão numerados de 100 a 399 e cada um terá seu número afixado à porta. Cada número será composto por peças individuais, cada uma simbolizando um único algarismo.
  >
  > Qual a quantidade mínima de peças, simbolizando o algarismo 2, necessárias para identificar o número de todos os quartos?
- **Alternativas:**
  - A) 160
  - B) 157
  - C) 130
  - D) 120
  - E) 60
- **Gabarito:** A
- **Resumo para o app (adaptada):** Um hotel numera seus 300 quartos de 100 a 399 usando peças individuais para cada algarismo. Quantas peças com o algarismo 2 são necessárias?
- **Conferência matemática:** Contando por posição de 100 a 399: na centena há 100 vezes o algarismo 2 (200 a 299); na dezena há 3 * 10 = 30 vezes (120-129, 220-229, 320-329); na unidade há 3 * 10 = 30 vezes (3 escolhas de centena * 10 de dezena). Total = 100 + 30 + 30 = 160.

## Questão 3
- **Banca / Ano / Questão:** FUVEST — Questão clássica (citada como exercício 52 na lista do Professor Guru)
- **URL do enunciado:** https://www.professorguru.com.br/estatistica/analise-combinatoria-2.html
- **URL do gabarito:** https://www.professorguru.com.br/estatistica/analise-combinatoria-2.html (`Respostas dos Exercícios: 52. B`)
- **Enunciado:**
  > O número de anagramas da palavra FUVEST que começam e terminam com vogal é:
- **Alternativas:**
  - a) 24
  - b) 48
  - c) 96
  - d) 120
  - e) 144
- **Gabarito:** B
- **Resumo para o app (adaptada):** Quantos anagramas da palavra FUVEST começam e terminam com vogal?
- **Conferência matemática:** A palavra FUVEST tem 6 letras distintas: 2 vogais (U, E) e 4 consoantes (F, V, S, T). Para a 1ª posição há 2 escolhas de vogal; para a última, 1 vogal restante; para as 4 posições centrais, 4! = 24 permutações. Pelo PFC: 2 * 24 * 1 = 48.
