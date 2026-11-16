# Fontes candidatas — distribuicao-de-frequencias-e-amostragem

## Questão 1
- **Banca / Ano / Questão:** ENEM 2021 — Questão 151
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/151
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/151 (`correctAlternative: "C"`)
- **Imagens:** `public/vestibular/enem-2021-151-1.png` (histograma de distribuição de frequências dos preços de 105 apartamentos em faixas de 100 mil reais, de 300 a 1300 mil)
- **Enunciado:**
  > Um casal está planejando comprar um apartamento de dois quartos num bairro de uma cidade e consultou a página de uma corretora de imóveis, encontrando 105 apartamentos de dois quartos à venda no bairro desejado. Eles usaram um aplicativo da corretora para gerar a distribuição dos preços do conjunto de imóveis selecionados. O gráfico ilustra a distribuição de frequências dos preços de venda dos apartamentos dessa lista (em mil reais), no qual as faixas de preço são dadas por ]300, 400], ]400, 500], ]500, 600], ]600, 700], ]700, 800], ]800, 900], ]900, 1 000], ]1 000, 1 100], ]1 100, 1 200] e ]1 200, 1 300]. A mesma corretora anuncia que cerca de 50% dos apartamentos de dois quartos nesse bairro, publicados em sua página, têm preço de venda inferior a 550 mil reais. No entanto, o casal achou que essa última informação não era compatível com o gráfico obtido.
  >
  > ![](https://enem.dev/2021/questions/151/53a174a0-d119-4132-ade4-2cc79b864ee2.png)
  >
  > Com base no gráfico obtido, o menor preço, p (em mil reais), para o qual pelo menos 50% dos apartamentos apresenta preço inferior a p
- **Alternativas:**
  - A) 600.
  - B) 700.
  - C) 800.
  - D) 900.
  - E) 1000.
- **Gabarito:** C
- **Resolução (feita antes de olhar o gabarito):** O total de apartamentos é 105, logo 50% corresponde a 52,5 imóveis (ou seja, pelo menos 53 imóveis). Somando as frequências acumuladas pelo histograma: até 400 mil = 5; até 500 mil = 5 + 10 = 15; até 600 mil = 15 + 5 = 20; até 700 mil = 20 + 15 = 35; até 800 mil = 35 + 20 = 55. Como 35 < 52,5 e 55 >= 52,5, o menor valor p entre as alternativas que garante pelo menos 50% dos apartamentos abaixo de p é 800 mil reais.
- **Nível:** fácil

## Questão 2
- **Banca / Ano / Questão:** ENEM 2018 — Questão 145
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/145
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/145 (`correctAlternative: "D"`)
- **Imagens:** `public/vestibular/enem-2018-145-1.png` (tabela de distribuição de frequências do número de acidentes sofridos por uma amostra de 100 trabalhadores)
- **Enunciado:**
  > A Comissão Interna de Prevenção de Acidentes (CIPA) de uma empresa, observando os altos custos com os frequentes acidentes de trabalho ocorridos, fez, a pedido da diretoria, uma pesquisa do número de acidentes sofridos por funcionários. Essa pesquisa, realizada com uma amostra de 100 funcionários, norteará as ações da empresa na política de segurança no trabalho. Os resultados obtidos estão no quadro.
  >
  > ![](https://enem.dev/2018/questions/145/bc57dd00-a683-42ea-95a4-b3ffd7949f55.png)
  >
  > A média do número de acidentes por funcionário na amostra que a CIPA apresentará à diretoria da empresa é
- **Alternativas:**
  - A) 0,15.
  - B) 0,30.
  - C) 0,50.
  - D) 1,11.
  - E) 2,22.
- **Gabarito:** D
- **Resolução (feita antes de olhar o gabarito):** Multiplicando cada valor de acidentes pela sua frequência absoluta e dividindo pelo total da amostra (50 + 17 + 15 + 10 + 6 + 2 = 100): (0 × 50 + 1 × 17 + 2 × 15 + 3 × 10 + 4 × 6 + 5 × 2) / 100 = (0 + 17 + 30 + 30 + 24 + 10) / 100 = 111 / 100 = 1,11.
- **Nível:** fácil

## Questão 3
- **Banca / Ano / Questão:** ENEM 2023 — Questão 140
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/140
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/140 (`correctAlternative: "E"`)
- **Imagens:** `public/vestibular/enem-2023-140-1.png` (gráfico de barras horizontais relacionando a quantidade de viagens realizadas de 1 a 7 com a quantidade de motoristas, totalizando 160 motoristas)
- **Enunciado:**
  > Uma empresa de transporte faz regularmente um levantamento do número de viagens realizadas durante o dia por todos os 160 motoristas cadastrados em seu aplicativo. Em um certo dia, foi gerado um relatório, por meio de um gráfico de barras, no qual se relacionaram a quantidade de motoristas com a quantidade de viagens realizadas até aquele instante do dia.
  >
  > ![](https://enem.dev/2023/questions/140/846c1155-c9f0-48ad-a862-f9bf883c3935.png)
  >
  > Comparando os valores da média, da mediana e da moda da distribuição das quantidades de viagens realizadas pelos motoristas cadastrados nessa empresa, obtém-se
- **Alternativas:**
  - A) Mediana = média < moda.
  - B) Mediana = moda < média.
  - C) Mediana < média < moda.
  - D) Moda < média < mediana.
  - E) Moda < mediana < média.
- **Gabarito:** E
- **Resolução (feita antes de olhar o gabarito):** Pelo gráfico de frequências: 1 viagem (10), 2 viagens (10), 3 viagens (55), 4 viagens (25), 5 viagens (0), 6 viagens (50), 7 viagens (10). Soma = 160. A moda é o valor mais frequente: 3 viagens (55 motoristas). A mediana é a média entre o 80º e o 81º valores ordenados; as frequências acumuladas são 10, 20, 75 (até 3 viagens) e 100 (até 4 viagens), logo o 80º e o 81º valores são ambos 4, então mediana = 4. A média é (1×10 + 2×10 + 3×55 + 4×25 + 5×0 + 6×50 + 7×10) / 160 = (10 + 20 + 165 + 100 + 0 + 300 + 70) / 160 = 665 / 160 = 4,15625. Portanto, moda (3) < mediana (4) < média (4,15625).
- **Nível:** médio
