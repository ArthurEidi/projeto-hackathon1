# Fontes candidatas — funcao-definida-por-partes

## Questão 1 — ENEM 2016, Questão 145
- **Banca / Ano / Número:** ENEM 2016 — Questão 145
- **URL do enunciado:** https://api.enem.dev/v1/exams/2016/questions/145
- **URL do gabarito:** https://api.enem.dev/v1/exams/2016/questions/145
- **Enunciado:**
  > _Art. 93. A empresa com 100 (cem) ou mais empregados está obrigada a preencher de 2% (dois por cento) a 5% (cinco por cento) dos seus cargos com beneficiários reabilitados ou pessoas com deficiência, habilitadas, na seguinte proporção:_
  > _I. até 200 empregados……………….. 2%;_
  > _II. de 201 a 500 empregados…………… 3%;_
  > _III. de 501 a 1 000 empregados………… 4%;_
  > _IV. de 1 001 em diante………………. 5%._
  >
  > Constatou-se que a empresa possui 1 200 funcionários, dos quais 10 são reabilitados ou com deficiência, habilitados. Para adequar-se à referida lei, a empresa contratará apenas empregados que atendem ao perfil indicado no artigo 93.
  >
  > O número mínimo de empregados reabilitados ou com deficiência, habilitados, que deverá ser contratado pela empresa é
- **Alternativas:**
  - A) 74
  - B) 70
  - C) 64
  - D) 60
  - E) 53
- **Gabarito:** E
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):** A lei exige cota por faixa (5% acima de 1 000 empregados). Com 1 200 funcionários e 10 cotistas, quantos cotistas contratar no mínimo?
- **Conta que confirma o gabarito:** Contratando x cotistas, o total passa a ser 1 200 + x (faixa IV: 5%). Exige-se 10 + x >= 0,05(1 200 + x) => 10 + x >= 60 + 0,05x => 0,95x >= 50 => x >= 52,63, logo o mínimo é 53.

## Questão 2 — ENEM 2023, Questão 158
- **Banca / Ano / Número:** ENEM 2023 — Questão 158
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/158
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/158
- **Enunciado:**
  > Um pescador tem um custo fixo diário de R$ 900,00 com combustível, iscas, manutenção de seu barco e outras pequenas despesas. Ele vende cada quilograma de peixe por R$ 5,00. Sua meta é obter um lucro mínimo de R$ 800,00 por dia. Sozinho, ele consegue, ao final de um dia de trabalho, pescar 180 kg de peixe, o que é suficiente apenas para cobrir o custo fixo diário. Portanto, precisa contratar ajudantes, pagando para cada um R$ 250,00 por dia de trabalho. Além desse valor, 4% da receita obtida pela venda de peixe é repartida igualmente entre os ajudantes. Considerando o tamanho de seu barco, ele pode contratar até 5 ajudantes. Ele sabe que com um ajudante a pesca diária é de 300 kg e que, a partir do segundo ajudante contratado, aumenta-se em 100 kg a quantidade de peixe pescada por ajudante em um dia de trabalho.
  >
  > A quantidade mínima de ajudantes que esse pescador precisa contratar para conseguir o lucro diário pretendido é
- **Alternativas:**
  - A) 1
  - B) 2
  - C) 3
  - D) 4
  - E) 5
- **Gabarito:** D
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):** Sozinho pesca 180 kg; com 1 ajudante, 300 kg; do 2º em diante, +100 kg cada. Com custo R$ 900 + 250n + 4% da receita, quantos n dão lucro >= R$ 800?
- **Conta que confirma o gabarito:** Para n >= 1, a pesca é 300 + 100(n - 1) kg e a receita R = 5[300 + 100(n - 1)]. O lucro é 0,96R - 900 - 250n. Para n = 3: R = 2 500, lucro = 2 400 - 900 - 750 = 750 < 800. Para n = 4: R = 3 000, lucro = 2 880 - 900 - 1 000 = 980 >= 800. Logo n = 4.
