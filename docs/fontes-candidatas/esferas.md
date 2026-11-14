# Fontes candidatas — esferas

## Questão 1
- **Banca / Ano / Questão:** ENEM 2022 — Questão 174
- **URL do enunciado:** https://api.enem.dev/v1/exams/2022/questions/174
- **URL do gabarito:** https://api.enem.dev/v1/exams/2022/questions/174 (`correctAlternative: "D"`)
- **Enunciado:**
  > Peças metálicas de aeronaves abandonadas em aeroportos serão recicladas. Uma dessas peças é maciça e tem o formato cilíndrico, com a medida do raio da base igual a 4 cm e a da altura igual a 50 cm. Ela será derretida, e o volume de metal resultante será utilizado para a fabricação de esferas maciças com diâmetro de 1 cm, a serem usadas para confeccionar rolamentos. Para estimar a quantidade de esferas que poderão ser produzidas a partir de cada uma das peças cilíndricas, admite-se que não ocorre perda de material durante o processo de derretimento.
  >
  > Quantas dessas esferas poderão ser obtidas a partir de cada peça cilíndrica?
- **Alternativas:**
  - A) 800
  - B) 1200
  - C) 2400
  - D) 4800
  - E) 6400
- **Gabarito:** D
- **Resumo para o app (adaptada):** Um cilindro maciço de raio 4 cm e altura 50 cm é derretido para fazer esferas de diâmetro 1 cm. Quantas esferas serão obtidas?
- **Conferência matemática:** V_cil = π · 4² · 50 = 800π cm³. Esfera: r = 0,5 cm = 1/2 cm => V_esf = (4/3)π(1/2)³ = π/6 cm³. Quantidade = 800π / (π/6) = 4800. Alternativa D.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2022 — Questão 178
- **URL do enunciado:** https://api.enem.dev/v1/exams/2022/questions/178
- **URL do gabarito:** https://api.enem.dev/v1/exams/2022/questions/178 (`correctAlternative: "E"`)
- **Enunciado:**
  > Uma cozinheira produz docinhos especiais por encomenda. Usando uma receita-base de massa, ela prepara uma porção, com a qual produz 50 docinhos maciços de formato esférico, com 2 cm de diâmetro. Um cliente encomenda 150 desses docinhos, mas pede que cada um tenha formato esférico com 4 cm de diâmetro.  
  > A cozinheira pretende preparar o número exato de porções da receita-base de massa necessário para produzir os docinhos dessa encomenda
  >
  > Quantas porções da receita-base de massa ela deve preparar para atender esse cliente?
- **Alternativas:**
  - A) 2
  - B) 3
  - C) 6
  - D) 12
  - E) 24
- **Gabarito:** E
- **Resumo para o app (adaptada):** Uma porção de massa rende 50 docinhos esféricos de diâmetro 2 cm. Quantas porções são necessárias para 150 docinhos de diâmetro 4 cm?
- **Conferência matemática:** Dobrar o diâmetro (r = 1 cm para R = 2 cm) multiplica o volume por 2³ = 8. Triplicar a quantidade (50 para 150) multiplica por 3. Total: 3 · 8 = 24 porções. Alternativa E.
