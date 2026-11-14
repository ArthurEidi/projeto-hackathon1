# Fontes candidatas — cilindros

## Questão 1
- **Banca / Ano / Questão:** ENEM 2022 — Questão 169
- **URL do enunciado:** https://api.enem.dev/v1/exams/2022/questions/169
- **URL do gabarito:** https://api.enem.dev/v1/exams/2022/questions/169 (`correctAlternative: "E"`)
- **Enunciado:**
  > Uma loja comercializa cinco modelos de caixas-d’água (I, II, III, IV e V), todos em formato de cilindro reto de base circular. Os modelos II, III, IV e V têm as especificações de suas dimensões dadas em relação às dimensões do modelo I, cuja profundidade é P e área da base é Ab, como segue:
  >
  > • modelo II: o dobro da profundidade e a metade da  
  > área da base do modelo I;  
  > • modelo III: o dobro da profundidade e a metade do  
  > raio da base do modelo I;  
  > • modelo IV: a metade da profundidade e o dobro da  
  > área da base do modelo I;  
  > • modelo V: a metade da profundidade e o dobro do  
  > raio da base do modelo I.
  >
  > Uma pessoa pretende comprar nessa loja o modelo  
  > de caixa-d’água que ofereça a maior capacidade  
  > volumétrica
  >
  > O modelo escolhido deve ser o
- **Alternativas:**
  - A) I.
  - B) II.
  - C) III.
  - D) IV.
  - E) V.
- **Gabarito:** E
- **Resumo para o app (adaptada):** Cilindro I tem altura P, área A_b e raio r. Qual tem maior volume: II (2P, A_b/2), III (2P, r/2), IV (P/2, 2A_b) ou V (P/2, 2r)?
- **Conferência matemática:** V_I = A_b·P = πr²P. V_II = (A_b/2)(2P) = V_I; V_III = π(r/2)²(2P) = V_I/2; V_IV = (2A_b)(P/2) = V_I; V_V = π(2r)²(P/2) = 2πr²P = 2·V_I. Maior capacidade: modelo V, alternativa E.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2010 — Questão 157
- **URL do enunciado:** https://api.enem.dev/v1/exams/2010/questions/157
- **URL do gabarito:** https://api.enem.dev/v1/exams/2010/questions/157 (`correctAlternative: "D"`)
- **Enunciado:**
  > Para construir uma manilha de esgoto, um cilindro com 2 m de diâmetro e 4 m de altura (de espessura desprezível), foi envolvido homogeneamente por uma camada de concreto, contendo 20 cm de espessura.
  >
  > Supondo que cada metro cúbico de concreto custe R$ 10,00 e tomando 3,1 como valor aproximado de π, então o preço dessa manilha é igual a
- **Alternativas:**
  - A) R$ 230,40.
  - B) R$ 124,00.
  - C) R$ 104,16.
  - D) R$ 54,56.
  - E) R$ 49,60.
- **Gabarito:** D
- **Resumo para o app (adaptada):** Um cilindro de 2 m de diâmetro e 4 m de altura recebe camada de concreto de 20 cm. A R$ 10/m³ e π = 3,1, quanto custa a manilha?
- **Conferência matemática:** Raio interno r = 1 m, espessura = 0,2 m => raio externo R = 1,2 m, h = 4 m. V = π(R² - r²)h = 3,1·(1,44 - 1)·4 = 3,1·1,76 = 5,456 m³. Custo = 5,456 · 10 = R$ 54,56. Alternativa D.

## Questão 3
- **Banca / Ano / Questão:** ENEM 2021 — Questão 167
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/167
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/167 (`correctAlternative: "D"`)
- **Enunciado:**
  > Um povoado com 100 habitantes está passando por uma situação de seca prolongada e os responsáveis pela administração pública local decidem contratar a construção de um reservatório. Ele deverá ter a forma de um cilindro circular reto, cuja base tenha 5 metros de diâmetro interno, e atender à demanda de água da população por um período de exatamente sete dias consecutivos. No oitavo dia, o reservatório vazio é completamente reabastecido por carros-pipa.
  >
  > Considere que o consumo médio diário por habitante é de 120 litros de água. Use 3 como aproximação para ![](https://enem.dev/2021/questions/167/42cbdc11-82db-44e3-8f1b-367c1b0e5853.png)
  >
  > Nas condições apresentadas, o reservatório deverá ser construído com uma altura interna mínima, em metro, igual a
- **Alternativas:**
  - A) 1,12
  - B) 3,10
  - C) 4,35
  - D) 4,48
  - E) 5,60
- **Gabarito:** D
- **Resumo para o app (adaptada):** Reservatório cilíndrico de 5 m de diâmetro atende 100 pessoas por 7 dias a 120 L/dia por pessoa. Com π = 3, qual a altura mínima em m?
- **Conferência matemática:** Demanda total: 100 · 120 · 7 = 84 000 L = 84 m³. Raio r = 2,5 m. V = πr²h => 84 = 3 · (2,5)² · h = 18,75h => h = 84 / 18,75 = 4,48 m. Alternativa D.
