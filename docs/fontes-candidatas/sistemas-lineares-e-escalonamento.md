# Fontes candidatas — sistemas-lineares-e-escalonamento

## Questão 1 — ENEM 2023, Questão 175
- **Banca / Ano / Número:** ENEM 2023 — Questão 175
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/175
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/175
- **Enunciado:**
  > O metrô de um município oferece dois tipos de tíquetes com colorações diferentes, azul e vermelha, sendo vendidos em cartelas, cada qual com nove tíquetes da mesma cor e mesmo valor unitário. Duas cartelas de tíquetes azuis e uma cartela de tíquetes vermelhos são vendidas por R$ 32,40. Sabe-se que o preço de um tíquete azul menos o preço de um tíquete vermelho é igual ao preço de um tíquete vermelho mais cinco centavos.
  >
  > Qual o preço, em real, de uma cartela de tíquetes vermelhos?
- **Alternativas:**
  - A) 4,68
  - B) 6,30
  - C) 9,30
  - D) 10,50
  - E) 10,65
- **Gabarito:** B
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):** Duas cartelas de 9 tíquetes azuis e uma de 9 vermelhos custam R$ 32,40. Se azul - vermelho = vermelho + 0,05, quanto custa a cartela vermelha?
- **Conta que confirma o gabarito:** Sejam a e v os preços unitários dos tíquetes azul e vermelho. Temos 18a + 9v = 32,40 => 2a + v = 3,60, e a - v = v + 0,05 => a = 2v + 0,05. Substituindo: 2(2v + 0,05) + v = 3,60 => 5v = 3,50 => v = 0,70. Logo, uma cartela com 9 tíquetes vermelhos custa 9 * 0,70 = 6,30.

## Questão 2 — ENEM 2022, Questão 146
- **Banca / Ano / Número:** ENEM 2022 — Questão 146
- **URL do enunciado:** https://api.enem.dev/v1/exams/2022/questions/146
- **URL do gabarito:** https://api.enem.dev/v1/exams/2022/questions/146
- **Enunciado:**
  > Um parque tem dois circuitos de tamanhos diferentes para corridas. Um corredor treina nesse parque e, no primeiro dia, inicia seu treino percorrendo 3 voltas em torno do circuito maior e 2 voltas em torno do menor, perfazendo um total de 1 800 m. Em seguida, dando continuidade a seu treino, corre mais 2 voltas em torno do circuito maior e 1 volta em torno do menor, percorrendo mais 1 100 m.
  >
  > No segundo dia, ele pretende percorrer 5 000 m nos circuitos do parque, fazendo um número inteiro de voltas em torno deles e de modo que o número de voltas seja o maior possível.
  >
  > A soma do número de voltas em torno dos dois circuitos, no segundo dia, será
- **Alternativas:**
  - A) 10.
  - B) 13.
  - C) 14.
  - D) 15.
  - E) 16
- **Gabarito:** E
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):** 3 voltas no circuito maior e 2 no menor somam 1 800 m; 2 maiores e 1 menor somam 1 100 m. Qual o maior total de voltas inteiras para fazer 5 000 m?
- **Conta que confirma o gabarito:** Do sistema 3M + 2m = 1 800 e 2M + m = 1 100, isolamos m = 1 100 - 2M e substituímos na primeira: 3M + 2 200 - 4M = 1 800 => M = 400 m e m = 300 m. Para 400x + 300y = 5 000 => 4x + 3y = 50, maximizamos x + y escolhendo o maior y inteiro com 50 - 3y múltiplo de 4: y = 14 dá 4x = 8 => x = 2, soma x + y = 16.

## Questão 3 — ENEM 2018, Questão 178
- **Banca / Ano / Número:** ENEM 2018 — Questão 178
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/178
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/178
- **Enunciado:**
  > Durante uma festa de colégio, um grupo de alunos organizou uma rifa. Oitenta alunos faltaram à festa e não participaram da rifa. Entre os que compareceram, alguns compraram três bilhetes, 45 compraram 2 bilhetes, e muitos compraram apenas um. O total de alunos que comprou um único bilhete era 20% do número total de bilhetes vendidos, e o total de bilhetes vendidos excedeu em 33 o número total de alunos do colégio.
  >
  > Quantos alunos compraram somente um bilhete?
- **Alternativas:**
  - A) 34
  - B) 42
  - C) 47
  - D) 48
  - E) 79
- **Gabarito:** D
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):** Numa rifa, 80 faltaram, 45 compraram 2 bilhetes, alguns 3 e x compraram 1. Se x = 20% dos bilhetes B e B = total de alunos + 33, quanto vale x?
- **Conta que confirma o gabarito:** Sejam x alunos com 1 bilhete e y com 3. Total de bilhetes B = x + 90 + 3y e total de alunos A = x + 45 + y + 80 = x + y + 125. Como x = 0,2B => B = 5x, obtemos 4x - 3y = 90 e 5x = x + y + 158 => 4x - y = 158. Subtraindo as equações: 2y = 68 => y = 34, logo 4x = 192 => x = 48.
