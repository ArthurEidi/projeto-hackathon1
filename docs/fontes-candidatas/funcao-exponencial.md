# Fontes candidatas — funcao-exponencial

## Questão 1 — ENEM 2023, Questão 159
- **Banca / Ano / Número:** ENEM 2023 — Questão 159
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/159
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/159
- **Enunciado:**
  > Um agricultor é informado sobre um método de proteção para sua lavoura que consiste em inserir larvas específicas, de rápida reprodução. A reprodução dessas larvas faz com que sua população multiplique-se por 10 a cada 3 dias e, para evitar eventuais desequilíbrios, é possível cessar essa reprodução aplicando-se um produto X. O agricultor decide iniciar esse método com 100 larvas e dispõe de 5 litros do produto X, cuja aplicação recomendada é de exatamente 1 litro para cada população de 200 000 larvas. A quantidade total do produto X de que ele dispõe deverá ser aplicada de uma única vez.
  >
  > Quantos dias após iniciado esse método o agricultor deverá aplicar o produto X?
- **Alternativas:**
  - A) 2
  - B) 4
  - C) 6
  - D) 12
  - E) 18
- **Gabarito:** D
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):** Uma população de 100 larvas multiplica-se por 10 a cada 3 dias. Com 5 L de produto (1 L por 200 000 larvas), em quantos dias aplicar?
- **Conta que confirma o gabarito:** A população em t dias é N(t) = 100 · 10^(t/3). Os 5 L atendem 5 · 200 000 = 1 000 000 = 10^6 larvas. Logo 100 · 10^(t/3) = 10^6 => 10^(t/3) = 10^4 => t/3 = 4 => t = 12 dias.

*(Nota: varredura completa do ENEM 2015–2023 na api.enem.dev sem imagens e com alternativas em texto encontrou apenas esta questão específica do tema; outras questões exponenciais tinham alternativas em imagem ou enunciado dependente de figura/aproximação em imagem.)*
