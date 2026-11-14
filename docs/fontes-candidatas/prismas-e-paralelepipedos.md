# Fontes candidatas — prismas-e-paralelepipedos

## Questão 1
- **Banca / Ano / Questão:** ENEM 2022 — Questão 172
- **URL do enunciado:** https://api.enem.dev/v1/exams/2022/questions/172
- **URL do gabarito:** https://api.enem.dev/v1/exams/2022/questions/172 (`correctAlternative: "B"`)
- **Enunciado:**
  > Um casal planeja construir em sua chácara uma piscina com o formato de um paralelepípedo reto retângulo com capacidade para 90 000 L de água. O casal contratou uma empresa de construções que apresentou cinco projetos com diferentes combinações nas dimensões internas de profundidade, largura e comprimento. A piscina a ser construída terá revestimento interno em suas paredes e fundo com uma mesma cerâmica, e o casal irá escolher o projeto que exija a menor área de revestimento.
  >
  > As dimensões internas de profundidade, largura e comprimento, respectivamente, para cada um dos projetos, são:
  >
  > • projeto I: 1,8 m, 2,0 m e 25,0 m;  
  > • projeto II: 2,0 m, 5,0 m e 9,0 m;  
  > • projeto III: 1,0 m, 6,0 m e 15,0 m;  
  > • projeto IV: 1,5 m, 15,0 m e 4,0 m;  
  > • projeto V: 2,5 m, 3,0 m e 12,0 m.
  >
  > O projeto que o casal deverá escolher será o
- **Alternativas:**
  - A) I.
  - B) II.
  - C) III.
  - D) IV.
  - E) V.
- **Gabarito:** B
- **Resumo para o app (adaptada):** Piscina sem tampa (90 m³), qual tem menor área: I (1,8×2×25), II (2×5×9), III (1×6×15), IV (1,5×15×4) ou V (2,5×3×12)?
- **Conferência matemática:** Área a revestir = fundo + 4 paredes = L·C + 2·P·(L + C). I: 2·25 + 2·1,8·27 = 147,2 m²; II: 5·9 + 2·2·14 = 101 m²; III: 6·15 + 2·1·21 = 132 m²; IV: 15·4 + 2·1,5·19 = 117 m²; V: 3·12 + 2·2,5·15 = 111 m². Menor área: projeto II (101 m²), alternativa B.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2021 — Questão 166
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/166
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/166 (`correctAlternative: "B"`)
- **Enunciado:**
  > O projeto de um contêiner, em forma de paralelepípedo reto retangular, previa a pintura dos dois lados (interno e externo) de cada uma das quatro paredes com tinta acrílica e a pintura do piso interno com tinta epóxi. O construtor havia pedido, a cinco fornecedores diferentes, orçamentos das tintas necessárias, mas, antes de iniciar a obra, resolveu mudar o projeto original, alterando o comprimento e a largura para o dobro do originalmente previsto, mantendo inalterada a altura. Ao pedir novos orçamentos aos fornecedores, para as novas dimensões, cada um deu uma resposta diferente sobre as novas quantidades de tinta necessárias.
  >
  > Em relação ao previsto para o projeto original, as novas quantidades de tinta necessárias informadas pelos fornecedores foram as seguintes:
  >
  > –  Fornecedor I: “O dobro, tanto para as paredes quanto para o piso”.
  >
  > – Fornecedor II: “O dobro para as paredes e quatro vezes para o piso”.
  >
  > – Fornecedor III: “Quatro vezes, tanto para as paredes quanto para o piso.”
  >
  > – Fornecedor IV: “Quatro vezes para as paredes e o dobro para o piso.”
  >
  > – Fornecedor V: “Oito vezes para as paredes e quatro vezes para o piso.”
  >
  > Analisando as informações dos fornecedores, o construtor providenciará a quantidade adequada de material. Considere a porta de acesso do contêiner como parte de uma das paredes.
  >
  > Qual dos fornecedores prestou as informações adequadas, devendo ser o escolhido pelo construtor para aquisição do material?
- **Alternativas:**
  - A) I
  - B) II
  - C) III
  - D) IV
  - E) V
- **Gabarito:** B
- **Resumo para o app (adaptada):** Em um contêiner retangular, dobram-se o comprimento e a largura mantendo a altura. Como mudam a área das 4 paredes e a do piso?
- **Conferência matemática:** Paredes (dois lados cada): A_p = 4H(C + L). Dobrando C e L: 4H(2C + 2L) = 2 · A_p (o dobro). Piso: A_f = C·L. Dobrando C e L: (2C)(2L) = 4 · A_f (quatro vezes). Logo, Fornecedor II, alternativa B.

## Questão 3
- **Banca / Ano / Questão:** ENEM 2012 — Questão 180
- **URL do enunciado:** https://api.enem.dev/v1/exams/2012/questions/180
- **URL do gabarito:** https://api.enem.dev/v1/exams/2012/questions/180 (`correctAlternative: "C"`)
- **Enunciado:**
  > A cerâmica possui a propriedade da contração, que consiste na evaporação da água existente em um conjunto ou bloco cerâmico submetido a uma determinada temperatura elevada: em seu lugar aparecendo “espaços vazios” que tendem a se aproximar. No lugar antes ocupado pela água vão ficando lacunas e, consequentemente, o conjunto tende a retrair-se. Considere que no processo de cozimento a cerâmica de argila sofra uma contração, em dimensões lineares, de 20%.
  >
  > _Disponível em: www.arq.ufsc.br. Acesso em: 30 mar. 2012 (adaptado)._
  >
  > Levando em consideração o processo de cozimento e a contração sofrida, o volume V de uma travessa de argila, de forma cúbica de aresta a, diminui para um valor que é
- **Alternativas:**
  - A) 20% menor que V, uma vez que o volume do cubo é diretamente proporcional ao comprimento de seu lado.
  - B) 36% menor que V, porque a área da base diminui de a2 para ((1 − 0,2)a)².
  - C) 48,8% menor que V, porque o volume diminui de a3 para (0,8a)³.
  - D) 51,2% menor que V, porque cada lado diminui para 80% do comprimento original.
  - E) 60% menor que V, porque cada lado diminui 20%.
- **Gabarito:** C
- **Resumo para o app (adaptada):** Uma travessa cúbica de argila de aresta a e volume V sofre contração linear de 20% no cozimento. Em quantos por cento diminui o volume?
- **Conferência matemática:** Nova aresta: a' = (1 - 0,20)a = 0,8a. Novo volume: V' = (0,8a)³ = 0,512a³ = 0,512V. Redução: 1 - 0,512 = 0,488 = 48,8% menor que V. Alternativa C.
