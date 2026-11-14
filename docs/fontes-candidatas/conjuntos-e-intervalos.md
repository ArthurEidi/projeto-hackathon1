# Fontes candidatas — conjuntos-e-intervalos

## Questão 1
- **Banca / Ano / Questão:** ENEM 2020 — Questão 169
- **URL do enunciado:** https://api.enem.dev/v1/exams/2020/questions/169
- **URL do gabarito:** https://api.enem.dev/v1/exams/2020/questions/169 (`correctAlternative: "C"`)
- **Enunciado:**
  > Um grupo sanguíneo, ou tipo sanguíneo, baseia-se na presença ou ausência de dois antígenos, A e B, na superfície das células vermelhas do sangue. Como dois antígenos estão envolvidos, os quatro tipos sanguíneos distintos são:
  >
  > *   Tipo A: apenas o antígeno A está presente;
  > *   Tipo B: apenas o antígeno B está presente;
  > *   Tipo AB: ambos os antígenos estão presentes;
  > *   Tipo O: nenhum dos antígenos está presente.
  >
  > Disponível em: http://saude.hsw.uol.com.br. Acesso em: 15 abr. 2012 (adaptado).
  >
  > Foram coletadas amostras de sangue de 200 pessoas e, após análise laboratorial, foi identificado que em 100 amostras está presente o antígeno A, em 110 amostras há presença do antígeno B e em 20 amostras nenhum dos antígenos está presente.
  >
  > Dessas pessoas que foram submetidas à coleta de sangue, o número das que possuem o tipo sanguíneo A é igual a
- **Alternativas:**
  - A) 30.
  - B) 60.
  - C) 70.
  - D) 90.
  - E) 100.
- **Gabarito:** C
- **Resumo para o app (adaptada):** Em 200 amostras de sangue, 100 têm antígeno A, 110 têm B e 20 não têm nenhum. Quantas têm apenas o antígeno A (tipo A)?
- **Conferência matemática:** n(A ∪ B) = 200 − 20 = 180; n(A ∩ B) = 100 + 110 − 180 = 30; apenas A = 100 − 30 = 70. Gabarito C.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2018 — Questão 163
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/163
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/163 (`correctAlternative: "A"`)
- **Enunciado:**
  > O artigo 33 da lei brasileira sobre drogas prevê a pena de reclusão de 5 a 15 anos para qualquer pessoa que seja condenada por tráfico ilícito ou produção não autorizada de drogas. Entretanto, caso o condenado seja réu primário, com bons antecedentes criminais, essa pena pode sofrer uma redução de um sexto a dois terços.
  >
  > Suponha que um réu primário, com bons antecedentes criminais, foi condenado pelo artigo 33 da lei brasileira sobre drogas.
  >
  > Após o benefício da redução de pena, sua pena poderá variar de
- **Alternativas:**
  - A) 1 ano e 8 meses a 12 anos e 6 meses.
  - B) 1 ano e 8 meses a 5 anos.
  - C) 3 anos e 4 meses a 10 anos.
  - D) 4 anos e 2 meses a 5 anos.
  - E) 4 anos e 2 meses a 12 anos e 6 meses.
- **Gabarito:** A
- **Resumo para o app (adaptada):** Uma pena de 5 a 15 anos recebe redução de 1/6 a 2/3. Qual é o novo intervalo possível da pena?
- **Conferência matemática:** Mínimo: 5·(1 − 2/3) = 5/3 ano = 1 ano e 8 meses; máximo: 15·(1 − 1/6) = 12,5 anos = 12 anos e 6 meses. Gabarito A.

## Questão 3
- **Banca / Ano / Questão:** ENEM 2018 — Questão 169
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/169
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/169 (`correctAlternative: "C"`)
- **Enunciado:**
  > Uma empresa de comunicação tem a tarefa de elaborar um material publicitário de um estaleiro para divulgar um novo navio, equipado com um guindaste de 15m de altura e uma esteira de 90 m de comprimento. No desenho desse navio, a representação do guindaste deve ter sua altura entre 0,5 cm e 1 cm, enquanto a esteira deve apresentar comprimento superior a 4 cm. Todo o desenho deverá ser feito em uma escala 1 : X.
  >
  > Os valores possíveis para X são, apenas,
- **Alternativas:**
  - A) X > 1 500.
  - B) X < 3 000.
  - C) 1 500 < X < 2 250.
  - D) 1 500 < X < 3 000.
  - E) 2 250 < X < 3 000.
- **Gabarito:** C
- **Resumo para o app (adaptada):** Na escala 1 : X, 15 m ficam entre 0,5 cm e 1 cm, e 90 m ficam maiores que 4 cm. Qual intervalo contém os valores possíveis de X?
- **Conferência matemática:** 1500/X ∈ (0,5; 1) ⇒ 1500 < X < 3000; 9000/X > 4 ⇒ X < 2250. Interseção: 1500 < X < 2250. Gabarito C.
