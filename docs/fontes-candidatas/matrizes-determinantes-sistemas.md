# Fontes candidatas — matrizes-determinantes-sistemas

## Questão 1
- **Banca / Ano / Questão:** ENEM 2021 — Questão 157
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/157
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/157 (`correctAlternative: "E"`)
- **Imagens:** `public/vestibular/enem-2021-157-5.png` (matriz A 5×5 com o total de famílias, em dezena, que se mudaram da região i para a região j)
- **Enunciado:**
  > Uma construtora, pretendendo investir na construção de imóveis em uma metrópole com cinco grandes regiões, fez uma pesquisa sobre a quantidade de famílias que mudaram de uma região para outra, de modo a determinar qual região foi o destino do maior fluxo de famílias, sem levar em consideração o número de famílias que deixaram a região. Os valores da pesquisa estão dispostos em uma matriz A = ![](https://enem.dev/2021/questions/157/8c6e4e74-df9c-40f8-8252-dbdeaea6b052.png), i, j ![](https://enem.dev/2021/questions/157/be8d14c5-515d-49fd-ac32-96ff68aec07f.png) {1, 2, 3, 4, 5}, em que o elemento ![](https://enem.dev/2021/questions/157/d9158cca-6b4e-48a2-bfdb-ffe3e0bc450d.png) corresponde ao total de famílias (em dezena) que se mudaram da região i para a região j durante um certo período, e o elemento ![](https://enem.dev/2021/questions/157/9e0b26da-8c61-4aad-b6d1-2266960860e0.png) é considerado nulo, uma vez que somente são consideradas mudanças entre regiões distintas. A seguir, está apresentada a matriz com os dados da pesquisa.
  >
  > ![](https://enem.dev/2021/questions/157/7d732410-1899-40e4-ab0d-c9cac5de4aeb.png)
  >
  > Qual região foi selecionada para o investimento da construtora?
- **Alternativas:**
  - A) 1
  - B) 2
  - C) 3
  - D) 4
  - E) 5
- **Gabarito:** E
- **Resolução (feita antes de olhar o gabarito):** Como o elemento a_ij indica o número de famílias que se mudaram da região i para a região j, o total de famílias que tiveram a região j como destino (sem descontar as que saíram) é a soma da coluna j: coluna 1 = 0 + 0 + 2 + 1 + 1 = 4; coluna 2 = 4 + 0 + 2 + 0 + 2 = 8; coluna 3 = 2 + 6 + 0 + 2 + 0 = 10; coluna 4 = 2 + 2 + 3 + 0 + 4 = 11; coluna 5 = 5 + 3 + 0 + 4 + 0 = 12. O maior fluxo de destino ocorreu na região 5 (12 dezenas = 120 famílias).
- **Nível:** fácil

## Questão 2
- **Banca / Ano / Questão:** ENEM 2019 — Questão 144
- **URL do enunciado:** https://api.enem.dev/v1/exams/2019/questions/144
- **URL do gabarito:** https://api.enem.dev/v1/exams/2019/questions/144 (`correctAlternative: "A"`)
- **Imagens:** `public/vestibular/enem-2019-144-1.png` (matriz 5×5 com as quantidades de acertos dos 5 alunos ao longo dos 5 dias úteis da semana)
- **Enunciado:**
  > Um professor aplica, durante os cinco dias úteis de uma semana, testes com quatro questões de múltipla escolha a cinco alunos. Os resultados foram representados na matriz.
  >
  > Nessa matriz os elementos das linhas de 1 a 5 representam as quantidades de questões acertadas pelos alunos Ana, Bruno, Carlos, Denis e Érica, respectivamente, enquanto que as colunas de 1 a 5 indicam os dias da semana, de segunda-feira a sexta-feira, respectivamente, em que os testes foram aplicados.
  >
  > ![](https://enem.dev/2019/questions/144/258eca74-8b97-4a70-8abd-c6fb7b964db4.png)
  >
  > O teste que apresentou maior quantidade de acertos foi o aplicado na
- **Alternativas:**
  - A) Segunda-feira.
  - B) Terça-feira.
  - C) Quarta-feira.
  - D) Quinta-feira.
  - E) Sexta-feira.
- **Gabarito:** A
- **Resolução (feita antes de olhar o gabarito):** Somando cada coluna da matriz (dias de segunda a sexta): coluna 1 (segunda) = 3 + 3 + 2 + 3 + 0 = 11; coluna 2 (terça) = 2 + 2 + 2 + 2 + 2 = 10; coluna 3 (quarta) = 0 + 4 + 2 + 4 + 0 = 10; coluna 4 (quinta) = 1 + 1 + 3 + 1 + 4 = 10; coluna 5 (sexta) = 2 + 2 + 2 + 0 + 4 = 10. O maior total de acertos foi na segunda-feira (11 acertos).
- **Nível:** fácil

## Questão 3
- **Banca / Ano / Questão:** ENEM 2021 — Questão 164
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/164
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/164 (`correctAlternative: "B"`)
- **Imagens:** `public/vestibular/enem-2021-164-1.png` (tabela com as quantidades de camisetas, calças e sapatos levadas nas viagens I e II)
- **Enunciado:**
  > Uma pessoa pretende viajar por uma companhia aérea que despacha gratuitamente uma mala com até 10kg.
  >
  > Em duas viagens que realizou, essa pessoa utilizou a mesma mala e conseguiu 10 kg com as seguintes combinações de itens:
  >
  > ![](https://enem.dev/2021/questions/164/eab2c90e-a45f-482b-997d-a5c2f6931726.png)
  >
  > Para ter certeza de que sua bagagem terá massa de 10 kg, ela decide levar essa mala com duas calças, um sapato e o máximo de camisetas, admitindo que itens do mesmo tipo têm a mesma massa.
  >
  > Qual a quantidade máxima de camisetas que essa pessoa poderá levar?
- **Alternativas:**
  - A) 22
  - B) 24
  - C) 26
  - D) 33
  - E) 39
- **Gabarito:** B
- **Resolução (feita antes de olhar o gabarito):** Sejam c, k, s as massas de uma camiseta, uma calça e um sapato, e m a massa da mala vazia. Pelas duas viagens: 12c + 4k + 3s + m = 10 e 18c + 3k + 2s + m = 10. Subtraindo a segunda da primeira: −6c + k + s = 0, logo k + s = 6c. Substituindo s = 6c − k na primeira equação: 12c + 4k + 3(6c − k) + m = 10, donde 30c + k + m = 10. Na terceira viagem, com x camisetas, 2 calças e 1 sapato: xc + 2k + s + m = xc + k + (k + s) + m = xc + k + 6c + m = (x + 6)c + k + m = 10. Comparando com 30c + k + m = 10, temos x + 6 = 30, logo x = 24 camisetas.
- **Nível:** médio
