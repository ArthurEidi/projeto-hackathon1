# Fontes candidatas — area-do-circulo-e-setores

## Questão 1
- **Banca / Ano / Questão:** ENEM 2019 — Questão 142
- **URL do enunciado:** https://api.enem.dev/v1/exams/2019/questions/142
- **URL do gabarito:** https://api.enem.dev/v1/exams/2019/questions/142 (`correctAlternative: "E"`)
- **Enunciado:**
  > Em um condomínio, uma área pavimentada, que tem a forma de um círculo com diâmetro medindo 6m, é cercado por grama. A administração do condomínio deseja ampliar essa área, mantendo seu formato circular, e aumentando, em 8m, o diâmetro dessa região, mantendo o revestimento da parte já existente. O condomínio dispõe, em estoque, de material suficiente para pavimentar mais 100 m² de área.
  >
  > O síndico do condomínio irá avaliar se esse material disponível será suficiente para pavimentar a região a ser ampliada.
  >
  > Utilize 3 como aproximação para π.
  >
  > A conclusão correta a que o síndico deverá chegar, considerando a nova área a ser pavimentada, é a de que o material disponível em estoque:
- **Alternativas:**
  - A) Será suficiente, pois a área da nova região a ser pavimentada mede 21 m².
  - B) Será suficiente, pois a área da nova região a ser pavimentada mede 24 m².
  - C) Será suficiente, pois a área da nova região a ser pavimentada mede 48 m².
  - D) Não será suficiente, pois a área da nova região a ser pavimentada mede 108 m².
  - E) Não será suficiente, pois a área da nova região a ser pavimentada mede 120 m².
- **Gabarito:** E
- **Resumo para o app (adaptada):** Uma praça circular de 6 m de diâmetro será ampliada em 8 m no diâmetro (π = 3). Um estoque para 100 m² basta para a nova faixa?
- **Conferência matemática:** Raio inicial r = 6/2 = 3 m; novo diâmetro 6 + 8 = 14 m, logo R = 7 m. Área da coroa: π(R² - r²) = 3·(7² - 3²) = 3·(49 - 9) = 120 m². Como 120 > 100, não será suficiente.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2018 — Questão 153
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/153
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/153 (`correctAlternative: "D"`)
- **Enunciado:**
  > A figura mostra uma praça circular que contém um chafariz em seu centro e, em seu entorno, um passeio. Os círculos que definem a praça e o chafariz são concêntricos.
  >
  > ![](https://enem.dev/2018/questions/153/222ea15d-d436-4e73-8297-5e4a490f851a.png)
  >
  > O passeio terá seu piso revestido com ladrilhos. Sem condições de calcular os raios, pois o chafariz está cheio, um engenheiro fez a seguinte medição: esticou uma trena tangente ao chafariz, medindo a distância entre dois pontos _A_ e _B_, conforme a figura. Com isso, obteve a medida do segmento de reta _AB_: 16 m.
  >
  > ![](https://enem.dev/2018/questions/153/1d6e5ac1-393a-426c-95c0-c70622ddc252.png)
  >
  > Dispondo apenas dessa medida, o engenheiro calculou corretamente a medida da área do passeio, em metro quadrado.
  >
  > A medida encontrada pelo engenheiro foi
- **Alternativas:**
  - A) 4π.
  - B) 8π.
  - C) 48π.
  - D) 64π.
  - E) 192π.
- **Gabarito:** D
- **Resumo para o app (adaptada):** Numa coroa circular entre dois círculos concêntricos, uma corda tangente ao círculo interno mede 16 m. Qual é a área da coroa?
- **Conferência matemática:** O raio R do círculo maior, o raio r do menor (perpendicular à corda no ponto médio) e metade da corda (16/2 = 8 m) formam triângulo retângulo: R² - r² = 8² = 64. Área = π(R² - r²) = 64π m².

## Questão 3
- **Banca / Ano / Questão:** ENEM 2021 — Questão 171
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/171
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/171 (`correctAlternative: "E"`)
- **Enunciado:**
  > O dono de uma loja pretende usar cartões imantados para a sua divulgação de sua loja. A empresa que fornecerá o serviço lhe informa que o custo de fabricação do cartão é de R$0,01 por centímetro quadrado e que disponibiliza modelos tendo como faces úteis para impressão:
  >
  > *   um triângulo equilátero de lado 12 cm;
  > *   um quadrado de lado 8 cm;
  > *   um retângulo de lados 11 cm e 8 cm;
  > *   um hexágono regular de lado 6cm;
  > *   um círculo de diâmetro 10 cm.
  >
  > O dono da loja está disposto a pagar, no máximo, R$0,80 por cartão. Ele escolherá, dentro desse limite de preço, o modelo que tiver maior área de impressão.
  >
  > Use 3 como aproximação para π e use 1,7 como aproximação para √3.
  >
  > Nessas condições, o modelo que deverá ser escolhido tem como face útil para impressão um
- **Alternativas:**
  - A) Triângulo
  - B) Quadrado
  - C) Retângulo
  - D) Hexágono
  - E) Círculo
- **Gabarito:** E
- **Resumo para o app (adaptada):** Cartão custa R$ 0,01/cm² (máx 80 cm²). Entre triângulo eq. L=12, quadrado L=8, retângulo 11×8, hexágono L=6 e círculo d=10, qual vence?
- **Conferência matemática:** Com π=3 e √3=1,7: triângulo 144·1,7/4 = 61,2 cm²; quadrado 64 cm²; retângulo 88 cm² (> 80); hexágono 6·36·1,7/4 = 91,8 cm² (> 80); círculo 3·5² = 75 cm². Maior área até 80 cm²: círculo.
